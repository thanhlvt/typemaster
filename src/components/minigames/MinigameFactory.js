import { CollectItemsGame } from './CollectItemsGame';
import { RacingGame } from './RacingGame';
import { AssembleObjectGame } from './AssembleObjectGame';

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
            default:
                console.warn(`MinigameFactory: Chưa hỗ trợ minigame mang ID "${gameId}"`);
                return null;
        }
    }
}
