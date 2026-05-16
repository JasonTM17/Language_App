import { Router } from 'express';
import { authenticate } from '../middleware/auth';

const router = Router();

router.get('/', authenticate, async (req, res) => {
  const notifications = [
    {
      id: '1',
      type: 'achievement',
      title: 'Thành tựu mới!',
      message: 'Bạn đã hoàn thành 10 bài học đầu tiên',
      read: false,
      createdAt: new Date(Date.now() - 3600000).toISOString(),
    },
    {
      id: '2',
      type: 'streak',
      title: 'Chuỗi ngày học',
      message: 'Tuyệt vời! Bạn đã duy trì chuỗi 7 ngày liên tiếp',
      read: true,
      createdAt: new Date(Date.now() - 86400000).toISOString(),
    },
    {
      id: '3',
      type: 'reminder',
      title: 'Nhắc nhở học tập',
      message: 'Bạn có 15 thẻ từ vựng cần ôn tập hôm nay',
      read: false,
      createdAt: new Date(Date.now() - 7200000).toISOString(),
    },
    {
      id: '4',
      type: 'level_up',
      title: 'Lên cấp!',
      message: 'Chúc mừng! Bạn đã đạt cấp độ 5',
      read: true,
      createdAt: new Date(Date.now() - 172800000).toISOString(),
    },
    {
      id: '5',
      type: 'new_content',
      title: 'Nội dung mới',
      message: 'Bài học mới về "Sức khỏe & Y tế" đã sẵn sàng',
      read: false,
      createdAt: new Date(Date.now() - 1800000).toISOString(),
    },
  ];

  res.json({ notifications, unreadCount: notifications.filter(n => !n.read).length });
});

router.post('/:id/read', authenticate, async (req, res) => {
  res.json({ success: true });
});

router.post('/read-all', authenticate, async (req, res) => {
  res.json({ success: true });
});

export default router;
