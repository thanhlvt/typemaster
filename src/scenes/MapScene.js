import * as Phaser from 'phaser';
import { ProgressManager, UNLOCK_THRESHOLDS } from '../utils/ProgressManager';
import { CHAPTERS, CHAPTER_GROUPS, getChapterForLesson } from '../data/chapters';
import { PathNode } from '../components/PathNode';
import { buildNodePositions, getDecorations, getFogAlpha } from '../utils/PathLayout';
import { ensureTextures } from '../utils/TextureLoader';
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

        // 1. Compute node coordinates
        const positions = buildNodePositions(CHAPTERS);

        // 2. Populate lessonYPositions
        this.lessonYPositions = {};
        positions.forEach(pos => {
            this.lessonYPositions[pos.lessonIndex] = pos.y;
        });

        // Calculate yStart and yEnd for Fog of War background dimming
        const currentY = this.lessonYPositions[this.currentLessonIndex] || 300;
        const lastNodeIndex = positions.length - 1;
        const lastY = this.lessonYPositions[lastNodeIndex] || currentY;
        this.yStart = this.lessonYPositions[this.currentLessonIndex + 10] || (lastY + 120);
        this.yEnd = this.lessonYPositions[this.currentLessonIndex + 50] || (this.yStart + 40 * 120);

        // 3. Draw connecting roads
        const roadGraphics = this.add.graphics();
        
        const drawRoadOutline = (p1, p2) => {
            const fog1 = getFogAlpha(p1.lessonIndex, this.currentLessonIndex);
            const fog2 = getFogAlpha(p2.lessonIndex, this.currentLessonIndex);
            const avgFog = (fog1 + fog2) / 2;
            if (avgFog <= 0) return;

            roadGraphics.lineStyle(22, 0x090d16, 0.5 * avgFog);
            if (p1.y === p2.y) {
                roadGraphics.beginPath();
                roadGraphics.moveTo(p1.x, p1.y);
                roadGraphics.lineTo(p2.x, p2.y);
                roadGraphics.strokePath();
            } else if (p1.x === p2.x) {
                const isRightEdge = p1.x > 400;
                const bendX = isRightEdge ? p1.x + 50 : p1.x - 50;
                const curve = new Phaser.Curves.QuadraticBezier(
                    new Phaser.Geom.Point(p1.x, p1.y),
                    new Phaser.Geom.Point(bendX, p1.y + (p2.y - p1.y) / 2),
                    new Phaser.Geom.Point(p2.x, p2.y)
                );
                curve.draw(roadGraphics, 32);
            } else {
                const midY = p1.y + (p2.y - p1.y) / 2;
                const curve = new Phaser.Curves.CubicBezier(
                    new Phaser.Geom.Point(p1.x, p1.y),
                    new Phaser.Geom.Point(p1.x, midY),
                    new Phaser.Geom.Point(p2.x, midY),
                    new Phaser.Geom.Point(p2.x, p2.y)
                );
                curve.draw(roadGraphics, 32);
            }
        };

        const drawRoadFill = (p1, p2, isUnlocked) => {
            const fog1 = getFogAlpha(p1.lessonIndex, this.currentLessonIndex);
            const fog2 = getFogAlpha(p2.lessonIndex, this.currentLessonIndex);
            const avgFog = (fog1 + fog2) / 2;
            if (avgFog <= 0) return;

            const fillColor = isUnlocked ? 0x10b981 : 0x334155;
            const fillAlpha = (isUnlocked ? 0.6 : 0.25) * avgFog;
            roadGraphics.lineStyle(14, fillColor, fillAlpha);
            if (p1.y === p2.y) {
                roadGraphics.beginPath();
                roadGraphics.moveTo(p1.x, p1.y);
                roadGraphics.lineTo(p2.x, p2.y);
                roadGraphics.strokePath();
            } else if (p1.x === p2.x) {
                const isRightEdge = p1.x > 400;
                const bendX = isRightEdge ? p1.x + 50 : p1.x - 50;
                const curve = new Phaser.Curves.QuadraticBezier(
                    new Phaser.Geom.Point(p1.x, p1.y),
                    new Phaser.Geom.Point(bendX, p1.y + (p2.y - p1.y) / 2),
                    new Phaser.Geom.Point(p2.x, p2.y)
                );
                curve.draw(roadGraphics, 32);
            } else {
                const midY = p1.y + (p2.y - p1.y) / 2;
                const curve = new Phaser.Curves.CubicBezier(
                    new Phaser.Geom.Point(p1.x, p1.y),
                    new Phaser.Geom.Point(p1.x, midY),
                    new Phaser.Geom.Point(p2.x, midY),
                    new Phaser.Geom.Point(p2.x, p2.y)
                );
                curve.draw(roadGraphics, 32);
            }
        };

        // Draw outlines first
        for (let i = 0; i < positions.length - 1; i++) {
            drawRoadOutline(positions[i], positions[i + 1]);
        }
        // Draw fills second
        for (let i = 0; i < positions.length - 1; i++) {
            const isUnlocked = positions[i + 1].lessonIndex <= this.currentLessonIndex;
            drawRoadFill(positions[i], positions[i + 1], isUnlocked);
        }

        // 4. Draw Group and Chapter Headers
        const gridCenterX = 395;
        const groupGraphics = this.add.graphics();

        CHAPTERS.forEach((chapter) => {
            const firstLessonIndex = chapter.range[0];
            const firstNode = positions.find(p => p.lessonIndex === firstLessonIndex);
            if (!firstNode) return;

            const headerFogAlpha = getFogAlpha(firstLessonIndex, this.currentLessonIndex);
            if (headerFogAlpha <= 0) return;

            // Check if this chapter is the first of a group
            const group = CHAPTER_GROUPS.find(g => g.chapterIds[0] === chapter.id);
            if (group) {
                // Draw Group Header Text (Big Group, Centered, Font 26px)
                const groupText = `${group.emoji}  ${group.name.toUpperCase()}`;
                const groupHeader = this.add.text(gridCenterX, firstNode.y - 105, groupText, {
                    fontFamily: 'Outfit, Arial',
                    fontSize: '26px',
                    fontStyle: 'bold',
                    fill: '#f8fafc',
                }).setOrigin(0.5).setAlpha(headerFogAlpha);
                groupHeader.setStroke('#0f172a', 5);
                groupHeader.setShadow(0, 2, 'rgba(0,0,0,0.6)', 4, true, true);

                const textWidth = groupHeader.width;
                groupGraphics.lineStyle(2, 0x334155, 0.7 * headerFogAlpha);
                groupGraphics.lineBetween(40, firstNode.y - 105, gridCenterX - textWidth / 2 - 20, firstNode.y - 105);
                groupGraphics.lineBetween(gridCenterX + textWidth / 2 + 20, firstNode.y - 105, 750, firstNode.y - 105);
            }

            // Draw Chapter Header (Small Group, Left-aligned at X=72, Font 18px)
            const chapterHeader = this.add.text(72, firstNode.y - 74, `${chapter.emoji} ${chapter.name.toUpperCase()}`, {
                fontFamily: 'Outfit, Arial',
                fontSize: '18px',
                fontStyle: 'bold',
                fill: '#38bdf8'
            }).setOrigin(0, 0.5).setAlpha(headerFogAlpha);
            chapterHeader.setStroke('#0f172a', 3);
            chapterHeader.setShadow(0, 1, 'rgba(0,0,0,0.5)', 3, true, true);
        });

        // 5. Instantiate Nodes
        this.pathNodes = [];
        positions.forEach((pos) => {
            const isUnlocked = (pos.lessonIndex === 0) || (this.lessonStars[pos.lessonIndex - 1] !== undefined && this.lessonStars[pos.lessonIndex - 1] > 0);
            const stars = this.lessonStars[pos.lessonIndex] || 0;

            const node = new PathNode(this, pos.x, pos.y, pos.lessonIndex, isUnlocked, stars, this.currentLessonIndex);
            this.pathNodes.push(node);
        });

        // Hide monkey on the current node initially
        const currentNode = this.pathNodes.find(node => node.index === this.currentLessonIndex);
        if (currentNode) {
            currentNode.setMonkeyVisible(false);
        }

        // Show monkey on the previous node initially (if applicable)
        if (this.currentLessonIndex > 0) {
            const prevNode = this.pathNodes.find(node => node.index === this.currentLessonIndex - 1);
            if (prevNode) {
                prevNode.forceMonkey = true;
                prevNode.monkeyVisible = true;
                prevNode.updateMonkeySkin();
            }
        }

        // 6. Draw decorations
        const decorations = getDecorations(positions, CHAPTERS);
        decorations.forEach((dec) => {
            const decFogAlpha = getFogAlpha(dec.lessonIndex, this.currentLessonIndex);
            if (decFogAlpha <= 0) return;
            this.add.text(dec.x, dec.y, dec.emoji, {
                fontFamily: 'Segoe UI Emoji, Arial',
                fontSize: '26px'
            }).setOrigin(0.5).setScale(dec.scale).setAlpha(0.65 * decFogAlpha);
        });

        // Set total scroll height and camera bounds
        const lastNode = positions[positions.length - 1];
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

        this.cameras.main.scrollY = 0;
        this.time.delayedCall(100, () => {
            this.tweens.add({ targets: this.cameras.main, scrollY: targetScrollY, duration: 800, ease: 'Cubic.easeOut' });
            const currentCh = getChapterForLesson(this.currentLessonIndex);
            this.sidebar.scrollToChapter(currentCh.id, 800);
            this.time.delayedCall(200, () => {
                this.playMonkeyTransitionAnimation();
            });
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
        fabZone.on('pointerup', (_p, _x, _y, event) => {
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

        // Create global rich tooltip container
        this.richTooltip = this.add.container(0, 0).setDepth(100).setVisible(false);

        const cardW = 220;
        const cardH = 115;

        // Draw background & gold border
        const tooltipBg = this.add.graphics();
        tooltipBg.fillStyle(0x0f172a, 0.95);
        tooltipBg.fillRoundedRect(-cardW / 2, -147, cardW, cardH, 12);
        tooltipBg.lineStyle(1.5, 0xFBBF24, 1); // gold border
        tooltipBg.strokeRoundedRect(-cardW / 2, -147, cardW, cardH, 12);

        // Draw pointing diamond/triangle at the bottom
        tooltipBg.fillStyle(0x0f172a, 0.95);
        tooltipBg.lineStyle(1.5, 0xFBBF24, 1);
        tooltipBg.beginPath();
        tooltipBg.moveTo(-8, -32);
        tooltipBg.lineTo(8, -32);
        tooltipBg.lineTo(0, -20);
        tooltipBg.closePath();
        tooltipBg.fillPath();
        tooltipBg.strokePath();

        // Divider line in tooltip
        tooltipBg.lineStyle(1, 0x334155, 0.6);
        tooltipBg.lineBetween(-100, -118, 100, -118);

        this.richTooltip.add(tooltipBg);

        // Add texts to tooltip container
        this.tooltipTitle = this.add.text(-100, -132, '', {
            fontFamily: 'Outfit, Arial', fontSize: '13px', fontStyle: 'bold', fill: '#38bdf8'
        }).setOrigin(0, 0.5);

        this.tooltipStars = this.add.text(100, -132, '', {
            fontFamily: 'Arial', fontSize: '12px', fill: '#FFD700'
        }).setOrigin(1, 0.5);

        this.tooltipWpm = this.add.text(-100, -95, '', {
            fontFamily: 'Arial', fontSize: '12px', fontStyle: 'bold', fill: '#a7f3d0'
        }).setOrigin(0, 0.5);

        this.tooltipAcc = this.add.text(100, -95, '', {
            fontFamily: 'Arial', fontSize: '12px', fontStyle: 'bold', fill: '#a7f3d0'
        }).setOrigin(1, 0.5);

        this.tooltipDate = this.add.text(0, -62, '', {
            fontFamily: 'Arial', fontSize: '11px', fill: '#94a3b8'
        }).setOrigin(0.5, 0.5);

        this.richTooltip.add([this.tooltipTitle, this.tooltipStars, this.tooltipWpm, this.tooltipAcc, this.tooltipDate]);

        this.input.keyboard.addCapture(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.events.once('shutdown', () => {
            this.input.setDefaultCursor('default');
            this.input.keyboard.removeCapture(Phaser.Input.Keyboard.KeyCodes.SPACE);
        });

        // Deferred: load level.mp3 (319 KB) in background after map is visible
        if (!this.cache.audio.exists('level_sound')) {
            this.load.audio('level_sound', 'assets/level.mp3');
            this.load.start();
        }
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
        if (!this.pathNodes) return;
        const currentNode = this.pathNodes.find(node => node.index === this.currentLessonIndex);
        if (currentNode) {
            currentNode.updateMonkeySkin();
        }
    }

    playMonkeyTransitionAnimation() {
        if (!this.pathNodes) return;
        const currentNode = this.pathNodes.find(node => node.index === this.currentLessonIndex);
        if (!currentNode) return;

        const monkeySkin = this.monkeySkin;

        // Hide the permanent monkey first
        currentNode.setMonkeyVisible(false);

        // Hide monkey on the previous node as we start the transition
        if (this.currentLessonIndex > 0) {
            const prevNode = this.pathNodes.find(node => node.index === this.currentLessonIndex - 1);
            if (prevNode) {
                prevNode.setMonkeyVisible(false);
            }
        }

        const x2 = currentNode.x;
        const y2 = currentNode.y - currentNode.radius - 3;

        ensureTextures(this, [{ key: monkeySkin, url: `assets/${monkeySkin}.png` }], () => {
            if (!this.sys || !this.sys.isActive()) return;

            let tempMonkey;
            if (this.currentLessonIndex === 0) {
                // Lesson 1: jump/fall from above
                const x1 = x2;
                const y1 = y2 - 200;
                tempMonkey = this.add.sprite(x1, y1, monkeySkin)
                    .setScale(0.08, 0.14) // stretched initially
                    .setOrigin(0.5)
                    .setDepth(20);

                this.tweens.add({
                    targets: tempMonkey,
                    y: y2,
                    scaleX: 0.10,
                    scaleY: 0.10,
                    duration: 900,
                    ease: 'Bounce.easeOut',
                    onComplete: () => {
                        this.sound.play('key_sound', { volume: 0.5 });
                        // Squash and stretch on landing
                        this.tweens.add({
                            targets: tempMonkey,
                            scaleX: 0.11,
                            scaleY: 0.09,
                            duration: 100,
                            yoyo: true,
                            repeat: 1,
                            ease: 'Quad.easeInOut',
                            onComplete: () => {
                                tempMonkey.destroy();
                                currentNode.setMonkeyVisible(true);
                            }
                        });
                    }
                });
            } else {
                // Lesson > 1: jump from previous node
                const prevNode = this.pathNodes.find(node => node.index === this.currentLessonIndex - 1);
                const x1 = prevNode ? prevNode.x : x2;
                const y1 = prevNode ? (prevNode.y - prevNode.radius - 3) : (y2 - 400);

                tempMonkey = this.add.sprite(x1, y1, monkeySkin)
                    .setScale(0.10)
                    .setOrigin(0.5)
                    .setDepth(20);

                if (x2 < x1) {
                    tempMonkey.setFlipX(true); // Flip if moving left
                }

                const midX = (x1 + x2) / 2;
                const midY = Math.min(y1, y2) - 120; // 120px arc height

                const curve = new Phaser.Curves.QuadraticBezier(
                    new Phaser.Geom.Point(x1, y1),
                    new Phaser.Geom.Point(midX, midY),
                    new Phaser.Geom.Point(x2, y2)
                );

                const animObj = { progress: 0 };
                this.tweens.add({
                    targets: animObj,
                    progress: 1,
                    duration: 1000,
                    ease: 'Quad.easeInOut',
                    onUpdate: () => {
                        const pt = curve.getPoint(animObj.progress);
                        tempMonkey.setPosition(pt.x, pt.y);
                        
                        // Stretch slightly in the direction of velocity
                        if (animObj.progress > 0.1 && animObj.progress < 0.9) {
                            tempMonkey.setScale(0.09, 0.11);
                        } else {
                            tempMonkey.setScale(0.10, 0.10);
                        }
                    },
                    onComplete: () => {
                        this.sound.play('key_sound', { volume: 0.5 });
                        // Squash and stretch on landing
                        this.tweens.add({
                            targets: tempMonkey,
                            scaleX: 0.11,
                            scaleY: 0.09,
                            duration: 100,
                            yoyo: true,
                            repeat: 1,
                            ease: 'Quad.easeInOut',
                            onComplete: () => {
                                tempMonkey.destroy();
                                currentNode.setMonkeyVisible(true);
                            }
                        });
                    }
                });
            }
        });
    }

    update() {
        if (this.overlay && this.yStart !== undefined && this.yEnd !== undefined) {
            const { height } = this.scale;
            const centerY = this.cameras.main.scrollY + height / 2;
            let darkness = 0;
            if (centerY > this.yStart) {
                darkness = Phaser.Math.Clamp((centerY - this.yStart) / (this.yEnd - this.yStart), 0, 1);
            }
            this.overlay.setAlpha(0.55 + darkness * 0.40);
        }
    }
}
