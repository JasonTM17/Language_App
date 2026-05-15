import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export { prisma };

export interface VocabItem {
  word: string;
  reading?: string;
  meaning: string;
  example?: string;
  exampleMeaning?: string;
  difficulty?: number;
}

export interface QuizItem {
  question: string;
  type: string;
  options: string[];
  answer: string;
  explanation?: string;
  explanationVi?: string;
  difficulty?: number;
}

export interface LessonData {
  title: string;
  titleVi?: string;
  description: string;
  descriptionVi?: string;
  topic: string;
  type?: string;
  xpReward?: number;
  duration?: number;
  vocabulary: VocabItem[];
  quizzes: QuizItem[];
}

export async function createLessonWithContent(
  levelId: string,
  order: number,
  data: LessonData
) {
  const lesson = await prisma.lesson.create({
    data: {
      title: data.title,
      titleVi: data.titleVi,
      description: data.description,
      descriptionVi: data.descriptionVi,
      topic: data.topic,
      order,
      levelId,
      type: data.type || 'vocabulary',
      content: '{}',
      xpReward: data.xpReward || 15,
      duration: data.duration || 10,
    },
  });

  if (data.vocabulary.length > 0) {
    await prisma.vocabulary.createMany({
      data: data.vocabulary.map((v) => ({
        word: v.word,
        reading: v.reading,
        meaning: v.meaning,
        example: v.example,
        exampleMeaning: v.exampleMeaning,
        difficulty: v.difficulty || 1,
        lessonId: lesson.id,
      })),
    });
  }

  if (data.quizzes.length > 0) {
    await prisma.quiz.createMany({
      data: data.quizzes.map((q) => ({
        question: q.question,
        type: q.type,
        options: JSON.stringify(q.options),
        answer: q.answer,
        explanation: q.explanation,
        explanationVi: q.explanationVi,
        difficulty: q.difficulty || 1,
        lessonId: lesson.id,
      })),
    });
  }

  return lesson;
}

