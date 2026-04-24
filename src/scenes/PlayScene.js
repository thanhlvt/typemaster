import * as Phaser from 'phaser';
import { TelexEngine } from '../utils/TelexEngine';

const SAVE_KEY = 'typemaster_progress';

export class PlayScene extends Phaser.Scene {
    constructor() {
        super('PlayScene');
    }

    init() {
        this.data = this.cache.json.get('gameData');
        this.currentLessonIndex = 0;
        this.currentWordIndex = 0;
        this.telexEngine = new TelexEngine(this.data.telex_rules);
        this.score = 0;
        this._loadProgress();
    }

    create() {
        const { width, height } = this.scale;

        this.bgImage = this.add.image(width / 2, height / 2, 'bg_1').setDisplaySize(width, height);

        this.monkey = this.add.sprite(width / 2, height * 0.4, 'monkey_1').setScale(0.5);

        this.createContentUI(width, height);
        this.createKeyboardUI(width, height);
        this.createHandsUI(width, height);

        this.input.keyboard.on('keydown', this.handleKeyDown, this);

        this.scoreText = this.add.text(20, 20, 'Chuối: ' + this.score, {
            fontFamily: 'Arial',
            fontSize: '40px',
            fontStyle: 'bold',
            fill: '#FFF',
            stroke: '#000',
            strokeThickness: 5
        });

        this._createResetButton(width);

        this.startLesson();
    }

    // ── Progress ───────────────────────────────────────────────────

    _loadProgress() {
        try {
            const saved = JSON.parse(localStorage.getItem(SAVE_KEY));
            if (saved) {
                this.currentLessonIndex = Math.min(saved.lessonIndex || 0, this.data.lessons.length - 1);
                this.score = saved.score || 0;
            }
        } catch (_) { }
    }

    _saveProgress() {
        localStorage.setItem(SAVE_KEY, JSON.stringify({
            lessonIndex: this.currentLessonIndex,
            score: this.score
        }));
    }

    _doReset() {
        localStorage.removeItem(SAVE_KEY);
        this.tweens.killAll();
        this.currentLessonIndex = 0;
        this.currentWordIndex = 0;
        this.score = 0;
        this.scoreText.setText('Chuối: 0');
        this.monkey.y = this.scale.height * 0.4;
        this.input.keyboard.enabled = true;
        this.startLesson();
    }

    // ── Reset button ───────────────────────────────────────────────

    _createResetButton(width) {
        const btnW = 94, btnH = 36;
        const x = width - btnW / 2 - 12;
        const y = 24;

        const bg = this.add.graphics();
        const drawBg = (color) => {
            bg.clear();
            bg.fillStyle(color, 0.85);
            bg.fillRoundedRect(x - btnW / 2, y - btnH / 2, btnW, btnH, 18);
        };
        drawBg(0x8B0000);

        this.add.text(x, y, '↺  Reset', {
            fontFamily: 'Arial', fontSize: '16px', fill: '#FFF'
        }).setOrigin(0.5);

        const zone = this.add.zone(x, y, btnW, btnH).setInteractive({ useHandCursor: true });
        zone.on('pointerover', () => drawBg(0xC62828));
        zone.on('pointerout', () => drawBg(0x8B0000));
        zone.on('pointerdown', () => this.showResetConfirm());
    }

