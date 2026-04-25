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
        
        // Load audio
        this.load.audio('key_sound', 'assets/key.mp3');
        this.load.audio('error_sound', 'assets/error.mp3');
        this.load.audio('win_sound', 'assets/win.mp3');
        this.load.audio('level_sound', 'assets/level.mp3');
        
        this.load.on('filecomplete-audio-key_sound', () => console.log('key_sound loaded'));
        this.load.on('filecomplete-audio-error_sound', () => console.log('error_sound loaded'));
        this.load.on('filecomplete-audio-win_sound', () => console.log('win_sound loaded'));
        this.load.on('filecomplete-audio-level_sound', () => console.log('level_sound loaded'));
        
        // Load manifest
        this.load.json('manifest', 'data.json');
        
        // Listen for manifest completion to load sub-files
        this.load.on('filecomplete-json-manifest', (key, type, data) => {
            if (data.rulesFile) {
                this.load.json('rules', data.rulesFile);
            }
            if (data.lessonFiles) {
                data.lessonFiles.forEach((file, index) => {
                    this.load.json(`lessons_chunk_${index}`, file);
                });
            }
        });
        
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
            // Reassemble gameData from parts
            const manifest = this.cache.json.get('manifest');
            const rules = this.cache.json.get('rules');
            const allLessons = [];
            
            if (manifest && manifest.lessonFiles) {
                manifest.lessonFiles.forEach((_, index) => {
                    const chunk = this.cache.json.get(`lessons_chunk_${index}`);
                    if (chunk && chunk.lessons) {
                        allLessons.push(...chunk.lessons);
                    }
                });
            }

            this.cache.json.add('gameData', {
                lessons: allLessons,
                telex_rules: rules ? rules.telex_rules : {}
            });

            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
            this.scene.start('PlayScene');
        });
    }
}
