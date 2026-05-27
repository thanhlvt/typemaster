import * as Phaser from 'phaser';
import { TelexEngine }           from '../utils/TelexEngine';
import { VirtualKeyboard }       from '../components/VirtualKeyboard';
import { ProgressManager, UNLOCK_THRESHOLDS } from '../utils/ProgressManager';
import { TypingValidator }       from '../utils/TypingValidator';
import { CHAPTERS, getChapterForLesson, getGroupForChapter, getChapterBgKey } from '../data/chapters';
import { ResultOverlay }         from '../components/ResultOverlay';
import { ensureTextures }        from '../utils/TextureLoader';
import { AchievementToast }      from '../components/AchievementToast';
import { AudioManager }          from '../utils/AudioManager';
import { showBossIntro }         from '../utils/BossIntroAnimation';
import { BossHPBar }             from '../utils/BossHPBar';
import { createBossContentUI, playSwordAttack } from '../utils/BossCombat';

export class BossScene extends Phaser.Scene {
    constructor() {
        super('BossScene');
    }

    init(data) {
        this.gameData = this.cache.json.get('gameData');
        this.telexEngine = new TelexEngine(this.gameData.telex_rules);

        // Load progress
        const progress = ProgressManager.loadProgress(this.gameData.lessons.length);
        this.score                = progress.score;
        this.lessonStats          = progress.lessonStats || {};
        this.unlockedAchievements = progress.unlockedAchievements || [];
        this.consecutivePerfects  = progress.consecutivePerfects  || 0;
        this.streakDays           = progress.streakDays || 0;

        // Current lesson is the boss lesson
        this.currentLessonIndex = data.lessonIndex !== undefined ? data.lessonIndex : 13;
        this.chapter = getChapterForLesson(this.currentLessonIndex);
        this.group = getGroupForChapter(this.chapter);

        // Calculate HP decrease rate based on Chapter ID
        // Chapters 1-5: 0% per sec
        // Chapters 6-15: 1% per sec
        // Chapters 16-25: 2% per sec
        // Chapter 26 onwards: 3% per sec
        const chId = this.chapter.id;
        if (chId <= 5) {
            this.hpDecreaseRate = 0;
        } else if (chId <= 15) {
            this.hpDecreaseRate = 1;
        } else if (chId <= 25) {
            this.hpDecreaseRate = 2;
        } else {
            this.hpDecreaseRate = 3;
        }

        // Construct word pool from all lessons in this chapter
        const startLesson = this.chapter.range[0];
        const endLesson = this.chapter.range[1];
        this.wordPool = [];
        for (let i = startLesson; i <= endLesson; i++) {
            if (this.gameData.lessons[i]) {
                this.wordPool.push(...this.gameData.lessons[i].content);
            }
        }
        // In case word pool is empty
        if (this.wordPool.length === 0) {
            this.wordPool.push({ display: 'typemaster', keys: 'typemaster' });
        }

        // Game State
        this.playerHP = 50; // Starts at 50% (Tug of War)
        this.timeLeft = 60;
        this.isActive = false; // Starts false, true after intro warning
        this.introTime = 2.5;  // 2.5 seconds warning banner

        this.correctKeystrokes = 0;
        this.errors = 0;

        // Skins
        const equipped = ProgressManager.getEquippedSkins();
        this.monkeyTexture = equipped.monkey;
        if (this.monkeyTexture === 'random') {
            const unlockedMonkeys = UNLOCK_THRESHOLDS
                .map((threshold, i) => this.score >= threshold ? `monkey_${i + 1}` : null)
                .filter(Boolean);
            this.monkeyTexture = Phaser.Math.RND.pick(unlockedMonkeys) || 'monkey_1';
        }

        this.bgTexture = getChapterBgKey(this.chapter);
        this.bossTexture = `boss_${this.group.id}`;
    }

