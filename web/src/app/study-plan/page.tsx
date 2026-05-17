'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { api } from '@/services/api';

interface GoalHistory {
  id: string;
  date: string;
  targetMinutes: number;
  minutesStudied: number;
  lessonsTarget: number;
  lessonsCompleted: number;
  cardsTarget: number;
  cardsReviewed: number;
  completed: boolean;
}

export default function StudyPlanPage() {
  const [history, setHistory] = useState<GoalHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [targetMinutes, setTargetMinutes] = useState(10);
  const [lessonsTarget, setLessonsTarget] = useState(3);
  const [cardsTarget, setCardsTarget] = useState(10);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    Promise.all([
      api.goals.today().catch(() => ({ goal: null })),
      api.goals.history().catch(() => ({ goals: [], completedDays: 0, totalDays: 0 })),
    ]).then(([todayData, historyData]: [any, any]) => {
      if (todayData.goal) {
        setTargetMinutes(todayData.goal.targetMinutes);
        setLessonsTarget(todayData.goal.lessonsTarget);
        setCardsTarget(todayData.goal.cardsTarget);
      }
      setHistory(historyData.goals || []);
    }).finally(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await api.goals.update({ targetMinutes, lessonsTarget, cardsTarget });
    } catch {}
    setSaving(false);
  };

  const completedDays = history.filter((g) => g.completed).length;
  const totalDays = history.length;
  const completionRate = totalDays > 0 ? Math.round((completedDays / totalDays) * 100) : 0;

  const last7Days = history.slice(0, 7).reverse();

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-8 w-48 bg-muted rounded-lg" />
        <div className="h-48 bg-muted rounded-2xl" />
        <div className="h-64 bg-muted rounded-2xl" />
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold font-display">Kế hoạch học tập</h1>
        <p className="text-muted-foreground mt-1">Thiết lập mục tiêu và theo dõi tiến độ hàng ngày</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-3 gap-4">
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="p-5 rounded-2xl bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-900/80 dark:to-gray-800/50 border border-border/60 backdrop-blur-sm shadow-lg shadow-purple-500/5 text-center">
          <p className="text-3xl font-bold text-green-600 dark:text-green-400">{completedDays}</p>
          <p className="text-sm text-muted-foreground mt-1">Ngày hoàn thành</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="p-5 rounded-2xl bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-900/80 dark:to-gray-800/50 border border-border/60 backdrop-blur-sm shadow-lg shadow-purple-500/5 text-center">
          <p className="text-3xl font-bold text-primary dark:text-primary-400">{completionRate}%</p>
          <p className="text-sm text-muted-foreground mt-1">Tỷ lệ hoàn thành</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="p-5 rounded-2xl bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-900/80 dark:to-gray-800/50 border border-border/60 backdrop-blur-sm shadow-lg shadow-purple-500/5 text-center">
          <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">{totalDays}</p>
          <p className="text-sm text-muted-foreground mt-1">Tổng ngày học</p>
        </motion.div>
      </div>

      {/* Weekly Progress */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-900/80 dark:to-gray-800/50 border border-border/60 backdrop-blur-sm shadow-lg shadow-purple-500/5">
        <h2 className="font-semibold text-lg mb-4">7 ngày gần đây</h2>
        <div className="flex items-end justify-between gap-2 h-32">
          {last7Days.length > 0 ? last7Days.map((day, i) => {
            const pct = day.targetMinutes > 0 ? Math.min((day.minutesStudied / day.targetMinutes) * 100, 100) : 0;
            const date = new Date(day.date);
            const dayName = date.toLocaleDateString('vi-VN', { weekday: 'short' });
            return (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-lg relative" style={{ height: '80px' }}>
                  <div
                    className={`absolute bottom-0 w-full rounded-lg transition-all ${day.completed ? 'bg-green-500' : 'bg-primary-400'}`}
                    style={{ height: `${pct}%` }}
                  />
                </div>
                <span className="text-xs text-muted-foreground">{dayName}</span>
              </div>
            );
          }) : (
            <div className="flex-1 text-center text-muted-foreground py-8">
              Chưa có dữ liệu. Hãy bắt đầu học ngay!
            </div>
          )}
        </div>
      </div>

      {/* Goal Settings */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-900/80 dark:to-gray-800/50 border border-border/60 backdrop-blur-sm shadow-lg shadow-purple-500/5">
        <h2 className="font-semibold text-lg mb-4">Cài đặt mục tiêu hàng ngày</h2>
        <div className="space-y-6">
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium">Thời gian học (phút)</label>
              <span className="text-sm text-primary font-bold">{targetMinutes} phút</span>
            </div>
            <input
              type="range"
              min={5}
              max={120}
              step={5}
              value={targetMinutes}
              onChange={(e) => setTargetMinutes(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary-500"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>5 phút</span>
              <span>120 phút</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium">Số bài học</label>
              <span className="text-sm text-primary font-bold">{lessonsTarget} bài</span>
            </div>
            <input
              type="range"
              min={1}
              max={10}
              step={1}
              value={lessonsTarget}
              onChange={(e) => setLessonsTarget(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary-500"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>1 bài</span>
              <span>10 bài</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium">Flashcard ôn tập</label>
              <span className="text-sm text-primary font-bold">{cardsTarget} thẻ</span>
            </div>
            <input
              type="range"
              min={5}
              max={50}
              step={5}
              value={cardsTarget}
              onChange={(e) => setCardsTarget(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary-500"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>5 thẻ</span>
              <span>50 thẻ</span>
            </div>
          </div>

          <button
            onClick={handleSave}
            disabled={saving}
            className="w-full py-3 rounded-xl bg-primary hover:bg-primary-600 text-white font-medium transition-colors disabled:opacity-50"
          >
            {saving ? 'Đang lưu...' : 'Lưu mục tiêu'}
          </button>
        </div>
      </div>

      {/* Tips */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20 border border-primary-100 dark:border-primary-800">
        <h2 className="font-semibold text-lg mb-3">Mẹo học hiệu quả</h2>
        <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
          <li className="flex items-start gap-2">
            <span className="text-primary mt-0.5">•</span>
            <span>Học đều đặn mỗi ngày, dù chỉ 5-10 phút cũng tốt hơn học dồn.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-0.5">•</span>
            <span>Ôn tập flashcard vào buổi sáng khi trí nhớ còn tươi mới.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-0.5">•</span>
            <span>Sử dụng AI Tutor để luyện hội thoại thực tế.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-0.5">•</span>
            <span>Đặt mục tiêu vừa sức, tăng dần khi đã quen.</span>
          </li>
        </ul>
      </div>
    </motion.div>
  );
}
