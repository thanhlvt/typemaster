import { getChapterForLesson } from '../data/chapters';
import { ProgressManager } from './ProgressManager';

export class AudioManager {
    static playThemeMusic(scene, lessonIndex, ignoreSettings = false) {
        // Read Settings
        const settings = ProgressManager.getAudioSettings();
        const selection = ignoreSettings ? 'auto' : (settings.bgMusic || 'auto');

        let currentMusicKey = selection;
        if (selection === 'auto') {
            const chapter = getChapterForLesson(lessonIndex);
            const groupId = chapter ? chapter.groupId : 1;
            currentMusicKey = `music_${groupId}`;
        }

        // All potential background music keys to stop
        const musicKeys = ['level_sound', 'boss_sound', 'music_1', 'music_2', 'music_3', 'music_4', 'music_5', 'music_6', 'music_7'];

        // Stop any other active background music
        musicKeys.forEach(k => {
            if (k !== currentMusicKey) {
                scene.sound.stopByKey(k);
            }
        });

        // Play or resume the correct theme music
        if (scene.cache.audio.exists(currentMusicKey)) {
            const existing = scene.sound.sounds.find(s => s.key === currentMusicKey);
            if (existing) {
                if (existing.isPaused) {
                    existing.resume();
                } else if (!existing.isPlaying) {
                    existing.play();
                }
            } else {
                scene.sound.play(currentMusicKey, { volume: 0.3, loop: true });
            }
        }
    }

    static playJingle(scene, key, lessonIndex, ignoreSettings = false) {
        // Find active background music and pause it
        const activeBg = scene.sound.sounds.find(s => s.key.startsWith('music_') && s.isPlaying);
        if (activeBg) {
            activeBg.pause();
        }

        if (scene.cache.audio.exists(key)) {
            const jingle = scene.sound.add(key, { volume: 0.7 });

            const onShutdown = () => {
                jingle.stop();
                if (activeBg && activeBg.isPaused) {
                    activeBg.resume();
                } else if (lessonIndex !== undefined) {
                    AudioManager.playThemeMusic(scene, lessonIndex, ignoreSettings);
                }
                jingle.destroy();
            };
            scene.events.once('shutdown', onShutdown);

            jingle.once('complete', () => {
                scene.events.off('shutdown', onShutdown);
                if (activeBg && activeBg.isPaused) {
                    activeBg.resume();
                } else if (lessonIndex !== undefined) {
                    AudioManager.playThemeMusic(scene, lessonIndex, ignoreSettings);
                }
                jingle.destroy();
            });
            jingle.play();
        }
    }
}
