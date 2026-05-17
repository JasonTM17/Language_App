'use client';

import { motion } from 'framer-motion';
import { useAuthStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function ProfilePage() {
  const { user, logout } = useAuthStore();

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-2xl mx-auto space-y-8 pb-8"
    >
      <h1 className="text-2xl font-bold font-display">Hồ sơ</h1>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="p-6 rounded-2xl bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-900/80 dark:to-gray-800/50 border border-border/60 backdrop-blur-sm shadow-lg shadow-purple-500/5"
      >
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-primary-foreground text-2xl font-bold shadow-lg shadow-primary/20">
            {user?.name?.charAt(0) || 'U'}
          </div>
          <div>
            <h2 className="text-xl font-bold">{user?.name}</h2>
            <p className="text-sm text-muted-foreground">{user?.email}</p>
            <p className="text-xs text-muted-foreground mt-1">Cấp {user?.level || 1} • {user?.xp || 0} XP</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 p-4 rounded-xl bg-gradient-to-br from-primary/5 to-purple-500/5 border border-primary/10">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center"
          >
            <p className="text-xl font-bold text-orange-600">{user?.streak || 0}</p>
            <p className="text-xs text-muted-foreground">Streak</p>
          </motion.div>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.25 }}
            className="text-center"
          >
            <p className="text-xl font-bold text-primary">{user?.xp || 0}</p>
            <p className="text-xs text-muted-foreground">Tổng XP</p>
          </motion.div>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center"
          >
            <p className="text-xl font-bold text-green-600">{user?.level || 1}</p>
            <p className="text-xs text-muted-foreground">Cấp độ</p>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="p-6 rounded-2xl bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-900/80 dark:to-gray-800/50 border border-border/60 backdrop-blur-sm space-y-4"
      >
        <h3 className="font-semibold">Cài đặt</h3>
        <div className="space-y-1">
          <div className="flex items-center justify-between p-3 rounded-xl hover:bg-primary/5 transition-colors cursor-pointer">
            <span className="text-sm">Thông báo</span>
            <span className="text-sm text-muted-foreground">Bật</span>
          </div>
          <div className="flex items-center justify-between p-3 rounded-xl hover:bg-primary/5 transition-colors cursor-pointer">
            <span className="text-sm">Mục tiêu hàng ngày</span>
            <span className="text-sm text-muted-foreground">10 phút/ngày</span>
          </div>
          <div className="flex items-center justify-between p-3 rounded-xl hover:bg-primary/5 transition-colors cursor-pointer">
            <span className="text-sm">Giao diện</span>
            <span className="text-sm text-muted-foreground">Hệ thống</span>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex gap-3"
      >
        {user?.role === 'admin' && (
          <Link href="/admin" className="flex-1">
            <Button variant="outline" className="w-full">Quản trị</Button>
          </Link>
        )}
        <Button variant="destructive" onClick={logout} className="flex-1">Đăng xuất</Button>
      </motion.div>
    </motion.div>
  );
}
