import * as Phaser from 'phaser';
import { ProgressManager } from '../utils/ProgressManager';

export class MapScene extends Phaser.Scene {
    constructor() {
        super('MapScene');
    }

    init() {
        this.data = this.cache.json.get('gameData');
        this._loadProgress();
    }

    _loadProgress() {
        this.completedLessonsCount = 0;
        this.totalStarsCount = 0;
        
        const progress = ProgressManager.loadProgress(this.data.lessons.length);
        this.lessonStars = progress.lessonStars || {};
        
        // Count completed lessons and total stars
        for (const key in this.lessonStars) {
            const stars = this.lessonStars[key] || 0;
            if (stars > 0) {
                this.completedLessonsCount++;
                this.totalStarsCount += stars;
            }
        }
    }

    create() {
        const { width, height } = this.scale;

        // Fixed background image with dark overlay
        const randomBg = Phaser.Math.Between(1, 10);
        this.bg = this.add.image(width / 2, height / 2, `bg_${randomBg}`)
            .setDisplaySize(width, height)
            .setScrollFactor(0);
            
        this.overlay = this.add.graphics()
            .fillStyle(0x0a0f1d, 0.75) // Deep premium dark blue overlay
            .fillRect(0, 0, width, height)
            .setScrollFactor(0);

        const totalLessons = this.data.lessons.length;
        const columns = 5;
        const rows = Math.ceil(totalLessons / columns);
        
        const startY = 190;
        const rowHeight = 150;
        const colWidth = 180;
        const gridWidth = (columns - 1) * colWidth;
        const startX = (width - gridWidth) / 2; // Center the grid horizontally

        const totalScrollHeight = startY + rows * rowHeight + 80;

        // Setup camera bounds
        this.cameras.main.setBounds(0, 0, width, totalScrollHeight);

        // Render Lesson Grid
        for (let i = 0; i < totalLessons; i++) {
            const col = i % columns;
            const row = Math.floor(i / columns);

            const x = startX + col * colWidth;
            const y = startY + row * rowHeight;

            // Check if unlocked: index 0 is always unlocked. 
            // Index i > 0 is unlocked if lesson i-1 is completed (has stars > 0)
            const isUnlocked = (i === 0) || (this.lessonStars[i - 1] !== undefined && this.lessonStars[i - 1] > 0);
            const stars = this.lessonStars[i] || 0;

            this.createLessonButton(x, y, i, isUnlocked, stars);
        }

        // Setup mouse wheel scroll
        this.input.on('wheel', (pointer, gameObjects, deltaX, deltaY, deltaZ) => {
            this.cameras.main.scrollY += deltaY * 0.7;
        });

        // Setup drag to scroll
        let dragStartY = 0;
        let isDragging = false;
        this.input.on('pointerdown', (pointer) => {
            dragStartY = pointer.y;
            isDragging = false;
        });

        this.input.on('pointermove', (pointer) => {
            if (pointer.isDown) {
                const dy = pointer.y - dragStartY;
                if (Math.abs(dy) > 10) {
                    isDragging = true;
                }
                this.cameras.main.scrollY -= (pointer.y - pointer.prevPosition.y);
            }
        });

        // Save reference to isDragging to check in click handler
        this.isDraggingRef = () => isDragging;

        // Render fixed UI elements (depth = 10, scrollFactor = 0)
        this.createHeader(width);
    }

