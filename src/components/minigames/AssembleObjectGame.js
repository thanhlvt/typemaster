import { BaseMinigame } from './BaseMinigame';

export class AssembleObjectGame extends BaseMinigame {
    constructor(scene, config) {
        super(scene, config);
        this.partsList = [];
        this.assembledCount = 0;
        this.onCompleteCallback = null;
    }

    create() {
        const { finishedObject, parts } = this.config;

        // 1. Tạo texture chính của vật phẩm hoàn chỉnh (để ẩn đi ban đầu)
        const finishedKey = this.scene.textures.exists(finishedObject.texture)
            ? finishedObject.texture
            : (finishedObject.emoji 
                ? this.createEmojiTexture(finishedObject.texture, finishedObject.emoji, 110)
                : finishedObject.texture);

        this.finishedSprite = this.scene.add.sprite(finishedObject.x, finishedObject.y, finishedKey)
            .setAlpha(0) // Ẩn ban đầu
            .setDepth(115);

        // Thiết lập scale và angle tùy biến cho vật phẩm hoàn chỉnh
        if (finishedObject.scaleX !== undefined) this.finishedSprite.setScaleX(finishedObject.scaleX);
        if (finishedObject.scaleY !== undefined) this.finishedSprite.setScaleY(finishedObject.scaleY);
        if (finishedObject.scaleX === undefined && finishedObject.scaleY === undefined) {
            this.finishedSprite.setScale(finishedObject.scale || 1);
        }
        if (finishedObject.angle !== undefined) this.finishedSprite.setAngle(finishedObject.angle);

        this.add(this.finishedSprite);

        // 2. Tạo các bộ phận và đặt ở hàng đợi bên dưới
        const targetX = finishedObject.x;
        const targetY = finishedObject.y;

        // Sắp xếp các bộ phận theo thứ tự lắp ráp (order)
        const sortedParts = [...parts].sort((a, b) => a.order - b.order);

        // Dàn hàng các mảnh ghép ở hàng đợi phía dưới màn hình
        const startQueueX = targetX - (sortedParts.length - 1) * 50;
        const queueY = targetY + 110;

        sortedParts.forEach((part, index) => {
            const partKey = this.scene.textures.exists(part.texture)
                ? part.texture
                : (part.emoji 
                    ? this.createEmojiTexture(part.texture, part.emoji, 48)
                    : part.texture);

            // Vị trí nằm ở khay linh kiện bên dưới
            const qx = startQueueX + index * 120;
            const qy = queueY;

            const partSprite = this.scene.add.sprite(qx, qy, partKey)
                .setAlpha(0.6) // Hơi mờ biểu thị chưa lắp
                .setDepth(110);

            // Cấu hình kích thước và góc quay ban đầu ở khay (nhỏ hơn 30% so với kích thước đích)
            const targetScaleX = part.scaleX !== undefined ? part.scaleX : (part.scale || 1.0);
            const targetScaleY = part.scaleY !== undefined ? part.scaleY : (part.scale || 1.0);
            const targetAngle = part.angle !== undefined ? part.angle : 0;

            partSprite.setScale(targetScaleX * 0.7, targetScaleY * 0.7);
            if (targetAngle !== 0) {
                partSprite.setAngle(targetAngle);
            }

            this.add(partSprite);

            this.partsList.push({
                config: part,
                sprite: partSprite,
                assembled: false,
                queueX: qx,
                queueY: qy,
                destX: targetX + part.offsetX,
                destY: targetY + part.offsetY
            });
        });
    }

