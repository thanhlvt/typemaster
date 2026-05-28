// Cấu hình các minigame cho từng bài học
// Mỗi minigame được định nghĩa với gameId và các tham số điều khiển hiển thị/tương tác riêng biệt

export const MINIGAME_CONFIGS = {
    // Lesson 0 - 13 (Group: Khu rừng, Chapter 1: Cây non, Boss: Sói Già)
    // Lesson 0: Minigame Thu thập đồ vật
    0: {
        gameId: 'collect_items',
        config: {
            items: [
                { texture: 'banana_item', image: 'banana.png', emoji: '🍌', count: 5, width: 96, height: 96 }, 
                { texture: 'mushroom_item', image: 'mushroom.png', emoji: '🍄', count: 5, width: 80, height: 80 }
            ],
            container: {
                texture: 'basket_container',
                image: 'basket.png',
                emoji: '🧺',
                x: 920,
                y: 340,
                width: 180,
                height: 180
            },
            layout: 'scatter_random', // Rải ngẫu nhiên trên màn hình
            area: { minX: 100, maxX: 700, minY: 120, maxY: 340 } // Khu vực rải đồ vật
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
            playerVehicle: { 
                texture: 'car_monkey', 
                image: 'car1.png', 
                emoji: '🚗', 
                type: 'car',
                scale: 0.45,         // Tỷ lệ kích thước của chiếc xe
                flipX: true,         // Lật ngang xe (true: quay sang phải, false: mặc định sang trái)
                driverFlipX: false,  // Lật ngang người lái (true/false)
                driverScale: 0.2,   // Tỷ lệ kích thước người lái (khỉ)
                driverOffsetX: -10,   // Khoảng lệch ngang của khỉ so với tâm xe
                driverOffsetY: -27,   // Khoảng lệch dọc của khỉ so với tâm xe
                vehicleOffsetX: 20,
                vehicleOffsetY: -5
            },
            enemyVehicle: { 
                texture: 'car_boss', 
                image: 'car2.png', 
                emoji: '🏎️', 
                type: 'car',
                scale: 0.45,         // Tỷ lệ kích thước của xe boss
                flipX: true,         // Lật ngang xe boss
                driverFlipX: true,  // Lật ngang boss
                driverScale: 0.2,   // Tỷ lệ kích thước của boss
                driverOffsetX: -10,   // Khoảng lệch ngang của boss so với tâm xe
                driverOffsetY: -30,   // Khoảng lệch dọc của boss so với tâm xe
                vehicleOffsetX: 20,
                vehicleOffsetY: -5
            },
            track: {
                texture: 'race_track',
                // Các loại đường đua hỗ trợ (track.type):
                // - 'road' : Đường bộ (mặc định nhựa xám, vạch đứt khúc màu trắng)
                // - 'water': Đường nước (nước xanh dương, viền bọt sóng xanh nhạt, sóng gợn nhẹ)
                // - 'air'  : Đường trên không (màu tím vũ trụ, viền neon hồng phát sáng, chấm tròn lấp lánh)
                type: 'road',
                startX: 150,
                endX: 820,
                playerY: 220,
                enemyY: 350,
                height: 70
            }
        },
        interactions: {
            onWordComplete: { action: 'move_forward' },
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
