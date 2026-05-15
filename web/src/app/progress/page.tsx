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
        <div className="h-8 w-48 bg-gray-200 dark:bg-gray-800 rounded-lg" />
        <div className="grid grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => <div key={i} className="h-32 bg-gray-200 dark:bg-gray-800 rounded-2xl" />)}
        </div>
      </div>
    );
  }

  const stats = data?.stats || { xp: user?.xp || 0, level: user?.level || 1, streak: user?.streak || 0, completedLessons: 0, quizAccuracy: 0 };

  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const activityData = [3, 5, 2, 7, 4, 1, 6];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold font-display">Your Progress</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Track your learning journey</p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 text-center">
          <p className="text-2xl font-bold text-primary-600">{stats.level}</p>
          <p className="text-xs text-gray-500 mt-1">Level</p>
        </div>
        <div className="p-4 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 text-center">
          <p className="text-2xl font-bold text-orange-600">{stats.streak}</p>
          <p className="text-xs text-gray-500 mt-1">Day Streak</p>
        </div>
        <div className="p-4 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 text-center">
          <p className="text-2xl font-bold text-blue-600">{stats.xp}</p>
          <p className="text-xs text-gray-500 mt-1">Total XP</p>
        </div>
        <div className="p-4 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 text-center">
          <p className="text-2xl font-bold text-green-600">{stats.completedLessons}</p>
          <p className="text-xs text-gray-500 mt-1">Lessons</p>
        </div>
        <div className="p-4 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 text-center">
          <p className="text-2xl font-bold text-purple-600">{stats.quizAccuracy}%</p>
          <p className="text-xs text-gray-500 mt-1">Accuracy</p>
        </div>
      </div>

      {/* Weekly Activity */}
      <div className="p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
        <h2 className="font-semibold text-lg mb-6">Weekly Activity</h2>
        <div className="flex items-end justify-between gap-2 h-40">
          {weekDays.map((day, i) => (
            <div key={day} className="flex-1 flex flex-col items-center gap-2">
              <div className="w-full flex flex-col justify-end h-28">
                <div
                  className="w-full rounded-lg bg-gradient-to-t from-primary-500 to-primary-300 dark:from-primary-600 dark:to-primary-400 transition-all"
                  style={{ height: `${(activityData[i] / 7) * 100}%` }}
                />
              </div>
              <span className="text-xs text-gray-500">{day}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Level Progress */}
      <div className="p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
        <h2 className="font-semibold text-lg mb-4">Level Progress</h2>
        <div className="flex items-center gap-4 mb-3">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white text-2xl font-bold">
            {stats.level}
          </div>
          <div className="flex-1">
            <p className="font-medium">Level {stats.level}</p>
            <p className="text-sm text-gray-500">{stats.xp % 100} / 100 XP to next level</p>
            <div className="mt-2 h-3 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-primary-500 to-accent-500 rounded-full" style={{ width: `${stats.xp % 100}%` }} />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      {data?.recentProgress && data.recentProgress.length > 0 && (
        <div className="p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
          <h2 className="font-semibold text-lg mb-4">Recent Activity</h2>
          <div className="space-y-3">
            {data.recentProgress.slice(0, 5).map((item: any) => (
              <div key={item.id} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-700/50">
                <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600">✓</div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{item.lesson?.title}</p>
                  <p className="text-xs text-gray-500">{item.lesson?.level?.language?.name} • Score: {item.score}%</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
