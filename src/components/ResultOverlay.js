import * as Phaser from 'phaser';

export class ResultOverlay extends Phaser.GameObjects.Container {
    constructor(scene, accuracy, wpm, isLastLesson, onBackToMap) {
        const { width, height } = scene.scale;
        super(scene, 0, 0);
        this.scene = scene;

        // Dark background overlay
        const overlay = scene.add.rectangle(0, 0, width, height, 0x000000, 0.8)
            .setOrigin(0).setInteractive();
        this.add(overlay);

        const container = scene.add.container(width / 2, height / 2 - 40);

        // Stars background/shine glow
        const shine = scene.add.graphics();
        shine.fillStyle(0xFFC107, 0.08);
        shine.fillCircle(0, -60, 150);
        container.add(shine);

        const title = scene.add.text(0, -135, 'XUẤT SẮC!', {
            fontFamily: 'Outfit, Arial', fontSize: '56px', fontStyle: 'bold', fill: '#FFC107'
        }).setOrigin(0.5).setAlpha(0).setScale(0.5);

        // Draw animated stars
        const stars = accuracy >= 95 ? 3 : (accuracy >= 80 ? 2 : 1);
        const starCoords = [
            { x: -65, y: -60, rOut: 24, rIn: 10 },  // Left star
            { x: 0,   y: -80, rOut: 32, rIn: 13 },  // Middle star (larger & slightly higher)
            { x: 65,  y: -60, rOut: 24, rIn: 10 }   // Right star
        ];

        // Draw 3 grey outline background stars
        const starsBg = scene.add.graphics();
        container.add(starsBg);
        starCoords.forEach(coord => {
            this.drawStar(starsBg, coord.x, coord.y, 5, coord.rOut, coord.rIn, 0x444444, 0x222222);
        });

        // Add and animate active gold stars
        for (let i = 0; i < stars; i++) {
            const coord = starCoords[i];
            const goldStar = scene.add.graphics();
            goldStar.x = coord.x;
            goldStar.y = coord.y;
            goldStar.setScale(0); // Starts at scale 0
            
            // Draw star centered at 0,0 inside its graphics context
            this.drawStar(goldStar, 0, 0, 5, coord.rOut, coord.rIn, 0xFFC107, 0xFF8F00);
            container.add(goldStar);

            // Pop-in tween with elastic bounce
            scene.tweens.add({
                targets: goldStar,
                scaleX: 1,
                scaleY: 1,
                duration: 400,
                delay: 200 + i * 200,
                ease: 'Back.easeOut'
            });
        }

        // Stats Box
        const statsBg = scene.add.graphics();
        statsBg.fillStyle(0x1e293b, 1); // Slate 800
        statsBg.fillRoundedRect(-150, -10, 300, 110, 15);
        statsBg.lineStyle(2, 0xffffff, 0.1);
        statsBg.strokeRoundedRect(-150, -10, 300, 110, 15);
        statsBg.setAlpha(0);

        const accText = scene.add.text(-80, 45, `Chính xác\n${accuracy}%`, {
            fontFamily: 'Arial', fontSize: '20px', align: 'center', fill: '#ffffff', fontStyle: 'bold'
        }).setOrigin(0.5).setAlpha(0);

        const wpmText = scene.add.text(80, 45, `Tốc độ\n${wpm} WPM`, {
            fontFamily: 'Arial', fontSize: '20px', align: 'center', fill: '#ffffff', fontStyle: 'bold'
        }).setOrigin(0.5).setAlpha(0);

        container.add([statsBg, accText, wpmText, title]);

        // Layout Buttons
        if (isLastLesson) {
            // Two buttons: Map (left, x = -90) and Retry (right, x = 90)
            const mapBtnBg = scene.add.graphics();
            const drawMapBg = (color) => {
                mapBtnBg.clear();
                mapBtnBg.fillStyle(color, 1);
                mapBtnBg.fillRoundedRect(-170, 130, 160, 50, 25);
                mapBtnBg.lineStyle(2, 0xffffff, 0.2);
                mapBtnBg.strokeRoundedRect(-170, 130, 160, 50, 25);
            };
            drawMapBg(0x1565C0);
            mapBtnBg.setAlpha(0);

            const mapBtnText = scene.add.text(-90, 155, '🗺️ Bản đồ', {
                fontFamily: 'Arial', fontSize: '20px', fontStyle: 'bold', fill: '#FFFFFF'
            }).setOrigin(0.5).setAlpha(0);
            mapBtnText.setShadow(0, 2, '#000000', 4, true, true);

            const retryBtnBg = scene.add.graphics();
            const drawRetryBg = (color) => {
                retryBtnBg.clear();
                retryBtnBg.fillStyle(color, 1);
                retryBtnBg.fillRoundedRect(10, 130, 160, 50, 25);
                retryBtnBg.lineStyle(2, 0xffffff, 0.2);
                retryBtnBg.strokeRoundedRect(10, 130, 160, 50, 25);
            };
            drawRetryBg(0xF57C00);
            retryBtnBg.setAlpha(0);

            const retryBtnText = scene.add.text(90, 155, '🔄 Thử lại', {
                fontFamily: 'Arial', fontSize: '20px', fontStyle: 'bold', fill: '#FFFFFF'
            }).setOrigin(0.5).setAlpha(0);
            retryBtnText.setShadow(0, 2, '#000000', 4, true, true);

            container.add([mapBtnBg, mapBtnText, retryBtnBg, retryBtnText]);

            const mapZone = scene.add.zone(-90, 155, 160, 50).setInteractive({ useHandCursor: true });
            const retryZone = scene.add.zone(90, 155, 160, 50).setInteractive({ useHandCursor: true });
            container.add([mapZone, retryZone]);

            mapZone.on('pointerover', () => drawMapBg(0x1E88E5));
            mapZone.on('pointerout', () => drawMapBg(0x1565C0));
            mapZone.on('pointerdown', () => {
                this.destroy();
                if (onBackToMap) onBackToMap();
            });

            retryZone.on('pointerover', () => drawRetryBg(0xFF9800));
            retryZone.on('pointerout', () => drawRetryBg(0xF57C00));
            retryZone.on('pointerdown', () => {
                this.emit('retry');
            });

            scene.tweens.add({ targets: [mapBtnBg, mapBtnText, retryBtnBg, retryBtnText], alpha: 1, duration: 300, delay: 850 });
        } else {
            // Three buttons: Map (left, x = -125), Retry (middle, x = 0), Continue (right, x = 125)
            const mapBtnBg = scene.add.graphics();
            const drawMapBg = (color) => {
                mapBtnBg.clear();
                mapBtnBg.fillStyle(color, 1);
                mapBtnBg.fillRoundedRect(-180, 130, 110, 50, 25);
                mapBtnBg.lineStyle(2, 0xffffff, 0.2);
                mapBtnBg.strokeRoundedRect(-180, 130, 110, 50, 25);
            };
            drawMapBg(0x1565C0);
            mapBtnBg.setAlpha(0);

            const mapBtnText = scene.add.text(-125, 155, '🗺️ Bản đồ', {
                fontFamily: 'Arial', fontSize: '16px', fontStyle: 'bold', fill: '#FFFFFF'
            }).setOrigin(0.5).setAlpha(0);
            mapBtnText.setShadow(0, 2, '#000000', 4, true, true);

            const retryBtnBg = scene.add.graphics();
            const drawRetryBg = (color) => {
                retryBtnBg.clear();
                retryBtnBg.fillStyle(color, 1);
                retryBtnBg.fillRoundedRect(-55, 130, 110, 50, 25);
                retryBtnBg.lineStyle(2, 0xffffff, 0.2);
                retryBtnBg.strokeRoundedRect(-55, 130, 110, 50, 25);
            };
            drawRetryBg(0xF57C00);
            retryBtnBg.setAlpha(0);

            const retryBtnText = scene.add.text(0, 155, '🔄 Thử lại', {
                fontFamily: 'Arial', fontSize: '16px', fontStyle: 'bold', fill: '#FFFFFF'
            }).setOrigin(0.5).setAlpha(0);
            retryBtnText.setShadow(0, 2, '#000000', 4, true, true);

            const contBtnBg = scene.add.graphics();
            const drawContBg = (color) => {
                contBtnBg.clear();
                contBtnBg.fillStyle(color, 1);
                contBtnBg.fillRoundedRect(70, 130, 110, 50, 25);
                contBtnBg.lineStyle(2, 0xffffff, 0.2);
                contBtnBg.strokeRoundedRect(70, 130, 110, 50, 25);
            };
            drawContBg(0x4CAF50);
            contBtnBg.setAlpha(0);

            const contBtnText = scene.add.text(125, 155, 'Tiếp tục ➔', {
                fontFamily: 'Arial', fontSize: '16px', fontStyle: 'bold', fill: '#FFFFFF'
            }).setOrigin(0.5).setAlpha(0);
            contBtnText.setShadow(0, 2, '#000000', 4, true, true);

            container.add([mapBtnBg, mapBtnText, retryBtnBg, retryBtnText, contBtnBg, contBtnText]);

            const mapZone = scene.add.zone(-125, 155, 110, 50).setInteractive({ useHandCursor: true });
            const retryZone = scene.add.zone(0, 155, 110, 50).setInteractive({ useHandCursor: true });
            const contZone = scene.add.zone(125, 155, 110, 50).setInteractive({ useHandCursor: true });
            container.add([mapZone, retryZone, contZone]);

            mapZone.on('pointerover', () => drawMapBg(0x1E88E5));
            mapZone.on('pointerout', () => drawMapBg(0x1565C0));
            mapZone.on('pointerdown', () => {
                this.destroy();
                if (onBackToMap) onBackToMap();
            });

            retryZone.on('pointerover', () => drawRetryBg(0xFF9800));
            retryZone.on('pointerout', () => drawRetryBg(0xF57C00));
            retryZone.on('pointerdown', () => {
                this.emit('retry');
            });

            contZone.on('pointerover', () => drawContBg(0x66BB6A));
            contZone.on('pointerout', () => drawContBg(0x4CAF50));
            contZone.on('pointerdown', () => {
                this.emit('continue');
            });

            scene.tweens.add({ targets: [mapBtnBg, mapBtnText, retryBtnBg, retryBtnText, contBtnBg, contBtnText], alpha: 1, duration: 300, delay: 850 });
        }

        // Shortcut hint text at the bottom
        const hintStr = isLastLesson ? 'Phím tắt: [Enter] Thử lại  •  [Esc] Bản đồ' : 'Phím tắt: [Space] Tiếp tục  •  [Enter] Thử lại  •  [Esc] Bản đồ';
        const shortcutHintText = scene.add.text(0, 205, hintStr, {
            fontFamily: 'Arial', fontSize: '15px', fontStyle: 'bold', fill: '#94A3B8'
        }).setOrigin(0.5).setAlpha(0);
        container.add(shortcutHintText);

        this.add(container);

        // Animations for title and stats
        scene.tweens.add({ targets: title, alpha: 1, scale: 1, duration: 600, ease: 'Back.Out' });
        scene.tweens.add({ targets: [statsBg, accText, wpmText], alpha: 1, y: '+=15', duration: 500, delay: 300, ease: 'Power2' });
        scene.tweens.add({ targets: shortcutHintText, alpha: 1, duration: 300, delay: 850 });

        // Monkey jump animation if scene has it
        if (scene.monkey) {
            const origY = scene.monkey.y;
            scene.tweens.add({
                targets: scene.monkey,
                y: origY - 70,
                duration: 220,
                yoyo: true,
                repeat: 4,
                ease: 'Power2'
            });
        }

        // Banana rain
        for (let i = 0; i < 10; i++) {
            scene.time.delayedCall(i * 130, () => {
                const b = scene.add.image(
                    Phaser.Math.Between(30, width - 30), -30, 'banana'
                ).setScale(Phaser.Math.FloatBetween(0.2, 0.4))
                    .setAngle(Phaser.Math.Between(-45, 45));

                this.add(b);

                scene.tweens.add({
                    targets: b,
                    y: height + 40,
                    angle: b.angle + Phaser.Math.Between(-180, 180),
                    duration: Phaser.Math.Between(900, 1600),
                    ease: 'Linear',
                    onComplete: () => {
                        b.destroy();
                    }
                });
            });
        }

        scene.add.existing(this);
    }

    drawStar(graphics, x, y, points, outerRadius, innerRadius, fillColor, strokeColor) {
        graphics.fillStyle(fillColor, 1);
        graphics.lineStyle(2, strokeColor, 1);
        
        let rot = Math.PI / 2 * 3;
        let cx = x;
        let cy = y;
        let step = Math.PI / points;

        graphics.beginPath();
        graphics.moveTo(cx, cy - outerRadius);
        for (let i = 0; i < points; i++) {
            cx = x + Math.cos(rot) * outerRadius;
            cy = y + Math.sin(rot) * outerRadius;
            graphics.lineTo(cx, cy);
            rot += step;

            cx = x + Math.cos(rot) * innerRadius;
            cy = y + Math.sin(rot) * innerRadius;
            graphics.lineTo(cx, cy);
            rot += step;
        }
        graphics.lineTo(x, y - outerRadius);
        graphics.closePath();
        graphics.fillPath();
        graphics.strokePath();
    }
}
