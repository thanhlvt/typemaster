import * as Phaser from 'phaser';
import { ProgressManager, UNLOCK_THRESHOLDS } from '../utils/ProgressManager';
import { AchievementsOverlay } from '../components/AchievementsOverlay';
import { ACHIEVEMENTS } from '../utils/AchievementManager';
import { StatsOverlay } from '../components/StatsOverlay';
import { SkinsOverlay } from '../components/SkinsOverlay';
import { OptionsOverlay } from '../components/OptionsOverlay';
import { ConfirmDialog } from '../components/ConfirmDialog';
import { CHAPTERS, getChapterForLesson, getChapterProgress, isChapterUnlocked } from '../data/chapters';

export class MapScene extends Phaser.Scene {
    constructor() {
        super('MapScene');
    }

    init() {
        this.achText  = null;
        this.bg       = null;
        this.gameData = this.cache.json.get('gameData');
        this._loadProgress();

        const audioSettings = ProgressManager.getAudioSettings();
        this.sound.mute   = audioSettings.mute;
        this.sound.volume = audioSettings.volume;
    }

    _loadProgress() {
        this.completedLessonsCount = 0;
        this.totalStarsCount       = 0;

        const progress = ProgressManager.loadProgress(this.gameData.lessons.length);
        this.totalScoreCount      = progress.score || 0;
        this.lessonStars          = {};
        this.lessonStats          = progress.lessonStats || {};
        this.unlockedAchievements = progress.unlockedAchievements || [];
        this.currentLessonIndex   = progress.lessonIndex || 0;

        if (progress.lessonStats) {
            for (const key in progress.lessonStats) {
                this.lessonStars[key] = progress.lessonStats[key].stars || 0;
            }
        }

        for (const key in this.lessonStars) {
            const stars = this.lessonStars[key] || 0;
            if (stars > 0) {
                this.completedLessonsCount++;
                this.totalStarsCount += stars;
            }
        }

        if (this.achText) {
            this.achText.setText(`🏆 Huy hiệu (${this.unlockedAchievements.length}/${ACHIEVEMENTS.length})`);
        }
    }

