import * as Phaser from 'phaser';
import { ProgressManager, UNLOCK_THRESHOLDS } from '../utils/ProgressManager';

/**
 * Reward probability table (weights sum to 100)
 */
const REWARD_TABLE = [
    { bananas: 0, weight: 1, label: 'Chúc may mắn lần sau! 😅' },
    { bananas: 1, weight: 5 },
    { bananas: 2, weight: 7 },
    { bananas: 3, weight: 9 },
    { bananas: 5, weight: 15 },
    { bananas: 6, weight: 20 },
    { bananas: 8, weight: 15 },
    { bananas: 9, weight: 11 },
    { bananas: 10, weight: 8 },
    { bananas: 15, weight: 6 },
    { bananas: 20, weight: 2 },
    { bananas: 0, weight: 1, skin: true, label: '🐒 Skin khỉ mới!' }
];

const CHEST_CONFIGS = [
    { emoji: '🧰', color: 0x8B4513, label: 'Nâu' },
    { emoji: '🎁', color: 0xDAA520, label: 'Vàng' },
    { emoji: '💎', color: 0x1E90FF, label: 'Xanh' },
    { emoji: '🔮', color: 0x9B59B6, label: 'Tím' },
    { emoji: '🍀', color: 0x2ECC71, label: 'Xanh lá' },
    { emoji: '❤️', color: 0xE74C3C, label: 'Đỏ' }
];

