import * as Phaser from 'phaser';

const TUTORIAL_STEPS = [
    {
        text: "Xin chào! Tớ là Khỉ Con, người bạn đồng hành của bạn trong chuyến phiêu lưu này!",
        highlightType: 'mascot',
    },
    {
        text: "Hôm nay tớ sẽ hướng dẫn bạn cách chơi để nhận được thật nhiều chuối ngon nhé!",
        highlightType: 'mascot',
    },
    {
        text: "Bản đồ này chứa các bài học gõ phím. Bạn hãy vượt qua từng bài để mở khóa con đường đi tiếp.",
        highlightType: 'node1',
    },
    {
        text: "Mỗi bài học hoàn thành lần đầu tiên sẽ mở ra một Vòng quay rương thưởng để nhận chuối hoặc trang phục mới!",
        highlightType: 'banana',
    },
    {
        text: "Bạn có thể tích lũy chuối để mở khóa rất nhiều trang phục Khỉ Con ngộ nghĩnh trong cửa hàng đấy!",
        highlightType: 'skins',
    },
    {
        text: "Nào, bạn hãy click vào bài học đầu tiên để chúng mình bắt đầu hành trình nhé! Chúc bạn chơi vui!",
        highlightType: 'node1_final',
    }
];

export class FTUEOverlay extends Phaser.GameObjects.Container {
    constructor(scene) {
        const { width, height } = scene.scale;
        super(scene, 0, 0);
        this.scene = scene;
        this.currentStep = 0;
        this.setDepth(140);
        this.setScrollFactor(0);

        // ── Spotlight Mask (RenderTexture allows circular erase hole) ─────
        this.maskBg = scene.add.renderTexture(0, 0, width, height)
            .setScrollFactor(0).setDepth(140).setOrigin(0, 0);
        this.spotlightBorder = scene.add.graphics().setScrollFactor(0).setDepth(141);
        this.pulseTime = 0;

        // ── Full-screen invisible blocker (prevents clicks reaching map) ──
        this.blocker = scene.add.rectangle(width / 2, height / 2, width, height, 0x000000, 0)
            .setInteractive()
            .setScrollFactor(0)
            .setDepth(140);

        // ── Dialog Bar ────────────────────────────────────────────────────
        // Layout constants — bigger version
        const bubbleW  = 520;   // bubble inner width
        const bubbleH  = 240;   // taller to fit larger text
        const mascotW  = 160;   // wider mascot column
        const totalW   = mascotW + bubbleW; // = 680

        // Dialog centered, anchored to bottom of screen
        const dialogCX = width / 2;
        // Move center up so the tall dialog (240px) stays on screen
        const dialogCY = height - bubbleH / 2 - 24;

        // -- Speech bubble background
        this.dialogBg = scene.add.graphics().setScrollFactor(0).setDepth(142);
        const bLeft = dialogCX - totalW / 2 + mascotW;
        const bTop  = dialogCY - bubbleH / 2;
        this.dialogBg.fillStyle(0x1e293b, 0.97);
        this.dialogBg.fillRoundedRect(bLeft, bTop, bubbleW, bubbleH, 22);
        this.dialogBg.lineStyle(3, 0xFBBF24, 1);
        this.dialogBg.strokeRoundedRect(bLeft, bTop, bubbleW, bubbleH, 22);

        // Pointer triangle on the left of bubble
        this.dialogBg.fillStyle(0x1e293b, 0.97);
        this.dialogBg.beginPath();
        this.dialogBg.moveTo(bLeft,      dialogCY - 16);
        this.dialogBg.lineTo(bLeft - 22, dialogCY);
        this.dialogBg.lineTo(bLeft,      dialogCY + 16);
        this.dialogBg.closePath();
        this.dialogBg.fillPath();
        this.dialogBg.lineStyle(3, 0xFBBF24, 1);
        this.dialogBg.beginPath();
        this.dialogBg.moveTo(bLeft,      dialogCY - 16);
        this.dialogBg.lineTo(bLeft - 22, dialogCY);
        this.dialogBg.lineTo(bLeft,      dialogCY + 16);
        this.dialogBg.strokePath();

        // -- Mascot Sprite
        const mascotX = dialogCX - totalW / 2 + mascotW / 2;
        const mascotY = dialogCY;
        const mascotSkin = scene.monkeySkin || 'monkey_1';
        this.mascot = scene.add.sprite(mascotX, mascotY, mascotSkin)
            .setScale(0.62)          // ↑ was 0.34
            .setOrigin(0.5)
            .setScrollFactor(0)
            .setDepth(143);

        // -- Name label
        const nameX = bLeft + 20;
        const nameY = bTop + 20;
        this.nameLbl = scene.add.text(nameX, nameY, 'Khỉ Con', {
            fontFamily: 'Outfit, Arial',
            fontSize: '28px',        // ↑ was 17px
            fontStyle: 'bold',
            fill: '#FBBF24'
        }).setScrollFactor(0).setDepth(143).setOrigin(0, 0);

        // -- Dialog message text
        const msgX = bLeft + 20;
        const msgY = bTop + 66;      // moved down to give name label more room
        this.dialogText = scene.add.text(msgX, msgY, '', {
            fontFamily: 'Arial',
            fontSize: '26px',        // ↑ was 14px (≈ double)
            fill: '#f1f5f9',
            wordWrap: { width: bubbleW - 170, useAdvancedWrap: true }, // leave room for button
            lineSpacing: 6
        }).setScrollFactor(0).setDepth(143).setOrigin(0, 0);

        // ── "Tiếp tục" Button ─────────────────────────────────────────────
        const btnW = 160;            // ↑ was 110
        const btnH = 48;             // ↑ was 32
        const btnCX = bLeft + bubbleW - btnW / 2 - 16;
        const btnCY = bTop + bubbleH - btnH / 2 - 14;

        this.nextBtnBg = scene.add.graphics().setScrollFactor(0).setDepth(145);
        this._drawNextBtn(0xF59E0B, btnCX, btnCY, btnW, btnH);

        this.nextBtnText = scene.add.text(btnCX, btnCY, 'Tiếp tục ➔', {
            fontFamily: 'Outfit, Arial',
            fontSize: '20px',        // ↑ was 13px
            fontStyle: 'bold',
            fill: '#0f172a'
        }).setOrigin(0.5).setScrollFactor(0).setDepth(146);

        this.nextZone = scene.add.zone(btnCX, btnCY, btnW, btnH)
            .setInteractive({ useHandCursor: true })
            .setScrollFactor(0)
            .setDepth(146);

        this._nextBtn = { cx: btnCX, cy: btnCY, w: btnW, h: btnH };

        this.nextZone.on('pointerover', () => this._drawNextBtn(0xFBBF24, btnCX, btnCY, btnW, btnH));
        this.nextZone.on('pointerout',  () => this._drawNextBtn(0xF59E0B, btnCX, btnCY, btnW, btnH));
        this.nextZone.on('pointerup', () => {
            scene.sound.play('key_sound');
            this._nextStep();
        });

        // ── Skip Button ───────────────────────────────────────────────────
        const skipW = 120;           // ↑ was 95
        const skipH = 36;            // ↑ was 28
        const skipCX = width - skipW / 2 - 16;
        const skipCY = 50;

        this.skipBg = scene.add.graphics().setScrollFactor(0).setDepth(145);
        this._drawSkipBtn(0.5, skipCX, skipCY, skipW, skipH);

        this.skipText = scene.add.text(skipCX, skipCY, 'Bỏ qua ✖', {
            fontFamily: 'Arial',
            fontSize: '16px',        // ↑ was 12px
            fontStyle: 'bold',
            fill: '#94a3b8'
        }).setOrigin(0.5).setScrollFactor(0).setDepth(146);

        this.skipZone = scene.add.zone(skipCX, skipCY, skipW, skipH)
            .setInteractive({ useHandCursor: true })
            .setScrollFactor(0)
            .setDepth(146);

        this._skipBtn = { cx: skipCX, cy: skipCY, w: skipW, h: skipH };

        this.skipZone.on('pointerover', () => {
            this._drawSkipBtn(0.85, skipCX, skipCY, skipW, skipH);
            this.skipText.setFill('#ffffff');
        });
        this.skipZone.on('pointerout', () => {
            this._drawSkipBtn(0.5, skipCX, skipCY, skipW, skipH);
            this.skipText.setFill('#94a3b8');
        });
        this.skipZone.on('pointerup', () => {
            scene.sound.play('key_sound');
            this._completeFTUE();
        });

        // Track all scene-level objects for cleanup
        this._sceneObjects = [
            this.maskBg, this.spotlightBorder, this.blocker,
            this.dialogBg, this.mascot, this.nameLbl, this.dialogText,
            this.nextBtnBg, this.nextBtnText, this.nextZone,
            this.skipBg, this.skipText, this.skipZone
        ];

        scene.add.existing(this);

        // Initialize First Step
        this._showStep(0);
    }