    create() {
        const { width, height } = this.scale;

        this._applyBackground();
        this.overlay = this.add.graphics()
            .fillStyle(0x0a0f1d, 0.75)
            .fillRect(0, 0, width, height)
            .setScrollFactor(0);

        const totalLessons = this.gameData.lessons.length;
        const columns      = 5;
        const rows         = Math.ceil(totalLessons / columns);
        const startY       = 230;
        const rowHeight    = 150;
        const colWidth     = 180;
        const gridWidth    = (columns - 1) * colWidth;
        const startX       = (width - gridWidth) / 2;
        const totalScrollHeight = startY + rows * rowHeight + 80;

        this.cameras.main.setBounds(0, 0, width, totalScrollHeight);

        for (let i = 0; i < totalLessons; i++) {
            const col = i % columns;
            const row = Math.floor(i / columns);
            const x = startX + col * colWidth;
            const y = startY + row * rowHeight;
            const isUnlocked = (i === 0) || (this.lessonStars[i - 1] !== undefined && this.lessonStars[i - 1] > 0);
            const stars = this.lessonStars[i] || 0;
            this.createLessonButton(x, y, i, isUnlocked, stars);
        }

        // ── Sidebar bounds ────────────────────────────────────────
        const sidebarW = 180, sidebarH = 300, sidebarX = width - sidebarW / 2 - 20, sidebarY = height / 2 + 50;
        const isSidebarHit = (p) =>
            p.x >= sidebarX - sidebarW / 2 && p.x <= sidebarX + sidebarW / 2 &&
            p.y >= sidebarY - sidebarH / 2 && p.y <= sidebarY + sidebarH / 2;

        // ── Drag state ────────────────────────────────────────────
        let isDraggingSidebar  = false;
        let dragStartY         = 0;
        let isDragging         = false;
        let dragSidebarStartY  = 0;
        let sidebarDragDistance = 0;
        let scrollYOffset      = 0;
        let hoveredBtn         = null;

        this.isDraggingRef = () => isDragging;

        // ── Header + auto-scroll ──────────────────────────────────
        this.createHeader(width);

        // Block pointer events from reaching lesson buttons hidden beneath the fixed header
        this.add.rectangle(0, 0, width, 175, 0x000000, 0)
            .setOrigin(0).setScrollFactor(0).setDepth(9).setInteractive();

        const activeRow    = Math.floor(this.currentLessonIndex / columns);
        const targetActiveY = startY + activeRow * rowHeight;
        const targetScrollY = Phaser.Math.Clamp(targetActiveY - height / 2, 0, totalScrollHeight - height);

        this.cameras.main.scrollY = 0;
        this.time.delayedCall(100, () => {
            this.tweens.add({ targets: this.cameras.main, scrollY: targetScrollY, duration: 600, ease: 'Cubic.easeOut' });
        });



        // ── FAB "Reset Data" ──────────────────────────────────────
        const resetW = 80, resetH = 40;
        const resetX = 20 + resetW / 2;
        const resetY = height - resetH / 2 - 20;

        const resetBg = this.add.graphics().setScrollFactor(0).setDepth(10);
        const drawResetBg = (color, strokeColor = 0xFCA5A5) => {
            resetBg.clear();
            resetBg.fillStyle(color, 0.9);
            resetBg.fillRoundedRect(resetX - resetW / 2, resetY - resetH / 2, resetW, resetH, 20);
            resetBg.lineStyle(2, strokeColor, 1);
            resetBg.strokeRoundedRect(resetX - resetW / 2, resetY - resetH / 2, resetW, resetH, 20);
        };
        drawResetBg(0x7f1d1d); // dark red base

        const resetText = this.add.text(resetX, resetY, '↺ Reset', {
            fontFamily: 'Arial', fontSize: '15px', fontStyle: 'bold', fill: '#FCA5A5'
        }).setOrigin(0.5).setScrollFactor(0).setDepth(10);

        const resetZone = this.add.zone(resetX, resetY, resetW, resetH)
            .setScrollFactor(0).setInteractive({ useHandCursor: true }).setDepth(11);

        resetZone.on('pointerover', () => {
            drawResetBg(0x991b1b, 0xFEE2E2); // lighter red on hover
            this.tweens.add({ targets: resetText, scaleX: 1.05, scaleY: 1.05, duration: 100 });
        });
        resetZone.on('pointerout', () => {
            drawResetBg(0x7f1d1d, 0xFCA5A5);
            this.tweens.add({ targets: resetText, scaleX: 1.0, scaleY: 1.0, duration: 100 });
        });
        resetZone.on('pointerdown', () => {
            this.sound.play('key_sound');
            new ConfirmDialog(this, () => {
                ProgressManager.clearAll();
                this.scene.restart();
            });
        });

        // ── Sidebar ───────────────────────────────────────────────
        // Blocker to prevent pointer events from leaking to lesson buttons behind the sidebar
        // Note: We do NOT use stopPropagation on sbBlocker's events because that would block the
        // Scene Input Manager's global pointerdown/pointerup listeners, which handle the Sidebar scroll/click.
        // Phaser's default topOnly = true handles blocking of underlying lesson card inputs since sbBlocker is at depth 9.5.
        const sbBlocker = this.add.rectangle(sidebarX, sidebarY, sidebarW, sidebarH, 0x000000, 0)
            .setOrigin(0.5).setScrollFactor(0).setDepth(9.5).setInteractive();

        const totalChapters = CHAPTERS.length;
        const btnW = 160, btnH = 46, itemSpacing = 54;
        const contentHeight = totalChapters * itemSpacing;

        const sbBg = this.add.graphics().setScrollFactor(0).setDepth(10);
        sbBg.fillStyle(0x0f172a, 0.85);
        sbBg.fillRoundedRect(sidebarX - sidebarW / 2, sidebarY - sidebarH / 2, sidebarW, sidebarH, 18);
        sbBg.lineStyle(1.5, 0x38bdf8, 0.4);
        sbBg.strokeRoundedRect(sidebarX - sidebarW / 2, sidebarY - sidebarH / 2, sidebarW, sidebarH, 18);

        this.add.text(sidebarX, sidebarY - sidebarH / 2 + 15, '🗺 Hành trình', {
            fontFamily: 'Arial', fontSize: '13px', fontStyle: 'bold', fill: '#38BDF8'
        }).setOrigin(0.5).setScrollFactor(0).setDepth(10);

        const listContainer = this.add.container(0, 0).setScrollFactor(0).setDepth(10);

        const maskW = sidebarW - 8, maskH = sidebarH - 45;
        const maskX = sidebarX - maskW / 2, maskY = sidebarY - sidebarH / 2 + 32;
        const maskShape = this.add.graphics().setScrollFactor(0).setVisible(false);
        maskShape.fillStyle(0xffffff);
        maskShape.fillRect(maskX, maskY, maskW, maskH);
        listContainer.setMask(maskShape.createGeometryMask());

        const maxScroll = Math.max(0, contentHeight - maskH + 10);
        const updateScroll = (dy) => {
            scrollYOffset = Phaser.Math.Clamp(scrollYOffset - dy, -maxScroll, 0);
            listContainer.y = scrollYOffset;
        };

        const sidebarBtnData = [];
        for (let j = 0; j < totalChapters; j++) {
            const chapter = CHAPTERS[j];
            const btnX    = sidebarX;
            const btnLocalY = sidebarY - sidebarH / 2 + 55 + j * itemSpacing;
            
            const progress = getChapterProgress(chapter, this.lessonStars);
            const unlocked = isChapterUnlocked(chapter, this.lessonStars);

            const btnBg = this.add.graphics();
            const drawBtnBg = (color, strokeColor = 0x475569) => {
                btnBg.clear();
                btnBg.fillStyle(color, 0.9);
                btnBg.fillRoundedRect(btnX - btnW / 2, btnLocalY - btnH / 2, btnW, btnH, 12);
                btnBg.lineStyle(1.5, strokeColor, 1);
                btnBg.strokeRoundedRect(btnX - btnW / 2, btnLocalY - btnH / 2, btnW, btnH, 12);
            };
            
            if (unlocked) {
                drawBtnBg(0x1e293b);
            } else {
                drawBtnBg(0x0f172a, 0x1e293b);
            }
            listContainer.add(btnBg);

            // Dot
            const dot = this.add.graphics();
            if (progress.isComplete) {
                dot.fillStyle(0x2dd4bf, 1);
            } else if (progress.isActive || (unlocked && progress.done === 0)) {
                dot.fillStyle(0xf59e0b, 1);
            } else {
                dot.fillStyle(0x475569, 1);
            }
            dot.fillCircle(btnX - btnW/2 + 16, btnLocalY, 5);
            listContainer.add(dot);

            // Body
            const btnText = this.add.text(btnX - btnW/2 + 30, btnLocalY, `${chapter.emoji} ${chapter.name}`, {
                fontFamily: 'Outfit, Arial', fontSize: '13px', fontStyle: 'bold', fill: unlocked ? '#FFFFFF' : '#64748B'
            }).setOrigin(0, 0.5);
            listContainer.add(btnText);
            
            // Progress Right
            const rightText = this.add.text(btnX + btnW/2 - 10, btnLocalY, `${progress.done}/${progress.total}`, {
                fontFamily: 'Arial', fontSize: '11px', fill: unlocked ? '#94A3B8' : '#475569'
            }).setOrigin(1, 0.5);
            listContainer.add(rightText);

            sidebarBtnData.push({ j, chapter, unlocked, drawBtnBg, btnText, btnX, btnLocalY, btnW, btnH });
        }

        const getSidebarBtn = (px, py) => {
            if (py < maskY || py > maskY + maskH) return null;
            for (const btn of sidebarBtnData) {
                const visY = btn.btnLocalY + scrollYOffset;
                if (px >= btn.btnX - btn.btnW / 2 && px <= btn.btnX + btn.btnW / 2 &&
                    py >= visY - btn.btnH / 2      && py <= visY + btn.btnH / 2) {
                    return btn;
                }
            }
            return null;
        };

        // ── Unified input handlers ────────────────────────────────

        this.input.on('wheel', (pointer, _objs, _deltaX, deltaY) => {
            if (isSidebarHit(pointer)) {
                updateScroll(deltaY * 0.4);
            } else {
                this.cameras.main.scrollY += deltaY * 0.7;
            }
        });

        this.input.on('pointerdown', (pointer) => {
            if (isSidebarHit(pointer)) {
                isDraggingSidebar   = true;
                dragSidebarStartY   = pointer.y;
                sidebarDragDistance = 0;
                const hit = getSidebarBtn(pointer.x, pointer.y);
                if (hit) hit.drawBtnBg(0x0f172a, 0x38bdf8);
            } else {
                dragStartY = pointer.y;
                isDragging = false;
            }
        });

        this.input.on('pointermove', (pointer) => {
            if (isDraggingSidebar && pointer.isDown) {
                const dy = pointer.y - dragSidebarStartY;
                sidebarDragDistance += Math.abs(dy);
                dragSidebarStartY    = pointer.y;
                updateScroll(-dy);
            } else if (pointer.isDown) {
                if (Math.abs(pointer.y - dragStartY) > 10) isDragging = true;
                this.cameras.main.scrollY -= (pointer.y - pointer.prevPosition.y);
            }

            const hit = isDraggingSidebar ? null : getSidebarBtn(pointer.x, pointer.y);
            if (hit !== hoveredBtn) {
                if (hoveredBtn) { 
                    hoveredBtn.drawBtnBg(hoveredBtn.unlocked ? 0x1e293b : 0x0f172a, hoveredBtn.unlocked ? 0x475569 : 0x1e293b); 
                    this.input.setDefaultCursor('default');
                }
                hoveredBtn = hit;
                if (hit) { 
                    hit.drawBtnBg(hit.unlocked ? 0x334155 : 0x0f172a, hit.unlocked ? 0x38bdf8 : 0x1e293b); 
                    if (hit.unlocked) this.input.setDefaultCursor('pointer');
                }
            }
        });

        this.input.on('pointerup', (pointer) => {
            if (isDraggingSidebar && sidebarDragDistance < 8 && isSidebarHit(pointer)) {
                const hit = getSidebarBtn(pointer.x, pointer.y);
                if (hit && hit.unlocked) {
                    this.sound.play('key_sound');
                    const firstLessonIndex = hit.chapter.range[0];
                    const segRow     = Math.floor(firstLessonIndex / columns);
                    const targetSegY = startY + segRow * rowHeight;
                    const targetSegScrollY = Phaser.Math.Clamp(targetSegY - height / 2, 0, totalScrollHeight - height);
                    this.tweens.add({ targets: this.cameras.main, scrollY: targetSegScrollY, duration: 500, ease: 'Cubic.easeOut' });
                }
            }
            if (hoveredBtn) hoveredBtn.drawBtnBg(hoveredBtn.unlocked ? 0x334155 : 0x0f172a, hoveredBtn.unlocked ? 0x38bdf8 : 0x1e293b);
            isDraggingSidebar = false;
        });

        // Create a global tooltip container
        this.tooltip = this.add.container(0, 0).setDepth(100).setVisible(false);
        const tooltipBg = this.add.graphics();
        tooltipBg.fillStyle(0x0f172a, 0.95);
        tooltipBg.fillRoundedRect(0, 0, 180, 55, 8);
        tooltipBg.lineStyle(1.5, 0x38bdf8, 1);
        tooltipBg.strokeRoundedRect(0, 0, 180, 55, 8);
        this.tooltip.add(tooltipBg);
        
        this.tooltipText = this.add.text(10, 10, '', {
            fontFamily: 'Arial', fontSize: '12px', fill: '#ffffff', lineSpacing: 4
        });
        this.tooltip.add(this.tooltipText);

        this.events.once('shutdown', () => {
            this.input.setDefaultCursor('default');
        });
    }

