import { BaseMinigame } from './BaseMinigame';
import { getChapterForLesson, getGroupForChapter } from '../../data/chapters';

export class RacingGame extends BaseMinigame {
    constructor(scene, config) {
        super(scene, config);
        this.playerX = 0;
        this.enemyX = 0;
        this.playerProgress = 0; // Tiến độ của người chơi (0 đến 1)
        this.bossProgress = 0;   // Tiến độ của boss (0 đến 1)
        this.skipSuccessJump = true; // Bỏ qua tween nhảy thẳng đứng trong PlayScene để xe di chuyển ngang mượt mà
    }

    create() {
        const { playerVehicle, enemyVehicle, track } = this.config;
        const vehicleOver = this.config.vehicleOver !== false; // Mặc định vehicleOver = true
        const { startX, endX, playerY, enemyY } = track;
        this.startX = startX;
        this.endX = endX;
        this.playerY = playerY;
        this.enemyY = enemyY;

        // Lấy các thuộc tính căn chỉnh và offset cấu hình
        this.playerVehicleOffsetX = playerVehicle.vehicleOffsetX !== undefined ? playerVehicle.vehicleOffsetX : 0;
        this.playerVehicleOffsetY = playerVehicle.vehicleOffsetY !== undefined ? playerVehicle.vehicleOffsetY : 0;
        this.enemyVehicleOffsetX = enemyVehicle.vehicleOffsetX !== undefined ? enemyVehicle.vehicleOffsetX : 0;
        this.enemyVehicleOffsetY = enemyVehicle.vehicleOffsetY !== undefined ? enemyVehicle.vehicleOffsetY : 0;
        this.laneHeight = track.height !== undefined ? track.height : 60;

        // 1. Vẽ đường đua (Graphics)
        this.trackGraphics = this.scene.add.graphics().setDepth(105);
        this.add(this.trackGraphics);

        const trackType = track.type || 'road';

        // Làn đường của Player và Enemy
        [playerY, enemyY].forEach(y => {
            const laneTop = y - this.laneHeight / 2;
            if (trackType === 'water') {
                // Đường nước: Màu xanh dương của nước biển
                this.trackGraphics.fillStyle(0x1d4ed8, 0.85);
                this.trackGraphics.fillRoundedRect(startX - 20, laneTop, (endX - startX) + 60, this.laneHeight, 10);

                // Viền bọt sóng màu xanh nhạt
                this.trackGraphics.lineStyle(3, 0x38bdf8, 0.6);
                this.trackGraphics.strokeRoundedRect(startX - 20, laneTop, (endX - startX) + 60, this.laneHeight, 10);

                // Vẽ các gợn sóng màu trắng/cyan nhạt bằng nét vẽ hình sin
                this.trackGraphics.lineStyle(2, 0xe0f2fe, 0.7);
                const waveLength = 20;
                const waveGap = 15;
                const amplitude = 4;
                const frequency = 0.3;

                for (let startXVal = startX - 10; startXVal < endX + 30; startXVal += waveLength + waveGap) {
                    this.trackGraphics.beginPath();
                    this.trackGraphics.moveTo(startXVal, y);
                    for (let px = 0; px <= waveLength; px += 2) {
                        const py = y + Math.sin(px * frequency) * amplitude;
                        this.trackGraphics.lineTo(startXVal + px, py);
                    }
                    this.trackGraphics.strokePath();
                }
            } else if (trackType === 'air') {
                // Đường trên không: Màu tím vũ trụ mờ ảo pha neon
                this.trackGraphics.fillStyle(0x581c87, 0.8);
                this.trackGraphics.fillRoundedRect(startX - 20, laneTop, (endX - startX) + 60, this.laneHeight, 10);

                // Viền phát sáng màu hồng neon
                this.trackGraphics.lineStyle(3, 0xf472b6, 0.75);
                this.trackGraphics.strokeRoundedRect(startX - 20, laneTop, (endX - startX) + 60, this.laneHeight, 10);

                // Vẽ các chấm tròn phát sáng màu vàng nhạt
                this.trackGraphics.fillStyle(0xfef08a, 0.9);
                const dotGap = 25;
                for (let x = startX - 10; x < endX + 30; x += dotGap) {
                    this.trackGraphics.fillCircle(x, y, 4);
                }
            } else {
                // Đường bộ (road): Mặc định là nhựa đường xám và vạch trắng đứt quãng
                this.trackGraphics.fillStyle(0x334155, 1);
                this.trackGraphics.fillRoundedRect(startX - 20, laneTop, (endX - startX) + 60, this.laneHeight, 10);

                // Viền xám nhạt
                this.trackGraphics.lineStyle(2, 0x64748b, 0.5);
                this.trackGraphics.strokeRoundedRect(startX - 20, laneTop, (endX - startX) + 60, this.laneHeight, 10);

                // Các vạch đứt khúc màu trắng phân làn
                this.trackGraphics.lineStyle(2, 0xffffff, 0.6);
                const segmentLength = 15;
                const gap = 10;
                for (let x = startX - 10; x < endX + 30; x += segmentLength + gap) {
                    this.trackGraphics.lineBetween(x, y, x + segmentLength, y);
                }
            }
        });

        // Vẽ Vạch Đích Caro (Checkered finish line) có chiều cao bằng chiều cao đường đua (this.laneHeight)
        [playerY, enemyY].forEach(y => {
            const fx = endX;
            const fyStart = y - this.laneHeight / 2;
            const barWidth = 16;
            const barHeight = this.laneHeight;

            // Vẽ nền màu trắng cho vạch đích
            this.trackGraphics.fillStyle(0xffffff, 1);
            this.trackGraphics.fillRect(fx, fyStart, barWidth, barHeight);

            // Vẽ các ô vuông màu đen xen kẽ (chia chiều cao làm 6 hàng ô vuông)
            this.trackGraphics.fillStyle(0x000000, 1);
            const sqWidth = 8;
            const sqHeight = this.laneHeight / 6;
            for (let col = 0; col < 2; col++) {
                for (let row = 0; row < 6; row++) {
                    if ((col + row) % 2 === 1) {
                        this.trackGraphics.fillRect(fx + col * sqWidth, fyStart + row * sqHeight, sqWidth, sqHeight);
                    }
                }
            }
        });

        // Vẽ Cờ Đích (Checkered Flag) bằng emoji treo phía trên vạch đích để đánh dấu
        const flagKey = this.createEmojiTexture('finish_flag', '🏁', 36);
        const flagYOffset = this.laneHeight / 2 + 15;

        this.playerFlagSprite = this.scene.add.sprite(endX + 8, playerY - flagYOffset, flagKey)
            .setScale(0.8)
            .setDepth(106);
        this.add(this.playerFlagSprite);

        this.enemyFlagSprite = this.scene.add.sprite(endX + 8, enemyY - flagYOffset, flagKey)
            .setScale(0.8)
            .setDepth(106);
        this.add(this.enemyFlagSprite);

        // 2. Tạo Phương tiện của Người chơi (Khỉ + Xe)
        const defPlayerTex = playerVehicle.texture || 'car_monkey';
        const playerVehicleKey = playerVehicle.image
            ? 'racing_player_vehicle_' + playerVehicle.image.replace(/[^a-zA-Z0-9]/g, '_')
            : (playerVehicle.emoji ? this.createEmojiTexture(defPlayerTex, playerVehicle.emoji, 56) : defPlayerTex);

        this.playerContainer = this.scene.add.container(startX + this.playerVehicleOffsetX, playerY + this.playerVehicleOffsetY).setDepth(110);

        // Tạo người lái (Khỉ)
        const monkeySkin = this.scene.monkey?.texture?.key || 'monkey_1';
        const pDriverOX = playerVehicle.driverOffsetX !== undefined ? playerVehicle.driverOffsetX : -10;
        const pDriverOY = playerVehicle.driverOffsetY !== undefined ? playerVehicle.driverOffsetY : -22;
        const pDriverScale = playerVehicle.driverScale !== undefined ? playerVehicle.driverScale : 0.18;

        this.playerDriverSprite = this.scene.add.sprite(pDriverOX, pDriverOY, monkeySkin)
            .setScale(pDriverScale)
            .setOrigin(0.5);
        if (playerVehicle.driverFlipX !== undefined) {
            this.playerDriverSprite.setFlipX(playerVehicle.driverFlipX);
        }

        // Tạo Xe
        const pVehicleScale = playerVehicle.scale !== undefined ? playerVehicle.scale : 0.85;
        this.playerVehicleSprite = this.scene.add.sprite(0, 0, playerVehicleKey)
            .setScale(pVehicleScale);
        if (playerVehicle.flipX !== undefined) {
            this.playerVehicleSprite.setFlipX(playerVehicle.flipX);
        }

        if (vehicleOver) {
            this.playerDriverSprite.setDepth(111);
            this.playerVehicleSprite.setDepth(112);
            this.playerContainer.add(this.playerDriverSprite);
            this.playerContainer.add(this.playerVehicleSprite);
        } else {
            this.playerDriverSprite.setDepth(112);
            this.playerVehicleSprite.setDepth(111);
            this.playerContainer.add(this.playerVehicleSprite);
            this.playerContainer.add(this.playerDriverSprite);
        }

        this.add(this.playerContainer);

        // 3. Tạo Phương tiện của Đối thủ (Boss + Xe)
        const defEnemyTex = enemyVehicle.texture || 'car_boss';
        const enemyVehicleKey = enemyVehicle.image
            ? 'racing_enemy_vehicle_' + enemyVehicle.image.replace(/[^a-zA-Z0-9]/g, '_')
            : (enemyVehicle.emoji ? this.createEmojiTexture(defEnemyTex, enemyVehicle.emoji, 56) : defEnemyTex);

        this.enemyContainer = this.scene.add.container(startX + this.enemyVehicleOffsetX, enemyY + this.enemyVehicleOffsetY).setDepth(110);

        // Lấy Sprite Boss của group chương hiện tại
        const chapter = getChapterForLesson(this.scene.currentLessonIndex);
        const group = getGroupForChapter(chapter);
        const bossTexture = `boss_${group ? group.id : 1}`;

        // Tạo boss
        const eDriverOX = enemyVehicle.driverOffsetX !== undefined ? enemyVehicle.driverOffsetX : -10;
        const eDriverOY = enemyVehicle.driverOffsetY !== undefined ? enemyVehicle.driverOffsetY : -22;
        const eDriverScale = enemyVehicle.driverScale !== undefined ? enemyVehicle.driverScale : 0.18;

        this.enemyDriverSprite = this.scene.add.sprite(eDriverOX, eDriverOY, bossTexture)
            .setScale(eDriverScale)
            .setOrigin(0.5);
        if (enemyVehicle.driverFlipX !== undefined) {
            this.enemyDriverSprite.setFlipX(enemyVehicle.driverFlipX);
        }

        // Tạo Xe Boss
        const eVehicleScale = enemyVehicle.scale !== undefined ? enemyVehicle.scale : 0.85;
        this.enemyVehicleSprite = this.scene.add.sprite(0, 0, enemyVehicleKey)
            .setScale(eVehicleScale);
        if (enemyVehicle.flipX !== undefined) {
            this.enemyVehicleSprite.setFlipX(enemyVehicle.flipX);
        }

        if (vehicleOver) {
            this.enemyDriverSprite.setDepth(111);
            this.enemyVehicleSprite.setDepth(112);
            this.enemyContainer.add(this.enemyDriverSprite);
            this.enemyContainer.add(this.enemyVehicleSprite);
        } else {
            this.enemyDriverSprite.setDepth(112);
            this.enemyVehicleSprite.setDepth(111);
            this.enemyContainer.add(this.enemyVehicleSprite);
            this.enemyContainer.add(this.enemyDriverSprite);
        }

        this.add(this.enemyContainer);

        // Lưu vị trí hiện tại
        this.playerX = startX + this.playerVehicleOffsetX;
        this.enemyX = startX + this.enemyVehicleOffsetX;

        // 4. Tạo hiệu ứng rung lắc nhấp nhô (Idle Engine Vibration) để mô phỏng động cơ đang nổ máy
        this.scene.tweens.add({
            targets: this.playerVehicleSprite,
            y: this.playerVehicleSprite.y + 1.2,
            duration: 120 + Phaser.Math.Between(-15, 15),
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });

        this.scene.tweens.add({
            targets: this.playerDriverSprite,
            y: this.playerDriverSprite.y + 1.5,
            duration: 140 + Phaser.Math.Between(-15, 15),
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });

        this.scene.tweens.add({
            targets: this.enemyVehicleSprite,
            y: this.enemyVehicleSprite.y + 1.2,
            duration: 130 + Phaser.Math.Between(-15, 15),
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });

        this.scene.tweens.add({
            targets: this.enemyDriverSprite,
            y: this.enemyDriverSprite.y + 1.5,
            duration: 150 + Phaser.Math.Between(-15, 15),
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });
    }