    showResetConfirm() {
        const { width, height } = this.scale;
        const cx = width / 2;
        const cy = height / 2;

        this.input.keyboard.enabled = false;

        const overlay = this.add.graphics();
        overlay.fillStyle(0x000000, 0.55);
        overlay.fillRect(0, 0, width, height);

        // Absorb all pointer events so the reset button can't be clicked again
        const blocker = this.add.zone(cx, cy, width, height).setInteractive();

        const panelW = 360, panelH = 190;
        const panel = this.add.graphics();
        panel.fillStyle(0xFFFDE7, 1);
        panel.fillRoundedRect(cx - panelW / 2, cy - panelH / 2, panelW, panelH, 20);

        const titleText = this.add.text(cx, cy - panelH * 0.26, 'Xóa tiến trình?', {
            fontFamily: 'Arial Black, Arial', fontSize: '26px', fill: '#333'
        }).setOrigin(0.5);

        const bodyText = this.add.text(cx, cy + 6, 'Sẽ quay về bài 1 và mất tất cả điểm.', {
            fontFamily: 'Arial', fontSize: '16px', fill: '#666',
            wordWrap: { width: panelW - 48 }, align: 'center'
        }).setOrigin(0.5);

        // Cancel
        const cancelW = 130, cancelH = 46;
        const cancelX = cx - 78, btnRow = cy + panelH * 0.30;

        const cancelBg = this.add.graphics();
        const drawCancel = (c) => { cancelBg.clear(); cancelBg.fillStyle(c, 1); cancelBg.fillRoundedRect(cancelX - cancelW / 2, btnRow - cancelH / 2, cancelW, cancelH, 23); };
        drawCancel(0x757575);

        const cancelText = this.add.text(cancelX, btnRow, 'Hủy', {
            fontFamily: 'Arial', fontSize: '20px', fill: '#FFF'
        }).setOrigin(0.5);
        const cancelZone = this.add.zone(cancelX, btnRow, cancelW, cancelH).setInteractive({ useHandCursor: true });
        cancelZone.on('pointerover', () => drawCancel(0x424242));
        cancelZone.on('pointerout', () => drawCancel(0x757575));

        // Confirm (destructive)
        const confirmX = cx + 78;
        const confirmBg = this.add.graphics();
        const drawConfirm = (c) => { confirmBg.clear(); confirmBg.fillStyle(c, 1); confirmBg.fillRoundedRect(confirmX - cancelW / 2, btnRow - cancelH / 2, cancelW, cancelH, 23); };
        drawConfirm(0xD32F2F);

        const confirmText = this.add.text(confirmX, btnRow, 'Xóa', {
            fontFamily: 'Arial Black, Arial', fontSize: '20px', fill: '#FFF'
        }).setOrigin(0.5);
        const confirmZone = this.add.zone(confirmX, btnRow, cancelW, cancelH).setInteractive({ useHandCursor: true });
        confirmZone.on('pointerover', () => drawConfirm(0xB71C1C));
        confirmZone.on('pointerout', () => drawConfirm(0xD32F2F));

        const all = [overlay, blocker, panel, titleText, bodyText, cancelBg, cancelText, cancelZone, confirmBg, confirmText, confirmZone];

        cancelZone.on('pointerdown', () => {
            all.forEach(o => o.destroy());
            this.input.keyboard.enabled = true;
        });

        confirmZone.on('pointerdown', () => {
            all.forEach(o => o.destroy());
            this._doReset();
        });
    }

    // ── UI ─────────────────────────────────────────────────────────

    createContentUI(width, height) {
        const bgTop = height * 0.52;
        const bgHeight = height * 0.18;

        const bg = this.add.graphics();
        bg.fillStyle(0xffffff, 0.8);
        bg.fillRoundedRect(width * 0.1, bgTop, width * 0.8, bgHeight, 20);

        this.targetText = this.add.text(width / 2, bgTop + bgHeight * 0.21, '', {
            fontFamily: 'Verdana, sans-serif',
            fontSize: '48px',
            fontStyle: 'bold',
            fill: '#333'
        }).setOrigin(0.5);

        this.ruleHint = this.add.text(width / 2, bgTop + bgHeight * 0.52, '', {
            fontFamily: 'Arial',
            fontSize: '24px',
            fontStyle: 'bold',
            fill: '#E65100'
        }).setOrigin(0.5);

        this.typedText = this.add.text(width / 2, bgTop + bgHeight * 0.81, '', {
            fontFamily: 'Verdana, sans-serif',
            fontSize: '44px',
            fontStyle: 'bold',
            fill: '#2E7D32'
        }).setOrigin(0.5);
    }

