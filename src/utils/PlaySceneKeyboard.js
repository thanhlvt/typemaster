import { TypingValidator } from './TypingValidator';

/**
 * Determines the next key the player must press and highlights it on the virtual keyboard.
 *
 * @param {Phaser.Scene} scene The active PlayScene
 */
export function highlightNextKey(scene) {
    const rawBuffer     = scene.telexEngine.getRawBuffer();
    const targetKeysStr = scene.targetKeys.toLowerCase();
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

    scene.virtualKeyboard.highlightKey(nextCharToHighlight);
}

/**
 * Handles a keydown event: validates the input, advances the typing buffer,
 * and triggers success or fail on the scene.
 *
 * @param {Phaser.Scene} scene The active PlayScene
 * @param {KeyboardEvent} event The browser keydown event
 */
export function handleKeyDown(scene, event) {
    const key = event.key.toLowerCase();
    if (!/^[a-z ]$/.test(key)) return;

    const rawBuffer = scene.telexEngine.getRawBuffer();

    if (TypingValidator.isPossible(rawBuffer + key, scene.targetKeys, scene.targetWord, scene.telexEngine)) {
        const vietnameseBuffer = scene.telexEngine.processKey(key);
        scene.sound.play('key_sound');
        scene.typingBox.setTypedText(vietnameseBuffer);
        highlightNextKey(scene);

        if (TypingValidator.normalizeForMatch(vietnameseBuffer) === TypingValidator.normalizeForMatch(scene.targetWord)) {
            scene.handleSuccess();
        }
    } else {
        scene.errorsInLesson++;
        scene.handleFail();
    }
}
