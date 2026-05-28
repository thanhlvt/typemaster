import { CollectItemsGame } from './CollectItemsGame';
import { RacingGame } from './RacingGame';
import { AssembleObjectGame } from './AssembleObjectGame';
import { RescueAnimalsGame } from './RescueAnimalsGame';
import { BubbleShooterGame } from './BubbleShooterGame';
import { CatchInsectsGame } from './CatchInsectsGame';
import { FrogJumpGame } from './FrogJumpGame';
import { GrowPlantGame } from './GrowPlantGame';
import { ClearFogGame } from './ClearFogGame';
import { WhackMoleGame } from './WhackMoleGame';

export class MinigameFactory {
    /**
     * Khởi tạo đối tượng minigame tương ứng với gameId
     * @param {Phaser.Scene} scene Đối tượng PlayScene
     * @param {string} gameId Định danh minigame ('collect_items', 'racing', 'assemble_object', ...)
     * @param {object} config Tham số cấu hình chi tiết của game đó
     * @returns {BaseMinigame|null} Trả về đối tượng game cụ thể hoặc null nếu không khớp
     */
    static createMinigame(scene, gameId, config) {
        switch (gameId) {
            case 'collect_items':
                return new CollectItemsGame(scene, config);
            case 'racing':
                return new RacingGame(scene, config);
            case 'assemble_object':
                return new AssembleObjectGame(scene, config);
            case 'rescue_animals':
                return new RescueAnimalsGame(scene, config);
            case 'bubble_shooter':
                return new BubbleShooterGame(scene, config);
            case 'catch_insects':
                return new CatchInsectsGame(scene, config);
            case 'frog_jump':
                return new FrogJumpGame(scene, config);
            case 'grow_plant':
                return new GrowPlantGame(scene, config);
            case 'clear_fog':
                return new ClearFogGame(scene, config);
            case 'whack_mole':
                return new WhackMoleGame(scene, config);
            default:
                console.warn(`MinigameFactory: Chưa hỗ trợ minigame mang ID "${gameId}"`);
                return null;
        }
    }
}
