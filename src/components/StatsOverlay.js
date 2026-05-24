import * as Phaser from 'phaser';
import { ProgressManager } from '../utils/ProgressManager';

export class StatsOverlay extends Phaser.GameObjects.Container {
    constructor(scene, onClose) {
        const { width, height } = scene.scale;
        super(scene, 0, 0);
        this.scene = scene;
        this.setDepth(20); // Render above header (depth 10-11) and map nodes

        // Solid dark background overlay to block inputs and hide the map background
        const overlay = scene.add.rectangle(0, 0, width, height, 0x0a0f1d, 0.95)
            .setOrigin(0).setInteractive().setScrollFactor(0);
        this.add(overlay);

        // Dialog center container
        const dialog = scene.add.container(width / 2, height / 2).setScrollFactor(0);
        this.add(dialog);

        // Dialog Background
        const dialogW = 960;
        const dialogH = 640;
        const bg = scene.add.graphics();
        bg.fillStyle(0x0f172a, 1.0); // Fully solid Deep Slate 900
        bg.fillRoundedRect(-dialogW / 2, -dialogH / 2, dialogW, dialogH, 24);
        bg.lineStyle(3, 0x38bdf8, 1); // Sky blue border
        bg.strokeRoundedRect(-dialogW / 2, -dialogH / 2, dialogW, dialogH, 24);
        dialog.add(bg);

        // Header Title
        const title = scene.add.text(0, -dialogH / 2 + 45, '📊 BẢNG ĐIỂM CÁ NHÂN', {
            fontFamily: 'Outfit, Arial',
            fontSize: '32px',
            fontStyle: 'bold',
            fill: '#38BDF8',
            stroke: '#000000',
            strokeThickness: 4
        }).setOrigin(0.5);
        dialog.add(title);

        // Fetch data
        const totalLessons = scene.gameData.lessons.length;
        const progress = ProgressManager.loadProgress(totalLessons);
        const history = ProgressManager.loadHistory();

        // 1. Lessons completed (where stars > 0)
        let completedCount = 0;
        let totalStars = 0;
        if (progress.lessonStats) {
            for (const key in progress.lessonStats) {
                const stars = progress.lessonStats[key].stars || 0;
                if (stars > 0) {
                    completedCount++;
                    totalStars += stars;
                }
            }
        }

        // 2. Average WPM & Accuracy from history (fallback to lessonStats if history is empty)
        let avgWpm = 0;
        let avgAccuracy = 0;

        if (history.length > 0) {
            let wpmSum = 0;
            let accSum = 0;
            history.forEach(h => {
                wpmSum += h.wpm;
                accSum += h.accuracy;
            });
            avgWpm = Math.round(wpmSum / history.length);
            avgAccuracy = Math.round(accSum / history.length);
        } else {
            // Fallback to personal best stats
            let wpmSum = 0;
            let accSum = 0;
            let count = 0;
            if (progress.lessonStats) {
                for (const key in progress.lessonStats) {
                    const stat = progress.lessonStats[key];
                    if (stat.stars > 0) {
                        wpmSum += stat.wpm || 0;
                        accSum += stat.accuracy || 0;
                        count++;
                    }
                }
            }
            if (count > 0) {
                avgWpm = Math.round(wpmSum / count);
                avgAccuracy = Math.round(accSum / count);
            }
        }

        // --- Render 4 Summary Cards ---
        const cardW = 210;
        const cardH = 90;
        const cardGap = 20;
        const totalCardsW = 4 * cardW + 3 * cardGap;
        const startCardX = -totalCardsW / 2 + cardW / 2;
        const cardY = -dialogH / 2 + 150;

        const cardData = [
            { title: 'BÀI ĐÃ HOÀN THÀNH', value: `${completedCount} / ${totalLessons}`, icon: '📘', subtext: 'Có ít nhất 1 ⭐', color: 0x3b82f6 },
            { title: 'TỔNG SỐ SAO', value: `${totalStars} ⭐`, icon: '⭐', subtext: 'Tích lũy từ bài học', color: 0xfbbf24 },
            { title: 'WPM TRUNG BÌNH', value: `${avgWpm} WPM`, icon: '⚡', subtext: 'Tốc độ gõ trung bình', color: 0x10b981 },
            { title: 'ĐỘ CHÍNH XÁC TB', value: `${avgAccuracy}%`, icon: '🎯', subtext: 'Tỉ lệ gõ chính xác', color: 0xec4899 }
        ];

        cardData.forEach((data, index) => {
            const cx = startCardX + index * (cardW + cardGap);
            const cardContainer = scene.add.container(cx, cardY);
            dialog.add(cardContainer);

            // Card Bg
            const cardBg = scene.add.graphics();
            cardBg.fillStyle(0x1e293b, 1.0); // slate 800
            cardBg.fillRoundedRect(-cardW / 2, -cardH / 2, cardW, cardH, 16);
            cardBg.lineStyle(1.5, data.color, 0.6); // Colored border glow
            cardBg.strokeRoundedRect(-cardW / 2, -cardH / 2, cardW, cardH, 16);
            cardContainer.add(cardBg);

            // Icon + Value
            const iconText = scene.add.text(-cardW / 2 + 15, -15, data.icon, { fontSize: '24px' }).setOrigin(0, 0.5);
            const valueText = scene.add.text(cardW / 2 - 15, -15, data.value, {
                fontFamily: 'Outfit, Arial', fontSize: '22px', fontStyle: 'bold', fill: '#FFFFFF'
            }).setOrigin(1, 0.5);
            cardContainer.add(iconText);
            cardContainer.add(valueText);

            // Title
            const titleText = scene.add.text(-cardW / 2 + 15, 12, data.title, {
                fontFamily: 'Arial', fontSize: '11px', fontStyle: 'bold', fill: '#94A3B8'
            }).setOrigin(0, 0.5);
            cardContainer.add(titleText);

            // Subtext
            const subtextVal = scene.add.text(-cardW / 2 + 15, 28, data.subtext, {
                fontFamily: 'Arial', fontSize: '10px', fill: '#64748B'
            }).setOrigin(0, 0.5);
            cardContainer.add(subtextVal);
        });

        // --- Close Button ---
        const closeBtnX = dialogW / 2 - 40;
        const closeBtnY = -dialogH / 2 + 40;
        const screenCloseX = width / 2 + closeBtnX;
        const screenCloseY = height / 2 + closeBtnY;

        const closeBtnBg = scene.add.graphics();
        const drawCloseBg = (color) => {
            closeBtnBg.clear();
            closeBtnBg.fillStyle(color, 0.85);
            closeBtnBg.fillCircle(closeBtnX, closeBtnY, 20);
        };
        drawCloseBg(0x334155);
        dialog.add(closeBtnBg);

        const closeText = scene.add.text(closeBtnX, closeBtnY, '✕', {
            fontFamily: 'Arial', fontSize: '20px', fontStyle: 'bold', fill: '#FFF'
        }).setOrigin(0.5);
        dialog.add(closeText);

        const closeZone = scene.add.zone(screenCloseX, screenCloseY, 40, 40)
            .setScrollFactor(0)
            .setDepth(21)
            .setInteractive({ useHandCursor: true });
        this.add(closeZone);

        closeZone.on('pointerover', () => drawCloseBg(0x475569));
        closeZone.on('pointerout', () => drawCloseBg(0x334155));
        closeZone.on('pointerdown', () => {
            scene.sound.play('key_sound');
            this.destroy();
            if (onClose) onClose();
        });

        // --- Chart Section ---
        const chartTitleY = -35;
        const chartTitle = scene.add.text(0, chartTitleY, '📈 BIỂU ĐỒ TIẾN TRÌNH WPM (20 LẦN GẦN NHẤT)', {
            fontFamily: 'Outfit, Arial',
            fontSize: '18px',
            fontStyle: 'bold',
            fill: '#FBBF24'
        }).setOrigin(0.5);
        dialog.add(chartTitle);

        const chartW = 820;
        const chartH = 260;
        const chartY = 150; // Y center of the chart area relative to dialog center

        // Chart background box
        const chartBg = scene.add.graphics();
        chartBg.fillStyle(0x090d16, 0.9); // darker slate background
        chartBg.fillRoundedRect(-chartW / 2, chartY - chartH / 2, chartW, chartH, 16);
        chartBg.lineStyle(1.5, 0x1e293b, 1);
        chartBg.strokeRoundedRect(-chartW / 2, chartY - chartH / 2, chartW, chartH, 16);
        dialog.add(chartBg);

        const chartData = history.slice(-20);

        if (chartData.length === 0) {
            // Draw empty state message
            const emptyText = scene.add.text(0, chartY, 'Chưa có dữ liệu lịch sử bài học.\nHãy hoàn thành một số bài học để xem biểu đồ thống kê!', {
                fontFamily: 'Arial',
                fontSize: '16px',
                align: 'center',
                fill: '#64748B',
                lineSpacing: 8
            }).setOrigin(0.5);
            dialog.add(emptyText);
        } else {
            // Setup Axis metrics
            const maxWpm = Math.max(...chartData.map(d => d.wpm), 0);
            const yMax = Math.max(60, Math.ceil((maxWpm + 1) / 20) * 20); // round up to next multiple of 20, min 60

            const plotLeft = -chartW / 2 + 65;
            const plotRight = chartW / 2 - 35;
            const plotTop = chartY - chartH / 2 + 30;
            const plotBottom = chartY + chartH / 2 - 40;
            const plotW = plotRight - plotLeft;
            const plotH = plotBottom - plotTop;

            const axisGraphics = scene.add.graphics();
            dialog.add(axisGraphics);

            // Draw Y Grid lines & Labels
            const gridCount = yMax / 20;
            for (let v = 0; v <= yMax; v += 20) {
                const py = plotBottom - (v / yMax) * plotH;
                
                // Grid line
                axisGraphics.lineStyle(1, 0x1e293b, v === 0 ? 1 : 0.4);
                axisGraphics.beginPath();
                axisGraphics.moveTo(plotLeft, py);
                axisGraphics.lineTo(plotRight, py);
                axisGraphics.strokePath();

                // Y label
                const label = scene.add.text(plotLeft - 15, py, `${v}`, {
                    fontFamily: 'Arial', fontSize: '11px', fill: '#64748B'
                }).setOrigin(1, 0.5);
                dialog.add(label);
            }

            // Draw bars
            const barGraphics = scene.add.graphics();
            dialog.add(barGraphics);

            const N = chartData.length;
            const barW = Math.min(26, (plotW - (N + 1) * 8) / N); // dynamic bar width based on count
            const totalBarsW = N * barW + (N - 1) * (plotW - N * barW) / (N - 1 || 1);
            const gap = N > 1 ? (plotW - N * barW) / (N - 1) : 0;
            const startBarX = plotLeft;

            const bars = [];

            chartData.forEach((entry, i) => {
                const barX = startBarX + i * (barW + gap) + barW / 2;
                const barValH = (entry.wpm / yMax) * plotH;
                const barY = plotBottom - barValH;

                let barColor = 0x64748B; // slate-500 (1 star / fail)
                if (entry.stars === 3) {
                    barColor = 0xFBBF24; // Amber 400 (3 stars)
                } else if (entry.stars === 2) {
                    barColor = 0x3B82F6; // Blue 500 (2 stars)
                }

                // Draw Bar
                barGraphics.fillStyle(barColor, 0.85);
                if (barValH > 4) {
                    // rounded rect top, square bottom
                    barGraphics.fillRoundedRect(barX - barW / 2, barY, barW, barValH, { tl: 6, tr: 6, bl: 0, br: 0 });
                } else {
                    // flat rect if too small
                    barGraphics.fillRect(barX - barW / 2, barY, barW, Math.max(1, barValH));
                }

                // Draw small lesson index label on X axis
                const xLabel = scene.add.text(barX, plotBottom + 15, `B.${entry.lessonIndex + 1}`, {
                    fontFamily: 'Arial', fontSize: '9px', fontStyle: 'bold', fill: '#64748B'
                }).setOrigin(0.5);
                dialog.add(xLabel);

                // Store for hover detection
                bars.push({
                    x: barX,
                    y: barY,
                    w: barW,
                    h: barValH,
                    entry: entry,
                    color: barColor
                });
            });

            // Hover Graphics & Tooltip Overlay
            const hoverGraphics = scene.add.graphics();
            dialog.add(hoverGraphics);

            // Tooltip UI Container
            const tooltipW = 190;
            const tooltipH = 95;
            const tooltipContainer = scene.add.container(0, 0).setVisible(false).setDepth(30);
            dialog.add(tooltipContainer);

            const tooltipBg = scene.add.graphics();
            tooltipContainer.add(tooltipBg);

            const tooltipTitle = scene.add.text(0, -tooltipH / 2 + 16, '', {
                fontFamily: 'Outfit, Arial', fontSize: '13px', fontStyle: 'bold', fill: '#FFFFFF'
            }).setOrigin(0.5);
            tooltipContainer.add(tooltipTitle);

            const tooltipWpm = scene.add.text(0, -tooltipH / 2 + 40, '', {
                fontFamily: 'Arial', fontSize: '12px', fill: '#E2E8F0'
            }).setOrigin(0.5);
            tooltipContainer.add(tooltipWpm);

            const tooltipStarsText = scene.add.text(0, -tooltipH / 2 + 62, '', {
                fontFamily: 'Arial', fontSize: '14px', fill: '#FBBF24'
            }).setOrigin(0.5);
            tooltipContainer.add(tooltipStarsText);

            const tooltipTime = scene.add.text(0, -tooltipH / 2 + 80, '', {
                fontFamily: 'Arial', fontSize: '9px', fill: '#64748B'
            }).setOrigin(0.5);
            tooltipContainer.add(tooltipTime);

            const redrawTooltipBg = (strokeColor) => {
                tooltipBg.clear();
                tooltipBg.fillStyle(0x020617, 0.95); // Deepest dark slate
                tooltipBg.fillRoundedRect(-tooltipW / 2, -tooltipH / 2, tooltipW, tooltipH, 12);
                tooltipBg.lineStyle(2, strokeColor, 1);
                tooltipBg.strokeRoundedRect(-tooltipW / 2, -tooltipH / 2, tooltipW, tooltipH, 12);
            };

            // Master chart zone for interactive hover
            const chartZone = scene.add.zone(0, chartY, chartW, chartH)
                .setInteractive({ useHandCursor: true });
            dialog.add(chartZone);

            let lastHoveredIdx = -1;

            chartZone.on('pointermove', (pointer) => {
                // Convert screen mouse coordinates to local dialog container space
                const localX = pointer.x - width / 2;
                const localY = pointer.y - height / 2;

                let hoveredBarIdx = -1;
                for (let idx = 0; idx < bars.length; idx++) {
                    const bar = bars[idx];
                    // Check if pointer is within horizontal boundary of this bar (with padding)
                    const touchMarginX = Math.max(bar.w / 2 + 4, gap / 2);
                    if (Math.abs(localX - bar.x) <= touchMarginX) {
                        // Only trigger if vertical is within bounds or slightly above
                        if (localY >= plotTop - 20 && localY <= plotBottom + 20) {
                            hoveredBarIdx = idx;
                            break;
                        }
                    }
                }

                if (hoveredBarIdx !== lastHoveredIdx) {
                    lastHoveredIdx = hoveredBarIdx;
                    hoverGraphics.clear();

                    if (hoveredBarIdx !== -1) {
                        const bar = bars[hoveredBarIdx];
                        
                        // Draw outline highlight around bar
                        hoverGraphics.lineStyle(2.5, 0xffffff, 0.9);
                        hoverGraphics.strokeRect(bar.x - bar.w / 2 - 1.5, bar.y - 1.5, bar.w + 3, bar.h + 1.5);
                        
                        // Highlight vertical dash line
                        hoverGraphics.lineStyle(1, 0xffffff, 0.2);
                        hoverGraphics.beginPath();
                        hoverGraphics.moveTo(bar.x, plotTop);
                        hoverGraphics.lineTo(bar.x, plotBottom);
                        hoverGraphics.strokePath();

                        // Update Tooltip Contents
                        const entry = bar.entry;
                        const lesson = scene.gameData.lessons[entry.lessonIndex];
                        const lessonTitle = lesson ? lesson.title : 'Bài học';

                        tooltipTitle.setText(`Bài ${entry.lessonIndex + 1}: ${lessonTitle}`);
                        // Truncate lesson title in tooltip if too long
                        if (tooltipTitle.width > tooltipW - 20) {
                            const shortTitle = lessonTitle.substring(0, 14) + '...';
                            tooltipTitle.setText(`Bài ${entry.lessonIndex + 1}: ${shortTitle}`);
                        }

                        tooltipWpm.setText(`⚡ ${entry.wpm} WPM  |  🎯 ${entry.accuracy}%`);
                        tooltipStarsText.setText('⭐'.repeat(entry.stars) || 'Không có sao');
                        
                        // Format date nicely
                        const date = new Date(entry.timestamp);
                        const dateString = `${date.getDate()}/${date.getMonth() + 1} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
                        tooltipTime.setText(dateString);

                        redrawTooltipBg(bar.color);

                        // Position Tooltip above the bar (capped horizontally)
                        tooltipContainer.setVisible(true);
                        tooltipContainer.x = Phaser.Math.Clamp(bar.x, -chartW / 2 + tooltipW / 2 + 10, chartW / 2 - tooltipW / 2 - 10);
                        tooltipContainer.y = Phaser.Math.Clamp(bar.y - tooltipH / 2 - 10, plotTop - tooltipH / 2 + 15, plotBottom - tooltipH / 2);
                    } else {
                        tooltipContainer.setVisible(false);
                    }
                }
            });

            chartZone.on('pointerout', () => {
                lastHoveredIdx = -1;
                hoverGraphics.clear();
                tooltipContainer.setVisible(false);
            });
        }

        // Dialog slide-in zoom effect
        dialog.setScale(0.85);
        dialog.setAlpha(0);
        scene.tweens.add({
            targets: dialog,
            scaleX: 1,
            scaleY: 1,
            alpha: 1,
            duration: 300,
            ease: 'Back.easeOut'
        });

        scene.add.existing(this);
    }
}
