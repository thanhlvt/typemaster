import * as Phaser from 'phaser';
import { CHAPTERS, getChapterBgKey, getChapterForLesson } from '../data/chapters';

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
    const skins = new Set(['monkey_1']); // always have fallback

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

    try {
        // Equipped monkey skin
        const equipped = JSON.parse(localStorage.getItem('typemaster_equipped_skins'));
        if (equipped && equipped.monkey && equipped.monkey !== 'random') {
            skins.add(equipped.monkey);
        }
    } catch (_) {}

    return { bgs: [...bgs], skins: [...skins] };
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
        const { bgs, skins } = getCriticalAssets();
        for (const key of bgs) {
            this.load.image(key, `assets/${key}.jpg`);
        }
        for (const key of skins) {
            this.load.image(key, `assets/${key}.png`);
        }
        this.load.image('banana', 'assets/banana.png');
        this.load.image('hand_left', 'assets/hand_left.png');
        this.load.image('hand_right', 'assets/hand_right.png');
        
        // Load audio
        this.load.audio('key_sound', 'assets/key.mp3');
        this.load.audio('level_sound', 'assets/level.mp3');
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
        this.load.audio('music_1', 'assets/music_1.mp3');
        this.load.audio('music_2', 'assets/music_2.mp3');
        this.load.audio('music_3', 'assets/music_3.mp3');
        this.load.audio('music_4', 'assets/music_4.mp3');
        this.load.audio('music_5', 'assets/music_5.mp3');
        this.load.audio('music_6', 'assets/music_6.mp3');
        this.load.audio('music_7', 'assets/music_7.mp3');
        
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
            this.scene.start('MapScene');
        });
    }
}
