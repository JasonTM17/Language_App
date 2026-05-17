'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Bell, BellOff } from 'lucide-react';

interface Notification {
  id: string;
  type: 'achievement' | 'streak' | 'friend' | 'system' | 'reminder';
  title: string;
  message: string;
  icon: string;
  time: string;
  read: boolean;
}

const mockNotifications: Notification[] = [
  { id: '1', type: 'streak', title: 'Streak sắp mất!', message: 'Bạn chưa học hôm nay. Hãy hoàn thành 1 bài để giữ streak 12 ngày!', icon: '🔥', time: '5 phút trước', read: false },
  { id: '2', type: 'achievement', title: 'Huy hiệu mới!', message: 'Bạn đã đạt huy hiệu "Bookworm" - Hoàn thành 50 bài học', icon: '🏆', time: '2 giờ trước', read: false },
  { id: '3', type: 'friend', title: 'Lời mời kết bạn', message: 'Đỗ Thanh Tùng muốn kết bạn với bạn', icon: '👥', time: '3 giờ trước', read: false },
  { id: '4', type: 'system', title: 'Bài học mới!', message: '5 bài học mới về chủ đề "Văn hóa" đã được thêm vào', icon: '📚', time: '1 ngày trước', read: true },
  { id: '5', type: 'reminder', title: 'Nhắc nhở ôn tập', message: 'Bạn có 15 từ cần ôn tập hôm nay', icon: '🧠', time: '1 ngày trước', read: true },
  { id: '6', type: 'achievement', title: 'Level Up!', message: 'Chúc mừng! Bạn đã lên Level 15', icon: '⬆️', time: '2 ngày trước', read: true },
  { id: '7', type: 'friend', title: 'Bạn bè đạt thành tích', message: 'Lê Thị Mai đã đạt streak 45 ngày!', icon: '🎉', time: '2 ngày trước', read: true },
  { id: '8', type: 'system', title: 'Cập nhật ứng dụng', message: 'Phiên bản mới với tính năng Memory Game đã sẵn sàng', icon: '✨', time: '3 ngày trước', read: true },
];

const typeColors = {
  achievement: 'bg-yellow-50/80 dark:bg-yellow-900/10 border-yellow-200/60 dark:border-yellow-700/40',
  streak: 'bg-orange-50/80 dark:bg-orange-900/10 border-orange-200/60 dark:border-orange-700/40',
  friend: 'bg-blue-50/80 dark:bg-blue-900/10 border-blue-200/60 dark:border-blue-700/40',
  system: 'bg-purple-50/80 dark:bg-purple-900/10 border-purple-200/60 dark:border-purple-700/40',
  reminder: 'bg-green-50/80 dark:bg-green-900/10 border-green-200/60 dark:border-green-700/40',
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const unreadCount = notifications.filter(n => !n.read).length;
  const filtered = filter === 'unread' ? notifications.filter(n => !n.read) : notifications;

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const markRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-2xl mx-auto space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-display">Thông báo</h1>
          <p className="text-muted-foreground mt-1">
            {unreadCount > 0 ? `${unreadCount} thông báo chưa đọc` : 'Không có thông báo mới'}
          </p>
        </div>
        {unreadCount > 0 && (
          <Button variant="outline" size="sm" onClick={markAllRead}>
            Đánh dấu tất cả đã đọc
          </Button>
        )}
      </div>

      {/* Filter */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="flex gap-2"
      >
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
            filter === 'all' ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700' : 'text-muted-foreground hover:bg-gray-100'
          }`}
        >
          Tất cả
        </button>
        <button
          onClick={() => setFilter('unread')}
          className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-1 ${
            filter === 'unread' ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700' : 'text-muted-foreground hover:bg-gray-100'
          }`}
        >
          Chưa đọc
          {unreadCount > 0 && (
            <span className="w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </button>
      </motion.div>

      {/* Notification list */}
      <div className="space-y-2">
        <AnimatePresence mode="wait">
          {filtered.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex flex-col items-center justify-center py-16 px-4"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center mb-4">
                <BellOff className="w-8 h-8 text-purple-500" />
              </div>
              <h3 className="text-lg font-semibold mb-1">Không có thông báo nào</h3>
              <p className="text-sm text-muted-foreground">Bạn đã đọc hết tất cả thông báo rồi!</p>
            </motion.div>
          ) : (
            <motion.div key="list" className="space-y-2">
              {filtered.map((notif, index) => (
                <motion.button
                  key={notif.id}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: Math.min(index * 0.04, 0.4) }}
                  onClick={() => markRead(notif.id)}
                  className={`w-full text-left p-4 rounded-xl border transition-all hover:shadow-md hover:shadow-purple-500/5 hover:border-primary/20 ${
                    notif.read
                      ? 'bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-900/80 dark:to-gray-800/50 border-border/60 backdrop-blur-sm shadow-lg shadow-purple-500/5'
                      : `${typeColors[notif.type]} backdrop-blur-sm`
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="text-2xl">{notif.icon}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className={`text-sm font-medium ${!notif.read ? '' : 'text-muted-foreground'}`}>
                          {notif.title}
                        </p>
                        {!notif.read && <span className="w-2 h-2 rounded-full bg-primary" />}
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">{notif.message}</p>
                      <p className="text-xs text-muted-foreground mt-1">{notif.time}</p>
                    </div>
                  </div>
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
