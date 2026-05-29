import { BaseMinigame } from './BaseMinigame';
import { showBananaDrop } from '../../utils/PlayScorePopup';
import * as Phaser from 'phaser';

export class GrowPlantGame extends BaseMinigame {
    constructor(scene, config) {
        super(scene, config);
        this.plantSprite = null;
        this.stages = [];
        this.monkeySprite = null;
        this.playerContainer = null;
    }

    create() {
        const plantConfig = this.config?.plant || {};

        // 0. Tạo skin khỉ con ở bên trái màn hình
        const monkeySkin = this.scene.monkey?.texture?.key || 'monkey_1';
        this.monkeySprite = this.scene.add.sprite(110, 290, monkeySkin)
            .setScale(0.55)
            .setDepth(115);
        this.add(this.monkeySprite);
        this.playerContainer = this.monkeySprite; // Hướng các tween nhảy và score popup vào khỉ con

        // Hoạt ảnh thở bồng bềnh nhẹ cho khỉ
        this.scene.tweens.add({
            targets: this.monkeySprite,
            y: this.monkeySprite.y + 3,
            duration: 1000,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });
        const x = this.config?.x || 400;
        const y = this.config?.y || 230;

        // 1. Setup các giai đoạn phát triển (stages), theo thứ tự từ BÉ đến LỚN
        this.stages = [];
        if (Array.isArray(plantConfig.stages)) {
            plantConfig.stages.forEach((stage, idx) => {
                const stageTex = stage.texture || `grow_plant_stage_${idx}`;
                const stageScale = stage.scale !== undefined ? stage.scale : 1.0;
                this.stages.push({
                    textureKey: stageTex,
                    scale: stageScale
                });
            });
        } else {
            // Mặc định: 🌱, 🌿, 🌳 theo thứ tự từ bé đến lớn
            const sproutKey = this.createEmojiTexture('grow_sprout_tex', '🌱', 64);
            const bushKey = this.createEmojiTexture('grow_bush_tex', '🌿', 64);
            const treeKey = this.createEmojiTexture('grow_tree_tex', '🌳', 72);

            this.stages = [
                { textureKey: sproutKey, scale: 0.8 },
                { textureKey: bushKey, scale: 1.0 },
                { textureKey: treeKey, scale: 1.2 }
            ];
        }

        // 2. Tạo cây ban đầu
        // Sử dụng setOrigin(0.5, 1.0) để tọa độ (x, y) đại diện cho điểm giữa, dưới cùng của ảnh
        const initialStage = this.stages[0];
        this.plantSprite = this.scene.add.sprite(x, y, initialStage.textureKey)
            .setDepth(112)
            .setOrigin(0.5, 1.0)
            .setScale(initialStage.scale);
        this.add(this.plantSprite);
    }

    onWordComplete(word, currentWordIndex, totalWords) {
        const progress = currentWordIndex / totalWords;

        // Thả quả chuối rơi xuống khỉ con tương tự khi chơi không có minigame
        if (this.monkeySprite) {
            showBananaDrop(this.scene, this.monkeySprite);
        }
        const scene = this.scene;
        const x = this.config?.x || 400;
        const y = this.config?.y || 230;
        const self = this;

        // Giọt nước dùng emoji 💧
        const dropKey = this.createEmojiTexture('grow_drop_tex', '💧', 40);

        // Tạo 7 giọt nước rơi
        const numDrops = 10;
        let dropsFinished = 0;

        for (let i = 0; i < numDrops; i++) {
            // Phân bố giọt nước dọc theo chiều ngang phía trên cây
            const offsetX = Phaser.Math.Between(-40, 40);
            const offsetY = Phaser.Math.Between(0, 15);
            const drop = scene.add.sprite(x + offsetX, y - 180 + offsetY, dropKey)
                .setDepth(111)
                .setScale(Phaser.Math.FloatBetween(0.5, 0.8));
            this.add(drop);

            const delay = Phaser.Math.Between(0, 200);
            const duration = Phaser.Math.Between(350, 500);

            scene.tweens.add({
                targets: drop,
                y: y - 20 + Phaser.Math.Between(-10, 10), // Rơi đến phần thân cây
                scaleX: 0.3,
                scaleY: 0.3,
                delay: delay,
                duration: duration,
                ease: 'Quad.easeIn',
                onComplete: () => {
                    drop.destroy();
                    dropsFinished++;

                    // Khi toàn bộ các giọt nước đã rơi xong, kích hoạt cây lớn lên
                    if (dropsFinished === numDrops) {
                        self.triggerPlantGrowth(progress, y);
                    }
                }
            });
        }
    }

    triggerPlantGrowth(progress, y) {
        if (!this.scene) return;
        const scene = this.scene;

        const N = this.stages.length;
        const stageIndex = Math.min(Math.floor(progress * N), N - 1);
        const currentStage = this.stages[stageIndex];

        // Cập nhật texture cây
        this.plantSprite.setTexture(currentStage.textureKey);

        // Cây phát triển giãn nở hướng lên trên từ gốc cây (gốc cây cố định tại tọa độ y)
        scene.tweens.add({
            targets: this.plantSprite,
            scaleX: currentStage.scale * 1.3,
            scaleY: currentStage.scale * 1.3,
            duration: 150,
            yoyo: true,
            ease: 'Quad.easeOut',
            onComplete: () => {
                if (!this.scene) return;
                this.plantSprite.setScale(currentStage.scale);
            }
        });
    }

    onTypeError(char) {
        // Gõ sai -> Cây bị rung rinh nhẹ quanh gốc cây (anchor ở đáy) báo hiệu cần nước
        this.scene.tweens.add({
            targets: this.plantSprite,
            angle: 15,
            duration: 60,
            yoyo: true,
            repeat: 2,
            onComplete: () => {
                if (this.plantSprite) {
                    this.plantSprite.angle = 0;
                }
            }
        });

        // Hiệu ứng chớp đỏ khỉ con khi gõ sai giống như khi chơi không có minigame
        if (this.monkeySprite) {
            this.monkeySprite.setTint(0xff0000);
            this.scene.time.delayedCall(200, () => {
                if (this.monkeySprite) {
                    this.monkeySprite.clearTint();
                }
            });
        }
    }

    destroy() {
        this.monkeySprite = null;
        this.playerContainer = null;
        super.destroy();
    }
}
