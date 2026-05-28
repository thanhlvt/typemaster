import { BaseMinigame } from './BaseMinigame';
import { getChapterForLesson, getGroupForChapter } from '../../data/chapters';

export class RacingGame extends BaseMinigame {
    constructor(scene, config) {
        super(scene, config);
        this.enemyTween = null;
        this.playerX = 0;
        this.enemyX = 0;
    }

    create() {
        const { playerVehicle, enemyVehicle, track } = this.config;
        const { startX, endX, playerY, enemyY } = track;
        this.startX = startX;
        this.endX = endX;
        this.playerY = playerY;
        this.enemyY = enemyY;

        // 1. Vẽ đường đua (Graphics)
        this.trackGraphics = this.scene.add.graphics().setDepth(105);
        this.add(this.trackGraphics);

        // Vẽ 2 làn đường màu xám đậm
        this.trackGraphics.fillStyle(0x334155, 1);
        this.trackGraphics.fillRoundedRect(startX - 20, playerY - 30, (endX - startX) + 60, 60, 10);
        this.trackGraphics.fillRoundedRect(startX - 20, enemyY - 30, (endX - startX) + 60, 60, 10);

        // Vẽ các vạch đứt khúc màu trắng phân làn
        this.trackGraphics.lineStyle(2, 0xffffff, 0.6);
        const segmentLength = 15;
        const gap = 10;
        for (let x = startX - 10; x < endX + 30; x += segmentLength + gap) {
            this.trackGraphics.lineBetween(x, playerY, x + segmentLength, playerY);
            this.trackGraphics.lineBetween(x, enemyY, x + segmentLength, enemyY);
        }

        // Vẽ Cờ Đích (Checkered Flag) bằng emoji
        const flagKey = this.createEmojiTexture('finish_flag', '🏁', 48);
        this.flagSprite = this.scene.add.sprite(endX + 30, (playerY + enemyY) / 2, flagKey)
            .setScale(1)
            .setDepth(106);
        this.add(this.flagSprite);

        // 2. Tạo Phương tiện của Người chơi (Khỉ + Xe)
        const playerVehicleKey = playerVehicle.emoji
            ? this.createEmojiTexture(playerVehicle.texture, playerVehicle.emoji, 56)
            : playerVehicle.texture;

        this.playerContainer = this.scene.add.container(startX, playerY).setDepth(110);
        
        // Sprite Xe
        this.playerVehicleSprite = this.scene.add.sprite(0, 0, playerVehicleKey).setScale(0.85);
        this.playerContainer.add(this.playerVehicleSprite);

        // Lấy avatar Khỉ hiện tại đặt lên xe
        const monkeySkin = this.scene.monkey?.texture?.key || 'monkey_1';
        this.playerDriverSprite = this.scene.add.sprite(-10, -22, monkeySkin)
            .setScale(0.18)
            .setOrigin(0.5);
        this.playerContainer.add(this.playerDriverSprite);
        this.add(this.playerContainer);

        // 3. Tạo Phương tiện của Đối thủ (Boss + Xe)
        const enemyVehicleKey = enemyVehicle.emoji
            ? this.createEmojiTexture(enemyVehicle.texture, enemyVehicle.emoji, 56)
            : enemyVehicle.texture;

        this.enemyContainer = this.scene.add.container(startX, enemyY).setDepth(110);

        // Sprite Xe Boss
        this.enemyVehicleSprite = this.scene.add.sprite(0, 0, enemyVehicleKey).setScale(0.85);
        this.enemyContainer.add(this.enemyVehicleSprite);

        // Lấy Sprite Boss của group chương hiện tại đặt lên xe
        const chapter = getChapterForLesson(this.scene.currentLessonIndex);
        const group = getGroupForChapter(chapter);
        const bossTexture = `boss_${group ? group.id : 1}`;

        this.enemyDriverSprite = this.scene.add.sprite(-10, -22, bossTexture)
            .setScale(0.18)
            .setOrigin(0.5);
        this.enemyContainer.add(this.enemyDriverSprite);
        this.add(this.enemyContainer);

        // Lưu vị trí hiện tại
        this.playerX = startX;
        this.enemyX = startX;

        // Khởi động hành trình tự động của Boss (di chuyển đều đặn theo thời gian)
        // Ước tính Boss sẽ chạy về đích trong khoảng 25-35 giây (hoặc điều chỉnh theo bài học)
        this.startEnemyAutoDrive();
    }

