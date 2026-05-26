import * as Phaser from 'phaser';
import { ProgressManager, UNLOCK_THRESHOLDS } from '../utils/ProgressManager';
import { ensureTextures } from '../utils/TextureLoader';

export class SkinsOverlay extends Phaser.GameObjects.Container {
    constructor(scene, onClose) {
        const { width, height } = scene.scale;
        super(scene, 0, 0);
        this.scene = scene;
        this.setDepth(20); // Render above header (depth 10-11) and map nodes

        // Solid dark background overlay to block inputs and hide the map background
        const overlay = scene.add.rectangle(0, 0, width, height, 0x0a0f1d, 0.95)
            .setOrigin(0).setInteractive().setScrollFactor(0);
        this.add(overlay);
        const stopEvent = (_p, _x, _y, event) => { if (event) event.stopPropagation(); };
        overlay.on('pointerdown', stopEvent);
        overlay.on('pointerup',   stopEvent);

        // Dialog center container
        const dialog = scene.add.container(width / 2, height / 2).setScrollFactor(0);
        this.add(dialog);
        this.dialog = dialog;

        // Dialog Background
        const dialogW = 960;
        const dialogH = 640;
        const bg = scene.add.graphics();
        bg.fillStyle(0x0f172a, 1.0); // Fully solid Deep Slate 900
        bg.fillRoundedRect(-dialogW / 2, -dialogH / 2, dialogW, dialogH, 24);
        bg.lineStyle(3, 0x10b981, 1); // Emerald green border glow
        bg.strokeRoundedRect(-dialogW / 2, -dialogH / 2, dialogW, dialogH, 24);
        dialog.add(bg);

        // Header Title
        const title = scene.add.text(0, -dialogH / 2 + 45, '🐵 TRANG PHỤC KHỈ CON', {
            fontFamily: 'Outfit, Arial',
            fontSize: '32px',
            fontStyle: 'bold',
            fill: '#10b981',
            stroke: '#000000',
            strokeThickness: 4
        }).setOrigin(0.5);
        dialog.add(title);

        // Load progress for score
        const totalLessons = scene.gameData.lessons.length;
        const progress = ProgressManager.loadProgress(totalLessons);
        this.score = progress.score;

        // Score display
        const scoreBg = scene.add.graphics();
        scoreBg.fillStyle(0x065f46, 0.85); // Emerald-800
        scoreBg.fillRoundedRect(-140, -dialogH / 2 + 80, 280, 36, 18);
        scoreBg.lineStyle(1.5, 0x10b981, 0.5);
        scoreBg.strokeRoundedRect(-140, -dialogH / 2 + 80, 280, 36, 18);
        dialog.add(scoreBg);

        const scoreText = scene.add.text(0, -dialogH / 2 + 98, `🍌 Điểm tích lũy: ${this.score}`, {
            fontFamily: 'Outfit, Arial',
            fontSize: '16px',
            fontStyle: 'bold',
            fill: '#FBBF24'
        }).setOrigin(0.5);
        dialog.add(scoreText);

        // Grid Container (no tabs — monkey only)
        this.gridContainer = scene.add.container(0, 0);
        dialog.add(this.gridContainer);

        // Show a temporary loading text while dynamic skins are loaded
        const loadingText = scene.add.text(0, 0, 'Đang tải trang phục...', {
            fontFamily: 'Arial', fontSize: '18px', fill: '#94A3B8', fontStyle: 'bold'
        }).setOrigin(0.5);
        dialog.add(loadingText);

        // Load all 10 monkey skins dynamically
        const skinsToLoad = [];
        for (let i = 1; i <= 10; i++) {
            skinsToLoad.push({ key: `monkey_${i}`, url: `assets/monkey_${i}.png` });
        }

        ensureTextures(scene, skinsToLoad, () => {
            loadingText.destroy();
            if (this.scene) {
                this.renderGrid();
            }
        });

        // --- Close Button ---
        const closeBtnX = dialogW / 2 - 40;
        const closeBtnY = -dialogH / 2 + 40;
        const screenCloseX = width / 2 + closeBtnX;
        const screenCloseY = height / 2 + closeBtnY;

        const closeBtnBg = scene.add.graphics();
        const drawCloseBg = (color) => {
            closeBtnBg.clear();
            closeBtnBg.fillStyle(color, 0.85);
            closeBtnBg.fillCircle(closeBtnX, closeBtnY, 20);
        };
        drawCloseBg(0x334155);
        dialog.add(closeBtnBg);

        const closeText = scene.add.text(closeBtnX, closeBtnY, '✕', {
            fontFamily: 'Arial', fontSize: '20px', fontStyle: 'bold', fill: '#FFF'
        }).setOrigin(0.5);
        dialog.add(closeText);

        const closeZone = scene.add.zone(screenCloseX, screenCloseY, 40, 40)
            .setScrollFactor(0)
            .setDepth(21)
            .setInteractive({ useHandCursor: true });
        this.add(closeZone);

        closeZone.on('pointerover', () => drawCloseBg(0x475569));
        closeZone.on('pointerout', () => drawCloseBg(0x334155));
        closeZone.on('pointerdown', stopEvent);
        closeZone.on('pointerup', (_p, _x, _y, event) => {
            if (event) event.stopPropagation();
            scene.sound.play('key_sound');
            this.destroy();
            if (onClose) onClose();
        });

        // Dialog slide-in zoom effect
        dialog.setScale(0.85);
        dialog.setAlpha(0);
        scene.tweens.add({
            targets: dialog,
            scaleX: 1,
            scaleY: 1,
            alpha: 1,
            duration: 300,
            ease: 'Back.easeOut'
        });

        scene.add.existing(this);
    }


