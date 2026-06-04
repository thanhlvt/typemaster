// Cấu hình các minigame cho từng bài học
// Mỗi minigame được định nghĩa với gameId và các tham số điều khiển hiển thị/tương tác riêng biệt
export const MINIGAME_CONFIGS = {
    // Lesson 0 - 13 (Group: Khu rừng, Chapter 1: Cây non, Boss: Sói Già)
    // Lesson 0: Minigame Thu thập đồ vật
    0: {
        gameId: 'collect_items',
        config: {
            items: [
                { image: 'banana.png', count: 5, width: 96, height: 96 },
                { image: 'mushroom.png', count: 5, width: 80, height: 80 }
            ],
            container: {
                image: 'basket.png',
                x: 920,
                y: 340,
                width: 180,
                height: 180
            },
            layout: 'scatter_random', // Rải ngẫu nhiên trên màn hình
            area: { minX: 180, maxX: 700, minY: 120, maxY: 340 } // Khu vực rải đồ vật
        },
    },
    // Lesson 1: Minigame Đua xe vượt ải
    1: {
        gameId: 'racing',
        config: {
            playerVehicle: {
                image: 'car1.png',
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
                image: 'car2.png',
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
    },
    // Lesson 2: Minigame Lắp ráp xe tải
    2: {
        gameId: 'assemble_object',
        config: {
            finishedObject: {
                image: 'truck_complete.png',
                x: 490,
                y: 220,
                scale: 0.8
            },
            parts: [
                {
                    id: 'part_body', image: 'truck_body.png', scaleX: 0.7, scaleY: 0.7, angle: 0,
                    offsetX: 0, offsetY: 0, order: 1
                },
                {
                    id: 'part_wheel1', image: 'truck_wheel1.png', scaleX: 0.7, scaleY: 0.7, angle: 0,
                    offsetX: -105, offsetY: 30, order: 2
                },
                {
                    id: 'part_wheel2', image: 'truck_wheel2.png', scaleX: 0.7, scaleY: 0.7, angle: 0,
                    offsetX: 90, offsetY: 30, order: 3
                },
                {
                    id: 'part_cabin', image: 'truck_cabin.png', scaleX: 0.7, scaleY: 0.7, angle: 0,
                    offsetX: -93, offsetY: -63, order: 4
                },
                {
                    id: 'part_cargo', image: 'truck_cargo.png', scaleX: 0.7, scaleY: 0.7, angle: 0,
                    offsetX: 78, offsetY: -85, order: 5
                },
                {
                    id: 'part_siren', image: 'truck_siren.png', scaleX: 1.2, scaleY: 1.2, angle: 0,
                    offsetX: -62, offsetY: -152, order: 6
                }
            ]
        },
    },
    // Lesson 3: Minigame Giải cứu động vật
    3: {
        gameId: 'rescue_animals',
        config: {
            animal: {
                image: 'rabbit.png',
                scale: 0.8,
            },
            cage: {
                image: 'cage.png',
                scale: 1,
            },
            x: 490,
            y: 230
        },
    },
    // Lesson 4: Minigame Nuôi trồng cây thần
    4: {
        gameId: 'grow_plant',
        config: {
            plant: {
                stages: [
                    { image: 'tree1.png', scale: 0.4 },
                    { image: 'tree2.png', scale: 0.3 },
                    { image: 'tree3.png', scale: 0.6 },
                    { image: 'tree4.png', scale: 0.7 },
                    { image: 'tree5.png', scale: 0.75 }
                ]
            },
            x: 490,
            y: 390
        },
    },
    // Lesson 5: Minigame Bắt côn trùng
    5: {
        gameId: 'catch_insects',
        config: {
            insect: {
                image: 'butterfly.png',
                scale: 0.3,
            },
            net: {
                image: 'net.png',
                scale: 0.3,
            },
            jar: {
                image: 'jar.png',
                scale: 0.7,
            },
            jarX: 940,
            jarY: 330,
            area: { minX: 160, maxX: 700, minY: 100, maxY: 290 }
        },
    },
    // Lesson 6: Minigame Xua tan sương mù
    6: {
        gameId: 'clear_fog',
        config: {
            fogScale: 1,
            image: 'fog1.png',
            x1: 250,
            y1: 140,
            x2: 750,
            y2: 270
        },
    },
    // Lesson 7: Minigame Đập chuột chũi
    7: {
        gameId: 'whack_mole',
        config: {
            hole: {
                image: 'hole.png',
                scale: 0.4,
            },
            mole: {
                image: 'mole.png',
                scale: 0.35,
                offsetX: 0,
                offsetY: -15
            },
            hammer: {
                image: 'hammer.png',
                scale: 0.4,
                offsetX: 20,
                offsetY: -50
            }
        },
    },
    // Lesson 8: Minigame Bắn bong bóng
    8: {
        gameId: 'bubble_shooter',
        config: {
            bubble: {
                image: 'bubble.png',
                scale: 0.8,
            },
            area: { minX: 150, maxX: 800, minY: 120, maxY: 320 }
        },
    },
    // Lesson 9: Minigame Ếch nhảy lá sen
    9: {
        gameId: 'frog_jump',
        config: {
            type: 'road',
            leaf: {
                image: 'leaf.png',
                scale: 0.4,
            },
            frog: {
                image: 'frog.png',
                scale: 0.3,
                offsetX: 0,
                offsetY: -20
            },
            x1: 100,
            y1: 150,
            x2: 920,
            y2: 300
        },
    },
    // Lesson 10: Minigame Lắp ráp hàng rào gỗ
    10: {
        gameId: 'assemble_object',
        config: {
            finishedObject: {
                image: 'fence_complete.png',
                x: 490,
                y: 220,
                scale: 1
            },
            parts: [
                { id: 'part_post1', image: 'fence_post.png', scaleX: 0.7, scaleY: 0.7, angle: 0, offsetX: -100, offsetY: 0, order: 1 },
                { id: 'part_post2', image: 'fence_post.png', scaleX: 0.7, scaleY: 0.7, angle: 0, offsetX: -50, offsetY: 0, order: 2 },
                { id: 'part_post3', image: 'fence_post.png', scaleX: 0.7, scaleY: 0.7, angle: 0, offsetX: 0, offsetY: 0, order: 3 },
                { id: 'part_post4', image: 'fence_post.png', scaleX: 0.7, scaleY: 0.7, angle: 0, offsetX: 50, offsetY: 0, order: 4 },
                { id: 'part_post5', image: 'fence_post.png', scaleX: 0.7, scaleY: 0.7, angle: 0, offsetX: 100, offsetY: 0, order: 5 },
                { id: 'part_rail1', image: 'fence_rail.png', scaleX: 0.7, scaleY: 0.7, angle: 0, offsetX: -5, offsetY: -20, order: 6 }
            ]
        },
    },
    // Lesson 11: Minigame Nuôi trồng cây thần cuối cùng
    11: {
        gameId: 'grow_plant',
        config: {
            plant: {
                stages: [
                    { image: 'tree1.png', scale: 0.4 },
                    { image: 'tree2.png', scale: 0.3 },
                    { image: 'tree3.png', scale: 0.6 },
                    { image: 'tree4.png', scale: 0.7 },
                    { image: 'tree5.png', scale: 0.75 }
                ]
            },
            x: 490,
            y: 390
        },
    },
    // Lesson 12: Minigame Xua tan sương mù ở sào huyệt
    12: {
        gameId: 'clear_fog',
        config: {
            fogScale: 1,
            image: 'fog1.png',
            x1: 250,
            y1: 140,
            x2: 750,
            y2: 270
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 14
    14: {
        gameId: 'clear_fog',
        config: {
            fogScale: 0.6,
            image: 'bush.png',
            x1: 250,
            y1: 140,
            x2: 750,
            y2: 270
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 15
    15: {
        gameId: 'rescue_animals',
        config: {
            animal: {
                image: 'rabbit.png',
                scale: 0.8,
            },
            cage: {
                image: 'cage.png',
                scale: 1,
            },
            x: 490,
            y: 230
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 16
    16: {
        gameId: 'bubble_shooter',
        config: {
            bubble: {
                image: 'spiky.png',
                scale: 0.7,
            },
            area: { minX: 150, maxX: 800, minY: 120, maxY: 320 }
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 17
    17: {
        gameId: 'whack_mole',
        config: {
            hole: {
                image: 'hole.png',
                scale: 0.4,
            },
            mole: {
                image: 'mole.png',
                scale: 0.35,
                offsetX: 0,
                offsetY: -15
            },
            hammer: {
                image: 'hammer.png',
                scale: 0.4,
                offsetX: 20,
                offsetY: -50
            }
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 18
    18: {
        gameId: 'racing',
        config: {
            playerVehicle: {
                image: 'car1.png',
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
                image: 'car2.png',
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
    },
    // Tự động đồng bộ từ File 1: Lesson 19
    19: {
        gameId: 'grow_plant',
        config: {
            plant: {
                stages: [
                    { image: 'tree1.png', scale: 0.4 },
                    { image: 'tree2.png', scale: 0.3 },
                    { image: 'tree3.png', scale: 0.6 },
                    { image: 'tree4.png', scale: 0.7 },
                    { image: 'tree5.png', scale: 0.75 }
                ]
            },
            x: 490,
            y: 390
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 20
    20: {
        gameId: 'catch_insects',
        config: {
            insect: {
                image: 'firefly.png',
                scale: 0.3,
            },
            net: {
                image: 'net.png',
                scale: 0.3,
            },
            jar: {
                image: 'jar.png',
                scale: 0.7,
            },
            jarX: 940,
            jarY: 330,
            area: { minX: 180, maxX: 700, minY: 120, maxY: 340 } // Khu vực rải đồ vật
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 21
    21: {
        gameId: 'assemble_object',
        config: {
            finishedObject: {
                image: 'truck_complete.png',
                x: 490,
                y: 220,
                scale: 0.8
            },
            parts: [
                {
                    id: 'part_body', image: 'truck_body.png', scaleX: 0.7, scaleY: 0.7, angle: 0,
                    offsetX: 0, offsetY: 0, order: 1
                },
                {
                    id: 'part_wheel1', image: 'truck_wheel1.png', scaleX: 0.7, scaleY: 0.7, angle: 0,
                    offsetX: -105, offsetY: 30, order: 2
                },
                {
                    id: 'part_wheel2', image: 'truck_wheel2.png', scaleX: 0.7, scaleY: 0.7, angle: 0,
                    offsetX: 90, offsetY: 30, order: 3
                },
                {
                    id: 'part_cabin', image: 'truck_cabin.png', scaleX: 0.7, scaleY: 0.7, angle: 0,
                    offsetX: -93, offsetY: -63, order: 4
                },
                {
                    id: 'part_cargo', image: 'truck_cargo.png', scaleX: 0.7, scaleY: 0.7, angle: 0,
                    offsetX: 78, offsetY: -85, order: 5
                },
                {
                    id: 'part_siren', image: 'truck_siren.png', scaleX: 1.2, scaleY: 1.2, angle: 0,
                    offsetX: -62, offsetY: -152, order: 6
                }
            ]
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 22
    22: {
        gameId: 'frog_jump',
        config: {
            leaf: {
                image: 'leaf.png',
                scale: 0.4,
            },
            frog: {
                image: 'frog.png',
                scale: 0.3,
                offsetX: 0,
                offsetY: -20
            },
            x1: 100,
            y1: 150,
            x2: 920,
            y2: 300
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 23
    23: {
        gameId: 'collect_items',
        config: {
            items: [
                { image: 'strawberry.png', count: 10, width: 96, height: 96 }
            ],
            container: {
                image: 'basket.png',
                x: 920,
                y: 340,
                width: 180,
                height: 180
            },
            layout: 'scatter_random', // Rải ngẫu nhiên trên màn hình
            area: { minX: 180, maxX: 700, minY: 120, maxY: 340 } // Khu vực rải đồ vật
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 24
    24: {
        gameId: 'rescue_animals',
        config: {
            animal: {
                image: 'bird.png',
                scale: 0.8,
            },
            cage: {
                image: 'cage.png',
                scale: 1,
            },
            x: 490,
            y: 230
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 25
    25: {
        gameId: 'clear_fog',
        config: {
            fogScale: 1,
            image: 'fog2.png',
            x1: 250,
            y1: 140,
            x2: 750,
            y2: 270
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 26
    26: {
        gameId: 'assemble_object',
        config: {
            finishedObject: {
                image: 'shield_complete.png',
                x: 490,
                y: 220,
                scale: 0.65
            },
            parts: [
                {
                    id: 'shield_part1', image: 'shield_part1.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 1
                },
                {
                    id: 'shield_part2', image: 'shield_part2.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 2
                },
                {
                    id: 'shield_part3', image: 'shield_part3.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 3
                },
                {
                    id: 'shield_part4', image: 'shield_part4.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 4
                },
                {
                    id: 'shield_part5', image: 'shield_part5.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 5
                },
                {
                    id: 'shield_part6', image: 'shield_part6.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 6
                }
            ]
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 28
    28: {
        gameId: 'grow_plant',
        config: {
            plant: {
                stages: [
                    { image: 'tree1.png', scale: 0.4 },
                    { image: 'tree2.png', scale: 0.3 },
                    { image: 'tree3.png', scale: 0.6 },
                    { image: 'tree4.png', scale: 0.7 },
                    { image: 'tree5.png', scale: 0.75 }
                ]
            },
            x: 490,
            y: 390
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 29
    29: {
        gameId: 'collect_items',
        config: {
            items: [
                { image: 'banana.png', count: 3, width: 96, height: 96 },
                { image: 'mushroom.png', count: 3, width: 80, height: 80 },
                { image: 'strawberry.png', count: 3, width: 80, height: 80 }
            ],
            container: {
                image: 'basket.png',
                x: 920,
                y: 340,
                width: 180,
                height: 180
            },
            layout: 'scatter_random', // Rải ngẫu nhiên trên màn hình
            area: { minX: 180, maxX: 700, minY: 120, maxY: 340 } // Khu vực rải đồ vật
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 30
    30: {
        gameId: 'bubble_shooter',
        config: {
            bubble: {
                image: 'bubble.png',
                scale: 0.8,
            },
            area: { minX: 150, maxX: 800, minY: 120, maxY: 320 }
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 31
    31: {
        gameId: 'rescue_animals',
        config: {
            animal: {
                image: 'bird.png',
                scale: 0.8,
            },
            cage: {
                image: 'cage.png',
                scale: 1,
            },
            x: 490,
            y: 230
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 32
    32: {
        gameId: 'racing',
        config: {
            vehicleOver: false,
            playerVehicle: {
                image: 'leaf.png',
                scale: 0.45,         // Tỷ lệ kích thước của chiếc xe
                flipX: true,         // Lật ngang xe (true: quay sang phải, false: mặc định sang trái)
                driverFlipX: false,  // Lật ngang người lái (true/false)
                driverScale: 0.2,   // Tỷ lệ kích thước người lái (khỉ)
                driverOffsetX: 0,   // Khoảng lệch ngang của khỉ so với tâm xe
                driverOffsetY: -37,   // Khoảng lệch dọc của khỉ so với tâm xe
                vehicleOffsetX: 20,
                vehicleOffsetY: 0
            },
            enemyVehicle: {
                image: 'leaf.png',
                scale: 0.45,         // Tỷ lệ kích thước của xe boss
                flipX: true,         // Lật ngang xe boss
                driverFlipX: true,  // Lật ngang boss
                driverScale: 0.2,   // Tỷ lệ kích thước của boss
                driverOffsetX: 0,   // Khoảng lệch ngang của boss so với tâm xe
                driverOffsetY: -40,   // Khoảng lệch dọc của boss so với tâm xe
                vehicleOffsetX: 20,
                vehicleOffsetY: 0
            },
            track: {
                // Các loại đường đua hỗ trợ (track.type):
                // - 'road' : Đường bộ (mặc định nhựa xám, vạch đứt khúc màu trắng)
                // - 'water': Đường nước (nước xanh dương, viền bọt sóng xanh nhạt, sóng gợn nhẹ)
                // - 'air'  : Đường trên không (màu tím vũ trụ, viền neon hồng phát sáng, chấm tròn lấp lánh)
                type: 'water',
                startX: 150,
                endX: 820,
                playerY: 220,
                enemyY: 350,
                height: 70
            }
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 33
    33: {
        gameId: 'assemble_object',
        config: {
            finishedObject: {
                image: 'bridge_complete.png',
                x: 490,
                y: 220,
                scale: 1
            },
            parts: [
                { id: 'bridge_part1', image: 'bridge_part1.png', scaleX: 0.7, scaleY: 0.7, angle: 0, offsetX: 0, offsetY: 0, order: 1, partOffsetY: 110 },
                { id: 'bridge_part2', image: 'bridge_part2.png', scaleX: 0.7, scaleY: 0.7, angle: 0, offsetX: 0, offsetY: 0, order: 2, partOffsetY: 150 },
                { id: 'bridge_part3', image: 'bridge_part3.png', scaleX: 0.7, scaleY: 0.7, angle: 0, offsetX: 0, offsetY: 0, order: 3, partOffsetY: 140 },
                { id: 'bridge_part4', image: 'bridge_part4.png', scaleX: 0.7, scaleY: 0.7, angle: 0, offsetX: 0, offsetY: 0, order: 4, partOffsetY: 90 },
                { id: 'bridge_part5', image: 'bridge_part5.png', scaleX: 0.7, scaleY: 0.7, angle: 0, offsetX: 0, offsetY: 0, order: 5, partOffsetY: 110 },
                { id: 'bridge_part6', image: 'bridge_part6.png', scaleX: 0.7, scaleY: 0.7, angle: 0, offsetX: 0, offsetY: 0, order: 6, partOffsetY: 150 }
            ]
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 34
    34: {
        gameId: 'whack_mole',
        config: {
            hole: {
                image: 'hole.png',
                scale: 0.4,
            },
            mole: {
                image: 'mole.png',
                scale: 0.35,
                offsetX: 0,
                offsetY: -15
            },
            hammer: {
                image: 'hammer.png',
                scale: 0.4,
                offsetX: 20,
                offsetY: -50
            }
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 35
    35: {
        gameId: 'frog_jump',
        config: {
            type: 'air',
            leaf: {
                image: 'leaf2.png',
                scale: 0.6,
            },
            monkey: {
                scale: 0.3,
                offsetX: -5,
                offsetY: -58
            },
            x1: 100,
            y1: 120,
            x2: 920,
            y2: 340
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 36
    36: {
        gameId: 'catch_insects',
        config: {
            insect: {
                image: 'bee.png',
                scale: 0.3,
            },
            net: {
                image: 'net.png',
                scale: 0.3,
            },
            jar: {
                image: 'jar.png',
                scale: 0.7,
            },
            jarX: 940,
            jarY: 330,
            area: { minX: 160, maxX: 700, minY: 130, maxY: 300 }
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 37
    37: {
        gameId: 'grow_plant',
        config: {
            plant: {
                stages: [
                    { image: 'tree1.png', scale: 0.4 },
                    { image: 'tree2.png', scale: 0.3 },
                    { image: 'tree3.png', scale: 0.6 },
                    { image: 'tree4.png', scale: 0.7 },
                    { image: 'tree5.png', scale: 0.75 }
                ]
            },
            x: 490,
            y: 390
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 38
    38: {
        gameId: 'collect_items',
        config: {
            items: [
                { image: 'mushroom.png', count: 7, width: 80, height: 80 }
            ],
            container: {
                image: 'basket.png',
                x: 920,
                y: 340,
                width: 180,
                height: 180
            },
            layout: 'scatter_random', // Rải ngẫu nhiên trên màn hình
            area: { minX: 180, maxX: 700, minY: 120, maxY: 340 } // Khu vực rải đồ vật
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 39
    39: {
        gameId: 'clear_fog',
        config: {
            fogScale: 1,
            image: 'fog2.png',
            x1: 250,
            y1: 140,
            x2: 750,
            y2: 270
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 40
    40: {
        gameId: 'assemble_object',
        config: {
            finishedObject: {
                image: 'shield_complete.png',
                x: 490,
                y: 220,
                scale: 0.65
            },
            parts: [
                {
                    id: 'shield_part1', image: 'shield_part1.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 1
                },
                {
                    id: 'shield_part2', image: 'shield_part2.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 2
                },
                {
                    id: 'shield_part3', image: 'shield_part3.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 3
                },
                {
                    id: 'shield_part4', image: 'shield_part4.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 4
                },
                {
                    id: 'shield_part5', image: 'shield_part5.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 5
                },
                {
                    id: 'shield_part6', image: 'shield_part6.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 6
                }
            ]
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 42
    42: {
        gameId: 'clear_fog',
        config: {
            fogScale: 1,
            image: 'fog2.png',
            x1: 250,
            y1: 140,
            x2: 750,
            y2: 270
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 43
    43: {
        gameId: 'rescue_animals',
        config: {
            animal: {
                image: 'owl.png',
                scale: 1,
            },
            cage: {
                image: 'bush.png',
                scale: 0.8,
            },
            x: 490,
            y: 230
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 44
    44: {
        gameId: 'whack_mole',
        config: {
            hole: {
                image: 'hole.png',
                scale: 0.4,
            },
            mole: {
                image: 'mole.png',
                scale: 0.35,
                offsetX: 0,
                offsetY: -15
            },
            hammer: {
                image: 'hammer.png',
                scale: 0.4,
                offsetX: 20,
                offsetY: -50
            }
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 45
    45: {
        gameId: 'grow_plant',
        config: {
            plant: {
                stages: [
                    { image: 'tree1.png', scale: 0.4 },
                    { image: 'tree2.png', scale: 0.3 },
                    { image: 'tree3.png', scale: 0.6 },
                    { image: 'tree4.png', scale: 0.7 },
                    { image: 'tree5.png', scale: 0.75 }
                ]
            },
            x: 490,
            y: 390
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 46
    46: {
        gameId: 'collect_items',
        config: {
            items: [
                { image: 'goldenball.png', count: 5, width: 96, height: 96 }
            ],
            container: {
                image: 'basket.png',
                x: 920,
                y: 340,
                width: 180,
                height: 180
            },
            layout: 'scatter_random', // Rải ngẫu nhiên trên màn hình
            area: { minX: 180, maxX: 700, minY: 120, maxY: 340 } // Khu vực rải đồ vật
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 47
    47: {
        gameId: 'racing',
        config: {
            vehicleOver: true,
            playerVehicle: {
                image: 'car1.png',
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
                image: 'car2.png',
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
    },
    // Tự động đồng bộ từ File 1: Lesson 48
    48: {
        gameId: 'bubble_shooter',
        config: {
            bubble: {
                image: 'rock.png',
                scale: 0.6,
            },
            area: { minX: 150, maxX: 800, minY: 120, maxY: 320 }
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 49
    49: {
        gameId: 'catch_insects',
        config: {
            insect: {
                image: 'firefly.png',
                scale: 0.3,
            },
            net: {
                image: 'net.png',
                scale: 0.3,
            },
            jar: {
                image: 'jar.png',
                scale: 0.7,
            },
            jarX: 940,
            jarY: 330,
            area: { minX: 180, maxX: 700, minY: 120, maxY: 340 } // Khu vực rải đồ vật
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 50
    50: {
        gameId: 'frog_jump',
        config: {
            type: 'air',
            leaf: {
                image: 'leaf2.png',
                scale: 0.5,
            },
            monkey: {
                scale: 0.3,
                offsetX: -5,
                offsetY: -58
            },
            x1: 100,
            y1: 150,
            x2: 920,
            y2: 300
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 51
    51: {
        gameId: 'assemble_object',
        config: {
            finishedObject: {
                image: 'ladder_complete.png',
                x: 490,
                y: 220,
                scale: 1
            },
            parts: [
                {
                    id: 'ladder_path1', image: 'ladder_path1.png', scaleX: 0.7, scaleY: 0.7, angle: 0,
                    offsetX: 0, offsetY: 0, order: 1, partOffsetY: 110
                },
                {
                    id: 'ladder_path2', image: 'ladder_path2.png', scaleX: 0.7, scaleY: 0.7, angle: 0,
                    offsetX: 0, offsetY: 0, order: 2, partOffsetY: 105
                },
                {
                    id: 'ladder_path3', image: 'ladder_path3.png', scaleX: 0.7, scaleY: 0.7, angle: 0,
                    offsetX: 0, offsetY: 0, order: 3, partOffsetY: 190
                },
                {
                    id: 'ladder_path4', image: 'ladder_path4.png', scaleX: 0.7, scaleY: 0.7, angle: 0,
                    offsetX: 0, offsetY: 0, order: 4, partOffsetY: 160
                },
                {
                    id: 'ladder_path5', image: 'ladder_path5.png', scaleX: 0.7, scaleY: 0.7, angle: 0,
                    offsetX: 0, offsetY: 0, order: 5, partOffsetY: 140
                },
                {
                    id: 'ladder_path6', image: 'ladder_path6.png', scaleX: 0.7, scaleY: 0.7, angle: 0,
                    offsetX: 0, offsetY: -0, order: 6, partOffsetY: 110
                }
            ]
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 52
    52: {
        gameId: 'bubble_shooter',
        config: {
            bubble: {
                image: 'bubble.png',
                scale: 0.8,
            },
            area: { minX: 150, maxX: 800, minY: 120, maxY: 320 }
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 53
    53: {
        gameId: 'grow_plant',
        config: {
            plant: {
                stages: [
                    { image: 'flower_tree1.png', scale: 0.7 },
                    { image: 'flower_tree2.png', scale: 0.7 },
                    { image: 'flower_tree3.png', scale: 0.7 },
                    { image: 'flower_tree4.png', scale: 0.7 },
                    { image: 'flower_tree5.png', scale: 0.7 }
                ]
            },
            x: 490,
            y: 400
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 54
    54: {
        gameId: 'assemble_object',
        config: {
            finishedObject: {
                image: 'armor_complete.png',
                x: 490,
                y: 220,
                scale: 0.8
            },
            parts: [
                {
                    id: 'armor_part1', image: 'armor_part1.png', scaleX: 0.7, scaleY: 0.7, angle: 0,
                    offsetX: 0, offsetY: 0, order: 1, partOffsetY: 120
                },
                {
                    id: 'armor_part2', image: 'armor_part2.png', scaleX: 0.7, scaleY: 0.7, angle: 0,
                    offsetX: 0, offsetY: 0, order: 2, partOffsetY: 200
                },
                {
                    id: 'armor_part3', image: 'armor_part3.png', scaleX: 0.7, scaleY: 0.7, angle: 0,
                    offsetX: 0, offsetY: 0, order: 3, partOffsetY: 110
                },
                {
                    id: 'armor_part4', image: 'armor_part4.png', scaleX: 0.7, scaleY: 0.7, angle: 0,
                    offsetX: 0, offsetY: 0, order: 4, partOffsetY: 110
                },
                {
                    id: 'armor_part5', image: 'armor_part5.png', scaleX: 0.7, scaleY: 0.7, angle: 0,
                    offsetX: 0, offsetY: 0, order: 5, partOffsetY: 55
                },
                {
                    id: 'armor_part6', image: 'armor_part6.png', scaleX: 0.7, scaleY: 0.7, angle: 0,
                    offsetX: 0, offsetY: 0, order: 6, partOffsetY: 55
                }
            ]
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 56
    56: {
        gameId: 'clear_fog',
        config: {
            fogScale: 1,
            image: 'fog1.png',
            x1: 250,
            y1: 140,
            x2: 750,
            y2: 270
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 57
    57: {
        gameId: 'rescue_animals',
        config: {
            animal: {
                image: 'hedgehodge.png',
                scale: 1,
            },
            cage: {
                image: 'bush.png',
                scale: 0.7,
            },
            x: 490,
            y: 230
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 58
    58: {
        gameId: 'bubble_shooter',
        config: {
            bubble: {
                image: 'bubble.png',
                scale: 0.8,
            },
            area: { minX: 150, maxX: 800, minY: 120, maxY: 320 }
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 59
    59: {
        gameId: 'whack_mole',
        config: {
            hole: {
                image: 'hole.png',
                scale: 0.4,
            },
            mole: {
                image: 'mole.png',
                scale: 0.35,
                offsetX: 0,
                offsetY: -15
            },
            hammer: {
                image: 'hammer.png',
                scale: 0.4,
                offsetX: 20,
                offsetY: -50
            }
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 60
    60: {
        gameId: 'racing',
        config: {
            vehicleOver: false,
            playerVehicle: {
                image: 'ladybug.png',
                type: 'car',
                scale: 0.4,         // Tỷ lệ kích thước của chiếc xe
                flipX: false,         // Lật ngang xe (true: quay sang phải, false: mặc định sang trái)
                driverFlipX: false,  // Lật ngang người lái (true/false)
                driverScale: 0.22,   // Tỷ lệ kích thước người lái (khỉ)
                driverOffsetX: -20,   // Khoảng lệch ngang của khỉ so với tâm xe
                driverOffsetY: -45,   // Khoảng lệch dọc của khỉ so với tâm xe
                vehicleOffsetX: 20,
                vehicleOffsetY: -5
            },
            enemyVehicle: {
                image: 'ladybug.png',
                type: 'car',
                scale: 0.4,         // Tỷ lệ kích thước của xe boss
                flipX: false,         // Lật ngang xe boss
                driverFlipX: true,  // Lật ngang boss
                driverScale: 0.22,   // Tỷ lệ kích thước của boss
                driverOffsetX: -20,   // Khoảng lệch ngang của boss so với tâm xe
                driverOffsetY: -55,   // Khoảng lệch dọc của boss so với tâm xe
                vehicleOffsetX: 20,
                vehicleOffsetY: -5
            },
            track: {
                // Các loại đường đua hỗ trợ (track.type):
                // - 'road' : Đường bộ (mặc định nhựa xám, vạch đứt khúc màu trắng)
                // - 'water': Đường nước (nước xanh dương, viền bọt sóng xanh nhạt, sóng gợn nhẹ)
                // - 'air'  : Đường trên không (màu tím vũ trụ, viền neon hồng phát sáng, chấm tròn lấp lánh)
                type: 'air',
                startX: 150,
                endX: 820,
                playerY: 180,
                enemyY: 350,
                height: 100
            }
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 61
    61: {
        gameId: 'grow_plant',
        config: {
            plant: {
                stages: [
                    { image: 'crystal_mushroom_1.png', scale: 0.9 },
                    { image: 'crystal_mushroom_2.png', scale: 0.9 },
                    { image: 'crystal_mushroom_3.png', scale: 0.9 },
                    { image: 'crystal_mushroom_4.png', scale: 0.9 },
                    { image: 'crystal_mushroom_5.png', scale: 0.9 }
                ]
            },
            x: 490,
            y: 390
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 62
    62: {
        gameId: 'catch_insects',
        config: {
            insect: {
                image: 'mosquito.png',
                scale: 0.4,
            },
            net: {
                image: 'net.png',
                scale: 0.4,
            },
            jar: {
                image: 'jar.png',
                scale: 0.7,
            },
            jarX: 940,
            jarY: 330,
            area: { minX: 180, maxX: 700, minY: 120, maxY: 340 } // Khu vực rải đồ vật
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 63
    63: {
        gameId: 'assemble_object',
        config: {
            finishedObject: {
                image: 'umbrella_completed.png',
                x: 490,
                y: 220,
                scale: 1
            },
            parts: [
                {
                    id: 'umbrella_part1', image: 'umbrella_part1.png', scaleX: 0.8, scaleY: 0.8, angle: 0,
                    offsetX: 0, offsetY: 0, order: 1, partOffsetY: 110
                },
                {
                    id: 'umbrella_part2', image: 'umbrella_part2.png', scaleX: 0.8, scaleY: 0.8, angle: 0,
                    offsetX: 0, offsetY: 0, order: 2, partOffsetY: 150
                },
                {
                    id: 'umbrella_part3', image: 'umbrella_part3.png', scaleX: 0.8, scaleY: 0.8, angle: 0,
                    offsetX: 0, offsetY: 0, order: 3, partOffsetY: 125
                },
                {
                    id: 'umbrella_part4', image: 'umbrella_part4.png', scaleX: 0.8, scaleY: 0.8, angle: 0,
                    offsetX: 0, offsetY: 0, order: 4, partOffsetY: 110
                }
            ]
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 64
    64: {
        gameId: 'frog_jump',
        config: {
            type: 'air',
            leaf: {
                image: 'leaf3_mushroom.png',
                scale: 0.7,
            },
            monkey: {
                scale: 0.3,
                offsetX: -5,
                offsetY: -85
            },
            x1: 100,
            y1: 170,
            x2: 920,
            y2: 320
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 65
    65: {
        gameId: 'collect_items',
        config: {
            items: [
                { image: 'mushroom.png', count: 7, width: 80, height: 80 }
            ],
            container: {
                image: 'basket.png',
                x: 920,
                y: 340,
                width: 180,
                height: 180
            },
            layout: 'scatter_random', // Rải ngẫu nhiên trên màn hình
            area: { minX: 180, maxX: 700, minY: 120, maxY: 340 } // Khu vực rải đồ vật
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 66
    66: {
        gameId: 'clear_fog',
        config: {
            fogScale: 1,
            image: 'fog3.png',
            x1: 250,
            y1: 140,
            x2: 750,
            y2: 270
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 67
    67: {
        gameId: 'bubble_shooter',
        config: {
            bubble: {
                image: 'mushroom.png',
                scale: 0.4,
            },
            area: { minX: 150, maxX: 800, minY: 120, maxY: 320 }
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 68
    68: {
        gameId: 'assemble_object',
        config: {
            finishedObject: {
                image: 'shield_complete.png',
                x: 490,
                y: 220,
                scale: 0.65
            },
            parts: [
                {
                    id: 'shield_part1', image: 'shield_part1.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 1
                },
                {
                    id: 'shield_part2', image: 'shield_part2.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 2
                },
                {
                    id: 'shield_part3', image: 'shield_part3.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 3
                },
                {
                    id: 'shield_part4', image: 'shield_part4.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 4
                },
                {
                    id: 'shield_part5', image: 'shield_part5.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 5
                },
                {
                    id: 'shield_part6', image: 'shield_part6.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 6
                }
            ]
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 70
    70: {
        gameId: 'grow_plant',
        config: {
            plant: {
                stages: [
                    { image: 'flower_tree1.png', scale: 0.7 },
                    { image: 'flower_tree2.png', scale: 0.7 },
                    { image: 'flower_tree3.png', scale: 0.7 },
                    { image: 'flower_tree4.png', scale: 0.7 },
                    { image: 'flower_tree5.png', scale: 0.7 }
                ]
            },
            x: 490,
            y: 400
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 71
    71: {
        gameId: 'rescue_animals',
        config: {
            animal: {
                image: 'butterfly.png',
                scale: 0.7,
            },
            cage: {
                image: 'spider_web.png',
                scale: 0.7,
            },
            x: 490,
            y: 240
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 72
    72: {
        gameId: 'catch_insects',
        config: {
            insect: {
                image: 'flies.png',
                scale: 0.3,
            },
            net: {
                image: 'net.png',
                scale: 0.3,
            },
            jar: {
                image: 'jar.png',
                scale: 0.7,
            },
            jarX: 940,
            jarY: 330,
            area: { minX: 180, maxX: 700, minY: 120, maxY: 340 } // Khu vực rải đồ vật
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 73
    73: {
        gameId: 'bubble_shooter',
        config: {
            bubble: {
                image: 'bubble.png',
                scale: 0.8,
            },
            area: { minX: 150, maxX: 800, minY: 120, maxY: 320 }
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 74
    74: {
        gameId: 'whack_mole',
        config: {
            hole: {
                image: 'hole.png',
                scale: 0.4,
            },
            mole: {
                image: 'mole.png',
                scale: 0.35,
                offsetX: 0,
                offsetY: -15
            },
            hammer: {
                image: 'hammer.png',
                scale: 0.4,
                offsetX: 20,
                offsetY: -50
            }
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 75
    75: {
        gameId: 'racing',
        config: {
            vehicleOver: false,
            playerVehicle: {
                image: 'grasshopper.png',
                type: 'car',
                scale: 0.4,         // Tỷ lệ kích thước của chiếc xe
                flipX: false,         // Lật ngang xe (true: quay sang phải, false: mặc định sang trái)
                driverFlipX: false,  // Lật ngang người lái (true/false)
                driverScale: 0.22,   // Tỷ lệ kích thước người lái (khỉ)
                driverOffsetX: -10,   // Khoảng lệch ngang của khỉ so với tâm xe
                driverOffsetY: -35,   // Khoảng lệch dọc của khỉ so với tâm xe
                vehicleOffsetX: 20,
                vehicleOffsetY: -5
            },
            enemyVehicle: {
                image: 'grasshopper.png',
                type: 'car',
                scale: 0.4,         // Tỷ lệ kích thước của xe boss
                flipX: false,         // Lật ngang xe boss
                driverFlipX: true,  // Lật ngang boss
                driverScale: 0.22,   // Tỷ lệ kích thước của boss
                driverOffsetX: -10,   // Khoảng lệch ngang của boss so với tâm xe
                driverOffsetY: -40,   // Khoảng lệch dọc của boss so với tâm xe
                vehicleOffsetX: 20,
                vehicleOffsetY: -5
            },
            track: {
                // Các loại đường đua hỗ trợ (track.type):
                // - 'road' : Đường bộ (mặc định nhựa xám, vạch đứt khúc màu trắng)
                // - 'water': Đường nước (nước xanh dương, viền bọt sóng xanh nhạt, sóng gợn nhẹ)
                // - 'air'  : Đường trên không (màu tím vũ trụ, viền neon hồng phát sáng, chấm tròn lấp lánh)
                type: 'air',
                startX: 150,
                endX: 820,
                playerY: 180,
                enemyY: 350,
                height: 100
            }
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 76
    76: {
        gameId: 'frog_jump',
        config: {
            leaf: {
                image: 'leaf.png',
                scale: 0.5,
            },
            monkey: {
                scale: 0.3,
                offsetX: -5,
                offsetY: -60
            },
            x1: 100,
            y1: 150,
            x2: 920,
            y2: 300
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 77
    77: {
        gameId: 'collect_items',
        config: {
            items: [
                { image: 'honey.png', count: 6, width: 64, height: 64 }
            ],
            container: {
                image: 'jar2.png',
                x: 920,
                y: 340,
                width: 180,
                height: 180
            },
            layout: 'scatter_random', // Rải ngẫu nhiên trên màn hình
            area: { minX: 180, maxX: 700, minY: 120, maxY: 340 } // Khu vực rải đồ vật
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 78
    78: {
        gameId: 'clear_fog',
        config: {
            fogScale: 1,
            image: 'fog3.png',
            x1: 250,
            y1: 140,
            x2: 750,
            y2: 270
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 79
    79: {
        gameId: 'assemble_object',
        config: {
            finishedObject: {
                image: 'barrel_complete.png',
                x: 490,
                y: 180,
                scale: 0.35
            },
            parts: [
                {
                    id: 'barrel_part1', image: 'barrel_part1.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 1, partOffsetY: 140
                },
                {
                    id: 'barrel_part2', image: 'barrel_part2.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 2, partOffsetY: 180
                },
                {
                    id: 'barrel_part3', image: 'barrel_part3.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 3, partOffsetY: 210
                },
                {
                    id: 'barrel_part4', image: 'barrel_part4.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 4, partOffsetY: 230
                }
            ]
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 80
    80: {
        gameId: 'bubble_shooter',
        config: {
            bubble: {
                image: 'urchin.png',
                scale: 0.8,
            },
            area: { minX: 150, maxX: 800, minY: 120, maxY: 320 }
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 81
    81: {
        gameId: 'grow_plant',
        config: {
            plant: {
                stages: [
                    { image: 'tree1.png', scale: 0.4 },
                    { image: 'tree2.png', scale: 0.3 },
                    { image: 'tree3.png', scale: 0.6 },
                    { image: 'tree4.png', scale: 0.7 },
                    { image: 'tree5.png', scale: 0.75 }
                ]
            },
            x: 490,
            y: 390
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 82
    82: {
        gameId: 'assemble_object',
        config: {
            finishedObject: {
                image: 'shield_complete.png',
                x: 490,
                y: 220,
                scale: 0.65
            },
            parts: [
                {
                    id: 'shield_part1', image: 'shield_part1.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 1, partOffsetY: 140
                },
                {
                    id: 'shield_part2', image: 'shield_part2.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 2, partOffsetY: 160
                },
                {
                    id: 'shield_part3', image: 'shield_part3.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 3, partOffsetY: 145
                },
                {
                    id: 'shield_part4', image: 'shield_part4.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 4, partOffsetY: 115
                },
                {
                    id: 'shield_part5', image: 'shield_part5.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 5, partOffsetY: 105
                },
                {
                    id: 'shield_part6', image: 'shield_part6.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 6, partOffsetY: 115
                }
            ]
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 84
    84: {
        gameId: 'clear_fog',
        config: {
            fogScale: 1,
            image: 'fog2.png',
            x1: 250,
            y1: 140,
            x2: 750,
            y2: 270
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 85
    85: {
        gameId: 'rescue_animals',
        config: {
            animal: {
                image: 'butterfly.png',
                scale: 0.8,
            },
            cage: {
                image: 'cage2.png',
                scale: 1.5,
            },
            x: 490,
            y: 230
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 86
    86: {
        gameId: 'bubble_shooter',
        config: {
            bubble: {
                image: 'bubble2.png',
                scale: 0.8,
            },
            area: { minX: 150, maxX: 800, minY: 120, maxY: 320 }
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 87
    87: {
        gameId: 'whack_mole',
        config: {
            hole: {
                image: 'hole.png',
                scale: 0.4,
            },
            mole: {
                image: 'mole.png',
                scale: 0.35,
                offsetX: 0,
                offsetY: -15
            },
            hammer: {
                image: 'hammer.png',
                scale: 0.4,
                offsetX: 20,
                offsetY: -50
            }
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 88
    88: {
        gameId: 'racing',
        config: {
            vehicleOver: false,
            playerVehicle: {
                image: 'grasshopper.png',
                type: 'car',
                scale: 0.4,         // Tỷ lệ kích thước của chiếc xe
                flipX: false,         // Lật ngang xe (true: quay sang phải, false: mặc định sang trái)
                driverFlipX: false,  // Lật ngang người lái (true/false)
                driverScale: 0.22,   // Tỷ lệ kích thước người lái (khỉ)
                driverOffsetX: -10,   // Khoảng lệch ngang của khỉ so với tâm xe
                driverOffsetY: -35,   // Khoảng lệch dọc của khỉ so với tâm xe
                vehicleOffsetX: 20,
                vehicleOffsetY: -5
            },
            enemyVehicle: {
                image: 'grasshopper.png',
                type: 'car',
                scale: 0.4,         // Tỷ lệ kích thước của xe boss
                flipX: false,         // Lật ngang xe boss
                driverFlipX: true,  // Lật ngang boss
                driverScale: 0.22,   // Tỷ lệ kích thước của boss
                driverOffsetX: -10,   // Khoảng lệch ngang của boss so với tâm xe
                driverOffsetY: -40,   // Khoảng lệch dọc của boss so với tâm xe
                vehicleOffsetX: 20,
                vehicleOffsetY: -5
            },
            track: {
                // Các loại đường đua hỗ trợ (track.type):
                // - 'road' : Đường bộ (mặc định nhựa xám, vạch đứt khúc màu trắng)
                // - 'water': Đường nước (nước xanh dương, viền bọt sóng xanh nhạt, sóng gợn nhẹ)
                // - 'air'  : Đường trên không (màu tím vũ trụ, viền neon hồng phát sáng, chấm tròn lấp lánh)
                type: 'air',
                startX: 150,
                endX: 820,
                playerY: 180,
                enemyY: 350,
                height: 100
            }
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 89
    89: {
        gameId: 'catch_insects',
        config: {
            insect: {
                image: 'butterfly.png',
                scale: 0.3,
            },
            net: {
                image: 'net.png',
                scale: 0.3,
            },
            jar: {
                image: 'jar.png',
                scale: 0.7,
            },
            jarX: 940,
            jarY: 330,
            area: { minX: 180, maxX: 700, minY: 120, maxY: 340 } // Khu vực rải đồ vật
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 90
    90: {
        gameId: 'grow_plant',
        config: {
            plant: {
                stages: [
                    { image: 'tree1.png', scale: 0.4 },
                    { image: 'tree2.png', scale: 0.3 },
                    { image: 'tree3.png', scale: 0.6 },
                    { image: 'tree4.png', scale: 0.7 },
                    { image: 'tree5.png', scale: 0.75 }
                ]
            },
            x: 490,
            y: 390
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 91
    91: {
        gameId: 'frog_jump',
        config: {
            type: 'air',
            leaf: {
                image: 'flower3.png',
                scale: 0.6,
            },
            monkey: {
                scale: 0.3,
                offsetX: -5,
                offsetY: -60
            },
            x1: 100,
            y1: 150,
            x2: 920,
            y2: 300
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 92
    92: {
        gameId: 'collect_items',
        config: {
            items: [
                { image: 'flower.png', count: 5, width: 96, height: 96 },
                { image: 'flower2.png', count: 5, width: 96, height: 96 }
            ],
            container: {
                image: 'basket.png',
                x: 920,
                y: 340,
                width: 180,
                height: 180
            },
            layout: 'scatter_random', // Rải ngẫu nhiên trên màn hình
            area: { minX: 180, maxX: 700, minY: 120, maxY: 340 } // Khu vực rải đồ vật
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 93
    93: {
        gameId: 'clear_fog',
        config: {
            fogScale: 1,
            image: 'fog2.png',
            x1: 250,
            y1: 140,
            x2: 750,
            y2: 270
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 94
    94: {
        gameId: 'bubble_shooter',
        config: {
            bubble: {
                image: 'urchin.png',
                scale: 0.6,
            },
            area: { minX: 150, maxX: 800, minY: 120, maxY: 320 }
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 95
    95: {
        gameId: 'rescue_animals',
        config: {
            animal: {
                image: 'butterfly.png',
                scale: 0.8,
            },
            cage: {
                image: 'cage2.png',
                scale: 1.5,
            },
            x: 490,
            y: 230
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 96
    96: {
        gameId: 'assemble_object',
        config: {
            finishedObject: {
                image: 'scepter_complete.png',
                x: 490,
                y: 220,
                scale: 1
            },
            parts: [
                {
                    id: 'scepter_part1', image: 'scepter_part1.png', scaleX: 0.9, scaleY: 0.9, angle: 0,
                    offsetX: 0, offsetY: 0, order: 1, partOffsetY: 100
                },
                {
                    id: 'scepter_part2', image: 'scepter_part2.png', scaleX: 0.9, scaleY: 0.9, angle: 0,
                    offsetX: 0, offsetY: 0, order: 2, partOffsetY: 120
                },
                {
                    id: 'scepter_part3', image: 'scepter_part3.png', scaleX: 0.9, scaleY: 0.9, angle: 0,
                    offsetX: 0, offsetY: 0, order: 3, partOffsetY: 140
                },
                {
                    id: 'scepter_part4', image: 'scepter_part4.png', scaleX: 0.9, scaleY: 0.9, angle: 0,
                    offsetX: 0, offsetY: 0, order: 4, partOffsetY: 160
                },
                {
                    id: 'scepter_part5', image: 'scepter_part5.png', scaleX: 0.9, scaleY: 0.9, angle: 0,
                    offsetX: 0, offsetY: 0, order: 5, partOffsetY: 180
                },
                {
                    id: 'scepter_part6', image: 'scepter_part6.png', scaleX: 0.9, scaleY: 0.9, angle: 0,
                    offsetX: 0, offsetY: 0, order: 6, partOffsetY: 190
                }
            ]
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 98
    98: {
        gameId: 'collect_items',
        config: {
            items: [
                { image: 'waterdrop.png', count: 10, width: 96, height: 96 }
            ],
            container: {
                image: 'basket.png',
                x: 920,
                y: 340,
                width: 180,
                height: 180
            },
            layout: 'scatter_random', // Rải ngẫu nhiên trên màn hình
            area: { minX: 180, maxX: 700, minY: 120, maxY: 340 } // Khu vực rải đồ vật
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 99
    99: {
        gameId: 'rescue_animals',
        config: {
            animal: {
                image: 'smallfishes.png',
                scale: 1,
            },
            cage: {
                image: 'net2.png',
                scale: 1.5,
            },
            x: 490,
            y: 230
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 100
    100: {
        gameId: 'bubble_shooter',
        config: {
            bubble: {
                image: 'bubble2.png',
                scale: 0.8,
            },
            area: { minX: 150, maxX: 800, minY: 120, maxY: 320 }
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 101
    101: {
        gameId: 'whack_mole',
        config: {
            hole: {
                image: 'hole.png',
                scale: 0.4,
            },
            mole: {
                image: 'crab.png',
                scale: 0.4,
                offsetX: 0,
                offsetY: 0
            },
            hammer: {
                image: 'hammer.png',
                scale: 0.4,
                offsetX: 20,
                offsetY: -50
            }
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 102
    102: {
        gameId: 'racing',
        config: {
            vehicleOver: false,
            playerVehicle: {
                image: 'leaf.png',
                scale: 0.45,         // Tỷ lệ kích thước của chiếc xe
                flipX: true,         // Lật ngang xe (true: quay sang phải, false: mặc định sang trái)
                driverFlipX: false,  // Lật ngang người lái (true/false)
                driverScale: 0.2,   // Tỷ lệ kích thước người lái (khỉ)
                driverOffsetX: 0,   // Khoảng lệch ngang của khỉ so với tâm xe
                driverOffsetY: -37,   // Khoảng lệch dọc của khỉ so với tâm xe
                vehicleOffsetX: 20,
                vehicleOffsetY: 0
            },
            enemyVehicle: {
                image: 'leaf.png',
                scale: 0.45,         // Tỷ lệ kích thước của xe boss
                flipX: true,         // Lật ngang xe boss
                driverFlipX: true,  // Lật ngang boss
                driverScale: 0.2,   // Tỷ lệ kích thước của boss
                driverOffsetX: 0,   // Khoảng lệch ngang của boss so với tâm xe
                driverOffsetY: -40,   // Khoảng lệch dọc của boss so với tâm xe
                vehicleOffsetX: 20,
                vehicleOffsetY: 0
            },
            track: {
                // Các loại đường đua hỗ trợ (track.type):
                // - 'road' : Đường bộ (mặc định nhựa xám, vạch đứt khúc màu trắng)
                // - 'water': Đường nước (nước xanh dương, viền bọt sóng xanh nhạt, sóng gợn nhẹ)
                // - 'air'  : Đường trên không (màu tím vũ trụ, viền neon hồng phát sáng, chấm tròn lấp lánh)
                type: 'water',
                startX: 150,
                endX: 820,
                playerY: 220,
                enemyY: 350,
                height: 70
            }
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 103
    103: {
        gameId: 'grow_plant',
        config: {
            plant: {
                stages: [
                    { image: 'tree1.png', scale: 0.4 },
                    { image: 'tree2.png', scale: 0.3 },
                    { image: 'tree3.png', scale: 0.6 },
                    { image: 'tree4.png', scale: 0.7 },
                    { image: 'tree5.png', scale: 0.75 }
                ]
            },
            x: 490,
            y: 390
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 104
    104: {
        gameId: 'catch_insects',
        config: {
            insect: {
                image: 'firefly.png',
                scale: 0.3,
            },
            net: {
                image: 'net.png',
                scale: 0.3,
            },
            jar: {
                image: 'jar.png',
                scale: 0.7,
            },
            jarX: 940,
            jarY: 330,
            area: { minX: 180, maxX: 700, minY: 120, maxY: 340 } // Khu vực rải đồ vật
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 105
    105: {
        gameId: 'assemble_object',
        config: {
            finishedObject: {
                image: 'raft_complete.png',
                x: 490,
                y: 220,
                scale: 1
            },
            parts: [
                {
                    id: 'raft_part1', image: 'raft_part1.png', scaleX: 0.9, scaleY: 0.9, angle: 0,
                    offsetX: 0, offsetY: 0, order: 1, partOffsetY: 100
                },
                {
                    id: 'raft_part2', image: 'raft_part2.png', scaleX: 0.9, scaleY: 0.9, angle: 0,
                    offsetX: 0, offsetY: 0, order: 2, partOffsetY: 110
                },
                {
                    id: 'raft_part3', image: 'raft_part3.png', scaleX: 0.9, scaleY: 0.9, angle: 0,
                    offsetX: 0, offsetY: 0, order: 3, partOffsetY: 115
                },
                {
                    id: 'raft_part4', image: 'raft_part4.png', scaleX: 0.9, scaleY: 0.9, angle: 0,
                    offsetX: 0, offsetY: 0, order: 4, partOffsetY: 120
                },
                {
                    id: 'raft_part5', image: 'raft_part5.png', scaleX: 1, scaleY: 1, angle: 0,
                    offsetX: 0, offsetY: 0, order: 5, partOffsetY: 160
                }
            ]
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 106
    106: {
        gameId: 'frog_jump',
        config: {
            type: 'water',
            leaf: {
                image: 'rock.png',
                scale: 0.45,
            },
            monkey: {
                scale: 0.3,
                offsetX: -5,
                offsetY: -65
            },
            x1: 100,
            y1: 150,
            x2: 920,
            y2: 300
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 107
    107: {
        gameId: 'collect_items',
        config: {
            items: [
                { image: 'pearl.png', count: 10, width: 96, height: 96 }
            ],
            container: {
                image: 'basket.png',
                x: 920,
                y: 340,
                width: 180,
                height: 180
            },
            layout: 'scatter_random', // Rải ngẫu nhiên trên màn hình
            area: { minX: 180, maxX: 700, minY: 120, maxY: 340 } // Khu vực rải đồ vật
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 108
    108: {
        gameId: 'clear_fog',
        config: {
            fogScale: 1,
            image: 'fog4.png',
            x1: 250,
            y1: 140,
            x2: 750,
            y2: 270
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 109
    109: {
        gameId: 'bubble_shooter',
        config: {
            bubble: {
                image: 'rock.png',
                scale: 0.5,
            },
            area: { minX: 150, maxX: 800, minY: 120, maxY: 320 }
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 110
    110: {
        gameId: 'assemble_object',
        config: {
            finishedObject: {
                image: 'shield_complete.png',
                x: 490,
                y: 220,
                scale: 0.65
            },
            parts: [
                {
                    id: 'shield_part1', image: 'shield_part1.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 1, partOffsetY: 140
                },
                {
                    id: 'shield_part2', image: 'shield_part2.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 2, partOffsetY: 160
                },
                {
                    id: 'shield_part3', image: 'shield_part3.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 3, partOffsetY: 145
                },
                {
                    id: 'shield_part4', image: 'shield_part4.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 4, partOffsetY: 115
                },
                {
                    id: 'shield_part5', image: 'shield_part5.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 5, partOffsetY: 105
                },
                {
                    id: 'shield_part6', image: 'shield_part6.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 6, partOffsetY: 115
                }
            ]
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 112
    112: {
        gameId: 'clear_fog',
        config: {
            fogScale: 1,
            image: 'fog4.png',
            x1: 250,
            y1: 140,
            x2: 750,
            y2: 270
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 113
    113: {
        gameId: 'rescue_animals',
        config: {
            animal: {
                image: 'otter.png',
                scale: 0.8,
            },
            cage: {
                image: 'moss.png',
                scale: 1,
            },
            x: 490,
            y: 230
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 114
    114: {
        gameId: 'bubble_shooter',
        config: {
            bubble: {
                image: 'bubble2.png',
                scale: 0.8,
            },
            area: { minX: 150, maxX: 800, minY: 120, maxY: 320 }
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 115
    115: {
        gameId: 'whack_mole',
        config: {
            hole: {
                image: 'hole.png',
                scale: 0.4,
            },
            mole: {
                image: 'crab.png',
                scale: 0.4,
                offsetX: 0,
                offsetY: 0
            },
            hammer: {
                image: 'hammer.png',
                scale: 0.4,
                offsetX: 20,
                offsetY: -50
            }
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 116
    116: {
        gameId: 'racing',
        config: {
            vehicleOver: false,
            playerVehicle: {
                image: 'wood.png',
                scale: 0.45,         // Tỷ lệ kích thước của chiếc xe
                flipX: true,         // Lật ngang xe (true: quay sang phải, false: mặc định sang trái)
                driverFlipX: false,  // Lật ngang người lái (true/false)
                driverScale: 0.2,   // Tỷ lệ kích thước người lái (khỉ)
                driverOffsetX: 0,   // Khoảng lệch ngang của khỉ so với tâm xe
                driverOffsetY: -47,   // Khoảng lệch dọc của khỉ so với tâm xe
                vehicleOffsetX: 20,
                vehicleOffsetY: -5
            },
            enemyVehicle: {
                image: 'wood.png',
                scale: 0.45,         // Tỷ lệ kích thước của xe boss
                flipX: true,         // Lật ngang xe boss
                driverFlipX: true,  // Lật ngang boss
                driverScale: 0.2,   // Tỷ lệ kích thước của boss
                driverOffsetX: 0,   // Khoảng lệch ngang của boss so với tâm xe
                driverOffsetY: -50,   // Khoảng lệch dọc của boss so với tâm xe
                vehicleOffsetX: 20,
                vehicleOffsetY: -5
            },
            track: {
                // Các loại đường đua hỗ trợ (track.type):
                // - 'road' : Đường bộ (mặc định nhựa xám, vạch đứt khúc màu trắng)
                // - 'water': Đường nước (nước xanh dương, viền bọt sóng xanh nhạt, sóng gợn nhẹ)
                // - 'air'  : Đường trên không (màu tím vũ trụ, viền neon hồng phát sáng, chấm tròn lấp lánh)
                type: 'water',
                startX: 150,
                endX: 820,
                playerY: 220,
                enemyY: 350,
                height: 90
            }
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 117
    117: {
        gameId: 'grow_plant',
        config: {
            plant: {
                stages: [
                    { image: 'tree1.png', scale: 0.4 },
                    { image: 'tree2.png', scale: 0.3 },
                    { image: 'tree3.png', scale: 0.6 },
                    { image: 'tree4.png', scale: 0.7 },
                    { image: 'tree5.png', scale: 0.75 }
                ]
            },
            x: 490,
            y: 390
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 118
    118: {
        gameId: 'catch_insects',
        config: {
            insect: {
                image: 'grasshopper.png',
                scale: 0.3,
            },
            net: {
                image: 'net.png',
                scale: 0.3,
            },
            jar: {
                image: 'jar.png',
                scale: 0.7,
            },
            jarX: 940,
            jarY: 330,
            area: { minX: 180, maxX: 700, minY: 120, maxY: 340 } // Khu vực rải đồ vật
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 119
    119: {
        gameId: 'assemble_object',
        config: {
            finishedObject: {
                image: 'raft_complete.png',
                x: 490,
                y: 220,
                scale: 1
            },
            parts: [
                {
                    id: 'raft_part1', image: 'raft_part1.png', scaleX: 0.9, scaleY: 0.9, angle: 0,
                    offsetX: 0, offsetY: 0, order: 1, partOffsetY: 100
                },
                {
                    id: 'raft_part2', image: 'raft_part2.png', scaleX: 0.9, scaleY: 0.9, angle: 0,
                    offsetX: 0, offsetY: 0, order: 2, partOffsetY: 110
                },
                {
                    id: 'raft_part3', image: 'raft_part3.png', scaleX: 0.9, scaleY: 0.9, angle: 0,
                    offsetX: 0, offsetY: 0, order: 3, partOffsetY: 115
                },
                {
                    id: 'raft_part4', image: 'raft_part4.png', scaleX: 0.9, scaleY: 0.9, angle: 0,
                    offsetX: 0, offsetY: 0, order: 4, partOffsetY: 120
                },
                {
                    id: 'raft_part5', image: 'raft_part5.png', scaleX: 1, scaleY: 1, angle: 0,
                    offsetX: 0, offsetY: 0, order: 5, partOffsetY: 160
                }
            ]
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 120
    120: {
        gameId: 'frog_jump',
        config: {
            type: 'water',
            leaf: {
                image: 'rock.png',
                scale: 0.45,
            },
            monkey: {
                scale: 0.3,
                offsetX: -5,
                offsetY: -65
            },
            x1: 100,
            y1: 150,
            x2: 920,
            y2: 300
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 121
    121: {
        gameId: 'collect_items',
        config: {
            items: [
                { image: 'lapis.png', count: 10, width: 96, height: 96 }            
            ],
            container: {
                image: 'basket.png',
                x: 920,
                y: 340,
                width: 180,
                height: 180
            },
            layout: 'scatter_random', // Rải ngẫu nhiên trên màn hình
            area: { minX: 180, maxX: 700, minY: 120, maxY: 340 } // Khu vực rải đồ vật
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 122
    122: {
        gameId: 'clear_fog',
        config: {
            fogScale: 1,
            image: 'fog1.png',
            x1: 250,
            y1: 140,
            x2: 750,
            y2: 270
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 123
    123: {
        gameId: 'bubble_shooter',
        config: {
            bubble: {
                image: 'rock.png',
                scale: 0.6,
            },
            area: { minX: 150, maxX: 800, minY: 120, maxY: 320 }
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 124
    124: {
        gameId: 'assemble_object',
        config: {
            finishedObject: {
                image: 'shield_complete.png',
                x: 490,
                y: 220,
                scale: 0.65
            },
            parts: [
                {
                    id: 'shield_part1', image: 'shield_part1.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 1, partOffsetY: 140
                },
                {
                    id: 'shield_part2', image: 'shield_part2.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 2, partOffsetY: 160
                },
                {
                    id: 'shield_part3', image: 'shield_part3.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 3, partOffsetY: 145
                },
                {
                    id: 'shield_part4', image: 'shield_part4.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 4, partOffsetY: 115
                },
                {
                    id: 'shield_part5', image: 'shield_part5.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 5, partOffsetY: 105
                },
                {
                    id: 'shield_part6', image: 'shield_part6.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 6, partOffsetY: 115
                }
            ]
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 126
    126: {
        gameId: 'clear_fog',
        config: {
            fogScale: 1,
            image: 'fog4.png',
            x1: 250,
            y1: 140,
            x2: 750,
            y2: 270
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 127
    127: {
        gameId: 'rescue_animals',
        config: {
            animal: {
                image: 'smallfishes.png',
                scale: 1,
            },
            cage: {
                image: 'net2.png',
                scale: 1.5,
            },
            x: 490,
            y: 230
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 128
    128: {
        gameId: 'racing',
        config: {
            vehicleOver: false,
            playerVehicle: {
                image: 'leaf.png',
                scale: 0.45,         // Tỷ lệ kích thước của chiếc xe
                flipX: true,         // Lật ngang xe (true: quay sang phải, false: mặc định sang trái)
                driverFlipX: false,  // Lật ngang người lái (true/false)
                driverScale: 0.2,   // Tỷ lệ kích thước người lái (khỉ)
                driverOffsetX: 0,   // Khoảng lệch ngang của khỉ so với tâm xe
                driverOffsetY: -37,   // Khoảng lệch dọc của khỉ so với tâm xe
                vehicleOffsetX: 20,
                vehicleOffsetY: 0
            },
            enemyVehicle: {
                image: 'leaf.png',
                scale: 0.45,         // Tỷ lệ kích thước của xe boss
                flipX: true,         // Lật ngang xe boss
                driverFlipX: true,  // Lật ngang boss
                driverScale: 0.2,   // Tỷ lệ kích thước của boss
                driverOffsetX: 0,   // Khoảng lệch ngang của boss so với tâm xe
                driverOffsetY: -40,   // Khoảng lệch dọc của boss so với tâm xe
                vehicleOffsetX: 20,
                vehicleOffsetY: 0
            },
            track: {
                // Các loại đường đua hỗ trợ (track.type):
                // - 'road' : Đường bộ (mặc định nhựa xám, vạch đứt khúc màu trắng)
                // - 'water': Đường nước (nước xanh dương, viền bọt sóng xanh nhạt, sóng gợn nhẹ)
                // - 'air'  : Đường trên không (màu tím vũ trụ, viền neon hồng phát sáng, chấm tròn lấp lánh)
                type: 'water',
                startX: 150,
                endX: 820,
                playerY: 220,
                enemyY: 350,
                height: 70
            }
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 129
    129: {
        gameId: 'bubble_shooter',
        config: {
            bubble: {
                image: 'bubble2.png',
                scale: 0.8,
            },
            area: { minX: 150, maxX: 800, minY: 120, maxY: 320 }
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 130
    130: {
        gameId: 'collect_items',
        config: {
            items: [
                { image: 'seaweed.png', count: 10, width: 96, height: 96 }
            ],
            container: {
                image: 'basket.png',
                x: 920,
                y: 340,
                width: 180,
                height: 180
            },
            layout: 'scatter_random', // Rải ngẫu nhiên trên màn hình
            area: { minX: 180, maxX: 700, minY: 120, maxY: 340 } // Khu vực rải đồ vật
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 131
    131: {
        gameId: 'catch_insects',
        config: {
            insect: {
                image: 'jellyfish.png',
                scale: 0.5,
            },
            net: {
                image: 'net.png',
                scale: 0.5,
            },
            jar: {
                image: 'jar.png',
                scale: 0.7,
            },
            jarX: 940,
            jarY: 330,
            area: { minX: 180, maxX: 700, minY: 120, maxY: 340 } // Khu vực rải đồ vật
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 132
    132: {
        gameId: 'whack_mole',
        config: {
            hole: {
                image: 'hole.png',
                scale: 0.4,
            },
            mole: {
                image: 'crab.png',
                scale: 0.4,
                offsetX: 0,
                offsetY: 0
            },
            hammer: {
                image: 'hammer.png',
                scale: 0.4,
                offsetX: 20,
                offsetY: -50
            }
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 133
    133: {
        gameId: 'grow_plant',
        config: {
            plant: {
                stages: [
                    { image: 'tree1.png', scale: 0.4 },
                    { image: 'tree2.png', scale: 0.3 },
                    { image: 'tree3.png', scale: 0.6 },
                    { image: 'tree4.png', scale: 0.7 },
                    { image: 'tree5.png', scale: 0.75 }
                ]
            },
            x: 490,
            y: 390
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 134
    134: {
        gameId: 'frog_jump',
        config: {
            type: 'water',
            leaf: {
                image: 'rock.png',
                scale: 0.45,
            },
            frog: {
                image: 'frog.png',
                scale: 0.3,
                offsetX: 0,
                offsetY: -40
            },
            x1: 100,
            y1: 150,
            x2: 920,
            y2: 300
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 135
    135: {
        gameId: 'assemble_object',
        config: {
            finishedObject: {
                image: 'bridge_complete.png',
                x: 490,
                y: 220,
                scale: 1
            },
            parts: [
                { id: 'bridge_part1', image: 'bridge_part1.png', scaleX: 0.7, scaleY: 0.7, angle: 0, offsetX: 0, offsetY: 0, order: 1, partOffsetY: 110 },
                { id: 'bridge_part2', image: 'bridge_part2.png', scaleX: 0.7, scaleY: 0.7, angle: 0, offsetX: 0, offsetY: 0, order: 2, partOffsetY: 150 },
                { id: 'bridge_part3', image: 'bridge_part3.png', scaleX: 0.7, scaleY: 0.7, angle: 0, offsetX: 0, offsetY: 0, order: 3, partOffsetY: 140 },
                { id: 'bridge_part4', image: 'bridge_part4.png', scaleX: 0.7, scaleY: 0.7, angle: 0, offsetX: 0, offsetY: 0, order: 4, partOffsetY: 90 },
                { id: 'bridge_part5', image: 'bridge_part5.png', scaleX: 0.7, scaleY: 0.7, angle: 0, offsetX: 0, offsetY: 0, order: 5, partOffsetY: 110 },
                { id: 'bridge_part6', image: 'bridge_part6.png', scaleX: 0.7, scaleY: 0.7, angle: 0, offsetX: 0, offsetY: 0, order: 6, partOffsetY: 150 }
            ]
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 136
    136: {
        gameId: 'rescue_animals',
        config: {
            animal: {
                image: 'goldfish.png',
                scale: 0.5,
            },
            cage: {
                image: 'net2.png',
                scale: 1.5,
            },
            x: 490,
            y: 230
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 137
    137: {
        gameId: 'clear_fog',
        config: {
            fogScale: 1,
            image: 'fog3.png',
            x1: 250,
            y1: 140,
            x2: 750,
            y2: 270
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 138
    138: {
        gameId: 'assemble_object',
        config: {
            finishedObject: {
                image: 'shield_complete.png',
                x: 490,
                y: 220,
                scale: 0.65
            },
            parts: [
                {
                    id: 'shield_part1', image: 'shield_part1.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 1, partOffsetY: 140
                },
                {
                    id: 'shield_part2', image: 'shield_part2.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 2, partOffsetY: 160
                },
                {
                    id: 'shield_part3', image: 'shield_part3.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 3, partOffsetY: 145
                },
                {
                    id: 'shield_part4', image: 'shield_part4.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 4, partOffsetY: 115
                },
                {
                    id: 'shield_part5', image: 'shield_part5.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 5, partOffsetY: 105
                },
                {
                    id: 'shield_part6', image: 'shield_part6.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 6, partOffsetY: 115
                }
            ]
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 140
    140: {
        gameId: 'clear_fog',
        config: {
            fogScale: 1,
            image: 'fog3.png',
            x1: 250,
            y1: 140,
            x2: 750,
            y2: 270
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 141
    141: {
        gameId: 'rescue_animals',
        config: {
            animal: {
                image: 'frog.png',
                scale: 0.6,
            },
            cage: {
                image: 'net2.png',
                scale: 1.5,
            },
            x: 490,
            y: 230
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 142
    142: {
        gameId: 'bubble_shooter',
        config: {
            bubble: {
                image: 'bubble2.png',
                scale: 0.8,
            },
            area: { minX: 150, maxX: 800, minY: 120, maxY: 320 }
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 143
    143: {
        gameId: 'whack_mole',
        config: {
            hole: {
                image: 'hole.png',
                scale: 0.4,
            },
            mole: {
                image: 'crab.png',
                scale: 0.4,
                offsetX: 0,
                offsetY: 0
            },
            hammer: {
                image: 'hammer.png',
                scale: 0.4,
                offsetX: 20,
                offsetY: -50
            }
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 144
    144: {
        gameId: 'racing',
        config: {
            vehicleOver: false,
            playerVehicle: {
                image: 'leaf.png',
                scale: 0.45,         // Tỷ lệ kích thước của chiếc xe
                flipX: true,         // Lật ngang xe (true: quay sang phải, false: mặc định sang trái)
                driverFlipX: false,  // Lật ngang người lái (true/false)
                driverScale: 0.2,   // Tỷ lệ kích thước người lái (khỉ)
                driverOffsetX: 0,   // Khoảng lệch ngang của khỉ so với tâm xe
                driverOffsetY: -37,   // Khoảng lệch dọc của khỉ so với tâm xe
                vehicleOffsetX: 20,
                vehicleOffsetY: 0
            },
            enemyVehicle: {
                image: 'leaf.png',
                scale: 0.45,         // Tỷ lệ kích thước của xe boss
                flipX: true,         // Lật ngang xe boss
                driverFlipX: true,  // Lật ngang boss
                driverScale: 0.2,   // Tỷ lệ kích thước của boss
                driverOffsetX: 0,   // Khoảng lệch ngang của boss so với tâm xe
                driverOffsetY: -40,   // Khoảng lệch dọc của boss so với tâm xe
                vehicleOffsetX: 20,
                vehicleOffsetY: 0
            },
            track: {
                // Các loại đường đua hỗ trợ (track.type):
                // - 'road' : Đường bộ (mặc định nhựa xám, vạch đứt khúc màu trắng)
                // - 'water': Đường nước (nước xanh dương, viền bọt sóng xanh nhạt, sóng gợn nhẹ)
                // - 'air'  : Đường trên không (màu tím vũ trụ, viền neon hồng phát sáng, chấm tròn lấp lánh)
                type: 'water',
                startX: 150,
                endX: 820,
                playerY: 220,
                enemyY: 350,
                height: 70
            }
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 145
    145: {
        gameId: 'grow_plant',
        config: {
            plant: {
                stages: [
                    { image: 'flower_tree1.png', scale: 0.7 },
                    { image: 'flower_tree2.png', scale: 0.7 },
                    { image: 'flower_tree3.png', scale: 0.7 },
                    { image: 'flower_tree4.png', scale: 0.7 },
                    { image: 'flower_tree5.png', scale: 0.7 }
                ]
            },
            x: 490,
            y: 390
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 146
    146: {
        gameId: 'collect_items',
        config: {
            items: [
                { image: 'lotus_seed.png', count: 10, width: 96, height: 96 }
            ],
            container: {
                image: 'basket.png',
                x: 920,
                y: 340,
                width: 180,
                height: 180
            },
            layout: 'scatter_random', // Rải ngẫu nhiên trên màn hình
            area: { minX: 180, maxX: 700, minY: 120, maxY: 340 } // Khu vực rải đồ vật
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 147
    147: {
        gameId: 'catch_insects',
        config: {
            insect: {
                image: 'firefly.png',
                scale: 0.3,
            },
            net: {
                image: 'net.png',
                scale: 0.3,
            },
            jar: {
                image: 'jar.png',
                scale: 0.7,
            },
            jarX: 940,
            jarY: 330,
            area: { minX: 180, maxX: 700, minY: 120, maxY: 340 } // Khu vực rải đồ vật
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 148
    148: {
        gameId: 'frog_jump',
        config: {
            leaf: {
                image: 'leaf.png',
                scale: 0.5,
            },
            monkey: {
                scale: 0.3,
                offsetX: -5,
                offsetY: -60
            },
            x1: 100,
            y1: 150,
            x2: 920,
            y2: 300
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 149
    149: {
        gameId: 'assemble_object',
        config: {
            finishedObject: {
                image: 'raft_complete.png',
                x: 490,
                y: 220,
                scale: 1
            },
            parts: [
                {
                    id: 'raft_part1', image: 'raft_part1.png', scaleX: 0.9, scaleY: 0.9, angle: 0,
                    offsetX: 0, offsetY: 0, order: 1, partOffsetY: 100
                },
                {
                    id: 'raft_part2', image: 'raft_part2.png', scaleX: 0.9, scaleY: 0.9, angle: 0,
                    offsetX: 0, offsetY: 0, order: 2, partOffsetY: 110
                },
                {
                    id: 'raft_part3', image: 'raft_part3.png', scaleX: 0.9, scaleY: 0.9, angle: 0,
                    offsetX: 0, offsetY: 0, order: 3, partOffsetY: 115
                },
                {
                    id: 'raft_part4', image: 'raft_part4.png', scaleX: 0.9, scaleY: 0.9, angle: 0,
                    offsetX: 0, offsetY: 0, order: 4, partOffsetY: 120
                },
                {
                    id: 'raft_part5', image: 'raft_part5.png', scaleX: 1, scaleY: 1, angle: 0,
                    offsetX: 0, offsetY: 0, order: 5, partOffsetY: 160
                }
            ]
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 150
    150: {
        gameId: 'clear_fog',
        config: {
            fogScale: 1,
            image: 'fog2.png',
            x1: 250,
            y1: 140,
            x2: 750,
            y2: 270
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 151
    151: {
        gameId: 'bubble_shooter',
        config: {
            bubble: {
                image: 'urchin.png',
                scale: 0.6,
            },
            area: { minX: 150, maxX: 800, minY: 120, maxY: 320 }
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 152
    152: {
        gameId: 'assemble_object',
        config: {
            finishedObject: {
                image: 'shield_complete.png',
                x: 490,
                y: 220,
                scale: 0.65
            },
            parts: [
                {
                    id: 'shield_part1', image: 'shield_part1.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 1, partOffsetY: 140
                },
                {
                    id: 'shield_part2', image: 'shield_part2.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 2, partOffsetY: 160
                },
                {
                    id: 'shield_part3', image: 'shield_part3.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 3, partOffsetY: 145
                },
                {
                    id: 'shield_part4', image: 'shield_part4.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 4, partOffsetY: 115
                },
                {
                    id: 'shield_part5', image: 'shield_part5.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 5, partOffsetY: 105
                },
                {
                    id: 'shield_part6', image: 'shield_part6.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 6, partOffsetY: 115
                }
            ]
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 154
    154: {
        gameId: 'clear_fog',
        config: {
            fogScale: 1,
            image: 'fog1.png',
            x1: 250,
            y1: 140,
            x2: 750,
            y2: 270
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 155
    155: {
        gameId: 'rescue_animals',
        config: {
            animal: {
                image: 'flamingo.png',
                scale: 0.6,
            },
            cage: {
                image: 'bush.png',
                scale: 0.8,
            },
            x: 490,
            y: 230
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 156
    156: {
        gameId: 'bubble_shooter',
        config: {
            bubble: {
                image: 'bubble2.png',
                scale: 0.8,
            },
            area: { minX: 150, maxX: 800, minY: 120, maxY: 320 }
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 157
    157: {
        gameId: 'whack_mole',
        config: {
            hole: {
                image: 'hole.png',
                scale: 0.4,
            },
            mole: {
                image: 'mole.png',
                scale: 0.35,
                offsetX: 0,
                offsetY: -15
            },
            hammer: {
                image: 'hammer.png',
                scale: 0.4,
                offsetX: 20,
                offsetY: -50
            }
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 158
    158: {
        gameId: 'racing',
        config: {
            playerVehicle: {
                image: 'car1.png',
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
                image: 'car2.png',
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
    },
    // Tự động đồng bộ từ File 1: Lesson 159
    159: {
        gameId: 'grow_plant',
        config: {
            plant: {
                stages: [
                    { image: 'tree1.png', scale: 0.4 },
                    { image: 'tree2.png', scale: 0.3 },
                    { image: 'tree3.png', scale: 0.6 },
                    { image: 'tree4.png', scale: 0.7 },
                    { image: 'tree5.png', scale: 0.75 }
                ]
            },
            x: 490,
            y: 390
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 160
    160: {
        gameId: 'catch_insects',
        config: {
            insect: {
                image: 'mosquito.png',
                scale: 0.3,
            },
            net: {
                image: 'net.png',
                scale: 0.3,
            },
            jar: {
                image: 'jar.png',
                scale: 0.7,
            },
            jarX: 940,
            jarY: 330,
            area: { minX: 180, maxX: 700, minY: 120, maxY: 340 } // Khu vực rải đồ vật
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 161
    161: {
        gameId: 'frog_jump',
        config: {
            leaf: {
                image: 'leaf.png',
                scale: 0.5,
            },
            monkey: {
                scale: 0.3,
                offsetX: -5,
                offsetY: -60
            },
            x1: 100,
            y1: 150,
            x2: 920,
            y2: 300
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 162
    162: {
        gameId: 'collect_items',
        config: {
            items: [
                { image: 'corn.png', count: 10, width: 96, height: 96 }
            ],
            container: {
                image: 'basket.png',
                x: 920,
                y: 340,
                width: 180,
                height: 180
            },
            layout: 'scatter_random', // Rải ngẫu nhiên trên màn hình
            area: { minX: 180, maxX: 700, minY: 120, maxY: 340 } // Khu vực rải đồ vật
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 163
    163: {
        gameId: 'assemble_object',
        config: {
            finishedObject: {
                image: 'boat_complete.png',
                x: 490,
                y: 200,
                scale: 0.65
            },
            parts: [
                {
                    id: 'boat_part1', image: 'boat_part1.png', scaleX: 0.5, scaleY: 0.5, angle: 0,
                    offsetX: 0, offsetY: 0, order: 1, partOffsetY: 125
                },
                {
                    id: 'boat_part2', image: 'boat_part2.png', scaleX: 0.5, scaleY: 0.5, angle: 0,
                    offsetX: 0, offsetY: 0, order: 2, partOffsetY: 130
                },
                {
                    id: 'boat_part3', image: 'boat_part3.png', scaleX: 0.5, scaleY: 0.5, angle: 0,
                    offsetX: 0, offsetY: 0, order: 3, partOffsetY: 150
                },
                {
                    id: 'boat_part4', image: 'boat_part4.png', scaleX: 0.5, scaleY: 0.5, angle: 0,
                    offsetX: 0, offsetY: 0, order: 4, partOffsetY: 140
                },
                {
                    id: 'boat_part5', image: 'boat_part5.png', scaleX: 0.5, scaleY: 0.5, angle: 0,
                    offsetX: 0, offsetY: 0, order: 5, partOffsetY: 150
                }
            ]
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 164
    164: {
        gameId: 'clear_fog',
        config: {
            fogScale: 1,
            image: 'fog3.png',
            x1: 250,
            y1: 140,
            x2: 750,
            y2: 270
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 165
    165: {
        gameId: 'bubble_shooter',
        config: {
            bubble: {
                image: 'wood.png',
                scale: 0.8,
            },
            area: { minX: 150, maxX: 800, minY: 120, maxY: 320 }
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 166
    166: {
        gameId: 'assemble_object',
        config: {
            finishedObject: {
                image: 'shield_complete.png',
                x: 490,
                y: 220,
                scale: 0.65
            },
            parts: [
                {
                    id: 'shield_part1', image: 'shield_part1.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 1, partOffsetY: 140
                },
                {
                    id: 'shield_part2', image: 'shield_part2.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 2, partOffsetY: 160
                },
                {
                    id: 'shield_part3', image: 'shield_part3.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 3, partOffsetY: 145
                },
                {
                    id: 'shield_part4', image: 'shield_part4.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 4, partOffsetY: 115
                },
                {
                    id: 'shield_part5', image: 'shield_part5.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 5, partOffsetY: 105
                },
                {
                    id: 'shield_part6', image: 'shield_part6.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 6, partOffsetY: 115
                }
            ]
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 168
    168: {
        gameId: 'clear_fog',
        config: {
            fogScale: 1,
            image: 'fog1.png',
            x1: 250,
            y1: 140,
            x2: 750,
            y2: 270
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 169
    169: {
        gameId: 'rescue_animals',
        config: {
            animal: {
                image: 'rabbit.png',
                scale: 0.8,
            },
            cage: {
                image: 'cage.png',
                scale: 1,
            },
            x: 490,
            y: 230
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 170
    170: {
        gameId: 'bubble_shooter',
        config: {
            bubble: {
                image: 'fog4.png',
                scale: 0.8,
            },
            area: { minX: 150, maxX: 800, minY: 120, maxY: 320 }
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 171
    171: {
        gameId: 'whack_mole',
        config: {
            hole: {
                image: 'hole.png',
                scale: 0.4,
            },
            mole: {
                image: 'crab.png',
                scale: 0.4,
                offsetX: 0,
                offsetY: 0
            },
            hammer: {
                image: 'hammer.png',
                scale: 0.4,
                offsetX: 20,
                offsetY: -50
            }
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 172
    172: {
        gameId: 'racing',
        config: {
            playerVehicle: {
                image: 'boat.png',
                type: 'car',
                scale: 0.3,         // Tỷ lệ kích thước của chiếc xe
                flipX: false,         // Lật ngang xe (true: quay sang phải, false: mặc định sang trái)
                driverFlipX: false,  // Lật ngang người lái (true/false)
                driverScale: 0.2,   // Tỷ lệ kích thước người lái (khỉ)
                driverOffsetX: -10,   // Khoảng lệch ngang của khỉ so với tâm xe
                driverOffsetY: -32,   // Khoảng lệch dọc của khỉ so với tâm xe
                vehicleOffsetX: 20,
                vehicleOffsetY: -5
            },
            enemyVehicle: {
                image: 'boat.png',
                type: 'car',
                scale: 0.3,         // Tỷ lệ kích thước của xe boss
                flipX: false,         // Lật ngang xe boss
                driverFlipX: true,  // Lật ngang boss
                driverScale: 0.2,   // Tỷ lệ kích thước của boss
                driverOffsetX: -10,   // Khoảng lệch ngang của boss so với tâm xe
                driverOffsetY: -35,   // Khoảng lệch dọc của boss so với tâm xe
                vehicleOffsetX: 20,
                vehicleOffsetY: -5
            },
            track: {
                // Các loại đường đua hỗ trợ (track.type):
                // - 'road' : Đường bộ (mặc định nhựa xám, vạch đứt khúc màu trắng)
                // - 'water': Đường nước (nước xanh dương, viền bọt sóng xanh nhạt, sóng gợn nhẹ)
                // - 'air'  : Đường trên không (màu tím vũ trụ, viền neon hồng phát sáng, chấm tròn lấp lánh)
                type: 'water',
                startX: 150,
                endX: 820,
                playerY: 220,
                enemyY: 350,
                height: 70
            }
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 173
    173: {
        gameId: 'grow_plant',
        config: {
            plant: {
                stages: [
                    { image: 'tree1.png', scale: 0.4 },
                    { image: 'tree2.png', scale: 0.3 },
                    { image: 'tree3.png', scale: 0.6 },
                    { image: 'tree4.png', scale: 0.7 },
                    { image: 'tree5.png', scale: 0.75 }
                ]
            },
            x: 490,
            y: 390
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 174
    174: {
        gameId: 'catch_insects',
        config: {
            insect: {
                image: 'mosquito.png',
                scale: 0.3,
            },
            net: {
                image: 'net.png',
                scale: 0.3,
            },
            jar: {
                image: 'jar.png',
                scale: 0.7,
            },
            jarX: 940,
            jarY: 330,
            area: { minX: 180, maxX: 700, minY: 120, maxY: 340 } // Khu vực rải đồ vật
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 175
    175: {
        gameId: 'frog_jump',
        config: {
            type: 'water',
            leaf: {
                image: 'rock.png',
                scale: 0.45,
            },
            monkey: {
                scale: 0.3,
                offsetX: -5,
                offsetY: -65
            },
            x1: 100,
            y1: 150,
            x2: 920,
            y2: 300
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 176
    176: {
        gameId: 'collect_items',
        config: {
            items: [
                { image: 'pearl.png', count: 10, width: 96, height: 96 }
            ],
            container: {
                image: 'basket.png',
                x: 920,
                y: 340,
                width: 180,
                height: 180
            },
            layout: 'scatter_random', // Rải ngẫu nhiên trên màn hình
            area: { minX: 180, maxX: 700, minY: 120, maxY: 340 } // Khu vực rải đồ vật
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 177
    177: {
        gameId: 'assemble_object',
        config: {
            finishedObject: {
                image: 'boat_complete.png',
                x: 490,
                y: 200,
                scale: 0.65
            },
            parts: [
                {
                    id: 'boat_part1', image: 'boat_part1.png', scaleX: 0.5, scaleY: 0.5, angle: 0,
                    offsetX: 0, offsetY: 0, order: 1, partOffsetY: 125
                },
                {
                    id: 'boat_part2', image: 'boat_part2.png', scaleX: 0.5, scaleY: 0.5, angle: 0,
                    offsetX: 0, offsetY: 0, order: 2, partOffsetY: 130
                },
                {
                    id: 'boat_part3', image: 'boat_part3.png', scaleX: 0.5, scaleY: 0.5, angle: 0,
                    offsetX: 0, offsetY: 0, order: 3, partOffsetY: 150
                },
                {
                    id: 'boat_part4', image: 'boat_part4.png', scaleX: 0.5, scaleY: 0.5, angle: 0,
                    offsetX: 0, offsetY: 0, order: 4, partOffsetY: 140
                },
                {
                    id: 'boat_part5', image: 'boat_part5.png', scaleX: 0.5, scaleY: 0.5, angle: 0,
                    offsetX: 0, offsetY: 0, order: 5, partOffsetY: 150
                }
            ]
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 178
    178: {
        gameId: 'clear_fog',
        config: {
            fogScale: 1,
            image: 'fog3.png',
            x1: 250,
            y1: 140,
            x2: 750,
            y2: 270
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 179
    179: {
        gameId: 'bubble_shooter',
        config: {
            bubble: {
                image: 'rock.png',
                scale: 0.6,
            },
            area: { minX: 150, maxX: 800, minY: 120, maxY: 320 }
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 180
    180: {
        gameId: 'assemble_object',
        config: {
            finishedObject: {
                image: 'shield_complete.png',
                x: 490,
                y: 220,
                scale: 0.65
            },
            parts: [
                {
                    id: 'shield_part1', image: 'shield_part1.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 1, partOffsetY: 140
                },
                {
                    id: 'shield_part2', image: 'shield_part2.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 2, partOffsetY: 160
                },
                {
                    id: 'shield_part3', image: 'shield_part3.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 3, partOffsetY: 145
                },
                {
                    id: 'shield_part4', image: 'shield_part4.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 4, partOffsetY: 115
                },
                {
                    id: 'shield_part5', image: 'shield_part5.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 5, partOffsetY: 105
                },
                {
                    id: 'shield_part6', image: 'shield_part6.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 6, partOffsetY: 115
                }
            ]
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 182
    182: {
        gameId: 'clear_fog',
        config: {
            fogScale: 1,
            image: 'fog5.png',
            x1: 250,
            y1: 140,
            x2: 750,
            y2: 270
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 183
    183: {
        gameId: 'rescue_animals',
        config: {
            animal: {
                image: 'rabbit.png',
                scale: 0.8,
            },
            cage: {
                image: 'cage.png',
                scale: 1,
            },
            x: 490,
            y: 230
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 184
    184: {
        gameId: 'bubble_shooter',
        config: {
            bubble: {
                image: 'fog4.png',
                scale: 0.6,
            },
            area: { minX: 150, maxX: 800, minY: 120, maxY: 320 }
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 185
    185: {
        gameId: 'whack_mole',
        config: {
            hole: {
                image: 'hole.png',
                scale: 0.4,
            },
            mole: {
                image: 'crab.png',
                scale: 0.4,
                offsetX: 0,
                offsetY: 0
            },
            hammer: {
                image: 'hammer.png',
                scale: 0.4,
                offsetX: 20,
                offsetY: -50
            }
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 186
    186: {
        gameId: 'racing',
        config: {
            vehicleOver: false,
            playerVehicle: {
                image: 'carp.png',
                scale: 0.45,         // Tỷ lệ kích thước của chiếc xe
                flipX: false,         // Lật ngang xe (true: quay sang phải, false: mặc định sang trái)
                driverFlipX: false,  // Lật ngang người lái (true/false)
                driverScale: 0.2,   // Tỷ lệ kích thước người lái (khỉ)
                driverOffsetX: 0,   // Khoảng lệch ngang của khỉ so với tâm xe
                driverOffsetY: -37,   // Khoảng lệch dọc của khỉ so với tâm xe
                vehicleOffsetX: 20,
                vehicleOffsetY: 0
            },
            enemyVehicle: {
                image: 'carp.png',
                scale: 0.45,         // Tỷ lệ kích thước của xe boss
                flipX: false,         // Lật ngang xe boss
                driverFlipX: true,  // Lật ngang boss
                driverScale: 0.2,   // Tỷ lệ kích thước của boss
                driverOffsetX: 0,   // Khoảng lệch ngang của boss so với tâm xe
                driverOffsetY: -50,   // Khoảng lệch dọc của boss so với tâm xe
                vehicleOffsetX: 20,
                vehicleOffsetY: 0
            },
            track: {
                // Các loại đường đua hỗ trợ (track.type):
                // - 'road' : Đường bộ (mặc định nhựa xám, vạch đứt khúc màu trắng)
                // - 'water': Đường nước (nước xanh dương, viền bọt sóng xanh nhạt, sóng gợn nhẹ)
                // - 'air'  : Đường trên không (màu tím vũ trụ, viền neon hồng phát sáng, chấm tròn lấp lánh)
                type: 'water',
                startX: 150,
                endX: 820,
                playerY: 220,
                enemyY: 350,
                height: 80
            }
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 187
    187: {
        gameId: 'grow_plant',
        config: {
            plant: {
                stages: [
                    { image: 'tree1.png', scale: 0.4 },
                    { image: 'tree2.png', scale: 0.3 },
                    { image: 'tree3.png', scale: 0.6 },
                    { image: 'tree4.png', scale: 0.7 },
                    { image: 'tree5.png', scale: 0.75 }
                ]
            },
            x: 490,
            y: 390
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 188
    188: {
        gameId: 'catch_insects',
        config: {
            insect: {
                image: 'firefly.png',
                scale: 0.3,
            },
            net: {
                image: 'net.png',
                scale: 0.3,
            },
            jar: {
                image: 'jar.png',
                scale: 0.7,
            },
            jarX: 940,
            jarY: 330,
            area: { minX: 180, maxX: 700, minY: 120, maxY: 340 } // Khu vực rải đồ vật
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 189
    189: {
        gameId: 'frog_jump',
        config: {
            type: 'water',
            leaf: {
                image: 'rock.png',
                scale: 0.45,
            },
            monkey: {
                scale: 0.3,
                offsetX: -5,
                offsetY: -65
            },
            x1: 100,
            y1: 150,
            x2: 920,
            y2: 300
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 190
    190: {
        gameId: 'collect_items',
        config: {
            items: [
                { image: 'crystal.png', count: 10, width: 96, height: 96 }
            ],
            container: {
                image: 'basket.png',
                x: 920,
                y: 340,
                width: 180,
                height: 180
            },
            layout: 'scatter_random', // Rải ngẫu nhiên trên màn hình
            area: { minX: 180, maxX: 700, minY: 120, maxY: 340 } // Khu vực rải đồ vật
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 191
    191: {
        gameId: 'assemble_object',
        config: {
            finishedObject: {
                image: 'raft_complete.png',
                x: 490,
                y: 220,
                scale: 1
            },
            parts: [
                {
                    id: 'raft_part1', image: 'raft_part1.png', scaleX: 0.9, scaleY: 0.9, angle: 0,
                    offsetX: 0, offsetY: 0, order: 1, partOffsetY: 100
                },
                {
                    id: 'raft_part2', image: 'raft_part2.png', scaleX: 0.9, scaleY: 0.9, angle: 0,
                    offsetX: 0, offsetY: 0, order: 2, partOffsetY: 110
                },
                {
                    id: 'raft_part3', image: 'raft_part3.png', scaleX: 0.9, scaleY: 0.9, angle: 0,
                    offsetX: 0, offsetY: 0, order: 3, partOffsetY: 115
                },
                {
                    id: 'raft_part4', image: 'raft_part4.png', scaleX: 0.9, scaleY: 0.9, angle: 0,
                    offsetX: 0, offsetY: 0, order: 4, partOffsetY: 120
                },
                {
                    id: 'raft_part5', image: 'raft_part5.png', scaleX: 1, scaleY: 1, angle: 0,
                    offsetX: 0, offsetY: 0, order: 5, partOffsetY: 160
                }
            ]
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 192
    192: {
        gameId: 'clear_fog',
        config: {
            fogScale: 1,
            image: 'fog1.png',
            x1: 250,
            y1: 140,
            x2: 750,
            y2: 270
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 193
    193: {
        gameId: 'bubble_shooter',
        config: {
            bubble: {
                image: 'wood.png',
                scale: 0.8,
            },
            area: { minX: 150, maxX: 800, minY: 120, maxY: 320 }
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 194
    194: {
        gameId: 'assemble_object',
        config: {
            finishedObject: {
                image: 'scepter_complete.png',
                x: 490,
                y: 220,
                scale: 1
            },
            parts: [
                {
                    id: 'scepter_part1', image: 'scepter_part1.png', scaleX: 0.9, scaleY: 0.9, angle: 0,
                    offsetX: 0, offsetY: 0, order: 1, partOffsetY: 100
                },
                {
                    id: 'scepter_part2', image: 'scepter_part2.png', scaleX: 0.9, scaleY: 0.9, angle: 0,
                    offsetX: 0, offsetY: 0, order: 2, partOffsetY: 120
                },
                {
                    id: 'scepter_part3', image: 'scepter_part3.png', scaleX: 0.9, scaleY: 0.9, angle: 0,
                    offsetX: 0, offsetY: 0, order: 3, partOffsetY: 140
                },
                {
                    id: 'scepter_part4', image: 'scepter_part4.png', scaleX: 0.9, scaleY: 0.9, angle: 0,
                    offsetX: 0, offsetY: 0, order: 4, partOffsetY: 160
                },
                {
                    id: 'scepter_part5', image: 'scepter_part5.png', scaleX: 0.9, scaleY: 0.9, angle: 0,
                    offsetX: 0, offsetY: 0, order: 5, partOffsetY: 180
                },
                {
                    id: 'scepter_part6', image: 'scepter_part6.png', scaleX: 0.9, scaleY: 0.9, angle: 0,
                    offsetX: 0, offsetY: 0, order: 6, partOffsetY: 190
                }
            ]
        },

    },
    // Tự động đồng bộ từ File 1: Lesson 196
    196: {
        gameId: 'clear_fog',
        config: {
            fogScale: 1,
            image: 'fog1.png',
            x1: 250,
            y1: 140,
            x2: 750,
            y2: 270
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 197
    197: {
        gameId: 'rescue_animals',
        config: {
            animal: {
                image: 'rabbit.png',
                scale: 0.8,
            },
            cage: {
                image: 'cage.png',
                scale: 1,
            },
            x: 490,
            y: 230
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 198
    198: {
        gameId: 'bubble_shooter',
        config: {
            bubble: {
                image: 'stone.png',
                scale: 0.8,
            },
            area: { minX: 150, maxX: 800, minY: 120, maxY: 320 }
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 199
    199: {
        gameId: 'whack_mole',
        config: {
            hole: {
                image: 'hole.png',
                scale: 0.4,
            },
            mole: {
                image: 'snake.png',
                scale: 0.35,
                offsetX: 0,
                offsetY: -15
            },
            hammer: {
                image: 'hammer.png',
                scale: 0.4,
                offsetX: 20,
                offsetY: -50
            }
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 200
    200: {
        gameId: 'racing',
        config: {
            playerVehicle: {
                image: 'car1.png',
                type: 'car',
                scale: 0.45,         // Tỷ lệ kích thước của chiếc xe
                flipX: true,         // Lật ngang xe (true: quay sang phải, false: mặc định sang trái)
                driverFlipX: false,  // Lật ngang người lái (true/false)
                driverScale: 0.2,   // Tỷ lệ kích thước người lái (khỉ)
                driverOffsetX: -10,   // Khoảng lệch ngang của khỉ so với tâm xe
                driverOffsetY: -30,   // Khoảng lệch dọc của khỉ so với tâm xe
                vehicleOffsetX: 20,
                vehicleOffsetY: -5
            },
            enemyVehicle: {
                image: 'car2.png',
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
    },
    // Tự động đồng bộ từ File 1: Lesson 201
    201: {
        gameId: 'grow_plant',
        config: {
            plant: {
                stages: [
                    { image: 'tree1.png', scale: 0.4 },
                    { image: 'tree2.png', scale: 0.3 },
                    { image: 'tree3.png', scale: 0.6 },
                    { image: 'tree4.png', scale: 0.7 },
                    { image: 'tree5.png', scale: 0.75 }
                ]
            },
            x: 490,
            y: 390
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 202
    202: {
        gameId: 'catch_insects',
        config: {
            insect: {
                image: 'firefly.png',
                scale: 0.3,
            },
            net: {
                image: 'net.png',
                scale: 0.3,
            },
            jar: {
                image: 'jar.png',
                scale: 0.7,
            },
            jarX: 940,
            jarY: 330,
            area: { minX: 180, maxX: 700, minY: 120, maxY: 340 } // Khu vực rải đồ vật
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 203
    203: {
        gameId: 'frog_jump',
        config: {
            type: 'water',
            leaf: {
                image: 'rock.png',
                scale: 0.45,
            },
            monkey: {
                scale: 0.3,
                offsetX: -5,
                offsetY: -65
            },
            x1: 100,
            y1: 150,
            x2: 920,
            y2: 300
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 204
    204: {
        gameId: 'collect_items',
        config: {
            items: [
                { image: 'peach.png', count: 10, width: 96, height: 96 }
            ],
            container: {
                image: 'basket.png',
                x: 920,
                y: 340,
                width: 180,
                height: 180
            },
            layout: 'scatter_random', // Rải ngẫu nhiên trên màn hình
            area: { minX: 180, maxX: 700, minY: 120, maxY: 340 } // Khu vực rải đồ vật
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 205
    205: {
        gameId: 'assemble_object',
        config: {
            finishedObject: {
                image: 'truck_complete.png',
                x: 490,
                y: 220,
                scale: 0.8
            },
            parts: [
                {
                    id: 'part_body', image: 'truck_body.png', scaleX: 0.7, scaleY: 0.7, angle: 0,
                    offsetX: 0, offsetY: 0, order: 1
                },
                {
                    id: 'part_wheel1', image: 'truck_wheel1.png', scaleX: 0.7, scaleY: 0.7, angle: 0,
                    offsetX: -105, offsetY: 30, order: 2
                },
                {
                    id: 'part_wheel2', image: 'truck_wheel2.png', scaleX: 0.7, scaleY: 0.7, angle: 0,
                    offsetX: 90, offsetY: 30, order: 3
                },
                {
                    id: 'part_cabin', image: 'truck_cabin.png', scaleX: 0.7, scaleY: 0.7, angle: 0,
                    offsetX: -93, offsetY: -63, order: 4
                },
                {
                    id: 'part_cargo', image: 'truck_cargo.png', scaleX: 0.7, scaleY: 0.7, angle: 0,
                    offsetX: 78, offsetY: -85, order: 5
                },
                {
                    id: 'part_siren', image: 'truck_siren.png', scaleX: 1.2, scaleY: 1.2, angle: 0,
                    offsetX: -62, offsetY: -152, order: 6
                }
            ]
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 206
    206: {
        gameId: 'clear_fog',
        config: {
            fogScale: 1,
            image: 'fog6.png',
            x1: 250,
            y1: 140,
            x2: 750,
            y2: 270
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 207
    207: {
        gameId: 'bubble_shooter',
        config: {
            bubble: {
                image: 'wood.png',
                scale: 0.8,
            },
            area: { minX: 150, maxX: 800, minY: 120, maxY: 320 }
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 208
    208: {
        gameId: 'assemble_object',
        config: {
            finishedObject: {
                image: 'shield_complete.png',
                x: 490,
                y: 220,
                scale: 0.65
            },
            parts: [
                {
                    id: 'shield_part1', image: 'shield_part1.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 1, partOffsetY: 140
                },
                {
                    id: 'shield_part2', image: 'shield_part2.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 2, partOffsetY: 160
                },
                {
                    id: 'shield_part3', image: 'shield_part3.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 3, partOffsetY: 145
                },
                {
                    id: 'shield_part4', image: 'shield_part4.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 4, partOffsetY: 115
                },
                {
                    id: 'shield_part5', image: 'shield_part5.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 5, partOffsetY: 105
                },
                {
                    id: 'shield_part6', image: 'shield_part6.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 6, partOffsetY: 115
                }
            ]
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 210
    210: {
        gameId: 'clear_fog',
        config: {
            fogScale: 1,
            image: 'fog2.png',
            x1: 250,
            y1: 140,
            x2: 750,
            y2: 270
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 211
    211: {
        gameId: 'rescue_animals',
        config: {
            animal: {
                image: 'rabbit.png',
                scale: 0.8,
            },
            cage: {
                image: 'cage.png',
                scale: 1,
            },
            x: 490,
            y: 230
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 212
    212: {
        gameId: 'bubble_shooter',
        config: {
            bubble: {
                image: 'stone.png',
                scale: 0.8,
            },
            area: { minX: 150, maxX: 800, minY: 120, maxY: 320 }
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 213
    213: {
        gameId: 'whack_mole',
        config: {
            hole: {
                image: 'hole.png',
                scale: 0.4,
            },
            mole: {
                image: 'mole.png',
                scale: 0.35,
                offsetX: 0,
                offsetY: -15
            },
            hammer: {
                image: 'hammer.png',
                scale: 0.4,
                offsetX: 20,
                offsetY: -50
            }
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 214
    214: {
        gameId: 'racing',
        config: {
            playerVehicle: {
                image: 'car1.png',
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
                image: 'car2.png',
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
    },
    // Tự động đồng bộ từ File 1: Lesson 215
    215: {
        gameId: 'grow_plant',
        config: {
            plant: {
                stages: [
                    { image: 'tree1.png', scale: 0.4 },
                    { image: 'tree2.png', scale: 0.3 },
                    { image: 'tree3.png', scale: 0.6 },
                    { image: 'tree4.png', scale: 0.7 },
                    { image: 'tree5.png', scale: 0.75 }
                ]
            },
            x: 490,
            y: 390
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 216
    216: {
        gameId: 'catch_insects',
        config: {
            insect: {
                image: 'butterfly.png',
                scale: 0.3,
            },
            net: {
                image: 'net.png',
                scale: 0.3,
            },
            jar: {
                image: 'jar.png',
                scale: 0.7,
            },
            jarX: 940,
            jarY: 330,
            area: { minX: 180, maxX: 700, minY: 120, maxY: 340 } // Khu vực rải đồ vật
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 217
    217: {
        gameId: 'frog_jump',
        config: {
            type: 'water',
            leaf: {
                image: 'rock.png',
                scale: 0.45,
            },
            monkey: {
                scale: 0.3,
                offsetX: -5,
                offsetY: -65
            },
            x1: 100,
            y1: 150,
            x2: 920,
            y2: 300
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 218
    218: {
        gameId: 'collect_items',
        config: {
            items: [
                { image: 'crystal.png', count: 10, width: 96, height: 96 }
            ],
            container: {
                image: 'basket.png',
                x: 920,
                y: 340,
                width: 180,
                height: 180
            },
            layout: 'scatter_random', // Rải ngẫu nhiên trên màn hình
            area: { minX: 180, maxX: 700, minY: 120, maxY: 340 } // Khu vực rải đồ vật
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 219
    219: {
        gameId: 'assemble_object',
        config: {
            finishedObject: {
                image: 'shield_complete.png',
                x: 490,
                y: 220,
                scale: 0.65
            },
            parts: [
                {
                    id: 'shield_part1', image: 'shield_part1.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 1, partOffsetY: 140
                },
                {
                    id: 'shield_part2', image: 'shield_part2.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 2, partOffsetY: 160
                },
                {
                    id: 'shield_part3', image: 'shield_part3.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 3, partOffsetY: 145
                },
                {
                    id: 'shield_part4', image: 'shield_part4.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 4, partOffsetY: 115
                },
                {
                    id: 'shield_part5', image: 'shield_part5.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 5, partOffsetY: 105
                },
                {
                    id: 'shield_part6', image: 'shield_part6.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 6, partOffsetY: 115
                }
            ]
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 220
    220: {
        gameId: 'clear_fog',
        config: {
            fogScale: 1,
            image: 'fog6.png',
            x1: 250,
            y1: 140,
            x2: 750,
            y2: 270
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 221
    221: {
        gameId: 'bubble_shooter',
        config: {
            bubble: {
                image: 'rock.png',
                scale: 0.8,
            },
            area: { minX: 150, maxX: 800, minY: 120, maxY: 320 }
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 222
    222: {
        gameId: 'assemble_object',
        config: {
            finishedObject: {
                image: 'shield_complete.png',
                x: 490,
                y: 220,
                scale: 0.65
            },
            parts: [
                {
                    id: 'shield_part1', image: 'shield_part1.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 1, partOffsetY: 140
                },
                {
                    id: 'shield_part2', image: 'shield_part2.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 2, partOffsetY: 160
                },
                {
                    id: 'shield_part3', image: 'shield_part3.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 3, partOffsetY: 145
                },
                {
                    id: 'shield_part4', image: 'shield_part4.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 4, partOffsetY: 115
                },
                {
                    id: 'shield_part5', image: 'shield_part5.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 5, partOffsetY: 105
                },
                {
                    id: 'shield_part6', image: 'shield_part6.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 6, partOffsetY: 115
                }
            ]
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 224
    224: {
        gameId: 'clear_fog',
        config: {
            fogScale: 1,
            image: 'fog2.png',
            x1: 250,
            y1: 140,
            x2: 750,
            y2: 270
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 225
    225: {
        gameId: 'rescue_animals',
        config: {
            animal: {
                image: 'rabbit.png',
                scale: 0.8,
            },
            cage: {
                image: 'cage.png',
                scale: 1,
            },
            x: 490,
            y: 230
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 226
    226: {
        gameId: 'bubble_shooter',
        config: {
            bubble: {
                image: 'pine.png',
                scale: 0.5,
            },
            area: { minX: 150, maxX: 800, minY: 120, maxY: 320 }
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 227
    227: {
        gameId: 'whack_mole',
        config: {
            hole: {
                image: 'hole.png',
                scale: 0.4,
            },
            mole: {
                image: 'mole.png',
                scale: 0.35,
                offsetX: 0,
                offsetY: -15
            },
            hammer: {
                image: 'hammer.png',
                scale: 0.4,
                offsetX: 20,
                offsetY: -50
            }
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 228
    228: {
        gameId: 'racing',
        config: {
            playerVehicle: {
                image: 'car1.png',
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
                image: 'car2.png',
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
    },
    // Tự động đồng bộ từ File 1: Lesson 229
    229: {
        gameId: 'grow_plant',
        config: {
            plant: {
                stages: [
                    { image: 'tree1.png', scale: 0.4 },
                    { image: 'tree2.png', scale: 0.3 },
                    { image: 'tree3.png', scale: 0.6 },
                    { image: 'tree4.png', scale: 0.7 },
                    { image: 'tree5.png', scale: 0.75 }
                ]
            },
            x: 490,
            y: 390
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 230
    230: {
        gameId: 'catch_insects',
        config: {
            insect: {
                image: 'ladybug.png',
                scale: 0.3,
            },
            net: {
                image: 'net.png',
                scale: 0.3,
            },
            jar: {
                image: 'jar.png',
                scale: 0.7,
            },
            jarX: 940,
            jarY: 330,
            area: { minX: 180, maxX: 700, minY: 120, maxY: 340 } // Khu vực rải đồ vật
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 231
    231: {
        gameId: 'frog_jump',
        config: {
            type: 'water',
            leaf: {
                image: 'rock.png',
                scale: 0.45,
            },
            monkey: {
                scale: 0.3,
                offsetX: -5,
                offsetY: -65
            },
            x1: 100,
            y1: 150,
            x2: 920,
            y2: 300
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 232
    232: {
        gameId: 'collect_items',
        config: {
            items: [
                { image: 'pine_nuts.png', count: 10, width: 96, height: 96 }
            ],
            container: {
                image: 'basket.png',
                x: 920,
                y: 340,
                width: 180,
                height: 180
            },
            layout: 'scatter_random', // Rải ngẫu nhiên trên màn hình
            area: { minX: 180, maxX: 700, minY: 120, maxY: 340 } // Khu vực rải đồ vật
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 233
    233: {
        gameId: 'assemble_object',
        config: {
            finishedObject: {
                image: 'shield_complete.png',
                x: 490,
                y: 220,
                scale: 0.65
            },
            parts: [
                {
                    id: 'shield_part1', image: 'shield_part1.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 1, partOffsetY: 140
                },
                {
                    id: 'shield_part2', image: 'shield_part2.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 2, partOffsetY: 160
                },
                {
                    id: 'shield_part3', image: 'shield_part3.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 3, partOffsetY: 145
                },
                {
                    id: 'shield_part4', image: 'shield_part4.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 4, partOffsetY: 115
                },
                {
                    id: 'shield_part5', image: 'shield_part5.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 5, partOffsetY: 105
                },
                {
                    id: 'shield_part6', image: 'shield_part6.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 6, partOffsetY: 115
                }
            ]
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 234
    234: {
        gameId: 'clear_fog',
        config: {
            fogScale: 1,
            image: 'fog1.png',
            x1: 250,
            y1: 140,
            x2: 750,
            y2: 270
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 235
    235: {
        gameId: 'bubble_shooter',
        config: {
            bubble: {
                image: 'wood.png',
                scale: 0.8,
            },
            area: { minX: 150, maxX: 800, minY: 120, maxY: 320 }
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 236
    236: {
        gameId: 'assemble_object',
        config: {
            finishedObject: {
                image: 'shield_complete.png',
                x: 490,
                y: 220,
                scale: 0.65
            },
            parts: [
                {
                    id: 'shield_part1', image: 'shield_part1.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 1, partOffsetY: 140
                },
                {
                    id: 'shield_part2', image: 'shield_part2.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 2, partOffsetY: 160
                },
                {
                    id: 'shield_part3', image: 'shield_part3.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 3, partOffsetY: 145
                },
                {
                    id: 'shield_part4', image: 'shield_part4.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 4, partOffsetY: 115
                },
                {
                    id: 'shield_part5', image: 'shield_part5.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 5, partOffsetY: 105
                },
                {
                    id: 'shield_part6', image: 'shield_part6.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 6, partOffsetY: 115
                }
            ]
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 238
    238: {
        gameId: 'clear_fog',
        config: {
            fogScale: 1,
            image: 'fog1.png',
            x1: 250,
            y1: 140,
            x2: 750,
            y2: 270
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 239
    239: {
        gameId: 'rescue_animals',
        config: {
            animal: {
                image: 'rabbit.png',
                scale: 0.8,
            },
            cage: {
                image: 'cage.png',
                scale: 1,
            },
            x: 490,
            y: 230
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 240
    240: {
        gameId: 'bubble_shooter',
        config: {
            bubble: {
                image: 'rock.png',
                scale: 0.8,
            },
            area: { minX: 150, maxX: 800, minY: 120, maxY: 320 }
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 241
    241: {
        gameId: 'whack_mole',
        config: {
            hole: {
                image: 'hole.png',
                scale: 0.4,
            },
            mole: {
                image: 'mole.png',
                scale: 0.35,
                offsetX: 0,
                offsetY: -15
            },
            hammer: {
                image: 'hammer.png',
                scale: 0.4,
                offsetX: 20,
                offsetY: -50
            }
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 242
    242: {
        gameId: 'racing',
        config: {
            playerVehicle: {
                image: 'car1.png',
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
                image: 'car2.png',
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
    },
    // Tự động đồng bộ từ File 1: Lesson 243
    243: {
        gameId: 'grow_plant',
        config: {
            plant: {
                stages: [
                    { image: 'tree1.png', scale: 0.4 },
                    { image: 'tree2.png', scale: 0.3 },
                    { image: 'tree3.png', scale: 0.6 },
                    { image: 'tree4.png', scale: 0.7 },
                    { image: 'tree5.png', scale: 0.75 }
                ]
            },
            x: 490,
            y: 390
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 244
    244: {
        gameId: 'catch_insects',
        config: {
            insect: {
                image: 'butterfly.png',
                scale: 0.3,
            },
            net: {
                image: 'net.png',
                scale: 0.3,
            },
            jar: {
                image: 'jar.png',
                scale: 0.7,
            },
            jarX: 940,
            jarY: 330,
            area: { minX: 180, maxX: 700, minY: 120, maxY: 340 } // Khu vực rải đồ vật
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 245
    245: {
        gameId: 'frog_jump',
        config: {
            type: 'water',
            leaf: {
                image: 'rock.png',
                scale: 0.45,
            },
            monkey: {
                scale: 0.3,
                offsetX: -5,
                offsetY: -65
            },
            x1: 100,
            y1: 150,
            x2: 920,
            y2: 300
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 246
    246: {
        gameId: 'collect_items',
        config: {
            items: [
                { image: 'grass.png', count: 10, width: 96, height: 96 }
            ],
            container: {
                image: 'basket.png',
                x: 920,
                y: 340,
                width: 180,
                height: 180
            },
            layout: 'scatter_random', // Rải ngẫu nhiên trên màn hình
            area: { minX: 180, maxX: 700, minY: 120, maxY: 340 } // Khu vực rải đồ vật
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 247
    247: {
        gameId: 'assemble_object',
        config: {
            finishedObject: {
                image: 'shield_complete.png',
                x: 490,
                y: 220,
                scale: 0.65
            },
            parts: [
                {
                    id: 'shield_part1', image: 'shield_part1.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 1, partOffsetY: 140
                },
                {
                    id: 'shield_part2', image: 'shield_part2.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 2, partOffsetY: 160
                },
                {
                    id: 'shield_part3', image: 'shield_part3.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 3, partOffsetY: 145
                },
                {
                    id: 'shield_part4', image: 'shield_part4.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 4, partOffsetY: 115
                },
                {
                    id: 'shield_part5', image: 'shield_part5.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 5, partOffsetY: 105
                },
                {
                    id: 'shield_part6', image: 'shield_part6.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 6, partOffsetY: 115
                }
            ]
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 248
    248: {
        gameId: 'clear_fog',
        config: {
            fogScale: 1,
            image: 'fog3.png',
            x1: 250,
            y1: 140,
            x2: 750,
            y2: 270
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 249
    249: {
        gameId: 'bubble_shooter',
        config: {
            bubble: {
                image: 'rock.png',
                scale: 0.8,
            },
            area: { minX: 150, maxX: 800, minY: 120, maxY: 320 }
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 250
    250: {
        gameId: 'assemble_object',
        config: {
            finishedObject: {
                image: 'shield_complete.png',
                x: 490,
                y: 220,
                scale: 0.65
            },
            parts: [
                {
                    id: 'shield_part1', image: 'shield_part1.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 1, partOffsetY: 140
                },
                {
                    id: 'shield_part2', image: 'shield_part2.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 2, partOffsetY: 160
                },
                {
                    id: 'shield_part3', image: 'shield_part3.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 3, partOffsetY: 145
                },
                {
                    id: 'shield_part4', image: 'shield_part4.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 4, partOffsetY: 115
                },
                {
                    id: 'shield_part5', image: 'shield_part5.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 5, partOffsetY: 105
                },
                {
                    id: 'shield_part6', image: 'shield_part6.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 6, partOffsetY: 115
                }
            ]
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 252
    252: {
        gameId: 'clear_fog',
        config: {
            fogScale: 1,
            image: 'fog1.png',
            x1: 250,
            y1: 140,
            x2: 750,
            y2: 270
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 253
    253: {
        gameId: 'rescue_animals',
        config: {
            animal: {
                image: 'rabbit.png',
                scale: 0.8,
            },
            cage: {
                image: 'cage.png',
                scale: 1,
            },
            x: 490,
            y: 230
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 254
    254: {
        gameId: 'bubble_shooter',
        config: {
            bubble: {
                image: 'bubble2.png',
                scale: 0.8,
            },
            area: { minX: 150, maxX: 800, minY: 120, maxY: 320 }
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 255
    255: {
        gameId: 'whack_mole',
        config: {
            hole: {
                image: 'hole.png',
                scale: 0.4,
            },
            mole: {
                image: 'snake.png',
                scale: 0.35,
                offsetX: 0,
                offsetY: -15
            },
            hammer: {
                image: 'hammer.png',
                scale: 0.4,
                offsetX: 20,
                offsetY: -50
            }
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 256
    256: {
        gameId: 'racing',
        config: {
            playerVehicle: {
                image: 'car1.png',
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
                image: 'car2.png',
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
    },
    // Tự động đồng bộ từ File 1: Lesson 257
    257: {
        gameId: 'grow_plant',
        config: {
            plant: {
                stages: [
                    { image: 'tree1.png', scale: 0.4 },
                    { image: 'tree2.png', scale: 0.3 },
                    { image: 'tree3.png', scale: 0.6 },
                    { image: 'tree4.png', scale: 0.7 },
                    { image: 'tree5.png', scale: 0.75 }
                ]
            },
            x: 490,
            y: 390
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 258
    258: {
        gameId: 'catch_insects',
        config: {
            insect: {
                image: 'firefly.png',
                scale: 0.3,
            },
            net: {
                image: 'net.png',
                scale: 0.3,
            },
            jar: {
                image: 'jar.png',
                scale: 0.7,
            },
            jarX: 940,
            jarY: 330,
            area: { minX: 180, maxX: 700, minY: 120, maxY: 340 } // Khu vực rải đồ vật
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 259
    259: {
        gameId: 'frog_jump',
        config: {
            type: 'air',
            leaf: {
                image: 'fog1.png',
                scale: 0.4,
            },
            monkey: {
                scale: 0.3,
                offsetX: -5,
                offsetY: -65
            },
            x1: 100,
            y1: 150,
            x2: 920,
            y2: 300
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 260
    260: {
        gameId: 'collect_items',
        config: {
            items: [
                { image: 'feather.png', count: 10, width: 96, height: 96 }
            ],
            container: {
                image: 'basket.png',
                x: 920,
                y: 340,
                width: 180,
                height: 180
            },
            layout: 'scatter_random', // Rải ngẫu nhiên trên màn hình
            area: { minX: 180, maxX: 700, minY: 120, maxY: 340 } // Khu vực rải đồ vật
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 261
    261: {
        gameId: 'assemble_object',
        config: {
            finishedObject: {
                image: 'shield_complete.png',
                x: 490,
                y: 220,
                scale: 0.65
            },
            parts: [
                {
                    id: 'shield_part1', image: 'shield_part1.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 1, partOffsetY: 140
                },
                {
                    id: 'shield_part2', image: 'shield_part2.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 2, partOffsetY: 160
                },
                {
                    id: 'shield_part3', image: 'shield_part3.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 3, partOffsetY: 145
                },
                {
                    id: 'shield_part4', image: 'shield_part4.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 4, partOffsetY: 115
                },
                {
                    id: 'shield_part5', image: 'shield_part5.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 5, partOffsetY: 105
                },
                {
                    id: 'shield_part6', image: 'shield_part6.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 6, partOffsetY: 115
                }
            ]
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 262
    262: {
        gameId: 'clear_fog',
        config: {
            fogScale: 1,
            image: 'fog7.png',
            x1: 250,
            y1: 140,
            x2: 750,
            y2: 270
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 263
    263: {
        gameId: 'bubble_shooter',
        config: {
            bubble: {
                image: 'rock.png',
                scale: 0.8,
            },
            area: { minX: 150, maxX: 800, minY: 120, maxY: 320 }
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 264
    264: {
        gameId: 'assemble_object',
        config: {
            finishedObject: {
                image: 'shield_complete.png',
                x: 490,
                y: 220,
                scale: 0.65
            },
            parts: [
                {
                    id: 'shield_part1', image: 'shield_part1.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 1, partOffsetY: 140
                },
                {
                    id: 'shield_part2', image: 'shield_part2.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 2, partOffsetY: 160
                },
                {
                    id: 'shield_part3', image: 'shield_part3.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 3, partOffsetY: 145
                },
                {
                    id: 'shield_part4', image: 'shield_part4.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 4, partOffsetY: 115
                },
                {
                    id: 'shield_part5', image: 'shield_part5.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 5, partOffsetY: 105
                },
                {
                    id: 'shield_part6', image: 'shield_part6.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 6, partOffsetY: 115
                }
            ]
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 266
    266: {
        gameId: 'clear_fog',
        config: {
            fogScale: 1,
            image: 'fog1.png',
            x1: 250,
            y1: 140,
            x2: 750,
            y2: 270
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 267
    267: {
        gameId: 'rescue_animals',
        config: {
            animal: {
                image: 'rabbit.png',
                scale: 0.8,
            },
            cage: {
                image: 'cage.png',
                scale: 1,
            },
            x: 490,
            y: 230
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 268
    268: {
        gameId: 'bubble_shooter',
        config: {
            bubble: {
                image: 'thunderball.png',
                scale: 0.6,
            },
            area: { minX: 150, maxX: 800, minY: 120, maxY: 320 }
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 269
    269: {
        gameId: 'whack_mole',
        config: {
            hole: {
                image: 'hole.png',
                scale: 0.4,
            },
            mole: {
                image: 'snake.png',
                scale: 0.35,
                offsetX: 0,
                offsetY: -15
            },
            hammer: {
                image: 'hammer.png',
                scale: 0.4,
                offsetX: 20,
                offsetY: -50
            }
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 270
    270: {
        gameId: 'racing',
        config: {
            playerVehicle: {
                image: 'car1.png',
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
                image: 'car2.png',
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
    },
    // Tự động đồng bộ từ File 1: Lesson 271
    271: {
        gameId: 'grow_plant',
        config: {
            plant: {
                stages: [
                    { image: 'tree1.png', scale: 0.4 },
                    { image: 'tree2.png', scale: 0.3 },
                    { image: 'tree3.png', scale: 0.6 },
                    { image: 'tree4.png', scale: 0.7 },
                    { image: 'tree5.png', scale: 0.75 }
                ]
            },
            x: 490,
            y: 390
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 272
    272: {
        gameId: 'catch_insects',
        config: {
            insect: {
                image: 'fairy.png',
                scale: 0.3,
            },
            net: {
                image: 'net.png',
                scale: 0.3,
            },
            jar: {
                image: 'jar.png',
                scale: 0.7,
            },
            jarX: 940,
            jarY: 330,
            area: { minX: 180, maxX: 700, minY: 120, maxY: 340 } // Khu vực rải đồ vật
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 273
    273: {
        gameId: 'frog_jump',
        config: {
            type: 'air',
            leaf: {
                image: 'fog1.png',
                scale: 0.4,
            },
            monkey: {
                scale: 0.3,
                offsetX: -5,
                offsetY: -65
            },
            x1: 100,
            y1: 150,
            x2: 920,
            y2: 300
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 274
    274: {
        gameId: 'collect_items',
        config: {
            items: [
                { image: 'candy_cloud.png', count: 10, width: 92, height: 92 }
            ],
            container: {
                image: 'basket.png',
                x: 920,
                y: 340,
                width: 200,
                height: 200
            },
            layout: 'scatter_random', // Rải ngẫu nhiên trên màn hình
            area: { minX: 180, maxX: 700, minY: 120, maxY: 340 } // Khu vực rải đồ vật
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 275
    275: {
        gameId: 'assemble_object',
        config: {
            finishedObject: {
                image: 'shield_complete.png',
                x: 490,
                y: 220,
                scale: 0.65
            },
            parts: [
                {
                    id: 'shield_part1', image: 'shield_part1.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 1, partOffsetY: 140
                },
                {
                    id: 'shield_part2', image: 'shield_part2.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 2, partOffsetY: 160
                },
                {
                    id: 'shield_part3', image: 'shield_part3.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 3, partOffsetY: 145
                },
                {
                    id: 'shield_part4', image: 'shield_part4.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 4, partOffsetY: 115
                },
                {
                    id: 'shield_part5', image: 'shield_part5.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 5, partOffsetY: 105
                },
                {
                    id: 'shield_part6', image: 'shield_part6.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 6, partOffsetY: 115
                }
            ]
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 276
    276: {
        gameId: 'clear_fog',
        config: {
            fogScale: 1,
            image: 'fog2.png',
            x1: 250,
            y1: 140,
            x2: 750,
            y2: 270
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 277
    277: {
        gameId: 'bubble_shooter',
        config: {
            bubble: {
                image: 'ice.png',
                scale: 0.7,
            },
            area: { minX: 150, maxX: 800, minY: 120, maxY: 320 }
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 278
    278: {
        gameId: 'assemble_object',
        config: {
            finishedObject: {
                image: 'shield_complete.png',
                x: 490,
                y: 220,
                scale: 0.65
            },
            parts: [
                {
                    id: 'shield_part1', image: 'shield_part1.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 1, partOffsetY: 140
                },
                {
                    id: 'shield_part2', image: 'shield_part2.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 2, partOffsetY: 160
                },
                {
                    id: 'shield_part3', image: 'shield_part3.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 3, partOffsetY: 145
                },
                {
                    id: 'shield_part4', image: 'shield_part4.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 4, partOffsetY: 115
                },
                {
                    id: 'shield_part5', image: 'shield_part5.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 5, partOffsetY: 105
                },
                {
                    id: 'shield_part6', image: 'shield_part6.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 6, partOffsetY: 115
                }
            ]
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 280
    280: {
        gameId: 'clear_fog',
        config: {
            fogScale: 1,
            image: 'fog8.png',
            x1: 250,
            y1: 140,
            x2: 750,
            y2: 270
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 281
    281: {
        gameId: 'rescue_animals',
        config: {
            animal: {
                image: 'rabbit.png',
                scale: 0.8,
            },
            cage: {
                image: 'cage.png',
                scale: 1,
            },
            x: 490,
            y: 230
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 282
    282: {
        gameId: 'bubble_shooter',
        config: {
            bubble: {
                image: 'snowball.png',
                scale: 0.6,
            },
            area: { minX: 150, maxX: 800, minY: 120, maxY: 320 }
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 283
    283: {
        gameId: 'whack_mole',
        config: {
            hole: {
                image: 'hole.png',
                scale: 0.4,
            },
            mole: {
                image: 'mole.png',
                scale: 0.35,
                offsetX: 0,
                offsetY: -15
            },
            hammer: {
                image: 'hammer.png',
                scale: 0.4,
                offsetX: 20,
                offsetY: -50
            }
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 284
    284: {
        gameId: 'racing',
        config: {
            playerVehicle: {
                image: 'car1.png',
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
                image: 'car2.png',
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
    },
    // Tự động đồng bộ từ File 1: Lesson 285
    285: {
        gameId: 'grow_plant',
        config: {
            plant: {
                stages: [
                    { image: 'tree1.png', scale: 0.4 },
                    { image: 'tree2.png', scale: 0.3 },
                    { image: 'tree3.png', scale: 0.6 },
                    { image: 'tree4.png', scale: 0.7 },
                    { image: 'tree5.png', scale: 0.75 }
                ]
            },
            x: 490,
            y: 390
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 286
    286: {
        gameId: 'catch_insects',
        config: {
            insect: {
                image: 'fairy.png',
                scale: 0.3,
            },
            net: {
                image: 'net.png',
                scale: 0.3,
            },
            jar: {
                image: 'jar.png',
                scale: 0.7,
            },
            jarX: 940,
            jarY: 330,
            area: { minX: 180, maxX: 700, minY: 120, maxY: 340 } // Khu vực rải đồ vật
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 287
    287: {
        gameId: 'frog_jump',
        config: {
            type: 'water',
            leaf: {
                image: 'iceberg.png',
                scale: 0.4,
            },
            monkey: {
                scale: 0.3,
                offsetX: -5,
                offsetY: -65
            },
            x1: 100,
            y1: 150,
            x2: 920,
            y2: 300
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 288
    288: {
        gameId: 'collect_items',
        config: {
            items: [
                { image: 'strawberry.png', count: 10, width: 96, height: 96 }
            ],
            container: {
                image: 'basket.png',
                x: 920,
                y: 340,
                width: 180,
                height: 180
            },
            layout: 'scatter_random', // Rải ngẫu nhiên trên màn hình
            area: { minX: 180, maxX: 700, minY: 120, maxY: 340 } // Khu vực rải đồ vật
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 289
    289: {
        gameId: 'assemble_object',
        config: {
            finishedObject: {
                image: 'shield_complete.png',
                x: 490,
                y: 220,
                scale: 0.65
            },
            parts: [
                {
                    id: 'shield_part1', image: 'shield_part1.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 1, partOffsetY: 140
                },
                {
                    id: 'shield_part2', image: 'shield_part2.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 2, partOffsetY: 160
                },
                {
                    id: 'shield_part3', image: 'shield_part3.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 3, partOffsetY: 145
                },
                {
                    id: 'shield_part4', image: 'shield_part4.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 4, partOffsetY: 115
                },
                {
                    id: 'shield_part5', image: 'shield_part5.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 5, partOffsetY: 105
                },
                {
                    id: 'shield_part6', image: 'shield_part6.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 6, partOffsetY: 115
                }
            ]
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 290
    290: {
        gameId: 'clear_fog',
        config: {
            fogScale: 1,
            image: 'fog8.png',
            x1: 250,
            y1: 140,
            x2: 750,
            y2: 270
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 291
    291: {
        gameId: 'bubble_shooter',
        config: {
            bubble: {
                image: 'ice.png',
                scale: 0.6,
            },
            area: { minX: 150, maxX: 800, minY: 120, maxY: 320 }
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 292
    292: {
        gameId: 'assemble_object',
        config: {
            finishedObject: {
                image: 'shield_complete.png',
                x: 490,
                y: 220,
                scale: 0.65
            },
            parts: [
                {
                    id: 'shield_part1', image: 'shield_part1.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 1, partOffsetY: 140
                },
                {
                    id: 'shield_part2', image: 'shield_part2.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 2, partOffsetY: 160
                },
                {
                    id: 'shield_part3', image: 'shield_part3.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 3, partOffsetY: 145
                },
                {
                    id: 'shield_part4', image: 'shield_part4.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 4, partOffsetY: 115
                },
                {
                    id: 'shield_part5', image: 'shield_part5.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 5, partOffsetY: 105
                },
                {
                    id: 'shield_part6', image: 'shield_part6.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 6, partOffsetY: 115
                }
            ]
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 294
    294: {
        gameId: 'clear_fog',
        config: {
            fogScale: 1,
            image: 'fog2.png',
            x1: 250,
            y1: 140,
            x2: 750,
            y2: 270
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 295
    295: {
        gameId: 'rescue_animals',
        config: {
            animal: {
                image: 'rabbit.png',
                scale: 0.8,
            },
            cage: {
                image: 'cage.png',
                scale: 1,
            },
            x: 490,
            y: 230
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 296
    296: {
        gameId: 'bubble_shooter',
        config: {
            bubble: {
                image: 'bubble2.png',
                scale: 0.8,
            },
            area: { minX: 150, maxX: 800, minY: 120, maxY: 320 }
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 297
    297: {
        gameId: 'whack_mole',
        config: {
            hole: {
                image: 'hole.png',
                scale: 0.4,
            },
            mole: {
                image: 'devilbat.png',
                scale: 0.4,
                offsetX: 0,
                offsetY: -15
            },
            hammer: {
                image: 'hammer.png',
                scale: 0.4,
                offsetX: 20,
                offsetY: -50
            }
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 298
    298: {
        gameId: 'racing',
        config: {
            playerVehicle: {
                image: 'car1.png',
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
                image: 'car2.png',
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
    },
    // Tự động đồng bộ từ File 1: Lesson 299
    299: {
        gameId: 'grow_plant',
        config: {
            plant: {
                stages: [
                    { image: 'tree1.png', scale: 0.4 },
                    { image: 'tree2.png', scale: 0.3 },
                    { image: 'tree3.png', scale: 0.6 },
                    { image: 'tree4.png', scale: 0.7 },
                    { image: 'tree5.png', scale: 0.75 }
                ]
            },
            x: 490,
            y: 390
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 300
    300: {
        gameId: 'catch_insects',
        config: {
            insect: {
                image: 'firefly.png',
                scale: 0.3,
            },
            net: {
                image: 'net.png',
                scale: 0.3,
            },
            jar: {
                image: 'jar.png',
                scale: 0.7,
            },
            jarX: 940,
            jarY: 330,
            area: { minX: 180, maxX: 700, minY: 120, maxY: 340 } // Khu vực rải đồ vật
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 301
    301: {
        gameId: 'frog_jump',
        config: {
            type: 'air',
            leaf: {
                image: 'iceberg.png',
                scale: 0.4,
            },
            monkey: {
                scale: 0.3,
                offsetX: -5,
                offsetY: -65
            },
            x1: 100,
            y1: 150,
            x2: 920,
            y2: 300
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 302
    302: {
        gameId: 'collect_items',
        config: {
            items: [
                { image: 'waterdrop.png', count: 10, width: 96, height: 96 }
            ],
            container: {
                image: 'basket.png',
                x: 920,
                y: 340,
                width: 180,
                height: 180
            },
            layout: 'scatter_random', // Rải ngẫu nhiên trên màn hình
            area: { minX: 180, maxX: 700, minY: 120, maxY: 340 } // Khu vực rải đồ vật
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 303
    303: {
        gameId: 'assemble_object',
        config: {
            finishedObject: {
                image: 'shield_complete.png',
                x: 490,
                y: 220,
                scale: 0.65
            },
            parts: [
                {
                    id: 'shield_part1', image: 'shield_part1.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 1, partOffsetY: 140
                },
                {
                    id: 'shield_part2', image: 'shield_part2.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 2, partOffsetY: 160
                },
                {
                    id: 'shield_part3', image: 'shield_part3.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 3, partOffsetY: 145
                },
                {
                    id: 'shield_part4', image: 'shield_part4.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 4, partOffsetY: 115
                },
                {
                    id: 'shield_part5', image: 'shield_part5.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 5, partOffsetY: 105
                },
                {
                    id: 'shield_part6', image: 'shield_part6.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 6, partOffsetY: 115
                }
            ]
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 304
    304: {
        gameId: 'clear_fog',
        config: {
            fogScale: 1,
            image: 'fog2.png',
            x1: 250,
            y1: 140,
            x2: 750,
            y2: 270
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 305
    305: {
        gameId: 'bubble_shooter',
        config: {
            bubble: {
                image: 'scythe.png',
                scale: 0.6,
            },
            area: { minX: 150, maxX: 800, minY: 120, maxY: 320 }
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 306
    306: {
        gameId: 'assemble_object',
        config: {
            finishedObject: {
                image: 'shield_complete.png',
                x: 490,
                y: 220,
                scale: 0.65
            },
            parts: [
                {
                    id: 'shield_part1', image: 'shield_part1.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 1, partOffsetY: 140
                },
                {
                    id: 'shield_part2', image: 'shield_part2.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 2, partOffsetY: 160
                },
                {
                    id: 'shield_part3', image: 'shield_part3.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 3, partOffsetY: 145
                },
                {
                    id: 'shield_part4', image: 'shield_part4.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 4, partOffsetY: 115
                },
                {
                    id: 'shield_part5', image: 'shield_part5.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 5, partOffsetY: 105
                },
                {
                    id: 'shield_part6', image: 'shield_part6.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 6, partOffsetY: 115
                }
            ]
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 308
    308: {
        gameId: 'clear_fog',
        config: {
            fogScale: 1,
            image: 'fog2.png',
            x1: 250,
            y1: 140,
            x2: 750,
            y2: 270
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 309
    309: {
        gameId: 'rescue_animals',
        config: {
            animal: {
                image: 'rabbit.png',
                scale: 0.8,
            },
            cage: {
                image: 'cage.png',
                scale: 1,
            },
            x: 490,
            y: 230
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 310
    310: {
        gameId: 'bubble_shooter',
        config: {
            bubble: {
                image: 'bubble2.png',
                scale: 0.8,
            },
            area: { minX: 150, maxX: 800, minY: 120, maxY: 320 }
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 311
    311: {
        gameId: 'whack_mole',
        config: {
            hole: {
                image: 'hole.png',
                scale: 0.4,
            },
            mole: {
                image: 'devilbat.png',
                scale: 0.4,
                offsetX: 0,
                offsetY: -15
            },
            hammer: {
                image: 'hammer.png',
                scale: 0.4,
                offsetX: 20,
                offsetY: -50
            }
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 312
    312: {
        gameId: 'racing',
        config: {
            playerVehicle: {
                image: 'car1.png',
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
                image: 'car2.png',
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
    },
    // Tự động đồng bộ từ File 1: Lesson 313
    313: {
        gameId: 'grow_plant',
        config: {
            plant: {
                stages: [
                    { image: 'flower_tree1.png', scale: 0.7 },
                    { image: 'flower_tree2.png', scale: 0.7 },
                    { image: 'flower_tree3.png', scale: 0.7 },
                    { image: 'flower_tree4.png', scale: 0.7 },
                    { image: 'flower_tree6.png', scale: 0.7 }
                ]
            },
            x: 490,
            y: 390
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 314
    314: {
        gameId: 'catch_insects',
        config: {
            insect: {
                image: 'fairy.png',
                scale: 0.3,
            },
            net: {
                image: 'net.png',
                scale: 0.3,
            },
            jar: {
                image: 'jar.png',
                scale: 0.7,
            },
            jarX: 940,
            jarY: 330,
            area: { minX: 180, maxX: 700, minY: 120, maxY: 340 } // Khu vực rải đồ vật
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 315
    315: {
        gameId: 'frog_jump',
        config: {
            type: 'air',
            leaf: {
                image: 'planet.png',
                scale: 0.4,
            },
            monkey: {
                scale: 0.3,
                offsetX: 0,
                offsetY: -80
            },
            x1: 100,
            y1: 150,
            x2: 920,
            y2: 300
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 316
    316: {
        gameId: 'collect_items',
        config: {
            items: [
                { image: 'crystal.png', count: 10, width: 96, height: 96 }
            ],
            container: {
                image: 'basket.png',
                x: 920,
                y: 340,
                width: 180,
                height: 180
            },
            layout: 'scatter_random', // Rải ngẫu nhiên trên màn hình
            area: { minX: 180, maxX: 700, minY: 120, maxY: 340 } // Khu vực rải đồ vật
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 317
    317: {
        gameId: 'assemble_object',
        config: {
            finishedObject: {
                image: 'shield_complete.png',
                x: 490,
                y: 220,
                scale: 0.65
            },
            parts: [
                {
                    id: 'shield_part1', image: 'shield_part1.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 1, partOffsetY: 140
                },
                {
                    id: 'shield_part2', image: 'shield_part2.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 2, partOffsetY: 160
                },
                {
                    id: 'shield_part3', image: 'shield_part3.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 3, partOffsetY: 145
                },
                {
                    id: 'shield_part4', image: 'shield_part4.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 4, partOffsetY: 115
                },
                {
                    id: 'shield_part5', image: 'shield_part5.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 5, partOffsetY: 105
                },
                {
                    id: 'shield_part6', image: 'shield_part6.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 6, partOffsetY: 115
                }
            ]
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 318
    318: {
        gameId: 'clear_fog',
        config: {
            fogScale: 1,
            image: 'fog7.png',
            x1: 250,
            y1: 140,
            x2: 750,
            y2: 270
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 319
    319: {
        gameId: 'bubble_shooter',
        config: {
            bubble: {
                image: 'meteorite.png',
                scale: 0.8,
                randomAngle: false
            },
            area: { minX: 150, maxX: 800, minY: 120, maxY: 320 }
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 320
    320: {
        gameId: 'assemble_object',
        config: {
            finishedObject: {
                image: 'shield_complete.png',
                x: 490,
                y: 220,
                scale: 0.65
            },
            parts: [
                {
                    id: 'shield_part1', image: 'shield_part1.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 1, partOffsetY: 140
                },
                {
                    id: 'shield_part2', image: 'shield_part2.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 2, partOffsetY: 160
                },
                {
                    id: 'shield_part3', image: 'shield_part3.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 3, partOffsetY: 145
                },
                {
                    id: 'shield_part4', image: 'shield_part4.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 4, partOffsetY: 115
                },
                {
                    id: 'shield_part5', image: 'shield_part5.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 5, partOffsetY: 105
                },
                {
                    id: 'shield_part6', image: 'shield_part6.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 6, partOffsetY: 115
                }
            ]
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 322
    322: {
        gameId: 'clear_fog',
        config: {
            fogScale: 1,
            image: 'fog2.png',
            x1: 250,
            y1: 140,
            x2: 750,
            y2: 270
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 323
    323: {
        gameId: 'rescue_animals',
        config: {
            animal: {
                image: 'rabbit.png',
                scale: 0.8,
            },
            cage: {
                image: 'cage.png',
                scale: 1,
            },
            x: 490,
            y: 230
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 324
    324: {
        gameId: 'bubble_shooter',
        config: {
            bubble: {
                image: 'bubble.png',
                scale: 0.8,
            },
            area: { minX: 150, maxX: 800, minY: 120, maxY: 320 }
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 325
    325: {
        gameId: 'whack_mole',
        config: {
            hole: {
                image: 'hole.png',
                scale: 0.4,
            },
            mole: {
                image: 'devilbat.png',
                scale: 0.4,
                offsetX: 0,
                offsetY: -15
            },
            hammer: {
                image: 'hammer.png',
                scale: 0.4,
                offsetX: 20,
                offsetY: -50
            }
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 326
    326: {
        gameId: 'racing',
        config: {
            playerVehicle: {
                image: 'car1.png',
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
                image: 'car2.png',
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
    },
    // Tự động đồng bộ từ File 1: Lesson 327
    327: {
        gameId: 'grow_plant',
        config: {
            plant: {
                stages: [
                    { image: 'flower_tree1.png', scale: 0.7 },
                    { image: 'flower_tree2.png', scale: 0.7 },
                    { image: 'flower_tree3.png', scale: 0.7 },
                    { image: 'flower_tree4.png', scale: 0.7 },
                    { image: 'flower_tree6.png', scale: 0.7 }
                ]
            },
            x: 490,
            y: 390
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 328
    328: {
        gameId: 'catch_insects',
        config: {
            insect: {
                image: 'butterfly.png',
                scale: 0.3,
            },
            net: {
                image: 'net.png',
                scale: 0.3,
            },
            jar: {
                image: 'jar.png',
                scale: 0.7,
            },
            jarX: 940,
            jarY: 330,
            area: { minX: 180, maxX: 700, minY: 120, maxY: 340 } // Khu vực rải đồ vật
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 329
    329: {
        gameId: 'frog_jump',
        config: {
            type: 'water',
            leaf: {
                image: 'wood.png',
                scale: 0.5,
            },
            monkey: {
                scale: 0.3,
                offsetX: 0,
                offsetY: -70
            },
            x1: 100,
            y1: 150,
            x2: 920,
            y2: 300
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 330
    330: {
        gameId: 'collect_items',
        config: {
            items: [
                { image: 'stone.png', count: 10, width: 96, height: 96 }
            ],
            container: {
                image: 'basket.png',
                x: 920,
                y: 340,
                width: 180,
                height: 180
            },
            layout: 'scatter_random', // Rải ngẫu nhiên trên màn hình
            area: { minX: 180, maxX: 700, minY: 120, maxY: 340 } // Khu vực rải đồ vật
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 331
    331: {
        gameId: 'assemble_object',
        config: {
            finishedObject: {
                image: 'shield_complete.png',
                x: 490,
                y: 220,
                scale: 0.65
            },
            parts: [
                {
                    id: 'shield_part1', image: 'shield_part1.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 1, partOffsetY: 140
                },
                {
                    id: 'shield_part2', image: 'shield_part2.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 2, partOffsetY: 160
                },
                {
                    id: 'shield_part3', image: 'shield_part3.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 3, partOffsetY: 145
                },
                {
                    id: 'shield_part4', image: 'shield_part4.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 4, partOffsetY: 115
                },
                {
                    id: 'shield_part5', image: 'shield_part5.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 5, partOffsetY: 105
                },
                {
                    id: 'shield_part6', image: 'shield_part6.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 6, partOffsetY: 115
                }
            ]
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 332
    332: {
        gameId: 'clear_fog',
        config: {
            fogScale: 1,
            image: 'fog2.png',
            x1: 250,
            y1: 140,
            x2: 750,
            y2: 270
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 333
    333: {
        gameId: 'bubble_shooter',
        config: {
            bubble: {
                image: 'urchin.png',
                scale: 0.8,
            },
            area: { minX: 150, maxX: 800, minY: 120, maxY: 320 }
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 334
    334: {
        gameId: 'assemble_object',
        config: {
            finishedObject: {
                image: 'shield_complete.png',
                x: 490,
                y: 220,
                scale: 0.65
            },
            parts: [
                {
                    id: 'shield_part1', image: 'shield_part1.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 1, partOffsetY: 140
                },
                {
                    id: 'shield_part2', image: 'shield_part2.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 2, partOffsetY: 160
                },
                {
                    id: 'shield_part3', image: 'shield_part3.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 3, partOffsetY: 145
                },
                {
                    id: 'shield_part4', image: 'shield_part4.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 4, partOffsetY: 115
                },
                {
                    id: 'shield_part5', image: 'shield_part5.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 5, partOffsetY: 105
                },
                {
                    id: 'shield_part6', image: 'shield_part6.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 6, partOffsetY: 115
                }
            ]
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 336
    336: {
        gameId: 'clear_fog',
        config: {
            fogScale: 1,
            image: 'fog2.png',
            x1: 250,
            y1: 140,
            x2: 750,
            y2: 270
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 337
    337: {
        gameId: 'rescue_animals',
        config: {
            animal: {
                image: 'rabbit.png',
                scale: 0.8,
            },
            cage: {
                image: 'cage.png',
                scale: 1,
            },
            x: 490,
            y: 230
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 338
    338: {
        gameId: 'bubble_shooter',
        config: {
            bubble: {
                image: 'bubble2.png',
                scale: 0.8,
            },
            area: { minX: 150, maxX: 800, minY: 120, maxY: 320 }
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 339
    339: {
        gameId: 'whack_mole',
        config: {
            hole: {
                image: 'hole.png',
                scale: 0.4,
            },
            mole: {
                image: 'spider.png',
                scale: 0.4,
                offsetX: 0,
                offsetY: -15
            },
            hammer: {
                image: 'hammer.png',
                scale: 0.4,
                offsetX: 20,
                offsetY: -50
            }
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 340
    340: {
        gameId: 'racing',
        config: {
            playerVehicle: {
                image: 'car1.png',
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
                image: 'car2.png',
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
    },
    // Tự động đồng bộ từ File 1: Lesson 341
    341: {
        gameId: 'grow_plant',
        config: {
            plant: {
                stages: [
                    { image: 'flower_tree1.png', scale: 0.7 },
                    { image: 'flower_tree2.png', scale: 0.7 },
                    { image: 'flower_tree3.png', scale: 0.7 },
                    { image: 'flower_tree4.png', scale: 0.7 },
                    { image: 'flower_tree5.png', scale: 0.7 }
                ]
            },
            x: 490,
            y: 390
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 342
    342: {
        gameId: 'catch_insects',
        config: {
            insect: {
                image: 'firefly.png',
                scale: 0.3,
            },
            net: {
                image: 'net.png',
                scale: 0.3,
            },
            jar: {
                image: 'jar.png',
                scale: 0.7,
            },
            jarX: 940,
            jarY: 330,
            area: { minX: 180, maxX: 700, minY: 120, maxY: 340 } // Khu vực rải đồ vật
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 343
    343: {
        gameId: 'frog_jump',
        config: {
            type: 'water',
            leaf: {
                image: 'flower3.png',
                scale: 0.5,
            },
            monkey: {
                scale: 0.3,
                offsetX: 0,
                offsetY: -65
            },
            x1: 100,
            y1: 150,
            x2: 920,
            y2: 300
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 344
    344: {
        gameId: 'collect_items',
        config: {
            items: [
                { image: 'crystal.png', count: 10, width: 96, height: 96 }
            ],
            container: {
                image: 'basket.png',
                x: 920,
                y: 340,
                width: 180,
                height: 180
            },
            layout: 'scatter_random', // Rải ngẫu nhiên trên màn hình
            area: { minX: 180, maxX: 700, minY: 120, maxY: 340 } // Khu vực rải đồ vật
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 345
    345: {
        gameId: 'assemble_object',
        config: {
            finishedObject: {
                image: 'shield_complete.png',
                x: 490,
                y: 220,
                scale: 0.65
            },
            parts: [
                {
                    id: 'shield_part1', image: 'shield_part1.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 1, partOffsetY: 140
                },
                {
                    id: 'shield_part2', image: 'shield_part2.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 2, partOffsetY: 160
                },
                {
                    id: 'shield_part3', image: 'shield_part3.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 3, partOffsetY: 145
                },
                {
                    id: 'shield_part4', image: 'shield_part4.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 4, partOffsetY: 115
                },
                {
                    id: 'shield_part5', image: 'shield_part5.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 5, partOffsetY: 105
                },
                {
                    id: 'shield_part6', image: 'shield_part6.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 6, partOffsetY: 115
                }
            ]
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 346
    346: {
        gameId: 'clear_fog',
        config: {
            fogScale: 1,
            image: 'fog7.png',
            x1: 250,
            y1: 140,
            x2: 750,
            y2: 270
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 347
    347: {
        gameId: 'bubble_shooter',
        config: {
            bubble: {
                image: 'meteorite.png',
                scale: 0.6,
                randomAngle: false
            },
            area: { minX: 150, maxX: 800, minY: 120, maxY: 320 }
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 348
    348: {
        gameId: 'assemble_object',
        config: {
            finishedObject: {
                image: 'shield_complete.png',
                x: 490,
                y: 220,
                scale: 0.65
            },
            parts: [
                {
                    id: 'shield_part1', image: 'shield_part1.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 1, partOffsetY: 140
                },
                {
                    id: 'shield_part2', image: 'shield_part2.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 2, partOffsetY: 160
                },
                {
                    id: 'shield_part3', image: 'shield_part3.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 3, partOffsetY: 145
                },
                {
                    id: 'shield_part4', image: 'shield_part4.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 4, partOffsetY: 115
                },
                {
                    id: 'shield_part5', image: 'shield_part5.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 5, partOffsetY: 105
                },
                {
                    id: 'shield_part6', image: 'shield_part6.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 6, partOffsetY: 115
                }
            ]
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 350
    350: {
        gameId: 'clear_fog',
        config: {
            fogScale: 1,
            image: 'fog3.png',
            x1: 250,
            y1: 140,
            x2: 750,
            y2: 270
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 351
    351: {
        gameId: 'rescue_animals',
        config: {
            animal: {
                image: 'rabbit.png',
                scale: 0.8,
            },
            cage: {
                image: 'cage.png',
                scale: 1,
            },
            x: 490,
            y: 230
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 352
    352: {
        gameId: 'bubble_shooter',
        config: {
            bubble: {
                image: 'bubble.png',
                scale: 0.8,
            },
            area: { minX: 150, maxX: 800, minY: 120, maxY: 320 }
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 353
    353: {
        gameId: 'whack_mole',
        config: {
            hole: {
                image: 'hole.png',
                scale: 0.4,
            },
            mole: {
                image: 'demon.png',
                scale: 0.4,
                offsetX: 0,
                offsetY: -25
            },
            hammer: {
                image: 'hammer.png',
                scale: 0.4,
                offsetX: 20,
                offsetY: -50
            }
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 354
    354: {
        gameId: 'racing',
        config: {
            playerVehicle: {
                image: 'car1.png',
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
                image: 'car2.png',
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
    },
    // Tự động đồng bộ từ File 1: Lesson 355
    355: {
        gameId: 'grow_plant',
        config: {
            plant: {
                stages: [
                    { image: 'flower_tree1.png', scale: 0.7 },
                    { image: 'flower_tree2.png', scale: 0.7 },
                    { image: 'flower_tree3.png', scale: 0.7 },
                    { image: 'flower_tree4.png', scale: 0.7 },
                    { image: 'flower_tree6.png', scale: 0.7 }
                ]
            },
            x: 490,
            y: 390
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 356
    356: {
        gameId: 'catch_insects',
        config: {
            insect: {
                image: 'butterfly.png',
                scale: 0.3,
            },
            net: {
                image: 'net.png',
                scale: 0.3,
            },
            jar: {
                image: 'jar.png',
                scale: 0.7,
            },
            jarX: 940,
            jarY: 330,
            area: { minX: 180, maxX: 700, minY: 120, maxY: 340 } // Khu vực rải đồ vật
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 357
    357: {
        gameId: 'frog_jump',
        config: {
            type: 'air',
            leaf: {
                image: 'planet.png',
                scale: 0.4,
            },
            monkey: {
                scale: 0.3,
                offsetX: 0,
                offsetY: -80
            },
            x1: 100,
            y1: 150,
            x2: 920,
            y2: 300
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 358
    358: {
        gameId: 'collect_items',
        config: {
            items: [
                { image: 'crystal.png', count: 10, width: 96, height: 96 }
            ],
            container: {
                image: 'basket.png',
                x: 920,
                y: 340,
                width: 180,
                height: 180
            },
            layout: 'scatter_random', // Rải ngẫu nhiên trên màn hình
            area: { minX: 180, maxX: 700, minY: 120, maxY: 340 } // Khu vực rải đồ vật
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 359
    359: {
        gameId: 'assemble_object',
        config: {
            finishedObject: {
                image: 'shield_complete.png',
                x: 490,
                y: 220,
                scale: 0.65
            },
            parts: [
                {
                    id: 'shield_part1', image: 'shield_part1.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 1, partOffsetY: 140
                },
                {
                    id: 'shield_part2', image: 'shield_part2.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 2, partOffsetY: 160
                },
                {
                    id: 'shield_part3', image: 'shield_part3.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 3, partOffsetY: 145
                },
                {
                    id: 'shield_part4', image: 'shield_part4.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 4, partOffsetY: 115
                },
                {
                    id: 'shield_part5', image: 'shield_part5.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 5, partOffsetY: 105
                },
                {
                    id: 'shield_part6', image: 'shield_part6.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 6, partOffsetY: 115
                }
            ]
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 360
    360: {
        gameId: 'clear_fog',
        config: {
            fogScale: 1,
            image: 'fog1.png',
            x1: 250,
            y1: 140,
            x2: 750,
            y2: 270
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 361
    361: {
        gameId: 'bubble_shooter',
        config: {
            bubble: {
                image: 'bolide.png',
                scale: 0.8,
                randomAngle: false
            },
            area: { minX: 150, maxX: 800, minY: 120, maxY: 320 }
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 362
    362: {
        gameId: 'assemble_object',
        config: {
            finishedObject: {
                image: 'shield_complete.png',
                x: 490,
                y: 220,
                scale: 0.65
            },
            parts: [
                {
                    id: 'shield_part1', image: 'shield_part1.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 1, partOffsetY: 140
                },
                {
                    id: 'shield_part2', image: 'shield_part2.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 2, partOffsetY: 160
                },
                {
                    id: 'shield_part3', image: 'shield_part3.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 3, partOffsetY: 145
                },
                {
                    id: 'shield_part4', image: 'shield_part4.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 4, partOffsetY: 115
                },
                {
                    id: 'shield_part5', image: 'shield_part5.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 5, partOffsetY: 105
                },
                {
                    id: 'shield_part6', image: 'shield_part6.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 6, partOffsetY: 115
                }
            ]
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 364
    364: {
        gameId: 'clear_fog',
        config: {
            fogScale: 1,
            image: 'fog2.png',
            x1: 250,
            y1: 140,
            x2: 750,
            y2: 270
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 365
    365: {
        gameId: 'rescue_animals',
        config: {
            animal: {
                image: 'rabbit.png',
                scale: 0.8,
            },
            cage: {
                image: 'cage.png',
                scale: 1,
            },
            x: 490,
            y: 230
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 366
    366: {
        gameId: 'bubble_shooter',
        config: {
            bubble: {
                image: 'bubble2.png',
                scale: 0.8,
            },
            area: { minX: 150, maxX: 800, minY: 120, maxY: 320 }
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 367
    367: {
        gameId: 'whack_mole',
        config: {
            hole: {
                image: 'hole.png',
                scale: 0.4,
            },
            mole: {
                image: 'devilbat.png',
                scale: 0.4,
                offsetX: 0,
                offsetY: -15
            },
            hammer: {
                image: 'hammer.png',
                scale: 0.4,
                offsetX: 20,
                offsetY: -50
            }
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 368
    368: {
        gameId: 'racing',
        config: {
            playerVehicle: {
                image: 'car1.png',
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
                image: 'car2.png',
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
    },
    // Tự động đồng bộ từ File 1: Lesson 369
    369: {
        gameId: 'grow_plant',
        config: {
            plant: {
                stages: [
                    { image: 'flower_tree1.png', scale: 0.7 },
                    { image: 'flower_tree2.png', scale: 0.7 },
                    { image: 'flower_tree3.png', scale: 0.7 },
                    { image: 'flower_tree4.png', scale: 0.7 },
                    { image: 'flower_tree6.png', scale: 0.7 }
                ]
            },
            x: 490,
            y: 390
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 370
    370: {
        gameId: 'catch_insects',
        config: {
            insect: {
                image: 'fairy.png',
                scale: 0.3,
            },
            net: {
                image: 'net.png',
                scale: 0.3,
            },
            jar: {
                image: 'jar.png',
                scale: 0.7,
            },
            jarX: 940,
            jarY: 330,
            area: { minX: 180, maxX: 700, minY: 120, maxY: 340 } // Khu vực rải đồ vật
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 371
    371: {
        gameId: 'frog_jump',
        config: {
            type: 'air',
            leaf: {
                image: 'planet.png',
                scale: 0.4,
            },
            monkey: {
                scale: 0.3,
                offsetX: 0,
                offsetY: -80
            },
            x1: 100,
            y1: 150,
            x2: 920,
            y2: 300
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 372
    372: {
        gameId: 'collect_items',
        config: {
            items: [
                { image: 'crystal.png', count: 10, width: 96, height: 96 }
            ],
            container: {
                image: 'basket.png',
                x: 920,
                y: 340,
                width: 180,
                height: 180
            },
            layout: 'scatter_random', // Rải ngẫu nhiên trên màn hình
            area: { minX: 180, maxX: 700, minY: 120, maxY: 340 } // Khu vực rải đồ vật
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 373
    373: {
        gameId: 'assemble_object',
        config: {
            finishedObject: {
                image: 'shield_complete.png',
                x: 490,
                y: 220,
                scale: 0.65
            },
            parts: [
                {
                    id: 'shield_part1', image: 'shield_part1.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 1, partOffsetY: 140
                },
                {
                    id: 'shield_part2', image: 'shield_part2.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 2, partOffsetY: 160
                },
                {
                    id: 'shield_part3', image: 'shield_part3.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 3, partOffsetY: 145
                },
                {
                    id: 'shield_part4', image: 'shield_part4.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 4, partOffsetY: 115
                },
                {
                    id: 'shield_part5', image: 'shield_part5.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 5, partOffsetY: 105
                },
                {
                    id: 'shield_part6', image: 'shield_part6.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 6, partOffsetY: 115
                }
            ]
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 374
    374: {
        gameId: 'clear_fog',
        config: {
            fogScale: 1,
            image: 'fog6.png',
            x1: 250,
            y1: 140,
            x2: 750,
            y2: 270
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 375
    375: {
        gameId: 'bubble_shooter',
        config: {
            bubble: {
                image: 'bolide.png',
                scale: 0.8,
                randomAngle: false
            },
            area: { minX: 150, maxX: 800, minY: 120, maxY: 320 }
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 376
    376: {
        gameId: 'assemble_object',
        config: {
            finishedObject: {
                image: 'shield_complete.png',
                x: 490,
                y: 220,
                scale: 0.65
            },
            parts: [
                {
                    id: 'shield_part1', image: 'shield_part1.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 1, partOffsetY: 140
                },
                {
                    id: 'shield_part2', image: 'shield_part2.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 2, partOffsetY: 160
                },
                {
                    id: 'shield_part3', image: 'shield_part3.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 3, partOffsetY: 145
                },
                {
                    id: 'shield_part4', image: 'shield_part4.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 4, partOffsetY: 115
                },
                {
                    id: 'shield_part5', image: 'shield_part5.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 5, partOffsetY: 105
                },
                {
                    id: 'shield_part6', image: 'shield_part6.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 6, partOffsetY: 115
                }
            ]
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 378
    378: {
        gameId: 'clear_fog',
        config: {
            fogScale: 1,
            image: 'fog2.png',
            x1: 250,
            y1: 140,
            x2: 750,
            y2: 270
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 379
    379: {
        gameId: 'rescue_animals',
        config: {
            animal: {
                image: 'rabbit.png',
                scale: 0.8,
            },
            cage: {
                image: 'cage.png',
                scale: 1,
            },
            x: 490,
            y: 230
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 380
    380: {
        gameId: 'bubble_shooter',
        config: {
            bubble: {
                image: 'bubble2.png',
                scale: 0.8,
            },
            area: { minX: 150, maxX: 800, minY: 120, maxY: 320 }
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 381
    381: {
        gameId: 'whack_mole',
        config: {
            hole: {
                image: 'hole.png',
                scale: 0.4,
            },
            mole: {
                image: 'devilbat.png',
                scale: 0.4,
                offsetX: 0,
                offsetY: -15
            },
            hammer: {
                image: 'hammer.png',
                scale: 0.4,
                offsetX: 20,
                offsetY: -50
            }
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 382
    382: {
        gameId: 'racing',
        config: {
            playerVehicle: {
                image: 'car1.png',
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
                image: 'car2.png',
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
    },
    // Tự động đồng bộ từ File 1: Lesson 383
    383: {
        gameId: 'grow_plant',
        config: {
            plant: {
                stages: [
                    { image: 'flower_tree1.png', scale: 0.7 },
                    { image: 'flower_tree2.png', scale: 0.7 },
                    { image: 'flower_tree3.png', scale: 0.7 },
                    { image: 'flower_tree4.png', scale: 0.7 },
                    { image: 'flower_tree6.png', scale: 0.7 }
                ]
            },
            x: 490,
            y: 390
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 384
    384: {
        gameId: 'catch_insects',
        config: {
            insect: {
                image: 'fairy.png',
                scale: 0.3,
            },
            net: {
                image: 'net.png',
                scale: 0.3,
            },
            jar: {
                image: 'jar.png',
                scale: 0.7,
            },
            jarX: 940,
            jarY: 330,
            area: { minX: 180, maxX: 700, minY: 120, maxY: 340 } // Khu vực rải đồ vật
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 385
    385: {
        gameId: 'frog_jump',
        config: {
            type: 'air',
            leaf: {
                image: 'planet.png',
                scale: 0.4,
            },
            monkey: {
                scale: 0.3,
                offsetX: 0,
                offsetY: -80
            },
            x1: 100,
            y1: 150,
            x2: 920,
            y2: 300
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 386
    386: {
        gameId: 'collect_items',
        config: {
            items: [
                { image: 'star_dust.png', count: 10, width: 72, height: 72 }
            ],
            container: {
                image: 'basket.png',
                x: 920,
                y: 340,
                width: 180,
                height: 180
            },
            layout: 'scatter_random', // Rải ngẫu nhiên trên màn hình
            area: { minX: 180, maxX: 700, minY: 120, maxY: 340 } // Khu vực rải đồ vật
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 387
    387: {
        gameId: 'assemble_object',
        config: {
            finishedObject: {
                image: 'shield_complete.png',
                x: 490,
                y: 220,
                scale: 0.65
            },
            parts: [
                {
                    id: 'shield_part1', image: 'shield_part1.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 1, partOffsetY: 140
                },
                {
                    id: 'shield_part2', image: 'shield_part2.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 2, partOffsetY: 160
                },
                {
                    id: 'shield_part3', image: 'shield_part3.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 3, partOffsetY: 145
                },
                {
                    id: 'shield_part4', image: 'shield_part4.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 4, partOffsetY: 115
                },
                {
                    id: 'shield_part5', image: 'shield_part5.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 5, partOffsetY: 105
                },
                {
                    id: 'shield_part6', image: 'shield_part6.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 6, partOffsetY: 115
                }
            ]
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 388
    388: {
        gameId: 'clear_fog',
        config: {
            fogScale: 1,
            image: 'fog7.png',
            x1: 250,
            y1: 140,
            x2: 750,
            y2: 270
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 389
    389: {
        gameId: 'bubble_shooter',
        config: {
            bubble: {
                image: 'meteorite.png',
                scale: 0.8,
                randomAngle: false
            },
            area: { minX: 150, maxX: 800, minY: 120, maxY: 320 }
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 390
    390: {
        gameId: 'assemble_object',
        config: {
            finishedObject: {
                image: 'shield_complete.png',
                x: 490,
                y: 220,
                scale: 0.65
            },
            parts: [
                {
                    id: 'shield_part1', image: 'shield_part1.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 1, partOffsetY: 140
                },
                {
                    id: 'shield_part2', image: 'shield_part2.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 2, partOffsetY: 160
                },
                {
                    id: 'shield_part3', image: 'shield_part3.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 3, partOffsetY: 145
                },
                {
                    id: 'shield_part4', image: 'shield_part4.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 4, partOffsetY: 115
                },
                {
                    id: 'shield_part5', image: 'shield_part5.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 5, partOffsetY: 105
                },
                {
                    id: 'shield_part6', image: 'shield_part6.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 6, partOffsetY: 115
                }
            ]
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 392
    392: {
        gameId: 'clear_fog',
        config: {
            fogScale: 1,
            image: 'fog1.png',
            x1: 250,
            y1: 140,
            x2: 750,
            y2: 270
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 393
    393: {
        gameId: 'rescue_animals',
        config: {
            animal: {
                image: 'rabbit.png',
                scale: 0.8,
            },
            cage: {
                image: 'cage.png',
                scale: 1,
            },
            x: 490,
            y: 230
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 394
    394: {
        gameId: 'bubble_shooter',
        config: {
            bubble: {
                image: 'bubble.png',
                scale: 0.8,
            },
            area: { minX: 150, maxX: 800, minY: 120, maxY: 320 }
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 395
    395: {
        gameId: 'whack_mole',
        config: {
            hole: {
                image: 'hole.png',
                scale: 0.4,
            },
            mole: {
                image: 'crab.png',
                scale: 0.4,
                offsetX: 0,
                offsetY: 0
            },
            hammer: {
                image: 'hammer.png',
                scale: 0.4,
                offsetX: 20,
                offsetY: -50
            }
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 396
    396: {
        gameId: 'racing',
        config: {
            playerVehicle: {
                image: 'car1.png',
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
                image: 'car2.png',
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
    },
    // Tự động đồng bộ từ File 1: Lesson 397
    397: {
        gameId: 'grow_plant',
        config: {
            plant: {
                stages: [
                    { image: 'flower_tree1.png', scale: 0.7 },
                    { image: 'flower_tree2.png', scale: 0.7 },
                    { image: 'flower_tree3.png', scale: 0.7 },
                    { image: 'flower_tree4.png', scale: 0.7 },
                    { image: 'flower_tree6.png', scale: 0.7 }
                ]
            },
            x: 490,
            y: 390
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 398
    398: {
        gameId: 'catch_insects',
        config: {
            insect: {
                image: 'jellyfish.png',
                scale: 0.5,
            },
            net: {
                image: 'net.png',
                scale: 0.5,
            },
            jar: {
                image: 'jar.png',
                scale: 0.7,
            },
            jarX: 940,
            jarY: 330,
            area: { minX: 180, maxX: 700, minY: 120, maxY: 340 } // Khu vực rải đồ vật
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 399
    399: {
        gameId: 'frog_jump',
        config: {
            type: 'water',
            leaf: {
                image: 'rock.png',
                scale: 0.45,
            },
            monkey: {
                scale: 0.3,
                offsetX: 0,
                offsetY: -65
            },
            x1: 100,
            y1: 150,
            x2: 920,
            y2: 300
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 400
    400: {
        gameId: 'collect_items',
        config: {
            items: [
                { image: 'shell.png', count: 10, width: 72, height: 72 }
            ],
            container: {
                image: 'basket.png',
                x: 920,
                y: 340,
                width: 180,
                height: 180
            },
            layout: 'scatter_random', // Rải ngẫu nhiên trên màn hình
            area: { minX: 180, maxX: 700, minY: 120, maxY: 340 } // Khu vực rải đồ vật
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 401
    401: {
        gameId: 'assemble_object',
        config: {
            finishedObject: {
                image: 'shield_complete.png',
                x: 490,
                y: 220,
                scale: 0.65
            },
            parts: [
                {
                    id: 'shield_part1', image: 'shield_part1.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 1, partOffsetY: 140
                },
                {
                    id: 'shield_part2', image: 'shield_part2.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 2, partOffsetY: 160
                },
                {
                    id: 'shield_part3', image: 'shield_part3.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 3, partOffsetY: 145
                },
                {
                    id: 'shield_part4', image: 'shield_part4.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 4, partOffsetY: 115
                },
                {
                    id: 'shield_part5', image: 'shield_part5.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 5, partOffsetY: 105
                },
                {
                    id: 'shield_part6', image: 'shield_part6.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 6, partOffsetY: 115
                }
            ]
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 402
    402: {
        gameId: 'clear_fog',
        config: {
            fogScale: 1,
            image: 'fog6.png',
            x1: 250,
            y1: 140,
            x2: 750,
            y2: 270
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 403
    403: {
        gameId: 'bubble_shooter',
        config: {
            bubble: {
                image: 'urchin.png',
                scale: 0.8,
            },
            area: { minX: 150, maxX: 800, minY: 120, maxY: 320 }
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 404
    404: {
        gameId: 'assemble_object',
        config: {
            finishedObject: {
                image: 'shield_complete.png',
                x: 490,
                y: 220,
                scale: 0.65
            },
            parts: [
                {
                    id: 'shield_part1', image: 'shield_part1.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 1, partOffsetY: 140
                },
                {
                    id: 'shield_part2', image: 'shield_part2.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 2, partOffsetY: 160
                },
                {
                    id: 'shield_part3', image: 'shield_part3.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 3, partOffsetY: 145
                },
                {
                    id: 'shield_part4', image: 'shield_part4.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 4, partOffsetY: 115
                },
                {
                    id: 'shield_part5', image: 'shield_part5.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 5, partOffsetY: 105
                },
                {
                    id: 'shield_part6', image: 'shield_part6.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 6, partOffsetY: 115
                }
            ]
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 406
    406: {
        gameId: 'clear_fog',
        config: {
            fogScale: 1,
            image: 'fog1.png',
            x1: 250,
            y1: 140,
            x2: 750,
            y2: 270
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 407
    407: {
        gameId: 'rescue_animals',
        config: {
            animal: {
                image: 'rabbit.png',
                scale: 0.8,
            },
            cage: {
                image: 'cage.png',
                scale: 1,
            },
            x: 490,
            y: 230
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 408
    408: {
        gameId: 'bubble_shooter',
        config: {
            bubble: {
                image: 'fog4.png',
                scale: 0.8,
            },
            area: { minX: 150, maxX: 800, minY: 120, maxY: 320 }
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 409
    409: {
        gameId: 'whack_mole',
        config: {
            hole: {
                image: 'hole.png',
                scale: 0.4,
            },
            mole: {
                image: 'crab.png',
                scale: 0.4,
                offsetX: 0,
                offsetY: 0
            },
            hammer: {
                image: 'hammer.png',
                scale: 0.4,
                offsetX: 20,
                offsetY: -50
            }
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 410
    410: {
        gameId: 'racing',
        config: {
            playerVehicle: {
                image: 'car1.png',
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
                image: 'car2.png',
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
    },
    // Tự động đồng bộ từ File 1: Lesson 411
    411: {
        gameId: 'grow_plant',
        config: {
            plant: {
                stages: [
                    { image: 'flower_tree1.png', scale: 0.7 },
                    { image: 'flower_tree2.png', scale: 0.7 },
                    { image: 'flower_tree3.png', scale: 0.7 },
                    { image: 'flower_tree4.png', scale: 0.7 },
                    { image: 'flower_tree5.png', scale: 0.7 }
                ]
            },
            x: 490,
            y: 390
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 412
    412: {
        gameId: 'catch_insects',
        config: {
            insect: {
                image: 'plankton.png',
                scale: 0.3,
            },
            net: {
                image: 'net.png',
                scale: 0.3,
            },
            jar: {
                image: 'jar.png',
                scale: 0.7,
            },
            jarX: 940,
            jarY: 330,
            area: { minX: 180, maxX: 700, minY: 120, maxY: 340 } // Khu vực rải đồ vật
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 413
    413: {
        gameId: 'frog_jump',
        config: {
            type: 'water',
            leaf: {
                image: 'sand.png',
                scale: 0.45,
            },
            monkey: {
                scale: 0.3,
                offsetX: 0,
                offsetY: -65
            },
            x1: 100,
            y1: 150,
            x2: 920,
            y2: 300
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 414
    414: {
        gameId: 'collect_items',
        config: {
            items: [
                { image: 'pearl.png', count: 10, width: 96, height: 96 }
            ],
            container: {
                image: 'basket.png',
                x: 920,
                y: 340,
                width: 180,
                height: 180
            },
            layout: 'scatter_random', // Rải ngẫu nhiên trên màn hình
            area: { minX: 180, maxX: 700, minY: 120, maxY: 340 } // Khu vực rải đồ vật
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 415
    415: {
        gameId: 'assemble_object',
        config: {
            finishedObject: {
                image: 'shield_complete.png',
                x: 490,
                y: 220,
                scale: 0.65
            },
            parts: [
                {
                    id: 'shield_part1', image: 'shield_part1.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 1, partOffsetY: 140
                },
                {
                    id: 'shield_part2', image: 'shield_part2.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 2, partOffsetY: 160
                },
                {
                    id: 'shield_part3', image: 'shield_part3.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 3, partOffsetY: 145
                },
                {
                    id: 'shield_part4', image: 'shield_part4.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 4, partOffsetY: 115
                },
                {
                    id: 'shield_part5', image: 'shield_part5.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 5, partOffsetY: 105
                },
                {
                    id: 'shield_part6', image: 'shield_part6.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 6, partOffsetY: 115
                }
            ]
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 416
    416: {
        gameId: 'clear_fog',
        config: {
            fogScale: 1,
            image: 'fog7.png',
            x1: 250,
            y1: 140,
            x2: 750,
            y2: 270
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 417
    417: {
        gameId: 'bubble_shooter',
        config: {
            bubble: {
                image: 'urchin.png',
                scale: 0.6,
            },
            area: { minX: 150, maxX: 800, minY: 120, maxY: 320 }
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 418
    418: {
        gameId: 'assemble_object',
        config: {
            finishedObject: {
                image: 'shield_complete.png',
                x: 490,
                y: 220,
                scale: 0.65
            },
            parts: [
                {
                    id: 'shield_part1', image: 'shield_part1.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 1, partOffsetY: 140
                },
                {
                    id: 'shield_part2', image: 'shield_part2.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 2, partOffsetY: 160
                },
                {
                    id: 'shield_part3', image: 'shield_part3.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 3, partOffsetY: 145
                },
                {
                    id: 'shield_part4', image: 'shield_part4.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 4, partOffsetY: 115
                },
                {
                    id: 'shield_part5', image: 'shield_part5.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 5, partOffsetY: 105
                },
                {
                    id: 'shield_part6', image: 'shield_part6.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 6, partOffsetY: 115
                }
            ]
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 420
    420: {
        gameId: 'clear_fog',
        config: {
            fogScale: 1,
            image: 'fog1.png',
            x1: 250,
            y1: 140,
            x2: 750,
            y2: 270
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 421
    421: {
        gameId: 'rescue_animals',
        config: {
            animal: {
                image: 'rabbit.png',
                scale: 0.8,
            },
            cage: {
                image: 'cage.png',
                scale: 1,
            },
            x: 490,
            y: 230
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 422
    422: {
        gameId: 'bubble_shooter',
        config: {
            bubble: {
                image: 'fog4.png',
                scale: 0.6,
            },
            area: { minX: 150, maxX: 800, minY: 120, maxY: 320 }
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 423
    423: {
        gameId: 'whack_mole',
        config: {
            hole: {
                image: 'hole.png',
                scale: 0.4,
            },
            mole: {
                image: 'sea_urchin.png',
                scale: 0.4,
                offsetX: 0,
                offsetY: -10
            },
            hammer: {
                image: 'hammer.png',
                scale: 0.4,
                offsetX: 20,
                offsetY: -50
            }
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 424
    424: {
        gameId: 'racing',
        config: {
            playerVehicle: {
                image: 'car1.png',
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
                image: 'car2.png',
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
    },
    // Tự động đồng bộ từ File 1: Lesson 425
    425: {
        gameId: 'grow_plant',
        config: {
            plant: {
                stages: [
                    { image: 'flower_tree1.png', scale: 0.7 },
                    { image: 'flower_tree2.png', scale: 0.7 },
                    { image: 'flower_tree3.png', scale: 0.7 },
                    { image: 'flower_tree4.png', scale: 0.7 },
                    { image: 'flower_tree5.png', scale: 0.7 }
                ]
            },
            x: 490,
            y: 390
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 426
    426: {
        gameId: 'catch_insects',
        config: {
            insect: {
                image: 'jellyfish.png',
                scale: 0.5,
            },
            net: {
                image: 'net.png',
                scale: 0.5,
            },
            jar: {
                image: 'jar.png',
                scale: 0.7,
            },
            jarX: 940,
            jarY: 330,
            area: { minX: 180, maxX: 700, minY: 120, maxY: 340 } // Khu vực rải đồ vật
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 427
    427: {
        gameId: 'frog_jump',
        config: {
            type: 'water',
            leaf: {
                image: 'shell.png',
                scale: 0.45,
            },
            monkey: {
                scale: 0.3,
                offsetX: 0,
                offsetY: -65
            },
            x1: 100,
            y1: 150,
            x2: 920,
            y2: 300
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 428
    428: {
        gameId: 'collect_items',
        config: {
            items: [
                { image: 'pearl.png', count: 10, width: 96, height: 96 }
            ],
            container: {
                image: 'basket.png',
                x: 920,
                y: 340,
                width: 180,
                height: 180
            },
            layout: 'scatter_random', // Rải ngẫu nhiên trên màn hình
            area: { minX: 180, maxX: 700, minY: 120, maxY: 340 } // Khu vực rải đồ vật
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 429
    429: {
        gameId: 'assemble_object',
        config: {
            finishedObject: {
                image: 'shield_complete.png',
                x: 490,
                y: 220,
                scale: 0.65
            },
            parts: [
                {
                    id: 'shield_part1', image: 'shield_part1.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 1, partOffsetY: 140
                },
                {
                    id: 'shield_part2', image: 'shield_part2.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 2, partOffsetY: 160
                },
                {
                    id: 'shield_part3', image: 'shield_part3.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 3, partOffsetY: 145
                },
                {
                    id: 'shield_part4', image: 'shield_part4.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 4, partOffsetY: 115
                },
                {
                    id: 'shield_part5', image: 'shield_part5.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 5, partOffsetY: 105
                },
                {
                    id: 'shield_part6', image: 'shield_part6.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 6, partOffsetY: 115
                }
            ]
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 430
    430: {
        gameId: 'clear_fog',
        config: {
            fogScale: 1,
            image: 'fog4.png',
            x1: 250,
            y1: 140,
            x2: 750,
            y2: 270
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 431
    431: {
        gameId: 'bubble_shooter',
        config: {
            bubble: {
                image: 'shell.png',
                scale: 0.6,
            },
            area: { minX: 150, maxX: 800, minY: 120, maxY: 320 }
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 432
    432: {
        gameId: 'assemble_object',
        config: {
            finishedObject: {
                image: 'shield_complete.png',
                x: 490,
                y: 220,
                scale: 0.65
            },
            parts: [
                {
                    id: 'shield_part1', image: 'shield_part1.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 1, partOffsetY: 140
                },
                {
                    id: 'shield_part2', image: 'shield_part2.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 2, partOffsetY: 160
                },
                {
                    id: 'shield_part3', image: 'shield_part3.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 3, partOffsetY: 145
                },
                {
                    id: 'shield_part4', image: 'shield_part4.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 4, partOffsetY: 115
                },
                {
                    id: 'shield_part5', image: 'shield_part5.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 5, partOffsetY: 105
                },
                {
                    id: 'shield_part6', image: 'shield_part6.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 6, partOffsetY: 115
                }
            ]
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 434
    434: {
        gameId: 'clear_fog',
        config: {
            fogScale: 1,
            image: 'fog4.png',
            x1: 250,
            y1: 140,
            x2: 750,
            y2: 270
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 435
    435: {
        gameId: 'rescue_animals',
        config: {
            animal: {
                image: 'rabbit.png',
                scale: 0.8,
            },
            cage: {
                image: 'cage.png',
                scale: 1,
            },
            x: 490,
            y: 230
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 436
    436: {
        gameId: 'bubble_shooter',
        config: {
            bubble: {
                image: 'urchin.png',
                scale: 0.6,
            },
            area: { minX: 150, maxX: 800, minY: 120, maxY: 320 }
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 437
    437: {
        gameId: 'whack_mole',
        config: {
            hole: {
                image: 'hole.png',
                scale: 0.4,
            },
            mole: {
                image: 'sea_urchin.png',
                scale: 0.4,
                offsetX: 0,
                offsetY: -10
            },
            hammer: {
                image: 'hammer.png',
                scale: 0.4,
                offsetX: 20,
                offsetY: -50
            }
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 438
    438: {
        gameId: 'racing',
        config: {
            playerVehicle: {
                image: 'car1.png',
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
                image: 'car2.png',
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
    },
    // Tự động đồng bộ từ File 1: Lesson 439
    439: {
        gameId: 'grow_plant',
        config: {
            plant: {
                stages: [
                    { image: 'flower_tree1.png', scale: 0.7 },
                    { image: 'flower_tree2.png', scale: 0.7 },
                    { image: 'flower_tree3.png', scale: 0.7 },
                    { image: 'flower_tree4.png', scale: 0.7 },
                    { image: 'flower_tree5.png', scale: 0.7 }
                ]
            },
            x: 490,
            y: 390
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 440
    440: {
        gameId: 'catch_insects',
        config: {
            insect: {
                image: 'jellyfish.png',
                scale: 0.5,
            },
            net: {
                image: 'net.png',
                scale: 0.5,
            },
            jar: {
                image: 'jar.png',
                scale: 0.7,
            },
            jarX: 940,
            jarY: 330,
            area: { minX: 180, maxX: 700, minY: 120, maxY: 340 } // Khu vực rải đồ vật
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 441
    441: {
        gameId: 'frog_jump',
        config: {
            type: 'water',
            leaf: {
                image: 'coral.png',
                scale: 0.45,
            },
            monkey: {
                scale: 0.3,
                offsetX: 0,
                offsetY: -65
            },
            x1: 100,
            y1: 150,
            x2: 920,
            y2: 300
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 442
    442: {
        gameId: 'collect_items',
        config: {
            items: [
                { image: 'pearl.png', count: 10, width: 72, height: 72 }
            ],
            container: {
                image: 'basket.png',
                x: 920,
                y: 340,
                width: 180,
                height: 180
            },
            layout: 'scatter_random', // Rải ngẫu nhiên trên màn hình
            area: { minX: 180, maxX: 700, minY: 120, maxY: 340 } // Khu vực rải đồ vật
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 443
    443: {
        gameId: 'assemble_object',
        config: {
            finishedObject: {
                image: 'shield_complete.png',
                x: 490,
                y: 220,
                scale: 0.65
            },
            parts: [
                {
                    id: 'shield_part1', image: 'shield_part1.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 1, partOffsetY: 140
                },
                {
                    id: 'shield_part2', image: 'shield_part2.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 2, partOffsetY: 160
                },
                {
                    id: 'shield_part3', image: 'shield_part3.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 3, partOffsetY: 145
                },
                {
                    id: 'shield_part4', image: 'shield_part4.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 4, partOffsetY: 115
                },
                {
                    id: 'shield_part5', image: 'shield_part5.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 5, partOffsetY: 105
                },
                {
                    id: 'shield_part6', image: 'shield_part6.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 6, partOffsetY: 115
                }
            ]
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 444
    444: {
        gameId: 'clear_fog',
        config: {
            fogScale: 1,
            image: 'fog7.png',
            x1: 250,
            y1: 140,
            x2: 750,
            y2: 270
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 445
    445: {
        gameId: 'bubble_shooter',
        config: {
            bubble: {
                image: 'coral.png',
                scale: 0.8,
            },
            area: { minX: 150, maxX: 800, minY: 120, maxY: 320 }
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 446
    446: {
        gameId: 'assemble_object',
        config: {
            finishedObject: {
                image: 'shield_complete.png',
                x: 490,
                y: 220,
                scale: 0.65
            },
            parts: [
                {
                    id: 'shield_part1', image: 'shield_part1.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 1, partOffsetY: 140
                },
                {
                    id: 'shield_part2', image: 'shield_part2.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 2, partOffsetY: 160
                },
                {
                    id: 'shield_part3', image: 'shield_part3.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 3, partOffsetY: 145
                },
                {
                    id: 'shield_part4', image: 'shield_part4.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 4, partOffsetY: 115
                },
                {
                    id: 'shield_part5', image: 'shield_part5.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 5, partOffsetY: 105
                },
                {
                    id: 'shield_part6', image: 'shield_part6.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 6, partOffsetY: 115
                }
            ]
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 448
    448: {
        gameId: 'clear_fog',
        config: {
            fogScale: 1,
            image: 'fog4.png',
            x1: 250,
            y1: 140,
            x2: 750,
            y2: 270
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 449
    449: {
        gameId: 'rescue_animals',
        config: {
            animal: {
                image: 'rabbit.png',
                scale: 0.8,
            },
            cage: {
                image: 'cage.png',
                scale: 1,
            },
            x: 490,
            y: 230
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 450
    450: {
        gameId: 'bubble_shooter',
        config: {
            bubble: {
                image: 'bubble2.png',
                scale: 0.8,
            },
            area: { minX: 150, maxX: 800, minY: 120, maxY: 320 }
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 451
    451: {
        gameId: 'whack_mole',
        config: {
            hole: {
                image: 'hole.png',
                scale: 0.4,
            },
             mole: {
                image: 'crab.png',
                scale: 0.4,
                offsetX: 0,
                offsetY: 0
            },
            hammer: {
                image: 'hammer.png',
                scale: 0.4,
                offsetX: 20,
                offsetY: -50
            }
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 452
    452: {
        gameId: 'racing',
        config: {
            playerVehicle: {
                image: 'car1.png',
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
                image: 'car2.png',
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
    },
    // Tự động đồng bộ từ File 1: Lesson 453
    453: {
        gameId: 'grow_plant',
        config: {
            plant: {
                stages: [
                    { image: 'flower_tree1.png', scale: 0.7 },
                    { image: 'flower_tree2.png', scale: 0.7 },
                    { image: 'flower_tree3.png', scale: 0.7 },
                    { image: 'flower_tree4.png', scale: 0.7 },
                    { image: 'flower_tree5.png', scale: 0.7 }
                ]
            },
            x: 490,
            y: 390
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 454
    454: {
        gameId: 'catch_insects',
        config: {
            insect: {
                image: 'jellyfish.png',
                scale: 0.3,
            },
            net: {
                image: 'net.png',
                scale: 0.3,
            },
            jar: {
                image: 'jar.png',
                scale: 0.7,
            },
            jarX: 940,
            jarY: 330,
            area: { minX: 180, maxX: 700, minY: 120, maxY: 340 } // Khu vực rải đồ vật
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 455
    455: {
        gameId: 'frog_jump',
        config: {
            type: 'water',
            leaf: {
                image: 'rock2.png',
                scale: 0.45,
            },
            monkey: {
                scale: 0.3,
                offsetX: 0,
                offsetY: -65
            },
            x1: 100,
            y1: 150,
            x2: 920,
            y2: 300
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 456
    456: {
        gameId: 'collect_items',
        config: {
            items: [
                { image: 'pearl.png', count: 10, width: 72, height: 72 }
            ],
            container: {
                image: 'basket.png',
                x: 920,
                y: 340,
                width: 180,
                height: 180
            },
            layout: 'scatter_random', // Rải ngẫu nhiên trên màn hình
            area: { minX: 180, maxX: 700, minY: 120, maxY: 340 } // Khu vực rải đồ vật
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 457
    457: {
        gameId: 'assemble_object',
        config: {
            finishedObject: {
                image: 'shield_complete.png',
                x: 490,
                y: 220,
                scale: 0.65
            },
            parts: [
                {
                    id: 'shield_part1', image: 'shield_part1.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 1, partOffsetY: 140
                },
                {
                    id: 'shield_part2', image: 'shield_part2.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 2, partOffsetY: 160
                },
                {
                    id: 'shield_part3', image: 'shield_part3.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 3, partOffsetY: 145
                },
                {
                    id: 'shield_part4', image: 'shield_part4.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 4, partOffsetY: 115
                },
                {
                    id: 'shield_part5', image: 'shield_part5.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 5, partOffsetY: 105
                },
                {
                    id: 'shield_part6', image: 'shield_part6.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 6, partOffsetY: 115
                }
            ]
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 458
    458: {
        gameId: 'clear_fog',
        config: {
            fogScale: 1,
            image: 'fog4.png',
            x1: 250,
            y1: 140,
            x2: 750,
            y2: 270
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 459
    459: {
        gameId: 'bubble_shooter',
        config: {
            bubble: {
                image: 'rock.png',
                scale: 0.6,
            },
            area: { minX: 150, maxX: 800, minY: 120, maxY: 320 }
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 460
    460: {
        gameId: 'assemble_object',
        config: {
            finishedObject: {
                image: 'shield_complete.png',
                x: 490,
                y: 220,
                scale: 0.65
            },
            parts: [
                {
                    id: 'shield_part1', image: 'shield_part1.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 1, partOffsetY: 140
                },
                {
                    id: 'shield_part2', image: 'shield_part2.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 2, partOffsetY: 160
                },
                {
                    id: 'shield_part3', image: 'shield_part3.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 3, partOffsetY: 145
                },
                {
                    id: 'shield_part4', image: 'shield_part4.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 4, partOffsetY: 115
                },
                {
                    id: 'shield_part5', image: 'shield_part5.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 5, partOffsetY: 105
                },
                {
                    id: 'shield_part6', image: 'shield_part6.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 6, partOffsetY: 115
                }
            ]
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 462
    462: {
        gameId: 'clear_fog',
        config: {
            fogScale: 1,
            image: 'fog5.png',
            x1: 250,
            y1: 140,
            x2: 750,
            y2: 270
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 463
    463: {
        gameId: 'rescue_animals',
        config: {
            animal: {
                image: 'rabbit.png',
                scale: 0.8,
            },
            cage: {
                image: 'cage.png',
                scale: 1,
            },
            x: 490,
            y: 230
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 464
    464: {
        gameId: 'bubble_shooter',
        config: {
            bubble: {
                image: 'fog4.png',
                scale: 0.6,
            },
            area: { minX: 150, maxX: 800, minY: 120, maxY: 320 }
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 465
    465: {
        gameId: 'whack_mole',
        config: {
            hole: {
                image: 'hole.png',
                scale: 0.4,
            },
            mole: {
                image: 'sea_urchin.png',
                scale: 0.4,
                offsetX: 0,
                offsetY: -10
            },
            hammer: {
                image: 'hammer.png',
                scale: 0.4,
                offsetX: 20,
                offsetY: -50
            }
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 466
    466: {
        gameId: 'racing',
        config: {
            playerVehicle: {
                image: 'car1.png',
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
                image: 'car2.png',
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
    },
    // Tự động đồng bộ từ File 1: Lesson 467
    467: {
        gameId: 'grow_plant',
        config: {
            plant: {
                stages: [
                    { image: 'flower_tree1.png', scale: 0.7 },
                    { image: 'flower_tree2.png', scale: 0.7 },
                    { image: 'flower_tree3.png', scale: 0.7 },
                    { image: 'flower_tree4.png', scale: 0.7 },
                    { image: 'flower_tree5.png', scale: 0.7 }
                ]
            },
            x: 490,
            y: 390
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 468
    468: {
        gameId: 'catch_insects',
        config: {
            insect: {
                image: 'fairy.png',
                scale: 0.3,
            },
            net: {
                image: 'net.png',
                scale: 0.3,
            },
            jar: {
                image: 'jar.png',
                scale: 0.7,
            },
            jarX: 940,
            jarY: 330,
            area: { minX: 180, maxX: 700, minY: 120, maxY: 340 } // Khu vực rải đồ vật
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 469
    469: {
        gameId: 'frog_jump',
        config: {
            type: 'water',
            leaf: {
                image: 'coral.png',
                scale: 0.45,
            },
            monkey: {
                scale: 0.3,
                offsetX: 0,
                offsetY: -65
            },
            x1: 100,
            y1: 150,
            x2: 920,
            y2: 300
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 470
    470: {
        gameId: 'collect_items',
        config: {
            items: [
                { image: 'sound_circle.png', count: 10, width: 80, height: 80 }
            ],
            container: {
                image: 'basket.png',
                x: 920,
                y: 340,
                width: 180,
                height: 180
            },
            layout: 'scatter_random', // Rải ngẫu nhiên trên màn hình
            area: { minX: 180, maxX: 700, minY: 120, maxY: 340 } // Khu vực rải đồ vật
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 471
    471: {
        gameId: 'assemble_object',
        config: {
            finishedObject: {
                image: 'shield_complete.png',
                x: 490,
                y: 220,
                scale: 0.65
            },
            parts: [
                {
                    id: 'shield_part1', image: 'shield_part1.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 1, partOffsetY: 140
                },
                {
                    id: 'shield_part2', image: 'shield_part2.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 2, partOffsetY: 160
                },
                {
                    id: 'shield_part3', image: 'shield_part3.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 3, partOffsetY: 145
                },
                {
                    id: 'shield_part4', image: 'shield_part4.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 4, partOffsetY: 115
                },
                {
                    id: 'shield_part5', image: 'shield_part5.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 5, partOffsetY: 105
                },
                {
                    id: 'shield_part6', image: 'shield_part6.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 6, partOffsetY: 115
                }
            ]
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 472
    472: {
        gameId: 'clear_fog',
        config: {
            fogScale: 1,
            image: 'fog7.png',
            x1: 250,
            y1: 140,
            x2: 750,
            y2: 270
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 473
    473: {
        gameId: 'bubble_shooter',
        config: {
            bubble: {
                image: 'rock.png',
                scale: 0.6,
            },
            area: { minX: 150, maxX: 800, minY: 120, maxY: 320 }
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 474
    474: {
        gameId: 'assemble_object',
        config: {
            finishedObject: {
                image: 'shield_complete.png',
                x: 490,
                y: 220,
                scale: 0.65
            },
            parts: [
                {
                    id: 'shield_part1', image: 'shield_part1.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 1, partOffsetY: 140
                },
                {
                    id: 'shield_part2', image: 'shield_part2.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 2, partOffsetY: 160
                },
                {
                    id: 'shield_part3', image: 'shield_part3.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 3, partOffsetY: 145
                },
                {
                    id: 'shield_part4', image: 'shield_part4.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 4, partOffsetY: 115
                },
                {
                    id: 'shield_part5', image: 'shield_part5.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 5, partOffsetY: 105
                },
                {
                    id: 'shield_part6', image: 'shield_part6.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 6, partOffsetY: 115
                }
            ]
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 476
    476: {
        gameId: 'clear_fog',
        config: {
            fogScale: 1,
            image: 'fog2.png',
            x1: 250,
            y1: 140,
            x2: 750,
            y2: 270
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 477
    477: {
        gameId: 'rescue_animals',
        config: {
            animal: {
                image: 'rabbit.png',
                scale: 0.8,
            },
            cage: {
                image: 'cage.png',
                scale: 1,
            },
            x: 490,
            y: 230
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 478
    478: {
        gameId: 'bubble_shooter',
        config: {
            bubble: {
                image: 'bubble.png',
                scale: 0.8,
            },
            area: { minX: 150, maxX: 800, minY: 120, maxY: 320 }
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 479
    479: {
        gameId: 'whack_mole',
        config: {
            hole: {
                image: 'hole.png',
                scale: 0.4,
            },
             mole: {
                image: 'crab.png',
                scale: 0.4,
                offsetX: 0,
                offsetY: 0
            },
            hammer: {
                image: 'hammer.png',
                scale: 0.4,
                offsetX: 20,
                offsetY: -50
            }
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 480
    480: {
        gameId: 'racing',
        config: {
            playerVehicle: {
                image: 'car1.png',
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
                image: 'car2.png',
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
    },
    // Tự động đồng bộ từ File 1: Lesson 481
    481: {
        gameId: 'grow_plant',
        config: {
            plant: {
                stages: [
                    { image: 'flower_tree1.png', scale: 0.7 },
                    { image: 'flower_tree2.png', scale: 0.7 },
                    { image: 'flower_tree3.png', scale: 0.7 },
                    { image: 'flower_tree4.png', scale: 0.7 },
                    { image: 'flower_tree5.png', scale: 0.7 }
                ]
            },
            x: 490,
            y: 390
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 482
    482: {
        gameId: 'catch_insects',
        config: {
            insect: {
                image: 'jellyfish.png',
                scale: 0.3,
            },
            net: {
                image: 'net.png',
                scale: 0.3,
            },
            jar: {
                image: 'jar.png',
                scale: 0.7,
            },
            jarX: 940,
            jarY: 330,
            area: { minX: 180, maxX: 700, minY: 120, maxY: 340 } // Khu vực rải đồ vật
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 483
    483: {
        gameId: 'frog_jump',
        config: {
            type: 'water',
            leaf: {
                image: 'rock2.png',
                scale: 0.45,
            },
            monkey: {
                scale: 0.3,
                offsetX: 0,
                offsetY: -65
            },
            x1: 100,
            y1: 150,
            x2: 920,
            y2: 300
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 484
    484: {
        gameId: 'collect_items',
        config: {
            items: [
                { image: 'crystal.png', count: 10, width: 72, height: 72 }
            ],
            container: {
                image: 'basket.png',
                x: 920,
                y: 340,
                width: 180,
                height: 180
            },
            layout: 'scatter_random', // Rải ngẫu nhiên trên màn hình
            area: { minX: 180, maxX: 700, minY: 120, maxY: 340 } // Khu vực rải đồ vật
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 485
    485: {
        gameId: 'assemble_object',
        config: {
            finishedObject: {
                image: 'shield_complete.png',
                x: 490,
                y: 220,
                scale: 0.65
            },
            parts: [
                {
                    id: 'shield_part1', image: 'shield_part1.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 1, partOffsetY: 140
                },
                {
                    id: 'shield_part2', image: 'shield_part2.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 2, partOffsetY: 160
                },
                {
                    id: 'shield_part3', image: 'shield_part3.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 3, partOffsetY: 145
                },
                {
                    id: 'shield_part4', image: 'shield_part4.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 4, partOffsetY: 115
                },
                {
                    id: 'shield_part5', image: 'shield_part5.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 5, partOffsetY: 105
                },
                {
                    id: 'shield_part6', image: 'shield_part6.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 6, partOffsetY: 115
                }
            ]
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 486
    486: {
        gameId: 'clear_fog',
        config: {
            fogScale: 1,
            image: 'fog7.png',
            x1: 250,
            y1: 140,
            x2: 750,
            y2: 270
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 487
    487: {
        gameId: 'bubble_shooter',
        config: {
            bubble: {
                image: 'rock2.png',
                scale: 0.6,
            },
            area: { minX: 150, maxX: 800, minY: 120, maxY: 320 }
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 488
    488: {
        gameId: 'assemble_object',
        config: {
            finishedObject: {
                image: 'shield_complete.png',
                x: 490,
                y: 220,
                scale: 0.65
            },
            parts: [
                {
                    id: 'shield_part1', image: 'shield_part1.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 1, partOffsetY: 140
                },
                {
                    id: 'shield_part2', image: 'shield_part2.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 2, partOffsetY: 160
                },
                {
                    id: 'shield_part3', image: 'shield_part3.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 3, partOffsetY: 145
                },
                {
                    id: 'shield_part4', image: 'shield_part4.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 4, partOffsetY: 115
                },
                {
                    id: 'shield_part5', image: 'shield_part5.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 5, partOffsetY: 105
                },
                {
                    id: 'shield_part6', image: 'shield_part6.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 6, partOffsetY: 115
                }
            ]
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 490
    490: {
        gameId: 'clear_fog',
        config: {
            fogScale: 1,
            image: 'fog1.png',
            x1: 250,
            y1: 140,
            x2: 750,
            y2: 270
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 491
    491: {
        gameId: 'rescue_animals',
        config: {
            animal: {
                image: 'rabbit.png',
                scale: 0.8,
            },
            cage: {
                image: 'cage.png',
                scale: 1,
            },
            x: 490,
            y: 230
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 492
    492: {
        gameId: 'bubble_shooter',
        config: {
            bubble: {
                image: 'tnt.png',
                scale: 0.6,
            },
            area: { minX: 150, maxX: 800, minY: 120, maxY: 320 }
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 493
    493: {
        gameId: 'whack_mole',
        config: {
            hole: {
                image: 'hole.png',
                scale: 0.4,
            },
            mole: {
                image: 'mole.png',
                scale: 0.35,
                offsetX: 0,
                offsetY: -15
            },
            hammer: {
                image: 'hammer.png',
                scale: 0.4,
                offsetX: 20,
                offsetY: -50
            }
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 494
    494: {
        gameId: 'racing',
        config: {
            playerVehicle: {
                image: 'car1.png',
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
                image: 'car2.png',
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
    },
    // Tự động đồng bộ từ File 1: Lesson 495
    495: {
        gameId: 'grow_plant',
        config: {
            plant: {
                stages: [
                    { image: 'tree1.png', scale: 0.4 },
                    { image: 'tree2.png', scale: 0.3 },
                    { image: 'tree3.png', scale: 0.6 },
                    { image: 'tree4.png', scale: 0.7 },
                    { image: 'tree5.png', scale: 0.75 }
                ]
            },
            x: 490,
            y: 390
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 496
    496: {
        gameId: 'catch_insects',
        config: {
            insect: {
                image: 'firefly.png',
                scale: 0.3,
            },
            net: {
                image: 'net.png',
                scale: 0.3,
            },
            jar: {
                image: 'jar.png',
                scale: 0.7,
            },
            jarX: 940,
            jarY: 330,
            area: { minX: 180, maxX: 700, minY: 120, maxY: 340 } // Khu vực rải đồ vật
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 497
    497: {
        gameId: 'frog_jump',
        config: {
            type: 'water',
            leaf: {
                image: 'rock.png',
                scale: 0.45,
            },
            monkey: {
                scale: 0.3,
                offsetX: 0,
                offsetY: -65
            },
            x1: 100,
            y1: 150,
            x2: 920,
            y2: 300
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 498
    498: {
        gameId: 'collect_items',
        config: {
            items: [
                { image: 'goldenkey.png', count: 10, width: 80, height: 80 }
            ],
            container: {
                image: 'basket.png',
                x: 920,
                y: 340,
                width: 180,
                height: 180
            },
            layout: 'scatter_random', // Rải ngẫu nhiên trên màn hình
            area: { minX: 180, maxX: 700, minY: 120, maxY: 340 } // Khu vực rải đồ vật
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 499
    499: {
        gameId: 'assemble_object',
        config: {
            finishedObject: {
                image: 'shield_complete.png',
                x: 490,
                y: 220,
                scale: 0.65
            },
            parts: [
                {
                    id: 'shield_part1', image: 'shield_part1.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 1, partOffsetY: 140
                },
                {
                    id: 'shield_part2', image: 'shield_part2.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 2, partOffsetY: 160
                },
                {
                    id: 'shield_part3', image: 'shield_part3.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 3, partOffsetY: 145
                },
                {
                    id: 'shield_part4', image: 'shield_part4.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 4, partOffsetY: 115
                },
                {
                    id: 'shield_part5', image: 'shield_part5.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 5, partOffsetY: 105
                },
                {
                    id: 'shield_part6', image: 'shield_part6.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 6, partOffsetY: 115
                }
            ]
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 500
    500: {
        gameId: 'clear_fog',
        config: {
            fogScale: 1,
            image: 'fog3.png',
            x1: 250,
            y1: 140,
            x2: 750,
            y2: 270
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 501
    501: {
        gameId: 'bubble_shooter',
        config: {
            bubble: {
                image: 'mace.png',
                scale: 0.6,
            },
            area: { minX: 150, maxX: 800, minY: 120, maxY: 320 }
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 502
    502: {
        gameId: 'assemble_object',
        config: {
            finishedObject: {
                image: 'shield_complete.png',
                x: 490,
                y: 220,
                scale: 0.65
            },
            parts: [
                {
                    id: 'shield_part1', image: 'shield_part1.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 1, partOffsetY: 140
                },
                {
                    id: 'shield_part2', image: 'shield_part2.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 2, partOffsetY: 160
                },
                {
                    id: 'shield_part3', image: 'shield_part3.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 3, partOffsetY: 145
                },
                {
                    id: 'shield_part4', image: 'shield_part4.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 4, partOffsetY: 115
                },
                {
                    id: 'shield_part5', image: 'shield_part5.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 5, partOffsetY: 105
                },
                {
                    id: 'shield_part6', image: 'shield_part6.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 6, partOffsetY: 115
                }
            ]
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 504
    504: {
        gameId: 'clear_fog',
        config: {
            fogScale: 1,
            image: 'fog2.png',
            x1: 250,
            y1: 140,
            x2: 750,
            y2: 270
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 505
    505: {
        gameId: 'rescue_animals',
        config: {
            animal: {
                image: 'rabbit.png',
                scale: 0.8,
            },
            cage: {
                image: 'cage.png',
                scale: 1,
            },
            x: 490,
            y: 230
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 506
    506: {
        gameId: 'bubble_shooter',
        config: {
            bubble: {
                image: 'tnt.png',
                scale: 0.6,
            },
            area: { minX: 150, maxX: 800, minY: 120, maxY: 320 }
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 507
    507: {
        gameId: 'whack_mole',
        config: {
            hole: {
                image: 'hole.png',
                scale: 0.4,
            },
            mole: {
                image: 'mole.png',
                scale: 0.35,
                offsetX: 0,
                offsetY: -15
            },
            hammer: {
                image: 'hammer.png',
                scale: 0.4,
                offsetX: 20,
                offsetY: -50
            }
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 508
    508: {
        gameId: 'racing',
        config: {
            playerVehicle: {
                image: 'car1.png',
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
                image: 'car2.png',
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
    },
    // Tự động đồng bộ từ File 1: Lesson 509
    509: {
        gameId: 'grow_plant',
        config: {
            plant: {
                stages: [
                    { image: 'tree1.png', scale: 0.4 },
                    { image: 'tree2.png', scale: 0.3 },
                    { image: 'tree3.png', scale: 0.6 },
                    { image: 'tree4.png', scale: 0.7 },
                    { image: 'tree5.png', scale: 0.75 }
                ]
            },
            x: 490,
            y: 390
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 510
    510: {
        gameId: 'catch_insects',
        config: {
            insect: {
                image: 'fairy.png',
                scale: 0.3,
            },
            net: {
                image: 'net.png',
                scale: 0.3,
            },
            jar: {
                image: 'jar.png',
                scale: 0.7,
            },
            jarX: 940,
            jarY: 330,
            area: { minX: 180, maxX: 700, minY: 120, maxY: 340 } // Khu vực rải đồ vật
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 511
    511: {
        gameId: 'frog_jump',
        config: {
            type: 'road',
            leaf: {
                image: 'rock2.png',
                scale: 0.45,
            },
            monkey: {
                scale: 0.3,
                offsetX: 0,
                offsetY: -75
            },
            x1: 100,
            y1: 150,
            x2: 920,
            y2: 300
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 512
    512: {
        gameId: 'collect_items',
        config: {
            items: [
                { image: 'badge.png', count: 10, width: 80, height: 80 }
            ],
            container: {
                image: 'basket.png',
                x: 920,
                y: 340,
                width: 180,
                height: 180
            },
            layout: 'scatter_random', // Rải ngẫu nhiên trên màn hình
            area: { minX: 180, maxX: 700, minY: 120, maxY: 340 } // Khu vực rải đồ vật
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 513
    513: {
        gameId: 'assemble_object',
        config: {
            finishedObject: {
                image: 'shield_complete.png',
                x: 490,
                y: 220,
                scale: 0.65
            },
            parts: [
                {
                    id: 'shield_part1', image: 'shield_part1.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 1, partOffsetY: 140
                },
                {
                    id: 'shield_part2', image: 'shield_part2.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 2, partOffsetY: 160
                },
                {
                    id: 'shield_part3', image: 'shield_part3.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 3, partOffsetY: 145
                },
                {
                    id: 'shield_part4', image: 'shield_part4.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 4, partOffsetY: 115
                },
                {
                    id: 'shield_part5', image: 'shield_part5.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 5, partOffsetY: 105
                },
                {
                    id: 'shield_part6', image: 'shield_part6.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 6, partOffsetY: 115
                }
            ]
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 514
    514: {
        gameId: 'clear_fog',
        config: {
            fogScale: 1,
            image: 'fog2.png',
            x1: 250,
            y1: 140,
            x2: 750,
            y2: 270
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 515
    515: {
        gameId: 'bubble_shooter',
        config: {
            bubble: {
                image: 'mace.png',
                scale: 0.6,
            },
            area: { minX: 150, maxX: 800, minY: 120, maxY: 320 }
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 516
    516: {
        gameId: 'assemble_object',
        config: {
            finishedObject: {
                image: 'armor_complete.png',
                x: 490,
                y: 220,
                scale: 0.8
            },
            parts: [
                {
                    id: 'armor_part1', image: 'armor_part1.png', scaleX: 0.7, scaleY: 0.7, angle: 0,
                    offsetX: 0, offsetY: 0, order: 1, partOffsetY: 120
                },
                {
                    id: 'armor_part2', image: 'armor_part2.png', scaleX: 0.7, scaleY: 0.7, angle: 0,
                    offsetX: 0, offsetY: 0, order: 2, partOffsetY: 200
                },
                {
                    id: 'armor_part3', image: 'armor_part3.png', scaleX: 0.7, scaleY: 0.7, angle: 0,
                    offsetX: 0, offsetY: 0, order: 3, partOffsetY: 110
                },
                {
                    id: 'armor_part4', image: 'armor_part4.png', scaleX: 0.7, scaleY: 0.7, angle: 0,
                    offsetX: 0, offsetY: 0, order: 4, partOffsetY: 110
                },
                {
                    id: 'armor_part5', image: 'armor_part5.png', scaleX: 0.7, scaleY: 0.7, angle: 0,
                    offsetX: 0, offsetY: 0, order: 5, partOffsetY: 55
                },
                {
                    id: 'armor_part6', image: 'armor_part6.png', scaleX: 0.7, scaleY: 0.7, angle: 0,
                    offsetX: 0, offsetY: 0, order: 6, partOffsetY: 55
                }
            ]
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 518
    518: {
        gameId: 'clear_fog',
        config: {
            fogScale: 1,
            image: 'fog2.png',
            x1: 250,
            y1: 140,
            x2: 750,
            y2: 270
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 519
    519: {
        gameId: 'rescue_animals',
        config: {
            animal: {
                image: 'rabbit.png',
                scale: 0.8,
            },
            cage: {
                image: 'cage.png',
                scale: 1,
            },
            x: 490,
            y: 230
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 520
    520: {
        gameId: 'bubble_shooter',
        config: {
            bubble: {
                image: 'fireball.png',
                scale: 0.6,
                randomAngle: false
            },
            area: { minX: 150, maxX: 800, minY: 120, maxY: 320 }
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 521
    521: {
        gameId: 'whack_mole',
        config: {
            hole: {
                image: 'hole.png',
                scale: 0.4,
            },
            mole: {
                image: 'bandit.png',
                scale: 0.6,
                offsetX: 0,
                offsetY: -23
            },
            hammer: {
                image: 'hammer.png',
                scale: 0.4,
                offsetX: 20,
                offsetY: -50
            }
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 522
    522: {
        gameId: 'racing',
        config: {
            playerVehicle: {
                image: 'car1.png',
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
                image: 'car2.png',
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
    },
    // Tự động đồng bộ từ File 1: Lesson 523
    523: {
        gameId: 'grow_plant',
        config: {
            plant: {
                stages: [
                    { image: 'tree1.png', scale: 0.4 },
                    { image: 'tree2.png', scale: 0.3 },
                    { image: 'tree3.png', scale: 0.6 },
                    { image: 'tree4.png', scale: 0.7 },
                    { image: 'tree5.png', scale: 0.75 }
                ]
            },
            x: 490,
            y: 390
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 524
    524: {
        gameId: 'catch_insects',
        config: {
            insect: {
                image: 'firefly.png',
                scale: 0.3,
            },
            net: {
                image: 'net.png',
                scale: 0.3,
            },
            jar: {
                image: 'jar.png',
                scale: 0.7,
            },
            jarX: 940,
            jarY: 330,
            area: { minX: 180, maxX: 700, minY: 120, maxY: 340 } // Khu vực rải đồ vật
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 525
    525: {
        gameId: 'frog_jump',
        config: {
            type: 'road',
            leaf: {
                image: 'rock2.png',
                scale: 0.45,
            },
            monkey: {
                scale: 0.3,
                offsetX: 0,
                offsetY: -75
            },
            x1: 100,
            y1: 150,
            x2: 920,
            y2: 300
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 526
    526: {
        gameId: 'collect_items',
        config: {
            items: [
                { image: 'arrow.png', count: 10, width: 96, height: 96 }
            ],
            container: {
                image: 'basket.png',
                x: 920,
                y: 340,
                width: 180,
                height: 180
            },
            layout: 'scatter_random', // Rải ngẫu nhiên trên màn hình
            area: { minX: 180, maxX: 700, minY: 120, maxY: 340 } // Khu vực rải đồ vật
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 527
    527: {
        gameId: 'assemble_object',
        config: {
            finishedObject: {
                image: 'shield_complete.png',
                x: 490,
                y: 220,
                scale: 0.65
            },
            parts: [
                {
                    id: 'shield_part1', image: 'shield_part1.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 1, partOffsetY: 140
                },
                {
                    id: 'shield_part2', image: 'shield_part2.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 2, partOffsetY: 160
                },
                {
                    id: 'shield_part3', image: 'shield_part3.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 3, partOffsetY: 145
                },
                {
                    id: 'shield_part4', image: 'shield_part4.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 4, partOffsetY: 115
                },
                {
                    id: 'shield_part5', image: 'shield_part5.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 5, partOffsetY: 105
                },
                {
                    id: 'shield_part6', image: 'shield_part6.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 6, partOffsetY: 115
                }
            ]
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 528
    528: {
        gameId: 'clear_fog',
        config: {
            fogScale: 1,
            image: 'fog2.png',
            x1: 250,
            y1: 140,
            x2: 750,
            y2: 270
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 529
    529: {
        gameId: 'bubble_shooter',
        config: {
            bubble: {
                image: 'rock2.png',
                scale: 0.6,
            },
            area: { minX: 150, maxX: 800, minY: 120, maxY: 320 }
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 530
    530: {
        gameId: 'assemble_object',
        config: {
            finishedObject: {
                image: 'shield_complete.png',
                x: 490,
                y: 220,
                scale: 0.65
            },
            parts: [
                {
                    id: 'shield_part1', image: 'shield_part1.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 1, partOffsetY: 140
                },
                {
                    id: 'shield_part2', image: 'shield_part2.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 2, partOffsetY: 160
                },
                {
                    id: 'shield_part3', image: 'shield_part3.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 3, partOffsetY: 145
                },
                {
                    id: 'shield_part4', image: 'shield_part4.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 4, partOffsetY: 115
                },
                {
                    id: 'shield_part5', image: 'shield_part5.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 5, partOffsetY: 105
                },
                {
                    id: 'shield_part6', image: 'shield_part6.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 6, partOffsetY: 115
                }
            ]
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 532
    532: {
        gameId: 'clear_fog',
        config: {
            fogScale: 1,
            image: 'fog2.png',
            x1: 250,
            y1: 140,
            x2: 750,
            y2: 270
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 533
    533: {
        gameId: 'rescue_animals',
        config: {
            animal: {
                image: 'rabbit.png',
                scale: 0.8,
            },
            cage: {
                image: 'cage.png',
                scale: 1,
            },
            x: 490,
            y: 230
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 534
    534: {
        gameId: 'bubble_shooter',
        config: {
            bubble: {
                image: 'bomb.png',
                scale: 0.8,
            },
            area: { minX: 150, maxX: 800, minY: 120, maxY: 320 }
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 535
    535: {
        gameId: 'whack_mole',
        config: {
            hole: {
                image: 'hole.png',
                scale: 0.4,
            },
            mole: {
                image: 'bandit.png',
                scale: 0.6,
                offsetX: 0,
                offsetY: -23
            },
            hammer: {
                image: 'hammer.png',
                scale: 0.4,
                offsetX: 20,
                offsetY: -50
            }
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 536
    536: {
        gameId: 'racing',
        config: {
            playerVehicle: {
                image: 'car1.png',
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
                image: 'car2.png',
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
    },
    // Tự động đồng bộ từ File 1: Lesson 537
    537: {
        gameId: 'grow_plant',
        config: {
            plant: {
                stages: [
                    { image: 'tree1.png', scale: 0.4 },
                    { image: 'tree2.png', scale: 0.3 },
                    { image: 'tree3.png', scale: 0.6 },
                    { image: 'tree4.png', scale: 0.7 },
                    { image: 'tree5.png', scale: 0.75 }
                ]
            },
            x: 490,
            y: 390
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 538
    538: {
        gameId: 'catch_insects',
        config: {
            insect: {
                image: 'firefly.png',
                scale: 0.3,
            },
            net: {
                image: 'net.png',
                scale: 0.3,
            },
            jar: {
                image: 'jar.png',
                scale: 0.7,
            },
            jarX: 940,
            jarY: 330,
            area: { minX: 180, maxX: 700, minY: 120, maxY: 340 } // Khu vực rải đồ vật
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 539
    539: {
        gameId: 'frog_jump',
        config: {
            type: 'road',
            leaf: {
                image: 'wood.png',
                scale: 0.45,
            },
            monkey: {
                scale: 0.3,
                offsetX: 0,
                offsetY: -75
            },
            x1: 100,
            y1: 150,
            x2: 920,
            y2: 300
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 540
    540: {
        gameId: 'collect_items',
        config: {
            items: [
                { image: 'bell.png', count: 10, width: 80, height: 80 }
            ],
            container: {
                image: 'basket.png',
                x: 920,
                y: 340,
                width: 180,
                height: 180
            },
            layout: 'scatter_random', // Rải ngẫu nhiên trên màn hình
            area: { minX: 180, maxX: 700, minY: 120, maxY: 340 } // Khu vực rải đồ vật
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 541
    541: {
        gameId: 'assemble_object',
        config: {
            finishedObject: {
                image: 'shield_complete.png',
                x: 490,
                y: 220,
                scale: 0.65
            },
            parts: [
                {
                    id: 'shield_part1', image: 'shield_part1.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 1, partOffsetY: 140
                },
                {
                    id: 'shield_part2', image: 'shield_part2.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 2, partOffsetY: 160
                },
                {
                    id: 'shield_part3', image: 'shield_part3.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 3, partOffsetY: 145
                },
                {
                    id: 'shield_part4', image: 'shield_part4.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 4, partOffsetY: 115
                },
                {
                    id: 'shield_part5', image: 'shield_part5.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 5, partOffsetY: 105
                },
                {
                    id: 'shield_part6', image: 'shield_part6.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 6, partOffsetY: 115
                }
            ]
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 542
    542: {
        gameId: 'clear_fog',
        config: {
            fogScale: 1,
            image: 'fog6.png',
            x1: 250,
            y1: 140,
            x2: 750,
            y2: 270
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 543
    543: {
        gameId: 'bubble_shooter',
        config: {
            bubble: {
                image: 'rock2.png',
                scale: 0.8,
            },
            area: { minX: 150, maxX: 800, minY: 120, maxY: 320 }
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 544
    544: {
        gameId: 'assemble_object',
        config: {
            finishedObject: {
                image: 'shield_complete.png',
                x: 490,
                y: 220,
                scale: 0.65
            },
            parts: [
                {
                    id: 'shield_part1', image: 'shield_part1.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 1, partOffsetY: 140
                },
                {
                    id: 'shield_part2', image: 'shield_part2.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 2, partOffsetY: 160
                },
                {
                    id: 'shield_part3', image: 'shield_part3.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 3, partOffsetY: 145
                },
                {
                    id: 'shield_part4', image: 'shield_part4.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 4, partOffsetY: 115
                },
                {
                    id: 'shield_part5', image: 'shield_part5.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 5, partOffsetY: 105
                },
                {
                    id: 'shield_part6', image: 'shield_part6.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 6, partOffsetY: 115
                }
            ]
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 546
    546: {
        gameId: 'clear_fog',
        config: {
            fogScale: 1,
            image: 'fog2.png',
            x1: 250,
            y1: 140,
            x2: 750,
            y2: 270
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 547
    547: {
        gameId: 'rescue_animals',
        config: {
            animal: {
                image: 'rabbit.png',
                scale: 0.8,
            },
            cage: {
                image: 'cage.png',
                scale: 1,
            },
            x: 490,
            y: 230
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 548
    548: {
        gameId: 'bubble_shooter',
        config: {
            bubble: {
                image: 'bomb.png',
                scale: 0.8,
            },
            area: { minX: 150, maxX: 800, minY: 120, maxY: 320 }
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 549
    549: {
        gameId: 'whack_mole',
        config: {
            hole: {
                image: 'hole.png',
                scale: 0.4,
            },
            mole: {
                image: 'bandit.png',
                scale: 0.6,
                offsetX: 0,
                offsetY: -23
            },
            hammer: {
                image: 'hammer.png',
                scale: 0.4,
                offsetX: 20,
                offsetY: -50
            }
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 550
    550: {
        gameId: 'racing',
        config: {
            playerVehicle: {
                image: 'car1.png',
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
                image: 'car2.png',
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
    },
    // Tự động đồng bộ từ File 1: Lesson 551
    551: {
        gameId: 'grow_plant',
        config: {
            plant: {
                stages: [
                    { image: 'tree1.png', scale: 0.4 },
                    { image: 'tree2.png', scale: 0.3 },
                    { image: 'tree3.png', scale: 0.6 },
                    { image: 'tree4.png', scale: 0.7 },
                    { image: 'tree5.png', scale: 0.75 }
                ]
            },
            x: 490,
            y: 390
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 552
    552: {
        gameId: 'catch_insects',
        config: {
            insect: {
                image: 'butterfly.png',
                scale: 0.3,
            },
            net: {
                image: 'net.png',
                scale: 0.3,
            },
            jar: {
                image: 'jar.png',
                scale: 0.7,
            },
            jarX: 940,
            jarY: 330,
            area: { minX: 180, maxX: 700, minY: 120, maxY: 340 } // Khu vực rải đồ vật
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 553
    553: {
        gameId: 'frog_jump',
        config: {
            type: 'road',
            leaf: {
                image: 'rock2.png',
                scale: 0.45,
            },
            monkey: {
                scale: 0.3,
                offsetX: 0,
                offsetY: -75
            },
            x1: 100,
            y1: 150,
            x2: 920,
            y2: 300
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 554
    554: {
        gameId: 'collect_items',
        config: {
            items: [
                { image: 'ruby.png', count: 10, width: 80, height: 80 }
            ],
            container: {
                image: 'basket.png',
                x: 920,
                y: 340,
                width: 180,
                height: 180
            },
            layout: 'scatter_random', // Rải ngẫu nhiên trên màn hình
            area: { minX: 180, maxX: 700, minY: 120, maxY: 340 } // Khu vực rải đồ vật
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 555
    555: {
        gameId: 'assemble_object',
        config: {
            finishedObject: {
                image: 'shield_complete.png',
                x: 490,
                y: 220,
                scale: 0.65
            },
            parts: [
                {
                    id: 'shield_part1', image: 'shield_part1.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 1, partOffsetY: 140
                },
                {
                    id: 'shield_part2', image: 'shield_part2.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 2, partOffsetY: 160
                },
                {
                    id: 'shield_part3', image: 'shield_part3.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 3, partOffsetY: 145
                },
                {
                    id: 'shield_part4', image: 'shield_part4.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 4, partOffsetY: 115
                },
                {
                    id: 'shield_part5', image: 'shield_part5.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 5, partOffsetY: 105
                },
                {
                    id: 'shield_part6', image: 'shield_part6.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 6, partOffsetY: 115
                }
            ]
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 556
    556: {
        gameId: 'clear_fog',
        config: {
            fogScale: 1,
            image: 'fog6.png',
            x1: 250,
            y1: 140,
            x2: 750,
            y2: 270
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 557
    557: {
        gameId: 'bubble_shooter',
        config: {
            bubble: {
                image: 'rock2.png',
                scale: 0.7,
            },
            area: { minX: 150, maxX: 800, minY: 120, maxY: 320 }
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 558
    558: {
        gameId: 'assemble_object',
        config: {
            finishedObject: {
                image: 'shield_complete.png',
                x: 490,
                y: 220,
                scale: 0.65
            },
            parts: [
                {
                    id: 'shield_part1', image: 'shield_part1.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 1, partOffsetY: 140
                },
                {
                    id: 'shield_part2', image: 'shield_part2.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 2, partOffsetY: 160
                },
                {
                    id: 'shield_part3', image: 'shield_part3.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 3, partOffsetY: 145
                },
                {
                    id: 'shield_part4', image: 'shield_part4.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 4, partOffsetY: 115
                },
                {
                    id: 'shield_part5', image: 'shield_part5.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 5, partOffsetY: 105
                },
                {
                    id: 'shield_part6', image: 'shield_part6.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 6, partOffsetY: 115
                }
            ]
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 560
    560: {
        gameId: 'clear_fog',
        config: {
            fogScale: 1,
            image: 'fog2.png',
            x1: 250,
            y1: 140,
            x2: 750,
            y2: 270
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 561
    561: {
        gameId: 'rescue_animals',
        config: {
            animal: {
                image: 'rabbit.png',
                scale: 0.8,
            },
            cage: {
                image: 'cage.png',
                scale: 1,
            },
            x: 490,
            y: 230
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 562
    562: {
        gameId: 'bubble_shooter',
        config: {
            bubble: {
                image: 'bomb.png',
                scale: 0.8,
            },
            area: { minX: 150, maxX: 800, minY: 120, maxY: 320 }
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 563
    563: {
        gameId: 'whack_mole',
        config: {
            hole: {
                image: 'hole.png',
                scale: 0.4,
            },
            mole: {
                image: 'bandit.png',
                scale: 0.6,
                offsetX: 0,
                offsetY: -23
            },
            hammer: {
                image: 'hammer.png',
                scale: 0.4,
                offsetX: 20,
                offsetY: -50
            }
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 564
    564: {
        gameId: 'racing',
        config: {
            playerVehicle: {
                image: 'car1.png',
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
                image: 'car2.png',
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
    },
    // Tự động đồng bộ từ File 1: Lesson 565
    565: {
        gameId: 'grow_plant',
        config: {
            plant: {
                stages: [
                    { image: 'flower_tree1.png', scale: 0.7 },
                    { image: 'flower_tree2.png', scale: 0.7 },
                    { image: 'flower_tree3.png', scale: 0.7 },
                    { image: 'flower_tree4.png', scale: 0.7 },
                    { image: 'flower_tree7.png', scale: 0.7 }
                ]
            },
            x: 490,
            y: 390
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 566
    566: {
        gameId: 'catch_insects',
        config: {
            insect: {
                image: 'fairy.png',
                scale: 0.3,
            },
            net: {
                image: 'net.png',
                scale: 0.3,
            },
            jar: {
                image: 'jar.png',
                scale: 0.7,
            },
            jarX: 940,
            jarY: 330,
            area: { minX: 180, maxX: 700, minY: 120, maxY: 340 } // Khu vực rải đồ vật
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 567
    567: {
        gameId: 'frog_jump',
        config: {
            type: 'water',
            leaf: {
                image: 'rock.png',
                scale: 0.45,
            },
            monkey: {
                scale: 0.3,
                offsetX: 0,
                offsetY: -75
            },
            x1: 100,
            y1: 150,
            x2: 920,
            y2: 300
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 568
    568: {
        gameId: 'collect_items',
        config: {
            items: [
                { image: 'dragon_scale.png', count: 10, width: 72, height: 72 }
            ],
            container: {
                image: 'basket.png',
                x: 920,
                y: 340,
                width: 180,
                height: 180
            },
            layout: 'scatter_random', // Rải ngẫu nhiên trên màn hình
            area: { minX: 180, maxX: 700, minY: 120, maxY: 340 } // Khu vực rải đồ vật
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 569
    569: {
        gameId: 'assemble_object',
        config: {
            finishedObject: {
                image: 'shield_complete.png',
                x: 490,
                y: 220,
                scale: 0.65
            },
            parts: [
                {
                    id: 'shield_part1', image: 'shield_part1.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 1, partOffsetY: 140
                },
                {
                    id: 'shield_part2', image: 'shield_part2.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 2, partOffsetY: 160
                },
                {
                    id: 'shield_part3', image: 'shield_part3.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 3, partOffsetY: 145
                },
                {
                    id: 'shield_part4', image: 'shield_part4.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 4, partOffsetY: 115
                },
                {
                    id: 'shield_part5', image: 'shield_part5.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 5, partOffsetY: 105
                },
                {
                    id: 'shield_part6', image: 'shield_part6.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 6, partOffsetY: 115
                }
            ]
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 570
    570: {
        gameId: 'clear_fog',
        config: {
            fogScale: 1,
            image: 'fog6.png',
            x1: 250,
            y1: 140,
            x2: 750,
            y2: 270
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 571
    571: {
        gameId: 'bubble_shooter',
        config: {
            bubble: {
                image: 'mace.png',
                scale: 0.6,
            },
            area: { minX: 150, maxX: 800, minY: 120, maxY: 320 }
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 572
    572: {
        gameId: 'assemble_object',
        config: {
            finishedObject: {
                image: 'shield_complete.png',
                x: 490,
                y: 220,
                scale: 0.65
            },
            parts: [
                {
                    id: 'shield_part1', image: 'shield_part1.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 1, partOffsetY: 140
                },
                {
                    id: 'shield_part2', image: 'shield_part2.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 2, partOffsetY: 160
                },
                {
                    id: 'shield_part3', image: 'shield_part3.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 3, partOffsetY: 145
                },
                {
                    id: 'shield_part4', image: 'shield_part4.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 4, partOffsetY: 115
                },
                {
                    id: 'shield_part5', image: 'shield_part5.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 5, partOffsetY: 105
                },
                {
                    id: 'shield_part6', image: 'shield_part6.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 6, partOffsetY: 115
                }
            ]
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 574
    574: {
        gameId: 'clear_fog',
        config: {
            fogScale: 1,
            image: 'fog2.png',
            x1: 250,
            y1: 140,
            x2: 750,
            y2: 270
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 575
    575: {
        gameId: 'rescue_animals',
        config: {
            animal: {
                image: 'rabbit.png',
                scale: 0.8,
            },
            cage: {
                image: 'cage.png',
                scale: 1,
            },
            x: 490,
            y: 230
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 576
    576: {
        gameId: 'bubble_shooter',
        config: {
            bubble: {
                image: 'tnt.png',
                scale: 0.8,
            },
            area: { minX: 150, maxX: 800, minY: 120, maxY: 320 }
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 577
    577: {
        gameId: 'whack_mole',
        config: {
            hole: {
                image: 'hole.png',
                scale: 0.4,
            },
            mole: {
                image: 'bandit.png',
                scale: 0.6,
                offsetX: 0,
                offsetY: -23
            },
            hammer: {
                image: 'hammer.png',
                scale: 0.4,
                offsetX: 20,
                offsetY: -50
            }
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 578
    578: {
        gameId: 'racing',
        config: {
            playerVehicle: {
                image: 'car1.png',
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
                image: 'car2.png',
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
    },
    // Tự động đồng bộ từ File 1: Lesson 579
    579: {
        gameId: 'grow_plant',
        config: {
            plant: {
                stages: [
                    { image: 'tree1.png', scale: 0.4 },
                    { image: 'tree2.png', scale: 0.3 },
                    { image: 'tree3.png', scale: 0.6 },
                    { image: 'tree4.png', scale: 0.7 },
                    { image: 'tree5.png', scale: 0.75 }
                ]
            },
            x: 490,
            y: 390
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 580
    580: {
        gameId: 'catch_insects',
        config: {
            insect: {
                image: 'firefly.png',
                scale: 0.3,
            },
            net: {
                image: 'net.png',
                scale: 0.3,
            },
            jar: {
                image: 'jar.png',
                scale: 0.7,
            },
            jarX: 940,
            jarY: 330,
            area: { minX: 180, maxX: 700, minY: 120, maxY: 340 } // Khu vực rải đồ vật
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 581
    581: {
        gameId: 'frog_jump',
        config: {
            type: 'road',
            leaf: {
                image: 'rock2.png',
                scale: 0.45,
            },
            monkey: {
                scale: 0.3,
                offsetX: 0,
                offsetY: -75
            },
            x1: 100,
            y1: 150,
            x2: 920,
            y2: 300
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 582
    582: {
        gameId: 'collect_items',
        config: {
            items: [
                { image: 'badge.png', count: 10, width: 80, height: 80 }
            ],
            container: {
                image: 'basket.png',
                x: 920,
                y: 340,
                width: 180,
                height: 180
            },
            layout: 'scatter_random', // Rải ngẫu nhiên trên màn hình
            area: { minX: 180, maxX: 700, minY: 120, maxY: 340 } // Khu vực rải đồ vật
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 583
    583: {
        gameId: 'assemble_object',
        config: {
            finishedObject: {
                image: 'shield_complete.png',
                x: 490,
                y: 220,
                scale: 0.65
            },
            parts: [
                {
                    id: 'shield_part1', image: 'shield_part1.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 1, partOffsetY: 140
                },
                {
                    id: 'shield_part2', image: 'shield_part2.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 2, partOffsetY: 160
                },
                {
                    id: 'shield_part3', image: 'shield_part3.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 3, partOffsetY: 145
                },
                {
                    id: 'shield_part4', image: 'shield_part4.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 4, partOffsetY: 115
                },
                {
                    id: 'shield_part5', image: 'shield_part5.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 5, partOffsetY: 105
                },
                {
                    id: 'shield_part6', image: 'shield_part6.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 6, partOffsetY: 115
                }
            ]
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 584
    584: {
        gameId: 'clear_fog',
        config: {
            fogScale: 1,
            image: 'fog7.png',
            x1: 250,
            y1: 140,
            x2: 750,
            y2: 270
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 585
    585: {
        gameId: 'bubble_shooter',
        config: {
            bubble: {
                image: 'rock2.png',
                scale: 0.8,
            },
            area: { minX: 150, maxX: 800, minY: 120, maxY: 320 }
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 586
    586: {
        gameId: 'assemble_object',
        config: {
            finishedObject: {
                image: 'cup_complete.png',
                x: 490,
                y: 200,
                scale: 0.6
            },
            parts: [
                {
                    id: 'cup_part1', image: 'cup_part1.png', scaleX: 0.5, scaleY: 0.5, angle: 0,
                    offsetX: 0, offsetY: 0, order: 1, partOffsetY: 110
                },
                {
                    id: 'cup_part2', image: 'cup_part2.png', scaleX: 0.5, scaleY: 0.5, angle: 0,
                    offsetX: 0, offsetY: 0, order: 2, partOffsetY: 140
                },
                {
                    id: 'cup_part3', image: 'cup_part3.png', scaleX: 0.5, scaleY: 0.5, angle: 0,
                    offsetX: 0, offsetY: 0, order: 3, partOffsetY: 190
                },
                {
                    id: 'cup_part4', image: 'cup_part4.png', scaleX: 0.5, scaleY: 0.5, angle: 0,
                    offsetX: 0, offsetY: 0, order: 4, partOffsetY: 175
                },
                {
                    id: 'cup_part5', image: 'cup_part5.png', scaleX: 0.5, scaleY: 0.5, angle: 0,
                    offsetX: 0, offsetY: 0, order: 5, partOffsetY: 175
                },
                {
                    id: 'cup_part6', image: 'cup_part6.png', scaleX: 0.5, scaleY: 0.5, angle: 0,
                    offsetX: 0, offsetY: 0, order: 6, partOffsetY: 175
                }
            ]
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 588
    588: {
        gameId: 'clear_fog',
        config: {
            fogScale: 1,
            image: 'fog1.png',
            x1: 250,
            y1: 140,
            x2: 750,
            y2: 270
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 589
    589: {
        gameId: 'rescue_animals',
        config: {
            animal: {
                image: 'rabbit.png',
                scale: 0.8,
            },
            cage: {
                image: 'cage.png',
                scale: 1,
            },
            x: 490,
            y: 230
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 590
    590: {
        gameId: 'bubble_shooter',
        config: {
            bubble: {
                image: 'bubble.png',
                scale: 0.8,
            },
            area: { minX: 150, maxX: 800, minY: 120, maxY: 320 }
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 591
    591: {
        gameId: 'whack_mole',
        config: {
            hole: {
                image: 'hole.png',
                scale: 0.4,
            },
            mole: {
                image: 'robot.png',
                scale: 0.41,
                offsetX: 0,
                offsetY: -10
            },
            hammer: {
                image: 'hammer.png',
                scale: 0.4,
                offsetX: 20,
                offsetY: -50
            }
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 592
    592: {
        gameId: 'racing',
        config: {
            playerVehicle: {
                image: 'car1.png',
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
                image: 'car2.png',
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
    },
    // Tự động đồng bộ từ File 1: Lesson 593
    593: {
        gameId: 'grow_plant',
        config: {
            plant: {
                stages: [
                    { image: 'flower_tree1.png', scale: 0.7 },
                    { image: 'flower_tree2.png', scale: 0.7 },
                    { image: 'flower_tree3.png', scale: 0.7 },
                    { image: 'flower_tree4.png', scale: 0.7 },
                    { image: 'flower_tree7.png', scale: 0.7 }
                ]
            },
            x: 490,
            y: 390
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 594
    594: {
        gameId: 'catch_insects',
        config: {
            insect: {
                image: 'star.png',
                scale: 0.3,
            },
            net: {
                image: 'net.png',
                scale: 0.3,
            },
            jar: {
                image: 'jar.png',
                scale: 0.7,
            },
            jarX: 940,
            jarY: 330,
            area: { minX: 180, maxX: 700, minY: 120, maxY: 340 } // Khu vực rải đồ vật
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 595
    595: {
        gameId: 'frog_jump',
        config: {
            type: 'air',
            leaf: {
                image: 'space_station.png',
                scale: 0.45,
            },
            monkey: {
                scale: 0.3,
                offsetX: 0,
                offsetY: -65
            },
            x1: 100,
            y1: 150,
            x2: 920,
            y2: 300
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 596
    596: {
        gameId: 'collect_items',
        config: {
            items: [
                { image: 'plasma.png', count: 10, width: 72, height: 72 }
            ],
            container: {
                image: 'basket.png',
                x: 920,
                y: 340,
                width: 180,
                height: 180
            },
            layout: 'scatter_random', // Rải ngẫu nhiên trên màn hình
            area: { minX: 180, maxX: 700, minY: 120, maxY: 340 } // Khu vực rải đồ vật
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 597
    597: {
        gameId: 'assemble_object',
        config: {
            finishedObject: {
                image: 'shield_complete.png',
                x: 490,
                y: 220,
                scale: 0.65
            },
            parts: [
                {
                    id: 'shield_part1', image: 'shield_part1.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 1, partOffsetY: 140
                },
                {
                    id: 'shield_part2', image: 'shield_part2.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 2, partOffsetY: 160
                },
                {
                    id: 'shield_part3', image: 'shield_part3.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 3, partOffsetY: 145
                },
                {
                    id: 'shield_part4', image: 'shield_part4.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 4, partOffsetY: 115
                },
                {
                    id: 'shield_part5', image: 'shield_part5.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 5, partOffsetY: 105
                },
                {
                    id: 'shield_part6', image: 'shield_part6.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 6, partOffsetY: 115
                }
            ]
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 598
    598: {
        gameId: 'clear_fog',
        config: {
            fogScale: 1,
            image: 'fog2.png',
            x1: 250,
            y1: 140,
            x2: 750,
            y2: 270
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 599
    599: {
        gameId: 'bubble_shooter',
        config: {
            bubble: {
                image: 'rock2.png',
                scale: 0.6,
            },
            area: { minX: 150, maxX: 800, minY: 120, maxY: 320 }
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 600
    600: {
        gameId: 'assemble_object',
        config: {
            finishedObject: {
                image: 'shield_complete.png',
                x: 490,
                y: 220,
                scale: 0.65
            },
            parts: [
                {
                    id: 'shield_part1', image: 'shield_part1.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 1, partOffsetY: 140
                },
                {
                    id: 'shield_part2', image: 'shield_part2.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 2, partOffsetY: 160
                },
                {
                    id: 'shield_part3', image: 'shield_part3.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 3, partOffsetY: 145
                },
                {
                    id: 'shield_part4', image: 'shield_part4.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 4, partOffsetY: 115
                },
                {
                    id: 'shield_part5', image: 'shield_part5.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 5, partOffsetY: 105
                },
                {
                    id: 'shield_part6', image: 'shield_part6.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 6, partOffsetY: 115
                }
            ]
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 602
    602: {
        gameId: 'clear_fog',
        config: {
            fogScale: 1,
            image: 'fog3.png',
            x1: 250,
            y1: 140,
            x2: 750,
            y2: 270
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 603
    603: {
        gameId: 'rescue_animals',
        config: {
            animal: {
                image: 'rabbit.png',
                scale: 0.8,
            },
            cage: {
                image: 'cage.png',
                scale: 1,
            },
            x: 490,
            y: 230
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 604
    604: {
        gameId: 'bubble_shooter',
        config: {
            bubble: {
                image: 'bottle.png',
                scale: 0.6,
            },
            area: { minX: 150, maxX: 800, minY: 120, maxY: 320 }
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 605
    605: {
        gameId: 'whack_mole',
        config: {
            hole: {
                image: 'hole.png',
                scale: 0.4,
            },
            mole: {
                image: 'robot.png',
                scale: 0.41,
                offsetX: 0,
                offsetY: -10
            },
            hammer: {
                image: 'hammer.png',
                scale: 0.4,
                offsetX: 20,
                offsetY: -50
            }
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 606
    606: {
        gameId: 'racing',
        config: {
            playerVehicle: {
                image: 'car1.png',
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
                image: 'car2.png',
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
    },
    // Tự động đồng bộ từ File 1: Lesson 607
    607: {
        gameId: 'grow_plant',
        config: {
            plant: {
                stages: [
                    { image: 'flower_tree1.png', scale: 0.7 },
                    { image: 'flower_tree2.png', scale: 0.7 },
                    { image: 'flower_tree3.png', scale: 0.7 },
                    { image: 'flower_tree4.png', scale: 0.7 },
                    { image: 'flower_tree6.png', scale: 0.7 }
                ]
            },
            x: 490,
            y: 390
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 608
    608: {
        gameId: 'catch_insects',
        config: {
            insect: {
                image: 'star2.png',
                scale: 0.3,
            },
            net: {
                image: 'net.png',
                scale: 0.3,
            },
            jar: {
                image: 'jar.png',
                scale: 0.7,
            },
            jarX: 940,
            jarY: 330,
            area: { minX: 180, maxX: 700, minY: 120, maxY: 340 } // Khu vực rải đồ vật
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 609
    609: {
        gameId: 'frog_jump',
        config: {
            type: 'air',
            leaf: {
                image: 'space_station.png',
                scale: 0.45,
            },
            monkey: {
                scale: 0.3,
                offsetX: 0,
                offsetY: -65
            },
            x1: 100,
            y1: 150,
            x2: 920,
            y2: 300
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 610
    610: {
        gameId: 'collect_items',
        config: {
            items: [
                { image: 'crystal.png', count: 10, width: 72, height: 72 }
            ],
            container: {
                image: 'basket.png',
                x: 920,
                y: 340,
                width: 180,
                height: 180
            },
            layout: 'scatter_random', // Rải ngẫu nhiên trên màn hình
            area: { minX: 180, maxX: 700, minY: 120, maxY: 340 } // Khu vực rải đồ vật
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 611
    611: {
        gameId: 'assemble_object',
        config: {
            finishedObject: {
                image: 'shield_complete.png',
                x: 490,
                y: 220,
                scale: 0.65
            },
            parts: [
                {
                    id: 'shield_part1', image: 'shield_part1.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 1, partOffsetY: 140
                },
                {
                    id: 'shield_part2', image: 'shield_part2.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 2, partOffsetY: 160
                },
                {
                    id: 'shield_part3', image: 'shield_part3.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 3, partOffsetY: 145
                },
                {
                    id: 'shield_part4', image: 'shield_part4.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 4, partOffsetY: 115
                },
                {
                    id: 'shield_part5', image: 'shield_part5.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 5, partOffsetY: 105
                },
                {
                    id: 'shield_part6', image: 'shield_part6.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 6, partOffsetY: 115
                }
            ]
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 612
    612: {
        gameId: 'clear_fog',
        config: {
            fogScale: 1,
            image: 'fog7.png',
            x1: 250,
            y1: 140,
            x2: 750,
            y2: 270
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 613
    613: {
        gameId: 'bubble_shooter',
        config: {
            bubble: {
                image: 'thunderball.png',
                scale: 0.6,
            },
            area: { minX: 150, maxX: 800, minY: 120, maxY: 320 }
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 614
    614: {
        gameId: 'assemble_object',
        config: {
            finishedObject: {
                image: 'shield_complete.png',
                x: 490,
                y: 220,
                scale: 0.65
            },
            parts: [
                {
                    id: 'shield_part1', image: 'shield_part1.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 1, partOffsetY: 140
                },
                {
                    id: 'shield_part2', image: 'shield_part2.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 2, partOffsetY: 160
                },
                {
                    id: 'shield_part3', image: 'shield_part3.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 3, partOffsetY: 145
                },
                {
                    id: 'shield_part4', image: 'shield_part4.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 4, partOffsetY: 115
                },
                {
                    id: 'shield_part5', image: 'shield_part5.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 5, partOffsetY: 105
                },
                {
                    id: 'shield_part6', image: 'shield_part6.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 6, partOffsetY: 115
                }
            ]
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 616
    616: {
        gameId: 'clear_fog',
        config: {
            fogScale: 1,
            image: 'fog2.png',
            x1: 250,
            y1: 140,
            x2: 750,
            y2: 270
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 617
    617: {
        gameId: 'rescue_animals',
        config: {
            animal: {
                image: 'rabbit.png',
                scale: 0.8,
            },
            cage: {
                image: 'cage.png',
                scale: 1,
            },
            x: 490,
            y: 230
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 618
    618: {
        gameId: 'bubble_shooter',
        config: {
            bubble: {
                image: 'blackhole.png',
                scale: 0.8,
            },
            area: { minX: 150, maxX: 800, minY: 120, maxY: 320 }
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 619
    619: {
        gameId: 'whack_mole',
        config: {
            hole: {
                image: 'hole.png',
                scale: 0.4,
            },
            mole: {
                image: 'robot.png',
                scale: 0.41,
                offsetX: 0,
                offsetY: -10
            },
            hammer: {
                image: 'hammer.png',
                scale: 0.4,
                offsetX: 20,
                offsetY: -50
            }
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 620
    620: {
        gameId: 'racing',
        config: {
            playerVehicle: {
                image: 'car1.png',
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
                image: 'car2.png',
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
    },
    // Tự động đồng bộ từ File 1: Lesson 621
    621: {
        gameId: 'grow_plant',
        config: {
            plant: {
                stages: [
                    { image: 'flower_tree1.png', scale: 0.7 },
                    { image: 'flower_tree2.png', scale: 0.7 },
                    { image: 'flower_tree3.png', scale: 0.7 },
                    { image: 'flower_tree4.png', scale: 0.7 },
                    { image: 'flower_tree7.png', scale: 0.7 }
                ]
            },
            x: 490,
            y: 390
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 622
    622: {
        gameId: 'catch_insects',
        config: {
            insect: {
                image: 'star.png',
                scale: 0.3,
            },
            net: {
                image: 'net.png',
                scale: 0.3,
            },
            jar: {
                image: 'jar.png',
                scale: 0.7,
            },
            jarX: 940,
            jarY: 330,
            area: { minX: 180, maxX: 700, minY: 120, maxY: 340 } // Khu vực rải đồ vật
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 623
    623: {
        gameId: 'frog_jump',
        config: {
            type: 'air',
            leaf: {
                image: 'rock2.png',
                scale: 0.45,
            },
            monkey: {
                scale: 0.3,
                offsetX: 0,
                offsetY: -65
            },
            x1: 100,
            y1: 150,
            x2: 920,
            y2: 300
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 624
    624: {
        gameId: 'collect_items',
        config: {
            items: [
                { image: 'moon_stone.png', count: 8, width: 80, height: 80 }
            ],
            container: {
                image: 'basket.png',
                x: 920,
                y: 340,
                width: 180,
                height: 180
            },
            layout: 'scatter_random', // Rải ngẫu nhiên trên màn hình
            area: { minX: 180, maxX: 700, minY: 120, maxY: 340 } // Khu vực rải đồ vật
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 625
    625: {
        gameId: 'assemble_object',
        config: {
            finishedObject: {
                image: 'shield_complete.png',
                x: 490,
                y: 220,
                scale: 0.65
            },
            parts: [
                {
                    id: 'shield_part1', image: 'shield_part1.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 1, partOffsetY: 140
                },
                {
                    id: 'shield_part2', image: 'shield_part2.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 2, partOffsetY: 160
                },
                {
                    id: 'shield_part3', image: 'shield_part3.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 3, partOffsetY: 145
                },
                {
                    id: 'shield_part4', image: 'shield_part4.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 4, partOffsetY: 115
                },
                {
                    id: 'shield_part5', image: 'shield_part5.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 5, partOffsetY: 105
                },
                {
                    id: 'shield_part6', image: 'shield_part6.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 6, partOffsetY: 115
                }
            ]
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 626
    626: {
        gameId: 'clear_fog',
        config: {
            fogScale: 1,
            image: 'fog7.png',
            x1: 250,
            y1: 140,
            x2: 750,
            y2: 270
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 627
    627: {
        gameId: 'bubble_shooter',
        config: {
            bubble: {
                image: 'ice.png',
                scale: 0.6,
            },
            area: { minX: 150, maxX: 800, minY: 120, maxY: 320 }
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 628
    628: {
        gameId: 'assemble_object',
        config: {
            finishedObject: {
                image: 'shield_complete.png',
                x: 490,
                y: 220,
                scale: 0.65
            },
            parts: [
                {
                    id: 'shield_part1', image: 'shield_part1.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 1, partOffsetY: 140
                },
                {
                    id: 'shield_part2', image: 'shield_part2.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 2, partOffsetY: 160
                },
                {
                    id: 'shield_part3', image: 'shield_part3.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 3, partOffsetY: 145
                },
                {
                    id: 'shield_part4', image: 'shield_part4.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 4, partOffsetY: 115
                },
                {
                    id: 'shield_part5', image: 'shield_part5.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 5, partOffsetY: 105
                },
                {
                    id: 'shield_part6', image: 'shield_part6.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 6, partOffsetY: 115
                }
            ]
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 630
    630: {
        gameId: 'clear_fog',
        config: {
            fogScale: 1,
            image: 'fog8.png',
            x1: 250,
            y1: 140,
            x2: 750,
            y2: 270
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 631
    631: {
        gameId: 'rescue_animals',
        config: {
            animal: {
                image: 'rabbit.png',
                scale: 0.8,
            },
            cage: {
                image: 'cage.png',
                scale: 1,
            },
            x: 490,
            y: 230
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 632
    632: {
        gameId: 'bubble_shooter',
        config: {
            bubble: {
                image: 'ice.png',
                scale: 0.6,
            },
            area: { minX: 150, maxX: 800, minY: 120, maxY: 320 }
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 633
    633: {
        gameId: 'whack_mole',
        config: {
            hole: {
                image: 'hole.png',
                scale: 0.4,
            },
            mole: {
                image: 'robot.png',
                scale: 0.41,
                offsetX: 0,
                offsetY: -10
            },
            hammer: {
                image: 'hammer.png',
                scale: 0.4,
                offsetX: 20,
                offsetY: -50
            }
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 634
    634: {
        gameId: 'racing',
        config: {
            playerVehicle: {
                image: 'car1.png',
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
                image: 'car2.png',
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
    },
    // Tự động đồng bộ từ File 1: Lesson 635
    635: {
        gameId: 'grow_plant',
        config: {
            plant: {
                stages: [
                    { image: 'flower_tree1.png', scale: 0.7 },
                    { image: 'flower_tree2.png', scale: 0.7 },
                    { image: 'flower_tree3.png', scale: 0.7 },
                    { image: 'flower_tree4.png', scale: 0.7 },
                    { image: 'flower_tree6.png', scale: 0.7 }
                ]
            },
            x: 490,
            y: 390
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 636
    636: {
        gameId: 'catch_insects',
        config: {
            insect: {
                image: 'star2.png',
                scale: 0.3,
            },
            net: {
                image: 'net.png',
                scale: 0.3,
            },
            jar: {
                image: 'jar.png',
                scale: 0.7,
            },
            jarX: 940,
            jarY: 330,
            area: { minX: 180, maxX: 700, minY: 120, maxY: 340 } // Khu vực rải đồ vật
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 637
    637: {
        gameId: 'frog_jump',
        config: {
            type: 'air',
            leaf: {
                image: 'rock2.png',
                scale: 0.45,
            },
            monkey: {
                scale: 0.3,
                offsetX: 0,
                offsetY: -65
            },
            x1: 100,
            y1: 150,
            x2: 920,
            y2: 300
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 638
    638: {
        gameId: 'collect_items',
        config: {
            items: [
                { image: 'crystal.png', count: 8, width: 80, height: 80 }
            ],
            container: {
                image: 'basket.png',
                x: 920,
                y: 340,
                width: 180,
                height: 180
            },
            layout: 'scatter_random', // Rải ngẫu nhiên trên màn hình
            area: { minX: 180, maxX: 700, minY: 120, maxY: 340 } // Khu vực rải đồ vật
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 639
    639: {
        gameId: 'assemble_object',
        config: {
            finishedObject: {
                image: 'shield_complete.png',
                x: 490,
                y: 220,
                scale: 0.65
            },
            parts: [
                {
                    id: 'shield_part1', image: 'shield_part1.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 1, partOffsetY: 140
                },
                {
                    id: 'shield_part2', image: 'shield_part2.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 2, partOffsetY: 160
                },
                {
                    id: 'shield_part3', image: 'shield_part3.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 3, partOffsetY: 145
                },
                {
                    id: 'shield_part4', image: 'shield_part4.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 4, partOffsetY: 115
                },
                {
                    id: 'shield_part5', image: 'shield_part5.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 5, partOffsetY: 105
                },
                {
                    id: 'shield_part6', image: 'shield_part6.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 6, partOffsetY: 115
                }
            ]
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 640
    640: {
        gameId: 'clear_fog',
        config: {
            fogScale: 1,
            image: 'fog6.png',
            x1: 250,
            y1: 140,
            x2: 750,
            y2: 270
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 641
    641: {
        gameId: 'bubble_shooter',
        config: {
            bubble: {
                image: 'fireball.png',
                scale: 0.6,
                randomAngle: false
            },
            area: { minX: 150, maxX: 800, minY: 120, maxY: 320 }
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 642
    642: {
        gameId: 'assemble_object',
        config: {
            finishedObject: {
                image: 'shield_complete.png',
                x: 490,
                y: 220,
                scale: 0.65
            },
            parts: [
                {
                    id: 'shield_part1', image: 'shield_part1.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 1, partOffsetY: 140
                },
                {
                    id: 'shield_part2', image: 'shield_part2.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 2, partOffsetY: 160
                },
                {
                    id: 'shield_part3', image: 'shield_part3.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 3, partOffsetY: 145
                },
                {
                    id: 'shield_part4', image: 'shield_part4.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 4, partOffsetY: 115
                },
                {
                    id: 'shield_part5', image: 'shield_part5.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 5, partOffsetY: 105
                },
                {
                    id: 'shield_part6', image: 'shield_part6.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 6, partOffsetY: 115
                }
            ]
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 644
    644: {
        gameId: 'clear_fog',
        config: {
            fogScale: 1,
            image: 'fog3.png',
            x1: 250,
            y1: 140,
            x2: 750,
            y2: 270
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 645
    645: {
        gameId: 'rescue_animals',
        config: {
            animal: {
                image: 'rabbit.png',
                scale: 0.8,
            },
            cage: {
                image: 'cage.png',
                scale: 1,
            },
            x: 490,
            y: 230
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 646
    646: {
        gameId: 'bubble_shooter',
        config: {
            bubble: {
                image: 'bubble2.png',
                scale: 0.8,
            },
            area: { minX: 150, maxX: 800, minY: 120, maxY: 320 }
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 647
    647: {
        gameId: 'whack_mole',
        config: {
            hole: {
                image: 'hole.png',
                scale: 0.4,
            },
            mole: {
                image: 'robot.png',
                scale: 0.41,
                offsetX: 0,
                offsetY: -10
            },
            hammer: {
                image: 'hammer.png',
                scale: 0.4,
                offsetX: 20,
                offsetY: -50
            }
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 648
    648: {
        gameId: 'racing',
        config: {
            playerVehicle: {
                image: 'car1.png',
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
                image: 'car2.png',
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
    },
    // Tự động đồng bộ từ File 1: Lesson 649
    649: {
        gameId: 'grow_plant',
        config: {
            plant: {
                stages: [
                    { image: 'flower_tree1.png', scale: 0.7 },
                    { image: 'flower_tree2.png', scale: 0.7 },
                    { image: 'flower_tree3.png', scale: 0.7 },
                    { image: 'flower_tree4.png', scale: 0.7 },
                    { image: 'flower_tree7.png', scale: 0.7 }
                ]
            },
            x: 490,
            y: 390
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 650
    650: {
        gameId: 'catch_insects',
        config: {
            insect: {
                image: 'star.png',
                scale: 0.3,
            },
            net: {
                image: 'net.png',
                scale: 0.3,
            },
            jar: {
                image: 'jar.png',
                scale: 0.7,
            },
            jarX: 940,
            jarY: 330,
            area: { minX: 180, maxX: 700, minY: 120, maxY: 340 } // Khu vực rải đồ vật
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 651
    651: {
        gameId: 'frog_jump',
        config: {
            type: 'air',
            leaf: {
                image: 'iceberg.png',
                scale: 0.45,
            },
            monkey: {
                scale: 0.3,
                offsetX: 0,
                offsetY: -65
            },
            x1: 100,
            y1: 150,
            x2: 920,
            y2: 300
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 652
    652: {
        gameId: 'collect_items',
        config: {
            items: [
                { image: 'crystal.png', count: 10, width: 96, height: 96 }
            ],
            container: {
                image: 'basket.png',
                x: 920,
                y: 340,
                width: 180,
                height: 180
            },
            layout: 'scatter_random', // Rải ngẫu nhiên trên màn hình
            area: { minX: 180, maxX: 700, minY: 120, maxY: 340 } // Khu vực rải đồ vật
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 653
    653: {
        gameId: 'assemble_object',
        config: {
            finishedObject: {
                image: 'shield_complete.png',
                x: 490,
                y: 220,
                scale: 0.65
            },
            parts: [
                {
                    id: 'shield_part1', image: 'shield_part1.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 1, partOffsetY: 140
                },
                {
                    id: 'shield_part2', image: 'shield_part2.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 2, partOffsetY: 160
                },
                {
                    id: 'shield_part3', image: 'shield_part3.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 3, partOffsetY: 145
                },
                {
                    id: 'shield_part4', image: 'shield_part4.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 4, partOffsetY: 115
                },
                {
                    id: 'shield_part5', image: 'shield_part5.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 5, partOffsetY: 105
                },
                {
                    id: 'shield_part6', image: 'shield_part6.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 6, partOffsetY: 115
                }
            ]
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 654
    654: {
        gameId: 'clear_fog',
        config: {
            fogScale: 1,
            image: 'fog6.png',
            x1: 250,
            y1: 140,
            x2: 750,
            y2: 270
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 655
    655: {
        gameId: 'bubble_shooter',
        config: {
            bubble: {
                image: 'bubble2.png',
                scale: 0.8,
            },
            area: { minX: 150, maxX: 800, minY: 120, maxY: 320 }
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 656
    656: {
        gameId: 'assemble_object',
        config: {
            finishedObject: {
                image: 'shield_complete.png',
                x: 490,
                y: 220,
                scale: 0.65
            },
            parts: [
                {
                    id: 'shield_part1', image: 'shield_part1.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 1, partOffsetY: 140
                },
                {
                    id: 'shield_part2', image: 'shield_part2.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 2, partOffsetY: 160
                },
                {
                    id: 'shield_part3', image: 'shield_part3.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 3, partOffsetY: 145
                },
                {
                    id: 'shield_part4', image: 'shield_part4.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 4, partOffsetY: 115
                },
                {
                    id: 'shield_part5', image: 'shield_part5.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 5, partOffsetY: 105
                },
                {
                    id: 'shield_part6', image: 'shield_part6.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 6, partOffsetY: 115
                }
            ]
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 658
    658: {
        gameId: 'clear_fog',
        config: {
            fogScale: 1,
            image: 'fog2.png',
            x1: 250,
            y1: 140,
            x2: 750,
            y2: 270
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 659
    659: {
        gameId: 'rescue_animals',
        config: {
            animal: {
                image: 'rabbit.png',
                scale: 0.8,
            },
            cage: {
                image: 'cage.png',
                scale: 1,
            },
            x: 490,
            y: 230
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 660
    660: {
        gameId: 'bubble_shooter',
        config: {
            bubble: {
                image: 'bottle.png',
                scale: 0.8,
            },
            area: { minX: 150, maxX: 800, minY: 120, maxY: 320 }
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 661
    661: {
        gameId: 'whack_mole',
        config: {
            hole: {
                image: 'hole.png',
                scale: 0.4,
            },
            mole: {
                image: 'robot.png',
                scale: 0.41,
                offsetX: 0,
                offsetY: -10
            },
            hammer: {
                image: 'hammer.png',
                scale: 0.4,
                offsetX: 20,
                offsetY: -50
            }
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 662
    662: {
        gameId: 'racing',
        config: {
            playerVehicle: {
                image: 'car1.png',
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
                image: 'car2.png',
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
    },
    // Tự động đồng bộ từ File 1: Lesson 663
    663: {
        gameId: 'grow_plant',
        config: {
            plant: {
                stages: [
                    { image: 'tree1.png', scale: 0.4 },
                    { image: 'tree2.png', scale: 0.3 },
                    { image: 'tree3.png', scale: 0.6 },
                    { image: 'tree4.png', scale: 0.7 },
                    { image: 'tree5.png', scale: 0.75 }
                ]
            },
            x: 490,
            y: 390
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 664
    664: {
        gameId: 'catch_insects',
        config: {
            insect: {
                image: 'ladybug.png',
                scale: 0.3,
            },
            net: {
                image: 'net.png',
                scale: 0.3,
            },
            jar: {
                image: 'jar.png',
                scale: 0.7,
            },
            jarX: 940,
            jarY: 330,
            area: { minX: 180, maxX: 700, minY: 120, maxY: 340 } // Khu vực rải đồ vật
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 665
    665: {
        gameId: 'frog_jump',
        config: {
            type: 'water',
            leaf: {
                image: 'mushroom.png',
                scale: 0.45,
            },
            monkey: {
                scale: 0.3,
                offsetX: 0,
                offsetY: -80
            },
            x1: 100,
            y1: 150,
            x2: 920,
            y2: 300
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 666
    666: {
        gameId: 'collect_items',
        config: {
            items: [
                { image: 'crystal.png', count: 10, width: 80, height: 80 }
            ],
            container: {
                image: 'basket.png',
                x: 920,
                y: 340,
                width: 180,
                height: 180
            },
            layout: 'scatter_random', // Rải ngẫu nhiên trên màn hình
            area: { minX: 180, maxX: 700, minY: 120, maxY: 340 } // Khu vực rải đồ vật
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 667
    667: {
        gameId: 'assemble_object',
        config: {
            finishedObject: {
                image: 'shield_complete.png',
                x: 490,
                y: 220,
                scale: 0.65
            },
            parts: [
                {
                    id: 'shield_part1', image: 'shield_part1.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 1, partOffsetY: 140
                },
                {
                    id: 'shield_part2', image: 'shield_part2.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 2, partOffsetY: 160
                },
                {
                    id: 'shield_part3', image: 'shield_part3.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 3, partOffsetY: 145
                },
                {
                    id: 'shield_part4', image: 'shield_part4.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 4, partOffsetY: 115
                },
                {
                    id: 'shield_part5', image: 'shield_part5.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 5, partOffsetY: 105
                },
                {
                    id: 'shield_part6', image: 'shield_part6.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 6, partOffsetY: 115
                }
            ]
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 668
    668: {
        gameId: 'clear_fog',
        config: {
            fogScale: 1,
            image: 'fog6.png',
            x1: 250,
            y1: 140,
            x2: 750,
            y2: 270
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 669
    669: {
        gameId: 'bubble_shooter',
        config: {
            bubble: {
                image: 'rock2.png',
                scale: 0.6,
            },
            area: { minX: 150, maxX: 800, minY: 120, maxY: 320 }
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 670
    670: {
        gameId: 'assemble_object',
        config: {
            finishedObject: {
                image: 'shield_complete.png',
                x: 490,
                y: 220,
                scale: 0.65
            },
            parts: [
                {
                    id: 'shield_part1', image: 'shield_part1.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 1, partOffsetY: 140
                },
                {
                    id: 'shield_part2', image: 'shield_part2.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 2, partOffsetY: 160
                },
                {
                    id: 'shield_part3', image: 'shield_part3.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 3, partOffsetY: 145
                },
                {
                    id: 'shield_part4', image: 'shield_part4.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 4, partOffsetY: 115
                },
                {
                    id: 'shield_part5', image: 'shield_part5.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 5, partOffsetY: 105
                },
                {
                    id: 'shield_part6', image: 'shield_part6.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 6, partOffsetY: 115
                }
            ]
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 672
    672: {
        gameId: 'clear_fog',
        config: {
            fogScale: 1,
            image: 'fog2.png',
            x1: 250,
            y1: 140,
            x2: 750,
            y2: 270
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 673
    673: {
        gameId: 'rescue_animals',
        config: {
            animal: {
                image: 'rabbit.png',
                scale: 0.8,
            },
            cage: {
                image: 'cage.png',
                scale: 1,
            },
            x: 490,
            y: 230
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 674
    674: {
        gameId: 'bubble_shooter',
        config: {
            bubble: {
                image: 'bubble.png',
                scale: 0.8,
            },
            area: { minX: 150, maxX: 800, minY: 120, maxY: 320 }
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 675
    675: {
        gameId: 'whack_mole',
        config: {
            hole: {
                image: 'hole.png',
                scale: 0.4,
            },
            mole: {
                image: 'robot.png',
                scale: 0.41,
                offsetX: 0,
                offsetY: -10
            },
            hammer: {
                image: 'hammer.png',
                scale: 0.4,
                offsetX: 20,
                offsetY: -50
            }
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 676
    676: {
        gameId: 'racing',
        config: {
            playerVehicle: {
                image: 'car1.png',
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
                image: 'car2.png',
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
    },
    // Tự động đồng bộ từ File 1: Lesson 677
    677: {
        gameId: 'grow_plant',
        config: {
            plant: {
                stages: [
                    { image: 'flower_tree1.png', scale: 0.7 },
                    { image: 'flower_tree2.png', scale: 0.7 },
                    { image: 'flower_tree3.png', scale: 0.7 },
                    { image: 'flower_tree4.png', scale: 0.7 },
                    { image: 'flower_tree7.png', scale: 0.7 }
                ]
            },
            x: 490,
            y: 390
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 678
    678: {
        gameId: 'catch_insects',
        config: {
            insect: {
                image: 'plasma.png',
                scale: 0.3,
            },
            net: {
                image: 'net.png',
                scale: 0.3,
            },
            jar: {
                image: 'jar.png',
                scale: 0.7,
            },
            jarX: 940,
            jarY: 330,
            area: { minX: 180, maxX: 700, minY: 120, maxY: 340 } // Khu vực rải đồ vật
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 679
    679: {
        gameId: 'frog_jump',
        config: {
            type: 'air',
            leaf: {
                image: 'rock2.png',
                scale: 0.45,
            },
            monkey: {
                scale: 0.3,
                offsetX: 0,
                offsetY: -65
            },
            x1: 100,
            y1: 150,
            x2: 920,
            y2: 300
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 680
    680: {
        gameId: 'collect_items',
        config: {
            items: [
                { image: 'crystal.png', count: 10, width: 80, height: 80 }
            ],
            container: {
                image: 'basket.png',
                x: 920,
                y: 340,
                width: 180,
                height: 180
            },
            layout: 'scatter_random', // Rải ngẫu nhiên trên màn hình
            area: { minX: 180, maxX: 700, minY: 120, maxY: 340 } // Khu vực rải đồ vật
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 681
    681: {
        gameId: 'assemble_object',
        config: {
            finishedObject: {
                image: 'shield_complete.png',
                x: 490,
                y: 220,
                scale: 0.65
            },
            parts: [
                {
                    id: 'shield_part1', image: 'shield_part1.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 1, partOffsetY: 140
                },
                {
                    id: 'shield_part2', image: 'shield_part2.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 2, partOffsetY: 160
                },
                {
                    id: 'shield_part3', image: 'shield_part3.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 3, partOffsetY: 145
                },
                {
                    id: 'shield_part4', image: 'shield_part4.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 4, partOffsetY: 115
                },
                {
                    id: 'shield_part5', image: 'shield_part5.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 5, partOffsetY: 105
                },
                {
                    id: 'shield_part6', image: 'shield_part6.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 6, partOffsetY: 115
                }
            ]
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 682
    682: {
        gameId: 'clear_fog',
        config: {
            fogScale: 1,
            image: 'fog6.png',
            x1: 250,
            y1: 140,
            x2: 750,
            y2: 270
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 683
    683: {
        gameId: 'bubble_shooter',
        config: {
            bubble: {
                image: 'meteorite.png',
                scale: 0.8,
                randomAngle: false
            },
            area: { minX: 150, maxX: 800, minY: 120, maxY: 320 }
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 684
    684: {
        gameId: 'assemble_object',
        config: {
            finishedObject: {
                image: 'shield_complete.png',
                x: 490,
                y: 220,
                scale: 0.65
            },
            parts: [
                {
                    id: 'shield_part1', image: 'shield_part1.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 1, partOffsetY: 140
                },
                {
                    id: 'shield_part2', image: 'shield_part2.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 2, partOffsetY: 160
                },
                {
                    id: 'shield_part3', image: 'shield_part3.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 3, partOffsetY: 145
                },
                {
                    id: 'shield_part4', image: 'shield_part4.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 4, partOffsetY: 115
                },
                {
                    id: 'shield_part5', image: 'shield_part5.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 5, partOffsetY: 105
                },
                {
                    id: 'shield_part6', image: 'shield_part6.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 6, partOffsetY: 115
                }
            ]
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 686
    686: {
        gameId: 'clear_fog',
        config: {
            fogScale: 1,
            image: 'fog1.png',
            x1: 250,
            y1: 140,
            x2: 750,
            y2: 270
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 687
    687: {
        gameId: 'rescue_animals',
        config: {
            animal: {
                image: 'rabbit.png',
                scale: 0.8,
            },
            cage: {
                image: 'cage.png',
                scale: 1,
            },
            x: 490,
            y: 230
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 688
    688: {
        gameId: 'bubble_shooter',
        config: {
            bubble: {
                image: 'thunderball.png',
                scale: 0.8,
            },
            area: { minX: 150, maxX: 800, minY: 120, maxY: 320 }
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 689
    689: {
        gameId: 'whack_mole',
        config: {
            hole: {
                image: 'hole.png',
                scale: 0.4,
            },
            mole: {
                image: 'robot.png',
                scale: 0.41,
                offsetX: 0,
                offsetY: -10
            },
            hammer: {
                image: 'hammer.png',
                scale: 0.4,
                offsetX: 20,
                offsetY: -50
            }
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 690
    690: {
        gameId: 'racing',
        config: {
            playerVehicle: {
                image: 'car1.png',
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
                image: 'car2.png',
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
    },
    // Tự động đồng bộ từ File 1: Lesson 691
    691: {
        gameId: 'grow_plant',
        config: {
            plant: {
                stages: [
                    { image: 'flower_tree1.png', scale: 0.7 },
                    { image: 'flower_tree2.png', scale: 0.7 },
                    { image: 'flower_tree3.png', scale: 0.7 },
                    { image: 'flower_tree4.png', scale: 0.7 },
                    { image: 'flower_tree6.png', scale: 0.7 }
                ]
            },
            x: 490,
            y: 390
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 692
    692: {
        gameId: 'catch_insects',
        config: {
            insect: {
                image: 'star.png',
                scale: 0.3,
            },
            net: {
                image: 'net.png',
                scale: 0.3,
            },
            jar: {
                image: 'jar.png',
                scale: 0.7,
            },
            jarX: 940,
            jarY: 330,
            area: { minX: 180, maxX: 700, minY: 120, maxY: 340 } // Khu vực rải đồ vật
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 693
    693: {
        gameId: 'frog_jump',
        config: {
            type: 'air',
            leaf: {
                image: 'planet.png',
                scale: 0.45,
            },
            monkey: {
                scale: 0.3,
                offsetX: 0,
                offsetY: -65
            },
            x1: 100,
            y1: 150,
            x2: 920,
            y2: 300
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 694
    694: {
        gameId: 'collect_items',
        config: {
            items: [
                { image: 'infinite_piece.png', count: 10, width: 72, height: 72 }
            ],
            container: {
                image: 'basket.png',
                x: 920,
                y: 340,
                width: 180,
                height: 180
            },
            layout: 'scatter_random', // Rải ngẫu nhiên trên màn hình
            area: { minX: 180, maxX: 700, minY: 120, maxY: 340 } // Khu vực rải đồ vật
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 695
    695: {
        gameId: 'assemble_object',
        config: {
            finishedObject: {
                image: 'shield_complete.png',
                x: 490,
                y: 220,
                scale: 0.65
            },
            parts: [
                {
                    id: 'shield_part1', image: 'shield_part1.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 1, partOffsetY: 140
                },
                {
                    id: 'shield_part2', image: 'shield_part2.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 2, partOffsetY: 160
                },
                {
                    id: 'shield_part3', image: 'shield_part3.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 3, partOffsetY: 145
                },
                {
                    id: 'shield_part4', image: 'shield_part4.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 4, partOffsetY: 115
                },
                {
                    id: 'shield_part5', image: 'shield_part5.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 5, partOffsetY: 105
                },
                {
                    id: 'shield_part6', image: 'shield_part6.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 6, partOffsetY: 115
                }
            ]
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 696
    696: {
        gameId: 'clear_fog',
        config: {
            fogScale: 1,
            image: 'fog6.png',
            x1: 250,
            y1: 140,
            x2: 750,
            y2: 270
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 697
    697: {
        gameId: 'bubble_shooter',
        config: {
            bubble: {
                image: 'thunderball.png',
                scale: 0.8,
            },
            area: { minX: 150, maxX: 800, minY: 120, maxY: 320 }
        },
    },
    // Tự động đồng bộ từ File 1: Lesson 698
    698: {
        gameId: 'assemble_object',
        config: {
            finishedObject: {
                image: 'shield_complete.png',
                x: 490,
                y: 220,
                scale: 0.65
            },
            parts: [
                {
                    id: 'shield_part1', image: 'shield_part1.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 1, partOffsetY: 140
                },
                {
                    id: 'shield_part2', image: 'shield_part2.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 2, partOffsetY: 160
                },
                {
                    id: 'shield_part3', image: 'shield_part3.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 3, partOffsetY: 145
                },
                {
                    id: 'shield_part4', image: 'shield_part4.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 4, partOffsetY: 115
                },
                {
                    id: 'shield_part5', image: 'shield_part5.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 5, partOffsetY: 105
                },
                {
                    id: 'shield_part6', image: 'shield_part6.png', scaleX: 0.4, scaleY: 0.4, angle: 0,
                    offsetX: 0, offsetY: 0, order: 6, partOffsetY: 115
                }
            ]
        },
    },
};