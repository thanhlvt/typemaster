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
            texturesToLoad.push({
                key: minigameConfig.config.container.texture,
                url: getAssetUrl(minigameConfig.config.container.image)
            });
        }

        // 1.5. Racing vehicle images
        if (minigameConfig.config?.playerVehicle?.image) {
            texturesToLoad.push({
                key: minigameConfig.config.playerVehicle.texture,
                url: getAssetUrl(minigameConfig.config.playerVehicle.image)
            });
        }
        if (minigameConfig.config?.enemyVehicle?.image) {
            texturesToLoad.push({
                key: minigameConfig.config.enemyVehicle.texture,
                url: getAssetUrl(minigameConfig.config.enemyVehicle.image)
            });
        }

        // 2. Item images
        if (Array.isArray(minigameConfig.config?.items)) {
            minigameConfig.config.items.forEach(item => {
                if (item.image) {
                    texturesToLoad.push({
                        key: item.texture,
                        url: getAssetUrl(item.image)
                    });
                }
            });
        }

        // 3. FinishedObject image (Assemble)
        if (minigameConfig.config?.finishedObject?.image) {
            texturesToLoad.push({
                key: minigameConfig.config.finishedObject.texture,
                url: getAssetUrl(minigameConfig.config.finishedObject.image)
            });
        }

        // 4. Parts images (Assemble)
        if (Array.isArray(minigameConfig.config?.parts)) {
            minigameConfig.config.parts.forEach(part => {
                if (part.image) {
                    texturesToLoad.push({
                        key: part.texture,
                        url: getAssetUrl(part.image)
                    });
                }
            });
        }

        // 5. Animal & Cage images (Rescue)
        if (minigameConfig.config?.animal?.image) {
            texturesToLoad.push({
                key: minigameConfig.config.animal.texture || 'rescue_animal_tex',
                url: getAssetUrl(minigameConfig.config.animal.image)
            });
        } else if (minigameConfig.config?.animalImage) {
            texturesToLoad.push({
                key: minigameConfig.config.animalTexture || 'rescue_animal_tex',
                url: getAssetUrl(minigameConfig.config.animalImage)
            });
        }

        if (minigameConfig.config?.cage?.image) {
            texturesToLoad.push({
                key: minigameConfig.config.cage.texture || 'rescue_cage_tex',
                url: getAssetUrl(minigameConfig.config.cage.image)
            });
        } else if (minigameConfig.config?.cageImage) {
            texturesToLoad.push({
                key: minigameConfig.config.cageTexture || 'rescue_cage_tex',
                url: getAssetUrl(minigameConfig.config.cageImage)
            });
        }

        // 6. GrowPlant images (plant, pot, stages)
        if (minigameConfig.config?.plant?.image) {
            texturesToLoad.push({
                key: minigameConfig.config.plant.texture || 'grow_plant_final_tex',
                url: getAssetUrl(minigameConfig.config.plant.image)
            });
        }
        if (Array.isArray(minigameConfig.config?.plant?.stages)) {
            minigameConfig.config.plant.stages.forEach((stage, idx) => {
                if (stage.image) {
                    texturesToLoad.push({
                        key: stage.texture || `grow_plant_stage_${idx}`,
                        url: getAssetUrl(stage.image)
                    });
                }
            });
        }
        if (minigameConfig.config?.pot?.image) {
            texturesToLoad.push({
                key: minigameConfig.config.pot.texture || 'grow_pot_tex',
                url: getAssetUrl(minigameConfig.config.pot.image)
            });
        }

        // 7. CatchInsects images (insect, net, jar)
        if (minigameConfig.config?.insect?.image) {
            texturesToLoad.push({
                key: minigameConfig.config.insect.texture || 'catch_insect_tex',
                url: getAssetUrl(minigameConfig.config.insect.image)
            });
        }
        if (minigameConfig.config?.net?.image) {
            texturesToLoad.push({
                key: minigameConfig.config.net.texture || 'catch_net_tex',
                url: getAssetUrl(minigameConfig.config.net.image)
            });
        }
        if (minigameConfig.config?.jar?.image) {
            texturesToLoad.push({
                key: minigameConfig.config.jar.texture || 'catch_jar_tex',
                url: getAssetUrl(minigameConfig.config.jar.image)
            });
        }

        // 8. WhackMole images (hole, mole, hammer)
        if (minigameConfig.config?.hole?.image) {
            texturesToLoad.push({
                key: minigameConfig.config.hole.texture || 'mole_hole_tex',
                url: getAssetUrl(minigameConfig.config.hole.image)
            });
        }
        if (minigameConfig.config?.mole?.image) {
            texturesToLoad.push({
                key: minigameConfig.config.mole.texture || 'mole_mole_tex',
                url: getAssetUrl(minigameConfig.config.mole.image)
            });
        }
        if (minigameConfig.config?.hammer?.image) {
            texturesToLoad.push({
                key: minigameConfig.config.hammer.texture || 'mole_hammer_tex',
                url: getAssetUrl(minigameConfig.config.hammer.image)
            });
        }

        // 9. BubbleShooter images (bubble)
        if (minigameConfig.config?.bubble?.image) {
            texturesToLoad.push({
                key: minigameConfig.config.bubble.texture || 'bubble_shoot_tex',
                url: getAssetUrl(minigameConfig.config.bubble.image)
            });
        }

        // 10. FrogJump images (frog, leaf)
        if (minigameConfig.config?.frog?.image) {
            texturesToLoad.push({
                key: minigameConfig.config.frog.texture || 'frog_frog_tex',
                url: getAssetUrl(minigameConfig.config.frog.image)
            });
        }
        if (minigameConfig.config?.leaf?.image) {
            texturesToLoad.push({
                key: minigameConfig.config.leaf.texture || 'frog_leaf_tex',
                url: getAssetUrl(minigameConfig.config.leaf.image)
            });
        }

        // 11. ClearFog images
        if (minigameConfig.config?.image) {
            texturesToLoad.push({
                key: minigameConfig.config.texture || 'clear_fog_tex',
                url: getAssetUrl(minigameConfig.config.image)
            });
        } else if (minigameConfig.config?.fog?.image) {
            texturesToLoad.push({
                key: minigameConfig.config.fog.texture || 'clear_fog_tex',
                url: getAssetUrl(minigameConfig.config.fog.image)
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
