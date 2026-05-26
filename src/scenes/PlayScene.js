import * as Phaser from 'phaser';
import { TelexEngine }           from '../utils/TelexEngine';
import { VirtualKeyboard }       from '../components/VirtualKeyboard';
import { ConfirmDialog }         from '../components/ConfirmDialog';
import { ResultOverlay }         from '../components/ResultOverlay';
import { ProgressManager, UNLOCK_THRESHOLDS } from '../utils/ProgressManager';
import { TypingValidator }       from '../utils/TypingValidator';
import { AchievementManager }    from '../utils/AchievementManager';
import { AchievementToast }      from '../components/AchievementToast';
import { PlaySceneHUD }          from '../components/PlaySceneHUD';
import { ComboManager }          from '../components/ComboManager';
import { TypingBox }             from '../components/TypingBox';
import { getChapterForLesson, getChapterBgKey, CHAPTERS } from '../data/chapters';
import { ensureTextures } from '../utils/TextureLoader';

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
        this.showWord();
        
        if (this.isDailyChallenge) {
            this.hud.updateProgress(-1, 0, this.score, 0, this.dailyWords.length);
        } else {
            this.hud.updateProgress(this.currentLessonIndex, this.gameData.lessons.length, this.score);
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
        
        if (this.isDailyChallenge) {
            this.hud.updateProgress(-1, 0, this.score, this.currentWordIndex + 1, this.dailyWords.length);
        } else {
            this.hud.updateProgress(this.currentLessonIndex, this.gameData.lessons.length, this.score);
        }
        
        this.combo.checkMilestone(this);
        if (multiplier >= 2) this.combo.showPopup(this, multiplier);

        this.tweens.add({
            targets: this.monkey,
            y: this.monkey.y - 50,
            duration: 200, yoyo: true, ease: 'Power2',
            onComplete: () => this.nextWord()
        });

        const { width } = this.scale;
        const popupColor = multiplier >= 4 ? '#C084FC'
                         : multiplier >= 3 ? '#F87171'
                         : multiplier >= 2 ? '#FCD34D' : '#86EFAC';
        const scorePopup = this.add.text(
            this.monkey.x + Phaser.Math.Between(-20, 20),
            this.monkey.y - 80,
            `+${multiplier} 🍌`,
            { fontFamily: 'Arial Black, Arial, Segoe UI Emoji',
              fontSize: multiplier >= 4 ? '72px' : multiplier >= 3 ? '60px' : multiplier >= 2 ? '50px' : '38px',
              fontStyle: 'bold', fill: popupColor, stroke: '#000000', strokeThickness: 8 }
        ).setOrigin(0.5).setScale(0.2).setAlpha(0).setDepth(15);

        this.tweens.add({
            targets: scorePopup,
            scaleX: 1.1,
            scaleY: 1.1,
            alpha: 1,
            y: this.monkey.y - 120,
            duration: 250,
            ease: 'Back.easeOut',
            onComplete: () => {
                this.tweens.add({
                    targets: scorePopup,
                    y: scorePopup.y - 50,
                    alpha: 0,
                    duration: 500,
                    delay: 150,
                    ease: 'Cubic.easeIn',
                    onComplete: () => scorePopup.destroy()
                });
            }
        });

        const banana = this.add.image(this.monkey.x, 0, 'banana').setScale(0.3);
        this.tweens.add({
            targets: banana,
            y: this.monkey.y,
            duration: 500,
            ease: 'Cubic.easeIn',
            onComplete: () => {
                this.tweens.add({
                    targets: banana,
                    scaleX: 0,
                    scaleY: 0,
                    alpha: 0,
                    duration: 150,
                    onComplete: () => banana.destroy()
                });
            }
        });
    }

    handleFail() {
        this.sound.play('error_sound');
        this.cameras.main.shake(200, 0.01);
        this.monkey.setTint(0xff0000);
        this.time.delayedCall(200, () => this.monkey.clearTint());
        this.combo.onFail();
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
        if (this.cache.audio.exists('level_sound')) this.sound.play('level_sound');
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
                this.input.keyboard.on('keydown', this.handleKeyDown, this);
                this.currentLessonIndex++;
                ProgressManager.saveProgress(
                    this.currentLessonIndex, this.score,
                    this.lessonStats, this.unlockedAchievements, this.consecutivePerfects
                );
                this.startLesson();
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

        const overlay = new ResultOverlay(this, accuracy, wpm, isLastLesson || this.isDailyChallenge, handleBackToMap, oldStats, this.isDailyChallenge, null, dailyBonusAwarded);

        this.input.keyboard.once('keyup-SPACE',  handleContinue);
        this.input.keyboard.once('keyup-ENTER',  handleRetry);
        this.input.keyboard.once('keydown-ESC',  handleBackToMap);

        overlay.on('continue', () => { cleanUp(); handleContinue(); });
        overlay.on('retry',    () => { cleanUp(); handleRetry(); });
    }
}
