import { Router } from 'express';
import { prisma } from '../database/client';
import { checkAndAwardAchievements, getUserAchievements } from '../services/achievements';
import { paginate, paginateQuery, errorResponse } from '../types/responses';

const router = Router();

// Get all achievements with user's unlock status
router.get('/', async (req: any, res) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const userId = req.user?.id;

    if (!userId) {
      const all = await prisma.achievement.findMany({ orderBy: { category: 'asc' } });
      const items = all.map((a) => ({ ...a, unlocked: false, unlockedAt: null }));
      return res.json(paginate(items, page, limit));
    }

    const achievements = await getUserAchievements(userId);
    res.json(paginate(achievements, page, limit));
  } catch (error) {
    res.status(500).json(errorResponse('Không thể tải danh sách thành tựu', 'INTERNAL_ERROR'));
  }
});

// Get user's unlocked achievements
router.get('/me', async (req: any, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json(errorResponse('Chưa xác thực', 'UNAUTHORIZED'));

    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const { skip, take } = paginateQuery(page, limit);

    const [userAchievements, total] = await Promise.all([
      prisma.userAchievement.findMany({
        where: { userId },
        include: { achievement: true },
        orderBy: { unlockedAt: 'desc' },
        skip,
        take,
      }),
      prisma.userAchievement.count({ where: { userId } }),
    ]);

    const totalPages = Math.ceil(total / limit);
    res.json({
      data: userAchievements.map((ua) => ({
        ...ua.achievement,
        unlockedAt: ua.unlockedAt,
      })),
      pagination: { page, limit, total, totalPages },
    });
  } catch (error) {
    res.status(500).json(errorResponse('Không thể tải thành tựu của bạn', 'INTERNAL_ERROR'));
  }
});

// Check and award new achievements
router.post('/check', async (req: any, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json(errorResponse('Chưa xác thực', 'UNAUTHORIZED'));

    const newlyUnlocked = await checkAndAwardAchievements(userId);
    res.json({ newlyUnlocked, count: newlyUnlocked.length });
  } catch (error) {
    res.status(500).json(errorResponse('Không thể kiểm tra thành tựu', 'INTERNAL_ERROR'));
  }
});

export default router;
