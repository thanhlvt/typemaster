export class TypingValidator {
    static getFingerForKey(key) {
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

    static normalizeForMatch(value) {
        return value.normalize('NFC').replace(/\s/g, '');
    }

    static isPossible(testRaw, targetKeys, targetWord, telexEngine) {
        const targetKeysStr = targetKeys.toLowerCase();
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
        const resultWord = trial.split(' ')
            .map(chunk => telexEngine._apply(chunk))
            .join(' ');

        return this.normalizeForMatch(resultWord) === this.normalizeForMatch(targetWord);
    }
}