    _drawNextBtn(color, cx, cy, w, h) {
        this.nextBtnBg.clear();
        this.nextBtnBg.fillStyle(color, 1);
        this.nextBtnBg.fillRoundedRect(cx - w / 2, cy - h / 2, w, h, 14);
        this.nextBtnBg.lineStyle(1.5, 0xffffff, 0.3);
        this.nextBtnBg.strokeRoundedRect(cx - w / 2, cy - h / 2, w, h, 14);
    }

    _drawSkipBtn(fillAlpha, cx, cy, w, h) {
        this.skipBg.clear();
        this.skipBg.fillStyle(0x0f172a, fillAlpha);
        this.skipBg.fillRoundedRect(cx - w / 2, cy - h / 2, w, h, h / 2);
        this.skipBg.lineStyle(1.5, 0xffffff, 0.35);
        this.skipBg.strokeRoundedRect(cx - w / 2, cy - h / 2, w, h, h / 2);
    }

    _showStep(stepIdx) {
        this.currentStep = stepIdx;
        const step = TUTORIAL_STEPS[stepIdx];

        // Reset button text
        this.nextBtnText.setText('Tiếp tục ➔');

        // Typewriter text
        this._typeText(step.text);

        // Mascot bounce animation
        const baseY = this.mascot.y;
        this.scene.tweens.add({
            targets: this.mascot,
            y: baseY - 12,
            duration: 160,
            yoyo: true,
            ease: 'Power2',
            onComplete: () => { this.mascot.y = baseY; }
        });

        // Apply spotlight
        this._applyStepHighlight(step.highlightType);
    }

