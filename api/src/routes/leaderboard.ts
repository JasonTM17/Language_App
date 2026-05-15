import { Router } from 'express';
import { prisma } from '../database/client';

const router = Router();

router.get('/', async (req: any, res) => {
  try {
    const { period = 'alltime', language } = req.query;

    let dateFilter: Date | undefined;
    if (period === 'weekly') {
      dateFilter = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    } else if (period === 'monthly') {
      dateFilter = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    }

    const users = await prisma.user.findMany({
      where: {
        role: 'user',
        ...(dateFilter ? { lastActiveAt: { gte: dateFilter } } : {}),
      },
      select: {
        id: true,
        name: true,
        avatar: true,
        xp: true,
        level: true,
        streak: true,
      },
      orderBy: { xp: 'desc' },
      take: 50,
    });

    const leaderboard = users.map((user, index) => ({
      rank: index + 1,
      ...user,
    }));

    const currentUserId = req.user?.id;
    let userRank = null;
    if (currentUserId) {
      const userIndex = leaderboard.findIndex((u) => u.id === currentUserId);
      if (userIndex >= 0) {
        userRank = leaderboard[userIndex];
      } else {
        const higherCount = await prisma.user.count({
          where: {
            role: 'user',
            xp: { gt: (await prisma.user.findUnique({ where: { id: currentUserId }, select: { xp: true } }))?.xp || 0 },
          },
        });
        const user = await prisma.user.findUnique({
          where: { id: currentUserId },
          select: { id: true, name: true, avatar: true, xp: true, level: true, streak: true },
        });
        if (user) {
          userRank = { rank: higherCount + 1, ...user };
        }
      }
    }

    res.json({ leaderboard, userRank, period });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
});

export default router;
