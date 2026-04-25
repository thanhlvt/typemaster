import * as Phaser from 'phaser';

export class ResultOverlay extends Phaser.GameObjects.Container {
    constructor(scene, accuracy, wpm, isLastLesson, onAdvance) {
        const { width, height } = scene.scale;
        super(scene, 0, 0);
        this.scene = scene;

        const overlay = scene.add.rectangle(0, 0, width, height, 0x000000, 0.8)
            .setOrigin(0).setInteractive();
        this.add(overlay);

        const container = scene.add.container(width / 2, height / 2 - 40);

        // Stars background/shine
        const shine = scene.add.graphics();
        shine.fillStyle(0xFFC107, 0.1);
        shine.fillCircle(0, -60, 150);
        container.add(shine);

        const title = scene.add.text(0, -110, 'XUẤT SẮC!', {
            fontFamily: 'Outfit, Arial', fontSize: '56px', fontStyle: 'bold', fill: '#FFC107'
        }).setOrigin(0.5).setAlpha(0).setScale(0.5);

        const statsBg = scene.add.graphics();
        statsBg.fillStyle(0x333333, 1);
        statsBg.fillRoundedRect(-150, -40, 300, 120, 15);
        statsBg.lineStyle(2, 0xffffff, 0.1);
        statsBg.strokeRoundedRect(-150, -40, 300, 120, 15);
        statsBg.setAlpha(0);

        const accText = scene.add.text(-80, 20, `Chính xác\n${accuracy}%`, {
            fontFamily: 'Arial', fontSize: '20px', align: 'center', fill: '#ffffff'
        }).setOrigin(0.5).setAlpha(0);

        const wpmText = scene.add.text(80, 20, `Tốc độ\n${wpm} WPM`, {
            fontFamily: 'Arial', fontSize: '20px', align: 'center', fill: '#ffffff'
        }).setOrigin(0.5).setAlpha(0);

        const promptStr = isLastLesson ? 'Chúc mừng! Bạn đã hoàn thành.' : 'Nhấn SPACE để tiếp tục';
        const btnText = scene.add.text(0, 155, promptStr, {
            fontFamily: 'Arial', fontSize: '28px', fontStyle: 'bold', fill: '#FFFFFF'
        }).setOrigin(0.5).setAlpha(0);
        btnText.setShadow(0, 2, '#000000', 4, true, true);

        const btnBg = scene.add.graphics();
        btnBg.fillStyle(0x4CAF50, 1);
        btnBg.fillRoundedRect(-170, 130, 340, 50, 25);
        btnBg.lineStyle(3, 0xffffff, 0.3);
        btnBg.strokeRoundedRect(-170, 130, 340, 50, 25);
        btnBg.setAlpha(0);

        container.add([statsBg, accText, wpmText, title, btnBg, btnText]);
        this.add(container);

        // Animations
        scene.tweens.add({ targets: title, alpha: 1, scale: 1, duration: 600, ease: 'Back.Out' });
        scene.tweens.add({ targets: [statsBg, accText, wpmText], alpha: 1, y: '+=15', duration: 500, delay: 300, ease: 'Power2' });
        scene.tweens.add({ targets: [accText, wpmText], alpha: 1, duration: 400, delay: 600 });
        scene.tweens.add({ targets: [btnBg, btnText], alpha: 1, duration: 300, delay: 850 });

        scene.time.delayedCall(1150, () => {
            scene.tweens.add({
                targets: [btnText, btnBg],
                scaleX: 1.05, scaleY: 1.05,
                duration: 600, yoyo: true, repeat: -1, ease: 'Sine.InOut'
            });
        });

        // Monkey jump animation if scene has it
        if (scene.monkey) {
            const origY = scene.monkey.y;
            scene.tweens.add({
                targets: scene.monkey,
                y: origY - 70,
                duration: 220,
                yoyo: true,
                repeat: 4,
                ease: 'Power2'
            });
        }

        // Banana rain
        const lessonBananas = [];
        for (let i = 0; i < 10; i++) {
            scene.time.delayedCall(i * 130, () => {
                const b = scene.add.image(
                    Phaser.Math.Between(30, width - 30), -30, 'banana'
                ).setScale(Phaser.Math.FloatBetween(0.2, 0.4))
                    .setAngle(Phaser.Math.Between(-45, 45));

                lessonBananas.push(b);
                this.add(b); // Add to overlay container so it's cleaned up

                scene.tweens.add({
                    targets: b,
                    y: height + 40,
                    angle: b.angle + Phaser.Math.Between(-180, 180),
                    duration: Phaser.Math.Between(900, 1600),
                    ease: 'Linear',
                    onComplete: () => {
                        b.destroy();
                    }
                });
            });
        }

        scene.add.existing(this);
    }
}
