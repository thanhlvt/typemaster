import * as Phaser from 'phaser';

/**
 * ComboManager
 * Manages combo state and all related visual effects in PlayScene.
 *
 * Usage:
 *   const combo = new ComboManager();
 *   const multiplier = combo.onSuccess();   // increment & get multiplier
 *   combo.onFail();                          // reset combo
 *   combo.reset();                           // reset at lesson start
 *   combo.showPopup(scene, multiplier);      // full-screen burst animation
 *   combo.checkMilestone(scene);             // shake + milestone label
 */
export class ComboManager {
    constructor() {
        this.comboCount = 0;
    }

    // ── State ─────────────────────────────────────────────────────

    reset() {
        this.comboCount = 0;
    }

    getMultiplier() {
        if (this.comboCount >= 10) return 4;
        if (this.comboCount >= 6)  return 3;
        if (this.comboCount >= 3)  return 2;
        return 1;
    }

    /** Call on correct word → increments combo, returns current multiplier */
    onSuccess() {
        this.comboCount++;
        return this.getMultiplier();
    }

    /** Call on wrong key → resets combo */
    onFail() {
        this.comboCount = 0;
    }

    // ── Effects ───────────────────────────────────────────────────

    /**
     * Full-screen transient combo burst.
     * Random position (center region), random tilt, large text, multi-phase animation.
     * Only called when multiplier >= 2.
     */
    showPopup(scene, multiplier) {
        const { width, height } = scene.scale;
        const textColors  = { 2: '#FCD34D', 3: '#F87171', 4: '#C084FC' };
        const flashColors = { 2: 0xD97706,  3: 0xDC2626,  4: 0x7C3AED  };

        const txtColor  = textColors[multiplier]  || '#FCD34D';
        const flashFill = flashColors[multiplier] || 0xD97706;
        const fontSize  = multiplier >= 4 ? '120px' : multiplier >= 3 ? '108px' : '96px';

        // Random position within center 40% of screen
        const rx    = Phaser.Math.Between(width  * 0.3, width  * 0.7);
        const ry    = Phaser.Math.Between(height * 0.3, height * 0.65);
        const angle = Phaser.Math.Between(-20, 20);

        // ── Full-screen color flash ───────────────────────────────
        const flashAlpha = multiplier >= 4 ? 0.22 : multiplier >= 3 ? 0.16 : 0.10;
        const flash = scene.add.rectangle(0, 0, width, height, flashFill, flashAlpha)
            .setOrigin(0).setDepth(8);
        scene.tweens.add({
            targets: flash, alpha: 0, duration: 500,
            ease: 'Cubic.easeOut', onComplete: () => flash.destroy()
        });

        // ── Main combo text ───────────────────────────────────────
        const comboText = scene.add.text(rx, ry, `🔥 ×${multiplier}`, {
            fontFamily: 'Arial Black, Arial',
            fontSize,
            fontStyle: 'bold',
            fill: txtColor,
            stroke: '#000',
            strokeThickness: 10
        }).setOrigin(0.5).setDepth(9).setAngle(angle).setScale(0.2).setAlpha(0);

        // ── Sub-label ─────────────────────────────────────────────
        const subOffsetY = parseInt(fontSize) * 0.75;
        const subText = scene.add.text(rx, ry + subOffsetY, `${this.comboCount} COMBO!`, {
            fontFamily: 'Arial Black, Arial',
            fontSize: '38px',
            fontStyle: 'bold',
            fill: '#FFFFFF',
            stroke: '#000',
            strokeThickness: 7
        }).setOrigin(0.5).setDepth(9).setAngle(angle).setAlpha(0);

        // Phase 1 → overshoot pop-in
        scene.tweens.add({
            targets: comboText,
            scaleX: 1.15, scaleY: 1.15, alpha: 1,
            duration: 220, ease: 'Back.easeOut',
            onComplete: () => {
                // Phase 2 → settle
                scene.tweens.add({
                    targets: comboText, scaleX: 1.0, scaleY: 1.0,
                    duration: 150, ease: 'Sine.easeInOut',
                    onComplete: () => {
                        // Phase 3 → hold then float up & fade
                        scene.tweens.add({
                            targets: comboText,
                            y: comboText.y - 50, alpha: 0,
                            duration: 700, delay: 400,
                            ease: 'Cubic.easeIn',
                            onComplete: () => comboText.destroy()
                        });
                    }
                });
            }
        });

        scene.tweens.add({
            targets: subText, alpha: 0.95,
            duration: 180, ease: 'Linear',
            onComplete: () => {
                scene.tweens.add({
                    targets: subText,
                    y: subText.y - 50, alpha: 0,
                    duration: 700, delay: 420,
                    ease: 'Cubic.easeIn',
                    onComplete: () => subText.destroy()
                });
            }
        });

        // ── Expanding rings (×3 and ×4 only) ─────────────────────
        if (multiplier >= 3) {
            for (let i = 0; i < 3; i++) {
                const ring = scene.add.text(rx, ry, `×${multiplier}`, {
                    fontFamily: 'Arial Black, Arial',
                    fontSize,
                    fontStyle: 'bold',
                    fill: txtColor
                }).setOrigin(0.5).setDepth(7).setAngle(angle)
                  .setAlpha(0.35 - i * 0.1).setScale(0.8 + i * 0.15);

                scene.tweens.add({
                    targets: ring,
                    scaleX: ring.scaleX + 0.6,
                    scaleY: ring.scaleY + 0.6,
                    alpha: 0,
                    duration: 500 + i * 100,
                    delay: i * 60,
                    ease: 'Cubic.easeOut',
                    onComplete: () => ring.destroy()
                });
            }
        }
    }

    /**
     * Check if current comboCount is a milestone.
     * If so: screen shake + floating label.
     */
    checkMilestone(scene) {
        const milestones = [3, 6, 10, 15, 20, 30];
        if (!milestones.includes(this.comboCount)) return;

        const multiplier = this.getMultiplier();
        const { width, height } = scene.scale;

        // Shake — stronger at higher tiers
        const shakeIntensity = multiplier >= 4 ? 0.014 : multiplier >= 3 ? 0.010 : 0.006;
        scene.cameras.main.shake(350, shakeIntensity);

        // Milestone label
        const labels = {
            3:  '🔥 COMBO BẮT ĐẦU!',
            6:  '⚡ COMBO SIÊU!',
            10: '💥 COMBO ĐIÊN CUỒNG!',
            15: '🌟 COMBO HUYỀN THOẠI!',
            20: '👑 COMBO VÔ ĐỊCH!',
            30: '🚀 COMBO THIÊN HÀ!'
        };
        const labelText  = labels[this.comboCount] || `🔥 COMBO ×${multiplier}!`;
        const textColors = { 2: '#FCD34D', 3: '#F87171', 4: '#C084FC' };
        const txtColor   = textColors[multiplier] || '#FCD34D';

        const milestoneText = scene.add.text(width / 2, height / 2 - 60, labelText, {
            fontFamily: 'Arial', fontSize: '36px', fontStyle: 'bold',
            fill: txtColor, stroke: '#000', strokeThickness: 5
        }).setOrigin(0.5).setDepth(10).setScale(0.5);

        // Pop in → float up → fade out
        scene.tweens.add({
            targets: milestoneText, scaleX: 1, scaleY: 1,
            duration: 200, ease: 'Back.easeOut',
            onComplete: () => {
                scene.tweens.add({
                    targets: milestoneText, y: milestoneText.y - 80, alpha: 0,
                    duration: 900, ease: 'Cubic.easeOut',
                    onComplete: () => milestoneText.destroy()
                });
            }
        });
    }
}
