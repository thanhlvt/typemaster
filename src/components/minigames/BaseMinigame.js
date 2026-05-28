import * as Phaser from 'phaser';

export class BaseMinigame extends Phaser.GameObjects.Container {
    constructor(scene, config) {
        super(scene, 0, 0);
        this.scene = scene;
        this.config = config;
        this.totalWords = 0;
        this.skipSuccessJump = false;

        // Thêm container vào scene
        scene.add.existing(this);
    }

    /**
     * Khởi tạo thông tin từ vựng cho minigame
     * @param {number} totalWords Tổng số từ trong bài học
     */
    init(totalWords) {
        this.totalWords = totalWords;
    }

    /**
     * Helper sinh texture động từ Emoji
     */
    createEmojiTexture(key, emoji, size = 64) {
        if (this.scene.textures.exists(key)) return key;

        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');

        ctx.font = `${size - 12}px Arial`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(emoji, size / 2, size / 2);

        this.scene.textures.addCanvas(key, canvas);
        return key;
    }

    /**
     * Tạo màn chơi (sẽ được override bởi lớp con)
     */
    create() {}

    /**
     * Sự kiện khi gõ đúng 1 từ (sẽ được override bởi lớp con)
     */
    onWordComplete(word, currentWordIndex, totalWords) {}

    /**
     * Sự kiện khi gõ sai 1 ký tự (sẽ được override bởi lớp con)
     */
    onTypeError(char) {}
}
