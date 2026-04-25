export class TelexEngine {
    constructor(rules) {
        this.rules = rules;
        // Longest patterns must be applied first so "aas"→ấ is tried before "aa"→â or "as"→á
        this.sortedRules = Object.entries(rules).sort((a, b) => b[0].length - a[0].length);
        this.rawBuffer = "";
        this.vietnameseBuffer = "";
    }

    processKey(key) {
        this.rawBuffer += key;
        this.vietnameseBuffer = this._apply(this.rawBuffer);
        return this.vietnameseBuffer;
    }

    _apply(raw) {
        return raw.split(' ')
            .map(word => this._applyToWord(word))
            .join(' ');
    }

    _applyToWord(raw) {
        const toneMarks = "sfrxjz";

        // Build cleanRaw (raw minus tone marks) and position mapping
        let cleanRaw = "";
        let rawToCleanMap = [];
        for (let i = 0; i < raw.length; i++) {
            if (!toneMarks.includes(raw[i])) {
                rawToCleanMap.push(i);
                cleanRaw += raw[i];
            }
        }

        // Collect every rule that can match the raw string
        const matches = [];
        const rules = Object.entries(this.rules).sort((a, b) => b[0].length - a[0].length);

        for (const [pattern, replacement] of rules) {
            let pBase = "";
            let pTones = [];
            for (const c of pattern) {
                if (toneMarks.includes(c)) pTones.push(c);
                else pBase += c;
            }

            const baseIdx = pBase ? cleanRaw.indexOf(pBase) : 0;
            if (pBase && baseIdx === -1) continue;

            const baseIndicesInRaw = pBase
                ? Array.from({ length: pBase.length }, (_, i) => rawToCleanMap[baseIdx + i])
                : [];

            // Search for tone marks AFTER the base start position
            const tempChars = raw.split('');
            for (const idx of baseIndicesInRaw) tempChars[idx] = null;

            const searchStart = baseIndicesInRaw.length > 0 ? baseIndicesInRaw[0] : 0;
            let tonesMatch = true;
            const toneIndicesInRaw = [];

            for (const t of pTones) {
                const tIdx = tempChars.indexOf(t, searchStart);
                if (tIdx !== -1) {
                    toneIndicesInRaw.push(tIdx);
                    tempChars[tIdx] = null;
                } else {
                    tonesMatch = false;
                    break;
                }
            }

            if (tonesMatch) {
                const baseStart = baseIndicesInRaw.length > 0
                    ? baseIndicesInRaw[0]
                    : (toneIndicesInRaw.length > 0 ? toneIndicesInRaw[0] : 0);
                matches.push({ baseStart, patternLength: pattern.length, baseIndices: baseIndicesInRaw, toneIndices: toneIndicesInRaw, replacement });
            }
        }

        // Resolve conflicts: longer pattern wins first (prioritizes complex vowels like ê, â, ô);
        // break ties by earlier base position (ensures "mias" → "mía").
        matches.sort((a, b) => b.patternLength - a.patternLength || a.baseStart - b.baseStart);

        const consumed = new Set();
        const finalChars = raw.split('');

        for (const { baseIndices, toneIndices, replacement } of matches) {
            const allPos = [...baseIndices, ...toneIndices];
            if (allPos.some(p => consumed.has(p))) continue;

            if (baseIndices.length > 0) {
                finalChars[baseIndices[0]] = replacement;
                for (let i = 1; i < baseIndices.length; i++) finalChars[baseIndices[i]] = "";
            } else if (toneIndices.length > 0) {
                finalChars[toneIndices[0]] = replacement;
            }
            for (const t of toneIndices) finalChars[t] = "";
            allPos.forEach(p => consumed.add(p));
        }

        return finalChars.join('');
    }

    static applyRules(raw, rules) {
        // Sort rules by length descending
        const sorted = Object.entries(rules).sort((a, b) => b[0].length - a[0].length);
        let result = raw;
        for (const [pattern, replacement] of sorted) {
            result = result.replaceAll(pattern, replacement);
        }
        return result;
    }

    clear() {
        this.rawBuffer = "";
        this.vietnameseBuffer = "";
    }

    getRawBuffer() {
        return this.rawBuffer;
    }

    getVietnameseBuffer() {
        return this.vietnameseBuffer;
    }
}
