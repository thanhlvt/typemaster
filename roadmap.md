# TypeMaster — Review Toàn Diện

## I. Danh Sách Chức Năng Hiện Tại

### Core Gameplay
- 700 bài học (50 chương × 14 bài), chia 7 nhóm chủ đề có tên và emoji
- Gõ tiếng Việt Telex thời gian thực với validator lookahead
- Combo multiplier ×1 → ×4 với animation popup + shake effects
- SprintScene: chế độ đua tốc độ 60 giây
- Daily challenge: bài ngẫu nhiên seeded theo ngày

### Progression & Rewards
- Hệ thống mở khoá bài theo thứ tự (chương N mở sau khi hoàn thành chương N-1)
- Xếp hạng 1–3 sao mỗi bài (dựa trên accuracy)
- Lưu WPM tốt nhất, accuracy tốt nhất per lesson
- 10 skin khỉ mở khoá theo điểm tích luỹ (thresholds: 50 → 2300)
- 7 background chủ đề mở khoá theo tiến độ chương
- 20 thành tích (5 nhóm: milestone, tốc độ, độ chính xác, streak, misc)
- Streak theo dõi ngày liên tiếp (7/14/30 ngày)

### UI/UX
- MapScene: bản đồ bài học dạng lưới 4 cột, sidebar cuộn 50 chương
- Virtual keyboard với màu highlight ngón tay
- StatsOverlay: dashboard tổng hợp (WPM, accuracy, sao, bài hoàn thành)
- AchievementsOverlay: lưới 4×5 thành tích
- Toast notification hàng đợi khi mở khoá thành tích
- OptionsOverlay: mute/volume
- ConfirmDialog reset toàn bộ tiến độ

---

## II. Đánh Giá Khả Năng Engage Trẻ 6–10 Tuổi

### Điểm Mạnh

| Yếu tố | Đánh giá |
|--------|----------|
| Combo system × multiplier | Tốt — tạo cảm giác "flow" khi gõ liên tục |
| Skin khỉ unlockable | Tốt — nhân vật dễ thương, trẻ thích customize |
| Background 7 chủ đề | Tốt — visual đa dạng, tạo cảm giác "đi phiêu lưu" |
| Sound effects (key, error, win) | Tốt — feedback tức thì |
| 3-sao rating | Tốt — mục tiêu rõ ràng, muốn "full star" |
| Streak daily | Trung bình — khái niệm streak trẻ 6-8 chưa hiểu rõ |

### Điểm Yếu Nghiêm Trọng

**1. Nội dung từ vựng chưa được điều chỉnh cho trẻ em**
- 700 bài học dạy kỹ thuật gõ (Telex), nhưng không có hình ảnh minh hoạ từ vựng — trẻ 6-8 tuổi cần visual context để ghi nhớ.
- Bài học dạng text-only trong TypingBox khô khan, không kể câu chuyện.

**2. Độ khó không có onboarding cho người mới hoàn toàn**
- Không có tutorial/hướng dẫn tương tác cho lần đầu tiên. Trẻ mở ra thấy bản đồ 700 bài → bị overwhelm.
- Telex input phức tạp (aa→â, aw→ă, sfrxjz cho dấu) — không có giải thích in-game.

**3. MapScene không hấp dẫn về mặt thị giác**
- Lưới bài học dạng list/grid thuần túy, thiếu yếu tố "adventure map" (bản đồ phiêu lưu có địa hình, nhân vật di chuyển...).
- Trẻ 6-10 tuổi bị thu hút bởi game như Duolingo, Mario — TypeMaster hiện tại giống phần mềm học hơn là game.

**4. Thiếu tính xã hội và cạnh tranh**
- Không có leaderboard, không so sánh với bạn bè, không share kết quả.
- Trẻ em rất bị động lực bởi peer comparison.

**5. Thiếu vòng lặp ngắn hạn (short feedback loop)**
- Reward chính là "mở bài tiếp theo" — quá dài hạn. Trẻ cần phần thưởng ngay sau 1-2 phút.
- Không có mini-game, không có surprise rewards (loot boxes, random bonus...).

**6. Âm thanh và animation còn đơn giản**
- Chưa có nhạc nền, chỉ có SFX rời rạc.
- Khỉ không animate khi gõ đúng/sai (chỉ là static sprite).

**Điểm Engage Tổng Thể: 5.5/10** — đủ cho người lớn tự học, chưa đủ giữ chân trẻ 6-10.

---

## III. Đánh Giá SEO

### Điểm Mạnh
- `index.html` có semantic HTML, tiếng Việt đúng
- Có `favicon.svg`
- Vite build tối ưu bundle size

### Điểm Yếu

**1. App là Phaser Canvas — Google không index được nội dung**
- Toàn bộ UI render trong `<canvas>`. Crawler chỉ thấy shell HTML rỗng.
- 700 bài học, 20 thành tích, tên chương... không có trong DOM.

**2. Thiếu meta tags cơ bản**
- Cần: `og:title`, `og:description`, `og:image`, `twitter:card`
- Không có structured data (schema.org `EducationalApp`, `Game`)

**3. Không có landing page content**
- Không có text mô tả về app ngoài canvas — Google không hiểu app này làm gì.
- Thiếu FAQ, feature list, screenshots dạng HTML.

**4. Không có sitemap.xml, robots.txt**

**5. Core Web Vitals**
- Canvas game thường có LCP chậm vì phải load toàn bộ assets trước khi hiển thị gì.
- Không có skeleton/loading placeholder thân thiện.

**6. Không có backlink strategy** — cần bài blog, hướng dẫn, so sánh với phần mềm khác.

