// Cấu hình cốt truyện (Dialogue) cho các bài học
// Hỗ trợ hai nhân vật: 'monkey' (hiển thị skin hiện tại) và 'boss' (hiển thị boss của group chapter hiện tại)

export const STORY_CONFIGS = {
    // Lesson 0 - 13 (Group: Khu rừng, Chapter 1: Cây non, Boss: Sói Già)
    0: {
        minigame: 'collect_items',
        preGame: [
            { character: 'monkey', text: "Chào mừng bạn đến với Khu rừng Cây Non! Nơi này vốn rất yên bình, các bạn nhỏ được vui chơi thoả thích." },
            { character: 'monkey', text: "Nhưng một ngày, một gã Sói Già hung ác xuất hiện và âm mưu phá hoại mọi thứ." },
            { character: 'boss', text: "Khè khè! Khu rừng này sớm muộn cũng thuộc về ta! Bắt đầu từ bãi cỏ đầy thức ăn này, ta sẽ cướp hết!" },
            { character: 'monkey', text: "Ôi không, hắn định cướp thức ăn của các bạn động vật kìa!" },
            { character: 'monkey', text: "Hãy cùng nhau gõ thật nhanh để nhặt hết chuối và nấm vào giỏ trước khi Sói Già lấy mất nhé!" }
        ],
        postGame: [
            { character: 'monkey', text: "Thật tuyệt vời! Chúng mình đã thu thập toàn bộ thức ăn rồi. Cảm ơn bạn rất nhiều!" },
            { character: 'boss', text: "Được lắm, lần này coi như các ngươi may mắn. Ta sẽ phục hận ở chặng sau!" }
        ]
    },
    1: {
        minigame: 'racing',
        preGame: [
            { character: 'monkey', text: "Nào, cùng lên xe và thực hiện một chuyến đua tốc độ thôi nào!" },
            { character: 'boss', text: "Ha! Chiếc xe cà tàng của ngươi làm sao thắng nổi siêu xe của ta!" }
        ],
        postGame: [
            { character: 'monkey', text: "Wow, chúng mình đã về đích rồi! Bạn chạy nhanh thật đấy!" }
        ]
    },
    2: {
        minigame: 'assemble_object',
        preGame: [
            { character: 'monkey', text: "Nhìn xem, tớ tìm thấy bản thiết kế một chiếc xe tải chở chuối siêu to khổng lồ này!" },
            { character: 'monkey', text: "Hãy giúp tớ gõ đúng để lắp ráp từng bộ phận của chiếc xe nhé!" }
        ],
        postGame: [
            { character: 'monkey', text: "Chiếc xe tải chở chuối hoàn thành rồi! Trông thật đẹp và ngầu!" }
        ]
    },
    3: {
        minigame: 'rescue_animals',
        preGame: [
            { character: 'monkey', text: "Sói Già nhốt bạn Thỏ con vào lồng gỗ rồi! Gõ thật đúng để phá vỡ cũi cứu bạn ấy nào!" },
            { character: 'boss', text: "Con thỏ đó là chiến lợi phẩm của ta! Khôn hồn thì tránh ra!" }
        ],
        postGame: [
            { character: 'monkey', text: "Thỏ con đã an toàn rồi. Sói Già thật độc ác, chúng ta phải ngăn hắn lại!" }
        ]
    },
    4: {
        minigame: 'grow_plant',
        preGame: [
            { character: 'monkey', text: "Sói Già chạy qua làm các mầm cây non rạp hết xuống đất. Hãy gọi những giọt mưa phép thuật để giúp cây lớn nhanh!" }
        ],
        postGame: [
            { character: 'monkey', text: "Mầm cây đã vươn lên mạnh mẽ. Sói Già không thể dễ dàng giẫm nát chúng nữa rồi!" }
        ]
    },
    5: {
        minigame: 'catch_insects',
        preGame: [
            { character: 'monkey', text: "Tiếng hú của Sói làm bầy bướm hoảng sợ bay loạn xạ. Dùng vợt nhẹ nhàng đón các bạn ấy vào hộp để bảo vệ nhé!" }
        ],
        postGame: [
            { character: 'monkey', text: "Bầy bướm đã được an toàn. Giờ thì tiếp tục lần theo dấu chân Sói thôi!" }
        ]
    },
    6: {
        minigame: 'clear_fog',
        preGame: [
            { character: 'boss', text: "Khè khè! Ta sẽ nhả khói mù mịt, đố các ngươi tìm thấy vườn cây non tiếp theo!" },
            { character: 'monkey', text: "Đừng lo! Hãy gõ phím thật nhanh để thổi bay lớp sương mù đen kịt này đi!" }
        ],
        postGame: [
            { character: 'monkey', text: "Sương mù đã tan hết, khu vườn vẫn an toàn. Chúng ta không dễ bị lừa đâu!" }
        ]
    },
    7: {
        minigame: 'whack_mole',
        preGame: [
            { character: 'monkey', text: "Ôi không! Sói Già sai đàn chuột chũi đến đào rễ cây non kìa. Dùng búa gõ trúng đích để đuổi chúng đi ngay!" }
        ],
        postGame: [
            { character: 'monkey', text: "Bọn chuột chũi bỏ chạy hết rồi. Rễ cây non đã được bảo vệ an toàn!" }
        ]
    },
    8: {
        minigame: 'bubble_shooter',
        preGame: [
            { character: 'boss', text: "Nhận lấy những bong bóng độc hại của ta đây! Chúng sẽ làm héo hết lá cây!" },
            { character: 'monkey', text: "Nhanh tay bắn vỡ hết những bong bóng đó trước khi chúng chạm vào lá non nhé!" }
        ],
        postGame: [
            { character: 'monkey', text: "Bùm! Bùm! Không còn bong bóng nào sót lại. Cây non vẫn xanh tươi!" }
        ]
    },
    9: {
        minigame: 'frog_jump',
        preGame: [
            { character: 'monkey', text: "Dấu chân Sói hướng qua dòng suối. Hãy nhờ các bạn Ếch cõng chúng ta nhảy qua những chiếc lá sen để đuổi theo hắn!" }
        ],
        postGame: [
            { character: 'monkey', text: "Cảm ơn các bạn Ếch! Chúng ta đã an toàn sang được bờ bên kia rồi." }
        ]
    },
    10: {
        minigame: 'assemble_object',
        preGame: [
            { character: 'monkey', text: "Trước khi đi tiếp, hãy ghép các khúc gỗ này thành một hàng rào vững chắc bảo vệ cây thần của khu rừng!" }
        ],
        postGame: [
            { character: 'monkey', text: "Hàng rào cực kỳ kiên cố! Sói Già sẽ không bao giờ chạm được vào cây thần." }
        ]
    },
    11: {
        minigame: 'grow_plant',
        preGame: [
            { character: 'monkey', text: "Mầm cây thần cuối cùng cần thêm một chút phép thuật để bung nở. Hãy tập trung cao độ nhé!" }
        ],
        postGame: [
            { character: 'monkey', text: "Tuyệt vời! Ánh sáng từ cây thần sẽ tiếp thêm sức mạnh cho chúng ta đánh bại Sói Già." }
        ]
    },
    12: {
        minigame: 'clear_fog',
        preGame: [
            { character: 'boss', text: "Không ngờ các ngươi dám tới tận hang ổ của ta! Lớp sương mù hắc ám này sẽ chôn vùi các ngươi!" },
            { character: 'monkey', text: "Phá tan lớp sương mù này thôi các bạn! Sói Già ở ngay phía sau, chuẩn bị tinh thần cho trận chiến cuối cùng nào!" }
        ],
        postGame: [
            { character: 'monkey', text: "Ta thấy mặt ngươi rồi Sói Già! Khu rừng Cây Non sẽ không bao giờ khuất phục. Lên đường tiến vào sào huyệt của hắn thôi!" }
        ]
    },
    // Lesson 14 - 26 (Group: Khu rừng, Chapter 2:  'Bụi rậm', Boss: Sói Già)
    14: {
        minigame: 'clear_fog',
        preGame: [
            { character: 'monkey', text: "Chúng ta đã tiến vào vùng Bụi Rậm. Cây cỏ ở đây đan chéo nhau dày đặc quá!" },
            { character: 'boss', text: "Khà khà! Mê cung gai góc này sẽ giữ chân các ngươi mãi mãi!" },
            { character: 'monkey', text: "Đừng hòng! Hãy gõ phím thật chính xác để phát quang những bụi gai che khuất đường đi nào!" }
        ],
        postGame: [
            { character: 'monkey', text: "Đường đi đã quang đãng rồi. Bụi rậm không thể làm khó chúng ta!" }
        ]
    },
    15: {
        minigame: 'rescue_animals',
        preGame: [
            { character: 'monkey', text: "Trời ơi! Sói Già đã lén đặt bẫy và nhốt một bạn Thỏ vào lồng gỗ rồi." },
            { character: 'monkey', text: "Chúng ta phải nhanh tay gõ đúng các từ để phá vỡ chiếc lồng và cứu Thỏ con ra ngoài!" }
        ],
        postGame: [
            { character: 'monkey', text: "Thỏ con đã được tự do và an toàn. Sói Già đúng là kẻ xấu xa!" }
        ]
    },
    16: {
        minigame: 'bubble_shooter',
        preGame: [
            { character: 'boss', text: "Nhận lấy những quả cầu gai độc của ta đây! Tránh vỏ dưa gặp vỏ dừa nhé!" },
            { character: 'monkey', text: "Nguy hiểm quá! Nhanh tay bắn vỡ hết những quả cầu gai trước khi chúng rơi trúng đầu chúng ta!" }
        ],
        postGame: [
            { character: 'monkey', text: "Phù, những quả cầu gai đã nổ tung hết rồi. Phản xạ của bạn tuyệt lắm!" }
        ]
    },
    17: {
        minigame: 'whack_mole',
        preGame: [
            { character: 'monkey', text: "Sói Già đang xúi giục đàn chuột chũi đào hang làm hỏng con đường phía trước kìa." },
            { character: 'monkey', text: "Dùng búa gõ trúng đích lũ chuột chũi để lấp các cái hố lại nhé!" }
        ],
        postGame: [
            { character: 'monkey', text: "Đàn chuột chũi đã hoảng sợ bỏ chạy. Con đường lại bằng phẳng như cũ." }
        ]
    },
    18: {
        minigame: 'racing',
        preGame: [
            { character: 'monkey', text: "Mình thấy bóng Sói Già lấp ló chạy trốn phía trước. Lên xe đuổi theo hắn thôi!" }
        ],
        postGame: [
            { character: 'monkey', text: "Chiếc xe chạy nhanh như gió! Chúng ta đang bám rất sát Sói Già rồi." }
        ]
    },
    19: {
        minigame: 'grow_plant',
        preGame: [
            { character: 'monkey', text: "Sói Già đã phá hỏng cây cầu gỗ. Chúng ta cần trồng một cái cây thật lớn để làm cây cầu nối qua bờ bên kia." }
        ],
        postGame: [
            { character: 'monkey', text: "Cây đã mọc thành một cây cầu vô cùng vững chắc. Bước qua thôi!" }
        ]
    },
    20: {
        minigame: 'catch_insects',
        preGame: [
            { character: 'monkey', text: "Càng vào sâu Bụi Rậm, trời càng tối. Hãy dùng vợt bắt vài bạn đom đóm vào lọ để thắp sáng con đường nhé." }
        ],
        postGame: [
            { character: 'monkey', text: "Lọ đom đóm sáng rực rỡ quá! Cảm ơn các bạn đom đóm đã soi đường." }
        ]
    },
    21: {
        minigame: 'assemble_object',
        preGame: [
            { character: 'monkey', text: "Sói Già lúc tháo chạy đã tông hỏng chiếc xe tải chở hạt dẻ của bạn Sóc. Hãy gõ đúng để ráp lại từng bộ phận giúp bạn ấy nào." }
        ],
        postGame: [
            { character: 'monkey', text: "Chiếc xe tải lại lành lặn và bon bon trên đường rồi. Sóc con vui lắm!" }
        ]
    },
    22: {
        minigame: 'frog_jump',
        preGame: [
            { character: 'monkey', text: "Trước mặt là một vũng bùn lầy đầy gai nhọn do Sói tạo ra. Nhờ các bạn Ếch dẫn đường nhảy qua những lá sen an toàn nhé!" }
        ],
        postGame: [
            { character: 'monkey', text: "Cú nhảy cuối cùng hoàn hảo! Không ai bị lấm lem bùn đất cả." }
        ]
    },
    23: {
        minigame: 'collect_items',
        preGame: [
            { character: 'boss', text: "Đói bụng rồi chứ gì? Xung quanh đây chỉ toàn là nấm độc của ta thôi!" },
            { character: 'monkey', text: "Đừng mắc mưu hắn! Chúng ta chỉ cẩn thận hái những quả dâu rừng chín đỏ an toàn vào giỏ thôi nhé." }
        ],
        postGame: [
            { character: 'monkey', text: "Giỏ đã đầy dâu rừng thơm ngon để tiếp thêm năng lượng. Sói Già lại thất bại rồi!" }
        ]
    },
    24: {
        minigame: 'rescue_animals',
        preGame: [
            { character: 'monkey', text: "Nghe có tiếng kêu cứu! Thêm một bạn Chim Non bị kẹt trong lưới bẫy. Chúng ta phải giải cứu bạn ấy ngay!" }
        ],
        postGame: [
            { character: 'monkey', text: "Chim Non đã cất cánh bay lên bầu trời tự do. Chúng ta sắp đuổi kịp kẻ đầu sỏ rồi!" }
        ]
    },
    25: {
        minigame: 'clear_fog',
        preGame: [
            { character: 'boss', text: "Gần đến sào huyệt của ta rồi sao? Nhận lấy màn sương mù hắc ám này đi!" },
            { character: 'monkey', text: "Sói Già đang sợ hãi đấy! Cùng nhau thổi bay màn sương này để tiến thẳng vào hang ổ của hắn!" }
        ],
        postGame: [
            { character: 'monkey', text: "Trời quang mây tạnh. Hang ổ của Sói Già trong Bụi Rậm đã hiện ra trước mắt!" }
        ]
    },
    26: {
        minigame: 'assemble_object',
        preGame: [
            { character: 'monkey', text: "Sói Già rất ranh mãnh. Trước khi đối đầu trực tiếp, hãy ghép các mảnh gỗ cứng này thành một chiếc khiên bảo vệ nhé!" }
        ],
        postGame: [
            { character: 'monkey', text: "Chiếc khiên siêu vững chắc đã hoàn thành! Cầm lấy nó và dũng cảm tiến lên đối mặt với Sói Già nào!" }
        ]
    },
    // Lesson 28 - 40 (Group: Khu rừng, Chapter 3:  'Lá xanh', Boss: Sói Già)
    28: {
        minigame: 'grow_plant',
        preGame: [
            { character: 'monkey', text: "Ôi không! Sói Già đang dùng quạt khổng lồ thổi bay hết cây đi rồi. Cây cối đang khóc kìa!" },
            { character: 'boss', text: "Ha ha! Rừng cây của các ngươi sẽ bay đi hết cho mà xem!" },
            { character: 'monkey', text: "Hãy gõ phím để trồng lên những cây xanh lớn khoẻ mạnh nhé." }
        ],
        postGame: [
            { character: 'monkey', text: "Cây cối đã xanh tươi trở lại. Sói Già không thể phá hoại sức sống của khu rừng!" }
        ]
    },
    29: {
        minigame: 'collect_items',
        preGame: [
            { character: 'boss', text: "Gió lốc của ta sẽ cuốn phăng mọi thứ thức ăn dự trữ của các ngươi!" },
            { character: 'monkey', text: "Nhanh tay nhặt lại thức ăn vào giỏ trước khi chúng bị thổi bay hết đi!" }
        ],
        postGame: [
            { character: 'monkey', text: "Phù! May quá, thức ăn đã được thu thập đủ. Không ai bị đói cả." }
        ]
    },
    30: {
        minigame: 'bubble_shooter',
        preGame: [
            { character: 'monkey', text: "Sói Già đang thổi ra những quả bóng cuồng phong. Chúng sẽ làm gãy nát các tán lá mất!" },
            { character: 'monkey', text: "Bắn vỡ những quả bóng đó ngay lập tức để bảo vệ khu rừng!" }
        ],
        postGame: [
            { character: 'monkey', text: "Những quả bóng cuồng phong đã nổ tung thành luồng gió nhẹ. Rất tốt!" }
        ]
    },
    31: {
        minigame: 'rescue_animals',
        preGame: [
            { character: 'monkey', text: "Gió to quá làm tổ của bạn Chim Sâu bị rơi và bị Sói Già giam lại rồi." },
            { character: 'monkey', text: "Gõ thật chuẩn để cứu bạn ấy ra nhé!" }
        ],
        postGame: [
            { character: 'monkey', text: "Chim Sâu đã được cứu. Cảm ơn các bạn!" }
        ]
    },
    32: {
        minigame: 'racing',
        preGame: [
            { character: 'monkey', text: "Tên Sói Già đang trượt trên những chiếc lá khổng lồ để bỏ trốn." },
            { character: 'monkey', text: "Cùng bước lên lá và đua tốc độ với hắn xem ai nhanh hơn nào!" }
        ],
        postGame: [
            { character: 'monkey', text: "Tuyệt vời, chúng ta trượt nhanh hơn hắn nhiều! Hắn không thoát được đâu." }
        ]
    },
    33: {
        minigame: 'assemble_object',
        preGame: [
            { character: 'monkey', text: "Gió lớn làm cây cầu treo bằng dây leo bị đứt mất rồi." },
            { character: 'monkey', text: "Hãy nối các đoạn dây leo lại với nhau để tạo thành đường đi mới nhé." }
        ],
        postGame: [
            { character: 'monkey', text: "Cầu treo đã được nối lại rất chắc chắn. Tiến lên nào!" }
        ]
    },
    34: {
        minigame: 'whack_mole',
        preGame: [
            { character: 'boss', text: "Ta sẽ cho đàn chuột tay sai ngoi lên cắn đứt hết rễ của những cây Lá Xanh này!" },
            { character: 'monkey', text: "Lấy búa ra và gõ trúng đầu bọn chuột chũi để bảo vệ gốc cây!" }
        ],
        postGame: [
            { character: 'monkey', text: "Lũ chuột tay sai đã hoảng sợ chui tọt xuống hang. Rễ cây đã an toàn." }
        ]
    },
    35: {
        minigame: 'frog_jump',
        preGame: [
            { character: 'monkey', text: "Bên dưới là vực sâu rạp đầy gai! Chúng ta phải mượn sức gió để nhảy qua những chiếc lá khổng lồ đang bay." },
            { character: 'monkey', text: "Cẩn thận gõ đúng nhịp để không bị trượt chân rơi xuống nhé!" }
        ],
        postGame: [
            { character: 'monkey', text: "Hú vía! Những chiếc lá bay thật thú vị, chúng ta đã sang được bờ bên kia." }
        ]
    },
    36: {
        minigame: 'catch_insects',
        preGame: [
            { character: 'monkey', text: "Gió lốc mang theo cả bầy ong độc của Sói Già đến tấn công chúng ta." },
            { character: 'monkey', text: "Dùng vợt bắt hết bầy ong nhốt lại trước khi chúng chích các bạn động vật nhỏ!" }
        ],
        postGame: [
            { character: 'monkey', text: "Đàn ong đã bị thu phục. Khu rừng Lá Xanh đã yên tĩnh hơn rồi." }
        ]
    },
    37: {
        minigame: 'grow_plant',
        preGame: [
            { character: 'boss', text: "Thử xem các ngươi có chịu nổi cơn mưa đá của ta không!" },
            { character: 'monkey', text: "Trồng ngay một chiếc Lá Xanh khổng lồ bằng phép thuật để làm ô che chắn cho cả nhóm!" }
        ],
        postGame: [
            { character: 'monkey', text: "Chiếc lá ô thật dai và bền! Mưa đá của Sói Già hoàn toàn vô dụng." }
        ]
    },
    38: {
        minigame: 'collect_items',
        preGame: [
            { character: 'monkey', text: "Những cây nấm ở đây chứa sức mạnh phép thuật tự nhiên." },
            { character: 'monkey', text: "Thu thập thật nhiều cây nấm để tiếp thêm năng lượng chuẩn bị đánh bại Sói Già nhé!" }
        ],
        postGame: [
            { character: 'monkey', text: "Năng lượng đã đầy tràn! Sức mạnh của Lá Xanh đang chảy trong chúng ta." }
        ]
    },
    39: {
        minigame: 'clear_fog',
        preGame: [
            { character: 'boss', text: "Mây mù và bão tố sẽ che giấu hang ổ của ta vĩnh viễn!" },
            { character: 'monkey', text: "Không có gì che mắt được chúng ta! Gõ phím để tạo ra luồng gió lốc mạnh xua tan đám mây đen của hắn!" }
        ],
        postGame: [
            { character: 'monkey', text: "Ánh sáng đã chiếu rọi! Hang ổ trên đỉnh đồi Lá Xanh của Sói Già kìa!" }
        ]
    },
    40: {
        minigame: 'assemble_object',
        preGame: [
            { character: 'monkey', text: "Sói Già đang xả những cuồng phong mạnh nhất xuống từ đỉnh đồi. Chúng ta không thể bước tiếp!" },
            { character: 'monkey', text: "Hãy lắp ráp một chiếc khiên chắn gió khổng lồ từ thân gỗ tùng để vượt qua bão tố nào!" }
        ],
        postGame: [
            { character: 'monkey', text: "Chiếc khiên chắn gió đã hoàn thành! Cầm lấy nó, tiến thẳng lên đỉnh đồi và dạy cho Sói Già một bài học thôi!" }
        ]
    },
    // Lesson 42 - 54 (Group: Khu rừng, Chapter 4:  'Cổ thụ', Boss: Sói Già)
    42: {
        minigame: 'clear_fog',
        preGame: [
            { character: 'monkey', text: "Nguy to rồi! Sói Già đang dùng rìu chặt rễ cây Cổ Thụ vĩ đại. Bụi mù mịt khắp nơi!" },
            { character: 'boss', text: "Cái cây già cỗi này sẽ biến thành củi khô sớm thôi!" },
            { character: 'monkey', text: "Hãy gõ phím để tạo gió thổi bay đám bụi này và xem hắn đang trốn ở đâu!" }
        ],
        postGame: [
            { character: 'monkey', text: "Bụi đã tan, nhưng Cổ Thụ đang bị thương. Chúng ta phải hành động ngay!" }
        ]
    },
    43: {
        minigame: 'rescue_animals',
        preGame: [
            { character: 'monkey', text: "Tiếng chặt cây của Sói làm các bạn Cú Mèo hoảng sợ và mắc kẹt trong những hốc cây nứt vỡ." },
            { character: 'monkey', text: "Nhanh tay gõ phím để gỡ các cành gãy và cứu các bạn ấy ra ngoài an toàn!" }
        ],
        postGame: [
            { character: 'monkey', text: "Các bạn Cú Mèo đã được giải cứu. Cổ Thụ là nhà của rất nhiều sinh vật, ta không thể để Sói phá hủy nó." }
        ]
    },
    44: {
        minigame: 'whack_mole',
        preGame: [
            { character: 'boss', text: "Rìu của ta chưa đủ nhanh, ta sẽ thả bầy chuột chũi ra gặm rễ cây!" },
            { character: 'monkey', text: "Sói Già thật xảo quyệt! Dùng búa gõ trúng lũ chuột chũi đang chui lên để bảo vệ rễ Cổ Thụ nhé!" }
        ],
        postGame: [
            { character: 'monkey', text: "Bầy chuột chũi đã bị đuổi đi hết. Rễ cây tạm thời được an toàn." }
        ]
    },
    45: {
        minigame: 'grow_plant',
        preGame: [
            { character: 'monkey', text: "Những vết chặt của Sói Già làm Cổ Thụ đau đớn. Hãy dùng phép thuật gọi mưa xuân để chữa lành cho cây." }
        ],
        postGame: [
            { character: 'monkey', text: "Thật kỳ diệu! Các vết xước đã liền lại và mọc ra những cây non mới." }
        ]
    },
    46: {
        minigame: 'collect_items',
        preGame: [
            { character: 'monkey', text: "Sói Già đang leo dần lên ngọn cây. Chúng ta cần gom những giọt nhựa cây vàng óng để tăng thêm sức mạnh đuổi theo hắn." }
        ],
        postGame: [
            { character: 'monkey', text: "Nhựa cây Cổ Thụ mang lại nguồn năng lượng tuyệt vời. Sẵn sàng leo lên nào!" }
        ]
    },
    47: {
        minigame: 'racing',
        preGame: [
            { character: 'monkey', text: "Lên xe thôi, chúng ta cần bắt kịp Sói Già!" }
        ],
        postGame: [
            { character: 'monkey', text: "Giỏi quá! Chúng ta đã ở rất gần hắn rồi." }
        ]
    },
    48: {
        minigame: 'bubble_shooter',
        preGame: [
            { character: 'boss', text: "Đừng hòng đuổi theo ta! Nhận lấy những tảng đá rêu phong này đi!" },
            { character: 'monkey', text: "Sói Già ném đá từ trên xuống! Gõ thật nhanh để bắn vỡ các tảng đá trước khi chúng rơi trúng mình!" }
        ],
        postGame: [
            { character: 'monkey', text: "Đá vỡ vụn hết rồi. Đòn tấn công của Sói Già không ngăn được chúng ta đâu." }
        ]
    },
    49: {
        minigame: 'catch_insects',
        preGame: [
            { character: 'monkey', text: "Đường lên ngọn cây phải đi qua một hốc cây rất tối. Hãy bắt vài bạn đom đóm phát sáng để soi đường nhé." }
        ],
        postGame: [
            { character: 'monkey', text: "Hốc cây đã sáng bừng lên. Cảm ơn những người bạn đom đóm!" }
        ]
    },
    50: {
        minigame: 'frog_jump',
        preGame: [
            { character: 'monkey', text: "Phía trước là những chiếc lá khổng lồ mọc trên ngọn cây. Phải nhảy qua chúng để đi tiếp." },
            { character: 'monkey', text: "Cẩn thận gõ đúng nhịp để không bị trượt chân rơi xuống dưới nhé!" }
        ],
        postGame: [
            { character: 'monkey', text: "Những chiếc lá thật nhún nhảy như lò xo vậy. Chúng ta đã lên được một tầng cao mới." }
        ]
    },
    51: {
        minigame: 'assemble_object',
        preGame: [
            { character: 'monkey', text: "Sói Già đã phá hỏng chiếc thang gỗ dẫn lên chạc cây chính." },
            { character: 'monkey', text: "Cùng nhau ghép các cành cây khô lại để làm một chiếc thang mới vững chắc hơn nào." }
        ],
        postGame: [
            { character: 'monkey', text: "Thang đã làm xong. Chạc cây chính đang ở ngay phía trên chúng ta." }
        ]
    },
    52: {
        minigame: 'bubble_shooter',
        preGame: [
            { character: 'boss', text: "Ta sẽ phun bong bóng nhựa độc làm héo úa trái tim của Cổ Thụ!" },
            { character: 'monkey', text: "Không thể để trái tim khu rừng bị phá hủy! Bắn vỡ toàn bộ bong bóng độc đó ngay!" }
        ],
        postGame: [
            { character: 'monkey', text: "Trái tim Cổ Thụ vẫn an toàn và đang đập những nhịp đập mạnh mẽ của sự sống." }
        ]
    },
    53: {
        minigame: 'grow_plant',
        preGame: [
            { character: 'monkey', text: "Cổ Thụ muốn gửi gắm sức mạnh cho chúng ta. Hãy gõ phím để đánh thức Bông Hoa Thần Trí Tuệ nở rộ!" }
        ],
        postGame: [
            { character: 'monkey', text: "Bông Hoa Thần đã nở, ban cho chúng ta sự minh mẫn và dũng cảm tuyệt đối." }
        ]
    },
    54: {
        minigame: 'assemble_object',
        preGame: [
            { character: 'monkey', text: "Sói Già đang đợi ở đỉnh Cổ Thụ. Hãy dùng sức mạnh của Hoa Thần để lắp ráp bộ Giáp Hiệp Sĩ Rừng Xanh!" }
        ],
        postGame: [
            { character: 'monkey', text: "Bộ giáp sáng chói đã sẵn sàng. Lên đỉnh cây và kết thúc âm mưu của Sói Già thôi!" }
        ]
    },
    // Lesson 56 - 68 (Group: Khu rừng, Chapter 5:  'Nấm rừng', Boss: Sói Già)
    56: {
        minigame: 'clear_fog',
        preGame: [
            { character: 'boss', text: "Chào mừng đến với lãnh địa Nấm Rừng! Làn sương mù ảo ảnh của ta sẽ khiến các ngươi lạc lối mãi mãi!" },
            { character: 'monkey', text: "Đừng sợ hãi! Hãy gõ phím thật chính xác để thổi bay làn sương mờ ảo này và tìm ra lối đi chân chính!" }
        ],
        postGame: [
            { character: 'monkey', text: "Sương mù đã tan biến. Tầm nhìn đã rõ ràng, chúng ta cùng tiến lên nào!" }
        ]
    },
    57: {
        minigame: 'rescue_animals',
        preGame: [
            { character: 'monkey', text: "Bạn Nhím con đang bị kẹt giữa vòng vây của bụi rậm do Sói Già trồng." },
            { character: 'monkey', text: "Hãy gõ đúng để nhổ bỏ bụi rậm và giải cứu Nhím con ra ngoài an toàn!" }
        ],
        postGame: [
            { character: 'monkey', text: "Nhím con đã thoát ra được. Cảm ơn bạn đã nhanh tay giúp đỡ!" }
        ]
    },
    58: {
        minigame: 'bubble_shooter',
        preGame: [
            { character: 'boss', text: "Nếm thử những quả bong bóng chứa đầy bào tử nấm ngứa của ta đây!" },
            { character: 'monkey', text: "Gõ chữ thật nhanh để bắn vỡ các bong bóng bào tử trước khi chúng rơi trúng chúng ta!" }
        ],
        postGame: [
            { character: 'monkey', text: "Mọi bong bóng đều đã nổ tung giữa không trung. Phản xạ rất tuyệt vời!" }
        ]
    },
    59: {
        minigame: 'whack_mole',
        preGame: [
            { character: 'monkey', text: "Sói Già đang xua lũ chuột chũi lên cắn phá những gốc nấm phát sáng của khu rừng." },
            { character: 'monkey', text: "Dùng búa gõ trúng đầu lũ chuột chũi để bảo vệ nguồn sáng của chúng ta nhé!" }
        ],
        postGame: [
            { character: 'monkey', text: "Lũ chuột đã sợ hãi rúc lại xuống hang. Những cây nấm phát sáng đã an toàn." }
        ]
    },
    60: {
        minigame: 'racing',
        preGame: [
            { character: 'monkey', text: "Sói Già đang tháo chạy qua thung lũng nấm khổng lồ." },
            { character: 'monkey', text: "Cùng leo lên lưng bạn Bọ Rùa và đua tốc độ đuổi theo hắn thật nhanh nào!" }
        ],
        postGame: [
            { character: 'monkey', text: "Bọ Rùa lướt đi thoăn thoắt! Khoảng cách với Sói Già đang dần được rút ngắn." }
        ]
    },
    61: {
        minigame: 'grow_plant',
        preGame: [
            { character: 'monkey', text: "Chúng ta đi vào khu vực đầm lầy quá tối tăm. Hãy gieo hạt để trồng những cây nấm pha lê phát sáng soi đường." }
        ],
        postGame: [
            { character: 'monkey', text: "Ánh sáng từ nấm pha lê thật rực rỡ, con đường phía trước đã sáng tỏ rồi." }
        ]
    },
    62: {
        minigame: 'catch_insects',
        preGame: [
            { character: 'monkey', text: "Sói Già thả một bầy muỗi độc ra cản đường chúng ta." },
            { character: 'monkey', text: "Hãy vung vợt thật chuẩn xác để bắt gọn bầy muỗi độc vào lọ!" }
        ],
        postGame: [
            { character: 'monkey', text: "Bầy muỗi đã bị thu phục hoàn toàn. Không ai bị đốt cả." }
        ]
    },
    63: {
        minigame: 'assemble_object',
        preGame: [
            { character: 'monkey', text: "Trời bắt đầu rơi những giọt mưa axit từ chiếc bẫy của Sói Già tạo ra!" },
            { character: 'monkey', text: "Nhanh tay ghép các cành cây và mũ nấm to lại thành một chiếc ô che chắn cho cả nhóm." }
        ],
        postGame: [
            { character: 'monkey', text: "Chiếc ô nấm vô cùng chắc chắn. Cơn mưa axit không thể làm khó chúng ta." }
        ]
    },
    64: {
        minigame: 'frog_jump',
        preGame: [
            { character: 'monkey', text: "Mặt đất đầy bùn lầy nấm độc. Phải nhảy thật khéo léo qua những mũ nấm khổng lồ nhấp nhô này." },
            { character: 'monkey', text: "Gõ đúng nhịp để đáp xuống thật chính xác và không bị trượt ngã nhé!" }
        ],
        postGame: [
            { character: 'monkey', text: "Những mũ nấm thật đàn hồi! Chúng ta đã an toàn vượt qua bãi bùn lầy." }
        ]
    },
    65: {
        minigame: 'collect_items',
        preGame: [
            { character: 'boss', text: "Các ngươi đang kiệt sức rồi đúng không? Ta sẽ phá hủy hết đống nấm linh chi phục hồi này!" },
            { character: 'monkey', text: "Đừng để hắn làm thế! Hãy nhanh tay thu thập nấm linh chi vào giỏ trước khi Sói Già giẫm nát chúng!" }
        ],
        postGame: [
            { character: 'monkey', text: "Nấm linh chi đã được thu thập đủ. Năng lượng của chúng ta lại tràn trề!" }
        ]
    },
    66: {
        minigame: 'clear_fog',
        preGame: [
            { character: 'boss', text: "Khà khà! Đây là làn sương khói độc đậm đặc nhất của ta. Các ngươi kết thúc rồi!" },
            { character: 'monkey', text: "Tập trung cao độ! Cùng nhau gõ phím tạo cuồng phong xua tan màn sương mù hắc ám này!" }
        ],
        postGame: [
            { character: 'monkey', text: "Màn sương đã bị thổi bay. Sói Già đã hết phép để lẩn trốn rồi!" }
        ]
    },
    67: {
        minigame: 'bubble_shooter',
        preGame: [
            { character: 'monkey', text: "Sói Già hoảng sợ đang ném những quả nấm nổ bùn từ trên dốc xuống." },
            { character: 'monkey', text: "Ngắm thật chuẩn và bắn vỡ chúng ngay trên không trung để dọn sạch đường lên dốc!" }
        ],
        postGame: [
            { character: 'monkey', text: "Những quả nấm nổ đều bị vô hiệu hóa. Đường lên dốc đã thông thoáng." }
        ]
    },
    68: {
        minigame: 'assemble_object',
        preGame: [
            { character: 'monkey', text: "Sào huyệt của Sói Già đang ở ngay trước mắt. Chúng ta cần chuẩn bị thật kỹ lưỡng." },
            { character: 'monkey', text: "Hãy lắp ráp những thân nấm sắt cứng cáp nhất thành một chiếc khiên để sẵn sàng đối đầu trực diện với hắn!" }
        ],
        postGame: [
            { character: 'monkey', text: "Chiếc khiên nấm sắt đã sẵn sàng! Cùng xông lên và dạy cho Sói Già một bài học nhớ đời thôi!" }
        ]
    },
    // Lesson 70 - 82 (Group: Khu rừng, Chapter 6:  'Hoa dại', Boss: Sói Già)
    70: {
        minigame: 'grow_plant',
        preGame: [
            { character: 'monkey', text: "Ôi! Sói Già tháo chạy đã giẫm nát cả thung lũng Hoa Dại rồi." },
            { character: 'boss', text: "Ta ghét mùi hoa cỏ! Chỗ này chỉ nên là bãi đất trống thôi!" },
            { character: 'monkey', text: "Đừng hòng! Hãy gõ phím để tạo phép thuật hồi sinh những bông hoa rực rỡ này nhé!" }
        ],
        postGame: [
            { character: 'monkey', text: "Thung lũng lại ngập tràn sắc hoa. Sức sống của Hoa Dại thật mãnh liệt!" }
        ]
    },
    71: {
        minigame: 'rescue_animals',
        preGame: [
            { character: 'monkey', text: "Một bạn Bướm Vàng bị kẹt trong bẫy lưới nhện của Sói Già kìa." },
            { character: 'monkey', text: "Nhanh tay gõ đúng các từ để cắt đứt tơ nhện và giải cứu bạn ấy nào!" }
        ],
        postGame: [
            { character: 'monkey', text: "Bướm Vàng đã cất cánh bay lượn tự do. Tuyệt vời lắm!" }
        ]
    },
    72: {
        minigame: 'catch_insects',
        preGame: [
            { character: 'boss', text: "Ta sẽ thả đàn ruồi độc ra làm héo úa những bông hoa của các ngươi!" },
            { character: 'monkey', text: "Mau dùng vợt tóm gọn lũ ruồi độc đó lại trước khi chúng phá hoại thung lũng!" }
        ],
        postGame: [
            { character: 'monkey', text: "Đàn ruồi độc đã bị nhốt hết vào bình. Những bông hoa vẫn an toàn." }
        ]
    },
    73: {
        minigame: 'bubble_shooter',
        preGame: [
            { character: 'monkey', text: "Sói Già đang ném những quả bóng phấn hoa gây dị ứng về phía chúng ta." },
            { character: 'monkey', text: "Ngắm thật chuẩn và bắn vỡ chúng trên không trung để không ai bị hắt xì nhé!" }
        ],
        postGame: [
            { character: 'monkey', text: "Bụp! Bụp! Những quả bóng độc hại đã vỡ tan. Phản xạ của bạn rất nhanh!" }
        ]
    },
    74: {
        minigame: 'whack_mole',
        preGame: [
            { character: 'monkey', text: "Lũ chuột chũi tay sai của Sói lại ngoi lên định cắn đứt củ và rễ hoa kìa." },
            { character: 'monkey', text: "Lấy búa ra và gõ thật chính xác để đuổi chúng đi bảo vệ gốc hoa nhé!" }
        ],
        postGame: [
            { character: 'monkey', text: "Bọn chuột chũi đã hoảng sợ rút lui. Gốc hoa đã được bảo vệ vững chắc." }
        ]
    },
    75: {
        minigame: 'racing',
        preGame: [
            { character: 'monkey', text: "Mình thấy Sói Già đang lẩn trốn trong cánh đồng hoa hướng dương khổng lồ." },
            { character: 'monkey', text: "Cùng cưỡi lên lưng bạn Châu Chấu và nhảy những bước thật dài để đuổi theo hắn!" }
        ],
        postGame: [
            { character: 'monkey', text: "Châu Chấu nhảy thật xa! Chúng ta sắp tóm được Sói Già rồi." }
        ]
    },
    76: {
        minigame: 'frog_jump',
        preGame: [
            { character: 'monkey', text: "Một đầm lầy cản đường chúng ta. Chỉ có những lá hoa súng lơ lửng trên mặt nước." },
            { character: 'monkey', text: "Gõ đúng chữ để nhảy cẩn thận qua từng lá hoa súng sang bờ bên kia nhé!" }
        ],
        postGame: [
            { character: 'monkey', text: "Khéo léo lắm! Cả nhóm đã sang được bờ mà không bị ướt chút nào." }
        ]
    },
    77: {
        minigame: 'collect_items',
        preGame: [
            { character: 'boss', text: "Các ngươi đừng hòng lấy được những giọt mật hoa thần kỳ này!" },
            { character: 'monkey', text: "Mật hoa dại chứa sức mạnh rất lớn. Mau gõ phím nhặt hết chúng vào lọ trước mặt hắn!" }
        ],
        postGame: [
            { character: 'monkey', text: "Thu thập thành công! Giọt mật ngọt ngào đã tiếp thêm sức mạnh cho chúng ta." }
        ]
    },
    78: {
        minigame: 'clear_fog',
        preGame: [
            { character: 'boss', text: "Tức chết đi được! Ta sẽ thả khói độc che khuất ánh mặt trời của hoa cỏ!" },
            { character: 'monkey', text: "Hoa dại cần ánh sáng! Gõ phím để tạo gió thổi bay đám mây khói độc này ngay!" }
        ],
        postGame: [
            { character: 'monkey', text: "Ánh mặt trời đã chiếu rọi rực rỡ trở lại trên cánh đồng Hoa Dại." }
        ]
    },
    79: {
        minigame: 'assemble_object',
        preGame: [
            { character: 'monkey', text: "Sói Già đã đập vỡ Thùng Gỗ đựng mật khổng lồ của các bạn Ong Mật." },
            { character: 'monkey', text: "Cùng gõ đúng để ráp các ván gỗ và đai sắt lại thành chiếc thùng hoàn chỉnh giúp các bạn ấy nhé." }
        ],
        postGame: [
            { character: 'monkey', text: "Thùng đựng mật đã được sửa chữa vô cùng chắc chắn. Các bạn Ong Mật rất biết ơn chúng ta." }
        ]
    },
    80: {
        minigame: 'bubble_shooter',
        preGame: [
            { character: 'boss', text: "Trận chiến này chưa kết thúc đâu! Nhận lấy cơn mưa gai nhọn của ta đây!" },
            { character: 'monkey', text: "Sói bắn gai nhọn từ trên sườn đồi xuống. Nhanh tay phá hủy chúng trước khi quá muộn!" }
        ],
        postGame: [
            { character: 'monkey', text: "Những chiếc gai đã bị bẻ gãy giữa không trung. Bạn làm tốt lắm!" }
        ]
    },
    81: {
        minigame: 'grow_plant',
        preGame: [
            { character: 'monkey', text: "Pháo đài của Sói Già nằm trên vách đá cao. Hãy dùng phép thuật gieo hạt giống cây khổng lồ!" }
        ],
        postGame: [
            { character: 'monkey', text: "Dây leo đầy hoa đã bám chắc vào vách đá, tạo thành một con đường tuyệt đẹp dẫn lên pháo đài." }
        ]
    },
    82: {
        minigame: 'assemble_object',
        preGame: [
            { character: 'monkey', text: "Sói Già đã hết đường lui. Nhưng trước khi leo lên, hãy tận dụng những cánh hoa dại cứng cáp nhất." },
            { character: 'monkey', text: "Ghép chúng lại để tạo thành chiếc Khiên Hoa Dại rực rỡ và vững chãi bảo vệ chúng ta trong trận chiến tới!" }
        ],
        postGame: [
            { character: 'monkey', text: "Khiên Hoa Dại đã hoàn thành! Nó tỏa ra sức mạnh diệu kỳ. Tiến lên kết thúc mọi chuyện thôi!" }
        ]
    },
    // Lesson 84 - 96 (Group: Khu rừng, Chapter 7:  'Bướm rừng', Boss: Sói Già)
    84: {
        minigame: 'clear_fog',
        preGame: [
            { character: 'monkey', text: "Chúng ta đã đến Thung lũng Bướm Rừng. Nhưng Sói Già đã phun khói đen che khuất mọi thứ!" },
            { character: 'boss', text: "Lũ bướm chói mắt này làm ta phát điên, ta sẽ nhuộm đen tất cả!" },
            { character: 'monkey', text: "Gõ phím thật nhanh để tạo gió cuốn phăng đám khói đen này đi bảo vệ thung lũng!" }
        ],
        postGame: [
            { character: 'monkey', text: "Khói đen đã tan biến, những cánh bướm lại lấp lánh rực rỡ." }
        ]
    },
    85: {
        minigame: 'rescue_animals',
        preGame: [
            { character: 'monkey', text: "Sói Già đã lén nhốt Bướm Nữ Hoàng vào một chiếc lồng kính kìa." },
            { character: 'monkey', text: "Hãy gõ chữ thật chuẩn để đập vỡ lồng kính và cứu Nữ Hoàng ra ngoài nhé!" }
        ],
        postGame: [
            { character: 'monkey', text: "Nữ Hoàng đã được tự do! Cả đàn bướm đang nhảy múa vui mừng." }
        ]
    },
    86: {
        minigame: 'bubble_shooter',
        preGame: [
            { character: 'boss', text: "Để xem các ngươi né được những quả bóng bùn lầy này không!" },
            { character: 'monkey', text: "Bảo vệ đôi cánh mỏng manh của bầy bướm! Bắn vỡ những quả bóng bùn ngay trên không!" }
        ],
        postGame: [
            { character: 'monkey', text: "Tuyệt vời, không một giọt bùn nào rơi trúng các bạn bướm." }
        ]
    },
    87: {
        minigame: 'whack_mole',
        preGame: [
            { character: 'monkey', text: "Sói Già phái lũ chuột chũi lên trộm những chiếc kén bướm chưa nở." },
            { character: 'monkey', text: "Lấy búa ra và gõ trúng đích lũ chuột để đuổi chúng đi bảo vệ các em kén!" }
        ],
        postGame: [
            { character: 'monkey', text: "Lũ chuột đã bỏ chạy tán loạn. Những chiếc kén vẫn an toàn." }
        ]
    },
    88: {
        minigame: 'racing',
        preGame: [
            { character: 'monkey', text: "Sói Già đang tháo chạy lên đỉnh đồi. Cùng cưỡi lên lưng Châu Chấu bay đuổi theo hắn nào!" }
        ],
        postGame: [
            { character: 'monkey', text: "Tốc độ bay thật chóng mặt! Hắn không thể thoát khỏi chúng ta đâu." }
        ]
    },
    89: {
        minigame: 'catch_insects',
        preGame: [
            { character: 'monkey', text: "Gió to của Sói Già làm bầy bướm con bị thổi bay tán loạn." },
            { character: 'monkey', text: "Dùng vợt nhẹ nhàng đón các bạn ấy vào giỏ an toàn để tránh bão nhé." }
        ],
        postGame: [
            { character: 'monkey', text: "Bầy bướm con đã ngoan ngoãn chui vào giỏ bình yên vô sự." }
        ]
    },
    90: {
        minigame: 'grow_plant',
        preGame: [
            { character: 'monkey', text: "Phía trước là một vách đá dốc đứng. Hãy dùng phép thuật gieo hạt để một cây cao mọc lên." }
        ],
        postGame: [
            { character: 'monkey', text: "Cây đã mọc đủ cao để làm chiếc thang đưa chúng ta lên đỉnh vách đá." }
        ]
    },
    91: {
        minigame: 'frog_jump',
        preGame: [
            { character: 'monkey', text: "Chúng ta phải bước qua những đài hoa phép thuật lơ lửng giữa không trung này." },
            { character: 'monkey', text: "Gõ đúng nhịp để nhảy thật chính xác, cẩn thận đừng rơi xuống vực nhé!" }
        ],
        postGame: [
            { character: 'monkey', text: "Đã qua được phía bên kia an toàn. Phản xạ của bạn rất tuyệt." }
        ]
    },
    92: {
        minigame: 'collect_items',
        preGame: [
            { character: 'boss', text: "Đừng hòng lấy được những bông hoa thần kỳ để hồi phục sức mạnh!" },
            { character: 'monkey', text: "Nhanh tay gõ phím thu thập những bông hoa lấp lánh đang rơi xuống vào giỏ." }
        ],
        postGame: [
            { character: 'monkey', text: "Những bông hoa đã đầy giỏ. Sức mạnh của chúng ta đã được nạp đầy!" }
        ]
    },
    93: {
        minigame: 'clear_fog',
        preGame: [
            { character: 'boss', text: "Nhận lấy lớp sương mù ảo ảnh cuối cùng của ta đây! Các ngươi sẽ không bao giờ tìm thấy ta!" },
            { character: 'monkey', text: "Chỉ một chút nữa thôi! Gõ thật nhanh thổi bay sương mù để tìm ra hang ổ của hắn." }
        ],
        postGame: [
            { character: 'monkey', text: "Bầu trời lại trong xanh. Ta đã thấy sào huyệt cuối cùng của Sói Già!" }
        ]
    },
    94: {
        minigame: 'bubble_shooter',
        preGame: [
            { character: 'monkey', text: "Hắn đang điên cuồng ném những quả cầu gai độc từ trên cao xuống." },
            { character: 'monkey', text: "Ngắm thật chuẩn, bắn vỡ tất cả chướng ngại vật để mở đường tiến thẳng lên!" }
        ],
        postGame: [
            { character: 'monkey', text: "Đường lên đã dọn sạch hoàn toàn. Sói Già hết chiêu rồi!" }
        ]
    },
    95: {
        minigame: 'rescue_animals',
        preGame: [
            { character: 'monkey', text: "Một đàn bướm mang sức mạnh ánh sáng đang bị giữ trong lồng kính." },
            { character: 'monkey', text: "Gõ đúng để đập vỡ cái lồng kính, giải phóng sức mạnh ánh sáng của các bạn ấy!" }
        ],
        postGame: [
            { character: 'monkey', text: "Sức mạnh ánh sáng đã hội tụ lại bên chúng ta. Chuẩn bị cho trận chiến cuối cùng!" }
        ]
    },
    96: {
        minigame: 'assemble_object',
        preGame: [
            { character: 'monkey', text: "Sói Già không còn đường lùi. Bầy Bướm Rừng đã tặng chúng ta những mảnh ghép phép thuật." },
            { character: 'monkey', text: "Hãy ráp chúng lại thành Trượng Ánh Sáng để chuẩn bị đòn quyết định đánh đuổi Sói Già mãi mãi!" }
        ],
        postGame: [
            { character: 'monkey', text: "Trượng Ánh Sáng tỏa sáng rực rỡ! Khu rừng đang cổ vũ chúng ta. Cùng tiến lên đối mặt Sói Già nào!" }
        ]
    },
    // Lesson 98 - 110 (Group: Sông nước, Chapter 8:  'Giọt nước', Boss: Cá Sấu)
    98: {
        minigame: 'collect_items',
        preGame: [
            { character: 'monkey', text: "Đến vùng Sông Nước rồi! Dòng suối 'Giọt Nước' này vốn rất trong xanh." },
            { character: 'boss', text: "Khà khà! Khỉ con ranh mãnh, ta là Cá Sấu đây. Vùng nước này sắp biến thành vũng bùn của ta rồi!" },
            { character: 'monkey', text: "Không thể để hắn làm bẩn nguồn nước! Hãy nhanh tay thu thập những giọt nước tinh khiết vào bình nhé." }
        ],
        postGame: [
            { character: 'monkey', text: "Giọt nước tinh khiết đã được an toàn. Cùng đi dọc theo bờ suối đuổi theo hắn nào!" }
        ]
    },
    99: {
        minigame: 'rescue_animals',
        preGame: [
            { character: 'monkey', text: "Cá Sấu độc ác đã giăng lưới bắt hết đàn cá nhỏ đang bơi lội kìa." },
            { character: 'monkey', text: "Gõ thật chính xác để cắt đứt tấm lưới và giải cứu các bạn cá nhé!" }
        ],
        postGame: [
            { character: 'monkey', text: "Đàn cá đã tung tăng bơi lội trở lại. Cá Sấu thật quá đáng!" }
        ]
    },
    100: {
        minigame: 'bubble_shooter',
        preGame: [
            { character: 'boss', text: "Lặn xuống đây mà đấu với ta! Nhận lấy những bong bóng bùn lầy này đi!" },
            { character: 'monkey', text: "Tránh ra! Ngắm bắn vỡ hết những bong bóng bùn trước khi chúng bắn tung tóe vào chúng ta." }
        ],
        postGame: [
            { character: 'monkey', text: "Bong bóng nổ hết rồi, bộ lông của chúng ta vẫn khô ráo và sạch sẽ." }
        ]
    },
    101: {
        minigame: 'whack_mole',
        preGame: [
            { character: 'monkey', text: "Cá Sấu xua lũ cua đá tay sai bò lên bờ kẹp nát các tổ rùa kìa." },
            { character: 'monkey', text: "Lấy búa ra, gõ trúng vỏ lũ cua để đuổi chúng xuống nước ngay!" }
        ],
        postGame: [
            { character: 'monkey', text: "Lũ cua đá đã sợ hãi lặn mất tăm. Tổ rùa đã được bảo vệ." }
        ]
    },
    102: {
        minigame: 'racing',
        preGame: [
            { character: 'monkey', text: "Cá Sấu đang xuôi theo dòng nước trốn thoát. Nhanh nhảy lên chiếc lá sen khổng lồ này!" },
            { character: 'monkey', text: "Cùng lướt sóng đua tốc độ xem ai bơi nhanh hơn nào!" }
        ],
        postGame: [
            { character: 'monkey', text: "Lá sen lướt nhanh quá! Chúng ta vẫn bám sát được hắn." }
        ]
    },
    103: {
        minigame: 'grow_plant',
        preGame: [
            { character: 'monkey', text: "Phía trước nước chảy xiết quá. Chúng ta cần những cây cổ thụ để làm cầu phao." },
            { character: 'monkey', text: "Dùng phép thuật gieo hạt, gõ đúng để cây cổ thụ mọc trên mặt nước nhé." }
        ],
        postGame: [
            { character: 'monkey', text: "Cây cổ thụ đã hoàn thành. Bước qua thật cẩn thận nào." }
        ]
    },
    104: {
        minigame: 'catch_insects',
        preGame: [
            { character: 'monkey', text: "Dòng suối chảy vào một hang động tối om. Cần có ánh sáng để đi tiếp." },
            { character: 'monkey', text: "Hãy dùng vợt bắt vài bạn đom đóm nước để thắp sáng xung quanh nhé." }
        ],
        postGame: [
            { character: 'monkey', text: "Đom đóm nước sáng lung linh quá. Mọi thứ đã rõ ràng hơn rồi." }
        ]
    },
    105: {
        minigame: 'assemble_object',
        preGame: [
            { character: 'monkey', text: "Chiếc bè gỗ của bác Rái Cá bị Cá Sấu đập vỡ thành nhiều mảnh." },
            { character: 'monkey', text: "Hãy gõ đúng để ráp các thân cây gỗ lại thành một chiếc bè mới giúp bác ấy." }
        ],
        postGame: [
            { character: 'monkey', text: "Bè gỗ mới rất chắc chắn. Bác Rái Cá đã có thể qua sông an toàn." }
        ]
    },
    106: {
        minigame: 'frog_jump',
        preGame: [
            { character: 'monkey', text: "Cá Sấu tạo ra những vùng nước xoáy nguy hiểm. Phải nhảy qua các tảng đá nhô lên thôi." },
            { character: 'monkey', text: "Gõ đúng nhịp để nhảy thật chuẩn, đừng để trượt chân xuống vùng nước xoáy nhé!" }
        ],
        postGame: [
            { character: 'monkey', text: "Pha nhảy cuối cùng thật thót tim. May mà chúng ta đều bình an." }
        ]
    },
    107: {
        minigame: 'collect_items',
        preGame: [
            { character: 'boss', text: "Dưới đáy suối này là kho ngọc trai của ta, đừng hòng chạm tới!" },
            { character: 'monkey', text: "Ngọc trai là tinh hoa của dòng suối. Nhanh tay nhặt chúng vào túi để tăng sức mạnh chống lại hắn." }
        ],
        postGame: [
            { character: 'monkey', text: "Những viên ngọc trai thật lấp lánh. Chúng ta đã nạp đầy năng lượng!" }
        ]
    },
    108: {
        minigame: 'clear_fog',
        preGame: [
            { character: 'boss', text: "Ta sẽ quẫy đuôi làm đục ngầu dòng nước, các ngươi đừng mơ tìm được ta!" },
            { character: 'monkey', text: "Nước đục và mù mịt quá. Gõ phím để thanh lọc dòng suối, trả lại sự trong vắt vốn có!" }
        ],
        postGame: [
            { character: 'monkey', text: "Nước lại trong vắt như gương rồi. Sào huyệt của Cá Sấu ở ngay phía trước!" }
        ]
    },
    109: {
        minigame: 'bubble_shooter',
        preGame: [
            { character: 'monkey', text: "Hắn đang phun những quả cầu rêu độc hại ra cản đường." },
            { character: 'monkey', text: "Bắn vỡ hết những quả cầu đó để làm sạch lối vào sào huyệt của hắn!" }
        ],
        postGame: [
            { character: 'monkey', text: "Lối đi đã thông thoáng. Không gì có thể cản bước chúng ta nữa." }
        ]
    },
    110: {
        minigame: 'assemble_object',
        preGame: [
            { character: 'monkey', text: "Cá Sấu đang đợi ở đầm lầy lớn phía trước. Lần này phải chuẩn bị thật kỹ." },
            { character: 'monkey', text: "Hãy ghép các mảnh gỗ cứng cáp lại thành một chiếc khiên để đối đầu với hắn nào!" }
        ],
        postGame: [
            { character: 'monkey', text: "Khiên gỗ đã sẵn sàng! Cùng rẽ sóng tiến lên và đánh bại Cá Sấu thôi!" }
        ]
    },
    // Lesson 112 - 124 (Group: Sông nước, Chapter 9:  'Suối mát', Boss: Cá Sấu)
    112: {
        minigame: 'clear_fog',
        preGame: [
            { character: 'monkey', text: "Đến khúc Suối Mát rồi! Nước ở đây đáng lẽ phải rất trong veo." },
            { character: 'boss', text: "Khà khà! Ta đã quậy tung lớp bùn dưới đáy lên. Các ngươi sẽ không thấy đường đâu!" },
            { character: 'monkey', text: "Đừng lo! Hãy gõ phím thật nhanh để thanh lọc dòng suối, trả lại làn nước trong xanh!" }
        ],
        postGame: [
            { character: 'monkey', text: "Nước lại trong vắt như gương rồi. Không trò gian xảo nào làm khó được chúng ta!" }
        ]
    },
    113: {
        minigame: 'rescue_animals',
        preGame: [
            { character: 'monkey', text: "Tệ quá! Sói... à không, Cá Sấu đã dùng rong rêu trói chặt các bạn Rái Cá kìa." },
            { character: 'monkey', text: "Hãy gõ đúng các từ để cắt đứt đám rong rêu, giải cứu các bạn ấy ngay lập tức!" }
        ],
        postGame: [
            { character: 'monkey', text: "Các bạn Rái Cá đã được tự do bơi lội. Chúng ta phải ngăn Cá Sấu lại!" }
        ]
    },
    114: {
        minigame: 'bubble_shooter',
        preGame: [
            { character: 'boss', text: "Nếm thử những bong bóng sình lầy hôi thối của ta đây!" },
            { character: 'monkey', text: "Tránh ra! Bắn vỡ hết những bong bóng bùn đó trước khi chúng làm bẩn bộ lông của chúng ta!" }
        ],
        postGame: [
            { character: 'monkey', text: "Bong bóng nổ tung hết rồi. Suối Mát vẫn giữ được sự trong lành." }
        ]
    },
    115: {
        minigame: 'whack_mole',
        preGame: [
            { character: 'monkey', text: "Cá Sấu đang sai bầy cua đá bò lên bờ cắp hỏng những nụ hoa ven suối." },
            { character: 'monkey', text: "Nhanh tay cầm búa lên và gõ trúng mai lũ cua để đuổi chúng xuống nước!" }
        ],
        postGame: [
            { character: 'monkey', text: "Bầy cua đá hoảng sợ lặn mất tăm. Những bông hoa ven suối đã an toàn." }
        ]
    },
    116: {
        minigame: 'racing',
        preGame: [
            { character: 'monkey', text: "Kìa, Cá Sấu đang trượt theo dòng nước chảy xiết để bỏ trốn!" },
            { character: 'monkey', text: "Cùng nhảy lên khúc gỗ xà cừ này và lướt sóng đuổi theo hắn thật nhanh nào!" }
        ],
        postGame: [
            { character: 'monkey', text: "Khúc gỗ lướt nhanh quá! Chúng ta đang bám sát đuôi Cá Sấu rồi." }
        ]
    },
    117: {
        minigame: 'grow_plant',
        preGame: [
            { character: 'monkey', text: "Dòng suối phía trước rộng quá, chúng ta không thể bơi qua được." },
            { character: 'monkey', text: "Hãy dùng phép thuật gọi mưa để những cây cổ thụ khổng lồ mọc lên làm cầu vắt ngang nhé." }
        ],
        postGame: [
            { character: 'monkey', text: "Chiếc cầu cây cổ thụ thật vững chắc. Cùng bước qua thôi!" }
        ]
    },
    118: {
        minigame: 'catch_insects',
        preGame: [
            { character: 'monkey', text: "Khu vực này có nhiều đá ngầm nguy hiểm. Chúng ta cần sự trợ giúp." },
            { character: 'monkey', text: "Dùng vợt mời các bạn chuồn chuồn nước vào lọ để nhờ các bạn ấy bay lượn chỉ đường nhé." }
        ],
        postGame: [
            { character: 'monkey', text: "Có chuồn chuồn nước dẫn đường, chúng ta đã vượt qua bãi đá ngầm an toàn." }
        ]
    },
    119: {
        minigame: 'assemble_object',
        preGame: [
            { character: 'monkey', text: "Cá Sấu bơi ngang qua đã húc cái bè của Rùa rồi." },
            { character: 'monkey', text: "Gõ phím thật chính xác để sửa chữa cái bè giúp Rùa nhé." }
        ],
        postGame: [
            { character: 'monkey', text: "Cái bè đã sửa xong, chúng ta cùng qua sông thôi." }
        ]
    },
    120: {
        minigame: 'frog_jump',
        preGame: [
            { character: 'monkey', text: "Chúng ta phải nhảy qua những tảng đá phủ đầy rêu xanh này để đi tiếp." },
            { character: 'monkey', text: "Đá rất trơn! Gõ đúng nhịp để đôi chân bám thật chắc, đừng để rơi tõm xuống nước nhé." }
        ],
        postGame: [
            { character: 'monkey', text: "Phù! Những cú nhảy thật ngoạn mục. Không ai bị trượt ngã cả." }
        ]
    },
    121: {
        minigame: 'collect_items',
        preGame: [
            { character: 'boss', text: "Đáy suối đầy những viên ngọc lưu ly, ta sẽ nuốt chửng tất cả!" },
            { character: 'monkey', text: "Ngọc lưu ly chứa năng lượng tinh khiết! Hãy nhặt chúng vào túi trước khi Cá Sấu lấy mất." }
        ],
        postGame: [
            { character: 'monkey', text: "Túi ngọc lưu ly lấp lánh đang truyền cho chúng ta sức mạnh to lớn." }
        ]
    },
    122: {
        minigame: 'clear_fog',
        preGame: [
            { character: 'boss', text: "Ta sẽ phun hơi lạnh tạo thành lớp sương mù dày đặc đóng băng dòng suối!" },
            { character: 'monkey', text: "Lạnh quá! Gõ phím để tạo ra một luồng gió ấm thổi tan màn sương giá rét này ngay." }
        ],
        postGame: [
            { character: 'monkey', text: "Sương mù đã tan, Suối Mát lại chảy róc rách hiền hòa. Hang ổ của hắn lộ diện rồi!" }
        ]
    },
    123: {
        minigame: 'bubble_shooter',
        preGame: [
            { character: 'monkey', text: "Cá Sấu đang quẫy đuôi hất những tảng đá tảng về phía chúng ta." },
            { character: 'monkey', text: "Ngắm chuẩn và bắn vỡ những tảng đá đó giữa không trung để dọn đường tiến lên!" }
        ],
        postGame: [
            { character: 'monkey', text: "Đá vỡ vụn thành cát. Cá Sấu không còn trò gì để cản bước chúng ta nữa." }
        ]
    },
    124: {
        minigame: 'assemble_object',
        preGame: [
            { character: 'monkey', text: "Chúng ta đã đến tận sào huyệt của Cá Sấu. Cần một vũ khí đặc biệt để đối đầu hắn." },
            { character: 'monkey', text: "Hãy ghép những mảnh vỏ trai cứng nhất thành chiếc Khiên Ngọc Trai chói lóa bảo vệ chúng ta!" }
        ],
        postGame: [
            { character: 'monkey', text: "Khiên Ngọc Trai đã hoàn thành! Cầm chắc nó, lao vào sào huyệt và đánh bại Cá Sấu thôi!" }
        ]
    },
    // Lesson 126 - 138 (Group: Sông nước, Chapter 10:  'Cá vàng', Boss: Cá Sấu)
    126: {
        minigame: 'clear_fog',
        preGame: [
            { character: 'monkey', text: "Chúng ta đã đến Thung lũng Cá Vàng! Nhưng sao nước ở đây lại đục ngầu và tối tăm thế này?" },
            { character: 'boss', text: "Khà khà! Khỉ con, ta đã khuấy tung bùn lầy che khuất mọi thứ. Các ngươi sẽ không bao giờ tìm thấy báu vật của đàn cá!" },
            { character: 'monkey', text: "Đừng hòng! Hãy gõ phím để tạo luồng nước sạch thanh lọc dòng sông, thổi bay đám bùn đen này đi!" }
        ],
        postGame: [
            { character: 'monkey', text: "Dòng sông đã trong vắt trở lại. Những chú Cá Vàng đang bơi lội tung tăng kìa!" }
        ]
    },
    127: {
        minigame: 'rescue_animals',
        preGame: [
            { character: 'monkey', text: "Trời ơi! Cá Sấu đã lén giăng lưới bắt rất nhiều bạn Cá Vàng bé nhỏ." },
            { character: 'monkey', text: "Chúng ta phải nhanh tay gõ đúng các từ để cắt đứt mắt lưới và cứu các bạn ấy ra ngoài!" }
        ],
        postGame: [
            { character: 'monkey', text: "Các bạn Cá Vàng đã được tự do bơi lội. Cá Sấu đúng là kẻ xấu xa!" }
        ]
    },
    128: {
        minigame: 'racing',
        preGame: [
            { character: 'monkey', text: "Cá Sấu đang bơi trốn thoát theo dòng nước xiết. Nhảy lên chiếc bè lá này nhanh!" },
            { character: 'monkey', text: "Cùng chèo bè và đua tốc độ xem chúng ta hay hắn sẽ tới hạ lưu trước nào!" }
        ],
        postGame: [
            { character: 'monkey', text: "Chiếc bè lướt nhanh như gió! Chúng ta đang bám rất sát hắn rồi." }
        ]
    },
    129: {
        minigame: 'bubble_shooter',
        preGame: [
            { character: 'boss', text: "Nhận lấy những quả bóng nước bẩn thỉu của ta đây! Tránh vỏ dưa gặp vỏ dừa nhé!" },
            { character: 'monkey', text: "Nguy hiểm quá! Nhanh tay bắn vỡ hết những quả bóng nước trước khi chúng rơi trúng đầu chúng ta!" }
        ],
        postGame: [
            { character: 'monkey', text: "Phù, những quả bóng nước đã nổ tung hết. Phản xạ của bạn tuyệt lắm!" }
        ]
    },
    130: {
        minigame: 'collect_items',
        preGame: [
            { character: 'boss', text: "Đói bụng rồi chứ gì? Xung quanh đây ta đã ăn sạch thức ăn của Cá Vàng rồi!" },
            { character: 'monkey', text: "Đừng mắc mưu hắn! Chúng ta hãy cẩn thận nhặt những sợi tảo biển dinh dưỡng còn sót lại để tiếp thêm năng lượng." }
        ],
        postGame: [
            { character: 'monkey', text: "Giỏ đã đầy tảo biển thơm ngon. Đàn Cá Vàng sẽ không lo bị đói nữa!" }
        ]
    },
    131: {
        minigame: 'catch_insects',
        preGame: [
            { character: 'monkey', text: "Càng bơi vào sâu, hang động ngầm càng tối. Hãy dùng vợt bắt vài bạn sứa phát sáng để soi đường nhé." }
        ],
        postGame: [
            { character: 'monkey', text: "Lọ sứa phát sáng rực rỡ quá! Cảm ơn các bạn sứa đã soi đường." }
        ]
    },
    132: {
        minigame: 'whack_mole',
        preGame: [
            { character: 'monkey', text: "Cá Sấu đang xúi giục đàn cua đá đào hang phá hỏng bờ sông kìa." },
            { character: 'monkey', text: "Dùng búa gõ trúng đích lũ cua đá để lấp các cái hố lại nhé!" }
        ],
        postGame: [
            { character: 'monkey', text: "Đàn cua đá đã hoảng sợ lặn mất tăm. Bờ sông lại an toàn vững chắc." }
        ]
    },
    133: {
        minigame: 'grow_plant',
        preGame: [
            { character: 'monkey', text: "Cá Sấu đã phá hỏng cây cầu phao. Chúng ta cần dùng phép thuật để làm một cây gỗ khổng lồ vươn lên giữa dòng." }
        ],
        postGame: [
            { character: 'monkey', text: "Cây gỗ đã vươn lên thành một điểm tựa vô cùng vững chắc. Bước qua thôi!" }
        ]
    },
    134: {
        minigame: 'frog_jump',
        preGame: [
            { character: 'monkey', text: "Trước mặt là một bãi đá ngầm đầy rêu trơn trượt do Cá Sấu tạo ra. Nhờ các bạn Nhái bén dẫn đường nhảy qua những tảng đá an toàn nhé!" }
        ],
        postGame: [
            { character: 'monkey', text: "Cú nhảy cuối cùng hoàn hảo! Không ai bị ngã xuống nước cả." }
        ]
    },
    135: {
        minigame: 'assemble_object',
        preGame: [
            { character: 'monkey', text: "Cá Sấu lúc tháo chạy đã làm hỏng cây cầu bắt qua sông." },
            { character: 'monkey', text: "Gõ đúng các từ để sửa lại cây cầu giúp chúng ta qua sông nào." }
        ],
        postGame: [
            { character: 'monkey', text: "Cây cầu đã sửa xong. Chúng ta mau chóng qua sông đuổi theo Cá Sấu thôi!" }
        ]
    },
    136: {
        minigame: 'rescue_animals',
        preGame: [
            { character: 'monkey', text: "Nghe có tiếng kêu cứu! Nữ hoàng Cá Vàng đang bị Cá Sấu bắt. Chúng ta phải giải cứu ngay!" }
        ],
        postGame: [
            { character: 'monkey', text: "Nữ hoàng Cá Vàng đã thoát ra ngoài. Chúng ta sắp đuổi kịp kẻ đầu sỏ rồi!" }
        ]
    },
    137: {
        minigame: 'clear_fog',
        preGame: [
            { character: 'boss', text: "Gần đến sào huyệt của ta rồi sao? Nhận lấy màn sương mù độc hại này đi!" },
            { character: 'monkey', text: "Cá Sấu đang sợ hãi đấy! Cùng nhau tạo gió thổi bay màn sương này để tiến thẳng vào hang ổ của hắn!" }
        ],
        postGame: [
            { character: 'monkey', text: "Trời quang mây tạnh. Sào huyệt của Cá Sấu dưới Thung lũng Cá Vàng đã lộ diện!" }
        ]
    },
    138: {
        minigame: 'assemble_object',
        preGame: [
            { character: 'monkey', text: "Cá Sấu rất ranh mãnh. Trước khi đối đầu trực tiếp, hãy ghép các vỏ sò cứng này thành một chiếc khiên bảo vệ nhé!" }
        ],
        postGame: [
            { character: 'monkey', text: "Chiếc khiên vỏ sò siêu vững chắc đã hoàn thành! Cầm lấy nó và dũng cảm tiến lên đối mặt với Cá Sấu nào!" }
        ]
    },
    // Lesson 140 - 152 (Group: Sông nước, Chapter 11:  'Hồ sen', Boss: Cá Sấu)
    140: {
        minigame: 'clear_fog',
        preGame: [
            { character: 'monkey', text: "Thơm quá! Chúng ta đã đến Hồ Sen rồi, nhưng sao sương mù dày đặc vậy?" },
            { character: 'boss', text: "Khà khà! Ta đã hà hơi độc che kín mặt hồ. Khu vực này giờ là của ta!" },
            { character: 'monkey', text: "Đừng hòng! Cùng gõ phím để tạo gió thổi tan lớp sương mù độc hại này nào!" }
        ],
        postGame: [
            { character: 'monkey', text: "Sương mù đã tan biến, những đóa hoa sen lại vươn mình rực rỡ đón nắng." }
        ]
    },
    141: {
        minigame: 'rescue_animals',
        preGame: [
            { character: 'monkey', text: "Trời ơi! Cá Sấu đã bắt bạn Ếch Xanh lại rồi." },
            { character: 'monkey', text: "Gõ thật chuẩn để cắt đứt lưới và cứu bạn Ếch ra ngoài nhé!" }
        ],
        postGame: [
            { character: 'monkey', text: "Ếch Xanh đã tự do nhảy nhót. Cá Sấu thật tàn nhẫn với các loài vật nhỏ!" }
        ]
    },
    142: {
        minigame: 'bubble_shooter',
        preGame: [
            { character: 'boss', text: "Thử xem các ngươi có né được bong bóng sình lầy của ta không!" },
            { character: 'monkey', text: "Bắn vỡ hết bong bóng bùn trước khi chúng rơi xuống làm bẩn những cánh sen xinh đẹp!" }
        ],
        postGame: [
            { character: 'monkey', text: "Hay lắm! Bong bóng vỡ tan hết rồi, Hồ Sen vẫn giữ được vẻ thanh khiết." }
        ]
    },
    143: {
        minigame: 'whack_mole',
        preGame: [
            { character: 'monkey', text: "Cá Sấu đang xua lũ cua đá lên cắn nát những chiếc lá sen khổng lồ kìa." },
            { character: 'monkey', text: "Nhanh tay cầm búa lên, gõ trúng mai lũ cua để đuổi chúng xuống nước ngay!" }
        ],
        postGame: [
            { character: 'monkey', text: "Lũ cua hoảng sợ lặn mất tăm. Lá sen đã được bảo vệ vẹn toàn." }
        ]
    },
    144: {
        minigame: 'racing',
        preGame: [
            { character: 'monkey', text: "Hắn đang lẩn trốn qua những khóm sen! Nhanh trèo lên chiếc lá sen này." },
            { character: 'monkey', text: "Cùng lướt trên mặt nước và đua tốc độ đuổi theo Cá Sấu thôi!" }
        ],
        postGame: [
            { character: 'monkey', text: "Lá sen lướt êm quá! Chúng ta đã rút ngắn khoảng cách với hắn rồi." }
        ]
    },
    145: {
        minigame: 'grow_plant',
        preGame: [
            { character: 'monkey', text: "Khoảng cách giữa các đài sen xa quá. Chúng ta cần một lối đi mới." },
            { character: 'monkey', text: "Dùng phép thuật gõ phím để gọi cây hoa khổng lồ nở rộ vươn lên làm cầu nối nhé." }
        ],
        postGame: [
            { character: 'monkey', text: "Cây hoa nở bung tuyệt đẹp, tạo thành một bước đệm hoàn hảo cho chúng ta." }
        ]
    },
    146: {
        minigame: 'collect_items',
        preGame: [
            { character: 'boss', text: "Ta sẽ ăn sạch bãi hạt sen ở đây, các ngươi đừng hòng có phần!" },
            { character: 'monkey', text: "Hạt sen chứa nhiều năng lượng phục hồi. Nhặt nhanh chúng vào giỏ trước khi hắn cướp mất!" }
        ],
        postGame: [
            { character: 'monkey', text: "Đầy một giỏ hạt sen thơm ngon. Năng lượng của chúng ta lại dồi dào rồi!" }
        ]
    },
    147: {
        minigame: 'catch_insects',
        preGame: [
            { character: 'monkey', text: "Dưới những tán lá sen khổng lồ này thật thiếu ánh sáng." },
            { character: 'monkey', text: "Hãy dùng vợt mời các bạn đom đóm kim đến soi đường cho chúng ta đi tiếp." }
        ],
        postGame: [
            { character: 'monkey', text: "Đàn đom đóm bay lượn lấp lánh như những ngọn đèn nhỏ. Cảm ơn các bạn!" }
        ]
    },
    148: {
        minigame: 'frog_jump',
        preGame: [
            { character: 'monkey', text: "Cá Sấu quẫy đuôi làm mặt hồ nổi sóng lớn quá. Các lá sen đang bồng bềnh." },
            { character: 'monkey', text: "Gõ đúng nhịp để nhảy thật khéo qua các lá sen, đừng để trượt chân xuống nước nhé!" }
        ],
        postGame: [
            { character: 'monkey', text: "Thật nhịp nhàng! Chúng ta đã an toàn vượt qua vùng nước xoáy sóng dữ." }
        ]
    },
    149: {
        minigame: 'assemble_object',
        preGame: [
            { character: 'monkey', text: "Chiếc bè của chúng ta bị va đập rách mất rồi." },
            { character: 'monkey', text: "Hãy nhanh chóng dùng những đoạn gỗ ráp lại thành một chiếc bè kiên cố hơn." }
        ],
        postGame: [
            { character: 'monkey', text: "Chiếc bè đã hoàn tất. Vừa đẹp lại vừa chắc chắn, tiếp tục hành trình nào!" }
        ]
    },
    150: {
        minigame: 'clear_fog',
        preGame: [
            { character: 'boss', text: "Đã bám theo đến tận đây sao? Nhận lấy luồng chướng khí đen kịt này đi!" },
            { character: 'monkey', text: "Xung quanh tối sầm lại rồi! Gõ phím thật mạnh thổi bay chướng khí để tìm đường tiến lên!" }
        ],
        postGame: [
            { character: 'monkey', text: "Ánh sáng đã trở lại! Sào huyệt của Cá Sấu ẩn sau bông sen chúa kia rồi!" }
        ]
    },
    151: {
        minigame: 'bubble_shooter',
        preGame: [
            { character: 'monkey', text: "Hắn đang điên cuồng ném những chùm gai nhọn từ cuống sen về phía chúng ta." },
            { character: 'monkey', text: "Tuyệt đối không được lùi bước! Ngắm chuẩn và bắn vỡ những chùm gai đó ngay giữa không trung!" }
        ],
        postGame: [
            { character: 'monkey', text: "Mọi đòn tấn công đã bị chặn đứng. Cá Sấu đã cùng đường rồi!" }
        ]
    },
    152: {
        minigame: 'assemble_object',
        preGame: [
            { character: 'monkey', text: "Cá Sấu đang ở ngay phía trước. Trước trận chiến lớn, chúng ta cần lớp phòng ngự." },
            { character: 'monkey', text: "Hãy ghép những đài sen cứng nhất lại thành chiếc Khiên Hoa Sen bảo vệ tuyệt đối!" }
        ],
        postGame: [
            { character: 'monkey', text: "Khiên Hoa Sen tỏa ra mùi hương thanh khiết và rực sáng! Xông lên kết thúc mọi chuyện thôi!" }
        ]
    },
    // Lesson 154 - 166 (Group: Sông nước, Chapter 12:  'Cầu tre', Boss: Cá Sấu)
    154: {
        minigame: 'clear_fog',
        preGame: [
            { character: 'monkey', text: "Đến Cầu Tre rồi! Nhưng sương mù che khuất hết mặt sông, không thấy lối sang bờ bên kia." },
            { character: 'boss', text: "Khà khà! Cây cầu này sắp sập rồi, sương mù của ta sẽ khiến các ngươi rơi tõm xuống nước!" },
            { character: 'monkey', text: "Nhanh tay gõ phím tạo gió thổi bay sương mù để nhìn rõ từng nhịp cầu tre nào!" }
        ],
        postGame: [
            { character: 'monkey', text: "Sương mù đã tan. Đường qua cầu tuy hẹp nhưng chúng ta sẽ vượt qua được." }
        ]
    },
    155: {
        minigame: 'rescue_animals',
        preGame: [
            { character: 'monkey', text: "Bọn tay sai của Cá Sấu đã trói bạn Cò Trắng bằng những sợi dây leo kìa." },
            { character: 'monkey', text: "Gõ đúng các từ để cắt đứt dây leo và cứu bạn ấy ra nhé!" }
        ],
        postGame: [
            { character: 'monkey', text: "Cò Trắng đã vỗ cánh bay lên an toàn. Tiếp tục tiến lên thôi!" }
        ]
    },
    156: {
        minigame: 'bubble_shooter',
        preGame: [
            { character: 'boss', text: "Nhận lấy những quả bóng bùn hôi thối này đi! Ta sẽ làm cầu trơn tuột!" },
            { character: 'monkey', text: "Cẩn thận! Bắn vỡ hết những quả bóng bùn trước khi chúng rơi xuống làm trơn mặt cầu tre!" }
        ],
        postGame: [
            { character: 'monkey', text: "Bong bóng bùn đã nổ sạch giữa không trung. Cầu tre vẫn khô ráo dễ đi." }
        ]
    },
    157: {
        minigame: 'whack_mole',
        preGame: [
            { character: 'monkey', text: "Lũ chuột nước đang ngoi lên gặm nhấm các thanh tre đỡ mặt cầu." },
            { character: 'monkey', text: "Dùng búa gõ trúng đầu chúng để đuổi đi, bảo vệ cây cầu không bị sập nhé!" }
        ],
        postGame: [
            { character: 'monkey', text: "Lũ chuột đã lặn mất tăm. Các thanh tre vẫn vô cùng vững chắc." }
        ]
    },
    158: {
        minigame: 'racing',
        preGame: [
            { character: 'monkey', text: "Cá Sấu đang trườn rất nhanh trên cầu để bỏ trốn. Hắn định phá cầu từ bờ bên kia!" },
            { character: 'monkey', text: "Cùng nhảy lên xe và đua tốc độ đuổi theo hắn ngay lập tức!" }
        ],
        postGame: [
            { character: 'monkey', text: "Xe chạy nhanh quá! Chúng ta đang bám sát gót hắn rồi." }
        ]
    },
    159: {
        minigame: 'grow_plant',
        preGame: [
            { character: 'monkey', text: "Một đoạn cầu tre bị Cá Sấu hất văng mất rồi. Chúng ta cần cây cầu mới." },
            { character: 'monkey', text: "Dùng phép thuật, gõ phím để cây lớn nhanh đan thành nhịp cầu mới nối lại đường đi." }
        ],
        postGame: [
            { character: 'monkey', text: "Cây mọc lên nhanh chóng và uốn cong thành nhịp cầu tuyệt đẹp. Bước qua thôi!" }
        ]
    },
    160: {
        minigame: 'catch_insects',
        preGame: [
            { character: 'monkey', text: "Mùi bùn lầy của Cá Sấu kéo theo một đàn muỗi vằn hung dữ bay đến." },
            { character: 'monkey', text: "Dùng vợt vung thật chuẩn xác để bắt gọn lũ muỗi, không cho chúng chích các bạn nhỏ!" }
        ],
        postGame: [
            { character: 'monkey', text: "Đàn muỗi vằn đã bị thu phục hết. Đường qua cầu lại yên bình." }
        ]
    },
    161: {
        minigame: 'frog_jump',
        preGame: [
            { character: 'monkey', text: "Mặt cầu ở đây bị phá hỏng, chỉ còn lại những những chiếc lá trôi trên mặt nước." },
            { character: 'monkey', text: "Gõ đúng nhịp để nhảy khéo léo qua từng chiếc lá, giữ thăng bằng đừng để rơi xuống nhé!" }
        ],
        postGame: [
            { character: 'monkey', text: "Hay lắm! Những cú nhảy vô cùng chuẩn xác. Không ai bị ngã xuống sông." }
        ]
    },
    162: {
        minigame: 'collect_items',
        preGame: [
            { character: 'boss', text: "Ta sẽ hất tung đống bắp ngọc cất giấu trên cầu này xuống sông cho cá ăn!" },
            { character: 'monkey', text: "Bắp ngọc chứa nhiều năng lượng! Nhanh tay nhặt chúng vào túi trước khi chìm nghỉm." }
        ],
        postGame: [
            { character: 'monkey', text: "Thu thập đủ bắp ngọc rồi. Chúng ta đã có thêm sức mạnh để đối phó với Cá Sấu." }
        ]
    },
    163: {
        minigame: 'assemble_object',
        preGame: [
            { character: 'monkey', text: "Chiếc thuyền gỗ của bác Ngư Phủ bị Cá Sấu cắn rách tơi tả." },
            { character: 'monkey', text: "Hãy gõ phím để ghép các nan gỗ lại, đan thành một chiếc thuyền mới thật chắc chắn giúp bác ấy." }
        ],
        postGame: [
            { character: 'monkey', text: "Chiếc thuyền gỗ mới rất hoàn hảo. Bác Ngư Phủ gửi lời cảm ơn chúng ta." }
        ]
    },
    164: {
        minigame: 'clear_fog',
        preGame: [
            { character: 'boss', text: "Hừ, ngoan cố lắm! Làn chướng khí này sẽ làm mục nát cả cây cầu cùng với các ngươi!" },
            { character: 'monkey', text: "Đừng sợ! Gõ phím tạo cuồng phong thổi bay chướng khí trước khi tre bị mục. Hắn sắp hết đường chạy rồi!" }
        ],
        postGame: [
            { character: 'monkey', text: "Chướng khí tan biến. Cuối cầu tre chính là hang ổ bờ sông của hắn." }
        ]
    },
    165: {
        minigame: 'bubble_shooter',
        preGame: [
            { character: 'monkey', text: "Cá Sấu đang ném những khúc gỗ mục tẩm độc từ cuối cầu lại đây cản đường." },
            { character: 'monkey', text: "Ngắm bắn thật chuẩn để phá nát những khúc gỗ đó trên không trung trước khi trúng vào chúng ta!" }
        ],
        postGame: [
            { character: 'monkey', text: "Những khúc gỗ mục đã vỡ vụn. Đòn tấn công của Cá Sấu hoàn toàn thất bại." }
        ]
    },
    166: {
        minigame: 'assemble_object',
        preGame: [
            { character: 'monkey', text: "Đã đến tận cùng Cầu Tre. Cá Sấu đang phình to chờ sẵn phía trước." },
            { character: 'monkey', text: "Hãy đan những thanh tre cứng và sắc bén nhất thành chiếc Khiên Gai Tre để sẵn sàng chiến đấu!" }
        ],
        postGame: [
            { character: 'monkey', text: "Khiên Gai Tre vô cùng vững chắc! Cầm vũ khí lên, lao về phía trước và cho Cá Sấu một bài học nào!" }
        ]
    },
    // Lesson 168 - 180 (Group: Sông nước, Chapter 13:  'Thuyền nhỏ', Boss: Cá Sấu)
    168: {
        minigame: 'clear_fog',
        preGame: [
            { character: 'monkey', text: "Chúng ta đã tìm thấy bến đỗ Thuyền Nhỏ, nhưng sương mù sông nước dày quá!" },
            { character: 'boss', text: "Khà khà! Dòng sông này là của ta, các ngươi đừng hòng vác mặt lên thuyền!" },
            { character: 'monkey', text: "Gõ phím tạo gió thổi tan sương mù để tìm ra chiếc thuyền chắc chắn nhất nào!" }
        ],
        postGame: [
            { character: 'monkey', text: "Sương mù đã tan. Chiếc Thuyền Nhỏ kia trông rất vững chãi, lên thôi!" }
        ]
    },
    169: {
        minigame: 'rescue_animals',
        preGame: [
            { character: 'monkey', text: "Cá Sấu đã dùng dây thừng trói chặt bạn Rùa Con vào cột neo thuyền." },
            { character: 'monkey', text: "Gõ đúng để cởi trói và giải cứu Rùa Con trước khi nước lên nhé!" }
        ],
        postGame: [
            { character: 'monkey', text: "Rùa Con đã an toàn bơi xuống nước. Chúng ta phải ngăn Cá Sấu lại!" }
        ]
    },
    170: {
        minigame: 'bubble_shooter',
        preGame: [
            { character: 'boss', text: "Thuyền của các ngươi sẽ bị nhấn chìm bởi những quả bong bóng xoáy nước của ta!" },
            { character: 'monkey', text: "Cẩn thận! Mau bắn vỡ những quả bong bóng đó để bảo vệ thuyền!" }
        ],
        postGame: [
            { character: 'monkey', text: "Bong bóng nổ tung hết rồi. Thuyền Nhỏ vẫn an toàn lướt sóng." }
        ]
    },
    171: {
        minigame: 'whack_mole',
        preGame: [
            { character: 'monkey', text: "Lũ cua đá tay sai của Cá Sấu đang bám vào mạn thuyền định đục lỗ kìa." },
            { character: 'monkey', text: "Dùng búa gõ trúng đầu chúng để đuổi đi, không để thuyền bị chìm nhé!" }
        ],
        postGame: [
            { character: 'monkey', text: "Bọn cua đá đã nhảy hết xuống sông. Thuyền Nhỏ vẫn lành lặn." }
        ]
    },
    172: {
        minigame: 'racing',
        preGame: [
            { character: 'monkey', text: "Cá Sấu bắt đầu lặn xuống nước trốn thoát. Nhanh chóng chèo thuyền đuổi theo hắn!" },
            { character: 'monkey', text: "Gõ thật nhanh để mái chèo lướt trên mặt nước, quyết không cho hắn tẩu thoát!" }
        ],
        postGame: [
            { character: 'monkey', text: "Tốc độ chèo thuyền tuyệt vời! Chúng ta đang bám sát hắn." }
        ]
    },
    173: {
        minigame: 'grow_plant',
        preGame: [
            { character: 'monkey', text: "Dòng nước chảy xiết quá, thuyền đang bị cuốn đi. Hãy tìm cây cầu đi qua!" },
            { character: 'monkey', text: "Dùng phép thuật gieo hạt cây, gõ phím để cây mọc lớn lên làm cây cầu qua sông." }
        ],
        postGame: [
            { character: 'monkey', text: "Cây mọc lên làm cầu chắc chắn. Thuyền đã dừng lại an toàn trước thác nước nguy hiểm." }
        ]
    },
    174: {
        minigame: 'catch_insects',
        preGame: [
            { character: 'monkey', text: "Vùng nước tù này có rất nhiều muỗi nước hung dữ cản trở đường đi." },
            { character: 'monkey', text: "Dùng vợt vung thật chuẩn xác để tóm gọn lũ muỗi, dọn đường cho thuyền tiến lên!" }
        ],
        postGame: [
            { character: 'monkey', text: "Đàn muỗi nước đã bị dẹp sạch. Hành trình lại êm đềm." }
        ]
    },
    175: {
        minigame: 'frog_jump',
        preGame: [
            { character: 'monkey', text: "Phía trước là bãi đá ngầm lởm chởm. Không thể chèo thuyền qua được!" },
            { character: 'monkey', text: "Cầm dây thừng và nhảy qua những tảng đá nhấp nhô để kéo thuyền qua đoạn này nhé." }
        ],
        postGame: [
            { character: 'monkey', text: "Bước nhảy rất khéo léo. Thuyền Nhỏ đã vượt qua bãi đá ngầm mà không bị trầy xước." }
        ]
    },
    176: {
        minigame: 'collect_items',
        preGame: [
            { character: 'boss', text: "Ta sẽ quẫy đuôi làm sóng lớn lật tung rương ngọc trai trên thuyền của các ngươi!" },
            { character: 'monkey', text: "Ngọc trai rơi tung tóe rồi! Gõ nhanh nhặt lại chúng để không bị rơi xuống sông." }
        ],
        postGame: [
            { character: 'monkey', text: "Toàn bộ ngọc trai đã được thu lại. Sức mạnh của chúng ta vẫn nguyên vẹn." }
        ]
    },
    177: {
        minigame: 'assemble_object',
        preGame: [
            { character: 'monkey', text: "Cơn sóng dữ của Cá Sấu đã làm rách thuyền gỗ rồi." },
            { character: 'monkey', text: "Hãy gõ phím để ráp các mảnh gỗ và đóng chặt lại, giúp thuyền cứng cáp đi tiếp!" }
        ],
        postGame: [
            { character: 'monkey', text: "Thuyền gỗ lại chắc chắn. Chúng ta cùng tiếp tục rẽ sóng tiến về phía trước!" }
        ]
    },
    178: {
        minigame: 'clear_fog',
        preGame: [
            { character: 'boss', text: "Cố chấp bám theo sao? Làn sương độc này sẽ biến dòng sông thành mê cung vĩnh viễn!" },
            { character: 'monkey', text: "Không có gì cản được chúng ta! Gõ phím tạo gió mạnh thổi tan sương mù, sào huyệt hắn ngay đây rồi!" }
        ],
        postGame: [
            { character: 'monkey', text: "Tầm nhìn đã rõ ràng. Sào huyệt của Cá Sấu hiện ra ở cuối khúc sông." }
        ]
    },
    179: {
        minigame: 'bubble_shooter',
        preGame: [
            { character: 'monkey', text: "Hắn đang điên cuồng dùng đuôi hất những tảng đá ngầm to lớn về phía chúng ta." },
            { character: 'monkey', text: "Ngắm chuẩn và bắn nát các tảng đá trên không trung, bảo vệ Thuyền Nhỏ!" }
        ],
        postGame: [
            { character: 'monkey', text: "Những tảng đá vỡ vụn rơi xuống nước. Đòn tấn công của Cá Sấu đã thất bại." }
        ]
    },
    180: {
        minigame: 'assemble_object',
        preGame: [
            { character: 'monkey', text: "Hang ổ của Cá Sấu ngay trước mặt. Trận chiến lớn sắp bắt đầu rồi." },
            { character: 'monkey', text: "Hãy ghép những mảnh gỗ lim cứng nhất thành chiếc Khiên Thủy Tùng để cản đòn của hắn!" }
        ],
        postGame: [
            { character: 'monkey', text: "Khiên Thủy Tùng vô cùng kiên cố. Cầm chắc vũ khí, đánh bại Cá Sấu thôi!" }
        ]
    },
    // Lesson 182 - 194 (Group: Sông nước, Chapter 14:  'Thác bạc', Boss: Cá Sấu)
    182: {
        minigame: 'clear_fog',
        preGame: [
            { character: 'monkey', text: "Ôi, tiếng nước chảy rầm rập! Chúng ta đã đến Thác Bạc rồi, nhưng bụi nước mù mịt quá." },
            { character: 'boss', text: "Khà khà! Dòng thác này sẽ cuốn trôi tất cả các ngươi. Bỏ cuộc đi!" },
            { character: 'monkey', text: "Không bao giờ! Hãy gõ phím thật nhanh để tạo gió thổi tan màn sương mù này nào!" }
        ],
        postGame: [
            { character: 'monkey', text: "Sương mù đã tan, Thác Bạc trắng xóa hiện ra thật hùng vĩ. Tiến lên thôi!" }
        ]
    },
    183: {
        minigame: 'rescue_animals',
        preGame: [
            { character: 'monkey', text: "Nhìn kìa! Một bạn Cá Chép đang bị mắc kẹt trong lưới rêu của Cá Sấu." },
            { character: 'monkey', text: "Dòng thác đang đổ xuống rất mạnh, gõ đúng để cắt lưới cứu bạn ấy ngay!" }
        ],
        postGame: [
            { character: 'monkey', text: "Cá Chép đã quẫy đuôi bơi ngược dòng an toàn. Chúng ta làm tốt lắm!" }
        ]
    },
    184: {
        minigame: 'bubble_shooter',
        preGame: [
            { character: 'boss', text: "Ta ở trên cao này! Nhận lấy cơn mưa bong bóng nước xoáy của ta đi!" },
            { character: 'monkey', text: "Hắn ném bóng nước từ đỉnh thác xuống! Bắn vỡ chúng ngay trước khi chúng ta bị cuốn trôi!" }
        ],
        postGame: [
            { character: 'monkey', text: "Mọi quả bóng nước đều vỡ tan. Cá Sấu không thể làm khó chúng ta." }
        ]
    },
    185: {
        minigame: 'whack_mole',
        preGame: [
            { character: 'monkey', text: "Lũ cua đá tay sai đang nhô đầu ra từ các hốc đá trên vách thác để phục kích." },
            { character: 'monkey', text: "Nhanh tay cầm búa, gõ trúng đầu chúng để dọn đường leo lên đỉnh thác nhé!" }
        ],
        postGame: [
            { character: 'monkey', text: "Lũ cua đá đã sợ hãi thụt hết vào hang. Vách đá đã an toàn để leo." }
        ]
    },
    186: {
        minigame: 'racing',
        preGame: [
            { character: 'monkey', text: "Cá Sấu đang bơi ngược thác để bỏ trốn. Cùng bám vào vây bạn Cá Chép khổng lồ!" },
            { character: 'monkey', text: "Gõ phím thật nhanh để tăng tốc, vượt qua dòng nước xiết đuổi theo hắn nào!" }
        ],
        postGame: [
            { character: 'monkey', text: "Cá Chép bơi khỏe quá! Chúng ta đã vượt qua được đoạn thác chảy xiết nhất." }
        ]
    },
    187: {
        minigame: 'grow_plant',
        preGame: [
            { character: 'monkey', text: "Vách đá trơn tuột, chúng ta không thể tự leo lên được nữa." },
            { character: 'monkey', text: "Hãy gieo hạt giống phép thuật, gõ đúng để cây mọc cao lên làm thang leo!" }
        ],
        postGame: [
            { character: 'monkey', text: "Cây mọc lên cao vút. Bám chắc vào, chúng ta cùng leo lên nào!" }
        ]
    },
    188: {
        minigame: 'catch_insects',
        preGame: [
            { character: 'monkey', text: "Lối đi dẫn vào một hang động tối om phía sau dòng thác." },
            { character: 'monkey', text: "Dùng vợt bắt những bạn đom đóm nước vào lọ để thắp sáng con đường nhé." }
        ],
        postGame: [
            { character: 'monkey', text: "Ánh sáng đom đóm lấp lánh phản chiếu trên vách đá thật đẹp. Đi tiếp thôi." }
        ]
    },
    189: {
        minigame: 'frog_jump',
        preGame: [
            { character: 'monkey', text: "Phải nhảy qua những mỏm đá đầy rêu trơn trượt vắt ngang dòng thác này." },
            { character: 'monkey', text: "Gõ đúng nhịp để đôi chân chạm đất thật chuẩn xác, đừng để rơi xuống vực nước xoáy!" }
        ],
        postGame: [
            { character: 'monkey', text: "Thật thót tim! Nhưng chúng ta đã qua được phía bên kia an toàn." }
        ]
    },
    190: {
        minigame: 'collect_items',
        preGame: [
            { character: 'boss', text: "Ta sẽ dùng đuôi đập vỡ kho báu Tinh Thể Thác Bạc, các ngươi đừng mơ có được sức mạnh!" },
            { character: 'monkey', text: "Tinh thể đang rơi xuống! Nhanh tay nhặt hết chúng vào túi trước khi bị nước cuốn đi." }
        ],
        postGame: [
            { character: 'monkey', text: "Tinh thể lấp lánh đã nằm gọn trong túi. Năng lượng của chúng ta đã được nạp đầy!" }
        ]
    },
    191: {
        minigame: 'assemble_object',
        preGame: [
            { character: 'monkey', text: "Chiếc bè gỗ giúp vượt qua vách đá cuối cùng đã bị Cá Sấu phá hỏng." },
            { character: 'monkey', text: "Hãy gõ phím để ghép các bánh răng và thanh gỗ lại, khởi động chiếc bè nhé!" }
        ],
        postGame: [
            { character: 'monkey', text: "Bè gỗ đã ghép xong. Chúng ta cùng nhau vượt qua vách đá cuối cùng. Đỉnh Thác Bạc ở ngay phía trên chúng ta rồi." }
        ]
    },
    192: {
        minigame: 'clear_fog',
        preGame: [
            { character: 'boss', text: "Đã lên tận đây rồi sao? Làn sương băng giá này sẽ đóng băng các ngươi vĩnh viễn!" },
            { character: 'monkey', text: "Lạnh quá! Gõ phím thật mạnh để tạo luồng gió ấm thổi bay lớp sương băng này ngay!" }
        ],
        postGame: [
            { character: 'monkey', text: "Sương băng đã tan chảy. Hang ổ của Cá Sấu đã hiện ra rõ mồn một!" }
        ]
    },
    193: {
        minigame: 'bubble_shooter',
        preGame: [
            { character: 'monkey', text: "Hắn đang điên cuồng ném những khúc gỗ mục lớn từ trong hang ra cản đường." },
            { character: 'monkey', text: "Tuyệt đối không lùi bước! Ngắm chuẩn và bắn nát những khúc gỗ đó trên không trung!" }
        ],
        postGame: [
            { character: 'monkey', text: "Gỗ mục vỡ vụn thành từng mảnh. Cá Sấu đã hết trò để chống cự rồi!" }
        ]
    },
    194: {
        minigame: 'assemble_object',
        preGame: [
            { character: 'monkey', text: "Cá Sấu đang chờ sẵn. Chúng ta cần một vũ khí hoàn hảo cho trận quyết chiến ở Thác Bạc." },
            { character: 'monkey', text: "Hãy ráp những viên Tinh Thể Thác Bạc lại thành chiếc Trượng Ánh Bạc đầy quyền năng!" }
        ],
        postGame: [
            { character: 'monkey', text: "Trượng Ánh Bạc tỏa sáng rực rỡ, mang theo sức mạnh của dòng thác. Xông lên và đánh bại Cá Sấu thôi!" }
        ]
    },
    // Lesson 196 - 208 (Group: Núi rừng, Chapter 15:  'Chân núi', Boss: Hổ Hung Ác)
    196: {
        minigame: 'clear_fog',
        preGame: [
            { character: 'monkey', text: "Chúng ta đã đến vùng Chân Núi rồi! Nhưng sao sương mù lại dày đặc thế này?" },
            { character: 'boss', text: "Gừ... Kẻ nào to gan dám bước vào lãnh địa của Hổ Hung Ác?" },
            { character: 'monkey', text: "Gõ phím thật nhanh để tạo gió thổi tan sương mù, xem hắn đang ẩn nấp ở đâu!" }
        ],
        postGame: [
            { character: 'monkey', text: "Sương mù đã tan. Chân núi hiện ra vô cùng hiểm trở, chúng ta phải cẩn thận!" }
        ]
    },
    197: {
        minigame: 'rescue_animals',
        preGame: [
            { character: 'monkey', text: "Nguy rồi! Hổ Hung Ác đã nhốt bạn Hươu Sao vào một chiếc lồng bằng dây leo gai." },
            { character: 'monkey', text: "Hãy gõ đúng các từ để dùng phép thuật cắt đứt dây leo và giải cứu Hươu Sao ngay!" }
        ],
        postGame: [
            { character: 'monkey', text: "Hươu Sao đã được tự do. Tiếng gầm của Hổ Hung Ác đúng là đáng sợ thật!" }
        ]
    },
    198: {
        minigame: 'bubble_shooter',
        preGame: [
            { character: 'boss', text: "Nhận lấy những tảng đá mồ côi này đi! Ta sẽ nghiền nát các ngươi!" },
            { character: 'monkey', text: "Hắn ném đá từ trên dốc xuống! Ngắm bắn thật chuẩn để phá vỡ các tảng đá trước khi chúng văng trúng mình!" }
        ],
        postGame: [
            { character: 'monkey', text: "Đá đã vỡ vụn hết. Hổ Hung Ác thật hung hãn, nhưng chúng ta không bỏ cuộc đâu." }
        ]
    },
    199: {
        minigame: 'whack_mole',
        preGame: [
            { character: 'monkey', text: "Lũ rắn lục tay sai của Hổ đang trườn ra từ các kẽ đá để cắn lén chúng ta." },
            { character: 'monkey', text: "Nhanh tay lấy búa gõ trúng đầu chúng để đuổi lũ rắn chui tọt lại vào hang!" }
        ],
        postGame: [
            { character: 'monkey', text: "Bọn rắn lục đã sợ hãi bỏ chạy. Lối đi đã an toàn hơn rồi." }
        ]
    },
    200: {
        minigame: 'racing',
        preGame: [
            { character: 'monkey', text: "Hổ Hung Ác đang bỏ chạy lên sườn dốc. Nhảy lên xe và đuổi theo hắn!" },
            { character: 'monkey', text: "Gõ phím tăng tốc lướt qua những bụi rậm để đuổi kịp hắn nào!" }
        ],
        postGame: [
            { character: 'monkey', text: "Chiếc xe chạy nhanh như gió. Khoảng cách với Hổ Hung Ác đang hẹp dần." }
        ]
    },
    201: {
        minigame: 'grow_plant',
        preGame: [
            { character: 'monkey', text: "Một vách đá cao dựng đứng cản đường. Chúng ta không thể trèo tay không được." },
            { character: 'monkey', text: "Hãy gieo hạt cây, gõ đúng để cây mọc cao lên làm thang leo!" }
        ],
        postGame: [
            { character: 'monkey', text: "Thang cây vô cùng chắc chắn. Cùng bám vào và trèo lên vách đá thôi." }
        ]
    },
    202: {
        minigame: 'catch_insects',
        preGame: [
            { character: 'monkey', text: "Đường đi dẫn qua một hang động đá tối om và lạnh lẽo." },
            { character: 'monkey', text: "Dùng vợt bắt những bạn đom đóm núi đang bay lượn để thắp sáng cho cả đoàn nhé." }
        ],
        postGame: [
            { character: 'monkey', text: "Ánh sáng đom đóm rực rỡ quá. Hang động đá không còn đáng sợ nữa." }
        ]
    },
    203: {
        minigame: 'frog_jump',
        preGame: [
            { character: 'monkey', text: "Dưới chân là một khe suối cạn đầy những tảng đá nhọn hoắt." },
            { character: 'monkey', text: "Gõ đúng nhịp để nhảy thật khéo qua các tảng đá bằng phẳng, cẩn thận kẻo trượt chân!" }
        ],
        postGame: [
            { character: 'monkey', text: "Bước nhảy thật chính xác! Chúng ta đã an toàn băng qua khe suối cạn." }
        ]
    },
    204: {
        minigame: 'collect_items',
        preGame: [
            { character: 'boss', text: "Cây Đào Tiên nghìn năm này là của ta, các ngươi đừng hòng nếm thử!" },
            { character: 'monkey', text: "Đào Tiên chứa sức mạnh núi rừng! Nhanh tay nhặt hết những quả đào rơi xuống túi của chúng ta." }
        ],
        postGame: [
            { character: 'monkey', text: "Hái được rất nhiều Đào Tiên rồi. Thể lực của chúng ta đã hoàn toàn sung mãn!" }
        ]
    },
    205: {
        minigame: 'assemble_object',
        preGame: [
            { character: 'monkey', text: "Chiếc xe ô tô tải của bác Gấu Chó bị Hổ Hung Ác dẫm nát tươm rồi." },
            { character: 'monkey', text: "Hãy gõ phím ráp các thanh kim loại và bánh xe lại để sửa chiếc xe giúp bác ấy vận chuyển đồ nhé." }
        ],
        postGame: [
            { character: 'monkey', text: "Xe ô tô tải đã được sửa xong. Bác Gấu Chó rất cảm kích và chỉ đường cho chúng ta." }
        ]
    },
    206: {
        minigame: 'clear_fog',
        preGame: [
            { character: 'boss', text: "Gừ gừ! Tiếng gầm của ta sẽ tạo ra bão cát chôn vùi các ngươi tại Chân Núi này!" },
            { character: 'monkey', text: "Gió cát mịt mù quá! Gõ phím tạo cuồng phong đẩy lùi bão cát của hắn lại ngay!" }
        ],
        postGame: [
            { character: 'monkey', text: "Bão cát đã bị dập tắt. Hổ Hung Ác không còn nơi lẩn trốn, sào huyệt của hắn ở ngay kia!" }
        ]
    },
    207: {
        minigame: 'bubble_shooter',
        preGame: [
            { character: 'monkey', text: "Hắn đang lăn những khúc gỗ bọc gai nhọn từ trên cửa hang xuống cản đường." },
            { character: 'monkey', text: "Tuyệt đối không lùi bước! Ngắm chuẩn và bắn nát các khúc gỗ gai đó ngay giữa không trung!" }
        ],
        postGame: [
            { character: 'monkey', text: "Gỗ gai vỡ vụn thành cát bụi. Đòn tấn công của Hổ đã hoàn toàn bị hóa giải." }
        ]
    },
    208: {
        minigame: 'assemble_object',
        preGame: [
            { character: 'monkey', text: "Hổ Hung Ác đang gầm gừ chờ sẵn phía trước. Chúng ta cần lớp giáp mạnh nhất." },
            { character: 'monkey', text: "Hãy ráp những khối đá magma núi lửa lại thành chiếc Khiên Đá Tảng kiên cố!" }
        ],
        postGame: [
            { character: 'monkey', text: "Khiên Đá Tảng nóng rực sức mạnh! Tiến lên và cho Hổ Hung Ác biết tay thôi!" }
        ]
    },
    // Lesson 210 - 222 (Group: Núi rừng, Chapter 16:  'Đá lăn', Boss: Hổ Hung Ác)
    210: {
        minigame: 'clear_fog',
        preGame: [
            { character: 'monkey', text: "Chúng ta đã tiến vào khu vực Đá Lăn! Cẩn thận, bụi đá bay mù mịt quá không thấy đường." },
            { character: 'boss', text: "Gầm! Những tảng đá khổng lồ ở đây sẽ nghiền nát các ngươi!" },
            { character: 'monkey', text: "Đừng sợ hãi! Gõ phím tạo gió thổi bay lớp bụi mù này để tìm lối đi an toàn nào!" }
        ],
        postGame: [
            { character: 'monkey', text: "Bụi đã tan. Chú ý các tảng đá phía trên, chúng ta phải di chuyển thật khéo léo." }
        ]
    },
    211: {
        minigame: 'rescue_animals',
        preGame: [
            { character: 'monkey', text: "Ôi không! Bạn Sơn Dương đang bị kẹt dưới một tảng đá nhỏ lăn xuống từ vách núi." },
            { character: 'monkey', text: "Hãy gõ thật chính xác để hợp sức đẩy tảng đá ra và giải cứu bạn ấy!" }
        ],
        postGame: [
            { character: 'monkey', text: "Sơn Dương đã thoát nạn và nhảy tót lên vách núi an toàn. Tuyệt vời!" }
        ]
    },
    212: {
        minigame: 'bubble_shooter',
        preGame: [
            { character: 'boss', text: "Nhận lấy cơn mưa đá lăn này đi! Bỏ mạng tại đây thôi!" },
            { character: 'monkey', text: "Nguy hiểm quá! Ngắm bắn vỡ những tảng đá đang lăn xuống trước khi chúng đè trúng chúng ta!" }
        ],
        postGame: [
            { character: 'monkey', text: "Các tảng đá đã vỡ vụn thành sỏi nhỏ. Phản xạ của bạn rất tốt!" }
        ]
    },
    213: {
        minigame: 'whack_mole',
        preGame: [
            { character: 'monkey', text: "Hổ Hung Ác sai bầy chuột chũi chui lên từ kẽ nứt cắn đứt dây thừng leo núi kìa." },
            { character: 'monkey', text: "Cầm búa lên, gõ trúng đích để đuổi bầy chuột chui tọt lại xuống hang!" }
        ],
        postGame: [
            { character: 'monkey', text: "Bầy chuột đã chạy mất tăm, dây thừng leo núi vẫn an toàn để sử dụng." }
        ]
    },
    214: {
        minigame: 'racing',
        preGame: [
            { character: 'monkey', text: "Hổ Hung Ác đang nhảy qua các mỏm đá để tẩu thoát lên cao." },
            { character: 'monkey', text: "Cùng cưỡi lên lưng Đại Bàng và đua tốc độ đuổi theo hắn trên không trung nào!" }
        ],
        postGame: [
            { character: 'monkey', text: "Đại bàng vỗ cánh bay thật nhanh, chúng ta không để mất dấu hắn đâu." }
        ]
    },
    215: {
        minigame: 'grow_plant',
        preGame: [
            { character: 'monkey', text: "Một hẻm vực quá rộng cản đường, chúng ta không thể nhảy qua được." },
            { character: 'monkey', text: "Hãy gieo hạt giống cây cổ thu, gõ đúng để cây mọc lên làm cầu vắt ngang vực!" }
        ],
        postGame: [
            { character: 'monkey', text: "Cây cầu vô cùng chắc chắn. Bước qua cẩn thận nhé." }
        ]
    },
    216: {
        minigame: 'catch_insects',
        preGame: [
            { character: 'monkey', text: "Tiếng gầm của Hổ làm đàn bướm đêm hoảng loạn bay toán loạn trong hang đá." },
            { character: 'monkey', text: "Dùng vợt lùa các bạn ấy vào lưới an toàn để tránh bị đá rơi trúng nhé." }
        ],
        postGame: [
            { character: 'monkey', text: "Đàn bướm đêm đã an toàn nằm trong lưới. Chúng ta tiếp tục lên đường thôi." }
        ]
    },
    217: {
        minigame: 'frog_jump',
        preGame: [
            { character: 'monkey', text: "Phía trước là một bãi đá bập bênh, một bước sẩy chân là rơi thẳng xuống vực sâu." },
            { character: 'monkey', text: "Gõ đúng nhịp để nhảy thật chuẩn qua từng phiến đá vững chắc nhất, đừng mất thăng bằng!" }
        ],
        postGame: [
            { character: 'monkey', text: "Thật thót tim! Nhưng đôi chân khéo léo đã giúp chúng ta qua bãi đá bập bênh an toàn." }
        ]
    },
    218: {
        minigame: 'collect_items',
        preGame: [
            { character: 'boss', text: "Ta sẽ hất tung đống tinh thể thạch anh này xuống vực, các ngươi đừng hòng lấy được!" },
            { character: 'monkey', text: "Tinh thể thạch anh chứa năng lượng núi đá! Gõ nhanh để nhặt chúng vào giỏ trước khi rơi mất." }
        ],
        postGame: [
            { character: 'monkey', text: "Đã thu thập đủ tinh thể rồi. Sức mạnh của chúng ta càng thêm vững vàng." }
        ]
    },
    219: {
        minigame: 'assemble_object',
        preGame: [
            { character: 'monkey', text: "Lũ đá lăn đã đập vỡ hệ thống ròng rọc cáp treo của bác Khỉ Đột rồi." },
            { character: 'monkey', text: "Hãy gõ phím ráp các bánh răng và thanh gỗ lại để sửa ròng rọc đu sang vách núi bên kia!" }
        ],
        postGame: [
            { character: 'monkey', text: "Hệ thống cáp treo đã hoạt động trơn tru. Bám chắc tay, chúng ta đu sang thôi!" }
        ]
    },
    220: {
        minigame: 'clear_fog',
        preGame: [
            { character: 'boss', text: "Gầm! Cuộc chơi kết thúc tại đây! Cơn bão cát mù mịt này sẽ là mồ chôn của các ngươi!" },
            { character: 'monkey', text: "Cát thổi rát quá! Gõ thật nhanh tạo lốc xoáy thổi ngược bão cát về phía hắn!" }
        ],
        postGame: [
            { character: 'monkey', text: "Bão cát đã tan. Sào huyệt Đá Lăn của Hổ Hung Ác nằm ngay đằng sau tảng đá lớn kia!" }
        ]
    },
    221: {
        minigame: 'bubble_shooter',
        preGame: [
            { character: 'monkey', text: "Hắn đang điên cuồng đẩy những tảng đá khổng lồ bọc gai nhọn xuống dốc!" },
            { character: 'monkey', text: "Tập trung cao độ! Ngắm bắn vỡ vụn tất cả những tảng đá gai đó để mở đường tiến lên!" }
        ],
        postGame: [
            { character: 'monkey', text: "Đá gai đã bị phá hủy hoàn toàn. Hắn không còn chướng ngại vật nào để ném nữa!" }
        ]
    },
    222: {
        minigame: 'assemble_object',
        preGame: [
            { character: 'monkey', text: "Hổ Hung Ác đã bị dồn vào đường cùng. Trận chiến quyết định sắp bắt đầu, ta cần lớp phòng ngự tốt nhất!" },
            { character: 'monkey', text: "Hãy ghép những phiến đá kim cương rực rỡ lại thành chiếc Khiên Kim Cương bất hoại!" }
        ],
        postGame: [
            { character: 'monkey', text: "Khiên Kim Cương chói lóa và không thể phá vỡ! Tiến lên hạ gục Hổ Hung Ác thôi!" }
        ]
    },
    // Lesson 224 - 236 (Group: Núi rừng, Chapter 17:  'Rừng thông', Boss: Hổ Hung Ác)
    224: {
        minigame: 'clear_fog',
        preGame: [
            { character: 'monkey', text: "Chúng ta đã tiến sâu vào Rừng Thông. Nhựa thông bay mờ mịt quá, cẩn thận kẻo cay mắt!" },
            { character: 'boss', text: "Gào! Mê cung Rừng Thông này sẽ khiến các ngươi đi lạc mãi mãi!" },
            { character: 'monkey', text: "Đừng lo! Hãy gõ phím tạo gió để thổi bay lớp sương mù nhựa thông này đi!" }
        ],
        postGame: [
            { character: 'monkey', text: "Sương mù đã tan. Không khí Rừng Thông lại trong lành, mau tiến lên!" }
        ]
    },
    225: {
        minigame: 'rescue_animals',
        preGame: [
            { character: 'monkey', text: "Trời ơi! Bạn Sóc Nâu bị Hổ Hung Ác dùng nhựa thông siêu dính bẫy chặt vào gốc cây rồi." },
            { character: 'monkey', text: "Gõ thật chính xác để làm tan chảy lớp nhựa và giải cứu bạn Sóc ra ngoài nhé!" }
        ],
        postGame: [
            { character: 'monkey', text: "Sóc Nâu đã tung tăng trèo lên cành cây an toàn. Tiếng gầm của Hổ lại vang lên kìa!" }
        ]
    },
    226: {
        minigame: 'bubble_shooter',
        preGame: [
            { character: 'boss', text: "Nếm thử cơn mưa quả thông đầy gai nhọn của ta đây!" },
            { character: 'monkey', text: "Nguy hiểm! Hắn ném quả thông từ trên đồi xuống. Ngắm bắn vỡ chúng ngay lập tức!" }
        ],
        postGame: [
            { character: 'monkey', text: "Những quả thông đã vỡ nát. Chúng ta không dễ bị bắt nạt đâu!" }
        ]
    },
    227: {
        minigame: 'whack_mole',
        preGame: [
            { character: 'monkey', text: "Hổ Hung Ác đang xúi giục bầy chuột chũi đào bới phá hỏng rễ các cây thông cổ thụ." },
            { character: 'monkey', text: "Cầm búa lên, gõ trúng đầu lũ chuột chũi để đuổi chúng đi bảo vệ khu rừng nhé!" }
        ],
        postGame: [
            { character: 'monkey', text: "Bầy chuột chũi đã bỏ chạy tán loạn. Rễ cây thông đã được bảo vệ vững chắc." }
        ]
    },
    228: {
        minigame: 'racing',
        preGame: [
            { character: 'monkey', text: "Hổ Hung Ác đang tháo chạy qua những thân cây thông đổ gãy." },
            { character: 'monkey', text: "Cùng leo lên lưng bạn Nai Sừng Tấm và đua tốc độ đuổi theo hắn thật nhanh nào!" }
        ],
        postGame: [
            { character: 'monkey', text: "Nai Sừng Tấm chạy thoăn thoắt! Khoảng cách với Hổ Hung Ác đang được rút ngắn." }
        ]
    },
    229: {
        minigame: 'grow_plant',
        preGame: [
            { character: 'monkey', text: "Một dòng suối cạn cắt ngang khu rừng. Chúng ta cần một lối đi." },
            { character: 'monkey', text: "Hãy gieo hạt giống, gõ đúng để một mầm cây vươn dài thành thân cây làm cầu vắt ngang." }
        ],
        postGame: [
            { character: 'monkey', text: "Thân cây vô cùng vững chãi. Cùng bước qua cầu thật cẩn thận nhé." }
        ]
    },
    230: {
        minigame: 'catch_insects',
        preGame: [
            { character: 'monkey', text: "Càng vào sâu, tán lá thông càng che khuất ánh sáng mặt trời." },
            { character: 'monkey', text: "Dùng vợt bắt những bạn bọ cánh cứng phát sáng vào lọ để soi đường cho cả đoàn." }
        ],
        postGame: [
            { character: 'monkey', text: "Lọ bọ cánh cứng sáng rực rỡ! Rừng Thông đã không còn u tối nữa." }
        ]
    },
    231: {
        minigame: 'frog_jump',
        preGame: [
            { character: 'monkey', text: "Dưới đất đầy những vũng nhựa thông siêu dính. Dẫm vào là không rút chân ra được đâu!" },
            { character: 'monkey', text: "Gõ đúng nhịp để nhảy thật khéo léo qua các tảng đá khô ráo, đừng để bị dính nhựa!" }
        ],
        postGame: [
            { character: 'monkey', text: "Thật nhịp nhàng! Chúng ta đã an toàn vượt qua bãi nhựa thông nguy hiểm." }
        ]
    },
    232: {
        minigame: 'collect_items',
        preGame: [
            { character: 'boss', text: "Quả hạt dẻ này là nguồn sức mạnh của ta, các ngươi đừng mơ có được!" },
            { character: 'monkey', text: "Quả hạt dẻ chứa năng lượng rất lớn. Nhanh tay thu thập chúng vào giỏ trước khi Hổ cướp lại." }
        ],
        postGame: [
            { character: 'monkey', text: "Giỏ đã đầy quả hạt dẻ. Thể lực của chúng ta đang tràn trề!" }
        ]
    },
    233: {
        minigame: 'assemble_object',
        preGame: [
            { character: 'monkey', text: "Chiếc xe cút kít chở nấm của bác Nhím bị Hổ đập vỡ bánh xe rồi." },
            { character: 'monkey', text: "Hãy gõ phím ráp các mảnh gỗ thông lại để sửa chiếc xe giúp bác ấy vận chuyển đồ nhé." }
        ],
        postGame: [
            { character: 'monkey', text: "Xe cút kít đã chạy bon bon trở lại. Bác Nhím chỉ cho chúng ta đường tắt để đuổi theo Hổ." }
        ]
    },
    234: {
        minigame: 'clear_fog',
        preGame: [
            { character: 'boss', text: "Gầm! Làn sương mù băng giá này sẽ phong ấn các ngươi vĩnh viễn trong Rừng Thông!" },
            { character: 'monkey', text: "Gió lạnh quá! Gõ thật nhanh để tạo ra luồng khí ấm thổi bay màn sương băng giá này ngay!" }
        ],
        postGame: [
            { character: 'monkey', text: "Sương băng đã tan chảy. Sào huyệt của Hổ Hung Ác nằm ngay sau vách đá phía trước!" }
        ]
    },
    235: {
        minigame: 'bubble_shooter',
        preGame: [
            { character: 'monkey', text: "Hắn đang điên cuồng hất những thân cây thông khổng lồ từ trên vách đá xuống." },
            { character: 'monkey', text: "Ngắm chuẩn và bắn nát những thân cây đó giữa không trung để bảo vệ mọi người!" }
        ],
        postGame: [
            { character: 'monkey', text: "Thân cây vỡ vụn thành củi khô. Hắn đã cạn kiệt chiêu trò rồi!" }
        ]
    },
    236: {
        minigame: 'assemble_object',
        preGame: [
            { character: 'monkey', text: "Hổ Hung Ác đang gầm gừ chờ sẵn. Chúng ta cần lớp phòng thủ cứng cáp nhất." },
            { character: 'monkey', text: "Hãy ráp những mảnh vỏ thông ngàn năm lại thành chiếc Khiên Thông Đỏ kiên cố!" }
        ],
        postGame: [
            { character: 'monkey', text: "Khiên Thông Đỏ vô cùng vững chắc! Cầm lấy nó và tiến lên hạ gục Hổ Hung Ác thôi!" }
        ]
    },
    // Lesson 238 - 250 (Group: Núi rừng, Chapter 18:  'Hươu sao', Boss: Hổ Hung Ác)
    238: {
        minigame: 'clear_fog',
        preGame: [
            { character: 'monkey', text: "Chúng ta đã đến Thung lũng Hươu Sao. Nhưng sương mù che kín cả thung lũng rồi!" },
            { character: 'boss', text: "Gào! Chỗ này là bãi săn của ta, không ai được cứu lũ hươu nhãi nhép này!" },
            { character: 'monkey', text: "Hãy gõ phím tạo cuồng phong thổi bay sương mù để tìm đàn Hươu Sao nào!" }
        ],
        postGame: [
            { character: 'monkey', text: "Sương mù đã tan. Đàn Hươu Sao đang hoảng loạn, chúng ta phải giúp họ!" }
        ]
    },
    239: {
        minigame: 'rescue_animals',
        preGame: [
            { character: 'monkey', text: "Nguy hiểm! Hổ Hung Ác đã lén giăng bẫy lưới tóm được một chú Hươu Con." },
            { character: 'monkey', text: "Nhanh tay gõ phím thật chính xác để cắt đứt lưới và giải cứu Hươu Con!" }
        ],
        postGame: [
            { character: 'monkey', text: "Hươu Con đã chạy về với mẹ. Hổ Hung Ác đúng là kẻ vô cùng độc ác." }
        ]
    },
    240: {
        minigame: 'bubble_shooter',
        preGame: [
            { character: 'boss', text: "Đừng hòng cản đường ta! Nhận lấy những tảng đá gai này đi!" },
            { character: 'monkey', text: "Hắn đang ném đá gai từ trên vách núi xuống! Bắn vỡ chúng để bảo vệ đàn hươu!" }
        ],
        postGame: [
            { character: 'monkey', text: "Đá gai đã vỡ vụn. Đàn Hươu Sao vẫn an toàn dưới sự bảo vệ của chúng ta." }
        ]
    },
    241: {
        minigame: 'whack_mole',
        preGame: [
            { character: 'monkey', text: "Hổ xua lũ chuột chũi lên cắn nát bãi cỏ non, nguồn thức ăn của bầy hươu." },
            { character: 'monkey', text: "Cầm búa lên và gõ trúng đầu lũ chuột chũi để đuổi chúng đi, giữ lại bãi cỏ nhé!" }
        ],
        postGame: [
            { character: 'monkey', text: "Lũ chuột chũi đã sợ hãi bỏ chạy. Bãi cỏ non vẫn xanh mướt cho bầy hươu." }
        ]
    },
    242: {
        minigame: 'racing',
        preGame: [
            { character: 'monkey', text: "Hổ Hung Ác đang bỏ chạy về phía đỉnh núi. Cùng cưỡi lên lưng Hươu Đầu Đàn thôi!" },
            { character: 'monkey', text: "Gõ phím tăng tốc lướt qua những kẽ đá để đuổi kịp hắn nào!" }
        ],
        postGame: [
            { character: 'monkey', text: "Hươu Đầu Đàn phi nước đại thật nhanh! Hắn không thoát được đâu." }
        ]
    },
    243: {
        minigame: 'grow_plant',
        preGame: [
            { character: 'monkey', text: "Một mỏm đá bị sạt lở tạo thành vực sâu. Chúng ta không thể qua được." },
            { character: 'monkey', text: "Hãy gieo hạt giống cây cổ thụ, gõ đúng để cây vươn cành làm chiếc cầu bắc ngang vực!" }
        ],
        postGame: [
            { character: 'monkey', text: "Cành cổ thụ vô cùng vững chắc. Cùng bước qua cầu thật cẩn thận nhé." }
        ]
    },
    244: {
        minigame: 'catch_insects',
        preGame: [
            { character: 'monkey', text: "Đường lên đỉnh núi bị sương mù che khuất ánh sáng, rất khó đi." },
            { character: 'monkey', text: "Dùng vợt bắt những bạn bướm dạ quang vào lọ để soi sáng con đường phía trước." }
        ],
        postGame: [
            { character: 'monkey', text: "Ánh sáng dạ quang dịu nhẹ đã thắp sáng con đường. Đi tiếp thôi." }
        ]
    },
    245: {
        minigame: 'frog_jump',
        preGame: [
            { character: 'monkey', text: "Dưới chân là bãi đá nhọn lởm chởm. Chỉ có vài tảng đá bằng phẳng có thể giẫm lên." },
            { character: 'monkey', text: "Gõ đúng nhịp để nhảy thật khéo qua các tảng đá bằng, đừng để trượt chân nhé!" }
        ],
        postGame: [
            { character: 'monkey', text: "Tuyệt vời! Những bước nhảy rất linh hoạt. Chúng ta đã qua bãi đá nhọn." }
        ]
    },
    246: {
        minigame: 'collect_items',
        preGame: [
            { character: 'boss', text: "Thảo dược ngàn năm trên núi này là của ta, các ngươi đừng mong đụng tới!" },
            { character: 'monkey', text: "Thảo dược chứa sức mạnh chữa lành. Nhanh tay thu thập chúng vào giỏ trước khi Hổ cướp đi." }
        ],
        postGame: [
            { character: 'monkey', text: "Giỏ đã đầy thảo dược quý. Năng lượng của chúng ta lại tràn trề!" }
        ]
    },
    247: {
        minigame: 'assemble_object',
        preGame: [
            { character: 'monkey', text: "Hàng rào gỗ bảo vệ khu ẩn náu của đàn Hươu đã bị Hổ phá hỏng." },
            { character: 'monkey', text: "Hãy gõ phím ráp các khúc gỗ lại để dựng một hàng rào mới kiên cố hơn giúp bầy hươu." }
        ],
        postGame: [
            { character: 'monkey', text: "Hàng rào đã được sửa xong. Đàn hươu đã có thể yên tâm nghỉ ngơi." }
        ]
    },
    248: {
        minigame: 'clear_fog',
        preGame: [
            { character: 'boss', text: "Gào! Chướng khí núi lửa này sẽ thiêu rụi ý chí của các ngươi!" },
            { character: 'monkey', text: "Nóng quá! Gõ thật nhanh để tạo ra luồng gió mát thổi bay màn chướng khí này ngay!" }
        ],
        postGame: [
            { character: 'monkey', text: "Chướng khí đã tan. Sào huyệt của Hổ Hung Ác nằm ngay đằng sau vách đá này!" }
        ]
    },
    249: {
        minigame: 'bubble_shooter',
        preGame: [
            { character: 'monkey', text: "Hắn đang điên cuồng đẩy những tảng đá khổng lồ đang bốc cháy xuống dốc!" },
            { character: 'monkey', text: "Tập trung cao độ! Ngắm bắn vỡ vụn tất cả những tảng đá lửa đó để mở đường!" }
        ],
        postGame: [
            { character: 'monkey', text: "Đá lửa đã bị phá hủy hoàn toàn. Hắn đã cùng đường rồi!" }
        ]
    },
    250: {
        minigame: 'assemble_object',
        preGame: [
            { character: 'monkey', text: "Hổ Hung Ác đang gầm gừ chờ sẵn. Đàn Hươu Sao đã tặng chúng ta những chiếc sừng gạc cứng nhất." },
            { character: 'monkey', text: "Hãy ráp chúng lại thành chiếc Khiên Gạc Hươu để chuẩn bị đòn quyết định!" }
        ],
        postGame: [
            { character: 'monkey', text: "Khiên Gạc Hươu vô cùng vững chắc! Cầm lấy vũ khí và tiến lên hạ gục Hổ Hung Ác thôi!" }
        ]
    },
    // Lesson 252 - 264 (Group: Núi rừng, Chapter 19:  'Đại bàng', Boss: Hổ Hung Ác)
    252: {
        minigame: 'clear_fog',
        preGame: [
            { character: 'monkey', text: "Chúng ta đã lên đến Đỉnh Đại Bàng. Mây mù dày đặc quá, cẩn thận trượt chân!" },
            { character: 'boss', text: "Gào! Chỗ này cao thật, nhưng trứng đại bàng chắc chắn rất ngon!" },
            { character: 'monkey', text: "Đừng hòng làm hại các bạn ấy! Gõ phím tạo cuồng phong thổi tan mây mù ngay!" }
        ],
        postGame: [
            { character: 'monkey', text: "Mây mù đã tan. Phong cảnh trên này thật hùng vĩ, nhưng Hổ Hung Ác đang ở rất gần!" }
        ]
    },
    253: {
        minigame: 'rescue_animals',
        preGame: [
            { character: 'monkey', text: "Trời ơi! Hổ Hung Ác đã dùng dây leo trói bạn Đại Bàng Con vào mỏm đá kìa." },
            { character: 'monkey', text: "Gõ thật nhanh để cắt đứt dây leo và cứu bạn ấy trước khi Hổ quay lại nhé!" }
        ],
        postGame: [
            { character: 'monkey', text: "Đại Bàng Con đã an toàn bay vút lên trời. Tiếng gầm của Hổ lại vang lên!" }
        ]
    },
    254: {
        minigame: 'bubble_shooter',
        preGame: [
            { character: 'boss', text: "Đừng cản đường ta! Nhận lấy những quả cầu bùn đất nhão nhoét này đi!" },
            { character: 'monkey', text: "Hắn ném bùn lên không trung! Bắn vỡ chúng ngay để bảo vệ bộ lông sạch sẽ của chúng ta!" }
        ],
        postGame: [
            { character: 'monkey', text: "Những quả cầu bùn đã vỡ tung. Chúng ta không dễ bị bôi bẩn đâu!" }
        ]
    },
    255: {
        minigame: 'whack_mole',
        preGame: [
            { character: 'monkey', text: "Hổ xua lũ rắn núi trườn ra từ các kẽ nứt định trộm trứng đại bàng." },
            { character: 'monkey', text: "Nhanh tay cầm búa, gõ trúng đầu lũ rắn để đuổi chúng đi, bảo vệ tổ trứng nhé!" }
        ],
        postGame: [
            { character: 'monkey', text: "Lũ rắn đã sợ hãi chui tọt vào hang. Những quả trứng vẫn an toàn tuyệt đối." }
        ]
    },
    256: {
        minigame: 'racing',
        preGame: [
            { character: 'monkey', text: "Hổ Hung Ác đang bỏ chạy nhảy qua các đỉnh núi. Cùng cưỡi lên lưng Đại Bàng Mẹ đuổi theo!" },
            { character: 'monkey', text: "Gõ phím để tăng tốc độ bay, lướt qua những đám mây và tóm gọn hắn nào!" }
        ],
        postGame: [
            { character: 'monkey', text: "Đại Bàng bay nhanh như chớp! Hắn không thể thoát khỏi tầm mắt chúng ta." }
        ]
    },
    257: {
        minigame: 'grow_plant',
        preGame: [
            { character: 'monkey', text: "Khoảng cách giữa hai vách đá xa quá. Chúng ta không thể bay qua được." },
            { character: 'monkey', text: "Hãy gieo hạt giống gió, gõ phím để một cây cổ thụ mọc vươn cành làm cầu nối nhé!" }
        ],
        postGame: [
            { character: 'monkey', text: "Cành cổ thụ vô cùng vững chãi. Cùng bước qua cây cầu tự nhiên này cẩn thận nào." }
        ]
    },
    258: {
        minigame: 'catch_insects',
        preGame: [
            { character: 'monkey', text: "Hang động xuyên núi này tối quá. Chúng ta cần một chút ánh sáng." },
            { character: 'monkey', text: "Dùng vợt bắt những chú đom đóm núi khổng lồ vào lọ để soi đường cho cả đoàn." }
        ],
        postGame: [
            { character: 'monkey', text: "Lọ đom đóm rực rỡ quá! Hang tối đã không còn đáng sợ nữa." }
        ]
    },
    259: {
        minigame: 'frog_jump',
        preGame: [
            { character: 'monkey', text: "Phía trước là những đám mây lơ lửng và các mỏm đá chông chênh." },
            { character: 'monkey', text: "Gõ đúng nhịp để nhảy thật khéo qua các đám mây cứng cáp, đừng để bước hụt nhé!" }
        ],
        postGame: [
            { character: 'monkey', text: "Thật nhịp nhàng! Chúng ta đã an toàn vượt qua bãi mây đá nguy hiểm." }
        ]
    },
    260: {
        minigame: 'collect_items',
        preGame: [
            { character: 'boss', text: "Ta sẽ thổi bay đống Lông Vũ Vàng này, các ngươi đừng hòng lấy được sức mạnh!" },
            { character: 'monkey', text: "Lông Vũ Vàng của Đại Bàng Chúa! Nhanh tay thu thập chúng vào túi trước khi bị gió cuốn đi." }
        ],
        postGame: [
            { character: 'monkey', text: "Đã thu thập đủ Lông Vũ Vàng. Thể lực và tốc độ của chúng ta đã tăng lên rất nhiều!" }
        ]
    },
    261: {
        minigame: 'assemble_object',
        preGame: [
            { character: 'monkey', text: "Tổ của Đại Bàng Chúa bị Hổ Hung Ác cào rách một mảng lớn rồi." },
            { character: 'monkey', text: "Hãy gõ phím ráp các cành cây khô lại để vá tổ thật kiên cố giúp bác ấy nhé." }
        ],
        postGame: [
            { character: 'monkey', text: "Tổ Đại Bàng đã vững chắc như cũ. Bác Đại Bàng Chúa vô cùng cảm kích." }
        ]
    },
    262: {
        minigame: 'clear_fog',
        preGame: [
            { character: 'boss', text: "Gầm! Cơn lốc xoáy đen tối này sẽ cuốn các ngươi xuống vực sâu vĩnh viễn!" },
            { character: 'monkey', text: "Gió giật mạnh quá! Gõ thật nhanh tạo cuồng phong ngược chiều để phá tan lốc xoáy ngay!" }
        ],
        postGame: [
            { character: 'monkey', text: "Lốc xoáy đen đã tan biến. Sào huyệt cuối cùng của Hổ Hung Ác nằm trên mỏm đá kia rồi!" }
        ]
    },
    263: {
        minigame: 'bubble_shooter',
        preGame: [
            { character: 'monkey', text: "Hắn đang điên cuồng ném những tảng đá nhọn khổng lồ từ trên cao xuống." },
            { character: 'monkey', text: "Ngắm chuẩn và bắn nát những tảng đá đó giữa không trung để dọn đường tiến lên!" }
        ],
        postGame: [
            { character: 'monkey', text: "Đá nhọn vỡ vụn thành sỏi. Hắn đã cạn kiệt chiêu trò phòng thủ rồi!" }
        ]
    },
    264: {
        minigame: 'assemble_object',
        preGame: [
            { character: 'monkey', text: "Hổ Hung Ác đang gầm gừ chờ sẵn phía trước. Chúng ta cần lớp phòng thủ siêu nhẹ và cứng cáp." },
            { character: 'monkey', text: "Hãy ráp những chiếc Lông Vũ Vàng lại thành chiếc Khiên Bão Tố rực rỡ!" }
        ],
        postGame: [
            { character: 'monkey', text: "Khiên Bão Tố đã sẵn sàng! Cầm lấy nó, tiến lên và dạy cho Hổ Hung Ác một bài học nhớ đời thôi!" }
        ]
    },
    // Lesson 266 - 278 (Group: Núi rừng, Chapter 20:  'Mây trắng', Boss: Hổ Hung Ác)
    266: {
        minigame: 'clear_fog',
        preGame: [
            { character: 'monkey', text: "Chúng ta đã lên đến đỉnh Mây Trắng rồi! Nhưng mây mù dày đặc quá, không thấy lối đi!" },
            { character: 'boss', text: "Gầm! Nơi này cao vòi vọi, bước hụt một cái là các ngươi rơi xuống đáy vực ngay!" },
            { character: 'monkey', text: "Đừng sợ hãi! Hãy gõ phím tạo luồng gió mạnh thổi tan đám mây mù này để tìm đường!" }
        ],
        postGame: [
            { character: 'monkey', text: "Mây mù đã dạt sang một bên. Chú ý từng bước chân trên các tảng đá mây nhé, tiến lên nào!" }
        ]
    },
    267: {
        minigame: 'rescue_animals',
        preGame: [
            { character: 'monkey', text: "Nghe có tiếng kêu cứu! Hổ Hung Ác đã nhốt bạn chim Sơn Ca vào một chiếc lồng sấm sét." },
            { character: 'monkey', text: "Nhanh tay gõ phím thật chuẩn xác để đập tan chiếc lồng và giải cứu Sơn Ca ra ngoài!" }
        ],
        postGame: [
            { character: 'monkey', text: "Sơn Ca đã cất tiếng hót tự do và bay vút lên cao. Hổ Hung Ác đúng là tàn nhẫn!" }
        ]
    },
    268: {
        minigame: 'bubble_shooter',
        preGame: [
            { character: 'boss', text: "Nếm thử sức mạnh của ta đây! Nhận lấy những quả cầu sấm sét này!" },
            { character: 'monkey', text: "Hắn đang ném cầu sấm sét từ trên mỏm đá! Ngắm bắn vỡ chúng ngay trước khi chúng phát nổ!" }
        ],
        postGame: [
            { character: 'monkey', text: "Tuyệt quá, các quả cầu sấm sét đã nát vụn thành tia lửa nhỏ. Phản xạ của bạn rất tuyệt." }
        ]
    },
    269: {
        minigame: 'whack_mole',
        preGame: [
            { character: 'monkey', text: "Lũ rắn tay sai của Hổ đang lén lút chui ra từ các hốc mây định cắn đứt dây leo của chúng ta." },
            { character: 'monkey', text: "Cầm búa lên, gõ trúng đầu lũ rắn để đuổi chúng bay đi nơi khác ngay lập tức!" }
        ],
        postGame: [
            { character: 'monkey', text: "Lũ rắn đã hoảng sợ bay tán loạn. Dây leo bảo hộ vẫn an toàn để chúng ta leo tiếp." }
        ]
    },
    270: {
        minigame: 'racing',
        preGame: [
            { character: 'monkey', text: "Hổ Hung Ác đang nhảy qua các đám mây để bỏ trốn. Cùng nhờ bạn Sếu Đầu Đỏ chở đuổi theo thôi!" },
            { character: 'monkey', text: "Gõ phím tăng tốc độ vỗ cánh, lướt qua những tầng mây trắng để bắt kịp hắn nào!" }
        ],
        postGame: [
            { character: 'monkey', text: "Sếu Đầu Đỏ bay nhanh như gió! Chúng ta đã bám sát gót Hổ Hung Ác rồi." }
        ]
    },
    271: {
        minigame: 'grow_plant',
        preGame: [
            { character: 'monkey', text: "Một khoảng không rộng lớn cản bước. Không có đường để sang tầng mây phía đối diện." },
            { character: 'monkey', text: "Hãy gieo hạt cây khổng lồ, gõ đúng để cây mọc vút lên làm chiếc cầu bắc ngang trời!" }
        ],
        postGame: [
            { character: 'monkey', text: "Cây khổng lồ đã vươn tới tận tầng mây bên kia. Bước qua thật cẩn thận để không bị ngã." }
        ]
    },
    272: {
        minigame: 'catch_insects',
        preGame: [
            { character: 'monkey', text: "Chúng ta đang bay vào vùng mây đen vần vũ, trời tối sầm lại không thấy gì cả." },
            { character: 'monkey', text: "Dùng vợt bắt những Tinh Linh Ánh Sáng lấp lánh vào lọ để thắp sáng bầu trời xung quanh!" }
        ],
        postGame: [
            { character: 'monkey', text: "Ánh sáng từ các Tinh Linh thật rực rỡ và ấm áp. Mọi thứ đã rõ ràng hơn nhiều." }
        ]
    },
    273: {
        minigame: 'frog_jump',
        preGame: [
            { character: 'monkey', text: "Chỉ có những cụm mây nhỏ xốp lơ lửng làm bước đệm. Bước sai là sẽ tụt xuống dưới ngay!" },
            { character: 'monkey', text: "Gõ đúng nhịp để nhảy khéo léo qua từng cụm mây vững chắc nhất, giữ thăng bằng thật tốt nhé!" }
        ],
        postGame: [
            { character: 'monkey', text: "Bước nhảy hoàn hảo! Cảm giác như đang bước đi trên không khí vậy. Chúng ta đã an toàn." }
        ]
    },
    274: {
        minigame: 'collect_items',
        preGame: [
            { character: 'boss', text: "Ta sẽ xé nát những Đám Mây Kẹo Bông này, các ngươi sẽ kiệt sức trước khi đến được chỗ ta!" },
            { character: 'monkey', text: "Mây Kẹo Bông chứa rất nhiều năng lượng tinh khiết! Nhanh tay thu thập chúng vào giỏ bảo quản." }
        ],
        postGame: [
            { character: 'monkey', text: "Giỏ đã đầy ắp Mây Kẹo Bông ngọt ngào. Năng lượng của chúng ta lại tràn trề để chiến đấu!" }
        ]
    },
    275: {
        minigame: 'assemble_object',
        preGame: [
            { character: 'monkey', text: "Chiếc diều khổng lồ để bay lên đỉnh chóp mây đã bị Hổ Hung Ác xé rách tả tơi rồi." },
            { character: 'monkey', text: "Hãy gõ phím ráp các mảnh vải lụa và khung tre lại để khôi phục chiếc diều bay nhé!" }
        ],
        postGame: [
            { character: 'monkey', text: "Chiếc diều đã căng gió bay lên. Bám chắc vào dây, chúng ta cùng bay vút lên đỉnh mây nào!" }
        ]
    },
    276: {
        minigame: 'clear_fog',
        preGame: [
            { character: 'boss', text: "Gầm! Cơn bão mây đen tuyền này sẽ nuốt chửng các ngươi vĩnh viễn!" },
            { character: 'monkey', text: "Gió bão giật mạnh quá! Gõ phím tạo lốc xoáy ánh sáng để xua tan đám mây đen của hắn ngay!" }
        ],
        postGame: [
            { character: 'monkey', text: "Trời đã quang đãng, nắng chói chang trở lại. Sào huyệt Mây Trắng của Hổ Hung Ác ngay phía trước!" }
        ]
    },
    277: {
        minigame: 'bubble_shooter',
        preGame: [
            { character: 'monkey', text: "Hắn đang điên cuồng ném những khối băng khổng lồ từ đỉnh mây cao nhất xuống đầu chúng ta." },
            { character: 'monkey', text: "Ngắm thật chuẩn và bắn nát những khối băng đó giữa không trung để dọn sạch đường tiến lên!" }
        ],
        postGame: [
            { character: 'monkey', text: "Khối băng vỡ vụn thành những bông tuyết nhỏ. Đòn tấn công cuối cùng của Hổ đã thất bại." }
        ]
    },
    278: {
        minigame: 'assemble_object',
        preGame: [
            { character: 'monkey', text: "Hổ Hung Ác đang gầm gừ chờ sẵn. Chúng ta cần một chiếc khiên mang sức mạnh của cả bầu trời." },
            { character: 'monkey', text: "Hãy ráp những tinh thể mây trắng cứng nhất lại thành chiếc Khiên Bầu Trời vô cùng kiên cố!" }
        ],
        postGame: [
            { character: 'monkey', text: "Khiên Bầu Trời tỏa sáng lấp lánh chói lòa! Cầm lấy vũ khí và tiến lên đánh bại Hổ Hung Ác thôi!" }
        ]
    },
    // Lesson 280 - 292 (Group: Núi rừng, Chapter 21:  'Đỉnh tuyết', Boss: Hổ Hung Ác)
    280: {
        minigame: 'clear_fog',
        preGame: [
            { character: 'monkey', text: "Chúng ta đã đặt chân lên Đỉnh Tuyết! Lạnh quá, bão tuyết thổi mù mịt không thấy đường đi." },
            { character: 'boss', text: "Gầm! Các ngươi sẽ biến thành những bức tượng băng tại vương quốc tuyết trắng của ta!" },
            { character: 'monkey', text: "Đừng sợ rét! Gõ phím thật nhanh để tạo luồng gió ấm thổi tan bão tuyết này ngay!" }
        ],
        postGame: [
            { character: 'monkey', text: "Bão tuyết đã dịu đi. Đỉnh núi phủ đầy tuyết trắng thật đẹp, nhưng chúng ta phải cẩn thận." }
        ]
    },
    281: {
        minigame: 'rescue_animals',
        preGame: [
            { character: 'monkey', text: "Nguy rồi! Một bạn Báo Tuyết nhỏ đang bị Hổ Hung Ác nhốt trong khối băng khổng lồ." },
            { character: 'monkey', text: "Hãy gõ thật chính xác để đập vỡ khối băng và sưởi ấm cho Báo Tuyết con nhé!" }
        ],
        postGame: [
            { character: 'monkey', text: "Báo Tuyết con đã được tự do và ấm áp trở lại. Hổ Hung Ác thật không có tình người!" }
        ]
    },
    282: {
        minigame: 'bubble_shooter',
        preGame: [
            { character: 'boss', text: "Nhận lấy cơn mưa cầu tuyết khổng lồ này đi! Các ngươi sẽ bị đè bẹp!" },
            { character: 'monkey', text: "Hắn ném cầu tuyết từ trên cao xuống! Ngắm bắn vỡ chúng ngay trước khi chúng lăn tới đây!" }
        ],
        postGame: [
            { character: 'monkey', text: "Những quả cầu tuyết đã vỡ tan thành bụi phấn. Phản xạ của bạn thật đáng kinh ngạc." }
        ]
    },
    283: {
        minigame: 'whack_mole',
        preGame: [
            { character: 'monkey', text: "Lũ chuột chũi tay sai đang chui lên từ lớp tuyết dày định cắn hỏng túi đồ giữ ấm của chúng ta." },
            { character: 'monkey', text: "Cầm búa lên, gõ trúng đầu lũ chuột chũi để đuổi chúng đi, bảo vệ đồ đạc nhé!" }
        ],
        postGame: [
            { character: 'monkey', text: "Lũ chuột chũi đã sợ hãi lặn sâu xuống lớp băng. Đồ đạc của chúng ta vẫn an toàn." }
        ]
    },
    284: {
        minigame: 'racing',
        preGame: [
            { character: 'monkey', text: "Hổ Hung Ác đang trượt xuống sườn đồi để lẩn trốn. Nhanh lấy ván trượt tuyết ra!" },
            { character: 'monkey', text: "Gõ phím để tăng tốc độ lướt trên mặt tuyết, quyết không cho hắn thoát!" }
        ],
        postGame: [
            { character: 'monkey', text: "Tốc độ trượt tuyết thật tuyệt đỉnh! Khoảng cách với Hổ Hung Ác đã bị thu hẹp." }
        ]
    },
    285: {
        minigame: 'grow_plant',
        preGame: [
            { character: 'monkey', text: "Một khe nứt băng giá sâu thẳm cản đường. Chúng ta không thể nhảy qua được." },
            { character: 'monkey', text: "Hãy gieo hạt giống cây cổ thụ, gõ đúng để cây mọc vươn ngang làm cầu bắc qua khe nứt!" }
        ],
        postGame: [
            { character: 'monkey', text: "Cây cổ thụ vô cùng vững chãi. Cùng bước qua cầu thật cẩn thận kẻo trơn trượt nhé." }
        ]
    },
    286: {
        minigame: 'catch_insects',
        preGame: [
            { character: 'monkey', text: "Trời tối dần và nhiệt độ đang giảm mạnh. Chúng ta cần tìm nguồn nhiệt." },
            { character: 'monkey', text: "Dùng vợt bắt những Tinh Linh Lửa đang bay lượn lấp lánh vào lọ để sưởi ấm cho cả đoàn." }
        ],
        postGame: [
            { character: 'monkey', text: "Lọ Tinh Linh Lửa tỏa nhiệt thật ấm áp. Chúng ta đã có đủ sức để đi tiếp trong đêm rét." }
        ]
    },
    287: {
        minigame: 'frog_jump',
        preGame: [
            { character: 'monkey', text: "Phía trước là một hồ nước đóng băng với những tảng băng trôi lềnh bềnh." },
            { character: 'monkey', text: "Gõ đúng nhịp để nhảy khéo léo qua các tảng băng dày nhất, tuyệt đối đừng để ngã xuống nước lạnh!" }
        ],
        postGame: [
            { character: 'monkey', text: "Nhảy rất tốt! Đôi chân linh hoạt đã đưa chúng ta vượt qua hồ băng an toàn." }
        ]
    },
    288: {
        minigame: 'collect_items',
        preGame: [
            { character: 'boss', text: "Ta sẽ giẫm nát bụi Dâu Tây Lửa này! Các ngươi sẽ không có gì để phục hồi sinh lực!" },
            { character: 'monkey', text: "Dâu Tây Lửa giúp chống lại cái rét! Nhanh tay nhặt chúng vào giỏ trước khi bị Hổ phá hỏng." }
        ],
        postGame: [
            { character: 'monkey', text: "Đã thu thập đủ Dâu Tây Lửa. Cả người chúng ta lại tràn đầy năng lượng ấm áp!" }
        ]
    },
    289: {
        minigame: 'assemble_object',
        preGame: [
            { character: 'monkey', text: "Cỗ xe kéo tuyết của bác Tuần Lộc đã bị Hổ Hung Ác húc vỡ tan tành." },
            { character: 'monkey', text: "Hãy gõ phím ráp các ván gỗ và thanh trượt lại để sửa cỗ xe giúp bác ấy nhé." }
        ],
        postGame: [
            { character: 'monkey', text: "Xe kéo tuyết đã trơn tru trở lại. Bác Tuần Lộc vô cùng biết ơn chúng ta." }
        ]
    },
    290: {
        minigame: 'clear_fog',
        preGame: [
            { character: 'boss', text: "Gầm! Đây là đỉnh cao nhất! Cơn bão tuyết vĩnh cửu này sẽ đóng băng các ngươi mãi mãi!" },
            { character: 'monkey', text: "Gió rít mạnh quá! Gõ phím tạo lốc xoáy lửa để xua tan cơn bão tuyết vĩnh cửu của hắn ngay!" }
        ],
        postGame: [
            { character: 'monkey', text: "Trời quang mây tạnh. Hang động băng khổng lồ - sào huyệt cuối cùng của Hổ - đã hiện ra trước mắt!" }
        ]
    },
    291: {
        minigame: 'bubble_shooter',
        preGame: [
            { character: 'monkey', text: "Hắn đang điên cuồng ném những khối nhũ băng sắc nhọn từ trên cửa hang xuống." },
            { character: 'monkey', text: "Ngắm thật chuẩn và bắn nát những khối nhũ băng đó trên không trung để dọn đường tiến vào hang!" }
        ],
        postGame: [
            { character: 'monkey', text: "Các khối nhũ băng vỡ vụn lấp lánh như pha lê. Đòn tấn công của Hổ đã hoàn toàn bị vô hiệu." }
        ]
    },
    292: {
        minigame: 'assemble_object',
        preGame: [
            { character: 'monkey', text: "Hổ Hung Ác đang gầm gừ chờ sẵn bên trong. Chúng ta cần một tấm khiên không thể bị xuyên thủng." },
            { character: 'monkey', text: "Hãy ráp những khối Băng Vĩnh Cửu cứng nhất lại thành chiếc Khiên Băng Giá chói lòa!" }
        ],
        postGame: [
            { character: 'monkey', text: "Khiên Băng Giá tỏa ra ánh sáng lạnh lẽo nhưng vô cùng kiên cố! Cầm lấy vũ khí, lao vào và kết thúc Hổ Hung Ác thôi!" }
        ]
    },
    // Lesson 294 - 306 (Group: Đêm sao, Chapter 22:  'Trăng non', Boss: Bóng Ma)
    294: {
        minigame: 'clear_fog',
        preGame: [
            { character: 'monkey', text: "Chúng ta đã bước vào vùng Đêm Sao, nhưng đêm Trăng Non này tối tăm quá!" },
            { character: 'boss', text: "Khà khà! Bóng tối là vương quốc của ta, các ngươi sẽ lạc lối trong sợ hãi!" },
            { character: 'monkey', text: "Đừng sợ! Hãy gõ phím để tạo ra gió lốc thổi tan làn sương đen mờ ảo này!" }
        ],
        postGame: [
            { character: 'monkey', text: "Sương đen đã bị thổi bay. Bầu trời đêm đã hiện ra dù chỉ lấp lánh vài ánh sao mờ." }
        ]
    },
    295: {
        minigame: 'rescue_animals',
        preGame: [
            { character: 'monkey', text: "Bóng Ma đã giam giữ bạn Cú Mèo trong một chiếc lồng bóng tối!" },
            { character: 'monkey', text: "Hãy gõ đúng để dùng phép thuật ánh sáng phá vỡ chiếc lồng và cứu bạn Cú Mèo ra ngoài!" }
        ],
        postGame: [
            { character: 'monkey', text: "Cú Mèo đã được tự do bay lượn. Đôi mắt tinh tường của bạn ấy sẽ giúp chúng ta." }
        ]
    },
    296: {
        minigame: 'bubble_shooter',
        preGame: [
            { character: 'boss', text: "Nhận lấy những quả cầu hắc ám của ta đây! Các ngươi sẽ bị nuốt chửng!" },
            { character: 'monkey', text: "Hắn đang ném cầu hắc ám! Ngắm chuẩn và bắn vỡ chúng trước khi bóng tối bủa vây!" }
        ],
        postGame: [
            { character: 'monkey', text: "Những quả cầu đã nổ tung thành bụi đen. Bóng Ma không thể làm chúng ta chùn bước." }
        ]
    },
    297: {
        minigame: 'whack_mole',
        preGame: [
            { character: 'monkey', text: "Lũ dơi quỷ tay sai của Bóng Ma đang lao xuống từ những vách đá tối tăm." },
            { character: 'monkey', text: "Cầm búa lên, gõ trúng đích để đánh đuổi bầy dơi đi ngay lập tức!" }
        ],
        postGame: [
            { character: 'monkey', text: "Lũ dơi đã hoảng sợ vỗ cánh bay mất. Không gian yên tĩnh trở lại." }
        ]
    },
    298: {
        minigame: 'racing',
        preGame: [
            { character: 'monkey', text: "Bóng Ma đang lướt đi trong đêm tối để trốn thoát." },
            { character: 'monkey', text: "Cùng cưỡi lên lưng Hươu Sao Ánh Sáng và đua tốc độ đuổi theo hắn nào!" }
        ],
        postGame: [
            { character: 'monkey', text: "Hươu Sao chạy nhanh như một vệt sao băng! Chúng ta đang bám sát Bóng Ma." }
        ]
    },
    299: {
        minigame: 'grow_plant',
        preGame: [
            { character: 'monkey', text: "Một khe nứt không gian tối tăm cản đường. Chúng ta không thể tự bay qua." },
            { character: 'monkey', text: "Hãy gieo hạt giống Cây Ngàn Sao, gõ đúng để cây vươn cành làm cầu bắc qua!" }
        ],
        postGame: [
            { character: 'monkey', text: "Cây Dạ Quang tỏa sáng rực rỡ và vô cùng vững chãi. Cùng bước qua cầu ánh sáng này thôi." }
        ]
    },
    300: {
        minigame: 'catch_insects',
        preGame: [
            { character: 'monkey', text: "Con đường phía trước bị bóng tối che khuất hoàn toàn." },
            { character: 'monkey', text: "Dùng vợt bắt những bạn Đom Đóm Tinh Tú vào lọ để thắp sáng xung quanh nhé." }
        ],
        postGame: [
            { character: 'monkey', text: "Lọ Đom Đóm tỏa ra ánh sáng lấp lánh như dải ngân hà. Cùng đi tiếp thôi." }
        ]
    },
    301: {
        minigame: 'frog_jump',
        preGame: [
            { character: 'monkey', text: "Dưới chân là những hòn đá băng lơ lửng trên dải tinh vân mờ ảo." },
            { character: 'monkey', text: "Gõ đúng nhịp để nhảy khéo léo qua các tảng băng phát sáng, đừng bước hụt vào khoảng không nhé!" }
        ],
        postGame: [
            { character: 'monkey', text: "Thật chính xác! Đôi chân linh hoạt đã giúp chúng ta vượt qua dải tinh vân an toàn." }
        ]
    },
    302: {
        minigame: 'collect_items',
        preGame: [
            { character: 'boss', text: "Ta sẽ dập tắt những Giọt Sương Tinh Tú này, các ngươi đừng hòng nạp lại năng lượng!" },
            { character: 'monkey', text: "Giọt Sương chứa sức mạnh của Đêm Sao! Nhanh tay nhặt chúng vào giỏ trước khi biến mất." }
        ],
        postGame: [
            { character: 'monkey', text: "Đã thu thập đủ Giọt Sương Tinh Tú. Chúng ta lại tràn đầy năng lượng ánh sáng!" }
        ]
    },
    303: {
        minigame: 'assemble_object',
        preGame: [
            { character: 'monkey', text: "Chiếc Kính Viễn Vọng của bác Thỏ Ngọc bị Bóng Ma đánh vỡ rồi." },
            { character: 'monkey', text: "Hãy gõ phím ráp các thấu kính lại để sửa chiếc kính giúp bác ấy quan sát bầu trời nhé." }
        ],
        postGame: [
            { character: 'monkey', text: "Kính Viễn Vọng đã hoạt động tốt. Bác Thỏ Ngọc đã chỉ cho chúng ta vị trí sào huyệt của Bóng Ma." }
        ]
    },
    304: {
        minigame: 'clear_fog',
        preGame: [
            { character: 'boss', text: "Ngu ngốc! Cơn lốc bóng đêm này sẽ giam cầm linh hồn các ngươi mãi mãi!" },
            { character: 'monkey', text: "Khí lạnh âm u quá! Gõ phím tạo lốc xoáy ánh sáng để xua tan màn đêm đen đặc này!" }
        ],
        postGame: [
            { character: 'monkey', text: "Bóng đêm đã bị xé toạc. Sào huyệt của Bóng Ma nằm ngay trên đỉnh tháp cổ kia!" }
        ]
    },
    305: {
        minigame: 'bubble_shooter',
        preGame: [
            { character: 'monkey', text: "Hắn đang phóng những lưỡi hái bóng tối bay rợp trời về phía chúng ta." },
            { character: 'monkey', text: "Ngắm thật chuẩn và bắn nát những lưỡi hái đó trên không trung để mở đường tiến lên!" }
        ],
        postGame: [
            { character: 'monkey', text: "Lưỡi hái bóng tối vỡ vụn thành những mảnh hư không. Hắn không còn đòn tấn công nào nữa." }
        ]
    },
    306: {
        minigame: 'assemble_object',
        preGame: [
            { character: 'monkey', text: "Bóng Ma đang chờ sẵn. Chúng ta cần sức mạnh ánh sáng thiêng liêng nhất để xua tan hắn." },
            { character: 'monkey', text: "Hãy ráp những Mảnh Vỡ Mặt Trăng lại thành chiếc Khiên Trăng Non tỏa sáng chói lòa!" }
        ],
        postGame: [
            { character: 'monkey', text: "Khiên Trăng Non phát ra ánh sáng rực rỡ xua tan bóng tối! Tiến lên và phong ấn Bóng Ma thôi!" }
        ]
    },
    // Lesson 308 - 320 (Group: Đêm sao, Chapter 23:  'Sao nhỏ', Boss: Bóng Ma)
    308: {
        minigame: 'clear_fog',
        preGame: [
            { character: 'monkey', text: "Chúng ta đang ở Thung lũng Sao Nhỏ. Nhưng Bóng Ma đã thả màn đêm đen đặc nuốt chửng mọi ánh sáng!" },
            { character: 'boss', text: "Khà khà! Bầu trời này giờ là của ta. Không một vì sao nào có thể lấp lánh!" },
            { character: 'monkey', text: "Tuyệt đối không để hắn làm vậy! Hãy gõ phím tạo bão ánh sáng thổi bay màn đêm hắc ám này!" }
        ],
        postGame: [
            { character: 'monkey', text: "Màn đêm đã bị xé toạc. Những vì sao nhỏ lại tỏa sáng lung linh trên bầu trời rồi!" }
        ]
    },
    309: {
        minigame: 'rescue_animals',
        preGame: [
            { character: 'monkey', text: "Tệ quá! Bóng Ma đã dùng xích bóng tối trói chặt bạn Sao Chổi Nhỏ vào một tảng thiên thạch." },
            { character: 'monkey', text: "Gõ đúng các từ phép thuật để bẻ gãy sợi xích và giải cứu Sao Chổi Nhỏ ngay lập tức!" }
        ],
        postGame: [
            { character: 'monkey', text: "Sao Chổi Nhỏ đã được tự do bay vút đi với chiếc đuôi lấp lánh. Làm tốt lắm!" }
        ]
    },
    310: {
        minigame: 'bubble_shooter',
        preGame: [
            { character: 'boss', text: "Nhận lấy những quả cầu bóng đêm của ta đây! Chúng sẽ hút cạn ánh sáng của các ngươi!" },
            { character: 'monkey', text: "Cẩn thận! Ngắm bắn vỡ vụn những quả cầu bóng đêm trước khi chúng chạm vào chúng ta!" }
        ],
        postGame: [
            { character: 'monkey', text: "Các quả cầu đã nổ tung thành bụi đen vô hại. Ánh sáng của chúng ta vẫn rực rỡ." }
        ]
    },
    311: {
        minigame: 'whack_mole',
        preGame: [
            { character: 'monkey', text: "Lũ dơi quỷ đang ngoi lên từ các kẽ nứt không gian để ăn cắp Bụi Sao." },
            { character: 'monkey', text: "Lấy búa ra và gõ trúng đầu chúng để bảo vệ nguồn sáng của Thung lũng Sao Nhỏ!" }
        ],
        postGame: [
            { character: 'monkey', text: "Lũ dơi quỷ đã sợ hãi lặn mất tăm. Bụi Sao vẫn tỏa sáng lấp lánh an toàn." }
        ]
    },
    312: {
        minigame: 'racing',
        preGame: [
            { character: 'monkey', text: "Bóng Ma đang hóa thành một vệt đen tháo chạy qua Dải Ngân Hà." },
            { character: 'monkey', text: "Cùng cưỡi lên lưng Cá Đuối Sao và đua tốc độ đuổi theo hắn thật nhanh nào!" }
        ],
        postGame: [
            { character: 'monkey', text: "Cá Đuối Sao bơi trong không gian lướt nhẹ như gió! Hắn không thể trốn thoát." }
        ]
    },
    313: {
        minigame: 'grow_plant',
        preGame: [
            { character: 'monkey', text: "Phía trước là một hố đen thu nhỏ cản đường, chúng ta không thể bay qua." },
            { character: 'monkey', text: "Hãy gieo hạt Cây Ngàn sao, gõ đúng để cây vươn dài bắc ngang qua hố đen!" }
        ],
        postGame: [
            { character: 'monkey', text: "Cây Cầu Ánh Sao rực rỡ và vô cùng kiên cố. Bước qua thật cẩn thận nhé." }
        ]
    },
    314: {
        minigame: 'catch_insects',
        preGame: [
            { character: 'monkey', text: "Khu vực này bị các đám tinh vân tối che khuất tầm nhìn hoàn toàn." },
            { character: 'monkey', text: "Hãy dùng vợt bắt những Tinh Linh Sao Băng nhỏ xíu vào lọ để thắp sáng lối đi cho chúng ta." }
        ],
        postGame: [
            { character: 'monkey', text: "Lọ Tinh Linh rực rỡ như một chiếc đèn lồng ma thuật. Không gian đã bừng sáng." }
        ]
    },
    315: {
        minigame: 'frog_jump',
        preGame: [
            { character: 'monkey', text: "Để vượt qua Biển Bóng Tối, chúng ta chỉ có thể giẫm lên các tiểu hành tinh lơ lửng này." },
            { character: 'monkey', text: "Gõ đúng nhịp để nhảy thật chính xác, đừng để trượt chân rơi xuống Biển Bóng Tối nhé!" }
        ],
        postGame: [
            { character: 'monkey', text: "Thật thót tim! Nhưng đôi chân khéo léo đã giúp chúng ta vượt qua an toàn." }
        ]
    },
    316: {
        minigame: 'collect_items',
        preGame: [
            { character: 'boss', text: "Ta sẽ nuốt chửng tất cả những Tinh Thể Sao Nhỏ này, các ngươi sẽ kiệt quệ sức lực!" },
            { character: 'monkey', text: "Tinh Thể chứa năng lượng vô tận! Nhanh tay thu thập chúng vào túi trước khi Bóng Ma cướp mất." }
        ],
        postGame: [
            { character: 'monkey', text: "Đã thu thập đủ Tinh Thể Sao Nhỏ. Năng lượng của chúng ta lại trào dâng mạnh mẽ!" }
        ]
    },
    317: {
        minigame: 'assemble_object',
        preGame: [
            { character: 'monkey', text: "La Bàn Ánh Sáng chỉ đường tới sào huyệt Bóng Ma đã bị vỡ thành nhiều mảnh." },
            { character: 'monkey', text: "Hãy gõ phím ráp các mảnh ghép lại để khôi phục chiếc La Bàn thần kỳ này nhé." }
        ],
        postGame: [
            { character: 'monkey', text: "La Bàn đã hoạt động trở lại! Nó đang chỉ thẳng về phía Vực Thẳm Đen phía trước." }
        ]
    },
    318: {
        minigame: 'clear_fog',
        preGame: [
            { character: 'boss', text: "Ngươi dám đến tận đây sao? Cơn lốc hắc ám này sẽ nghiền nát ánh sáng của các ngươi!" },
            { character: 'monkey', text: "Không lùi bước! Gõ thật nhanh tạo luồng sóng ánh sáng đánh tan cơn lốc hắc ám của hắn!" }
        ],
        postGame: [
            { character: 'monkey', text: "Cơn lốc hắc ám tan biến thành mây khói. Sào huyệt của Bóng Ma đã lộ diện!" }
        ]
    },
    319: {
        minigame: 'bubble_shooter',
        preGame: [
            { character: 'monkey', text: "Hắn đang điên cuồng phóng những cơn mưa thiên thạch đen về phía chúng ta." },
            { character: 'monkey', text: "Ngắm chuẩn và bắn vỡ nát những khối thiên thạch đó giữa không trung để dọn đường!" }
        ],
        postGame: [
            { character: 'monkey', text: "Thiên thạch đen vỡ vụn thành cát bụi. Đòn tấn công của Bóng Ma đã hoàn toàn thất bại." }
        ]
    },
    320: {
        minigame: 'assemble_object',
        preGame: [
            { character: 'monkey', text: "Bóng Ma đang tập hợp sức mạnh cuối cùng. Chúng ta cần một vũ khí tinh khiết nhất." },
            { character: 'monkey', text: "Hãy ráp những mảnh Tinh Thể Sao Nhỏ lại thành chiếc Khiên Ngân Hà lấp lánh!" }
        ],
        postGame: [
            { character: 'monkey', text: "Khiên Ngân Hà tỏa ra ánh sáng chói lòa đánh tan mọi bóng tối! Tiến lên kết thúc trận chiến này thôi!" }
        ]
    },
    // Lesson 322 - 334 (Group: Đêm sao, Chapter 24:  'Cú đêm', Boss: Bóng Ma)
    322: {
        minigame: 'clear_fog',
        preGame: [
            { character: 'monkey', text: "Chúng ta đã tiến vào Khu Rừng Cú Đêm. Làn sương đen của Bóng Ma làm không gian âm u quá!" },
            { character: 'boss', text: "Khà khà! Bóng tối nơi đây sẽ nuốt chửng mọi âm thanh và ánh sáng của các ngươi!" },
            { character: 'monkey', text: "Đừng sợ hãi! Hãy gõ phím tạo gió lốc thổi tan sương mù hắc ám này để tìm đường!" }
        ],
        postGame: [
            { character: 'monkey', text: "Sương mù đã bị xua tan. Những đôi mắt của bầy Cú Đêm đang phát sáng dẫn lối cho chúng ta." }
        ]
    },
    323: {
        minigame: 'rescue_animals',
        preGame: [
            { character: 'monkey', text: "Nguy rồi! Bóng Ma đã nhốt bạn Cú Tuyết vào một chiếc lồng bằng bóng tối đặc quánh." },
            { character: 'monkey', text: "Nhanh tay gõ phím thật chính xác để dùng phép thuật phá vỡ lồng và cứu bạn ấy!" }
        ],
        postGame: [
            { character: 'monkey', text: "Cú Tuyết đã cất cánh bay an toàn. Khả năng nhìn trong đêm của bạn ấy sẽ giúp ích rất nhiều." }
        ]
    },
    324: {
        minigame: 'bubble_shooter',
        preGame: [
            { character: 'boss', text: "Nhận lấy những quả cầu huyễn ảnh của ta! Các ngươi sẽ chìm trong ảo giác!" },
            { character: 'monkey', text: "Tập trung nào! Bắn vỡ những quả cầu huyễn ảnh đó ngay trên không trung trước khi chúng phát nổ!" }
        ],
        postGame: [
            { character: 'monkey', text: "Ảo ảnh đã vỡ tan thành những vệt sáng. Tâm trí của chúng ta vẫn vô cùng tỉnh táo." }
        ]
    },
    325: {
        minigame: 'whack_mole',
        preGame: [
            { character: 'monkey', text: "Lũ dơi quỷ đang bò ra từ các hốc cây cổ thụ định cướp đèn lồng của chúng ta." },
            { character: 'monkey', text: "Cầm búa lên và gõ trúng đích để đánh đuổi lũ dơi quỷ chui tọt lại vào bóng tối nhé!" }
        ],
        postGame: [
            { character: 'monkey', text: "Lũ dơi quỷ đã hoảng sợ tháo chạy. Đèn lồng vẫn sáng rực rỡ bảo vệ cả đoàn." }
        ]
    },
    326: {
        minigame: 'racing',
        preGame: [
            { character: 'monkey', text: "Bóng Ma đang hóa thành luồng khói đen lướt đi rất nhanh qua các cành cây." },
            { character: 'monkey', text: "Cùng cưỡi lên lưng Cú Đêm Khổng Lồ, vỗ cánh tăng tốc đuổi theo hắn ngay lập tức!" }
        ],
        postGame: [
            { character: 'monkey', text: "Cú Đêm bay lượn thật êm ái và thần tốc! Chúng ta đang bám rất sát Bóng Ma." }
        ]
    },
    327: {
        minigame: 'grow_plant',
        preGame: [
            { character: 'monkey', text: "Một hẻm vực sâu hun hút không có đáy. Chúng ta không thể bay qua được." },
            { character: 'monkey', text: "Hãy gieo hạt giống Cây Ngàn Sao, gõ đúng để cây vươn dài làm cầu vắt ngang vực!" }
        ],
        postGame: [
            { character: 'monkey', text: "Cây Cầu Ánh Sao vừa đẹp vừa vững chãi. Cùng bước qua cẩn thận nào." }
        ]
    },
    328: {
        minigame: 'catch_insects',
        preGame: [
            { character: 'monkey', text: "Lối đi dẫn vào một hang động hoàn toàn vắng bóng ánh trăng." },
            { character: 'monkey', text: "Dùng vợt bắt những bạn Bướm Đêm Dạ Quang vào lọ để thắp sáng con đường phía trước nhé." }
        ],
        postGame: [
            { character: 'monkey', text: "Lọ Bướm Đêm tỏa ra ánh sáng xanh lục huyền ảo. Hang động đã trở nên sáng sủa hơn." }
        ]
    },
    329: {
        minigame: 'frog_jump',
        preGame: [
            { character: 'monkey', text: "Phía trước là một bãi lầy bóng tối. Chỉ có vài gốc cây mục nhô lên có thể giẫm vào." },
            { character: 'monkey', text: "Gõ đúng nhịp để nhảy khéo léo qua các gốc cây, đừng để bước hụt xuống bãi lầy nhé!" }
        ],
        postGame: [
            { character: 'monkey', text: "Cú nhảy cuối cùng thật chính xác! Chúng টুক đã an toàn băng qua bãi lầy bóng tối." }
        ]
    },
    330: {
        minigame: 'collect_items',
        preGame: [
            { character: 'boss', text: "Ta sẽ phủ đen những viên Đá cuội này, các ngươi đừng mơ có được tầm nhìn tinh tường!" },
            { character: 'monkey', text: "Đá cuội này chứa năng lượng phép thuật! Nhanh tay thu thập chúng vào túi trước khi bị nhuốm đen." }
        ],
        postGame: [
            { character: 'monkey', text: "Đã nhặt đủ Đá cuội. Đôi mắt chúng ta giờ đây có thể nhìn thấu mọi màn đêm!" }
        ]
    },
    331: {
        minigame: 'assemble_object',
        preGame: [
            { character: 'monkey', text: "Chiếc Đồng Hồ Cát Thời Gian của Cú Trưởng Bản bị Bóng Ma hất vỡ tung tóe." },
            { character: 'monkey', text: "Hãy gõ phím ráp các mảnh pha lê lại để khôi phục dòng chảy thời gian giúp bác ấy nhé." }
        ],
        postGame: [
            { character: 'monkey', text: "Đồng Hồ Cát đã nguyên vẹn. Bác Cú Trưởng Bản đã chỉ cho chúng ta đường tắt đến sào huyệt." }
        ]
    },
    332: {
        minigame: 'clear_fog',
        preGame: [
            { character: 'boss', text: "Các ngươi thật ngoan cố! Bức tường sương mù hắc ám này sẽ là nơi chôn vùi các ngươi!" },
            { character: 'monkey', text: "Áp lực bóng tối mạnh quá! Gõ thật nhanh tạo luồng gió ánh sáng xé toạc bức tường này ngay!" }
        ],
        postGame: [
            { character: 'monkey', text: "Bức tường hắc ám đã sụp đổ. Sào huyệt của Bóng Ma nằm ngay trên ngọn cây cao nhất kia!" }
        ]
    },
    333: {
        minigame: 'bubble_shooter',
        preGame: [
            { character: 'monkey', text: "Hắn đang điên cuồng phóng những chùm gai bóng đêm từ trên ngọn cây xuống." },
            { character: 'monkey', text: "Ngắm thật chuẩn và bắn nát những chùm gai đó giữa không trung để dọn đường leo lên!" }
        ],
        postGame: [
            { character: 'monkey', text: "Gai bóng đêm vỡ vụn thành sương khói. Bóng Ma đã cạn kiệt chiêu trò phòng thủ rồi." }
        ]
    },
    334: {
        minigame: 'assemble_object',
        preGame: [
            { character: 'monkey', text: "Bóng Ma đang chờ sẵn ở đỉnh cây. Chúng ta cần sức mạnh phòng ngự từ Mắt Cú thiêng liêng." },
            { character: 'monkey', text: "Hãy ráp những viên Đá Mắt Cú lại thành chiếc Khiên Cú Đêm nhìn thấu mọi ảo ảnh!" }
        ],
        postGame: [
            { character: 'monkey', text: "Khiên Cú Đêm tỏa ra ánh sáng trí tuệ rực rỡ! Tiến lên và phong ấn Bóng Ma vĩnh viễn thôi!" }
        ]
    },

    // Lesson 336 - 348 (Group: Đêm sao, Chapter 25:  'Đom đóm', Boss: Bóng Ma)
    336: {
        minigame: 'clear_fog',
        preGame: [
            { character: 'monkey', text: "Chúng ta đã đến Thung lũng Đom Đóm! Nhưng Bóng Ma đã phủ một lớp sương đen kịt lên tất cả." },
            { character: 'boss', text: "Khà khà! Lũ bọ phát sáng ranh mãnh này sẽ bị dập tắt mãi mãi dưới sức mạnh của ta!" },
            { character: 'monkey', text: "Đừng hòng! Hãy gõ phím thật nhanh để thổi bay lớp sương đen này, trả lại ánh sáng cho thung lũng!" }
        ],
        postGame: [
            { character: 'monkey', text: "Sương đen đã tan. Những đốm sáng đom đóm lại bắt đầu lập lòe lung linh thật đẹp mắt." }
        ]
    },
    337: {
        minigame: 'rescue_animals',
        preGame: [
            { character: 'monkey', text: "Bóng Ma đã nhốt Đom Đóm Chúa vào một quả cầu pha lê đen ngòm kìa." },
            { character: 'monkey', text: "Hãy gõ đúng các từ để làm nứt quả cầu và giải cứu Đom Đóm Chúa ra ngoài!" }
        ],
        postGame: [
            { character: 'monkey', text: "Đom Đóm Chúa đã được tự do! Ánh sáng của ngài đang tiếp thêm sức mạnh cho chúng ta." }
        ]
    },
    338: {
        minigame: 'bubble_shooter',
        preGame: [
            { character: 'boss', text: "Hãy xem các ngươi có né được những quả bóng đầm lầy hắc ám này không!" },
            { character: 'monkey', text: "Hắn đang thả những quả bóng đen! Ngắm bắn vỡ chúng ngay trước khi chúng dập tắt ánh sáng xung quanh." }
        ],
        postGame: [
            { character: 'monkey', text: "Mọi quả bóng hắc ám đều vỡ tan. Thung lũng vẫn rực sáng." }
        ]
    },
    339: {
        minigame: 'whack_mole',
        preGame: [
            { character: 'monkey', text: "Lũ nhện độc bóng đêm đang bò ra từ các kẽ đá để giăng tơ bắt đom đóm." },
            { character: 'monkey', text: "Nhanh tay lấy búa gõ trúng đích để đánh đuổi lũ nhện đi, bảo vệ các bạn nhỏ nhé!" }
        ],
        postGame: [
            { character: 'monkey', text: "Bầy nhện đã hoảng sợ thụt lại vào hang sâu. Các bạn đom đóm đã an toàn." }
        ]
    },
    340: {
        minigame: 'racing',
        preGame: [
            { character: 'monkey', text: "Bóng Ma thấy ánh sáng đang mạnh lên liền lẩn trốn vào rừng sâu." },
            { character: 'monkey', text: "Cùng ngồi lên chiếc lá lướt gió do đàn đom đóm kéo để đuổi theo hắn thật nhanh nào!" }
        ],
        postGame: [
            { character: 'monkey', text: "Chiếc lá lướt đi trong đêm thật êm ái và tốc độ! Hắn không trốn thoát được đâu." }
        ]
    },
    341: {
        minigame: 'grow_plant',
        preGame: [
            { character: 'monkey', text: "Một hẻm núi tối tăm chắn ngang đường, không có cầu để qua." },
            { character: 'monkey', text: "Hãy gieo hạt giống phép thuật, gõ phím để một cây hoa thần kỳ mọc lên vắt ngang hẻm núi nhé!" }
        ],
        postGame: [
            { character: 'monkey', text: "Cây hoa thần kỳ tỏa sáng rực rỡ và vô cùng vững chãi. Cùng cẩn thận bước qua hẻm núi nào." }
        ]
    },
    342: {
        minigame: 'catch_insects',
        preGame: [
            { character: 'monkey', text: "Gió độc của Bóng Ma thổi qua làm đàn đom đóm con hoảng loạn bay toán loạn." },
            { character: 'monkey', text: "Dùng vợt cẩn thận đón các bạn ấy vào chiếc đèn lồng an toàn để soi đường tiếp." }
        ],
        postGame: [
            { character: 'monkey', text: "Đàn đom đóm con đã ngoan ngoãn nằm trong lồng đèn. Ánh sáng lại ấm áp chiếu rọi." }
        ]
    },
    343: {
        minigame: 'frog_jump',
        preGame: [
            { character: 'monkey', text: "Phía trước là đầm lầy bóng tối tĩnh lặng, chỉ có vài đài hoa phát sáng có thể giẫm lên." },
            { character: 'monkey', text: "Gõ đúng nhịp để nhảy thật khéo qua các đài hoa, tuyệt đối đừng để trượt chân!" }
        ],
        postGame: [
            { character: 'monkey', text: "Thật nhịp nhàng! Đôi chân linh hoạt đã giúp chúng ta vượt qua đầm lầy an toàn." }
        ]
    },
    344: {
        minigame: 'collect_items',
        preGame: [
            { character: 'boss', text: "Ta sẽ hút cạn những Tinh Thể Sáng này! Các ngươi sẽ kiệt sức trong đêm tối!" },
            { character: 'monkey', text: "Tinh Thể Sáng là nguồn năng lượng vô giá! Nhanh tay thu thập chúng vào túi trước khi bị Bóng Ma cướp." }
        ],
        postGame: [
            { character: 'monkey', text: "Đã thu thập đủ Tinh Thể Sáng. Cả người chúng ta lại tràn đầy sức mạnh!" }
        ]
    },
    345: {
        minigame: 'assemble_object',
        preGame: [
            { character: 'monkey', text: "Ngọn Hải Đăng Đom Đóm dẫn đường đã bị Bóng Ma đập vỡ lớp kính bảo vệ." },
            { character: 'monkey', text: "Hãy gõ phím ráp các mảnh kính pha lê lại để sửa chữa ngọn hải đăng giúp khu rừng nhé." }
        ],
        postGame: [
            { character: 'monkey', text: "Ngọn hải đăng đã sáng rực rỡ trở lại! Ánh sáng chỉ thẳng đến sào huyệt của Bóng Ma." }
        ]
    },
    346: {
        minigame: 'clear_fog',
        preGame: [
            { character: 'boss', text: "Các ngươi thật phiền phức! Hãy chìm đắm trong cơn bão bóng đêm vĩnh cửu này!" },
            { character: 'monkey', text: "Bóng tối dày đặc quá! Gõ thật nhanh tạo luồng gió ánh sáng xua tan cơn bão này ngay lập tức!" }
        ],
        postGame: [
            { character: 'monkey', text: "Cơn bão đã bị xé toạc. Sào huyệt của Bóng Ma ẩn sau cây cổ thụ khổng lồ đã lộ diện." }
        ]
    },
    347: {
        minigame: 'bubble_shooter',
        preGame: [
            { character: 'monkey', text: "Hắn đang điên cuồng phóng những tảng thiên thạch hắc ám về phía chúng ta." },
            { character: 'monkey', text: "Ngắm thật chuẩn và bắn nát những tảng thiên thạch đó giữa không trung để dọn đường!" }
        ],
        postGame: [
            { character: 'monkey', text: "Thiên thạch vỡ vụn thành cát bụi. Bóng Ma đã hết đường chống cự." }
        ]
    },
    348: {
        minigame: 'assemble_object',
        preGame: [
            { character: 'monkey', text: "Bóng Ma đang tập trung sức mạnh cuối cùng. Chúng ta cần một vũ khí hội tụ đủ ánh sáng." },
            { character: 'monkey', text: "Hãy ráp những mảnh Tinh Thể Sáng lại thành chiếc Khiên Đom Đóm chói lòa!" }
        ],
        postGame: [
            { character: 'monkey', text: "Khiên Đom Đóm rực sáng đánh tan mọi bóng tối xung quanh! Tiến lên và phong ấn hắn mãi mãi!" }
        ]
    },
    // Lesson 350 - 362 (Group: Đêm sao, Chapter 26:  'Đêm huyền bí', Boss: Bóng Ma)
    350: {
        minigame: 'clear_fog',
        preGame: [
            { character: 'monkey', text: "Bước vào khu vực Đêm Huyền Bí rồi! Sương mù ma thuật ở đây đặc quánh và lạnh lẽo quá." },
            { character: 'boss', text: "Khà khà! Các ngươi sẽ vĩnh viễn kẹt lại trong màn đêm huyễn hoặc của ta!" },
            { character: 'monkey', text: "Không bao giờ! Hãy gõ phím tạo ra một luồng gió ánh sáng để xua tan lớp sương đen này!" }
        ],
        postGame: [
            { character: 'monkey', text: "Sương mù đã bị đẩy lùi. Cảnh vật Đêm Huyền Bí hiện ra thật kỳ ảo, nhưng Bóng Ma đang ở quanh đây." }
        ]
    },
    351: {
        minigame: 'rescue_animals',
        preGame: [
            { character: 'monkey', text: "Trời ơi! Bóng Ma đã nhốt bạn Cáo Bạc vào một lồng giam bằng sấm sét đen." },
            { character: 'monkey', text: "Nhanh tay gõ đúng các từ phép thuật để vô hiệu hóa lồng giam, cứu Cáo Bạc ra ngoài!" }
        ],
        postGame: [
            { character: 'monkey', text: "Cáo Bạc đã được tự do và bộ lông phát sáng của bạn ấy đang chỉ đường cho chúng ta." }
        ]
    },
    352: {
        minigame: 'bubble_shooter',
        preGame: [
            { character: 'boss', text: "Chìm vào ác mộng đi! Nhận lấy những quả cầu huyễn ảnh của ta!" },
            { character: 'monkey', text: "Cẩn thận! Ngắm bắn vỡ vụn những quả cầu huyễn ảnh trước khi chúng ru ngủ chúng ta!" }
        ],
        postGame: [
            { character: 'monkey', text: "Những quả cầu ác mộng đã vỡ tan thành những vì sao nhỏ. Chúng ta vẫn hoàn toàn tỉnh táo." }
        ]
    },
    353: {
        minigame: 'whack_mole',
        preGame: [
            { character: 'monkey', text: "Lũ tiểu quỷ bóng đêm đang bò lên từ dưới mặt đất định ăn cắp Bụi Tinh Tú của chúng ta." },
            { character: 'monkey', text: "Cầm búa lên và gõ trúng đích để đánh đuổi lũ tiểu quỷ chui tọt lại vào bóng tối!" }
        ],
        postGame: [
            { character: 'monkey', text: "Lũ tiểu quỷ đã hoảng sợ bỏ chạy. Nguồn sáng của chúng ta vẫn được bảo vệ nguyên vẹn." }
        ]
    },
    354: {
        minigame: 'racing',
        preGame: [
            { character: 'monkey', text: "Bóng Ma đang hóa thành một luồng hắc khí bay vút qua những vì sao." },
            { character: 'monkey', text: "Cùng cưỡi lên lưng Ngựa Có Cánh Pegasus, vỗ cánh tăng tốc đuổi theo hắn ngay!" }
        ],
        postGame: [
            { character: 'monkey', text: "Pegasus bay lượn như một vệt sao băng! Hắn không thể thoát khỏi tầm mắt chúng ta." }
        ]
    },
    355: {
        minigame: 'grow_plant',
        preGame: [
            { character: 'monkey', text: "Một khoảng không vũ trụ sâu thẳm cản bước. Không có điểm tựa nào để đi tiếp." },
            { character: 'monkey', text: "Hãy gieo cây Ngàn sao, gõ đúng để một cây vươn dài làm cầu bắc ngang!" }
        ],
        postGame: [
            { character: 'monkey', text: "Cây Ngàn Sao tỏa ra ánh sáng dịu nhẹ và vô cùng vững chãi. Cùng bước qua thật cẩn thận." }
        ]
    },
    356: {
        minigame: 'catch_insects',
        preGame: [
            { character: 'monkey', text: "Con đường phía trước hoàn toàn không có ánh sao nào chiếu tới." },
            { character: 'monkey', text: "Hãy dùng vợt bắt những bạn Bướm Mặt Trăng lấp lánh vào lọ để thắp sáng không gian." }
        ],
        postGame: [
            { character: 'monkey', text: "Lọ Bướm Mặt Trăng tỏa ra ánh sáng trắng tuyệt đẹp. Đêm Huyền Bí không còn đáng sợ nữa." }
        ]
    },
    357: {
        minigame: 'frog_jump',
        preGame: [
            { character: 'monkey', text: "Chỉ có những mảnh thiên thạch lơ lửng không ổn định là nơi có thể đặt chân lên." },
            { character: 'monkey', text: "Gõ đúng nhịp để nhảy thật chính xác qua các thiên thạch, đừng để hụt bước rơi vào hố đen!" }
        ],
        postGame: [
            { character: 'monkey', text: "Tuyệt vời! Những bước nhảy phi thường đã đưa chúng ta vượt qua bãi thiên thạch an toàn." }
        ]
    },
    358: {
        minigame: 'collect_items',
        preGame: [
            { character: 'boss', text: "Ta sẽ nguyền rủa những Mảnh Sao Băng này, các ngươi đừng hòng nạp lại sức mạnh!" },
            { character: 'monkey', text: "Mảnh Sao Băng là nguồn phép thuật thuần khiết! Nhanh tay nhặt chúng vào túi trước khi Bóng Ma làm hỏng." }
        ],
        postGame: [
            { character: 'monkey', text: "Đã thu thập đủ Mảnh Sao Băng. Sức mạnh ánh sáng trong chúng ta đang bùng cháy dữ dội!" }
        ]
    },
    359: {
        minigame: 'assemble_object',
        preGame: [
            { character: 'monkey', text: "Đài Thiên Văn Cổ đại dùng để định vị bóng tối đã bị Bóng Ma đập vỡ." },
            { character: 'monkey', text: "Hãy gõ phím ráp các bánh răng và thấu kính lại để khôi phục Đài Thiên Văn nhé." }
        ],
        postGame: [
            { character: 'monkey', text: "Đài Thiên Văn đã hoạt động trở lại! Nó đang chiếu tia sáng thẳng về phía sào huyệt của Bóng Ma." }
        ]
    },
    360: {
        minigame: 'clear_fog',
        preGame: [
            { character: 'boss', text: "Kẻ nào dám đến tận đây! Màn sương vĩnh hằng này sẽ bòn rút cạn kiệt sinh khí của các ngươi!" },
            { character: 'monkey', text: "Đừng lùi bước! Gõ thật nhanh tạo luồng sóng ánh sáng mạnh mẽ nhất để xé toạc màn sương này!" }
        ],
        postGame: [
            { character: 'monkey', text: "Màn sương vĩnh hằng tan biến thành những vệt sáng. Cổng vào sào huyệt cuối cùng đã mở ra!" }
        ]
    },
    361: {
        minigame: 'bubble_shooter',
        preGame: [
            { character: 'monkey', text: "Hắn đang điên cuồng triệu hồi một cơn mưa sao băng đen trút xuống đầu chúng ta." },
            { character: 'monkey', text: "Ngắm thật chuẩn và bắn nát những khối sao băng hắc ám đó giữa không trung để dọn đường!" }
        ],
        postGame: [
            { character: 'monkey', text: "Cơn mưa sao băng đen đã bị chặn đứng hoàn toàn. Bóng Ma đã hết đường chống cự." }
        ]
    },
    362: {
        minigame: 'assemble_object',
        preGame: [
            { character: 'monkey', text: "Trận chiến quyết định sắp bắt đầu. Chúng ta cần một vũ khí mang sức mạnh của Đêm Huyền Bí." },
            { character: 'monkey', text: "Hãy ráp những Mảnh Sao Băng lại thành chiếc Khiên Nguyệt Thực tỏa sáng rực rỡ nhất!" }
        ],
        postGame: [
            { character: 'monkey', text: "Khiên Nguyệt Thực đã sẵn sàng, đánh tan mọi bóng tối xung quanh! Tiến lên phong ấn Bóng Ma thôi!" }
        ]
    },
    // Lesson 364 - 376 (Group: Đêm sao, Chapter 27:  'Sao băng', Boss: Bóng Ma)
    364: {
        minigame: 'clear_fog',
        preGame: [
            { character: 'monkey', text: "Đỉnh đồi này là nơi ngắm Sao Băng tuyệt nhất! Nhưng sao lại có một màn sương đen kịt đang kéo đến?" },
            { character: 'boss', text: "Khà khà! Bầu trời đêm rực rỡ này sẽ bị bóng tối của ta nuốt chửng, không một vì sao nào lọt qua được!" },
            { character: 'monkey', text: "Không thể nào! Hãy gõ phím tạo ra cơn lốc ánh sáng để thổi bay màn sương hắc ám này đi!" }
        ],
        postGame: [
            { character: 'monkey', text: "Tuyệt quá, sương đen đã tan! Bầu trời Sao Băng đã hiện ra lấp lánh như một bức tranh." }
        ]
    },
    365: {
        minigame: 'rescue_animals',
        preGame: [
            { character: 'monkey', text: "Nguy rồi! Bóng Ma đã dùng lưới hư không để trói chặt bạn Sao Băng Nhỏ đang bay tới." },
            { character: 'monkey', text: "Nhanh tay gõ đúng các từ phép thuật để cắt đứt tấm lưới và giải cứu bạn ấy ngay!" }
        ],
        postGame: [
            { character: 'monkey', text: "Sao Băng Nhỏ đã vút bay tự do trên bầu trời, để lại một vệt sáng thật đẹp. Cảm ơn bạn!" }
        ]
    },
    366: {
        minigame: 'bubble_shooter',
        preGame: [
            { character: 'boss', text: "Các ngươi sẽ bị giam cầm trong khoảng không vô tận! Nhận lấy những quả cầu hố đen này!" },
            { character: 'monkey', text: "Cẩn thận! Ngắm thật chuẩn và bắn vỡ những quả cầu hố đen trước khi chúng hút cạn ánh sáng của chúng ta!" }
        ],
        postGame: [
            { character: 'monkey', text: "Những quả cầu hố đen đã nổ tung thành bụi vũ trụ vô hại. Bóng Ma không dọa được chúng ta đâu." }
        ]
    },
    367: {
        minigame: 'whack_mole',
        preGame: [
            { character: 'monkey', text: "Lũ dơi không gian tay sai của Bóng Ma đang chui ra từ các vết nứt không gian để cắn xé các đám mây sao." },
            { character: 'monkey', text: "Cầm búa lên, gõ trúng đầu lũ dơi để đuổi chúng đi, bảo vệ bầu trời yên bình!" }
        ],
        postGame: [
            { character: 'monkey', text: "Lũ dơi đã khiếp sợ bay tán loạn. Các đám mây sao vẫn an toàn và lấp lánh." }
        ]
    },
    368: {
        minigame: 'racing',
        preGame: [
            { character: 'monkey', text: "Bóng Ma đang hóa thành luồng khí đen lướt đi giữa cơn mưa sao băng để tẩu thoát." },
            { character: 'monkey', text: "Cùng cưỡi lên một Vệt Sao Băng rực rỡ nhất, tăng tốc đuổi theo hắn xé gió nào!" }
        ],
        postGame: [
            { character: 'monkey', text: "Tốc độ của Sao Băng thật đáng kinh ngạc! Chúng ta đang áp sát Bóng Ma rồi." }
        ]
    },
    369: {
        minigame: 'grow_plant',
        preGame: [
            { character: 'monkey', text: "Một khoảng không tối tăm không đáy đang chắn ngang đường. Chúng ta không thể nhảy qua." },
            { character: 'monkey', text: "Hãy gieo cây Ngàn sao, gõ đúng để một Cây Ngàn Sao mọc vút lên làm cầu vắt ngang vực!" }
        ],
        postGame: [
            { character: 'monkey', text: "Cây Ngàn Sao tỏa sáng rực rỡ và vô cùng vững chãi. Cùng bước qua cầu thật cẩn thận nhé." }
        ]
    },
    370: {
        minigame: 'catch_insects',
        preGame: [
            { character: 'monkey', text: "Con đường phía trước đã bị Bóng Ma rút cạn ánh sáng, tối đen như mực." },
            { character: 'monkey', text: "Dùng vợt vung thật khéo để bắt những Tinh Linh Sao Băng nhỏ xíu vào lọ thắp sáng xung quanh." }
        ],
        postGame: [
            { character: 'monkey', text: "Lọ Tinh Linh rực sáng như một ngôi sao thu nhỏ! Bóng tối đã bị xua tan hoàn toàn." }
        ]
    },
    371: {
        minigame: 'frog_jump',
        preGame: [
            { character: 'monkey', text: "Chúng ta phải bước qua những tảng thiên thạch lơ lửng bập bềnh này để tiến lên." },
            { character: 'monkey', text: "Gõ đúng nhịp để nhảy thật khéo qua các tảng đá vững chắc nhất, đừng để bước hụt vào khoảng không!" }
        ],
        postGame: [
            { character: 'monkey', text: "Tuyệt vời! Những bước nhảy rất linh hoạt đã đưa chúng ta vượt qua bãi thiên thạch an toàn." }
        ]
    },
    372: {
        minigame: 'collect_items',
        preGame: [
            { character: 'boss', text: "Ta sẽ nghiền nát những Tinh Thể Sao Băng này! Các ngươi sẽ không có chút năng lượng nào!" },
            { character: 'monkey', text: "Tinh Thể Sao Băng chứa sức mạnh vô tận! Nhanh tay nhặt chúng vào túi trước khi bị phá hủy." }
        ],
        postGame: [
            { character: 'monkey', text: "Đã thu thập đầy túi Tinh Thể Sao Băng. Sức mạnh trong chúng ta đang bùng lên mạnh mẽ!" }
        ]
    },
    373: {
        minigame: 'assemble_object',
        preGame: [
            { character: 'monkey', text: "Cỗ Xe Ngôi Sao của thần đêm đã bị Bóng Ma đập vỡ thành nhiều mảnh." },
            { character: 'monkey', text: "Hãy gõ phím ráp các mảnh tinh thạch lại để sửa Cỗ Xe, mở đường đến sào huyệt của hắn nhé." }
        ],
        postGame: [
            { character: 'monkey', text: "Cỗ Xe Ngôi Sao đã hoàn chỉnh và phát ra luồng sáng chỉ đường tuyệt đẹp. Tiến lên thôi!" }
        ]
    },
    374: {
        minigame: 'clear_fog',
        preGame: [
            { character: 'boss', text: "Ngu ngốc! Cơn bão bụi vũ trụ này sẽ chôn vùi các ngươi mãi mãi trong bóng tối!" },
            { character: 'monkey', text: "Sức ép lớn quá! Gõ thật nhanh tạo luồng sóng ánh sáng cực mạnh xé toạc cơn bão bụi này ngay!" }
        ],
        postGame: [
            { character: 'monkey', text: "Bão bụi vũ trụ tan biến thành hư vô. Cổng vào sào huyệt hắc ám của Bóng Ma đã lộ diện!" }
        ]
    },
    375: {
        minigame: 'bubble_shooter',
        preGame: [
            { character: 'monkey', text: "Hắn đang điên cuồng trút xuống những trận mưa sao băng đen sắc nhọn!" },
            { character: 'monkey', text: "Ngắm thật chuẩn, bắn nát những khối sao băng hắc ám đó giữa không trung để bảo vệ mọi người!" }
        ],
        postGame: [
            { character: 'monkey', text: "Mọi khối sao băng đen đều bị phá hủy. Bóng Ma đã hết cách chống cự rồi." }
        ]
    },
    376: {
        minigame: 'assemble_object',
        preGame: [
            { character: 'monkey', text: "Trận chiến cuối cùng sắp bắt đầu. Chúng ta cần một vũ khí hội tụ ánh sáng của hàng vạn vì sao." },
            { character: 'monkey', text: "Hãy ráp những Tinh Thể Sao Băng lại thành chiếc Khiên Thiên Thạch chói lòa bất khả chiến bại!" }
        ],
        postGame: [
            { character: 'monkey', text: "Khiên Thiên Thạch rực sáng đánh tan mọi bóng tối của Bóng Ma! Cầm lấy nó và kết thúc trận chiến này thôi!" }
        ]
    },
    // Lesson 378 - 390 (Group: Đêm sao, Chapter 28:  'Dải ngân hà', Boss: Bóng Ma)
    378: {
        minigame: 'clear_fog',
        preGame: [
            { character: 'monkey', text: "Chúng ta đã tiến vào Dải Ngân Hà! Nhưng Bóng Ma đã phun khói đen che khuất dải sáng tuyệt đẹp này rồi." },
            { character: 'boss', text: "Khà khà! Dải Ngân Hà rực rỡ giờ chỉ còn là một dòng sông tăm tối vô tận!" },
            { character: 'monkey', text: "Gõ phím thật nhanh tạo gió lốc vũ trụ thổi bay đám khói đen này đi!" }
        ],
        postGame: [
            { character: 'monkey', text: "Đám khói đen đã tan biến! Dải Ngân Hà hiện ra lấp lánh rực rỡ như một dải lụa phát sáng." }
        ]
    },
    379: {
        minigame: 'rescue_animals',
        preGame: [
            { character: 'monkey', text: "Nhìn kìa! Bóng Ma đã dùng xích hư không trói chặt bạn Cá Heo Không Gian lại." },
            { character: 'monkey', text: "Hãy gõ đúng để phá vỡ sợi xích bóng tối và giải cứu Cá Heo Không Gian nhé!" }
        ],
        postGame: [
            { character: 'monkey', text: "Cá Heo Không Gian đã được tự do bơi lội giữa dòng sông sao. Cậu ấy đang hát khúc ca cảm ơn kìa." }
        ]
    },
    380: {
        minigame: 'bubble_shooter',
        preGame: [
            { character: 'boss', text: "Nhận lấy những quả cầu hố đen này! Mọi ánh sáng sẽ bị nuốt chửng!" },
            { character: 'monkey', text: "Cẩn thận! Ngắm bắn vỡ các quả cầu hố đen ngay trước khi chúng hút cạn năng lượng của chúng ta!" }
        ],
        postGame: [
            { character: 'monkey', text: "Những quả cầu hố đen đã nổ tung thành bụi vũ trụ. Ánh sáng của chúng ta vẫn vẹn nguyên." }
        ]
    },
    381: {
        minigame: 'whack_mole',
        preGame: [
            { character: 'monkey', text: "Lũ dơi vũ trụ tay sai của Bóng Ma đang bám vào các hành tinh nhỏ định ăn cắp lõi ánh sáng." },
            { character: 'monkey', text: "Nhanh tay cầm búa, gõ trúng đích đuổi lũ dơi đi để bảo vệ các hành tinh nhỏ nhé!" }
        ],
        postGame: [
            { character: 'monkey', text: "Bầy dơi đã khiếp sợ bay tán loạn. Các hành tinh nhỏ lại tiếp tục tỏa sáng bình yên." }
        ]
    },
    382: {
        minigame: 'racing',
        preGame: [
            { character: 'monkey', text: "Bóng Ma đang hóa thành một luồng hắc ín lướt dọc theo Dải Ngân Hà để trốn thoát." },
            { character: 'monkey', text: "Cùng cưỡi lên Tàu Lượn Tinh Tú, tăng tốc đuổi theo hắn thật nhanh nào!" }
        ],
        postGame: [
            { character: 'monkey', text: "Tốc độ của Tàu Lượn thật đáng kinh ngạc! Chúng ta đang bám sát Bóng Ma rồi." }
        ]
    },
    383: {
        minigame: 'grow_plant',
        preGame: [
            { character: 'monkey', text: "Một vết nứt không gian khổng lồ chắn ngang đường, không thể bay qua được." },
            { character: 'monkey', text: "Gieo hạt cây Ngàn sao, gõ đúng để một Cây Ngàn Sao mọc vút lên làm cầu vắt ngang vết nứt!" }
        ],
        postGame: [
            { character: 'monkey', text: "Cây Ngàn Sao tỏa sáng rực rỡ và vô cùng vững chãi. Cùng bước qua cầu ánh sáng thật cẩn thận nhé." }
        ]
    },
    384: {
        minigame: 'catch_insects',
        preGame: [
            { character: 'monkey', text: "Khu vực này bị các tinh vân tối bao phủ, không có chút ánh sáng nào lọt qua." },
            { character: 'monkey', text: "Dùng vợt bắt những Tinh Linh Ánh Sáng lấp lánh vào lọ để soi sáng con đường phía trước." }
        ],
        postGame: [
            { character: 'monkey', text: "Lọ Tinh Linh rực sáng như một ngôi sao rực rỡ! Bóng tối đã hoàn toàn lùi bước." }
        ]
    },
    385: {
        minigame: 'frog_jump',
        preGame: [
            { character: 'monkey', text: "Phía trước là một bãi thiên thạch vụn lơ lửng bập bềnh, bước sai là sẽ rơi vào hư vô." },
            { character: 'monkey', text: "Gõ đúng nhịp để nhảy thật khéo qua các tảng đá vững chắc nhất, đừng để rơi xuống nhé!" }
        ],
        postGame: [
            { character: 'monkey', text: "Thật nhịp nhàng! Đôi chân linh hoạt đã giúp chúng ta vượt qua bãi thiên thạch an toàn." }
        ]
    },
    386: {
        minigame: 'collect_items',
        preGame: [
            { character: 'boss', text: "Ta sẽ nghiền nát những Bụi Sao Ngân Hà này! Các ngươi sẽ kiệt quệ sức lực!" },
            { character: 'monkey', text: "Bụi Sao Ngân Hà chứa phép thuật vô tận! Nhanh tay nhặt chúng vào túi trước khi bị phá hủy." }
        ],
        postGame: [
            { character: 'monkey', text: "Đã thu thập đầy túi Bụi Sao Ngân Hà. Sức mạnh trong chúng ta đang bùng lên mạnh mẽ!" }
        ]
    },
    387: {
        minigame: 'assemble_object',
        preGame: [
            { character: 'monkey', text: "Chiếc Thuyền Sao dẫn đường qua dòng chảy ngân hà đã bị Bóng Ma đập vỡ bánh lái rồi." },
            { character: 'monkey', text: "Hãy gõ phím ráp các mảnh thiên thạch lại để sửa Thuyền Sao, tiến thẳng đến sào huyệt của hắn." }
        ],
        postGame: [
            { character: 'monkey', text: "Thuyền Sao đã hoàn chỉnh và phát ra luồng sáng chỉ đường tuyệt đẹp. Tiến lên thôi!" }
        ]
    },
    388: {
        minigame: 'clear_fog',
        preGame: [
            { character: 'boss', text: "Các ngươi lỳ lợm thật! Cơn bão bóng đêm vũ trụ này sẽ là điểm kết thúc của các ngươi!" },
            { character: 'monkey', text: "Đừng lùi bước! Gõ phím tạo lốc xoáy ánh sáng cực mạnh xé toạc cơn bão bóng đêm này ngay!" }
        ],
        postGame: [
            { character: 'monkey', text: "Bão bóng đêm tan biến thành hư vô. Cổng vào sào huyệt hắc ám của Bóng Ma đã lộ diện ở trung tâm Dải Ngân Hà!" }
        ]
    },
    389: {
        minigame: 'bubble_shooter',
        preGame: [
            { character: 'monkey', text: "Hắn đang điên cuồng phóng những tảng thiên thạch hắc ám rực lửa đen về phía chúng ta." },
            { character: 'monkey', text: "Ngắm thật chuẩn và bắn nát những tảng thiên thạch đó giữa không trung để dọn đường!" }
        ],
        postGame: [
            { character: 'monkey', text: "Mọi khối thiên thạch đen đều bị phá hủy. Bóng Ma đã hết bài để phòng thủ rồi." }
        ]
    },
    390: {
        minigame: 'assemble_object',
        preGame: [
            { character: 'monkey', text: "Trận chiến cuối cùng đã đến. Chúng ta cần sức mạnh phòng ngự từ trung tâm Dải Ngân Hà." },
            { character: 'monkey', text: "Hãy ráp những mảnh Tinh Thể Ngân Hà lại thành chiếc Khiên Vũ Trụ chói lòa bất khả chiến bại!" }
        ],
        postGame: [
            { character: 'monkey', text: "Khiên Vũ Trụ rực sáng đánh tan mọi bóng tối của Bóng Ma! Cầm lấy nó và mang lại bình yên cho bầu trời đêm thôi!" }
        ]
    },
    // Lesson 392 - 404 (Group: Biển khơi, Chapter 29:  'Bãi cát', Boss: Cá Mập)
    392: {
        minigame: 'clear_fog',
        preGame: [
            { character: 'monkey', text: "Đến Bãi Cát rồi, nhưng sương mù biển dày đặc quá, không thấy đường bờ biển đâu cả!" },
            { character: 'boss', text: "Khà khà! Ta đã mang sương mù đến để che mắt các ngươi. Nơi này là lãnh địa của Cá Mập ta!" },
            { character: 'monkey', text: "Đừng hòng làm khó chúng ta! Gõ phím tạo gió biển thổi bay màn sương mù này ngay thôi!" }
        ],
        postGame: [
            { character: 'monkey', text: "Sương mù đã tan biến. Bãi Cát vàng ươm hiện ra thật đẹp, nhưng chúng ta phải cảnh giác." }
        ]
    },
    393: {
        minigame: 'rescue_animals',
        preGame: [
            { character: 'monkey', text: "Trời ơi! Cá Mập đã dùng lưới đánh cá rách trói chặt bạn Cua Đá trên bãi cát kìa." },
            { character: 'monkey', text: "Nhanh tay gõ phím để cắt đứt tấm lưới và giải cứu bạn Cua Đá tội nghiệp ra ngoài!" }
        ],
        postGame: [
            { character: 'monkey', text: "Cua Đá đã được tự do bò ngang về hang. Cá Mập thật xấu tính với cư dân bãi biển!" }
        ]
    },
    394: {
        minigame: 'bubble_shooter',
        preGame: [
            { character: 'boss', text: "Nếm thử những quả bóng nước muối mặn chát của ta đi! Các ngươi sẽ phải bỏ cuộc!" },
            { character: 'monkey', text: "Hắn đang phun bóng nước từ dưới biển lên! Ngắm bắn vỡ chúng trước khi chúng rơi trúng đầu chúng ta!" }
        ],
        postGame: [
            { character: 'monkey', text: "Những quả bóng nước đã vỡ tan tành. Bãi cát vẫn khô ráo và an toàn." }
        ]
    },
    395: {
        minigame: 'whack_mole',
        preGame: [
            { character: 'monkey', text: "Lũ cua tay sai của Cá Mập đang đào bới hỏng hết các lâu đài cát." },
            { character: 'monkey', text: "Cầm búa lên và gõ trúng chúng để đuổi chúng đi, bảo vệ bãi biển sạch đẹp nhé!" }
        ],
        postGame: [
            { character: 'monkey', text: "Lũ cua đã hoảng sợ chui tọt xuống cát. Lâu đài cát vẫn còn nguyên vẹn." }
        ]
    },
    396: {
        minigame: 'racing',
        preGame: [
            { character: 'monkey', text: "Cá Mập đang bơi dọc theo bờ biển để bỏ trốn. Chúng ta phải đuổi theo hắn!" },
            { character: 'monkey', text: "Cùng nhảy lên ván lướt sóng, gõ phím tăng tốc lướt trên những ngọn sóng đuổi theo nào!" }
        ],
        postGame: [
            { character: 'monkey', text: "Lướt sóng thật tuyệt vời! Chúng ta đang bám rất sát chiếc vây lưng của Cá Mập." }
        ]
    },
    397: {
        minigame: 'grow_plant',
        preGame: [
            { character: 'monkey', text: "Một vũng nước thủy triều sâu ngập đầy sứa độc cản đường. Không thể lội qua được." },
            { character: 'monkey', text: "Hãy gieo hạt cây Ngàn sao, gõ đúng để một Cây Ngàn Sao mọc ngả ngang làm chiếc cầu bắc qua vũng nước!" }
        ],
        postGame: [
            { character: 'monkey', text: "Thân cây Ngàn sao rất cong và vững chắc. Cùng bước qua cầu cẩn thận để không rơi xuống nhé." }
        ]
    },
    398: {
        minigame: 'catch_insects',
        preGame: [
            { character: 'monkey', text: "Trời đã tối dần, bãi cát dưới bóng rặng phi lao hoàn toàn không có ánh sáng." },
            { character: 'monkey', text: "Dùng vợt bắt những bạn sứa phát sáng dạt vào bờ cho vào lọ để soi đường đi tiếp." }
        ],
        postGame: [
            { character: 'monkey', text: "Lọ sứa phát ra ánh sáng xanh lam dịu mát. Không gian xung quanh đã sáng tỏ hơn." }
        ]
    },
    399: {
        minigame: 'frog_jump',
        preGame: [
            { character: 'monkey', text: "Phía trước là bãi đá ngầm đầy rêu xanh trơn trượt nhô lên khỏi mặt cát." },
            { character: 'monkey', text: "Gõ đúng nhịp để nhảy thật khéo qua các tảng đá, đừng để trượt chân ngã đau nhé!" }
        ],
        postGame: [
            { character: 'monkey', text: "Bước nhảy rất chính xác! Đôi chân linh hoạt đã giúp chúng ta vượt qua bãi đá ngầm an toàn." }
        ]
    },
    400: {
        minigame: 'collect_items',
        preGame: [
            { character: 'boss', text: "Ta sẽ quẫy đuôi hất tung những vỏ Sò Phép Thuật này xuống biển sâu!" },
            { character: 'monkey', text: "Vỏ Sò Phép Thuật chứa năng lượng đại dương! Nhanh tay nhặt chúng vào giỏ trước khi bị cuốn đi." }
        ],
        postGame: [
            { character: 'monkey', text: "Đã thu thập đầy giỏ Vỏ Sò. Năng lượng biển cả đang tiếp thêm sức mạnh cho chúng ta!" }
        ]
    },
    401: {
        minigame: 'assemble_object',
        preGame: [
            { character: 'monkey', text: "Chiếc bè gỗ của bác Hải Âu bị Cá Mập đớp vỡ tung tóe trên bãi cát." },
            { character: 'monkey', text: "Hãy gõ phím ráp các khúc gỗ và dây thừng lại để sửa chiếc bè giúp bác ấy nhé." }
        ],
        postGame: [
            { character: 'monkey', text: "Chiếc bè đã được buộc chặt chẽ trở lại. Bác Hải Âu chỉ cho chúng ta hướng đi của Cá Mập." }
        ]
    },
    402: {
        minigame: 'clear_fog',
        preGame: [
            { character: 'boss', text: "Ngu ngốc! Cơn bão cát bờ biển này sẽ chôn vùi các ngươi vĩnh viễn!" },
            { character: 'monkey', text: "Cát bay rát mặt quá! Gõ thật nhanh tạo luồng gió lốc xé toạc cơn bão cát này ngay lập tức!" }
        ],
        postGame: [
            { character: 'monkey', text: "Bão cát đã tan biến. Sào huyệt của Cá Mập nằm ngay trong hang đá ngầm phía trước!" }
        ]
    },
    403: {
        minigame: 'bubble_shooter',
        preGame: [
            { character: 'monkey', text: "Hắn đang điên cuồng dùng đuôi hất những quả cầu gai biển sắc nhọn về phía chúng ta." },
            { character: 'monkey', text: "Ngắm thật chuẩn và bắn nát những quả cầu gai đó giữa không trung để mở đường tiến lên!" }
        ],
        postGame: [
            { character: 'monkey', text: "Gai biển vỡ vụn thành cát. Cá Mập đã không còn gì để tấn công từ xa nữa." }
        ]
    },
    404: {
        minigame: 'assemble_object',
        preGame: [
            { character: 'monkey', text: "Cá Mập đang há chiếc mõm đầy răng nhọn chờ sẵn. Chúng ta cần lớp phòng ngự cứng cáp nhất." },
            { character: 'monkey', text: "Hãy ráp những mảnh mai rùa biển khổng lồ lại thành chiếc Khiên Mai Rùa bất khả chiến bại!" }
        ],
        postGame: [
            { character: 'monkey', text: "Khiên Mai Rùa kiên cố đã sẵn sàng! Cầm lấy nó và tiến lên đánh bại Cá Mập thôi!" }
        ]
    },
    // Lesson 406 - 418 (Group: Biển khơi, Chapter 30:  'Còng cát', Boss: Cá Mập)
    406: {
        minigame: 'clear_fog',
        preGame: [
            { character: 'monkey', text: "Chúng ta đã đến Bãi Còng Cát rồi! Nhưng sương mù biển dày đặc quá, không thấy đường đi." },
            { character: 'boss', text: "Khà khà! Bãi biển này đã bị ta phong tỏa. Lũ còng nhãi nhép và các ngươi sẽ không thoát được đâu!" },
            { character: 'monkey', text: "Đừng hòng làm càn! Hãy gõ phím tạo gió biển thổi bay màn sương mù này ngay thôi!" }
        ],
        postGame: [
            { character: 'monkey', text: "Sương mù đã tan biến. Hàng ngàn chú còng cát đang chạy quanh bãi biển thật nhộn nhịp." }
        ]
    },
    407: {
        minigame: 'rescue_animals',
        preGame: [
            { character: 'monkey', text: "Nguy rồi! Cá Mập đã vứt một tấm lưới nilon gai góc trói chặt bạn Còng Cát Nhỏ kìa." },
            { character: 'monkey', text: "Nhanh tay gõ phím thật chính xác để cắt đứt tấm lưới và giải cứu bạn ấy ra ngoài!" }
        ],
        postGame: [
            { character: 'monkey', text: "Còng Cát Nhỏ đã thoát ra và nhanh thoăn thoắt chui tọt xuống hang an toàn. Làm tốt lắm!" }
        ]
    },
    408: {
        minigame: 'bubble_shooter',
        preGame: [
            { character: 'boss', text: "Nhận lấy những quả bóng nước xoáy mặn chát của ta đi! Các ngươi sẽ bị cuốn trôi!" },
            { character: 'monkey', text: "Hắn đang phun bóng nước từ dưới biển lên! Ngắm bắn vỡ chúng trước khi chúng rơi trúng đầu chúng ta!" }
        ],
        postGame: [
            { character: 'monkey', text: "Những quả bóng nước đã vỡ tan tành thành bọt biển. Bãi cát vẫn khô ráo và an toàn." }
        ]
    },
    409: {
        minigame: 'whack_mole',
        preGame: [
            { character: 'monkey', text: "Lũ cua biển hung dữ tay sai của Cá Mập đang bò tới định cướp thức ăn của bầy còng." },
            { character: 'monkey', text: "Cầm búa lên và gõ trúng đích để đánh đuổi lũ cua biển đi, bảo vệ bãi còng nhé!" }
        ],
        postGame: [
            { character: 'monkey', text: "Lũ cua biển đã hoảng sợ bò chạy tán loạn. Bãi biển lại yên bình." }
        ]
    },
    410: {
        minigame: 'racing',
        preGame: [
            { character: 'monkey', text: "Cá Mập đang bơi men theo bờ biển để lẩn trốn. Chúng ta phải đuổi theo hắn!" },
            { character: 'monkey', text: "Cùng nhảy lên lưng Còng Cát Khổng Lồ, gõ phím tăng tốc chạy ngang thật nhanh đuổi theo nào!" }
        ],
        postGame: [
            { character: 'monkey', text: "Tốc độ chạy ngang của Còng Cát thật vô địch! Chúng ta đang bám rất sát Cá Mập." }
        ]
    },
    411: {
        minigame: 'grow_plant',
        preGame: [
            { character: 'monkey', text: "Một lạch nước sâu ngập đầy sứa độc cản đường. Chúng ta không thể lội qua được." },
            { character: 'monkey', text: "Hãy gieo hạt cây Hoa thần kỳ, gõ đúng để cây vươn dài thành chiếc cầu bắc qua lạch nước!" }
        ],
        postGame: [
            { character: 'monkey', text: "Cầu Hoa rất dai và vững chắc. Cùng bước qua cầu cẩn thận để không rơi xuống nhé." }
        ]
    },
    412: {
        minigame: 'catch_insects',
        preGame: [
            { character: 'monkey', text: "Trời tối dần, hang động ven biển này lại không có chút ánh sáng nào lọt vào." },
            { character: 'monkey', text: "Dùng vợt vung thật khéo để bắt những sinh vật phù du phát sáng dạt vào bờ để soi đường đi tiếp." }
        ],
        postGame: [
            { character: 'monkey', text: "Lọ phù du phát ra ánh sáng xanh lam huyền ảo. Hang động đã sáng tỏ hơn rất nhiều." }
        ]
    },
    413: {
        minigame: 'frog_jump',
        preGame: [
            { character: 'monkey', text: "Phía trước là những ụ cát nhỏ nhô lên giữa dòng thủy triều đang lên nhanh." },
            { character: 'monkey', text: "Gõ đúng nhịp để nhảy thật khéo qua các ụ cát, đừng để trượt chân rớt xuống dòng nước xoáy!" }
        ],
        postGame: [
            { character: 'monkey', text: "Bước nhảy rất chính xác! Đôi chân linh hoạt đã giúp chúng ta băng qua vùng nước an toàn." }
        ]
    },
    414: {
        minigame: 'collect_items',
        preGame: [
            { character: 'boss', text: "Ta sẽ quẫy đuôi hất tung những viên Ngọc Trai này xuống đáy sâu, đừng hòng lấy được!" },
            { character: 'monkey', text: "Ngọc Trai chứa năng lượng đại dương vô tận! Nhanh tay nhặt chúng vào giỏ trước khi bị cuốn đi." }
        ],
        postGame: [
            { character: 'monkey', text: "Đã thu thập đầy giỏ Ngọc Trai. Sức mạnh của biển cả đang bùng lên trong chúng ta!" }
        ]
    },
    415: {
        minigame: 'assemble_object',
        preGame: [
            { character: 'monkey', text: "Chiếc xe kéo bằng vỏ ốc của bác Còng Trưởng Bản bị Cá Mập đập vỡ nát trên bãi cát." },
            { character: 'monkey', text: "Hãy gõ phím ráp các mảnh vỏ ốc và rong biển lại để sửa chiếc xe giúp bác ấy nhé." }
        ],
        postGame: [
            { character: 'monkey', text: "Chiếc xe đã được sửa chữa nguyên vẹn. Bác Còng chỉ cho chúng ta đường tắt tới hang ổ của Cá Mập." }
        ]
    },
    416: {
        minigame: 'clear_fog',
        preGame: [
            { character: 'boss', text: "Kẻ nào dám tới đây! Cơn cuồng phong vòi rồng này sẽ cuốn phăng các ngươi ra ngoài khơi!" },
            { character: 'monkey', text: "Gió giật mạnh quá! Gõ thật nhanh tạo luồng sóng âm đánh tan cơn vòi rồng này ngay lập tức!" }
        ],
        postGame: [
            { character: 'monkey', text: "Vòi rồng đã tan biến thành những hạt mưa nhỏ. Sào huyệt của Cá Mập nằm ngay trong hang đá ngầm phía trước!" }
        ]
    },
    417: {
        minigame: 'bubble_shooter',
        preGame: [
            { character: 'monkey', text: "Hắn đang điên cuồng hất những khối san hô gai nhọn hoắt về phía chúng ta." },
            { character: 'monkey', text: "Ngắm thật chuẩn và bắn nát những khối san hô gai đó giữa không trung để mở đường tiến lên!" }
        ],
        postGame: [
            { character: 'monkey', text: "San hô gai vỡ vụn thành cát bụi. Cá Mập đã không còn vũ khí để tấn công từ xa nữa." }
        ]
    },
    418: {
        minigame: 'assemble_object',
        preGame: [
            { character: 'monkey', text: "Cá Mập đang nhe nanh chờ sẵn. Chúng ta cần lớp phòng ngự cứng cáp nhất từ Bãi Còng Cát." },
            { character: 'monkey', text: "Hãy ráp những chiếc càng cua khổng lồ lại thành chiếc Khiên Gọng Kìm bất khả chiến bại!" }
        ],
        postGame: [
            { character: 'monkey', text: "Khiên Gọng Kìm kiên cố đã sẵn sàng! Cầm lấy nó và tiến lên dạy cho Cá Mập một bài học nhớ đời thôi!" }
        ]
    },
    // Lesson 420 - 432 (Group: Biển khơi, Chapter 31:  'Vỏ ốc', Boss: Cá Mập)
    420: {
        minigame: 'clear_fog',
        preGame: [
            { character: 'monkey', text: "Đảo Vỏ Ốc đây rồi! Nhưng sương mù biển dày quá, không thấy những chiếc vỏ ốc khổng lồ đâu." },
            { character: 'boss', text: "Khà khà! Các ngươi sẽ lạc lối vĩnh viễn trong vương quốc vỏ ốc của ta!" },
            { character: 'monkey', text: "Đừng hòng! Gõ phím thật nhanh tạo luồng gió biển thổi tan sương mù này ngay!" }
        ],
        postGame: [
            { character: 'monkey', text: "Sương mù đã tan. Bãi biển trải dài vô số chiếc vỏ ốc lấp lánh tuyệt đẹp, tiến lên thôi!" }
        ]
    },
    421: {
        minigame: 'rescue_animals',
        preGame: [
            { character: 'monkey', text: "Nguy rồi! Cá Mập đã nhốt bạn Ốc Mượn Hồn vào một chiếc lồng rong biển gai." },
            { character: 'monkey', text: "Nhanh tay gõ phím thật chính xác để cắt đứt lồng rong biển và giải cứu bạn Ốc ra ngoài!" }
        ],
        postGame: [
            { character: 'monkey', text: "Ốc Mượn Hồn đã an toàn bò về vũng nước trong. Chúng ta phải ngăn Cá Mập lại!" }
        ]
    },
    422: {
        minigame: 'bubble_shooter',
        preGame: [
            { character: 'boss', text: "Nhận lấy những quả bóng nước xoáy từ đáy biển sâu của ta đi!" },
            { character: 'monkey', text: "Hắn đang phun bóng nước liên tục! Ngắm bắn vỡ chúng trước khi chúng đập trúng chúng ta!" }
        ],
        postGame: [
            { character: 'monkey', text: "Những quả bóng nước đã vỡ vụn. Đòn tấn công của hắn hoàn toàn vô hiệu." }
        ]
    },
    423: {
        minigame: 'whack_mole',
        preGame: [
            { character: 'monkey', text: "Lũ nhím biển tay sai của Cá Mập đang nấp trong các vỏ ốc rỗng để đâm lén." },
            { character: 'monkey', text: "Cầm búa lên, gõ trúng đích để đánh đuổi lũ nhím biển đi chỗ khác ngay lập tức!" }
        ],
        postGame: [
            { character: 'monkey', text: "Lũ nhím biển đã sợ hãi lăn lặn xuống đáy. Lối đi đã an toàn hơn." }
        ]
    },
    424: {
        minigame: 'racing',
        preGame: [
            { character: 'monkey', text: "Cá Mập đang bơi len lỏi qua các rạn san hô để trốn thoát." },
            { character: 'monkey', text: "Cùng bám vào vây bạn Cá Ngựa Khổng Lồ, tăng tốc lướt theo hắn ngay nào!" }
        ],
        postGame: [
            { character: 'monkey', text: "Cá Ngựa bơi thật nhanh và khéo léo! Hắn không thể trốn khỏi chúng ta." }
        ]
    },
    425: {
        minigame: 'grow_plant',
        preGame: [
            { character: 'monkey', text: "Một khe nứt sâu thẳm cản đường, chúng ta không thể bơi qua vùng nước xiết này." },
            { character: 'monkey', text: "Hãy gieo hạt giống cây Hoa thần kỳ, gõ đúng để cây mọc vươn ra làm cầu nối nhé!" }
        ],
        postGame: [
            { character: 'monkey', text: "Cây Hoa rất vững chắc. Cùng cẩn thận bước qua khe nứt nào." }
        ]
    },
    426: {
        minigame: 'catch_insects',
        preGame: [
            { character: 'monkey', text: "Hang động vỏ ốc này tối đen như mực, không có chút ánh sáng nào." },
            { character: 'monkey', text: "Dùng vợt vung thật khéo để bắt những bạn Sứa Phát Sáng dạt vào lồng kính để soi đường đi." }
        ],
        postGame: [
            { character: 'monkey', text: "Lồng kính chứa sứa phát ra ánh sáng rực rỡ. Hang động đã sáng tỏ rồi." }
        ]
    },
    427: {
        minigame: 'frog_jump',
        preGame: [
            { character: 'monkey', text: "Dưới chân là những chiếc vỏ ốc khổng lồ bập bềnh trên mặt nước biển." },
            { character: 'monkey', text: "Gõ đúng nhịp để nhảy thật khéo qua các vỏ ốc, tuyệt đối đừng để trượt chân nhé!" }
        ],
        postGame: [
            { character: 'monkey', text: "Bước nhảy rất nhịp nhàng! Đôi chân linh hoạt đã giúp chúng ta qua được dòng nước." }
        ]
    },
    428: {
        minigame: 'collect_items',
        preGame: [
            { character: 'boss', text: "Ta sẽ đập vỡ những viên Ngọc Trai này, các ngươi đừng mong lấy được sức mạnh!" },
            { character: 'monkey', text: "Ngọc Trai rất quý giá! Nhanh tay nhặt chúng vào giỏ trước khi bị Cá Mập phá hủy." }
        ],
        postGame: [
            { character: 'monkey', text: "Đã nhặt đủ Ngọc Trai. Sức mạnh đại dương đang tràn trề trong cơ thể chúng ta." }
        ]
    },
    429: {
        minigame: 'assemble_object',
        preGame: [
            { character: 'monkey', text: "Chiếc Tù Và Ốc của bác Rùa Biển bị Cá Mập cắn vỡ nát tươm rồi." },
            { character: 'monkey', text: "Hãy gõ phím ráp các mảnh vỏ ốc lại để sửa chiếc Tù Và giúp bác ấy gọi bầy nhé." }
        ],
        postGame: [
            { character: 'monkey', text: "Tù Và Ốc đã nguyên vẹn và vang lên âm thanh hào hùng. Bác Rùa chỉ đường cho chúng ta." }
        ]
    },
    430: {
        minigame: 'clear_fog',
        preGame: [
            { character: 'boss', text: "Ngoan cố lắm! Cơn lốc mực đen này sẽ che mắt các ngươi vĩnh viễn!" },
            { character: 'monkey', text: "Nước biển đục ngầu rồi! Gõ thật nhanh tạo dòng hải lưu cuốn trôi lốc mực đen này đi!" }
        ],
        postGame: [
            { character: 'monkey', text: "Làn nước đã trong xanh trở lại. Sào huyệt Vỏ Ốc Khổng Lồ của Cá Mập ngay đằng kia!" }
        ]
    },
    431: {
        minigame: 'bubble_shooter',
        preGame: [
            { character: 'monkey', text: "Hắn đang điên cuồng quẫy đuôi phóng những mảnh vỏ ốc sắc nhọn về phía chúng ta." },
            { character: 'monkey', text: "Tập trung cao độ! Ngắm thật chuẩn và bắn nát những mảnh vỏ ốc đó giữa không trung!" }
        ],
        postGame: [
            { character: 'monkey', text: "Các mảnh vỏ ốc vỡ vụn thành cát. Hắn không còn chướng ngại vật nào để ném nữa." }
        ]
    },
    432: {
        minigame: 'assemble_object',
        preGame: [
            { character: 'monkey', text: "Cá Mập đang há to miệng chờ sẵn. Chúng ta cần lớp giáp cứng nhất dưới đại dương." },
            { character: 'monkey', text: "Hãy ráp những mảnh Vỏ Ốc Xà Cừ lại thành chiếc Khiên Xà Cừ bất khả chiến bại!" }
        ],
        postGame: [
            { character: 'monkey', text: "Khiên Xà Cừ tỏa sáng lấp lánh vô cùng kiên cố! Cầm lấy vũ khí và lao vào đánh bại Cá Mập thôi!" }
        ]
    },
    // Lesson 434 - 446 (Group: Biển khơi, Chapter 32:  'San hô', Boss: Cá Mập)
    434: {
        minigame: 'clear_fog',
        preGame: [
            { character: 'monkey', text: "Đã đến Rạn San Hô, nhưng nước biển vẩn đục bùn cát quá!" },
            { character: 'boss', text: "Khà khà! Nơi này sẽ là mồ chôn của ngươi giữa những rạn san hô sắc nhọn!" },
            { character: 'monkey', text: "Gõ phím tạo dòng hải lưu cuốn trôi lớp bùn đất này đi để thấy rõ đường!" }
        ],
        postGame: [
            { character: 'monkey', text: "Nước đã trong vắt. Rạn san hô rực rỡ sắc màu hiện ra, nhưng cẩn thận kẻo đứt tay nhé." }
        ]
    },
    435: {
        minigame: 'rescue_animals',
        preGame: [
            { character: 'monkey', text: "Trời ơi! Cá Mập đã đẩy bạn Cá Hề mắc kẹt vào giữa lùm san hô lửa." },
            { character: 'monkey', text: "Nhanh tay gõ phím cắt đứt đám rong biển vướng víu để cứu bạn ấy ra ngoài!" }
        ],
        postGame: [
            { character: 'monkey', text: "Cá Hề đã tung tăng bơi về tổ hải quỳ an toàn. Cá Mập thật quá đáng!" }
        ]
    },
    436: {
        minigame: 'bubble_shooter',
        preGame: [
            { character: 'boss', text: "Đỡ lấy những quả cầu nọc độc san hô này đi! Các ngươi sẽ phải bỏ mạng!" },
            { character: 'monkey', text: "Nguy hiểm! Ngắm bắn vỡ những quả cầu độc trước khi chúng lan ra xung quanh!" }
        ],
        postGame: [
            { character: 'monkey', text: "Cầu độc đã nổ tung thành bọt nước vô hại. Khá khen cho sự nhanh nhẹn!" }
        ]
    },
    437: {
        minigame: 'whack_mole',
        preGame: [
            { character: 'monkey', text: "Lũ sao biển tay sai đang bò ra từ các hốc san hô để cản đường." },
            { character: 'monkey', text: "Cầm búa lên, gõ trúng đích để xua đuổi bầy sao biển ngay lập tức!" }
        ],
        postGame: [
            { character: 'monkey', text: "Bầy sao biển đã sợ hãi lẩn trốn vào hang. Lối đi đã an toàn hơn." }
        ]
    },
    438: {
        minigame: 'racing',
        preGame: [
            { character: 'monkey', text: "Cá Mập đang luồn lách qua các rạn san hô để tẩu thoát." },
            { character: 'monkey', text: "Bám chặt vào vây bạn Cá Heo và bơi thật nhanh đuổi theo hắn nào!" }
        ],
        postGame: [
            { character: 'monkey', text: "Cá Heo bơi lượn cực kỳ điêu luyện. Chúng ta đang bám sát đuôi Cá Mập rồi!" }
        ]
    },
    439: {
        minigame: 'grow_plant',
        preGame: [
            { character: 'monkey', text: "Một khe vực sâu hun hút dưới đáy biển chắn ngang đường đi." },
            { character: 'monkey', text: "Gieo hạt mầm Hoa thần kỳ, gõ phím để chúng lớn nhanh đan thành cây cầu bắc qua vực!" }
        ],
        postGame: [
            { character: 'monkey', text: "Cây Hoa vô cùng vững chắc. Cùng cẩn thận đi qua khe vực nhé." }
        ]
    },
    440: {
        minigame: 'catch_insects',
        preGame: [
            { character: 'monkey', text: "Hang động san hô này tối đen, hoàn toàn thiếu vắng ánh sáng mặt trời." },
            { character: 'monkey', text: "Vung vợt bắt những chú Sứa Phát Quang vào lọ để thắp sáng không gian xung quanh." }
        ],
        postGame: [
            { character: 'monkey', text: "Lọ sứa rực rỡ như một chiếc đèn lồng huyền ảo. Tiếp tục tiến lên thôi." }
        ]
    },
    441: {
        minigame: 'frog_jump',
        preGame: [
            { character: 'monkey', text: "Dưới chân là bãi san hô gai nhọn, chỉ có vài đài san hô nấm là nhẵn nhụi." },
            { character: 'monkey', text: "Gõ đúng nhịp để nhảy chuẩn xác lên các đài san hô nấm, tuyệt đối đừng bước hụt!" }
        ],
        postGame: [
            { character: 'monkey', text: "Bước nhảy hoàn hảo! Chúng ta đã an toàn vượt qua bãi gai sắc nhọn." }
        ]
    },
    442: {
        minigame: 'collect_items',
        preGame: [
            { character: 'boss', text: "Ta sẽ quẫy nát những viên Trân Châu San Hô này! Các ngươi sẽ cạn kiệt sinh lực!" },
            { character: 'monkey', text: "Trân Châu chứa năng lượng thuần khiết! Nhanh tay nhặt vào túi trước khi chúng bị phá hủy." }
        ],
        postGame: [
            { character: 'monkey', text: "Đã thu thập đủ Trân Châu. Sức mạnh của biển cả lại tràn trề trong cơ thể!" }
        ]
    },
    443: {
        minigame: 'assemble_object',
        preGame: [
            { character: 'monkey', text: "Chiếc lồng đèn san hô của bác Bạch Tuộc bị Cá Mập húc vỡ nát rồi." },
            { character: 'monkey', text: "Hãy gõ phím ráp các mảnh san hô phát sáng lại để sửa lồng đèn giúp bác ấy." }
        ],
        postGame: [
            { character: 'monkey', text: "Lồng đèn đã nguyên vẹn và sáng rực. Bác Bạch Tuộc chỉ cho chúng ta vị trí sào huyệt của hắn." }
        ]
    },
    444: {
        minigame: 'clear_fog',
        preGame: [
            { character: 'boss', text: "Đến tận đây cơ à? Cơn bão lốc xoáy dưới đáy biển này sẽ chôn vùi các ngươi!" },
            { character: 'monkey', text: "Nước biển cuộn xoáy mịt mù! Gõ thật nhanh tạo luồng sóng âm đánh tan cơn bão này!" }
        ],
        postGame: [
            { character: 'monkey', text: "Lốc xoáy đã tan biến. Sào huyệt san hô khổng lồ của Cá Mập đã lộ diện ngay trước mặt!" }
        ]
    },
    445: {
        minigame: 'bubble_shooter',
        preGame: [
            { character: 'monkey', text: "Hắn đang điên cuồng quẫy đuôi hất những mảng san hô sắc lẹm khổng lồ về phía chúng ta." },
            { character: 'monkey', text: "Ngắm thật chuẩn và bắn nát những mảng san hô đó giữa dòng nước để dọn đường!" }
        ],
        postGame: [
            { character: 'monkey', text: "San hô vỡ vụn thành những hạt cát nhỏ. Cá Mập không còn vũ khí nào để phòng thủ nữa." }
        ]
    },
    446: {
        minigame: 'assemble_object',
        preGame: [
            { character: 'monkey', text: "Trận chiến quyết định sắp bắt đầu. Chúng ta cần một tấm khiên cứng nhất đại dương." },
            { character: 'monkey', text: "Hãy ráp những khối San Hô Kim Cương lại thành chiếc Khiên Đại Dương bất khả chiến bại!" }
        ],
        postGame: [
            { character: 'monkey', text: "Khiên Đại Dương lấp lánh và vô cùng kiên cố! Tiến lên hạ gục Cá Mập một lần và mãi mãi!" }
        ]
    },
    // Lesson 448 - 460 (Group: Biển khơi, Chapter 33:  'Rùa biển', Boss: Cá Mập)
    448: {
        minigame: 'clear_fog',
        preGame: [
            { character: 'monkey', text: "Chúng ta đã đến Vịnh Rùa Biển! Nhưng sao nước lại đục ngầu phù sa thế này?" },
            { character: 'boss', text: "Khà khà! Ta đã quẫy bùn lên để bắt gọn lũ rùa nhãi nhép, các ngươi đừng hòng xen vào!" },
            { character: 'monkey', text: "Đừng hòng làm càn! Hãy gõ phím tạo dòng hải lưu trong vắt để thổi bay lớp bùn đất này ngay!" }
        ],
        postGame: [
            { character: 'monkey', text: "Nước biển đã trong xanh trở lại. Đàn rùa biển đang an toàn bơi lội xung quanh." }
        ]
    },
    449: {
        minigame: 'rescue_animals',
        preGame: [
            { character: 'monkey', text: "Nguy rồi! Cá Mập đã vứt một tấm lưới đánh cá đè lên bé Rùa Con đang cố bơi ra biển." },
            { character: 'monkey', text: "Nhanh tay gõ phím thật chính xác để cắt nát tấm lưới và giải cứu bé Rùa Con!" }
        ],
        postGame: [
            { character: 'monkey', text: "Rùa Con đã thoát ra và tung tăng bơi theo rùa mẹ. Chúng ta phải trừng trị Cá Mập!" }
        ]
    },
    450: {
        minigame: 'bubble_shooter',
        preGame: [
            { character: 'boss', text: "Nhận lấy những quả bóng bùn nhầy nhụa này đi! Các ngươi sẽ bị làm mù mắt!" },
            { character: 'monkey', text: "Hắn đang phun bóng bùn từ xa! Ngắm bắn vỡ chúng ngay trước khi chúng đập trúng chúng ta!" }
        ],
        postGame: [
            { character: 'monkey', text: "Những quả bóng bùn đã nổ tung thành bọt nước. Chúng ta vẫn sạch sẽ và sẵn sàng." }
        ]
    },
    451: {
        minigame: 'whack_mole',
        preGame: [
            { character: 'monkey', text: "Lũ cua đá tay sai đang trốn dưới lớp cát để tấn công lén bầy rùa đang ấp trứng." },
            { character: 'monkey', text: "Cầm búa lên, gõ trúng đầu chúng để xua đuổi bầy cua đá đi ngay lập tức!" }
        ],
        postGame: [
            { character: 'monkey', text: "Bầy cua đá đã sợ hãi lặn sâu xuống đáy. Bãi đẻ trứng của rùa đã được an toàn." }
        ]
    },
    452: {
        minigame: 'racing',
        preGame: [
            { character: 'monkey', text: "Cá Mập đang lao nhanh ra vùng biển sâu để lẩn trốn." },
            { character: 'monkey', text: "Cùng bám chặt vào mai Cụ Rùa Khổng Lồ, gõ phím tăng tốc lướt sóng đuổi theo hắn nào!" }
        ],
        postGame: [
            { character: 'monkey', text: "Cụ Rùa bơi cực kỳ êm ái và tốc độ! Khoảng cách với Cá Mập đang được thu hẹp dần." }
        ]
    },
    453: {
        minigame: 'grow_plant',
        preGame: [
            { character: 'monkey', text: "Một hẻm vực nứt gãy dưới đáy biển chắn ngang, dòng chảy ở đây xiết quá không thể bơi qua." },
            { character: 'monkey', text: "Hãy gieo hạt cây Hoa thần kỳ, gõ phím để chúng mọc dài vắt ngang hẻm vực làm chiếc cầu!" }
        ],
        postGame: [
            { character: 'monkey', text: "Cầu Hoa vô cùng dai và chắc chắn. Cùng cẩn thận bám vào và vượt qua vực sâu nào." }
        ]
    },
    454: {
        minigame: 'catch_insects',
        preGame: [
            { character: 'monkey', text: "Chúng ta đang chìm dần vào vùng nước thẳm, ánh sáng mặt trời không thể chiếu tới được." },
            { character: 'monkey', text: "Dùng vợt vung thật khéo để bắt những bạn Sứa Lưu Ly phát sáng vào lồng kính soi đường nhé." }
        ],
        postGame: [
            { character: 'monkey', text: "Lồng kính sứa lưu ly tỏa ánh sáng xanh dịu mát. Không gian xung quanh đã sáng tỏ hơn nhiều." }
        ]
    },
    455: {
        minigame: 'frog_jump',
        preGame: [
            { character: 'monkey', text: "Dưới chân là vùng miệng núi lửa ngầm đang sủi bọt, chỉ có vài cột đá lửa là có thể tựa vào." },
            { character: 'monkey', text: "Gõ đúng nhịp để búng người nhảy chuẩn xác lên các cột đá, tuyệt đối đừng để rớt xuống dòng nước sôi!" }
        ],
        postGame: [
            { character: 'monkey', text: "Thật thót tim! Những bước nhảy hoàn hảo đã giúp chúng ta vượt qua vùng núi lửa ngầm an toàn." }
        ]
    },
    456: {
        minigame: 'collect_items',
        preGame: [
            { character: 'boss', text: "Ta sẽ đập nát những viên Đá San Hô Trắng này! Các ngươi sẽ cạn kiệt thể lực!" },
            { character: 'monkey', text: "Đá San Hô Trắng chứa năng lượng trị thương quý giá! Nhanh tay nhặt vào túi trước khi bị Cá Mập phá vỡ." }
        ],
        postGame: [
            { character: 'monkey', text: "Đã thu thập đủ Đá San Hô Trắng. Mọi mệt mỏi của chúng ta đã tan biến hoàn toàn." }
        ]
    },
    457: {
        minigame: 'assemble_object',
        preGame: [
            { character: 'monkey', text: "Chiếc vương miện san hô của Rùa Trưởng Lão đã bị Cá Mập cắn vỡ thành nhiều mảnh." },
            { character: 'monkey', text: "Hãy gõ phím ráp các mảnh san hô lại để khôi phục chiếc vương miện uy quyền giúp ngài nhé." }
        ],
        postGame: [
            { character: 'monkey', text: "Vương miện đã hoàn hảo như xưa. Rùa Trưởng Lão vô cùng cảm kích và chỉ đường đến sào huyệt của hắn." }
        ]
    },
    458: {
        minigame: 'clear_fog',
        preGame: [
            { character: 'boss', text: "Đến tận đây cơ à? Dòng hải lưu đen tối này sẽ cuốn trôi các ngươi vĩnh viễn!" },
            { character: 'monkey', text: "Dòng nước xiết và cuộn xoáy mịt mù! Gõ thật nhanh tạo luồng sóng ngược đánh tan dòng hải lưu này!" }
        ],
        postGame: [
            { character: 'monkey', text: "Dòng biển đã tĩnh lặng trở lại. Sào huyệt bằng xác tàu đắm khổng lồ của Cá Mập đã hiện ra!" }
        ]
    },
    459: {
        minigame: 'bubble_shooter',
        preGame: [
            { character: 'monkey', text: "Hắn đang điên cuồng dùng vây hất những tảng đá ngầm to lớn từ xác tàu về phía chúng ta." },
            { character: 'monkey', text: "Ngắm thật chuẩn và bắn nát những tảng đá ngầm đó giữa dòng nước để dọn đường tiến lên!" }
        ],
        postGame: [
            { character: 'monkey', text: "Đá ngầm vỡ vụn thành sỏi nhỏ. Cá Mập không còn vũ khí nào để chống cự nữa." }
        ]
    },
    460: {
        minigame: 'assemble_object',
        preGame: [
            { character: 'monkey', text: "Cá Mập đang điên cuồng chờ sẵn. Chúng ta cần lớp phòng thủ vững chãi nhất của đại dương." },
            { character: 'monkey', text: "Hãy ráp những Mảnh Mai Rùa Cổ Đại lại thành chiếc Khiên Huyền Vũ bất khả chiến bại!" }
        ],
        postGame: [
            { character: 'monkey', text: "Khiên Huyền Vũ tỏa sáng rực rỡ và vô cùng kiên cố! Cầm lấy nó và tiến lên đánh bại Cá Mập thôi!" }
        ]
    },
    // Lesson 462 - 474 (Group: Biển khơi, Chapter 34:  'Cá heo', Boss: Cá Mập)
    462: {
        minigame: 'clear_fog',
        preGame: [
            { character: 'monkey', text: "Chúng ta đã đến Vịnh Cá Heo! Nhưng mặt nước lại đầy bọt biển đục ngầu và bốc mùi thế này?" },
            { character: 'boss', text: "Khà khà! Lũ cá heo ồn ào kia sẽ bị bịt miệng vĩnh viễn dưới lớp bọt độc của ta!" },
            { character: 'monkey', text: "Đừng hòng làm càn! Gõ phím thật nhanh tạo luồng sóng sạch để đánh tan đám bọt biển này ngay!" }
        ],
        postGame: [
            { character: 'monkey', text: "Mặt nước đã trong xanh trở lại. Nghe kìa, bầy Cá Heo đang cất tiếng hát chào đón chúng ta." }
        ]
    },
    463: {
        minigame: 'rescue_animals',
        preGame: [
            { character: 'monkey', text: "Nguy rồi! Cá Mập đã ném một chiếc mỏ neo rỉ sét đè lên đuôi của bé Cá Heo Hồng." },
            { character: 'monkey', text: "Nhanh tay gõ phím thật chính xác để phá vỡ mỏ neo và giải cứu bé Cá Heo Hồng ra ngoài!" }
        ],
        postGame: [
            { character: 'monkey', text: "Cá Heo Hồng đã được tự do và vui sướng nhảy vọt lên khỏi mặt nước. Làm tốt lắm!" }
        ]
    },
    464: {
        minigame: 'bubble_shooter',
        preGame: [
            { character: 'boss', text: "Đỡ lấy những quả thủy lôi nước xoáy của ta đây! Các ngươi sẽ bị đánh bật ra ngoài khơi!" },
            { character: 'monkey', text: "Hắn đang phun thủy lôi từ xa! Ngắm bắn vỡ chúng ngay trước khi chúng phát nổ trúng chúng ta!" }
        ],
        postGame: [
            { character: 'monkey', text: "Những quả thủy lôi đã nổ tung thành bọt nước vô hại. Khả năng ngắm bắn của bạn rất tuyệt." }
        ]
    },
    465: {
        minigame: 'whack_mole',
        preGame: [
            { character: 'monkey', text: "Lũ sao biển hung hãn tay sai của Cá Mập đang bám chặt lấy mình các bạn Cá Heo để hút năng lượng." },
            { character: 'monkey', text: "Cầm búa lên, gõ trúng đầu chúng để xua đuổi bầy sao biển đi, bảo vệ bầy Cá Heo nhé!" }
        ],
        postGame: [
            { character: 'monkey', text: "Lũ sao biển đã hoảng sợ nhả ra và lặn mất tăm. Bầy Cá Heo đã bơi lội nhẹ nhàng trở lại." }
        ]
    },
    466: {
        minigame: 'racing',
        preGame: [
            { character: 'monkey', text: "Cá Mập đang lao nhanh về phía rãnh đại dương để lẩn trốn. Không thể để hắn thoát!" },
            { character: 'monkey', text: "Cùng bám chặt vào vây lưng của Cá Heo Đầu Đàn, gõ phím tăng tốc lướt sóng đuổi theo nào!" }
        ],
        postGame: [
            { character: 'monkey', text: "Cá Heo bơi cực kỳ êm ái và siêu tốc! Khoảng cách với Cá Mập đang được thu hẹp đáng kể." }
        ]
    },
    467: {
        minigame: 'grow_plant',
        preGame: [
            { character: 'monkey', text: "Một dòng hải lưu ngầm chảy xiết chia cắt đường đi. Chúng ta không thể tự bơi qua được." },
            { character: 'monkey', text: "Hãy gieo hạt giống Hoa khổng lồ, gõ phím để chúng mọc đan vào nhau làm chiếc cầu vắt ngang!" }
        ],
        postGame: [
            { character: 'monkey', text: "Cầu Hoa vô cùng dai và chắc chắn. Cùng cẩn thận đi qua dòng hải lưu nào." }
        ]
    },
    468: {
        minigame: 'catch_insects',
        preGame: [
            { character: 'monkey', text: "Chúng ta đang tiến vào vùng rãnh biển sâu, ánh sáng mặt trời không chiếu tới được nữa." },
            { character: 'monkey', text: "Dùng vợt vung thật khéo để bắt những Tinh Linh Nước phát sáng vào lồng kính để soi đường nhé." }
        ],
        postGame: [
            { character: 'monkey', text: "Lồng kính Tinh Linh tỏa ánh sáng xanh dương rực rỡ. Đường đi đã sáng rõ ràng hơn nhiều." }
        ]
    },
    469: {
        minigame: 'frog_jump',
        preGame: [
            { character: 'monkey', text: "Dưới đáy là một bãi sứa độc khổng lồ, chỉ có vài đài san hô cứng là an toàn để đáp xuống." },
            { character: 'monkey', text: "Gõ đúng nhịp để búng người bơi chuẩn xác lên các đài san hô, tuyệt đối đừng chạm vào sứa độc!" }
        ],
        postGame: [
            { character: 'monkey', text: "Những bước di chuyển hoàn hảo! Chúng ta đã an toàn vượt qua bãi sứa độc nguy hiểm." }
        ]
    },
    470: {
        minigame: 'collect_items',
        preGame: [
            { character: 'boss', text: "Ta sẽ đập nát những Vòng Tròn Sóng Âm này! Các ngươi sẽ không thể giao tiếp và cạn kiệt sức mạnh!" },
            { character: 'monkey', text: "Vòng Tròn Sóng Âm chứa năng lượng đồng đội! Nhanh tay thu thập vào túi trước khi Cá Mập phá vỡ." }
        ],
        postGame: [
            { character: 'monkey', text: "Đã thu thập đủ Vòng Tròn Sóng Âm. Sự gắn kết và sức mạnh của chúng ta đang tăng lên gấp bội!" }
        ]
    },
    471: {
        minigame: 'assemble_object',
        preGame: [
            { character: 'monkey', text: "Chiếc Sáo Gọi Bầy của Cá Heo Trưởng Lão đã bị Cá Mập cắn vỡ thành nhiều mảnh." },
            { character: 'monkey', text: "Hãy gõ phím ráp các mảnh vỏ ốc lại để khôi phục chiếc Sáo linh thiêng giúp ngài tập hợp đàn nhé." }
        ],
        postGame: [
            { character: 'monkey', text: "Chiếc Sáo vang lên âm thanh trong trẻo lan xa muôn dặm. Cá Heo Trưởng Lão đã chỉ đường đến sào huyệt cuối cùng." }
        ]
    },
    472: {
        minigame: 'clear_fog',
        preGame: [
            { character: 'boss', text: "Các ngươi lỳ lợm thật! Cơn cuồng phong xoáy nước khổng lồ này sẽ nghiền nát tất cả!" },
            { character: 'monkey', text: "Dòng nước xoáy cuộn xiết cực mạnh! Gõ thật nhanh tạo luồng sóng âm đồng thanh đánh tan cơn cuồng phong này!" }
        ],
        postGame: [
            { character: 'monkey', text: "Xoáy nước đã bị triệt tiêu hoàn toàn. Sào huyệt tăm tối của Cá Mập đã hiện ra rõ rệt!" }
        ]
    },
    473: {
        minigame: 'bubble_shooter',
        preGame: [
            { character: 'monkey', text: "Hắn đang điên cuồng dùng đuôi hất những tảng đá ngầm sắc lẹm về phía chúng ta." },
            { character: 'monkey', text: "Ngắm thật chuẩn và bắn nát những tảng đá ngầm đó giữa dòng nước để bảo vệ mọi người!" }
        ],
        postGame: [
            { character: 'monkey', text: "Đá ngầm vỡ vụn thành bọt biển. Cá Mập đã cạn kiệt vũ khí và bị dồn vào chân tường." }
        ]
    },
    474: {
        minigame: 'assemble_object',
        preGame: [
            { character: 'monkey', text: "Trận chiến cuối cùng đã điểm. Bầy Cá Heo đã tặng chúng ta những chiếc vây lấp lánh mang sức mạnh đại dương." },
            { character: 'monkey', text: "Hãy ráp những Mảnh Vây Pha Lê lại thành chiếc Khiên Cá Heo tỏa sáng chói lòa bất khả chiến bại!" }
        ],
        postGame: [
            { character: 'monkey', text: "Khiên Cá Heo phát ra sóng âm thanh tẩy mọi cái ác! Cầm lấy nó và lao lên đánh bại Cá Mập thôi!" }
        ]
    },
    // Lesson 476 - 488 (Group: Biển khơi, Chapter 35:  'Đại dương', Boss: Cá Mập)
    476: {
        minigame: 'clear_fog',
        preGame: [
            { character: 'monkey', text: "Chúng ta đã ra đến vùng Đại Dương sâu thẳm! Nhưng nước biển lại bị vẩn đục bởi màn sương đen ngòm." },
            { character: 'boss', text: "Khà khà! Đại dương vô tận này sẽ là mồ chôn vĩnh viễn của các ngươi!" },
            { character: 'monkey', text: "Không bao giờ! Hãy gõ phím tạo dòng hải lưu thanh tẩy thổi bay màn sương đen này đi!" }
        ],
        postGame: [
            { character: 'monkey', text: "Sương đen đã tan biến! Dòng nước đại dương trong vắt lại bao la bát ngát hiện ra." }
        ]
    },
    477: {
        minigame: 'rescue_animals',
        preGame: [
            { character: 'monkey', text: "Nguy rồi! Cá Mập đã dùng một chiếc mỏ neo khổng lồ để giữ chặt bạn Cá Voi Con." },
            { character: 'monkey', text: "Gõ phím thật chính xác để tháo tung sợi xích và giải cứu bạn Cá Voi Con ra ngoài!" }
        ],
        postGame: [
            { character: 'monkey', text: "Cá Voi Con đã cất tiếng hát vang vọng và bơi về phía mẹ an toàn." }
        ]
    },
    478: {
        minigame: 'bubble_shooter',
        preGame: [
            { character: 'boss', text: "Hãy nếm thử áp lực từ những quả bom nước sâu của ta đây!" },
            { character: 'monkey', text: "Hắn đang bắn bom nước áp suất cao! Ngắm và bắn vỡ chúng ngay trước khi chúng phát nổ!" }
        ],
        postGame: [
            { character: 'monkey', text: "Những quả bom nước đã nổ tung thành bọt khí vô hại. Áp lực không thể nghiền nát chúng ta." }
        ]
    },
    479: {
        minigame: 'whack_mole',
        preGame: [
            { character: 'monkey', text: "Lũ cua đá tay sai của Cá Mập đang lao tới định cắn đứt dưỡng khí của chúng ta." },
            { character: 'monkey', text: "Cầm búa lên, gõ trúng đầu lũ cua đá để đuổi chúng lặn sâu xuống đáy vực!" }
        ],
        postGame: [
            { character: 'monkey', text: "Bầy cua đá đã khiếp sợ lẩn trốn. Không gian xung quanh lại an toàn." }
        ]
    },
    480: {
        minigame: 'racing',
        preGame: [
            { character: 'monkey', text: "Cá Mập đang lao vút đi trong dòng hải lưu để lẩn trốn." },
            { character: 'monkey', text: "Cùng bám vào vây của bạn Cá Kiếm siêu tốc, vọt lên đuổi theo hắn thật nhanh nào!" }
        ],
        postGame: [
            { character: 'monkey', text: "Cá Kiếm bơi xé nước nhanh như chớp! Hắn không thể nào thoát khỏi tầm mắt chúng ta." }
        ]
    },
    481: {
        minigame: 'grow_plant',
        preGame: [
            { character: 'monkey', text: "Một rãnh vực đại dương sâu thẳm cắt ngang, dòng nước quá mạnh không thể tự bơi qua." },
            { character: 'monkey', text: "Hãy gieo hạt cây Hoa khổng lồ, gõ đúng để nó vươn mình làm chiếc cầu bắc ngang vực!" }
        ],
        postGame: [
            { character: 'monkey', text: "Cầu Hoa vô cùng vững chắc. Cùng bám chặt và cẩn thận băng qua rãnh vực nhé." }
        ]
    },
    482: {
        minigame: 'catch_insects',
        preGame: [
            { character: 'monkey', text: "Càng xuống sâu, đại dương càng tối đen như mực, không thấy chút ánh sáng nào." },
            { character: 'monkey', text: "Dùng vợt vung khéo léo bắt những chú Sứa Ma Bạc phát sáng vào lọ để soi đường đi." }
        ],
        postGame: [
            { character: 'monkey', text: "Lọ sứa bạc tỏa ra thứ ánh sáng huyền bí tuyệt đẹp. Chúng ta đã thấy rõ đường đi." }
        ]
    },
    483: {
        minigame: 'frog_jump',
        preGame: [
            { character: 'monkey', text: "Dưới chân là một bãi thủy lôi ngầm của Cá Mập, chỉ có vài tảng đá núi lửa là an toàn." },
            { character: 'monkey', text: "Gõ đúng nhịp để búng người bơi khéo léo qua các tảng đá, đừng để chạm vào thủy lôi!" }
        ],
        postGame: [
            { character: 'monkey', text: "Thật chính xác! Đôi chân linh hoạt đã giúp chúng ta vượt qua bãi mìn ngầm an toàn." }
        ]
    },
    484: {
        minigame: 'collect_items',
        preGame: [
            { character: 'boss', text: "Ta sẽ quấn trôi những viên Tinh Thể Đại Dương này, các ngươi sẽ cạn kiệt hơi thở!" },
            { character: 'monkey', text: "Tinh Thể Đại Dương chứa nguồn dưỡng khí vô tận! Nhanh tay thu thập vào túi trước khi bị cuốn đi." }
        ],
        postGame: [
            { character: 'monkey', text: "Đã thu thập đủ Tinh Thể Đại Dương. Sức mạnh của chúng ta lại trào dâng mãnh liệt!" }
        ]
    },
    485: {
        minigame: 'assemble_object',
        preGame: [
            { character: 'monkey', text: "La Bàn Biển Cả của Thần Vũ Trụ đã bị Cá Mập đập vỡ thành nhiều mảnh vụn." },
            { character: 'monkey', text: "Hãy gõ phím ráp các mảnh kim loại lại để khôi phục chiếc La Bàn, tìm đường đến sào huyệt cuối cùng." }
        ],
        postGame: [
            { character: 'monkey', text: "La Bàn đã hoạt động trở lại! Nó đang chỉ thẳng về phía hang động khổng lồ dưới đáy biển." }
        ]
    },
    486: {
        minigame: 'clear_fog',
        preGame: [
            { character: 'boss', text: "Bọn nhãi ranh ngoan cố! Siêu lốc xoáy tâm đại dương này sẽ xé nát các ngươi!" },
            { character: 'monkey', text: "Dòng nước xoáy khủng khiếp quá! Gõ thật nhanh tạo luồng sóng phản lực đánh tan lốc xoáy này!" }
        ],
        postGame: [
            { character: 'monkey', text: "Siêu lốc xoáy đã sụp đổ. Sào huyệt tận cùng đại dương của Cá Mập đang sừng sững trước mắt!" }
        ]
    },
    487: {
        minigame: 'bubble_shooter',
        preGame: [
            { character: 'monkey', text: "Hắn đang điên cuồng vẫy đuôi hất những tảng thiên thạch chìm dưới đáy biển về phía chúng ta." },
            { character: 'monkey', text: "Ngắm thật chuẩn và bắn nát những tảng thiên thạch đó để bảo vệ đội hình tiến lên!" }
        ],
        postGame: [
            { character: 'monkey', text: "Thiên thạch vỡ vụn thành cát bụi đại dương. Hắn đã cạn kiệt mọi chiêu trò rồi." }
        ]
    },
    488: {
        minigame: 'assemble_object',
        preGame: [
            { character: 'monkey', text: "Cá Mập đang tung toàn lực cho đòn cuối. Chúng ta cần sức mạnh từ trái tim của biển cả." },
            { character: 'monkey', text: "Hãy ráp những mảnh Tinh Thể Đại Dương lại thành chiếc Khiên Trái Tim Biển Cả tối thượng!" }
        ],
        postGame: [
            { character: 'monkey', text: "Khiên Trái Tim Biển Cả tỏa sáng chói lòa đánh tan mọi sóng dữ! Tiến lên dứt điểm Cá Mập và mang lại bình yên cho đại dương thôi!" }
        ]
    },
    // Lesson 490 - 502 (Group: Lâu đài, Chapter 36:  'Cổng đá', Boss: Tướng Cướp)
    490: {
        minigame: 'clear_fog',
        preGame: [
            { character: 'monkey', text: "Chúng ta đã đến Cổng Đá của Lâu Đài! Nhưng sương mù dày đặc và khói bụi che kín lối vào rồi." },
            { character: 'boss', text: "Khà khà! Các ngươi không bao giờ qua được cánh cổng kiên cố này của ta đâu!" },
            { character: 'monkey', text: "Đừng hòng cản bước! Hãy gõ phím tạo cuồng phong thổi bay khói bụi để nhìn rõ Cổng Đá!" }
        ],
        postGame: [
            { character: 'monkey', text: "Khói bụi đã tan. Cổng Đá đồ sộ hiện ra, nhưng Tướng Cướp đã giăng đầy cạm bẫy." }
        ]
    },
    491: {
        minigame: 'rescue_animals',
        preGame: [
            { character: 'monkey', text: "Nguy rồi! Tướng Cướp đã trói bạn Bồ Câu Đưa Thư vào một cột đá bằng xích sắt." },
            { character: 'monkey', text: "Nhanh tay gõ phím thật chính xác để phá vỡ xiềng xích và giải cứu Bồ Câu ngay!" }
        ],
        postGame: [
            { character: 'monkey', text: "Bồ Câu đã được tự do và vỗ cánh bay đi báo tin. Chúng ta phải tiến vào trong!" }
        ]
    },
    492: {
        minigame: 'bubble_shooter',
        preGame: [
            { character: 'boss', text: "Nhận lấy những thùng thuốc nổ này đi! Cánh cổng này sẽ là mồ chôn của các ngươi!" },
            { character: 'monkey', text: "Hắn đang ném thùng thuốc nổ từ trên tường thành xuống! Ngắm bắn vỡ chúng ngay trên không trung!" }
        ],
        postGame: [
            { character: 'monkey', text: "Các thùng thuốc nổ đã nổ tung an toàn trên cao. Cổng Đá không bị sứt mẻ gì." }
        ]
    },
    493: {
        minigame: 'whack_mole',
        preGame: [
            { character: 'monkey', text: "Lũ chuột chũi của Tướng Cướp đang núp sau các tảng đá để bắn lén chúng ta." },
            { character: 'monkey', text: "Cầm búa lên, gõ trúng đích để đánh đuổi bọn cướp cạn này đi chỗ khác!" }
        ],
        postGame: [
            { character: 'monkey', text: "Lũ chuột chũi đã khiếp sợ bỏ chạy tán loạn. Xung quanh Cổng Đá đã tạm thời an toàn." }
        ]
    },
    494: {
        minigame: 'racing',
        preGame: [
            { character: 'monkey', text: "Tướng Cướp đang cưỡi ngựa đen bỏ chạy vào khu rừng quanh lâu đài." },
            { character: 'monkey', text: "Cùng nhảy lên lưng Ngựa Bạch, gõ phím tăng tốc đuổi theo hắn sát nút nào!" }
        ],
        postGame: [
            { character: 'monkey', text: "Ngựa Bạch phi nước đại thật dũng mãnh! Chúng ta đang bám rất sát Tướng Cướp." }
        ]
    },
    495: {
        minigame: 'grow_plant',
        preGame: [
            { character: 'monkey', text: "Một con hào sâu đầy gai nhọn chắn ngang đường tới cổng chính. Không thể nhảy qua được." },
            { character: 'monkey', text: "Hãy gieo hạt giống cây khổng lồ, gõ đúng để chúng mọc cao lên làm cầu vắt ngang!" }
        ],
        postGame: [
            { character: 'monkey', text: "Cây khổng lồ cực kỳ dẻo dai và chắc chắn. Cùng cẩn thận bước qua con hào nào." }
        ]
    },
    496: {
        minigame: 'catch_insects',
        preGame: [
            { character: 'monkey', text: "Đường hầm dẫn vào Lâu Đài tối đen như mực, không có đuốc soi đường." },
            { character: 'monkey', text: "Dùng vợt vung thật khéo bắt những chú Đom Đóm Thành Cổ vào chiếc đèn lồng để thắp sáng nhé." }
        ],
        postGame: [
            { character: 'monkey', text: "Đèn lồng Đom Đóm tỏa ánh sáng vàng ấm áp. Đường hầm đã sáng rõ ràng." }
        ]
    },
    497: {
        minigame: 'frog_jump',
        preGame: [
            { character: 'monkey', text: "Phía trước là bãi chông sập bẫy, chỉ có vài phiến đá nhô lên là an toàn." },
            { character: 'monkey', text: "Gõ đúng nhịp để búng người nhảy chuẩn xác lên các phiến đá, tuyệt đối đừng bước hụt!" }
        ],
        postGame: [
            { character: 'monkey', text: "Bước nhảy thật hoàn hảo! Chúng টুক đã an toàn vượt qua bãi chông nguy hiểm." }
        ]
    },
    498: {
        minigame: 'collect_items',
        preGame: [
            { character: 'boss', text: "Ta sẽ phá nát những chiếc Chìa Khóa Vàng này! Các ngươi sẽ không bao giờ mở được Cổng Đá!" },
            { character: 'monkey', text: "Chìa Khóa Vàng rất quan trọng! Nhanh tay thu thập chúng vào túi trước khi bị phá hủy." }
        ],
        postGame: [
            { character: 'monkey', text: "Đã thu thập đủ Chìa Khóa Vàng. Cánh cổng Lâu Đài chuẩn bị được mở ra!" }
        ]
    },
    499: {
        minigame: 'assemble_object',
        preGame: [
            { character: 'monkey', text: "Xe công thành bằng gỗ đã bị Tướng Cướp phá hỏng bánh xe và trục đẩy." },
            { character: 'monkey', text: "Hãy gõ phím ráp các khúc gỗ và đinh sắt lại để sửa xe công thành phá Cổng Đá nhé." }
        ],
        postGame: [
            { character: 'monkey', text: "Xe công thành đã vững chắc trở lại. Rầm! Cổng Đá đồ sộ đã bị phá vỡ, xông vào thôi!" }
        ]
    },
    500: {
        minigame: 'clear_fog',
        preGame: [
            { character: 'boss', text: "Khà khà! Đã vào được đây thì hãy nếm thử bom khói độc của ta!" },
            { character: 'monkey', text: "Khói độc mù mịt cay mắt quá! Gõ thật nhanh tạo luồng gió mạnh xua tan đám khói này ngay!" }
        ],
        postGame: [
            { character: 'monkey', text: "Khói độc đã tan biến. Sân trong của Lâu Đài và Tướng Cướp đang ở ngay trước mặt!" }
        ]
    },
    501: {
        minigame: 'bubble_shooter',
        preGame: [
            { character: 'monkey', text: "Hắn đang điên cuồng ném những quả chùy gai sắt khổng lồ về phía chúng ta." },
            { character: 'monkey', text: "Ngắm thật chuẩn và bắn nát những quả chùy gai đó giữa không trung để bảo vệ mọi người!" }
        ],
        postGame: [
            { character: 'monkey', text: "Chùy gai vỡ vụn thành từng mảnh sắt gỉ. Tướng Cướp đã cạn kiệt vũ khí rồi." }
        ]
    },
    502: {
        minigame: 'assemble_object',
        preGame: [
            { character: 'monkey', text: "Trận chiến cuối cùng đã đến. Chúng ta cần một tấm khiên cứng cáp nhất để đỡ đòn của Tướng Cướp." },
            { character: 'monkey', text: "Hãy ráp những Mảnh Thép Hiệp Sĩ lại thành chiếc Khiên Sư Tử bất khả chiến bại!" }
        ],
        postGame: [
            { character: 'monkey', text: "Khiên Sư Tử tỏa sáng rực rỡ và vô cùng kiên cố! Tiến lên đánh bại Tướng Cướp và giải phóng Lâu Đài thôi!" }
        ]
    },
    // Lesson 504 - 516 (Group: Lâu đài, Chapter 37:  'Hiệp sĩ', Boss: Tướng Cướp)
    504: {
        minigame: 'clear_fog',
        preGame: [
            { character: 'monkey', text: "Chúng ta đã đến Khu Huấn Luyện Hiệp Sĩ! Nhưng khói bụi từ súng hỏa mai của Tướng Cướp mịt mù quá." },
            { character: 'boss', text: "Khà khà! Lũ khoác áo giáp rỉ sét các ngươi sẽ bị nghiền nát tại đây!" },
            { character: 'monkey', text: "Đừng hòng! Gõ phím tạo cuồng phong thổi tan đám khói bụi này đi!" }
        ],
        postGame: [
            { character: 'monkey', text: "Khói bụi đã tan. Những bộ giáp hiệp sĩ vẫn đứng sừng sững, tiến lên nào!" }
        ]
    },
    505: {
        minigame: 'rescue_animals',
        preGame: [
            { character: 'monkey', text: "Nguy rồi! Tướng Cướp đã trói bạn Ngựa Chiến vào cọc gỗ bằng dây xích sắt." },
            { character: 'monkey', text: "Nhanh tay gõ phím thật chính xác để cắt đứt dây xích giải cứu bạn ấy ra ngoài!" }
        ],
        postGame: [
            { character: 'monkey', text: "Ngựa Chiến đã hí vang dũng mãnh và được tự do. Chúng ta có thêm một người bạn đồng hành!" }
        ]
    },
    506: {
        minigame: 'bubble_shooter',
        preGame: [
            { character: 'boss', text: "Đỡ lấy những quả pháo nổ công thành của ta đi! Lâu đài này sẽ sụp đổ!" },
            { character: 'monkey', text: "Hắn ném pháo nổ từ trên tháp canh! Ngắm bắn vỡ chúng ngay trước khi chúng rơi xuống đất!" }
        ],
        postGame: [
            { character: 'monkey', text: "Pháo đã nổ tung trên không trung vô hại. Chúng ta đã bảo vệ được sân sân huấn luyện." }
        ]
    },
    507: {
        minigame: 'whack_mole',
        preGame: [
            { character: 'monkey', text: "Lũ chuột chũi lâu la của Tướng Cướp đang chui lên từ các đường hầm bí mật để phá hoại kho vũ khí." },
            { character: 'monkey', text: "Cầm búa lên, gõ trúng đích để đuổi lũ chuột chũi này lặn xuống hầm ngay lập tức!" }
        ],
        postGame: [
            { character: 'monkey', text: "Lũ chuột chũi đã khiếp sợ chạy mất tăm. Kho vũ khí của các hiệp sĩ vẫn an toàn." }
        ]
    },
    508: {
        minigame: 'racing',
        preGame: [
            { character: 'monkey', text: "Tướng Cướp đang nhảy lên xe ngựa tẩu thoát qua hành lang dài của lâu đài." },
            { character: 'monkey', text: "Cùng nhảy lên lưng Ngựa Chiến, gõ phím tăng tốc phi nước đại đuổi theo hắn ngay!" }
        ],
        postGame: [
            { character: 'monkey', text: "Ngựa Chiến phi nhanh như gió xé! Chúng ta đang bám rất sát chiếc xe ngựa của Tướng Cướp." }
        ]
    },
    509: {
        minigame: 'grow_plant',
        preGame: [
            { character: 'monkey', text: "Một rãnh nước cạn đầy chông sắt chắn ngang lối đi. Không thể nhảy qua được." },
            { character: 'monkey', text: "Hãy gieo hạt giống cây khổng lồ, gõ đúng để chúng mọc cao lên làm cầu vắt ngang!" }
        ],
        postGame: [
            { character: 'monkey', text: "Cây khổng lồ cực kỳ dẻo dai và chắc chắn. Cùng bước qua rãnh chông cẩn thận nào." }
        ]
    },
    510: {
        minigame: 'catch_insects',
        preGame: [
            { character: 'monkey', text: "Hầm ngục lâu đài này tối tăm quá, không có một tia sáng nào." },
            { character: 'monkey', text: "Dùng vợt vung thật khéo bắt những Tinh Linh Lửa đang bay lượn vào lồng đèn để soi đường nhé." }
        ],
        postGame: [
            { character: 'monkey', text: "Lồng đèn tỏa ánh sáng vàng rực rỡ ấm áp. Mọi ngóc ngách hầm ngục đã hiện rõ." }
        ]
    },
    511: {
        minigame: 'frog_jump',
        preGame: [
            { character: 'monkey', text: "Phía trước là bẫy sập sàn đá liên hoàn, chỉ có vài phiến đá khắc phù hiệu là an toàn." },
            { character: 'monkey', text: "Gõ đúng nhịp để búng người nhảy chuẩn xác lên các phiến đá phù hiệu, tuyệt đối đừng bước hụt!" }
        ],
        postGame: [
            { character: 'monkey', text: "Tuyệt vời! Những bước nhảy hoàn hảo đã giúp chúng ta vượt qua dãy bẫy sập an toàn." }
        ]
    },
    512: {
        minigame: 'collect_items',
        preGame: [
            { character: 'boss', text: "Ta sẽ ném những chiếc Huy Hiệu Danh Dự này vào lò lửa! Lũ hiệp sĩ sẽ mất đi lòng tự hào!" },
            { character: 'monkey', text: "Huy Hiệu chứa sức mạnh tinh thần to lớn! Nhanh tay thu thập chúng vào túi trước khi bị thiêu rụi." }
        ],
        postGame: [
            { character: 'monkey', text: "Đã thu thập đủ Huy Hiệu Danh Dự. Tinh thần hiệp sĩ đang bùng cháy rực rỡ trong chúng ta!" }
        ]
    },
    513: {
        minigame: 'assemble_object',
        preGame: [
            { character: 'monkey', text: "Thanh Đại Kiếm của Hiệp Sĩ Trưởng đã bị Tướng Cướp chém gãy thành nhiều mảnh." },
            { character: 'monkey', text: "Hãy gõ phím ráp các mảnh thép luyện lại để rèn nguyên vẹn thanh kiếm anh hùng này nhé." }
        ],
        postGame: [
            { character: 'monkey', text: "Thanh Đại Kiếm đã sắc lẹm và sáng bóng như mới! Sức mạnh của hiệp sĩ đã trở lại." }
        ]
    },
    514: {
        minigame: 'clear_fog',
        preGame: [
            { character: 'boss', text: "Lũ nhãi ranh lỳ lợm! Cơn bão tro tàn này sẽ làm các ngươi nghẹt thở!" },
            { character: 'monkey', text: "Tro bụi bay mịt mù không thấy đường! Gõ thật nhanh tạo gió lốc xua tan đám tro tàn này ngay!" }
        ],
        postGame: [
            { character: 'monkey', text: "Tro tàn đã bị thổi bay hoàn toàn. Cánh cửa dẫn vào Đại sảnh lâu đài đã ở ngay phía trước!" }
        ]
    },
    515: {
        minigame: 'bubble_shooter',
        preGame: [
            { character: 'monkey', text: "Hắn đang điên cuồng phóng những quả chuỳ sắt hoắt từ trên cao xuống." },
            { character: 'monkey', text: "Ngắm thật chuẩn và bắn gãy những quả chuỳ sắt đó giữa không trung để dọn đường tiến lên!" }
        ],
        postGame: [
            { character: 'monkey', text: "Những quả chuỳ sắt vỡ vụn thành từng mảnh. Tướng Cướp đã cạn kiệt vũ khí tấn công từ xa rồi." }
        ]
    },
    516: {
        minigame: 'assemble_object',
        preGame: [
            { character: 'monkey', text: "Tướng Cướp đang đứng chờ sẵn ở Đại sảnh. Chúng ta cần một lớp giáp bảo vệ tuyệt đối." },
            { character: 'monkey', text: "Hãy ráp các Mảnh Giáp Bạc lại thành Bộ Giáp Hiệp Sĩ chói lòa bất khả chiến bại!" }
        ],
        postGame: [
            { character: 'monkey', text: "Bộ Giáp Hiệp Sĩ đã sẵn sàng, vô cùng kiên cố và rực rỡ! Tiến lên hạ gục Tướng Cướp, giành lại lâu đài thôi!" }
        ]
    },
    // Lesson 518 - 530 (Group: Lâu đài, Chapter 38:  'Cung tên', Boss: Tướng Cướp)
    518: {
        minigame: 'clear_fog',
        preGame: [
            { character: 'monkey', text: "Chúng ta đã đến Tháp Cung Tên! Nhưng khói từ hỏa tiễn của Tướng Cướp dày đặc quá, không thấy đường lên!" },
            { character: 'boss', text: "Khà khà! Các ngươi sẽ làm bia ngắm bắn cho những mũi tên tẩm độc của ta!" },
            { character: 'monkey', text: "Đừng hòng! Gõ phím tạo cuồng phong thổi bay làn khói độc này để nhìn rõ trận địa ngay!" }
        ],
        postGame: [
            { character: 'monkey', text: "Khói độc đã tan. Các giá để cung tên và bệ bắn hiện ra, chúng ta phải cẩn thận di chuyển!" }
        ]
    },
    519: {
        minigame: 'rescue_animals',
        preGame: [
            { character: 'monkey', text: "Nhìn kìa! Tướng Cướp đã bắn lưới bẫy trói chặt bạn Đại Bàng Tiên Phong trên giá gỗ." },
            { character: 'monkey', text: "Nhanh tay gõ phím thật chuẩn xác để cắt đứt tấm lưới và giải cứu Đại Bàng ra ngoài!" }
        ],
        postGame: [
            { character: 'monkey', text: "Đại Bàng đã được tự do, vỗ cánh bay vút lên cao. Đôi mắt tinh tường của bạn ấy sẽ giúp chúng ta cảnh giới." }
        ]
    },
    520: {
        minigame: 'bubble_shooter',
        preGame: [
            { character: 'boss', text: "Nhận lấy cơn mưa hỏa tiễn này đi! Tháp cung sẽ cháy rụi cùng các ngươi!" },
            { character: 'monkey', text: "Hắn đang bắn hỏa tiễn liên phanh! Ngắm thật chuẩn và bắn gãy những mũi tên lửa trước khi chúng rơi xuống!" }
        ],
        postGame: [
            { character: 'monkey', text: "Những mũi tên lửa đã gãy nát thành than vụn. Sàn tháp vẫn an toàn, không bị bắt lửa." }
        ]
    },
    521: {
        minigame: 'whack_mole',
        preGame: [
            { character: 'monkey', text: "Lũ lâu la tay sai của Tướng Cướp đang nấp sau các bia ngắm để bắn lén chúng ta." },
            { character: 'monkey', text: "Cầm búa lên, gõ trúng đích để đánh đuổi bọn cướp lén lút này đi chỗ khác ngay lập tức!" }
        ],
        postGame: [
            { character: 'monkey', text: "Lũ tay sai đã hoảng sợ vứt cung tên bỏ chạy. Chúng ta không lo bị đánh lén nữa." }
        ]
    },
    522: {
        minigame: 'racing',
        preGame: [
            { character: 'monkey', text: "Tướng Cướp đang đu dây tời sang tháp canh bên cạnh để lẩn trốn." },
            { character: 'monkey', text: "Cùng bám vào ròng rọc, gõ phím tăng tốc trượt trên dây cáp đuổi theo hắn thật nhanh nào!" }
        ],
        postGame: [
            { character: 'monkey', text: "Tốc độ trượt cáp thật tuyệt vời! Chúng ta đang bám sát gót Tướng Cướp rồi." }
        ]
    },
    523: {
        minigame: 'grow_plant',
        preGame: [
            { character: 'monkey', text: "Một khoảng không sâu thẳm giữa hai tháp cản đường. Cầu treo đã bị hắn chặt đứt." },
            { character: 'monkey', text: "Hãy gieo hạt giống cây khổng lồ, gõ đúng để chúng mọc bện thành cây cầu vắt ngang!" }
        ],
        postGame: [
            { character: 'monkey', text: "Cầu cây khổng lồ vô cùng kiên cố. Cùng cẩn thận bước qua khoảng không sâu thẳm này nào." }
        ]
    },
    524: {
        minigame: 'catch_insects',
        preGame: [
            { character: 'monkey', text: "Cầu thang xoắn ốc bên trong tháp tối om, không có một ngọn nến nào chiếu sáng." },
            { character: 'monkey', text: "Dùng vợt vung khéo léo bắt những chú Đom Đóm Phát Quang vào lồng đèn để soi lối đi." }
        ],
        postGame: [
            { character: 'monkey', text: "Lồng đèn đom đóm sáng rực rỡ. Chúng ta đã thấy rõ từng bậc thang bằng đá để leo lên." }
        ]
    },
    525: {
        minigame: 'frog_jump',
        preGame: [
            { character: 'monkey', text: "Phía trước là sàn đá có gắn bẫy chông, chỉ có vài bệ đứng là điểm tựa an toàn." },
            { character: 'monkey', text: "Gõ đúng nhịp để nhảy chuẩn xác lên các bệ đứng, tuyệt đối đừng để hụt chân vào bẫy nhé!" }
        ],
        postGame: [
            { character: 'monkey', text: "Bước nhảy thật hoàn hảo! Chúng ta đã an toàn vượt qua khu vực đầy cạm bẫy của hắn." }
        ]
    },
    526: {
        minigame: 'collect_items',
        preGame: [
            { character: 'boss', text: "Ta sẽ bẻ gãy những Mũi Tên Ánh Sáng này! Các ngươi đừng hòng có vũ khí để phản công!" },
            { character: 'monkey', text: "Mũi Tên Ánh Sáng là vũ khí khắc chế hắn! Nhanh tay thu thập vào ống tên trước khi bị hủy." }
        ],
        postGame: [
            { character: 'monkey', text: "Đã thu thập đủ Mũi Tên Ánh Sáng. Vũ khí của chúng ta đã sẵn sàng để nghênh chiến!" }
        ]
    },
    527: {
        minigame: 'assemble_object',
        preGame: [
            { character: 'monkey', text: "Cỗ Nỏ Liên Châu bảo vệ đỉnh tháp đã bị Tướng Cướp tháo tung các trục quay." },
            { character: 'monkey', text: "Hãy gõ phím ráp các bánh răng và dây cung lại để sửa cỗ nỏ vĩ đại này nhé." }
        ],
        postGame: [
            { character: 'monkey', text: "Nỏ Liên Châu đã được sửa chữa xong! Nó đang chỉ thẳng lên vị trí của Tướng Cướp." }
        ]
    },
    528: {
        minigame: 'clear_fog',
        preGame: [
            { character: 'boss', text: "Bọn nhãi ranh lỳ lợm! Bom khói ảo ảnh này sẽ làm các ngươi lạc lối vĩnh viễn!" },
            { character: 'monkey', text: "Khói túa ra mù mịt che khuất tầm nhìn! Gõ thật nhanh tạo cuồng phong xua tan đám khói này ngay!" }
        ],
        postGame: [
            { character: 'monkey', text: "Khói ảo ảnh đã bị thổi bay. Cửa lên sân thượng đỉnh tháp đã mở toang!" }
        ]
    },
    529: {
        minigame: 'bubble_shooter',
        preGame: [
            { character: 'monkey', text: "Hắn đang điên cuồng phóng những tảng đá từ trên sân thượng xuống để cản đường." },
            { character: 'monkey', text: "Ngắm thật chuẩn và bắn nát những tảng đá đó giữa không trung để dọn đường tiến lên!" }
        ],
        postGame: [
            { character: 'monkey', text: "Tảng đá vỡ vụn thành sắt gỉ. Tướng Cướp đã cạn kiệt vũ khí để ném rồi." }
        ]
    },
    530: {
        minigame: 'assemble_object',
        preGame: [
            { character: 'monkey', text: "Tướng Cướp đang giương cây cung khổng lồ chờ sẵn. Chúng ta cần lớp phòng ngự tuyệt đối." },
            { character: 'monkey', text: "Hãy ráp các Mảnh Giáp Vàng lại thành chiếc Khiên Thái Dương bất khả chiến bại!" }
        ],
        postGame: [
            { character: 'monkey', text: "Khiên Thái Dương tỏa sáng chói lòa vô cùng kiên cố! Cầm lấy nó và tiến lên đánh bại Tướng Cướp thôi!" }
        ]
    },
    // Lesson 532 - 544 (Group: Lâu đài, Chapter 39:  'Tháp canh', Boss: Tướng Cướp)
    532: {
        minigame: 'clear_fog',
        preGame: [
            { character: 'monkey', text: "Đã đến Tháp Canh rồi! Nhưng Tướng Cướp thả khói tín hiệu mù mịt che kín lối đi." },
            { character: 'boss', text: "Khà khà! Tại ngọn tháp này, các ngươi sẽ không bao giờ mò ra đường lên đỉnh đâu!" },
            { character: 'monkey', text: "Đừng hòng! Hãy gõ phím thật nhanh tạo luồng gió thổi tan đám khói xám này đi!" }
        ],
        postGame: [
            { character: 'monkey', text: "Khói đã tan. Cầu thang đá vòng vèo hiện ra, chúng ta bắt đầu leo lên nào." }
        ]
    },
    533: {
        minigame: 'rescue_animals',
        preGame: [
            { character: 'monkey', text: "Nguy rồi! Tướng Cướp đã nhốt bạn Cú Canh Gác vào một chiếc lồng sắt treo lơ lửng." },
            { character: 'monkey', text: "Nhanh tay gõ phím để phá vỡ ổ khóa và giải cứu bạn Cú Canh Gác ra ngoài!" }
        ],
        postGame: [
            { character: 'monkey', text: "Cú Canh Gác đã tung cánh bay lên. Bạn ấy sẽ giúp chúng ta quan sát từ trên cao." }
        ]
    },
    534: {
        minigame: 'bubble_shooter',
        preGame: [
            { character: 'boss', text: "Đỡ lấy những quả bom khói cay của ta đây! Khụ khụ đi lũ nhóc!" },
            { character: 'monkey', text: "Hắn đang ném bom khói từ tầng trên xuống! Ngắm bắn vỡ chúng ngay trước khi chúng rơi trúng mặt!" }
        ],
        postGame: [
            { character: 'monkey', text: "Bom khói nổ tung thành bụi vô hại. Không khí vẫn trong lành và an toàn." }
        ]
    },
    535: {
        minigame: 'whack_mole',
        preGame: [
            { character: 'monkey', text: "Lũ cướp tay sai đang thò đầu ra từ các ô cửa sổ hẹp để bắn lén chúng ta." },
            { character: 'monkey', text: "Cầm búa lên, gõ trúng đích để đuổi bọn chúng thụt đầu vào trong ngay lập tức!" }
        ],
        postGame: [
            { character: 'monkey', text: "Lũ tay sai đã sợ hãi bỏ trốn. Đoạn cầu thang này đã an toàn để leo tiếp." }
        ]
    },
    536: {
        minigame: 'racing',
        preGame: [
            { character: 'monkey', text: "Tướng Cướp đang đu dây ròng rọc lên tầng cao hơn để lẩn trốn." },
            { character: 'monkey', text: "Bám chặt vào dây thừng bên cạnh, gõ phím tăng tốc kéo người lên đuổi theo hắn nào!" }
        ],
        postGame: [
            { character: 'monkey', text: "Tốc độ leo dây thật đáng nể! Chúng ta đang bám sát gót hắn." }
        ]
    },
    537: {
        minigame: 'grow_plant',
        preGame: [
            { character: 'monkey', text: "Đoạn cầu thang gỗ đã bị hắn phá gãy, tạo thành một khoảng trống lớn nguy hiểm." },
            { character: 'monkey', text: "Hãy gieo hạt giống cây Thần Kỳ, gõ đúng để chúng mọc cao lên làm cầu bắc ngang!" }
        ],
        postGame: [
            { character: 'monkey', text: "Cầu cây thần kỳ rất bám và kiên cố. Cùng cẩn thận bước qua khoảng trống sâu thẳm này." }
        ]
    },
    538: {
        minigame: 'catch_insects',
        preGame: [
            { character: 'monkey', text: "Bên trong thân tháp canh bỗng tối om, những ngọn đuốc đã bị dập tắt hết." },
            { character: 'monkey', text: "Dùng vợt bắt những bạn Đom Đóm Gác Đêm vào lồng đèn để thắp sáng lối đi tiếp." }
        ],
        postGame: [
            { character: 'monkey', text: "Lồng đèn Đom Đóm sáng rực. Từng bậc thang đá gập ghềnh đã hiện ra rõ ràng." }
        ]
    },
    539: {
        minigame: 'frog_jump',
        preGame: [
            { character: 'monkey', text: "Phía trước là những thanh dầm gỗ mục nát nối giữa hai bờ tường trống." },
            { character: 'monkey', text: "Gõ đúng nhịp để nhảy chuẩn xác lên những thanh gỗ chắc chắn nhất, đừng để bước hụt rớt xuống!" }
        ],
        postGame: [
            { character: 'monkey', text: "Bước nhảy thật hoàn hảo! Chúng ta đã an toàn băng qua đoạn dầm gỗ chông chênh." }
        ]
    },
    540: {
        minigame: 'collect_items',
        preGame: [
            { character: 'boss', text: "Ta sẽ đập vỡ những chiếc Chuông Báo Động này! Các ngươi sẽ không thể gọi viện binh!" },
            { character: 'monkey', text: "Chuông Báo Động rất quan trọng! Nhanh tay nhặt chúng vào túi trước khi bị phá nát." }
        ],
        postGame: [
            { character: 'monkey', text: "Đã thu thập đủ Chuông Báo Động. Tiếng chuông vang lên sẽ gọi các hiệp sĩ đến hỗ trợ!" }
        ]
    },
    541: {
        minigame: 'assemble_object',
        preGame: [
            { character: 'monkey', text: "Chiếc Ống Nhòm Ma Thuật trên tháp canh đã bị Tướng Cướp tháo rời từng mảnh." },
            { character: 'monkey', text: "Hãy gõ phím ráp các thấu kính và ống đồng lại để sửa chiếc ống nhòm này nhé." }
        ],
        postGame: [
            { character: 'monkey', text: "Ống Nhòm đã hoạt động tốt! Qua đó, ta thấy hắn đang nấp ngay trên đỉnh tháp." }
        ]
    },
    542: {
        minigame: 'clear_fog',
        preGame: [
            { character: 'boss', text: "Lỳ lợm thật! Cơn bão cát này sẽ cuốn phăng các ngươi khỏi đỉnh tháp!" },
            { character: 'monkey', text: "Gió rít mạnh quá! Gõ thật nhanh tạo luồng gió đối nghịch xua tan bão cát đen này ngay!" }
        ],
        postGame: [
            { character: 'monkey', text: "Bão cát đã tan. Sân thượng đỉnh tháp và Tướng Cướp đang ở ngay trước mặt!" }
        ]
    },
    543: {
        minigame: 'bubble_shooter',
        preGame: [
            { character: 'monkey', text: "Hắn đang điên cuồng ném những tảng đá gạch lớn từ mép tháp canh xuống chỗ chúng ta." },
            { character: 'monkey', text: "Ngắm thật chuẩn và bắn vỡ vụn những tảng gạch đá đó giữa không trung để dọn đường!" }
        ],
        postGame: [
            { character: 'monkey', text: "Đá gạch vỡ nát thành cát bụi. Tướng Cướp đã cạn kiệt đạn dược rồi." }
        ]
    },
    544: {
        minigame: 'assemble_object',
        preGame: [
            { character: 'monkey', text: "Trận chiến cuối cùng trên đỉnh tháp đã đến. Chúng ta cần một tấm khiên chặn mọi đòn tấn công." },
            { character: 'monkey', text: "Hãy ráp các Mảnh Giáp Bằng Đồng lại thành chiếc Khiên Vệ Binh vững chãi nhất!" }
        ],
        postGame: [
            { character: 'monkey', text: "Khiên Vệ Binh vô cùng kiên cố và uy dũng! Cầm lấy nó và lao lên bắt giữ Tướng Cướp thôi!" }
        ]
    },
    // Lesson 546 - 558 (Group: Lâu đài, Chapter 40:  'Vương miện', Boss: Tướng Cướp)
    546: {
        minigame: 'clear_fog',
        preGame: [
            { character: 'monkey', text: "Chúng ta đã đến Tháp Vương Miện! Nhưng Tướng Cướp đã thả khói mù mịt che kín cả căn phòng." },
            { character: 'boss', text: "Khà khà! Chiếc vương miện quyền lực này đã thuộc về ta, các ngươi hãy chìm trong bóng tối đi!" },
            { character: 'monkey', text: "Không bao giờ! Hãy gõ phím tạo cuồng phong xua tan màn khói đen này ngay lập tức!" }
        ],
        postGame: [
            { character: 'monkey', text: "Khói đen đã bị thổi bay. Bệ đặt Vương miện đã hiện ra, nhưng hắn đã ôm nó bỏ chạy!" }
        ]
    },
    547: {
        minigame: 'rescue_animals',
        preGame: [
            { character: 'monkey', text: "Nguy rồi! Tướng Cướp đã dùng lưới sắt trói chặt Sư Tử Vàng, linh vật bảo vệ vương miện." },
            { character: 'monkey', text: "Nhanh tay gõ phím thật chính xác để phá vỡ lưới sắt và giải cứu Sư Tử Vàng ra ngoài!" }
        ],
        postGame: [
            { character: 'monkey', text: "Sư Tử Vàng đã được giải thoát và gầm lên dũng mãnh. Chúng ta có thêm một đồng minh đắc lực!" }
        ]
    },
    548: {
        minigame: 'bubble_shooter',
        preGame: [
            { character: 'boss', text: "Đỡ lấy những quả bom hắc nổ này đi! Tháp Vương Miện sẽ nổ tung cùng các ngươi!" },
            { character: 'monkey', text: "Hắn đang ném bom từ ban công xuống! Ngắm thật chuẩn và bắn vỡ chúng ngay trên không trung!" }
        ],
        postGame: [
            { character: 'monkey', text: "Bom đã nổ tung an toàn trên cao. Căn phòng và chúng ta vẫn hoàn toàn vô sự." }
        ]
    },
    549: {
        minigame: 'whack_mole',
        preGame: [
            { character: 'monkey', text: "Lũ lâu la của Tướng Cướp đang chui lên từ các nắp hầm định cuỗm nốt vàng bạc trong phòng." },
            { character: 'monkey', text: "Cầm búa lên, gõ trúng đích để đánh đuổi bọn đạo tặc này chạy biến xuống hầm ngay!" }
        ],
        postGame: [
            { character: 'monkey', text: "Lũ tay sai đã khiếp sợ lẩn trốn. Kho báu của lâu đài đã được bảo vệ." }
        ]
    },
    550: {
        minigame: 'racing',
        preGame: [
            { character: 'monkey', text: "Tướng Cướp đang ôm Vương miện vắt chân lên cổ chạy qua hành lang Hoàng gia." },
            { character: 'monkey', text: "Cùng nhảy lên lưng Sư Tử Vàng, gõ phím tăng tốc đuổi theo hắn thật nhanh nào!" }
        ],
        postGame: [
            { character: 'monkey', text: "Sư Tử Vàng phi nước đại cực kỳ dũng mãnh! Hắn không thể thoát khỏi tầm mắt chúng ta." }
        ]
    },
    551: {
        minigame: 'grow_plant',
        preGame: [
            { character: 'monkey', text: "Một cái bẫy vực sâu đột ngột mở ra chắn ngang hành lang. Không thể nhảy qua được." },
            { character: 'monkey', text: "Hãy gieo hạt giống cây Thần Kỳ, gõ đúng để chúng mọc cao thành cây cầu vắt ngang vực!" }
        ],
        postGame: [
            { character: 'monkey', text: "Cầu cây thần kỳ vô cùng kiên cố. Cùng cẩn thận bước qua khoảng trống sâu thẳm này." }
        ]
    },
    552: {
        minigame: 'catch_insects',
        preGame: [
            { character: 'monkey', text: "Đường dẫn lên sân thượng tối om vì Tướng Cướp đã dập tắt hết đuốc." },
            { character: 'monkey', text: "Dùng vợt vung khéo léo bắt những chú Bướm Phát Sáng vào lồng đèn để soi đường đi tiếp." }
        ],
        postGame: [
            { character: 'monkey', text: "Lồng đèn tỏa ánh sáng lung linh. Từng bậc thang cẩm thạch đã hiện ra rõ ràng." }
        ]
    },
    553: {
        minigame: 'frog_jump',
        preGame: [
            { character: 'monkey', text: "Phía trước là sàn gạch có gắn bẫy mũi tên độc, chỉ có vài hòn đá nhô ra là an toàn." },
            { character: 'monkey', text: "Gõ đúng nhịp để búng người nhảy chuẩn xác lên các hòn đá, tuyệt đối đừng bước sai!" }
        ],
        postGame: [
            { character: 'monkey', text: "Những bước nhảy thật hoàn hảo! Chúng ta đã vượt qua đoạn hành lang nguy hiểm an toàn." }
        ]
    },
    554: {
        minigame: 'collect_items',
        preGame: [
            { character: 'boss', text: "Ta sẽ vứt vương vãi những viên Hồng Ngọc này! Vương miện sẽ mất đi sức mạnh!" },
            { character: 'monkey', text: "Hồng Ngọc chứa năng lượng hoàng gia! Nhanh tay thu thập chúng vào túi trước khi bị lăn xuống vực." }
        ],
        postGame: [
            { character: 'monkey', text: "Đã thu thập đủ Hồng Ngọc. Ánh sáng của công lý đang bừng lên rực rỡ!" }
        ]
    },
    555: {
        minigame: 'assemble_object',
        preGame: [
            { character: 'monkey', text: "Chiếc Chìa Khóa Hoàng Gia mở cửa sân thượng đã bị Tướng Cướp bẻ gãy." },
            { character: 'monkey', text: "Hãy gõ phím ráp các mảnh vàng ròng lại để sửa chiếc chìa khóa này nhé." }
        ],
        postGame: [
            { character: 'monkey', text: "Chìa khóa đã nguyên vẹn. Cánh cửa sân thượng vĩ đại đã được mở toang!" }
        ]
    },
    556: {
        minigame: 'clear_fog',
        preGame: [
            { character: 'boss', text: "Lũ nhãi ranh lỳ lợm! Cơn lốc tro bụi này sẽ chôn vùi các ngươi trên sân thượng!" },
            { character: 'monkey', text: "Gió rít mạnh mang theo bụi mù mịt! Gõ thật nhanh tạo luồng gió đối nghịch xua tan lốc bụi này ngay!" }
        ],
        postGame: [
            { character: 'monkey', text: "Lốc bụi đã tan biến. Tướng Cướp đang bị dồn vào mép sân thượng!" }
        ]
    },
    557: {
        minigame: 'bubble_shooter',
        preGame: [
            { character: 'monkey', text: "Hắn đang điên cuồng ném những phiến đá hoa cương lớn về phía chúng ta." },
            { character: 'monkey', text: "Ngắm thật chuẩn và bắn vỡ vụn những phiến đá đó giữa không trung để dọn đường!" }
        ],
        postGame: [
            { character: 'monkey', text: "Đá vỡ nát thành cát bụi. Tướng Cướp đã cạn kiệt vũ khí và không còn đường lui." }
        ]
    },
    558: {
        minigame: 'assemble_object',
        preGame: [
            { character: 'monkey', text: "Tướng Cướp vẫn đang ngoan cố giữ chặt Vương miện. Chúng ta cần sức mạnh ánh sáng mạnh nhất." },
            { character: 'monkey', text: "Hãy ráp các Mảnh Khiên Hoàng Gia lại thành vũ khí phòng ngự chói lòa bất khả chiến bại!" }
        ],
        postGame: [
            { character: 'monkey', text: "Khiên Hoàng Gia tỏa sáng rực rỡ áp đảo mọi thế lực đen tối! Tiến lên tóm gọn Tướng Cướp và lấy lại Vương miện thôi!" }
        ]
    },
    // Lesson 560 - 572 (Group: Lâu đài, Chapter 41:  'Rồng nhỏ', Boss: Tướng Cướp)
    560: {
        minigame: 'clear_fog',
        preGame: [
            { character: 'monkey', text: "Chúng ta đã đến Hang Rồng dưới lòng Lâu Đài! Nhưng Tướng Cướp đã thả bom khói đen kịt che kín lối vào." },
            { character: 'boss', text: "Khà khà! Bí mật của loài rồng sẽ thuộc về ta, các ngươi đừng hòng cản bước!" },
            { character: 'monkey', text: "Không thể để hắn làm càn! Hãy gõ phím tạo luồng cuồng phong xua tan màn khói đen này ngay!" }
        ],
        postGame: [
            { character: 'monkey', text: "Khói đen đã bị thổi bay. Cửa hang khổng lồ đã lộ diện, mau tiến vào trong thôi!" }
        ]
    },
    561: {
        minigame: 'rescue_animals',
        preGame: [
            { character: 'monkey', text: "Nguy rồi! Tướng Cướp đã dùng một tấm lưới thép gai trói chặt bạn Rồng Nhỏ đáng thương." },
            { character: 'monkey', text: "Nhanh tay gõ phím thật chính xác để phá vỡ lưới thép và giải cứu Rồng Nhỏ ra ngoài!" }
        ],
        postGame: [
            { character: 'monkey', text: "Rồng Nhỏ đã được tự do, tung cánh khạc ra một tia lửa nhỏ mừng rỡ. Chúng ta có thêm người bạn mạnh mẽ!" }
        ]
    },
    562: {
        minigame: 'bubble_shooter',
        preGame: [
            { character: 'boss', text: "Nếm thử những quả lựu đạn hắc ín của ta đi! Cả hang động này sẽ nổ tung!" },
            { character: 'monkey', text: "Hắn đang ném lựu đạn từ mỏm đá cao! Ngắm thật chuẩn và bắn vỡ chúng ngay trên không trung!" }
        ],
        postGame: [
            { character: 'monkey', text: "Lựu đạn đã nổ tung an toàn trên cao. Hang động vẫn vững chãi và không bị sụp đổ." }
        ]
    },
    563: {
        minigame: 'whack_mole',
        preGame: [
            { character: 'monkey', text: "Lũ đạo tặc tay sai đang chui lên từ các hốc đá để ăn trộm trứng rồng." },
            { character: 'monkey', text: "Cầm búa lên, gõ trúng đích để đánh đuổi bọn trộm này chạy thục mạng xuống hang sâu!" }
        ],
        postGame: [
            { character: 'monkey', text: "Lũ tay sai đã khiếp sợ vứt lại túi đồ bỏ chạy. Tổ trứng rồng đã được an toàn." }
        ]
    },
    564: {
        minigame: 'racing',
        preGame: [
            { character: 'monkey', text: "Tướng Cướp đang nhảy lên một chiếc xe goòng để tẩu thoát theo đường ray hầm mỏ." },
            { character: 'monkey', text: "Cùng leo lên lưng Rồng Nhỏ, gõ phím để vỗ cánh bay thật nhanh đuổi theo hắn nào!" }
        ],
        postGame: [
            { character: 'monkey', text: "Rồng Nhỏ bay lượn cực kỳ linh hoạt trong hầm! Hắn không thể thoát khỏi tầm mắt chúng ta." }
        ]
    },
    565: {
        minigame: 'grow_plant',
        preGame: [
            { character: 'monkey', text: "Đường ray đã bị đứt gãy qua một dòng nham thạch nóng chảy. Không thể bay qua vùng khí nóng này." },
            { character: 'monkey', text: "Hãy gieo Hạt Giống Thạch Anh, gõ đúng để chúng mọc vươn ra thành cây cầu pha lê vắt ngang!" }
        ],
        postGame: [
            { character: 'monkey', text: "Cầu pha lê vô cùng kiên cố và chịu nhiệt tốt. Cùng cẩn thận bước qua dòng nham thạch nào." }
        ]
    },
    566: {
        minigame: 'catch_insects',
        preGame: [
            { character: 'monkey', text: "Khu vực này của hang rồng tối om, nham thạch cũng đã nguội lạnh không còn phát sáng." },
            { character: 'monkey', text: "Dùng vợt vung khéo léo bắt những bạn Tinh Linh Lửa đang nhảy múa vào lồng đèn để soi đường đi." }
        ],
        postGame: [
            { character: 'monkey', text: "Lồng đèn Tinh Linh Lửa tỏa ánh sáng đỏ rực rỡ. Đường hầm đã sáng tỏ lối đi." }
        ]
    },
    567: {
        minigame: 'frog_jump',
        preGame: [
            { character: 'monkey', text: "Phía trước là bãi đá bập bênh trên hồ bùn sôi, chỉ có vài tảng đá núi lửa là vững chắc." },
            { character: 'monkey', text: "Gõ đúng nhịp để búng người nhảy chuẩn xác lên các tảng đá lớn, tuyệt đối đừng bước hụt xuống hồ!" }
        ],
        postGame: [
            { character: 'monkey', text: "Những bước nhảy thật hoàn hảo! Chúng ta đã an toàn vượt qua hồ bùn sôi nguy hiểm." }
        ]
    },
    568: {
        minigame: 'collect_items',
        preGame: [
            { character: 'boss', text: "Ta sẽ đập nát những chiếc Vảy Rồng Đỏ này! Các ngươi sẽ không có giáp bảo vệ!" },
            { character: 'monkey', text: "Vảy Rồng Đỏ chứa sức mạnh hỏa diệm! Nhanh tay thu thập chúng vào túi trước khi bị phá hủy." }
        ],
        postGame: [
            { character: 'monkey', text: "Đã thu thập đủ Vảy Rồng Đỏ. Năng lượng ấm áp và mạnh mẽ đang tràn ngập cơ thể chúng ta!" }
        ]
    },
    569: {
        minigame: 'assemble_object',
        preGame: [
            { character: 'monkey', text: "Cánh Cửa Sắt ngăn cách sào huyệt đã bị Tướng Cướp phá hỏng cơ quan mở khóa." },
            { character: 'monkey', text: "Hãy gõ phím ráp các bánh răng và dây xích lại để khôi phục cơ quan, mở tung cánh cửa này." }
        ],
        postGame: [
            { character: 'monkey', text: "Cơ quan đã hoạt động. Rầm rầm! Cánh cửa sắt khổng lồ đã mở ra lối vào sào huyệt cuối cùng!" }
        ]
    },
    570: {
        minigame: 'clear_fog',
        preGame: [
            { character: 'boss', text: "Lũ nhãi ranh lỳ lợm! Cơn bão tro núi lửa này sẽ làm các ngươi ngạt thở!" },
            { character: 'monkey', text: "Tro bụi núi lửa bay mịt mù cay xè mắt! Gõ thật nhanh tạo luồng gió đối nghịch xua tan bão tro này!" }
        ],
        postGame: [
            { character: 'monkey', text: "Bão tro đã tan biến. Tướng Cướp đang bị dồn vào chân tường ở sảnh lớn của hang!" }
        ]
    },
    571: {
        minigame: 'bubble_shooter',
        preGame: [
            { character: 'monkey', text: "Hắn đang điên cuồng ném những quả chùy gai rực lửa về phía chúng ta." },
            { character: 'monkey', text: "Ngắm thật chuẩn và bắn vỡ vụn những quả chùy gai đó giữa không trung để bảo vệ đội hình!" }
        ],
        postGame: [
            { character: 'monkey', text: "Chùy gai nổ tung thành mảnh sắt vụn. Tướng Cướp đã cạn kiệt mọi thứ để ném rồi." }
        ]
    },
    572: {
        minigame: 'assemble_object',
        preGame: [
            { character: 'monkey', text: "Tướng Cướp đang rút thanh đao lớn lao tới. Chúng ta cần sức mạnh phòng ngự của loài rồng." },
            { character: 'monkey', text: "Hãy ráp các Vảy Rồng Đỏ lại thành chiếc Khiên Long Hỏa chói lòa bất khả chiến bại!" }
        ],
        postGame: [
            { character: 'monkey', text: "Khiên Long Hỏa rực sáng ngọn lửa chính nghĩa! Tiến lên hạ gục Tướng Cướp và bảo vệ bình yên cho lâu đài thôi!" }
        ]
    },
    // Lesson 574 - 586 (Group: Lâu đài, Chapter 42:  'Trận thắng', Boss: Tướng Cướp)
    574: {
        minigame: 'clear_fog',
        preGame: [
            { character: 'monkey', text: "Đã đến Đại Sảnh Chiến Thắng! Nhưng Tướng Cướp đã ném bom khói mù mịt hòng tìm đường tẩu thoát." },
            { character: 'boss', text: "Khà khà! Ta sẽ ôm trọn kho báu này và biến mất vào màn đêm!" },
            { character: 'monkey', text: "Đừng hòng trốn thoát! Gõ phím tạo cuồng phong thổi bay làn khói này ngay!" }
        ],
        postGame: [
            { character: 'monkey', text: "Khói đã tan. Cửa Đại Sảnh đã bị khóa chặt, hắn không thể chạy xa được." }
        ]
    },
    575: {
        minigame: 'rescue_animals',
        preGame: [
            { character: 'monkey', text: "Hắn đã nhốt bạn Chó Săn Hoàng Gia vào một lồng sắt kiên cố để cản đường chúng ta." },
            { character: 'monkey', text: "Nhanh tay gõ phím thật chính xác để bẻ gãy lồng sắt và giải cứu bạn ấy!" }
        ],
        postGame: [
            { character: 'monkey', text: "Chó Săn Hoàng Gia đã được tự do. Bạn ấy đang đánh hơi tìm ra dấu vết của Tướng Cướp." }
        ]
    },
    576: {
        minigame: 'bubble_shooter',
        preGame: [
            { character: 'boss', text: "Nếm thử những thùng thuốc súng cuối cùng của ta đi! Lâu đài này sẽ tan tành!" },
            { character: 'monkey', text: "Hắn đang ném thuốc súng từ ban công xuống! Ngắm thật chuẩn và bắn nổ chúng trên không trung!" }
        ],
        postGame: [
            { character: 'monkey', text: "Thuốc súng nổ tung như pháo hoa chiến thắng. Cấu trúc Đại Sảnh vẫn an toàn." }
        ]
    },
    577: {
        minigame: 'whack_mole',
        preGame: [
            { character: 'monkey', text: "Lũ tàn quân của Tướng Cướp đang trốn sau những bức tượng ngọc để chờ thời cơ đánh lén." },
            { character: 'monkey', text: "Cầm búa lên, gõ trúng đích để tóm gọn đám tàn quân này, không để một tên nào lọt lưới!" }
        ],
        postGame: [
            { character: 'monkey', text: "Toàn bộ tay sai đã bị bắt trói. Bây giờ chỉ còn lại một mình Tướng Cướp." }
        ]
    },
    578: {
        minigame: 'racing',
        preGame: [
            { character: 'monkey', text: "Hắn đang đu mình theo đường ống nước để nhảy ra khỏi tường thành!" },
            { character: 'monkey', text: "Cùng bám vào đuôi dây ròng rọc, gõ phím tăng tốc trượt đuổi theo hắn ngay lập tức!" }
        ],
        postGame: [
            { character: 'monkey', text: "Tốc độ trượt thật kinh khủng! Chúng ta đã chặn đứng hắn ngay tại mép sân thượng thành." }
        ]
    },
    579: {
        minigame: 'grow_plant',
        preGame: [
            { character: 'monkey', text: "Khoảng sân thượng này đã bị sập một mảng lớn. Hắn định dùng phi thân để bay qua." },
            { character: 'monkey', text: "Hãy gieo hạt giống Cây Khổng lồ, gõ đúng để chúng mọc bện lại thành cầu vắt ngang!" }
        ],
        postGame: [
            { character: 'monkey', text: "Cây cầu vô cùng vững chãi. Chúng ta tiếp tục ép sát Tướng Cướp." }
        ]
    },
    580: {
        minigame: 'catch_insects',
        preGame: [
            { character: 'monkey', text: "Góc sân thượng này khuất bóng trăng, tối om không nhìn rõ mặt người." },
            { character: 'monkey', text: "Dùng vợt bắt những bạn Đom Đóm Chiến Thắng vào đèn lồng để soi rõ bộ mặt thật của hắn." }
        ],
        postGame: [
            { character: 'monkey', text: "Đèn lồng sáng rực! Hắn đang co rúm lại ở góc tường không lối thoát." }
        ]
    },
    581: {
        minigame: 'frog_jump',
        preGame: [
            { character: 'monkey', text: "Hắn đã gài bẫy chông dưới mặt sàn, chỉ còn vài trụ đá là không bị sập." },
            { character: 'monkey', text: "Gõ đúng nhịp để búng người nhảy chuẩn xác lên các trụ đá, đừng để hụt chân vào bẫy!" }
        ],
        postGame: [
            { character: 'monkey', text: "Thật nhẹ nhàng và chính xác! Chúng ta đã áp sát hắn hoàn toàn." }
        ]
    },
    582: {
        minigame: 'collect_items',
        preGame: [
            { character: 'boss', text: "Ta không ăn được thì các ngươi cũng đừng hòng! Quăng hết Huy Hiệu Hoàng Gia đi này!" },
            { character: 'monkey', text: "Huy Hiệu là niềm tự hào của vương quốc! Nhanh tay nhặt chúng lại trước khi rơi xuống vực." }
        ],
        postGame: [
            { character: 'monkey', text: "Đã thu hồi toàn bộ Huy Hiệu Hoàng Gia. Tướng Cướp đã hết bài để chơi rồi." }
        ]
    },
    583: {
        minigame: 'assemble_object',
        preGame: [
            { character: 'monkey', text: "Sợi xích phép thuật dùng để trói phạm nhân đã bị hắn cắn đứt." },
            { character: 'monkey', text: "Hãy gõ phím ráp các mắt xích thép lại để khôi phục sợi xích trói chặt tên ác ôn này." }
        ],
        postGame: [
            { character: 'monkey', text: "Sợi xích đã nguyên vẹn và cực kỳ chắc chắn. Sẵn sàng khóa tay hắn lại." }
        ]
    },
    584: {
        minigame: 'clear_fog',
        preGame: [
            { character: 'boss', text: "Các ngươi ép ta quá đáng! Cơn bão cuồng nộ cuối cùng này sẽ chôn vùi tất cả!" },
            { character: 'monkey', text: "Gió giật tung mang theo dông bão! Gõ thật nhanh tạo luồng sức mạnh công lý đánh tan cơn bão này!" }
        ],
        postGame: [
            { character: 'monkey', text: "Bão tố đã quang tạnh. Tướng Cướp đã gục ngã và không còn sức phản kháng." }
        ]
    },
    585: {
        minigame: 'bubble_shooter',
        preGame: [
            { character: 'monkey', text: "Hắn đang vung vẩy những hòn đá cuối cùng trong tuyệt vọng." },
            { character: 'monkey', text: "Ngắm thật chuẩn và bắn nổ những hòn đá đó giữa không trung để tước vũ khí của hắn!" }
        ],
        postGame: [
            { character: 'monkey', text: "Hòn đá rơi lả tả thành đống sắt vụn. Trận chiến đã thực sự ngã ngũ." }
        ]
    },
    586: {
        minigame: 'assemble_object',
        preGame: [
            { character: 'monkey', text: "Giờ phút chiến thắng đã điểm. Chúng ta cần biểu tượng cao quý nhất của Lâu Đài." },
            { character: 'monkey', text: "Hãy ráp những Mảnh Vàng Danh Dự lại thành chiếc Cúp Chiến Thắng chói lòa!" }
        ],
        postGame: [
            { character: 'monkey', text: "Cúp Chiến Thắng rực rỡ được giương cao! Tướng Cướp đã bị trừng trị, Lâu Đài đã vĩnh viễn được bình yên!" }
        ]
    },
    // Lesson 588 - 600 (Group: Vũ trụ, Chapter 43:  'Tên lửa', Boss: Alien Hắc Ám)
    588: {
        minigame: 'clear_fog',
        preGame: [
            { character: 'monkey', text: "Chúng ta đã đến bệ phóng Tên Lửa! Nhưng Alien Hắc Ám đã phun sương mù từ tính dày đặc che khuất tầm nhìn." },
            { character: 'boss', text: "Khà khà! Tên Lửa của các ngươi sẽ rỉ sét ở đây, Trái Đất này sẽ chìm trong bóng tối!" },
            { character: 'monkey', text: "Đừng hòng cản bước! Hãy gõ phím tạo bão lốc năng lượng thổi bay màn sương mù từ tính này ngay!" }
        ],
        postGame: [
            { character: 'monkey', text: "Sương mù đã tan biến. Chiếc Tên Lửa siêu tốc sừng sững trên bệ phóng đã sẵn sàng khởi hành." }
        ]
    },
    589: {
        minigame: 'rescue_animals',
        preGame: [
            { character: 'monkey', text: "Nguy rồi! Alien Hắc Ám đã nhốt bạn Chó Vũ Trụ vào một buồng giam tia laser." },
            { character: 'monkey', text: "Nhanh tay gõ phím thật chính xác để giải mã hệ thống an ninh và cứu Chó Vũ Trụ ra ngoài!" }
        ],
        postGame: [
            { character: 'monkey', text: "Chó Vũ Trụ đã được tự do, sủa vang vẫy đuôi. Chúng ta có thêm một phi hành gia dũng cảm!" }
        ]
    },
    590: {
        minigame: 'bubble_shooter',
        preGame: [
            { character: 'boss', text: "Nhận lấy những quả cầu phản vật chất này đi! Căn cứ của các ngươi sẽ nổ tung!" },
            { character: 'monkey', text: "Hắn đang bắn cầu phản vật chất từ phi thuyền! Ngắm bắn vỡ chúng ngay trước khi chúng chạm đất!" }
        ],
        postGame: [
            { character: 'monkey', text: "Những quả cầu đã vỡ tung thành ánh sáng vô hại. Bệ phóng Tên Lửa đã được bảo vệ an toàn." }
        ]
    },
    591: {
        minigame: 'whack_mole',
        preGame: [
            { character: 'monkey', text: "Lũ bọ máy không gian tay sai của Alien đang bò ra cắn đứt cáp truyền nhiên liệu." },
            { character: 'monkey', text: "Cầm búa lên, gõ trúng đích để đập nát bầy bọ máy này, bảo toàn nhiên liệu cho Tên Lửa!" }
        ],
        postGame: [
            { character: 'monkey', text: "Lũ bọ máy đã bị nghiền nát thành phế liệu. Ống dẫn nhiên liệu vẫn hoạt động tốt." }
        ]
    },
    592: {
        minigame: 'racing',
        preGame: [
            { character: 'monkey', text: "Alien Hắc Ám đang cưỡi Đĩa Bay tăng tốc thoát khỏi bầu khí quyển!" },
            { character: 'monkey', text: "Vào khoang lái Tên Lửa, gõ phím kích hoạt động cơ phản lực đuổi theo hắn thẳng tiến ra vũ trụ!" }
        ],
        postGame: [
            { character: 'monkey', text: "Tên Lửa xé gió xông thẳng lên không gian! Chúng ta đang bám sát đuôi chiếc Đĩa Bay của hắn." }
        ]
    },
    593: {
        minigame: 'grow_plant',
        preGame: [
            { character: 'monkey', text: "Một vành đai rác vũ trụ dày đặc chắn ngang quỹ đạo, Tên Lửa không thể tự đâm xuyên qua." },
            { character: 'monkey', text: "Hãy gieo Hạt Giống Cây Tinh Thể, gõ đúng để nó vươn nhánh tạo thành ống luồng an toàn!" }
        ],
        postGame: [
            { character: 'monkey', text: "Nhánh cây tinh thể đẩy dạt rác vũ trụ sang hai bên. Tên Lửa dễ dàng bay xuyên qua." }
        ]
    },
    594: {
        minigame: 'catch_insects',
        preGame: [
            { character: 'monkey', text: "Chúng ta đang bay vào vùng tinh vân tối, hệ thống chiếu sáng của khoang lái bị chập mạch." },
            { character: 'monkey', text: "Dùng lưới từ trường bắt những Tinh Tú Nhỏ lấp lánh vào buồng năng lượng để thắp sáng nhé." }
        ],
        postGame: [
            { character: 'monkey', text: "Buồng năng lượng Tinh Tú tỏa ánh sáng rực rỡ. Khoang lái lại sáng bừng như ban ngày." }
        ]
    },
    595: {
        minigame: 'frog_jump',
        preGame: [
            { character: 'monkey', text: "Phía trước là bãi mìn từ tính trôi nổi, chỉ có vài bệ tiếp sóng không gian là an toàn để dừng." },
            { character: 'monkey', text: "Gõ đúng nhịp để điều khiển Tên Lửa nhảy cóc qua các bệ tiếp sóng, tuyệt đối đừng va vào mìn!" }
        ],
        postGame: [
            { character: 'monkey', text: "Cú lướt quỹ đạo thật hoàn hảo! Chúng ta đã an toàn băng qua bãi mìn từ tính nguy hiểm." }
        ]
    },
    596: {
        minigame: 'collect_items',
        preGame: [
            { character: 'boss', text: "Ta sẽ bắn nát những Lõi Năng Lượng Plasma này! Tên Lửa của các ngươi sẽ chết máy giữa vũ trụ!" },
            { character: 'monkey', text: "Lõi Plasma là nhiên liệu sinh tồn! Nhanh tay dùng cánh tay robot thu thập trước khi bị phá hủy." }
        ],
        postGame: [
            { character: 'monkey', text: "Đã thu thập đủ Lõi Plasma. Động cơ Tên Lửa lại hoạt động với công suất tối đa!" }
        ]
    },
    597: {
        minigame: 'assemble_object',
        preGame: [
            { character: 'monkey', text: "Radar định vị của Tên Lửa đã bị hỏng do va phải thiên thạch nhỏ." },
            { character: 'monkey', text: "Hãy gõ phím ráp các linh kiện vi mạch siêu dẫn lại để sửa Radar, tìm ra tọa độ của Alien Hắc Ám." }
        ],
        postGame: [
            { character: 'monkey', text: "Radar đã hoạt động bình thường! Tọa độ sào huyệt của hắn trên tiểu hành tinh đã được xác định." }
        ]
    },
    598: {
        minigame: 'clear_fog',
        preGame: [
            { character: 'boss', text: "Lũ sinh vật Trái Đất lỳ lợm! Cơn bão bụi sao chổi này sẽ chôn vùi Tên Lửa của các ngươi!" },
            { character: 'monkey', text: "Bụi sao chổi che khuất toàn bộ kính chắn gió! Gõ thật nhanh bật khiên năng lượng đẩy lùi cơn bão này!" }
        ],
        postGame: [
            { character: 'monkey', text: "Bão bụi đã bị thổi dạt. Căn cứ hắc ám trên tiểu hành tinh đang nằm ngay trước mũi Tên Lửa!" }
        ]
    },
    599: {
        minigame: 'bubble_shooter',
        preGame: [
            { character: 'monkey', text: "Hắn đang điên cuồng phóng những khối thiên thạch nhân tạo gai góc về phía Tên Lửa." },
            { character: 'monkey', text: "Kích hoạt pháo Laser! Ngắm thật chuẩn và bắn nát những khối thiên thạch đó giữa không gian!" }
        ],
        postGame: [
            { character: 'monkey', text: "Thiên thạch vỡ vụn thành cát bụi vũ trụ. Hệ thống phòng thủ của hắn đã bị chọc thủng." }
        ]
    },
    600: {
        minigame: 'assemble_object',
        preGame: [
            { character: 'monkey', text: "Alien Hắc Ám đang bước ra thách thức. Chúng ta cần lớp giáp mạnh nhất của nền văn minh Trái Đất." },
            { character: 'monkey', text: "Hãy ráp các Mảnh Hợp Kim Titan lại thành chiếc Khiên Vệ Tinh bất khả chiến bại!" }
        ],
        postGame: [
            { character: 'monkey', text: "Khiên Vệ Tinh rực sáng tỏa năng lượng vô cực! Bước ra khỏi Tên Lửa và tóm gọn Alien Hắc Ám thôi!" }
        ]
    },
    // Lesson 602 - 614 (Group: Vũ trụ, Chapter 44:  'Trái đất', Boss: Alien Hắc Ám)
    602: {
        minigame: 'clear_fog',
        preGame: [
            { character: 'monkey', text: "Trái Đất thân yêu đây rồi! Nhưng Alien Hắc Ám đã bao phủ quê hương chúng ta bằng một lớp mây độc mịt mù." },
            { character: 'boss', text: "Khà khà! Hành tinh xanh này sẽ sớm trở thành thuộc địa tăm tối của ta thôi!" },
            { character: 'monkey', text: "Không bao giờ! Hãy gõ phím tạo ra cơn lốc sinh mệnh để thổi bay đám mây độc này đi!" }
        ],
        postGame: [
            { character: 'monkey', text: "Mây độc đã tan biến. Trái Đất xanh thẳm và tuyệt đẹp lại hiện ra, chúng ta phải bảo vệ nó!" }
        ]
    },
    603: {
        minigame: 'rescue_animals',
        preGame: [
            { character: 'monkey', text: "Nguy rồi! Alien Hắc Ám đã dùng lưới từ trường giam giữ bạn Vệ Tinh Hòa Bình." },
            { character: 'monkey', text: "Nhanh tay gõ phím thật chính xác để phá vỡ lưới từ trường và giải cứu Vệ Tinh ngay!" }
        ],
        postGame: [
            { character: 'monkey', text: "Vệ Tinh Hòa Bình đã được tự do và đang phát sóng lá chắn bảo vệ. Quá tuyệt vời!" }
        ]
    },
    604: {
        minigame: 'bubble_shooter',
        preGame: [
            { character: 'boss', text: "Nhận lấy cơn mưa acid vũ trụ này đi! Bầu khí quyển của các ngươi sẽ bị ăn mòn!" },
            { character: 'monkey', text: "Hắn đang thả các chai acid khổng lồ! Ngắm bắn vỡ chúng ngay trên không trung trước khi chúng rơi xuống!" }
        ],
        postGame: [
            { character: 'monkey', text: "Các chai acid đã nổ tung thành hơi nước vô hại. Bầu trời Trái Đất vẫn hoàn toàn trong lành." }
        ]
    },
    605: {
        minigame: 'whack_mole',
        preGame: [
            { character: 'monkey', text: "Lũ bọ máy tay sai của Alien đang lao xuống định chọc thủng tầng ozone." },
            { character: 'monkey', text: "Cầm búa lên, gõ trúng đích để đập nát lũ bọ máy này, bảo vệ bầu khí quyển!" }
        ],
        postGame: [
            { character: 'monkey', text: "Lũ bọ máy đã bị đập nát thành phế liệu. Tầng ozone vẫn an toàn che chở cho chúng ta." }
        ]
    },
    606: {
        minigame: 'racing',
        preGame: [
            { character: 'monkey', text: "Alien Hắc Ám đang lao phi thuyền mẹ xuống mặt đất để trốn chạy." },
            { character: 'monkey', text: "Cùng lên Tàu Lượn Siêu Tốc, gõ phím tăng tốc xé gió bám theo hắn vút qua các tầng mây nào!" }
        ],
        postGame: [
            { character: 'monkey', text: "Tốc độ của Tàu Lượn thật đáng kinh ngạc! Chúng ta đang bám sát đuôi phi thuyền của hắn." }
        ]
    },
    607: {
        minigame: 'grow_plant',
        preGame: [
            { character: 'monkey', text: "Sóng xung kích từ phi thuyền của hắn đã tạo ra một vực thẳm lớn cản đường." },
            { character: 'monkey', text: "Hãy gieo hạt giống cây Ngàn Sao, gõ đúng để rễ cây khổng lồ vươn ra làm cầu vắt ngang!" }
        ],
        postGame: [
            { character: 'monkey', text: "Cầu cây ngàn sao vô cùng vững chãi và đầy sức sống. Cùng cẩn thận bước qua vực thẳm nào." }
        ]
    },
    608: {
        minigame: 'catch_insects',
        preGame: [
            { character: 'monkey', text: "Hắn đã kích hoạt máy tạo bóng tối che khuất ánh mặt trời, xung quanh tối đen như mực." },
            { character: 'monkey', text: "Dùng vợt bắt những Tinh Linh Cực Quang lấp lánh vào lồng kính để thắp sáng lối đi." }
        ],
        postGame: [
            { character: 'monkey', text: "Lồng kính cực quang rực rỡ sắc màu. Chúng ta đã có thể nhìn rõ đường để tiến lên." }
        ]
    },
    609: {
        minigame: 'frog_jump',
        preGame: [
            { character: 'monkey', text: "Phía trước là bãi mảnh vỡ vệ tinh đang rơi rụng tự do giữa không trung." },
            { character: 'monkey', text: "Gõ đúng nhịp để nhảy chuẩn xác qua các mảnh vỡ lớn nhất, tuyệt đối đừng để trượt chân rớt xuống!" }
        ],
        postGame: [
            { character: 'monkey', text: "Những bước nhảy phi thường! Chúng ta đã an toàn vượt qua khu vực mảnh vỡ nguy hiểm." }
        ]
    },
    610: {
        minigame: 'collect_items',
        preGame: [
            { character: 'boss', text: "Ta sẽ hút cạn những Tinh Thể Sinh Mệnh này! Hành tinh của các ngươi sẽ chết dần!" },
            { character: 'monkey', text: "Tinh Thể Sinh Mệnh là cội nguồn của Trái Đất! Nhanh tay thu thập chúng vào túi trước khi bị hắn cướp mất." }
        ],
        postGame: [
            { character: 'monkey', text: "Đã thu thập đủ Tinh Thể Sinh Mệnh. Năng lượng của Trái Đất đang bùng nổ trong chúng ta!" }
        ]
    },
    611: {
        minigame: 'assemble_object',
        preGame: [
            { character: 'monkey', text: "Pháo Đài Phòng Thủ của Trái Đất đã bị tia laser của Alien bắn đứt các mạch điện." },
            { character: 'monkey', text: "Hãy gõ phím ráp các lõi năng lượng và dây cáp lại để sửa chữa Pháo Đài ngay lập tức." }
        ],
        postGame: [
            { character: 'monkey', text: "Pháo Đài đã hoạt động trở lại! Nó đang khóa mục tiêu thẳng vào sào huyệt của Alien Hắc Ám." }
        ]
    },
    612: {
        minigame: 'clear_fog',
        preGame: [
            { character: 'boss', text: "Các ngươi thật ngoan cố! Bão từ trường hủy diệt này sẽ xé nát mọi thứ thành cám!" },
            { character: 'monkey', text: "Cơn bão từ trường đang cuốn phăng mọi thứ! Gõ thật nhanh tạo khiên phản từ đánh tan cơn bão này!" }
        ],
        postGame: [
            { character: 'monkey', text: "Bão từ trường đã bị vô hiệu hóa hoàn toàn. Căn cứ đáp đất của Alien đang sừng sững trước mặt!" }
        ]
    },
    613: {
        minigame: 'bubble_shooter',
        preGame: [
            { character: 'monkey', text: "Hắn đang điên cuồng phóng những quả cầu năng lượng đen từ pháo chính của phi thuyền." },
            { character: 'monkey', text: "Ngắm thật chuẩn và bắn nát những quả cầu năng lượng đó giữa không trung để bảo vệ mặt đất!" }
        ],
        postGame: [
            { character: 'monkey', text: "Cầu năng lượng nổ tung thành pháo hoa rực rỡ. Alien Hắc Ám đã hết vũ khí tấn công." }
        ]
    },
    614: {
        minigame: 'assemble_object',
        preGame: [
            { character: 'monkey', text: "Trận chiến quyết định vận mệnh Trái Đất đã đến. Chúng ta cần lớp phòng ngự tuyệt đối từ Đất Mẹ." },
            { character: 'monkey', text: "Hãy ráp những Mảnh Đá Gaia lại thành chiếc Khiên Trái Đất chói lòa bất khả chiến bại!" }
        ],
        postGame: [
            { character: 'monkey', text: "Khiên Trái Đất rực sáng năng lượng sự sống! Tiến lên đánh đuổi Alien Hắc Ám và mang lại hòa bình cho địa cầu thôi!" }
        ]
    },
    // Lesson 616 - 628 (Group: Vũ trụ, Chapter 45:  'Mặt trăng', Boss: Alien Hắc Ám)
    616: {
        minigame: 'clear_fog',
        preGame: [
            { character: 'monkey', text: "Chúng ta đã hạ cánh xuống Mặt Trăng! Nhưng Alien Hắc Ám đã thả mây bụi xám xịt che khuất mọi thứ." },
            { character: 'boss', text: "Khà khà! Mặt trăng sẽ chìm trong bóng tối lạnh lẽo vĩnh cửu của ta!" },
            { character: 'monkey', text: "Đừng hòng! Hãy gõ phím tạo bão vũ trụ thổi bay màn sương xám này đi!" }
        ],
        postGame: [
            { character: 'monkey', text: "Sương mù đã tan biến. Bề mặt Mặt Trăng đầy miệng núi lửa hiện ra rõ ràng." }
        ]
    },
    617: {
        minigame: 'rescue_animals',
        preGame: [
            { character: 'monkey', text: "Nguy rồi! Alien Hắc Ám đã dùng lồng trọng lực nhốt bạn Thỏ Ngọc." },
            { character: 'monkey', text: "Nhanh tay gõ phím thật chính xác để phá vỡ lồng trọng lực và cứu Thỏ Ngọc ra ngoài!" }
        ],
        postGame: [
            { character: 'monkey', text: "Thỏ Ngọc đã được tự do nhảy nhót trong môi trường không trọng lực. Tuyệt vời!" }
        ]
    },
    618: {
        minigame: 'bubble_shooter',
        preGame: [
            { character: 'boss', text: "Nhận lấy những quả cầu hố đen thu nhỏ này đi! Căn cứ Mặt Trăng sẽ bị nghiền nát!" },
            { character: 'monkey', text: "Hắn đang bắn cầu hố đen! Ngắm bắn vỡ chúng ngay trước khi chúng hút cạn mọi thứ của chúng ta!" }
        ],
        postGame: [
            { character: 'monkey', text: "Những quả cầu đã nổ tung thành bụi sao vô hại. Căn cứ Mặt Trăng vẫn an toàn." }
        ]
    },
    619: {
        minigame: 'whack_mole',
        preGame: [
            { character: 'monkey', text: "Lũ bọ máy tay sai của Alien đang chui lên từ các hố thiên thạch để đánh lén." },
            { character: 'monkey', text: "Cầm búa lên, gõ trúng đích để đập chúng chui tọt xuống hố ngay lập tức!" }
        ],
        postGame: [
            { character: 'monkey', text: "Lũ tay sai đã khiếp sợ lẩn trốn sâu dưới lòng đất. Bề mặt Mặt Trăng đã an toàn." }
        ]
    },
    620: {
        minigame: 'racing',
        preGame: [
            { character: 'monkey', text: "Alien Hắc Ám đang cưỡi xe trượt vũ trụ bỏ chạy về phía Vùng Tối của Mặt Trăng." },
            { character: 'monkey', text: "Cùng leo lên Xe Tự Hành Mặt Trăng, gõ phím tăng tốc lướt qua các hố thiên thạch đuổi theo hắn nào!" }
        ],
        postGame: [
            { character: 'monkey', text: "Xe Tự Hành chạy cực êm và nhanh! Chúng ta đang bám sát đuôi tên Alien Hắc Ám." }
        ]
    },
    621: {
        minigame: 'grow_plant',
        preGame: [
            { character: 'monkey', text: "Một rãnh nứt khổng lồ chia cắt bề mặt Mặt Trăng. Không thể nhảy qua với trọng lực yếu thế này." },
            { character: 'monkey', text: "Hãy gieo Hạt Giống Pha Lê Băng, gõ đúng để chúng kết tinh thành cây cầu trong suốt vắt ngang!" }
        ],
        postGame: [
            { character: 'monkey', text: "Cầu pha lê lấp lánh và vô cùng vững chãi. Cùng cẩn thận bước qua rãnh nứt nào." }
        ]
    },
    622: {
        minigame: 'catch_insects',
        preGame: [
            { character: 'monkey', text: "Chúng ta đã tiến vào Vùng Tối của Mặt Trăng, không có chút ánh sáng mặt trời nào chiếu tới." },
            { character: 'monkey', text: "Dùng vợt từ trường bắt những Tinh Linh Ánh Sao lấp lánh vào bình ắc quy để thắp sáng nhé." }
        ],
        postGame: [
            { character: 'monkey', text: "Bình ắc quy Tinh Linh tỏa ánh sáng dịu nhẹ. Đường đi trong Vùng Tối đã hiện ra." }
        ]
    },
    623: {
        minigame: 'frog_jump',
        preGame: [
            { character: 'monkey', text: "Phía trước là bãi đá lơ lửng do từ trường hỗn loạn, chỉ có vài bệ đá là đứng vững được." },
            { character: 'monkey', text: "Gõ đúng nhịp để búng người bay lơ lửng chuẩn xác qua các bệ đá, tuyệt đối đừng để trôi dạt ra ngoài không gian!" }
        ],
        postGame: [
            { character: 'monkey', text: "Những cú nhảy phi trọng lực thật hoàn hảo! Chúng ta đã an toàn vượt qua bãi đá từ trường." }
        ]
    },
    624: {
        minigame: 'collect_items',
        preGame: [
            { character: 'boss', text: "Ta sẽ bắn vụn những viên Đá Nguyệt Thạch này! Các ngươi sẽ cạn kiệt năng lượng!" },
            { character: 'monkey', text: "Đá Nguyệt Thạch chứa sức mạnh kỳ diệu! Nhanh tay thu thập chúng vào túi trước khi bị phá hủy." }
        ],
        postGame: [
            { character: 'monkey', text: "Đã thu thập đủ Đá Nguyệt Thạch. Ánh sáng Mặt Trăng đang ban cho chúng ta sức mạnh mới!" }
        ]
    },
    625: {
        minigame: 'assemble_object',
        preGame: [
            { character: 'monkey', text: "Tháp Vệ Tinh truyền tin trên Mặt Trăng đã bị Alien Hắc Ám bẻ gãy ăng-ten." },
            { character: 'monkey', text: "Hãy gõ phím ráp các mảnh hợp kim lại để sửa Tháp Vệ Tinh, tìm ra tọa độ căn cứ của hắn." }
        ],
        postGame: [
            { character: 'monkey', text: "Tháp Vệ Tinh đã hoạt động trở lại! Nó đang chỉ thẳng về phía pháo đài tăm tối trên miệng núi lửa lớn nhất." }
        ]
    },
    626: {
        minigame: 'clear_fog',
        preGame: [
            { character: 'boss', text: "Lũ nhãi ranh lỳ lợm! Cơn bão bụi Mặt Trăng này sẽ chôn vùi các ngươi mãi mãi!" },
            { character: 'monkey', text: "Bão bụi không gian che khuất mọi tầm nhìn! Gõ thật nhanh tạo khiên từ trường đẩy lùi cơn bão này!" }
        ],
        postGame: [
            { character: 'monkey', text: "Bão bụi đã bị vô hiệu hóa. Pháo đài của Alien Hắc Ám đang sừng sững trước mặt!" }
        ]
    },
    627: {
        minigame: 'bubble_shooter',
        preGame: [
            { character: 'monkey', text: "Hắn đang điên cuồng phóng những khối băng hắc ám từ pháo đài về phía chúng ta." },
            { character: 'monkey', text: "Ngắm thật chuẩn và bắn nát những khối băng đó giữa không gian để dọn đường tiến lên!" }
        ],
        postGame: [
            { character: 'monkey', text: "Băng hắc ám vỡ vụn tan biến vào chân không. Hắn đã cạn kiệt đạn dược rồi." }
        ]
    },
    628: {
        minigame: 'assemble_object',
        preGame: [
            { character: 'monkey', text: "Trận chiến cuối cùng trên Mặt Trăng đã đến. Chúng ta cần lớp phòng thủ phản chiếu mọi ánh sáng." },
            { character: 'monkey', text: "Hãy ráp những Mảnh Nguyệt Thạch lại thành chiếc Khiên Mặt Trăng chói lòa bất khả chiến bại!" }
        ],
        postGame: [
            { character: 'monkey', text: "Khiên Mặt Trăng rực sáng xua tan mọi bóng tối! Tiến lên đánh bại Alien Hắc Ám và giải phóng Mặt Trăng thôi!" }
        ]
    },
    // Lesson 630 - 642 (Group: Vũ trụ, Chapter 46:  'Sao chổi', Boss: Alien Hắc Ám)
    630: {
        minigame: 'clear_fog',
        preGame: [
            { character: 'monkey', text: "Chúng ta đã bám được vào Sao Chổi! Nhưng Alien Hắc Ám đã tạo ra cơn bão bụi băng mù mịt che khuất tầm nhìn." },
            { character: 'boss', text: "Khà khà! Bề mặt đóng băng với tốc độ kinh hoàng này sẽ xé xác các ngươi!" },
            { character: 'monkey', text: "Đừng hòng! Hãy gõ phím tạo khiên năng lượng đẩy lùi bão bụi băng này ngay!" }
        ],
        postGame: [
            { character: 'monkey', text: "Bão bụi đã tan. Bề mặt đóng băng của sao chổi hiện ra lấp lánh vô cùng đẹp mắt." }
        ]
    },
    631: {
        minigame: 'rescue_animals',
        preGame: [
            { character: 'monkey', text: "Nguy rồi! Hắn dùng vòng sáng trọng lực giam cầm bạn Chim Ưng Không Gian vào khối băng." },
            { character: 'monkey', text: "Nhanh tay gõ phím thật chính xác để phá vỡ vòng sáng và giải cứu Chim Ưng!" }
        ],
        postGame: [
            { character: 'monkey', text: "Chim Ưng Không Gian đã bay vút lên, báo hiệu đường đi an toàn phía trước." }
        ]
    },
    632: {
        minigame: 'bubble_shooter',
        preGame: [
            { character: 'boss', text: "Nhận lấy những khối băng từ tính này đi! Phi thuyền của các ngươi sẽ nát bấy!" },
            { character: 'monkey', text: "Hắn ném băng từ tính liên tục! Ngắm và bắn vỡ chúng trước khi chúng va đập vào chúng ta!" }
        ],
        postGame: [
            { character: 'monkey', text: "Những khối băng đã vỡ nát thành dải ánh sáng vô hại. Chúng ta vẫn an toàn." }
        ]
    },
    633: {
        minigame: 'whack_mole',
        preGame: [
            { character: 'monkey', text: "Lũ bọ máy tay sai của Alien đang chui lên cắn phá lớp vỏ bảo vệ của bộ đồ vũ trụ." },
            { character: 'monkey', text: "Cầm búa lên, gõ trúng đích để đuổi bầy bọ máy này lẩn trốn vào các khe nứt!" }
        ],
        postGame: [
            { character: 'monkey', text: "Bọ máy đã khiếp sợ chạy tán loạn. Đồ bảo hộ của chúng ta không bị tổn hại." }
        ]
    },
    634: {
        minigame: 'racing',
        preGame: [
            { character: 'monkey', text: "Alien Hắc Ám đang lướt ván bay trượt dọc theo chiếc đuôi sao chổi rực sáng để tẩu thoát." },
            { character: 'monkey', text: "Lên ván trượt hạt nhân, gõ phím tăng tốc lướt theo hắn sát nút ngay!" }
        ],
        postGame: [
            { character: 'monkey', text: "Tốc độ ánh sáng thật tuyệt vời! Chúng ta đang bám sát hắn trên đuôi sao chổi." }
        ]
    },
    635: {
        minigame: 'grow_plant',
        preGame: [
            { character: 'monkey', text: "Một khe nứt sâu thẳm tỏa ra khí lạnh âm độ chắn ngang lối đi." },
            { character: 'monkey', text: "Hãy gieo hạt cây Sao tinh tú, gõ phím để tia sáng vắt ngang tạo thành cầu năng lượng!" }
        ],
        postGame: [
            { character: 'monkey', text: "Cầu Sao tinh tú vô cùng kiên cố và ấm áp. Cùng cẩn thận bước qua khe nứt nào." }
        ]
    },
    636: {
        minigame: 'catch_insects',
        preGame: [
            { character: 'monkey', text: "Khu vực lõi sao chổi tối om vì bị mây hắc ám bao phủ." },
            { character: 'monkey', text: "Vung vợt bắt các Tinh Linh Sao Chổi lấp lánh vào lồng kính để chiếu sáng đường đi." }
        ],
        postGame: [
            { character: 'monkey', text: "Lồng kính sáng rực rỡ xua tan bóng tối. Mọi ngóc ngách hẻm băng đã hiện ra." }
        ]
    },
    637: {
        minigame: 'frog_jump',
        preGame: [
            { character: 'monkey', text: "Phía trước là bãi đá băng lởm chởm đang chuyển động không ngừng." },
            { character: 'monkey', text: "Gõ đúng nhịp để nhảy chuẩn xác lên các phiến đá vững chắc nhất, đừng bước hụt nhé!" }
        ],
        postGame: [
            { character: 'monkey', text: "Bước nhảy rất chính xác! Chúng ta đã vượt qua dòng sông băng tử thần an toàn." }
        ]
    },
    638: {
        minigame: 'collect_items',
        preGame: [
            { character: 'boss', text: "Ta sẽ phá nát các Lõi Pha Lê Sao Chổi này! Các ngươi sẽ cạn kiệt oxy!" },
            { character: 'monkey', text: "Lõi Pha Lê là nguồn sinh khí vô giá! Nhanh tay thu thập vào túi trước khi bị phá vỡ." }
        ],
        postGame: [
            { character: 'monkey', text: "Đã thu thập đủ Lõi Pha Lê. Sinh lực của chúng ta đang dâng trào mạnh mẽ!" }
        ]
    },
    639: {
        minigame: 'assemble_object',
        preGame: [
            { character: 'monkey', text: "Thiết bị điều hướng trọng lực đã bị Alien Hắc Ám dùng súng laser bắn hỏng." },
            { character: 'monkey', text: "Hãy gõ phím ráp các vi mạch và ăng-ten lại để sửa thiết bị, xác định tọa độ sào huyệt." }
        ],
        postGame: [
            { character: 'monkey', text: "Thiết bị đã hoạt động trở lại. Tọa độ của hắn ngay trung tâm lõi băng của Sao Chổi!" }
        ]
    },
    640: {
        minigame: 'clear_fog',
        preGame: [
            { character: 'boss', text: "Bọn nhãi ranh lì lợm! Bão bức xạ chết chóc này sẽ thiêu rụi các ngươi!" },
            { character: 'monkey', text: "Tia bức xạ chói lòa làm mù mắt! Gõ thật nhanh tạo khiên từ trường phản xạ lại cơn bão này!" }
        ],
        postGame: [
            { character: 'monkey', text: "Bão bức xạ đã bị đánh tan. Cửa sào huyệt băng giá của hắn đã mở toang." }
        ]
    },
    641: {
        minigame: 'bubble_shooter',
        preGame: [
            { character: 'monkey', text: "Hắn đang điên cuồng phóng những quả bom năng lượng hắc ám khổng lồ từ trung tâm sào huyệt." },
            { character: 'monkey', text: "Ngắm thật chuẩn và bắn nát những quả bom đó giữa không trung để tránh thảm họa!" }
        ],
        postGame: [
            { character: 'monkey', text: "Bom năng lượng nổ tung trong im lặng của chân không. Hắn đã không còn đạn dự trữ." }
        ]
    },
    642: {
        minigame: 'assemble_object',
        preGame: [
            { character: 'monkey', text: "Trận chiến sinh tử đã đến. Chúng ta cần sức mạnh phòng ngự tuyệt đối của vũ trụ." },
            { character: 'monkey', text: "Hãy ráp các Mảnh Băng Vĩnh Cửu lại thành chiếc Khiên Sao Chổi bất hoại!" }
        ],
        postGame: [
            { character: 'monkey', text: "Khiên Sao Chổi tỏa ánh sáng xanh diệu kỳ! Cầm lấy nó, tiến lên hạ gục Alien Hắc Ám để bảo vệ dải ngân hà!" }
        ]
    },
    // Lesson 644 - 656 (Group: Vũ trụ, Chapter 47:  'Sao Thổ', Boss: Alien Hắc Ám)
    644: {
        minigame: 'clear_fog',
        preGame: [
            { character: 'monkey', text: "Chúng ta đã đến Sao Thổ! Nhưng Alien Hắc Ám đã xả khí gas độc che khuất cả bầu trời." },
            { character: 'boss', text: "Khà khà! Vành đai tuyệt đẹp này sẽ là mồ chôn của các ngươi!" },
            { character: 'monkey', text: "Đừng hòng cản bước! Hãy gõ phím tạo bão năng lượng thổi bay màn khí gas này ngay!" }
        ],
        postGame: [
            { character: 'monkey', text: "Khí gas đã tan biến. Vành đai Sao Thổ rực rỡ lấp lánh hiện ra trước mắt chúng ta." }
        ]
    },
    645: {
        minigame: 'rescue_animals',
        preGame: [
            { character: 'monkey', text: "Nguy rồi! Alien Hắc Ám đã dùng lưới plasma trói chặt bạn Cáo Vũ Trụ." },
            { character: 'monkey', text: "Nhanh tay gõ phím thật chính xác để vô hiệu hóa lưới plasma và cứu bạn ấy ra ngoài!" }
        ],
        postGame: [
            { character: 'monkey', text: "Cáo Vũ Trụ đã được tự do và tung tăng bay lượn. Chúng ta lại có thêm đồng đội!" }
        ]
    },
    646: {
        minigame: 'bubble_shooter',
        preGame: [
            { character: 'boss', text: "Nhận lấy những quả cầu trọng lực này đi! Phi thuyền của các ngươi sẽ nát bấy!" },
            { character: 'monkey', text: "Hắn đang bắn cầu trọng lực! Ngắm bắn vỡ chúng ngay trước khi chúng va vào chúng ta!" }
        ],
        postGame: [
            { character: 'monkey', text: "Những quả cầu đã nổ tung thành bụi không gian. Phi thuyền vẫn hoàn toàn nguyên vẹn." }
        ]
    },
    647: {
        minigame: 'whack_mole',
        preGame: [
            { character: 'monkey', text: "Lũ bọ máy tay sai của Alien đang nấp sau các khối thiên thạch để phục kích." },
            { character: 'monkey', text: "Cầm búa lên, gõ trúng đích để đập tan bọn bọ máy này ngay lập tức!" }
        ],
        postGame: [
            { character: 'monkey', text: "Lũ tay sai đã khiếp sợ lùi lại sâu vào vành đai. Đường đi đã quang đãng hơn." }
        ]
    },
    648: {
        minigame: 'racing',
        preGame: [
            { character: 'monkey', text: "Alien Hắc Ám đang lướt ván không trọng lực bỏ chạy dọc theo Vành đai Sao Thổ!" },
            { character: 'monkey', text: "Cùng leo lên Ván Trượt Ánh Sáng, gõ phím tăng tốc bám sát hắn nào!" }
        ],
        postGame: [
            { character: 'monkey', text: "Tốc độ tuyệt vời! Chúng ta đang đuổi sát nút tên Alien Hắc Ám." }
        ]
    },
    649: {
        minigame: 'grow_plant',
        preGame: [
            { character: 'monkey', text: "Một hố đen mini đang hút mọi thứ, tạo ra một hẻm vực không gian không thể vượt qua." },
            { character: 'monkey', text: "Hãy gieo Hạt Giống Tinh thể, gõ đúng để tia sáng kết nối thành cây cầu vắt ngang!" }
        ],
        postGame: [
            { character: 'monkey', text: "Cầu tinh thể vô cùng kiên cố. Cùng cẩn thận lướt qua hẻm vực tử thần này." }
        ]
    },
    650: {
        minigame: 'catch_insects',
        preGame: [
            { character: 'monkey', text: "Chúng ta đang bay vào vùng khuất bóng của Sao Thổ, tối đen như mực." },
            { character: 'monkey', text: "Dùng lưới từ trường bắt những Tinh Linh Băng lấp lánh vào lồng kính để thắp sáng nhé." }
        ],
        postGame: [
            { character: 'monkey', text: "Lồng kính Tinh Linh tỏa ánh sáng xanh diệu kỳ. Chúng ta đã thấy rõ chướng ngại vật." }
        ]
    },
    651: {
        minigame: 'frog_jump',
        preGame: [
            { character: 'monkey', text: "Phía trước là những tảng băng khổng lồ trôi dạt hỗn loạn trên Vành đai." },
            { character: 'monkey', text: "Gõ đúng nhịp để búng người bay chuẩn xác qua các tảng băng, đừng để rơi xuống khe nứt!" }
        ],
        postGame: [
            { character: 'monkey', text: "Cú nhảy phi trọng lực thật hoàn hảo! Chúng ta đã an toàn băng qua bãi băng nguy hiểm." }
        ]
    },
    652: {
        minigame: 'collect_items',
        preGame: [
            { character: 'boss', text: "Ta sẽ hủy diệt những Tinh Thể Sao Thổ này! Các ngươi đừng hòng nạp năng lượng!" },
            { character: 'monkey', text: "Tinh Thể Sao Thổ là nguồn sức mạnh vô tận! Nhanh tay thu thập vào túi trước khi bị phá vỡ." }
        ],
        postGame: [
            { character: 'monkey', text: "Đã thu thập đủ Tinh Thể Sao Thổ. Năng lượng vũ trụ đang tuôn chảy mãnh liệt!" }
        ]
    },
    653: {
        minigame: 'assemble_object',
        preGame: [
            { character: 'monkey', text: "Động cơ đẩy phản lực của chúng ta đã bị Alien Hắc Ám dùng laser bắn hỏng." },
            { character: 'monkey', text: "Hãy gõ phím ráp các vi mạch siêu dẫn lại để khôi phục động cơ, lao thẳng tới sào huyệt hắn." }
        ],
        postGame: [
            { character: 'monkey', text: "Động cơ đã gầm vang mạnh mẽ trở lại! Tọa độ pháo đài của hắn đã bị khóa chặt." }
        ]
    },
    654: {
        minigame: 'clear_fog',
        preGame: [
            { character: 'boss', text: "Lũ sinh vật hạ đẳng lỳ lợm! Bão bão từ trường này sẽ xé xác các ngươi!" },
            { character: 'monkey', text: "Bão từ trường đang làm nhiễu mọi hệ thống! Gõ thật nhanh tạo khiên phản lực đánh tan nó!" }
        ],
        postGame: [
            { character: 'monkey', text: "Bão từ trường đã bị vô hiệu hóa. Pháo đài Không gian của Alien Hắc Ám đã hiện ra!" }
        ]
    },
    655: {
        minigame: 'bubble_shooter',
        preGame: [
            { character: 'monkey', text: "Hắn đang điên cuồng phóng những khối vật chất tối từ đỉnh pháo đài về phía chúng ta." },
            { character: 'monkey', text: "Ngắm thật chuẩn và bắn nát những khối vật chất tối đó giữa không gian để dọn đường!" }
        ],
        postGame: [
            { character: 'monkey', text: "Vật chất tối bị triệt tiêu hoàn toàn. Hắn đã cạn kiệt mọi vũ khí phòng ngự." }
        ]
    },
    656: {
        minigame: 'assemble_object',
        preGame: [
            { character: 'monkey', text: "Trận chiến cuối cùng trên Sao Thổ đã đến. Chúng ta cần lớp khiên chắn cứng cáp nhất." },
            { character: 'monkey', text: "Hãy ráp những Mảnh Băng Vành Đai lại thành chiếc Khiên Sao Thổ bất khả chiến bại!" }
        ],
        postGame: [
            { character: 'monkey', text: "Khiên Sao Thổ rực sáng hào quang rực rỡ! Cầm lấy nó và tiến lên tiêu diệt Alien Hắc Ám thôi!" }
        ]
    },
    // Lesson 658 - 670 (Group: Vũ trụ, Chapter 48:  'Hành tinh lạ', Boss: Alien Hắc Ám)
    658: {
        minigame: 'clear_fog',
        preGame: [
            { character: 'monkey', text: "Chúng ta đã hạ cánh xuống Hành Tinh Lạ! Nhưng Alien Hắc Ám đã thả sương mù sinh học dày đặc che khuất mọi thứ." },
            { character: 'boss', text: "Khà khà! Hành tinh vô danh này sẽ là nơi chôn xác các ngươi!" },
            { character: 'monkey', text: "Đừng hòng cản bước! Hãy gõ phím tạo bão ion thổi bay màn sương mù sinh học này ngay!" }
        ],
        postGame: [
            { character: 'monkey', text: "Sương mù đã tan biến. Cảnh quan kỳ dị của hành tinh lạ đang trải dài trước mắt chúng ta." }
        ]
    },
    659: {
        minigame: 'rescue_animals',
        preGame: [
            { character: 'monkey', text: "Nguy rồi! Alien Hắc Ám đã dùng lưới năng lượng bắt giữ bạn Sinh Vật Bản Địa bé nhỏ." },
            { character: 'monkey', text: "Nhanh tay gõ phím thật chính xác để vô hiệu hóa tấm lưới và cứu bạn ấy ra ngoài!" }
        ],
        postGame: [
            { character: 'monkey', text: "Sinh Vật Bản Địa đã được tự do và kêu lên những tiếng vui mừng. Chúng ta có thêm người dẫn đường!" }
        ]
    },
    660: {
        minigame: 'bubble_shooter',
        preGame: [
            { character: 'boss', text: "Nhận lấy những chai acid sinh học này đi! Bộ đồ vũ trụ của các ngươi sẽ bị ăn mòn!" },
            { character: 'monkey', text: "Hắn đang ném các chai acid từ trên cao! Ngắm bắn vỡ chúng ngay trước khi chúng rơi trúng chúng ta!" }
        ],
        postGame: [
            { character: 'monkey', text: "Những chai acid đã nổ tung thành chất lỏng vô hại. Đồ bảo hộ của chúng ta vẫn an toàn." }
        ]
    },
    661: {
        minigame: 'whack_mole',
        preGame: [
            { character: 'monkey', text: "Lũ bọ máy tay sai đang chui lên từ lòng đất xốp để tấn công lén." },
            { character: 'monkey', text: "Cầm búa lên, gõ trúng đích để đập chúng chui tọt xuống dưới ngay lập tức!" }
        ],
        postGame: [
            { character: 'monkey', text: "Lũ tay sai đã khiếp sợ lẩn trốn sâu dưới lòng đất. Bề mặt di chuyển đã an toàn." }
        ]
    },
    662: {
        minigame: 'racing',
        preGame: [
            { character: 'monkey', text: "Alien Hắc Ám đang cưỡi xe trượt phản trọng lực bỏ chạy về phía dãy núi gai góc." },
            { character: 'monkey', text: "Cùng leo lên Xe Trượt Từ Trường, gõ phím tăng tốc bám sát đuôi hắn nào!" }
        ],
        postGame: [
            { character: 'monkey', text: "Xe chạy cực êm và nhanh! Chúng ta đang bám sát tên Alien Hắc Ám." }
        ]
    },
    663: {
        minigame: 'grow_plant',
        preGame: [
            { character: 'monkey', text: "Một hố dung nham sinh học phát sáng chắn ngang đường. Không thể nhảy qua được." },
            { character: 'monkey', text: "Hãy gieo hạt cây Khổng lồ, gõ đúng để chúng vươn nhánh tạo thành cây cầu vắt ngang!" }
        ],
        postGame: [
            { character: 'monkey', text: "Cầu cây thần kỳ vô cùng vững chãi. Cùng cẩn thận bước qua hố dung nham nào." }
        ]
    },
    664: {
        minigame: 'catch_insects',
        preGame: [
            { character: 'monkey', text: "Chúng ta tiến vào một khu rừng nấm khổng lồ che khuất mọi ánh sáng từ các vì sao." },
            { character: 'monkey', text: "Dùng vợt bắt những con Bọ Cánh Sáng phát quang vào lồng kính để thắp sáng lối đi." }
        ],
        postGame: [
            { character: 'monkey', text: "Lồng kính Bọ Cánh Sáng tỏa ánh sáng đa sắc rực rỡ. Đường đi trong rừng đã hiện ra rõ ràng." }
        ]
    },
    665: {
        minigame: 'frog_jump',
        preGame: [
            { character: 'monkey', text: "Phía trước là một bãi đầm lầy vô trọng lực, chỉ có những tán nấm lơ lửng là điểm tựa." },
            { character: 'monkey', text: "Gõ đúng nhịp để búng người nhảy chuẩn xác qua các tán nấm, tuyệt đối đừng để hụt chân rớt xuống!" }
        ],
        postGame: [
            { character: 'monkey', text: "Những cú nhảy phi trọng lực thật hoàn hảo! Chúng ta đã vượt qua bãi đầm lầy nguy hiểm." }
        ]
    },
    666: {
        minigame: 'collect_items',
        preGame: [
            { character: 'boss', text: "Ta sẽ đập nát những Tinh Thể Năng Lượng Lõi này! Các ngươi sẽ cạn kiệt dưỡng khí!" },
            { character: 'monkey', text: "Tinh Thể Lõi chứa sức mạnh sinh tồn! Nhanh tay thu thập chúng vào túi trước khi bị phá hủy." }
        ],
        postGame: [
            { character: 'monkey', text: "Đã thu thập đủ Tinh Thể. Năng lượng vũ trụ đang nạp đầy cho bộ đồ bảo hộ của chúng ta!" }
        ]
    },
    667: {
        minigame: 'assemble_object',
        preGame: [
            { character: 'monkey', text: "Thiết bị quét radar địa hình đã bị nhiễu sóng và hỏng hóc sau đòn tấn công của hắn." },
            { character: 'monkey', text: "Hãy gõ phím ráp các vi mạch siêu dẫn lại để sửa thiết bị, tìm ra vị trí sào huyệt chính xác." }
        ],
        postGame: [
            { character: 'monkey', text: "Radar đã hoạt động trở lại! Tọa độ pháo đài trung tâm của hắn đã được khóa chặt." }
        ]
    },
    668: {
        minigame: 'clear_fog',
        preGame: [
            { character: 'boss', text: "Bọn nhãi ranh lỳ lợm! Cơn lốc phóng xạ tăm tối này sẽ làm các ngươi tan chảy!" },
            { character: 'monkey', text: "Lốc phóng xạ đang cuộn tới dữ dội! Gõ thật nhanh tạo khiên từ trường đẩy lùi cơn lốc này!" }
        ],
        postGame: [
            { character: 'monkey', text: "Lốc phóng xạ đã bị đánh tan. Cổng vào pháo đài kỳ dị của Alien Hắc Ám đã mở toang!" }
        ]
    },
    669: {
        minigame: 'bubble_shooter',
        preGame: [
            { character: 'monkey', text: "Hắn đang điên cuồng phóng những tảng đá từ tính độc hại về phía chúng ta." },
            { character: 'monkey', text: "Ngắm thật chuẩn và bắn nát những tảng đá từ tính đó giữa không trung để mở đường tiến lên!" }
        ],
        postGame: [
            { character: 'monkey', text: "Đá từ tính vỡ vụn thành cát bụi vũ trụ. Hắn đã không còn thứ gì để ném nữa." }
        ]
    },
    670: {
        minigame: 'assemble_object',
        preGame: [
            { character: 'monkey', text: "Trận chiến cuối cùng trên Hành Tinh Lạ. Chúng ta cần sức mạnh phòng thủ từ những vật chất nơi đây." },
            { character: 'monkey', text: "Hãy ráp những Mảnh Hợp Kim Lạ lại thành chiếc Khiên Vũ Trụ bất khả chiến bại!" }
        ],
        postGame: [
            { character: 'monkey', text: "Khiên Vũ Trụ tỏa hào quang bảo vệ tuyệt đối! Tiến lên hạ gục Alien Hắc Ám và mang lại hòa bình cho tinh hệ thôi!" }
        ]
    },
    // Lesson 672 - 684 (Group: Vũ trụ, Chapter 49:  'Siêu tân tinh', Boss: Alien Hắc Ám)
    672: {
        minigame: 'clear_fog',
        preGame: [
            { character: 'monkey', text: "Chúng ta đã tiến vào vùng Siêu Tân Tinh! Nhưng Alien Hắc Ám đã thả mây tinh vân đen kịt che khuất mọi thứ." },
            { character: 'boss', text: "Khà khà! Vụ nổ vũ trụ rực rỡ này sẽ nuốt chửng các ngươi vào hư vô!" },
            { character: 'monkey', text: "Đừng hòng! Hãy gõ phím tạo bão ion thổi bay màn tinh vân đen này đi ngay!" }
        ],
        postGame: [
            { character: 'monkey', text: "Tinh vân đã tan. Ánh sáng chói lòa tuyệt đẹp của Siêu Tân Tinh đang rực rỡ trước mắt." }
        ]
    },
    673: {
        minigame: 'rescue_animals',
        preGame: [
            { character: 'monkey', text: "Nguy rồi! Hắn đã dùng lồng trọng lực lượng tử giam giữ Phượng Hoàng Tinh Tú." },
            { character: 'monkey', text: "Nhanh tay gõ phím thật chính xác để phá vỡ lồng trọng lực và cứu Phượng Hoàng ra ngoài!" }
        ],
        postGame: [
            { character: 'monkey', text: "Phượng Hoàng Tinh Tú đã được tự do, sải cánh tỏa ra ánh sáng rực rỡ. Chúng ta có thêm đồng minh đắc lực!" }
        ]
    },
    674: {
        minigame: 'bubble_shooter',
        preGame: [
            { character: 'boss', text: "Nhận lấy những quả cầu phản vật chất này đi! Phi thuyền của các ngươi sẽ nổ tung!" },
            { character: 'monkey', text: "Hắn đang bắn cầu phản vật chất! Ngắm thật chuẩn và bắn vỡ chúng ngay trước khi chúng va vào chúng ta!" }
        ],
        postGame: [
            { character: 'monkey', text: "Những quả cầu đã nổ tung thành bụi sao vô hại. Chúng ta vẫn an toàn tiến bước." }
        ]
    },
    675: {
        minigame: 'whack_mole',
        preGame: [
            { character: 'monkey', text: "Lũ bọ máy tay sai đang chui lên từ các mảnh vỡ thiên thạch để đánh lén." },
            { character: 'monkey', text: "Cầm búa lên, gõ trúng đích để đập chúng chui tọt xuống dưới ngay lập tức!" }
        ],
        postGame: [
            { character: 'monkey', text: "Lũ bọ máy đã khiếp sợ lẩn trốn vào khoảng không. Khu vực xung quanh đã an toàn." }
        ]
    },
    676: {
        minigame: 'racing',
        preGame: [
            { character: 'monkey', text: "Alien Hắc Ám đang lướt trên ván trượt bóng tối tẩu thoát về phía lõi vụ nổ." },
            { character: 'monkey', text: "Cùng leo lên Ván Trượt Ánh Sáng, gõ phím tăng tốc lướt qua các mảnh vỡ bám sát hắn nào!" }
        ],
        postGame: [
            { character: 'monkey', text: "Tốc độ ánh sáng thật tuyệt vời! Chúng ta đang đuổi sát nút tên Alien Hắc Ám." }
        ]
    },
    677: {
        minigame: 'grow_plant',
        preGame: [
            { character: 'monkey', text: "Một khe nứt không gian chứa đầy dòng chảy hạt bức xạ chắn ngang đường." },
            { character: 'monkey', text: "Hãy gieo Hạt Giống Tinh Tú, gõ đúng để dải ngân hà thu nhỏ kết lại thành cây cầu vắt ngang!" }
        ],
        postGame: [
            { character: 'monkey', text: "Cầu ngân hà vô cùng kiên cố. Cùng cẩn thận bước qua khe nứt không gian này nào." }
        ]
    },
    678: {
        minigame: 'catch_insects',
        preGame: [
            { character: 'monkey', text: "Chúng ta đang bay vào vùng vật chất tối của Siêu Tân Tinh, tối đen như mực." },
            { character: 'monkey', text: "Dùng lưới từ trường bắt những Tia Lửa Bức Xạ lấp lánh vào buồng năng lượng để thắp sáng nhé." }
        ],
        postGame: [
            { character: 'monkey', text: "Buồng năng lượng tỏa ánh sáng diệu kỳ rực rỡ. Chúng ta đã thấy rõ đường đi phía trước." }
        ]
    },
    679: {
        minigame: 'frog_jump',
        preGame: [
            { character: 'monkey', text: "Phía trước là các khối đá plasma lơ lửng bập bềnh quanh rìa vụ nổ siêu tân tinh." },
            { character: 'monkey', text: "Gõ đúng nhịp để búng người bay chuẩn xác qua các tảng đá, tuyệt đối đừng để trôi tuột vào lõi vụ nổ!" }
        ],
        postGame: [
            { character: 'monkey', text: "Cú nhảy phi trọng lực thật hoàn hảo! Chúng ta đã an toàn băng qua vành đai đá plasma." }
        ]
    },
    680: {
        minigame: 'collect_items',
        preGame: [
            { character: 'boss', text: "Ta sẽ hủy diệt những Tinh Thể Lõi này! Các ngươi sẽ cạn kiệt toàn bộ sinh lực!" },
            { character: 'monkey', text: "Tinh Thể Lõi chứa nguồn sức mạnh tối cao! Nhanh tay thu thập vào túi trước khi bị phá vỡ." }
        ],
        postGame: [
            { character: 'monkey', text: "Đã thu thập đủ Tinh Thể Lõi. Năng lượng vũ trụ đang bùng cháy mãnh liệt trong cơ thể chúng ta!" }
        ]
    },
    681: {
        minigame: 'assemble_object',
        preGame: [
            { character: 'monkey', text: "Động cơ nhảy bước không gian đã bị Alien Hắc Ám dùng pháo laser bắn hỏng hóc." },
            { character: 'monkey', text: "Hãy gõ phím ráp các lõi hạt nhân vi lượng lại để khôi phục động cơ, lao thẳng tới sào huyệt hắn." }
        ],
        postGame: [
            { character: 'monkey', text: "Động cơ đã gầm vang mạnh mẽ trở lại! Tọa độ pháo đài cuối cùng của hắn đã bị khóa chặt." }
        ]
    },
    682: {
        minigame: 'clear_fog',
        preGame: [
            { character: 'boss', text: "Lũ sinh vật vũ trụ lỳ lợm! Cơn bão bức xạ Gamma này sẽ thiêu rụi các ngươi thành tro bụi!" },
            { character: 'monkey', text: "Bão bức xạ Gamma đang ập tới dữ dội! Gõ thật nhanh tạo khiên từ trường cực đại đánh tan nó!" }
        ],
        postGame: [
            { character: 'monkey', text: "Bão bức xạ đã bị vô hiệu hóa hoàn toàn. Pháo đài ẩn trong lõi sao của Alien Hắc Ám đã hiện ra!" }
        ]
    },
    683: {
        minigame: 'bubble_shooter',
        preGame: [
            { character: 'monkey', text: "Hắn đang điên cuồng phóng những khối vật chất siêu nóng từ trung tâm pháo đài về phía chúng ta." },
            { character: 'monkey', text: "Ngắm thật chuẩn và bắn nát những khối vật chất đó giữa không gian để dọn đường tiến lên!" }
        ],
        postGame: [
            { character: 'monkey', text: "Vật chất siêu nóng bị triệt tiêu tan biến. Hắn đã cạn kiệt mọi vũ khí phòng thủ." }
        ]
    },
    684: {
        minigame: 'assemble_object',
        preGame: [
            { character: 'monkey', text: "Trận chiến sinh tử giữa tâm Siêu Tân Tinh đã đến. Chúng ta cần lớp khiên chắn quyền năng nhất vũ trụ." },
            { character: 'monkey', text: "Hãy ráp những Mảnh Thiên Thạch Rực Lửa lại thành chiếc Khiên Siêu Tân Tinh bất khả chiến bại!" }
        ],
        postGame: [
            { character: 'monkey', text: "Khiên Siêu Tân Tinh rực sáng hào quang chói lòa! Tiến lên tiêu diệt Alien Hắc Ám, mang lại bình yên cho toàn cõi vũ trụ thôi!" }
        ]
    },
    // Lesson 686 - 698 (Group: Vũ trụ, Chapter 50:  'Vô tận', Boss: Alien Hắc Ám)
    686: {
        minigame: 'clear_fog',
        preGame: [
            { character: 'monkey', text: "Chúng ta đã đến Cõi Vô Tận! Nhưng Alien Hắc Ám đã thả màn sương mù thời không che khuất mọi lối đi." },
            { character: 'boss', text: "Khà khà! Trong không gian vô tận này, các ngươi sẽ lạc lối mãi mãi không thể trở về!" },
            { character: 'monkey', text: "Đừng hòng! Hãy gõ phím tạo bão ánh sáng lượng tử để thổi bay màn sương mù thời không này ngay!" }
        ],
        postGame: [
            { character: 'monkey', text: "Sương mù đã tan biến. Chiều không gian vô tận đầy những vì sao lấp lánh đang mở ra trước mắt." }
        ]
    },
    687: {
        minigame: 'rescue_animals',
        preGame: [
            { character: 'monkey', text: "Nguy rồi! Alien Hắc Ám đã dùng vòng lặp thời gian giam giữ bạn Cá Voi Vũ Trụ." },
            { character: 'monkey', text: "Nhanh tay gõ phím thật chính xác để phá vỡ vòng lặp và cứu bạn ấy ra ngoài!" }
        ],
        postGame: [
            { character: 'monkey', text: "Cá Voi Vũ Trụ đã được tự do, cất tiếng hát vang vọng khắp cõi vô tận. Cùng tiến lên nào!" }
        ]
    },
    688: {
        minigame: 'bubble_shooter',
        preGame: [
            { character: 'boss', text: "Nhận lấy những quả cầu năng lượng hố trắng này đi! Các ngươi sẽ bị thổi bay vào cõi hư vô!" },
            { character: 'monkey', text: "Hắn đang bắn cầu hố trắng! Ngắm thật chuẩn và bắn vỡ chúng ngay trước khi chúng đẩy lùi chúng ta!" }
        ],
        postGame: [
            { character: 'monkey', text: "Những quả cầu đã vỡ vụn thành các luồng sáng vô hại. Chúng ta vẫn vững bước tiến lên." }
        ]
    },
    689: {
        minigame: 'whack_mole',
        preGame: [
            { character: 'monkey', text: "Lũ bọ máy tay sai đang chui ra từ các khe nứt không gian để cắn trộm." },
            { character: 'monkey', text: "Cầm búa lượng tử lên, gõ trúng đích để đập chúng chui lại vào các khe nứt ngay lập tức!" }
        ],
        postGame: [
            { character: 'monkey', text: "Lũ bọ máy đã khiếp sợ lẩn trốn vào bóng tối. Khe nứt không gian đã được vá lại." }
        ]
    },
    690: {
        minigame: 'racing',
        preGame: [
            { character: 'monkey', text: "Alien Hắc Ám đang cưỡi phi thuyền hắc ám tẩu thoát dọc theo dải ngân hà vô tận." },
            { character: 'monkey', text: "Cùng leo lên Phi Thuyền Sao Băng, gõ phím kích hoạt bước nhảy tốc độ ánh sáng đuổi theo hắn nào!" }
        ],
        postGame: [
            { character: 'monkey', text: "Tốc độ ánh sáng thật phi thường! Chúng ta đang bám sát đuôi tên Alien Hắc Ám." }
        ]
    },
    691: {
        minigame: 'grow_plant',
        preGame: [
            { character: 'monkey', text: "Một khoảng không hư vô tĩnh lặng chắn ngang đường, không có bất kỳ điểm tựa nào để đi tiếp." },
            { character: 'monkey', text: "Hãy gieo Hạt Giống Cây Cầu Ngàn sao, gõ đúng để các vì sao kết nối lại thành lối đi vắt ngang!" }
        ],
        postGame: [
            { character: 'monkey', text: "Cây cầu ngàn sao vô cùng rực rỡ và vững chắc. Cùng cẩn thận lướt qua khoảng không hư vô này." }
        ]
    },
    692: {
        minigame: 'catch_insects',
        preGame: [
            { character: 'monkey', text: "Chúng ta đang tiến vào vùng vật chất tối của vũ trụ, mọi ánh sáng đều bị nuốt chửng." },
            { character: 'monkey', text: "Dùng lưới lượng tử bắt những Tinh Linh Ánh Sáng lấp lánh vào buồng chứa để soi sáng đường đi." }
        ],
        postGame: [
            { character: 'monkey', text: "Buồng chứa Tinh Linh tỏa ánh sáng diệu kỳ rực rỡ. Chúng ta đã nhìn thấy rõ mọi chướng ngại vật." }
        ]
    },
    693: {
        minigame: 'frog_jump',
        preGame: [
            { character: 'monkey', text: "Phía trước là những mảnh vỡ hành tinh trôi dạt lơ lửng trong không gian không trọng lực." },
            { character: 'monkey', text: "Gõ đúng nhịp để búng người bay chuẩn xác qua các mảnh vỡ, tuyệt đối đừng để trôi dạt vào cõi hư vô!" }
        ],
        postGame: [
            { character: 'monkey', text: "Cú nhảy phi trọng lực thật hoàn hảo! Chúng ta đã an toàn băng qua vành đai mảnh vỡ." }
        ]
    },
    694: {
        minigame: 'collect_items',
        preGame: [
            { character: 'boss', text: "Ta sẽ hủy diệt những Mảnh Ghép Vô Cực này! Các ngươi sẽ không bao giờ có được sức mạnh tối thượng!" },
            { character: 'monkey', text: "Mảnh Ghép Vô Cực là chìa khóa của vũ trụ! Nhanh tay thu thập vào túi trước khi bị hắn phá hủy." }
        ],
        postGame: [
            { character: 'monkey', text: "Đã thu thập đủ Mảnh Ghép Vô Cực. Sức mạnh của cõi vô tận đang chảy trong huyết quản chúng ta!" }
        ]
    },
    695: {
        minigame: 'assemble_object',
        preGame: [
            { character: 'monkey', text: "Chiếc La Bàn Đa Vũ Trụ đã bị Alien Hắc Ám làm nhiễu loạn từ trường." },
            { character: 'monkey', text: "Hãy gõ phím ráp các lõi tinh thể từ tính lại để khôi phục La Bàn, khóa chặt mục tiêu sào huyệt hắn." }
        ],
        postGame: [
            { character: 'monkey', text: "La Bàn đã hoạt động chính xác! Tọa độ pháo đài tận cùng vũ trụ của hắn đã bị phát hiện." }
        ]
    },
    696: {
        minigame: 'clear_fog',
        preGame: [
            { character: 'boss', text: "Lũ kiến hôi lỳ lợm! Cơn bão bụi lượng tử này sẽ xé tan các ngươi thành từng nguyên tử!" },
            { character: 'monkey', text: "Bão lượng tử đang cuộn tới dữ dội che khuất tầm nhìn! Gõ thật nhanh tạo khiên đa chiều đánh tan nó!" }
        ],
        postGame: [
            { character: 'monkey', text: "Bão lượng tử đã bị vô hiệu hóa hoàn toàn. Pháo đài Vô Tận của Alien Hắc Ám đã hiện ra!" }
        ]
    },
    697: {
        minigame: 'bubble_shooter',
        preGame: [
            { character: 'monkey', text: "Hắn đang điên cuồng phóng những quả cầu hủy diệt từ pháo đài trung tâm về phía chúng ta." },
            { character: 'monkey', text: "Ngắm thật chuẩn và bắn nát những quả cầu hủy diệt đó giữa không gian để bảo vệ đội hình!" }
        ],
        postGame: [
            { character: 'monkey', text: "Quả cầu hủy diệt bị triệt tiêu tan biến vào hư không. Hắn đã cạn kiệt mọi vũ khí tấn công." }
        ]
    },
    698: {
        minigame: 'assemble_object',
        preGame: [
            { character: 'monkey', text: "Trận chiến quyết định vận mệnh của cả đa vũ trụ đã đến. Chúng ta cần sức mạnh phòng ngự tuyệt đối." },
            { character: 'monkey', text: "Hãy ráp những Mảnh Ánh Sáng Khởi Nguyên lại thành chiếc Khiên Vô Tận bất khả chiến bại!" }
        ],
        postGame: [
            { character: 'monkey', text: "Khiên Vô Tận rực sáng hào quang rực rỡ nhất vũ trụ! Tiến lên tiêu diệt Alien Hắc Ám, bảo vệ sự tồn vong của cõi vô tận thôi!" }
        ]
    }
};
