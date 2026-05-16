'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

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
  achievement: 'bg-yellow-50 dark:bg-yellow-900/10 border-yellow-100',
  streak: 'bg-orange-50 dark:bg-orange-900/10 border-orange-100',
  friend: 'bg-blue-50 dark:bg-blue-900/10 border-blue-100',
  system: 'bg-purple-50 dark:bg-purple-900/10 border-purple-100',
  reminder: 'bg-green-50 dark:bg-green-900/10 border-green-100',
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
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-display">Thông báo</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
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
      <div className="flex gap-2">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
            filter === 'all' ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700' : 'text-gray-500 hover:bg-gray-100'
          }`}
        >
          Tất cả
        </button>
        <button
          onClick={() => setFilter('unread')}
          className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-1 ${
            filter === 'unread' ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700' : 'text-gray-500 hover:bg-gray-100'
          }`}
        >
          Chưa đọc
          {unreadCount > 0 && (
            <span className="w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </button>
      </div>

      {/* Notification list */}
      <div className="space-y-2">
        {filtered.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-4xl mb-3">🔔</div>
            <p className="text-gray-500">Không có thông báo nào</p>
          </div>
        ) : (
          filtered.map((notif) => (
            <button
              key={notif.id}
              onClick={() => markRead(notif.id)}
              className={`w-full text-left p-4 rounded-xl border transition-all ${
                notif.read
                  ? 'bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700'
                  : `${typeColors[notif.type]} dark:border-gray-700`
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="text-2xl">{notif.icon}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className={`text-sm font-medium ${!notif.read ? '' : 'text-gray-600 dark:text-gray-400'}`}>
                      {notif.title}
                    </p>
                    {!notif.read && <span className="w-2 h-2 rounded-full bg-primary-500" />}
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">{notif.message}</p>
                  <p className="text-xs text-gray-400 mt-1">{notif.time}</p>
                </div>
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
}