**Điểm SEO Tổng Thể: 3/10** — đây là điểm yếu lớn nhất vì canvas app về cơ bản "vô hình" với search engine.

---

## IV. Gợi Ý Cải Thiện

### A. Tăng Engage & Retention

**1. Adventure Map thay Grid List**
- Chuyển MapScene thành bản đồ phiêu lưu có địa hình (rừng → biển → núi → vũ trụ), nhân vật khỉ di chuyển theo tiến độ.
- Mỗi "đảo" = 1 chương, có animation khi mở khoá (cầu xuất hiện, màn sương tan...).
- Effort: Cao | Impact: Rất cao

**2. Tutorial Tương Tác Lần Đầu (FTUE)**
- Bài học 0: hướng dẫn từng bước bằng dialog/mascot khỉ nói chuyện.
- Giải thích Telex bằng animation ngón tay.
- Effort: Trung bình | Impact: Cao

**3. Phần Thưởng Ngắn Hạn (Short Reward Loop)**
- Sau mỗi bài: random "treasure chest" (1-3 loại) — thêm skin item, banana bonus, sticker.
- "Lucky Spin" khi đạt combo ×4 lần đầu trong ngày.
- Effort: Trung bình | Impact: Cao với trẻ em

**4. Nhân Vật Khỉ Animate Theo Trạng Thái**
- Khỉ nhảy vui khi gõ đúng, lắc đầu khi gõ sai, nhảy múa khi hoàn thành bài.
- Dễ làm với Phaser sprite sheets.
- Effort: Thấp-Trung | Impact: Cao

**5. Âm Nhạc Nền Theo Chủ Đề**
- Nhạc nền nhẹ nhàng thay đổi theo 7 nhóm chủ đề (rừng, đại dương...).
- Effort: Thấp (mua nhạc free license) | Impact: Trung bình-Cao

**6. Boss Level / Mini-Game Cuối Chương**
- Sau 14 bài của mỗi chương: "Boss battle" — gõ đua với boss trong 30 giây.
- Thắng → nhận item hiếm, mở chương mới có cutscene ngắn.
- Effort: Cao | Impact: Rất cao

**7. Hệ Thống Chia Sẻ Kết Quả**
- Share ảnh kết quả (WPM, sao, nhân vật) lên mạng xã hội.
- Link mời bạn chơi cùng.
- Effort: Trung bình | Impact: Cao (viral loop)

**8. Chế Độ Luyện Tập Tự Do (Free Practice)**
- Cho phép gõ bất kỳ từ nào, hiển thị WPM + accuracy không có penalty.
- Phù hợp trẻ mới hoàn toàn.
- Effort: Thấp | Impact: Trung bình

**9. Sự Kiện Theo Mùa (Seasonal Events)**
- "Tháng 6: Huy hiệu Mùa Hè", "Tháng 1: Huy hiệu Tết".
- Skin giới hạn thời gian (limited edition) → FOMO tự nhiên.
- Effort: Thấp (chủ yếu design) | Impact: Cao cho retention dài hạn

**10. Nhân Vật Đa Dạng Hơn**
- Thêm nhân vật ngoài khỉ (mèo, gấu trúc...) — trẻ thích chọn nhân vật yêu thích.
- Effort: Trung bình | Impact: Trung bình-Cao

---

### B. Tăng SEO

**1. Landing Page HTML Đầy Đủ** *(quan trọng nhất)*
- Thêm section HTML bên dưới canvas (hoặc trang riêng) với: mô tả app, screenshots, features, FAQ.
- Dùng heading `h1`–`h3`, bullet points, alt text cho ảnh.
- Keywords mục tiêu: "học gõ 10 ngón tiếng Việt", "tập đánh máy cho trẻ em", "telex typing game"

**2. Meta Tags & Open Graph**
```html
<meta name="description" content="Game học gõ 10 ngón tiếng Việt cho trẻ em...">
<meta property="og:title" content="TypeMaster — Học Gõ Tiếng Việt">
<meta property="og:image" content="/screenshot.png">
<meta name="twitter:card" content="summary_large_image">
```

**3. Structured Data (Schema.org)**
```json
{
  "@type": "EducationalApplication",
  "educationalLevel": "Beginner",
  "applicationCategory": "Game",
  "inLanguage": "vi"
}
```

**4. Blog / Content Marketing**
- Bài "Hướng dẫn gõ Telex cho người mới", "Lợi ích gõ 10 ngón với trẻ em"
- Đây là cách duy nhất để rank từ khoá long-tail.

**5. sitemap.xml + robots.txt**

**6. Performance (Core Web Vitals)**
- Thêm loading screen có nội dung HTML trong khi Phaser khởi động (thay vì canvas trắng).
- Preconnect Google Fonts.

---

## V. Roadmap Ưu Tiên

| Priority | Task | Effort | Impact |
|----------|------|--------|--------|
| P0 | Landing page HTML + meta tags | 2 ngày | SEO critical |
| P0 | First-time tutorial (khỉ hướng dẫn) | 3 ngày | Retention critical |
| P1 | Khỉ animate theo trạng thái | 2 ngày | Engagement |
| P1 | Nhạc nền theo chủ đề | 1 ngày | Immersion |
| P1 | Short reward loop (treasure after lesson) | 3 ngày | Retention |
| P2 | Adventure map thay grid | 1 tuần | Engagement cao |
| P2 | Boss level cuối chương | 1 tuần | Retention cao |
| P2 | Share kết quả lên mạng | 3 ngày | Viral loop |
| P3 | Seasonal events / skin giới hạn | ongoing | Long-term retention |
| P3 | Blog content marketing | ongoing | SEO long-term |
