import { BaseMinigame } from './BaseMinigame';
import { showBananaDrop } from '../../utils/PlayScorePopup';
import * as Phaser from 'phaser';

export class RescueAnimalsGame extends BaseMinigame {
    constructor(scene, config) {
        super(scene, config);
        this.animalSprite = null;
        this.cageSprite = null;
        this.maskGraphics = null;
        this.cageProgress = 0;
        this.monkeySprite = null;
        this.playerContainer = null;
    }

    create() {
        const animalConfig = this.config?.animal || {};

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
        const cageConfig = this.config?.cage || {};

        const animalEmoji = animalConfig.emoji || this.config?.animalEmoji || '🐰';
        const cageEmoji = cageConfig.emoji || this.config?.cageEmoji || '📦';
        const x = this.config?.x || 400;
        const y = this.config?.y || 250;

        const animalTex = animalConfig.texture || this.config?.animalTexture || 'rescue_animal_tex';
        const cageTex = cageConfig.texture || this.config?.cageTexture || 'rescue_cage_tex';

        // 1. Tạo texture từ cache hoặc emoji
        const animalKey = this.scene.textures.exists(animalTex)
            ? animalTex
            : (animalEmoji ? this.createEmojiTexture(animalTex, animalEmoji, 64) : animalTex);

        const cageKey = this.scene.textures.exists(cageTex)
            ? cageTex
            : (cageEmoji ? this.createEmojiTexture(cageTex, cageEmoji, 72) : cageTex);

        // 2. Phân tích tỉ lệ scale cấu hình
        this.animalScaleX = animalConfig.scaleX !== undefined ? animalConfig.scaleX
            : (animalConfig.scale !== undefined ? animalConfig.scale
                : (this.config?.animalScaleX !== undefined ? this.config.animalScaleX
                    : (this.config?.animalScale !== undefined ? this.config.animalScale : 1.2)));

        this.animalScaleY = animalConfig.scaleY !== undefined ? animalConfig.scaleY
            : (animalConfig.scale !== undefined ? animalConfig.scale
                : (this.config?.animalScaleY !== undefined ? this.config.animalScaleY
                    : (this.config?.animalScale !== undefined ? this.config.animalScale : 1.2)));

        this.cageScaleX = cageConfig.scaleX !== undefined ? cageConfig.scaleX
            : (cageConfig.scale !== undefined ? cageConfig.scale
                : (this.config?.cageScaleX !== undefined ? this.config.cageScaleX
                    : (this.config?.cageScale !== undefined ? this.config.cageScale : 1.3)));

        this.cageScaleY = cageConfig.scaleY !== undefined ? cageConfig.scaleY
            : (cageConfig.scale !== undefined ? cageConfig.scale
                : (this.config?.cageScaleY !== undefined ? this.config.cageScaleY
                    : (this.config?.cageScale !== undefined ? this.config.cageScale : 1.3)));

        // 3. Tạo con thú ẩn ở trong
        this.animalSprite = this.scene.add.sprite(x, y + 10, animalKey)
            .setDepth(111);
        this.animalSprite.setScale(this.animalScaleX, this.animalScaleY);
        this.add(this.animalSprite);

        // 4. Tạo chiếc lồng đè lên ngoài
        this.cageSprite = this.scene.add.sprite(x, y, cageKey)
            .setDepth(112);
        this.cageSprite.setScale(this.cageScaleX, this.cageScaleY);
        this.add(this.cageSprite);

        // 5. Khởi tạo mặt nạ hình học (Geometry Mask) cho chiếc lồng
        this.cageProgress = 0;
        this.maskGraphics = this.scene.make.graphics();
        this.updateMask();

        const mask = this.maskGraphics.createGeometryMask();
        this.cageSprite.setMask(mask);
    }

    updateMask() {
        if (!this.maskGraphics || !this.cageSprite) return;

        this.maskGraphics.clear();
        this.maskGraphics.fillStyle(0xffffff);

        const width = this.cageSprite.width * this.cageScaleX;
        const height = this.cageSprite.height * this.cageScaleY;

        // Vị trí vẽ dựa theo tọa độ x, y hiện tại của lồng (để hỗ trợ hiệu ứng rung lắc)
        const startX = this.cageSprite.x - width / 2;
        const startY = this.cageSprite.y - height / 2;

        const remainingHeight = height * (1 - this.cageProgress);
        const offset = height * this.cageProgress;

        this.maskGraphics.fillRect(startX, startY + offset, width, remainingHeight);
    }

    onWordComplete(word, currentWordIndex, totalWords) {
        const progress = currentWordIndex / totalWords;

        // Thả quả chuối rơi xuống khỉ con tương tự khi chơi không có minigame
        if (this.monkeySprite) {
            showBananaDrop(this.scene, this.monkeySprite);
        }
        const self = this;
        const startX = this.config?.x || 400;

        // 1. Rung lắc nhẹ chiếc lồng và cập nhật vị trí mask theo lồng
        this.scene.tweens.add({
            targets: this.cageSprite,
            x: startX + Phaser.Math.Between(-5, 5),
            duration: 75,
            yoyo: true,
            repeat: 1,
            onUpdate: () => {
                self.updateMask();
            },
            onComplete: () => {
                if (self.cageSprite) {
                    self.cageSprite.x = startX;
                    self.updateMask();
                }
            }
        });

        // 2. Làm lồng biến mất từ trên xuống dưới bằng cách tăng cageProgress
        this.scene.tweens.add({
            targets: this,
            cageProgress: progress,
            duration: 250,
            onUpdate: () => {
                self.updateMask();
            },
            onComplete: () => {
                if (!self.scene) return;

                // Nếu đã giải cứu thành công (đủ chữ)
                if (currentWordIndex >= totalWords) {
                    self.cageSprite.setVisible(false);
                    // Hiệu ứng con thú nhảy nhót vui sướng
                    self.scene.tweens.add({
                        targets: self.animalSprite,
                        y: self.animalSprite.y - 80,
                        scaleX: self.animalScaleX * 1.25,
                        scaleY: self.animalScaleY * 1.25,
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
        // Gõ sai -> Chiếc lồng rung lắc mạnh cảnh báo
        const x = this.config?.x || 400;
        const self = this;
        this.scene.tweens.add({
            targets: this.cageSprite,
            x: this.cageSprite.x + Phaser.Math.Between(-8, 8),
            duration: 50,
            yoyo: true,
            repeat: 2,
            onUpdate: () => {
                self.updateMask();
            },
            onComplete: () => {
                if (self.cageSprite) {
                    self.cageSprite.x = x;
                    self.updateMask();
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
        if (this.maskGraphics) {
            this.maskGraphics.destroy();
            this.maskGraphics = null;
        }
        this.monkeySprite = null;
        this.playerContainer = null;
        super.destroy();
    }
}
