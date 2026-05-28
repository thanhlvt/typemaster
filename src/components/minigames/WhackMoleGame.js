import { BaseMinigame } from './BaseMinigame';
import * as Phaser from 'phaser';

export class WhackMoleGame extends BaseMinigame {
    constructor(scene, config) {
        super(scene, config);
        this.holes = [];
        this.activeMoleIdx = -1;
        this.moleSprite = null;
        this.hammerSprite = null;
        this.nextMoleTimer = null;
    }

    create() {
        const holeConfig = this.config?.hole || {};
        const moleConfig = this.config?.mole || {};
        const hammerConfig = this.config?.hammer || {};

        const holeEmoji = holeConfig.emoji || this.config?.holeEmoji || '🕳️';
        const moleEmoji = moleConfig.emoji || this.config?.moleEmoji || '🐹';
        const hammerEmoji = hammerConfig.emoji || this.config?.hammerEmoji || '🔨';

        const holeTex = holeConfig.texture || 'mole_hole_tex';
        const moleTex = moleConfig.texture || 'mole_mole_tex';
        const hammerTex = hammerConfig.texture || 'mole_hammer_tex';

        // 1. Tạo texture từ cache hoặc emoji
        const holeKey = this.scene.textures.exists(holeTex)
            ? holeTex
            : this.createEmojiTexture(holeTex, holeEmoji, 64);

        const moleKey = this.scene.textures.exists(moleTex)
            ? moleTex
            : this.createEmojiTexture(moleTex, moleEmoji, 56);

        const hammerKey = this.scene.textures.exists(hammerTex)
            ? hammerTex
            : this.createEmojiTexture(hammerTex, hammerEmoji, 64);

        // 2. Phân tích tỉ lệ scale và offset
        this.holeScale = holeConfig.scale !== undefined ? holeConfig.scale : 1.1;
        this.moleScale = moleConfig.scale !== undefined ? moleConfig.scale : 1.1;
        this.hammerScale = hammerConfig.scale !== undefined ? hammerConfig.scale : 1.0;

        this.moleOffsetX = moleConfig.offsetX !== undefined ? moleConfig.offsetX : 0;
        this.moleOffsetY = moleConfig.offsetY !== undefined ? moleConfig.offsetY : -15;

        this.hammerOffsetX = hammerConfig.offsetX !== undefined ? hammerConfig.offsetX : 5;
        this.hammerOffsetY = hammerConfig.offsetY !== undefined ? hammerConfig.offsetY : -45;

        // 3. Tạo 3 chiếc hang chuột hàng ngang
        const startX = 350;
        const gapX = 140;
        const y = 280;

        for (let i = 0; i < 3; i++) {
            const hx = startX + i * gapX;
            const holeSprite = this.scene.add.sprite(hx, y + 10, holeKey)
                .setDepth(110)
                .setScale(this.holeScale);
            this.add(holeSprite);

            this.holes.push({ x: hx, y });
        }

        // 4. Tạo chú chuột chũi tàng hình ban đầu
        this.moleSprite = this.scene.add.sprite(0, 0, moleKey)
            .setDepth(111)
            .setScale(this.moleScale)
            .setVisible(false);
        this.add(this.moleSprite);

        // 5. Tạo búa tàng hình ban đầu
        this.hammerSprite = this.scene.add.sprite(0, 0, hammerKey)
            .setDepth(115)
            .setScale(this.hammerScale)
            .setVisible(false);
        this.add(this.hammerSprite);

        // Chui lên con đầu tiên
        this.spawnMole();
    }

    spawnMole() {
        if (!this.scene) return;
        
        // Chọn hang ngẫu nhiên
        const randIdx = Phaser.Math.Between(0, this.holes.length - 1);
        const targetHole = this.holes[randIdx];
        this.activeMoleIdx = randIdx;

        const mole = this.moleSprite;
        mole.setPosition(targetHole.x + this.moleOffsetX, targetHole.y + this.moleOffsetY + 55); // Bắt đầu ở sâu dưới hang
        mole.setVisible(true);
        mole.setAlpha(1);
        mole.setScale(this.moleScale * 0.2);

        // Tween chuột trồi lên từ hang
        this.scene.tweens.add({
            targets: mole,
            x: targetHole.x + this.moleOffsetX,
            y: targetHole.y + this.moleOffsetY,
            scaleX: this.moleScale,
            scaleY: this.moleScale,
            duration: 250,
            ease: 'Back.easeOut'
        });
    }

