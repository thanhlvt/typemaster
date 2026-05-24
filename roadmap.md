Phân tích "Học Gõ Telex cùng Khỉ Con" Kiến trúc hiện tại Thành phần	Chi tiết

Engine	Phaser 3 + Vite Màn hình	BootScene → PlayScene (2 scene) Lessons	100 bài,
split thành nhiều file JSON Lưu trữ	localStorage (lesson index + score)
Input	Telex engine tự viết, virtual keyboard Audio	4 sound effects (key, error,
win, level)

Gợi ý bổ sung

1. UX / Trải nghiệm người dùng Màn hình chọn bài (Lesson Map)

Hiện tại: không thể nhảy bài, buộc phải học tuần tự Thêm: màn hình bản đồ với
100 ô bài học, ô đã hoàn thành hiển thị sao, ô chưa mở thì khóa Lợi ích: user
thấy tiến độ toàn bộ, có động lực hoàn thành Hệ thống xếp hạng sao (1–3 sao/bài)

Dựa trên accuracy: ≥95% → 3 sao, ≥80% → 2 sao, còn lại → 1 sao Hiển thị trên màn
hình ResultOverlay và Lesson Map Cho phép chơi lại bài cũ để cải thiện sao Thanh
tiến độ tổng thể

Hiển thị "Bài 23/100" thay vì chỉ đếm chuối Progress bar nhỏ ở góc màn hình Cài
đặt âm thanh

Nút mute/unmute, thanh điều chỉnh volume Hiện tại không tắt được âm thanh Chế độ
luyện tập tự do

Gõ bất kỳ từ tiếng Việt nào, xem kết quả Telex real-time Không bị ràng buộc bài
học

2. Engagement / Giữ chân người dùng Daily Streak (Chuỗi ngày học)

Lưu thêm vào localStorage: { lastPlayDate, streakDays } Hiển thị "🔥 3 ngày liên
tiếp" trên màn hình chính Cực kỳ hiệu quả với app học ngôn ngữ (cơ chế giống
Duolingo) Hệ thống Achievement (Huy hiệu)

Huy hiệu	Điều kiện Người mới	Hoàn thành bài 1 Tốc ký	WPM ≥ 50 Hoàn hảo	Accuracy
100% Kiên trì	7 ngày streak Thạo Telex	Hoàn thành 100 bài Combo Multiplier

Trả lời đúng liên tiếp → nhân điểm ×2, ×3... Hiển thị combo counter nổi bật,
shake màn hình nhẹ khi đạt milestone Bảng điểm cá nhân (Historical Stats)

Lưu lịch sử WPM và accuracy theo từng bài vào localStorage Màn hình "Thống kê"
với biểu đồ đơn giản (có thể vẽ bằng Phaser Graphics) Mở khóa skin
Monkey/Background

Hiện tại random ngẫu nhiên; thay bằng: đạt đủ điểm mở khóa monkey/bg mới Tạo
động lực kiếm chuối hơn

3. SEO Vấn đề lớn nhất: Game là canvas-based, search engine không đọc được nội
   dung bên trong. Cần bổ sung HTML content bên ngoài canvas.

Bổ sung meta tags vào index.html:

<meta name="description" content="Học gõ tiếng Việt Telex miễn phí cùng Khỉ Con - 100 bài luyện tập từ cơ bản đến nâng cao. Phù hợp mọi lứa tuổi.">
<meta property="og:title" content="Học Gõ Telex cùng Khỉ Con">
<meta property="og:description" content="Game học gõ tiếng Việt Telex thú vị với 100 bài học, có hướng dẫn ngón tay và âm thanh sinh động.">
<meta property="og:image" content="/assets/og-thumbnail.png">
<meta property="og:type" content="website">
<meta name="twitter:card" content="summary_large_image">
<link rel="canonical" href="https://your-domain.com/">
Thêm Schema.org JSON-LD:

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "LearningResource",
  "name": "Học Gõ Telex cùng Khỉ Con",
  "description": "Game học gõ tiếng Việt bằng phương pháp Telex",
  "inLanguage": "vi",
  "educationalLevel": "beginner",
  "teaches": "Vietnamese Telex typing"
}
</script>

Thêm landing section HTML (ngoài canvas):

Một <section> ẩn hoặc dưới game chứa text mô tả: tính năng, cách chơi, FAQ
Search engine đọc được, user thấy khi scroll xuống Target keywords: "học gõ
telex", "telex tiếng Việt", "luyện gõ 10 ngón" PWA Manifest → cải thiện Core Web
Vitals + khả năng cài app:

// public/manifest.json { "name": "Học Gõ Telex cùng Khỉ Con", "short_name":
"TypeMaster", "start_url": "/", "display": "standalone", "theme_color":
"#2c3e50", "icons": [...] } robots.txt và sitemap.xml — hiện tại thiếu cả hai.

# Ưu tiên triển khai

| Độ ưu tiên | Feature                       | Effort   |
| ---------- | ----------------------------- | -------- |
| Cao        | Meta tags SEO + OG image      | 30 phút  |
| Cao        | Daily streak                  | 2–3 giờ  |
| Cao        | Hệ thống sao (1–3 sao/bài)    | 3–4 giờ  |
| Cao        | Thanh tiến độ tổng (X/100)    | 1 giờ    |
| Trung      | Landing section HTML cho SEO  | 2 giờ    |
| Trung      | Achievement system            | 1 ngày   |
| Trung      | Màn hình chọn bài             | 1–2 ngày |
| Thấp       | Combo multiplier              | 3–4 giờ  |
| Thấp       | Lịch sử thống kê + biểu đồ    | 1 ngày   |
| Thấp       | PWA manifest + service worker | nửa ngày |
