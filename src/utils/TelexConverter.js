/**
 * Utility to convert Vietnamese text to Telex typing sequences
 * based on the provided rules.
 */
export class TelexConverter {
    /**
     * Converts a Vietnamese string to Telex keys.
     * @param {string} text - The Vietnamese text to convert.
     * @param {Object} rules - The Telex rules from rules.json.
     * @returns {string} The Telex typing sequence.
     */
    static convertToTelex(text, rules) {
        if (!text) return "";
        if (!rules) return text;

        const invTones = {
            '\u0300': 'f', // huyền
            '\u0301': 's', // sắc
            '\u0309': 'r', // hỏi
            '\u0303': 'x', // ngã
            '\u0323': 'j'  // nặng
        };

        // Filter rules that only have vowel/consonant markers (no tone keys)
        // toneMarks = "sfrxjz" (as defined in TelexEngine)
        const markerRules = Object.entries(rules)
            .filter(([k, v]) => !/[sfrxjz]/.test(k) || k === 'dd')
            .sort((a, b) => b[1].length - a[1].length);

        return text.split(' ').map(word => {
            if (!word) return "";

            let toneKey = "";
            let cleanWord = word.normalize('NFD');
            let baseWord = "";

            // 1. Extract and remove tone mark
            for (let char of cleanWord) {
                if (invTones[char]) {
                    toneKey = invTones[char];
                } else {
                    baseWord += char;
                }
            }

            // 2. Convert markers back to keys (ê -> ee, đ -> dd, etc.)
            let result = baseWord.normalize('NFC');
            for (let [pattern, replacement] of markerRules) {
                result = result.split(replacement).join(pattern);
            }

            // 3. Append tone key at the end (User preferred style)
            return result + toneKey;
        }).join(' ');
    }
}
