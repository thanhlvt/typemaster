import * as Phaser from 'phaser';
import { ProgressManager } from '../utils/ProgressManager';
import { AchievementsOverlay } from './AchievementsOverlay';
import { ACHIEVEMENTS } from '../utils/AchievementManager';
import { SkinsOverlay } from './SkinsOverlay';
import { OptionsOverlay } from './OptionsOverlay';
import { StatsOverlay } from './StatsOverlay';
import { getChapterForLesson, getChapterProgress } from '../data/chapters';

export class MapHeader extends Phaser.GameObjects.Container {
    constructor(scene) {
        const { width } = scene.scale;
        super(scene, 0, 0);
        this.scene = scene;
        this.setDepth(10);
        this.setScrollFactor(0);

        const headerHeight = 175;
        const headerBg = scene.add.graphics();
        headerBg.fillStyle(0x0f172a, 0.95);
        headerBg.fillRoundedRect(0, 0, width, headerHeight, { tl: 0, tr: 0, bl: 24, br: 24 });
        headerBg.lineStyle(3, 0xFBBF24, 1);
        headerBg.beginPath();
        headerBg.moveTo(0, headerHeight);
        headerBg.lineTo(width, headerHeight);
        headerBg.strokePath();
        this.add(headerBg);

        // --- ROW 1 ---
        const row1Y = 35;
        
        // Title
        const titleText = scene.add.text(20, row1Y - 10, '🐵 BẢN ĐỒ RỪNG', {
            fontFamily: 'Outfit, Arial', fontSize: '26px', fontStyle: 'bold',
            fill: '#FBBF24', stroke: '#000000', strokeThickness: 4
        }).setOrigin(0, 0.5);
        this.add(titleText);

        // Chapter chip
        const currentIndex = scene._computeCurrentLessonIndex();
        const currentChapter = getChapterForLesson(currentIndex);
        const chapterProgress = getChapterProgress(currentChapter, scene.lessonStars);
        
        const chapterChipStr = `${currentChapter.emoji} Chương ${currentChapter.id} · ${currentChapter.name} · ${chapterProgress.done}/${chapterProgress.total} bài`;
        const chapChipContainer = scene.add.container(20, row1Y + 18);
        const chapBg = scene.add.graphics();
        const chapTxt = scene.add.text(12, 0, chapterChipStr, {
            fontFamily: 'Arial', fontSize: '13px', fontStyle: 'bold', fill: '#FFFFFF'
        }).setOrigin(0, 0.5);
        const chapW = chapTxt.width + 24;
        const chapH = 24;
        chapBg.fillGradientStyle(0xf97316, 0xf97316, 0xa855f7, 0xa855f7, 1);
        chapBg.fillRoundedRect(0, -chapH/2, chapW, chapH, chapH/2);
        chapChipContainer.add([chapBg, chapTxt]);
        this.add(chapChipContainer);

        // Right side Row 1
        let currentRightX = width - 20;

        // Settings
        const optW = 32;
        currentRightX -= optW / 2;
        const optX = currentRightX;
        const optBg = scene.add.graphics();
        const drawOptBg = (color) => {
            optBg.clear(); optBg.fillStyle(color, 0.85);
            optBg.fillCircle(optX, row1Y, optW/2);
            optBg.lineStyle(1.5, 0xffffff, 0.2);
            optBg.strokeCircle(optX, row1Y, optW/2);
        };
        drawOptBg(0x4F46E5);
        this.add(optBg);
        
        const optIcon = scene.add.text(currentRightX, row1Y, '⚙️', { fontSize: '16px' }).setOrigin(0.5);
        this.add(optIcon);

        const optZone = scene.add.zone(currentRightX, row1Y, optW, optW).setScrollFactor(0).setInteractive({ useHandCursor: true });
        this.add(optZone);
        optZone.on('pointerover', () => drawOptBg(0x6366F1));
        optZone.on('pointerout',  () => drawOptBg(0x4F46E5));
        optZone.on('pointerdown', () => { scene.sound.play('key_sound'); new OptionsOverlay(scene); });

        currentRightX -= optW / 2 + 8;

        // Skin
        const skinW = 90;
        const skinH = 32;
        currentRightX -= skinW / 2;
        const skinX = currentRightX;
        const skinBg = scene.add.graphics();
        const drawSkinBg = (color) => {
            skinBg.clear(); skinBg.fillStyle(color, 0.85);
            skinBg.fillRoundedRect(skinX - skinW / 2, row1Y - skinH / 2, skinW, skinH, skinH / 2);
            skinBg.lineStyle(1.5, 0xffffff, 0.2);
            skinBg.strokeRoundedRect(skinX - skinW / 2, row1Y - skinH / 2, skinW, skinH, skinH / 2);
        };
        drawSkinBg(0x059669);
        this.add(skinBg);

        const skinText = scene.add.text(skinX, row1Y, '👕 Skin', {
            fontFamily: 'Arial', fontSize: '13px', fontStyle: 'bold', fill: '#FFF'
        }).setOrigin(0.5);
        this.add(skinText);

        const skinZone = scene.add.zone(skinX, row1Y, skinW, skinH).setScrollFactor(0).setInteractive({ useHandCursor: true });
        this.add(skinZone);
        skinZone.on('pointerover', () => drawSkinBg(0x10B981));
        skinZone.on('pointerout',  () => drawSkinBg(0x059669));
        skinZone.on('pointerdown', () => {
            scene.sound.play('key_sound');
            new SkinsOverlay(scene, () => {
                scene._loadProgress();
                scene._applyBackground();
            });
        });

        currentRightX -= skinW / 2 + 8;

        // Achievement
        const achW = 140;
        const achH = 32;
        currentRightX -= achW / 2;
        const achX = currentRightX;
        const achBg = scene.add.graphics();
        const drawAchBg = (color) => {
            achBg.clear(); achBg.fillStyle(color, 0.85);
            achBg.fillRoundedRect(achX - achW/2, row1Y - achH/2, achW, achH, achH/2);
            achBg.lineStyle(1.5, 0xffffff, 0.2);
            achBg.strokeRoundedRect(achX - achW/2, row1Y - achH/2, achW, achH, achH/2);
        };
        drawAchBg(0xD97706);
        this.add(achBg);

        this.achText = scene.add.text(achX, row1Y, `🏆 Huy hiệu (${scene.unlockedAchievements.length}/${ACHIEVEMENTS.length})`, {
            fontFamily: 'Arial', fontSize: '13px', fontStyle: 'bold', fill: '#FFF'
        }).setOrigin(0.5);
        this.add(this.achText);

        const achZone = scene.add.zone(achX, row1Y, achW, achH).setScrollFactor(0).setInteractive({ useHandCursor: true });
        this.add(achZone);
        achZone.on('pointerover', () => drawAchBg(0xF59E0B));
        achZone.on('pointerout',  () => drawAchBg(0xD97706));
        achZone.on('pointerdown', () => {
            scene.sound.play('key_sound');
            new AchievementsOverlay(scene, scene.unlockedAchievements, () => scene._loadProgress());
        });

        currentRightX -= achW / 2 + 8;

        // Stats
        const statsW = 120;
        const statsH = 32;
        currentRightX -= statsW / 2;
        const statsX = currentRightX;
        const statsBg = scene.add.graphics();
        const drawStatsBg = (color) => {
            statsBg.clear(); statsBg.fillStyle(color, 0.85);
            statsBg.fillRoundedRect(statsX - statsW/2, row1Y - statsH/2, statsW, statsH, statsH/2);
            statsBg.lineStyle(1.5, 0xffffff, 0.2);
            statsBg.strokeRoundedRect(statsX - statsW/2, row1Y - statsH/2, statsW, statsH, statsH/2);
        };
        drawStatsBg(0x3b82f6);
        this.add(statsBg);

        const statsText = scene.add.text(statsX, row1Y, '📊 Thống kê', {
            fontFamily: 'Arial', fontSize: '13px', fontStyle: 'bold', fill: '#FFF'
        }).setOrigin(0.5);
        this.add(statsText);

        const statsZone = scene.add.zone(statsX, row1Y, statsW, statsH).setScrollFactor(0).setInteractive({ useHandCursor: true });
        this.add(statsZone);
        statsZone.on('pointerover', () => drawStatsBg(0x60a5fa));
        statsZone.on('pointerout',  () => drawStatsBg(0x3b82f6));
        statsZone.on('pointerdown', () => {
            scene.sound.play('key_sound');
            new StatsOverlay(scene);
        });

        currentRightX -= statsW / 2 + 8;

        // Stars Chip
        const progress = ProgressManager.loadProgress(scene.gameData.lessons.length);
        const starsChip = this._createChip(0, row1Y, '⭐', `${scene.totalStarsCount}`, 0x46391E, 1, { fontFamily: 'Arial', fontSize: '14px', fontStyle: 'bold', fill: '#FEF08A' });
        currentRightX -= starsChip.width / 2;
        starsChip.container.setX(currentRightX);
        this.add(starsChip.container);
        currentRightX -= starsChip.width / 2 + 8;

        // Banana Chip
        const bananaChip = this._createChip(0, row1Y, '🍌', `${scene.totalScoreCount}`, 0x46391E, 1, { fontFamily: 'Arial', fontSize: '14px', fontStyle: 'bold', fill: '#FEF08A' });
        currentRightX -= bananaChip.width / 2;
        bananaChip.container.setX(currentRightX);
        this.add(bananaChip.container);
        currentRightX -= bananaChip.width / 2 + 8;

        // Streak Chip
        const streakDays = progress.streakDays || 0;
        let streakTextFill = '#94A3B8';
        if (streakDays > 0) {
            streakTextFill = '#FFFFFF';
        }
        
        const streakContainer = scene.add.container(0, row1Y);
        const streakBg = scene.add.graphics();
        const streakEmojiTxt = scene.add.text(-5, 0, '🔥', { fontSize: '16px' }).setOrigin(1, 0.5);
        const streakValTxt = scene.add.text(5, 0, `${streakDays} ngày`, { fontFamily: 'Arial', fontSize: '14px', fontStyle: 'bold', fill: streakTextFill }).setOrigin(0, 0.5);
        
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
        this.add(streakContainer);

        // --- ROW 2: MEGA CTAs ---
        const row2Y = 115;
        const gap16 = 16;
        const paddingHorizontal = 20;
        const megaW = (width - paddingHorizontal * 2 - gap16) / 2;
        const megaH = 76;

        // SPRINT
        const sprintX = paddingHorizontal + megaW / 2;
        const sprintContainer = scene.add.container(sprintX, row2Y);
        const sprintBgGraphics = scene.add.graphics();
        const drawSprint = (scale = 1) => {
            sprintBgGraphics.clear();
            sprintBgGraphics.fillGradientStyle(0xa36bff, 0xa36bff, 0x6a3fd6, 0x6a3fd6, 1);
            const w = megaW * scale; const h = megaH * scale;
            sprintBgGraphics.fillRoundedRect(-w/2, -h/2, w, h, 18);
            sprintBgGraphics.lineStyle(scale > 1 ? 4 : 2, 0x9b6dff, scale > 1 ? 0.4 : 0.18);
            sprintBgGraphics.strokeRoundedRect(-w/2 - 2, -h/2 - 2, w + 4, h + 4, 20);
        };
        drawSprint();
        sprintContainer.add(sprintBgGraphics);
        
        const spLeftCirc = scene.add.graphics();
        spLeftCirc.fillStyle(0xFFFFFF, 1);
        spLeftCirc.fillCircle(-megaW/2 + 36, 0, 24);
        sprintContainer.add(spLeftCirc);
        
        const spIcon = scene.add.text(-megaW/2 + 36, 0, '⚡', { fontSize: '26px' }).setOrigin(0.5);
        sprintContainer.add(spIcon);
        
        const sprintTitle = scene.add.text(-megaW/2 + 76, -10, 'Sprint 60 giây', { fontFamily: 'Outfit, Arial', fontSize: '18px', fontStyle: 'bold', fill: '#FFFFFF' }).setOrigin(0, 0.5);
        const spHighScore = progress.sprintHighScore || 0;
        const sprintSub = scene.add.text(-megaW/2 + 76, 14, `Best của bé: ${spHighScore} WPM`, { fontFamily: 'Arial', fontSize: '13px', fill: 'rgba(255,255,255,0.9)' }).setOrigin(0, 0.5);
        sprintContainer.add([sprintTitle, sprintSub]);
        
        const spRightCirc = scene.add.graphics();
        spRightCirc.fillStyle(0x000000, 0.18);
        spRightCirc.fillCircle(megaW/2 - 24, 0, 15);
        sprintContainer.add(spRightCirc);
        
        const spChevron = scene.add.text(megaW/2 - 24, 0, '→', { fontSize: '16px', fill: '#FFFFFF' }).setOrigin(0.5);
        sprintContainer.add(spChevron);

        // shimmer
        const shimmer = scene.add.graphics();
        shimmer.fillGradientStyle(0xffffff, 0xffffff, 0xffffff, 0xffffff, 0, 0.2, 0.2, 0);
        shimmer.fillRect(-megaW * 0.3, -megaH/2, megaW * 0.6, megaH);
        
        const shimmerMaskBg = scene.add.graphics().setVisible(false);
        shimmerMaskBg.fillRoundedRect(-megaW/2 + sprintX, -megaH/2 + row2Y, megaW, megaH, 18);
        this.add(shimmerMaskBg);
        shimmer.setMask(shimmerMaskBg.createGeometryMask());
        
        scene.tweens.add({
            targets: shimmer,
            x: megaW * 1.5,
            duration: 2500,
            repeat: -1,
            onRepeat: () => { shimmer.x = -megaW; }
        });
        shimmer.x = -megaW;
        sprintContainer.add(shimmer);
        this.add(sprintContainer);

        const sprintZone = scene.add.zone(sprintX, row2Y, megaW, megaH).setScrollFactor(0).setInteractive({ useHandCursor: true });
        this.add(sprintZone);
        sprintZone.on('pointerover', () => { drawSprint(1.02); sprintContainer.setScale(1.02); });
        sprintZone.on('pointerout', () => { drawSprint(1); sprintContainer.setScale(1); });
        sprintZone.on('pointerdown', () => { sprintContainer.setScale(0.98); });
        sprintZone.on('pointerup', () => { sprintContainer.setScale(1); scene.sound.play('key_sound'); scene.scene.start('SprintScene'); });


        // CHALLENGE
        const chalX = paddingHorizontal + megaW + gap16 + megaW / 2;
        const chalContainer = scene.add.container(chalX, row2Y);
        const chalBgGraphics = scene.add.graphics();
        
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
        chalContainer.add(chalBgGraphics);
        
        const chalEmoji = scene.add.text(-megaW/2 + 36, 0, '🎁', { fontSize: '38px', alpha: isDailyCompleted ? 0.5 : 1 }).setOrigin(0.5);
        if (!isDailyCompleted) {
            scene.tweens.add({ targets: chalEmoji, angle: 5, duration: 600, yoyo: true, repeat: -1, ease: 'Sine.easeInOut' });
            scene.tweens.add({ targets: chalEmoji, angle: -5, duration: 600, yoyo: true, repeat: -1, ease: 'Sine.easeInOut', delay: 600 });
        }
        chalContainer.add(chalEmoji);
        
        const chalTitle = scene.add.text(-megaW/2 + 76, -10, 'Thử thách hôm nay', { fontFamily: 'Outfit, Arial', fontSize: '18px', fontStyle: 'bold', fill: '#FFFFFF', alpha: isDailyCompleted ? 0.7 : 1 }).setOrigin(0, 0.5);
        const chalSub = scene.add.text(-megaW/2 + 76, 14, '', { fontFamily: 'Arial', fontSize: '13px', fill: 'rgba(255,255,255,0.9)' }).setOrigin(0, 0.5);
        chalContainer.add([chalTitle, chalSub]);
        
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
        scene.time.addEvent({ delay: 1000, loop: true, callback: updateCountdown });
        
        let pulseDot = null;
        if (!isDailyCompleted) {
            pulseDot = scene.add.graphics();
            pulseDot.fillStyle(0xFFD700, 1);
            pulseDot.fillCircle(megaW/2 - 20, -15, 6);
            
            const pulseGlow = scene.add.graphics();
            pulseGlow.fillStyle(0xFFD700, 0.5);
            pulseGlow.fillCircle(megaW/2 - 20, -15, 6);
            scene.tweens.add({ targets: pulseGlow, scaleX: 2.5, scaleY: 2.5, alpha: 0, duration: 1500, repeat: -1 });
            chalContainer.add(pulseGlow);
        }
        if (pulseDot) chalContainer.add(pulseDot);
        this.add(chalContainer);

        const chalZone = scene.add.zone(chalX, row2Y, megaW, megaH).setScrollFactor(0).setInteractive({ useHandCursor: true });
        this.add(chalZone);
        chalZone.on('pointerover', () => { if(!isDailyCompleted) { drawChal(1.02); chalContainer.setScale(1.02); } });
        chalZone.on('pointerout', () => { drawChal(1); chalContainer.setScale(1); });
        chalZone.on('pointerdown', () => { if(!isDailyCompleted) chalContainer.setScale(0.98); });
        chalZone.on('pointerup', () => { 
            chalContainer.setScale(1); 
            if (!isDailyCompleted) {
                scene.sound.play('key_sound'); 
                scene.scene.start('PlayScene', { isDailyChallenge: true }); 
            } else {
                scene.cameras.main.shake(100, 0.005);
            }
        });

        scene.add.existing(this);
    }

    updateAchievements(count) {
        if (this.achText) {
            this.achText.setText(`🏆 Huy hiệu (${count}/${ACHIEVEMENTS.length})`);
        }
    }

    _createChip(x, y, emoji, text, bgColor, bgAlpha, textStyle) {
        const container = this.scene.add.container(x, y);
        const bg = this.scene.add.graphics();
        
        const emojiTxt = this.scene.add.text(-5, 0, emoji, { fontSize: '16px' }).setOrigin(1, 0.5);
        const valTxt = this.scene.add.text(5, 0, text, textStyle).setOrigin(0, 0.5);
        
        const width = emojiTxt.width + valTxt.width + 30;
        const height = 32;
        
        bg.fillStyle(bgColor, bgAlpha);
        bg.fillRoundedRect(-width/2, -height/2, width, height, height/2);
        
        const totalW = emojiTxt.width + valTxt.width + 5;
        emojiTxt.setX(-totalW/2 + emojiTxt.width);
        valTxt.setX(-totalW/2 + emojiTxt.width + 5);

        container.add(bg);
        container.add(emojiTxt);
        container.add(valTxt);
        
        return { container, width };
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
}
