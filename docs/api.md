# LinguaFlow API Reference

Tài liệu kỹ thuật cho REST API của LinguaFlow. Đây là phần backend được triển khai bằng Express + TypeScript + Prisma.

- **Base URL local:** `http://localhost:3001/api`
- **Base URL production:** `https://linguaflow-api-ujjo.onrender.com/api`
- **Content-Type:** `application/json; charset=utf-8`
- **Auth:** JWT Bearer token (gửi qua header `Authorization` hoặc cookie `token`)
- **Rate limit:** 100 request / 15 phút mỗi IP cho `/api/*`, riêng `/api/auth/login` và `/api/auth/register` giới hạn 10 request / 15 phút

---

## Mục lục

| Nhóm | Endpoints |
|------|-----------|
| [Auth](#auth) | 4 |
| [Languages & Lessons](#languages--lessons) | 5 |
| [Vocabulary & Flashcard](#vocabulary--flashcard) | 6 |
| [Quiz](#quiz) | 3 |
| [Listening, Speaking, Pronunciation](#listening-speaking-pronunciation) | 8 |
| [Stories, Grammar, Sentence Builder, Typing](#stories-grammar-sentence-builder-typing) | 7 |
| [Progress & Analytics](#progress--analytics) | 6 |
| [Gamification](#gamification) | 13 |
| [Social](#social) | 7 |
| [User & Settings](#user--settings) | 7 |
| [Misc](#misc) | 5 |
| [Admin](#admin) | 5 |

Quy ước:
- Cột `Auth` ghi `Yes` nếu cần JWT, `No` nếu công khai.
- Mọi response lỗi đều có dạng `{ "error": string, "code"?: string, "details"?: any }`.

---

## Auth

### POST /auth/register

Đăng ký tài khoản mới và tự động cấp JWT 7 ngày qua cookie `token`.

| Mục | Giá trị |
|-----|---------|
| Auth | No |
| Body | `{ email, password, name }` |

```json
// Request
{
  "email": "user@linguaflow.app",
  "password": "user123",
  "name": "Nguyễn Văn A"
}
```

```json
// 201 Created
{
  "user": {
    "id": "ckxxx",
    "email": "user@linguaflow.app",
    "name": "Nguyễn Văn A",
    "role": "user"
  },
  "token": "eyJhbGciOi..."
}
```

| Code | Khi nào |
|------|---------|
| 400 | Email đã tồn tại hoặc body không hợp lệ |
| 429 | Quá 10 request / 15 phút |
| 500 | Lỗi server không xác định |

### POST /auth/login

Đăng nhập, trả về token và thông tin user (kèm xp, level, streak).

| Mục | Giá trị |
|-----|---------|
| Auth | No |
| Body | `{ email, password }` |

```json
// 200 OK
{
  "user": {
    "id": "ckxxx",
    "email": "user@linguaflow.app",
    "name": "Nguyễn Văn A",
    "role": "user",
    "xp": 320,
    "level": 4,
    "streak": 5
  },
  "token": "eyJhbGciOi..."
}
```

| Code | Khi nào |
|------|---------|
| 401 | Email hoặc mật khẩu sai |
| 429 | Quá rate limit auth |

### GET /auth/me

Trả về thông tin người dùng đang đăng nhập.

| Mục | Giá trị |
|-----|---------|
| Auth | Yes |

```json
// 200 OK
{
  "user": {
    "id": "ckxxx",
    "email": "user@linguaflow.app",
    "name": "Nguyễn Văn A",
    "avatar": null,
    "role": "user",
    "xp": 320,
    "level": 4,
    "streak": 5,
    "lastActiveAt": "2026-05-17T10:00:00.000Z",
    "createdAt": "2026-05-01T03:12:00.000Z"
  }
}
```

| Code | Khi nào |
|------|---------|
| 401 | Thiếu hoặc token không hợp lệ |
| 404 | User đã bị xóa khỏi DB |

### POST /auth/logout

Xóa cookie `token` ở trình duyệt.

| Mục | Giá trị |
|-----|---------|
| Auth | Yes |

```json
// 200 OK
{ "message": "Logged out" }
```

---

## Languages & Lessons

### GET /languages

Danh sách 4 ngôn ngữ học, kèm cấp độ.

| Mục | Giá trị |
|-----|---------|
| Auth | No |

```json
// 200 OK
{
  "languages": [
    {
      "id": "lang_en",
      "code": "en",
      "name": "English",
      "levels": [
        { "id": "lvl_en_b", "slug": "beginner", "name": "Sơ cấp", "order": 1 }
      ]
    }
  ]
}
```

### GET /languages/:code

Chi tiết một ngôn ngữ theo `code` (`en`, `ja`, `zh`, `ko`), bao gồm bài học theo từng cấp độ.

| Code | Khi nào |
|------|---------|
| 404 | Ngôn ngữ không tồn tại |

### POST /languages/:code/enroll

Ghi danh người dùng vào một ngôn ngữ. Body có thể chứa `levelId` và `goal`.

| Mục | Giá trị |
|-----|---------|
| Auth | Yes |

```json
// 200 OK
{
  "enrollment": {
    "id": "enr_xxx",
    "userId": "ckxxx",
    "languageId": "lang_en",
    "levelId": "lvl_en_b",
    "goal": 30,
    "isActive": true
  }
}
```

### GET /lessons

Danh sách bài học, lọc theo `languageCode` hoặc `levelId`.

| Mục | Giá trị |
|-----|---------|
| Auth | Yes |
| Query | `languageCode`, `levelId` |

```json
// 200 OK
{
  "lessons": [
    {
      "id": "lesson_xxx",
      "title": "Greetings",
      "topic": "greetings",
      "xpReward": 25,
      "level": { "language": { "code": "en" } },
      "progress": []
    }
  ]
}
```

### GET /lessons/:id

Chi tiết bài học, kèm `vocabulary`, `quizzes` và `progress` của user.

| Code | Khi nào |
|------|---------|
| 404 | Bài học không tồn tại |

### POST /lessons/:id/complete

Đánh dấu hoàn thành bài học, cộng XP và kích hoạt kiểm tra achievement.

| Mục | Giá trị |
|-----|---------|
| Auth | Yes |
| Body | `{ score?: 0-100, timeSpent?: seconds }` |

```json
// 200 OK
{
  "progress": { "id": "lp_xxx", "completed": true, "score": 90 },
  "xp": 345,
  "level": 4,
  "streak": 6,
  "leveledUp": false,
  "newAchievements": []
}
```

---

## Vocabulary & Flashcard

### GET /vocabulary

Danh sách từ vựng, hỗ trợ lọc theo `lessonId` hoặc `due=true` để chỉ lấy thẻ đến hạn ôn tập (theo SM-2).

| Mục | Giá trị |
|-----|---------|
| Auth | Yes |
| Query | `page=1`, `limit=20`, `lessonId`, `due` |

```json
// 200 OK
{
  "data": [
    {
      "id": "vocab_xxx",
      "word": "hello",
      "meaning": "xin chào",
      "example": "Hello, how are you?",
      "flashcardProgress": []
    }
  ],
  "pagination": { "page": 1, "limit": 20, "total": 150, "totalPages": 8 }
}
```

### POST /vocabulary/:id/review

Ghi nhận một lượt ôn tập. Tham số `quality` 0-5 theo chuẩn SM-2; nếu chỉ truyền `known`, hệ thống map sang `quality=4` (đúng) hoặc `1` (sai).

| Mục | Giá trị |
|-----|---------|
| Auth | Yes |
| Body | `{ known?: boolean, quality?: 0-5 }` |

```json
// 200 OK
{
  "progress": { "id": "fp_xxx", "interval": 6, "easeFactor": 2.6 },
  "nextReview": "2026-05-23T10:00:00.000Z",
  "interval": 6,
  "easeFactor": 2.6,
  "quality": 4
}
```

### GET /flashcard-review/weak

Trả về danh sách từ vựng yếu (đã ôn nhưng `known=false`). Auth: Yes.

### GET /flashcard-review/due

Danh sách thẻ đến hạn ôn tập theo `nextReview <= now`. Auth: Yes.

### POST /flashcard-review/review

Ghi nhận lượt ôn tập tổng hợp (multi-card). Body `{ vocabularyId, quality }`. Auth: Yes.

### GET /flashcard-review/stats

Thống kê tổng số thẻ đã học, đã thuộc, đang đến hạn. Auth: Yes.

---

## Quiz

### GET /quiz/lesson/:lessonId

Trả về toàn bộ quiz của một bài học.

| Mục | Giá trị |
|-----|---------|
| Auth | Yes |

```json
// 200 OK
{
  "quizzes": [
    {
      "id": "quiz_xxx",
      "type": "multiple_choice",
      "question": "How do you say hello?",
      "options": ["Xin chào", "Tạm biệt"],
      "answer": "Xin chào"
    }
  ]
}
```

### GET /quiz/practice

Random pool quiz cho luyện tập. Hỗ trợ lọc theo `language` (en/ja/zh/ko), giới hạn `limit` (max 20).

### POST /quiz/:id/attempt

Nộp đáp án. Đáp án đúng cộng 5 XP qua `awardXP`.

| Mục | Giá trị |
|-----|---------|
| Auth | Yes |
| Body | `{ answer: string, timeSpent?: number }` |

```json
// 200 OK
{
  "attempt": { "id": "qa_xxx", "correct": true },
  "correct": true,
  "explanation": "..."
}
```

| Code | Khi nào |
|------|---------|
| 400 | Validation lỗi |
| 404 | Quiz không tồn tại |

---

## Listening, Speaking, Pronunciation

### GET /listening

Danh sách bài nghe. Query: `lang` (mặc định `en`), `level`, `type` (`dictation`, `comprehension`, `fill_audio`, `word_recognition`). Auth: Yes.

### GET /listening/:id

Chi tiết bài nghe (không trả `answer`). Auth: Yes.

### POST /listening/submit

Nộp đáp án. Đúng nhận 10 XP, sai nhận 2 XP.

| Body | `{ exerciseId, answer, timeSpent? }` |
|------|---------------------------------------|

```json
// 200 OK
{
  "correct": true,
  "correctAnswer": "Hello, how are you?",
  "transcript": "Hello, how are you?",
  "transcriptVi": "Xin chào, bạn khỏe không?",
  "xpEarned": 10,
  "feedback": "Chính xác! Tai nghe của bạn rất tốt."
}
```

### GET /speaking

Danh sách bài nói. Query: `lang`, `level`, `type` (`repeat`, `respond`, `describe`, `read_aloud`, `role_play`). Auth: Yes.

### GET /speaking/:id

Chi tiết bài nói. Auth: Yes.

### POST /speaking/submit

Nộp kết quả luyện nói (chấm điểm phát âm phía client). Body `{ exerciseId, audioScore?: 0-100, duration?, transcript? }`. Auth: Yes.

### GET /pronunciation

Danh sách bài luyện phát âm. Query: `lang`. Auth: Yes.

### POST /pronunciation/attempt

Ghi nhận lần thử phát âm, trả về scoring criteria và feedback. Auth: Yes.

---

## Stories, Grammar, Sentence Builder, Typing

### GET /stories

Danh sách truyện song ngữ. Query: `lang`, `level`, `category`. Trả về tóm tắt + số segment, số câu hỏi. Auth: Yes.

### GET /stories/:id

Chi tiết truyện kèm toàn bộ segment (narration / dialogue / question). Auth: Yes.

### POST /stories/:id/complete

Hoàn thành truyện, cộng XP theo accuracy. Body `{ correctAnswers, totalQuestions }`. Auth: Yes.

### GET /grammar-tips

Danh sách mẹo ngữ pháp theo `lang` (mặc định `en`) và `level`. Auth: Yes.

### GET /grammar-tips/:id

Chi tiết mẹo ngữ pháp. Auth: Yes. Trả 404 nếu không tìm thấy.

### GET /sentence-builder

Danh sách bài tập ghép câu theo `lang`, `level`. Auth: Yes.

### POST /sentence-builder/check

Kiểm tra câu được ghép. Body `{ exerciseId, words: string[] }`. Trả về `correct` và giải thích. Auth: Yes.

### GET /typing-practice

Danh sách bài luyện gõ phím (Hangul, Hiragana, Pinyin, ...). Query: `lang`. Auth: Yes.

### POST /typing-practice/result

Ghi nhận kết quả: WPM, accuracy. Cộng XP theo điểm. Auth: Yes.

---

## Progress & Analytics

### GET /progress/dashboard

Dữ liệu cho dashboard: stats user, enrollments, recent progress, weekly activity.

| Mục | Giá trị |
|-----|---------|
| Auth | Yes |

```json
// 200 OK
{
  "stats": {
    "xp": 320,
    "level": 4,
    "streak": 5,
    "completedLessons": 12,
    "quizAccuracy": 88
  },
  "enrollments": [],
  "recentProgress": [],
  "weeklyActivity": [
    { "date": "2026-05-11", "activities": 3 }
  ]
}
```

### GET /progress/streak

Trả về số ngày streak hiện tại, reset về 0 nếu cách 1 ngày trở lên không học.

### GET /analytics/overview

Tổng quan analytics: XP, level, streak, số lesson hoàn thành, tổng từ đã học, độ chính xác quiz. Auth: Yes.

### GET /analytics/languages

Phân tích theo từng ngôn ngữ user enroll: progress %, vocab learned/total, lesson completed/total. Hỗ trợ phân trang. Auth: Yes.

### GET /analytics/activity

Hoạt động hàng ngày trong N ngày gần nhất (mặc định 30). Auth: Yes.

### GET /learning-progress

Tiến độ học toàn cục. Auth: Yes.

### GET /learning-progress/milestones

Cột mốc đã đạt được. Auth: Yes.

---

## Gamification

### GET /achievements

Toàn bộ achievement kèm trạng thái mở khóa của user (nếu đã đăng nhập).

| Mục | Giá trị |
|-----|---------|
| Auth | Optional |
| Query | `page=1`, `limit=20` |

### GET /achievements/me

Achievement đã mở khóa. Auth: Yes.

### POST /achievements/check

Kiểm tra và trao achievement mới dựa trên hoạt động gần nhất. Auth: Yes.

### GET /leaderboard

Bảng xếp hạng. Query: `period` (`weekly`, `monthly`, `alltime`), `language`.

```json
// 200 OK
{
  "leaderboard": [
    { "rank": 1, "id": "ckxxx", "name": "Anna", "xp": 1200, "level": 12, "streak": 30 }
  ],
  "userRank": { "rank": 23, "name": "Bạn", "xp": 320 },
  "period": "weekly"
}
```

### GET /daily-challenge/today

Thử thách hôm nay + thử thách tuần. Bonus XP nhân theo streak (`min(2, 1 + streak * 0.1)`).

| Code | Khi nào |
|------|---------|
| 401 | Chưa đăng nhập |
| 500 | Lỗi tải thử thách |

### POST /daily-challenge/claim

Nhận thưởng challenge. Body `{ challengeId }`. Trả về `xpEarned`, `gemsEarned`.

### GET /quests/today

3 nhiệm vụ ngẫu nhiên (deterministic theo ngày + userId), kèm progress hiện tại và bonus 30 XP nếu hoàn thành cả 3. Auth: Yes.

### GET /skill-tree/:lang

Cây kỹ năng cho ngôn ngữ. Query: `level` (`beginner`, `elementary`, `intermediate`).

```json
// 200 OK
{
  "tree": [
    { "id": "en-greetings", "nameVi": "Chào hỏi", "status": "available" }
  ],
  "language": "en",
  "level": "beginner",
  "progress": { "completed": 2, "total": 9, "percentage": 22, "decaying": 1 }
}
```

### GET /skill-tree/:lang/recommendations

Đề xuất 3 kỹ năng tiếp theo và 3 kỹ năng cần ôn (decay > 0). Auth: Yes.

### GET /hearts

Trạng thái mạng sống, gem hiện có. Hearts tự hồi mỗi 30 phút.

```json
// 200 OK
{
  "hearts": 4,
  "maxHearts": 5,
  "gems": 120,
  "nextRefillInMinutes": 18
}
```

### POST /hearts/lose

Trừ 1 heart. Auth: Yes. Trả 400 nếu hết heart.

### POST /hearts/refill

Nạp lại đầy heart bằng 50 gems. Auth: Yes. Trả 400 nếu thiếu gems.

### POST /hearts/earn-gems

Cộng gems (cap 100/lần). Body `{ amount, reason }`. Auth: Yes.

### GET /shop

Danh sách 6 vật phẩm với cờ `affordable` dựa trên gems hiện có.

### POST /shop/purchase

Mua vật phẩm. Body `{ itemId, quantity?: 1-10 }`.

| Code | Khi nào |
|------|---------|
| 400 | Không đủ gems hoặc body lỗi |
| 404 | Vật phẩm không tồn tại |

### GET /shop/history

Lịch sử mua hàng (hiện tại trả mảng rỗng).

---

## Social

### GET /friends

Danh sách bạn bè đã `accepted`. Auth: Yes.

### GET /friends/requests

Danh sách lời mời pending tới user hiện tại. Auth: Yes.

### POST /friends/add

Gửi lời mời. Body `{ userId }`. Trả lỗi nếu đã là bạn hoặc đã có lời mời.

### POST /friends/:id/accept

Chấp nhận lời mời. Auth: Yes.

### POST /friends/:id/reject

Từ chối lời mời (xóa friendship pending). Auth: Yes.

### DELETE /friends/:id

Hủy kết bạn. Yêu cầu user là sender hoặc receiver. Auth: Yes.

### GET /friends/search

Tìm user theo `q` (>= 2 ký tự), tối đa 20 kết quả. Auth: Yes.

---

## User & Settings

### GET /profile

Thông tin profile chi tiết. Auth: Yes.

### PUT /profile

Cập nhật `name`, `avatar`, `bio`. Auth: Yes.

### PUT /profile/password

Đổi mật khẩu. Body `{ currentPassword, newPassword }`. Auth: Yes.

### GET /profile/stats

Thống kê cá nhân (XP, level, streak, achievement count). Auth: Yes.

### GET /settings

Cấu hình user (theme, ngôn ngữ giao diện). Auth: Yes.

### PUT /settings

Cập nhật cấu hình. Auth: Yes.

### GET /settings/preferences / PUT /settings/preferences

Cấu hình preferences chi tiết (notifications, sounds, daily reminder). Auth: Yes.

---

## Misc

### GET /health

Healthcheck cho Render/Vercel. Trả `{ status: "ok", timestamp }`. Auth: No.

### GET /ready

Kiểm tra DB ready bằng `SELECT 1`. Trả 503 nếu DB không kết nối. Auth: No.

### GET /word-of-day

Từ vựng nổi bật hôm nay theo `lang`. Auth: Yes.

### GET /word-of-day/history

Lịch sử 30 ngày word of the day. Auth: Yes.

### GET /search

Tìm kiếm tổng hợp vocabulary, lesson, story. Query: `q`, `type?`, `lang?`. Auth: Yes.

### GET /notifications

Danh sách thông báo (mock data tạm thời) + `unreadCount`. Auth: Yes.

### POST /notifications/:id/read

Đánh dấu một notification đã đọc. Auth: Yes.

### POST /notifications/read-all

Đánh dấu tất cả đã đc. Auth: Yes.

### GET /chat/sessions

Danh sách session chat AI Tutor. Auth: Yes.

### POST /chat/start

Bắt đầu session mới. Body `{ language?: en|ja|zh|ko, role?: teacher|friend|interviewer|restaurant|customer|doctor|travel }`. Auth: Yes.

### POST /chat/:sessionId/message

Gửi tin nhắn, nhận phản hồi từ AI provider chain (n8n > OpenAI > mock). Body `{ message: string (1-2000) }`. Auth: Yes.

### GET /chat/:sessionId

Lấy chi tiết session với messages parsed. Auth: Yes.

### GET /onboarding/status

Kiểm tra trạng thái onboarding của user. Auth: Yes.

### POST /onboarding/complete

Hoàn thành onboarding. Body `{ languages, dailyGoal: 5-60, level, motivation? }`. Tạo enrollment cho từng ngôn ngữ. Auth: Yes.

### GET /onboarding/placement-test/:lang

Bộ câu hỏi placement test (không trả `correct`). Auth: Yes.

### POST /onboarding/placement-test/submit

Nộp đáp án, hệ thống chấm cấp độ phù hợp dựa trên >= 50% đúng theo level. Auth: Yes.

### GET /onboarding/motivations

Danh sách lý do học (cho UI onboarding). Auth: Yes.

### GET /goals/today / POST /goals/update / GET /goals/history

Mục tiêu học hằng ngày (XP, lessons, vocab review).

### GET /daily-goals / PUT /daily-goals/target / POST /daily-goals/progress / GET /daily-goals/history

Quản lý mục tiêu chi tiết và lịch sử.

### GET /study/word-of-the-day / GET /study/review-forecast / POST /study/bookmarks/:vocabId / DELETE /study/bookmarks/:vocabId / GET /study/bookmarks

Tổ hợp endpoint hỗ trợ luồng học tập.

### GET /study-plan

Lộ trình học tự sinh. Auth: Yes.

### GET /bookmarks / POST /bookmarks/:vocabularyId / DELETE /bookmarks/:vocabularyId

Đánh dấu từ vựng yêu thích, có phân trang. Auth: Yes.

### GET /review-history / GET /review-history/calendar

Lịch sử ôn tập theo thời gian, hỗ trợ heatmap. Auth: Yes.

---

## Admin

Endpoint chỉ dành cho user có `role = "admin"`. Hiện chưa có middleware kiểm tra role chặt; vui lòng cẩn trọng khi expose.

### GET /admin/stats

Thống kê tổng (user, lesson, quiz attempt). Auth: Yes.

### GET /admin/users

Danh sách user có phân trang. Auth: Yes.

### GET /admin/lessons / POST /admin/lessons / PUT /admin/lessons/:id / DELETE /admin/lessons/:id

CRUD cho bài học.

---

## Mã lỗi chuẩn

| HTTP | code | Mô tả |
|------|------|-------|
| 400 | `VALIDATION_ERROR` | Body không hợp lệ, kèm `details` từ Zod |
| 400 | `BAD_REQUEST` | Logic phía client sai (ví dụ thiếu gems) |
| 401 | `UNAUTHORIZED` | Thiếu hoặc token không hợp lệ |
| 403 | `FORBIDDEN` | User không có quyền truy cập resource |
| 404 | `NOT_FOUND` | Resource không tồn tại |
| 409 | `CONFLICT` | Xung đột trạng thái (ví dụ đã là bạn) |
| 429 | `RATE_LIMIT` | Quá rate limit |
| 500 | `INTERNAL_ERROR` | Lỗi không xác định, đã log phía server |
| 503 | - | Database/service downstream chưa ready |

---

## Phụ lục: AI Tutor provider chain

Service AI tự động chọn provider theo thứ tự:

| Thứ tự | Điều kiện | Endpoint |
|--------|-----------|----------|
| 1 | `N8N_WEBHOOK_URL` được set | n8n webhook |
| 2 | `OPENAI_API_KEY` được set | OpenAI compatible (`OPENAI_BASE_URL` mặc định `https://api.openai.com/v1`, model mặc định `gpt-4o-mini`) |
| 3 | (mặc định) | Mock response trong `api/src/services/ai.ts` |

Mock response đảm bảo demo hoạt động trên môi trường không có API key.