    renderGrid() {
        // Clear old grid items
        this.gridContainer.removeAll(true);

        const dialogH = 640;
        const colWidth = 210;
        const rowHeight = 125;
        const gridW = 3 * colWidth; // 4 columns
        const startX = -gridW / 2;
        const startY = -dialogH / 2 + 265;

        const equipped = ProgressManager.getEquippedSkins();

        // 11 items: 1 random + 10 specific ones
        for (let i = 0; i <= 10; i++) {
            const row = Math.floor(i / 4);
            const col = i % 4;

            // Center Row 2 (items 8, 9, 10) which only has 3 items
            let cx;
            if (row === 2) {
                const startX_row2 = -colWidth;
                cx = startX_row2 + col * colWidth;
            } else {
                cx = startX + col * colWidth;
            }
            const cy = startY + row * rowHeight;

            const isRandom = i === 0;
            const grantedSkins = ProgressManager.getGrantedSkins();
            const isUnlocked = isRandom || this.score >= UNLOCK_THRESHOLDS[i - 1] || grantedSkins.includes(`monkey_${i}`);
            const threshold = isRandom ? 0 : UNLOCK_THRESHOLDS[i - 1];

            // Monkey skin is always equipped.monkey
            const isEquipped = isRandom ? (equipped.monkey === 'random') : (equipped.monkey === `monkey_${i}`);

            // Create item card container
            const card = this.scene.add.container(cx, cy);
            this.gridContainer.add(card);

            const cardW = 195;
            const cardH = 110;

            // Draw Card background
            const cardBg = this.scene.add.graphics();
            const drawCardBg = (bgColor, strokeColor, strokeWidth = 1.5, fillAlpha = 0.9) => {
                cardBg.clear();
                cardBg.fillStyle(bgColor, fillAlpha);
                cardBg.fillRoundedRect(-cardW / 2, -cardH / 2, cardW, cardH, 16);
                cardBg.lineStyle(strokeWidth, strokeColor, 1);
                cardBg.strokeRoundedRect(-cardW / 2, -cardH / 2, cardW, cardH, 16);
            };

            const normalBg = isUnlocked ? 0x1e293b : 0x0f172a;
            const borderCol = isEquipped ? 0x10b981 : (isUnlocked ? 0x334155 : 0x1e293b);
            const fillAlpha = isUnlocked ? 1.0 : 0.4;
            drawCardBg(normalBg, borderCol, isEquipped ? 2.5 : 1.5, fillAlpha);
            card.add(cardBg);

            if (!isUnlocked) {
                // Locked display
                const lockIcon = this.scene.add.text(0, -10, '🔒', {
                    fontSize: '24px',
                    padding: { top: 6, bottom: 6, left: 4, right: 4 }
                }).setOrigin(0.5);
                const reqText = this.scene.add.text(0, 20, `Mở khóa: ${threshold}đ`, {
                    fontFamily: 'Arial', fontSize: '11px', fontStyle: 'bold', fill: '#64748B'
                }).setOrigin(0.5);
                card.add(lockIcon);
                card.add(reqText);
            } else {
                // Unlocked display
                if (isRandom) {
                    const qText = this.scene.add.text(0, -10, '❓', {
                        fontFamily: 'Outfit, Arial', fontSize: '38px', fontStyle: 'bold', fill: '#94A3B8',
                        padding: { top: 6, bottom: 6, left: 4, right: 4 }
                    }).setOrigin(0.5);
                    const nameText = this.scene.add.text(0, 32, 'Ngẫu nhiên', {
                        fontFamily: 'Arial', fontSize: '12px', fontStyle: 'bold', fill: '#FFFFFF'
                    }).setOrigin(0.5);
                    card.add(qText);
                    card.add(nameText);
                } else {
                        // Preview (monkey only)
                    const sprite = this.scene.add.sprite(0, -12, `monkey_${i}`).setScale(0.18);
                    const nameText = this.scene.add.text(0, 38, `Khỉ Con ${i}`, {
                        fontFamily: 'Arial', fontSize: '12px', fontStyle: 'bold', fill: '#FFFFFF'
                    }).setOrigin(0.5);
                    card.add(sprite);
                    card.add(nameText);

                    // Make the monkey sprite zoomable on click
                    sprite.setScrollFactor(0).setInteractive({ useHandCursor: true });
                    sprite.on('pointerdown', (pointer, localX, localY, event) => {
                        event.stopPropagation();
                        this.showZoom(`monkey_${i}`);
                    });
                    sprite.on('pointerover', (pointer, localX, localY, event) => {
                        event.stopPropagation();
                        this.scene.tweens.add({ targets: sprite, scaleX: 0.20, scaleY: 0.20, duration: 80 });
                    });
                    sprite.on('pointerout', () => {
                        this.scene.tweens.add({ targets: sprite, scaleX: 0.18, scaleY: 0.18, duration: 80 });
                    });
                }

                // Equip state label
                if (isEquipped) {
                    const eqBadge = this.scene.add.graphics();
                    eqBadge.fillStyle(0x065f46, 1.0); // Emerald green badge
                    eqBadge.fillRoundedRect(cardW / 2 - 80, -cardH / 2 + 10, 70, 18, 4);
                    card.add(eqBadge);

                    const eqText = this.scene.add.text(cardW / 2 - 45, -cardH / 2 + 19, 'ĐANG DÙNG', {
                        fontFamily: 'Arial', fontSize: '9px', fontStyle: 'bold', fill: '#34D399'
                    }).setOrigin(0.5);
                    card.add(eqText);
                }

                card.setScrollFactor(0);
                card.setInteractive(new Phaser.Geom.Rectangle(-cardW / 2, -cardH / 2, cardW, cardH), Phaser.Geom.Rectangle.Contains);
                card.input.cursor = 'pointer';

                card.on('pointerover', () => {
                    this.gridContainer.bringToTop(card);
                    this.scene.tweens.add({
                        targets: card,
                        scaleX: 1.05,
                        scaleY: 1.05,
                        duration: 80
                    });
                    drawCardBg(normalBg, 0xFBBF24, 2.5, 1.0); // Gold glow on hover
                });

                card.on('pointerout', () => {
                    this.scene.tweens.add({
                        targets: card,
                        scaleX: 1.0,
                        scaleY: 1.0,
                        duration: 80
                    });
                    drawCardBg(normalBg, borderCol, isEquipped ? 2.5 : 1.5, 1.0);
                });

                card.on('pointerdown', () => {
                    this.scene.sound.play('key_sound');
                    equipped.monkey = isRandom ? 'random' : `monkey_${i}`;
                    ProgressManager.saveEquippedSkins(equipped);
                    this.renderGrid();
                });
            }
        }
    }

