import * as Phaser from 'phaser';

/**
 * Creates the target/typed/hint text UI panel for BossScene.
 * Returns { targetText, ruleHint, typedText }.
 */
export function createBossContentUI(scene) {
    const { width, height } = scene.scale;
    const bgTop    = height * 0.52;
    const bgHeight = height * 0.22;

    const bg = scene.add.graphics();
    bg.fillStyle(0xffffff, 0.8);
    bg.fillRoundedRect(width * 0.02, bgTop, width * 0.96, bgHeight, 20);

    const targetText = scene.add.text(width / 2, bgTop + bgHeight * 0.18, '', {
        fontFamily: 'Verdana, sans-serif', fontSize: '48px', fontStyle: 'bold', fill: '#333'
    }).setOrigin(0.5);

    const ruleHint = scene.add.text(width / 2, bgTop + bgHeight * 0.46, '', {
        fontFamily: 'Arial', fontSize: '24px', fontStyle: 'bold', fill: '#E65100'
    }).setOrigin(0.5);

    const typedText = scene.add.text(width / 2, bgTop + bgHeight * 0.70, '', {
        fontFamily: 'Verdana, sans-serif', fontSize: '44px', fontStyle: 'bold', fill: '#2E7D32'
    }).setOrigin(0.5);

    return { targetText, ruleHint, typedText };
}

/**
 * Plays the sword-slash hit animation against the monkey.
 * @param {Phaser.Scene} scene
 * @param {Phaser.GameObjects.Sprite} monkey
 */
export function playSwordAttack(scene, monkey) {
    const mx = monkey.x, my = monkey.y;
    const tilt = Phaser.Math.Between(-15, 15);

    const sword = scene.add.text(mx + 100, my, '🗡️', {
        fontFamily: 'Segoe UI Emoji, Arial', fontSize: '96px'
    }).setOrigin(0.5).setDepth(30).setAngle(tilt);

    scene.tweens.add({
        targets: sword, x: mx - 50, duration: 250, ease: 'Linear',
        onComplete: () => sword.destroy()
    });

    scene.time.delayedCall(160, () => {
        if (!scene.sys?.isActive() || !monkey) return;

        monkey.setTint(0xff0000);
        scene.cameras.main.shake(100, 0.008);
        scene.time.delayedCall(150, () => { if (monkey) monkey.clearTint(); });

        const slash = scene.add.graphics().setDepth(29);
        slash.lineStyle(6, 0xff3b30, 0.95);
        slash.beginPath();
        slash.moveTo(mx + 60, my - 45); slash.lineTo(mx - 60, my + 45);
        slash.strokePath();

        slash.lineStyle(2, 0xffffff, 1.0);
        slash.beginPath();
        slash.moveTo(mx + 60, my - 45); slash.lineTo(mx - 60, my + 45);
        slash.strokePath();

        scene.tweens.add({
            targets: slash, alpha: 0, scaleX: 1.1, scaleY: 1.1, duration: 200,
            onComplete: () => slash.destroy()
        });
    });
}
