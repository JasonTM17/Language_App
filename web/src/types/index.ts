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

export interface ShopItem {
  id: string;
  name: string;
  nameVi: string;
  description: string;
  descriptionVi: string;
  price: number;
  category: 'powerup' | 'cosmetic' | 'boost';
  icon: string;
  affordable: boolean;
}

export interface Friend {
  id: string;
  name: string;
  avatar?: string;
  xp: number;
  level: number;
  streak: number;
  since: string;
}

export interface FriendRequest {
  id: string;
  name: string;
  avatar?: string;
  xp: number;
  level: number;
  sentAt: string;
}

export interface SkillNode {
  id: string;
  name: string;
  nameVi: string;
  icon: string;
  level: number;
  maxLevel: number;
  xpRequired: number;
  position: { row: number; col: number };
  dependencies: string[];
  status: 'locked' | 'available' | 'in_progress' | 'completed' | 'mastered';
  decayLevel?: number;
}

export interface Story {
  id: string;
  title: string;
  titleVi: string;
  description: string;
  language: LanguageCode;
  level: LevelSlug;
  category: string;
  xpReward: number;
  estimatedMinutes: number;
  segmentCount: number;
  questionCount: number;
}

export interface StorySegment {
  type: 'narration' | 'dialogue' | 'question';
  speaker?: string;
  text: string;
  translation: string;
  question?: {
    prompt: string;
    options: string[];
    correct: number;
    explanation: string;
  };
}

export interface HeartsStatus {
  hearts: number;
  maxHearts: number;
  gems: number;
  nextRefillInMinutes: number | null;
}

export interface DailyQuest {
  type: string;
  target: number;
  title: string;
  titleEn: string;
  xpReward: number;
  icon: string;
  current: number;
  completed: boolean;
}

export type ChatRole = 'teacher' | 'friend' | 'interviewer' | 'restaurant' | 'customer' | 'doctor' | 'travel';
