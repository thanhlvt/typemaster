import * as Phaser from 'phaser';
import { getChapterForLesson, getGroupForChapter } from '../data/chapters';

const BOSS_NAMES = {
    1: 'Sói Già',
    2: 'Cá Sấu',
    3: 'Hổ Hung Ác',
    4: 'Bóng Ma',
    5: 'Cá Mập',
    6: 'Tướng Cướp',
    7: 'Alien Hắc Ám'
};

export class StoryDialogOverlay extends Phaser.GameObjects.Container {
    constructor(scene, steps, onComplete) {
        const { width, height } = scene.scale;
        super(scene, 0, 0);
        this.scene = scene;
        this.steps = steps;
        this.onCompleteCallback = onComplete;
        this.currentStep = 0;
        this.setDepth(200); // Đặt depth cao hơn TypingBox và VirtualKeyboard
        this.setScrollFactor(0);

        // -- Tên và Texture của Boss theo Group Chapter hiện tại
        const chapter = getChapterForLesson(scene.currentLessonIndex);
        const group = getGroupForChapter(chapter);
        this.groupId = group ? group.id : 1;
        this.bossTexture = `boss_${this.groupId}`;
        this.bossName = BOSS_NAMES[this.groupId] || 'Boss';

        // -- Lấy Skin Khỉ hiện tại
        this.monkeySkin = scene.monkey?.texture?.key || 'monkey_1';

        // ── Phông nền tối mờ full màn hình ──
        this.blocker = scene.add.rectangle(width / 2, height / 2, width, height, 0x0a0f1d, 0.75)
            .setInteractive()
            .setScrollFactor(0)
            .setDepth(200);

        // ── Graphics cho Khung Thoại ──
        this.dialogBg = scene.add.graphics().setScrollFactor(0).setDepth(202);

        // Kiểm tra xem các nhân vật có thoại trong các step không
        this.hasMonkey = steps.some(step => step.character === 'monkey');
        this.hasBoss = steps.some(step => step.character === 'boss');

        // ── Avatar Nhân vật ──
        // Khỉ bên trái
        this.monkeyMascot = scene.add.sprite(130, height - 150, this.monkeySkin)
            .setScale(0.6)
            .setOrigin(0.5)
            .setScrollFactor(0)
            .setDepth(203)
            .setVisible(this.hasMonkey);

        // Boss bên phải
        this.bossMascot = scene.add.sprite(width - 130, height - 150, this.bossTexture)
            .setScale(0.6)
            .setOrigin(0.5)
            .setScrollFactor(0)
            .setDepth(203)
            .setVisible(this.hasBoss);

        // ── Text hiển thị ──
        // Nhãn Tên Nhân Vật
        this.nameLbl = scene.add.text(0, 0, '', {
            fontFamily: 'Outfit, Arial',
            fontSize: '28px',
            fontStyle: 'bold',
            fill: '#FBBF24'
        }).setScrollFactor(0).setDepth(204);

        // Nội dung lời thoại
        this.dialogText = scene.add.text(0, 0, '', {
            fontFamily: 'Arial',
            fontSize: '24px',
            fill: '#f1f5f9',
            wordWrap: { width: 500, useAdvancedWrap: true },
            lineSpacing: 6
        }).setScrollFactor(0).setDepth(204);

        // ── Nút "Tiếp tục" ──
        this.nextBtnBg = scene.add.graphics().setScrollFactor(0).setDepth(205);
        this.nextBtnText = scene.add.text(0, 0, 'Tiếp tục ➔', {
            fontFamily: 'Outfit, Arial',
            fontSize: '18px',
            fontStyle: 'bold',
            fill: '#0f172a'
        }).setOrigin(0.5).setScrollFactor(0).setDepth(206);

        // Vùng tương tác của nút Tiếp tục
        this.nextZone = scene.add.zone(0, 0, 160, 48)
            .setInteractive({ useHandCursor: true })
            .setScrollFactor(0)
            .setDepth(206);

        this.nextZone.on('pointerover', () => this._drawNextBtn(0xFBBF24));
        this.nextZone.on('pointerout', () => this._drawNextBtn(0xF59E0B));
        this.nextZone.on('pointerup', () => {
            scene.sound.play('key_sound');
            this._nextStep();
        });

        // ── Nút "Bỏ qua" (Skip) ──
        const skipW = 120;
        const skipH = 36;
        const skipCX = width - skipW / 2 - 16;
        const skipCY = 50;

        this.skipBg = scene.add.graphics().setScrollFactor(0).setDepth(205);
        this._drawSkipBtn(0.5, skipCX, skipCY, skipW, skipH);

        this.skipText = scene.add.text(skipCX, skipCY, 'Bỏ qua ✖', {
            fontFamily: 'Arial',
            fontSize: '16px',
            fontStyle: 'bold',
            fill: '#94a3b8'
        }).setOrigin(0.5).setScrollFactor(0).setDepth(206);

        this.skipZone = scene.add.zone(skipCX, skipCY, skipW, skipH)
            .setInteractive({ useHandCursor: true })
            .setScrollFactor(0)
            .setDepth(206);

        this.skipZone.on('pointerover', () => {
            this._drawSkipBtn(0.85, skipCX, skipCY, skipW, skipH);
            this.skipText.setFill('#ffffff');
        });
        this.skipZone.on('pointerout', () => {
            this._drawSkipBtn(0.5, skipCX, skipCY, skipW, skipH);
            this.skipText.setFill('#94a3b8');
        });
        this.skipZone.on('pointerup', () => {
            scene.sound.play('key_sound');
            this._completeStory();
        });

        // Đăng ký dọn dẹp các đối tượng
        this._sceneObjects = [
            this.blocker, this.dialogBg, this.monkeyMascot, this.bossMascot,
            this.nameLbl, this.dialogText, this.nextBtnBg, this.nextBtnText, this.nextZone,
            this.skipBg, this.skipText, this.skipZone
        ];

        this.active = true;

        // Đăng ký phím tắt: Space/Enter -> Tiếp tục, Esc -> Bỏ qua
        this.onKeyDown = (event) => {
            if (!this.active) return;
            const keyCode = event.keyCode;
            if (keyCode === Phaser.Input.Keyboard.KeyCodes.SPACE || keyCode === Phaser.Input.Keyboard.KeyCodes.ENTER) {
                scene.sound.play('key_sound');
                this._nextStep();
            } else if (keyCode === Phaser.Input.Keyboard.KeyCodes.ESC) {
                scene.sound.play('key_sound');
                this._completeStory();
            }
        };
        scene.input.keyboard.on('keydown', this.onKeyDown);

        scene.add.existing(this);
        this._showStep(0);
    }

