export const CHAPTERS = [
    { id: 1, name: 'Khu rừng nhỏ',  emoji: '🌿', range: [0, 13] },   // bài 1-14
    { id: 2, name: 'Bụi rậm',       emoji: '🌳', range: [14, 27] },  // bài 15-28
    { id: 3, name: 'Bờ suối',       emoji: '🌊', range: [28, 41] },  // bài 29-42
    { id: 4, name: 'Thác nước',     emoji: '🏞️', range: [42, 55] },  // bài 43-56
    { id: 5, name: 'Đỉnh núi',      emoji: '⛰️', range: [56, 70] },  // bài 57-71
    { id: 6, name: 'Hang động',     emoji: '🌋', range: [71, 85] },  // bài 72-86
    { id: 7, name: 'Đỉnh cao',      emoji: '🌟', range: [86, 99] },  // bài 87-100
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