export class SpinWheelOverlay extends Phaser.GameObjects.Container {
    constructor(scene, onComplete) {
        const { width, height } = scene.scale;
        super(scene, 0, 0);
        this.scene = scene;
        this.onComplete = onComplete;
        this.isSpinning = false;

        this.setDepth(150);

        // Dark backdrop
        const backdrop = scene.add.rectangle(0, 0, width, height, 0x0a0f1d, 0.85)
            .setOrigin(0).setInteractive();
        this.add(backdrop);

        const cx = width / 2;
        const cy = height / 2 - 20;

        // Title
        const title = scene.add.text(cx, cy - 230, '🎁 PHẦN THƯỞNG', {
            fontFamily: 'Outfit, Arial',
            fontSize: '32px',
            fontStyle: 'bold',
            fill: '#FBBF24'
        }).setOrigin(0.5).setScale(0.1);
        title.setStroke('#0f172a', 6);
        title.setShadow(0, 3, 'rgba(0,0,0,0.7)', 5, true, true);
        this.add(title);

        scene.tweens.add({
            targets: title,
            scaleX: 2.5,
            scaleY: 2.5,
            duration: 950,
            ease: 'Back.easeOut',
            onComplete: () => {
                scene.tweens.add({
                    targets: title,
                    scaleX: 1.0,
                    scaleY: 1.0,
                    duration: 250,
                    ease: 'Quad.easeInOut'
                });
            }
        });

        // Subtitle
        const subtitle = scene.add.text(cx, cy - 195, 'Quay rương để nhận quà!', {
            fontFamily: 'Arial',
            fontSize: '16px',
            fill: '#e2e8f0'
        }).setOrigin(0.5);
        this.add(subtitle);

        // ── Spin Wheel ──────────────────────────────────
        const wheelRadius = 140;
        this.wheelContainer = scene.add.container(cx, cy + 20);
        this.wheelContainer.angle = -30; // Aligns pointer with the middle of the first sector initially
        this.add(this.wheelContainer);

        // Wheel background and sectors drawing
        const wheelBg = scene.add.graphics();
        this.wheelContainer.add(wheelBg);

        const numChests = CHEST_CONFIGS.length;
        const angleStep = (Math.PI * 2) / numChests;

        const sectorColors = [
            0xff4b72, // Vibrant Pink/Red
            0xff9f0a, // Vibrant Yellow/Gold
            0x30d158, // Vibrant Green
            0x00f0ff, // Vibrant Cyan
            0x0a84ff, // Vibrant Royal Blue
            0xbf5af2  // Vibrant Purple
        ];

        // Draw 6 colored sectors
        for (let i = 0; i < numChests; i++) {
            const startAngle = angleStep * i - Math.PI / 2;
            const endAngle = angleStep * (i + 1) - Math.PI / 2;

            wheelBg.fillStyle(sectorColors[i], 0.85);
            wheelBg.slice(0, 0, wheelRadius + 20, startAngle, endAngle, false);
            wheelBg.fillPath();
        }

        // Draw sector divider lines
        wheelBg.lineStyle(2, 0xffffff, 0.45);
        for (let i = 0; i < numChests; i++) {
            const lineAngle = angleStep * i - Math.PI / 2;
            wheelBg.beginPath();
            wheelBg.moveTo(0, 0);
            wheelBg.lineTo(Math.cos(lineAngle) * (wheelRadius + 20), Math.sin(lineAngle) * (wheelRadius + 20));
            wheelBg.strokePath();
        }

        // Draw outer gold boundary rim
        wheelBg.lineStyle(4, 0xFBBF24, 1);
        wheelBg.strokeCircle(0, 0, wheelRadius + 20);

        // Draw inner ring decoration
        wheelBg.lineStyle(1.5, 0xffffff, 0.15);
        wheelBg.strokeCircle(0, 0, wheelRadius - 20);

        // Draw Chests
        for (let i = 0; i < numChests; i++) {
            const angle = angleStep * i + angleStep / 2 - Math.PI / 2; // Middle of each sector
            const chestRadius = 110;
            const chestX = Math.cos(angle) * chestRadius;
            const chestY = Math.sin(angle) * chestRadius;

            // Chest background circle (glowing translucent white with gold border, size increased to 36)
            const chestBg = scene.add.graphics();
            chestBg.fillStyle(0xffffff, 0.08);
            chestBg.fillCircle(chestX, chestY, 36);
            chestBg.lineStyle(2, 0xFBBF24, 0.3);
            chestBg.strokeCircle(chestX, chestY, 36);
            this.wheelContainer.add(chestBg);

            // Chest emoji (size increased to 38px)
            const chestEmoji = scene.add.text(chestX, chestY, CHEST_CONFIGS[i].emoji, {
                fontFamily: 'Segoe UI Emoji, Arial',
                fontSize: '38px'
            }).setOrigin(0.5);
            this.wheelContainer.add(chestEmoji);
        }

        // Center hub background (fixed in scale)
        const hub = scene.add.graphics();
        hub.fillStyle(0x0f172a, 1);
        hub.fillCircle(0, 0, 28);
        hub.lineStyle(2, 0xFBBF24, 1);
        hub.strokeCircle(0, 0, 28);
        this.wheelContainer.add(hub);

        // Center icon (🎰) to animate
        const hubText = scene.add.text(0, 0, '🎰', {
            fontFamily: 'Segoe UI Emoji, Arial',
            fontSize: '28px'
        }).setOrigin(0.5);
        this.wheelContainer.add(hubText);

        scene.tweens.add({
            targets: hubText,
            scaleX: 1.25,
            scaleY: 1.25,
            duration: 1000,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });

        // ── Pointer Arrow (fixed, not part of wheel) ──
        const pointer = scene.add.graphics();
        pointer.fillStyle(0xFBBF24, 1);
        pointer.beginPath();
        pointer.moveTo(cx, cy + 30 - wheelRadius - 30);
        pointer.lineTo(cx - 14, cy + 30 - wheelRadius - 55);
        pointer.lineTo(cx + 14, cy + 30 - wheelRadius - 55);
        pointer.closePath();
        pointer.fillPath();
        pointer.lineStyle(2, 0xF59E0B, 1);
        pointer.strokePath();
        this.add(pointer);

        // Small dot at pointer tip
        const pointerDot = scene.add.graphics();
        pointerDot.fillStyle(0xFBBF24, 1);
        pointerDot.fillCircle(cx, cy + 30 - wheelRadius - 28, 5);
        this.add(pointerDot);

        // ── "QUAY!" Button ──────────────────────────────
        this.btnY = cy + wheelRadius + 95;
        const btnW = 180, btnH = 52;

        this.btnBg = scene.add.graphics();
        this._drawButton(this.btnBg, cx, this.btnY, btnW, btnH, 0xF59E0B, 0xFBBF24);
        this.add(this.btnBg);

        this.btnText = scene.add.text(cx, this.btnY, '🎰 QUAY!', {
            fontFamily: 'Outfit, Arial',
            fontSize: '22px',
            fontStyle: 'bold',
            fill: '#0f172a'
        }).setOrigin(0.5);
        this.btnText.setStroke('#7c2d12', 1);
        this.add(this.btnText);

        const btnZone = scene.add.zone(cx, this.btnY, btnW, btnH)
            .setInteractive({ useHandCursor: true });
        this.add(btnZone);
        this.btnZone = btnZone;

        btnZone.on('pointerover', () => {
            if (!this.isSpinning) {
                this._drawButton(this.btnBg, cx, this.btnY, btnW, btnH, 0xFBBF24, 0xFFD700);
                scene.tweens.add({ targets: this.btnText, scaleX: 1.05, scaleY: 1.05, duration: 100 });
            }
        });
        btnZone.on('pointerout', () => {
            if (!this.isSpinning) {
                this._drawButton(this.btnBg, cx, this.btnY, btnW, btnH, 0xF59E0B, 0xFBBF24);
                scene.tweens.add({ targets: this.btnText, scaleX: 1, scaleY: 1, duration: 100 });
            }
        });
        btnZone.on('pointerup', () => {
            if (!this.isSpinning) {
                this._spin();
            }
        });

        // Clickable wheel zone (covers the whole wheel)
        const wheelZone = scene.add.circle(cx, cy + 20, wheelRadius + 20)
            .setInteractive({ useHandCursor: true });
        this.add(wheelZone);
        this.wheelZone = wheelZone;

        wheelZone.on('pointerup', () => {
            if (!this.isSpinning) {
                this._spin();
            }
        });

        // Guide text below the button
        this.guideText = scene.add.text(cx, this.btnY + 45, 'Ấn Space hoặc Enter để quay', {
            fontFamily: 'Arial',
            fontSize: '14px',
            fill: '#94a3b8'
        }).setOrigin(0.5);
        this.add(this.guideText);

        // Keyboard captures and handlers
        scene.input.keyboard.addCapture([
            Phaser.Input.Keyboard.KeyCodes.SPACE,
            Phaser.Input.Keyboard.KeyCodes.ENTER
        ]);

        this.onKeyDown = (event) => {
            if (event.key === ' ' || event.key === 'Enter') {
                event.preventDefault();
                event.stopPropagation();
                if (this.rewardPopupActive && typeof this.onCollectReward === 'function') {
                    this.onCollectReward();
                } else if (!this.isSpinning) {
                    this._spin();
                }
            }
        };
        scene.input.keyboard.on('keydown', this.onKeyDown);

        this.once('destroy', () => {
            scene.input.keyboard.off('keydown', this.onKeyDown);
            scene.input.keyboard.removeCapture([
                Phaser.Input.Keyboard.KeyCodes.ENTER
            ]);
        });

        // Entrance animation
        this.setAlpha(0);
        scene.tweens.add({
            targets: this,
            alpha: 1,
            duration: 400,
            ease: 'Power2',
            onComplete: () => {
                this._triggerBananaRain();
                this._triggerMonkeyJump();
            }
        });

        scene.add.existing(this);
    }

