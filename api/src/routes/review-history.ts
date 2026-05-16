import { Router } from 'express';
import { authenticate } from '../middleware/auth';

const router = Router();

router.get('/', authenticate, async (req, res) => {
  const prisma = req.app.locals.prisma;
  const userId = (req as any).user.id;
  const { days = '30' } = req.query;

  const since = new Date();
  since.setDate(since.getDate() - parseInt(days as string, 10));

  const reviews = await prisma.flashcardProgress.findMany({
    where: {
      userId,
      updatedAt: { gte: since },
    },
    include: {
      vocabulary: {
        select: { word: true, meaning: true },
      },
    },
    orderBy: { updatedAt: 'desc' },
    take: 100,
  });

  const history = reviews.map((r: any) => ({
    id: r.id,
    word: r.vocabulary?.word || '',
    meaning: r.vocabulary?.meaning || '',
    known: r.known,
    reviewCount: r.reviewCount,
    easeFactor: r.easeFactor,
    interval: r.interval,
    nextReview: r.nextReview,
    lastReviewed: r.updatedAt,
  }));

  const totalReviews = reviews.length;
  const knownCount = reviews.filter((r: any) => r.known).length;
  const accuracy = totalReviews > 0 ? Math.round((knownCount / totalReviews) * 100) : 0;

  res.json({
    history,
    summary: {
      totalReviews,
      knownCount,
      unknownCount: totalReviews - knownCount,
      accuracy,
      period: `${days} days`,
    },
  });
});

router.get('/calendar', authenticate, async (req, res) => {
  const prisma = req.app.locals.prisma;
  const userId = (req as any).user.id;

  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const progress = await prisma.flashcardProgress.findMany({
    where: {
      userId,
      updatedAt: { gte: thirtyDaysAgo },
    },
    select: { updatedAt: true, known: true },
  });

  const calendar: Record<string, { reviews: number; correct: number }> = {};

  progress.forEach((p: any) => {
    const date = p.updatedAt.toISOString().split('T')[0];
    if (!calendar[date]) {
      calendar[date] = { reviews: 0, correct: 0 };
    }
    calendar[date].reviews++;
    if (p.known) calendar[date].correct++;
  });

  res.json({ calendar });
});

export default router;
