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
            { character: 'monkey', text: "Mình thấy bóng Sói Già lấp ló chạy trốn phía trước. Cưỡi lên lưng bạn Đà Điểu và đua tốc độ đuổi theo hắn thôi!" }
        ],
        postGame: [
            { character: 'monkey', text: "Đà Điểu chạy nhanh như gió! Chúng ta đang bám rất sát Sói Già rồi." }
        ]
    },
    19: {
        minigame: 'grow_plant',
        preGame: [
            { character: 'monkey', text: "Sói Già đã phá hỏng cây cầu gỗ. Chúng ta cần dùng phép thuật để làm một nhánh dây leo vươn dài ra thành cầu vắt ngang." }
        ],
        postGame: [
            { character: 'monkey', text: "Dây leo đã kết thành một cây cầu vô cùng vững chắc. Bước qua thôi!" }
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
            { character: 'monkey', text: "Sói Già lúc tháo chạy đã tông hỏng chiếc xe kéo hạt dẻ của bạn Sóc. Hãy gõ đúng để ráp lại từng bộ phận giúp bạn ấy nào." }
        ],
        postGame: [
            { character: 'monkey', text: "Chiếc xe kéo lại lành lặn và bon bon trên đường rồi. Sóc con vui lắm!" }
        ]
    },
    22: {
        minigame: 'frog_jump',
        preGame: [
            { character: 'monkey', text: "Trước mặt là một vũng bùn lầy đầy gai nhọn do Sói tạo ra. Nhờ các bạn Nhái bén dẫn đường nhảy qua những tảng đá an toàn nhé!" }
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
            { character: 'monkey', text: "Ôi không! Sói Già đang dùng quạt khổng lồ thổi bay hết Lá Xanh. Cây cối đang khóc kìa!" },
            { character: 'monkey', text: "Hãy gõ phím để tạo phép thuật, gắn lại những chiếc Lá Xanh lên cành nhé." }
        ],
        postGame: [
            { character: 'monkey', text: "Cây cối đã xanh tươi trở lại. Sói Già không thể phá hoại sức sống của khu rừng!" }
        ]
    },
    29: {
        minigame: 'collect_items',
        preGame: [
            { character: 'boss', text: "Gió lốc của ta sẽ cuốn phăng mọi thứ thức ăn dự trữ của các ngươi!" },
            { character: 'monkey', text: "Nhanh tay nhặt lại những quả dại bị gió thổi bay vào giỏ trước khi chúng rơi xuống vách đá!" }
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
            { character: 'monkey', text: "Gió to quá làm tổ của bạn Chim Sâu bị rơi và mắc kẹt trong đống cành khô." },
            { character: 'monkey', text: "Gõ thật chuẩn để gỡ các cành cây và cứu bạn ấy ra nhé!" }
        ],
        postGame: [
            { character: 'monkey', text: "Chim Sâu đã an toàn bay lên bầu trời. Tiếp tục đuổi theo Sói Già thôi!" }
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
            { character: 'monkey', text: "Những giọt sương mai đọng trên Lá Xanh chứa sức mạnh phép thuật tự nhiên." },
            { character: 'monkey', text: "Thu thập thật nhiều sương mai để tiếp thêm năng lượng chuẩn bị đánh bại Sói Già nhé!" }
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
            { character: 'boss', text: "Rìu của ta chưa đủ nhanh, ta sẽ thả bầy mối khổng lồ ra gặm rễ cây!" },
            { character: 'monkey', text: "Sói Già thật xảo quyệt! Dùng búa gõ trúng lũ mối đang chui lên để bảo vệ rễ Cổ Thụ nhé!" }
        ],
        postGame: [
            { character: 'monkey', text: "Bầy mối đã bị đuổi đi hết. Rễ cây tạm thời được an toàn." }
        ]
    },
    45: {
        minigame: 'grow_plant',
        preGame: [
            { character: 'monkey', text: "Những vết chặt của Sói Già làm Cổ Thụ đau đớn. Hãy dùng phép thuật gọi mưa xuân để chữa lành cho cây." }
        ],
        postGame: [
            { character: 'monkey', text: "Thật kỳ diệu! Các vết xước đã liền lại và mọc ra những chồi non mới." }
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
            { character: 'monkey', text: "Bám chắc vào bạn Sóc Đỏ nhé! Chúng ta sẽ chạy đua dọc theo thân cây Cổ Thụ khổng lồ này để bắt kịp Sói Già." }
        ],
        postGame: [
            { character: 'monkey', text: "Sóc Đỏ leo trèo giỏi quá! Chúng ta đã ở rất gần hắn rồi." }
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
            { character: 'monkey', text: "Đường lên ngọn cây phải đi qua một hốc cây rất tối. Hãy bắt vài bạn bướm phát sáng để soi đường nhé." }
        ],
        postGame: [
            { character: 'monkey', text: "Hốc cây đã sáng bừng lên. Cảm ơn những người bạn bướm tuyệt đẹp!" }
        ]
    },
    50: {
        minigame: 'frog_jump',
        preGame: [
            { character: 'monkey', text: "Phía trước là những tai nấm linh chi khổng lồ mọc trên vỏ cây. Phải nhảy qua chúng để đi tiếp." },
            { character: 'monkey', text: "Cẩn thận gõ đúng nhịp để không bị trượt chân rơi xuống tận gốc cây nhé!" }
        ],
        postGame: [
            { character: 'monkey', text: "Những tai nấm thật nhún nhảy như lò xo vậy. Chúng ta đã lên được một tầng cao mới." }
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
            { character: 'monkey', text: "Bạn Nhím con đang bị kẹt giữa vòng vây của những cây nấm độc do Sói Già trồng." },
            { character: 'monkey', text: "Hãy gõ đúng để nhổ bỏ những cây nấm độc và giải cứu Nhím con ra ngoài an toàn!" }
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
            { character: 'monkey', text: "Một đầm lầy cản đường chúng ta. Chỉ có những đài hoa súng lơ lửng trên mặt nước." },
            { character: 'monkey', text: "Gõ đúng chữ để nhảy cẩn thận qua từng đài hoa súng sang bờ bên kia nhé!" }
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
            { character: 'monkey', text: "Sói Già đã đập vỡ cỗ xe hoa bằng gỗ của các bạn Ong Mật." },
            { character: 'monkey', text: "Cùng gõ đúng để ráp từng bánh xe và thùng xe lại giúp các bạn ấy vận chuyển mật nhé." }
        ],
        postGame: [
            { character: 'monkey', text: "Cỗ xe hoa đã được sửa chữa hoàn toàn. Các bạn Ong Mật rất biết ơn chúng ta." }
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
            { character: 'monkey', text: "Pháo đài của Sói Già nằm trên vách đá cao. Hãy dùng phép thuật gieo hạt giống cây hoa leo khổng lồ!" }
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
            { character: 'monkey', text: "Sói Già đang tháo chạy lên đỉnh đồi. Cùng cưỡi lên lưng Bướm Khổng Lồ bay đuổi theo hắn nào!" }
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
            { character: 'monkey', text: "Phía trước là một vách đá dốc đứng. Hãy dùng phép thuật gieo hạt để một cây hoa dây leo mọc lên." }
        ],
        postGame: [
            { character: 'monkey', text: "Dây leo đầy hoa đã mọc đủ cao để làm chiếc thang đưa chúng ta lên đỉnh vách đá." }
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
            { character: 'boss', text: "Đừng hòng lấy được phấn hoa thần kỳ để hồi phục sức mạnh!" },
            { character: 'monkey', text: "Nhanh tay gõ phím thu thập những hạt phấn hoa lấp lánh đang rơi xuống vào giỏ." }
        ],
        postGame: [
            { character: 'monkey', text: "Phấn hoa đã đầy giỏ. Sức mạnh của chúng ta đã được nạp đầy!" }
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
            { character: 'monkey', text: "Một đàn bướm mang sức mạnh ánh sáng đang bị kẹt dưới tảng đá lớn." },
            { character: 'monkey', text: "Gõ đúng để phá vỡ tảng đá, giải phóng sức mạnh ánh sáng của các bạn ấy!" }
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
            { character: 'monkey', text: "Phía trước nước chảy xiết quá. Chúng ta cần những đài hoa súng để làm cầu phao." },
            { character: 'monkey', text: "Dùng phép thuật gieo hạt, gõ đúng để hoa súng nở rộ trên mặt nước nhé." }
        ],
        postGame: [
            { character: 'monkey', text: "Cầu phao hoa súng đã hoàn thành. Bước qua thật cẩn thận nào." }
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
            { character: 'monkey', text: "Hãy ghép các mảnh vỏ sò cứng cáp lại thành một chiếc thuyền chiến bọc thép để đối đầu với hắn nào!" }
        ],
        postGame: [
            { character: 'monkey', text: "Thuyền chiến vỏ sò đã sẵn sàng! Cùng rẽ sóng tiến lên và đánh bại Cá Sấu thôi!" }
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
            { character: 'monkey', text: "Hãy dùng phép thuật gọi mưa để những đài hoa súng khổng lồ mọc lên làm cầu vắt ngang nhé." }
        ],
        postGame: [
            { character: 'monkey', text: "Chiếc cầu hoa súng thật rực rỡ và vững chắc. Cùng bước qua thôi!" }
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
            { character: 'monkey', text: "Cá Sấu bơi ngang qua đã húc vỡ guồng nước quay của khu rừng." },
            { character: 'monkey', text: "Gõ phím thật chính xác để ghép các thanh tre lại, sửa chữa guồng nước giúp muôn loài." }
        ],
        postGame: [
            { character: 'monkey', text: "Guồng nước đã quay đều trở lại, mang nước mát đi khắp khu rừng. Tuyệt vời!" }
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
            { character: 'monkey', text: "Đừng mắc mưu hắn! Chúng ta hãy cẩn thận nhặt những viên tảo biển dinh dưỡng còn sót lại để tiếp thêm năng lượng." }
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
            { character: 'monkey', text: "Cá Sấu đang xúi giục đàn tôm hùm đất đào hang phá hỏng bờ sông kìa." },
            { character: 'monkey', text: "Dùng búa gõ trúng đích lũ tôm hùm đất để lấp các cái hố lại nhé!" }
        ],
        postGame: [
            { character: 'monkey', text: "Đàn tôm hùm đất đã hoảng sợ lặn mất tăm. Bờ sông lại an toàn vững chắc." }
        ]
    },
    133: {
        minigame: 'grow_plant',
        preGame: [
            { character: 'monkey', text: "Cá Sấu đã phá hỏng cây cầu phao. Chúng ta cần dùng phép thuật để làm một bông hoa súng khổng lồ vươn lên giữa dòng." }
        ],
        postGame: [
            { character: 'monkey', text: "Hoa súng đã nở rộ thành một điểm tựa vô cùng vững chắc. Bước qua thôi!" }
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
            { character: 'monkey', text: "Cá Sấu lúc tháo chạy đã đập vỡ cỗ xe rong biển của Cá Vàng trưởng bản. Hãy gõ đúng để ráp lại từng bộ phận giúp bác ấy nào." }
        ],
        postGame: [
            { character: 'monkey', text: "Cỗ xe lại lành lặn và êm ái trên dòng nước rồi. Bác Cá Vàng vui lắm!" }
        ]
    },
    136: {
        minigame: 'rescue_animals',
        preGame: [
            { character: 'monkey', text: "Nghe có tiếng kêu cứu! Nữ hoàng Cá Vàng đang bị nhốt trong vỏ trai khổng lồ. Chúng ta phải giải cứu ngay!" }
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
            { character: 'monkey', text: "Trời ơi! Cá Sấu đã dùng cuống sen dai dẳng trói chặt bạn Ếch Xanh lại rồi." },
            { character: 'monkey', text: "Gõ thật chuẩn để cắt đứt cuống sen và cứu bạn Ếch ra ngoài nhé!" }
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
            { character: 'monkey', text: "Dùng phép thuật gõ phím để gọi một nụ sen khổng lồ nở rộ vươn lên làm cầu nối nhé." }
        ],
        postGame: [
            { character: 'monkey', text: "Hoa sen nở bung tuyệt đẹp, tạo thành một bước đệm hoàn hảo cho chúng ta." }
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
            { character: 'monkey', text: "Hãy dùng vợt mời các bạn chuồn chuồn kim đến soi đường cho chúng ta đi tiếp." }
        ],
        postGame: [
            { character: 'monkey', text: "Đàn chuồn chuồn bay lượn lấp lánh như những ngọn đèn nhỏ. Cảm ơn các bạn!" }
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
            { character: 'monkey', text: "Chiếc xuồng lá của chúng ta bị va đập rách mất rồi." },
            { character: 'monkey', text: "Hãy nhanh chóng dùng những đoạn ngó sen và lá sen mới ráp lại thành một chiếc xuồng kiên cố hơn." }
        ],
        postGame: [
            { character: 'monkey', text: "Xuồng ngó sen đã hoàn tất. Vừa đẹp lại vừa chắc chắn, tiếp tục hành trình nào!" }
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
            { character: 'monkey', text: "Bọn tay sai của Cá Sấu đã trói bạn Cò Trắng vào nhịp cầu bằng những sợi dây leo kìa." },
            { character: 'monkey', text: "Gõ đúng các từ để cắt đứt dây leo và cứu bạn ấy ra trước khi cầu sập nhé!" }
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
            { character: 'monkey', text: "Cùng nhảy lên ván trượt tre và đua tốc độ đuổi theo hắn ngay lập tức!" }
        ],
        postGame: [
            { character: 'monkey', text: "Lướt trên cầu tre thật thích! Chúng ta đang bám sát gót hắn rồi." }
        ]
    },
    159: {
        minigame: 'grow_plant',
        preGame: [
            { character: 'monkey', text: "Một đoạn cầu tre bị Cá Sấu hất văng mất rồi. Chúng ta cần những cây tre mới." },
            { character: 'monkey', text: "Dùng phép thuật gieo măng, gõ phím để tre lớn nhanh đan thành nhịp cầu mới nối lại đường đi." }
        ],
        postGame: [
            { character: 'monkey', text: "Tre mọc lên nhanh chóng và uốn cong thành nhịp cầu tuyệt đẹp. Bước qua thôi!" }
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
            { character: 'monkey', text: "Mặt cầu ở đây bị phá hỏng, chỉ còn lại những cọc tre nhô lên mặt nước." },
            { character: 'monkey', text: "Gõ đúng nhịp để nhảy khéo léo qua từng cọc tre, giữ thăng bằng đừng để rơi xuống nhé!" }
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
            { character: 'monkey', text: "Chiếc lồng tre nhốt cá của bác Ngư Phủ bị Cá Sấu cắn rách tơi tả." },
            { character: 'monkey', text: "Hãy gõ phím để ghép các nan tre lại, đan thành một chiếc lồng mới thật chắc chắn giúp bác ấy." }
        ],
        postGame: [
            { character: 'monkey', text: "Chiếc lồng tre mới rất hoàn hảo. Bác Ngư Phủ gửi lời cảm ơn chúng ta." }
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
    }
// Lesson 168 - 180 (Group: Sông nước, Chapter 13:  'Thuyền nhỏ', Boss: Cá Sấu)
// Lesson 182 - 194 (Group: Sông nước, Chapter 14:  'Thác bạc', Boss: Cá Sấu)
// Lesson 196 - 208 (Group: Núi rừng, Chapter 15:  'Chân núi', Boss: Hổ Hung Ác)
// Lesson 210 - 222 (Group: Núi rừng, Chapter 16:  'Đá lăn', Boss: Hổ Hung Ác)
// Lesson 224 - 236 (Group: Núi rừng, Chapter 17:  'Rừng thông', Boss: Hổ Hung Ác)
// Lesson 238 - 250 (Group: Núi rừng, Chapter 18:  'Hươu sao', Boss: Hổ Hung Ác)
// Lesson 252 - 264 (Group: Núi rừng, Chapter 19:  'Đại bàng', Boss: Hổ Hung Ác)
// Lesson 266 - 278 (Group: Núi rừng, Chapter 20:  'Mây trắng', Boss: Hổ Hung Ác)
// Lesson 280 - 292 (Group: Núi rừng, Chapter 21:  'Đỉnh tuyết', Boss: Hổ Hung Ác)
// Lesson 294 - 306 (Group: Đêm sao, Chapter 22:  'Trăng non', Boss: Bóng Ma)
// Lesson 308 - 320 (Group: Đêm sao, Chapter 23:  'Sao nhỏ', Boss: Bóng Ma)
// Lesson 322 - 334 (Group: Đêm sao, Chapter 24:  'Cú đêm', Boss: Bóng Ma)
// Lesson 336 - 348 (Group: Đêm sao, Chapter 25:  'Đom đóm', Boss: Bóng Ma)
// Lesson 350 - 362 (Group: Đêm sao, Chapter 26:  'Đêm huyền bí', Boss: Bóng Ma)
// Lesson 364 - 376 (Group: Đêm sao, Chapter 27:  'Sao băng', Boss: Bóng Ma)
// Lesson 378 - 390 (Group: Đêm sao, Chapter 28:  'Dải ngân hà', Boss: Bóng Ma)
// Lesson 392 - 404 (Group: Biển khơi, Chapter 29:  'Bãi cát', Boss: Cá Mập)
// Lesson 406 - 418 (Group: Biển khơi, Chapter 30:  'Còng cát', Boss: Cá Mập)
// Lesson 420 - 432 (Group: Biển khơi, Chapter 31:  'Vỏ ốc', Boss: Cá Mập)
// Lesson 434 - 446 (Group: Biển khơi, Chapter 32:  'San hô', Boss: Cá Mập)
// Lesson 448 - 460 (Group: Biển khơi, Chapter 33:  'Rùa biển', Boss: Cá Mập)
// Lesson 462 - 474 (Group: Biển khơi, Chapter 34:  'Cá heo', Boss: Cá Mập)
// Lesson 476 - 488 (Group: Biển khơi, Chapter 35:  'Đại dương', Boss: Cá Mập)
// Lesson 490 - 502 (Group: Lâu đài, Chapter 36:  'Cổng đá', Boss: Tướng Cướp)
// Lesson 504 - 516 (Group: Lâu đài, Chapter 37:  'Hiệp sĩ', Boss: Tướng Cướp)
// Lesson 518 - 530 (Group: Lâu đài, Chapter 38:  'Cung tên', Boss: Tướng Cướp)
// Lesson 532 - 544 (Group: Lâu đài, Chapter 39:  'Tháp canh', Boss: Tướng Cướp)
// Lesson 546 - 558 (Group: Lâu đài, Chapter 40:  'Vương miện', Boss: Tướng Cướp)
// Lesson 560 - 572 (Group: Lâu đài, Chapter 41:  'Rồng nhỏ', Boss: Tướng Cướp)
// Lesson 574 - 586 (Group: Lâu đài, Chapter 42:  'Trận thắng', Boss: Tướng Cướp)
// Lesson 588 - 600 (Group: Vũ trụ, Chapter 43:  'Tên lửa', Boss: Alien Hắc Ám)
// Lesson 602 - 614 (Group: Vũ trụ, Chapter 44:  'Trái đất', Boss: Alien Hắc Ám)
// Lesson 616 - 628 (Group: Vũ trụ, Chapter 45:  'Mặt trăng', Boss: Alien Hắc Ám)
// Lesson 630 - 642 (Group: Vũ trụ, Chapter 46:  'Sao chổi', Boss: Alien Hắc Ám)
// Lesson 644 - 656 (Group: Vũ trụ, Chapter 47:  'Sao Thổ', Boss: Alien Hắc Ám)
// Lesson 658 - 670 (Group: Vũ trụ, Chapter 48:  'Hành tinh lạ', Boss: Alien Hắc Ám)
// Lesson 672 - 684 (Group: Vũ trụ, Chapter 49:  'Siêu tân tinh', Boss: Alien Hắc Ám)
// Lesson 686 - 698 (Group: Vũ trụ, Chapter 50:  'Vô tận', Boss: Alien Hắc Ám)

};
