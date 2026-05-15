import { Router } from 'express';
import { prisma } from '../database/client';
import { checkAndAwardAchievements, getUserAchievements } from '../services/achievements';

const router = Router();

// Get all achievements with user's unlock status
router.get('/', async (req: any, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      const all = await prisma.achievement.findMany({ orderBy: { category: 'asc' } });
      return res.json({ achievements: all.map((a) => ({ ...a, unlocked: false, unlockedAt: null })) });
    }

    const achievements = await getUserAchievements(userId);
    res.json({ achievements });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch achievements' });
  }
});

// Get user's unlocked achievements
router.get('/me', async (req: any, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });

    const userAchievements = await prisma.userAchievement.findMany({
      where: { userId },
      include: { achievement: true },
      orderBy: { unlockedAt: 'desc' },
    });

    res.json({
      achievements: userAchievements.map((ua) => ({
        ...ua.achievement,
        unlockedAt: ua.unlockedAt,
      })),
      total: userAchievements.length,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user achievements' });
  }
});

// Check and award new achievements
router.post('/check', async (req: any, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });

    const newlyUnlocked = await checkAndAwardAchievements(userId);
    res.json({ newlyUnlocked, count: newlyUnlocked.length });
  } catch (error) {
    res.status(500).json({ error: 'Failed to check achievements' });
  }
});

export default router;