    onWordComplete(word, currentWordIndex, totalWords, onComplete) {
        this.onCompleteCallback = onComplete;
        const prevAssembledCount = this.assembledCount;
        
        // Tính toán xem tiến độ gõ tương ứng với bao nhiêu mảnh cần được lắp ráp
        const targetAssembled = Math.round((currentWordIndex / totalWords) * this.partsList.length);

        for (let i = 0; i < targetAssembled; i++) {
            if (i < this.partsList.length && !this.partsList[i].assembled) {
                this.assemblePart(this.partsList[i]);
            }
        }

        // Chỉ gọi onComplete đồng bộ nếu không có mảnh nào mới được bắt đầu lắp ráp trong lượt này
        // VÀ tất cả bộ phận đã được lắp ráp (hoặc đã lắp ráp hết trước đó)
        if (this.assembledCount >= this.partsList.length && this.assembledCount === prevAssembledCount) {
            if (onComplete) onComplete();
        }
    }

    assemblePart(part) {
        part.assembled = true;
        this.assembledCount++;
        const scene = this.scene;
        const self = this;

        const targetScaleX = part.config.scaleX !== undefined ? part.config.scaleX : (part.config.scale || 1.0);
        const targetScaleY = part.config.scaleY !== undefined ? part.config.scaleY : (part.config.scale || 1.0);
        const targetAngle = part.config.angle !== undefined ? part.config.angle : 0;

        // Tween bay từ hàng linh kiện lên vị trí lắp ráp trên bản vẽ
        scene.tweens.add({
            targets: part.sprite,
            x: part.destX,
            y: part.destY,
            scaleX: targetScaleX,
            scaleY: targetScaleY,
            angle: targetAngle,
            alpha: 1,
            duration: 900,
            ease: 'Cubic.easeOut',
            onComplete: () => {
                if (!self.scene) return;
                // Nháy sáng bộ phận vừa lắp
                part.sprite.setTint(0xffffff);
                scene.time.delayedCall(100, () => {
                    if (self.scene) {
                        part.sprite.clearTint();
                    }
                });

                // Nếu tất cả các mảnh đã được lắp ráp
                if (self.assembledCount === self.partsList.length) {
                    self.completeAssembly();
                }
            }
        });
    }

    completeAssembly() {
        const scene = this.scene;
        const finishedSprite = this.finishedSprite;
        const finishedObject = this.config.finishedObject;
        const scale = finishedObject.scale || 1;
        const scaleX = finishedObject.scaleX !== undefined ? finishedObject.scaleX : scale;
        const scaleY = finishedObject.scaleY !== undefined ? finishedObject.scaleY : scale;
        const self = this;

        // 1. Ẩn tất cả các mảnh ghép riêng rẽ
        this.partsList.forEach(part => {
            scene.tweens.add({
                targets: part.sprite,
                alpha: 0,
                duration: 200,
                onComplete: () => {
                    if (!self.scene) return;
                    part.sprite.setVisible(false);
                }
            });
        });

        // 2. Hiện hình ảnh vật phẩm hoàn chỉnh và tạo hiệu ứng phát sáng
        finishedSprite.setScale(0.1).setAlpha(0);
        scene.tweens.add({
            targets: finishedSprite,
            scaleX: scaleX,
            scaleY: scaleY,
            alpha: 1,
            duration: 600,
            ease: 'Back.easeOut',
            onComplete: () => {
                if (!self.scene) return;
                // Hiệu ứng phát sáng lấp lánh (pulsing glow)
                scene.tweens.add({
                    targets: finishedSprite,
                    scaleX: scaleX * 1.12,
                    scaleY: scaleY * 1.12,
                    duration: 250,
                    yoyo: true,
                    repeat: 1,
                    ease: 'Quad.easeInOut',
                    onComplete: () => {
                        if (self.scene && self.onCompleteCallback) {
                            self.onCompleteCallback();
                        }
                    }
                });
            }
        });
    }

    onTypeError(char) {
        const scene = this.scene;
        // Gõ sai -> Rung lắc các mảnh linh kiện chưa được lắp ráp
        this.partsList.forEach(part => {
            if (!part.assembled) {
                scene.tweens.add({
                    targets: part.sprite,
                    x: part.sprite.x + Phaser.Math.Between(-6, 6),
                    duration: 50,
                    yoyo: true,
                    repeat: 2,
                    onComplete: () => {
                        part.sprite.x = part.queueX;
                    }
                });
            }
        });
    }
}
