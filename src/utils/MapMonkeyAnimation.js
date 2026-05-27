import * as Phaser from 'phaser';
import { ensureTextures } from './TextureLoader';

/**
 * Runs the monkey jump/drop animation from the previous node to the current node.
 * Reads scene.monkeySkin, scene.currentLessonIndex, scene._activeNodes.
 *
 * @param {Phaser.Scene} scene  MapScene instance
 */
export function playMonkeyTransitionAnimation(scene) {
    const { _activeNodes, currentLessonIndex, monkeySkin } = scene;
    if (!_activeNodes) return;

    const currentNode = _activeNodes.get(currentLessonIndex);
    if (!currentNode) return;

    currentNode.setMonkeyVisible(false);
    if (currentLessonIndex > 0) {
        const prev = _activeNodes.get(currentLessonIndex - 1);
        if (prev) prev.setMonkeyVisible(false);
    }

    const x2 = currentNode.x;
    const y2 = currentNode.y - currentNode.radius - 3;

    ensureTextures(scene, [{ key: monkeySkin, url: `assets/${monkeySkin}.png` }], () => {
        if (!scene.sys || !scene.sys.isActive()) return;

        scene.time.delayedCall(100, () => {
            if (scene.cache.audio.exists('whoosh')) scene.sound.play('whoosh');
        });

        if (currentLessonIndex === 0) {
            // Drop from above
            const tempMonkey = scene.add.sprite(x2, y2 - 200, monkeySkin)
                .setScale(0.08, 0.14).setOrigin(0.5).setDepth(20);

            scene.tweens.add({
                targets: tempMonkey, y: y2, scaleX: 0.10, scaleY: 0.10,
                duration: 900, ease: 'Bounce.easeOut',
                onComplete: () => {
                    if (scene.cache.audio.exists('blob')) scene.sound.play('blob');
                    scene.tweens.add({
                        targets: tempMonkey, scaleX: 0.11, scaleY: 0.09,
                        duration: 100, yoyo: true, repeat: 1, ease: 'Quad.easeInOut',
                        onComplete: () => { tempMonkey.destroy(); currentNode.setMonkeyVisible(true); }
                    });
                }
            });
        } else {
            // Arc jump from previous node
            const prevNode = _activeNodes.get(currentLessonIndex - 1);
            const x1 = prevNode ? prevNode.x : x2;
            const y1 = prevNode ? (prevNode.y - prevNode.radius - 3) : (y2 - 400);

            const tempMonkey = scene.add.sprite(x1, y1, monkeySkin)
                .setScale(0.10).setOrigin(0.5).setDepth(20);
            if (x2 < x1) tempMonkey.setFlipX(true);

            const curve = new Phaser.Curves.QuadraticBezier(
                new Phaser.Geom.Point(x1, y1),
                new Phaser.Geom.Point((x1 + x2) / 2, Math.min(y1, y2) - 120),
                new Phaser.Geom.Point(x2, y2)
            );

            const animObj = { progress: 0 };
            scene.tweens.add({
                targets: animObj, progress: 1, duration: 1000, ease: 'Quad.easeInOut',
                onUpdate: () => {
                    const pt = curve.getPoint(animObj.progress);
                    tempMonkey.setPosition(pt.x, pt.y);
                    const mid = animObj.progress > 0.1 && animObj.progress < 0.9;
                    tempMonkey.setScale(mid ? 0.09 : 0.10, mid ? 0.11 : 0.10);
                },
                onComplete: () => {
                    if (scene.cache.audio.exists('blob')) scene.sound.play('blob');
                    scene.tweens.add({
                        targets: tempMonkey, scaleX: 0.11, scaleY: 0.09,
                        duration: 100, yoyo: true, repeat: 1, ease: 'Quad.easeInOut',
                        onComplete: () => { tempMonkey.destroy(); currentNode.setMonkeyVisible(true); }
                    });
                }
            });
        }
    });
}
