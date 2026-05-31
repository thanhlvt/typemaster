import * as Phaser from 'phaser';
import { CHAPTERS, getChapterBgKey, getChapterForLesson } from '../data/chapters';
import { lessons } from '../data/lessons';
import { rules } from '../data/rules';

function getLastUnlockedBg(lessonStats) {
    let lastKey = 'bg_1_1';
    for (const chapter of CHAPTERS) {
        const firstLesson = chapter.range[0];
        if (chapter.id === 1 || (lessonStats[firstLesson] && lessonStats[firstLesson].stars > 0)) {
            lastKey = getChapterBgKey(chapter);
        } else {
            break; // chapters unlock sequentially
        }
    }
    return lastKey;
}

function getCriticalAssets() {
    const bgs = new Set(['bg_1_1']);  // always have fallback

    try {
        // Current chapter background
        const saved = JSON.parse(localStorage.getItem('typemaster_progress'));
        if (saved && saved.lessonIndex !== undefined) {
            const chapter = getChapterForLesson(saved.lessonIndex);
            if (chapter) {
                bgs.add(getChapterBgKey(chapter));
            }
        }

        // Last unlocked background (used for MapScene)
        if (saved && saved.lessonStats) {
            const lastBg = getLastUnlockedBg(saved.lessonStats);
            if (lastBg) {
                bgs.add(lastBg);
            }
        }
    } catch (_) {}

    return { bgs: [...bgs] };
}

export class BootScene extends Phaser.Scene {
    constructor() {
        super('BootScene');
    }

    preload() {
        // Hide HTML splash before drawing progress bar
        document.getElementById('splash-lcp')?.remove();

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

        // Load critical backgrounds and skins only
        const { bgs } = getCriticalAssets();
        for (const key of bgs) {
            this.load.image(key, `assets/${key}.jpg`);
        }
        for (let i = 1; i <= 10; i++) {
            this.load.image(`monkey_${i}`, `assets/monkey_${i}.png`);
        }
        this.load.image('banana', 'assets/banana.png');
        this.load.image('hand_left', 'assets/hand_left.png');
        this.load.image('hand_right', 'assets/hand_right.png');
        
        // Load audio
        this.load.audio('key_sound', 'assets/key.mp3');
        this.load.audio('level_sound', 'assets/level.mp3');
        this.load.audio('lost_sound', 'assets/lost.mp3');
        this.load.audio('error_sound', 'assets/error.mp3');
        this.load.audio('win_sound', 'assets/win.mp3');
        this.load.audio('spin1', 'assets/spin1.mp3');
        this.load.audio('spin2', 'assets/spin2.mp3');
        this.load.audio('spin3', 'assets/spin3.mp3');
        this.load.audio('whoosh', 'assets/whoosh.mp3');
        this.load.audio('achievement', 'assets/achievement.mp3');
        this.load.audio('congrat', 'assets/congrat.mp3');
        this.load.audio('blob', 'assets/blob.mp3');
        this.load.audio('boss_sound', 'assets/boss.mp3');
        this.load.audio('chime', 'assets/chime.mp3');
        this.load.audio('music_1', 'assets/music_1.mp3');
        this.load.audio('music_2', 'assets/music_2.mp3');
        this.load.audio('music_3', 'assets/music_3.mp3');
        this.load.audio('music_4', 'assets/music_4.mp3');
        this.load.audio('music_5', 'assets/music_5.mp3');
        this.load.audio('music_6', 'assets/music_6.mp3');
        this.load.audio('music_7', 'assets/music_7.mp3');
        
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
            this.cache.json.add('gameData', {
                lessons: lessons,
                telex_rules: rules
            });

            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
            this.scene.start('MapScene');
        });
    }
}
