import * as Phaser from 'phaser';
import { ProgressManager } from '../utils/ProgressManager';
import { ensureTextures } from '../utils/TextureLoader';
import { getFogAlpha } from '../utils/PathLayout';

export class PathNode extends Phaser.GameObjects.Container {
    constructor(scene, x, y, index, isUnlocked, stars, currentIndex) {
        super(scene, x, y);
        this.scene = scene;
        this.index = index;
        this.stars = stars;
        this.isUnlocked = isUnlocked;

        this.setDepth(2);

        const fogAlpha = getFogAlpha(index, currentIndex);
        this.setAlpha(fogAlpha);
        if (fogAlpha <= 0) {
            this.setVisible(false);
        }

        this.isBoss = (index % 14 === 13);
        this.radius = this.isBoss ? 44 : 38;

        // Determine state
        if (stars > 0) {
            this.state = 'done';
        } else if (index === currentIndex) {
            this.state = 'current';
        } else {
            this.state = 'locked';
        }

        // Draw Circle Graphics
        this.bg = scene.add.graphics();
        this.add(this.bg);
        this.drawCircle(false);

        // Add Inside Content
        if (this.state === 'locked') {
            const lockEmoji = scene.add.text(0, 0, '🔒', {
                fontFamily: 'Segoe UI Emoji, Arial',
                fontSize: this.isBoss ? '24px' : '20px',
            }).setOrigin(0.5).setAlpha(0.6);
            this.add(lockEmoji);
        } else {
            if (this.isBoss) {
                const crownEmoji = scene.add.text(0, -2, '👑', {
                    fontFamily: 'Segoe UI Emoji, Arial',
                    fontSize: '26px',
                }).setOrigin(0.5);
                this.add(crownEmoji);
            } else {
                const labelText = scene.add.text(0, 0, `${index + 1}`, {
                    fontFamily: 'Outfit, Arial',
                    fontSize: '22px',
                    fontStyle: 'bold',
                    fill: '#ffffff'
                }).setOrigin(0.5);
                labelText.setStroke('#0f172a', 3);
                this.add(labelText);
            }
        }

        // Add Labels below
        let labelYOffset = this.radius + 12;

        if (this.isBoss) {
            // Label "BOSS · BÀI X"
            const bossText = scene.add.text(0, labelYOffset, `BOSS · BÀI ${index + 1}`, {
                fontFamily: 'Outfit, Arial',
                fontSize: '13px',
                fontStyle: 'bold',
                fill: this.state === 'locked' ? '#64748B' : '#FCA5A5'
            }).setOrigin(0.5);
            bossText.setStroke('#0f172a', 3);
            this.add(bossText);
            labelYOffset += 18;
        }

        // Stars row (for done and unlocked/current)
        if (this.state !== 'locked') {
            const starStr = stars === 3 ? '⭐⭐⭐' : stars === 2 ? '⭐⭐☆' : stars === 1 ? '⭐☆☆' : '☆☆☆';
            const starText = scene.add.text(0, labelYOffset, starStr, {
                fontFamily: 'Arial',
                fontSize: '13px',
                fill: '#FFD700'
            }).setOrigin(0.5);
            this.add(starText);
        }

        // If current, add pulsing animation and resolve monkey skin
        if (this.state === 'current') {
            // Pulsing tween for node scale
            this.scene.tweens.add({
                targets: this,
                scaleX: 1.05,
                scaleY: 1.05,
                duration: 1200,
                yoyo: true,
                repeat: -1,
                ease: 'Sine.easeInOut'
            });

            this.monkeySprite = null;
            this.updateMonkeySkin();
        }

        // Add Interactive Zone
        const hitArea = new Phaser.Geom.Circle(this.radius, this.radius, this.radius);
        const zone = scene.add.zone(0, 0, this.radius * 2, this.radius * 2)
            .setInteractive(hitArea, Phaser.Geom.Circle.Contains);
        this.add(zone);

        if (this.state !== 'locked') {
            zone.input.cursor = 'pointer';

            zone.on('pointerover', () => {
                this.setDepth(10);
                this.drawCircle(true); // draw hover golden border
                this.scene.tweens.killTweensOf(this);
                this.scene.tweens.add({
                    targets: this,
                    scaleX: 1.1,
                    scaleY: 1.1,
                    duration: 100,
                    ease: 'Power1'
                });

                if (this.scene.showTooltip) {
                    this.scene.showTooltip(this.index, this.x, this.y, this.isBoss);
                }
            });

            zone.on('pointerout', () => {
                this.setDepth(2);
                this.drawCircle(false); // remove hover golden border
                this.scene.tweens.killTweensOf(this);
                this.scene.tweens.add({
                    targets: this,
                    scaleX: 1.0,
                    scaleY: 1.0,
                    duration: 100,
                    ease: 'Power1',
                    onComplete: () => {
                        if (this.state === 'current') {
                            this.scene.tweens.add({
                                targets: this,
                                scaleX: 1.05,
                                scaleY: 1.05,
                                duration: 1200,
                                yoyo: true,
                                repeat: -1,
                                ease: 'Sine.easeInOut'
                            });
                        }
                    }
                });

                if (this.scene.hideTooltip) {
                    this.scene.hideTooltip();
                }
            });

            zone.on('pointerdown', () => {
                this.scene.tweens.add({
                    targets: this,
                    scaleX: 0.95,
                    scaleY: 0.95,
                    duration: 50
                });
            });

            zone.on('pointerup', () => {
                this.scene.tweens.add({
                    targets: this,
                    scaleX: 1.0,
                    scaleY: 1.0,
                    duration: 50,
                    onComplete: () => {
                        if (!this.scene.isDraggingRef()) {
                            this.scene.sound.play('key_sound');
                            if (this.isBoss) {
                                this.scene.scene.start('BossScene', { lessonIndex: this.index });
                            } else {
                                this.scene.scene.start('PlayScene', { lessonIndex: this.index });
                            }
                        }
                    }
                });
            });
        }

        scene.add.existing(this);
    }