    create() {
        const { width, height } = this.scale;

        // Static placeholder elements until texture loads
        this.bgImage = this.add.image(width / 2, height / 2, 'bg_1_1').setDisplaySize(width, height);
        this.monkey = this.add.sprite(width * 0.22, height * 0.33, 'monkey_1').setScale(0.8);
        this.boss = this.add.sprite(width * 0.78, height * 0.33, 'monkey_1').setScale(0.85).setFlipX(true).setVisible(false);

        // Core UI components
        const contentUI = createBossContentUI(this);
        this.targetText = contentUI.targetText;
        this.ruleHint = contentUI.ruleHint;
        this.typedText = contentUI.typedText;

        this._createHUD(width, height);

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
            if (this.bossMusic) {
                this.bossMusic.stop();
            }
        });

        // Lazy load the appropriate boss texture and backgrounds
        ensureTextures(this, [
            { key: this.bgTexture,     url: `assets/${this.bgTexture}.jpg` },
            { key: this.monkeyTexture, url: `assets/${this.monkeyTexture}.png` },
            { key: this.bossTexture,   url: `assets/${this.bossTexture}.png` }
        ], () => {
            if (this.bgImage) this.bgImage.setTexture(this.bgTexture).setDisplaySize(this.scale.width, this.scale.height);
            if (this.monkey)  this.monkey.setTexture(this.monkeyTexture);
            if (this.boss) {
                this.boss.setTexture(this.bossTexture);
                // Clear mirror flip if it is a real boss sprite
                this.boss.setFlipX(false).setVisible(true);
                // Simple idling breathing tween for boss
                this.tweens.add({
                    targets: this.boss,
                    scaleX: 0.9,
                    scaleY: 0.9,
                    yoyo: true,
                    repeat: -1,
                    duration: 1200,
                    ease: 'Sine.easeInOut'
                });
            }
        });

        // Set up the words
        this.nextWord();

        // 60 seconds timer event
        this.time.addEvent({
            delay: 1000,
            callback: this.tick,
            callbackScope: this,
            loop: true
        });

        // Start Intro Warning Banner
        this._showIntroWarning(width, height);
    }

    _showIntroWarning(width, height) {
        this.bossMusic = showBossIntro(this, this.group, this.introTime, () => {
            this.isActive = true;
        });
    }

    _playSwordAttackAnimation() {
        playSwordAttack(this, this.monkey);
    }

    // (Removed _createContentUI - using createBossContentUI helper from BossCombat)

    _createHUD(width, height) {
        // Timer Text at the top center
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

        // ── Tug of War HP Bar ──
        this.hpBar = new BossHPBar(this, width / 2, 95, 460, 26);
    }

    tick() {
        if (!this.isActive) return;

        // 1. Time ticking
        this.timeLeft--;
        this.timerText.setText(`⏱️ ${this.timeLeft}s`);

        // 2. Boss attack (HP drain) - every 5 seconds
        const elapsed = 60 - this.timeLeft;
        if (elapsed > 0 && elapsed % 5 === 0 && this.hpDecreaseRate > 0) {
            this.playerHP = Phaser.Math.Clamp(this.playerHP - this.hpDecreaseRate, 0, 100);
            this.hpBar.draw(this.playerHP);
            this._playSwordAttackAnimation();
            this.sound.play('error_sound');
        }

        // 3. Check Game Over
        if (this.playerHP <= 0) {
            this.endBattle(false);
        } else if (this.timeLeft <= 0) {
            // Timer ran out! Evaluate HP
            // If player HP > Boss HP (i.e. playerHP > 50), player wins
            if (this.playerHP > 50) {
                const bossHP = 100 - this.playerHP;
                let stars = 1;
                if (bossHP <= 30) {
                    stars = 2;
                }
                this.endBattle(true, stars);
            } else {
                // playerHP <= Boss HP (i.e. playerHP <= 50), player loses
                this.endBattle(false);
            }
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

    handleSuccess() {
        this.sound.play('win_sound');

        // Deal damage: push Player HP bar up by 10%
        this.playerHP = Phaser.Math.Clamp(this.playerHP + 10, 0, 100);
        this.hpBar.draw(this.playerHP);

        // Hit flash effect on Boss
        if (this.boss) {
            playSwordAttack(this, this.boss, false);
        }

        // Jump animations
        this.tweens.add({
            targets: this.monkey,
            y: this.monkey.y - 40,
            duration: 150, yoyo: true, ease: 'Power2',
            onComplete: () => this.nextWord()
        });

        // Check instant win (Knockout at 100% HP)
        if (this.playerHP >= 100) {
            this.endBattle(true, 3);
        }
    }

    handleFail() {
        this.sound.play('error_sound');
        this._playSwordAttackAnimation();

        // Boss counter attacks!
        this.playerHP = Phaser.Math.Clamp(this.playerHP - 1, 0, 100);
        this.hpBar.draw(this.playerHP);

        if (this.playerHP <= 0) {
            this.endBattle(false);
        }
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
    endBattle(isWin, stars = 3) {
        this.isActive = false;
        this.bossStars = stars; // Stored so ResultOverlay can access it
        if (this.bossMusic) {
            this.bossMusic.stop();
        }
        const jingleKey = isWin ? 'level_sound' : 'lost_sound';
        AudioManager.playJingle(this, jingleKey, this.currentLessonIndex, true);
        this.input.keyboard.off('keydown', this.handleKeyDown, this);

        const total = this.correctKeystrokes || 1;
        const accuracy = Math.round((total / (total + this.errors)) * 100);
        
        // Calculate WPM based on elapsed time (max 60 seconds)
        const elapsed = 60 - this.timeLeft;
        const timeFactor = Math.max(elapsed, 1) / 60;
        const wpm = Math.round((this.correctKeystrokes / 5) / timeFactor) || 0;

        const cleanUp = () => {
            this.input.keyboard.off('keyup-SPACE', handleContinue);
            this.input.keyboard.off('keyup-ENTER', handleRetry);
            this.input.keyboard.off('keydown-ESC', handleBackToMap);
        };

        const handleRetry = () => {
            cleanUp();
            overlay.destroy();
            this.scene.restart();
        };

        const handleBackToMap = () => {
            cleanUp();
            overlay.destroy();
            this.scene.start('MapScene');
        };

        const handleContinue = () => {
            cleanUp();
            overlay.destroy();
            const nextIndex = this.currentLessonIndex + 1;
            if (nextIndex < this.gameData.lessons.length) {
                const isNextBoss = (nextIndex % 14 === 13);
                const isNewChapter = (nextIndex % 14 === 0);
                if (isNewChapter) {
                    this.scene.start('ChapterIntroScene', { lessonIndex: nextIndex });
                } else if (isNextBoss) {
                    this.scene.start('BossScene', { lessonIndex: nextIndex });
                } else {
                    this.scene.start('PlayScene', { lessonIndex: nextIndex });
                }
            } else {
                this.scene.start('MapScene');
            }
        };

        let overlay;
        if (isWin) {
            // Save Progress
            const progress = ProgressManager.loadProgress(this.gameData.lessons.length);
            
            // Advance unlocked index if beaten the frontier lesson
            let nextIndex = progress.lessonIndex;
            if (this.currentLessonIndex === progress.lessonIndex && this.currentLessonIndex < this.gameData.lessons.length - 1) {
                nextIndex = this.currentLessonIndex + 1;
            }

            // Award Boss achievement if first time
            if (!this.unlockedAchievements.includes('boss_slayer')) {
                this.unlockedAchievements.push('boss_slayer');
                AchievementToast.show(this, 'boss_slayer');
            }

            // Update stats for this boss level (give stars)
            const oldStats = this.lessonStats[this.currentLessonIndex] || null;
            const oldStars = oldStats ? (oldStats.stars || 0) : 0;
            this.lessonStats[this.currentLessonIndex] = {
                stars: Math.max(oldStars, stars),
                wpm: Math.max(oldStats ? oldStats.wpm : 0, wpm),
                accuracy: Math.max(oldStats ? oldStats.accuracy : 0, accuracy),
                timestamp: Date.now()
            };

            // Grant bananas based on stars: 1 star = 5, 2 stars = 10, 3 stars = 20
            let bananaReward = 20;
            if (stars === 1) bananaReward = 5;
            else if (stars === 2) bananaReward = 10;
            this.score += bananaReward;

            ProgressManager.saveProgress(
                nextIndex,
                this.score,
                this.lessonStats,
                this.unlockedAchievements,
                this.consecutivePerfects
            );

            // Boss spins out of screen animation
            if (this.boss) {
                this.tweens.add({
                    targets: this.boss,
                    y: this.scale.height + 200,
                    angle: 720,
                    scaleX: 0,
                    scaleY: 0,
                    duration: 1000,
                    ease: 'Power2.easeIn'
                });
            }

            overlay = new ResultOverlay(
                this, accuracy, wpm, false, handleBackToMap, oldStats, false, 'CHẾN THẮNG BOSS!'
            );
        } else {
            // Lose
            // Red tint screen effect
            const screenTint = this.add.rectangle(0, 0, this.scale.width, this.scale.height, 0xff0000, 0.15)
                .setOrigin(0).setDepth(150);
            this.tweens.add({
                targets: screenTint,
                alpha: 0,
                duration: 600,
                onComplete: () => screenTint.destroy()
            });

            overlay = new ResultOverlay(
                this, accuracy, wpm, true, handleBackToMap, null, false, 'THẤT BẠI!'
            );
        }

        if (isWin) {
            this.input.keyboard.once('keyup-SPACE', handleContinue);
            overlay.on('continue', handleContinue);
        }

        this.input.keyboard.once('keyup-ENTER', handleRetry);
        this.input.keyboard.once('keydown-ESC', handleBackToMap);

        overlay.on('retry', handleRetry);
    }
}
