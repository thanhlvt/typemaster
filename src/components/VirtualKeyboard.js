import * as Phaser from 'phaser';

export class VirtualKeyboard extends Phaser.GameObjects.Container {
    constructor(scene, x, y) {
        super(scene, x, y);
        this.scene = scene;
        const { width, height } = scene.scale;

        this.keys = {};
        this.fingerDots = {};

        this.createKeyboardUI(width, height);
        this.createHandsUI(width, height);
        
        scene.add.existing(this);
    }

    createKeyboardUI(width, height) {
        const keyboardAreaTop = height * 0.72;
        // In the original, the footerBg was added to the scene. 
        // Here we add it to the container, but we need to adjust coordinates.
        // Or we just add it to the scene and keep this container for keys/hands.
        // Let's add the background to the container at relative pos.
        
        const footerBg = this.scene.add.graphics();
        footerBg.fillStyle(0x222222, 0.95);
        footerBg.fillRect(0, keyboardAreaTop, width, height - keyboardAreaTop);
        // We don't add footerBg to 'this' container because 'this' is at (0,0) usually
        // and footerBg covers the whole width. Let's just manage it in the scene or add to container.
        this.add(footerBg);

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
                const keyContainer = this.scene.add.container(startX + currentKeyWidth / 2, startY + keySize / 2);

                const bg = this.scene.add.graphics();
                bg.fillStyle(0x444444, 1);
                bg.fillRoundedRect(-currentKeyWidth / 2, -keySize / 2, currentKeyWidth, keySize, 8);
                bg.lineStyle(2, 0x666666);
                bg.strokeRoundedRect(-currentKeyWidth / 2, -keySize / 2, currentKeyWidth, keySize, 8);

                const text = this.scene.add.text(0, 0, char, {
                    fontFamily: 'Arial',
                    fontSize: isSpace ? '16px' : '22px',
                    fontStyle: 'bold',
                    fill: '#FFFFFF'
                }).setOrigin(0.5);

                keyContainer.add([bg, text]);
                const keyId = isSpace ? ' ' : char.toLowerCase();
                this.keys[keyId] = { bg, text, container: keyContainer, isSpace, width: currentKeyWidth };
                
                this.add(keyContainer);
                startX += currentKeyWidth + spacing;
            });
            startY += keySize + spacing;
        });
    }

    createHandsUI(width, height) {
        const keyboardAreaTop = height * 0.72;
        const handY = keyboardAreaTop + (height - keyboardAreaTop) / 2 + 10;

        // Left Hand
        const leftContainer = this.scene.add.container(width * 0.15, handY);
        const leftHandImg = this.scene.add.image(0, 0, 'hand_left').setScale(0.2).setAlpha(0.8);
        leftContainer.add(leftHandImg);

        const leftOffsets = {
            'L1': { x: -100, y: -55 },
            'L2': { x: -56, y: -95 },
            'L3': { x: -10, y: -110 },
            'L4': { x: 43, y: -100 },
            'L5': { x: 95, y: -10 }
        };

        for (let f in leftOffsets) {
            const dot = this.scene.add.circle(leftOffsets[f].x, leftOffsets[f].y, 18, 0xFFC107).setAlpha(0);
            dot.setStrokeStyle(3, 0xFFFFFF, 1);
            leftContainer.add(dot);
            this.fingerDots[f] = dot;
        }
        this.add(leftContainer);

        // Right Hand
        const rightContainer = this.scene.add.container(width * 0.85, handY);
        const rightHandImg = this.scene.add.image(0, 0, 'hand_right').setScale(0.2).setAlpha(0.8);
        rightContainer.add(rightHandImg);

        const rightOffsets = {
            'R1': { x: 100, y: -55 },
            'R2': { x: 56, y: -95 },
            'R3': { x: 10, y: -110 },
            'R4': { x: -43, y: -100 },
            'R5': { x: -95, y: -10 }
        };

        for (let f in rightOffsets) {
            const dot = this.scene.add.circle(rightOffsets[f].x, rightOffsets[f].y, 18, 0xFFC107).setAlpha(0);
            dot.setStrokeStyle(3, 0xFFFFFF, 1);
            rightContainer.add(dot);
            this.fingerDots[f] = dot;
        }
        this.add(rightContainer);
    }

    resetKeys() {
        for (let k in this.keys) {
            const keyObj = this.keys[k];
            const w = keyObj.width || 40;
            const h = 40;
            this.scene.tweens.killTweensOf(keyObj.container);
            keyObj.container.setScale(1);
            keyObj.bg.clear();
            keyObj.bg.fillStyle(0x444444, 1);
            keyObj.bg.fillRoundedRect(-w / 2, -h / 2, w, h, 8);
            keyObj.bg.lineStyle(2, 0x666666);
            keyObj.bg.strokeRoundedRect(-w / 2, -h / 2, w, h, 8);
        }

        for (let f in this.fingerDots) {
            this.scene.tweens.killTweensOf(this.fingerDots[f]);
            this.fingerDots[f].setAlpha(0);
        }
    }

    highlightKey(nextCharToHighlight) {
        this.resetKeys();

        if (nextCharToHighlight && this.keys[nextCharToHighlight]) {
            const k = this.keys[nextCharToHighlight];
            const w = k.width || 40;
            const h = 40;
            k.bg.clear();
            k.bg.fillStyle(0xFFC107, 1);
            k.bg.fillRoundedRect(-w / 2, -h / 2, w, h, 8);

            this.scene.tweens.add({
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
                this.scene.tweens.add({
                    targets: dot,
                    alpha: 1,
                    scale: 1.4,
                    duration: 400,
                    yoyo: true,
                    repeat: -1
                });
            } else if (nextCharToHighlight === ' ') {
                ['L5', 'R5'].forEach(f => {
                    const dot = this.fingerDots[f];
                    this.scene.tweens.add({
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
}
