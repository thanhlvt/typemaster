/**
 * Creates the rich tooltip card for lesson nodes.
 * Returns { container, title, stars, wpm, acc, date } so MapScene can
 * update individual text objects in showTooltip().
 *
 * @param {Phaser.Scene} scene
 */
export function createTooltip(scene) {
    const container = scene.add.container(0, 0).setDepth(100).setVisible(false);

    const cardW = 220, cardH = 115;
    const bg = scene.add.graphics();
    bg.fillStyle(0x0f172a, 0.95);
    bg.fillRoundedRect(-cardW / 2, -147, cardW, cardH, 12);
    bg.lineStyle(1.5, 0xFBBF24, 1);
    bg.strokeRoundedRect(-cardW / 2, -147, cardW, cardH, 12);

    // Pointer triangle
    bg.fillStyle(0x0f172a, 0.95);
    bg.lineStyle(1.5, 0xFBBF24, 1);
    bg.beginPath();
    bg.moveTo(-8, -32); bg.lineTo(8, -32); bg.lineTo(0, -20);
    bg.closePath(); bg.fillPath(); bg.strokePath();

    // Divider
    bg.lineStyle(1, 0x334155, 0.6);
    bg.lineBetween(-100, -118, 100, -118);
    container.add(bg);

    const title = scene.add.text(-100, -132, '', {
        fontFamily: 'Outfit, Arial', fontSize: '13px', fontStyle: 'bold', fill: '#38bdf8'
    }).setOrigin(0, 0.5);

    const stars = scene.add.text(100, -132, '', {
        fontFamily: 'Arial', fontSize: '12px', fill: '#FFD700'
    }).setOrigin(1, 0.5);

    const wpm = scene.add.text(-100, -95, '', {
        fontFamily: 'Arial', fontSize: '12px', fontStyle: 'bold', fill: '#a7f3d0'
    }).setOrigin(0, 0.5);

    const acc = scene.add.text(100, -95, '', {
        fontFamily: 'Arial', fontSize: '12px', fontStyle: 'bold', fill: '#a7f3d0'
    }).setOrigin(1, 0.5);

    const date = scene.add.text(0, -62, '', {
        fontFamily: 'Arial', fontSize: '11px', fill: '#94a3b8'
    }).setOrigin(0.5, 0.5);

    container.add([title, stars, wpm, acc, date]);
    return { container, title, stars, wpm, acc, date };
}
