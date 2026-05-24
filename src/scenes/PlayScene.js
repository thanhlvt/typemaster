import * as Phaser from 'phaser';
import { TelexEngine } from '../utils/TelexEngine';
import { VirtualKeyboard } from '../components/VirtualKeyboard';
import { ConfirmDialog } from '../components/ConfirmDialog';
import { ResultOverlay } from '../components/ResultOverlay';
import { ProgressManager } from '../utils/ProgressManager';
import { TypingValidator } from '../utils/TypingValidator';
import { AchievementManager } from '../utils/AchievementManager';
import { AchievementToast } from '../components/AchievementToast';

export class PlayScene extends Phaser.Scene {
    constructor() {
        super('PlayScene');
    }

    init(data) {
        this.data = this.cache.json.get('gameData');
        this.currentLessonIndex = 0;
        this.currentWordIndex = 0;
        this.telexEngine = new TelexEngine(this.data.telex_rules);
        this.score = 0;
        
        const progress = ProgressManager.loadProgress(this.data.lessons.length);
        this.currentLessonIndex = progress.lessonIndex;
        this.score = progress.score;
        this.lessonStats = progress.lessonStats || {};
        this.unlockedAchievements = progress.unlockedAchievements || [];
        this.consecutivePerfects = progress.consecutivePerfects || 0;
        this.streakDays = progress.streakDays;

        if (data && data.lessonIndex !== undefined) {
            this.currentLessonIndex = data.lessonIndex;
        }
    }

    create() {
        const { width, height } = this.scale;

        this.bgImage = this.add.image(width / 2, height / 2, 'bg_1').setDisplaySize(width, height);

        this.monkey = this.add.sprite(width / 2, height * 0.4, 'monkey_1').setScale(0.5);

        this.createContentUI(width, height);
        this.virtualKeyboard = new VirtualKeyboard(this, 0, 0);

        this.input.keyboard.on('keydown', this.handleKeyDown, this);

        // Overall progress elements
        this.progressText = this.add.text(20, 20, '', {
            fontFamily: 'Arial',
            fontSize: '24px',
            fontStyle: 'bold',
            fill: '#FFF',
            stroke: '#000',
            strokeThickness: 4
        });

        this.progressBarBg = this.add.graphics();
        this.progressBarFill = this.add.graphics();

        this.scoreText = this.add.text(20, 72, '', {
            fontFamily: 'Arial',
            fontSize: '20px',
            fontStyle: 'bold',
            fill: '#FBBF24',
            stroke: '#000',
            strokeThickness: 3
        });

        // Add Streak Text
        this.streakText = this.add.text(width / 2, 40, '🔥 ' + this.streakDays + ' ngày', {
            fontFamily: 'Arial',
            fontSize: '32px',
            fontStyle: 'bold',
            fill: '#FF9800',
            stroke: '#000',
            strokeThickness: 4
        }).setOrigin(0.5);
        
        if (this.streakDays === 0) {
            this.streakText.setVisible(false);
        }

        this._createResetButton(width);
        this._createMapButton(width);
        this.startLesson();

        // AudioContext resume on interaction
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
        this.currentLessonIndex = 0;
        this.currentWordIndex = 0;
        this.score = 0;
        this.streakDays = 0;
        this.lessonStats = {};
        this.unlockedAchievements = [];
        this.consecutivePerfects = 0;
        if (this.streakText) {
            this.streakText.setText('🔥 0 ngày');
            this.streakText.setVisible(false);
        }
        this.monkey.y = this.scale.height * 0.4;
        this.input.keyboard.enabled = true;
        this.startLesson();
    }

    // ── Reset & Map buttons ────────────────────────────────────────

    _createResetButton(width) {
        const btnW = 94, btnH = 36;
        const x = width - btnW / 2 - 12;
        const y = 24;

        const bg = this.add.graphics();
        const drawBg = (color) => {
            bg.clear();
            bg.fillStyle(color, 0.85);
            bg.fillRoundedRect(x - btnW / 2, y - btnH / 2, btnW, btnH, 18);
        };
        drawBg(0x8B0000);

        this.add.text(x, y, '↺  Reset', {
            fontFamily: 'Arial', fontSize: '16px', fill: '#FFF'
        }).setOrigin(0.5);

        const zone = this.add.zone(x, y, btnW, btnH).setInteractive({ useHandCursor: true });
        zone.on('pointerover', () => drawBg(0xC62828));
        zone.on('pointerout', () => drawBg(0x8B0000));
        zone.on('pointerdown', () => this.showResetConfirm());
    }