    startEnemyAutoDrive() {
        // Boss di chuyển từ từ về đích độc lập
        // Thời gian Boss về đích phụ thuộc vào tổng số từ (để tạo áp lực vừa phải cho trẻ)
        const duration = Math.max(15000, (this.totalWords || 10) * 4500);
        const enemyContainer = this.enemyContainer;
        const self = this;

        this.enemyTween = this.scene.tweens.add({
            targets: enemyContainer,
            x: this.endX,
            duration: duration,
            ease: 'Linear',
            onUpdate: () => {
                self.enemyX = enemyContainer.x;
            }
        });
    }

    onWordComplete(word, currentWordIndex, totalWords, onComplete) {
        // Tính toán vị trí X mới của người chơi dựa trên tiến độ gõ
        const progress = currentWordIndex / totalWords;
        const targetX = this.startX + progress * (this.endX - this.startX);
        const playerContainer = this.playerContainer;
        const playerVehicleSprite = this.playerVehicleSprite;
        const scene = this.scene;
        const self = this;

        // Chạy tween di chuyển xe của người chơi về trước
        scene.tweens.add({
            targets: playerContainer,
            x: targetX,
            duration: 350,
            ease: 'Quad.easeOut',
            onUpdate: () => {
                if (self.scene) {
                    self.playerX = playerContainer.x;
                }
            },
            onComplete: () => {
                if (!self.scene) return;
                // Nhấp nháy lửa ga khi tăng tốc
                playerVehicleSprite.setTint(0xffd700);
                scene.time.delayedCall(100, () => {
                    if (self.scene) {
                        playerVehicleSprite.clearTint();
                        if (onComplete) onComplete();
                    }
                });
            }
        });
    }

    onTypeError(char) {
        const startX = this.startX;
        const playerContainer = this.playerContainer;
        const self = this;
        // Gõ sai -> Xe giật nhẹ và ra khói nếu có cấu hình
        this.scene.tweens.add({
            targets: playerContainer,
            x: playerContainer.x - 15,
            duration: 100,
            yoyo: true,
            ease: 'Bounce.easeOut',
            onComplete: () => {
                if (!self.scene) return;
                // Giới hạn không lùi quá vạch xuất phát
                if (playerContainer.x < startX) {
                    playerContainer.x = startX;
                }
                self.playerX = playerContainer.x;
            }
        });

        if (this.config.interactions?.onTypeError?.effect === 'smoke') {
            this.emitSmoke(playerContainer.x - 30, this.playerY);
        }
    }

    emitSmoke(x, y) {
        const scene = this.scene;
        const smoke = scene.add.graphics().setDepth(108);
        smoke.fillStyle(0x94a3b8, 0.7);
        smoke.fillCircle(x, y, 8);

        scene.tweens.add({
            targets: smoke,
            x: x - Phaser.Math.Between(20, 40),
            y: y - Phaser.Math.Between(10, 20),
            scale: 1.8,
            alpha: 0,
            duration: 500,
            onUpdate: (tween, target) => {
                if (!scene.sys) return; // Nếu scene đã bị huỷ
                smoke.clear();
                smoke.fillStyle(0x94a3b8, 0.7 * (1 - tween.progress));
                smoke.fillCircle(target.x, target.y, 8);
            },
            onComplete: () => {
                if (scene.sys) {
                    smoke.destroy();
                }
            }
        });
    }

    destroy(fromScene) {
        if (this.enemyTween) {
            this.enemyTween.stop();
        }
        super.destroy(fromScene);
    }
}
