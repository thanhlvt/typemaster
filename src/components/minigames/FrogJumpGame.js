import { BaseMinigame } from './BaseMinigame';

export class FrogJumpGame extends BaseMinigame {
    constructor(scene, config) {
        super(scene, config);
        this.leavesList = [];
        this.frogSprite = null;
        this.currentLeafIdx = 0;
        this.decorations = null;
        this.clouds = null;
        this.winds = null;
    }

    create() {
        const count = this.totalWords || 10;
        const leafConfig = this.config?.leaf || {};

        const leafEmoji = leafConfig.emoji || this.config?.leafEmoji || '🪷';
        const leafTex = leafConfig.texture || 'frog_leaf_tex';

        this.leafScale = leafConfig.scale !== undefined ? leafConfig.scale : 1.1;

        const leafKey = this.scene.textures.exists(leafTex)
            ? leafTex
            : this.createEmojiTexture(leafTex, leafEmoji, 56);

        let frogKey;
        if (!this.config?.frog) {
            const monkeyConfig = this.config?.monkey || {};
            frogKey = this.scene.monkey?.texture?.key || 'monkey_1';
            this.frogScale = monkeyConfig.scale !== undefined ? monkeyConfig.scale : 0.3;
            this.frogOffsetX = monkeyConfig.offsetX !== undefined ? monkeyConfig.offsetX : 0;
            this.frogOffsetY = monkeyConfig.offsetY !== undefined ? monkeyConfig.offsetY : -12;
        } else {
            const frogConfig = this.config.frog;
            const frogEmoji = frogConfig.emoji || this.config?.frogEmoji || '🐸';
            const frogTex = frogConfig.texture || 'frog_frog_tex';
            this.frogScale = frogConfig.scale !== undefined ? frogConfig.scale : 1.2;
            this.frogOffsetX = frogConfig.offsetX !== undefined ? frogConfig.offsetX : 0;
            this.frogOffsetY = frogConfig.offsetY !== undefined ? frogConfig.offsetY : -12;
            frogKey = this.scene.textures.exists(frogTex)
                ? frogTex
                : this.createEmojiTexture(frogTex, frogEmoji, 48);
        }

        // Tạo môi trường nền (water/air) dựa theo tham số x1, y1, x2, y2
        const x1 = this.config?.x1 !== undefined ? this.config.x1 : 50;
        const y1 = this.config?.y1 !== undefined ? this.config.y1 : 160;
        const x2 = this.config?.x2 !== undefined ? this.config.x2 : 750;
        const y2 = this.config?.y2 !== undefined ? this.config.y2 : 280;

        const trackType = (this.config?.track?.type || this.config?.type || 'water').toLowerCase();

        if (trackType === 'air') {
            // Nền không gian tím/hồng nhạt
            const airBg = this.scene.add.graphics();
            airBg.fillStyle(0x581c87, 0.35);
            airBg.fillRect(x1, y1, x2 - x1, y2 - y1);
            this.add(airBg);

            // Tạo các đám mây trôi lơ lửng
            this.clouds = [];
            const cloudKey = this.createEmojiTexture('dec_cloud', '☁️', 40);
            for (let i = 0; i < 5; i++) {
                const cx = Phaser.Math.Between(x1, x2);
                const cy = Phaser.Math.Between(y1 + 10, y2 - 25);
                const speed = Phaser.Math.FloatBetween(0.15, 0.4);
                const cloudSprite = this.scene.add.sprite(cx, cy, cloudKey)
                    .setDepth(108)
                    .setAlpha(Phaser.Math.FloatBetween(0.5, 0.85))
                    .setScale(Phaser.Math.FloatBetween(0.8, 1.2));
                this.add(cloudSprite);
                this.clouds.push({ sprite: cloudSprite, speed });
            }

            // Tạo các làn gió thổi trôi ngang
            this.winds = [];
            const windKey = this.createEmojiTexture('dec_wind', '💨', 28);
            for (let i = 0; i < 3; i++) {
                const wx = Phaser.Math.Between(x1, x2);
                const wy = Phaser.Math.Between(y1 + 10, y2 - 20);
                const speed = Phaser.Math.FloatBetween(1.0, 1.8);
                const windSprite = this.scene.add.sprite(wx, wy, windKey)
                    .setDepth(108)
                    .setAlpha(Phaser.Math.FloatBetween(0.3, 0.5))
                    .setScale(Phaser.Math.FloatBetween(0.8, 1.1));
                this.add(windSprite);
                this.winds.push({ sprite: windSprite, speed });
            }
        } else {
            // Nước (water - mặc định)
            const water = this.scene.add.graphics();
            water.fillStyle(0x2563EB, 0.4); // Xanh lam nhạt
            water.fillRect(x1, y1, x2 - x1, y2 - y1);
            this.add(water);

            // Tạo thêm lá trôi và bèo xung quanh
            this.decorations = [];
            const decTexLeaf = this.createEmojiTexture('dec_leaf', '🍃', 48);
            const decTexClover = this.createEmojiTexture('dec_clover', '🍀', 48);

            for (let i = 0; i < 8; i++) {
                const decX = Phaser.Math.Between(x1 + 30, x2 - 30);
                const decY = Phaser.Math.Between(y1 + 15, y2 - 15);
                const textureKey = i % 2 === 0 ? decTexLeaf : decTexClover;
                const scale = i % 2 === 0 ? 0.55 : 0.45;
                const decSprite = this.scene.add.sprite(decX, decY, textureKey)
                    .setDepth(108)
                    .setAlpha(0.7)
                    .setScale(scale)
                    .setAngle(Phaser.Math.Between(0, 360));
                this.add(decSprite);

                this.scene.tweens.add({
                    targets: decSprite,
                    y: decY + Phaser.Math.Between(3, 6),
                    angle: decSprite.angle + Phaser.Math.Between(-10, 10),
                    duration: 1200 + Phaser.Math.Between(0, 400),
                    yoyo: true,
                    repeat: -1,
                    ease: 'Sine.easeInOut'
                });
                this.decorations.push(decSprite);
            }
        }

        // 1. Tạo các lá sen xếp hàng từ trái qua phải, phân bổ trong lòng suối nước
        const startX = x1 + 80;
        const endX = x2 - 80;
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
        if (!this.scene) return;

        // Cập nhật chuyển động của mây và gió trong chế độ air
        const x1 = this.config?.x1 !== undefined ? this.config.x1 : 50;
        const x2 = this.config?.x2 !== undefined ? this.config.x2 : 750;

        if (this.clouds) {
            this.clouds.forEach(c => {
                c.sprite.x -= c.speed;
                if (c.sprite.x < x1 - 30) {
                    c.sprite.x = x2 + 30;
                    c.sprite.y = Phaser.Math.Between(this.config?.y1 !== undefined ? this.config.y1 : 160 + 10, (this.config?.y2 !== undefined ? this.config.y2 : 280) - 25);
                }
            });
        }

        if (this.winds) {
            this.winds.forEach(w => {
                w.sprite.x -= w.speed;
                if (w.sprite.x < x1 - 30) {
                    w.sprite.x = x2 + 30;
                    w.sprite.y = Phaser.Math.Between(this.config?.y1 !== undefined ? this.config.y1 : 160 + 10, (this.config?.y2 !== undefined ? this.config.y2 : 280) - 20);
                }
            });
        }

        if (!this.frogSprite || this.leavesList.length === 0) return;
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
        this.decorations = null;
        this.clouds = null;
        this.winds = null;
        super.destroy();
    }
}
