import * as Phaser from 'phaser';

export class TypingBox extends Phaser.GameObjects.Container {
    constructor(scene) {
        const { width, height } = scene.scale;
        super(scene, 0, 0);
        this.scene = scene;

        const bgTop    = height * 0.52;
        const bgHeight = height * 0.22;

        const bg = scene.add.graphics();
        bg.fillStyle(0xffffff, 0.8);
        bg.fillRoundedRect(width * 0.02, bgTop, width * 0.96, bgHeight, 20);
        this.add(bg);

        this.targetText = scene.add.text(width / 2, bgTop + bgHeight * 0.18, '', {
            fontFamily: 'Verdana, sans-serif',
            fontSize: '48px', fontStyle: 'bold', fill: '#333'
        }).setOrigin(0.5);
        this.add(this.targetText);

        this.ruleHint = scene.add.text(width / 2, bgTop + bgHeight * 0.46, '', {
            fontFamily: 'Arial',
            fontSize: '24px', fontStyle: 'bold', fill: '#E65100'
        }).setOrigin(0.5);
        this.add(this.ruleHint);

        this.typedText = scene.add.text(width / 2, bgTop + bgHeight * 0.70, '', {
            fontFamily: 'Verdana, sans-serif',
            fontSize: '44px', fontStyle: 'bold', fill: '#2E7D32'
        }).setOrigin(0.5);
        this.add(this.typedText);

        scene.add.existing(this);
    }

    setTargetText(text) {
        this.targetText.setText(text);
    }

    setRuleHint(text) {
        this.ruleHint.setText(text);
    }

    setTypedText(text) {
        this.typedText.setText(text);
    }
}
