import * as Phaser from 'phaser';

export class BootScene extends Phaser.Scene {
    constructor() {
        super('BootScene');
    }

    preload() {
        console.log('BootScene: preload started');
        // Display loading progress
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;
        const loadingText = this.make.text({
            x: width / 2,
            y: height / 2 - 50,
            text: 'Đang tải...',
            style: {
                font: 'bold 32px monospace',
                fill: '#ffffff'
            }
        });
        loadingText.setOrigin(0.5, 0.5);

        // Assets will be loaded here
        for (let i = 1; i <= 10; i++) {
            this.load.image(`bg_${i}`, `assets/bg_${i}.png`);
            this.load.image(`monkey_${i}`, `assets/monkey_${i}.png`);
        }
        this.load.image('banana', 'assets/banana.png');
        this.load.image('hand_left', 'assets/hand_left.png');
        this.load.image('hand_right', 'assets/hand_right.png');
        this.load.json('gameData', 'data.json');
        
        // Progress bar
        const progressBar = this.add.graphics();
        const progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(width / 2 - 160, height / 2, 320, 50);

        this.load.on('progress', (value) => {
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(width / 2 - 150, height / 2 + 10, 300 * value, 30);
        });

        this.load.on('complete', () => {
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
            this.scene.start('PlayScene');
        });
    }
}