    createLessonButton(x, y, index, isUnlocked, stars) {
        const itemContainer = this.add.container(x, y);
        itemContainer.setDepth(1);

        const btnWidth = 140, btnHeight = 110;
        const bg = this.add.graphics();
        itemContainer.add(bg);

        const currentIndex = this._computeCurrentLessonIndex();
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
            bg.clear();
            if (state === 'done') {
                bg.fillGradientStyle(0x1bb893, 0x1bb893, 0x0d8268, 0x0d8268, 1);
                bg.fillRoundedRect(-btnWidth / 2, -btnHeight / 2, btnWidth, btnHeight, 16);
            } else if (state === 'current') {
                bg.fillGradientStyle(0xffb547, 0xffb547, 0xff7e3d, 0xff7e3d, 1);
                bg.fillRoundedRect(-btnWidth / 2, -btnHeight / 2, btnWidth, btnHeight, 16);
                bg.lineStyle(3, 0xFFD700, 1);
                bg.strokeRoundedRect(-btnWidth / 2, -btnHeight / 2, btnWidth, btnHeight, 16);
            } else if (state === 'unlocked') {
                bg.fillStyle(0x1e3a8a, 1);
                bg.fillRoundedRect(-btnWidth / 2, -btnHeight / 2, btnWidth, btnHeight, 16);
                bg.lineStyle(2, 0x3b82f6, 1);
                bg.strokeRoundedRect(-btnWidth / 2, -btnHeight / 2, btnWidth, btnHeight, 16);
            } else if (state === 'next') {
                bg.fillStyle(0x443477, 1);
                bg.fillRoundedRect(-btnWidth / 2, -btnHeight / 2, btnWidth, btnHeight, 16);
                
                // Simulate dashed border
                bg.lineStyle(2, 0xFFD700, 0.8);
                const r = 16, w = btnWidth, h = btnHeight;
                bg.strokeRoundedRect(-w / 2, -h / 2, w, h, r); // Quick workaround for dashed
            } else {
                bg.fillStyle(0x111827, 1);
                bg.fillRoundedRect(-btnWidth / 2, -btnHeight / 2, btnWidth, btnHeight, 16);
                bg.lineStyle(2, 0x475569, 1);
                bg.strokeRoundedRect(-btnWidth / 2, -btnHeight / 2, btnWidth, btnHeight, 16);
            }
        };

