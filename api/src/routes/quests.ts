import { Router } from 'express';
import { prisma } from '../database/client';
import { authenticate } from '../middleware/auth';

const router = Router();

const QUEST_TEMPLATES = [
  { type: 'lessons', target: 1, title: 'Hoàn thành 1 bài học', titleEn: 'Complete 1 lesson', xpReward: 20, icon: '📖' },
  { type: 'lessons', target: 3, title: 'Hoàn thành 3 bài học', titleEn: 'Complete 3 lessons', xpReward: 50, icon: '📚' },
  { type: 'vocabulary', target: 10, title: 'Ôn 10 từ vựng', titleEn: 'Review 10 vocabulary words', xpReward: 15, icon: '📝' },
  { type: 'vocabulary', target: 20, title: 'Ôn 20 từ vựng', titleEn: 'Review 20 vocabulary words', xpReward: 30, icon: '🧠' },
  { type: 'quiz', target: 1, title: 'Hoàn thành 1 bài quiz', titleEn: 'Complete 1 quiz', xpReward: 20, icon: '❓' },
  { type: 'quiz', target: 3, title: 'Hoàn thành 3 bài quiz', titleEn: 'Complete 3 quizzes', xpReward: 50, icon: '✅' },
  { type: 'streak', target: 1, title: 'Duy trì streak hôm nay', titleEn: 'Maintain streak today', xpReward: 10, icon: '🔥' },
  { type: 'chat', target: 1, title: 'Chat với AI Tutor', titleEn: 'Chat with AI Tutor', xpReward: 25, icon: '🤖' },
  { type: 'perfect_quiz', target: 1, title: 'Đạt 100% trong quiz', titleEn: 'Get 100% on a quiz', xpReward: 40, icon: '💯' },
  { type: 'time', target: 15, title: 'Học 15 phút', titleEn: 'Study for 15 minutes', xpReward: 20, icon: '⏱️' },
];

function getDailyQuests(userId: string, date: Date): typeof QUEST_TEMPLATES {
  const seed = date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate();
  const hash = (seed * 31 + userId.charCodeAt(0)) % QUEST_TEMPLATES.length;

  const quests = [];
  const indices = new Set<number>();
  let idx = hash;
  while (quests.length < 3) {
    idx = (idx + 7) % QUEST_TEMPLATES.length;
    if (!indices.has(idx)) {
      indices.add(idx);
      quests.push(QUEST_TEMPLATES[idx]);
    }
  }
  return quests;
}

router.get('/today', authenticate, async (req, res) => {
  try {
    const userId = (req as any).userId;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const quests = getDailyQuests(userId, today);

    const todayStart = new Date(today);
    const todayEnd = new Date(today);
    todayEnd.setDate(todayEnd.getDate() + 1);

    const [lessonsCompleted, vocabReviewed, quizzesCompleted] = await Promise.all([
      prisma.lessonProgress.count({
        where: { userId, completed: true, updatedAt: { gte: todayStart, lt: todayEnd } },
      }),
      prisma.flashcardProgress.count({
        where: { userId, updatedAt: { gte: todayStart, lt: todayEnd } },
      }),
      prisma.quizAttempt.count({
        where: { userId, createdAt: { gte: todayStart, lt: todayEnd } },
      }),
    ]);

    const user = await prisma.user.findUnique({ where: { id: userId }, select: { streak: true } });

    const questsWithProgress = quests.map((quest) => {
      let current = 0;
      switch (quest.type) {
        case 'lessons': current = lessonsCompleted; break;
        case 'vocabulary': current = vocabReviewed; break;
        case 'quiz': case 'perfect_quiz': current = quizzesCompleted; break;
        case 'streak': current = (user?.streak || 0) > 0 ? 1 : 0; break;
      }

      return {
        ...quest,
        current: Math.min(current, quest.target),
        completed: current >= quest.target,
      };
    });

    const totalXp = questsWithProgress.filter(q => q.completed).reduce((sum, q) => sum + q.xpReward, 0);
    const allCompleted = questsWithProgress.every(q => q.completed);

    res.json({
      quests: questsWithProgress,
      totalXpEarned: totalXp,
      allCompleted,
      bonusXp: allCompleted ? 30 : 0,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get daily quests' });
  }
});

export default router;
