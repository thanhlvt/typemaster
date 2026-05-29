import { BaseMinigame } from './BaseMinigame';
import { showBananaDrop } from '../../utils/PlayScorePopup';

export class CollectItemsGame extends BaseMinigame {
    constructor(scene, config) {
        super(scene, config);
        this.itemsList = [];
        this.monkeySprite = null;
        this.playerContainer = null;
    }

    create() {
        const { items, container, area } = this.config;

        // 0. Tạo skin khỉ con ở bên trái màn hình
        const monkeySkin = this.scene.monkey?.texture?.key || 'monkey_1';
        this.monkeySprite = this.scene.add.sprite(110, 290, monkeySkin)
            .setScale(0.55)
            .setDepth(115);
        this.add(this.monkeySprite);
        this.playerContainer = this.monkeySprite; // Hướng tween nhảy và score popup vào khỉ con

        // Hoạt ảnh thở bồng bềnh nhẹ cho khỉ
        this.scene.tweens.add({
            targets: this.monkeySprite,
            y: this.monkeySprite.y + 3,
            duration: 1000,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });

        // 1. Tạo texture cho container và đặt vào màn hình
        const containerKey = this.scene.textures.exists(container.texture)
            ? container.texture
            : (container.emoji
                ? this.createEmojiTexture(container.texture, container.emoji, 80)
                : container.texture);

        this.containerSprite = this.scene.add.sprite(container.x, container.y, containerKey);
        if (container.width !== undefined && container.height !== undefined) {
            this.containerSprite.setDisplaySize(container.width, container.height);
        } else {
            this.containerSprite.setScale(container.scale || 1);
        }
        this.containerSprite.setDepth(115);
        this.add(this.containerSprite);

        // 2. Tạo danh sách các đồ vật và rải ngẫu nhiên
        const minX = area?.minX || 100;
        const maxX = area?.maxX || 500;
        const minY = area?.minY || 120;
        const maxY = area?.maxY || 320;

        items.forEach(itemConfig => {
            const itemKey = this.scene.textures.exists(itemConfig.texture)
                ? itemConfig.texture
                : (itemConfig.emoji
                    ? this.createEmojiTexture(itemConfig.texture, itemConfig.emoji, 48)
                    : itemConfig.texture);

            for (let i = 0; i < itemConfig.count; i++) {
                const rx = Phaser.Math.Between(minX, maxX);
                const ry = Phaser.Math.Between(minY, maxY);

                const itemSprite = this.scene.add.sprite(rx, ry, itemKey);
                if (itemConfig.width !== undefined && itemConfig.height !== undefined) {
                    itemSprite.setDisplaySize(itemConfig.width, itemConfig.height);
                } else if (itemConfig.scale !== undefined) {
                    itemSprite.setScale(itemConfig.scale);
                } else {
                    itemSprite.setScale(0.8);
                }

                const randomAngle = Phaser.Math.Between(-45, 45);
                itemSprite.setAngle(randomAngle);
                itemSprite.setDepth(111);
                this.add(itemSprite);

                this.itemsList.push({
                    sprite: itemSprite,
                    collected: false,
                    startX: rx,
                    startY: ry,
                    startAngle: randomAngle
                });
            }
        });

        // Trộn ngẫu nhiên danh sách vật phẩm để thứ tự thu thập sinh động
        Phaser.Math.RND.shuffle(this.itemsList);

        // Sắp xếp thứ tự render ban đầu dựa trên depth
        this.sort('depth');
    }

    getCollectedCount() {
        return this.itemsList.filter(item => item.collected).length;
    }

    onWordComplete(word, currentWordIndex, totalWords, onComplete) {
        // Tính toán số lượng vật phẩm cần thu thập tại tiến độ này
        const targetCount = Math.round((currentWordIndex / totalWords) * this.itemsList.length);
        const currentCount = this.getCollectedCount();

        if (targetCount > currentCount) {
            // Thả quả chuối rơi xuống khỉ con tương tự khi chơi không có minigame
            if (this.monkeySprite) {
                showBananaDrop(this.scene, this.monkeySprite);
            }

            const needed = targetCount - currentCount;
            let count = 0;

            for (let i = 0; i < this.itemsList.length; i++) {
                if (!this.itemsList[i].collected) {
                    const isLastCollectedInBatch = (count === needed - 1);
                    this.collectItem(this.itemsList[i], isLastCollectedInBatch ? onComplete : null);
                    count++;
                    if (count >= needed) break;
                }
            }
        } else {
            if (onComplete) onComplete();
        }
    }

