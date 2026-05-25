// 50 chapters × 14 lessons = 700 lessons total.
// Grouped into 7 themes (CHAPTER_GROUPS) for visual separation in sidebar.

export const CHAPTER_GROUPS = [
    { id: 1, name: 'Khu rừng',  emoji: '🌿', chapterIds: [1,  2,  3,  4,  5,  6,  7]  },
    { id: 2, name: 'Sông nước', emoji: '🌊', chapterIds: [8,  9,  10, 11, 12, 13, 14] },
    { id: 3, name: 'Núi rừng',  emoji: '⛰️', chapterIds: [15, 16, 17, 18, 19, 20, 21] },
    { id: 4, name: 'Đêm sao',   emoji: '🌌', chapterIds: [22, 23, 24, 25, 26, 27, 28] },
    { id: 5, name: 'Biển khơi', emoji: '🏝️', chapterIds: [29, 30, 31, 32, 33, 34, 35] },
    { id: 6, name: 'Lâu đài',   emoji: '🏰', chapterIds: [36, 37, 38, 39, 40, 41, 42] },
    { id: 7, name: 'Vũ trụ',    emoji: '🌟', chapterIds: [43, 44, 45, 46, 47, 48, 49, 50] },
];

const LESSONS_PER_CHAPTER = 14;
const range = (id) => [(id - 1) * LESSONS_PER_CHAPTER, id * LESSONS_PER_CHAPTER - 1];

