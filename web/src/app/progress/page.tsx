'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAuthStore } from '@/lib/store';
import { api } from '@/services/api';

export default function ProgressPage() {
  const { user } = useAuthStore();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.progress.dashboard()
      .then(setData)
      .catch(() => setData(null))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-8 w-48 bg-muted rounded-lg" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => <div key={i} className="h-28 bg-muted rounded-2xl" />)}
        </div>
      </div>
    );
  }

  const stats = data?.stats || { xp: user?.xp || 0, level: user?.level || 1, streak: user?.streak || 0, completedLessons: 0, quizAccuracy: 0 };

  const weekDays = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];
  const activityData = data?.weeklyActivity?.map((d: any) => d.activities) || weekDays.map(() => Math.floor(Math.random() * 5));
  const maxActivity = Math.max(...activityData, 1);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-8 pb-8"
    >
      <div>
        <h1 className="text-2xl font-bold font-display">Tiến độ học tập</h1>
        <p className="text-muted-foreground text-sm mt-0.5">Theo dõi quá trình học tập của bạn</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { value: stats.xp, label: 'Tổng XP', color: 'text-primary', bg: 'from-primary/10 to-purple-500/10' },
          { value: stats.completedLessons, label: 'Bài học hoàn thành', color: 'text-green-600', bg: 'from-green-500/10 to-emerald-500/10' },
          { value: stats.streak, label: 'Ngày liên tiếp', color: 'text-orange-600', bg: 'from-orange-500/10 to-amber-500/10' },
          { value: `${stats.quizAccuracy}%`, label: 'Độ chính xác', color: 'text-purple-600', bg: 'from-purple-500/10 to-pink-500/10' },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.08 }}
            className={`p-4 rounded-2xl bg-gradient-to-br ${stat.bg} border border-border/40 text-center backdrop-blur-sm`}
          >
            <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="p-6 rounded-2xl bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-900/80 dark:to-gray-800/50 border border-border/60 backdrop-blur-sm"
      >
        <div className="flex items-center gap-4 mb-3">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-primary-foreground text-2xl font-bold shadow-lg shadow-primary/20">
            {stats.level}
          </div>
          <div className="flex-1">
            <p className="font-medium">Cấp độ {stats.level}</p>
            <p className="text-sm text-muted-foreground">{stats.xp % 100}/100 XP để lên cấp tiếp theo</p>
            <div className="mt-2 h-3 bg-muted rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-primary to-purple-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${stats.xp % 100}%` }}
                transition={{ duration: 0.8, delay: 0.4 }}
              />
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="p-6 rounded-2xl bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-900/80 dark:to-gray-800/50 border border-border/60 backdrop-blur-sm"
      >
        <h2 className="font-semibold text-lg mb-6">Hoạt động tuần này</h2>
        <div className="flex items-end justify-between gap-2 h-40">
          {weekDays.map((day, i) => (
            <div key={day} className="flex-1 flex flex-col items-center gap-2">
              <div className="w-full flex flex-col justify-end h-28">
                <motion.div
                  className="w-full rounded-lg bg-gradient-to-t from-primary to-primary/50"
                  initial={{ height: 0 }}
                  animate={{ height: `${(activityData[i] / maxActivity) * 100}%` }}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.05 }}
                  style={{ minHeight: activityData[i] > 0 ? '8px' : '0' }}
                />
              </div>
              <span className="text-xs text-muted-foreground">{day}</span>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="p-6 rounded-2xl bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-900/80 dark:to-gray-800/50 border border-border/60 backdrop-blur-sm"
      >
        <h2 className="font-semibold text-lg mb-4">Cột mốc</h2>
        <div className="space-y-3">
          {[
            { target: 10, current: stats.completedLessons, label: 'Hoàn thành 10 bài học' },
            { target: 50, current: stats.completedLessons, label: 'Hoàn thành 50 bài học' },
            { target: 7, current: stats.streak, label: 'Streak 7 ngày' },
            { target: 30, current: stats.streak, label: 'Streak 30 ngày' },
            { target: 1000, current: stats.xp, label: 'Đạt 1,000 XP' },
            { target: 5000, current: stats.xp, label: 'Đạt 5,000 XP' },
          ].map((milestone, i) => {
            const pct = Math.min((milestone.current / milestone.target) * 100, 100);
            const done = pct >= 100;
            return (
              <div key={i} className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${done ? 'bg-green-100 dark:bg-green-900/30 text-green-600' : 'bg-muted text-muted-foreground'}`}>
                  {done ? '✓' : i + 1}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <p className={`text-sm font-medium ${done ? 'text-green-600' : ''}`}>{milestone.label}</p>
                    <span className="text-xs text-muted-foreground">{done ? 'Hoàn thành' : `${milestone.current}/${milestone.target}`}</span>
                  </div>
                  <div className="mt-1 h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full rounded-full ${done ? 'bg-green-500' : 'bg-primary'}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 0.6, delay: 0.5 + i * 0.05 }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>

      {data?.recentProgress && data.recentProgress.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="p-6 rounded-2xl bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-900/80 dark:to-gray-800/50 border border-border/60 backdrop-blur-sm"
        >
          <h2 className="font-semibold text-lg mb-4">Hoạt động gần đây</h2>
          <div className="space-y-3">
            {data.recentProgress.slice(0, 5).map((item: any) => (
              <div key={item.id} className="flex items-center gap-3 p-3 rounded-xl bg-green-50/50 dark:bg-green-900/10 border border-green-200/30 dark:border-green-800/20">
                <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 font-bold">✓</div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{item.lesson?.title}</p>
                  <p className="text-xs text-muted-foreground">{item.lesson?.level?.language?.name} • Điểm: {item.score}%</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
