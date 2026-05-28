import { BaseMinigame } from './BaseMinigame';

export class GrowPlantGame extends BaseMinigame {
    constructor(scene, config) {
        super(scene, config);
        this.plantSprite = null;
        this.cloudSprite = null;
        this.potSprite = null;
    }

    create() {
        const cloudEmoji = this.config?.cloudEmoji || '☁️';
        const potEmoji = this.config?.potEmoji || '🪴';
        const x = this.config?.x || 400;
        const y = this.config?.y || 230;

        const cloudKey = this.createEmojiTexture('grow_cloud_tex', cloudEmoji, 64);
        const potKey = this.createEmojiTexture('grow_pot_tex', potEmoji, 72);

        // Tạo mầm cây ban đầu
        this.plantKeySprout = this.createEmojiTexture('grow_sprout_tex', '🌱', 64);
        this.plantKeyBush = this.createEmojiTexture('grow_bush_tex', '🌿', 64);
        this.plantKeyTree = this.createEmojiTexture('grow_tree_tex', '🌳', 72);

        // 1. Tạo chậu cây
        this.potSprite = this.scene.add.sprite(x, y + 50, potKey)
            .setDepth(110)
            .setScale(1.2);
        this.add(this.potSprite);

        // 2. Tạo đám mây ở trên cao
        this.cloudSprite = this.scene.add.sprite(x, y - 100, cloudKey)
            .setDepth(110);
        this.add(this.cloudSprite);

        // 3. Tạo mầm cây
        this.plantSprite = this.scene.add.sprite(x, y, this.plantKeySprout)
            .setDepth(112)
            .setScale(0.8);
        this.add(this.plantSprite);

        // Cho mây đung đưa nhẹ
        this.scene.tweens.add({
            targets: this.cloudSprite,
            x: x + 15,
            duration: 2000,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });
    }

    onWordComplete(word, currentWordIndex, totalWords) {
        const progress = currentWordIndex / totalWords;
        const scene = this.scene;
        const x = this.config?.x || 400;
        const y = this.config?.y || 230;
        const self = this;

        // 1. Tạo giọt nước rơi từ đám mây xuống cây
        const dropKey = this.createEmojiTexture('grow_drop_tex', '💧', 32);
        const drop = scene.add.sprite(this.cloudSprite.x, this.cloudSprite.y + 10, dropKey)
            .setDepth(111)
            .setScale(0.8);
        this.add(drop);

        scene.tweens.add({
            targets: drop,
            y: y + 20,
            scaleX: 0.4,
            scaleY: 0.4,
            duration: 400,
            ease: 'Quad.easeIn',
            onComplete: () => {
                drop.destroy();
                if (!self.scene) return;

                // 2. Cây hấp thụ nước, nảy nhẹ và lớn lên
                let nextTexture = self.plantKeySprout;
                let nextScale = 0.8 + progress * 0.8; // Lớn dần

                if (progress >= 0.75) {
                    nextTexture = self.plantKeyTree;
                } else if (progress >= 0.35) {
                    nextTexture = self.plantKeyBush;
                }

                // Cập nhật texture cây nếu chuyển đổi giai đoạn
                self.plantSprite.setTexture(nextTexture);

                scene.tweens.add({
                    targets: self.plantSprite,
                    scaleX: nextScale * 1.3,
                    scaleY: nextScale * 1.3,
                    y: y - (progress * 25), // Dịch nhẹ lên cao khi lớn
                    duration: 150,
                    yoyo: true,
                    ease: 'Quad.easeOut',
                    onComplete: () => {
                        if (!self.scene) return;
                        self.plantSprite.setScale(nextScale);
                    }
                });
            }
        });
    }

    onTypeError(char) {
        // Gõ sai -> Cây bị rung rinh nhẹ báo hiệu cần nước
        this.scene.tweens.add({
            targets: this.plantSprite,
            angle: 15,
            duration: 60,
            yoyo: true,
            repeat: 2,
            onComplete: () => {
                this.plantSprite.angle = 0;
            }
        });
    }
}
