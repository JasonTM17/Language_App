import { Router, Response } from 'express';
import { z } from 'zod';
import prisma from '../database/client';
import { authenticate, AuthRequest } from '../middleware/auth';

const router = Router();

interface ShopItem {
  id: string;
  name: string;
  nameVi: string;
  description: string;
  descriptionVi: string;
  price: number;
  category: 'powerup' | 'cosmetic' | 'boost';
  icon: string;
  effect: string;
  duration?: number;
}

const SHOP_ITEMS: ShopItem[] = [
  {
    id: 'heart_refill',
    name: 'Heart Refill',
    nameVi: 'Hồi phục tim',
    description: 'Refill all hearts to maximum',
    descriptionVi: 'Hồi phục tất cả tim về tối đa',
    price: 50,
    category: 'powerup',
    icon: '❤️',
    effect: 'refill_hearts',
  },
  {
    id: 'streak_freeze',
    name: 'Streak Freeze',
    nameVi: 'Đóng băng chuỗi ngày',
    description: 'Protect your streak for one day if you miss practice',
    descriptionVi: 'Bảo vệ chuỗi ngày nếu bạn quên luyện tập 1 ngày',
    price: 200,
    category: 'powerup',
    icon: '🧊',
    effect: 'freeze_streak',
  },
  {
    id: 'double_xp',
    name: 'Double XP (15 min)',
    nameVi: 'Nhân đôi XP (15 phút)',
    description: 'Earn double XP for 15 minutes',
    descriptionVi: 'Nhận gấp đôi XP trong 15 phút',
    price: 100,
    category: 'boost',
    icon: '⚡',
    effect: 'double_xp',
    duration: 15,
  },
  {
    id: 'unlimited_hearts',
    name: 'Unlimited Hearts (1 hour)',
    nameVi: 'Tim không giới hạn (1 giờ)',
    description: 'Unlimited hearts for one hour',
    descriptionVi: 'Tim không giới hạn trong 1 giờ',
    price: 150,
    category: 'boost',
    icon: '💖',
    effect: 'unlimited_hearts',
    duration: 60,
  },
  {
    id: 'hint_pack',
    name: 'Hint Pack (5 hints)',
    nameVi: 'Gói gợi ý (5 lần)',
    description: 'Get 5 hints for quizzes',
    descriptionVi: 'Nhận 5 lần gợi ý cho bài kiểm tra',
    price: 75,
    category: 'powerup',
    icon: '💡',
    effect: 'add_hints',
  },
  {
    id: 'review_skip',
    name: 'Skip Review',
    nameVi: 'Bỏ qua ôn tập',
    description: 'Skip one review session without losing progress',
    descriptionVi: 'Bỏ qua 1 phiên ôn tập mà không mất tiến trình',
    price: 30,
    category: 'powerup',
    icon: '⏭️',
    effect: 'skip_review',
  },
];

const purchaseSchema = z.object({
  itemId: z.string(),
  quantity: z.number().min(1).max(10).optional(),
});

router.get('/', authenticate, async (req: AuthRequest, res: Response) => {
  const user = await prisma.user.findUnique({
    where: { id: req.userId! },
    select: { gems: true },
  });

  const items = SHOP_ITEMS.map(item => ({
    ...item,
    affordable: (user?.gems || 0) >= item.price,
  }));

  res.json({ items, gems: user?.gems || 0 });
});

router.post('/purchase', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const { itemId, quantity = 1 } = purchaseSchema.parse(req.body);

    const item = SHOP_ITEMS.find(i => i.id === itemId);
    if (!item) {
      return res.status(404).json({ error: 'Vật phẩm không tồn tại' });
    }

    const totalCost = item.price * quantity;
    const user = await prisma.user.findUnique({ where: { id: req.userId! } });
    if (!user) return res.status(404).json({ error: 'User not found' });

    if (user.gems < totalCost) {
      return res.status(400).json({
        error: 'Không đủ kim cương',
        required: totalCost,
        current: user.gems,
      });
    }

    const updateData: Record<string, any> = { gems: user.gems - totalCost };

    switch (item.effect) {
      case 'refill_hearts':
        updateData.hearts = user.heartsMax;
        updateData.heartsRefilledAt = new Date();
        break;
      case 'freeze_streak':
        updateData.streakFreeze = (user as any).streakFreeze ? (user as any).streakFreeze + quantity : quantity;
        break;
      case 'double_xp':
        break;
      case 'unlimited_hearts':
        break;
      case 'add_hints':
        break;
      case 'skip_review':
        break;
    }

    const updated = await prisma.user.update({
      where: { id: req.userId! },
      data: updateData,
    });

    res.json({
      success: true,
      item: item.nameVi,
      quantity,
      gemsSpent: totalCost,
      gemsRemaining: updated.gems,
      message: `Đã mua ${item.nameVi} x${quantity}!`,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    res.status(500).json({ error: 'Lỗi khi mua vật phẩm' });
  }
});

router.get('/history', authenticate, async (req: AuthRequest, res: Response) => {
  res.json({ purchases: [], message: 'Chưa có lịch sử mua hàng' });
});

export default router;