    drawCircle(isHovered) {
        this.bg.clear();

        let fillColor, strokeColor, strokeWidth;

        if (this.isBoss) {
            if (this.state === 'done') {
                fillColor = 0xd97706; // Amber
                strokeColor = isHovered ? 0xFFD700 : 0x991b1b;
                strokeWidth = isHovered ? 3.5 : 2.5;
            } else if (this.state === 'current') {
                fillColor = 0xef4444; // Red
                strokeColor = isHovered ? 0xFFD700 : 0xfca5a5;
                strokeWidth = isHovered ? 3.5 : 2.5;
            } else {
                fillColor = 0x180505; // Locked Dark Red
                strokeColor = 0x450a0a;
                strokeWidth = 1.5;
            }
        } else {
            if (this.state === 'done') {
                fillColor = 0x10b981; // Emerald Green
                strokeColor = isHovered ? 0xFFD700 : 0x047857;
                strokeWidth = isHovered ? 3.5 : 2;
            } else if (this.state === 'current') {
                fillColor = 0xf59e0b; // Amber Yellow
                strokeColor = isHovered ? 0xFFD700 : 0xfffbeb;
                strokeWidth = isHovered ? 3.5 : 2;
            } else {
                fillColor = 0x1e293b; // Locked Slate
                strokeColor = 0x334155;
                strokeWidth = 1.5;
            }
        }

        // Draw outer ring glow for current node
        if (this.state === 'current' && !isHovered) {
            this.bg.lineStyle(1.5, 0xFFD700, 0.4);
            this.bg.strokeCircle(0, 0, this.radius + 6);
        }

        // Fill circle
        this.bg.fillStyle(fillColor, 1);
        this.bg.fillCircle(0, 0, this.radius);

        // Stroke circle
        this.bg.lineStyle(strokeWidth, strokeColor, 1);
        this.bg.strokeCircle(0, 0, this.radius);
    }

    updateMonkeySkin() {
        if (this.state !== 'current') return;

        const equipped = ProgressManager.getEquippedSkins();
        let monkeySkin = equipped.monkey || 'monkey_1';

        // Resolve random skin
        if (monkeySkin === 'random') {
            const totalLessons = this.scene.gameData.lessons.length;
            const progress = ProgressManager.loadProgress(totalLessons);
            const score = progress.score || 0;

            const UNLOCK_THRESHOLDS = [0, 50, 150, 300, 500, 750, 1000, 1500, 2000, 3000];
            const unlockedMonkeys = UNLOCK_THRESHOLDS
                .map((threshold, i) => score >= threshold ? `monkey_${i + 1}` : null)
                .filter(Boolean);
            monkeySkin = Phaser.Math.RND.pick(unlockedMonkeys) || 'monkey_1';
        }

        // Dynamically load the skin texture if it isn't in the cache
        ensureTextures(this.scene, [{ key: monkeySkin, url: `assets/${monkeySkin}.png` }], () => {
            if (this.scene && this.active) {
                if (this.monkeySprite) {
                    this.monkeySprite.setTexture(monkeySkin);
                } else {
                    this.monkeySprite = this.scene.add.sprite(0, -this.radius - 12, monkeySkin)
                        .setScale(0.12)
                        .setOrigin(0.5);
                    this.add(this.monkeySprite);

                    // Add floating micro-animation
                    this.scene.tweens.add({
                        targets: this.monkeySprite,
                        y: this.monkeySprite.y - 6,
                        duration: 1000,
                        yoyo: true,
                        repeat: -1,
                        ease: 'Sine.easeInOut'
                    });
                }
            }
        });
    }
}
