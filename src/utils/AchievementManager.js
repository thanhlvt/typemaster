export const ACHIEVEMENTS = [
    // --- Group 1: Lesson Milestones (Mốc bài học) ---
    { id: 'beginner', title: 'Người mới', desc: 'Hoàn thành bài 1', icon: '👶' },
    { id: 'explorer', title: 'Nhà thám hiểm', desc: 'Hoàn thành bài 50', icon: '🗺️' },
    { id: 'star_100', title: 'Ngôi sao', desc: 'Hoàn thành bài 100', icon: '⭐' },
    { id: 'star_200', title: 'Siêu sao', desc: 'Hoàn thành bài 200', icon: '🌟' },

    // --- Group 2: Typing Speed (Tốc độ gõ) ---
    { id: 'speedy', title: 'Tốc ký', desc: 'Tốc độ gõ WPM ≥ 50', icon: '⚡' },
    { id: 'supersonic', title: 'Siêu tốc', desc: 'Tốc độ gõ WPM ≥ 80', icon: '🚀' },
    { id: 'godspeed', title: 'Thần tốc', desc: 'Tốc độ gõ WPM ≥ 100', icon: '👽' },
    { id: 'strong_return', title: 'Trở lại mạnh mẽ', desc: 'Vượt kỷ lục WPM cũ thêm 20 đơn vị', icon: '💪' },

    // --- Group 3: Accuracy / Perfection (Độ chính xác / Hoàn hảo) ---
    { id: 'perfect', title: 'Hoàn hảo', desc: 'Chính xác 100% ở một bài', icon: '🎯' },
    { id: 'sharp_eye', title: 'Mắt tinh nhanh', desc: 'Hoàn thành bài ≥ 50 phím chính xác 100%', icon: '👁️' },
    { id: 'blacksmith', title: 'Thợ rèn Telex', desc: 'Hoàn thành 5 bài liên tiếp chính xác 100%', icon: '🔨' },
    { id: 'flawless', title: 'Không tì vết', desc: 'Gõ chính xác ≥ 95% ở 10 bài khác nhau', icon: '💎' },

    // --- Group 4: Streak & Banana (Chuỗi học tập & Chuối) ---
    { id: 'persistent_7', title: 'Kiên trì', desc: 'Học 7 ngày liên tiếp', icon: '📅' },
    { id: 'persistent_14', title: 'Thói quen tốt', desc: 'Học 14 ngày liên tiếp', icon: '🔥' },
    { id: 'persistent_30', title: 'Kiên trì sắt đá', desc: 'Học 30 ngày liên tiếp', icon: '🛡️' },
    { id: 'banana_king', title: 'Chuối Vương', desc: 'Tích lũy tổng cộng 500 chuối', icon: '👑' },

    // --- Group 5: Miscellaneous & Time (Thành tích khác & Thời gian) ---
    { id: 'improver', title: 'Vượt khó', desc: 'Cải thiện bài cũ từ 1-2 sao lên 3 sao', icon: '🧗' },
    { id: 'collector', title: 'Nhà sưu tầm', desc: 'Đạt đủ 3 sao cho bài từ 1 đến 20', icon: '🎒' },
    { id: 'early_bird', title: 'Chào ngày mới', desc: 'Hoàn thành bài học từ 5h00 - 7h00 sáng', icon: '🌅' },
    { id: 'night_owl', title: 'Cú đêm', desc: 'Hoàn thành bài học từ 23h00 - 4h00 sáng', icon: '🦉' }
];

export class AchievementManager {
    static checkAchievements(sessionData, progress, oldLessonStats = null) {
        const newlyUnlocked = [];
        const unlockedSet = new Set(progress.unlockedAchievements);

        const checkUnlock = (id, condition) => {
            if (!unlockedSet.has(id) && condition) {
                newlyUnlocked.push(id);
            }
        };

        const today = sessionData.timeOfCompletion || new Date();
        const hour = today.getHours();

        // --- Group 1: Lesson Milestones (Mốc bài học) ---
        // 1. beginner
        checkUnlock('beginner', sessionData.lessonIndex === 0);

        // 2. explorer
        checkUnlock('explorer', sessionData.lessonIndex === 49);

        // 3. star_100
        checkUnlock('star_100', sessionData.lessonIndex === 99);

        // 4. star_200
        checkUnlock('star_200', sessionData.lessonIndex === 199);


        // --- Group 2: Typing Speed (Tốc độ gõ) ---
        // 5. speedy
        checkUnlock('speedy', sessionData.wpm >= 50);

        // 6. supersonic
        checkUnlock('supersonic', sessionData.wpm >= 80);

        // 7. godspeed
        checkUnlock('godspeed', sessionData.wpm >= 100);

        // 8. strong_return
        if (oldLessonStats && oldLessonStats.wpm > 0) {
            checkUnlock('strong_return', sessionData.wpm >= oldLessonStats.wpm + 20);
        }


        // --- Group 3: Accuracy / Perfection (Độ chính xác / Hoàn hảo) ---
        // 9. perfect
        checkUnlock('perfect', sessionData.accuracy === 100);

        // 10. sharp_eye
        checkUnlock('sharp_eye', sessionData.totalKeys >= 50 && sessionData.accuracy === 100);

        // 11. blacksmith
        checkUnlock('blacksmith', progress.consecutivePerfects >= 5);

        // 12. flawless
        let flawlessCount = 0;
        for (const idx in progress.lessonStats) {
            const stat = progress.lessonStats[idx] || {};
            const acc = (parseInt(idx) === sessionData.lessonIndex) ? sessionData.accuracy : (stat.accuracy || 0);
            if (acc >= 95) flawlessCount++;
        }
        checkUnlock('flawless', flawlessCount >= 10);


        // --- Group 4: Streak & Banana (Chuỗi học tập & Chuối) ---
        // 13. persistent_7
        checkUnlock('persistent_7', progress.streakDays >= 7);

        // 14. persistent_14
        checkUnlock('persistent_14', progress.streakDays >= 14);

        // 15. persistent_30
        checkUnlock('persistent_30', progress.streakDays >= 30);

        // 16. banana_king
        checkUnlock('banana_king', progress.score >= 500);


        // --- Group 5: Miscellaneous & Time (Thành tích khác & Thời gian) ---
        // 17. improver
        if (oldLessonStats) {
            const oldStars = oldLessonStats.stars || 0;
            checkUnlock('improver', oldStars > 0 && oldStars < 3 && sessionData.stars === 3);
        }

        // 18. collector
        let collectorMatch = true;
        for (let i = 0; i < 20; i++) {
            const stat = progress.lessonStats[i] || {};
            const starsForL = (i === sessionData.lessonIndex) ? sessionData.stars : (stat.stars || 0);
            if (starsForL < 3) {
                collectorMatch = false;
                break;
            }
        }
        checkUnlock('collector', collectorMatch);

        // 19. early_bird
        checkUnlock('early_bird', hour >= 5 && hour < 7);

        // 20. night_owl
        checkUnlock('night_owl', hour >= 23 || hour < 4);

        return newlyUnlocked;
    }
}
