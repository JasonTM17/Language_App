# LinguaFlow API Documentation

## Overview

RESTful API for the LinguaFlow language learning platform.

- **Base URL:** `http://localhost:3001/api`
- **Authentication:** Bearer JWT token
- **Content-Type:** `application/json`
- **Rate Limit:** 100 requests/15 minutes per IP

## Authentication

All protected endpoints require the `Authorization` header:

```
Authorization: Bearer <jwt_token>
```

### POST /auth/register

Create a new user account.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123",
  "name": "Nguyễn Văn A",
  "nativeLanguage": "vi",
  "targetLanguage": "en"
}
```

**Response:** `201 Created`
```json
{
  "success": true,
  "data": {
    "user": { "id": "...", "email": "...", "name": "..." },
    "token": "eyJ..."
  }
}
```

### POST /auth/login

Authenticate and receive JWT token.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "user": { "id": "...", "email": "...", "name": "..." },
    "token": "eyJ...",
    "refreshToken": "..."
  }
}
```

---

## Vocabulary

### GET /vocabulary

Get user's vocabulary list with pagination.

**Query Parameters:**
| Param | Type | Default | Description |
|-------|------|---------|-------------|
| page | number | 1 | Page number |
| limit | number | 20 | Items per page |
| language | string | - | Filter by language (en/ja/zh/ko) |
| level | string | - | Filter by CEFR level |

**Response:** `200 OK`
```json
{
  "success": true,
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "totalPages": 8
  }
}
```

### POST /vocabulary

Add a new vocabulary word.

**Request Body:**
```json
{
  "word": "hello",
  "translation": "xin chào",
  "language": "en",
  "example": "Hello, how are you?",
  "level": "A1"
}
```

### GET /vocabulary/review

Get words due for spaced repetition review.

### POST /vocabulary/:id/review

Submit review result for SRS algorithm.

**Request Body:**
```json
{
  "quality": 4
}
```
Quality scale: 0 (forgot) to 5 (perfect recall)

---

## Progress

### GET /progress

Get user's overall learning progress.

### GET /progress/streak

Get current streak information.

**Response:**
```json
{
  "success": true,
  "data": {
    "currentStreak": 7,
    "longestStreak": 14,
    "todayCompleted": true
  }
}
```

### GET /leaderboard

Get weekly leaderboard rankings.

### GET /achievements

Get user's unlocked achievements.

---

## Quiz

### GET /quiz/:language

Get quiz questions for a specific language.

**Query Parameters:**
| Param | Type | Description |
|-------|------|-------------|
| type | string | Quiz type (multiple-choice, fill-blank, listening) |
| level | string | Difficulty level |
| count | number | Number of questions (default: 10) |

### POST /quiz/submit

Submit quiz answers.

**Request Body:**
```json
{
  "quizId": "...",
  "answers": [
    { "questionId": "q1", "answer": "B" },
    { "questionId": "q2", "answer": "A" }
  ]
}
```

---

## Exercises

### GET /exercises/:type

Get exercises by type.

**Types:** `listening`, `speaking`, `reading`, `writing`, `typing`, `sentence-ordering`, `grammar-correction`, `fill-blank`

---

## Error Responses

All errors follow this format:

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input",
    "details": [...]
  }
}
```

### HTTP Status Codes

| Code | Description |
|------|-------------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 429 | Too Many Requests |
| 500 | Internal Server Error |