    _createMapButton(width) {
        const btnW = 94, btnH = 36;
        const x = width - btnW - 16 - btnW / 2; // width - 94 - 16 - 47 = width - 157
        const y = 24;

        const bg = this.add.graphics();
        const drawBg = (color) => {
            bg.clear();
            bg.fillStyle(color, 0.85);
            bg.fillRoundedRect(x - btnW / 2, y - btnH / 2, btnW, btnH, 18);
            bg.lineStyle(1.5, 0xffffff, 0.2);
            bg.strokeRoundedRect(x - btnW / 2, y - btnH / 2, btnW, btnH, 18);
        };
        drawBg(0x1565C0); // Dark Blue

        this.add.text(x, y, '🗺️  Bản đồ', {
            fontFamily: 'Arial', fontSize: '15px', fontStyle: 'bold', fill: '#FFF'
        }).setOrigin(0.5);

        const zone = this.add.zone(x, y, btnW, btnH).setInteractive({ useHandCursor: true });
        zone.on('pointerover', () => drawBg(0x1E88E5));
        zone.on('pointerout', () => drawBg(0x1565C0));
        zone.on('pointerdown', () => {
            this.sound.play('key_sound');
            this.scene.start('MapScene');
        });
    }

    showResetConfirm() {
        this.input.keyboard.enabled = false;
        new ConfirmDialog(this, () => {
            this._doReset();
        }).on('destroy', () => {
            this.input.keyboard.enabled = true;
        });
    }

    // ── UI ─────────────────────────────────────────────────────────

    createContentUI(width, height) {
        const bgTop = height * 0.52;
        const bgHeight = height * 0.22;

        const bg = this.add.graphics();
        bg.fillStyle(0xffffff, 0.8);
        bg.fillRoundedRect(width * 0.02, bgTop, width * 0.96, bgHeight, 20);

        this.targetText = this.add.text(width / 2, bgTop + bgHeight * 0.18, '', {
            fontFamily: 'Verdana, sans-serif',
            fontSize: '48px',
            fontStyle: 'bold',
            fill: '#333'
        }).setOrigin(0.5);

        this.ruleHint = this.add.text(width / 2, bgTop + bgHeight * 0.46, '', {
            fontFamily: 'Arial',
            fontSize: '24px',
            fontStyle: 'bold',
            fill: '#E65100'
        }).setOrigin(0.5);

        this.typedText = this.add.text(width / 2, bgTop + bgHeight * 0.70, '', {
            fontFamily: 'Verdana, sans-serif',
            fontSize: '44px',
            fontStyle: 'bold',
            fill: '#2E7D32'
        }).setOrigin(0.5);
    }

    // ── Keyboard logic ─────────────────────────────────────────────

    _resetKeys() {
        this.virtualKeyboard.resetKeys();
    }

