import { BaseMinigame } from './BaseMinigame';

export class BubbleShooterGame extends BaseMinigame {
    constructor(scene, config) {
        super(scene, config);
        this.bubblesList = [];
    }

    create() {
        const bubbleConfig = this.config?.bubble || {};
        const bubbleEmoji = bubbleConfig.emoji || this.config?.bubbleEmoji || '🫧';
        const bubbleTex = bubbleConfig.image
            ? 'bubble_shoot_tex_' + bubbleConfig.image.replace(/[^a-zA-Z0-9]/g, '_')
            : (bubbleConfig.texture || 'bubble_shoot_tex');
        const bubbleScale = bubbleConfig.scale !== undefined ? bubbleConfig.scale : 1.0;
        const randomAngleEnabled = bubbleConfig.randomAngle !== false;

        const count = this.totalWords || 10;
        
        const bubbleKey = this.scene.textures.exists(bubbleTex)
            ? bubbleTex
            : this.createEmojiTexture(bubbleTex, bubbleEmoji, 48);

        const minX = this.config?.area?.minX || 150;
        const maxX = this.config?.area?.maxX || 650;
        const minY = this.config?.area?.minY || 100;
        const maxY = this.config?.area?.maxY || 300;

        for (let i = 0; i < count; i++) {
            const rx = Phaser.Math.Between(minX, maxX);
            const ry = Phaser.Math.Between(minY, maxY);

            const randomScale = bubbleScale * Phaser.Math.FloatBetween(0.8, 1);
            const randomAngle = randomAngleEnabled ? Phaser.Math.Between(-180, 180) : 0;

            const bubbleSprite = this.scene.add.sprite(rx, ry, bubbleKey)
                .setDepth(111)
                .setScale(randomScale)
                .setAngle(randomAngle);
            this.add(bubbleSprite);

            // Cho bong bóng bay lơ lửng nhẹ nhàng
            this.scene.tweens.add({
                targets: bubbleSprite,
                y: ry + Phaser.Math.Between(-25, 25),
                x: rx + Phaser.Math.Between(-25, 25),
                duration: Phaser.Math.Between(1500, 2500),
                yoyo: true,
                repeat: -1,
                ease: 'Sine.easeInOut'
            });

            this.bubblesList.push({
                sprite: bubbleSprite,
                popped: false,
                startX: rx,
                startY: ry,
                startAngle: randomAngle
            });
        }
    }

    onWordComplete(word, currentWordIndex, totalWords, onCompleteCallback) {
        // Tìm bong bóng chưa nổ
        const unpopped = this.bubblesList.filter(b => !b.popped);
        if (unpopped.length > 0) {
            const targetBubble = unpopped[0];
            targetBubble.popped = true;

            const scene = this.scene;
            const self = this;

            const startX = scene.scale.width / 2;
            const startY = scene.scale.height * 0.86;
            const targetX = targetBubble.sprite.x;
            const targetY = targetBubble.sprite.y;

            // Dừng tween bay lơ lửng của bong bóng này để cố định vị trí trước khi bắn trúng
            scene.tweens.killTweensOf(targetBubble.sprite);

            // Tạo đồ họa mũi tên vẽ vector
            const arrow = scene.add.graphics();
            arrow.lineStyle(4, 0xFBBF24, 1);
            arrow.fillStyle(0xFBBF24, 1);
            
            // Vẽ mũi tên chỉ sang phải (+X)
            arrow.beginPath();
            arrow.moveTo(15, 0);
            arrow.lineTo(-10, -8);
            arrow.lineTo(-10, 8);
            arrow.closePath();
            arrow.fillPath();
            arrow.lineBetween(-25, 0, -5, 0);
            arrow.setDepth(120);

            arrow.setPosition(startX, startY);
            const angle = Phaser.Math.Angle.Between(startX, startY, targetX, targetY);
            arrow.setRotation(angle);

            // Phát âm thanh bắn tên
            scene.sound.play('whoosh');

            // Tween bắn mũi tên bay từ bàn phím vào bong bóng
            scene.tweens.add({
                targets: arrow,
                x: targetX,
                y: targetY,
                duration: 250,
                ease: 'Quad.easeOut',
                onUpdate: () => {
                    if (!self.scene) return;
                    // Tạo vệt sáng lấp lánh (sparkle trail)
                    const trailDot = scene.add.circle(arrow.x, arrow.y, 4, 0xFBBF24).setDepth(119);
                    scene.tweens.add({
                        targets: trailDot,
                        alpha: 0,
                        scale: 0.1,
                        duration: 200,
                        onComplete: () => {
                            trailDot.destroy();
                        }
                    });
                },
                onComplete: () => {
                    arrow.destroy();
                    if (!self.scene) return;

                    // Phát âm thanh nổ bong bóng
                    scene.sound.play('blob');

                    // Hiệu ứng bong bóng phồng lên rồi nổ
                    scene.tweens.add({
                        targets: targetBubble.sprite,
                        scaleX: targetBubble.sprite.scaleX * 1.5,
                        scaleY: targetBubble.sprite.scaleY * 1.5,
                        alpha: 0,
                        duration: 150,
                        onComplete: () => {
                            if (!self.scene) return;
                            self.showPopParticles(targetBubble.sprite.x, targetBubble.sprite.y);
                            targetBubble.sprite.setVisible(false);
                            if (onCompleteCallback) onCompleteCallback();
                        }
                    });
                }
            });
        } else {
            if (onCompleteCallback) onCompleteCallback();
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
                if (!self.scene) return;
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
