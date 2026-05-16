import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import bcrypt from 'bcryptjs';

const router = Router();

router.get('/', authenticate, async (req, res) => {
  const prisma = req.app.locals.prisma;
  const user = await prisma.user.findUnique({
    where: { id: (req as any).user.id },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      xp: true,
      level: true,
      streak: true,
      avatar: true,
      onboardingCompleted: true,
      createdAt: true,
    },
  });

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  const enrollments = await prisma.enrollment.findMany({
    where: { userId: user.id },
    include: { language: true },
  });

  res.json({
    profile: {
      ...user,
      languages: enrollments.map((e: any) => ({
        code: e.language.code,
        name: e.language.name,
        goal: e.goal,
        enrolledAt: e.createdAt,
      })),
    },
  });
});

router.put('/', authenticate, async (req, res) => {
  const prisma = req.app.locals.prisma;
  const { name, avatar } = req.body;

  const updateData: any = {};
  if (name && typeof name === 'string' && name.trim().length > 0) {
    updateData.name = name.trim();
  }
  if (avatar && typeof avatar === 'string') {
    updateData.avatar = avatar;
  }

  if (Object.keys(updateData).length === 0) {
    return res.status(400).json({ error: 'No valid fields to update' });
  }

  const user = await prisma.user.update({
    where: { id: (req as any).user.id },
    data: updateData,
    select: { id: true, email: true, name: true, avatar: true },
  });

  res.json({ user });
});

router.put('/password', authenticate, async (req, res) => {
  const prisma = req.app.locals.prisma;
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    return res.status(400).json({ error: 'Current and new password required' });
  }

  if (newPassword.length < 6) {
    return res.status(400).json({ error: 'New password must be at least 6 characters' });
  }

  const user = await prisma.user.findUnique({
    where: { id: (req as any).user.id },
  });

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  const isValid = await bcrypt.compare(currentPassword, user.password);
  if (!isValid) {
    return res.status(401).json({ error: 'Current password is incorrect' });
  }

  const hashedPassword = await bcrypt.hash(newPassword, 12);
  await prisma.user.update({
    where: { id: user.id },
    data: { password: hashedPassword },
  });

  res.json({ message: 'Password updated successfully' });
});

router.get('/stats', authenticate, async (req, res) => {
  const prisma = req.app.locals.prisma;
  const userId = (req as any).user.id;

  const [lessonsCompleted, vocabLearned, quizAttempts, enrollments] = await Promise.all([
    prisma.lessonProgress.count({ where: { userId, completed: true } }),
    prisma.flashcardProgress.count({ where: { userId, known: true } }),
    prisma.quizAttempt.count({ where: { userId } }),
    prisma.enrollment.count({ where: { userId } }),
  ]);

  const correctAttempts = await prisma.quizAttempt.count({
    where: { userId, correct: true },
  });

  res.json({
    stats: {
      lessonsCompleted,
      vocabLearned,
      quizAttempts,
      quizAccuracy: quizAttempts > 0 ? Math.round((correctAttempts / quizAttempts) * 100) : 0,
      languagesStudying: enrollments,
    },
  });
});

export default router;
