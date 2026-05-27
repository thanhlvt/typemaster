/**
 * Creates the floating "📍 Bài hiện tại" action button pinned above the sidebar.
 *
 * @param {Phaser.Scene} scene
 * @param {number} fabX    center-x of the FAB
 * @param {number} fabY    center-y of the FAB
 * @param {Function} onPress  called when button is tapped
 */
export function createFAB(scene, fabX, fabY, onPress) {
    const fabW = 120, fabH = 40;

    const bg = scene.add.graphics().setScrollFactor(0).setDepth(10);
    const draw = (color, stroke = 0xFBBF24) => {
        bg.clear();
        bg.fillStyle(color, 0.9);
        bg.fillRoundedRect(fabX - fabW / 2, fabY - fabH / 2, fabW, fabH, 20);
        bg.lineStyle(1.5, stroke, 1);
        bg.strokeRoundedRect(fabX - fabW / 2, fabY - fabH / 2, fabW, fabH, 20);
    };
    draw(0x0f172a);

    const label = scene.add.text(fabX, fabY, '📍 Bài hiện tại', {
        fontFamily: 'Arial', fontSize: '14px', fontStyle: 'bold', fill: '#FBBF24'
    }).setOrigin(0.5).setScrollFactor(0).setDepth(10);

    const zone = scene.add.zone(fabX, fabY, fabW, fabH)
        .setScrollFactor(0).setInteractive({ useHandCursor: true }).setDepth(11);

    const stopProp = (_p, _x, _y, e) => { if (e) e.stopPropagation(); };

    zone.on('pointerover', () => {
        draw(0x1e293b, 0xFFD700);
        scene.tweens.add({ targets: label, scaleX: 1.05, scaleY: 1.05, duration: 100 });
    });
    zone.on('pointerout', () => {
        draw(0x0f172a);
        scene.tweens.add({ targets: label, scaleX: 1.0, scaleY: 1.0, duration: 100 });
    });
    zone.on('pointerdown', stopProp);
    zone.on('pointerup', (_p, _x, _y, e) => {
        if (e) e.stopPropagation();
        scene.sound.play('key_sound');
        onPress();
    });
}
