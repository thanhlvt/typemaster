import * as Phaser from 'phaser';
import { BootScene } from './scenes/BootScene';
import { MapScene } from './scenes/MapScene';
import { PlayScene } from './scenes/PlayScene';
import { SprintScene } from './scenes/SprintScene';

const config = {
    type: Phaser.AUTO,
    width: 1024,
    height: 768,
    parent: 'game-container',
    backgroundColor: '#000000',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.NO_CENTER
    },
    scene: [BootScene, MapScene, PlayScene, SprintScene]
};

window.addEventListener('load', () => {
    new Phaser.Game(config);
});
