import * as Phaser from 'phaser';
import { TelexEngine } from '../utils/TelexEngine';
import { VirtualKeyboard } from '../components/VirtualKeyboard';
import { ConfirmDialog } from '../components/ConfirmDialog';
import { ResultOverlay } from '../components/ResultOverlay';

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
        this.virtualKeyboard = new VirtualKeyboard(this, 0, 0);

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
        this.input.keyboard.enabled = false;
        new ConfirmDialog(this, () => {
            this._doReset();
        }).on('destroy', () => {
            this.input.keyboard.enabled = true;
        });
    }

    // ── UI ─────────────────────────────────────────────────────────

    createContentUI(width, height) {
        const bgTop = height * 0.52;
        const bgHeight = height * 0.22;

        const bg = this.add.graphics();
        bg.fillStyle(0xffffff, 0.8);
        bg.fillRoundedRect(width * 0.02, bgTop, width * 0.96, bgHeight, 20);

        this.targetText = this.add.text(width / 2, bgTop + bgHeight * 0.18, '', {
            fontFamily: 'Verdana, sans-serif',
            fontSize: '48px',
            fontStyle: 'bold',
            fill: '#333'
        }).setOrigin(0.5);

        this.ruleHint = this.add.text(width / 2, bgTop + bgHeight * 0.46, '', {
            fontFamily: 'Arial',
            fontSize: '24px',
            fontStyle: 'bold',
            fill: '#E65100'
        }).setOrigin(0.5);

        this.typedText = this.add.text(width / 2, bgTop + bgHeight * 0.70, '', {
            fontFamily: 'Verdana, sans-serif',
            fontSize: '44px',
            fontStyle: 'bold',
            fill: '#2E7D32'
        }).setOrigin(0.5);
    }

    // ── Keyboard logic ─────────────────────────────────────────────

    _resetKeys() {
        this.virtualKeyboard.resetKeys();
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
        const rawBuffer = this.telexEngine.getRawBuffer();
        const targetKeysStr = this._targetKeysLower();

        const currentCounts = {};
        for (const c of rawBuffer) {
            currentCounts[c] = (currentCounts[c] || 0) + 1;
        }

        const targetCountsSoFar = {};
        let nextCharToHighlight = null;

        for (const c of targetKeysStr) {
            targetCountsSoFar[c] = (targetCountsSoFar[c] || 0) + 1;
            if ((currentCounts[c] || 0) < targetCountsSoFar[c]) {
                nextCharToHighlight = c;
                break;
            }
        }

        this.virtualKeyboard.highlightKey(nextCharToHighlight);
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

        for (let i = 0; i < targetKeysStr.length; i++) {
            const c = targetKeysStr[i];
            let isTone = false;

            if ("fjz".includes(c)) {
                isTone = true;
            } else if ("srx".includes(c)) {
                const nextChar = i < targetKeysStr.length - 1 ? targetKeysStr[i + 1] : '';
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

        let testBase = "";
        let testTones = {};
        let basePtr = 0;

        for (const c of testRaw) {
            if (basePtr < targetBase.length && c === targetBase[basePtr]) {
                testBase += c;
                basePtr++;
            } else if (toneMarks.includes(c)) {
                testTones[c] = (testTones[c] || 0) + 1;
            } else {
                return false;
            }
        }

        for (const t in testTones) {
            if ((testTones[t] || 0) > (targetTones[t] || 0)) return false;
        }

        let remainingBase = targetBase.slice(testBase.length);

        let remainingTones = "";
        for (const t in targetTones) {
            const count = targetTones[t] - (testTones[t] || 0);
            for (let i = 0; i < count; i++) remainingTones += t;
        }

        const trial = testRaw + remainingBase + remainingTones;
        const resultWord = this._getVietnameseBufferForRaw(trial);

        return this._normalizeForMatch(resultWord) === this._normalizeForMatch(this.targetWord);
    }

    // ── Lesson flow ────────────────────────────────────────────────

    startLesson() {
        this.currentWordIndex = 0;
        this.errorsInLesson = 0;
        this.lessonStartTime = Date.now();

        const lesson = this.data.lessons[this.currentLessonIndex];
        this.totalKeysInLesson = lesson.content.reduce((sum, item) => sum + item.keys.length, 0);

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
            this.errorsInLesson++;
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
            this.lessonEndTime = Date.now();
            this.showLessonComplete();
            return;
        }

        this.showWord();
    }

    // ── Lesson complete overlay ────────────────────────────────────

    showLessonComplete() {
        this.input.keyboard.off('keydown', this.handleKeyDown, this);
        const total = this.totalKeysInLesson || 1;
        const accuracy = Math.round((total / (total + this.errorsInLesson)) * 100);
        const durationMin = (this.lessonEndTime - this.lessonStartTime) / 60000;
        const wpm = Math.round((total / 5) / durationMin) || 0;
        const isLastLesson = this.currentLessonIndex === this.data.lessons.length - 1;

        const overlay = new ResultOverlay(this, accuracy, wpm, isLastLesson);

        this.input.keyboard.once('keyup-SPACE', () => {
            if (!isLastLesson) {
                overlay.destroy();
                this.input.keyboard.on('keydown', this.handleKeyDown, this);
                this.currentLessonIndex++;
                this._saveProgress();
                this.startLesson();
            }
        });
    }
}