    _drawNextBtn(color) {
        this.nextBtnBg.clear();
        this.nextBtnBg.fillStyle(color, 1);
        this.nextBtnBg.fillRoundedRect(this.btnPos.x - this.btnPos.w / 2, this.btnPos.y - this.btnPos.h / 2, this.btnPos.w, this.btnPos.h, 14);
        this.nextBtnBg.lineStyle(1.5, 0xffffff, 0.3);
        this.nextBtnBg.strokeRoundedRect(this.btnPos.x - this.btnPos.w / 2, this.btnPos.y - this.btnPos.h / 2, this.btnPos.w, this.btnPos.h, 14);
    }

    _drawSkipBtn(fillAlpha, cx, cy, w, h) {
        this.skipBg.clear();
        this.skipBg.fillStyle(0x0f172a, fillAlpha);
        this.skipBg.fillRoundedRect(cx - w / 2, cy - h / 2, w, h, h / 2);
        this.skipBg.lineStyle(1.5, 0xffffff, 0.35);
        this.skipBg.strokeRoundedRect(cx - w / 2, cy - h / 2, w, h, h / 2);
    }

    _showStep(stepIdx) {
        this.currentStep = stepIdx;
        const step = this.steps[stepIdx];
        const isMonkey = step.character === 'monkey';

        // Cập nhật hoạt ảnh và hiển thị nhân vật nói chuyện
        if (isMonkey) {
            if (this.hasMonkey) {
                this.monkeyMascot.setAlpha(1).setScale(0.6);
                this._bounceMascot(this.monkeyMascot);
            }
            if (this.hasBoss) {
                this.bossMascot.setAlpha(0.75).setScale(0.45);
            }
        } else {
            if (this.hasMonkey) {
                this.monkeyMascot.setAlpha(0.75).setScale(0.45);
            }
            if (this.hasBoss) {
                this.bossMascot.setAlpha(1).setScale(0.6);
                this._bounceMascot(this.bossMascot);
            }
        }

        // Định vị bong bóng thoại
        const { width, height } = this.scene.scale;
        const bubbleW = 540;
        const bubbleH = 220;

        // Nếu là Khỉ thì bong bóng dịch sang phải, Boss thì dịch sang trái
        const bubbleX = isMonkey ? 230 : width - 230 - bubbleW;
        const bubbleY = height - bubbleH - 40;

        // Vẽ Speech Bubble Background
        this.dialogBg.clear();
        this.dialogBg.fillStyle(0x1e293b, 0.96);
        this.dialogBg.fillRoundedRect(bubbleX, bubbleY, bubbleW, bubbleH, 20);
        this.dialogBg.lineStyle(3, isMonkey ? 0xFBBF24 : 0xEF4444, 1); // Khỉ viền vàng, Boss viền đỏ
        this.dialogBg.strokeRoundedRect(bubbleX, bubbleY, bubbleW, bubbleH, 20);

        // Vẽ mũi tên trỏ vào avatar nhân vật nói chuyện
        this.dialogBg.fillStyle(0x1e293b, 0.96);
        this.dialogBg.beginPath();
        if (isMonkey) {
            const arrowX = bubbleX;
            const arrowY = bubbleY + bubbleH - 60;
            this.dialogBg.moveTo(arrowX, arrowY - 15);
            this.dialogBg.lineTo(arrowX - 20, arrowY);
            this.dialogBg.lineTo(arrowX, arrowY + 15);
        } else {
            const arrowX = bubbleX + bubbleW;
            const arrowY = bubbleY + bubbleH - 60;
            this.dialogBg.moveTo(arrowX, arrowY - 15);
            this.dialogBg.lineTo(arrowX + 20, arrowY);
            this.dialogBg.lineTo(arrowX, arrowY + 15);
        }
        this.dialogBg.closePath();
        this.dialogBg.fillPath();
        this.dialogBg.lineStyle(3, isMonkey ? 0xFBBF24 : 0xEF4444, 1);
        this.dialogBg.beginPath();
        if (isMonkey) {
            const arrowX = bubbleX;
            const arrowY = bubbleY + bubbleH - 60;
            this.dialogBg.moveTo(arrowX, arrowY - 15);
            this.dialogBg.lineTo(arrowX - 20, arrowY);
            this.dialogBg.lineTo(arrowX, arrowY + 15);
        } else {
            const arrowX = bubbleX + bubbleW;
            const arrowY = bubbleY + bubbleH - 60;
            this.dialogBg.moveTo(arrowX, arrowY - 15);
            this.dialogBg.lineTo(arrowX + 20, arrowY);
            this.dialogBg.lineTo(arrowX, arrowY + 15);
        }
        this.dialogBg.strokePath();

        // Đặt vị trí nhãn Tên
        this.nameLbl.setText(isMonkey ? 'Khỉ Con' : this.bossName);
        this.nameLbl.setFill(isMonkey ? '#FBBF24' : '#EF4444');
        this.nameLbl.setPosition(bubbleX + 25, bubbleY + 20);

        // Đặt vị trí Text thoại
        this.dialogText.setPosition(bubbleX + 25, bubbleY + 65);
        this.dialogText.setStyle({ wordWrap: { width: bubbleW - 50 } });

        // Đặt vị trí nút "Tiếp tục"
        const btnW = 140;
        const btnH = 40;
        const btnCX = bubbleX + bubbleW - btnW / 2 - 20;
        const btnCY = bubbleY + bubbleH - btnH / 2 - 15;
        this.btnPos = { x: btnCX, y: btnCY, w: btnW, h: btnH };
        this._drawNextBtn(0xF59E0B);

        this.nextBtnText.setPosition(btnCX, btnCY);
        this.nextBtnText.setText(stepIdx === this.steps.length - 1 ? 'Bắt đầu! ➔' : 'Tiếp tục ➔');
        this.nextZone.setPosition(btnCX, btnCY);
        this.nextZone.setSize(btnW, btnH);

        // Chạy chữ
        this._typeText(step.text);
    }

