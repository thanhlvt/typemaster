import * as Phaser from 'phaser';
import { TelexEngine }           from '../utils/TelexEngine';
import { VirtualKeyboard }       from '../components/VirtualKeyboard';
import { ConfirmDialog }         from '../components/ConfirmDialog';
import { ResultOverlay }         from '../components/ResultOverlay';
import { SpinWheelOverlay }      from '../components/SpinWheelOverlay';
import { AudioManager }          from '../utils/AudioManager';
import { ProgressManager, UNLOCK_THRESHOLDS } from '../utils/ProgressManager';
import { TypingValidator }       from '../utils/TypingValidator';
import { AchievementManager }    from '../utils/AchievementManager';
import { AchievementToast }      from '../components/AchievementToast';
import { PlaySceneHUD }          from '../components/PlaySceneHUD';
import { ComboManager }          from '../components/ComboManager';
import { TypingBox }             from '../components/TypingBox';
import { getChapterForLesson, getChapterBgKey, CHAPTERS } from '../data/chapters';
import { ensureTextures } from '../utils/TextureLoader';
import { showScorePopup, showBananaDrop } from '../utils/PlayScorePopup';
import { STORY_CONFIGS }         from '../data/story_configs';
import { MINIGAME_CONFIGS }      from '../data/minigame_configs';
import { StoryDialogOverlay }    from '../components/StoryDialogOverlay';
import { MinigameFactory }       from '../components/minigames/MinigameFactory';

export class PlayScene extends Phaser.Scene {
    constructor() {
        super('PlayScene');
    }

    // ── Lifecycle ─────────────────────────────────────────────────

    init(data) {
        this.gameData         = this.cache.json.get('gameData');
        this.currentLessonIndex = 0;
        this.currentWordIndex   = 0;
        this.telexEngine        = new TelexEngine(this.gameData.telex_rules);
        this.score              = 0;
        this.minigame           = null;

        const progress = ProgressManager.loadProgress(this.gameData.lessons.length);
        this.currentLessonIndex   = progress.lessonIndex;
        this.score                = progress.score;
        this.lessonStats          = progress.lessonStats          || {};
        this.unlockedAchievements = progress.unlockedAchievements || [];
        this.consecutivePerfects  = progress.consecutivePerfects  || 0;
        this.streakDays           = progress.streakDays;

        this.isDailyChallenge = false;
        if (data) {
            if (data.lessonIndex !== undefined) {
                this.currentLessonIndex = data.lessonIndex;
            }
            if (data.isDailyChallenge !== undefined) {
                this.isDailyChallenge = data.isDailyChallenge;
            }
        }
    }

    create() {
        const { width, height } = this.scale;

        this.bgImage = this.add.image(width / 2, height / 2, 'bg_1_1').setDisplaySize(width, height);
        this.monkey = this.add.sprite(width / 2, height * 0.35, 'monkey_1').setScale(0.75);

        this.typingBox = new TypingBox(this);
        this.virtualKeyboard = new VirtualKeyboard(this, 0, 0);

        this.hud   = new PlaySceneHUD(this);
        this.combo = new ComboManager();
        this.hud.initStreak(this.streakDays);

        this.input.keyboard.on('keydown', this.handleKeyDown, this);
        this.input.keyboard.addCapture([
            Phaser.Input.Keyboard.KeyCodes.ESC,
            Phaser.Input.Keyboard.KeyCodes.SPACE
        ]);
        this.events.once('shutdown', () => {
            this.input.keyboard.removeCapture([
                Phaser.Input.Keyboard.KeyCodes.ESC,
                Phaser.Input.Keyboard.KeyCodes.SPACE
            ]);
            if (this.minigame) {
                this.minigame.destroy();
                this.minigame = null;
            }
        });

        this.startLesson();

        const resumeAudio = () => {
            if (this.sound.context && this.sound.context.state === 'suspended') {
                this.sound.context.resume();
            }
            this.input.off('pointerdown', resumeAudio);
            this.input.keyboard.off('keydown', resumeAudio);
        };
        this.input.on('pointerdown', resumeAudio);
        this.input.keyboard.on('keydown', resumeAudio);

        AudioManager.playThemeMusic(this, this.currentLessonIndex, true);
    }

