import * as Phaser from 'phaser';

export class ConfirmDialog extends Phaser.GameObjects.Container {
    constructor(scene, onConfirm) {
        const { width, height } = scene.scale;
        super(scene, 0, 0);
        this.scene = scene;
        this.onConfirm = onConfirm;

        this.setScrollFactor(0);
        this.setDepth(200);

        const overlay = scene.add.rectangle(0, 0, width, height, 0x000000, 0.7)
            .setOrigin(0).setInteractive().setDepth(200);
        this.add(overlay);
        const stopEvent = (_p, _x, _y, event) => { if (event) event.stopPropagation(); };
        overlay.on('pointerdown', stopEvent);
        overlay.on('pointerup',   stopEvent);

        const dialogW = 340;
        const dialogH = 180;
        const dialog = scene.add.container(width / 2, height / 2);

        const dialogBg = scene.add.graphics();
        dialogBg.fillStyle(0x333333, 1);
        dialogBg.fillRoundedRect(-dialogW / 2, -dialogH / 2, dialogW, dialogH, 15);
        dialogBg.lineStyle(2, 0xffffff, 0.3);
        dialogBg.strokeRoundedRect(-dialogW / 2, -dialogH / 2, dialogW, dialogH, 15);

        const titleText = scene.add.text(0, -40, 'Xác nhận xoá?', {
            fontFamily: 'Arial', fontSize: '24px', fontStyle: 'bold', fill: '#FFFFFF'
        }).setOrigin(0.5);

        const descText = scene.add.text(0, -5, 'Toàn bộ tiến trình sẽ bị mất.', {
            fontFamily: 'Arial', fontSize: '16px', fill: '#cccccc'
        }).setOrigin(0.5);

        // Cancel
        const btnCancel = scene.add.container(-80, 45);
        const btnCancelBg = scene.add.graphics();
        const drawCancelBg = (color) => {
            btnCancelBg.clear();
            btnCancelBg.fillStyle(color, 1);
            btnCancelBg.fillRoundedRect(-60, -20, 120, 40, 8);
        };
        drawCancelBg(0x444444);
        
        const btnCancelText = scene.add.text(0, 0, 'Hủy bỏ', {
            fontFamily: 'Arial', fontSize: '16px', fill: '#ffffff'
        }).setOrigin(0.5);
        btnCancel.add([btnCancelBg, btnCancelText]);

        // Confirm
        const btnConfirm = scene.add.container(80, 45);
        const btnConfirmBg = scene.add.graphics();
        const drawConfirmBg = (color) => {
            btnConfirmBg.clear();
            btnConfirmBg.fillStyle(color, 1);
            btnConfirmBg.fillRoundedRect(-60, -20, 120, 40, 8);
        };
        drawConfirmBg(0xd9534f);

        const btnConfirmText = scene.add.text(0, 0, 'Xoá hết', {
            fontFamily: 'Arial', fontSize: '16px', fontStyle: 'bold', fill: '#ffffff'
        }).setOrigin(0.5);
        btnConfirm.add([btnConfirmBg, btnConfirmText]);

        dialog.add([dialogBg, titleText, descText, btnCancel, btnConfirm]);
        this.add(dialog);

        // Interactive zones in screen space for reliable click detection
        const cancelX = width / 2 - 80;
        const cancelY = height / 2 + 45;
        const cancelZone = scene.add.zone(cancelX, cancelY, 120, 40)
            .setScrollFactor(0)
            .setDepth(201)
            .setInteractive({ useHandCursor: true });
        this.add(cancelZone);
        cancelZone.on('pointerover', () => drawCancelBg(0x555555));
        cancelZone.on('pointerout', () => drawCancelBg(0x444444));
        cancelZone.on('pointerdown', stopEvent);
        cancelZone.on('pointerup', (_p, _x, _y, event) => {
            if (event) event.stopPropagation();
            this.destroy();
        });

        const confirmX = width / 2 + 80;
        const confirmY = height / 2 + 45;
        const confirmZone = scene.add.zone(confirmX, confirmY, 120, 40)
            .setScrollFactor(0)
            .setDepth(201)
            .setInteractive({ useHandCursor: true });
        this.add(confirmZone);
        confirmZone.on('pointerover', () => drawConfirmBg(0xc9302c));
        confirmZone.on('pointerout', () => drawConfirmBg(0xd9534f));
        confirmZone.on('pointerdown', stopEvent);
        confirmZone.on('pointerup', (_p, _x, _y, event) => {
            if (event) event.stopPropagation();
            this.onConfirm();
            this.destroy();
        });

        scene.add.existing(this);
    }
}
