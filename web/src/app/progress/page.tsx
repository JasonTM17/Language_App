'use client';

import { useEffect, useState } from 'react';
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
    <div className="space-y-8 pb-8">
      <div>
        <h1 className="text-2xl font-bold font-display">Tiến độ học tập</h1>
        <p className="text-muted-foreground text-sm mt-0.5">Theo dõi quá trình học tập của bạn</p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-card border text-center">
          <p className="text-3xl font-bold text-primary">{stats.xp}</p>
          <p className="text-xs text-muted-foreground mt-1">Tổng XP</p>
        </div>
        <div className="p-4 rounded-2xl bg-card border text-center">
          <p className="text-3xl font-bold text-green-600">{stats.completedLessons}</p>
          <p className="text-xs text-muted-foreground mt-1">Bài học hoàn thành</p>
        </div>
        <div className="p-4 rounded-2xl bg-card border text-center">
          <p className="text-3xl font-bold text-orange-600">{stats.streak}</p>
          <p className="text-xs text-muted-foreground mt-1">Ngày liên tiếp</p>
        </div>
        <div className="p-4 rounded-2xl bg-card border text-center">
          <p className="text-3xl font-bold text-purple-600">{stats.quizAccuracy}%</p>
          <p className="text-xs text-muted-foreground mt-1">Độ chính xác</p>
        </div>
      </div>

      {/* Level Progress */}
      <div className="p-6 rounded-2xl bg-card border">
        <div className="flex items-center gap-4 mb-3">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-primary-foreground text-2xl font-bold">
            {stats.level}
          </div>
          <div className="flex-1">
            <p className="font-medium">Cấp độ {stats.level}</p>
            <p className="text-sm text-muted-foreground">{stats.xp % 100}/100 XP để lên cấp tiếp theo</p>
            <div className="mt-2 h-3 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-primary to-primary/70 rounded-full transition-all duration-500" style={{ width: `${stats.xp % 100}%` }} />
            </div>
          </div>
        </div>
      </div>

      {/* Weekly Activity */}
      <div className="p-6 rounded-2xl bg-card border">
        <h2 className="font-semibold text-lg mb-6">Hoạt động tuần này</h2>
        <div className="flex items-end justify-between gap-2 h-40">
          {weekDays.map((day, i) => (
            <div key={day} className="flex-1 flex flex-col items-center gap-2">
              <div className="w-full flex flex-col justify-end h-28">
                <div
                  className="w-full rounded-lg bg-gradient-to-t from-primary to-primary/50 transition-all"
                  style={{ height: `${(activityData[i] / maxActivity) * 100}%`, minHeight: activityData[i] > 0 ? '8px' : '0' }}
                />
              </div>
              <span className="text-xs text-muted-foreground">{day}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Milestones */}
      <div className="p-6 rounded-2xl bg-card border">
        <h2 className="font-semibold text-lg mb-4">Cột mốc</h2>
        <div className="space-y-3">
          {[
            { target: 10, current: stats.completedLessons, label: 'Hoàn thành 10 bài học', icon: '📚' },
            { target: 50, current: stats.completedLessons, label: 'Hoàn thành 50 bài học', icon: '🎓' },
            { target: 7, current: stats.streak, label: 'Streak 7 ngày', icon: '🔥' },
            { target: 30, current: stats.streak, label: 'Streak 30 ngày', icon: '💪' },
            { target: 1000, current: stats.xp, label: 'Đạt 1,000 XP', icon: '⭐' },
            { target: 5000, current: stats.xp, label: 'Đạt 5,000 XP', icon: '🏆' },
          ].map((milestone, i) => {
            const pct = Math.min((milestone.current / milestone.target) * 100, 100);
            const done = pct >= 100;
            return (
              <div key={i} className="flex items-center gap-3">
                <span className="text-xl w-8 text-center">{milestone.icon}</span>
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <p className={`text-sm font-medium ${done ? 'text-green-600' : ''}`}>{milestone.label}</p>
                    <span className="text-xs text-muted-foreground">{done ? '✓ Hoàn thành' : `${milestone.current}/${milestone.target}`}</span>
                  </div>
                  <div className="mt-1 h-2 bg-muted rounded-full overflow-hidden">
                    <div className={`h-full rounded-full transition-all ${done ? 'bg-green-500' : 'bg-primary'}`} style={{ width: `${pct}%` }} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Activity */}
      {data?.recentProgress && data.recentProgress.length > 0 && (
        <div className="p-6 rounded-2xl bg-card border">
          <h2 className="font-semibold text-lg mb-4">Hoạt động gần đây</h2>
          <div className="space-y-3">
            {data.recentProgress.slice(0, 5).map((item: any) => (
              <div key={item.id} className="flex items-center gap-3 p-3 rounded-xl bg-muted/50">
                <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600">✓</div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{item.lesson?.title}</p>
                  <p className="text-xs text-muted-foreground">{item.lesson?.level?.language?.name} • Điểm: {item.score}%</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