    showZoom(key) {
        const { width, height } = this.scene.scale;

        const zoomOverlay = this.scene.add.container(0, 0).setDepth(30).setScrollFactor(0);
        this.add(zoomOverlay);

        const backdrop = this.scene.add.rectangle(0, 0, width, height, 0x000000, 0.8)
            .setOrigin(0).setInteractive().setScrollFactor(0);
        zoomOverlay.add(backdrop);

        const zoomContent = this.scene.add.container(width / 2, height / 2);
        zoomOverlay.add(zoomContent);

        backdrop.on('pointerdown', () => {
            this.scene.sound.play('key_sound');
            this.scene.tweens.add({
                targets: zoomContent, scaleX: 0.8, scaleY: 0.8, alpha: 0, duration: 200,
                onComplete: () => zoomOverlay.destroy()
            });
        });

        // Radial glow behind the monkey
        const glow = this.scene.add.graphics();
        glow.fillStyle(0x10b981, 0.15);
        glow.fillCircle(0, 0, 180);
        glow.lineStyle(2, 0x10b981, 0.4);
        glow.strokeCircle(0, 0, 180);
        zoomContent.add(glow);

        const preview = this.scene.add.sprite(0, -30, key).setScale(0.8);
        zoomContent.add(preview);

        const label = this.scene.add.text(0, 180, `TRANG PHỤC KHỈ\n(Bấm bất cứ đâu để đóng)`, {
            fontFamily: 'Outfit, Arial', fontSize: '18px', fontStyle: 'bold',
            fill: '#E2E8F0', align: 'center', lineSpacing: 8
        }).setOrigin(0.5);
        zoomContent.add(label);

        zoomContent.setScale(0.8).setAlpha(0);
        this.scene.tweens.add({
            targets: zoomContent, scaleX: 1, scaleY: 1, alpha: 1, duration: 250, ease: 'Back.easeOut'
        });
    }
}
