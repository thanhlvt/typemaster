import * as Phaser from 'phaser';

export class ResultOverlay extends Phaser.GameObjects.Container {
    constructor(scene, accuracy, wpm, isLastLesson, onBackToMap) {
        const { width, height } = scene.scale;
        super(scene, 0, 0);
        this.scene = scene;

        const overlay = scene.add.rectangle(0, 0, width, height, 0x000000, 0.8)
            .setOrigin(0).setInteractive();
        this.add(overlay);

        const container = scene.add.container(width / 2, height / 2 - 40);

        const shine = scene.add.graphics();
        shine.fillStyle(0xFFC107, 0.08);
        shine.fillCircle(0, -60, 150);
        container.add(shine);

        const title = scene.add.text(0, -135, 'XUẤT SẮC!', {
            fontFamily: 'Outfit, Arial', fontSize: '56px', fontStyle: 'bold', fill: '#FFC107'
        }).setOrigin(0.5).setAlpha(0).setScale(0.5);

        // Stars
        const stars = accuracy >= 95 ? 3 : (accuracy >= 80 ? 2 : 1);
        const starCoords = [
            { x: -65, y: -60, rOut: 24, rIn: 10 },
            { x:   0, y: -80, rOut: 32, rIn: 13 },
            { x:  65, y: -60, rOut: 24, rIn: 10 }
        ];

        const starsBg = scene.add.graphics();
        container.add(starsBg);
        starCoords.forEach(c => this._drawStar(starsBg, c.x, c.y, 5, c.rOut, c.rIn, 0x444444, 0x222222));

        for (let i = 0; i < stars; i++) {
            const c = starCoords[i];
            const goldStar = scene.add.graphics();
            goldStar.x = c.x; goldStar.y = c.y; goldStar.setScale(0);
            this._drawStar(goldStar, 0, 0, 5, c.rOut, c.rIn, 0xFFC107, 0xFF8F00);
            container.add(goldStar);
            scene.tweens.add({ targets: goldStar, scaleX: 1, scaleY: 1, duration: 400, delay: 200 + i * 200, ease: 'Back.easeOut' });
        }

        // Stats box
        const statsBg = scene.add.graphics();
        statsBg.fillStyle(0x1e293b, 1);
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

        // Buttons
        let btnTargets = [];
        if (isLastLesson) {
            const { bg: mb, text: mt } = this._makeButton(scene, container, -90, 160, '🗺️ Bản đồ', '20px', 0x1565C0, 0x1E88E5,
                () => { this.destroy(); if (onBackToMap) onBackToMap(); });
            const { bg: rb, text: rt } = this._makeButton(scene, container,  90, 160, '🔄 Thử lại', '20px', 0xF57C00, 0xFF9800,
                () => this.emit('retry'));
            btnTargets = [mb, mt, rb, rt];
        } else {
            const { bg: mb, text: mt } = this._makeButton(scene, container, -125, 110, '🗺️ Bản đồ',  '16px', 0x1565C0, 0x1E88E5,
                () => { this.destroy(); if (onBackToMap) onBackToMap(); });
            const { bg: rb, text: rt } = this._makeButton(scene, container,    0, 110, '🔄 Thử lại',  '16px', 0xF57C00, 0xFF9800,
                () => this.emit('retry'));
            const { bg: cb, text: ct } = this._makeButton(scene, container,  125, 110, 'Tiếp tục ➔', '16px', 0x4CAF50, 0x66BB6A,
                () => this.emit('continue'));
            btnTargets = [mb, mt, rb, rt, cb, ct];
        }

        const hintStr = isLastLesson
            ? 'Phím tắt: [Enter] Thử lại  •  [Esc] Bản đồ'
            : 'Phím tắt: [Space] Tiếp tục  •  [Enter] Thử lại  •  [Esc] Bản đồ';
        const hintText = scene.add.text(0, 205, hintStr, {
            fontFamily: 'Arial', fontSize: '15px', fontStyle: 'bold', fill: '#94A3B8'
        }).setOrigin(0.5).setAlpha(0);
        container.add(hintText);

        this.add(container);

        // Animations
        scene.tweens.add({ targets: title, alpha: 1, scale: 1, duration: 600, ease: 'Back.Out' });
        scene.tweens.add({ targets: [statsBg, accText, wpmText], alpha: 1, y: '+=15', duration: 500, delay: 300, ease: 'Power2' });
        scene.tweens.add({ targets: [...btnTargets, hintText], alpha: 1, duration: 300, delay: 850 });

        if (scene.monkey) {
            const origY = scene.monkey.y;
            scene.tweens.add({ targets: scene.monkey, y: origY - 70, duration: 220, yoyo: true, repeat: 4, ease: 'Power2' });
        }

        for (let i = 0; i < 10; i++) {
            scene.time.delayedCall(i * 130, () => {
                const b = scene.add.image(Phaser.Math.Between(30, width - 30), -30, 'banana')
                    .setScale(Phaser.Math.FloatBetween(0.2, 0.4))
                    .setAngle(Phaser.Math.Between(-45, 45));
                this.add(b);
                scene.tweens.add({
                    targets: b, y: height + 40,
                    angle: b.angle + Phaser.Math.Between(-180, 180),
                    duration: Phaser.Math.Between(900, 1600),
                    ease: 'Linear',
                    onComplete: () => b.destroy()
                });
            });
        }

        scene.add.existing(this);
    }

    // ── Helpers ───────────────────────────────────────────────────

    _makeButton(scene, container, cx, w, label, fontSize, baseColor, hoverColor, onDown) {
        const yTop = 130, h = 50, yCtr = 155;

        const bg = scene.add.graphics();
        const draw = (color) => {
            bg.clear();
            bg.fillStyle(color, 1);
            bg.fillRoundedRect(cx - w / 2, yTop, w, h, 25);
            bg.lineStyle(2, 0xffffff, 0.2);
            bg.strokeRoundedRect(cx - w / 2, yTop, w, h, 25);
        };
        draw(baseColor);
        bg.setAlpha(0);

        const text = scene.add.text(cx, yCtr, label, {
            fontFamily: 'Arial', fontSize, fontStyle: 'bold', fill: '#FFFFFF'
        }).setOrigin(0.5).setAlpha(0);
        text.setShadow(0, 2, '#000000', 4, true, true);

        const zone = scene.add.zone(cx, yCtr, w, h).setInteractive({ useHandCursor: true });
        zone.on('pointerover', () => draw(hoverColor));
        zone.on('pointerout',  () => draw(baseColor));
        zone.on('pointerdown', onDown);

        container.add([bg, text, zone]);
        return { bg, text };
    }

    _drawStar(graphics, x, y, points, outerRadius, innerRadius, fillColor, strokeColor) {
        graphics.fillStyle(fillColor, 1);
        graphics.lineStyle(2, strokeColor, 1);

        let rot = Math.PI / 2 * 3;
        let step = Math.PI / points;
        graphics.beginPath();
        graphics.moveTo(x, y - outerRadius);
        for (let i = 0; i < points; i++) {
            graphics.lineTo(x + Math.cos(rot) * outerRadius, y + Math.sin(rot) * outerRadius);
            rot += step;
            graphics.lineTo(x + Math.cos(rot) * innerRadius, y + Math.sin(rot) * innerRadius);
            rot += step;
        }
        graphics.lineTo(x, y - outerRadius);
        graphics.closePath();
        graphics.fillPath();
        graphics.strokePath();
    }
}
