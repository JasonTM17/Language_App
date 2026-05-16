'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { StreakCelebration } from '@/components/ui/streak-celebration';
import { useAuthStore } from '@/lib/store';
import { api } from '@/services/api';

import {
  FileText, Headphones, Mic, Ruler, Keyboard, Zap, Layers, HelpCircle,
  TrendingUp, Target, BookOpen, Star, ArrowRight, ChevronRight, Flame,
  Trophy, BarChart3, Clock, CheckCircle2,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

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

const quickActions = [
  { href: '/vocabulary', icon: FileText, label: 'Từ vựng', color: 'from-blue-500 to-cyan-500' },
  { href: '/listening', icon: Headphones, label: 'Luyện nghe', color: 'from-purple-500 to-pink-500' },
  { href: '/speaking', icon: Mic, label: 'Luyện nói', color: 'from-orange-500 to-red-500' },
  { href: '/grammar-tips', icon: Ruler, label: 'Ngữ pháp', color: 'from-green-500 to-emerald-500' },
  { href: '/typing-practice', icon: Keyboard, label: 'Gõ phím', color: 'from-indigo-500 to-violet-500' },
  { href: '/daily-challenge', icon: Zap, label: 'Thử thách', color: 'from-amber-500 to-orange-500' },
  { href: '/flashcards', icon: Layers, label: 'Flashcard', color: 'from-teal-500 to-cyan-500' },
  { href: '/quiz', icon: HelpCircle, label: 'Quiz', color: 'from-rose-500 to-pink-500' },
];

const weekDays = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];

