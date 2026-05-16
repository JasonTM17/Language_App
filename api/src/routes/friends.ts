import { Router, Response } from 'express';
import { z } from 'zod';
import prisma from '../database/client';
import { authenticate, AuthRequest } from '../middleware/auth';

const router = Router();

const addFriendSchema = z.object({
  userId: z.string(),
});

router.get('/', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const friendships = await prisma.friendship.findMany({
      where: {
        OR: [
          { senderId: req.userId!, status: 'accepted' },
          { receiverId: req.userId!, status: 'accepted' },
        ],
      },
      include: {
        sender: { select: { id: true, name: true, avatar: true, xp: true, level: true, streak: true } },
        receiver: { select: { id: true, name: true, avatar: true, xp: true, level: true, streak: true } },
      },
    });

    const friends = friendships.map(f => {
      const friend = f.senderId === req.userId ? f.receiver : f.sender;
      return { ...friend, friendshipId: f.id, since: f.createdAt };
    });

    res.json({ friends, total: friends.length });
  } catch {
    res.status(500).json({ error: 'Lỗi khi tải danh sách bạn bè' });
  }
});

router.get('/requests', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const requests = await prisma.friendship.findMany({
      where: { receiverId: req.userId!, status: 'pending' },
      include: {
        sender: { select: { id: true, name: true, avatar: true, xp: true, level: true } },
      },
      orderBy: { createdAt: 'desc' },
    });

    res.json({ requests: requests.map(r => ({ ...r.sender, requestId: r.id, sentAt: r.createdAt })) });
  } catch {
    res.status(500).json({ error: 'Lỗi khi tải lời mời kết bạn' });
  }
});

router.post('/add', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const { userId } = addFriendSchema.parse(req.body);

    if (userId === req.userId) {
      return res.status(400).json({ error: 'Không thể kết bạn với chính mình' });
    }

    const target = await prisma.user.findUnique({ where: { id: userId } });
    if (!target) return res.status(404).json({ error: 'Người dùng không tồn tại' });

    const existing = await prisma.friendship.findFirst({
      where: {
        OR: [
          { senderId: req.userId!, receiverId: userId },
          { senderId: userId, receiverId: req.userId! },
        ],
      },
    });

    if (existing) {
      if (existing.status === 'accepted') return res.status(400).json({ error: 'Đã là bạn bè' });
      if (existing.status === 'pending') return res.status(400).json({ error: 'Đã gửi lời mời' });
    }

    const friendship = await prisma.friendship.create({
      data: { senderId: req.userId!, receiverId: userId },
    });

    res.json({ message: 'Đã gửi lời mời kết bạn', friendship });
  } catch (error) {
    if (error instanceof z.ZodError) return res.status(400).json({ error: error.errors });
    res.status(500).json({ error: 'Lỗi khi gửi lời mời' });
  }
});

router.post('/:id/accept', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const friendship = await prisma.friendship.findUnique({ where: { id: req.params.id } });
    if (!friendship || friendship.receiverId !== req.userId!) {
      return res.status(404).json({ error: 'Lời mời không tồn tại' });
    }
    if (friendship.status !== 'pending') {
      return res.status(400).json({ error: 'Lời mời đã được xử lý' });
    }

    const updated = await prisma.friendship.update({
      where: { id: req.params.id },
      data: { status: 'accepted' },
    });

    res.json({ message: 'Đã chấp nhận lời mời kết bạn', friendship: updated });
  } catch {
    res.status(500).json({ error: 'Lỗi khi chấp nhận lời mời' });
  }
});

router.post('/:id/reject', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const friendship = await prisma.friendship.findUnique({ where: { id: req.params.id } });
    if (!friendship || friendship.receiverId !== req.userId!) {
      return res.status(404).json({ error: 'Lời mời không tồn tại' });
    }

    await prisma.friendship.delete({ where: { id: req.params.id } });
    res.json({ message: 'Đã từ chối lời mời kết bạn' });
  } catch {
    res.status(500).json({ error: 'Lỗi khi từ chối lời mời' });
  }
});

router.delete('/:id', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const friendship = await prisma.friendship.findUnique({ where: { id: req.params.id } });
    if (!friendship) return res.status(404).json({ error: 'Không tìm thấy' });

    if (friendship.senderId !== req.userId && friendship.receiverId !== req.userId) {
      return res.status(403).json({ error: 'Không có quyền' });
    }

    await prisma.friendship.delete({ where: { id: req.params.id } });
    res.json({ message: 'Đã hủy kết bạn' });
  } catch {
    res.status(500).json({ error: 'Lỗi khi hủy kết bạn' });
  }
});

router.get('/search', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const { q } = req.query;
    if (!q || typeof q !== 'string' || q.length < 2) {
      return res.status(400).json({ error: 'Từ khóa tìm kiếm quá ngắn' });
    }

    const users = await prisma.user.findMany({
      where: {
        AND: [
          { id: { not: req.userId! } },
          { name: { contains: q } },
        ],
      },
      select: { id: true, name: true, avatar: true, xp: true, level: true, streak: true },
      take: 20,
    });

    res.json({ users });
  } catch {
    res.status(500).json({ error: 'Lỗi khi tìm kiếm' });
  }
});

export default router;
