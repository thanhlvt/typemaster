import { BaseMinigame } from './BaseMinigame';

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
        const holeEmoji = this.config?.holeEmoji || '🕳️';
        const moleEmoji = this.config?.moleEmoji || '🐹'; // 🐹, 🐭
        const hammerEmoji = this.config?.hammerEmoji || '🔨';

        const holeKey = this.createEmojiTexture('mole_hole_tex', holeEmoji, 64);
        const moleKey = this.createEmojiTexture('mole_mole_tex', moleEmoji, 56);
        const hammerKey = this.createEmojiTexture('mole_hammer_tex', hammerEmoji, 64);

        // 1. Tạo 3 chiếc hang chuột hàng ngang
        const startX = 260;
        const gapX = 140;
        const y = 240;

        for (let i = 0; i < 3; i++) {
            const hx = startX + i * gapX;
            const holeSprite = this.scene.add.sprite(hx, y + 10, holeKey)
                .setDepth(110)
                .setScale(1.1);
            this.add(holeSprite);

            this.holes.push({ x: hx, y });
        }

        // 2. Tạo chú chuột chũi tàng hình ban đầu
        this.moleSprite = this.scene.add.sprite(0, 0, moleKey)
            .setDepth(111)
            .setVisible(false);
        this.add(this.moleSprite);

        // 3. Tạo búa tàng hình ban đầu
        this.hammerSprite = this.scene.add.sprite(0, 0, hammerKey)
            .setDepth(115)
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
        mole.setPosition(targetHole.x, targetHole.y + 40); // Bắt đầu ở sâu dưới hang
        mole.setVisible(true);
        mole.setAlpha(1);
        mole.setScale(0.2);

        // Tween chuột trồi lên từ hang
        this.scene.tweens.add({
            targets: mole,
            y: targetHole.y - 15,
            scaleX: 1.1,
            scaleY: 1.1,
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

        // Di chuyển búa đến gõ
        hammer.setPosition(targetHole.x + 35, targetHole.y - 65);
        hammer.setAngle(-45);
        hammer.setVisible(true);

        scene.tweens.add({
            targets: hammer,
            angle: 15,
            x: targetHole.x + 5,
            y: targetHole.y - 45,
            duration: 150,
            ease: 'Quad.easeIn',
            onComplete: () => {
                if (!self.scene) return;
                // Chuột bị đập chui tọt xuống hang
                scene.tweens.add({
                    targets: mole,
                    y: targetHole.y + 40,
                    scaleY: 0.3,
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
                self.showWhackStars(targetHole.x, targetHole.y - 25);
            }
        });
    }

    onTypeError(char) {
        if (this.activeMoleIdx === -1) return;

        // Gõ sai -> Chuột lè lưỡi trêu chọc bằng cách lắc đầu trái phải rồi thụt xuống
        const scene = this.scene;
        const mole = this.moleSprite;
        const targetHole = this.holes[this.activeMoleIdx];
        const self = this;

        this.activeMoleIdx = -1;

        scene.tweens.add({
            targets: mole,
            x: mole.x + Phaser.Math.Between(-15, 15),
            duration: 60,
            yoyo: true,
            repeat: 2,
            onComplete: () => {
                if (!self.scene) return;
                mole.x = targetHole.x;
                // Chui xuống hang
                scene.tweens.add({
                    targets: mole,
                    y: targetHole.y + 40,
                    scaleX: 0.2,
                    duration: 200,
                    onComplete: () => {
                        if (!self.scene) return;
                        mole.setVisible(false);
                        // Sinh chuột mới sau 800ms
                        self.nextMoleTimer = scene.time.delayedCall(800, () => {
                            self.spawnMole();
                        });
                    }
                });
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
