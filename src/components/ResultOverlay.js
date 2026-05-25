import * as Phaser from 'phaser';

export class ResultOverlay extends Phaser.GameObjects.Container {
    constructor(scene, accuracy, wpm, isLastLesson, onBackToMap, oldStats = null, isDailyChallenge = false, customTitle = null, dailyBonusAwarded = false) {
        const { width, height } = scene.scale;
        super(scene, 0, 0);
        this.scene = scene;

        // Dark backdrop overlay
        const overlay = scene.add.rectangle(0, 0, width, height, 0x0a0f1d, 0.85)
            .setOrigin(0).setInteractive();
        this.add(overlay);

        const container = scene.add.container(width / 2, height / 2 - 20);

        // 1. Determine card type / state
        const oldWpm = oldStats ? (oldStats.wpm || 0) : 0;
        const isNewRecord = wpm > oldWpm && oldWpm > 0;
        const isSprintMode = customTitle === 'HẾT GIỜ!';
        
        let state = 'great'; // 'record', 'almost', 'great'
        if (isNewRecord) {
            state = 'record';
        } else if (oldWpm > 0 && oldWpm - wpm > 0 && oldWpm - wpm <= 5) {
            state = 'almost';
        } else {
            state = 'great';
        }

        // 2. Set colors and properties based on state
        let cardGradient = {
            topLeft: 0xff7e40,     // Orange/Pink theme
            topRight: 0xff5978,
            bottomLeft: 0xf43f5e,
            bottomRight: 0xec4899
        };
        let titleStr = 'GIỎI LẮM!';
        let subtitleStr = '';
        let buttonText = 'Tiếp tục ➔';
        let buttonTextColor = 0xe11d48; // Rose 600

        if (state === 'record') {
            cardGradient = {
                topLeft: 0x14b8a6,     // Teal/Emerald theme
                topRight: 0x10b981,
                bottomLeft: 0x0f766e,
                bottomRight: 0x047857
            };
            titleStr = '🎉 KỶ LỤC MỚI!';
            subtitleStr = `WPM (cũ: ${oldWpm})`;
            buttonText = (isDailyChallenge || isSprintMode) ? 'Thử lại 🔁' : (isLastLesson ? 'Quay lại Bản đồ 🗺️' : 'Tiếp tục ➔');
            buttonTextColor = 0x047857; // Dark emerald
        } else if (state === 'almost') {
            cardGradient = {
                topLeft: 0x8b5cf6,     // Purple/Indigo theme
                topRight: 0x6366f1,
                bottomLeft: 0x6d28d9,
                bottomRight: 0x4f46e5
            };
            titleStr = '💪 SUÝT NỮA!';
            subtitleStr = `WPM · Cách kỷ lục ${oldWpm - wpm} từ`;
            buttonText = 'Thử lại 🔁';
            buttonTextColor = 0x5b21b6; // Violet 800
        } else {
            // state === 'great'
            titleStr = customTitle ? `${customTitle.toUpperCase()}` : 'GIỎI LẮM!';
            if (customTitle === 'HẾT GIỜ!') {
                titleStr = `⏰ HẾT GIỜ!`;
                subtitleStr = `WPM · Bé đã gõ ${wpm} từ trong 60s`;
            } else if (isDailyChallenge) {
                titleStr = `🏆 THÀNH CÔNG!`;
                subtitleStr = `WPM · Bé đã hoàn thành thử thách xuất sắc!`;
            } else {
                subtitleStr = `WPM · Bé đã hoàn thành bài học xuất sắc!`;
            }
            buttonText = (isDailyChallenge || isSprintMode) ? 'Thử lại 🔁' : (isLastLesson ? 'Quay lại Bản đồ 🗺️' : 'Tiếp tục ➔');
            buttonTextColor = 0xe11d48; // Rose 600
        }

        // Helper navigation actions
        const handleBack = () => {
            if (onBackToMap) onBackToMap();
            if (this.scene) this.destroy();
        };

        const handleRetry = () => {
            this.emit('retry');
            if (this.scene) this.destroy();
        };

        const handleContinue = () => {
            this.emit('continue');
            if (this.scene) this.destroy();
        };

        // 3. Draw Card Background
        const cardW = 390;
        const cardH = 430;
        const cardBg = scene.add.graphics();
        cardBg.fillGradientStyle(
            cardGradient.topLeft, cardGradient.topRight,
            cardGradient.bottomLeft, cardGradient.bottomRight, 1
        );
        cardBg.fillRoundedRect(-cardW / 2, -cardH / 2, cardW, cardH, 28);
        cardBg.lineStyle(1.5, 0xffffff, 0.2);
        cardBg.strokeRoundedRect(-cardW / 2, -cardH / 2, cardW, cardH, 28);
        container.add(cardBg);

        // 4. Render Stars (display stars achieved like before)
        const stars = accuracy >= 95 ? 3 : (accuracy >= 80 ? 2 : 1);
        const starCoords = [
            { x: -55, y: -125, rOut: 18, rIn: 8 },
            { x:   0, y: -143, rOut: 24, rIn: 11 },
            { x:  55, y: -125, rOut: 18, rIn: 8 }
        ];

        // Draw background stars (gray)
        const starsBg = scene.add.graphics();
        container.add(starsBg);
        starCoords.forEach(c => this._drawStar(starsBg, c.x, c.y, 5, c.rOut, c.rIn, 0x444444, 0x222222));

        // Draw gold stars with scale animation
        for (let i = 0; i < stars; i++) {
            const c = starCoords[i];
            const goldStar = scene.add.graphics();
            goldStar.x = c.x; goldStar.y = c.y; goldStar.setScale(0);
            this._drawStar(goldStar, 0, 0, 5, c.rOut, c.rIn, 0xFFC107, 0xFF8F00);
            container.add(goldStar);
            scene.tweens.add({ targets: goldStar, scaleX: 1, scaleY: 1, duration: 400, delay: 200 + i * 200, ease: 'Back.easeOut' });
        }

        // 5. Render Card Title, Score and Subtitle
        // Title
        const titleText = scene.add.text(0, -60, titleStr, {
            fontFamily: 'Outfit, Arial', fontSize: '24px', fontStyle: 'bold', fill: '#ffffff'
        }).setOrigin(0.5);
        titleText.setStroke('#0f172a', 4);
        titleText.setShadow(0, 2, 'rgba(0,0,0,0.4)', 4, true, true);
        container.add(titleText);

        // WPM Score
        const scoreText = scene.add.text(0, 10, `${wpm}`, {
            fontFamily: 'Outfit, Arial', fontSize: '76px', fontStyle: 'bold', fill: '#ffffff'
        }).setOrigin(0.5);
        scoreText.setStroke('#0f172a', 6);
        scoreText.setShadow(0, 4, 'rgba(0,0,0,0.5)', 6, true, true);
        container.add(scoreText);

        // Subtitle
        const subText = scene.add.text(0, 70, subtitleStr, {
            fontFamily: 'Arial', fontSize: '14px', fill: 'rgba(255, 255, 255, 0.9)', fontStyle: 'bold'
        }).setOrigin(0.5);
        subText.setShadow(0, 1, 'rgba(0,0,0,0.3)', 2, true, true);
        container.add(subText);

        // 6. Render Badges (only in 'record' state)
        if (state === 'record') {
            const bananaBonus = isDailyChallenge ? 20 : 15;
            
            const bananaRewardContainer = scene.add.container(0, 110);
            container.add(bananaRewardContainer);

            const bPill = scene.add.graphics();
            bPill.fillStyle(0xFFD700, 0.2);
            bPill.lineStyle(2, 0xFFD700, 1);
            bPill.fillRoundedRect(-80, -18, 160, 36, 18);
            bPill.strokeRoundedRect(-80, -18, 160, 36, 18);
            bananaRewardContainer.add(bPill);

            const bText = scene.add.text(0, 0, `+${bananaBonus} 🍌`, {
                fontFamily: 'Outfit, Segoe UI Emoji, Arial', fontSize: '16px', fontStyle: 'bold', fill: '#FFD700',
                padding: { top: 4, bottom: 4, left: 4, right: 4 }
            }).setOrigin(0.5);
            bText.setShadow(0, 1.5, '#000000', 3, true, true);
            bananaRewardContainer.add(bText);

            // Entry scale animation for reward
            bananaRewardContainer.setScale(0);
            scene.tweens.add({
                targets: bananaRewardContainer,
                scaleX: 1,
                scaleY: 1,
                duration: 400,
                delay: 600,
                ease: 'Back.easeOut'
            });
        }

        // 7. Draw Primary White Button (always drawn for card layout balance)
        const btnW = 230;
        const btnH = 46;
        const btnX = 0;
        const btnY = 170;

        const whiteButtonContainer = scene.add.container(btnX, btnY);
        container.add(whiteButtonContainer);

        const btnBg = scene.add.graphics();
        btnBg.fillStyle(0xffffff, 1);
        btnBg.fillRoundedRect(-btnW / 2, -btnH / 2, btnW, btnH, btnH / 2);
        btnBg.lineStyle(1, 0xffffff, 0.5);
        btnBg.strokeRoundedRect(-btnW / 2, -btnH / 2, btnW, btnH, btnH / 2);
        whiteButtonContainer.add(btnBg);

        const btnTextObj = scene.add.text(0, 0, buttonText, {
            fontFamily: 'Segoe UI Emoji, Arial', fontSize: '16px', fontStyle: 'bold', fill: '#' + buttonTextColor.toString(16).padStart(6, '0'),
            padding: { top: 6, bottom: 6, left: 6, right: 6 }
        }).setOrigin(0.5);
        whiteButtonContainer.add(btnTextObj);

        // Click zone for primary button inside card
        const btnZone = scene.add.zone(0, 0, btnW, btnH)
            .setInteractive({ useHandCursor: true });
        whiteButtonContainer.add(btnZone);

        btnZone.on('pointerdown', () => {
            scene.sound.play('key_sound');
            if (buttonText === 'Tiếp tục ➔') {
                handleContinue();
            } else if (buttonText === 'Thử lại 🔁') {
                handleRetry();
            } else if (buttonText === 'Quay lại Bản đồ 🗺️') {
                handleBack();
            } else {
                handleContinue();
            }
        });

        // Micro-animations on hover (scale the sub-container to avoid offsets)
        btnZone.on('pointerover', () => {
            scene.tweens.add({
                targets: whiteButtonContainer,
                scaleX: 1.03,
                scaleY: 1.03,
                duration: 100,
                ease: 'Power1'
            });
        });
        btnZone.on('pointerout', () => {
            scene.tweens.add({
                targets: whiteButtonContainer,
                scaleX: 1.0,
                scaleY: 1.0,
                duration: 100,
                ease: 'Power1'
            });
        });

        // 8. Render classic Navigation Buttons below the Card (Y = 250)
        const navBtnH = 36;
        const navBtnY = 250;

        if (isLastLesson) {
            // Only 1 button below the card because the other is inside the card
            if (buttonText === 'Quay lại Bản đồ 🗺️') {
                // Inside card is "Quay lại Bản đồ 🗺️", so below card is "Thử lại"
                this._makeNavButton(scene, container, 0, navBtnY, 150, navBtnH, '🔄 Thử lại', 0xF57C00, 0xFF9800, handleRetry);
            } else {
                // Inside card is "Thử lại 🔁", so below card is "Bản đồ"
                this._makeNavButton(scene, container, 0, navBtnY, 150, navBtnH, '🗺️ Bản đồ', 0x1565C0, 0x1E88E5, handleBack);
            }
        } else {
            // 2 buttons below the card
            if (buttonText === 'Tiếp tục ➔') {
                // Inside card is "Tiếp tục", so below card are "Bản đồ" (left) and "Thử lại" (right)
                this._makeNavButton(scene, container, -80, navBtnY, 130, navBtnH, '🗺️ Bản đồ', 0x1565C0, 0x1E88E5, handleBack);
                this._makeNavButton(scene, container,  80, navBtnY, 130, navBtnH, '🔄 Thử lại', 0xF57C00, 0xFF9800, handleRetry);
            } else {
                // Inside card is "Thử lại", so below card are "Bản đồ" (left) and "Tiếp tục" (right)
                this._makeNavButton(scene, container, -80, navBtnY, 130, navBtnH, '🗺️ Bản đồ', 0x1565C0, 0x1E88E5, handleBack);
                this._makeNavButton(scene, container,  80, navBtnY, 130, navBtnH, 'Tiếp tục ➔', 0x4CAF50, 0x66BB6A, handleContinue);
            }
        }

        // 9. Hint text at the bottom (Y = 295)
        const hintStr = isLastLesson
            ? 'Phím tắt: [Esc] Bản đồ  •  [Enter] Thử lại'
            : 'Phím tắt: [Esc] Bản đồ  •  [Enter] Thử lại  •  [Space] Tiếp tục';
        const hintText = scene.add.text(0, 295, hintStr, {
            fontFamily: 'Arial', fontSize: '13px', fontStyle: 'bold', fill: '#ffffff'
        }).setOrigin(0.5).setAlpha(0);
        hintText.setShadow(0, 1.5, '#000000', 4, true, true);
        container.add(hintText);

        this.add(container);

        // Entrance Animations
        container.setScale(0.85);
        container.setAlpha(0);
        scene.tweens.add({
            targets: container,
            scaleX: 1,
            scaleY: 1,
            alpha: 1,
            duration: 500,
            ease: 'Back.easeOut'
        });

        scene.tweens.add({
            targets: hintText,
            alpha: 0.7,
            duration: 400,
            delay: 600
        });

        // Banana rain visual effect
        for (let i = 0; i < 12; i++) {
            scene.time.delayedCall(i * 120, () => {
                const b = scene.add.image(Phaser.Math.Between(30, width - 30), -30, 'banana')
                    .setScale(Phaser.Math.FloatBetween(0.2, 0.4))
                    .setAngle(Phaser.Math.Between(-45, 45));
                this.add(b);
                scene.tweens.add({
                    targets: b,
                    y: height + 40,
                    angle: b.angle + Phaser.Math.Between(-180, 180),
                    duration: Phaser.Math.Between(1000, 1800),
                    ease: 'Linear',
                    onComplete: () => b.destroy()
                });
            });
        }

        // Monkey jump animation if available in scene
        if (scene.monkey) {
            const origY = scene.monkey.y;
            scene.tweens.add({
                targets: scene.monkey,
                y: origY - 60,
                duration: 200,
                yoyo: true,
                repeat: 3,
                ease: 'Power2'
            });
        }

        scene.add.existing(this);
    }

