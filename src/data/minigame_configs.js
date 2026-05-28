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
                image: 'truck_complete.png',
                emoji: '🚚', 
                x: 490, 
                y: 220, 
                scale: 0.8 
            },
            parts: [
                { id: 'part_body', texture: 'truck_body', image: 'truck_body.png', scaleX: 0.7, scaleY: 0.7, angle: 0, 
                    emoji: '🟩', offsetX: 0, offsetY: 0, order: 1 },
                { id: 'part_wheel1', texture: 'truck_wheel1', image: 'truck_wheel1.png', scaleX: 0.7, scaleY: 0.7, angle: 0, 
                    emoji: '⚫', offsetX: -105, offsetY: 30, order: 2 },
                { id: 'part_wheel2', texture: 'truck_wheel2', image: 'truck_wheel2.png', scaleX: 0.7, scaleY: 0.7, angle: 0, 
                    emoji: '⚫', offsetX: 90, offsetY: 30, order: 3 },
                { id: 'part_cabin', texture: 'truck_cabin', image: 'truck_cabin.png', scaleX: 0.7, scaleY: 0.7, angle: 0, 
                    emoji: '🟦', offsetX: -93, offsetY: -63, order: 4 },
                { id: 'part_cargo', texture: 'truck_cargo', image: 'truck_cargo.png', scaleX: 0.7, scaleY: 0.7, angle: 0, 
                    emoji: '🍌', offsetX: 78, offsetY: -85, order: 5 },
                { id: 'part_siren', texture: 'truck_siren', image: 'truck_siren.png', scaleX: 1.2, scaleY: 1.2, angle: 0, 
                    emoji: '🚨', offsetX: -62, offsetY: -152, order: 6 }
            ]
        },
        interactions: {
            onWordComplete: { action: 'assemble_next_part' },
            onTypeError: { action: 'shake_uncompleted' }
        }
    },

    // Lesson 3: Minigame Giải cứu động vật
    3: {
        gameId: 'rescue_animals',
        config: {
            animal: {
                texture: 'rescue_rabbit_tex',
                image: 'rabbit.png',
                scale: 0.8,
                animalEmoji: '🐰'
            },
            cage: {
                texture: 'rescue_cage_tex',
                image: 'cage.png',
                scale: 1,
                cageEmoji: '📦'
            },
            x: 490,
            y: 230
        },
        interactions: {
            onWordComplete: { action: 'break_cage' },
            onTypeError: { action: 'shake_cage' }
        }
    },

    // Lesson 4: Minigame Nuôi trồng cây thần
    4: {
        gameId: 'grow_plant',
        config: {
            cloud: {
                texture: 'grow_cloud_tex',
                image: 'cloud.png',
                scale: 0.35
            },
            plant: {
                stages: [
                    { texture: 'grow_tree1', image: 'tree1.png', scale: 0.4 },
                    { texture: 'grow_tree2', image: 'tree2.png', scale: 0.3 },
                    { texture: 'grow_tree3', image: 'tree3.png', scale: 0.6 },
                    { texture: 'grow_tree4', image: 'tree4.png', scale: 0.7 },
                    { texture: 'grow_tree5', image: 'tree5.png', scale: 0.75 }
                ]
            },
            x: 490,
            y: 390
        },
        interactions: {
            onWordComplete: { action: 'water_plant' },
            onTypeError: { action: 'shake_plant' }
        }
    },

    // Lesson 5: Minigame Bắt côn trùng
    5: {
        gameId: 'catch_insects',
        config: {
            insect: {
                texture: 'catch_insect_tex',
                image: 'butterfly.png',
                scale: 0.3,
                emoji: '🦋'
            },
            net: {
                texture: 'catch_net_tex',
                image: 'net.png',
                scale: 0.3,
                emoji: '🕸️'
            },
            jar: {
                texture: 'catch_jar_tex',
                image: 'jar.png',
                scale: 0.7,
                emoji: '🏺'
            },
            jarX: 940,
            jarY: 330,
            area: { minX: 100, maxX: 700, minY: 100, maxY: 290 }
        },
        interactions: {
            onWordComplete: { action: 'catch_insect' },
            onTypeError: { action: 'scare_insects' }
        }
    },

    // Lesson 6: Minigame Xua tan sương mù
    6: {
        gameId: 'clear_fog',
        config: {
            fogEmoji: '🌫️',
            fogScale: 2,
            x1: 200,
            y1: 140,
            x2: 750,
            y2: 330
        },
        interactions: {
            onWordComplete: { action: 'clear_fog_segment' },
            onTypeError: { action: 'darken_fog' }
        }
    },

    // Lesson 7: Minigame Đập chuột chũi
    7: {
        gameId: 'whack_mole',
        config: {
            hole: {
                texture: 'mole_hole_tex',
                image: 'hole.png',
                scale: 0.4,
                emoji: '🕳️'
            },
            mole: {
                texture: 'mole_mole_tex',
                image: 'mole.png',
                scale: 0.35,
                emoji: '🐭',
                offsetX: 0,
                offsetY: -15
            },
            hammer: {
                texture: 'mole_hammer_tex',
                image: 'hammer.png',
                scale: 0.4,
                emoji: '🔨',
                offsetX: 20,
                offsetY: -50
            }
        },
        interactions: {
            onWordComplete: { action: 'whack' },
            onTypeError: { action: 'hide' }
        }
    },

    // Lesson 8: Minigame Bắn bong bóng
    8: {
        gameId: 'bubble_shooter',
        config: {
            bubble: {
                texture: 'bubble_shoot_tex',
                image: 'bubble.png',
                scale: 0.8,
                emoji: '🫧'
            },
            area: { minX: 150, maxX: 800, minY: 120, maxY: 320 }
        },
        interactions: {
            onWordComplete: { action: 'pop_bubble' },
            onTypeError: { action: 'shake_bubbles' }
        }
    },

    // Lesson 9: Minigame Ếch nhảy lá sen
    9: {
        gameId: 'frog_jump',
        config: {
            leaf: {
                texture: 'frog_leaf_tex',
                image: 'leaf.png',
                scale: 0.4,
                emoji: '🪷'
            },
            frog: {
                texture: 'frog_frog_tex',
                image: 'frog.png',
                scale: 0.3,
                emoji: '🐸',
                offsetX: 0,
                offsetY: -20
            },
            x1: 100,
            y1: 150,
            x2: 920,
            y2: 300
        },
        interactions: {
            onWordComplete: { action: 'jump_next_leaf' },
            onTypeError: { action: 'fall_and_respawn' }
        }
    },

    // Lesson 10: Minigame Lắp ráp hàng rào gỗ
    10: {
        gameId: 'assemble_object',
        config: {
            finishedObject: {
                texture: 'fence_complete',
                image: 'fence_complete.png',
                emoji: '🚧',
                x: 490,
                y: 220,
                scale: 1
            },
            parts: [
                { id: 'part_post1', texture: 'fence_post1', image: 'fence_post.png', scaleX: 0.7, scaleY: 0.7, angle: 0, emoji: '🪵', offsetX: -100, offsetY: 0, order: 1 },
                { id: 'part_post2', texture: 'fence_post2', image: 'fence_post.png', scaleX: 0.7, scaleY: 0.7, angle: 0, emoji: '🪵', offsetX: -50, offsetY: 0, order: 2 },
                { id: 'part_post3', texture: 'fence_post3', image: 'fence_post.png', scaleX: 0.7, scaleY: 0.7, angle: 0, emoji: '🪵', offsetX: 0, offsetY: 0, order: 3 },
                { id: 'part_post4', texture: 'fence_post4', image: 'fence_post.png', scaleX: 0.7, scaleY: 0.7, angle: 0, emoji: '🪵', offsetX: 50, offsetY: 0, order: 4 },
                { id: 'part_post5', texture: 'fence_post5', image: 'fence_post.png', scaleX: 0.7, scaleY: 0.7, angle: 0, emoji: '🪵', offsetX: 100, offsetY: 0, order: 5 },
                { id: 'part_rail1', texture: 'fence_rail1', image: 'fence_rail.png', scaleX: 0.7, scaleY: 0.7, angle: 0, emoji: '➖', offsetX: -5, offsetY: -20, order: 6 }
            ]
        },
        interactions: {
            onWordComplete: { action: 'assemble_next_part' },
            onTypeError: { action: 'shake_uncompleted' }
        }
    },

    // Lesson 11: Minigame Nuôi trồng cây thần cuối cùng
    11: {
        gameId: 'grow_plant',
        gameId: 'grow_plant',
        config: {
            cloud: {
                texture: 'grow_cloud_tex',
                image: 'cloud.png',
                scale: 0.35
            },
            plant: {
                stages: [
                    { texture: 'grow_tree1', image: 'tree1.png', scale: 0.4 },
                    { texture: 'grow_tree2', image: 'tree2.png', scale: 0.3 },
                    { texture: 'grow_tree3', image: 'tree3.png', scale: 0.6 },
                    { texture: 'grow_tree4', image: 'tree4.png', scale: 0.7 },
                    { texture: 'grow_tree5', image: 'tree5.png', scale: 0.75 }
                ]
            },
            x: 490,
            y: 390
        },
        interactions: {
            onWordComplete: { action: 'water_plant' },
            onTypeError: { action: 'shake_plant' }
        }
    },

    // Lesson 12: Minigame Xua tan sương mù ở sào huyệt
    12: {
        gameId: 'clear_fog',
        config: {
            fogEmoji: '🌫️',
            fogScale: 2,
            x1: 200,
            y1: 140,
            x2: 750,
            y2: 330
        },
        interactions: {
            onWordComplete: { action: 'clear_fog_segment' },
            onTypeError: { action: 'darken_fog' }
        }
    }
};
