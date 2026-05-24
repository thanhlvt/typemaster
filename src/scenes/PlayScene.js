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

export class PlayScene extends Phaser.Scene {
    constructor() {
        super('PlayScene');
    }

    // ── Lifecycle ─────────────────────────────────────────────────

    init(data) {
        // Use gameData to avoid collision with Phaser's built-in Scene.data (DataManager)
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

        if (data && data.lessonIndex !== undefined) {
            this.currentLessonIndex = data.lessonIndex;
        }
    }

    create() {
        const { width, height } = this.scale;

        this.bgImage = this.add.image(width / 2, height / 2, 'bg_1').setDisplaySize(width, height);
        this.monkey  = this.add.sprite(width / 2, height * 0.4, 'monkey_1').setScale(0.5);

        this._createContentUI(width, height);
        this.virtualKeyboard = new VirtualKeyboard(this, 0, 0);

        this.hud   = new PlaySceneHUD(this);
        this.combo = new ComboManager();
        this.hud.initStreak(this.streakDays);

        this.input.keyboard.on('keydown', this.handleKeyDown, this);
        this.input.keyboard.addCapture(Phaser.Input.Keyboard.KeyCodes.ESC);
        this.events.once('shutdown', () => {
            this.input.keyboard.removeCapture(Phaser.Input.Keyboard.KeyCodes.ESC);
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

    // ── Content UI ────────────────────────────────────────────────

    _createContentUI(width, height) {
        const bgTop    = height * 0.52;
        const bgHeight = height * 0.22;

        const bg = this.add.graphics();
        bg.fillStyle(0xffffff, 0.8);
        bg.fillRoundedRect(width * 0.02, bgTop, width * 0.96, bgHeight, 20);

        this.targetText = this.add.text(width / 2, bgTop + bgHeight * 0.18, '', {
            fontFamily: 'Verdana, sans-serif',
            fontSize: '48px', fontStyle: 'bold', fill: '#333'
        }).setOrigin(0.5);

        this.ruleHint = this.add.text(width / 2, bgTop + bgHeight * 0.46, '', {
            fontFamily: 'Arial',
            fontSize: '24px', fontStyle: 'bold', fill: '#E65100'
        }).setOrigin(0.5);

        this.typedText = this.add.text(width / 2, bgTop + bgHeight * 0.70, '', {
            fontFamily: 'Verdana, sans-serif',
            fontSize: '44px', fontStyle: 'bold', fill: '#2E7D32'
        }).setOrigin(0.5);
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
            this.typedText.setText(vietnameseBuffer);
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
        // combo intentionally NOT reset here — persists across lessons

        const lesson = this.gameData.lessons[this.currentLessonIndex];
        this.totalKeysInLesson = lesson.content.reduce((sum, item) => sum + item.keys.length, 0);

        this._applySkins();
        this.showWord();
        this.hud.updateProgress(this.currentLessonIndex, this.gameData.lessons.length, this.score);
    }

    _applySkins() {
        const equipped = ProgressManager.getEquippedSkins();

        let bgTexture = equipped.background;
        if (bgTexture === 'random') {
            const unlockedBgs = UNLOCK_THRESHOLDS
                .map((threshold, i) => this.score >= threshold ? `bg_${i + 1}` : null)
                .filter(Boolean);
            bgTexture = Phaser.Math.RND.pick(unlockedBgs) || 'bg_1';
        }

        let monkeyTexture = equipped.monkey;
        if (monkeyTexture === 'random') {
            const unlockedMonkeys = UNLOCK_THRESHOLDS
                .map((threshold, i) => this.score >= threshold ? `monkey_${i + 1}` : null)
                .filter(Boolean);
            monkeyTexture = Phaser.Math.RND.pick(unlockedMonkeys) || 'monkey_1';
        }

        if (this.bgImage) this.bgImage.setTexture(bgTexture);
        if (this.monkey)  this.monkey.setTexture(monkeyTexture);
    }

    showWord() {
        const lesson   = this.gameData.lessons[this.currentLessonIndex];
        const wordData = lesson.content[this.currentWordIndex];
        this.targetWord = wordData.display;
        this.targetKeys = wordData.keys;

        this.targetText.setText(this.targetWord);
        this.typedText.setText('');
        this.telexEngine.clear();
        this.ruleHint.setText('Gõ: ' + wordData.keys);
        this.highlightNextKey();
    }

    handleSuccess() {
        this.sound.play('win_sound');

        const multiplier = this.combo.onSuccess();
        this.score += multiplier;
        this.hud.updateProgress(this.currentLessonIndex, this.gameData.lessons.length, this.score);
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
            width / 2 + Phaser.Math.Between(-40, 40),
            this.monkey.y - 60,
            `+${multiplier}`,
            { fontFamily: 'Arial', fontSize: multiplier > 1 ? '28px' : '22px',
              fontStyle: 'bold', fill: popupColor, stroke: '#000', strokeThickness: 3 }
        ).setOrigin(0.5);
        this.tweens.add({
            targets: scorePopup, y: scorePopup.y - 70, alpha: 0,
            duration: 700, ease: 'Cubic.easeOut',
            onComplete: () => scorePopup.destroy()
        });

        const banana = this.add.image(this.monkey.x, 0, 'banana').setScale(0.3);
        this.tweens.add({
            targets: banana, y: this.monkey.y, alpha: 0, duration: 500,
            onComplete: () => banana.destroy()
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
        const lesson = this.gameData.lessons[this.currentLessonIndex];

        if (this.currentWordIndex >= lesson.content.length) {
            this.lessonEndTime = Date.now();
            this.showLessonComplete();
            return;
        }

        this.showWord();
    }

    // ── Lesson complete ───────────────────────────────────────────

    showLessonComplete() {
        this.sound.play('level_sound');
        this.input.keyboard.off('keydown', this.handleKeyDown, this);

        // Update streak data immediately so achievement check gets the correct value.
        // The visual animation is deferred until the user dismisses the overlay.
        const { streakDays: newStreakDays, isNewStreakDay } = ProgressManager.checkAndUpdateStreak();
        this.streakDays = newStreakDays;

        const total        = this.totalKeysInLesson || 1;
        const accuracy     = Math.round((total / (total + this.errorsInLesson)) * 100);
        const durationMin  = (this.lessonEndTime - this.lessonStartTime) / 60000;
        const wpm          = Math.round((total / 5) / durationMin) || 0;
        const isLastLesson = this.currentLessonIndex === this.gameData.lessons.length - 1;

        const stars = accuracy >= 95 ? 3 : (accuracy >= 80 ? 2 : 1);

        ProgressManager.saveHistory({
            lessonIndex: this.currentLessonIndex, wpm, accuracy, stars, timestamp: Date.now()
        });

        const oldStats = this.lessonStats[this.currentLessonIndex] || { stars: 0, wpm: 0, accuracy: 0 };
        this.lessonStats[this.currentLessonIndex] = {
            stars:    Math.max(oldStats.stars    || 0, stars),
            wpm:      Math.max(oldStats.wpm      || 0, wpm),
            accuracy: Math.max(oldStats.accuracy || 0, accuracy)
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
            streakDays:           this.streakDays,   // accurate: updated above
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

        const cleanUp = () => {
            this.input.keyboard.off('keyup-SPACE',  handleContinue);
            this.input.keyboard.off('keyup-ENTER',  handleRetry);
            this.input.keyboard.off('keydown-ESC',  handleBackToMap);
        };

        // Show streak animation after overlay is dismissed so it's clearly visible
        const showStreakVisual = () => { if (isNewStreakDay) this.hud.showStreak(newStreakDays); };

        const handleContinue = () => {
            if (!isLastLesson) {
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

        const overlay = new ResultOverlay(this, accuracy, wpm, isLastLesson, handleBackToMap);

        this.input.keyboard.once('keyup-SPACE',  handleContinue);
        this.input.keyboard.once('keyup-ENTER',  handleRetry);
        this.input.keyboard.once('keydown-ESC',  handleBackToMap);

        overlay.on('continue', () => { cleanUp(); handleContinue(); });
        overlay.on('retry',    () => { cleanUp(); handleRetry(); });
    }
}