    createKeyboardUI(width, height) {
        const keyboardAreaTop = height * 0.72;
        const footerBg = this.add.graphics();
        footerBg.fillStyle(0x222222, 0.95);
        footerBg.fillRect(0, keyboardAreaTop, width, height - keyboardAreaTop);

        this.keys = {};
        const keyRows = [
            ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
            ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
            ['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
            ['SPACE']
        ];

        const keySize = 40;
        const spacing = 8;
        const totalKeysHeight = keyRows.length * keySize + (keyRows.length - 1) * spacing;
        let startY = keyboardAreaTop + (height - keyboardAreaTop - totalKeysHeight) / 2;

        keyRows.forEach((row) => {
            let rowWidth = 0;
            row.forEach(char => {
                const isSpace = char === 'SPACE';
                rowWidth += (isSpace ? keySize * 6 : keySize) + spacing;
            });
            rowWidth -= spacing;

            let startX = (width - rowWidth) / 2;

            row.forEach(char => {
                const isSpace = char === 'SPACE';
                const currentKeyWidth = isSpace ? keySize * 6 : keySize;
                const keyContainer = this.add.container(startX + currentKeyWidth / 2, startY + keySize / 2);

                const bg = this.add.graphics();
                bg.fillStyle(0x444444, 1);
                bg.fillRoundedRect(-currentKeyWidth / 2, -keySize / 2, currentKeyWidth, keySize, 8);
                bg.lineStyle(2, 0x666666);
                bg.strokeRoundedRect(-currentKeyWidth / 2, -keySize / 2, currentKeyWidth, keySize, 8);

                const text = this.add.text(0, 0, char, {
                    fontFamily: 'Arial',
                    fontSize: isSpace ? '16px' : '22px',
                    fontStyle: 'bold',
                    fill: '#FFFFFF'
                }).setOrigin(0.5);

                keyContainer.add([bg, text]);
                const keyId = isSpace ? ' ' : char.toLowerCase();
                this.keys[keyId] = { bg, text, container: keyContainer, isSpace, width: currentKeyWidth };

                startX += currentKeyWidth + spacing;
            });
            startY += keySize + spacing;
        });
    }

    createHandsUI(width, height) {
        const keyboardAreaTop = height * 0.72;
        const handY = keyboardAreaTop + (height - keyboardAreaTop) / 2 + 10;

        this.fingerDots = {};

        // Left Hand
        const leftContainer = this.add.container(width * 0.15, handY);
        const leftHandImg = this.add.image(0, 0, 'hand_left').setScale(0.2).setAlpha(0.8);
        leftContainer.add(leftHandImg);

        const leftOffsets = {
            'L1': { x: -100, y: -55 }, // Pinky
            'L2': { x: -56, y: -95 }, // Ring
            'L3': { x: -10, y: -110 },  // Middle
            'L4': { x: 43, y: -100 },  // Index
            'L5': { x: 95, y: -10 }    // Thumb
        };

        for (let f in leftOffsets) {
            const dot = this.add.circle(leftOffsets[f].x, leftOffsets[f].y, 18, 0xFFC107).setAlpha(0);
            dot.setStrokeStyle(3, 0xFFFFFF, 1);
            leftContainer.add(dot);
            this.fingerDots[f] = dot;
        }

        // Right Hand
        const rightContainer = this.add.container(width * 0.85, handY);
        const rightHandImg = this.add.image(0, 0, 'hand_right').setScale(0.2).setAlpha(0.8);
        rightContainer.add(rightHandImg);

        const rightOffsets = {
            'R1': { x: 100, y: -55 }, // Pinky
            'R2': { x: 56, y: -95 }, // Ring
            'R3': { x: 10, y: -110 },  // Middle
            'R4': { x: -43, y: -100 }, // Index
            'R5': { x: -95, y: -10 }   // Thumb
        };

        for (let f in rightOffsets) {
            const dot = this.add.circle(rightOffsets[f].x, rightOffsets[f].y, 18, 0xFFC107).setAlpha(0);
            dot.setStrokeStyle(3, 0xFFFFFF, 1);
            rightContainer.add(dot);
            this.fingerDots[f] = dot;
        }
    }

    // ── Keyboard logic ─────────────────────────────────────────────

    _resetKeys() {
        for (let k in this.keys) {
            const keyObj = this.keys[k];
            const w = keyObj.width || 40;
            const h = 40;
            this.tweens.killTweensOf(keyObj.container);
            keyObj.container.setScale(1);
            keyObj.bg.clear();
            keyObj.bg.fillStyle(0x444444, 1);
            keyObj.bg.fillRoundedRect(-w / 2, -h / 2, w, h, 8);
            keyObj.bg.lineStyle(2, 0x666666);
            keyObj.bg.strokeRoundedRect(-w / 2, -h / 2, w, h, 8);
        }

        // Reset fingers
        for (let f in this.fingerDots) {
            this.tweens.killTweensOf(this.fingerDots[f]);
            this.fingerDots[f].setAlpha(0);
        }
    }

    _targetKeysLower() {
        return this.targetKeys.toLowerCase();
    }

    _getVietnameseBufferForRaw(raw) {
        return raw.split(' ')
            .map(chunk => this.telexEngine._apply(chunk))
            .join(' ');
    }

    _normalizeForMatch(value) {
        return value.normalize('NFC').replace(/\s/g, '');
    }

    highlightNextKey() {
        this._resetKeys();

        const rawBuffer = this.telexEngine.getRawBuffer();
        const targetKeysStr = this._targetKeysLower();

        // Đếm số lượng ký tự hiện tại trong buffer
        const currentCounts = {};
        for (const c of rawBuffer) {
            currentCounts[c] = (currentCounts[c] || 0) + 1;
        }

        // Tìm phím ĐẦU TIÊN trong chuỗi target cần gõ mà chưa đủ số lượng
        const targetCountsSoFar = {};
        let nextCharToHighlight = null;

        for (const c of targetKeysStr) {
            targetCountsSoFar[c] = (targetCountsSoFar[c] || 0) + 1;
            if ((currentCounts[c] || 0) < targetCountsSoFar[c]) {
                nextCharToHighlight = c;
                break; // Chỉ lấy 1 phím duy nhất theo trình tự chuẩn
            }
        }

        // Highlight phím đó
        // Highlight phím đó
        if (nextCharToHighlight && this.keys[nextCharToHighlight]) {
            const k = this.keys[nextCharToHighlight];
            const w = k.width || 40;
            const h = 40;
            k.bg.clear();
            k.bg.fillStyle(0xFFC107, 1);
            k.bg.fillRoundedRect(-w / 2, -h / 2, w, h, 8);

            this.tweens.add({
                targets: k.container,
                scale: 1.1,
                duration: 400,
                yoyo: true,
                repeat: -1
            });

            // Highlight finger
            const finger = this.getFingerForKey(nextCharToHighlight);
            if (finger && this.fingerDots[finger]) {
                const dot = this.fingerDots[finger];
                this.tweens.add({
                    targets: dot,
                    alpha: 1,
                    scale: 1.4,
                    duration: 400,
                    yoyo: true,
                    repeat: -1
                });
            } else if (nextCharToHighlight === ' ') {
                // Highlight both thumbs for space
                ['L5', 'R5'].forEach(f => {
                    const dot = this.fingerDots[f];
                    this.tweens.add({
                        targets: dot,
                        alpha: 1,
                        scale: 1.4,
                        duration: 400,
                        yoyo: true,
                        repeat: -1
                    });
                });
            }
        }
    }

    getFingerForKey(key) {
        const fingerMap = {
            'q': 'L1', 'a': 'L1', 'z': 'L1',
            'w': 'L2', 's': 'L2', 'x': 'L2',
            'e': 'L3', 'd': 'L3', 'c': 'L3',
            'r': 'L4', 't': 'L4', 'f': 'L4', 'g': 'L4', 'v': 'L4', 'b': 'L4',
            'y': 'R4', 'u': 'R4', 'h': 'R4', 'j': 'R4', 'n': 'R4', 'm': 'R4',
            'i': 'R3', 'k': 'R3',
            'o': 'R2', 'l': 'R2',
            'p': 'R1'
        };
        return fingerMap[key];
    }

    _isPossible(testRaw) {
        const targetKeysStr = this._targetKeysLower();
        if (targetKeysStr.startsWith(testRaw)) return true;

        const toneMarks = "sfrxjz";
        const vowels = "aeiouy";

        let targetBase = "";
        let targetTones = {};

        // 1. Phân tách target thành base và tones dựa trên quy tắc tiếng Việt
        for (let i = 0; i < targetKeysStr.length; i++) {
            const c = targetKeysStr[i];
            let isTone = false;

            if ("fjz".includes(c)) {
                isTone = true;
            } else if ("srx".includes(c)) {
                const nextChar = i < targetKeysStr.length - 1 ? targetKeysStr[i + 1] : '';
                // Nếu s, r, x không đứng trước nguyên âm thì nó là dấu thanh
                if (!vowels.includes(nextChar)) {
                    isTone = true;
                }
            }

            if (isTone) {
                targetTones[c] = (targetTones[c] || 0) + 1;
            } else {
                targetBase += c;
            }
        }

        // 2. Phân tách testRaw dựa trên targetBase (khớp tuần tự)
        let testBase = "";
        let testTones = {};
        let basePtr = 0;

        for (const c of testRaw) {
            if (basePtr < targetBase.length && c === targetBase[basePtr]) {
                // Khớp với ký tự cơ sở tiếp theo mong đợi
                testBase += c;
                basePtr++;
            } else if (toneMarks.includes(c)) {
                // Không khớp ký tự cơ sở, nhưng là dấu thanh hợp lệ
                testTones[c] = (testTones[c] || 0) + 1;
            } else {
                // Sai hoàn toàn (gõ sai phím)
                return false;
            }
        }

        // 3. Kiểm tra số lượng dấu thanh không được vượt quá số lượng đích
        for (const t in testTones) {
            if ((testTones[t] || 0) > (targetTones[t] || 0)) return false;
        }

        // 3. Kiểm tra khả năng hoàn thành (Completion Check)
        // Ghép phần cơ sở còn lại (theo ĐÚNG thứ tự) và phần dấu còn lại
        let remainingBase = targetBase.slice(testBase.length);

        let remainingTones = "";
        for (const t in targetTones) {
            const count = targetTones[t] - (testTones[t] || 0);
            for (let i = 0; i < count; i++) remainingTones += t;
        }

        const trial = testRaw + remainingBase + remainingTones;
        const resultWord = this._getVietnameseBufferForRaw(trial);

        // Chuẩn hóa Unicode NFC để tránh lỗi sai khác do cách ghép dấu (VD: ừ + ơ vs ư + ờ)
        return this._normalizeForMatch(resultWord) === this._normalizeForMatch(this.targetWord);
    }

    // ── Lesson flow ────────────────────────────────────────────────

    startLesson() {
        this.currentWordIndex = 0;

        // Chọn ngẫu nhiên background và monkey (từ 1 đến 10)
        const randomBg = Phaser.Math.Between(1, 10);
        const randomMonkey = Phaser.Math.Between(1, 10);

        if (this.bgImage) this.bgImage.setTexture(`bg_${randomBg}`);
        if (this.monkey) this.monkey.setTexture(`monkey_${randomMonkey}`);

        this.showWord();
    }

    showWord() {
        const lesson = this.data.lessons[this.currentLessonIndex];
        const wordData = lesson.content[this.currentWordIndex];
        this.targetWord = wordData.display;
        this.targetKeys = wordData.keys;

        this.targetText.setText(this.targetWord);
        this.typedText.setText('');
        this.telexEngine.clear();
        this.ruleHint.setText('Gõ: ' + wordData.keys);

        this.highlightNextKey();
    }

    handleKeyDown(event) {
        const key = event.key.toLowerCase();
        if (!/^[a-z ]$/.test(key)) return;

        const rawBuffer = this.telexEngine.getRawBuffer();

        if (this._isPossible(rawBuffer + key)) {
            this.telexEngine.processKey(key);
            const vietnameseBuffer = this._getVietnameseBufferForRaw(this.telexEngine.getRawBuffer());
            this.updateDisplayText(vietnameseBuffer);
            this.highlightNextKey();

            if (this._normalizeForMatch(vietnameseBuffer) === this._normalizeForMatch(this.targetWord)) {
                this.handleSuccess();
            }
        } else {
            this.handleFail();
        }
    }

    updateDisplayText(vietnameseBuffer) {
        this.typedText.setText(vietnameseBuffer);
    }

    handleSuccess() {
        this.score++;
        this.scoreText.setText('Chuối: ' + this.score);

        this.tweens.add({
            targets: this.monkey,
            y: this.monkey.y - 50,
            duration: 200,
            yoyo: true,
            ease: 'Power2',
            onComplete: () => this.nextWord()
        });

        const banana = this.add.image(this.monkey.x, 0, 'banana').setScale(0.3);
        this.tweens.add({
            targets: banana,
            y: this.monkey.y,
            alpha: 0,
            duration: 500,
            onComplete: () => banana.destroy()
        });
    }

    handleFail() {
        this.cameras.main.shake(200, 0.01);
        this.monkey.setTint(0xff0000);
        this.time.delayedCall(200, () => this.monkey.clearTint());
    }

    nextWord() {
        this.currentWordIndex++;
        const lesson = this.data.lessons[this.currentLessonIndex];

        if (this.currentWordIndex >= lesson.content.length) {
            this.showLessonComplete();
            return;
        }

        this.showWord();
    }

    // ── Lesson complete overlay ────────────────────────────────────

    showLessonComplete() {
        const { width, height } = this.scale;
        const lesson = this.data.lessons[this.currentLessonIndex];
        const isLast = this.currentLessonIndex >= this.data.lessons.length - 1;

        // Ngắt listener gõ phím chính
        this.input.keyboard.off('keydown', this.handleKeyDown, this);
        this._resetKeys();

        const overlay = this.add.graphics();
        overlay.fillStyle(0x000000, 0.65);
        overlay.fillRect(0, 0, width, height);
        overlay.setAlpha(0);

        const blocker = this.add.zone(width / 2, height / 2, width, height).setInteractive();

        const panelW = width * 0.62;
        const panelH = height * 0.44;
        const cx = width / 2;
        const cy = height / 2;

        const panel = this.add.graphics();
        panel.fillStyle(0xFFFDE7, 1);
        panel.fillRoundedRect(cx - panelW / 2, cy - panelH / 2, panelW, panelH, 24);
        panel.setAlpha(0);

        const headerText = this.add.text(cx, cy - panelH * 0.30, 'Xuất sắc!', {
            fontFamily: 'Arial Black, Arial',
            fontSize: '42px',
            fill: '#E65100'
        }).setOrigin(0.5).setAlpha(0);

        const subText = this.add.text(cx, cy - panelH * 0.06, lesson.title, {
            fontFamily: 'Arial',
            fontSize: '28px',
            fontStyle: 'bold',
            fill: '#333'
        }).setOrigin(0.5).setAlpha(0);

        const starsText = this.add.text(cx, cy + panelH * 0.14, '★  ★  ★', {
            fontFamily: 'Arial',
            fontSize: '46px',
            fill: '#FFC107'
        }).setOrigin(0.5).setAlpha(0).setScale(0.2);

        const btnLabel = isLast ? '▶  Chơi lại' : '▶  Tiếp tục!';
        const btnW = 230, btnH = 58;
        const btnY = cy + panelH * 0.37;

        const btnBg = this.add.graphics();
        btnBg.fillStyle(0x43A047, 1);
        btnBg.fillRoundedRect(cx - btnW / 2, btnY - btnH / 2, btnW, btnH, 29);
        btnBg.setAlpha(0);

        const btnText = this.add.text(cx, btnY, btnLabel, {
            fontFamily: 'Arial Black, Arial',
            fontSize: '26px',
            fill: '#FFFFFF'
        }).setOrigin(0.5).setAlpha(0);

        const hitZone = this.add.zone(cx, btnY, btnW, btnH).setInteractive({ useHandCursor: true });
        const allObjects = [overlay, blocker, panel, headerText, subText, starsText, btnBg, btnText, hitZone];
        const lessonBananas = [];
        const lessonTimers = [];

        const advance = () => {
            this.input.keyboard.off('keydown-SPACE', advance);
            this.input.keyboard.on('keydown', this.handleKeyDown, this);
            lessonTimers.forEach(t => t.remove());
            lessonBananas.forEach(b => { if (b.active) b.destroy(); });
            allObjects.forEach(o => o.destroy());
            this.tweens.killAll();
            this.monkey.y = origY;
            this.currentLessonIndex = isLast ? 0 : this.currentLessonIndex + 1;
            this.currentWordIndex = 0;
            this._saveProgress();
            this.startLesson();
        };

        // Cho phép nhấn SPACE để qua màn
        this.input.keyboard.once('keydown-SPACE', advance);

        const origY = this.monkey.y;

        hitZone.on('pointerover', () => {
            btnBg.clear();
            btnBg.fillStyle(0x2E7D32, 1);
            btnBg.fillRoundedRect(cx - btnW / 2, btnY - btnH / 2, btnW, btnH, 29);
        });
        hitZone.on('pointerout', () => {
            btnBg.clear();
            btnBg.fillStyle(0x43A047, 1);
            btnBg.fillRoundedRect(cx - btnW / 2, btnY - btnH / 2, btnW, btnH, 29);
        });
        hitZone.on('pointerdown', advance);

        this.tweens.add({ targets: overlay, alpha: 1, duration: 300 });
        this.tweens.add({ targets: panel, alpha: 1, duration: 400, delay: 150 });
        this.tweens.add({ targets: [headerText, subText], alpha: 1, duration: 350, delay: 380 });
        this.tweens.add({ targets: starsText, alpha: 1, scaleX: 1, scaleY: 1, duration: 500, delay: 600, ease: 'Back.Out' });
        this.tweens.add({ targets: [btnBg, btnText], alpha: 1, duration: 300, delay: 850 });

        this.time.delayedCall(1150, () => {
            this.tweens.add({
                targets: btnText,
                scaleX: 1.08, scaleY: 1.08,
                duration: 600, yoyo: true, repeat: -1, ease: 'Sine.InOut'
            });
        });

        this.tweens.add({
            targets: this.monkey,
            y: origY - 70,
            duration: 220,
            yoyo: true,
            repeat: 4,
            ease: 'Power2'
        });

        for (let i = 0; i < 10; i++) {
            const timer = this.time.delayedCall(i * 130, () => {
                const b = this.add.image(
                    Phaser.Math.Between(30, width - 30), -30, 'banana'
                ).setScale(Phaser.Math.FloatBetween(0.2, 0.4))
                    .setAngle(Phaser.Math.Between(-45, 45));
                
                lessonBananas.push(b);

                this.tweens.add({
                    targets: b,
                    y: height + 40,
                    angle: b.angle + Phaser.Math.Between(-180, 180),
                    duration: Phaser.Math.Between(900, 1600),
                    ease: 'Linear',
                    onComplete: () => {
                        const idx = lessonBananas.indexOf(b);
                        if (idx > -1) lessonBananas.splice(idx, 1);
                        b.destroy();
                    }
                });
            });
            lessonTimers.push(timer);
        }
    }
}