    _doReset() {
        ProgressManager.clearAll();
        this.tweens.killAll();
        this.currentLessonIndex   = 0;
        this.currentWordIndex     = 0;
        this.score                = 0;
        this.streakDays           = 0;
        this.lessonStats          = {};
        this.unlockedAchievements = [];
        this.consecutivePerfects  = 0;
        this.combo.reset();
        this.hud.hideStreak();
        this.monkey.y = this.scale.height * 0.4;
        this.input.keyboard.enabled = true;
        this.startLesson();
    }

    showResetConfirm() {
        this.input.keyboard.enabled = false;
        new ConfirmDialog(this, () => this._doReset())
            .on('destroy', () => { this.input.keyboard.enabled = true; });
    }

    // ── Keyboard logic ────────────────────────────────────────────

    highlightNextKey() {
        const rawBuffer     = this.telexEngine.getRawBuffer();
        const targetKeysStr = this.targetKeys.toLowerCase();
        const currentCounts = {};

        for (const c of rawBuffer) {
            currentCounts[c] = (currentCounts[c] || 0) + 1;
        }

        const targetCountsSoFar = {};
        let nextCharToHighlight = null;

        for (const c of targetKeysStr) {
            targetCountsSoFar[c] = (targetCountsSoFar[c] || 0) + 1;
            if ((currentCounts[c] || 0) < targetCountsSoFar[c]) {
                nextCharToHighlight = c;
                break;
            }
        }

        this.virtualKeyboard.highlightKey(nextCharToHighlight);
    }

    handleKeyDown(event) {
        const key = event.key.toLowerCase();
        if (!/^[a-z ]$/.test(key)) return;

        const rawBuffer = this.telexEngine.getRawBuffer();

        if (TypingValidator.isPossible(rawBuffer + key, this.targetKeys, this.targetWord, this.telexEngine)) {
            const vietnameseBuffer = this.telexEngine.processKey(key);
            this.sound.play('key_sound');
            this.typingBox.setTypedText(vietnameseBuffer);
            this.highlightNextKey();

            if (TypingValidator.normalizeForMatch(vietnameseBuffer) === TypingValidator.normalizeForMatch(this.targetWord)) {
                this.handleSuccess();
            }
        } else {
            this.errorsInLesson++;
            this.handleFail();
        }
    }

    // ── Lesson flow ───────────────────────────────────────────────

    startLesson() {
        this.currentWordIndex = 0;
        this.errorsInLesson   = 0;
        this.lessonStartTime  = Date.now();

        if (this.isDailyChallenge) {
            const today = new Date();
            const seedNum = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
            const rnd = new Phaser.Math.RandomDataGenerator([seedNum.toString()]);
            
            const progress = ProgressManager.loadProgress(this.gameData.lessons.length);
            const unlockedIndices = [];
            for (let i = 0; i < this.gameData.lessons.length; i++) {
                const isUnlocked = (i === 0) || (progress.lessonStats[i - 1] && progress.lessonStats[i - 1].stars > 0);
                if (isUnlocked) unlockedIndices.push(i);
            }
            const pool = [];
            for (const idx of unlockedIndices) {
                pool.push(...this.gameData.lessons[idx].content);
            }
            const shuffled = rnd.shuffle(pool);
            const count = Math.min(shuffled.length, rnd.integerInRange(5, 8));
            this.dailyWords = shuffled.slice(0, count);
            this.totalKeysInLesson = this.dailyWords.reduce((sum, item) => sum + item.keys.length, 0);
        } else {
            const lesson = this.gameData.lessons[this.currentLessonIndex];
            this.totalKeysInLesson = lesson.content.reduce((sum, item) => sum + item.keys.length, 0);
        }

        this._applySkins();
        
        if (this.isDailyChallenge) {
            this.hud.updateProgress(-1, 0, this.score, 0, this.dailyWords.length);
        } else {
            this.hud.updateProgress(this.currentLessonIndex, this.gameData.lessons.length, this.score);
        }

        // Dọn dẹp minigame cũ nếu có
        if (this.minigame) {
            this.minigame.destroy();
            this.minigame = null;
        }

        // Kiểm tra xem Story Mode có được bật trong cài đặt hay không
        const storyModeEnabled = ProgressManager.getStoryMode();
        const storyConfig = storyModeEnabled ? STORY_CONFIGS[this.currentLessonIndex] : null;
        const minigameConfig = MINIGAME_CONFIGS[this.currentLessonIndex];

        if (storyConfig && storyConfig.preGame) {
            // Tắt xử lý gõ phím chơi game trong lúc chạy hội thoại (nhưng vẫn bật bàn phím để StoryDialogOverlay nhận phím tắt)
            this.input.keyboard.off('keydown', this.handleKeyDown, this);
            this.monkey.setVisible(false);
            new StoryDialogOverlay(this, storyConfig.preGame, () => {
                this.input.keyboard.on('keydown', this.handleKeyDown, this);
                this.setupMinigameAndStart(minigameConfig);
            });
        } else {
            this.setupMinigameAndStart(minigameConfig);
        }
    }

