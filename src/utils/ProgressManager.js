import { getChapterBgKey } from '../data/chapters';

const SAVE_KEY = 'typemaster_progress';

export const UNLOCK_THRESHOLDS = [0, 50, 150, 300, 500, 750, 1050, 1400, 1800, 2300];

export class ProgressManager {

    static _toDateStr(date) {
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    }

    static loadProgress(totalLessons) {
        let lessonIndex = 0, score = 0, lessonStats = {}, unlockedAchievements = [],
            consecutivePerfects = 0, streakDays = 0, dailyChallengeDate = null, sprintHighScore = 0;

        try {
            const saved = JSON.parse(localStorage.getItem(SAVE_KEY));
            if (saved) {
                lessonIndex          = Math.min(saved.lessonIndex || 0, totalLessons - 1);
                score                = saved.score || 0;
                unlockedAchievements = saved.unlockedAchievements || [];
                consecutivePerfects  = saved.consecutivePerfects  || 0;
                dailyChallengeDate   = saved.dailyChallengeDate || null;
                sprintHighScore      = saved.sprintHighScore || 0;

                if (saved.lessonStats) {
                    lessonStats = saved.lessonStats;
                } else if (saved.lessonStars) {
                    for (const key in saved.lessonStars) {
                        lessonStats[key] = { stars: saved.lessonStars[key], wpm: 0, accuracy: 0 };
                    }
                }
            }
        } catch (_) { }

        try {
            const streakData = JSON.parse(localStorage.getItem('typemaster_streak'));
            if (streakData) {
                streakDays = streakData.streakDays || 0;
                const lastPlayDate = streakData.lastPlayDate;
                if (lastPlayDate) {
                    const today        = new Date();
                    const todayStr     = ProgressManager._toDateStr(today);
                    const yesterday    = new Date(today);
                    yesterday.setDate(yesterday.getDate() - 1);
                    const yesterdayStr = ProgressManager._toDateStr(yesterday);

                    if (lastPlayDate !== todayStr && lastPlayDate !== yesterdayStr) {
                        streakDays = 0;
                        localStorage.setItem('typemaster_streak', JSON.stringify({ streakDays: 0, lastPlayDate }));
                    }
                }
            }
        } catch (_) { }

        return { lessonIndex, score, lessonStats, unlockedAchievements, consecutivePerfects, streakDays, dailyChallengeDate, sprintHighScore };
    }

    static saveProgress(lessonIndex, score, lessonStats, unlockedAchievements = [], consecutivePerfects = 0, dailyChallengeDate = undefined, sprintHighScore = undefined) {
        let existing = {};
        try {
            existing = JSON.parse(localStorage.getItem(SAVE_KEY)) || {};
        } catch (_) {}

        const data = {
            lessonIndex,
            score,
            lessonStats,
            unlockedAchievements,
            consecutivePerfects,
            dailyChallengeDate: dailyChallengeDate !== undefined ? dailyChallengeDate : (existing.dailyChallengeDate || null),
            sprintHighScore: sprintHighScore !== undefined ? sprintHighScore : (existing.sprintHighScore || 0)
        };
        localStorage.setItem(SAVE_KEY, JSON.stringify(data));
    }

    static saveHistory(entry) {
        try {
            const history = ProgressManager.loadHistory();
            history.push(entry);
            if (history.length > 50) history.splice(0, history.length - 50);
            localStorage.setItem('typemaster_history', JSON.stringify(history));
        } catch (_) { }
    }

    static loadHistory() {
        try { return JSON.parse(localStorage.getItem('typemaster_history')) || []; }
        catch (_) { return []; }
    }

    static getEquippedSkins() {
        try { return JSON.parse(localStorage.getItem('typemaster_equipped_skins')) || { monkey: 'random', homeBackground: 'default' }; }
        catch (_) { return { monkey: 'random', homeBackground: 'default' }; }
    }

    static saveEquippedSkins(skins) {
        try { localStorage.setItem('typemaster_equipped_skins', JSON.stringify(skins)); } catch (_) { }
    }

    static getAudioSettings() {
        try { return JSON.parse(localStorage.getItem('typemaster_audio_settings')) || { mute: false, volume: 1.0 }; }
        catch (_) { return { mute: false, volume: 1.0 }; }
    }

    static saveAudioSettings(settings) {
        try { localStorage.setItem('typemaster_audio_settings', JSON.stringify(settings)); } catch (_) { }
    }

    static clearAll() {
        ['typemaster_progress', 'typemaster_streak', 'typemaster_history',
         'typemaster_equipped_skins', 'typemaster_audio_settings']
            .forEach(key => localStorage.removeItem(key));
    }

    /**
     * Returns list of background texture keys that are unlocked.
     * A chapter's background is unlocked if user has completed at least the first lesson of that chapter,
     * OR if it's chapter 1 (always unlocked).
     * @param {Object} lessonStats - lessonStats from progress
     * @param {Array} chapters - CHAPTERS array from chapters.js
     * @returns {string[]} array of texture keys e.g. ['bg_1_1', 'bg_1_2', ...]
     */
    static getUnlockedBackgrounds(lessonStats, chapters) {
        const unlocked = [];
        for (const chapter of chapters) {
            const firstLesson = chapter.range[0];
            // Chapter 1 always unlocked; others unlock when their first lesson is beaten
            if (chapter.id === 1 || (lessonStats[firstLesson] && lessonStats[firstLesson].stars > 0)) {
                unlocked.push(getChapterBgKey(chapter));
            }
        }
        // Always have at least bg_1_1
        if (unlocked.length === 0) unlocked.push('bg_1_1');
        return unlocked;
    }

    /**
     * Returns the texture key of the last unlocked background.
     * @param {Object} lessonStats - lessonStats from progress
     * @param {Array} chapters - CHAPTERS array from chapters.js
     * @returns {string} texture key e.g. 'bg_1_3'
     */
    static getLastUnlockedBackground(lessonStats, chapters) {
        const unlocked = ProgressManager.getUnlockedBackgrounds(lessonStats, chapters);
        return unlocked[unlocked.length - 1];
    }

    static checkAndUpdateStreak() {
        let storedStreak = 0, storedDate = null;
        try {
            const data = JSON.parse(localStorage.getItem('typemaster_streak'));
            if (data) { storedStreak = data.streakDays || 0; storedDate = data.lastPlayDate; }
        } catch (_) { }

        const today        = new Date();
        const todayStr     = ProgressManager._toDateStr(today);
        let newStreak      = storedStreak;
        let isNewStreakDay = false;

        if (storedDate !== todayStr) {
            const yesterday    = new Date(today);
            yesterday.setDate(yesterday.getDate() - 1);
            const yesterdayStr = ProgressManager._toDateStr(yesterday);

            newStreak = (storedDate === yesterdayStr) ? storedStreak + 1 : 1;
            localStorage.setItem('typemaster_streak', JSON.stringify({ lastPlayDate: todayStr, streakDays: newStreak }));
            isNewStreakDay = true;
        }

        return { streakDays: newStreak, isNewStreakDay };
    }
}