    animateVehicles(duration = 350, onCompleteCallback = null) {
        const playerTargetX = (this.startX + this.playerVehicleOffsetX) + this.playerProgress * (this.endX - this.startX);
        const bossTargetX = (this.startX + this.enemyVehicleOffsetX) + this.bossProgress * (this.endX - this.startX);
        const scene = this.scene;
        const self = this;

        // Tween di chuyển xe người chơi
        scene.tweens.add({
            targets: this.playerContainer,
            x: playerTargetX,
            duration: duration,
            ease: 'Quad.easeOut',
            onUpdate: () => {
                if (self.scene) {
                    self.playerX = self.playerContainer.x;
                }
            },
            onComplete: () => {
                if (!self.scene) return;

                // Nhấp nháy lửa ga khi tăng tốc
                self.playerVehicleSprite.setTint(0xffd700);
                scene.time.delayedCall(100, () => {
                    if (self.scene) {
                        self.playerVehicleSprite.clearTint();
                        if (onCompleteCallback) onCompleteCallback();
                    }
                });
            }
        });

        // Tween di chuyển xe boss
        scene.tweens.add({
            targets: this.enemyContainer,
            x: bossTargetX,
            duration: duration,
            ease: 'Quad.easeOut',
            onUpdate: () => {
                if (self.scene) {
                    self.enemyX = self.enemyContainer.x;
                }
            }
        });
    }

    onWordComplete(word, currentWordIndex, totalWords, onComplete) {
        // Cập nhật tiến độ của người chơi
        this.playerProgress = currentWordIndex / totalWords;

        // Khi gõ đúng, boss cũng di chuyển nhưng rất chậm (20% tốc độ thông thường)
        this.bossProgress = Math.min(this.bossProgress + (1 / totalWords) * 0.2, 1.0);

        this.animateVehicles(350, onComplete);
    }

    onTypeError(char) {
        const totalWords = this.totalWords || 10;

        // Khi gõ sai, boss sẽ được di chuyển lên trước (tăng thêm 40% của một bước tiến, giới hạn ở đích)
        this.bossProgress = Math.min(this.bossProgress + (1 / totalWords) * 0.4, 1.0);

        // Người chơi bị giật lùi lại phía sau (giảm 30% của một bước tiến, giới hạn ở vạch xuất phát)
        this.playerProgress = Math.max(this.playerProgress - (1 / totalWords) * 0.3, 0.0);

        this.animateVehicles(250);

        this.emitSmoke(this.playerContainer.x - 30, this.playerY + this.playerVehicleOffsetY);
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
                if (!scene.sys) return;
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
        super.destroy(fromScene);
    }
}
