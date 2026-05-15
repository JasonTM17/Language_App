import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../database/client';
import { authenticate, AuthRequest } from '../middleware/auth';

const router = Router();

const onboardingSchema = z.object({
  languages: z.array(z.string()).min(1),
  dailyGoal: z.number().int().min(5).max(60),
  level: z.enum(['beginner', 'elementary', 'intermediate', 'advanced']),
});

router.post('/complete', authenticate, async (req: AuthRequest, res) => {
  try {
    const { languages, dailyGoal, level } = onboardingSchema.parse(req.body);

    await prisma.user.update({
      where: { id: req.userId! },
      data: { onboardingCompleted: true, dailyGoal },
    });

    // Enroll user in selected languages
    for (const langCode of languages) {
      const language = await prisma.language.findUnique({ where: { code: langCode } });
      if (!language) continue;

      const levelRecord = await prisma.level.findFirst({
        where: { languageId: language.id, slug: level },
      });
      if (!levelRecord) continue;

      await prisma.enrollment.upsert({
        where: { userId_languageId: { userId: req.userId!, languageId: language.id } },
        update: { levelId: levelRecord.id },
        create: { userId: req.userId!, languageId: language.id, levelId: levelRecord.id },
      });
    }

    res.json({ success: true, message: 'Onboarding completed' });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    res.status(500).json({ error: 'Failed to complete onboarding' });
  }
});

router.get('/status', authenticate, async (req: AuthRequest, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.userId! },
      select: { onboardingCompleted: true },
    });
    res.json({ completed: user?.onboardingCompleted || false });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch onboarding status' });
  }
});

export default router;