    highlightNextKey() {
        const rawBuffer = this.telexEngine.getRawBuffer();
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

    // ── Lesson flow ────────────────────────────────────────────────

    startLesson() {
        this.currentWordIndex = 0;
        this.errorsInLesson = 0;
        this.lessonStartTime = Date.now();

        const lesson = this.data.lessons[this.currentLessonIndex];
        this.totalKeysInLesson = lesson.content.reduce((sum, item) => sum + item.keys.length, 0);

        const randomBg = Phaser.Math.Between(1, 10);
        const randomMonkey = Phaser.Math.Between(1, 10);

        if (this.bgImage) this.bgImage.setTexture(`bg_${randomBg}`);
        if (this.monkey) this.monkey.setTexture(`monkey_${randomMonkey}`);

        this.showWord();
        this._updateProgressBar();
    }

    showWord() {
        const lesson = this.data.lessons[this.currentLessonIndex];
        const wordData = lesson.content[this.currentWordIndex];
        this.targetWord = wordData.display;
        this.targetKeys = wordData.keys;

        this.targetText.setText(this.targetWord);
        this.typedText.setText('');
        this.telexEngine.clear();
        this.ruleHint.setText('Gõ: ' + wordData.keys);

        this.highlightNextKey();
    }

    handleKeyDown(event) {
        const key = event.key.toLowerCase();
        if (!/^[a-z ]$/.test(key)) return;

        const rawBuffer = this.telexEngine.getRawBuffer();

        if (TypingValidator.isPossible(rawBuffer + key, this.targetKeys, this.targetWord, this.telexEngine)) {
            const vietnameseBuffer = this.telexEngine.processKey(key);
            this.sound.play('key_sound');
            this.updateDisplayText(vietnameseBuffer);
            this.highlightNextKey();

            if (TypingValidator.normalizeForMatch(vietnameseBuffer) === TypingValidator.normalizeForMatch(this.targetWord)) {
                this.handleSuccess();
            }
        } else {
            this.errorsInLesson++;
            this.handleFail();
        }
    }

    updateDisplayText(vietnameseBuffer) {
        this.typedText.setText(vietnameseBuffer);
    }

    handleSuccess() {
        this.sound.play('win_sound');
        this.score++;
        this._updateProgressBar();

        this.tweens.add({
            targets: this.monkey,
            y: this.monkey.y - 50,
            duration: 200,
            yoyo: true,
            ease: 'Power2',
            onComplete: () => this.nextWord()
        });

        const banana = this.add.image(this.monkey.x, 0, 'banana').setScale(0.3);
        this.tweens.add({
            targets: banana,
            y: this.monkey.y,
            alpha: 0,
            duration: 500,
            onComplete: () => banana.destroy()
        });
    }

    handleFail() {
        this.sound.play('error_sound');
        this.cameras.main.shake(200, 0.01);
        this.monkey.setTint(0xff0000);
        this.time.delayedCall(200, () => this.monkey.clearTint());
    }

    nextWord() {
        this.currentWordIndex++;
        const lesson = this.data.lessons[this.currentLessonIndex];

        if (this.currentWordIndex >= lesson.content.length) {
            this.lessonEndTime = Date.now();
            this.showLessonComplete();
            return;
        }

        this.showWord();
    }

    // ── Lesson complete overlay ────────────────────────────────────

    showLessonComplete() {
        this.sound.play('level_sound');
        this.input.keyboard.off('keydown', this.handleKeyDown, this);
        const total = this.totalKeysInLesson || 1;
        const accuracy = Math.round((total / (total + this.errorsInLesson)) * 100);
        const durationMin = (this.lessonEndTime - this.lessonStartTime) / 60000;
        const wpm = Math.round((total / 5) / durationMin) || 0;
        const isLastLesson = this.currentLessonIndex === this.data.lessons.length - 1;

        // Calculate and update stars/stats
        const stars = accuracy >= 95 ? 3 : (accuracy >= 80 ? 2 : 1);
        const oldStats = this.lessonStats[this.currentLessonIndex] || { stars: 0, wpm: 0, accuracy: 0 };
        
        // Update lesson stats preserving personal bests
        this.lessonStats[this.currentLessonIndex] = {
            stars: Math.max(oldStats.stars || 0, stars),
            wpm: Math.max(oldStats.wpm || 0, wpm),
            accuracy: Math.max(oldStats.accuracy || 0, accuracy)
        };

        // Update consecutive perfects
        if (accuracy === 100) {
            this.consecutivePerfects++;
        } else {
            this.consecutivePerfects = 0;
        }

        // Verify and trigger new achievements
        const sessionData = {
            lessonIndex: this.currentLessonIndex,
            stars: stars,
            wpm: wpm,
            accuracy: accuracy,
            totalKeys: total,
            timeOfCompletion: new Date()
        };
        const progress = {
            lessonStats: this.lessonStats,
            unlockedAchievements: this.unlockedAchievements,
            consecutivePerfects: this.consecutivePerfects,
            streakDays: this.streakDays,
            score: this.score
        };

        const newlyUnlocked = AchievementManager.checkAchievements(sessionData, progress, oldStats);
        if (newlyUnlocked.length > 0) {
            this.unlockedAchievements.push(...newlyUnlocked);
            newlyUnlocked.forEach(id => {
                AchievementToast.show(this, id);
            });
        }

        ProgressManager.saveProgress(
            this.currentLessonIndex,
            this.score,
            this.lessonStats,
            this.unlockedAchievements,
            this.consecutivePerfects
        );

        const handleCleanUpListeners = () => {
            this.input.keyboard.off('keyup-SPACE', handleContinue);
            this.input.keyboard.off('keyup-ENTER', handleRetry);
            this.input.keyboard.off('keyup-ESC', handleBackToMap);
        };

        const handleContinue = () => {
            if (!isLastLesson) {
                handleCleanUpListeners();
                overlay.destroy();
                this._checkAndUpdateStreak();
                this.input.keyboard.on('keydown', this.handleKeyDown, this);
                this.currentLessonIndex++;
                ProgressManager.saveProgress(
                    this.currentLessonIndex,
                    this.score,
                    this.lessonStats,
                    this.unlockedAchievements,
                    this.consecutivePerfects
                );
                this.startLesson();
            }
        };

        const handleRetry = () => {
            handleCleanUpListeners();
            overlay.destroy();
            this._checkAndUpdateStreak();
            this.input.keyboard.on('keydown', this.handleKeyDown, this);
            this.startLesson();
        };

        const handleBackToMap = () => {
            handleCleanUpListeners();
            overlay.destroy();
            this._checkAndUpdateStreak();
            this.scene.start('MapScene');
        };

        const overlay = new ResultOverlay(this, accuracy, wpm, isLastLesson, handleBackToMap);

        this.input.keyboard.once('keyup-SPACE', handleContinue);
        this.input.keyboard.once('keyup-ENTER', handleRetry);
        this.input.keyboard.once('keyup-ESC', handleBackToMap);

        overlay.on('continue', () => {
            handleCleanUpListeners();
            handleContinue();
        });

        overlay.on('retry', () => {
            handleCleanUpListeners();
            handleRetry();
        });
    }

    // ── Streak logic helper ───────────────────────────────────────
    
    _checkAndUpdateStreak() {
        const { streakDays, isNewStreakDay } = ProgressManager.checkAndUpdateStreak();
        this.streakDays = streakDays;
        
        if (isNewStreakDay) {
            this.streakText.setText('🔥 ' + this.streakDays + ' ngày');
            this.streakText.setVisible(true);
            
            // Animation for streak text
            this.tweens.add({
                targets: this.streakText,
                scaleX: 1.5,
                scaleY: 1.5,
                angle: 15,
                duration: 300,
                yoyo: true,
                ease: 'Back.easeOut'
            });
            
            // Celebration particles
            for (let i = 0; i < 8; i++) {
                const p = this.add.image(this.streakText.x, this.streakText.y, 'banana').setScale(0.15);
                const angle = (i / 8) * Math.PI * 2;
                this.tweens.add({
                    targets: p,
                    x: p.x + Math.cos(angle) * 80,
                    y: p.y + Math.sin(angle) * 80,
                    alpha: 0,
                    angle: 360,
                    duration: 800,
                    ease: 'Cubic.easeOut',
                    onComplete: () => p.destroy()
                });
            }
        }
    }

    _updateProgressBar() {
        const current = this.currentLessonIndex + 1;
        const total = this.data.lessons.length;
        
        this.progressText.setText(`Bài ${current}/${total}`);
        this.scoreText.setText(`🍌 Chuối: ${this.score}`);

        const barWidth = 200;
        const barHeight = 10;
        const x = 20;
        const y = 52;

        this.progressBarBg.clear();
        this.progressBarBg.fillStyle(0x334155, 0.8);
        this.progressBarBg.fillRoundedRect(x, y, barWidth, barHeight, 5);
        this.progressBarBg.lineStyle(1.5, 0x475569, 1);
        this.progressBarBg.strokeRoundedRect(x, y, barWidth, barHeight, 5);

        const progressPercent = current / total;
        const fillWidth = barWidth * progressPercent;

        this.progressBarFill.clear();
        this.progressBarFill.fillStyle(0x10B981, 1);
        this.progressBarFill.fillRoundedRect(x, y, fillWidth, barHeight, 5);
    }
}
