'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/lib/store';
import { api } from '@/services/api';

interface DashboardData {
  stats: { xp: number; level: number; streak: number; completedLessons: number; quizAccuracy: number };
  enrollments: any[];
  recentProgress: any[];
}

interface DailyGoal {
  id: string;
  targetMinutes: number;
  lessonsTarget: number;
  cardsTarget: number;
  minutesStudied: number;
  lessonsCompleted: number;
  cardsReviewed: number;
  completed: boolean;
}

export default function DashboardPage() {
  const { user } = useAuthStore();
  const [data, setData] = useState<DashboardData | null>(null);
  const [goal, setGoal] = useState<DailyGoal | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.progress.dashboard().catch(() => ({
        stats: { xp: user?.xp || 0, level: user?.level || 1, streak: user?.streak || 0, completedLessons: 0, quizAccuracy: 0 },
        enrollments: [],
        recentProgress: [],
      })),
      api.goals.today().catch(() => ({ goal: null })),
    ]).then(([dashData, goalData]: [any, any]) => {
      setData(dashData);
      setGoal(goalData.goal);
    }).finally(() => setLoading(false));
  }, [user]);

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-8 w-48 bg-gray-200 dark:bg-gray-800 rounded-lg" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => <div key={i} className="h-32 bg-gray-200 dark:bg-gray-800 rounded-2xl" />)}
        </div>
      </div>
    );
  }

  const stats = data?.stats || { xp: 0, level: 1, streak: 0, completedLessons: 0, quizAccuracy: 0 };

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div>
        <h1 className="text-2xl font-bold font-display">Chào mừng trở lại, {user?.name?.split(' ')[0]} 👋</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Tiếp tục cố gắng nhé! Đây là tổng quan học tập của bạn.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/10 border border-orange-200 dark:border-orange-800">
          <div className="text-3xl mb-2">🔥</div>
          <p className="text-2xl font-bold text-orange-700 dark:text-orange-300">{stats.streak}</p>
          <p className="text-sm text-orange-600 dark:text-orange-400">Ngày liên tiếp</p>
        </div>
        <div className="p-5 rounded-2xl bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/10 border border-primary-200 dark:border-primary-800">
          <div className="text-3xl mb-2">⭐</div>
          <p className="text-2xl font-bold text-primary-700 dark:text-primary-300">{stats.xp}</p>
          <p className="text-sm text-primary-600 dark:text-primary-400">Tổng XP</p>
        </div>
        <div className="p-5 rounded-2xl bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/10 border border-green-200 dark:border-green-800">
          <div className="text-3xl mb-2">📚</div>
          <p className="text-2xl font-bold text-green-700 dark:text-green-300">{stats.completedLessons}</p>
          <p className="text-sm text-green-600 dark:text-green-400">Bài học hoàn thành</p>
        </div>
        <div className="p-5 rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/10 border border-purple-200 dark:border-purple-800">
          <div className="text-3xl mb-2">🎯</div>
          <p className="text-2xl font-bold text-purple-700 dark:text-purple-300">{stats.quizAccuracy}%</p>
          <p className="text-sm text-purple-600 dark:text-purple-400">Độ chính xác</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm">
          <h2 className="font-semibold text-lg mb-4">Tiếp tục học</h2>
          {data?.enrollments && data.enrollments.length > 0 ? (
            <div className="space-y-3">
              {data.enrollments.map((enrollment: any) => (
                <Link key={enrollment.id} href={`/languages`} className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <span className="text-2xl">{enrollment.language?.flag}</span>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{enrollment.language?.name}</p>
                    <p className="text-xs text-gray-500">{enrollment.level?.name}</p>
                  </div>
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-6">
              <p className="text-gray-500 mb-4">Bạn chưa đăng ký ngôn ngữ nào.</p>
              <Link href="/languages">
                <Button>Chọn ngôn ngữ</Button>
              </Link>
            </div>
          )}
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-lg">Mục tiêu hôm nay</h2>
            {goal?.completed && (
              <span className="text-xs font-medium px-2 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300">Hoàn thành!</span>
            )}
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center">📖</div>
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <p className="text-sm font-medium">Hoàn thành bài học</p>
                  <span className="text-xs text-gray-500">{goal?.lessonsCompleted || 0}/{goal?.lessonsTarget || 3}</span>
                </div>
                <div className="mt-1 h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 rounded-full transition-all" style={{ width: `${Math.min(((goal?.lessonsCompleted || 0) / (goal?.lessonsTarget || 3)) * 100, 100)}%` }} />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">🃏</div>
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <p className="text-sm font-medium">Ôn tập flashcard</p>
                  <span className="text-xs text-gray-500">{goal?.cardsReviewed || 0}/{goal?.cardsTarget || 10}</span>
                </div>
                <div className="mt-1 h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full transition-all" style={{ width: `${Math.min(((goal?.cardsReviewed || 0) / (goal?.cardsTarget || 10)) * 100, 100)}%` }} />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">⏱️</div>
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <p className="text-sm font-medium">Thời gian học</p>
                  <span className="text-xs text-gray-500">{goal?.minutesStudied || 0}/{goal?.targetMinutes || 10} phút</span>
                </div>
                <div className="mt-1 h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-500 rounded-full transition-all" style={{ width: `${Math.min(((goal?.minutesStudied || 0) / (goal?.targetMinutes || 10)) * 100, 100)}%` }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Level Progress */}
      <div className="p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-lg">Cấp độ {stats.level}</h2>
          <span className="text-sm text-gray-500">{stats.xp % 100}/100 XP để lên cấp</span>
        </div>
        <div className="h-3 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-primary-500 to-accent-500 rounded-full transition-all duration-500" style={{ width: `${stats.xp % 100}%` }} />
        </div>
      </div>
    </div>
  );
}
