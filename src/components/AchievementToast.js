import * as Phaser from 'phaser';
import { ACHIEVEMENTS } from '../utils/AchievementManager';

export class AchievementToast extends Phaser.GameObjects.Container {
    static queue = [];
    static activeToast = null;

    static show(scene, achievementId) {
        this.queue.push({ scene, id: achievementId });
        this.processQueue();
    }

    static processQueue() {
        if (this.activeToast || this.queue.length === 0) return;

        const next = this.queue.shift();
        // Check if scene is still active/valid
        if (next.scene && next.scene.sys.isActive()) {
            this.activeToast = new AchievementToast(next.scene, next.id);
        } else {
            this.processQueue();
        }
    }

    constructor(scene, achievementId) {
        const { width, height } = scene.scale;
        // Start above the screen center
        super(scene, width / 2, -60);
        this.scene = scene;
        this.id = achievementId;

        const achievement = ACHIEVEMENTS.find(a => a.id === achievementId);
        if (!achievement) {
            this.destroy();
            AchievementToast.activeToast = null;
            AchievementToast.processQueue();
            return;
        }

        // Setup toast width and height
        const toastW = 340;
        const toastH = 75;

        // Render Background (glassmorphism/premium style)
        const bg = scene.add.graphics();
        bg.fillStyle(0x0f172a, 0.95); // Dark Slate 900
        bg.fillRoundedRect(-toastW / 2, -toastH / 2, toastW, toastH, 18);
        bg.lineStyle(2.5, 0xFBBF24, 1); // Gold shining border
        bg.strokeRoundedRect(-toastW / 2, -toastH / 2, toastW, toastH, 18);
        this.add(bg);

        // Icon Emoji
        const icon = scene.add.text(-toastW / 2 + 35, 0, achievement.icon || '🏆', {
            fontSize: '34px'
        }).setOrigin(0.5);
        this.add(icon);

        // Achievement Title (unlocked tag)
        const unlockTag = scene.add.text(-toastW / 2 + 75, -15, 'MỞ KHÓA HUY HIỆU!', {
            fontFamily: 'Outfit, Arial',
            fontSize: '12px',
            fontStyle: 'bold',
            fill: '#FBBF24'
        }).setOrigin(0, 0.5);
        this.add(unlockTag);

        // Achievement Name
        const nameText = scene.add.text(-toastW / 2 + 75, 12, achievement.title, {
            fontFamily: 'Arial',
            fontSize: '18px',
            fontStyle: 'bold',
            fill: '#FFFFFF'
        }).setOrigin(0, 0.5);
        this.add(nameText);

        // Above SpinWheelOverlay (150–153) and ResultOverlay, below banana rain (200)
        this.setDepth(190);
        this.setScrollFactor(0); // Fixed position relative to camera
        scene.add.existing(this);

        // Play alert sound
        scene.sound.play('win_sound', { volume: 0.8 });

        // Slide Down animation
        scene.tweens.add({
            targets: this,
            y: 70, // Slide down to top area of the viewport
            duration: 500,
            ease: 'Back.easeOut',
            onComplete: () => {
                // Stay for 3 seconds, then slide back up
                scene.time.delayedCall(3000, () => {
                    scene.tweens.add({
                        targets: this,
                        y: -60,
                        duration: 400,
                        ease: 'Power2.easeIn',
                        onComplete: () => {
                            this.destroy();
                            AchievementToast.activeToast = null;
                            // Process next in queue
                            AchievementToast.processQueue();
                        }
                    });
                });
            }
        });
    }
}