        drawBg();

        if (state === 'locked') {
            itemContainer.add(this.add.text(0, -20, `${index + 1}`, {
                fontFamily: 'Outfit, Arial', fontSize: '30px', fontStyle: 'bold', fill: '#64748B', alpha: 0.3
            }).setOrigin(0.5));
            itemContainer.add(this.add.text(0, 20, '🔒', {
                fontSize: '28px'
            }).setOrigin(0.5));
            return; // Not interactive
        }

        if (state === 'next') {
            itemContainer.add(this.add.text(0, -15, `${index + 1}`, {
                fontFamily: 'Outfit, Arial', fontSize: '30px', fontStyle: 'bold', fill: '#D8B4FE', alpha: 0.7
            }).setOrigin(0.5));
            itemContainer.add(this.add.text(0, 20, '🔓 Sắp mở', {
                fontFamily: 'Arial', fontSize: '15px', fontStyle: 'bold', fill: '#D8B4FE', alpha: 0.8
            }).setOrigin(0.5));
            return; // Not interactive
        }

        itemContainer.add(this.add.text(0, -20, `${index + 1}`, {
            fontFamily: 'Outfit, Arial', fontSize: '32px', fontStyle: 'bold', fill: '#FFFFFF'
        }).setOrigin(0.5));

        const stats = this.lessonStats[index] || { stars: 0, wpm: 0, accuracy: 0, timestamp: null };
        const bestWpm = stats.wpm || 0;
        const wpmStr = bestWpm > 0 ? `${bestWpm} WPM` : '-- WPM';

        itemContainer.add(this.add.text(0, 10, wpmStr, {
            fontFamily: 'Arial', fontSize: '14px', fill: state === 'done' ? '#A7F3D0' : '#FFEDD5', fontStyle: 'bold'
        }).setOrigin(0.5));

        const starStr = stars === 3 ? '⭐⭐⭐' : stars === 2 ? '⭐⭐☆' : stars === 1 ? '⭐☆☆' : '☆☆☆';
        itemContainer.add(this.add.text(0, 32, starStr, {
            fontFamily: 'Arial', fontSize: '16px', fill: '#FFD700'
        }).setOrigin(0.5));

        if (state === 'done') {
            const checkBg = this.add.graphics();
            checkBg.fillStyle(0xFFD700, 1);
            checkBg.fillCircle(btnWidth/2 - 15, -btnHeight/2 + 15, 12);
            itemContainer.add(checkBg);
            itemContainer.add(this.add.text(btnWidth/2 - 15, -btnHeight/2 + 15, '✓', {
                fontFamily: 'Arial', fontSize: '14px', fontStyle: 'bold', fill: '#000000'
            }).setOrigin(0.5));
        } else if (state === 'current') {
            this.tweens.add({ targets: itemContainer, scaleX: 1.04, scaleY: 1.04, duration: 1600, yoyo: true, repeat: -1 });
            
            const flagBg = this.add.graphics();
            flagBg.fillStyle(0xFFFFFF, 1);
            flagBg.fillRoundedRect(-50, -btnHeight/2 - 25, 100, 24, 12);
            itemContainer.add(flagBg);
            itemContainer.add(this.add.text(0, -btnHeight/2 - 13, '🏃 BẠN Ở ĐÂY', {
                fontFamily: 'Arial', fontSize: '11px', fontStyle: 'bold', fill: '#D97706'
            }).setOrigin(0.5));
        }

        const zone = this.add.zone(0, 0, btnWidth, btnHeight).setInteractive({ useHandCursor: true });
        itemContainer.add(zone);