    setupMinigameAndStart(minigameConfig) {
        if (minigameConfig) {
            this.monkey.setVisible(false);
            const totalWords = this.isDailyChallenge 
                ? this.dailyWords.length 
                : this.gameData.lessons[this.currentLessonIndex].content.length;

            // Quét các ảnh cần load từ config của minigame
            const texturesToLoad = [];
            
            const getAssetUrl = (imagePath) => {
                if (imagePath.startsWith('assets/')) {
                    return imagePath;
                }
                return `assets/${imagePath}`;
            };

            // 1. Ảnh của container
            if (minigameConfig.config?.container?.image) {
                texturesToLoad.push({
                    key: minigameConfig.config.container.texture,
                    url: getAssetUrl(minigameConfig.config.container.image)
                });
            }
            
            // 2. Ảnh của các đồ vật (items)
            if (Array.isArray(minigameConfig.config?.items)) {
                minigameConfig.config.items.forEach(item => {
                    if (item.image) {
                        texturesToLoad.push({
                            key: item.texture,
                            url: getAssetUrl(item.image)
                        });
                    }
                });
            }

            ensureTextures(this, texturesToLoad, () => {
                this.minigame = MinigameFactory.createMinigame(this, minigameConfig.gameId, minigameConfig.config);
                if (this.minigame) {
                    this.minigame.init(totalWords);
                    this.minigame.create();
                }
                this.showWord();
            });
        } else {
            this.monkey.setVisible(true).setAlpha(1);
            this.showWord();
        }
    }

    _applySkins() {
        const equipped = ProgressManager.getEquippedSkins();

        // Background is fixed per chapter — always use chapter's own bg texture
        let bgTexture;
        if (this.isDailyChallenge) {
            // For daily challenge, use last unlocked background
            bgTexture = ProgressManager.getLastUnlockedBackground(this.lessonStats, CHAPTERS);
        } else {
            const chapter = getChapterForLesson(this.currentLessonIndex);
            bgTexture = getChapterBgKey(chapter);
        }

        // Monkey skin follows equipped setting
        let monkeyTexture = equipped.monkey;
        if (monkeyTexture === 'random') {
            const unlockedMonkeys = UNLOCK_THRESHOLDS
                .map((threshold, i) => this.score >= threshold ? `monkey_${i + 1}` : null)
                .filter(Boolean);
            monkeyTexture = Phaser.Math.RND.pick(unlockedMonkeys) || 'monkey_1';
        }

        ensureTextures(this, [
            { key: bgTexture,     url: `assets/${bgTexture}.jpg` },
            { key: monkeyTexture, url: `assets/${monkeyTexture}.png` }
        ], () => {
            if (this.bgImage) this.bgImage.setTexture(bgTexture);
            if (this.monkey)  this.monkey.setTexture(monkeyTexture);
        });
    }

    showWord() {
        let wordData;
        if (this.isDailyChallenge) {
            wordData = this.dailyWords[this.currentWordIndex];
        } else {
            const lesson = this.gameData.lessons[this.currentLessonIndex];
            wordData = lesson.content[this.currentWordIndex];
        }
        this.targetWord = wordData.display;
        this.targetKeys = wordData.keys;

        this.typingBox.setTargetText(this.targetWord);
        this.typingBox.setTypedText('');
        this.telexEngine.clear();
        this.typingBox.setRuleHint('Gõ: ' + wordData.keys);
        this.highlightNextKey();
    }

