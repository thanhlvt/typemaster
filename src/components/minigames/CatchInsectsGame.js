import { BaseMinigame } from './BaseMinigame';
import { showBananaDrop } from '../../utils/PlayScorePopup';
import * as Phaser from 'phaser';

export class CatchInsectsGame extends BaseMinigame {
    constructor(scene, config) {
        super(scene, config);
        this.insectsList = [];
        this.netSprite = null;
        this.jarSprite = null;
        this.monkeySprite = null;
        this.playerContainer = null;
    }

    create() {
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

        const insectConfig = this.config?.insect || {};
        const netConfig = this.config?.net || {};
        const jarConfig = this.config?.jar || {};

        const insectEmoji = insectConfig.emoji || this.config?.insectEmoji || '🦋'; 
        const netEmoji = netConfig.emoji || this.config?.netEmoji || '🕸️'; 
        const jarEmoji = jarConfig.emoji || this.config?.jarEmoji || '🏺'; 
        const count = this.totalWords || 8;

        const insectTex = insectConfig.texture || 'catch_insect_tex';
        const netTex = netConfig.texture || 'catch_net_tex';
        const jarTex = jarConfig.texture || 'catch_jar_tex';

        // 1. Tạo texture từ cache hoặc emoji
        const insectKey = this.scene.textures.exists(insectTex)
            ? insectTex
            : this.createEmojiTexture(insectTex, insectEmoji, 48);

        const netKey = this.scene.textures.exists(netTex)
            ? netTex
            : this.createEmojiTexture(netTex, netEmoji, 64);

        const jarKey = this.scene.textures.exists(jarTex)
            ? jarTex
            : this.createEmojiTexture(jarTex, jarEmoji, 64);

        // 2. Phân tích tỉ lệ scale
        this.insectScale = insectConfig.scale !== undefined ? insectConfig.scale : 0.9;
        this.netScale = netConfig.scale !== undefined ? netConfig.scale : 1.0;
        this.jarScale = jarConfig.scale !== undefined ? jarConfig.scale : 1.2;

        // 3. Tạo lọ đựng ở góc
        const jarX = this.config?.jarX || 700;
        const jarY = this.config?.jarY || 300;
        this.jarSprite = this.scene.add.sprite(jarX, jarY, jarKey)
            .setDepth(110)
            .setScale(this.jarScale);
        this.add(this.jarSprite);

        // 4. Tạo vợt tàng hình tạm thời
        this.netSprite = this.scene.add.sprite(0, 0, netKey)
            .setDepth(115)
            .setScale(this.netScale)
            .setVisible(false);
        this.add(this.netSprite);

        // 5. Tạo các côn trùng bay tự do
        const minX = Math.max(this.config?.area?.minX || 100, 160);
        const maxX = this.config?.area?.maxX || 550;
        const minY = this.config?.area?.minY || 100;
        const maxY = this.config?.area?.maxY || 280;

        for (let i = 0; i < count; i++) {
            const rx = Phaser.Math.Between(minX, maxX);
            const ry = Phaser.Math.Between(minY, maxY);

            const sprite = this.scene.add.sprite(rx, ry, insectKey)
                .setDepth(111)
                .setScale(this.insectScale);
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
        if (this.monkeySprite) {
            showBananaDrop(this.scene, this.monkeySprite);
        }

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

            // Vị trí vợt bay ngang qua côn trùng từ trái (-100px) sang phải (+100px)
            const startX = target.sprite.x - 150;
            const targetX = target.sprite.x;
            const endX = target.sprite.x + 150;
            const centerY = target.sprite.y + 40;

            net.setPosition(startX, centerY);
            net.setVisible(true);
            net.setAlpha(0);

            // Giai đoạn 1: Vợt bay vào đè lên côn trùng, tăng dần alpha
            scene.tweens.add({
                targets: net,
                x: targetX,
                alpha: 1,
                duration: 400,
                ease: 'Quad.easeOut',
                onComplete: () => {
                    if (!self.scene) return;

                    // Khi vợt đè lên côn trùng -> Côn trùng biến mất ngay lập tức
                    target.sprite.setVisible(false);

                    // Giai đoạn 2: Vợt quét nốt ra bên phải và mờ dần biến mất
                    scene.tweens.add({
                        targets: net,
                        x: endX,
                        alpha: 0,
                        duration: 400,
                        ease: 'Quad.easeIn',
                        onComplete: () => {
                            if (!self.scene) return;
                            net.setVisible(false);

                            // Giai đoạn 3: Côn trùng xuất hiện trên miệng lọ đựng, scale x3
                            target.sprite.setPosition(jar.x, jar.y - 100);
                            target.sprite.setScale(self.insectScale * 2.0);
                            target.sprite.setAlpha(1.0);
                            target.sprite.setVisible(true);

                            // Animate côn trùng thu nhỏ dần xuống x0.5 và chui tọt vào lọ
                            scene.tweens.add({
                                targets: target.sprite,
                                y: jar.y,
                                scaleX: self.insectScale * 0.5,
                                scaleY: self.insectScale * 0.5,
                                alpha: 0,
                                duration: 500,
                                ease: 'Back.easeIn',
                                onComplete: () => {
                                    if (!self.scene) return;
                                    target.sprite.setVisible(false);

                                    // Lọ đựng co giãn nảy nhẹ để biểu thị đã nhận
                                    scene.tweens.add({
                                        targets: jar,
                                        scaleY: self.jarScale * 1.2,
                                        scaleX: self.jarScale * 1.2,
                                        duration: 100,
                                        yoyo: true,
                                        ease: 'Quad.easeOut'
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
        if (this.monkeySprite) {
            this.monkeySprite.setTint(0xff0000);
            this.scene.time.delayedCall(200, () => {
                if (this.monkeySprite) {
                    this.monkeySprite.clearTint();
                }
            });
        }

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

    destroy() {
        if (this.monkeySprite) {
            this.monkeySprite.destroy();
        }
        this.monkeySprite = null;
        this.playerContainer = null;
        super.destroy();
    }
}