    createLessonButton(x, y, index, isUnlocked, stars) {
        const itemContainer = this.add.container(x, y);
        itemContainer.setDepth(1);

        const btnWidth = 140;
        const btnHeight = 110;

        const bg = this.add.graphics();
        itemContainer.add(bg);

        const drawBg = (color, strokeColor, strokeWidth = 2, fillAlpha = 0.85) => {
            bg.clear();
            bg.fillStyle(color, fillAlpha);
            bg.fillRoundedRect(-btnWidth / 2, -btnHeight / 2, btnWidth, btnHeight, 16);
            bg.lineStyle(strokeWidth, strokeColor, 1);
            bg.strokeRoundedRect(-btnWidth / 2, -btnHeight / 2, btnWidth, btnHeight, 16);
        };

        let mainColor, borderCol;
        if (!isUnlocked) {
            mainColor = 0x1E293B; // Dark blue gray
            borderCol = 0x475569;
            drawBg(mainColor, borderCol, 2, 0.4); // Transparent locked style

            const lockIcon = this.add.text(0, 0, '🔒', {
                fontSize: '32px'
            }).setOrigin(0.5);
            itemContainer.add(lockIcon);
        } else {
            const isCompleted = stars > 0;
            if (isCompleted) {
                mainColor = 0x0F766E; // Teal/emerald
                borderCol = 0x0EA5E9; // Sky blue highlight border
            } else {
                mainColor = 0x1E3A8A; // Dark blue
                borderCol = 0x3B82F6; // Blue border
            }
            drawBg(mainColor, borderCol, 2, 0.9);

            // Lesson number
            const numText = this.add.text(0, -20, `${index + 1}`, {
                fontFamily: 'Outfit, Arial',
                fontSize: '32px',
                fontStyle: 'bold',
                fill: '#FFFFFF'
            }).setOrigin(0.5);
            itemContainer.add(numText);

            // Sub title
            const labelText = this.add.text(0, 10, `Bài học`, {
                fontFamily: 'Arial',
                fontSize: '14px',
                fill: '#93C5FD'
            }).setOrigin(0.5);
            itemContainer.add(labelText);

            // Stars
            let starStr = '☆☆☆';
            if (stars === 1) starStr = '⭐☆☆';
            else if (stars === 2) starStr = '⭐⭐☆';
            else if (stars === 3) starStr = '⭐⭐⭐';

            const starsText = this.add.text(0, 32, starStr, {
                fontFamily: 'Arial',
                fontSize: '16px',
                fill: '#FFD700'
            }).setOrigin(0.5);
            itemContainer.add(starsText);

            // Add interactive zone for hover and click
            const zone = this.add.zone(0, 0, btnWidth, btnHeight)
                .setInteractive({ useHandCursor: true });
            itemContainer.add(zone);

            zone.on('pointerover', () => {
                itemContainer.setDepth(2);
                this.tweens.add({
                    targets: itemContainer,
                    scaleX: 1.1,
                    scaleY: 1.1,
                    duration: 100,
                    ease: 'Power1'
                });
                drawBg(mainColor, 0xFBBF24, 3, 0.95); // Gold border on hover
            });

            zone.on('pointerout', () => {
                itemContainer.setDepth(1);
                this.tweens.add({
                    targets: itemContainer,
                    scaleX: 1.0,
                    scaleY: 1.0,
                    duration: 100,
                    ease: 'Power1'
                });
                drawBg(mainColor, borderCol, 2, 0.9);
            });

            zone.on('pointerdown', () => {
                this.tweens.add({
                    targets: itemContainer,
                    scaleX: 0.95,
                    scaleY: 0.95,
                    duration: 50
                });
            });

            zone.on('pointerup', () => {
                this.tweens.add({
                    targets: itemContainer,
                    scaleX: 1.0,
                    scaleY: 1.0,
                    duration: 50,
                    onComplete: () => {
                        if (!this.isDraggingRef()) {
                            this.sound.play('key_sound');
                            this.scene.start('PlayScene', { lessonIndex: index });
                        }
                    }
                });
            });
        }
    }

    createHeader(width) {
        const headerBg = this.add.graphics().setScrollFactor(0).setDepth(10);
        headerBg.fillStyle(0x0f172a, 0.95); // Slate 900
        headerBg.fillRoundedRect(0, 0, width, 130, { tl: 0, tr: 0, bl: 20, br: 20 });
        headerBg.lineStyle(3, 0xFBBF24, 1); // Gold bottom line
        headerBg.beginPath();
        headerBg.moveTo(0, 130);
        headerBg.lineTo(width, 130);
        headerBg.strokePath();

        // Main Title
        const titleText = this.add.text(width / 2, 40, 'BẢN ĐỒ BÀI HỌC', {
            fontFamily: 'Outfit, Arial',
            fontSize: '38px',
            fontStyle: 'bold',
            fill: '#FBBF24',
            stroke: '#000000',
            strokeThickness: 4
        }).setOrigin(0.5).setScrollFactor(0).setDepth(10);

        // Progress Text
        const totalLessons = this.data.lessons.length;
        const progressStr = `Tiến độ: ${this.completedLessonsCount}/${totalLessons} bài học  |  Tổng: ⭐ ${this.totalStarsCount}`;
        const progressText = this.add.text(width / 2, 85, progressStr, {
            fontFamily: 'Arial',
            fontSize: '18px',
            fontStyle: 'bold',
            fill: '#38BDF8'
        }).setOrigin(0.5).setScrollFactor(0).setDepth(10);
    }
}