    _makeNavButton(scene, container, cx, cy, w, h, label, baseColor, hoverColor, onDown) {
        const btnContainer = scene.add.container(cx, cy);
        container.add(btnContainer);

        const bg = scene.add.graphics();
        const draw = (color) => {
            bg.clear();
            bg.fillStyle(color, 1);
            bg.fillRoundedRect(-w / 2, -h / 2, w, h, h / 2);
            bg.lineStyle(1.5, 0xffffff, 0.15);
            bg.strokeRoundedRect(-w / 2, -h / 2, w, h, h / 2);
        };
        draw(baseColor);
        btnContainer.add(bg);

        const text = scene.add.text(0, 0, label, {
            fontFamily: 'Segoe UI Emoji, Arial', fontSize: '13px', fontStyle: 'bold', fill: '#FFFFFF'
        }).setOrigin(0.5);
        text.setShadow(0, 1.5, '#000000', 3, true, true);
        btnContainer.add(text);

        const zone = scene.add.zone(0, 0, w, h).setInteractive({ useHandCursor: true });
        btnContainer.add(zone);
        
        zone.on('pointerover', () => {
            draw(hoverColor);
            scene.tweens.add({
                targets: btnContainer,
                scaleX: 1.03,
                scaleY: 1.03,
                duration: 80,
                ease: 'Power1'
            });
        });
        zone.on('pointerout', () => {
            draw(baseColor);
            scene.tweens.add({
                targets: btnContainer,
                scaleX: 1.0,
                scaleY: 1.0,
                duration: 80,
                ease: 'Power1'
            });
        });
        zone.on('pointerdown', () => {
            scene.sound.play('key_sound');
            onDown();
        });

        return btnContainer;
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