        zone.on('pointerover', () => {
            itemContainer.setDepth(2);
            this.tweens.killTweensOf(itemContainer);
            this.tweens.add({ targets: itemContainer, scaleX: state === 'current' ? 1.14 : 1.1, scaleY: state === 'current' ? 1.14 : 1.1, duration: 100, ease: 'Power1' });
            
            bg.clear();
            if (state === 'done') {
                bg.fillGradientStyle(0x1bb893, 0x1bb893, 0x0d8268, 0x0d8268, 1);
            } else if (state === 'current') {
                bg.fillGradientStyle(0xffb547, 0xffb547, 0xff7e3d, 0xff7e3d, 1);
            } else if (state === 'unlocked') {
                bg.fillStyle(0x1e3a8a, 1);
            } else if (state === 'next') {
                bg.fillStyle(0x443477, 1);
            }
            bg.fillRoundedRect(-btnWidth / 2, -btnHeight / 2, btnWidth, btnHeight, 16);
            bg.lineStyle(3, 0xFFD700, 1);
            bg.strokeRoundedRect(-btnWidth / 2, -btnHeight / 2, btnWidth, btnHeight, 16);

            // Position and show tooltip
            if (state !== 'next' && this.tooltip && this.tooltipText) {
                this.tooltip.setPosition(x - 90, y - 115);
                const stats = this.lessonStats[index] || { stars: 0, wpm: 0, accuracy: 0, timestamp: null };
                const bestAcc = stats.accuracy || 0;
                let dateStr = 'N/A';
                if (stats.timestamp) {
                    const date = new Date(stats.timestamp);
                    dateStr = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
                }
                this.tooltipText.setText(`Chính xác tốt: ${bestAcc}%\nGần nhất: ${dateStr}`);
                this.tooltip.setVisible(true);
            }
        });
        zone.on('pointerout', () => {
            itemContainer.setDepth(1);
            this.tweens.killTweensOf(itemContainer);
            this.tweens.add({
                targets: itemContainer,
                scaleX: 1.0,
                scaleY: 1.0,
                duration: 100,
                ease: 'Power1',
                onComplete: () => {
                    if (state === 'current') {
                        this.tweens.add({ targets: itemContainer, scaleX: 1.04, scaleY: 1.04, duration: 1600, yoyo: true, repeat: -1 });
                    }
                }
            });
            drawBg();

            if (this.tooltip) {
                this.tooltip.setVisible(false);
            }
        });
        zone.on('pointerdown', () => {
            this.tweens.add({ targets: itemContainer, scaleX: state === 'current' ? 0.99 : 0.95, scaleY: state === 'current' ? 0.99 : 0.95, duration: 50 });
        });
        zone.on('pointerup', () => {
            this.tweens.add({
                targets: itemContainer, scaleX: state === 'current' ? 1.04 : 1.0, scaleY: state === 'current' ? 1.04 : 1.0, duration: 50,
                onComplete: () => {
                    if (!this.isDraggingRef()) {
                        this.sound.play('key_sound');
                        this.scene.start('PlayScene', { lessonIndex: index });
                    }
                }
            });
        });
    }

    createHeader(width) {
        const headerHeight = 175;
        const headerBg = this.add.graphics().setScrollFactor(0).setDepth(10);
        headerBg.fillStyle(0x0f172a, 0.95);
        headerBg.fillRoundedRect(0, 0, width, headerHeight, { tl: 0, tr: 0, bl: 24, br: 24 });
        headerBg.lineStyle(3, 0xFBBF24, 1);
        headerBg.beginPath();
        headerBg.moveTo(0, headerHeight);
        headerBg.lineTo(width, headerHeight);
        headerBg.strokePath();

        // --- ROW 1 ---
        const row1Y = 35;
        
        // Title
        this.add.text(20, row1Y - 10, '🐵 BẢN ĐỒ RỪNG', {
            fontFamily: 'Outfit, Arial', fontSize: '26px', fontStyle: 'bold',
            fill: '#FBBF24', stroke: '#000000', strokeThickness: 4
        }).setOrigin(0, 0.5).setScrollFactor(0).setDepth(10);

        // Chapter chip
        const currentIndex = this._computeCurrentLessonIndex();
        const currentChapter = getChapterForLesson(currentIndex);
        const chapterProgress = getChapterProgress(currentChapter, this.lessonStars);
        
        const chapterChipStr = `${currentChapter.emoji} Chương ${currentChapter.id} · ${currentChapter.name} · ${chapterProgress.done}/${chapterProgress.total} bài`;
        const chapChipContainer = this.add.container(20, row1Y + 18).setScrollFactor(0).setDepth(10);
        const chapBg = this.add.graphics();
        const chapTxt = this.add.text(12, 0, chapterChipStr, {
            fontFamily: 'Arial', fontSize: '13px', fontStyle: 'bold', fill: '#FFFFFF'
        }).setOrigin(0, 0.5);
        const chapW = chapTxt.width + 24;
        const chapH = 24;
        chapBg.fillGradientStyle(0xf97316, 0xf97316, 0xa855f7, 0xa855f7, 1);
        chapBg.fillRoundedRect(0, -chapH/2, chapW, chapH, chapH/2);
        chapChipContainer.add([chapBg, chapTxt]);

        // Right side Row 1
        let currentRightX = width - 20;

        // Settings
        const optW = 32;
        currentRightX -= optW / 2;
        const optX = currentRightX;
        const optBg = this.add.graphics().setScrollFactor(0).setDepth(10);
        const drawOptBg = (color) => {
            optBg.clear(); optBg.fillStyle(color, 0.85);
            optBg.fillCircle(optX, row1Y, optW/2);
            optBg.lineStyle(1.5, 0xffffff, 0.2);
            optBg.strokeCircle(optX, row1Y, optW/2);
        };
        drawOptBg(0x4F46E5);
        this.add.text(currentRightX, row1Y, '⚙️', { fontSize: '16px' }).setOrigin(0.5).setScrollFactor(0).setDepth(10);
        const optZone = this.add.zone(currentRightX, row1Y, optW, optW).setScrollFactor(0).setInteractive({ useHandCursor: true }).setDepth(11);
        optZone.on('pointerover', () => drawOptBg(0x6366F1));
        optZone.on('pointerout',  () => drawOptBg(0x4F46E5));
        optZone.on('pointerdown', () => { this.sound.play('key_sound'); new OptionsOverlay(this); });

        currentRightX -= optW / 2 + 8;

        // Skin
        const skinW = 90;
        const skinH = 32;
        currentRightX -= skinW / 2;
        const skinX = currentRightX;
        const skinBg = this.add.graphics().setScrollFactor(0).setDepth(10);
        const drawSkinBg = (color) => {
            skinBg.clear(); skinBg.fillStyle(color, 0.85);
            skinBg.fillRoundedRect(skinX - skinW / 2, row1Y - skinH / 2, skinW, skinH, skinH / 2);
            skinBg.lineStyle(1.5, 0xffffff, 0.2);
            skinBg.strokeRoundedRect(skinX - skinW / 2, row1Y - skinH / 2, skinW, skinH, skinH / 2);
        };
        drawSkinBg(0x059669);
        this.add.text(skinX, row1Y, '👕 Skin', {
            fontFamily: 'Arial', fontSize: '13px', fontStyle: 'bold', fill: '#FFF'
        }).setOrigin(0.5).setScrollFactor(0).setDepth(10);
        const skinZone = this.add.zone(skinX, row1Y, skinW, skinH).setScrollFactor(0).setInteractive({ useHandCursor: true }).setDepth(11);
        skinZone.on('pointerover', () => drawSkinBg(0x10B981));
        skinZone.on('pointerout',  () => drawSkinBg(0x059669));
        skinZone.on('pointerdown', () => {
            this.sound.play('key_sound');
            new SkinsOverlay(this, () => {
                this._loadProgress();
                this._applyBackground();
            });
        });

        currentRightX -= skinW / 2 + 8;

        // Achievement
        const achW = 140;
        const achH = 32;
        currentRightX -= achW / 2;
        const achX = currentRightX;
        const achBg = this.add.graphics().setScrollFactor(0).setDepth(10);
        const drawAchBg = (color) => {
            achBg.clear(); achBg.fillStyle(color, 0.85);
            achBg.fillRoundedRect(achX - achW/2, row1Y - achH/2, achW, achH, achH/2);
            achBg.lineStyle(1.5, 0xffffff, 0.2);
            achBg.strokeRoundedRect(achX - achW/2, row1Y - achH/2, achW, achH, achH/2);
        };
        drawAchBg(0xD97706);
        this.achText = this.add.text(achX, row1Y, `🏆 Huy hiệu (${this.unlockedAchievements.length}/${ACHIEVEMENTS.length})`, {
            fontFamily: 'Arial', fontSize: '13px', fontStyle: 'bold', fill: '#FFF'
        }).setOrigin(0.5).setScrollFactor(0).setDepth(10);
        const achZone = this.add.zone(achX, row1Y, achW, achH).setScrollFactor(0).setInteractive({ useHandCursor: true }).setDepth(11);
        achZone.on('pointerover', () => drawAchBg(0xF59E0B));
        achZone.on('pointerout',  () => drawAchBg(0xD97706));
        achZone.on('pointerdown', () => { this.sound.play('key_sound'); new AchievementsOverlay(this, this.unlockedAchievements, () => this._loadProgress()); });

        currentRightX -= achW / 2 + 8;

        // Stars Chip
        const progress = ProgressManager.loadProgress(this.gameData.lessons.length);
        const starsChip = this._createChip(0, row1Y, '⭐', `${this.totalStarsCount}`, 0x46391E, 1, { fontFamily: 'Arial', fontSize: '14px', fontStyle: 'bold', fill: '#FEF08A' });
        currentRightX -= starsChip.width / 2;
        starsChip.container.setX(currentRightX);
        currentRightX -= starsChip.width / 2 + 8;

        // Banana Chip
        const bananaChip = this._createChip(0, row1Y, '🍌', `${this.totalScoreCount}`, 0x46391E, 1, { fontFamily: 'Arial', fontSize: '14px', fontStyle: 'bold', fill: '#FEF08A' });
        currentRightX -= bananaChip.width / 2;
        bananaChip.container.setX(currentRightX);
        currentRightX -= bananaChip.width / 2 + 8;

        // Streak Chip
        const streakDays = progress.streakDays || 0;
        let streakBgColor = 0x475569; // gray
        let streakTextFill = '#94A3B8'; // gray
        if (streakDays > 0) {
            streakTextFill = '#FFFFFF';
        }
        
        // custom chip for gradient
        const streakContainer = this.add.container(0, row1Y).setScrollFactor(0).setDepth(10);
        const streakBg = this.add.graphics();
        const streakEmojiTxt = this.add.text(-5, 0, '🔥', { fontSize: '16px' }).setOrigin(1, 0.5);
        const streakValTxt = this.add.text(5, 0, `${streakDays} ngày`, { fontFamily: 'Arial', fontSize: '14px', fontStyle: 'bold', fill: streakTextFill }).setOrigin(0, 0.5);
        
        const streakW = streakEmojiTxt.width + streakValTxt.width + 30;
        const streakH = 32;
        
        if (streakDays > 0) {
            streakBg.fillGradientStyle(0xf97316, 0xf97316, 0xec4899, 0xec4899, 1);
        } else {
            streakBg.fillStyle(0x2B3649, 1);
        }
        streakBg.fillRoundedRect(-streakW/2, -streakH/2, streakW, streakH, streakH/2);
        
        const totalStreakW = streakEmojiTxt.width + streakValTxt.width + 5;
        streakEmojiTxt.setX(-totalStreakW/2 + streakEmojiTxt.width);
        streakValTxt.setX(-totalStreakW/2 + streakEmojiTxt.width + 5);

        streakContainer.add([streakBg, streakEmojiTxt, streakValTxt]);
        
        currentRightX -= streakW / 2;
        streakContainer.setX(currentRightX);

        // --- ROW 2: MEGA CTAs ---
        const row2Y = 115;
        const gap16 = 16;
        const paddingHorizontal = 20;
        const megaW = (width - paddingHorizontal * 2 - gap16) / 2;
        const megaH = 76;

        // SPRINT
        const sprintX = paddingHorizontal + megaW / 2;
        const sprintContainer = this.add.container(sprintX, row2Y).setScrollFactor(0).setDepth(10);
        const sprintBgGraphics = this.add.graphics();
        const drawSprint = (scale = 1) => {
            sprintBgGraphics.clear();
            sprintBgGraphics.fillGradientStyle(0xa36bff, 0xa36bff, 0x6a3fd6, 0x6a3fd6, 1);
            const w = megaW * scale; const h = megaH * scale;
            sprintBgGraphics.fillRoundedRect(-w/2, -h/2, w, h, 18);
            sprintBgGraphics.lineStyle(scale > 1 ? 4 : 2, 0x9b6dff, scale > 1 ? 0.4 : 0.18);
            sprintBgGraphics.strokeRoundedRect(-w/2 - 2, -h/2 - 2, w + 4, h + 4, 20);
        };
        drawSprint();
        
        // white circle left
        const spLeftCirc = this.add.graphics();
        spLeftCirc.fillStyle(0xFFFFFF, 1);
        spLeftCirc.fillCircle(-megaW/2 + 36, 0, 24);
        const spIcon = this.add.text(-megaW/2 + 36, 0, '⚡', { fontSize: '26px' }).setOrigin(0.5);
        
        // Title & Sub
        const sprintTitle = this.add.text(-megaW/2 + 76, -10, 'Sprint 60 giây', { fontFamily: 'Outfit, Arial', fontSize: '18px', fontStyle: 'bold', fill: '#FFFFFF' }).setOrigin(0, 0.5);
        const spHighScore = progress.sprintHighScore || 0;
        const sprintSub = this.add.text(-megaW/2 + 76, 14, `Best của bé: ${spHighScore} WPM`, { fontFamily: 'Arial', fontSize: '13px', fill: 'rgba(255,255,255,0.9)' }).setOrigin(0, 0.5);
        
        // right chevron
        const spRightCirc = this.add.graphics();
        spRightCirc.fillStyle(0x000000, 0.18);
        spRightCirc.fillCircle(megaW/2 - 24, 0, 15);
        const spChevron = this.add.text(megaW/2 - 24, 0, '→', { fontSize: '16px', fill: '#FFFFFF' }).setOrigin(0.5);

        // shimmer
        const shimmer = this.add.graphics();
        shimmer.fillGradientStyle(0xffffff, 0xffffff, 0xffffff, 0xffffff, 0, 0.2, 0.2, 0);
        shimmer.fillRect(-megaW * 0.3, -megaH/2, megaW * 0.6, megaH);
        const shimmerMaskBg = this.add.graphics().setVisible(false);
        shimmerMaskBg.fillRoundedRect(-megaW/2 + sprintX, -megaH/2 + row2Y, megaW, megaH, 18);
        shimmer.setMask(shimmerMaskBg.createGeometryMask());
        
        this.tweens.add({
            targets: shimmer,
            x: megaW * 1.5,
            duration: 2500,
            repeat: -1,
            onRepeat: () => { shimmer.x = -megaW; }
        });
        shimmer.x = -megaW;

        sprintContainer.add([sprintBgGraphics, spLeftCirc, spIcon, sprintTitle, sprintSub, spRightCirc, spChevron, shimmer]);

        const sprintZone = this.add.zone(sprintX, row2Y, megaW, megaH).setScrollFactor(0).setInteractive({ useHandCursor: true }).setDepth(11);
        sprintZone.on('pointerover', () => { drawSprint(1.02); sprintContainer.setScale(1.02); });
        sprintZone.on('pointerout', () => { drawSprint(1); sprintContainer.setScale(1); });
        sprintZone.on('pointerdown', () => { sprintContainer.setScale(0.98); });
        sprintZone.on('pointerup', () => { sprintContainer.setScale(1); this.sound.play('key_sound'); this.scene.start('SprintScene'); });


        // CHALLENGE
        const chalX = paddingHorizontal + megaW + gap16 + megaW / 2;
        const chalContainer = this.add.container(chalX, row2Y).setScrollFactor(0).setDepth(10);
        const chalBgGraphics = this.add.graphics();
        
        const todayStr = ProgressManager._toDateStr(new Date());
        const isDailyCompleted = progress.dailyChallengeDate === todayStr;
        
        const drawChal = (scale = 1) => {
            chalBgGraphics.clear();
            if (isDailyCompleted) {
                chalBgGraphics.fillGradientStyle(0x475569, 0x475569, 0x334155, 0x334155, 1);
            } else {
                chalBgGraphics.fillGradientStyle(0xff9a3d, 0xff9a3d, 0xff5fa2, 0xff5fa2, 1);
            }
            const w = megaW * scale; const h = megaH * scale;
            chalBgGraphics.fillRoundedRect(-w/2, -h/2, w, h, 18);
            chalBgGraphics.lineStyle(scale > 1 ? 4 : 2, isDailyCompleted ? 0x94A3B8 : 0xff9a3d, scale > 1 ? 0.4 : 0.18);
            chalBgGraphics.strokeRoundedRect(-w/2 - 2, -h/2 - 2, w + 4, h + 4, 20);
        };
        drawChal();
        
        // left emoji wiggle
        const chalEmoji = this.add.text(-megaW/2 + 36, 0, '🎁', { fontSize: '38px', alpha: isDailyCompleted ? 0.5 : 1 }).setOrigin(0.5);
        if (!isDailyCompleted) {
            this.tweens.add({ targets: chalEmoji, angle: 5, duration: 600, yoyo: true, repeat: -1, ease: 'Sine.easeInOut' });
            this.tweens.add({ targets: chalEmoji, angle: -5, duration: 600, yoyo: true, repeat: -1, ease: 'Sine.easeInOut', delay: 600 });
        }
        
        // Title & Sub
        const chalTitle = this.add.text(-megaW/2 + 76, -10, 'Thử thách hôm nay', { fontFamily: 'Outfit, Arial', fontSize: '18px', fontStyle: 'bold', fill: '#FFFFFF', alpha: isDailyCompleted ? 0.7 : 1 }).setOrigin(0, 0.5);
        const chalSub = this.add.text(-megaW/2 + 76, 14, '', { fontFamily: 'Arial', fontSize: '13px', fill: 'rgba(255,255,255,0.9)' }).setOrigin(0, 0.5);
        
        const updateCountdown = () => {
            const ms = this._msUntilMidnight();
            if (isDailyCompleted) {
                chalSub.setText(`✓ Đã nhận · Mở lại sau ${this._formatCountdown(ms)}`);
                chalSub.setAlpha(0.7);
            } else {
                chalSub.setText(`+20 🍌 · Còn ${this._formatCountdown(ms)}`);
            }
        };
        updateCountdown();
        this.time.addEvent({ delay: 1000, loop: true, callback: updateCountdown });
        
        // Pulse dot
        let pulseDot = null;
        if (!isDailyCompleted) {
            pulseDot = this.add.graphics();
            pulseDot.fillStyle(0xFFD700, 1);
            pulseDot.fillCircle(megaW/2 - 20, -15, 6);
            
            const pulseGlow = this.add.graphics();
            pulseGlow.fillStyle(0xFFD700, 0.5);
            pulseGlow.fillCircle(megaW/2 - 20, -15, 6);
            this.tweens.add({ targets: pulseGlow, scaleX: 2.5, scaleY: 2.5, alpha: 0, duration: 1500, repeat: -1 });
            chalContainer.add(pulseGlow);
        }

        chalContainer.add([chalBgGraphics, chalEmoji, chalTitle, chalSub]);
        if (pulseDot) chalContainer.add(pulseDot);

        const chalZone = this.add.zone(chalX, row2Y, megaW, megaH).setScrollFactor(0).setInteractive({ useHandCursor: true }).setDepth(11);
        chalZone.on('pointerover', () => { if(!isDailyCompleted) { drawChal(1.02); chalContainer.setScale(1.02); } });
        chalZone.on('pointerout', () => { drawChal(1); chalContainer.setScale(1); });
        chalZone.on('pointerdown', () => { if(!isDailyCompleted) chalContainer.setScale(0.98); });
        chalZone.on('pointerup', () => { 
            chalContainer.setScale(1); 
            if (!isDailyCompleted) {
                this.sound.play('key_sound'); 
                this.scene.start('PlayScene', { isDailyChallenge: true }); 
            } else {
                this.cameras.main.shake(100, 0.005);
            }
        });
    }

    _applyBackground() {
        const { width, height } = this.scale;
        const equipped = ProgressManager.getEquippedSkins();

        let bgTexture = equipped.background;
        if (bgTexture === 'random') {
            const unlockedBgs = UNLOCK_THRESHOLDS
                .map((threshold, i) => this.totalScoreCount >= threshold ? `bg_${i + 1}` : null)
                .filter(Boolean);
            bgTexture = Phaser.Math.RND.pick(unlockedBgs) || 'bg_1';
        }

        if (this.bg) {
            this.bg.setTexture(bgTexture);
        } else {
            this.bg = this.add.image(width / 2, height / 2, bgTexture)
                .setDisplaySize(width, height).setScrollFactor(0);
        }
    }

    _computeCurrentLessonIndex() {
        const totalLessons = this.gameData.lessons.length;
        for (let i = 0; i < totalLessons; i++) {
            if ((i === 0 || this.lessonStars[i - 1] > 0) && (!this.lessonStars[i] || this.lessonStars[i] === 0)) {
                return i;
            }
        }
        return totalLessons - 1; // All completed
    }

    _msUntilMidnight() {
        const now = new Date();
        const midnight = new Date(now);
        midnight.setHours(24, 0, 0, 0);
        return midnight - now;
    }

    _formatCountdown(ms) {
        if (ms <= 0) return "00:00:00";
        const totalSeconds = Math.floor(ms / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }

    _createChip(x, y, emoji, text, bgColor, bgAlpha, textStyle) {
        const container = this.add.container(x, y).setScrollFactor(0).setDepth(10);
        const bg = this.add.graphics();
        
        const emojiTxt = this.add.text(-5, 0, emoji, { fontSize: '16px' }).setOrigin(1, 0.5);
        const valTxt = this.add.text(5, 0, text, textStyle).setOrigin(0, 0.5);
        
        const width = emojiTxt.width + valTxt.width + 30;
        const height = 32;
        
        bg.fillStyle(bgColor, bgAlpha);
        bg.fillRoundedRect(-width/2, -height/2, width, height, height/2);
        
        // Reposition text to center
        const totalW = emojiTxt.width + valTxt.width + 5;
        emojiTxt.setX(-totalW/2 + emojiTxt.width);
        valTxt.setX(-totalW/2 + emojiTxt.width + 5);

        container.add(bg);
        container.add(emojiTxt);
        container.add(valTxt);
        
        return { container, width };
    }
}
