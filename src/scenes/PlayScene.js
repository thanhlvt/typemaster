import * as Phaser from 'phaser';
import { TelexEngine }           from '../utils/TelexEngine';
import { VirtualKeyboard }       from '../components/VirtualKeyboard';
import { ConfirmDialog }         from '../components/ConfirmDialog';
import { ResultOverlay }         from '../components/ResultOverlay';
import { SpinWheelOverlay }      from '../components/SpinWheelOverlay';
import { AudioManager }          from '../utils/AudioManager';
import { ProgressManager, UNLOCK_THRESHOLDS } from '../utils/ProgressManager';
import { PlaySceneHUD }          from '../components/PlaySceneHUD';
import { ComboManager }          from '../components/ComboManager';
import { TypingBox }             from '../components/TypingBox';
import { getChapterForLesson, getChapterBgKey, CHAPTERS } from '../data/chapters';
import { ensureTextures }        from '../utils/TextureLoader';
import { showScorePopup, showBananaDrop } from '../utils/PlayScorePopup';
import { STORY_CONFIGS }         from '../data/story_configs';
import { MINIGAME_CONFIGS }      from '../data/minigame_configs';
import { StoryDialogOverlay }    from '../components/StoryDialogOverlay';
import { setupMinigameAndStart } from '../utils/MinigameLoader';
import { handleKeyDown, highlightNextKey } from '../utils/PlaySceneKeyboard';
import { showLessonComplete }    from '../utils/PlaySceneLessonComplete';

export class PlayScene extends Phaser.Scene {
    constructor() {
        super('PlayScene');
    }

    // ── Lifecycle ─────────────────────────────────────────────────

    init(data) {
        this.gameData           = this.cache.json.get('gameData');
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
            if (data.lessonIndex  !== undefined) this.currentLessonIndex = data.lessonIndex;
            if (data.isDailyChallenge !== undefined) this.isDailyChallenge = data.isDailyChallenge;
        }

