import * as Phaser from 'phaser';
import { TelexEngine }           from '../utils/TelexEngine';
import { VirtualKeyboard }       from '../components/VirtualKeyboard';
import { ProgressManager, UNLOCK_THRESHOLDS } from '../utils/ProgressManager';
import { TypingValidator }       from '../utils/TypingValidator';
import { CHAPTERS }              from '../data/chapters';
import { ResultOverlay }         from '../components/ResultOverlay';

export class SprintScene extends Phaser.Scene {
    constructor() {
        super('SprintScene');
    }

    init() {
        this.gameData = this.cache.json.get('gameData');
        this.telexEngine = new TelexEngine(this.gameData.telex_rules);
        
        const progress = ProgressManager.loadProgress(this.gameData.lessons.length);
        this.score                = progress.score;
        this.sprintHighScore      = progress.sprintHighScore || 0;
        this.lessonStats          = progress.lessonStats || {};
        this.currentLessonIndex   = progress.lessonIndex;
        this.unlockedAchievements = progress.unlockedAchievements || [];
        this.consecutivePerfects  = progress.consecutivePerfects  || 0;

        // Find unlocked pool of words
        const unlockedIndices = [];
        for (let i = 0; i < this.gameData.lessons.length; i++) {
            const isUnlocked = (i === 0) || (progress.lessonStats[i - 1] && progress.lessonStats[i - 1].stars > 0);
            if (isUnlocked) unlockedIndices.push(i);
        }
        this.wordPool = [];
        for (const idx of unlockedIndices) {
            this.wordPool.push(...this.gameData.lessons[idx].content);
        }

        this.correctKeystrokes = 0;
        this.errors = 0;
        this.timeLeft = 60;
        this.isActive = true;

        // Compute home screen background dynamically
        const equipped = ProgressManager.getEquippedSkins();
        const homeBackground = equipped.homeBackground || 'default';
        if (homeBackground === 'random') {
            const unlocked = ProgressManager.getUnlockedBackgrounds(this.lessonStats, CHAPTERS);
            this.bgTexture = Phaser.Math.RND.pick(unlocked);
        } else {
            this.bgTexture = ProgressManager.getLastUnlockedBackground(this.lessonStats, CHAPTERS);
        }
    }

    create() {
        const { width, height } = this.scale;

        this.bgImage = this.add.image(width / 2, height / 2, this.bgTexture).setDisplaySize(width, height);
        this.monkey = this.add.sprite(width / 2, height * 0.35, 'monkey_1').setScale(0.75);

        this._createContentUI(width, height);
        this._createHUD(width);
        
        this.virtualKeyboard = new VirtualKeyboard(this, 0, 0);

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

        this._applySkins();
        this.nextWord();

        // Start 60 seconds timer
        this.time.addEvent({
            delay: 1000,
            callback: this.tick,
            callbackScope: this,
            loop: true
        });
    }

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

    _createHUD(width) {
        // Top-left WPM indicator
        this.wpmText = this.add.text(20, 20, '⚡ 0 WPM', {
            fontFamily: 'Arial', fontSize: '24px', fontStyle: 'bold', fill: '#38BDF8',
            stroke: '#000', strokeThickness: 4
        });

        // Top-right High Score
        this.highScoreText = this.add.text(width - 250, 68, `Kỷ lục: ${this.sprintHighScore} WPM`, {
            fontFamily: 'Arial', fontSize: '18px', fontStyle: 'bold', fill: '#FBBF24',
            stroke: '#000', strokeThickness: 3
        });

        // Top-center Timer
        this.timerText = this.add.text(width / 2, 35, '⏱️ 60s', {
            fontFamily: 'Arial', fontSize: '36px', fontStyle: 'bold', fill: '#FF5252',
            stroke: '#000', strokeThickness: 4
        }).setOrigin(0.5);

        // Map Button
        const btnW = 94, btnH = 36;
        const mapX = width - btnW / 2 - 12;
        const mapY = 24;

        const mapBg = this.add.graphics();
        const drawMapBg = (color) => {
            mapBg.clear();
            mapBg.fillStyle(color, 0.85);
            mapBg.fillRoundedRect(mapX - btnW / 2, mapY - btnH / 2, btnW, btnH, 18);
            mapBg.lineStyle(1.5, 0xffffff, 0.2);
            mapBg.strokeRoundedRect(mapX - btnW / 2, mapY - btnH / 2, btnW, btnH, 18);
        };
        drawMapBg(0x1565C0);

        this.add.text(mapX, mapY, '🗺️  Bản đồ', {
            fontFamily: 'Arial', fontSize: '15px', fontStyle: 'bold', fill: '#FFF'
        }).setOrigin(0.5);

        const mapZone = this.add.zone(mapX, mapY, btnW, btnH).setInteractive({ useHandCursor: true });
        mapZone.on('pointerover', () => drawMapBg(0x1E88E5));
        mapZone.on('pointerout',  () => drawMapBg(0x1565C0));
        mapZone.on('pointerdown', () => {
            this.sound.play('key_sound');
            this.isActive = false;
            this.scene.start('MapScene');
        });
    }