    _nextStep() {
        if (this.typingTimer) {
            // Text still typing — skip to end instantly
            this.typingTimer.destroy();
            this.typingTimer = null;
            this.dialogText.setText(TUTORIAL_STEPS[this.currentStep].text);
            return; // Don’t advance yet; let user click again to continue
        }

        // Text fully displayed — advance
        if (this.currentStep < TUTORIAL_STEPS.length - 1) {
            this._showStep(this.currentStep + 1);
        } else {
            this._completeFTUE();
        }
    }

    _applyStepHighlight(type) {
        const { width, height } = this.scene.scale;

        if (type === 'mascot') {
            // Just dark overlay — no spotlight hole or border ring behind the mascot
            this._drawMask(null, null, 0);
        } else if (type === 'node1' || type === 'node1_final') {
            // Lesson 0: x=110 (X_ZONES[0]), y=300 (globalY start) from PathLayout
            const firstNodeX = 110;
            const firstNodeY = this.scene.lessonYPositions[0] || 300;

            // Scroll camera so the node is visible
            const targetScrollY = Math.max(0, firstNodeY - height * 0.45);
            this.scene.tweens.add({
                targets: this.scene.cameras.main,
                scrollY: targetScrollY,
                duration: 500,
                ease: 'Cubic.easeOut',
                onUpdate: () => {
                    const sy = firstNodeY - this.scene.cameras.main.scrollY;
                    this._drawMask(firstNodeX, sy, 50);
                }
            });

            const screenY = firstNodeY - this.scene.cameras.main.scrollY;
            this._drawMask(firstNodeX, screenY, 50);

            if (type === 'node1_final') {
                this.nextBtnText.setText('Bắt đầu!');
            }
        } else if (type === 'banana') {
            const h = this.scene.header;
            this._drawMask(h.bananaChipX, h.bananaChipY, 52);
        } else if (type === 'skins') {
            const h = this.scene.header;
            this._drawMask(h.skinButtonX, h.skinButtonY, 52);
        }
    }

    _drawMask(cx, cy, r) {
        const { width, height } = this.scene.scale;

        // Fill entire texture with dark overlay
        this.maskBg.clear();
        this.maskBg.fill(0x0a0f1d, 0.82);

        if (cx === null || cy === null) {
            // Full dark cover, no spotlight hole
            this.highlightCoords = null;
            return;
        }

        // Erase a filled circle to create a perfectly circular transparent spotlight hole
        const eraseGfx = this.scene.make.graphics({ add: false });
        eraseGfx.fillStyle(0xffffff, 1);
        eraseGfx.fillCircle(cx, cy, r);
        this.maskBg.erase(eraseGfx, 0, 0);
        eraseGfx.destroy();

        this.highlightCoords = { x: cx, y: cy, r };
    }

    _typeText(text) {
        if (this.typingTimer) {
            this.typingTimer.destroy();
            this.typingTimer = null;
        }
        this.dialogText.setText('');
        let currentLength = 0;
        this.typingTimer = this.scene.time.addEvent({
            delay: 28,
            callback: () => {
                currentLength++;
                this.dialogText.setText(text.substr(0, currentLength));
                if (currentLength >= text.length) {
                    this.typingTimer.destroy();
                    this.typingTimer = null; // ← key fix: mark as done
                }
            },
            repeat: text.length - 1
        });
    }

    _completeFTUE() {
        if (this.typingTimer) {
            this.typingTimer.destroy();
            this.typingTimer = null;
        }
        localStorage.setItem('typemaster_ftue_completed', 'true');
        this.active = false;

        this.scene.tweens.add({
            targets: this._sceneObjects,
            alpha: 0,
            duration: 350,
            ease: 'Power2',
            onComplete: () => {
                this._sceneObjects.forEach(obj => obj.destroy());
                const mapScene = this.scene;
                this.destroy();
                if (mapScene && mapScene.currentLessonIndex === 0) {
                    mapScene.playMonkeyTransitionAnimation();
                }
            }
        });
    }

    update(time, delta) {
        this.pulseTime += delta;
        if (this.highlightCoords) {
            const { x, y, r } = this.highlightCoords;
            this.spotlightBorder.clear();
            const pulse = Math.sin(this.pulseTime * 0.006) * 5;
            // Outer glow ring
            this.spotlightBorder.lineStyle(1.5, 0xFBBF24, 0.28);
            this.spotlightBorder.strokeCircle(x, y, r + pulse + 10);
            // Main border ring
            this.spotlightBorder.lineStyle(3, 0xFBBF24, 0.9);
            this.spotlightBorder.strokeCircle(x, y, r + pulse);
        } else {
            this.spotlightBorder.clear();
        }
    }
}