    handleSuccess() {
        this.sound.play('win_sound');

        const multiplier = this.combo.onSuccess();
        this.score += multiplier;
        
        const totalWords = this.isDailyChallenge 
            ? this.dailyWords.length 
            : this.gameData.lessons[this.currentLessonIndex].content.length;

        if (this.isDailyChallenge) {
            this.hud.updateProgress(-1, 0, this.score, this.currentWordIndex + 1, this.dailyWords.length);
        } else {
            this.hud.updateProgress(this.currentLessonIndex, this.gameData.lessons.length, this.score);
        }
        
        this.combo.checkMilestone(this);
        if (multiplier >= 2) this.combo.showPopup(this, multiplier);

        // Kích hoạt tương tác gõ đúng trong Minigame
        if (this.minigame) {
            this.minigame.onWordComplete(this.targetWord, this.currentWordIndex + 1, totalWords);
        }

        const targetSprite = this.minigame ? 
            (this.minigame.playerContainer || this.minigame.containerSprite || this.minigame.finishedSprite || this.monkey) 
            : this.monkey;

        this.tweens.add({
            targets: targetSprite,
            y: targetSprite.y - 30,
            duration: 200, yoyo: true, ease: 'Power2',
            onComplete: () => this.nextWord()
        });

        showScorePopup(this, targetSprite, multiplier);
        showBananaDrop(this, targetSprite);
    }

    handleFail() {
        this.sound.play('error_sound');
        this.cameras.main.shake(200, 0.01);
        this.monkey.setTint(0xff0000);
        this.time.delayedCall(200, () => this.monkey.clearTint());
        this.combo.onFail();

        if (this.minigame) {
            this.minigame.onTypeError();
        }
    }

    nextWord() {
        this.currentWordIndex++;
        const totalWords = this.isDailyChallenge ? this.dailyWords.length : this.gameData.lessons[this.currentLessonIndex].content.length;

        if (this.currentWordIndex >= totalWords) {
            this.lessonEndTime = Date.now();
            this.showLessonComplete();
            return;
        }

        this.showWord();
    }

    // ── Lesson complete ───────────────────────────────────────────

    _saveProgressAndCheckAchievements(stars, wpm, accuracy) {
        const total = this.totalKeysInLesson || 1;
        let oldStats = { stars: 0, wpm: 0, accuracy: 0 };
        let dailyBonusAwarded = false;

        if (this.isDailyChallenge) {
            const todayStr = ProgressManager._toDateStr(new Date());
            const progressObj = ProgressManager.loadProgress(this.gameData.lessons.length);

            if (progressObj.dailyChallengeDate !== todayStr) {
                this.score += 20;
                dailyBonusAwarded = true;
                ProgressManager.saveProgress(
                    this.currentLessonIndex, this.score,
                    this.lessonStats, this.unlockedAchievements, this.consecutivePerfects,
                    todayStr
                );
            }
        } else {
            ProgressManager.saveHistory({
                lessonIndex: this.currentLessonIndex, wpm, accuracy, stars, timestamp: Date.now()
            });

            oldStats = { ... (this.lessonStats[this.currentLessonIndex] || { stars: 0, wpm: 0, accuracy: 0 }) };
            this.lessonStats[this.currentLessonIndex] = {
                stars:    Math.max(oldStats.stars    || 0, stars),
                wpm:      Math.max(oldStats.wpm      || 0, wpm),
                accuracy: Math.max(oldStats.accuracy || 0, accuracy),
                timestamp: Date.now()
            };

            if (accuracy === 100) { this.consecutivePerfects++; }
            else                  { this.consecutivePerfects = 0; }

            const sessionData = {
                lessonIndex: this.currentLessonIndex, stars, wpm, accuracy,
                totalKeys: total, timeOfCompletion: new Date()
            };
            const progress = {
                lessonStats:          this.lessonStats,
                unlockedAchievements: this.unlockedAchievements,
                consecutivePerfects:  this.consecutivePerfects,
                streakDays:           this.streakDays,
                score:                this.score
            };

            const newlyUnlocked = AchievementManager.checkAchievements(sessionData, progress, oldStats);
            if (newlyUnlocked.length > 0) {
                this.unlockedAchievements.push(...newlyUnlocked);
                newlyUnlocked.forEach(id => AchievementToast.show(this, id));
            }

            ProgressManager.saveProgress(
                this.currentLessonIndex, this.score,
                this.lessonStats, this.unlockedAchievements, this.consecutivePerfects
            );
        }

        return { oldStats, dailyBonusAwarded };
    }