    onWordComplete(word, currentWordIndex, totalWords) {
        if (this.activeMoleIdx === -1) return;

        const scene = this.scene;
        const mole = this.moleSprite;
        const hammer = this.hammerSprite;
        const targetHole = this.holes[this.activeMoleIdx];
        const self = this;

        // Bỏ chọn hang đang hoạt động để tránh tương tác đè
        this.activeMoleIdx = -1;

        const hitX = targetHole.x + this.hammerOffsetX;
        const hitY = targetHole.y + this.hammerOffsetY;
        const startX = hitX + 30;
        const startY = hitY - 20;

        // Di chuyển búa đến gõ
        hammer.setPosition(startX, startY);
        hammer.setAngle(15);
        hammer.setVisible(true);

        scene.tweens.add({
            targets: hammer,
            angle: -40,
            x: hitX,
            y: hitY,
            duration: 150,
            ease: 'Quad.easeIn',
            onComplete: () => {
                if (!self.scene) return;
                // Chuột bị đập chui tọt xuống hang
                scene.tweens.add({
                    targets: mole,
                    y: targetHole.y + self.moleOffsetY + 30,
                    scaleY: self.moleScale * 0.1,
                    duration: 150,
                    onComplete: () => {
                        if (!self.scene) return;
                        mole.setVisible(false);
                        hammer.setVisible(false);
                        
                        // Sinh chuột mới sau 600ms
                        self.nextMoleTimer = scene.time.delayedCall(600, () => {
                            self.spawnMole();
                        });
                    }
                });

                // Hiệu ứng ngôi sao lấp lánh (vết đập trúng)
                self.showWhackStars(targetHole.x + self.moleOffsetX, targetHole.y + self.moleOffsetY - 10);
            }
        });
    }

    onTypeError(char) {
        if (this.activeMoleIdx === -1) return;

        // Gõ sai -> Chuột lắc nhẹ qua lại theo chiều ngang
        const scene = this.scene;
        const mole = this.moleSprite;
        const targetHole = this.holes[this.activeMoleIdx];
        const self = this;

        scene.tweens.killTweensOf(mole);
        mole.x = targetHole.x + this.moleOffsetX;
        mole.y = targetHole.y + this.moleOffsetY;
        mole.setScale(this.moleScale);

        scene.tweens.add({
            targets: mole,
            x: mole.x + 10,
            duration: 50,
            yoyo: true,
            repeat: 3,
            onComplete: () => {
                if (!self.scene) return;
                mole.x = targetHole.x + self.moleOffsetX;
            }
        });
    }

    showWhackStars(x, y) {
        const graphics = this.scene.add.graphics().setDepth(120);
        const color = 0xFBBF24; // Yellow stars
        const self = this;

        const starPts = [];
        for (let i = 0; i < 6; i++) {
            const angle = (i / 6) * Math.PI * 2;
            starPts.push({ angle, dist: 0 });
        }

        this.scene.tweens.add({
            targets: starPts,
            dist: 40,
            duration: 250,
            onUpdate: () => {
                graphics.clear();
                starPts.forEach(p => {
                    graphics.fillStyle(color, 1 - (p.dist / 40));
                    // Vẽ các vòng tròn nhỏ thay cho sao vẽ vector phức tạp
                    graphics.fillCircle(x + Math.cos(p.angle) * p.dist, y + Math.sin(p.angle) * p.dist, 5 * (1 - (p.dist / 40)));
                });
            },
            onComplete: () => {
                graphics.destroy();
            }
        });
    }

    destroy() {
        if (this.nextMoleTimer) {
            this.nextMoleTimer.destroy();
        }
        super.destroy();
    }
}
