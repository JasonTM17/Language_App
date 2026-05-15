export const TOPICS = {
  GREETINGS: 'greetings',
  SELF_INTRO: 'self_introduction',
  NUMBERS: 'numbers',
  FOOD: 'food',
  SHOPPING: 'shopping',
  TRAVEL: 'travel',
  FAMILY: 'family',
  SCHOOL: 'school',
  WORK: 'work',
  HEALTH: 'health',
  WEATHER: 'weather',
  HOBBIES: 'hobbies',
  TECHNOLOGY: 'technology',
  CULTURE: 'culture',
  DAILY_LIFE: 'daily_life',
  TRANSPORT: 'transport',
  EMOTIONS: 'emotions',
  TIME: 'time',
  COLORS: 'colors',
  ANIMALS: 'animals',
} as const;

export const DIFFICULTY = {
  VERY_EASY: 1,
  EASY: 2,
  MEDIUM: 3,
  HARD: 4,
  VERY_HARD: 5,
} as const;

export const QUIZ_TYPES = {
  MULTIPLE_CHOICE: 'multiple_choice',
  FILL_BLANK: 'fill_blank',
  MATCHING: 'matching',
  ARRANGE: 'arrange',
  LISTENING: 'listening',
} as const;

export const LEVELS = ['beginner', 'elementary', 'intermediate', 'advanced'] as const;

export const LANGUAGES = {
  EN: { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧', description: 'Học tiếng Anh cho giao tiếp, TOEIC, IELTS và phát triển sự nghiệp' },
  JA: { code: 'ja', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵', description: 'Học tiếng Nhật cho JLPT, anime, manga và làm việc tại Nhật' },
  ZH: { code: 'zh', name: 'Chinese', nativeName: '中文', flag: '🇨🇳', description: 'Học tiếng Trung cho HSK, kinh doanh và du lịch' },
  KO: { code: 'ko', name: 'Korean', nativeName: '한국어', flag: '🇰🇷', description: 'Học tiếng Hàn cho TOPIK, K-pop, K-drama và du học' },
} as const;
