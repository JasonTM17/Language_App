export type LanguageCode = 'en' | 'ja' | 'zh' | 'ko';
export type DifficultyLevel = 'easy' | 'medium' | 'hard';
export type LevelSlug = 'beginner' | 'elementary' | 'intermediate' | 'advanced';

export interface VocabularyItem {
  id: string;
  word: string;
  meaning: string;
  example: string;
  exampleMeaning: string;
  difficulty: DifficultyLevel;
  bookmarked?: boolean;
  known?: boolean;
}

export interface QuizQuestion {
  id: string;
  question: string;
  type: 'multiple_choice' | 'fill_blank' | 'matching';
  options: string[];
  answer: string;
  explanation?: string;
  difficulty: DifficultyLevel;
}

export interface LessonSummary {
  id: string;
  title: string;
  description: string;
  topic: string;
  order: number;
  vocabularyCount: number;
  quizCount: number;
  completed: boolean;
  score?: number;
}

export interface UserProgress {
  xp: number;
  level: number;
  streak: number;
  lessonsCompleted: number;
  vocabLearned: number;
  quizAccuracy: number;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  unlockedAt?: string;
}

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  name: string;
  avatar?: string;
  xp: number;
  level: number;
  streak: number;
}

export interface StudySession {
  startTime: Date;
  endTime?: Date;
  lessonsCompleted: number;
  vocabReviewed: number;
  quizzesTaken: number;
  xpEarned: number;
}

export interface Notification {
  id: string;
  type: 'achievement' | 'streak' | 'reminder' | 'level_up' | 'new_content';
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
}
