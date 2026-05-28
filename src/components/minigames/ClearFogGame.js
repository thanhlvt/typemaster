import { BaseMinigame } from './BaseMinigame';

export class ClearFogGame extends BaseMinigame {
    constructor(scene, config) {
        super(scene, config);
        this.fogsList = [];
        this.treasureSprite = null;
    }

    create() {
        const treasureEmoji = this.config?.treasureEmoji || '🏰'; // 🏰, 👑, 💎
        const fogEmoji = this.config?.fogEmoji || '🌫️'; // 🌫️, ☁️
        const count = this.totalWords || 8;
        const x = this.config?.x || 400;
        const y = this.config?.y || 220;

        const treasureKey = this.createEmojiTexture('clear_treasure_tex', treasureEmoji, 80);
        const fogKey = this.createEmojiTexture('clear_fog_tex', fogEmoji, 80);

        // 1. Tạo báu vật/lâu đài ẩn giấu làm trung tâm
        this.treasureSprite = this.scene.add.sprite(x, y, treasureKey)
            .setDepth(110)
            .setScale(1.5);
        this.add(this.treasureSprite);

        // Cho báu vật phát hào quang lấp lánh nhẹ bằng tween alpha
        this.scene.tweens.add({
            targets: this.treasureSprite,
            alpha: 0.7,
            duration: 1500,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });

        // 2. Tạo các đám sương mù phủ ngẫu nhiên xung quanh báu vật
        for (let i = 0; i < count; i++) {
            const rx = x + Phaser.Math.Between(-80, 80);
            const ry = y + Phaser.Math.Between(-50, 50);

            const fogSprite = this.scene.add.sprite(rx, ry, fogKey)
                .setDepth(112)
                .setScale(Phaser.Math.FloatBetween(1.2, 1.8))
                .setAlpha(0.95);
            this.add(fogSprite);

            // Cho mây sương mù bay dập dình nhẹ
            this.scene.tweens.add({
                targets: fogSprite,
                x: rx + Phaser.Math.Between(-10, 10),
                y: ry + Phaser.Math.Between(-10, 10),
                duration: Phaser.Math.Between(1500, 3000),
                yoyo: true,
                repeat: -1,
                ease: 'Sine.easeInOut'
            });

            this.fogsList.push({
                sprite: fogSprite,
                cleared: false,
                homeX: rx,
                homeY: ry
            });
        }
    }

    onWordComplete(word, currentWordIndex, totalWords) {
        const uncleared = this.fogsList.filter(f => !f.cleared);
        if (uncleared.length > 0) {
            const targetFog = uncleared[0];
            targetFog.cleared = true;

            const scene = this.scene;
            const x = this.config?.x || 400;
            const y = this.config?.y || 220;

            // Dừng tween bay nhẹ cũ
            scene.tweens.killTweensOf(targetFog.sprite);

            // Cho sương mù bay dạt ra ngoài rìa và mờ dần
            const angle = Math.atan2(targetFog.sprite.y - y, targetFog.sprite.x - x);
            const targetX = targetFog.sprite.x + Math.cos(angle) * 200;
            const targetY = targetFog.sprite.y + Math.sin(angle) * 150;

            scene.tweens.add({
                targets: targetFog.sprite,
                x: targetX,
                y: targetY,
                alpha: 0,
                scaleX: 0.5,
                scaleY: 0.5,
                duration: 600,
                ease: 'Quad.easeOut',
                onComplete: () => {
                    targetFog.sprite.setVisible(false);
                }
            });

            // Nếu đã xua tan toàn bộ sương mù -> báu vật bừng sáng
            if (currentWordIndex >= totalWords) {
                scene.tweens.killTweensOf(this.treasureSprite);
                scene.tweens.add({
                    targets: this.treasureSprite,
                    scaleX: 2.0,
                    scaleY: 2.0,
                    alpha: 1.0,
                    duration: 500,
                    ease: 'Back.easeOut'
                });
            }
        }
    }

    onTypeError(char) {
        // Gõ sai -> Các đám sương mù tối sầm lại cảnh báo
        this.fogsList.forEach(fog => {
            if (!fog.cleared) {
                fog.sprite.setTint(0x666666);
                this.scene.time.delayedCall(200, () => {
                    fog.sprite.clearTint();
                });
            }
        });
    }
}
