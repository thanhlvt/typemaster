import { BaseMinigame } from './BaseMinigame';
import * as Phaser from 'phaser';

export class ClearFogGame extends BaseMinigame {
    constructor(scene, config) {
        super(scene, config);
        this.fogsList = [];
    }

    create() {
        const fogEmoji = this.config?.fogEmoji || '🌫️';
        const count = this.totalWords || 8;

        const fogKey = this.createEmojiTexture('clear_fog_tex', fogEmoji, 80);

        // 1. Xác định vùng không gian rải sương mù x1, y1, x2, y2
        const x1 = this.config?.x1 !== undefined ? this.config.x1 
            : (this.config?.area?.x1 !== undefined ? this.config.area.x1 : 320);
        
        const y1 = this.config?.y1 !== undefined ? this.config.y1 
            : (this.config?.area?.y1 !== undefined ? this.config.area.y1 : 170);

        const x2 = this.config?.x2 !== undefined ? this.config.x2 
            : (this.config?.area?.x2 !== undefined ? this.config.area.x2 : 480);

        const y2 = this.config?.y2 !== undefined ? this.config.y2 
            : (this.config?.area?.y2 !== undefined ? this.config.area.y2 : 270);

        // 2. Xác định scale của đám sương mù
        const baseScale = this.config?.fogScale !== undefined ? this.config.fogScale 
            : (this.config?.scale !== undefined ? this.config.scale : 1.5);

        // 3. Tạo các đám sương mù phủ ngẫu nhiên trong vùng chỉ định
        for (let i = 0; i < count; i++) {
            const rx = Phaser.Math.Between(x1, x2);
            const ry = Phaser.Math.Between(y1, y2);

            const randomScale = Phaser.Math.FloatBetween(baseScale * 0.8, baseScale * 1.2);

            const fogSprite = this.scene.add.sprite(rx, ry, fogKey)
                .setDepth(112)
                .setScale(randomScale)
                .setAlpha(0.95);
            this.add(fogSprite);

            // Cho mây sương mù bay dập dình nhẹ
            this.scene.tweens.add({
                targets: fogSprite,
                x: rx + Phaser.Math.Between(-20, 20),
                y: ry + Phaser.Math.Between(-20, 20),
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

            // Xác định vùng không gian để tính tâm phân tán sương mù
            const x1 = this.config?.x1 !== undefined ? this.config.x1 
                : (this.config?.area?.x1 !== undefined ? this.config.area.x1 : 320);
            
            const y1 = this.config?.y1 !== undefined ? this.config.y1 
                : (this.config?.area?.y1 !== undefined ? this.config.area.y1 : 170);

            const x2 = this.config?.x2 !== undefined ? this.config.x2 
                : (this.config?.area?.x2 !== undefined ? this.config.area.x2 : 480);

            const y2 = this.config?.y2 !== undefined ? this.config.y2 
                : (this.config?.area?.y2 !== undefined ? this.config.area.y2 : 270);

            const cx = (x1 + x2) / 2;
            const cy = (y1 + y2) / 2;

            // Dừng tween bay nhẹ cũ
            scene.tweens.killTweensOf(targetFog.sprite);

            // Cho sương mù bay dạt ra ngoài rìa theo hướng từ tâm và mờ dần
            const angle = Math.atan2(targetFog.sprite.y - cy, targetFog.sprite.x - cx);
            const targetX = targetFog.sprite.x + Math.cos(angle) * 200;
            const targetY = targetFog.sprite.y + Math.sin(angle) * 150;

            scene.tweens.add({
                targets: targetFog.sprite,
                x: targetX,
                y: targetY,
                alpha: 0,
                scaleX: 3.5,
                scaleY: 3.5,
                duration: 600,
                ease: 'Quad.easeOut',
                onComplete: () => {
                    targetFog.sprite.setVisible(false);
                }
            });
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
