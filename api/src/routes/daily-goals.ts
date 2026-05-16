import { Router } from 'express';
import { prisma } from '../database/client';
import { authenticate } from '../middleware/auth';
import { paginateQuery, errorResponse } from '../types/responses';

const router = Router();

router.get('/', authenticate, async (req, res) => {
  try {
    const userId = (req as any).user.id;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let dailyGoal = await prisma.dailyGoal.findFirst({
      where: { userId, date: { gte: today } },
    });

    if (!dailyGoal) {
      dailyGoal = await prisma.dailyGoal.create({
        data: {
          userId,
          date: today,
          targetMinutes: 10,
          completedMinutes: 0,
          lessonsTarget: 3,
          lessonsCompleted: 0,
          cardsTarget: 10,
          cardsCompleted: 0,
        },
      });
    }

    res.json(dailyGoal);
  } catch (error) {
    res.status(500).json(errorResponse('Không thể tải mục tiêu hàng ngày', 'INTERNAL_ERROR'));
  }
});

router.put('/target', authenticate, async (req, res) => {
  try {
    const userId = (req as any).user.id;
    const { targetMinutes, lessonsTarget, cardsTarget } = req.body;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const updateData: any = {};
    if (targetMinutes) updateData.targetMinutes = targetMinutes;
    if (lessonsTarget) updateData.lessonsTarget = lessonsTarget;
    if (cardsTarget) updateData.cardsTarget = cardsTarget;

    const dailyGoal = await prisma.dailyGoal.upsert({
      where: { userId_date: { userId, date: today } },
      update: updateData,
      create: {
        userId,
        date: today,
        targetMinutes: targetMinutes || 10,
        lessonsTarget: lessonsTarget || 3,
        cardsTarget: cardsTarget || 10,
        completedMinutes: 0,
        lessonsCompleted: 0,
        cardsCompleted: 0,
      },
    });

    res.json(dailyGoal);
  } catch (error) {
    res.status(500).json(errorResponse('Không thể cập nhật mục tiêu', 'INTERNAL_ERROR'));
  }
});

router.post('/progress', authenticate, async (req, res) => {
  try {
    const userId = (req as any).user.id;
    const { minutesStudied, lessonCompleted, cardsReviewed } = req.body;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const dailyGoal = await prisma.dailyGoal.upsert({
      where: { userId_date: { userId, date: today } },
      update: {
        completedMinutes: { increment: minutesStudied || 0 },
        lessonsCompleted: { increment: lessonCompleted ? 1 : 0 },
        cardsCompleted: { increment: cardsReviewed || 0 },
      },
      create: {
        userId,
        date: today,
        targetMinutes: 10,
        lessonsTarget: 3,
        cardsTarget: 10,
        completedMinutes: minutesStudied || 0,
        lessonsCompleted: lessonCompleted ? 1 : 0,
        cardsCompleted: cardsReviewed || 0,
      },
    });

    const isCompleted = dailyGoal.completedMinutes >= dailyGoal.targetMinutes
      && dailyGoal.lessonsCompleted >= dailyGoal.lessonsTarget
      && dailyGoal.cardsCompleted >= dailyGoal.cardsTarget;

    if (isCompleted && !dailyGoal.completed) {
      await prisma.dailyGoal.update({
        where: { id: dailyGoal.id },
        data: { completed: true },
      });
    }

    res.json({ ...dailyGoal, completed: isCompleted });
  } catch (error) {
    res.status(500).json(errorResponse('Không thể cập nhật tiến độ', 'INTERNAL_ERROR'));
  }
});

router.get('/history', authenticate, async (req, res) => {
  try {
    const userId = (req as any).user.id;
    const days = parseInt(req.query.days as string) || 7;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const { skip, take } = paginateQuery(page, limit);

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    startDate.setHours(0, 0, 0, 0);

    const where = { userId, date: { gte: startDate } };

    const [history, total] = await Promise.all([
      prisma.dailyGoal.findMany({
        where,
        orderBy: { date: 'desc' },
        skip,
        take,
      }),
      prisma.dailyGoal.count({ where }),
    ]);

    const totalPages = Math.ceil(total / limit);
    res.json({ data: history, pagination: { page, limit, total, totalPages } });
  } catch (error) {
    res.status(500).json(errorResponse('Không thể tải lịch sử', 'INTERNAL_ERROR'));
  }
});

export default router;