        // Stable bound reference so we can add/remove the same listener correctly
        this._boundHandleKeyDown = (event) => handleKeyDown(this, event);
    }

    create() {
        const { width, height } = this.scale;

        this.bgImage = this.add.image(width / 2, height / 2, 'bg_1_1').setDisplaySize(width, height);
        this.monkey  = this.add.sprite(width / 2, height * 0.35, 'monkey_1').setScale(0.75);

        this.typingBox       = new TypingBox(this);
        this.virtualKeyboard = new VirtualKeyboard(this, 0, 0);
        this.hud             = new PlaySceneHUD(this);
        this.combo           = new ComboManager();
        this.hud.initStreak(this.streakDays);

        this.input.keyboard.on('keydown', this._boundHandleKeyDown);
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

    // ── Reset ─────────────────────────────────────────────────────

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

    // ── Lesson flow ───────────────────────────────────────────────

    startLesson() {
        if (this.minigame) {
            this.minigame.destroy();
            this.minigame = null;
        }

        this.currentWordIndex = 0;
        this.errorsInLesson   = 0;
        this.lessonStartTime  = Date.now();

        if (this.isDailyChallenge) {
            this._buildDailyWordList();
            this.hud.updateProgress(-1, 0, this.score, 0, this.dailyWords.length);
        } else {
            const lesson = this.gameData.lessons[this.currentLessonIndex];
            this.totalKeysInLesson = lesson.content.reduce((sum, item) => sum + item.keys.length, 0);
            this.hud.updateProgress(this.currentLessonIndex, this.gameData.lessons.length, this.score);
        }

        this._applySkins();

        // Dọn dẹp minigame cũ nếu còn sót
        if (this.minigame) {
            this.minigame.destroy();
            this.minigame = null;
        }

        const storyModeEnabled = ProgressManager.getStoryMode();
        const storyConfig      = storyModeEnabled ? STORY_CONFIGS[this.currentLessonIndex] : null;
        const minigameConfig   = MINIGAME_CONFIGS[this.currentLessonIndex];

        if (storyConfig && storyConfig.preGame) {
            this.input.keyboard.off('keydown', this._boundHandleKeyDown);
            this.monkey.setVisible(false);
            new StoryDialogOverlay(this, storyConfig.preGame, () => {
                this.input.keyboard.on('keydown', this._boundHandleKeyDown);
                this._setupMinigameAndStart(minigameConfig);
            });
        } else {
            this._setupMinigameAndStart(minigameConfig);
        }
    }

    _buildDailyWordList() {
        const today   = new Date();
        const seedNum = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
        const rnd     = new Phaser.Math.RandomDataGenerator([seedNum.toString()]);

        const progress = ProgressManager.loadProgress(this.gameData.lessons.length);
        const pool = [];
        for (let i = 0; i < this.gameData.lessons.length; i++) {
            const isUnlocked = (i === 0) || (progress.lessonStats[i - 1] && progress.lessonStats[i - 1].stars > 0);
            if (isUnlocked) pool.push(...this.gameData.lessons[i].content);
        }

        const shuffled = rnd.shuffle(pool);
        const count    = Math.min(shuffled.length, rnd.integerInRange(5, 8));
        this.dailyWords        = shuffled.slice(0, count);
        this.totalKeysInLesson = this.dailyWords.reduce((sum, item) => sum + item.keys.length, 0);
    }

    _setupMinigameAndStart(minigameConfig) {
        const totalWords = this.isDailyChallenge
            ? this.dailyWords.length
            : this.gameData.lessons[this.currentLessonIndex].content.length;

        setupMinigameAndStart(this, minigameConfig, totalWords, (minigame) => {
            this.minigame = minigame;
            this.showWord();
        });
    }

    _applySkins() {
        const equipped = ProgressManager.getEquippedSkins();

        let bgTexture;
        if (this.isDailyChallenge) {
            bgTexture = ProgressManager.getLastUnlockedBackground(this.lessonStats, CHAPTERS);
        } else {
            const chapter = getChapterForLesson(this.currentLessonIndex);
            bgTexture = getChapterBgKey(chapter);
        }

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

    // ── Word display ──────────────────────────────────────────────

    showWord() {
        const wordData = this.isDailyChallenge
            ? this.dailyWords[this.currentWordIndex]
            : this.gameData.lessons[this.currentLessonIndex].content[this.currentWordIndex];

        this.targetWord = wordData.display;
        this.targetKeys = wordData.keys;

        this.typingBox.setTargetText(this.targetWord);
        this.typingBox.setTypedText('');
        this.telexEngine.clear();
        this.typingBox.setRuleHint('Gõ: ' + wordData.keys);
        highlightNextKey(this);
    }

    // ── Typing callbacks ──────────────────────────────────────────

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

        const targetSprite = this.minigame
            ? (this.minigame.playerContainer || this.minigame.containerSprite || this.minigame.finishedSprite || this.monkey)
            : this.monkey;

        const isLastWord   = (this.currentWordIndex + 1 >= totalWords);
        if (isLastWord) {
            this.input.keyboard.off('keydown', this._boundHandleKeyDown);
        }
        let nextStepCalled = false;
        const triggerNext  = () => {
            if (nextStepCalled) return;
            nextStepCalled = true;
            this.nextWord();
        };

        if (this.minigame && isLastWord) {
            this.minigame.onWordComplete(this.targetWord, this.currentWordIndex + 1, totalWords, triggerNext);
            this.time.delayedCall(2000, triggerNext);
        } else {
            if (this.minigame) {
                this.minigame.onWordComplete(this.targetWord, this.currentWordIndex + 1, totalWords);
            }
            if (this.minigame && this.minigame.skipSuccessJump) {
                triggerNext();
            } else {
                this.tweens.add({
                    targets: targetSprite,
                    y: targetSprite.y - 30,
                    duration: 200, yoyo: true, ease: 'Power2',
                    onComplete: triggerNext
                });
            }
        }

        showScorePopup(this, targetSprite, multiplier);
        if (!this.minigame) showBananaDrop(this, targetSprite);
    }

    handleFail() {
        this.sound.play('error_sound');
        this.cameras.main.shake(200, 0.01);
        this.monkey.setTint(0xff0000);
        this.time.delayedCall(200, () => this.monkey.clearTint());
        this.combo.onFail();
        if (this.minigame) this.minigame.onTypeError();
    }

    nextWord() {
        this.currentWordIndex++;
        const totalWords = this.isDailyChallenge
            ? this.dailyWords.length
            : this.gameData.lessons[this.currentLessonIndex].content.length;

        if (this.currentWordIndex >= totalWords) {
            this.lessonEndTime = Date.now();
            this.showLessonComplete();
            return;
        }
        this.showWord();
    }

    // ── Lesson complete ───────────────────────────────────────────

    showLessonComplete() {
        showLessonComplete(this);
    }
}
