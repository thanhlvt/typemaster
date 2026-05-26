import * as Phaser from 'phaser';

export class LessonCard extends Phaser.GameObjects.Container {
    constructor(scene, x, y, index, isUnlocked, stars, currentIndex) {
        super(scene, x, y);
        this.scene = scene;
        this.index = index;
        this.stars = stars;
        this.isUnlocked = isUnlocked;

        this.setDepth(1);

        const isBoss = (index % 14 === 13);
        const btnWidth = 140, btnHeight = 110;
        this.bg = scene.add.graphics();
        this.add(this.bg);
        let state = 'locked';
        if (stars > 0) {
            state = 'done';
        } else if (index === currentIndex) {
            state = 'current';
        } else if (isUnlocked) {
            state = 'unlocked';
        } else if (index === currentIndex + 1) {
            state = 'next';
        } else {
            state = 'locked';
        }

        const drawBg = () => {
            this.bg.clear();
            if (isBoss) {
                if (state === 'done') {
                    this.bg.fillGradientStyle(0xd97706, 0xd97706, 0x991b1b, 0x991b1b, 1);
                    this.bg.fillRoundedRect(-btnWidth / 2, -btnHeight / 2, btnWidth, btnHeight, 16);
                    this.bg.lineStyle(3, 0xFBBF24, 1);
                    this.bg.strokeRoundedRect(-btnWidth / 2, -btnHeight / 2, btnWidth, btnHeight, 16);
                } else if (state === 'current') {
                    this.bg.fillGradientStyle(0xef4444, 0xef4444, 0x7f1d1d, 0x7f1d1d, 1);
                    this.bg.fillRoundedRect(-btnWidth / 2, -btnHeight / 2, btnWidth, btnHeight, 16);
                    this.bg.lineStyle(3, 0xfca5a5, 1);
                    this.bg.strokeRoundedRect(-btnWidth / 2, -btnHeight / 2, btnWidth, btnHeight, 16);
                } else if (state === 'unlocked') {
                    this.bg.fillStyle(0x7f1d1d, 1);
                    this.bg.fillRoundedRect(-btnWidth / 2, -btnHeight / 2, btnWidth, btnHeight, 16);
                    this.bg.lineStyle(2, 0xef4444, 1);
                    this.bg.strokeRoundedRect(-btnWidth / 2, -btnHeight / 2, btnWidth, btnHeight, 16);
                } else {
                    this.bg.fillStyle(0x180505, 1);
                    this.bg.fillRoundedRect(-btnWidth / 2, -btnHeight / 2, btnWidth, btnHeight, 16);
                    this.bg.lineStyle(2, 0x450a0a, 1);
                    this.bg.strokeRoundedRect(-btnWidth / 2, -btnHeight / 2, btnWidth, btnHeight, 16);
                }
            } else {
                if (state === 'done') {
                    this.bg.fillGradientStyle(0x1bb893, 0x1bb893, 0x0d8268, 0x0d8268, 1);
                    this.bg.fillRoundedRect(-btnWidth / 2, -btnHeight / 2, btnWidth, btnHeight, 16);
                } else if (state === 'current') {
                    this.bg.fillGradientStyle(0xffb547, 0xffb547, 0xff7e3d, 0xff7e3d, 1);
                    this.bg.fillRoundedRect(-btnWidth / 2, -btnHeight / 2, btnWidth, btnHeight, 16);
                    this.bg.lineStyle(3, 0xFFD700, 1);
                    this.bg.strokeRoundedRect(-btnWidth / 2, -btnHeight / 2, btnWidth, btnHeight, 16);
                } else if (state === 'unlocked') {
                    this.bg.fillStyle(0x1e3a8a, 1);
                    this.bg.fillRoundedRect(-btnWidth / 2, -btnHeight / 2, btnWidth, btnHeight, 16);
                    this.bg.lineStyle(2, 0x3b82f6, 1);
                    this.bg.strokeRoundedRect(-btnWidth / 2, -btnHeight / 2, btnWidth, btnHeight, 16);
                } else if (state === 'next') {
                    this.bg.fillStyle(0x443477, 1);
                    this.bg.fillRoundedRect(-btnWidth / 2, -btnHeight / 2, btnWidth, btnHeight, 16);
                    this.bg.lineStyle(2, 0xFFD700, 0.8);
                    const r = 16, w = btnWidth, h = btnHeight;
                    this.bg.strokeRoundedRect(-w / 2, -h / 2, w, h, r);
                } else {
                    this.bg.fillStyle(0x111827, 1);
                    this.bg.fillRoundedRect(-btnWidth / 2, -btnHeight / 2, btnWidth, btnHeight, 16);
                    this.bg.lineStyle(2, 0x475569, 1);
                    this.bg.strokeRoundedRect(-btnWidth / 2, -btnHeight / 2, btnWidth, btnHeight, 16);
                }
            }
        };

        drawBg();

        if (state === 'locked') {
            if (isBoss) {
                this.add(scene.add.text(0, -20, '😈', {
                    fontFamily: 'Segoe UI Emoji, Arial', fontSize: '32px', alpha: 0.3
                }).setOrigin(0.5));
                this.add(scene.add.text(0, 20, '🔒 BOSS', {
                    fontFamily: 'Outfit, Arial', fontSize: '14px', fontStyle: 'bold', fill: '#64748B', alpha: 0.4
                }).setOrigin(0.5));
            } else {
                this.add(scene.add.text(0, -20, `${index + 1}`, {
                    fontFamily: 'Outfit, Arial', fontSize: '30px', fontStyle: 'bold', fill: '#64748B', alpha: 0.3
                }).setOrigin(0.5));
                this.add(scene.add.text(0, 20, '🔒', {
                    fontFamily: 'Segoe UI Emoji, Arial',
                    fontSize: '28px',
                    padding: { top: 10, bottom: 10, left: 10, right: 10 }
                }).setOrigin(0.5));
            }
            scene.add.existing(this);
            return; // Not interactive
        }

        if (state === 'next') {
            if (isBoss) {
                this.add(scene.add.text(0, -15, '😈', {
                    fontFamily: 'Segoe UI Emoji, Arial', fontSize: '32px', alpha: 0.6
                }).setOrigin(0.5));
                this.add(scene.add.text(0, 20, '🔓 Sắp mở', {
                    fontFamily: 'Outfit, Arial', fontSize: '14px', fontStyle: 'bold', fill: '#D8B4FE', alpha: 0.8
                }).setOrigin(0.5));
            } else {
                this.add(scene.add.text(0, -15, `${index + 1}`, {
                    fontFamily: 'Outfit, Arial', fontSize: '30px', fontStyle: 'bold', fill: '#D8B4FE', alpha: 0.7
                }).setOrigin(0.5));
                this.add(scene.add.text(0, 20, '🔓 Sắp mở', {
                    fontFamily: 'Segoe UI Emoji, Arial', fontSize: '15px', fontStyle: 'bold', fill: '#D8B4FE', alpha: 0.8,
                    padding: { top: 6, bottom: 6, left: 6, right: 6 }
                }).setOrigin(0.5));
            }
            scene.add.existing(this);
            return; // Not interactive
        }

        if (isBoss) {
            this.add(scene.add.text(0, -22, '😈 BOSS', {
                fontFamily: 'Outfit, Arial', fontSize: '20px', fontStyle: 'bold', fill: '#FF8A8A'
            }).setOrigin(0.5));
        } else {
            this.add(scene.add.text(0, -20, `${index + 1}`, {
                fontFamily: 'Outfit, Arial', fontSize: '32px', fontStyle: 'bold', fill: '#FFFFFF'
            }).setOrigin(0.5));
        }

        const stats = scene.lessonStats[index] || { stars: 0, wpm: 0, accuracy: 0, timestamp: null };
        const bestWpm = stats.wpm || 0;
        const wpmStr = bestWpm > 0 ? `${bestWpm} WPM` : '-- WPM';

        this.add(scene.add.text(0, 10, wpmStr, {
            fontFamily: 'Arial', fontSize: '14px', fill: state === 'done' ? (isBoss ? '#FECACA' : '#A7F3D0') : '#FFEDD5', fontStyle: 'bold'
        }).setOrigin(0.5));

        const starStr = stars === 3 ? '⭐⭐⭐' : stars === 2 ? '⭐⭐☆' : stars === 1 ? '⭐☆☆' : '☆☆☆';
        this.add(scene.add.text(0, 32, starStr, {
            fontFamily: 'Arial', fontSize: '16px', fill: '#FFD700'
        }).setOrigin(0.5));

        if (state === 'done') {
            const checkBg = scene.add.graphics();
            checkBg.fillStyle(0xFFD700, 1);
            checkBg.fillCircle(btnWidth/2 - 15, -btnHeight/2 + 15, 12);
            this.add(checkBg);
            this.add(scene.add.text(btnWidth/2 - 15, -btnHeight/2 + 15, '✓', {
                fontFamily: 'Arial', fontSize: '14px', fontStyle: 'bold', fill: '#000000'
            }).setOrigin(0.5));
        } else if (state === 'current') {
            scene.tweens.add({ targets: this, scaleX: 1.04, scaleY: 1.04, duration: 1600, yoyo: true, repeat: -1 });
            
            const flagBg = scene.add.graphics();
            flagBg.fillStyle(0xFFFFFF, 1);
            flagBg.fillRoundedRect(-50, -btnHeight/2 - 25, 100, 24, 12);
            this.add(flagBg);
            this.add(scene.add.text(0, -btnHeight/2 - 13, '🏃 BẠN Ở ĐÂY', {
                fontFamily: 'Arial', fontSize: '11px', fontStyle: 'bold', fill: '#D97706'
            }).setOrigin(0.5));
        }

        const zone = scene.add.zone(0, 0, btnWidth, btnHeight).setInteractive({ useHandCursor: true });
        this.add(zone);

        zone.on('pointerover', () => {
            this.setDepth(2);
            scene.tweens.killTweensOf(this);
            scene.tweens.add({ targets: this, scaleX: state === 'current' ? 1.14 : 1.1, scaleY: state === 'current' ? 1.14 : 1.1, duration: 100, ease: 'Power1' });
            
            this.bg.clear();
            if (isBoss) {
                if (state === 'done') {
                    this.bg.fillGradientStyle(0xd97706, 0xd97706, 0x991b1b, 0x991b1b, 1);
                } else if (state === 'current') {
                    this.bg.fillGradientStyle(0xef4444, 0xef4444, 0x7f1d1d, 0x7f1d1d, 1);
                } else if (state === 'unlocked') {
                    this.bg.fillStyle(0x7f1d1d, 1);
                }
            } else {
                if (state === 'done') {
                    this.bg.fillGradientStyle(0x1bb893, 0x1bb893, 0x0d8268, 0x0d8268, 1);
                } else if (state === 'current') {
                    this.bg.fillGradientStyle(0xffb547, 0xffb547, 0xff7e3d, 0xff7e3d, 1);
                } else if (state === 'unlocked') {
                    this.bg.fillStyle(0x1e3a8a, 1);
                } else if (state === 'next') {
                    this.bg.fillStyle(0x443477, 1);
                }
            }
            this.bg.fillRoundedRect(-btnWidth / 2, -btnHeight / 2, btnWidth, btnHeight, 16);
            this.bg.lineStyle(3, 0xFFD700, 1);
            this.bg.strokeRoundedRect(-btnWidth / 2, -btnHeight / 2, btnWidth, btnHeight, 16);

            // Position and show tooltip
            if (state !== 'next' && scene.tooltip && scene.tooltipText) {
                scene.tooltip.setPosition(x - 90, y - 115);
                const stats = scene.lessonStats[index] || { stars: 0, wpm: 0, accuracy: 0, timestamp: null };
                const bestAcc = stats.accuracy || 0;
                let dateStr = 'N/A';
                if (stats.timestamp) {
                    const date = new Date(stats.timestamp);
                    dateStr = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
                }
                scene.tooltipText.setText(`Chính xác: ${bestAcc}%\nGần nhất: ${dateStr}`);
                scene.tooltip.setVisible(true);
            }
        });
        zone.on('pointerout', () => {
            this.setDepth(1);
            scene.tweens.killTweensOf(this);
            scene.tweens.add({
                targets: this,
                scaleX: 1.0,
                scaleY: 1.0,
                duration: 100,
                ease: 'Power1',
                onComplete: () => {
                    if (state === 'current') {
                        scene.tweens.add({ targets: this, scaleX: 1.04, scaleY: 1.04, duration: 1600, yoyo: true, repeat: -1 });
                    }
                }
            });
            drawBg();

            if (scene.tooltip) {
                scene.tooltip.setVisible(false);
            }
        });
        zone.on('pointerdown', () => {
            scene.tweens.add({ targets: this, scaleX: state === 'current' ? 0.99 : 0.95, scaleY: state === 'current' ? 0.99 : 0.95, duration: 50 });
        });
        zone.on('pointerup', () => {
            scene.tweens.add({
                targets: this, scaleX: state === 'current' ? 1.04 : 1.0, scaleY: state === 'current' ? 1.04 : 1.0, duration: 50,
                onComplete: () => {
                    if (!scene.isDraggingRef()) {
                        scene.sound.play('key_sound');
                        if (isBoss) {
                            scene.scene.start('BossScene', { lessonIndex: index });
                        } else {
                            scene.scene.start('PlayScene', { lessonIndex: index });
                        }
                    }
                }
            });
        });

        scene.add.existing(this);
    }
}
