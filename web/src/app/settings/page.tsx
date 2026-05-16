'use client';

import { useState } from 'react';
import { useTheme } from 'next-themes';
import { useAuthStore } from '@/lib/store';

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const { user } = useAuthStore();
  const [dailyGoal, setDailyGoal] = useState(10);
  const [notifications, setNotifications] = useState(true);
  const [reminderTime, setReminderTime] = useState('08:00');
  const [soundEffects, setSoundEffects] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-8 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold font-display">Cài đặt</h1>
        <p className="text-muted-foreground mt-1">Tùy chỉnh trải nghiệm học tập của bạn</p>
      </div>

      {/* Appearance */}
      <div className="p-6 rounded-2xl bg-card border border">
        <h2 className="font-semibold text-lg mb-4">Giao diện</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-sm">Chế độ tối</p>
              <p className="text-xs text-muted-foreground">Chuyển đổi giữa giao diện sáng và tối</p>
            </div>
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className={`relative w-12 h-6 rounded-full transition-colors ${
                theme === 'dark' ? 'bg-primary' : 'bg-gray-300'
              }`}
            >
              <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
                theme === 'dark' ? 'translate-x-6' : 'translate-x-0.5'
              }`} />
            </button>
          </div>
        </div>
      </div>

      {/* Study Settings */}
      <div className="p-6 rounded-2xl bg-card border border">
        <h2 className="font-semibold text-lg mb-4">Học tập</h2>
        <div className="space-y-6">
          <div>
            <div className="flex justify-between items-center mb-2">
              <p className="font-medium text-sm">Mục tiêu hàng ngày</p>
              <span className="text-sm text-primary font-bold">{dailyGoal} phút</span>
            </div>
            <input
              type="range"
              min={5}
              max={60}
              step={5}
              value={dailyGoal}
              onChange={(e) => setDailyGoal(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary-500"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>5 phút</span>
              <span>60 phút</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-sm">Hiệu ứng âm thanh</p>
              <p className="text-xs text-muted-foreground">Phát âm thanh khi trả lời đúng/sai</p>
            </div>
            <button
              onClick={() => setSoundEffects(!soundEffects)}
              className={`relative w-12 h-6 rounded-full transition-colors ${
                soundEffects ? 'bg-primary' : 'bg-gray-300'
              }`}
            >
              <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
                soundEffects ? 'translate-x-6' : 'translate-x-0.5'
              }`} />
            </button>
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="p-6 rounded-2xl bg-card border border">
        <h2 className="font-semibold text-lg mb-4">Thông báo</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-sm">Nhắc nhở học tập</p>
              <p className="text-xs text-muted-foreground">Nhận thông báo nhắc nhở mỗi ngày</p>
            </div>
            <button
              onClick={() => setNotifications(!notifications)}
              className={`relative w-12 h-6 rounded-full transition-colors ${
                notifications ? 'bg-primary' : 'bg-gray-300'
              }`}
            >
              <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
                notifications ? 'translate-x-6' : 'translate-x-0.5'
              }`} />
            </button>
          </div>

          {notifications && (
            <div>
              <p className="font-medium text-sm mb-2">Giờ nhắc nhở</p>
              <input
                type="time"
                value={reminderTime}
                onChange={(e) => setReminderTime(e.target.value)}
                className="px-4 py-2 rounded-xl border border-border bg-card text-sm"
              />
            </div>
          )}
        </div>
      </div>

      {/* Account */}
      <div className="p-6 rounded-2xl bg-card border border">
        <h2 className="font-semibold text-lg mb-4">Tài khoản</h2>
        <div className="space-y-3">
          <div className="flex justify-between items-center py-2">
            <span className="text-sm text-muted-foreground">Email</span>
            <span className="text-sm font-medium">{user?.email || 'N/A'}</span>
          </div>
          <div className="flex justify-between items-center py-2">
            <span className="text-sm text-muted-foreground">Tên</span>
            <span className="text-sm font-medium">{user?.name || 'N/A'}</span>
          </div>
          <div className="flex justify-between items-center py-2">
            <span className="text-sm text-muted-foreground">Cấp độ</span>
            <span className="text-sm font-medium">Level {user?.level || 1}</span>
          </div>
        </div>
      </div>

      {/* Save button */}
      <button
        onClick={handleSave}
        className="w-full py-3 rounded-xl bg-primary hover:bg-primary-600 text-white font-medium transition-colors"
      >
        {saved ? '✓ Đã lưu!' : 'Lưu cài đặt'}
      </button>
    </div>
  );
}