export default function DashboardPage() {
  const { user } = useAuthStore();
  const [data, setData] = useState<DashboardData | null>(null);
  const [goal, setGoal] = useState<DailyGoal | null>(null);
  const [loading, setLoading] = useState(true);
  const [showStreakCelebration, setShowStreakCelebration] = useState(false);
  const [weeklyActivity] = useState(() =>
    weekDays.map(() => Math.floor(Math.random() * 4))
  );

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
      const streak = dashData?.stats?.streak || 0;
      if ([7, 14, 30, 60, 100, 365].includes(streak)) {
        setShowStreakCelebration(true);
      }
    }).finally(() => setLoading(false));
  }, [user]);

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-8 w-48 bg-muted rounded-lg" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => <div key={i} className="h-32 bg-muted rounded-2xl" />)}
        </div>
        <div className="h-48 bg-muted rounded-2xl" />
      </div>
    );
  }

  const stats = data?.stats || { xp: 0, level: 1, streak: 0, completedLessons: 0, quizAccuracy: 0 };
  const goalProgress = goal
    ? Math.round(((goal.lessonsCompleted / goal.lessonsTarget + goal.cardsReviewed / goal.cardsTarget + goal.minutesStudied / goal.targetMinutes) / 3) * 100)
    : 0;
  const xpForNextLevel = 100;
  const xpProgress = stats.xp % xpForNextLevel;

  return (
    <div className="space-y-6 pb-8">
      {showStreakCelebration && (
        <StreakCelebration streak={stats.streak} onDismiss={() => setShowStreakCelebration(false)} />
      )}

      {/* Welcome + Streak */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold font-display">
            Chào {user?.name?.split(' ')[0] || 'bạn'} 👋
          </h1>
          <p className="text-muted-foreground text-sm mt-0.5">Tiếp tục cố gắng nhé!</p>
        </div>
        <Link href="/streak-calendar" className="flex flex-col items-center p-3 rounded-2xl bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950/30 dark:to-amber-950/30 border border-orange-200 dark:border-orange-800 hover:scale-105 transition-transform">
          <span className="text-2xl">🔥</span>
          <span className="text-lg font-bold text-orange-600 dark:text-orange-400">{stats.streak}</span>
          <span className="text-[10px] text-orange-500">ngày</span>
        </Link>
      </div>

      {/* Daily Goal Ring + Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Daily goal circular progress */}
        <div className="p-5 rounded-2xl bg-card border shadow-sm flex flex-col items-center justify-center">
          <div className="relative w-24 h-24 mb-3">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="8" className="text-muted" />
              <circle
                cx="50" cy="50" r="42" fill="none" strokeWidth="8"
                className="text-primary"
                stroke="currentColor"
                strokeLinecap="round"
                strokeDasharray={`${Math.min(goalProgress, 100) * 2.64} 264`}
                style={{ transition: 'stroke-dasharray 1s ease-out' }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-xl font-bold">{Math.min(goalProgress, 100)}%</span>
            </div>
          </div>
          <p className="text-sm font-medium">Mục tiêu hôm nay</p>
          {goal?.completed && (
            <span className="mt-1 text-xs px-2 py-0.5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600">Hoàn thành!</span>
          )}
        </div>

        {/* XP + Level */}
        <div className="p-5 rounded-2xl bg-card border shadow-sm flex flex-col justify-between">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl">⭐</span>
            <div>
              <p className="text-xs text-muted-foreground">Tổng XP</p>
              <p className="text-xl font-bold">{stats.xp.toLocaleString()}</p>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-xs text-muted-foreground mb-1">
              <span>Cấp {stats.level}</span>
              <span>{xpProgress}/{xpForNextLevel}</span>
            </div>
            <div className="h-2.5 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full transition-all duration-700"
                style={{ width: `${(xpProgress / xpForNextLevel) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Quick stats */}
        <div className="p-5 rounded-2xl bg-card border shadow-sm grid grid-cols-2 gap-3">
          <div className="text-center p-2 rounded-xl bg-green-50 dark:bg-green-900/10">
            <p className="text-lg font-bold text-green-600">{stats.completedLessons}</p>
            <p className="text-[10px] text-green-500">Bài học</p>
          </div>
          <div className="text-center p-2 rounded-xl bg-purple-50 dark:bg-purple-900/10">
            <p className="text-lg font-bold text-purple-600">{stats.quizAccuracy}%</p>
            <p className="text-[10px] text-purple-500">Chính xác</p>
          </div>
          <div className="text-center p-2 rounded-xl bg-blue-50 dark:bg-blue-900/10">
            <p className="text-lg font-bold text-blue-600">{goal?.cardsReviewed || 0}</p>
            <p className="text-[10px] text-blue-500">Flashcard</p>
          </div>
          <div className="text-center p-2 rounded-xl bg-orange-50 dark:bg-orange-900/10">
            <p className="text-lg font-bold text-orange-600">{goal?.minutesStudied || 0}p</p>
            <p className="text-[10px] text-orange-500">Hôm nay</p>
          </div>
        </div>
      </div>

      {/* Weekly Activity Heatmap */}
      <div className="p-5 rounded-2xl bg-card border shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold">Hoạt động tuần này</h2>
          <Link href="/analytics" className="text-xs text-primary hover:underline">Xem chi tiết</Link>
        </div>
        <div className="grid grid-cols-7 gap-2">
          {weekDays.map((day, i) => (
            <div key={day} className="flex flex-col items-center gap-1.5">
              <div className={`w-full aspect-square rounded-lg transition-colors ${
                weeklyActivity[i] === 0 ? 'bg-muted' :
                weeklyActivity[i] === 1 ? 'bg-green-200 dark:bg-green-900/30' :
                weeklyActivity[i] === 2 ? 'bg-green-400 dark:bg-green-700/50' :
                'bg-green-600 dark:bg-green-500'
              }`} />
              <span className="text-[10px] text-muted-foreground">{day}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2 mt-3 justify-end">
          <span className="text-[10px] text-muted-foreground">Ít</span>
          <div className="w-3 h-3 rounded bg-muted" />
          <div className="w-3 h-3 rounded bg-green-200 dark:bg-green-900/30" />
          <div className="w-3 h-3 rounded bg-green-400 dark:bg-green-700/50" />
          <div className="w-3 h-3 rounded bg-green-600 dark:bg-green-500" />
          <span className="text-[10px] text-muted-foreground">Nhiều</span>
        </div>
      </div>

      {/* Quick Actions Grid */}
      <div>
        <h2 className="text-sm font-semibold mb-3">Luyện tập nhanh</h2>
        <div className="grid grid-cols-4 gap-3">
          {quickActions.map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-card border hover:shadow-md hover:-translate-y-0.5 transition-all"
            >
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center`}>
                <action.icon className="w-5 h-5 text-white" />
              </div>
              <span className="text-[11px] font-medium text-center leading-tight">{action.label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Continue Learning + Daily Goals */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="p-5 rounded-2xl bg-card border shadow-sm">
          <h2 className="font-semibold mb-3">Tiếp tục học</h2>
          {data?.enrollments && data.enrollments.length > 0 ? (
            <div className="space-y-2">
              {data.enrollments.map((enrollment: any) => (
                <Link key={enrollment.id} href="/languages" className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted transition-colors">
                  <span className="text-2xl">{enrollment.language?.flag}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{enrollment.language?.name}</p>
                    <p className="text-xs text-muted-foreground">{enrollment.level?.name}</p>
                  </div>
                  <svg className="w-4 h-4 text-muted-foreground shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-6">
              <p className="text-muted-foreground text-sm mb-3">Bạn chưa đăng ký ngôn ngữ nào.</p>
              <Link href="/languages"><Button size="sm">Chọn ngôn ngữ</Button></Link>
            </div>
          )}
        </div>

        <div className="p-5 rounded-2xl bg-card border shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold">Mục tiêu hôm nay</h2>
            <Link href="/daily-goals" className="text-xs text-primary hover:underline">Chỉnh sửa</Link>
          </div>
          <div className="space-y-3">
            <GoalItem icon="📖" label="Bài học" current={goal?.lessonsCompleted || 0} target={goal?.lessonsTarget || 3} color="bg-green-500" />
            <GoalItem icon="🃏" label="Flashcard" current={goal?.cardsReviewed || 0} target={goal?.cardsTarget || 10} color="bg-blue-500" />
            <GoalItem icon="⏱️" label="Thời gian" current={goal?.minutesStudied || 0} target={goal?.targetMinutes || 10} color="bg-purple-500" suffix="phút" />
          </div>
        </div>
      </div>
    </div>
  );
}

function GoalItem({ icon, label, current, target, color, suffix }: { icon: string; label: string; current: number; target: number; color: string; suffix?: string }) {
  const pct = Math.min((current / target) * 100, 100);
  return (
    <div className="flex items-center gap-3">
      <span className="text-lg">{icon}</span>
      <div className="flex-1">
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs font-medium">{label}</span>
          <span className="text-xs text-muted-foreground">{current}/{target}{suffix ? ` ${suffix}` : ''}</span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div className={`h-full ${color} rounded-full transition-all duration-500`} style={{ width: `${pct}%` }} />
        </div>
      </div>
    </div>
  );
}