    _bounceMascot(mascot) {
        const baseY = this.scene.scale.height - 150;
        mascot.y = baseY;
        this.scene.tweens.add({
            targets: mascot,
            y: baseY - 15,
            duration: 150,
            yoyo: true,
            ease: 'Power2',
            onComplete: () => { mascot.y = baseY; }
        });
    }

    _typeText(text) {
        if (this.typingTimer) {
            this.typingTimer.destroy();
            this.typingTimer = null;
        }
        this.dialogText.setText('');
        let currentLength = 0;
        this.typingTimer = this.scene.time.addEvent({
            delay: 25,
            callback: () => {
                currentLength++;
                this.dialogText.setText(text.substr(0, currentLength));
                if (currentLength >= text.length) {
                    this.typingTimer.destroy();
                    this.typingTimer = null;
                }
            },
            repeat: text.length - 1
        });
    }

    _nextStep() {
        if (this.typingTimer) {
            // Đang chạy chữ -> hiển thị luôn toàn bộ
            this.typingTimer.destroy();
            this.typingTimer = null;
            this.dialogText.setText(this.steps[this.currentStep].text);
            return;
        }

        if (this.currentStep < this.steps.length - 1) {
            this._showStep(this.currentStep + 1);
        } else {
            this._completeStory();
        }
    }

    _completeStory() {
        if (this.typingTimer) {
            this.typingTimer.destroy();
            this.typingTimer = null;
        }

        this.active = false;

        // Hủy đăng ký sự kiện bàn phím
        this.scene.input.keyboard.off('keydown', this.onKeyDown);

        const self = this;
        this.scene.tweens.add({
            targets: this._sceneObjects,
            alpha: 0,
            duration: 300,
            ease: 'Power2',
            onComplete: () => {
                self._sceneObjects.forEach(obj => obj.destroy());
                self.destroy();
                if (self.onCompleteCallback) {
                    self.onCompleteCallback();
                }
            }
        });
    }
}
