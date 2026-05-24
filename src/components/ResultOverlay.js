import * as Phaser from 'phaser';

export class ResultOverlay extends Phaser.GameObjects.Container {
    constructor(scene, accuracy, wpm, isLastLesson, onBackToMap, oldStats = null, isDailyChallenge = false, customTitle = null, dailyBonusAwarded = false) {
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

        const titleStr = customTitle || (isDailyChallenge ? 'THÀNH CÔNG!' : 'XUẤT SẮC!');
        const title = scene.add.text(0, -135, titleStr, {
            fontFamily: 'Outfit, Arial', fontSize: (isDailyChallenge || customTitle) ? '48px' : '56px', fontStyle: 'bold', fill: '#FFC107'
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

        // Stats box container to ensure everything slides down as a single unit
        const statsBoxContainer = scene.add.container(0, -15); // Start 15px higher for the entrance tween
        statsBoxContainer.setAlpha(0);

        const boxW = 360;
        const boxH = 165;
        const statsBg = scene.add.graphics();
        statsBg.fillStyle(0x1e293b, 1);
        statsBg.fillRoundedRect(-boxW / 2, -10, boxW, boxH, 15);
        statsBg.lineStyle(2, 0xffffff, 0.1);
        statsBg.strokeRoundedRect(-boxW / 2, -10, boxW, boxH, 15);

        const accText = scene.add.text(-90, 45, `Chính xác\n${accuracy}%`, {
            fontFamily: 'Arial', fontSize: '20px', align: 'center', fill: '#ffffff', fontStyle: 'bold'
        }).setOrigin(0.5);

        const wpmText = scene.add.text(90, 45, `Tốc độ\n${wpm} WPM`, {
            fontFamily: 'Arial', fontSize: '20px', align: 'center', fill: '#ffffff', fontStyle: 'bold'
        }).setOrigin(0.5);

        statsBoxContainer.add([statsBg, accText, wpmText]);
        container.add([statsBoxContainer, title]);

        // Feedback deltas / challenge rewards
        const feedbackLines = [];
        if (!isDailyChallenge && oldStats) {
            const oldWpm = oldStats.wpm || 0;
            const oldStars = oldStats.stars || 0;
            const deltaWpm = wpm - oldWpm;

            if (oldWpm > 0 && deltaWpm > 0) {
                feedbackLines.push({ text: `Kỷ lục mới! ⭐ (+${deltaWpm} WPM)`, color: '#86EFAC' });
            }
            if (stars === 3 && oldStars < 3) {
                feedbackLines.push({ text: `Lần đầu đạt 3 sao! 🌟`, color: '#38BDF8' });
            }
        } else if (isDailyChallenge) {
            feedbackLines.push({ text: `Thử thách ngày hoàn thành! 🏆`, color: '#FCD34D' });
            if (dailyBonusAwarded) {
                feedbackLines.push({ text: `Thưởng thêm: +20 🍌 Chuối`, color: '#86EFAC' });
            }
        }

        feedbackLines.forEach((line, idx) => {
            const yPos = feedbackLines.length === 1 ? 120 : 106 + idx * 30;
            const fbText = scene.add.text(0, yPos, line.text, {
                fontFamily: 'Arial', fontSize: '18px', fontStyle: 'bold', fill: line.color
            }).setOrigin(0.5);
            statsBoxContainer.add(fbText);
        });

        // Buttons
        let btnTargets = [];
        if (isLastLesson) {
            const { bg: mb, text: mt } = this._makeButton(scene, container, -90, 160, '🗺️ Bản đồ', '20px', 0x1565C0, 0x1E88E5,
                () => { this.destroy(); if (onBackToMap) onBackToMap(); }, 35);
            const { bg: rb, text: rt } = this._makeButton(scene, container,  90, 160, '🔄 Thử lại', '20px', 0xF57C00, 0xFF9800,
                () => this.emit('retry'), 35);
            btnTargets = [mb, mt, rb, rt];
        } else {
            const { bg: mb, text: mt } = this._makeButton(scene, container, -125, 110, '🗺️ Bản đồ',  '16px', 0x1565C0, 0x1E88E5,
                () => { this.destroy(); if (onBackToMap) onBackToMap(); }, 35);
            const { bg: rb, text: rt } = this._makeButton(scene, container,    0, 110, '🔄 Thử lại',  '16px', 0xF57C00, 0xFF9800,
                () => this.emit('retry'), 35);
            const { bg: cb, text: ct } = this._makeButton(scene, container,  125, 110, 'Tiếp tục ➔', '16px', 0x4CAF50, 0x66BB6A,
                () => this.emit('continue'), 35);
            btnTargets = [mb, mt, rb, rt, cb, ct];
        }

        const hintStr = isLastLesson
            ? 'Phím tắt: [Esc] Bản đồ  •  [Enter] Thử lại'
            : 'Phím tắt: [Esc] Bản đồ  •  [Enter] Thử lại  •  [Space] Tiếp tục';
        const hintText = scene.add.text(0, 240, hintStr, {
            fontFamily: 'Arial', fontSize: '15px', fontStyle: 'bold', fill: '#94A3B8'
        }).setOrigin(0.5).setAlpha(0);
        container.add(hintText);

        this.add(container);

        // Animations
        scene.tweens.add({ targets: title, alpha: 1, scale: 1, duration: 600, ease: 'Back.Out' });
        scene.tweens.add({ targets: statsBoxContainer, alpha: 1, y: 0, duration: 500, delay: 300, ease: 'Power2' });
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

    _makeButton(scene, container, cx, w, label, fontSize, baseColor, hoverColor, onDown, yOffset = 0) {
        const yTop = 130 + yOffset, h = 50, yCtr = 155 + yOffset;

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
