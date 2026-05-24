import * as Phaser from 'phaser';
import { ACHIEVEMENTS } from '../utils/AchievementManager';

export class AchievementsOverlay extends Phaser.GameObjects.Container {
    constructor(scene, unlockedIds, onClose) {
        const { width, height } = scene.scale;
        super(scene, 0, 0);
        this.scene = scene;
        this.setDepth(20); // Render above header (depth 10-11) and map nodes

        // Solid dark background overlay to block inputs and hide the map background
        const overlay = scene.add.rectangle(0, 0, width, height, 0x0a0f1d, 0.95)
            .setOrigin(0).setInteractive();
        this.add(overlay);

        // Dialog center container
        const dialog = scene.add.container(width / 2, height / 2);
        this.add(dialog);

        // Dialog Background
        const dialogW = 960;
        const dialogH = 640;
        const bg = scene.add.graphics();
        bg.fillStyle(0x0f172a, 1.0); // Fully solid Deep Slate 900
        bg.fillRoundedRect(-dialogW / 2, -dialogH / 2, dialogW, dialogH, 24);
        bg.lineStyle(3, 0x38bdf8, 1); // Sky blue border
        bg.strokeRoundedRect(-dialogW / 2, -dialogH / 2, dialogW, dialogH, 24);
        dialog.add(bg);

        // Header Title
        const title = scene.add.text(0, -dialogH / 2 + 45, '🏆 HUY HIỆU ĐÃ ĐẠT', {
            fontFamily: 'Outfit, Arial',
            fontSize: '32px',
            fontStyle: 'bold',
            fill: '#FBBF24',
            stroke: '#000000',
            strokeThickness: 4
        }).setOrigin(0.5);
        dialog.add(title);

        // Subtitle (Progress count)
        const unlockedSet = new Set(unlockedIds);
        const progressStr = `Đã mở khóa: ${unlockedSet.size}/${ACHIEVEMENTS.length} huy hiệu`;
        const progressText = scene.add.text(0, -dialogH / 2 + 85, progressStr, {
            fontFamily: 'Arial',
            fontSize: '16px',
            fontStyle: 'bold',
            fill: '#38BDF8'
        }).setOrigin(0.5);
        dialog.add(progressText);

        // Close button (X) at top right of dialog
        const closeBtnX = dialogW / 2 - 40;
        const closeBtnY = -dialogH / 2 + 40;
        
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

        const closeZone = scene.add.zone(closeBtnX, closeBtnY, 40, 40)
            .setInteractive({ useHandCursor: true });
        dialog.add(closeZone);

        closeZone.on('pointerover', () => drawCloseBg(0x475569));
        closeZone.on('pointerout', () => drawCloseBg(0x334155));
        closeZone.on('pointerdown', () => {
            scene.sound.play('key_sound');
            this.destroy();
            if (onClose) onClose();
        });

        // 20 Achievements Grid (4 columns x 5 rows)
        const columns = 4;
        const colWidth = 230;
        const rowHeight = 96;
        const gridW = (columns - 1) * colWidth;
        const startX = -gridW / 2;
        const startY = -dialogH / 2 + 190;

        ACHIEVEMENTS.forEach((achievement, index) => {
            const col = index % columns;
            const row = Math.floor(index / columns);

            const x = startX + col * colWidth;
            const y = startY + row * rowHeight;

            const isUnlocked = unlockedSet.has(achievement.id);

            // Card container
            const card = scene.add.container(x, y);
            dialog.add(card);

            const cardW = 220;
            const cardH = 88;

            // Card Background
            const cardBg = scene.add.graphics();
            const drawCardBg = (color, strokeColor, strokeWidth = 1.5, fillAlpha = 0.9) => {
                cardBg.clear();
                cardBg.fillStyle(color, fillAlpha);
                cardBg.fillRoundedRect(-cardW / 2, -cardH / 2, cardW, cardH, 12);
                cardBg.lineStyle(strokeWidth, strokeColor, 1);
                cardBg.strokeRoundedRect(-cardW / 2, -cardH / 2, cardW, cardH, 12);
            };

            const mainBgColor = isUnlocked ? 0x1e293b : 0x0f172a; // Slate-800 vs Slate-950
            const borderCol = isUnlocked ? 0x3b82f6 : 0x334155; // Blue vs Slate-700
            const fillAlpha = isUnlocked ? 1.0 : 0.8; // High opacity card fills to prevent dialog background show-through
            drawCardBg(mainBgColor, borderCol, 1.5, fillAlpha);
            card.add(cardBg);

            // Emoji (Larger size)
            const emojiText = scene.add.text(-cardW / 2 + 32, 2, isUnlocked ? achievement.icon : '🔒', {
                fontSize: '40px',
                padding: { top: 8, bottom: 8, left: 4, right: 4 }
            }).setOrigin(0.5);
            card.add(emojiText);

            // Title (Larger size)
            const titleText = scene.add.text(-cardW / 2 + 65, -22, achievement.title, {
                fontFamily: 'Arial',
                fontSize: '18px',
                fontStyle: 'bold',
                fill: isUnlocked ? '#FFFFFF' : '#64748B'
            }).setOrigin(0, 0);
            card.add(titleText);

            // Description (Larger size & wider wordWrap)
            const descText = scene.add.text(-cardW / 2 + 65, 4, achievement.desc, {
                fontFamily: 'Arial',
                fontSize: '14px',
                fill: isUnlocked ? '#38BDF8' : '#475569',
                wordWrap: { width: 145 }
            }).setOrigin(0, 0);
            card.add(descText);

            // Hover interactions for unlocked card
            if (isUnlocked) {
                const cardZone = scene.add.zone(0, 0, cardW, cardH)
                    .setInteractive({ useHandCursor: true });
                card.add(cardZone);

                cardZone.on('pointerover', () => {
                    card.setDepth(2);
                    scene.tweens.add({
                        targets: card,
                        scaleX: 1.06,
                        scaleY: 1.06,
                        duration: 80,
                        ease: 'Power1'
                    });
                    drawCardBg(mainBgColor, 0xFBBF24, 2.5, 0.95); // Bright gold border on hover
                });

                cardZone.on('pointerout', () => {
                    card.setDepth(1);
                    scene.tweens.add({
                        targets: card,
                        scaleX: 1.0,
                        scaleY: 1.0,
                        duration: 80,
                        ease: 'Power1'
                    });
                    drawCardBg(mainBgColor, borderCol, 1.5, fillAlpha);
                });
            }
        });

        // Add Dialog slide-in zoom effect
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
}
