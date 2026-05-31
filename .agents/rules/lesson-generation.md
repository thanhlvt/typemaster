---
trigger: always_on
---

# Đây là web tập gõ tiếng Việt. Các bài học được tập hợp lại trong mảng lessons và export ra từ file src/data/lessons.js.

- Các bài học từ level_1 đến level_101 là các bài tập gõ cơ bản (thuộc group 1 cũ).
- Các bài học từ level_102 trở đi là các bài tập gõ nâng cao theo câu, chia theo các chủ đề nội dung khác nhau (thuộc group 2 đến 7 cũ).

# Rule nội dung bài học:

- Bài học thuộc nhóm cơ bản (group 1 cũ): Chứa 6 đến 8 câu
- Bài học thuộc nhóm nâng cao (group 2 đến 7 cũ): chứa 5 câu
- Một câu chứa không quá 6 chữ
- Các câu không được trùng lặp quá 4 chữ trong tất cả các bài
- Một câu được định nghĩa bởi 2 thành phần: display và keys
- display là nội dung tiếng Việt, phải là một câu tiếng Việt có đầy đủ ý nghĩa
- keys là cách gõ telex của display, phải match 100% với rule gõ được định nghĩa trong file src/data/rules.js

# Rule gõ tiếng Việt telex được đặt trong file src/data/rules.js.

# Các tool để validate

- Hãy sử dụng tool scripts/validate-lessons.js để kiểm tra nội dung bài học xem display có khớp với keys hay không
- Dùng scripts/check-rules.js để kiểm tra nội dung bài học có đảm bảo các rule: Bài học ở phần nâng cao chứa 5 câu, một câu không quá 6 chữ, Các câu không được trùng lặp quá 4 chữ.
- Dùng scripts/extract-display.js để trích xuất các item display, để kiểm tra xem nội dung có phù hợp với tiếng Việt không