    showLessonComplete() {
        AudioManager.playJingle(this, 'level_sound', this.currentLessonIndex, true);
        this.input.keyboard.off('keydown', this.handleKeyDown, this);

        const { streakDays: newStreakDays, isNewStreakDay } = ProgressManager.checkAndUpdateStreak();
        this.streakDays = newStreakDays;

        const total        = this.totalKeysInLesson || 1;
        const accuracy     = Math.round((total / (total + this.errorsInLesson)) * 100);
        const durationMin  = (this.lessonEndTime - this.lessonStartTime) / 60000;
        const wpm          = Math.round((total / 5) / durationMin) || 0;
        const isLastLesson = this.currentLessonIndex === this.gameData.lessons.length - 1;

        const stars = accuracy >= 95 ? 3 : (accuracy >= 80 ? 2 : 1);

        const { oldStats, dailyBonusAwarded } = this._saveProgressAndCheckAchievements(stars, wpm, accuracy);

        // Dọn dẹp minigame khi kết thúc bài
        if (this.minigame) {
            this.minigame.destroy();
            this.minigame = null;
        }

        const isFirstTime = !this.isDailyChallenge && (!oldStats || oldStats.stars === 0);
        const storyModeEnabled = ProgressManager.getStoryMode();
        const storyConfig = storyModeEnabled ? STORY_CONFIGS[this.currentLessonIndex] : null;

        const proceedToResults = () => {
            const cleanUp = () => {
                this.input.keyboard.off('keyup-SPACE',  handleContinue);
                this.input.keyboard.off('keyup-ENTER',  handleRetry);
                this.input.keyboard.off('keydown-ESC',  handleBackToMap);
            };

            const showStreakVisual = () => { if (isNewStreakDay) this.hud.showStreak(newStreakDays); };

            const handleContinue = () => {
                if (!isLastLesson && !this.isDailyChallenge) {
                    cleanUp(); overlay.destroy();
                    showStreakVisual();
                    
                    const nextIndex = this.currentLessonIndex + 1;
                    ProgressManager.saveProgress(
                        nextIndex, this.score,
                        this.lessonStats, this.unlockedAchievements, this.consecutivePerfects
                    );

                    const isNextBoss = (nextIndex % 14 === 13);
                    const isNewChapter = (nextIndex % 14 === 0);

                    if (isNewChapter) {
                        this.scene.start('ChapterIntroScene', { lessonIndex: nextIndex });
                    } else if (isNextBoss) {
                        this.scene.start('BossScene', { lessonIndex: nextIndex });
                    } else {
                        this.input.keyboard.on('keydown', this.handleKeyDown, this);
                        this.currentLessonIndex = nextIndex;
                        this.startLesson();
                    }
                }
            };

            const handleRetry = () => {
                cleanUp(); overlay.destroy();
                showStreakVisual();
                this.input.keyboard.on('keydown', this.handleKeyDown, this);
                this.startLesson();
            };

            const handleBackToMap = () => {
                cleanUp(); overlay.destroy();
                showStreakVisual();
                this.scene.start('MapScene');
            };

            let overlay = null;

            const showResultOverlay = () => {
                overlay = new ResultOverlay(this, accuracy, wpm, isLastLesson || this.isDailyChallenge, handleBackToMap, oldStats, this.isDailyChallenge, null, dailyBonusAwarded);

                this.input.keyboard.once('keyup-SPACE',  handleContinue);
                this.input.keyboard.once('keyup-ENTER',  handleRetry);
                this.input.keyboard.once('keydown-ESC',  handleBackToMap);

                overlay.on('continue', () => { cleanUp(); handleContinue(); });
                overlay.on('retry',    () => { cleanUp(); handleRetry(); });
            };

            if (isFirstTime) {
                new SpinWheelOverlay(this, (reward) => {
                    if (reward.bananas > 0) {
                        this.score += reward.bananas;
                        ProgressManager.saveProgress(
                            this.currentLessonIndex, this.score,
                            this.lessonStats, this.unlockedAchievements, this.consecutivePerfects
                        );
                    }
                    showResultOverlay();
                });
            } else {
                showResultOverlay();
            }
        };

        if (storyConfig && storyConfig.postGame) {
            new StoryDialogOverlay(this, storyConfig.postGame, () => {
                proceedToResults();
            });
        } else {
            proceedToResults();
        }
    }
}
