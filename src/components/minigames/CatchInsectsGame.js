import { BaseMinigame } from './BaseMinigame';

export class CatchInsectsGame extends BaseMinigame {
    constructor(scene, config) {
        super(scene, config);
        this.insectsList = [];
        this.netSprite = null;
        this.jarSprite = null;
    }

    create() {
        const insectEmoji = this.config?.insectEmoji || '🦋'; // 🦋, 🐝, 🐞
        const netEmoji = this.config?.netEmoji || '🕸️'; 
        const jarEmoji = this.config?.jarEmoji || '🏺'; 
        const count = this.totalWords || 8;

        const insectKey = this.createEmojiTexture('catch_insect_tex', insectEmoji, 48);
        const netKey = this.createEmojiTexture('catch_net_tex', netEmoji, 64);
        const jarKey = this.createEmojiTexture('catch_jar_tex', jarEmoji, 64);

        // 1. Tạo lọ đựng ở góc
        const jarX = this.config?.jarX || 700;
        const jarY = this.config?.jarY || 300;
        this.jarSprite = this.scene.add.sprite(jarX, jarY, jarKey)
            .setDepth(110)
            .setScale(1.2);
        this.add(this.jarSprite);

        // 2. Tạo vợt tàng hình tạm thời
        this.netSprite = this.scene.add.sprite(0, 0, netKey)
            .setDepth(115)
            .setVisible(false);
        this.add(this.netSprite);

        // 3. Tạo các côn trùng bay tự do
        const minX = this.config?.area?.minX || 100;
        const maxX = this.config?.area?.maxX || 550;
        const minY = this.config?.area?.minY || 100;
        const maxY = this.config?.area?.maxY || 280;

        for (let i = 0; i < count; i++) {
            const rx = Phaser.Math.Between(minX, maxX);
            const ry = Phaser.Math.Between(minY, maxY);

            const sprite = this.scene.add.sprite(rx, ry, insectKey)
                .setDepth(111)
                .setScale(0.9);
            this.add(sprite);

            // Cho côn trùng bay vòng tròn/lượn sóng nhẹ
            this.scene.tweens.add({
                targets: sprite,
                x: rx + Phaser.Math.Between(-30, 30),
                y: ry + Phaser.Math.Between(-30, 30),
                duration: Phaser.Math.Between(2000, 3500),
                yoyo: true,
                repeat: -1,
                ease: 'Sine.easeInOut'
            });

            this.insectsList.push({
                sprite,
                caught: false,
                startX: rx,
                startY: ry
            });
        }
    }

    onWordComplete(word, currentWordIndex, totalWords) {
        const uncaught = this.insectsList.filter(ins => !ins.caught);
        if (uncaught.length > 0) {
            const target = uncaught[0];
            target.caught = true;

            const scene = this.scene;
            const net = this.netSprite;
            const jar = this.jarSprite;
            const self = this;

            // Dừng tween bay lượn cũ
            scene.tweens.killTweensOf(target.sprite);

            // Hiện vợt và di chuyển vợt tới vị trí côn trùng để bắt
            net.setPosition(target.sprite.x - 30, target.sprite.y - 30);
            net.setVisible(true);
            net.setAlpha(0);

            scene.tweens.add({
                targets: net,
                alpha: 1,
                x: target.sprite.x,
                y: target.sprite.y,
                duration: 200,
                ease: 'Power2',
                onComplete: () => {
                    if (!self.scene) return;
                    // Nhấp nháy nhanh (blink effect) báo hiệu bị bắt
                    scene.tweens.add({
                        targets: target.sprite,
                        alpha: 0.2,
                        duration: 50,
                        yoyo: true,
                        repeat: 2,
                        onComplete: () => {
                            if (!self.scene) return;
                            // Ẩn vợt đi
                            net.setVisible(false);

                            // Cho côn trùng bay thu nhỏ dần vào lọ đựng
                            scene.tweens.add({
                                targets: target.sprite,
                                x: jar.x,
                                y: jar.y,
                                scaleX: 0.2,
                                scaleY: 0.2,
                                alpha: 0.5,
                                duration: 400,
                                ease: 'Back.easeIn',
                                onComplete: () => {
                                    if (!self.scene) return;
                                    target.sprite.setVisible(false);
                                    
                                    // Lọ đựng nảy nhẹ lên
                                    scene.tweens.add({
                                        targets: jar,
                                        scaleY: 1.4,
                                        scaleX: 1.4,
                                        duration: 100,
                                        yoyo: true
                                    });
                                }
                            });
                        }
                    });
                }
            });
        }
    }

    onTypeError(char) {
        // Gõ sai -> Các chú côn trùng giật mình bay vút sang chỗ khác rồi quay lại
        this.insectsList.forEach(ins => {
            if (!ins.caught) {
                this.scene.tweens.add({
                    targets: ins.sprite,
                    x: ins.sprite.x + Phaser.Math.Between(-25, 25),
                    y: ins.sprite.y + Phaser.Math.Between(-25, 25),
                    duration: 100,
                    yoyo: true,
                    repeat: 1
                });
            }
        });
    }
}
