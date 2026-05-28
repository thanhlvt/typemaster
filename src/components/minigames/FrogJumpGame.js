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
        const leafEmoji = this.config?.leafEmoji || '🪷'; 
        const frogEmoji = this.config?.frogEmoji || '🐸';

        const leafKey = this.createEmojiTexture('frog_leaf_tex', leafEmoji, 56);
        const frogKey = this.createEmojiTexture('frog_frog_tex', frogEmoji, 48);

        // Tạo dòng nước bằng graphics đơn giản làm nền
        const water = this.scene.add.graphics();
        water.fillStyle(0x2563EB, 0.4); // Xanh lam nhạt
        water.fillRect(50, 160, 700, 120);
        this.add(water);

        // 1. Tạo các lá sen xếp hàng từ trái qua phải
        const startX = 100;
        const endX = 700;
        const gapX = (endX - startX) / Math.max(1, count - 1);
        const y = 220;

        for (let i = 0; i < count; i++) {
            const lx = startX + i * gapX;
            const ly = y + (i % 2 === 0 ? 10 : -10); // Hơi dích dắc cho sinh động

            const leafSprite = this.scene.add.sprite(lx, ly, leafKey)
                .setDepth(110)
                .setScale(1.1);
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

        // 2. Tạo chú ếch ngồi trên chiếc lá đầu tiên
        this.frogSprite = this.scene.add.sprite(this.leavesList[0].x, this.leavesList[0].y - 12, frogKey)
            .setDepth(112)
            .setScale(1.2);
        this.add(this.frogSprite);
        
        this.currentLeafIdx = 0;
    }

    onWordComplete(word, currentWordIndex, totalWords) {
        const nextIdx = Math.min(currentWordIndex, this.leavesList.length - 1);
        if (nextIdx > this.currentLeafIdx) {
            const prevLeaf = this.leavesList[this.currentLeafIdx];
            const nextLeaf = this.leavesList[nextIdx];
            this.currentLeafIdx = nextIdx;

            const scene = this.scene;
            const frog = this.frogSprite;
            const self = this;

            // Dừng các tween cũ của ếch
            scene.tweens.killTweensOf(frog);

            // Nhảy parabol: di chuyển X thẳng và Y nhảy vòng cung
            scene.tweens.add({
                targets: frog,
                x: nextLeaf.x,
                duration: 400,
                ease: 'Linear'
            });

            scene.tweens.add({
                targets: frog,
                y: nextLeaf.y - 60,
                duration: 200,
                yoyo: true,
                ease: 'Quad.easeOut',
                onComplete: () => {
                    if (!self.scene) return;
                    // Sau khi rơi xuống lá sen tiếp theo
                    frog.y = nextLeaf.y - 12;
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
            y: currentLeaf.y + 25,
            scaleX: 0.4,
            scaleY: 0.4,
            alpha: 0,
            duration: 350,
            ease: 'Quad.easeIn',
            onComplete: () => {
                if (!self.scene) return;
                // Hồi sinh lại: đặt vị trí cũ và hiện lên lại
                frog.setPosition(currentLeaf.x, currentLeaf.y - 100);
                scene.tweens.add({
                    targets: frog,
                    y: currentLeaf.y - 12,
                    scaleX: 1.2,
                    scaleY: 1.2,
                    alpha: 1,
                    duration: 300,
                    ease: 'Bounce.easeOut'
                });
            }
        });
    }
}
