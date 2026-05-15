# LinguaFlow API Documentation

Base URL: `http://localhost:3001/api`

## Authentication

All protected routes require a Bearer token in the Authorization header:
```
Authorization: Bearer <token>
```

Tokens are returned on login/register and expire after 7 days.

---

## Auth

### POST /auth/register
Create a new account.

**Body:**
```json
{ "email": "user@example.com", "password": "min6chars", "name": "Display Name" }
```

**Response:** `201` — `{ user, token }`

### POST /auth/login
**Body:**
```json
{ "email": "user@example.com", "password": "password" }
```

**Response:** `200` — `{ user, token }`

### GET /auth/me 🔒
Get current user profile.

**Response:** `200` — `{ user }`

### POST /auth/logout
Clear auth cookie.

**Response:** `200` — `{ message: "Logged out" }`

---

## Languages

### GET /languages
List all available languages.

**Response:** `200` — `{ languages: [...] }`

### GET /languages/:code
Get language details with levels.

**Response:** `200` — `{ language }` | `404`

### POST /languages/:code/enroll 🔒
Enroll in a language course.

**Response:** `200` — `{ enrollment }`

---

## Lessons

### GET /lessons 🔒
List lessons. Supports query params: `languageCode`, `levelId`.

**Response:** `200` — `{ lessons: [...] }`

### GET /lessons/:id 🔒
Get lesson with vocabulary and quizzes.

**Response:** `200` — `{ lesson }` | `404`

### POST /lessons/:id/complete 🔒
Mark lesson as completed.

**Body:**
```json
{ "score": 85, "timeSpent": 120 }
```

**Response:** `200` — `{ progress }`

---

## Vocabulary

### GET /vocabulary 🔒
List vocabulary. Supports query param: `lessonId`.

**Response:** `200` — `{ vocabulary: [...] }`

### POST /vocabulary/:id/review 🔒
Submit flashcard review (SM-2 spaced repetition).

**Body:**
```json
{ "known": true }
```

**Response:** `200` — `{ progress }`

---

## Quiz

### GET /quiz/lesson/:lessonId 🔒
Get quizzes for a lesson.

**Response:** `200` — `{ quizzes: [...] }`

### POST /quiz/:id/attempt 🔒
Submit a quiz answer.

**Body:**
```json
{ "answer": "selected option", "timeSpent": 15 }
```

**Response:** `200` — `{ attempt, correct, explanation }`

---

## Chat (AI Tutor)

### POST /chat/start 🔒
Start a new conversation session.

**Body:**
```json
{ "language": "en|ja|zh|ko", "role": "teacher|friend|interviewer|restaurant|customer" }
```

**Response:** `200` — `{ session }`

### POST /chat/:sessionId/message 🔒
Send a message to the AI tutor.

**Body:**
```json
{ "message": "Hello, how are you?" }
```

**Response:** `200` — `{ response: { content, corrections, suggestion, language }, messages }`

### GET /chat/sessions 🔒
List recent chat sessions.

**Response:** `200` — `{ sessions: [...] }`

---

## Progress

### GET /progress/dashboard 🔒
Get learning dashboard with stats.

**Response:** `200` — `{ stats: { xp, level, streak, completedLessons, quizAccuracy }, enrollments, recentProgress }`

### GET /progress/streak 🔒
Get current streak count.

**Response:** `200` — `{ streak }`

---

## Health

### GET /health
Health check endpoint.

**Response:** `200` — `{ status: "ok", timestamp }`

---

## Error Responses

All errors follow this format:
```json
{ "error": "Error message" }
```

| Status | Meaning |
|--------|---------|
| 400 | Validation error (check request body) |
| 401 | Not authenticated |
| 403 | Not authorized (admin only) |
| 404 | Resource not found |
| 429 | Rate limited (10 req/15min for auth, 100 req/15min general) |
| 500 | Server error |
