import { BaseMinigame } from './BaseMinigame';

export class BubbleShooterGame extends BaseMinigame {
    constructor(scene, config) {
        super(scene, config);
        this.bubblesList = [];
    }

    create() {
        const bubbleEmoji = this.config?.bubbleEmoji || '🫧'; // 🫧, 🎈, 🛸
        const count = this.totalWords || 10;
        
        const bubbleKey = this.createEmojiTexture('bubble_shoot_tex', bubbleEmoji, 48);

        const minX = this.config?.area?.minX || 150;
        const maxX = this.config?.area?.maxX || 650;
        const minY = this.config?.area?.minY || 100;
        const maxY = this.config?.area?.maxY || 300;

        for (let i = 0; i < count; i++) {
            const rx = Phaser.Math.Between(minX, maxX);
            const ry = Phaser.Math.Between(minY, maxY);

            const bubbleSprite = this.scene.add.sprite(rx, ry, bubbleKey)
                .setDepth(111)
                .setScale(Phaser.Math.FloatBetween(0.8, 1.2));
            this.add(bubbleSprite);

            // Cho bong bóng bay lơ lửng nhẹ nhàng
            this.scene.tweens.add({
                targets: bubbleSprite,
                y: ry + Phaser.Math.Between(-15, 15),
                x: rx + Phaser.Math.Between(-15, 15),
                duration: Phaser.Math.Between(1500, 2500),
                yoyo: true,
                repeat: -1,
                ease: 'Sine.easeInOut'
            });

            this.bubblesList.push({
                sprite: bubbleSprite,
                popped: false,
                startX: rx,
                startY: ry
            });
        }
    }

    onWordComplete(word, currentWordIndex, totalWords) {
        // Tìm bong bóng chưa nổ
        const unpopped = this.bubblesList.filter(b => !b.popped);
        if (unpopped.length > 0) {
            const targetBubble = unpopped[0];
            targetBubble.popped = true;

            const scene = this.scene;
            const self = this;

            // Nổ bong bóng
            scene.tweens.add({
                targets: targetBubble.sprite,
                scaleX: 1.6,
                scaleY: 1.6,
                alpha: 0,
                duration: 200,
                onComplete: () => {
                    if (!self.scene) return;
                    self.showPopParticles(targetBubble.sprite.x, targetBubble.sprite.y);
                    targetBubble.sprite.setVisible(false);
                }
            });
        }
    }

    onTypeError(char) {
        // Gõ sai -> Lắc nhẹ các bong bóng chưa nổ
        this.bubblesList.forEach(bubble => {
            if (!bubble.popped) {
                this.scene.tweens.add({
                    targets: bubble.sprite,
                    x: bubble.sprite.x + Phaser.Math.Between(-5, 5),
                    duration: 50,
                    yoyo: true,
                    repeat: 1
                });
            }
        });
    }

    showPopParticles(x, y) {
        const graphics = this.scene.add.graphics().setDepth(120);
        const particlesCount = 8;
        const speed = 60;
        const color = 0x60A5FA; // Sky blue pop

        const pts = [];
        for (let i = 0; i < particlesCount; i++) {
            const angle = (i / particlesCount) * Math.PI * 2;
            pts.push({ angle, distance: 0 });
        }

        const self = this;
        this.scene.tweens.add({
            targets: pts,
            distance: speed,
            duration: 300,
            onUpdate: (tween, target) => {
                graphics.clear();
                pts.forEach(p => {
                    graphics.fillStyle(color, 1 - (p.distance / speed));
                    graphics.fillCircle(x + Math.cos(p.angle) * p.distance, y + Math.sin(p.angle) * p.distance, 4 * (1 - (p.distance / speed)));
                });
            },
            onComplete: () => {
                graphics.destroy();
            }
        });
    }
}
