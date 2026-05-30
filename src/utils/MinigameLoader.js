import { ensureTextures } from './TextureLoader';
import { MinigameFactory } from '../components/minigames/MinigameFactory';

/**
 * Parses minigame config, loads required assets, and instantiates the minigame.
 *
 * @param {Phaser.Scene} scene The active PlayScene
 * @param {object} minigameConfig Minigame configuration object
 * @param {number} totalWords Total words in the lesson
 * @param {function} onReady Callback when the minigame is ready and initialized (or skipped)
 */
export function setupMinigameAndStart(scene, minigameConfig, totalWords, onReady) {
    if (minigameConfig) {
        if (scene.monkey) {
            scene.monkey.setVisible(false);
        }

        const texturesToLoad = [];

        const getAssetUrl = (imagePath) => {
            if (imagePath.startsWith('assets/')) {
                return imagePath;
            }
            return `assets/${imagePath}`;
        };

        // 1. Container image
        if (minigameConfig.config?.container?.image) {
            const imgName = minigameConfig.config.container.image;
            const containerKey = 'container_tex_' + imgName.replace(/[^a-zA-Z0-9]/g, '_');
            texturesToLoad.push({
                key: containerKey,
                url: getAssetUrl(imgName)
            });
        }

        // 1.5. Racing vehicle images
        if (minigameConfig.config?.playerVehicle?.image) {
            const imgName = minigameConfig.config.playerVehicle.image;
            const key = 'racing_player_vehicle_' + imgName.replace(/[^a-zA-Z0-9]/g, '_');
            texturesToLoad.push({
                key: key,
                url: getAssetUrl(imgName)
            });
        }
        if (minigameConfig.config?.enemyVehicle?.image) {
            const imgName = minigameConfig.config.enemyVehicle.image;
            const key = 'racing_enemy_vehicle_' + imgName.replace(/[^a-zA-Z0-9]/g, '_');
            texturesToLoad.push({
                key: key,
                url: getAssetUrl(imgName)
            });
        }

        // 2. Item images
        if (Array.isArray(minigameConfig.config?.items)) {
            minigameConfig.config.items.forEach(item => {
                if (item.image) {
                    const key = item.texture || 'item_tex_' + item.image.replace(/[^a-zA-Z0-9]/g, '_');
                    texturesToLoad.push({
                        key: key,
                        url: getAssetUrl(item.image)
                    });
                }
            });
        }

        // 3. FinishedObject image (Assemble)
        if (minigameConfig.config?.finishedObject?.image) {
            const imgName = minigameConfig.config.finishedObject.image;
            const key = 'finished_obj_tex_' + imgName.replace(/[^a-zA-Z0-9]/g, '_');
            texturesToLoad.push({
                key: key,
                url: getAssetUrl(imgName)
            });
        }

        // 4. Parts images (Assemble)
        if (Array.isArray(minigameConfig.config?.parts)) {
            minigameConfig.config.parts.forEach(part => {
                if (part.image) {
                    const key = 'part_tex_' + part.image.replace(/[^a-zA-Z0-9]/g, '_');
                    texturesToLoad.push({
                        key: key,
                        url: getAssetUrl(part.image)
                    });
                }
            });
        }

        // 5. Animal & Cage images (Rescue)
        if (minigameConfig.config?.animal?.image) {
            const imgName = minigameConfig.config.animal.image;
            const key = 'rescue_animal_tex_' + imgName.replace(/[^a-zA-Z0-9]/g, '_');
            texturesToLoad.push({
                key: key,
                url: getAssetUrl(imgName)
            });
        } else if (minigameConfig.config?.animalImage) {
            const imgName = minigameConfig.config.animalImage;
            const key = 'rescue_animal_tex_' + imgName.replace(/[^a-zA-Z0-9]/g, '_');
            texturesToLoad.push({
                key: key,
                url: getAssetUrl(imgName)
            });
        }

        if (minigameConfig.config?.cage?.image) {
            const imgName = minigameConfig.config.cage.image;
            const key = 'rescue_cage_tex_' + imgName.replace(/[^a-zA-Z0-9]/g, '_');
            texturesToLoad.push({
                key: key,
                url: getAssetUrl(imgName)
            });
        } else if (minigameConfig.config?.cageImage) {
            const imgName = minigameConfig.config.cageImage;
            const key = 'rescue_cage_tex_' + imgName.replace(/[^a-zA-Z0-9]/g, '_');
            texturesToLoad.push({
                key: key,
                url: getAssetUrl(imgName)
            });
        }

        // 6. GrowPlant images (plant, pot, stages)
        if (minigameConfig.config?.plant?.image) {
            const imgName = minigameConfig.config.plant.image;
            const key = 'grow_plant_final_tex_' + imgName.replace(/[^a-zA-Z0-9]/g, '_');
            texturesToLoad.push({
                key: key,
                url: getAssetUrl(imgName)
            });
        }
        if (Array.isArray(minigameConfig.config?.plant?.stages)) {
            minigameConfig.config.plant.stages.forEach((stage, idx) => {
                if (stage.image) {
                    const key = 'grow_plant_stage_' + idx + '_' + stage.image.replace(/[^a-zA-Z0-9]/g, '_');
                    texturesToLoad.push({
                        key: key,
                        url: getAssetUrl(stage.image)
                    });
                }
            });
        }
        if (minigameConfig.config?.pot?.image) {
            const imgName = minigameConfig.config.pot.image;
            const key = 'grow_pot_tex_' + imgName.replace(/[^a-zA-Z0-9]/g, '_');
            texturesToLoad.push({
                key: key,
                url: getAssetUrl(imgName)
            });
        }

        // 7. CatchInsects images (insect, net, jar)
        if (minigameConfig.config?.insect?.image) {
            const imgName = minigameConfig.config.insect.image;
            const key = 'catch_insect_tex_' + imgName.replace(/[^a-zA-Z0-9]/g, '_');
            texturesToLoad.push({
                key: key,
                url: getAssetUrl(imgName)
            });
        }
        if (minigameConfig.config?.net?.image) {
            const imgName = minigameConfig.config.net.image;
            const key = 'catch_net_tex_' + imgName.replace(/[^a-zA-Z0-9]/g, '_');
            texturesToLoad.push({
                key: key,
                url: getAssetUrl(imgName)
            });
        }
        if (minigameConfig.config?.jar?.image) {
            const imgName = minigameConfig.config.jar.image;
            const key = 'catch_jar_tex_' + imgName.replace(/[^a-zA-Z0-9]/g, '_');
            texturesToLoad.push({
                key: key,
                url: getAssetUrl(imgName)
            });
        }

        // 8. WhackMole images (hole, mole, hammer)
        if (minigameConfig.config?.hole?.image) {
            const imgName = minigameConfig.config.hole.image;
            const key = 'mole_hole_tex_' + imgName.replace(/[^a-zA-Z0-9]/g, '_');
            texturesToLoad.push({
                key: key,
                url: getAssetUrl(imgName)
            });
        }
        if (minigameConfig.config?.mole?.image) {
            const imgName = minigameConfig.config.mole.image;
            const key = 'mole_mole_tex_' + imgName.replace(/[^a-zA-Z0-9]/g, '_');
            texturesToLoad.push({
                key: key,
                url: getAssetUrl(imgName)
            });
        }
        if (minigameConfig.config?.hammer?.image) {
            const imgName = minigameConfig.config.hammer.image;
            const key = 'mole_hammer_tex_' + imgName.replace(/[^a-zA-Z0-9]/g, '_');
            texturesToLoad.push({
                key: key,
                url: getAssetUrl(imgName)
            });
        }

        // 9. BubbleShooter images (bubble)
        if (minigameConfig.config?.bubble?.image) {
            const imgName = minigameConfig.config.bubble.image;
            const bubbleKey = 'bubble_shoot_tex_' + imgName.replace(/[^a-zA-Z0-9]/g, '_');
            texturesToLoad.push({
                key: bubbleKey,
                url: getAssetUrl(imgName)
            });
        }

        // 10. FrogJump images (frog, leaf)
        if (minigameConfig.config?.frog?.image) {
            const imgName = minigameConfig.config.frog.image;
            const key = 'frog_frog_tex_' + imgName.replace(/[^a-zA-Z0-9]/g, '_');
            texturesToLoad.push({
                key: key,
                url: getAssetUrl(imgName)
            });
        }
        if (minigameConfig.config?.leaf?.image) {
            const imgName = minigameConfig.config.leaf.image;
            const key = 'frog_leaf_tex_' + imgName.replace(/[^a-zA-Z0-9]/g, '_');
            texturesToLoad.push({
                key: key,
                url: getAssetUrl(imgName)
            });
        }

        // 11. ClearFog images
        if (minigameConfig.config?.image) {
            const imgName = minigameConfig.config.image;
            const fogKey = 'clear_fog_tex_' + imgName.replace(/[^a-zA-Z0-9]/g, '_');
            texturesToLoad.push({
                key: fogKey,
                url: getAssetUrl(imgName)
            });
        } else if (minigameConfig.config?.fog?.image) {
            const imgName = minigameConfig.config.fog.image;
            const fogKey = 'clear_fog_tex_' + imgName.replace(/[^a-zA-Z0-9]/g, '_');
            texturesToLoad.push({
                key: fogKey,
                url: getAssetUrl(imgName)
            });
        }

        ensureTextures(scene, texturesToLoad, () => {
            const minigame = MinigameFactory.createMinigame(scene, minigameConfig.gameId, minigameConfig.config);
            if (minigame) {
                minigame.init(totalWords);
                minigame.create();
            }
            if (onReady) {
                onReady(minigame);
            }
        });
    } else {
        if (scene.monkey) {
            scene.monkey.setVisible(true).setAlpha(1);
        }
        if (onReady) {
            onReady(null);
        }
    }
}
