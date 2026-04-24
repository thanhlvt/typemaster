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
        let result = raw;
        const toneMarks = "sfrxjz";
        const rules = Object.entries(this.rules).sort((a, b) => b[0].length - a[0].length);

        for (const [pattern, replacement] of rules) {
            // Phân tách pattern thành phần cơ sở (base) và các dấu thanh (tones)
            let pBase = "";
            let pTones = [];
            for (const c of pattern) {
                if (toneMarks.includes(c)) pTones.push(c);
                else pBase += c;
            }

            // Tạo chuỗi chỉ chứa các ký tự cơ sở (bỏ qua dấu thanh đang xen ngang)
            let cleanRaw = "";
            let rawToCleanMap = []; // Ánh xạ vị trí từ cleanRaw ngược lại chuỗi gốc
            for (let i = 0; i < result.length; i++) {
                if (!toneMarks.includes(result[i])) {
                    cleanRaw += result[i];
                    rawToCleanMap.push(i);
                }
            }

            // 1. Kiểm tra phần cơ sở phải xuất hiện liên tiếp trong cleanRaw
            let baseIdx = pBase ? cleanRaw.indexOf(pBase) : 0;
            
            if (baseIdx !== -1) {
                // Xác định vị trí thực tế của các ký tự cơ sở trong chuỗi gốc
                let baseIndicesInRaw = [];
                if (pBase) {
                    for (let i = 0; i < pBase.length; i++) {
                        baseIndicesInRaw.push(rawToCleanMap[baseIdx + i]);
                    }
                }

                // 2. Tìm kiếm các dấu thanh
                let tempChars = result.split('');
                for (const idx of baseIndicesInRaw) tempChars[idx] = null; // Bỏ qua phần base

                let tonesMatch = true;
                let toneIndicesInRaw = [];
                // QUAN TRỌNG: Dấu thanh phải nằm SAU ký tự cơ sở mà nó bổ nghĩa
                let searchStart = baseIndicesInRaw.length > 0 ? baseIndicesInRaw[0] : 0;

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
                    // 3. Thực hiện thay thế
                    let finalChars = result.split('');
                    
                    if (baseIndicesInRaw.length > 0) {
                        finalChars[baseIndicesInRaw[0]] = replacement;
                        // Xóa các ký tự còn lại của base
                        for (let i = 1; i < baseIndicesInRaw.length; i++) {
                            finalChars[baseIndicesInRaw[i]] = "";
                        }
                    } else if (toneIndicesInRaw.length > 0) {
                        // Trường hợp rule chỉ toàn dấu thanh
                        finalChars[toneIndicesInRaw[0]] = replacement;
                        toneIndicesInRaw.shift();
                    }

                    // Xóa các ký tự dấu thanh đã dùng
                    for (const tIdx of toneIndicesInRaw) {
                        finalChars[tIdx] = "";
                    }
                    
                    result = finalChars.join('');
                }
            }
        }
        return result;
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