    _applySkins() {
        const equipped = ProgressManager.getEquippedSkins();
        const bgTexture = this.bgTexture;
        console.log('SprintScene: bgTexture =', bgTexture);

        let monkeyTexture = equipped.monkey;
        if (monkeyTexture === 'random') {
            const unlockedMonkeys = UNLOCK_THRESHOLDS
                .map((threshold, i) => this.score >= threshold ? `monkey_${i + 1}` : null)
                .filter(Boolean);
            monkeyTexture = Phaser.Math.RND.pick(unlockedMonkeys) || 'monkey_1';
        }

        if (this.bgImage) this.bgImage.setTexture(bgTexture).setDisplaySize(this.scale.width, this.scale.height);
        if (this.monkey)  this.monkey.setTexture(monkeyTexture);
    }

    tick() {
        if (!this.isActive) return;

        this.timeLeft--;
        this.timerText.setText(`⏱️ ${this.timeLeft}s`);

        if (this.timeLeft <= 0) {
            this.endSprint();
        }
    }

    handleKeyDown(event) {
        if (!this.isActive) return;

        const key = event.key.toLowerCase();
        if (!/^[a-z ]$/.test(key)) return;

        const rawBuffer = this.telexEngine.getRawBuffer();

        if (TypingValidator.isPossible(rawBuffer + key, this.targetKeys, this.targetWord, this.telexEngine)) {
            const vietnameseBuffer = this.telexEngine.processKey(key);
            this.sound.play('key_sound');
            this.typedText.setText(vietnameseBuffer);
            
            this.correctKeystrokes++;
            this.highlightNextKey();
            this.updateWPM();

            if (TypingValidator.normalizeForMatch(vietnameseBuffer) === TypingValidator.normalizeForMatch(this.targetWord)) {
                this.handleSuccess();
            }
        } else {
            this.errors++;
            this.handleFail();
        }
    }

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

    updateWPM() {
        const elapsed = 60 - this.timeLeft;
        if (elapsed <= 0) return;
        const currentWpm = Math.round((this.correctKeystrokes / 5) / (elapsed / 60)) || 0;
        this.wpmText.setText(`⚡ ${currentWpm} WPM`);
    }

    handleSuccess() {
        this.sound.play('win_sound');

        this.tweens.add({
            targets: this.monkey,
            y: this.monkey.y - 50,
            duration: 200, yoyo: true, ease: 'Power2',
            onComplete: () => this.nextWord()
        });

        const { width } = this.scale;
        const scorePopup = this.add.text(
            width / 2 + Phaser.Math.Between(-40, 40),
            this.monkey.y - 60,
            `✓`,
            { fontFamily: 'Arial', fontSize: '24px',
              fontStyle: 'bold', fill: '#86EFAC', stroke: '#000', strokeThickness: 3 }
        ).setOrigin(0.5);
        this.tweens.add({
            targets: scorePopup, y: scorePopup.y - 70, alpha: 0,
            duration: 700, ease: 'Cubic.easeOut',
            onComplete: () => scorePopup.destroy()
        });
    }

    handleFail() {
        this.sound.play('error_sound');
        this.cameras.main.shake(200, 0.01);
        this.monkey.setTint(0xff0000);
        this.time.delayedCall(200, () => this.monkey.clearTint());
    }

    nextWord() {
        if (this.wordPool.length === 0) return;
        const picked = Phaser.Math.RND.pick(this.wordPool);
        this.targetWord = picked.display;
        this.targetKeys = picked.keys;

        this.targetText.setText(this.targetWord);
        this.typedText.setText('');
        this.telexEngine.clear();
        this.ruleHint.setText('Gõ: ' + picked.keys);
        this.highlightNextKey();
    }

    endSprint() {
        this.isActive = false;
        this.sound.play('level_sound');
        this.input.keyboard.off('keydown', this.handleKeyDown, this);

        const total = this.correctKeystrokes || 1;
        const accuracy = Math.round((total / (total + this.errors)) * 100);
        const wpm = Math.round(this.correctKeystrokes / 5) || 0;

        const oldHighScore = this.sprintHighScore;
        const isNewRecord = wpm > oldHighScore;
        if (isNewRecord) {
            this.sprintHighScore = wpm;
            ProgressManager.saveProgress(
                this.currentLessonIndex, this.score,
                this.lessonStats, this.unlockedAchievements,
                this.consecutivePerfects, undefined, wpm
            );
        }

        const handleRetry = () => {
            overlay.destroy();
            this.scene.restart();
        };

        const handleBackToMap = () => {
            overlay.destroy();
            this.scene.start('MapScene');
        };

        const oldStats = oldHighScore > 0 ? { wpm: oldHighScore, stars: 0 } : null;
        const overlay = new ResultOverlay(this, accuracy, wpm, true, handleBackToMap, oldStats, false, 'HẾT GIỜ!');

        this.input.keyboard.once('keyup-ENTER', handleRetry);
        this.input.keyboard.once('keydown-ESC', handleBackToMap);

        overlay.on('retry', handleRetry);
    }
}
