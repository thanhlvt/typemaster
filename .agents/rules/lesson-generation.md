---
trigger: always_on
---

# Đây là web tập gõ tiếng Việt. Các bài học được chứa trong các file json trong thư mục public/lessons.

- group_1_rung.json
- group_2_song-nuoc.json
- group_3_nui-rung.json
- group_4_dem-sao.json
- group_5_bien-khoi.json
- group_6_lau-dai.json
- group_7_vu-tru.json

- group 1 là các bài tập gõ cơ bản
- group 2 đến 7 là các bài tập gõ nâng cao theo câu, chia theo các chủ đề nội
  dung khác nhau.

# Rule nội dung bài học:

- Bài học trong group 1: Chứa 6 đến 8 câu
- Bài học trong group 2 đến 7: chứa 5 câu
- Một câu chứa không quá 6 chữ
- Các câu không được trùng lặp quá 4 chữ trong tất cả các group
- Một câu được định nghĩa bởi 2 thành phần: display và keys
- display là nội dung tiếng Việt, phải là một câu tiếng Việt có đầy đủ ý nghĩa
- keys là cách gõ telex của display, phải match 100% với rule gõ được định nghĩa
  trong file public/rules.json

# Rule gõ tiếng Việt telex được đặt trong file public/rules.json.

# Các tool để validate

- Hãy sử dụng tool scripts/validate-lessons.js để kiểm tra nội dung bài học xem
  display có khớp với keys hay không
- Dùng scripts/check-rules.js để kiểm tra nội dung bài học có đảm bảo các rule:
  Bài học trong group 2 đến 7: chứa 5 câu, một câu không quá 6 chữ, Các câu
  không được trùng lặp quá 4 chữ trong tất cả các group
- Dùng scripts/extract-display.js để trích xuất các item display, để kiểm tra
  xem nội dung có phù hợp với tiếng Việt không
