import { Router, Request, Response } from 'express';
import prisma from '../database/client';
import { authenticate, AuthRequest } from '../middleware/auth';

const router = Router();

router.get('/', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const { lessonId } = req.query;
    const where: any = {};
    if (lessonId) where.lessonId = lessonId;

    const vocabulary = await prisma.vocabulary.findMany({
      where,
      include: {
        flashcardProgress: { where: { userId: req.userId! } },
      },
    });
    res.json({ vocabulary });
  } catch {
    res.status(500).json({ error: 'Failed to fetch vocabulary' });
  }
});

router.post('/:id/review', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const { known } = req.body;
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
  } catch {
    res.status(500).json({ error: 'Failed to update review' });
  }
});

export default router;
