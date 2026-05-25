import * as Phaser from 'phaser';
import { CHAPTERS, CHAPTER_GROUPS, getChapterProgress, isChapterUnlocked } from '../data/chapters';

export class MapSidebar extends Phaser.GameObjects.Container {
    constructor(scene) {
        const { width, height } = scene.scale;
        super(scene, 0, 0);
        this.scene = scene;
        this.setDepth(9.5);
        this.setScrollFactor(0);

        // Sidebar geometry (matching MapScene coordinates)
        const sidebarW           = 220;
        const sidebarRightMargin = 20;
        const sidebarTopMargin   = 195; 
        const sidebarBottomMargin = 80; 
        const sidebarH           = height - sidebarTopMargin - sidebarBottomMargin;
        const sidebarX           = width - sidebarW / 2 - sidebarRightMargin;
        const sidebarY           = sidebarTopMargin + sidebarH / 2;

        this.sidebarW = sidebarW;
        this.sidebarH = sidebarH;
        this.sidebarX = sidebarX;
        this.sidebarY = sidebarY;

        // Blocker to prevent pointer events from leaking to lesson buttons behind the sidebar
        const sbBlocker = scene.add.rectangle(sidebarX, sidebarY, sidebarW, sidebarH, 0x000000, 0)
            .setOrigin(0.5).setScrollFactor(0).setDepth(9.5).setInteractive();
        this.add(sbBlocker);

        const btnW = sidebarW - 20, btnH = 46, itemSpacing = 54;
        const groupHeaderHeight = 28; 
        const groupGap          = 10; 
        
        const contentHeight = CHAPTER_GROUPS.reduce((sum, g, idx) => 
            sum + groupHeaderHeight + g.chapterIds.length * itemSpacing + (idx > 0 ? groupGap : 0), 0);

        const sbBg = scene.add.graphics();
        sbBg.fillStyle(0x0f172a, 0.85);
        sbBg.fillRoundedRect(sidebarX - sidebarW / 2, sidebarY - sidebarH / 2, sidebarW, sidebarH, 18);
        sbBg.lineStyle(1.5, 0x38bdf8, 0.4);
        sbBg.strokeRoundedRect(sidebarX - sidebarW / 2, sidebarY - sidebarH / 2, sidebarW, sidebarH, 18);
        this.add(sbBg);

        const titleText = scene.add.text(sidebarX, sidebarY - sidebarH / 2 + 15, '🗺 Hành trình', {
            fontFamily: 'Arial', fontSize: '13px', fontStyle: 'bold', fill: '#38BDF8'
        }).setOrigin(0.5);
        this.add(titleText);

        this.listContainer = scene.add.container(0, 0).setScrollFactor(0).setDepth(10);
        this.add(this.listContainer);

        const maskW = sidebarW - 8, maskH = sidebarH - 45;
        const maskX = sidebarX - maskW / 2, maskY = sidebarY - sidebarH / 2 + 32;
        this.maskY = maskY;
        this.maskH = maskH;

        const maskShape = scene.add.graphics().setScrollFactor(0).setVisible(false);
        maskShape.fillStyle(0xffffff);
        maskShape.fillRect(maskX, maskY, maskW, maskH);
        this.listContainer.setMask(maskShape.createGeometryMask());

        this.maxScroll = Math.max(0, contentHeight - maskH + 10);
        this.scrollYOffset = 0;

        const updateScroll = (dy) => {
            this.scrollYOffset = Phaser.Math.Clamp(this.scrollYOffset - dy, -this.maxScroll, 0);
            this.listContainer.y = this.scrollYOffset;
        };

        this.sidebarBtnData = [];
        const btnX = sidebarX;
        let cursorY = sidebarY - sidebarH / 2 + 38; 
        let btnIndex = 0;

        for (let gIdx = 0; gIdx < CHAPTER_GROUPS.length; gIdx++) {
            const group = CHAPTER_GROUPS[gIdx];
            if (gIdx > 0) cursorY += groupGap;

            // Group separator label
            const groupLabelY = cursorY + groupHeaderHeight / 2;
            const groupLabel = scene.add.text(btnX, groupLabelY, `${group.emoji}  ${group.name.toUpperCase()}`, {
                fontFamily: 'Arial', fontSize: '11px', fontStyle: 'bold', fill: '#64748B'
            }).setOrigin(0.5).setAlpha(0.85);
            this.listContainer.add(groupLabel);

            // Thin divider line under group label
            const div = scene.add.graphics();
            div.lineStyle(1, 0x334155, 0.5);
            div.lineBetween(btnX - btnW / 2 + 8, groupLabelY + 12, btnX + btnW / 2 - 8, groupLabelY + 12);
            this.listContainer.add(div);

            cursorY += groupHeaderHeight;

            // Chapters in this group
            for (const chapterId of group.chapterIds) {
                const chapter = CHAPTERS.find(c => c.id === chapterId);
                if (!chapter) continue;

                const btnLocalY = cursorY + itemSpacing / 2;
                const progress = getChapterProgress(chapter, scene.lessonStars);
                const unlocked = isChapterUnlocked(chapter, scene.lessonStars);

                const btnBg = scene.add.graphics();
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
                this.listContainer.add(btnBg);

                // Body: emoji + chapter name
                const btnText = scene.add.text(btnX - btnW/2 + 14, btnLocalY, `${chapter.emoji} ${chapter.name}`, {
                    fontFamily: 'Outfit, Arial', fontSize: '14px', fontStyle: 'bold', fill: unlocked ? '#FFFFFF' : '#64748B'
                }).setOrigin(0, 0.5);
                this.listContainer.add(btnText);

                // Progress right
                const rightText = scene.add.text(btnX + btnW/2 - 12, btnLocalY, `${progress.done}/${progress.total}`, {
                    fontFamily: 'Arial', fontSize: '12px', fontStyle: 'bold', fill: unlocked ? '#94A3B8' : '#475569'
                }).setOrigin(1, 0.5);
                this.listContainer.add(rightText);

                this.sidebarBtnData.push({ j: btnIndex++, chapter, unlocked, drawBtnBg, btnText, btnX, btnLocalY, btnW, btnH });

                cursorY += itemSpacing;
            }
        }

        const isSidebarHit = (p) =>
            p.x >= sidebarX - sidebarW / 2 && p.x <= sidebarX + sidebarW / 2 &&
            p.y >= sidebarY - sidebarH / 2 && p.y <= sidebarY + sidebarH / 2;

        const getSidebarBtn = (px, py) => {
            if (py < maskY || py > maskY + maskH) return null;
            for (const btn of this.sidebarBtnData) {
                const visY = btn.btnLocalY + this.scrollYOffset;
                if (px >= btn.btnX - btn.btnW / 2 && px <= btn.btnX + btn.btnW / 2 &&
                    py >= visY - btn.btnH / 2      && py <= visY + btn.btnH / 2) {
                    return btn;
                }
            }
            return null;
        };

        // Drag/wheel inputs state
        let isDraggingSidebar  = false;
        let dragSidebarStartY   = 0;
        let sidebarDragDistance = 0;
        let hoveredBtn         = null;

        // Register Input Handlers
        scene.input.on('wheel', (pointer, _objs, _deltaX, deltaY) => {
            if (isSidebarHit(pointer)) {
                updateScroll(deltaY * 0.4);
            } else {
                scene.cameras.main.scrollY += deltaY * 0.7;
            }
        });

        scene.input.on('pointerdown', (pointer) => {
            if (isSidebarHit(pointer)) {
                isDraggingSidebar   = true;
                dragSidebarStartY   = pointer.y;
                sidebarDragDistance = 0;
                const hit = getSidebarBtn(pointer.x, pointer.y);
                if (hit) hit.drawBtnBg(0x0f172a, 0x38bdf8);
            }
        });

        scene.input.on('pointermove', (pointer) => {
            if (isDraggingSidebar && pointer.isDown) {
                const dy = pointer.y - dragSidebarStartY;
                sidebarDragDistance += Math.abs(dy);
                dragSidebarStartY    = pointer.y;
                updateScroll(-dy);
            }

            const hit = isDraggingSidebar ? null : getSidebarBtn(pointer.x, pointer.y);
            if (hit !== hoveredBtn) {
                if (hoveredBtn) { 
                    hoveredBtn.drawBtnBg(hoveredBtn.unlocked ? 0x1e293b : 0x0f172a, hoveredBtn.unlocked ? 0x475569 : 0x1e293b); 
                    scene.input.setDefaultCursor('default');
                }
                hoveredBtn = hit;
                if (hit) { 
                    hit.drawBtnBg(hit.unlocked ? 0x334155 : 0x0f172a, hit.unlocked ? 0x38bdf8 : 0x1e293b); 
                    if (hit.unlocked) scene.input.setDefaultCursor('pointer');
                }
            }
        });

        scene.input.on('pointerup', (pointer) => {
            if (isDraggingSidebar && sidebarDragDistance < 8 && isSidebarHit(pointer)) {
                const hit = getSidebarBtn(pointer.x, pointer.y);
                if (hit && hit.unlocked) {
                    scene.sound.play('key_sound');
                    const firstLessonIndex = hit.chapter.range[0];
                    const columns = 4;
                    const rowHeight = 150;
                    const startY = 230;
                    const segRow     = Math.floor(firstLessonIndex / columns);
                    const targetSegY = startY + segRow * rowHeight;
                    const totalScrollHeight = startY + Math.ceil(700 / columns) * rowHeight + 80;
                    const targetSegScrollY = Phaser.Math.Clamp(targetSegY - height / 2, 0, totalScrollHeight - height);
                    scene.tweens.add({ targets: scene.cameras.main, scrollY: targetSegScrollY, duration: 500, ease: 'Cubic.easeOut' });
                }
            }
            if (hoveredBtn) hoveredBtn.drawBtnBg(hoveredBtn.unlocked ? 0x334155 : 0x0f172a, hoveredBtn.unlocked ? 0x38bdf8 : 0x1e293b);
            isDraggingSidebar = false;
        });

        scene.add.existing(this);
    }

    scrollToChapter(chapterId, duration = 500) {
        const btn = this.sidebarBtnData.find(b => b.chapter.id === chapterId);
        if (btn) {
            const targetScroll = Phaser.Math.Clamp((this.maskY + this.maskH / 2) - btn.btnLocalY, -this.maxScroll, 0);
            this.scene.tweens.add({
                targets: this.listContainer,
                y: targetScroll,
                duration: duration,
                ease: 'Cubic.easeOut',
                onUpdate: () => {
                    this.scrollYOffset = this.listContainer.y;
                }
            });
        }
    }

    scrollToChapterImmediately(chapterId) {
        const btn = this.sidebarBtnData.find(b => b.chapter.id === chapterId);
        if (btn) {
            const desiredScroll = this.maskY + this.maskH / 2 - btn.btnLocalY;
            this.scrollYOffset = Phaser.Math.Clamp(desiredScroll, -this.maxScroll, 0);
            this.listContainer.y = this.scrollYOffset;
        }
    }
}
