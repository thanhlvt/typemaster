import * as Phaser from 'phaser';
import { ProgressManager, UNLOCK_THRESHOLDS } from '../utils/ProgressManager';
import { CHAPTERS, CHAPTER_GROUPS, getChapterForLesson } from '../data/chapters';
import { LessonCard } from '../components/LessonCard';
import { MapHeader } from '../components/MapHeader';
import { MapSidebar } from '../components/MapSidebar';

export class MapScene extends Phaser.Scene {
    constructor() {
        super('MapScene');
    }

    init() {
        this.header   = null;
        this.sidebar  = null;
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
        if (progress.lessonStats) {
            for (const key in progress.lessonStats) {
                this.lessonStars[key] = progress.lessonStats[key].stars || 0;
            }
        }

        // Dynamically compute the currentLessonIndex as the furthest unlocked lesson (the frontier)
        // rather than the last played/replayed lesson.
        this.currentLessonIndex   = this._computeCurrentLessonIndex();

        for (const key in this.lessonStars) {
            const stars = this.lessonStars[key] || 0;
            if (stars > 0) {
                this.completedLessonsCount++;
                this.totalStarsCount += stars;
            }
        }

        if (this.header) {
            this.header.updateAchievements(this.unlockedAchievements.length);
        }
    }

    create() {
        const { width, height } = this.scale;

        this._applyBackground();
        this.overlay = this.add.graphics()
            .fillStyle(0x0a0f1d, 0.75)
            .fillRect(0, 0, width, height)
            .setScrollFactor(0);

        // Sidebar geometry (needed for grid layout centering)
        const sidebarW           = 220;
        const sidebarRightMargin = 20;
        const sidebarTopMargin   = 195;
        const sidebarBottomMargin = 80;
        const sidebarH           = height - sidebarTopMargin - sidebarBottomMargin;
        const sidebarX           = width - sidebarW / 2 - sidebarRightMargin;
        const sidebarY           = sidebarTopMargin + sidebarH / 2;
        const sidebarGap         = 30;

        const columns      = 4;
        const rowHeight    = 150;
        const colWidth     = 180;
        const cardHalfW    = 70;
        const gridWidth    = (columns - 1) * colWidth;
        const gridVisualSpan = gridWidth + 2 * cardHalfW;

        // Center grid within the area left of the sidebar
        const gridLeftMargin = 40;
        const gridRightEdge  = sidebarX - sidebarW / 2 - sidebarGap;
        const availableW     = gridRightEdge - gridLeftMargin;
        const startX         = gridLeftMargin + cardHalfW + Math.max(0, (availableW - gridVisualSpan) / 2);
        const gridCenterX    = startX + ((columns - 1) * colWidth) / 2;

        this.lessonYPositions = {};
        let currentY = 180;
        const groupGraphics = this.add.graphics();

        for (let gIdx = 0; gIdx < CHAPTER_GROUPS.length; gIdx++) {
            const group = CHAPTER_GROUPS[gIdx];

            // Add extra visual padding between themes
            if (gIdx > 0) {
                currentY += 45;
            }

            // 1. Draw Group Header Text (Big Group, Centered, Font 26px)
            const groupText = `${group.emoji}  ${group.name.toUpperCase()}`;
            const groupHeader = this.add.text(gridCenterX, currentY + 35, groupText, {
                fontFamily: 'Outfit, Arial',
                fontSize: '26px',
                fontStyle: 'bold',
                fill: '#f8fafc', // Ultra clean slate-white
            }).setOrigin(0.5);
            groupHeader.setStroke('#0f172a', 5);
            groupHeader.setShadow(0, 2, 'rgba(0,0,0,0.6)', 4, true, true);

            const textWidth = groupHeader.width;
            groupGraphics.lineStyle(2, 0x334155, 0.7);
            groupGraphics.lineBetween(gridLeftMargin + 10, currentY + 35, gridCenterX - textWidth / 2 - 20, currentY + 35);
            groupGraphics.lineBetween(gridCenterX + textWidth / 2 + 20, currentY + 35, gridRightEdge - 10, currentY + 35);

            currentY += 80;

            // 2. Layout Lessons Chapter by Chapter (Small Group)
            for (const chapterId of group.chapterIds) {
                const chapter = CHAPTERS.find(c => c.id === chapterId);
                if (!chapter) continue;

                // Draw Chapter Header (Small Group, Left-aligned, Font 18px)
                const chapterHeader = this.add.text(startX - 70, currentY + 25, `${chapter.emoji} ${chapter.name.toUpperCase()}`, {
                    fontFamily: 'Outfit, Arial',
                    fontSize: '18px',
                    fontStyle: 'bold',
                    fill: '#38bdf8' // Sky blue accent
                }).setOrigin(0, 0.5);
                chapterHeader.setStroke('#0f172a', 3);
                chapterHeader.setShadow(0, 1, 'rgba(0,0,0,0.5)', 3, true, true);

                const chapterStartY = currentY + 105;
                const startLesson = chapter.range[0];
                const endLesson = chapter.range[1];
                const numLessons = endLesson - startLesson + 1;
                const rowsInChapter = Math.ceil(numLessons / columns);

                for (let j = 0; j < numLessons; j++) {
                    const globalIndex = startLesson + j;
                    const col = j % columns;
                    const row = Math.floor(j / columns);
                    const x = startX + col * colWidth;
                    const y = chapterStartY + row * rowHeight;

                    this.lessonYPositions[globalIndex] = y;

                    const isUnlocked = (globalIndex === 0) || (this.lessonStars[globalIndex - 1] !== undefined && this.lessonStars[globalIndex - 1] > 0);
                    const stars = this.lessonStars[globalIndex] || 0;

                    new LessonCard(this, x, y, globalIndex, isUnlocked, stars);
                }

                currentY = chapterStartY + rowsInChapter * rowHeight + 10;
            }
        }

        const totalScrollHeight = currentY + 40;
        this.totalScrollHeight = totalScrollHeight;

        this.cameras.main.setBounds(0, 0, width, totalScrollHeight);

        // Drag state variables
        let isDragging = false;
        let dragStartY = 0;
        this.isMapDragging = false;

        this.isDraggingRef = () => isDragging;

        // Instantiate Components
        this.sidebar = new MapSidebar(this);
        this.header = new MapHeader(this);

        // Block pointer events from reaching lesson buttons hidden beneath the fixed header
        this.add.rectangle(0, 0, width, 175, 0x000000, 0)
            .setOrigin(0).setScrollFactor(0).setDepth(9).setInteractive();

        // Calculate and set initial camera position using dynamic coordinates
        const targetActiveY = this.lessonYPositions[this.currentLessonIndex] || 230;
        const targetScrollY = Phaser.Math.Clamp(targetActiveY - height / 2, 0, totalScrollHeight - height);

        this.cameras.main.scrollY = 0;
        this.time.delayedCall(100, () => {
            this.tweens.add({ targets: this.cameras.main, scrollY: targetScrollY, duration: 600, ease: 'Cubic.easeOut' });
            const currentCh = getChapterForLesson(this.currentLessonIndex);
            this.sidebar.scrollToChapter(currentCh.id, 600);
        });

        // ── FAB "Bài hiện tại" (below sidebar) ────────
        const fabW = 120, fabH = 40;
        const fabX = sidebarX;
        const fabY = height - fabH / 2 - 20;

        const fabBg = this.add.graphics().setScrollFactor(0).setDepth(10);
        const drawFabBg = (color, strokeColor = 0xFBBF24) => {
            fabBg.clear();
            fabBg.fillStyle(color, 0.9);
            fabBg.fillRoundedRect(fabX - fabW / 2, fabY - fabH / 2, fabW, fabH, 20);
            fabBg.lineStyle(1.5, strokeColor, 1);
            fabBg.strokeRoundedRect(fabX - fabW / 2, fabY - fabH / 2, fabW, fabH, 20);
        };
        drawFabBg(0x0f172a, 0xFBBF24);

        const fabText = this.add.text(fabX, fabY, '📍 Bài hiện tại', {
            fontFamily: 'Arial', fontSize: '14px', fontStyle: 'bold', fill: '#FBBF24'
        }).setOrigin(0.5).setScrollFactor(0).setDepth(10);

        const fabZone = this.add.zone(fabX, fabY, fabW, fabH)
            .setScrollFactor(0).setInteractive({ useHandCursor: true }).setDepth(11);

        const stopEvent = (_p, _x, _y, event) => { if (event) event.stopPropagation(); };

        fabZone.on('pointerover', () => {
            drawFabBg(0x1e293b, 0xFFD700);
            this.tweens.add({ targets: fabText, scaleX: 1.05, scaleY: 1.05, duration: 100 });
        });
        fabZone.on('pointerout', () => {
            drawFabBg(0x0f172a, 0xFBBF24);
            this.tweens.add({ targets: fabText, scaleX: 1.0, scaleY: 1.0, duration: 100 });
        });
        fabZone.on('pointerdown', stopEvent);
        fabZone.on('pointerup', (pointer, localX, localY, event) => {
            if (event) event.stopPropagation();
            this.sound.play('key_sound');
            const currentActiveY = this.lessonYPositions[this.currentLessonIndex] || 230;
            const currentScrollY = Phaser.Math.Clamp(currentActiveY - height / 2, 0, this.totalScrollHeight - height);
            this.tweens.add({
                targets: this.cameras.main,
                scrollY: currentScrollY,
                duration: 500,
                ease: 'Cubic.easeOut'
            });
            const currentCh = getChapterForLesson(this.currentLessonIndex);
            this.sidebar.scrollToChapter(currentCh.id, 500);
        });

        // ── Map Input handlers (drag & wheel) ────────────────────────────────
        this.input.on('pointerdown', (pointer) => {
            const overSidebar = pointer.x >= sidebarX - sidebarW / 2 && pointer.x <= sidebarX + sidebarW / 2 &&
                               pointer.y >= sidebarY - sidebarH / 2 && pointer.y <= sidebarY + sidebarH / 2;
            if (!overSidebar) {
                dragStartY = pointer.y;
                isDragging = false;
                this.isMapDragging = true;
            } else {
                this.isMapDragging = false;
            }
        });

        this.input.on('pointermove', (pointer) => {
            if (pointer.isDown && this.isMapDragging) {
                if (Math.abs(pointer.y - dragStartY) > 10) isDragging = true;
                this.cameras.main.scrollY -= (pointer.y - pointer.prevPosition.y);
            }
        });

        this.input.on('pointerup', () => {
            this.isMapDragging = false;
        });

        // Create global tooltip container (accessed by LessonCard)
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
        return totalLessons - 1;
    }
}
