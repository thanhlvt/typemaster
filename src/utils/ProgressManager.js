const SAVE_KEY = 'typemaster_progress';

export class ProgressManager {
    static loadProgress(totalLessons) {
        let lessonIndex = 0;
        let score = 0;
        let lessonStats = {};
        let unlockedAchievements = [];
        let consecutivePerfects = 0;
        let streakDays = 0;

        try {
            const saved = JSON.parse(localStorage.getItem(SAVE_KEY));
            if (saved) {
                lessonIndex = Math.min(saved.lessonIndex || 0, totalLessons - 1);
                score = saved.score || 0;
                unlockedAchievements = saved.unlockedAchievements || [];
                consecutivePerfects = saved.consecutivePerfects || 0;

                // Handle migration from old lessonStars to new lessonStats
                if (saved.lessonStats) {
                    lessonStats = saved.lessonStats;
                } else if (saved.lessonStars) {
                    const oldStars = saved.lessonStars;
                    for (const key in oldStars) {
                        lessonStats[key] = {
                            stars: oldStars[key],
                            wpm: 0,
                            accuracy: 0
                        };
                    }
                }
            }
        } catch (_) { }

        // Load streak for display
        try {
            const streakData = JSON.parse(localStorage.getItem('typemaster_streak'));
            if (streakData) {
                streakDays = streakData.streakDays || 0;
                const lastPlayDate = streakData.lastPlayDate;
                
                if (lastPlayDate) {
                    const today = new Date();
                    const todayStr = `${today.getFullYear()}-${String(today.getMonth()+1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
                    const yesterday = new Date(today);
                    yesterday.setDate(yesterday.getDate() - 1);
                    const yesterdayStr = `${yesterday.getFullYear()}-${String(yesterday.getMonth()+1).padStart(2, '0')}-${String(yesterday.getDate()).padStart(2, '0')}`;
                    
                    if (lastPlayDate !== todayStr && lastPlayDate !== yesterdayStr) {
                        streakDays = 0;
                        localStorage.setItem('typemaster_streak', JSON.stringify({
                            streakDays: 0,
                            lastPlayDate: lastPlayDate
                        }));
                    }
                }
            }
        } catch (_) { }

        return { lessonIndex, score, lessonStats, unlockedAchievements, consecutivePerfects, streakDays };
    }

    static saveProgress(lessonIndex, score, lessonStats, unlockedAchievements = [], consecutivePerfects = 0) {
        localStorage.setItem(SAVE_KEY, JSON.stringify({
            lessonIndex,
            score,
            lessonStats,
            unlockedAchievements,
            consecutivePerfects
        }));
    }

    static clearAll() {
        localStorage.clear();
    }

    static checkAndUpdateStreak() {
        let storedStreak = 0;
        let storedDate = null;
        try {
            const data = JSON.parse(localStorage.getItem('typemaster_streak'));
            if (data) {
                storedStreak = data.streakDays || 0;
                storedDate = data.lastPlayDate;
            }
        } catch(e) {}

        const today = new Date();
        const todayStr = `${today.getFullYear()}-${String(today.getMonth()+1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
        
        let newStreak = storedStreak;
        let isNewStreakDay = false;

        if (storedDate !== todayStr) {
            const yesterday = new Date(today);
            yesterday.setDate(yesterday.getDate() - 1);
            const yesterdayStr = `${yesterday.getFullYear()}-${String(yesterday.getMonth()+1).padStart(2, '0')}-${String(yesterday.getDate()).padStart(2, '0')}`;
            
            if (storedDate === yesterdayStr) {
                newStreak++;
            } else {
                newStreak = 1;
            }
            
            localStorage.setItem('typemaster_streak', JSON.stringify({
                lastPlayDate: todayStr,
                streakDays: newStreak
            }));
            
            isNewStreakDay = true;
        }

        return { streakDays: newStreak, isNewStreakDay };
    }
}
