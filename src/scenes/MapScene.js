import * as Phaser from 'phaser';
import { ProgressManager, UNLOCK_THRESHOLDS } from '../utils/ProgressManager';
import { CHAPTERS, CHAPTER_GROUPS, getChapterForLesson } from '../data/chapters';
import { AudioManager } from '../utils/AudioManager';
import { PathNode } from '../components/PathNode';
import { buildNodePositions } from '../utils/PathLayout';
import { ensureTextures } from '../utils/TextureLoader';
import { MapHeader } from '../components/MapHeader';
import { MapSidebar } from '../components/MapSidebar';
import { FTUEOverlay } from '../components/FTUEOverlay';
import { drawRoads, drawChapterHeaders, drawDecorations } from '../utils/MapRoadRenderer';
import { createFAB } from '../utils/MapFAB';
import { createTooltip } from '../utils/MapTooltip';
import { playMonkeyTransitionAnimation } from '../utils/MapMonkeyAnimation';

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
        this._determineMonkeySkin();
    }

    _determineMonkeySkin() {
        const equipped = ProgressManager.getEquippedSkins();
        let monkeySkin = equipped.monkey || 'monkey_1';
        if (monkeySkin === 'random') {
            const unlockedMonkeys = UNLOCK_THRESHOLDS
                .map((threshold, i) => this.totalScoreCount >= threshold ? `monkey_${i + 1}` : null)
                .filter(Boolean);
            monkeySkin = Phaser.Math.RND.pick(unlockedMonkeys) || 'monkey_1';
        }
        this.monkeySkin = monkeySkin;
    }

    create() {
        const { width, height } = this.scale;

        this._applyBackground();
        this.overlay = this.add.graphics()
            .fillStyle(0x0a0f1d, 1.0)
            .fillRect(0, 0, width, height)
            .setScrollFactor(0);
        this.overlay.setAlpha(0.55);

        // Sidebar geometry (needed for coordinate referencing)
        const sidebarW           = 220;
        const sidebarRightMargin = 20;
        const sidebarTopMargin   = 195;
        const sidebarBottomMargin = 80;
        const sidebarH           = height - sidebarTopMargin - sidebarBottomMargin;
        const sidebarX           = width - sidebarW / 2 - sidebarRightMargin;
        const sidebarY           = sidebarTopMargin + sidebarH / 2;

        // 1. Compute and store all node positions (shared across virtual scroll lifecycle)
        this.positions = buildNodePositions(CHAPTERS);

        // 2. Populate lessonYPositions
        this.lessonYPositions = {};
        this.positions.forEach(pos => {
            this.lessonYPositions[pos.lessonIndex] = pos.y;
        });

        // Calculate yStart and yEnd for Fog of War background dimming
        const currentY = this.lessonYPositions[this.currentLessonIndex] || 300;
        const lastNodeIndex = this.positions.length - 1;
        const lastY = this.lessonYPositions[lastNodeIndex] || currentY;
        this.yStart = this.lessonYPositions[this.currentLessonIndex + 10] || (lastY + 120);
        this.yEnd = this.lessonYPositions[this.currentLessonIndex + 50] || (this.yStart + 40 * 120);

        // 3. Draw connecting roads
        drawRoads(this, this.positions, this.currentLessonIndex);

        // 4. Draw Group and Chapter Headers
        drawChapterHeaders(this, this.positions, this.currentLessonIndex);

        // 5. Create decorations
        drawDecorations(this, this.positions, this.currentLessonIndex);

        // Set total scroll height and camera bounds
        const lastNode = this.positions[this.positions.length - 1];
        const totalScrollHeight = lastNode.y + 180;
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

        // Calculate and set initial camera position
        const targetActiveY = this.lessonYPositions[this.currentLessonIndex] || 230;
        const targetScrollY = Phaser.Math.Clamp(targetActiveY - height / 2, 0, totalScrollHeight - height);

        const startLessonIndex = Math.max(0, this.currentLessonIndex - 30);
        const startActiveY = this.lessonYPositions[startLessonIndex] || 230;
        const startScrollY = Phaser.Math.Clamp(startActiveY - height / 2, 0, totalScrollHeight - height);

        this.cameras.main.scrollY = startScrollY;

        // 6. Virtual node system — create only what's in viewport + buffer
        this._activeNodes = new Map();
        this._lastVirtualScrollY = -9999;
        this._updateVisibleNodes(startScrollY);
        // Current and previous nodes are always kept alive (needed for animations)
        this._ensureNode(this.currentLessonIndex);
        if (this.currentLessonIndex > 0) this._ensureNode(this.currentLessonIndex - 1);

        // Monkey state init
        const currentNode = this._activeNodes.get(this.currentLessonIndex);
        if (currentNode) {
            currentNode.setMonkeyVisible(false);
        }
        if (this.currentLessonIndex > 0) {
            const prevNode = this._activeNodes.get(this.currentLessonIndex - 1);
            if (prevNode) {
                prevNode.forceMonkey = true;
                prevNode.monkeyVisible = true;
                prevNode.updateMonkeySkin();
            }
        }

        this.time.delayedCall(100, () => {
            this.tweens.add({ targets: this.cameras.main, scrollY: targetScrollY, duration: 800, ease: 'Cubic.easeOut' });
            const currentCh = getChapterForLesson(this.currentLessonIndex);
            this.sidebar.scrollToChapter(currentCh.id, 800);
            this.time.delayedCall(300, () => {
                const ftueCompleted = localStorage.getItem('typemaster_ftue_completed');
                if (this.currentLessonIndex === 0 && !ftueCompleted) {
                    // Skip initial monkey animation because FTUE is active
                } else {
                    this.playMonkeyTransitionAnimation();
                }
            });
        });

        // ── FAB "Bài hiện tại" (below sidebar) ────────
        const fabY = height - 40;
        createFAB(this, sidebarX, fabY, () => {
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

        // Create global rich tooltip container
        const tooltipUI = createTooltip(this);
        this.richTooltip = tooltipUI.container;
        this.tooltipTitle = tooltipUI.title;
        this.tooltipStars = tooltipUI.stars;
        this.tooltipWpm = tooltipUI.wpm;
        this.tooltipAcc = tooltipUI.acc;
        this.tooltipDate = tooltipUI.date;

        this.input.keyboard.addCapture(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.events.once('shutdown', () => {
            this.input.setDefaultCursor('default');
            this.input.keyboard.removeCapture(Phaser.Input.Keyboard.KeyCodes.SPACE);
        });

        AudioManager.playThemeMusic(this, this.currentLessonIndex);

        // Instantiate First Time User Experience (FTUE) if not completed yet
        const ftueCompleted = localStorage.getItem('typemaster_ftue_completed');
        if (!ftueCompleted) {
            this.ftueOverlay = new FTUEOverlay(this);
        }
    }

    // Creates a PathNode for the given lessonIndex if it doesn't already exist
    _ensureNode(index) {
        if (this._activeNodes.has(index)) return this._activeNodes.get(index);
        const pos = this.positions[index];
        if (!pos) return null;
        const isUnlocked = (pos.lessonIndex === 0) ||
            (this.lessonStars[pos.lessonIndex - 1] !== undefined && this.lessonStars[pos.lessonIndex - 1] > 0);
        const stars = this.lessonStars[pos.lessonIndex] || 0;
        const node = new PathNode(this, pos.x, pos.y, pos.lessonIndex, isUnlocked, stars, this.currentLessonIndex);
        this._activeNodes.set(index, node);
        return node;
    }

    // Creates nodes entering the viewport and destroys those that scrolled far away
    _updateVisibleNodes(scrollY) {
        const { height } = this.scale;
        const BUFFER = 600;
        const visTop    = scrollY - BUFFER;
        const visBottom = scrollY + height + BUFFER;
        const killTop    = scrollY - BUFFER * 1.5;
        const killBottom = scrollY + height + BUFFER * 1.5;

        this._lastVirtualScrollY = scrollY;

        for (const pos of this.positions) {
            if (pos.y >= visTop && pos.y <= visBottom && !this._activeNodes.has(pos.lessonIndex)) {
                this._ensureNode(pos.lessonIndex);
            }
        }

        const toDelete = [];
        for (const [lessonIndex, node] of this._activeNodes) {
            if (lessonIndex === this.currentLessonIndex || lessonIndex === this.currentLessonIndex - 1) continue;
            const pos = this.positions[lessonIndex];
            if (!pos) continue;
            if (pos.y < killTop || pos.y > killBottom) {
                node.destroy();
                toDelete.push(lessonIndex);
            }
        }
        for (const idx of toDelete) this._activeNodes.delete(idx);
    }

    showTooltip(index, x, y, isBoss) {
        const chapter = getChapterForLesson(index);
        const stars = this.lessonStars[index] || 0;
        const stats = this.lessonStats[index] || { wpm: 0, accuracy: 0, timestamp: null };

        const starStr = stars === 3 ? '⭐⭐⭐' : stars === 2 ? '⭐⭐☆' : stars === 1 ? '⭐☆☆' : '☆☆☆';
        const titleText = isBoss ? `⚔️ BOSS: Bài ${index + 1}` : `Bài ${index + 1}: ${chapter.name}`;
        const wpmText = `Tốc độ: ${stats.wpm || 0} WPM`;
        const accText = `Chính xác: ${stats.accuracy || 0}%`;

        let dateStr = 'Chưa chơi';
        if (stats.timestamp) {
            const date = new Date(stats.timestamp);
            dateStr = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
        }
        const dateText = `Gần nhất: ${dateStr}`;

        this.tooltipTitle.setText(titleText);
        this.tooltipStars.setText(starStr);
        this.tooltipWpm.setText(wpmText);
        this.tooltipAcc.setText(accText);
        this.tooltipDate.setText(dateText);

        this.richTooltip.setPosition(x, y - (isBoss ? 28 : 22));
        this.richTooltip.setVisible(true);
    }

    hideTooltip() {
        this.richTooltip.setVisible(false);
    }

    _applyBackground() {
        const equipped = ProgressManager.getEquippedSkins();
        const homeBackground = equipped.homeBackground || 'default';

        let bgTexture;
        if (homeBackground === 'random') {
            const unlocked = ProgressManager.getUnlockedBackgrounds(this.lessonStats, CHAPTERS);
            bgTexture = Phaser.Math.RND.pick(unlocked);
        } else {
            bgTexture = ProgressManager.getLastUnlockedBackground(this.lessonStats, CHAPTERS);
        }

        ensureTextures(this, [{ key: bgTexture, url: `assets/${bgTexture}.jpg` }], () => {
            if (this.bg) {
                this.bg.setTexture(bgTexture);
            } else {
                const { width, height } = this.scale;
                this.bg = this.add.image(width / 2, height / 2, bgTexture)
                    .setDisplaySize(width, height).setScrollFactor(0);
                this.children.sendToBack(this.bg);
            }
        });
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

    updateCurrentMonkeySkin() {
        if (!this._activeNodes) return;
        const currentNode = this._activeNodes.get(this.currentLessonIndex);
        if (currentNode) {
            currentNode.updateMonkeySkin();
        }
    }

    playMonkeyTransitionAnimation() {
        playMonkeyTransitionAnimation(this);
    }

    update(time, delta) {
        if (this.overlay && this.yStart !== undefined && this.yEnd !== undefined) {
            const { height } = this.scale;
            const centerY = this.cameras.main.scrollY + height / 2;
            let darkness = 0;
            if (centerY > this.yStart) {
                darkness = Phaser.Math.Clamp((centerY - this.yStart) / (this.yEnd - this.yStart), 0, 1);
            }
            this.overlay.setAlpha(0.55 + darkness * 0.40);
        }

        if (this._activeNodes && this.positions) {
            const scrollY = this.cameras.main.scrollY;
            if (Math.abs(scrollY - this._lastVirtualScrollY) > 50) {
                this._updateVisibleNodes(scrollY);
            }
        }

        if (this.ftueOverlay && this.ftueOverlay.active) {
            this.ftueOverlay.update(time, delta);
        }
    }
}
