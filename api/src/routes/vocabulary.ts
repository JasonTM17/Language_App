import { Router, Request, Response } from 'express';
import { z } from 'zod';
import prisma from '../database/client';
import { authenticate, AuthRequest } from '../middleware/auth';

const router = Router();

const reviewSchema = z.object({
  known: z.boolean(),
});

router.get('/', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const { lessonId, due } = req.query;
    const where: any = {};
    if (lessonId) where.lessonId = lessonId;

    const vocabulary = await prisma.vocabulary.findMany({
      where,
      include: {
        flashcardProgress: { where: { userId: req.userId! } },
      },
    });

    if (due === 'true') {
      const now = new Date();
      const dueCards = vocabulary.filter((v: any) => {
        const progress = v.flashcardProgress[0];
        if (!progress) return true;
        return new Date(progress.nextReview) <= now;
      });
      return res.json({ vocabulary: dueCards, total: vocabulary.length, due: dueCards.length });
    }

    res.json({ vocabulary });
  } catch {
    res.status(500).json({ error: 'Failed to fetch vocabulary' });
  }
});

router.post('/:id/review', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const { known } = reviewSchema.parse(req.body);
    const vocab = await prisma.vocabulary.findUnique({ where: { id: req.params.id } });
    if (!vocab) return res.status(404).json({ error: 'Vocabulary not found' });

    const existing = await prisma.flashcardProgress.findUnique({
      where: { userId_vocabularyId: { userId: req.userId!, vocabularyId: vocab.id } },
    });

    let easeFactor = existing?.easeFactor || 2.5;
    let interval = existing?.interval || 1;

    if (known) {
      easeFactor = Math.max(1.3, easeFactor + 0.1);
      interval = Math.round(interval * easeFactor);
    } else {
      easeFactor = Math.max(1.3, easeFactor - 0.2);
      interval = 1;
    }

    const nextReview = new Date();
    nextReview.setDate(nextReview.getDate() + interval);

    const progress = await prisma.flashcardProgress.upsert({
      where: { userId_vocabularyId: { userId: req.userId!, vocabularyId: vocab.id } },
      update: { known, reviewCount: { increment: 1 }, nextReview, easeFactor, interval },
      create: { userId: req.userId!, vocabularyId: vocab.id, known, nextReview, easeFactor, interval },
    });

    res.json({ progress });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    res.status(500).json({ error: 'Failed to update review' });
  }
});

export default router;
