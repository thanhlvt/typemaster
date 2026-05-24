import * as Phaser from 'phaser';
import { ProgressManager, UNLOCK_THRESHOLDS } from '../utils/ProgressManager';
import { AchievementsOverlay } from '../components/AchievementsOverlay';
import { ACHIEVEMENTS } from '../utils/AchievementManager';
import { StatsOverlay } from '../components/StatsOverlay';
import { SkinsOverlay } from '../components/SkinsOverlay';
import { OptionsOverlay } from '../components/OptionsOverlay';

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
        const startY       = 190;
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
        const sidebarW = 60, sidebarH = 300, sidebarX = 40, sidebarY = height / 2 + 50;
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

        const activeRow    = Math.floor(this.currentLessonIndex / columns);
        const targetActiveY = startY + activeRow * rowHeight;
        const targetScrollY = Phaser.Math.Clamp(targetActiveY - height / 2, 0, totalScrollHeight - height);

        this.cameras.main.scrollY = 0;
        this.time.delayedCall(100, () => {
            this.tweens.add({ targets: this.cameras.main, scrollY: targetScrollY, duration: 600, ease: 'Cubic.easeOut' });
        });

        // ── FAB "Bài hiện tại" ────────────────────────────────────
        const fabW = 160, fabH = 40;
        const fabX = width - fabW / 2 - 20;
        const fabY = height - fabH / 2 - 20;

        const fabBg = this.add.graphics().setScrollFactor(0).setDepth(10);
        const drawFabBg = (color, strokeColor = 0xFBBF24) => {
            fabBg.clear();
            fabBg.fillStyle(color, 0.9);
            fabBg.fillRoundedRect(fabX - fabW / 2, fabY - fabH / 2, fabW, fabH, 20);
            fabBg.lineStyle(2, strokeColor, 1);
            fabBg.strokeRoundedRect(fabX - fabW / 2, fabY - fabH / 2, fabW, fabH, 20);
        };
        drawFabBg(0x0f172a);

        const fabText = this.add.text(fabX, fabY, '📍 Bài hiện tại', {
            fontFamily: 'Arial', fontSize: '15px', fontStyle: 'bold', fill: '#FBBF24'
        }).setOrigin(0.5).setScrollFactor(0).setDepth(10);

        const fabZone = this.add.zone(fabX, fabY, fabW, fabH)
            .setScrollFactor(0).setInteractive({ useHandCursor: true }).setDepth(11);

        fabZone.on('pointerover', () => {
            drawFabBg(0x1e293b, 0xFCD34D);
            this.tweens.add({ targets: fabText, scaleX: 1.05, scaleY: 1.05, duration: 100 });
        });
        fabZone.on('pointerout', () => {
            drawFabBg(0x0f172a, 0xFBBF24);
            this.tweens.add({ targets: fabText, scaleX: 1.0, scaleY: 1.0, duration: 100 });
        });
        fabZone.on('pointerdown', () => {
            this.sound.play('key_sound');
            this.tweens.add({ targets: this.cameras.main, scrollY: targetScrollY, duration: 500, ease: 'Cubic.easeOut' });
        });

        // ── Sidebar ───────────────────────────────────────────────
        const segmentSize   = 50;
        const totalSegments = Math.ceil(totalLessons / segmentSize);
        const btnW = 50, btnH = 30, itemSpacing = 38;
        const contentHeight = totalSegments * itemSpacing;

        const sbBg = this.add.graphics().setScrollFactor(0).setDepth(10);
        sbBg.fillStyle(0x0f172a, 0.85);
        sbBg.fillRoundedRect(sidebarX - sidebarW / 2, sidebarY - sidebarH / 2, sidebarW, sidebarH, 18);
        sbBg.lineStyle(1.5, 0x38bdf8, 0.4);
        sbBg.strokeRoundedRect(sidebarX - sidebarW / 2, sidebarY - sidebarH / 2, sidebarW, sidebarH, 18);

        this.add.text(sidebarX, sidebarY - sidebarH / 2 + 15, 'Tới bài', {
            fontFamily: 'Arial', fontSize: '11px', fontStyle: 'bold', fill: '#38BDF8'
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
        for (let j = 0; j < totalSegments; j++) {
            const startL  = j * segmentSize + 1;
            const btnX    = sidebarX;
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
                fontFamily: 'Arial', fontSize: '12px', fontStyle: 'bold', fill: '#94A3B8'
            }).setOrigin(0.5);
            listContainer.add(btnText);

            sidebarBtnData.push({ j, drawBtnBg, btnText, btnX, btnLocalY });
        }

        const getSidebarBtn = (px, py) => {
            if (!isSidebarHit({ x: px, y: py })) return null;
            if (py < maskY || py > maskY + maskH) return null;
            for (const btn of sidebarBtnData) {
                const visY = btn.btnLocalY + scrollYOffset;
                if (px >= btn.btnX - btnW / 2 && px <= btn.btnX + btnW / 2 &&
                    py >= visY - btnH / 2      && py <= visY + btnH / 2) {
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
                    hoveredBtn.drawBtnBg(0x1e293b, 0x475569); 
                    hoveredBtn.btnText.setFill('#94A3B8'); 
                    this.input.setDefaultCursor('default');
                }
                hoveredBtn = hit;
                if (hit) { 
                    hit.drawBtnBg(0x334155, 0x38bdf8); 
                    hit.btnText.setFill('#FFFFFF'); 
                    this.input.setDefaultCursor('pointer');
                }
            }
        });

        this.input.on('pointerup', (pointer) => {
            if (isDraggingSidebar && sidebarDragDistance < 8 && isSidebarHit(pointer)) {
                const hit = getSidebarBtn(pointer.x, pointer.y);
                if (hit) {
                    this.sound.play('key_sound');
                    const firstLessonIndex = hit.j * segmentSize;
                    const segRow     = Math.floor(firstLessonIndex / columns);
                    const targetSegY = startY + segRow * rowHeight;
                    const targetSegScrollY = Phaser.Math.Clamp(targetSegY - height / 2, 0, totalScrollHeight - height);
                    this.tweens.add({ targets: this.cameras.main, scrollY: targetSegScrollY, duration: 500, ease: 'Cubic.easeOut' });
                }
            }
            if (hoveredBtn) hoveredBtn.drawBtnBg(0x334155, 0x38bdf8);
            isDraggingSidebar = false;
        });

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

        const drawBg = (color, strokeColor, strokeWidth = 2, fillAlpha = 0.85) => {
            bg.clear();
            bg.fillStyle(color, fillAlpha);
            bg.fillRoundedRect(-btnWidth / 2, -btnHeight / 2, btnWidth, btnHeight, 16);
            bg.lineStyle(strokeWidth, strokeColor, 1);
            bg.strokeRoundedRect(-btnWidth / 2, -btnHeight / 2, btnWidth, btnHeight, 16);
        };

        if (!isUnlocked) {
            drawBg(0x1E293B, 0x475569, 2, 0.4);
            itemContainer.add(this.add.text(0, -20, `${index + 1}`, {
                fontFamily: 'Outfit, Arial', fontSize: '30px', fontStyle: 'bold', fill: '#64748B'
            }).setOrigin(0.5));
            itemContainer.add(this.add.text(0, 20, '🔒', {
                fontSize: '24px', padding: { top: 8, bottom: 8, left: 8, right: 8 }
            }).setOrigin(0.5));
        } else {
            const isCompleted = stars > 0;
            const mainColor   = isCompleted ? 0x0F766E : 0x1E3A8A;
            const borderCol   = isCompleted ? 0x0EA5E9 : 0x3B82F6;
            drawBg(mainColor, borderCol, 2, 0.9);

            itemContainer.add(this.add.text(0, -20, `${index + 1}`, {
                fontFamily: 'Outfit, Arial', fontSize: '32px', fontStyle: 'bold', fill: '#FFFFFF'
            }).setOrigin(0.5));
            itemContainer.add(this.add.text(0, 10, 'Bài học', {
                fontFamily: 'Arial', fontSize: '14px', fill: '#93C5FD'
            }).setOrigin(0.5));

            const starStr = stars === 3 ? '⭐⭐⭐' : stars === 2 ? '⭐⭐☆' : stars === 1 ? '⭐☆☆' : '☆☆☆';
            itemContainer.add(this.add.text(0, 32, starStr, {
                fontFamily: 'Arial', fontSize: '16px', fill: '#FFD700'
            }).setOrigin(0.5));

            const zone = this.add.zone(0, 0, btnWidth, btnHeight).setInteractive({ useHandCursor: true });
            itemContainer.add(zone);

            zone.on('pointerover', () => {
                itemContainer.setDepth(2);
                this.tweens.add({ targets: itemContainer, scaleX: 1.1, scaleY: 1.1, duration: 100, ease: 'Power1' });
                drawBg(mainColor, 0xFBBF24, 3, 0.95);
            });
            zone.on('pointerout', () => {
                itemContainer.setDepth(1);
                this.tweens.add({ targets: itemContainer, scaleX: 1.0, scaleY: 1.0, duration: 100, ease: 'Power1' });
                drawBg(mainColor, borderCol, 2, 0.9);
            });
            zone.on('pointerdown', () => {
                this.tweens.add({ targets: itemContainer, scaleX: 0.95, scaleY: 0.95, duration: 50 });
            });
            zone.on('pointerup', () => {
                this.tweens.add({
                    targets: itemContainer, scaleX: 1.0, scaleY: 1.0, duration: 50,
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
        headerBg.fillStyle(0x0f172a, 0.95);
        headerBg.fillRoundedRect(0, 0, width, 130, { tl: 0, tr: 0, bl: 20, br: 20 });
        headerBg.lineStyle(3, 0xFBBF24, 1);
        headerBg.beginPath();
        headerBg.moveTo(0, 130);
        headerBg.lineTo(width, 130);
        headerBg.strokePath();

        this.add.text(50, 40, 'BẢN ĐỒ BÀI HỌC', {
            fontFamily: 'Outfit, Arial', fontSize: '36px', fontStyle: 'bold',
            fill: '#FBBF24', stroke: '#000000', strokeThickness: 4
        }).setOrigin(0, 0.5).setScrollFactor(0).setDepth(10);

        const totalLessons = this.gameData.lessons.length;
        const progressStr  = `Tiến độ: ${this.completedLessonsCount}/${totalLessons} bài học  |  Tổng: ⭐ ${this.totalStarsCount}`;
        this.add.text(50, 85, progressStr, {
            fontFamily: 'Arial', fontSize: '18px', fontStyle: 'bold', fill: '#38BDF8'
        }).setOrigin(0, 0.5).setScrollFactor(0).setDepth(10);

        const btnH = 36, btnY = 40;

        const optBtnW  = 36;
        const optBtnX  = width - optBtnW / 2 - 20;
        const skinBtnW = 120;
        const skinBtnX = optBtnX - optBtnW / 2 - skinBtnW / 2 - 15;
        const achBtnW  = 160;
        const achBtnX  = skinBtnX - skinBtnW / 2 - achBtnW / 2 - 15;
        const statsBtnW = 140;
        const statsBtnX = achBtnX - achBtnW / 2 - statsBtnW / 2 - 15;

        // Achievement button
        const achBg = this.add.graphics().setScrollFactor(0).setDepth(10);
        const drawAchBg = (color) => {
            achBg.clear(); achBg.fillStyle(color, 0.85);
            achBg.fillRoundedRect(achBtnX - achBtnW / 2, btnY - btnH / 2, achBtnW, btnH, 18);
            achBg.lineStyle(1.5, 0xffffff, 0.2);
            achBg.strokeRoundedRect(achBtnX - achBtnW / 2, btnY - btnH / 2, achBtnW, btnH, 18);
        };
        drawAchBg(0xD97706);
        this.achText = this.add.text(achBtnX, btnY, `🏆 Huy hiệu (${this.unlockedAchievements.length}/${ACHIEVEMENTS.length})`, {
            fontFamily: 'Arial', fontSize: '15px', fontStyle: 'bold', fill: '#FFF'
        }).setOrigin(0.5).setScrollFactor(0).setDepth(10);
        const achZone = this.add.zone(achBtnX, btnY, achBtnW, btnH).setScrollFactor(0).setInteractive({ useHandCursor: true }).setDepth(11);
        achZone.on('pointerover', () => drawAchBg(0xF59E0B));
        achZone.on('pointerout',  () => drawAchBg(0xD97706));
        achZone.on('pointerdown', () => {
            this.sound.play('key_sound');
            new AchievementsOverlay(this, this.unlockedAchievements, () => { this._loadProgress(); });
        });

        // Stats button
        const statsBg = this.add.graphics().setScrollFactor(0).setDepth(10);
        const drawStatsBg = (color) => {
            statsBg.clear(); statsBg.fillStyle(color, 0.85);
            statsBg.fillRoundedRect(statsBtnX - statsBtnW / 2, btnY - btnH / 2, statsBtnW, btnH, 18);
            statsBg.lineStyle(1.5, 0xffffff, 0.2);
            statsBg.strokeRoundedRect(statsBtnX - statsBtnW / 2, btnY - btnH / 2, statsBtnW, btnH, 18);
        };
        drawStatsBg(0x0D9488);
        this.add.text(statsBtnX, btnY, '📊 Thống kê', {
            fontFamily: 'Arial', fontSize: '15px', fontStyle: 'bold', fill: '#FFF'
        }).setOrigin(0.5).setScrollFactor(0).setDepth(10);
        const statsZone = this.add.zone(statsBtnX, btnY, statsBtnW, btnH).setScrollFactor(0).setInteractive({ useHandCursor: true }).setDepth(11);
        statsZone.on('pointerover', () => drawStatsBg(0x14B8A6));
        statsZone.on('pointerout',  () => drawStatsBg(0x0D9488));
        statsZone.on('pointerdown', () => {
            this.sound.play('key_sound');
            new StatsOverlay(this, () => { this._loadProgress(); });
        });

        // Skin button
        const skinBg = this.add.graphics().setScrollFactor(0).setDepth(10);
        const drawSkinBg = (color) => {
            skinBg.clear(); skinBg.fillStyle(color, 0.85);
            skinBg.fillRoundedRect(skinBtnX - skinBtnW / 2, btnY - btnH / 2, skinBtnW, btnH, 18);
            skinBg.lineStyle(1.5, 0xffffff, 0.2);
            skinBg.strokeRoundedRect(skinBtnX - skinBtnW / 2, btnY - btnH / 2, skinBtnW, btnH, 18);
        };
        drawSkinBg(0x059669);
        this.add.text(skinBtnX, btnY, '👕 Skin', {
            fontFamily: 'Arial', fontSize: '15px', fontStyle: 'bold', fill: '#FFF'
        }).setOrigin(0.5).setScrollFactor(0).setDepth(10);
        const skinZone = this.add.zone(skinBtnX, btnY, skinBtnW, btnH).setScrollFactor(0).setInteractive({ useHandCursor: true }).setDepth(11);
        skinZone.on('pointerover', () => drawSkinBg(0x10B981));
        skinZone.on('pointerout',  () => drawSkinBg(0x059669));
        skinZone.on('pointerdown', () => {
            this.sound.play('key_sound');
            new SkinsOverlay(this, () => { this._loadProgress(); this._applyBackground(); });
        });

        // Options button
        const optBg = this.add.graphics().setScrollFactor(0).setDepth(10);
        const drawOptBg = (color) => {
            optBg.clear(); optBg.fillStyle(color, 0.85);
            optBg.fillRoundedRect(optBtnX - optBtnW / 2, btnY - optBtnW / 2, optBtnW, optBtnW, 18);
            optBg.lineStyle(1.5, 0xffffff, 0.2);
            optBg.strokeRoundedRect(optBtnX - optBtnW / 2, btnY - optBtnW / 2, optBtnW, optBtnW, 18);
        };
        drawOptBg(0x4F46E5);
        this.add.text(optBtnX, btnY, '⚙️', {
            fontFamily: 'Arial', fontSize: '18px', fontStyle: 'bold', fill: '#FFF'
        }).setOrigin(0.5).setScrollFactor(0).setDepth(10);
        const optZone = this.add.zone(optBtnX, btnY, optBtnW, optBtnW).setScrollFactor(0).setInteractive({ useHandCursor: true }).setDepth(11);
        optZone.on('pointerover', () => drawOptBg(0x6366F1));
        optZone.on('pointerout',  () => drawOptBg(0x4F46E5));
        optZone.on('pointerdown', () => {
            this.sound.play('key_sound');
            new OptionsOverlay(this);
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
}
