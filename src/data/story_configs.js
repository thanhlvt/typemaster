// Cấu hình cốt truyện (Dialogue) cho các bài học
// Hỗ trợ hai nhân vật: 'monkey' (hiển thị skin hiện tại) và 'boss' (hiển thị boss của group chapter hiện tại)

export const STORY_CONFIGS = {
    // Lesson 0 (Bài đầu tiên của chương 1)
    0: {
        preGame: [
            { character: 'monkey', text: "Ôi kìa! Có rất nhiều quả chuối và nấm ngon đang rải rác trên bãi cỏ kìa!" },
            { character: 'boss', text: "Hừm, khu rừng này là của ta! Các ngươi đừng hòng thu thập hết đống thức ăn này!" },
            { character: 'monkey', text: "Chúng mình hãy cùng nhau gõ thật nhanh và chính xác để nhặt chúng vào giỏ trước khi Sói già lấy mất nhé!" }
        ],
        postGame: [
            { character: 'monkey', text: "Thật tuyệt vời! Chúng mình đã thu thập toàn bộ thức ăn rồi. Cảm ơn bạn rất nhiều!" },
            { character: 'boss', text: "Được lắm, lần này coi như các ngươi may mắn. Ta sẽ phục hận ở chặng sau!" }
        ]
    },
    // Lesson 1 (Bài đua xe thử nghiệm)
    1: {
        preGame: [
            { character: 'monkey', text: "Nào, cùng lên xe và thực hiện một chuyến đua tốc độ thôi nào!" },
            { character: 'boss', text: "Ha! Chiếc xe cà tàng của ngươi làm sao thắng nổi siêu xe của ta!" }
        ],
        postGame: [
            { character: 'monkey', text: "Wow, chúng mình đã cán đích đầu tiên rồi! Xe gõ phím chạy nhanh thật đấy!" }
        ]
    },
    // Lesson 2 (Bài lắp ráp thử nghiệm)
    2: {
        preGame: [
            { character: 'monkey', text: "Nhìn xem, tớ tìm thấy bản thiết kế một chiếc xe tải chở chuối siêu to khổng lồ này!" },
            { character: 'monkey', text: "Hãy giúp tớ gõ đúng để lắp ráp từng bộ phận của chiếc xe nhé!" }
        ],
        postGame: [
            { character: 'monkey', text: "Chiếc xe tải chở chuối hoàn thành rồi! Trông thật đẹp và ngầu!" }
        ]
    }
};
