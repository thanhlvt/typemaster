// Cấu hình các minigame cho từng bài học
// Mỗi minigame được định nghĩa với gameId và các tham số điều khiển hiển thị/tương tác riêng biệt

export const MINIGAME_CONFIGS = {
    // Lesson 0: Minigame Thu thập đồ vật
    0: {
        gameId: 'collect_items',
        config: {
            items: [
                { texture: 'banana_item', image: 'banana.png', emoji: '🍌', count: 4, width: 45, height: 45 }, 
                { texture: 'mushroom_item', emoji: '🍄', count: 3 },
                { texture: 'chestnut_item', emoji: '🌰', count: 3 }
            ],
            container: {
                texture: 'basket_container',
                emoji: '🧺',
                x: 700,
                y: 280,
                width: 96,
                height: 96
            },
            layout: 'scatter_random', // Rải ngẫu nhiên trên màn hình
            area: { minX: 100, maxX: 500, minY: 120, maxY: 320 } // Khu vực rải đồ vật
        },
        interactions: {
            onWordComplete: { action: 'collect_to_container', effect: 'sparkle' },
            onTypeError: { action: 'shake', effect: 'red_flash' }
        }
    },

    // Lesson 1: Minigame Đua xe vượt ải
    1: {
        gameId: 'racing',
        config: {
            playerVehicle: { texture: 'car_monkey', emoji: '🚗', type: 'car' }, // Hỗ trợ: car, boat, spaceship, airplane
            enemyVehicle: { texture: 'car_boss', emoji: '🏎️', type: 'car' },
            track: {
                texture: 'race_track',
                startX: 120,
                endX: 680,
                playerY: 160,
                enemyY: 280
            }
        },
        interactions: {
            onWordComplete: { action: 'move_forward' }, // Tự tính toán dựa trên tiến độ gõ
            onTypeError: { action: 'slow_down', effect: 'smoke' }
        }
    },

    // Lesson 2: Minigame Lắp ráp xe tải
    2: {
        gameId: 'assemble_object',
        config: {
            finishedObject: { 
                texture: 'truck_complete', 
                emoji: '🚚', 
                x: 400, 
                y: 220, 
                scale: 1.5 
            },
            parts: [
                { id: 'part_body', texture: 'truck_body', emoji: '🟩', offsetX: 0, offsetY: -20, order: 1 },
                { id: 'part_wheel1', texture: 'truck_wheel1', emoji: '⚫', offsetX: -50, offsetY: 30, order: 2 },
                { id: 'part_wheel2', texture: 'truck_wheel2', emoji: '⚫', offsetX: 50, offsetY: 30, order: 3 },
                { id: 'part_cabin', texture: 'truck_cabin', emoji: '🟦', offsetX: 40, offsetY: -30, order: 4 },
                { id: 'part_cargo', texture: 'truck_cargo', emoji: '🍌', offsetX: -30, offsetY: -40, order: 5 }
            ]
        },
        interactions: {
            onWordComplete: { action: 'assemble_next_part' },
            onTypeError: { action: 'shake_uncompleted' }
        }
    }
};
