'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
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

  const sectionClass = "p-6 rounded-2xl bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-900/80 dark:to-gray-800/50 border border-border/60 backdrop-blur-sm shadow-lg shadow-purple-500/5 hover:shadow-md hover:shadow-purple-500/5 hover:border-primary/20 transition-all";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-8 max-w-2xl"
    >
      <div>
        <h1 className="text-2xl font-bold font-display">Cài đặt</h1>
        <p className="text-muted-foreground mt-1">Tùy chỉnh trải nghiệm học tập của bạn</p>
      </div>

      {/* Appearance */}
      <motion.div
        initial={{ opacity: 0, x: -12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.04 }}
        className={sectionClass}
      >
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
      </motion.div>

      {/* Study Settings */}
      <motion.div
        initial={{ opacity: 0, x: -12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.08 }}
        className={sectionClass}
      >
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
      </motion.div>

      {/* Notifications */}
      <motion.div
        initial={{ opacity: 0, x: -12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.12 }}
        className={sectionClass}
      >
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
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <p className="font-medium text-sm mb-2">Giờ nhắc nhở</p>
              <input
                type="time"
                value={reminderTime}
                onChange={(e) => setReminderTime(e.target.value)}
                className="px-4 py-2 rounded-xl border border-border/60 bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-900/80 dark:to-gray-800/50 backdrop-blur-sm text-sm"
              />
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Account */}
      <motion.div
        initial={{ opacity: 0, x: -12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.16 }}
        className={sectionClass}
      >
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
      </motion.div>

      {/* Save button */}
      <motion.button
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleSave}
        className="w-full py-3 rounded-xl bg-primary hover:bg-primary-600 text-white font-medium transition-colors"
      >
        {saved ? '✓ Đã lưu!' : 'Lưu cài đặt'}
      </motion.button>
    </motion.div>
  );
}
