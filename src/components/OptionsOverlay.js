import * as Phaser from 'phaser';
import { ProgressManager } from '../utils/ProgressManager';
import { ConfirmDialog } from './ConfirmDialog';

export class OptionsOverlay extends Phaser.GameObjects.Container {
    constructor(scene, onClose) {
        const { width, height } = scene.scale;
        super(scene, 0, 0);
        this.scene = scene;
        this.setDepth(20); // Render above header

        // Solid dark background overlay to block inputs
        const overlay = scene.add.rectangle(0, 0, width, height, 0x0a0f1d, 0.95)
            .setOrigin(0).setInteractive().setScrollFactor(0);
        this.add(overlay);
        const stopEvent = (_p, _x, _y, event) => { if (event) event.stopPropagation(); };
        overlay.on('pointerdown', stopEvent);
        overlay.on('pointerup',   stopEvent);

        // Dialog center container
        const dialog = scene.add.container(width / 2, height / 2).setScrollFactor(0);
        this.add(dialog);

        // Dialog Background
        const dialogW = 600;
        const dialogH = 400;
        const bg = scene.add.graphics();
        bg.fillStyle(0x0f172a, 1.0); // Solid Deep Slate 900
        bg.fillRoundedRect(-dialogW / 2, -dialogH / 2, dialogW, dialogH, 24);
        bg.lineStyle(3, 0x38bdf8, 1); // Sky blue border
        bg.strokeRoundedRect(-dialogW / 2, -dialogH / 2, dialogW, dialogH, 24);
        dialog.add(bg);

        // Header Title
        const title = scene.add.text(0, -dialogH / 2 + 40, '⚙️ CÀI ĐẶT ÂM THANH', {
            fontFamily: 'Outfit, Arial',
            fontSize: '26px',
            fontStyle: 'bold',
            fill: '#38BDF8',
            stroke: '#000000',
            strokeThickness: 3
        }).setOrigin(0.5);
        dialog.add(title);

        // Load current audio settings
        const settings = ProgressManager.getAudioSettings();
        this.isMute = settings.mute;
        this.volume = settings.volume;

        // Apply initially to Phaser global sound manager
        scene.sound.mute = this.isMute;
        scene.sound.volume = this.volume;

        // --- Mute Toggle Section (Y = -30) ---
        const muteY = -30;
        this.muteLabel = scene.add.text(-180, muteY, this.isMute ? 'ÂM THANH: TẮT' : 'ÂM THANH: BẬT', {
            fontFamily: 'Outfit, Arial', fontSize: '18px', fontStyle: 'bold', fill: '#FFFFFF'
        }).setOrigin(0, 0.5);
        dialog.add(this.muteLabel);

        this.switchGraphics = scene.add.graphics();
        dialog.add(this.switchGraphics);

        const switchX = 120;
        const switchW = 70;
        const switchH = 32;

        const drawSwitch = () => {
            this.switchGraphics.clear();
            
            // Draw track
            const trackColor = this.isMute ? 0x475569 : 0x10b981; // Slate 600 vs Emerald 500
            this.switchGraphics.fillStyle(trackColor, 1.0);
            this.switchGraphics.fillRoundedRect(switchX - switchW / 2, muteY - switchH / 2, switchW, switchH, 16);
            this.switchGraphics.lineStyle(1.5, 0xffffff, 0.2);
            this.switchGraphics.strokeRoundedRect(switchX - switchW / 2, muteY - switchH / 2, switchW, switchH, 16);

            // Draw knob
            const knobRadius = 12;
            const knobX = this.isMute ? (switchX - switchW / 2 + 16) : (switchX + switchW / 2 - 16);
            this.switchGraphics.fillStyle(0xffffff, 1.0);
            this.switchGraphics.fillCircle(knobX, muteY, knobRadius);
        };
        drawSwitch();

        // Switch interaction zone (placed in absolute screen space and added to container root)
        const screenSwitchX = width / 2 + switchX;
        const screenSwitchY = height / 2 + muteY;
        const switchZone = scene.add.zone(screenSwitchX, screenSwitchY, switchW + 10, switchH + 10)
            .setScrollFactor(0)
            .setInteractive({ useHandCursor: true });
        this.add(switchZone);

        switchZone.on('pointerdown', () => {
            this.isMute = !this.isMute;
            scene.sound.mute = this.isMute;
            
            // Save & update UI
            ProgressManager.saveAudioSettings({ mute: this.isMute, volume: this.volume });
            this.muteLabel.setText(this.isMute ? 'ÂM THANH: TẮT' : 'ÂM THANH: BẬT');
            drawSwitch();

            if (!this.isMute) {
                scene.sound.play('key_sound');
            }
        });

        // --- Volume Slider Section (Y = 60) ---
        const volY = 60;
        this.volumeLabel = scene.add.text(-180, volY, `ÂM LƯỢNG: ${Math.round(this.volume * 100)}%`, {
            fontFamily: 'Outfit, Arial', fontSize: '18px', fontStyle: 'bold', fill: '#FFFFFF'
        }).setOrigin(0, 0.5);
        dialog.add(this.volumeLabel);

        this.sliderGraphics = scene.add.graphics();
        dialog.add(this.sliderGraphics);

        const sliderLeft = -20;
        const sliderWidth = 240;
        const sliderHeight = 10;
        const knobRadius = 12;

        const drawSlider = () => {
            this.sliderGraphics.clear();

            // Background track
            this.sliderGraphics.fillStyle(0x334155, 1.0); // Slate-700
            this.sliderGraphics.fillRoundedRect(sliderLeft, volY - sliderHeight / 2, sliderWidth, sliderHeight, 5);

            // Active track (from left to knob)
            const activeW = this.volume * sliderWidth;
            if (activeW > 0) {
                this.sliderGraphics.fillStyle(0x38bdf8, 1.0); // Sky-blue active
                this.sliderGraphics.fillRoundedRect(sliderLeft, volY - sliderHeight / 2, activeW, sliderHeight, 5);
            }

            // Knob
            const knobX = sliderLeft + activeW;
            this.sliderGraphics.fillStyle(0xffffff, 1.0);
            this.sliderGraphics.fillCircle(knobX, volY, knobRadius);
            this.sliderGraphics.lineStyle(1.5, 0x38bdf8, 1.0);
            this.sliderGraphics.strokeCircle(knobX, volY, knobRadius);
        };
        drawSlider();

        // Slider interaction zone (placed in absolute screen space and added to container root)
        const screenSliderX = width / 2 + sliderLeft + sliderWidth / 2;
        const screenSliderY = height / 2 + volY;
        const sliderZone = scene.add.zone(screenSliderX, screenSliderY, sliderWidth + 30, 40)
            .setScrollFactor(0)
            .setInteractive({ useHandCursor: true });
        this.add(sliderZone);

        // Helper to update volume on input (compares pointer.x with absolute screen slider left)
        const updateVolumeFromPointer = (pointer) => {
            const screenSliderLeft = width / 2 + sliderLeft;
            let pct = Phaser.Math.Clamp((pointer.x - screenSliderLeft) / sliderWidth, 0, 1);
            
            this.volume = pct;
            scene.sound.volume = pct;

            // If slider was dragged up, auto-unmute
            if (pct > 0 && this.isMute) {
                this.isMute = false;
                scene.sound.mute = false;
                this.muteLabel.setText('ÂM THANH: BẬT');
                drawSwitch();
            }

            // Save and update UI
            ProgressManager.saveAudioSettings({ mute: this.isMute, volume: this.volume });
            this.volumeLabel.setText(`ÂM LƯỢNG: ${Math.round(this.volume * 100)}%`);
            drawSlider();
        };

        // Pointer events for slider
        sliderZone.on('pointerdown', (pointer) => {
            this.isDraggingVolume = true;
            updateVolumeFromPointer(pointer);
        });

        scene.input.on('pointermove', (pointer) => {
            if (this.isDraggingVolume && pointer.isDown) {
                updateVolumeFromPointer(pointer);
            }
        });

        scene.input.on('pointerup', () => {
            if (this.isDraggingVolume) {
                this.isDraggingVolume = false;
                
                // Play preview click at release
                if (!this.isMute) {
                    scene.sound.play('key_sound');
                }
            }
        });

        // --- Reset Data Button Section (Y = 135) ---
        const resetY = 135;
        const resetW = 240;
        const resetH = 42;

        const resetBg = scene.add.graphics();
        dialog.add(resetBg);

        const drawResetBg = (color, strokeColor = 0xFCA5A5) => {
            resetBg.clear();
            resetBg.fillStyle(color, 0.9);
            resetBg.fillRoundedRect(-resetW / 2, resetY - resetH / 2, resetW, resetH, 12);
            resetBg.lineStyle(2, strokeColor, 1);
            resetBg.strokeRoundedRect(-resetW / 2, resetY - resetH / 2, resetW, resetH, 12);
        };
        drawResetBg(0x7f1d1d); // Dark red base

        const resetText = scene.add.text(0, resetY, '↺ Reset data học tập', {
            fontFamily: 'Outfit, Arial', fontSize: '15px', fontStyle: 'bold', fill: '#FCA5A5'
        }).setOrigin(0.5);
        dialog.add(resetText);

        const resetZone = scene.add.zone(width / 2, height / 2 + resetY, resetW, resetH)
            .setScrollFactor(0)
            .setInteractive({ useHandCursor: true });
        this.add(resetZone);

        resetZone.on('pointerover', () => {
            drawResetBg(0x991b1b, 0xFEE2E2); // lighter red on hover
            scene.tweens.add({ targets: resetText, scaleX: 1.05, scaleY: 1.05, duration: 100 });
        });
        resetZone.on('pointerout', () => {
            drawResetBg(0x7f1d1d, 0xFCA5A5);
            scene.tweens.add({ targets: resetText, scaleX: 1.0, scaleY: 1.0, duration: 100 });
        });
        resetZone.on('pointerdown', stopEvent);
        resetZone.on('pointerup', (_p, _x, _y, event) => {
            if (event) event.stopPropagation();
            scene.sound.play('key_sound');
            new ConfirmDialog(scene, () => {
                ProgressManager.clearAll();
                scene.scene.restart();
            });
        });

        // --- Close Button ---
        const closeBtnX = dialogW / 2 - 35;
        const closeBtnY = -dialogH / 2 + 35;
        const screenCloseX = width / 2 + closeBtnX;
        const screenCloseY = height / 2 + closeBtnY;

        const closeBtnBg = scene.add.graphics();
        const drawCloseBg = (color) => {
            closeBtnBg.clear();
            closeBtnBg.fillStyle(color, 0.85);
            closeBtnBg.fillCircle(closeBtnX, closeBtnY, 18);
        };
        drawCloseBg(0x334155);
        dialog.add(closeBtnBg);

        const closeText = scene.add.text(closeBtnX, closeBtnY, '✕', {
            fontFamily: 'Arial', fontSize: '18px', fontStyle: 'bold', fill: '#FFF'
        }).setOrigin(0.5);
        dialog.add(closeText);

        const closeZone = scene.add.zone(screenCloseX, screenCloseY, 36, 36)
            .setScrollFactor(0)
            .setDepth(21)
            .setInteractive({ useHandCursor: true });
        this.add(closeZone);

        closeZone.on('pointerover', () => drawCloseBg(0x475569));
        closeZone.on('pointerout', () => drawCloseBg(0x334155));
        closeZone.on('pointerdown', stopEvent);
        closeZone.on('pointerup', (_p, _x, _y, event) => {
            if (event) event.stopPropagation();
            scene.sound.play('key_sound');
            this.destroy();
            if (onClose) onClose();
        });

        // Dialog slide-in zoom effect
        dialog.setScale(0.85);
        dialog.setAlpha(0);
        scene.tweens.add({
            targets: dialog,
            scaleX: 1,
            scaleY: 1,
            alpha: 1,
            duration: 300,
            ease: 'Back.easeOut'
        });

        scene.add.existing(this);
    }
}
