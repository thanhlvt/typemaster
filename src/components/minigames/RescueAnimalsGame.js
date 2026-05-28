import { BaseMinigame } from './BaseMinigame';

export class RescueAnimalsGame extends BaseMinigame {
    constructor(scene, config) {
        super(scene, config);
        this.animalSprite = null;
        this.cageSprite = null;
    }

    create() {
        const animalEmoji = this.config?.animalEmoji || '🐰'; //🐰, 🐿️, 🦊
        const cageEmoji = this.config?.cageEmoji || '📦'; //📦, 🪵
        const x = this.config?.x || 400;
        const y = this.config?.y || 250;

        // 1. Tạo texture từ emoji
        const animalKey = this.createEmojiTexture('rescue_animal_tex', animalEmoji, 64);
        const cageKey = this.createEmojiTexture('rescue_cage_tex', cageEmoji, 72);

        // 2. Tạo con thú ẩn ở trong
        this.animalSprite = this.scene.add.sprite(x, y + 10, animalKey)
            .setScale(1.2)
            .setDepth(111);
        this.add(this.animalSprite);

        // 3. Tạo chiếc lồng đè lên ngoài
        this.cageSprite = this.scene.add.sprite(x, y, cageKey)
            .setScale(1.3)
            .setDepth(112);
        this.add(this.cageSprite);
    }

    onWordComplete(word, currentWordIndex, totalWords) {
        const progress = currentWordIndex / totalWords;
        const self = this;

        // Lồng gỗ mờ dần theo tiến trình
        this.scene.tweens.add({
            targets: this.cageSprite,
            alpha: 1 - progress,
            x: this.cageSprite.x + Phaser.Math.Between(-5, 5),
            duration: 150,
            yoyo: true,
            onComplete: () => {
                if (!self.scene) return;
                self.cageSprite.x = self.config?.x || 400;
                self.cageSprite.alpha = 1 - progress;

                // Nếu đã giải cứu thành công (đủ chữ)
                if (currentWordIndex >= totalWords) {
                    self.cageSprite.setVisible(false);
                    // Hiệu ứng con thú nhảy nhót vui sướng
                    self.scene.tweens.add({
                        targets: self.animalSprite,
                        y: self.animalSprite.y - 80,
                        scaleX: 1.5,
                        scaleY: 1.5,
                        duration: 300,
                        yoyo: true,
                        repeat: 3,
                        ease: 'Bounce.easeOut'
                    });
                }
            }
        });
    }

    onTypeError(char) {
        // Gõ sai -> Chiếc lồng rung lắc cảnh báo
        const x = this.config?.x || 400;
        this.scene.tweens.add({
            targets: this.cageSprite,
            x: this.cageSprite.x + Phaser.Math.Between(-8, 8),
            duration: 50,
            yoyo: true,
            repeat: 2,
            onComplete: () => {
                this.cageSprite.x = x;
            }
        });
    }
}
