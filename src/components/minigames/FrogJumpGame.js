import { BaseMinigame } from './BaseMinigame';

export class FrogJumpGame extends BaseMinigame {
    constructor(scene, config) {
        super(scene, config);
        this.leavesList = [];
        this.frogSprite = null;
        this.currentLeafIdx = 0;
    }

    create() {
        const count = this.totalWords || 10;
        const leafConfig = this.config?.leaf || {};
        const frogConfig = this.config?.frog || {};

        const leafEmoji = leafConfig.emoji || this.config?.leafEmoji || '🪷'; 
        const frogEmoji = frogConfig.emoji || this.config?.frogEmoji || '🐸';
        const leafTex = leafConfig.texture || 'frog_leaf_tex';
        const frogTex = frogConfig.texture || 'frog_frog_tex';

        this.leafScale = leafConfig.scale !== undefined ? leafConfig.scale : 1.1;
        this.frogScale = frogConfig.scale !== undefined ? frogConfig.scale : 1.2;
        this.frogOffsetX = frogConfig.offsetX !== undefined ? frogConfig.offsetX : 0;
        this.frogOffsetY = frogConfig.offsetY !== undefined ? frogConfig.offsetY : -12;

        const leafKey = this.scene.textures.exists(leafTex)
            ? leafTex
            : this.createEmojiTexture(leafTex, leafEmoji, 56);
        const frogKey = this.scene.textures.exists(frogTex)
            ? frogTex
            : this.createEmojiTexture(frogTex, frogEmoji, 48);

        // Tạo dòng nước bằng graphics dựa theo các tham số x1, y1, x2, y2
        const x1 = this.config?.x1 !== undefined ? this.config.x1 : 50;
        const y1 = this.config?.y1 !== undefined ? this.config.y1 : 160;
        const x2 = this.config?.x2 !== undefined ? this.config.x2 : 750;
        const y2 = this.config?.y2 !== undefined ? this.config.y2 : 280;

        const water = this.scene.add.graphics();
        water.fillStyle(0x2563EB, 0.4); // Xanh lam nhạt
        water.fillRect(x1, y1, x2 - x1, y2 - y1);
        this.add(water);

        // 1. Tạo các lá sen xếp hàng từ trái qua phải, phân bổ trong lòng suối nước
        const startX = x1 + 50;
        const endX = x2 - 50;
        const gapX = (endX - startX) / Math.max(1, count - 1);
        const y = (y1 + y2) / 2;

        for (let i = 0; i < count; i++) {
            const lx = startX + i * gapX;
            const ly = y + (i % 2 === 0 ? 10 : -10); // Hơi dích dắc cho sinh động

            const leafSprite = this.scene.add.sprite(lx, ly, leafKey)
                .setDepth(110)
                .setScale(this.leafScale);
            this.add(leafSprite);

            // Cho lá sen bồng bềnh nhẹ trên nước
            this.scene.tweens.add({
                targets: leafSprite,
                y: ly + 4,
                duration: 1000 + i * 100,
                yoyo: true,
                repeat: -1,
                ease: 'Sine.easeInOut'
            });

            this.leavesList.push({ x: lx, y: ly, sprite: leafSprite });
        }

        // 2. Tạo chú ếch ngồi trên chiếc lá đầu tiên (tâm đứng lệch so với lá theo offset)
        this.frogSprite = this.scene.add.sprite(
            this.leavesList[0].x + this.frogOffsetX,
            this.leavesList[0].y + this.frogOffsetY,
            frogKey
        )
            .setDepth(112)
            .setScale(this.frogScale);
        this.add(this.frogSprite);
        
        this.scene.events.on('update', this.update, this);
        this.currentLeafIdx = 0;
    }

    onWordComplete(word, currentWordIndex, totalWords, onCompleteCallback) {
        const scene = this.scene;
        const frog = this.frogSprite;
        const self = this;

        // Nếu gõ xong từ cuối cùng -> Nhảy một bước dài sung sướng bay khỏi màn hình bên phải
        if (currentWordIndex >= totalWords) {
            scene.tweens.killTweensOf(frog);
            const jumpTargetX = scene.scale.width + 120;
            
            scene.tweens.add({
                targets: frog,
                x: jumpTargetX,
                duration: 800,
                ease: 'Quad.easeOut'
            });

            scene.tweens.add({
                targets: frog,
                y: frog.y - 150,
                duration: 400,
                yoyo: true,
                ease: 'Quad.easeOut',
                onComplete: () => {
                    if (onCompleteCallback) onCompleteCallback();
                }
            });
            return;
        }

        const nextIdx = Math.min(currentWordIndex, this.leavesList.length - 1);
        if (nextIdx > this.currentLeafIdx) {
            const prevLeaf = this.leavesList[this.currentLeafIdx];
            const nextLeaf = this.leavesList[nextIdx];
            this.currentLeafIdx = nextIdx;

            // Dừng các tween cũ của ếch
            scene.tweens.killTweensOf(frog);

            // Nhảy parabol: di chuyển X thẳng và Y nhảy vòng cung
            scene.tweens.add({
                targets: frog,
                x: nextLeaf.x + self.frogOffsetX,
                duration: 400,
                ease: 'Linear'
            });

            scene.tweens.add({
                targets: frog,
                y: nextLeaf.y + self.frogOffsetY - 48,
                duration: 200,
                yoyo: true,
                ease: 'Quad.easeOut',
                onComplete: () => {
                    if (!self.scene) return;
                    // Sau khi rơi xuống lá sen tiếp theo
                    frog.y = nextLeaf.y + self.frogOffsetY;
                    // Lá sen lún xuống nhẹ rồi nảy lên
                    scene.tweens.add({
                        targets: nextLeaf.sprite,
                        scaleY: 0.8,
                        duration: 80,
                        yoyo: true
                    });
                }
            });
        }
    }

    onTypeError(char) {
        // Gõ sai -> Ếch trượt ngã chìm xuống suối rồi hồi sinh lại ở lá sen hiện tại
        const frog = this.frogSprite;
        const currentLeaf = this.leavesList[this.currentLeafIdx];
        const scene = this.scene;
        const self = this;

        scene.tweens.killTweensOf(frog);

        scene.tweens.add({
            targets: frog,
            y: currentLeaf.y + self.frogOffsetY + 37,
            scaleX: self.frogScale * 0.33,
            scaleY: self.frogScale * 0.33,
            alpha: 0,
            duration: 100,
            ease: 'Quad.easeIn',
            onComplete: () => {
                if (!self.scene) return;
                // Hồi sinh lại: đặt vị trí cũ và hiện lên lại
                frog.setPosition(currentLeaf.x + self.frogOffsetX, currentLeaf.y + self.frogOffsetY - 88);
                scene.tweens.add({
                    targets: frog,
                    y: currentLeaf.y + self.frogOffsetY,
                    scaleX: self.frogScale,
                    scaleY: self.frogScale,
                    alpha: 1,
                    duration: 300,
                    ease: 'Bounce.easeOut'
                });
            }
        });
    }

    update() {
        if (!this.scene || !this.frogSprite || this.leavesList.length === 0) return;
        const currentLeaf = this.leavesList[this.currentLeafIdx];
        if (currentLeaf && !this.scene.tweens.isTweening(this.frogSprite)) {
            this.frogSprite.x = currentLeaf.sprite.x + this.frogOffsetX;
            this.frogSprite.y = currentLeaf.sprite.y + this.frogOffsetY;
        }
    }

    destroy() {
        if (this.scene) {
            this.scene.events.off('update', this.update, this);
        }
        super.destroy();
    }
}