export const CHAPTERS = [
    // ── 🌿 Khu rừng ───────────────────────────────────────────
    { id: 1,  groupId: 1, name: 'Cây non',       emoji: '🌱', range: range(1)  },
    { id: 2,  groupId: 1, name: 'Bụi rậm',       emoji: '🌿', range: range(2)  },
    { id: 3,  groupId: 1, name: 'Lá xanh',       emoji: '🍃', range: range(3)  },
    { id: 4,  groupId: 1, name: 'Cổ thụ',        emoji: '🌳', range: range(4)  },
    { id: 5,  groupId: 1, name: 'Nấm rừng',      emoji: '🍄', range: range(5)  },
    { id: 6,  groupId: 1, name: 'Hoa dại',       emoji: '🌸', range: range(6)  },
    { id: 7,  groupId: 1, name: 'Bướm rừng',     emoji: '🦋', range: range(7)  },

    // ── 🌊 Sông nước ──────────────────────────────────────────
    { id: 8,  groupId: 2, name: 'Giọt nước',     emoji: '💧', range: range(8)  },
    { id: 9,  groupId: 2, name: 'Suối mát',      emoji: '🌊', range: range(9)  },
    { id: 10, groupId: 2, name: 'Cá vàng',       emoji: '🐟', range: range(10) },
    { id: 11, groupId: 2, name: 'Hồ sen',        emoji: '🪷', range: range(11) },
    { id: 12, groupId: 2, name: 'Cầu tre',       emoji: '🌉', range: range(12) },
    { id: 13, groupId: 2, name: 'Thuyền nhỏ',    emoji: '🛶', range: range(13) },
    { id: 14, groupId: 2, name: 'Thác bạc',      emoji: '🏞️', range: range(14) },

    // ── ⛰️ Núi rừng ──────────────────────────────────────────
    { id: 15, groupId: 3, name: 'Chân núi',      emoji: '🏔️', range: range(15) },
    { id: 16, groupId: 3, name: 'Đá lăn',        emoji: '🪨', range: range(16) },
    { id: 17, groupId: 3, name: 'Rừng thông',    emoji: '🌲', range: range(17) },
    { id: 18, groupId: 3, name: 'Hươu sao',      emoji: '🦌', range: range(18) },
    { id: 19, groupId: 3, name: 'Đại bàng',      emoji: '🦅', range: range(19) },
    { id: 20, groupId: 3, name: 'Mây trắng',     emoji: '☁️', range: range(20) },
    { id: 21, groupId: 3, name: 'Đỉnh tuyết',    emoji: '⛰️', range: range(21) },

    // ── 🌌 Đêm sao ───────────────────────────────────────────
    { id: 22, groupId: 4, name: 'Trăng non',     emoji: '🌙', range: range(22) },
    { id: 23, groupId: 4, name: 'Sao nhỏ',       emoji: '✨', range: range(23) },
    { id: 24, groupId: 4, name: 'Cú đêm',        emoji: '🦉', range: range(24) },
    { id: 25, groupId: 4, name: 'Đom đóm',       emoji: '🪲', range: range(25) },
    { id: 26, groupId: 4, name: 'Đêm huyền bí',  emoji: '🔮', range: range(26) },
    { id: 27, groupId: 4, name: 'Sao băng',      emoji: '🌠', range: range(27) },
    { id: 28, groupId: 4, name: 'Dải ngân hà',   emoji: '🌌', range: range(28) },

    // ── 🏝️ Biển khơi ────────────────────────────────────────
    { id: 29, groupId: 5, name: 'Bãi cát',       emoji: '🏖️', range: range(29) },
    { id: 30, groupId: 5, name: 'Còng cát',      emoji: '🦀', range: range(30) },
    { id: 31, groupId: 5, name: 'Vỏ ốc',         emoji: '🐚', range: range(31) },
    { id: 32, groupId: 5, name: 'San hô',        emoji: '🐠', range: range(32) },
    { id: 33, groupId: 5, name: 'Rùa biển',      emoji: '🐢', range: range(33) },
    { id: 34, groupId: 5, name: 'Cá heo',        emoji: '🐬', range: range(34) },
    { id: 35, groupId: 5, name: 'Đại dương',     emoji: '🌊', range: range(35) },

    // ── 🏰 Lâu đài ───────────────────────────────────────────
    { id: 36, groupId: 6, name: 'Cổng đá',       emoji: '🚪', range: range(36) },
    { id: 37, groupId: 6, name: 'Hiệp sĩ',       emoji: '🛡️', range: range(37) },
    { id: 38, groupId: 6, name: 'Cung tên',      emoji: '🏹', range: range(38) },
    { id: 39, groupId: 6, name: 'Tháp canh',     emoji: '🏯', range: range(39) },
    { id: 40, groupId: 6, name: 'Vương miện',    emoji: '👑', range: range(40) },
    { id: 41, groupId: 6, name: 'Rồng nhỏ',      emoji: '🐉', range: range(41) },
    { id: 42, groupId: 6, name: 'Trận thắng',    emoji: '⚔️', range: range(42) },

    // ── 🌟 Vũ trụ ────────────────────────────────────────────
    { id: 43, groupId: 7, name: 'Tên lửa',       emoji: '🚀', range: range(43) },
    { id: 44, groupId: 7, name: 'Trái đất',      emoji: '🌍', range: range(44) },
    { id: 45, groupId: 7, name: 'Mặt trăng',     emoji: '🌕', range: range(45) },
    { id: 46, groupId: 7, name: 'Sao chổi',      emoji: '☄️', range: range(46) },
    { id: 47, groupId: 7, name: 'Sao Thổ',       emoji: '🪐', range: range(47) },
    { id: 48, groupId: 7, name: 'Hành tinh lạ',  emoji: '👽', range: range(48) },
    { id: 49, groupId: 7, name: 'Siêu tân tinh', emoji: '💫', range: range(49) },
    { id: 50, groupId: 7, name: 'Vô tận',        emoji: '🌟', range: range(50) },
];

export function getChapterForLesson(lessonIndex) {
    for (const chapter of CHAPTERS) {
        if (lessonIndex >= chapter.range[0] && lessonIndex <= chapter.range[1]) {
            return chapter;
        }
    }
    return CHAPTERS[CHAPTERS.length - 1]; // Fallback to last
}

export function getChapterProgress(chapter, lessonStars) {
    let done = 0;
    const start = chapter.range[0];
    const end = chapter.range[1];
    const total = end - start + 1;

    for (let i = start; i <= end; i++) {
        if (lessonStars[i] > 0) {
            done++;
        }
    }

    return {
        done,
        total,
        isComplete: done === total,
        isActive: done > 0 && done < total
    };
}

export function isChapterUnlocked(chapter, lessonStars) {
    if (chapter.id === 1) return true;

    // Find previous chapter
    const prevChapter = CHAPTERS.find(c => c.id === chapter.id - 1);
    if (!prevChapter) return true;

    // Check if previous chapter is complete
    const prevProgress = getChapterProgress(prevChapter, lessonStars);
    return prevProgress.isComplete;
}

export function getGroupForChapter(chapter) {
    return CHAPTER_GROUPS.find(g => g.id === chapter.groupId);
}
