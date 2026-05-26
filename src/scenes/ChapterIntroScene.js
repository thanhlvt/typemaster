import * as Phaser from 'phaser';
import { getChapterForLesson, getGroupForChapter, getChapterBgKey } from '../data/chapters';
import { ensureTextures } from '../utils/TextureLoader';

export class ChapterIntroScene extends Phaser.Scene {
    constructor() {
        super('ChapterIntroScene');
    }

    init(data) {
        this.nextLessonIndex = data.lessonIndex !== undefined ? data.lessonIndex : 14;
        this.chapter = getChapterForLesson(this.nextLessonIndex);
        this.group = getGroupForChapter(this.chapter);
        this.bgTexture = getChapterBgKey(this.chapter);
    }

    create() {
        const { width, height } = this.scale;

        // Prevent Space/Enter key events from propagating to the browser (e.g., scrolling the page)
        this.input.keyboard.addCapture([
            Phaser.Input.Keyboard.KeyCodes.SPACE,
            Phaser.Input.Keyboard.KeyCodes.ENTER
        ]);

        this.events.once('shutdown', () => {
            this.input.keyboard.removeCapture([
                Phaser.Input.Keyboard.KeyCodes.SPACE,
                Phaser.Input.Keyboard.KeyCodes.ENTER
            ]);
        });

        // Static dark backdrop until dynamic texture loads
        this.bgImage = this.add.image(width / 2, height / 2, 'bg_1_1').setDisplaySize(width, height);
        this.bgImage.setAlpha(0.25);

        // Dark dim mask
        const overlay = this.add.rectangle(0, 0, width, height, 0x000000, 0.65).setOrigin(0).setDepth(5);

        // Dynamically load the new chapter background
        ensureTextures(this, [
            { key: this.bgTexture, url: `assets/${this.bgTexture}.jpg` }
        ], () => {
            if (this.bgImage) {
                this.bgImage.setTexture(this.bgTexture).setDisplaySize(this.scale.width, this.scale.height);
            }
        });

        // Main animation card container
        const container = this.add.container(width / 2, height / 2).setDepth(10);

        // Styling the announcement card
        const cardW = 580;
        const cardH = 380;
        
        const cardBg = this.add.graphics();
        // Golden glowing border style
        cardBg.fillStyle(0x0f172a, 0.92); // Deep dark slate
        cardBg.lineStyle(4, 0xf59e0b, 1);   // Amber gold border
        cardBg.fillRoundedRect(-cardW / 2, -cardH / 2, cardW, cardH, 24);
        cardBg.strokeRoundedRect(-cardW / 2, -cardH / 2, cardW, cardH, 24);
        container.add(cardBg);

        // Header Title text
        const titleText = this.add.text(0, -125, '🎉 CHƯƠNG MỚI ĐÃ MỞ KHÓA! 🎉', {
            fontFamily: 'Arial Black, Arial, Helvetica',
            fontSize: '30px',
            fontStyle: 'bold',
            fill: '#F59E0B',
            stroke: '#000000',
            strokeThickness: 8
        }).setOrigin(0.5);
        container.add(titleText);

        // Decorative emoji icon representing the theme group
        const groupEmoji = this.add.text(0, -45, this.group.emoji, {
            fontFamily: 'Segoe UI Emoji, Arial',
            fontSize: '84px'
        }).setOrigin(0.5);
        container.add(groupEmoji);

        // Chapter Name & Title
        const chLabel = this.add.text(0, 35, `Chương ${this.chapter.id}: ${this.chapter.name} ${this.chapter.emoji}`, {
            fontFamily: 'Arial Black, Arial',
            fontSize: '26px',
            fontStyle: 'bold',
            fill: '#FFFFFF',
            stroke: '#000000',
            strokeThickness: 5
        }).setOrigin(0.5);
        container.add(chLabel);

        // Chapter group category
        const grLabel = this.add.text(0, 75, `Chủ đề: ${this.group.name}`, {
            fontFamily: 'Arial',
            fontSize: '18px',
            fontStyle: 'bold',
            fill: '#94A3B8'
        }).setOrigin(0.5);
        container.add(grLabel);

        // Prompt helper text
        const promptText = this.add.text(0, 135, 'Nhấn SPACE hoặc CLICK để bắt đầu bài mới', {
            fontFamily: 'Arial',
            fontSize: '16px',
            fontStyle: 'bold',
            fill: '#FCD34D',
            stroke: '#000000',
            strokeThickness: 3
        }).setOrigin(0.5);
        container.add(promptText);

        // Pulse tween for the prompt to invite interactions
        this.tweens.add({
            targets: promptText,
            alpha: 0.35,
            duration: 850,
            yoyo: true,
            repeat: -1
        });

        // Entrance scale bounce
        container.setScale(0);
        this.tweens.add({
            targets: container,
            scaleX: 1,
            scaleY: 1,
            duration: 650,
            ease: 'Back.easeOut'
        });

        // Play intro jingle sound if loaded
        if (this.cache.audio.exists('level_sound')) {
            this.sound.play('level_sound', { volume: 0.7 });
        }

        // Action trigger function
        const startPlayScene = () => {
            this.input.keyboard.off('keydown-SPACE', startPlayScene);
            this.input.keyboard.off('keydown-ENTER', startPlayScene);
            this.scene.start('PlayScene', { lessonIndex: this.nextLessonIndex });
        };

        this.input.keyboard.once('keydown-SPACE', startPlayScene);
        this.input.keyboard.once('keydown-ENTER', startPlayScene);
        this.input.on('pointerdown', startPlayScene);
    }
}
