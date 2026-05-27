import * as Phaser from 'phaser';
import { CHAPTERS, CHAPTER_GROUPS } from '../data/chapters';
import { getFogAlpha, getDecorations } from './PathLayout';

function _drawSegment(graphics, p1, p2, lineWidth, color, alpha) {
    graphics.lineStyle(lineWidth, color, alpha);
    if (p1.y === p2.y) {
        graphics.beginPath();
        graphics.moveTo(p1.x, p1.y);
        graphics.lineTo(p2.x, p2.y);
        graphics.strokePath();
    } else if (p1.x === p2.x) {
        const bendX = p1.x > 400 ? p1.x + 50 : p1.x - 50;
        const curve = new Phaser.Curves.QuadraticBezier(
            new Phaser.Geom.Point(p1.x, p1.y),
            new Phaser.Geom.Point(bendX, p1.y + (p2.y - p1.y) / 2),
            new Phaser.Geom.Point(p2.x, p2.y)
        );
        curve.draw(graphics, 32);
    } else {
        const midY = p1.y + (p2.y - p1.y) / 2;
        const curve = new Phaser.Curves.CubicBezier(
            new Phaser.Geom.Point(p1.x, p1.y),
            new Phaser.Geom.Point(p1.x, midY),
            new Phaser.Geom.Point(p2.x, midY),
            new Phaser.Geom.Point(p2.x, p2.y)
        );
        curve.draw(graphics, 32);
    }
}

/**
 * Draws all road outline + fill segments between node positions.
 */
export function drawRoads(scene, positions, currentLessonIndex) {
    const g = scene.add.graphics();
    // Outlines first
    for (let i = 0; i < positions.length - 1; i++) {
        const p1 = positions[i], p2 = positions[i + 1];
        const avgFog = (getFogAlpha(p1.lessonIndex, currentLessonIndex) + getFogAlpha(p2.lessonIndex, currentLessonIndex)) / 2;
        if (avgFog > 0) _drawSegment(g, p1, p2, 22, 0x090d16, 0.5 * avgFog);
    }
    // Fills second
    for (let i = 0; i < positions.length - 1; i++) {
        const p1 = positions[i], p2 = positions[i + 1];
        const avgFog = (getFogAlpha(p1.lessonIndex, currentLessonIndex) + getFogAlpha(p2.lessonIndex, currentLessonIndex)) / 2;
        if (avgFog <= 0) continue;
        const isUnlocked = positions[i + 1].lessonIndex <= currentLessonIndex;
        const color = isUnlocked ? 0x10b981 : 0x334155;
        const alpha = (isUnlocked ? 0.6 : 0.25) * avgFog;
        _drawSegment(g, p1, p2, 14, color, alpha);
    }
}

/**
 * Draws group banners and chapter sub-headers above each chapter's first node.
 */
export function drawChapterHeaders(scene, positions, currentLessonIndex) {
    const gridCenterX = 395;
    const groupGraphics = scene.add.graphics();

    CHAPTERS.forEach((chapter) => {
        const firstNode = positions.find(p => p.lessonIndex === chapter.range[0]);
        if (!firstNode) return;
        const fogAlpha = getFogAlpha(chapter.range[0], currentLessonIndex);
        if (fogAlpha <= 0) return;

        // Group header (only for first chapter of each group)
        const group = CHAPTER_GROUPS.find(g => g.chapterIds[0] === chapter.id);
        if (group) {
            const label = scene.add.text(gridCenterX, firstNode.y - 105, `${group.emoji}  ${group.name.toUpperCase()}`, {
                fontFamily: 'Outfit, Arial', fontSize: '26px', fontStyle: 'bold', fill: '#f8fafc'
            }).setOrigin(0.5).setAlpha(fogAlpha);
            label.setStroke('#0f172a', 5);
            label.setShadow(0, 2, 'rgba(0,0,0,0.6)', 4, true, true);
            const hw = label.width / 2 + 20;
            groupGraphics.lineStyle(2, 0x334155, 0.7 * fogAlpha);
            groupGraphics.lineBetween(40, firstNode.y - 105, gridCenterX - hw, firstNode.y - 105);
            groupGraphics.lineBetween(gridCenterX + hw, firstNode.y - 105, 750, firstNode.y - 105);
        }

        // Chapter sub-header
        const ch = scene.add.text(72, firstNode.y - 74, `${chapter.emoji} ${chapter.name.toUpperCase()}`, {
            fontFamily: 'Outfit, Arial', fontSize: '18px', fontStyle: 'bold', fill: '#38bdf8'
        }).setOrigin(0, 0.5).setAlpha(fogAlpha);
        ch.setStroke('#0f172a', 3);
        ch.setShadow(0, 1, 'rgba(0,0,0,0.5)', 3, true, true);
    });
}

/**
 * Draws emoji decorations scattered around the map.
 */
export function drawDecorations(scene, positions, currentLessonIndex) {
    getDecorations(positions, CHAPTERS).forEach((dec) => {
        const fogAlpha = getFogAlpha(dec.lessonIndex, currentLessonIndex);
        if (fogAlpha <= 0) return;
        scene.add.text(dec.x, dec.y, dec.emoji, {
            fontFamily: 'Segoe UI Emoji, Arial', fontSize: '26px'
        }).setOrigin(0.5).setScale(dec.scale).setAlpha(0.65 * fogAlpha);
    });
}
