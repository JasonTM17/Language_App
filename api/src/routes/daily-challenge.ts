import { Router, Response } from 'express';
import prisma from '../database/client';
import { authenticate, AuthRequest } from '../middleware/auth';

const router = Router();

interface Challenge {
  id: string;
  type: 'speed_round' | 'perfect_lesson' | 'vocab_sprint' | 'listening_streak' | 'grammar_master';
  title: string;
  titleVi: string;
  description: string;
  descriptionVi: string;
  icon: string;
  target: number;
  xpReward: number;
  gemReward: number;
  timeLimit?: number;
  difficulty: 'easy' | 'medium' | 'hard';
}

const CHALLENGE_POOL: Challenge[] = [
  { id: 'speed-vocab-10', type: 'speed_round', title: 'Speed Vocab', titleVi: 'Từ vựng tốc độ', description: 'Review 10 words in under 2 minutes', descriptionVi: 'Ôn 10 từ trong vòng 2 phút', icon: '⚡', target: 10, xpReward: 30, gemReward: 5, timeLimit: 120, difficulty: 'easy' },
  { id: 'speed-vocab-20', type: 'speed_round', title: 'Vocab Blitz', titleVi: 'Từ vựng siêu tốc', description: 'Review 20 words in under 3 minutes', descriptionVi: 'Ôn 20 từ trong vòng 3 phút', icon: '🔥', target: 20, xpReward: 50, gemReward: 10, timeLimit: 180, difficulty: 'medium' },
  { id: 'perfect-quiz', type: 'perfect_lesson', title: 'Perfect Score', titleVi: 'Điểm tuyệt đối', description: 'Get 100% on any quiz', descriptionVi: 'Đạt 100% trong bất kỳ bài quiz nào', icon: '💯', target: 1, xpReward: 40, gemReward: 8, difficulty: 'medium' },
  { id: 'vocab-sprint-30', type: 'vocab_sprint', title: 'Vocab Marathon', titleVi: 'Marathon từ vựng', description: 'Learn or review 30 words today', descriptionVi: 'Học hoặc ôn 30 từ hôm nay', icon: '🏃', target: 30, xpReward: 60, gemReward: 12, difficulty: 'hard' },
  { id: 'grammar-3', type: 'grammar_master', title: 'Grammar Pro', titleVi: 'Bậc thầy ngữ pháp', description: 'Complete 3 grammar exercises', descriptionVi: 'Hoàn thành 3 bài ngữ pháp', icon: '📐', target: 3, xpReward: 35, gemReward: 7, difficulty: 'medium' },
  { id: 'listening-5', type: 'listening_streak', title: 'Listening Streak', titleVi: 'Chuỗi nghe', description: 'Complete 5 listening exercises', descriptionVi: 'Hoàn thành 5 bài nghe', icon: '👂', target: 5, xpReward: 45, gemReward: 9, difficulty: 'medium' },
  { id: 'speed-vocab-50', type: 'speed_round', title: 'Vocab Legend', titleVi: 'Huyền thoại từ vựng', description: 'Review 50 words in under 8 minutes', descriptionVi: 'Ôn 50 từ trong vòng 8 phút', icon: '🏆', target: 50, xpReward: 100, gemReward: 20, timeLimit: 480, difficulty: 'hard' },
];

function getDailyChallenge(date: Date): Challenge {
  const dayOfYear = Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000);
  const index = dayOfYear % CHALLENGE_POOL.length;
  return CHALLENGE_POOL[index];
}

function getWeeklyChallenge(date: Date): Challenge {
  const weekOfYear = Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / (7 * 86400000));
  const hardChallenges = CHALLENGE_POOL.filter(c => c.difficulty === 'hard');
  return hardChallenges[weekOfYear % hardChallenges.length];
}

router.get('/today', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const today = new Date();
    const daily = getDailyChallenge(today);
    const weekly = getWeeklyChallenge(today);

    const todayStart = new Date(today);
    todayStart.setHours(0, 0, 0, 0);
    const todayEnd = new Date(todayStart);
    todayEnd.setDate(todayEnd.getDate() + 1);

    const vocabReviewed = await prisma.flashcardProgress.count({
      where: { userId: req.userId!, updatedAt: { gte: todayStart, lt: todayEnd } },
    });

    const quizAttempts = await prisma.quizAttempt.findMany({
      where: { userId: req.userId!, createdAt: { gte: todayStart, lt: todayEnd } },
    });

    const perfectQuizzes = quizAttempts.filter((a: any) => a.correct === true).length;

    let dailyProgress = 0;
    switch (daily.type) {
      case 'speed_round':
      case 'vocab_sprint':
        dailyProgress = vocabReviewed;
        break;
      case 'perfect_lesson':
        dailyProgress = perfectQuizzes > 0 ? 1 : 0;
        break;
      case 'grammar_master':
        dailyProgress = quizAttempts.length;
        break;
      default:
        dailyProgress = 0;
    }

    const user = await prisma.user.findUnique({
      where: { id: req.userId! },
      select: { streak: true },
    });

    const streakMultiplier = Math.min(2, 1 + (user?.streak || 0) * 0.1);

    res.json({
      daily: {
        ...daily,
        progress: Math.min(dailyProgress, daily.target),
        completed: dailyProgress >= daily.target,
        adjustedXpReward: Math.round(daily.xpReward * streakMultiplier),
      },
      weekly: {
        ...weekly,
        progress: 0,
        completed: false,
        daysRemaining: 7 - today.getDay(),
      },
      streakMultiplier: Math.round(streakMultiplier * 100) / 100,
      streakBonus: `${Math.round((streakMultiplier - 1) * 100)}% XP thưởng từ chuỗi ${user?.streak || 0} ngày`,
    });
  } catch {
    res.status(500).json({ error: 'Lỗi khi tải thử thách hôm nay' });
  }
});

router.post('/claim', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const { challengeId } = req.body;
    const challenge = CHALLENGE_POOL.find(c => c.id === challengeId);
    if (!challenge) return res.status(404).json({ error: 'Thử thách không tồn tại' });

    const user = await prisma.user.findUnique({
      where: { id: req.userId! },
      select: { streak: true, xp: true, gems: true },
    });

    const streakMultiplier = Math.min(2, 1 + (user?.streak || 0) * 0.1);
    const xpEarned = Math.round(challenge.xpReward * streakMultiplier);

    await prisma.user.update({
      where: { id: req.userId! },
      data: {
        xp: { increment: xpEarned },
        gems: { increment: challenge.gemReward },
      },
    });

    res.json({
      claimed: true,
      xpEarned,
      gemsEarned: challenge.gemReward,
      message: `Tuyệt vời! Bạn nhận được ${xpEarned} XP và ${challenge.gemReward} kim cương!`,
    });
  } catch {
    res.status(500).json({ error: 'Lỗi khi nhận thưởng' });
  }
});

export default router;