    _drawButton(graphics, x, y, w, h, fillColor, strokeColor) {
        graphics.clear();
        graphics.fillStyle(fillColor, 1);
        graphics.fillRoundedRect(x - w / 2, y - h / 2, w, h, 26);
        graphics.lineStyle(2, strokeColor, 1);
        graphics.strokeRoundedRect(x - w / 2, y - h / 2, w, h, 26);
    }

    _spin() {
        this.isSpinning = true;

        if (this.wheelZone) this.wheelZone.disableInteractive();
        if (this.btnZone) this.btnZone.disableInteractive();
        if (this.guideText) this.guideText.setVisible(false);

        // Disable button visually
        this.btnText.setText('Đang quay...');
        this._drawButton(this.btnBg, this.scene.scale.width / 2, this.btnY, 180, 52, 0x64748b, 0x94a3b8);

        const numChests = CHEST_CONFIGS.length;
        const angleStep = 360 / numChests;

        // Pick which chest to land on (0-5)
        const targetChest = Phaser.Math.Between(0, numChests - 1);

        // Calculate target rotation: 4-7 full spins + offset to land on chest (center of the sector)
        const fullSpins = Phaser.Math.Between(4, 7);
        const targetAngle = fullSpins * 360 + (360 - (targetChest * angleStep + angleStep / 2));

        // 1. Play key sound immediately
        if (this.scene.cache.audio.exists('key_sound')) {
            this.scene.sound.play('key_sound');
        }

        // 2. Play spin1 (looped) immediately
        let soundSpin1 = null;
        if (this.scene.cache.audio.exists('spin1')) {
            soundSpin1 = this.scene.sound.add('spin1', { loop: true });
            soundSpin1.play();
        }

        let soundSpin2 = null;
        let soundSpin3 = null;

        // 3. At t = 4000ms, stop spin1 and play spin2 (loop) as speed decreases
        const eventSpin2 = this.scene.time.delayedCall(4000, () => {
            if (soundSpin1) soundSpin1.stop();
            if (this.scene.cache.audio.exists('spin2')) {
                soundSpin2 = this.scene.sound.add('spin2', { loop: true });
                soundSpin2.play();
            }
        });

        // 4. At t = 6700ms, stop spin2 and play spin3
        const eventSpin3 = this.scene.time.delayedCall(6700, () => {
            if (soundSpin2) soundSpin2.stop();
            if (this.scene.cache.audio.exists('spin3')) {
                soundSpin3 = this.scene.sound.add('spin3', { loop: false });
                soundSpin3.play();
            }
        });

        const stopAllSounds = () => {
            if (soundSpin1) { soundSpin1.stop(); soundSpin1.destroy(); soundSpin1 = null; }
            if (soundSpin2) { soundSpin2.stop(); soundSpin2.destroy(); soundSpin2 = null; }
            if (soundSpin3) { soundSpin3.stop(); soundSpin3.destroy(); soundSpin3 = null; }
            this.scene.time.removeEvent(eventSpin2);
            this.scene.time.removeEvent(eventSpin3);
        };

        // Handle early destroy of overlay to stop audio leaks
        this.once('destroy', stopAllSounds);

        this.scene.tweens.add({
            targets: this.wheelContainer,
            angle: targetAngle,
            duration: 8000,
            ease: 'Cubic.easeOut',
            onComplete: () => {
                this.off('destroy', stopAllSounds);
                stopAllSounds();
                this._resolveReward();
            }
        });
    }

