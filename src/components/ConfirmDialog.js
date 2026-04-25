import * as Phaser from 'phaser';

export class ConfirmDialog extends Phaser.GameObjects.Container {
    constructor(scene, onConfirm) {
        const { width, height } = scene.scale;
        super(scene, 0, 0);
        this.scene = scene;
        this.onConfirm = onConfirm;

        const overlay = scene.add.rectangle(0, 0, width, height, 0x000000, 0.7)
            .setOrigin(0).setInteractive();
        this.add(overlay);

        const dialogW = 340;
        const dialogH = 180;
        const dialog = scene.add.container(width / 2, height / 2);
        
        const dialogBg = scene.add.graphics();
        dialogBg.fillStyle(0x333333, 1);
        dialogBg.fillRoundedRect(-dialogW / 2, -dialogH / 2, dialogW, dialogH, 15);
        dialogBg.lineStyle(2, 0xffffff, 0.3);
        dialogBg.strokeRoundedRect(-dialogW / 2, -dialogH / 2, dialogW, dialogH, 15);

        const titleText = scene.add.text(0, -40, 'Xác nhận xóa?', {
            fontFamily: 'Arial', fontSize: '24px', fontStyle: 'bold', fill: '#FFFFFF'
        }).setOrigin(0.5);

        const descText = scene.add.text(0, -5, 'Toàn bộ tiến trình sẽ bị mất.', {
            fontFamily: 'Arial', fontSize: '16px', fill: '#cccccc'
        }).setOrigin(0.5);

        // Cancel
        const btnCancel = scene.add.container(-80, 45);
        const btnCancelBg = scene.add.graphics();
        btnCancelBg.fillStyle(0x444444, 1);
        btnCancelBg.fillRoundedRect(-60, -20, 120, 40, 8);
        const btnCancelText = scene.add.text(0, 0, 'Hủy bỏ', {
            fontFamily: 'Arial', fontSize: '16px', fill: '#ffffff'
        }).setOrigin(0.5);
        btnCancel.add([btnCancelBg, btnCancelText]);
        btnCancel.setSize(120, 40).setInteractive({ useHandCursor: true })
            .on('pointerdown', () => this.destroy());

        // Confirm
        const btnConfirm = scene.add.container(80, 45);
        const btnConfirmBg = scene.add.graphics();
        btnConfirmBg.fillStyle(0xd9534f, 1);
        btnConfirmBg.fillRoundedRect(-60, -20, 120, 40, 8);
        const btnConfirmText = scene.add.text(0, 0, 'Xóa hết', {
            fontFamily: 'Arial', fontSize: '16px', fontStyle: 'bold', fill: '#ffffff'
        }).setOrigin(0.5);
        btnConfirm.add([btnConfirmBg, btnConfirmText]);
        btnConfirm.setSize(120, 40).setInteractive({ useHandCursor: true })
            .on('pointerdown', () => {
                this.onConfirm();
                this.destroy();
            });

        dialog.add([dialogBg, titleText, descText, btnCancel, btnConfirm]);
        this.add(dialog);
        
        scene.add.existing(this);
    }
}