export async function seedAchievements() {
  const achievements = [
    { code: 'first_lesson', name: 'First Steps', nameVi: 'Bước đầu tiên', description: 'Complete your first lesson', descriptionVi: 'Hoàn thành bài học đầu tiên', icon: '🎯', category: 'learning', condition: 'lessons_completed >= 1', xpReward: 50 },
    { code: 'lessons_5', name: 'Getting Started', nameVi: 'Khởi đầu tốt', description: 'Complete 5 lessons', descriptionVi: 'Hoàn thành 5 bài học', icon: '📚', category: 'learning', condition: 'lessons_completed >= 5', xpReward: 100 },
    { code: 'lessons_10', name: 'Dedicated Learner', nameVi: 'Học viên chăm chỉ', description: 'Complete 10 lessons', descriptionVi: 'Hoàn thành 10 bài học', icon: '🏅', category: 'learning', condition: 'lessons_completed >= 10', xpReward: 200 },
    { code: 'lessons_25', name: 'Knowledge Seeker', nameVi: 'Người tìm kiến thức', description: 'Complete 25 lessons', descriptionVi: 'Hoàn thành 25 bài học', icon: '🎓', category: 'learning', condition: 'lessons_completed >= 25', xpReward: 500 },
    { code: 'lessons_50', name: 'Scholar', nameVi: 'Học giả', description: 'Complete 50 lessons', descriptionVi: 'Hoàn thành 50 bài học', icon: '👨‍🎓', category: 'learning', condition: 'lessons_completed >= 50', xpReward: 1000 },
    { code: 'streak_3', name: 'On Fire', nameVi: 'Đang cháy', description: 'Maintain a 3-day streak', descriptionVi: 'Duy trì chuỗi 3 ngày', icon: '🔥', category: 'streak', condition: 'streak >= 3', xpReward: 50 },
    { code: 'streak_7', name: 'Week Warrior', nameVi: 'Chiến binh tuần', description: 'Maintain a 7-day streak', descriptionVi: 'Duy trì chuỗi 7 ngày', icon: '⚡', category: 'streak', condition: 'streak >= 7', xpReward: 150 },
    { code: 'streak_14', name: 'Unstoppable', nameVi: 'Không thể ngăn cản', description: 'Maintain a 14-day streak', descriptionVi: 'Duy trì chuỗi 14 ngày', icon: '💪', category: 'streak', condition: 'streak >= 14', xpReward: 300 },
    { code: 'streak_30', name: 'Monthly Master', nameVi: 'Bậc thầy tháng', description: 'Maintain a 30-day streak', descriptionVi: 'Duy trì chuỗi 30 ngày', icon: '🏆', category: 'streak', condition: 'streak >= 30', xpReward: 500 },
    { code: 'streak_100', name: 'Legendary', nameVi: 'Huyền thoại', description: 'Maintain a 100-day streak', descriptionVi: 'Duy trì chuỗi 100 ngày', icon: '👑', category: 'streak', condition: 'streak >= 100', xpReward: 2000 },
    { code: 'vocab_50', name: 'Word Collector', nameVi: 'Người sưu tầm từ', description: 'Learn 50 vocabulary words', descriptionVi: 'Học 50 từ vựng', icon: '📝', category: 'vocabulary', condition: 'vocab_learned >= 50', xpReward: 100 },
    { code: 'vocab_100', name: 'Vocabulary Builder', nameVi: 'Xây dựng từ vựng', description: 'Learn 100 vocabulary words', descriptionVi: 'Học 100 từ vựng', icon: '📖', category: 'vocabulary', condition: 'vocab_learned >= 100', xpReward: 250 },
    { code: 'vocab_500', name: 'Word Master', nameVi: 'Bậc thầy từ vựng', description: 'Learn 500 vocabulary words', descriptionVi: 'Học 500 từ vựng', icon: '🧠', category: 'vocabulary', condition: 'vocab_learned >= 500', xpReward: 1000 },
    { code: 'quiz_perfect', name: 'Perfect Score', nameVi: 'Điểm tuyệt đối', description: 'Get 100% on a quiz', descriptionVi: 'Đạt 100% trong bài kiểm tra', icon: '💯', category: 'quiz', condition: 'quiz_perfect >= 1', xpReward: 100 },
    { code: 'quiz_10', name: 'Quiz Enthusiast', nameVi: 'Người yêu quiz', description: 'Complete 10 quizzes', descriptionVi: 'Hoàn thành 10 bài kiểm tra', icon: '✅', category: 'quiz', condition: 'quizzes_completed >= 10', xpReward: 150 },
    { code: 'quiz_50', name: 'Quiz Champion', nameVi: 'Nhà vô địch quiz', description: 'Complete 50 quizzes', descriptionVi: 'Hoàn thành 50 bài kiểm tra', icon: '🥇', category: 'quiz', condition: 'quizzes_completed >= 50', xpReward: 500 },
    { code: 'xp_100', name: 'Rising Star', nameVi: 'Ngôi sao đang lên', description: 'Earn 100 XP', descriptionVi: 'Đạt 100 XP', icon: '⭐', category: 'xp', condition: 'xp >= 100', xpReward: 50 },
    { code: 'xp_500', name: 'Shining Bright', nameVi: 'Tỏa sáng', description: 'Earn 500 XP', descriptionVi: 'Đạt 500 XP', icon: '🌟', category: 'xp', condition: 'xp >= 500', xpReward: 100 },
    { code: 'xp_1000', name: 'XP Master', nameVi: 'Bậc thầy XP', description: 'Earn 1000 XP', descriptionVi: 'Đạt 1000 XP', icon: '💫', category: 'xp', condition: 'xp >= 1000', xpReward: 200 },
    { code: 'xp_5000', name: 'XP Legend', nameVi: 'Huyền thoại XP', description: 'Earn 5000 XP', descriptionVi: 'Đạt 5000 XP', icon: '🌠', category: 'xp', condition: 'xp >= 5000', xpReward: 500 },
    { code: 'polyglot_2', name: 'Bilingual', nameVi: 'Song ngữ', description: 'Study 2 languages', descriptionVi: 'Học 2 ngôn ngữ', icon: '🌍', category: 'languages', condition: 'languages_enrolled >= 2', xpReward: 200 },
    { code: 'polyglot_3', name: 'Trilingual', nameVi: 'Tam ngữ', description: 'Study 3 languages', descriptionVi: 'Học 3 ngôn ngữ', icon: '🌎', category: 'languages', condition: 'languages_enrolled >= 3', xpReward: 500 },
    { code: 'polyglot_4', name: 'Polyglot', nameVi: 'Đa ngữ', description: 'Study all 4 languages', descriptionVi: 'Học cả 4 ngôn ngữ', icon: '🌏', category: 'languages', condition: 'languages_enrolled >= 4', xpReward: 1000 },
    { code: 'chat_first', name: 'Conversation Starter', nameVi: 'Người bắt đầu hội thoại', description: 'Start your first AI chat', descriptionVi: 'Bắt đầu cuộc trò chuyện AI đầu tiên', icon: '💬', category: 'chat', condition: 'chat_sessions >= 1', xpReward: 50 },
    { code: 'chat_10', name: 'Chatty', nameVi: 'Hay nói', description: 'Complete 10 AI chat sessions', descriptionVi: 'Hoàn thành 10 phiên trò chuyện AI', icon: '🗣️', category: 'chat', condition: 'chat_sessions >= 10', xpReward: 200 },
    { code: 'level_5', name: 'Level 5', nameVi: 'Cấp 5', description: 'Reach level 5', descriptionVi: 'Đạt cấp 5', icon: '5️⃣', category: 'level', condition: 'level >= 5', xpReward: 200 },
    { code: 'level_10', name: 'Level 10', nameVi: 'Cấp 10', description: 'Reach level 10', descriptionVi: 'Đạt cấp 10', icon: '🔟', category: 'level', condition: 'level >= 10', xpReward: 500 },
    { code: 'level_25', name: 'Level 25', nameVi: 'Cấp 25', description: 'Reach level 25', descriptionVi: 'Đạt cấp 25', icon: '🎖️', category: 'level', condition: 'level >= 25', xpReward: 1000 },
    { code: 'early_bird', name: 'Early Bird', nameVi: 'Chim sớm', description: 'Study before 7 AM', descriptionVi: 'Học trước 7 giờ sáng', icon: '🐦', category: 'special', condition: 'study_before_7am >= 1', xpReward: 100 },
    { code: 'night_owl', name: 'Night Owl', nameVi: 'Cú đêm', description: 'Study after 11 PM', descriptionVi: 'Học sau 11 giờ đêm', icon: '🦉', category: 'special', condition: 'study_after_11pm >= 1', xpReward: 100 },
  ];

  await prisma.achievement.createMany({ data: achievements });
  return achievements.length;
}