    collectItem(item, onComplete) {
        item.collected = true;
        const scene = this.scene;
        const containerSprite = this.containerSprite;
        const baseScaleX = containerSprite.scaleX;
        const baseScaleY = containerSprite.scaleY;
        const effect = this.config.interactions?.onWordComplete?.effect;
        const self = this;

        // 1. Animation tại chỗ: Phóng to trước, sau đó mới bay lên và fade out khi được một nửa quãng đường
        const startScaleX = item.sprite.scaleX;
        const startScaleY = item.sprite.scaleY;
        const startY = item.sprite.y;

        scene.tweens.add({
            targets: item.sprite,
            scaleX: startScaleX * 2.2,
            scaleY: startScaleY * 2.2,
            duration: 250,
            ease: 'Back.easeOut',
            onComplete: () => {
                if (!self.scene) return;

                // Tween bay lên (y giảm 60px trong 400ms)
                scene.tweens.add({
                    targets: item.sprite,
                    y: startY - 60,
                    duration: 400,
                    ease: 'Quad.easeOut',
                    onComplete: () => {
                        if (!self.scene) return;
                        item.sprite.setVisible(false);

                        // 2. Animation đưa đồ vào giỏ: Rơi đúng đồ vật đó từ trên trời xuống giỏ (chạy sau khi animation 1 kết thúc)
                        const dropItem = new Phaser.GameObjects.Sprite(scene, containerSprite.x, containerSprite.y - 180, item.sprite.texture.key);
                        self.addAt(dropItem, 0);

                        if (item.sprite.displayWidth && item.sprite.displayHeight) {
                            dropItem.setDisplaySize(item.sprite.displayWidth * 0.8, item.sprite.displayHeight * 0.8);
                        } else {
                            dropItem.setScale(0.6);
                        }

                        scene.tweens.add({
                            targets: dropItem,
                            y: containerSprite.y,
                            duration: 450,
                            ease: 'Cubic.easeIn',
                            onComplete: () => {
                                if (dropItem) {
                                    scene.tweens.add({
                                        targets: dropItem,
                                        scaleX: 0,
                                        scaleY: 0,
                                        alpha: 0,
                                        duration: 150,
                                        onComplete: () => {
                                            dropItem.destroy();
                                            if (onComplete) onComplete();
                                        }
                                    });
                                } else {
                                    if (onComplete) onComplete();
                                }

                                if (!self.scene) return;

                                // Hiệu ứng giỏ đồ nảy lên nhẹ khi nhận được đồ
                                scene.tweens.add({
                                    targets: containerSprite,
                                    scaleX: baseScaleX * 1.2,
                                    scaleY: baseScaleY * 1.2,
                                    duration: 100,
                                    yoyo: true,
                                    ease: 'Quad.easeOut'
                                });

                                // Chạy hiệu ứng lấp lánh (nếu có yêu cầu từ config)
                                if (effect === 'sparkle') {
                                    self.showSparkle(containerSprite.x, containerSprite.y);
                                }
                            }
                        });
                    }
                });

                // Tween fade out (bắt đầu sau 200ms của chặng bay 400ms)
                scene.tweens.add({
                    targets: item.sprite,
                    alpha: 0,
                    delay: 200,
                    duration: 200,
                    ease: 'Linear'
                });
            }
        });
    }

    onTypeError(char) {
        // Gõ sai -> Rung lắc các vật phẩm chưa được thu thập
        this.itemsList.forEach(item => {
            if (!item.collected) {
                this.scene.tweens.add({
                    targets: item.sprite,
                    x: item.sprite.x + Phaser.Math.Between(-8, 8),
                    duration: 50,
                    yoyo: true,
                    repeat: 2,
                    onComplete: () => {
                        item.sprite.x = item.startX;
                        item.sprite.angle = item.startAngle || 0;
                    }
                });
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

        // Hiệu ứng chớp đỏ nhẹ trên giỏ đồ (nếu cấu hình yêu cầu)
        if (this.config.interactions?.onTypeError?.effect === 'red_flash') {
            this.containerSprite.setTint(0xff8888);
            this.scene.time.delayedCall(150, () => {
                if (this.containerSprite) {
                    this.containerSprite.clearTint();
                }
            });
        }
    }

    destroy(fromScene) {
        this.monkeySprite = null;
        this.playerContainer = null;
        super.destroy(fromScene);
    }

    showSparkle(x, y) {
        const particles = this.scene.add.graphics().setDepth(120);
        const colors = [0xFBBF24, 0x34D399, 0x60A5FA, 0xF472B6];

        for (let i = 0; i < 8; i++) {
            const color = Phaser.Math.RND.pick(colors);
            const angle = Phaser.Math.DegToRad(i * 45);
            const speed = Phaser.Math.Between(40, 90);

            particles.fillStyle(color, 1);
            particles.fillCircle(x, y, Phaser.Math.Between(3, 6));

            const px = x;
            const py = y;

            this.scene.tweens.add({
                targets: particles,
                alpha: 0,
                duration: 400,
                onUpdate: (tween, target) => {
                    const progress = tween.progress;
                    particles.clear();
                    particles.fillStyle(color, 1 - progress);
                    const dist = speed * progress;
                    particles.fillCircle(px + Math.cos(angle) * dist, py + Math.sin(angle) * dist, Phaser.Math.Between(3, 6) * (1 - progress));
                },
                onComplete: () => particles.destroy()
            });
        }
    }
}
