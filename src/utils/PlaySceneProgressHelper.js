import { ProgressManager } from './ProgressManager';
import { AchievementManager } from './AchievementManager';
import { AchievementToast } from '../components/AchievementToast';

/**
 * Saves lesson progress, handles daily challenge rewards, and checks/unlocks achievements.
 *
 * @param {Phaser.Scene} scene The active PlayScene
 * @param {number} stars Stars awarded (1, 2, or 3)
 * @param {number} wpm Words Per Minute
 * @param {number} accuracy Typing accuracy percentage (0 to 100)
 * @returns {object} { oldStats, dailyBonusAwarded }
 */
export function saveProgressAndCheckAchievements(scene, stars, wpm, accuracy) {
    const total = scene.totalKeysInLesson || 1;
    let oldStats = { stars: 0, wpm: 0, accuracy: 0 };
    let dailyBonusAwarded = false;

    if (scene.isDailyChallenge) {
        const todayStr = ProgressManager._toDateStr(new Date());
        const progressObj = ProgressManager.loadProgress(scene.gameData.lessons.length);

        if (progressObj.dailyChallengeDate !== todayStr) {
            scene.score += 20;
            dailyBonusAwarded = true;
            ProgressManager.saveProgress(
                scene.currentLessonIndex, scene.score,
                scene.lessonStats, scene.unlockedAchievements, scene.consecutivePerfects,
                todayStr
            );
        }
    } else {
        ProgressManager.saveHistory({
            lessonIndex: scene.currentLessonIndex, wpm, accuracy, stars, timestamp: Date.now()
        });

        oldStats = { ... (scene.lessonStats[scene.currentLessonIndex] || { stars: 0, wpm: 0, accuracy: 0 }) };
        scene.lessonStats[scene.currentLessonIndex] = {
            stars:    Math.max(oldStats.stars    || 0, stars),
            wpm:      Math.max(oldStats.wpm      || 0, wpm),
            accuracy: Math.max(oldStats.accuracy || 0, accuracy),
            timestamp: Date.now()
        };

        if (accuracy === 100) { scene.consecutivePerfects++; }
        else                  { scene.consecutivePerfects = 0; }

        const sessionData = {
            lessonIndex: scene.currentLessonIndex, stars, wpm, accuracy,
            totalKeys: total, timeOfCompletion: new Date()
        };
        const progress = {
            lessonStats:          scene.lessonStats,
            unlockedAchievements: scene.unlockedAchievements,
            consecutivePerfects:  scene.consecutivePerfects,
            streakDays:           scene.streakDays,
            score:                scene.score
        };

        const newlyUnlocked = AchievementManager.checkAchievements(sessionData, progress, oldStats);
        if (newlyUnlocked.length > 0) {
            scene.unlockedAchievements.push(...newlyUnlocked);
            newlyUnlocked.forEach(id => AchievementToast.show(scene, id));
        }

        ProgressManager.saveProgress(
            scene.currentLessonIndex, scene.score,
            scene.lessonStats, scene.unlockedAchievements, scene.consecutivePerfects
        );
    }

    return { oldStats, dailyBonusAwarded };
}
