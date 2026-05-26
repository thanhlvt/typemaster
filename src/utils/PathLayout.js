/**
 * Serpentine Path Layout Utility
 */

export function buildNodePositions(chapters) {
    const COLS = 4;
    const ROW_H = 120;
    // Spaced columns: X=110, 300, 490, 680 to fit within the 1024px screen left of the sidebar (sidebar starts at X=784)
    const X_ZONES = [110, 300, 490, 680];
    const positions = [];
    let globalY = 300;

    for (let cIdx = 0; cIdx < chapters.length; cIdx++) {
        const chapter = chapters[cIdx];
        const count = chapter.range[1] - chapter.range[0] + 1; // 14 lessons per chapter
        let dir = 1; // 1 = Left to Right, -1 = Right to Left
        let col = 0;

        // Add padding between chapters/themes
        if (cIdx > 0) {
            const prevChapter = chapters[cIdx - 1];
            if (prevChapter.groupId !== chapter.groupId) {
                globalY += 120; // theme transition gap
            } else {
                globalY += 80;  // chapter transition gap
            }
        }

        const chapterStartY = globalY;

        for (let i = 0; i < count; i++) {
            const lessonIndex = chapter.range[0] + i;

            // Determine column based on direction
            const xIdx = (dir === 1) ? col : (COLS - 1 - col);
            const x = X_ZONES[xIdx];
            const y = globalY;

            positions.push({
                x,
                y,
                chapterId: chapter.id,
                lessonIndex,
                isBoss: (lessonIndex % 14 === 13),
                col: xIdx,
                row: Math.floor(i / COLS),
                dir
            });

            // Advance to next column
            col++;
            if (col >= COLS) {
                col = 0;
                dir = -dir;
                globalY += ROW_H;
            }
        }

        // If we didn't end exactly at a column wrap, increment Y so the next chapter starts on a new line
        if (col > 0) {
            globalY += ROW_H;
        }
    }

    return positions;
}

export function getDecorations(positions, chapters) {
    const decorations = [];
    
    // Seeded LCG random generator for deterministic layout
    let seed = 12345;
    function nextRand() {
        const x = Math.sin(seed++) * 10000;
        return x - Math.floor(x);
    }

    positions.forEach((pos) => {
        // Skip decoration if near boss to avoid crowding
        if (pos.isBoss) return;

        const chapter = chapters.find(c => c.id === pos.chapterId);
        if (!chapter) return;

        // 90% chance of decoration near a node (3x more than 30%)
        if (nextRand() < 0.90) {
            let offsetX = 0;
            let offsetY = 0;

            if (pos.col === 0) {
                // Leftmost: place to the right
                offsetX = 55 + nextRand() * 25;
            } else if (pos.col === 3) {
                // Rightmost: place to the left
                offsetX = -55 - nextRand() * 25;
            } else {
                // Middle: place left or right
                offsetX = (nextRand() < 0.5 ? -1 : 1) * (50 + nextRand() * 25);
            }

            offsetY = (nextRand() < 0.5 ? -1 : 1) * (25 + nextRand() * 30);

            // Select all emojis from the chapters in the same chapter group
            const themeEmojis = chapters
                .filter(c => c.groupId === chapter.groupId)
                .map(c => c.emoji);

            const emojiIdx = Math.floor(nextRand() * themeEmojis.length);
            const emoji = themeEmojis[emojiIdx];

            decorations.push({
                x: pos.x + offsetX,
                y: pos.y + offsetY,
                emoji,
                scale: 0.8 + nextRand() * 0.4,
                lessonIndex: pos.lessonIndex
            });
        }
    });

    return decorations;
}

export function getFogAlpha(index, currentIndex) {
    if (index <= currentIndex + 10) {
        return 1.0;
    } else if (index >= currentIndex + 50) {
        return 0.15;
    } else {
        return 1.0 - (index - (currentIndex + 10)) / 40 * 0.85;
    }
}
