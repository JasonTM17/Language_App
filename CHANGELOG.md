# Changelog

All notable changes to LinguaFlow are documented here.

## [1.0.0] - 2024-12-20

### Core Platform
- 4-language support: English, Japanese, Chinese, Korean
- User authentication with JWT (register, login, profile)
- Admin dashboard with user and content management
- Responsive UI with dark mode support
- Vietnamese-first interface with full i18n

### Learning Features
- Structured lesson system with progressive curriculum
- SM-2 spaced repetition flashcards (quality 0-5 scale)
- Interactive quizzes (multiple choice, fill-blank, matching, translation)
- Grammar tips with contextual explanations per language
- Sentence builder with drag-and-drop construction
- Word of the Day with cultural fun facts for all 4 languages

### Speaking & Listening
- Speaking exercises: repeat, respond, describe, read aloud, role play
- Listening exercises: dictation, comprehension, fill-audio, word recognition
- Pronunciation practice with phoneme-level analysis
- Vietnamese-specific error pattern detection per target language

### Reading & Writing
- Interactive stories with inline comprehension questions
- Reading passages with multi-question assessments
- Typing practice with real-time character highlighting and WPM tracking
- Dictation exercises with audio playback

### AI Tutor
- Multi-role conversation: teacher, friend, interviewer, doctor, travel guide
- n8n workflow integration for AI orchestration
- OpenAI-compatible API support
- Built-in mock fallback (no configuration needed)
- Vocabulary highlights and grammar corrections in responses

### Gamification
- XP and level progression system
- Daily/weekly/challenge quests with gem rewards
- Daily challenge: timed competitive quiz with combo scoring
- Streak system with calendar tracking
- Hearts system with limited attempts
- Shop with power-ups, cosmetics, and streak items
- Achievement badges and milestone tracking
- Leaderboard with weekly/monthly/all-time rankings
- Skill tree with visual progression and unlock dependencies

### Social
- Friend system: add, accept, reject, unfriend
- Friend activity feed and status indicators
- Suggested friends based on mutual connections
- User search functionality

### Personalization
- Onboarding flow with placement tests
- Study plan generation based on goals
- Learning analytics with detailed statistics
- Notification system (streak, achievements, friends, reminders)
- Settings: theme, language, notification preferences

### Technical
- Express.js API with 38+ route modules
- Prisma ORM with SQLite database
- Zod request validation on all endpoints
- Rate limiting (general + auth-specific)
- Comprehensive test suite (Vitest + Supertest)
- TypeScript strict mode across entire codebase
- Next.js 14 with App Router (50+ pages)
- Zustand state management
- Typed API client with error handling
