import * as Phaser from 'phaser';
import { ProgressManager } from '../utils/ProgressManager';
import { AchievementsOverlay } from '../components/AchievementsOverlay';
import { ACHIEVEMENTS } from '../utils/AchievementManager';
import { StatsOverlay } from '../components/StatsOverlay';

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
        this.lessonStars = {};
        if (progress.lessonStats) {
            for (const key in progress.lessonStats) {
                this.lessonStars[key] = progress.lessonStats[key].stars || 0;
            }
        }
        this.unlockedAchievements = progress.unlockedAchievements || [];
        this.currentLessonIndex = progress.lessonIndex || 0; // Save current lesson index
        
        // Count completed lessons and total stars
        for (const key in this.lessonStars) {
            const stars = this.lessonStars[key] || 0;
            if (stars > 0) {
                this.completedLessonsCount++;
                this.totalStarsCount += stars;
            }
        }

        // Update achievement button text if it exists
        if (this.achText) {
            const unlockedCount = this.unlockedAchievements.length;
            const totalBadges = ACHIEVEMENTS.length;
            this.achText.setText(`🏆 Huy hiệu (${unlockedCount}/${totalBadges})`);
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

        // Sidebar bounds — defined early so main scroll handlers can exclude sidebar area
        const sidebarW = 60;
        const sidebarH = 300;
        const sidebarX = 40;
        const sidebarY = height / 2 + 50;
        const isSidebarHit = (p) =>
            p.x >= sidebarX - sidebarW / 2 && p.x <= sidebarX + sidebarW / 2 &&
            p.y >= sidebarY - sidebarH / 2 && p.y <= sidebarY + sidebarH / 2;
        let isDraggingSidebar = false;

        // Setup mouse wheel scroll — skip when pointer is over sidebar
        this.input.on('wheel', (pointer, gameObjects, deltaX, deltaY, deltaZ) => {
            if (!isSidebarHit(pointer)) {
                this.cameras.main.scrollY += deltaY * 0.7;
            }
        });

        // Setup drag to scroll
        let dragStartY = 0;
        let isDragging = false;
        this.input.on('pointerdown', (pointer) => {
            dragStartY = pointer.y;
            isDragging = false;
        });

        this.input.on('pointermove', (pointer) => {
            if (pointer.isDown && !isDraggingSidebar) {
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

        // Auto-scroll to current lesson on MapScene load
        const activeRow = Math.floor(this.currentLessonIndex / 5);
        const targetActiveY = startY + activeRow * rowHeight;
        const targetScrollY = Phaser.Math.Clamp(targetActiveY - height / 2, 0, totalScrollHeight - height);
        
        this.cameras.main.scrollY = 0; // Start at top
        this.time.delayedCall(100, () => {
            this.tweens.add({
                targets: this.cameras.main,
                scrollY: targetScrollY,
                duration: 600,
                ease: 'Cubic.easeOut'
            });
        });

        // Floating action button "📍 Đến bài hiện tại" at bottom-right
        const fabW = 160;
        const fabH = 40;
        const fabX = width - fabW / 2 - 20; // 1024 - 80 - 20 = 924
        const fabY = height - fabH / 2 - 20; // 768 - 20 - 20 = 728

        const fabBg = this.add.graphics().setScrollFactor(0).setDepth(10);
        const drawFabBg = (color, strokeColor = 0xFBBF24) => {
            fabBg.clear();
            fabBg.fillStyle(color, 0.9);
            fabBg.fillRoundedRect(fabX - fabW / 2, fabY - fabH / 2, fabW, fabH, 20);
            fabBg.lineStyle(2, strokeColor, 1);
            fabBg.strokeRoundedRect(fabX - fabW / 2, fabY - fabH / 2, fabW, fabH, 20);
        };
        drawFabBg(0x0f172a); // Slate 900 background with gold border

        const fabText = this.add.text(fabX, fabY, '📍 Bài hiện tại', {
            fontFamily: 'Arial', fontSize: '15px', fontStyle: 'bold', fill: '#FBBF24'
        }).setOrigin(0.5).setScrollFactor(0).setDepth(10);

        const fabZone = this.add.zone(fabX, fabY, fabW, fabH)
            .setScrollFactor(0)
            .setInteractive({ useHandCursor: true });
        fabZone.setDepth(11);

        fabZone.on('pointerover', () => {
            drawFabBg(0x1e293b, 0xFCD34D); // Lighter background and border
            this.tweens.add({
                targets: fabText,
                scaleX: 1.05,
                scaleY: 1.05,
                duration: 100
            });
        });
        fabZone.on('pointerout', () => {
            drawFabBg(0x0f172a, 0xFBBF24);
            this.tweens.add({
                targets: fabText,
                scaleX: 1.0,
                scaleY: 1.0,
                duration: 100
            });
        });
        fabZone.on('pointerdown', () => {
            this.sound.play('key_sound');
            this.tweens.add({
                targets: this.cameras.main,
                scrollY: targetScrollY,
                duration: 500,
                ease: 'Cubic.easeOut'
            });
        });

        // Quick Jump Segmented Sidebar
        const segmentSize = 50;
        const totalSegments = Math.ceil(totalLessons / segmentSize);

        const sbBg = this.add.graphics().setScrollFactor(0).setDepth(10);
        sbBg.fillStyle(0x0f172a, 0.85); // Slate 900 Glassmorphic
        sbBg.fillRoundedRect(sidebarX - sidebarW / 2, sidebarY - sidebarH / 2, sidebarW, sidebarH, 18);
        sbBg.lineStyle(1.5, 0x38bdf8, 0.4); // Subtle blue border
        sbBg.strokeRoundedRect(sidebarX - sidebarW / 2, sidebarY - sidebarH / 2, sidebarW, sidebarH, 18);

        // Sidebar title label
        this.add.text(sidebarX, sidebarY - sidebarH / 2 + 15, 'Tới bài', {
            fontFamily: 'Arial', fontSize: '11px', fontStyle: 'bold', fill: '#38BDF8'
        }).setOrigin(0.5).setScrollFactor(0).setDepth(10);

        // Container to hold the list of buttons
        const listContainer = this.add.container(0, 0).setScrollFactor(0).setDepth(10);

        // Mask to clip buttons outside the sidebar scrolling viewport
        const maskW = sidebarW - 8;
        const maskH = sidebarH - 45;
        const maskX = sidebarX - maskW / 2;
        const maskY = sidebarY - sidebarH / 2 + 32;

        const maskShape = this.add.graphics().setScrollFactor(0).setVisible(false);
        maskShape.fillStyle(0xffffff);
        maskShape.fillRect(maskX, maskY, maskW, maskH);
        const mask = maskShape.createGeometryMask();
        listContainer.setMask(mask);

        // Layout parameters
        const btnW = 50;
        const btnH = 30;
        const itemSpacing = 38;
        const contentHeight = totalSegments * itemSpacing;
        const maxScroll = Math.max(0, contentHeight - maskH + 10);

        let scrollYOffset = 0;
        const updateScroll = (dy) => {
            scrollYOffset = Phaser.Math.Clamp(scrollYOffset - dy, -maxScroll, 0);
            listContainer.y = scrollYOffset;
        };

        // Custom bounds checking for scroll interactions to avoid overlay zone blocking clicks
        this.input.on('wheel', (pointer, gameObjects, deltaX, deltaY, deltaZ) => {
            const isOverSidebar = (pointer.x >= sidebarX - sidebarW/2 && 
                                   pointer.x <= sidebarX + sidebarW/2 &&
                                   pointer.y >= sidebarY - sidebarH/2 &&
                                   pointer.y <= sidebarY + sidebarH/2);
            if (isOverSidebar) {
                updateScroll(deltaY * 0.4);
            }
        });

        let dragSidebarStartY = 0;
        let sidebarDragDistance = 0;

        this.input.on('pointerdown', (pointer) => {
            const isOverSidebar = (pointer.x >= sidebarX - sidebarW/2 && 
                                   pointer.x <= sidebarX + sidebarW/2 &&
                                   pointer.y >= sidebarY - sidebarH/2 &&
                                   pointer.y <= sidebarY + sidebarH/2);
            if (isOverSidebar) {
                isDraggingSidebar = true;
                dragSidebarStartY = pointer.y;
                sidebarDragDistance = 0;
            }
        });

        this.input.on('pointermove', (pointer) => {
            if (isDraggingSidebar && pointer.isDown) {
                const dy = pointer.y - dragSidebarStartY;
                sidebarDragDistance += Math.abs(dy);
                dragSidebarStartY = pointer.y;
                updateScroll(-dy);
            }
        });

        this.input.on('pointerup', () => {
            isDraggingSidebar = false;
        });

        // Sidebar buttons — zones inside a scrollFactor-0 container use world coords for hit
        // testing, which breaks after the main camera scrolls. Use manual screen-coord detection.
        const sidebarBtnData = [];
        for (let j = 0; j < totalSegments; j++) {
            const startL = j * segmentSize + 1;
            const btnX = sidebarX;
            const btnLocalY = sidebarY - sidebarH / 2 + 50 + j * itemSpacing;

            const btnBg = this.add.graphics();
            const drawBtnBg = (color, strokeColor = 0x475569) => {
                btnBg.clear();
                btnBg.fillStyle(color, 0.9);
                btnBg.fillRoundedRect(btnX - btnW / 2, btnLocalY - btnH / 2, btnW, btnH, 8);
                btnBg.lineStyle(1.5, strokeColor, 1);
                btnBg.strokeRoundedRect(btnX - btnW / 2, btnLocalY - btnH / 2, btnW, btnH, 8);
            };
            drawBtnBg(0x1e293b);
            listContainer.add(btnBg);

            const btnText = this.add.text(btnX, btnLocalY, `${startL}`, {
                fontFamily: 'Arial', fontSize: '11px', fontStyle: 'bold', fill: '#94A3B8'
            }).setOrigin(0.5);
            listContainer.add(btnText);

            sidebarBtnData.push({ j, drawBtnBg, btnText, btnX, btnLocalY });
        }

        // visY = btnLocalY + scrollYOffset because listContainer.y = scrollYOffset
        const getSidebarBtn = (px, py) => {
            if (!isSidebarHit({ x: px, y: py })) return null;
            if (py < maskY || py > maskY + maskH) return null;
            for (const btn of sidebarBtnData) {
                const visY = btn.btnLocalY + scrollYOffset;
                if (px >= btn.btnX - btnW / 2 && px <= btn.btnX + btnW / 2 &&
                    py >= visY - btnH / 2 && py <= visY + btnH / 2) {
                    return btn;
                }
            }
            return null;
        };

        let hoveredBtn = null;

        this.input.on('pointermove', (pointer) => {
            const hit = isDraggingSidebar ? null : getSidebarBtn(pointer.x, pointer.y);
            if (hit !== hoveredBtn) {
                if (hoveredBtn) {
                    hoveredBtn.drawBtnBg(0x1e293b, 0x475569);
                    hoveredBtn.btnText.setFill('#94A3B8');
                }
                hoveredBtn = hit;
                if (hit) {
                    hit.drawBtnBg(0x334155, 0x38bdf8);
                    hit.btnText.setFill('#FFFFFF');
                }
            }
        });

        this.input.on('pointerdown', (pointer) => {
            const hit = getSidebarBtn(pointer.x, pointer.y);
            if (hit) hit.drawBtnBg(0x0f172a, 0x38bdf8);
        });

        this.input.on('pointerup', (pointer) => {
            if (sidebarDragDistance < 8 && isSidebarHit(pointer)) {
                const hit = getSidebarBtn(pointer.x, pointer.y);
                if (hit) {
                    this.sound.play('key_sound');
                    const firstLessonIndex = hit.j * segmentSize;
                    const segRow = Math.floor(firstLessonIndex / columns);
                    const targetSegY = startY + segRow * rowHeight;
                    const targetSegScrollY = Phaser.Math.Clamp(targetSegY - height / 2, 0, totalScrollHeight - height);
                    this.tweens.add({
                        targets: this.cameras.main,
                        scrollY: targetSegScrollY,
                        duration: 500,
                        ease: 'Cubic.easeOut'
                    });
                }
            }
            if (hoveredBtn) hoveredBtn.drawBtnBg(0x334155, 0x38bdf8);
        });
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

        // Achievement Button at top-right (wider to fit the count)
        const btnW = 160, btnH = 36;
        const btnX = width - btnW / 2 - 20; // 1024 - 80 - 20 = 924
        const btnY = 40;

        const achBg = this.add.graphics().setScrollFactor(0).setDepth(10);
        const drawAchBg = (color) => {
            achBg.clear();
            achBg.fillStyle(color, 0.85);
            achBg.fillRoundedRect(btnX - btnW / 2, btnY - btnH / 2, btnW, btnH, 18);
            achBg.lineStyle(1.5, 0xffffff, 0.2);
            achBg.strokeRoundedRect(btnX - btnW / 2, btnY - btnH / 2, btnW, btnH, 18);
        };
        drawAchBg(0xD97706); // Gold

        const unlockedCount = this.unlockedAchievements.length;
        const totalBadges = ACHIEVEMENTS.length;
        this.achText = this.add.text(btnX, btnY, `🏆 Huy hiệu (${unlockedCount}/${totalBadges})`, {
            fontFamily: 'Arial', fontSize: '15px', fontStyle: 'bold', fill: '#FFF'
        }).setOrigin(0.5).setScrollFactor(0).setDepth(10);

        const achZone = this.add.zone(btnX, btnY, btnW, btnH)
            .setScrollFactor(0)
            .setInteractive({ useHandCursor: true });
        achZone.setDepth(11);

        achZone.on('pointerover', () => drawAchBg(0xF59E0B));
        achZone.on('pointerout', () => drawAchBg(0xD97706));
        achZone.on('pointerdown', () => {
            this.sound.play('key_sound');
            new AchievementsOverlay(this, this.unlockedAchievements, () => {
                this._loadProgress();
            });
        });

        // Stats Button to the left of Achievement Button
        const statsBtnW = 140;
        const statsBtnX = btnX - btnW / 2 - statsBtnW / 2 - 15;
        const statsBtnBg = this.add.graphics().setScrollFactor(0).setDepth(10);
        const drawStatsBtnBg = (color) => {
            statsBtnBg.clear();
            statsBtnBg.fillStyle(color, 0.85);
            statsBtnBg.fillRoundedRect(statsBtnX - statsBtnW / 2, btnY - btnH / 2, statsBtnW, btnH, 18);
            statsBtnBg.lineStyle(1.5, 0xffffff, 0.2);
            statsBtnBg.strokeRoundedRect(statsBtnX - statsBtnW / 2, btnY - btnH / 2, statsBtnW, btnH, 18);
        };
        drawStatsBtnBg(0x0D9488); // Teal

        const statsText = this.add.text(statsBtnX, btnY, '📊 Thống kê', {
            fontFamily: 'Arial', fontSize: '15px', fontStyle: 'bold', fill: '#FFF'
        }).setOrigin(0.5).setScrollFactor(0).setDepth(10);

        const statsZone = this.add.zone(statsBtnX, btnY, statsBtnW, btnH)
            .setScrollFactor(0)
            .setInteractive({ useHandCursor: true });
        statsZone.setDepth(11);

        statsZone.on('pointerover', () => drawStatsBtnBg(0x14B8A6));
        statsZone.on('pointerout', () => drawStatsBtnBg(0x0D9488));
        statsZone.on('pointerdown', () => {
            this.sound.play('key_sound');
            new StatsOverlay(this, () => {
                this._loadProgress();
            });
        });
    }
}
