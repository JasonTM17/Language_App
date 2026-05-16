import { Router } from 'express';
import { authenticate } from '../middleware/auth';

const router = Router();

router.get('/', authenticate, async (req, res) => {
  const prisma = req.app.locals.prisma;
  const userId = (req as any).user.id;

  const enrollments = await prisma.enrollment.findMany({
    where: { userId },
    include: {
      language: true,
      level: true,
    },
  });

  const progressData = await Promise.all(
    enrollments.map(async (enrollment: any) => {
      const totalLessons = await prisma.lesson.count({
        where: { levelId: enrollment.levelId },
      });

      const completedLessons = await prisma.lessonProgress.count({
        where: {
          userId,
          completed: true,
          lesson: { levelId: enrollment.levelId },
        },
      });

      const totalVocab = await prisma.vocabulary.count({
        where: { lesson: { levelId: enrollment.levelId } },
      });

      const learnedVocab = await prisma.flashcardProgress.count({
        where: {
          userId,
          known: true,
          vocabulary: { lesson: { levelId: enrollment.levelId } },
        },
      });

      return {
        language: enrollment.language.name,
        languageCode: enrollment.language.code,
        level: enrollment.level?.name || 'Beginner',
        goal: enrollment.goal,
        totalLessons,
        completedLessons,
        lessonProgress: totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0,
        totalVocab,
        learnedVocab,
        vocabProgress: totalVocab > 0 ? Math.round((learnedVocab / totalVocab) * 100) : 0,
        enrolledAt: enrollment.createdAt,
      };
    })
  );

  res.json({ progress: progressData });
});

router.get('/milestones', authenticate, async (req, res) => {
  const prisma = req.app.locals.prisma;
  const userId = (req as any).user.id;

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { xp: true, level: true, streak: true },
  });

  const lessonsCompleted = await prisma.lessonProgress.count({
    where: { userId, completed: true },
  });

  const vocabLearned = await prisma.flashcardProgress.count({
    where: { userId, known: true },
  });

  const milestones = [
    { id: 'first_lesson', title: 'Bài học đầu tiên', description: 'Hoàn thành bài học đầu tiên', target: 1, current: lessonsCompleted, completed: lessonsCompleted >= 1 },
    { id: 'ten_lessons', title: '10 bài học', description: 'Hoàn thành 10 bài học', target: 10, current: lessonsCompleted, completed: lessonsCompleted >= 10 },
    { id: 'fifty_lessons', title: '50 bài học', description: 'Hoàn thành 50 bài học', target: 50, current: lessonsCompleted, completed: lessonsCompleted >= 50 },
    { id: 'first_vocab', title: 'Từ vựng đầu tiên', description: 'Học thuộc từ vựng đầu tiên', target: 1, current: vocabLearned, completed: vocabLearned >= 1 },
    { id: 'hundred_vocab', title: '100 từ vựng', description: 'Học thuộc 100 từ vựng', target: 100, current: vocabLearned, completed: vocabLearned >= 100 },
    { id: 'week_streak', title: 'Chuỗi 7 ngày', description: 'Duy trì chuỗi 7 ngày liên tiếp', target: 7, current: user?.streak || 0, completed: (user?.streak || 0) >= 7 },
    { id: 'month_streak', title: 'Chuỗi 30 ngày', description: 'Duy trì chuỗi 30 ngày liên tiếp', target: 30, current: user?.streak || 0, completed: (user?.streak || 0) >= 30 },
    { id: 'level_5', title: 'Cấp độ 5', description: 'Đạt cấp độ 5', target: 5, current: user?.level || 0, completed: (user?.level || 0) >= 5 },
    { id: 'level_10', title: 'Cấp độ 10', description: 'Đạt cấp độ 10', target: 10, current: user?.level || 0, completed: (user?.level || 0) >= 10 },
  ];

  res.json({ milestones, completedCount: milestones.filter(m => m.completed).length });
});

export default router;
