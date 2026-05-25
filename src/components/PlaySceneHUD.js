/**
 * PlaySceneHUD
 * Manages all fixed overlay UI in PlayScene:
 *   - Progress bar + lesson/score text
 *   - Streak display + animation
 *   - Reset button
 *   - Map button
 */
import { getChapterForLesson } from '../data/chapters';

export class PlaySceneHUD {
    constructor(scene) {
        this.scene = scene;
        this._create();
    }

    _create() {
        const scene = this.scene;
        const { width } = scene.scale;

        // ── Progress text (top-left) ──────────────────────────────
        this.progressText = scene.add.text(20, 20, '', {
            fontFamily: 'Arial',
            fontSize: '24px',
            fontStyle: 'bold',
            fill: '#FFF',
            stroke: '#000',
            strokeThickness: 4
        });

        this.progressBarBg   = scene.add.graphics();
        this.progressBarFill = scene.add.graphics();

        this.scoreText = scene.add.text(20, 72, '', {
            fontFamily: 'Arial',
            fontSize: '20px',
            fontStyle: 'bold',
            fill: '#FBBF24',
            stroke: '#000',
            strokeThickness: 3
        });

        // ── Streak text (top-center) ──────────────────────────────
        this.streakText = scene.add.text(width / 2, 40, '', {
            fontFamily: 'Arial',
            fontSize: '32px',
            fontStyle: 'bold',
            fill: '#FF9800',
            stroke: '#000',
            strokeThickness: 4
        }).setOrigin(0.5);

        // ── Buttons ───────────────────────────────────────────────
        this._createMapButton(width);
    }

    // ── Public API ────────────────────────────────────────────────

    /** Set initial streak display (called once in create) */
    initStreak(streakDays) {
        this.streakText.setText('🔥 ' + streakDays + ' ngày');
        this.streakText.setVisible(streakDays > 0);
    }

    /** Refresh progress bar, lesson label, and score */
    updateProgress(lessonIndex, totalLessons, score, wordIndex = null, totalWords = null) {
        const isDaily = lessonIndex === -1;
        if (isDaily) {
            this.progressText.setText(`Thử thách ngày`);
        } else {
            const chapter = getChapterForLesson(lessonIndex);
            const chapterStart = chapter.range[0];
            const chapterEnd = chapter.range[1];
            const chapterTotal = chapterEnd - chapterStart + 1;
            const currentInChapter = lessonIndex - chapterStart + 1;
            this.progressText.setText(`Chương ${chapter.id} · Bài ${currentInChapter}/${chapterTotal}`);
        }
        this.scoreText.setText(`🍌 Chuối: ${score}`);

        const barWidth = 200, barHeight = 10, x = 20, y = 52;

        this.progressBarBg.clear();
        this.progressBarBg.fillStyle(0x334155, 0.8);
        this.progressBarBg.fillRoundedRect(x, y, barWidth, barHeight, 5);
        this.progressBarBg.lineStyle(1.5, 0x475569, 1);
        this.progressBarBg.strokeRoundedRect(x, y, barWidth, barHeight, 5);

        let fillPercent = 0;
        if (isDaily && totalWords) {
            fillPercent = wordIndex / totalWords;
        } else {
            const chapter = getChapterForLesson(lessonIndex);
            const chapterStart = chapter.range[0];
            const chapterEnd = chapter.range[1];
            const chapterTotal = chapterEnd - chapterStart + 1;
            const currentInChapter = lessonIndex - chapterStart + 1;
            fillPercent = currentInChapter / chapterTotal;
        }
        const fillWidth = barWidth * fillPercent;
        this.progressBarFill.clear();
        this.progressBarFill.fillStyle(0x10B981, 1);
        this.progressBarFill.fillRoundedRect(x, y, fillWidth, barHeight, 5);
    }

    /** Animate and reveal a new streak milestone */
    showStreak(streakDays) {
        const scene = this.scene;
        this.streakText.setText('🔥 ' + streakDays + ' ngày');
        this.streakText.setVisible(true);

        scene.tweens.add({
            targets: this.streakText,
            scaleX: 1.5, scaleY: 1.5, angle: 15,
            duration: 300, yoyo: true, ease: 'Back.easeOut'
        });

        // Celebration banana particles
        for (let i = 0; i < 8; i++) {
            const p = scene.add.image(this.streakText.x, this.streakText.y, 'banana').setScale(0.15);
            const angle = (i / 8) * Math.PI * 2;
            scene.tweens.add({
                targets: p,
                x: p.x + Math.cos(angle) * 80,
                y: p.y + Math.sin(angle) * 80,
                alpha: 0, angle: 360, duration: 800,
                ease: 'Cubic.easeOut',
                onComplete: () => p.destroy()
            });
        }
    }

    /** Hide streak after reset */
    hideStreak() {
        this.streakText.setText('🔥 0 ngày');
        this.streakText.setVisible(false);
    }

    // ── Private helpers ───────────────────────────────────────────

    _createMapButton(width) {
        const scene = this.scene;
        const btnW = 94, btnH = 36;
        const x = width - btnW / 2 - 12;
        const y = 24;

        const bg = scene.add.graphics();
        const drawBg = (color) => {
            bg.clear();
            bg.fillStyle(color, 0.85);
            bg.fillRoundedRect(x - btnW / 2, y - btnH / 2, btnW, btnH, 18);
            bg.lineStyle(1.5, 0xffffff, 0.2);
            bg.strokeRoundedRect(x - btnW / 2, y - btnH / 2, btnW, btnH, 18);
        };
        drawBg(0x1565C0);

        scene.add.text(x, y, '🗺️  Bản đồ', {
            fontFamily: 'Arial', fontSize: '15px', fontStyle: 'bold', fill: '#FFF'
        }).setOrigin(0.5);

        const zone = scene.add.zone(x, y, btnW, btnH).setInteractive({ useHandCursor: true });
        zone.on('pointerover', () => drawBg(0x1E88E5));
        zone.on('pointerout',  () => drawBg(0x1565C0));
        zone.on('pointerdown', () => {
            scene.sound.play('key_sound');
            scene.scene.start('MapScene');
        });
    }
}
