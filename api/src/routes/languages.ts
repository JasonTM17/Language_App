import { Router, Request, Response } from 'express';
import prisma from '../database/client';
import { authenticate, AuthRequest } from '../middleware/auth';

const router = Router();

router.get('/', async (_req: Request, res: Response) => {
  try {
    const languages = await prisma.language.findMany({
      include: { levels: { orderBy: { order: 'asc' } } },
    });
    res.json({ languages });
  } catch {
    res.status(500).json({ error: 'Failed to fetch languages' });
  }
});

router.get('/:code', async (req: Request, res: Response) => {
  try {
    const language = await prisma.language.findUnique({
      where: { code: req.params.code },
      include: {
        levels: {
          orderBy: { order: 'asc' },
          include: { lessons: { orderBy: { order: 'asc' } } },
        },
      },
    });
    if (!language) return res.status(404).json({ error: 'Language not found' });
    res.json({ language });
  } catch {
    res.status(500).json({ error: 'Failed to fetch language' });
  }
});

router.post('/:code/enroll', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const language = await prisma.language.findUnique({
      where: { code: req.params.code },
      include: { levels: { orderBy: { order: 'asc' }, take: 1 } },
    });
    if (!language) return res.status(404).json({ error: 'Language not found' });

    const enrollment = await prisma.enrollment.upsert({
      where: { userId_languageId: { userId: req.userId!, languageId: language.id } },
      update: { isActive: true, goal: req.body.goal },
      create: {
        userId: req.userId!,
        languageId: language.id,
        levelId: req.body.levelId || language.levels[0]?.id,
        goal: req.body.goal,
      },
    });
    res.json({ enrollment });
  } catch {
    res.status(500).json({ error: 'Failed to enroll' });
  }
});

export default router;
