export const APP_NAME = 'LinguaFlow';
export const APP_DESCRIPTION = 'Nền tảng học ngôn ngữ cho người Việt';

export const LANGUAGES = [
  { code: 'en', name: 'English', nameVi: 'Tiếng Anh', flag: '🇬🇧' },
  { code: 'ja', name: 'Japanese', nameVi: 'Tiếng Nhật', flag: '🇯🇵' },
  { code: 'zh', name: 'Chinese', nameVi: 'Tiếng Trung', flag: '🇨🇳' },
  { code: 'ko', name: 'Korean', nameVi: 'Tiếng Hàn', flag: '🇰🇷' },
] as const;

export const LEVELS = [
  { slug: 'beginner', name: 'Beginner', nameVi: 'Sơ cấp', color: '#4CAF50' },
  { slug: 'elementary', name: 'Elementary', nameVi: 'Cơ bản', color: '#2196F3' },
  { slug: 'intermediate', name: 'Intermediate', nameVi: 'Trung cấp', color: '#FF9800' },
  { slug: 'advanced', name: 'Advanced', nameVi: 'Nâng cao', color: '#9C27B0' },
] as const;

export const XP_PER_LESSON = 25;
export const XP_PER_QUIZ_CORRECT = 10;
export const XP_PER_VOCAB_REVIEW = 5;
export const XP_PER_STREAK_DAY = 15;
export const XP_PER_LEVEL = 100;

export const STREAK_FREEZE_COST = 200;
export const MAX_HEARTS = 5;
export const HEART_REFILL_HOURS = 4;

export const DIFFICULTY_LABELS: Record<string, string> = {
  easy: 'Dễ',
  medium: 'Trung bình',
  hard: 'Khó',
};

export const QUIZ_TYPE_LABELS: Record<string, string> = {
  multiple_choice: 'Trắc nghiệm',
  fill_blank: 'Điền vào chỗ trống',
  matching: 'Nối từ',
  listening: 'Nghe',
  speaking: 'Nói',
};

export const ROUTES = {
  HOME: '/',
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  DASHBOARD: '/dashboard',
  LANGUAGES: '/languages',
  LESSONS: '/lessons',
  VOCABULARY: '/vocabulary',
  QUIZ: '/quiz',
  FLASHCARDS: '/flashcards',
  LEADERBOARD: '/leaderboard',
  ACHIEVEMENTS: '/achievements',
  PROFILE: '/profile',
  SETTINGS: '/settings',
  ADMIN: '/admin',
} as const;
