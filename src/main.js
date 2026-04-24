import * as Phaser from 'phaser';
console.log('Phaser imported:', Phaser.VERSION);
import { BootScene } from './scenes/BootScene';
import { PlayScene } from './scenes/PlayScene';

const config = {
    type: Phaser.AUTO,
    width: 1024,
    height: 768,
    parent: 'game-container',
    backgroundColor: '#000000',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: [BootScene, PlayScene]
};

console.log('Script main.js is running');

window.addEventListener('load', () => {
    console.log('Window loaded, initializing game');
    try {
        console.log('Phaser version:', Phaser.VERSION);
        const game = new Phaser.Game(config);
        console.log('Game instance created:', game);
    } catch (e) {
        console.error('Error initializing Phaser:', e);
    }
});
