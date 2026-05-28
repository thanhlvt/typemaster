import { ProgressManager } from './ProgressManager';
import { AudioManager } from './AudioManager';
import { ResultOverlay } from '../components/ResultOverlay';
import { SpinWheelOverlay } from '../components/SpinWheelOverlay';
import { StoryDialogOverlay } from '../components/StoryDialogOverlay';
import { saveProgressAndCheckAchievements } from './PlaySceneProgressHelper';
import { STORY_CONFIGS } from '../data/story_configs';

/**
 * Orchestrates the full lesson-complete flow:
 * - Calculates stars, WPM, accuracy
 * - Saves progress and checks achievements
 * - Shows post-game story dialog (if any)
 * - Shows SpinWheel (first time) then ResultOverlay
 * - Handles continue / retry / back-to-map navigation
 *
 * @param {Phaser.Scene} scene The active PlayScene
 */
export function showLessonComplete(scene) {
    AudioManager.playJingle(scene, 'level_sound', scene.currentLessonIndex, true);
    scene.input.keyboard.off('keydown', scene._boundHandleKeyDown);

    const { streakDays: newStreakDays, isNewStreakDay } = ProgressManager.checkAndUpdateStreak();
    scene.streakDays = newStreakDays;

    const total        = scene.totalKeysInLesson || 1;
    const accuracy     = Math.round((total / (total + scene.errorsInLesson)) * 100);
    const durationMin  = (scene.lessonEndTime - scene.lessonStartTime) / 60000;
    const wpm          = Math.round((total / 5) / durationMin) || 0;
    const isLastLesson = scene.currentLessonIndex === scene.gameData.lessons.length - 1;

    const stars = accuracy >= 95 ? 3 : (accuracy >= 80 ? 2 : 1);

    const { oldStats, dailyBonusAwarded } = saveProgressAndCheckAchievements(scene, stars, wpm, accuracy);

    const isFirstTime      = !scene.isDailyChallenge && (!oldStats || oldStats.stars === 0);
    const storyModeEnabled = ProgressManager.getStoryMode();
    const storyConfig      = storyModeEnabled ? STORY_CONFIGS[scene.currentLessonIndex] : null;

    const proceedToResults = () => {
        const cleanUp = () => {
            scene.input.keyboard.off('keyup-SPACE',   handleContinue);
            scene.input.keyboard.off('keyup-ENTER',   handleRetry);
            scene.input.keyboard.off('keydown-ESC',   handleBackToMap);
        };

        const showStreakVisual = () => {
            if (isNewStreakDay) scene.hud.showStreak(newStreakDays);
        };

        const handleContinue = () => {
            if (!isLastLesson && !scene.isDailyChallenge) {
                cleanUp(); overlay.destroy();
                showStreakVisual();

                const nextIndex = scene.currentLessonIndex + 1;
                ProgressManager.saveProgress(
                    nextIndex, scene.score,
                    scene.lessonStats, scene.unlockedAchievements, scene.consecutivePerfects
                );

                const isNextBoss    = (nextIndex % 14 === 13);
                const isNewChapter  = (nextIndex % 14 === 0);

                if (isNewChapter) {
                    _destroyMinigame(scene);
                    scene.scene.start('ChapterIntroScene', { lessonIndex: nextIndex });
                } else if (isNextBoss) {
                    _destroyMinigame(scene);
                    scene.scene.start('BossScene', { lessonIndex: nextIndex });
                } else {
                    scene.input.keyboard.on('keydown', scene._boundHandleKeyDown);
                    scene.currentLessonIndex = nextIndex;
                    scene.startLesson();
                }
            }
        };

        const handleRetry = () => {
            cleanUp(); overlay.destroy();
            showStreakVisual();
            scene.input.keyboard.on('keydown', scene._boundHandleKeyDown);
            scene.startLesson();
        };

        const handleBackToMap = () => {
            cleanUp(); overlay.destroy();
            showStreakVisual();
            _destroyMinigame(scene);
            scene.scene.start('MapScene');
        };

        let overlay = null;

        const showResultOverlay = () => {
            overlay = new ResultOverlay(
                scene, accuracy, wpm,
                isLastLesson || scene.isDailyChallenge,
                handleBackToMap, oldStats, scene.isDailyChallenge,
                null, dailyBonusAwarded
            );

            scene.input.keyboard.once('keyup-SPACE',  handleContinue);
            scene.input.keyboard.once('keyup-ENTER',  handleRetry);
            scene.input.keyboard.once('keydown-ESC',  handleBackToMap);

            overlay.on('continue', () => { cleanUp(); handleContinue(); });
            overlay.on('retry',    () => { cleanUp(); handleRetry(); });
        };

        if (isFirstTime) {
            new SpinWheelOverlay(scene, (reward) => {
                if (reward.bananas > 0) {
                    scene.score += reward.bananas;
                    ProgressManager.saveProgress(
                        scene.currentLessonIndex, scene.score,
                        scene.lessonStats, scene.unlockedAchievements, scene.consecutivePerfects
                    );
                }
                showResultOverlay();
            });
        } else {
            showResultOverlay();
        }
    };

    if (storyConfig && storyConfig.postGame) {
        new StoryDialogOverlay(scene, storyConfig.postGame, () => {
            proceedToResults();
        });
    } else {
        proceedToResults();
    }
}

// ── Private helpers ────────────────────────────────────────────────────────

function _destroyMinigame(scene) {
    if (scene.minigame) {
        scene.minigame.destroy();
        scene.minigame = null;
    }
}