    _resolveReward() {
        // Pick reward from weighted table
        const reward = this._pickWeightedReward();

        let skinKey = null;
        if (reward.skin) {
            // Pick a random monkey skin (1-10)
            skinKey = `monkey_${Phaser.Math.Between(1, 10)}`;
            ProgressManager.grantSkin(skinKey);
        }

        // Show reward popup
        this._showRewardPopup(reward, skinKey, () => {
            // Apply banana reward
            if (reward.bananas > 0 && this.onComplete) {
                this.onComplete({ bananas: reward.bananas, skinKey: null });
            } else if (reward.skin && this.onComplete) {
                this.onComplete({ bananas: 0, skinKey });
            } else if (this.onComplete) {
                this.onComplete({ bananas: 0, skinKey: null });
            }
        });
    }

    _pickWeightedReward() {
        const totalWeight = REWARD_TABLE.reduce((sum, r) => sum + r.weight, 0);
        let roll = Math.random() * totalWeight;

        for (const reward of REWARD_TABLE) {
            roll -= reward.weight;
            if (roll <= 0) return reward;
        }
        return REWARD_TABLE[0];
    }

    _showRewardPopup(reward, skinKey, onDone) {
        const { width, height } = this.scene.scale;
        const cx = width / 2;
        const cy = height / 2 - 20;

        if (this.scene.cache.audio.exists('congrat')) {
            this.scene.sound.play('congrat');
        }

        // Darken the wheel
        const dimOverlay = this.scene.add.rectangle(0, 0, width, height, 0x000000, 0.5)
            .setOrigin(0).setAlpha(0).setDepth(151);
        this.scene.tweens.add({ targets: dimOverlay, alpha: 1, duration: 300 });

        // Reward card
        const cardW = 340, cardH = 240;
        const cardContainer = this.scene.add.container(cx, cy).setDepth(152).setScale(0).setAlpha(0);

        const cardBg = this.scene.add.graphics();
        cardBg.fillStyle(0x1e293b, 0.95);
        cardBg.fillRoundedRect(-cardW / 2, -cardH / 2, cardW, cardH, 20);
        cardBg.lineStyle(2.5, 0xFBBF24, 1);
        cardBg.strokeRoundedRect(-cardW / 2, -cardH / 2, cardW, cardH, 20);
        cardContainer.add(cardBg);

        // Reward content
        let mainText = '', subText = '';

        if (reward.skin) {
            subText = 'Skin khỉ con mới!';
        } else if (reward.bananas > 0) {
            mainText = `+${reward.bananas} 🍌`;
            subText = 'Tuyệt vời!';
        } else {
            mainText = '😅';
            subText = reward.label || 'Hãy cố gắng lần sau!';
        }

        let sprite = null;
        let rewardMainText = null;

        if (reward.skin) {
            // Display the actual monkey sprite instead of text (starts tiny for zoom animation)
            sprite = this.scene.add.sprite(0, -40, skinKey).setScale(0.02);
            cardContainer.add(sprite);
        } else {
            rewardMainText = this.scene.add.text(0, -40, mainText, {
                fontFamily: 'Arial Black, Outfit, Arial, Segoe UI Emoji',
                fontSize: reward.bananas > 0 ? '48px' : '64px',
                fontStyle: 'bold',
                fill: '#FBBF24',
                stroke: '#000000',
                strokeThickness: 8
            }).setOrigin(0.5);
            // Only set small scale for zoom animation if it's a banana reward (bananas > 0)
            if (reward.bananas > 0) {
                rewardMainText.setScale(0.1);
            }
            cardContainer.add(rewardMainText);
        }

        const rewardSubText = this.scene.add.text(0, 25, subText, {
            fontFamily: 'Arial',
            fontSize: '18px',
            fontStyle: 'bold',
            fill: '#e2e8f0'
        }).setOrigin(0.5);
        cardContainer.add(rewardSubText);

        // "Nhận" button
        const collectBtnY = 80;
        const collectBg = this.scene.add.graphics();
        collectBg.fillStyle(0x10b981, 1);
        collectBg.fillRoundedRect(-70, collectBtnY - 18, 140, 36, 18);
        collectBg.lineStyle(1.5, 0x34d399, 1);
        collectBg.strokeRoundedRect(-70, collectBtnY - 18, 140, 36, 18);
        cardContainer.add(collectBg);

        const collectText = this.scene.add.text(0, collectBtnY, 'Nhận', {
            fontFamily: 'Outfit, Arial',
            fontSize: '16px',
            fontStyle: 'bold',
            fill: '#ffffff'
        }).setOrigin(0.5);
        cardContainer.add(collectText);

        const collectZone = this.scene.add.zone(cx, cy + collectBtnY, 140, 36)
            .setInteractive({ useHandCursor: true }).setDepth(153);

        this.rewardPopupActive = true;
        this.onCollectReward = () => {
            if (!this.rewardPopupActive) return;
            this.rewardPopupActive = false;
            // Clean up everything
            this.scene.tweens.add({
                targets: [cardContainer, dimOverlay],
                alpha: 0,
                duration: 300,
                onComplete: () => {
                    cardContainer.destroy();
                    dimOverlay.destroy();
                    collectZone.destroy();
                    this.destroy();
                    onDone();
                }
            });
        };

        collectZone.on('pointerup', () => {
            this.onCollectReward();
        });

        // Pop-in animation
        this.scene.tweens.add({
            targets: cardContainer,
            scaleX: 1,
            scaleY: 1,
            alpha: 1,
            duration: 400,
            ease: 'Back.easeOut',
            onComplete: () => {
                this._triggerBananaRain();
                this._triggerMonkeyJump();

                // Trigger pop animation conditionally based on reward type
                if (reward.skin && sprite) {
                    this.scene.tweens.add({
                        targets: sprite,
                        scaleX: 0.35,
                        scaleY: 0.35,
                        duration: 400,
                        ease: 'Back.easeOut',
                        onComplete: () => {
                            this.scene.tweens.add({
                                targets: sprite,
                                scaleX: 0.25,
                                scaleY: 0.25,
                                duration: 250,
                                ease: 'Quad.easeInOut'
                            });
                        }
                    });
                } else if (reward.bananas > 0 && rewardMainText) {
                    this.scene.tweens.add({
                        targets: rewardMainText,
                        scaleX: 1.35,
                        scaleY: 1.35,
                        duration: 400,
                        ease: 'Back.easeOut',
                        onComplete: () => {
                            this.scene.tweens.add({
                                targets: rewardMainText,
                                scaleX: 1.0,
                                scaleY: 1.0,
                                duration: 250,
                                ease: 'Quad.easeInOut'
                            });
                        }
                    });
                }
            }
        });

        // Play sound if available
        if (this.scene.cache.audio.exists('key_sound')) {
            this.scene.sound.play('key_sound');
        }
    }

    _triggerBananaRain() {
        const { width, height } = this.scene.scale;
        for (let i = 0; i < 12; i++) {
            this.scene.time.delayedCall(i * 120, () => {
                if (!this.scene || !this.scene.sys || !this.scene.sys.isActive()) return;
                const b = this.scene.add.image(Phaser.Math.Between(30, width - 30), -30, 'banana')
                    .setScale(Phaser.Math.FloatBetween(0.2, 0.4))
                    .setAngle(Phaser.Math.Between(-45, 45))
                    .setDepth(200);
                this.scene.tweens.add({
                    targets: b,
                    y: height + 40,
                    angle: b.angle + Phaser.Math.Between(-180, 180),
                    duration: Phaser.Math.Between(1000, 1800),
                    ease: 'Linear',
                    onComplete: () => b.destroy()
                });
            });
        }
    }

    _triggerMonkeyJump() {
        if (this.scene.monkey) {
            const origY = this.scene.monkey.y;
            this.scene.tweens.add({
                targets: this.scene.monkey,
                y: origY - 60,
                duration: 200,
                yoyo: true,
                repeat: 3,
                ease: 'Power2'
            });
        }
    }
}
