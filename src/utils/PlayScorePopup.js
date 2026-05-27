/**
 * Shows the score popup (+N 🍌) floating above the monkey.
 * @param {Phaser.Scene} scene
 * @param {Phaser.GameObjects.Sprite} monkey
 * @param {number} multiplier  combo multiplier (determines size & color)
 */
export function showScorePopup(scene, monkey, multiplier) {
    const color = multiplier >= 4 ? '#C084FC'
                : multiplier >= 3 ? '#F87171'
                : multiplier >= 2 ? '#FCD34D' : '#86EFAC';
    const fontSize = multiplier >= 4 ? '72px' : multiplier >= 3 ? '60px'
                   : multiplier >= 2 ? '50px' : '38px';

    const popup = scene.add.text(
        monkey.x + Phaser.Math.Between(-20, 20),
        monkey.y - 80,
        `+${multiplier} 🍌`,
        { fontFamily: 'Arial Black, Arial, Segoe UI Emoji', fontSize, fontStyle: 'bold',
          fill: color, stroke: '#000000', strokeThickness: 8 }
    ).setOrigin(0.5).setScale(0.2).setAlpha(0).setDepth(15);

    scene.tweens.add({
        targets: popup, scaleX: 1.1, scaleY: 1.1, alpha: 1,
        y: monkey.y - 120, duration: 250, ease: 'Back.easeOut',
        onComplete: () => {
            scene.tweens.add({
                targets: popup, y: popup.y - 50, alpha: 0,
                duration: 500, delay: 150, ease: 'Cubic.easeIn',
                onComplete: () => popup.destroy()
            });
        }
    });
}

/**
 * Drops a banana from the top of the screen down to the monkey.
 * @param {Phaser.Scene} scene
 * @param {Phaser.GameObjects.Sprite} monkey
 */
export function showBananaDrop(scene, monkey) {
    const banana = scene.add.image(monkey.x, 0, 'banana').setScale(0.3);
    scene.tweens.add({
        targets: banana, y: monkey.y, duration: 500, ease: 'Cubic.easeIn',
        onComplete: () => {
            scene.tweens.add({
                targets: banana, scaleX: 0, scaleY: 0, alpha: 0,
                duration: 150, onComplete: () => banana.destroy()
            });
        }
    });
}
