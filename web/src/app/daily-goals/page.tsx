'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface DailyQuest {
  id: string;
  title: string;
  description: string;
  xpReward: number;
  gemsReward: number;
  progress: number;
  target: number;
  completed: boolean;
  type: 'daily' | 'weekly' | 'challenge';
}

const dailyQuests: DailyQuest[] = [
  { id: '1', title: 'Học 3 bài', description: 'Hoàn thành 3 bài học bất kỳ', xpReward: 30, gemsReward: 5, progress: 2, target: 3, completed: false, type: 'daily' },
  { id: '2', title: 'Ôn 10 từ vựng', description: 'Ôn tập 10 từ bằng flashcard', xpReward: 20, gemsReward: 3, progress: 10, target: 10, completed: true, type: 'daily' },
  { id: '3', title: 'Quiz không sai', description: 'Hoàn thành 1 quiz với 100% chính xác', xpReward: 50, gemsReward: 10, progress: 0, target: 1, completed: false, type: 'daily' },
  { id: '4', title: 'Luyện nghe', description: 'Hoàn thành 2 bài nghe', xpReward: 25, gemsReward: 4, progress: 1, target: 2, completed: false, type: 'daily' },
  { id: '5', title: 'Streak 7 ngày', description: 'Duy trì streak 7 ngày liên tiếp', xpReward: 100, gemsReward: 20, progress: 5, target: 7, completed: false, type: 'weekly' },
  { id: '6', title: 'Học 20 từ mới', description: 'Học 20 từ vựng mới trong tuần', xpReward: 80, gemsReward: 15, progress: 12, target: 20, completed: false, type: 'weekly' },
  { id: '7', title: 'Hoàn thành 15 bài', description: 'Hoàn thành 15 bài học trong tuần', xpReward: 120, gemsReward: 25, progress: 8, target: 15, completed: false, type: 'weekly' },
  { id: '8', title: 'Speed Master', description: 'Đạt combo 10x trong Speed Quiz', xpReward: 75, gemsReward: 15, progress: 0, target: 1, completed: false, type: 'challenge' },
  { id: '9', title: 'Polyglot', description: 'Học ít nhất 2 ngôn ngữ trong ngày', xpReward: 40, gemsReward: 8, progress: 1, target: 2, completed: false, type: 'challenge' },
];

export default function DailyGoalsPage() {
  const [activeTab, setActiveTab] = useState<'daily' | 'weekly' | 'challenge'>('daily');

  const filteredQuests = dailyQuests.filter(q => q.type === activeTab);
  const completedCount = filteredQuests.filter(q => q.completed).length;
  const totalXP = filteredQuests.filter(q => q.completed).reduce((sum, q) => sum + q.xpReward, 0);

  const dailyGoalXP = 100;
  const currentXP = 65;
  const goalProgress = dailyGoalXP > 0 ? Math.min((currentXP / dailyGoalXP) * 100, 100) : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-3xl mx-auto space-y-6"
    >
      <div>
        <h1 className="text-2xl font-bold font-display">Mục tiêu hàng ngày</h1>
        <p className="text-muted-foreground mt-1">Hoàn thành nhiệm vụ để nhận XP và gems</p>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="p-6 rounded-2xl bg-gradient-to-r from-primary to-purple-600 text-white shadow-lg shadow-primary/20"
      >
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-sm opacity-80">Mục tiêu XP hôm nay</p>
            <p className="text-2xl font-bold">{currentXP} / {dailyGoalXP} XP</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
        </div>
        <div className="h-3 bg-white/20 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-white rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${goalProgress}%` }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </div>
        <p className="text-xs mt-2 opacity-80">Còn {dailyGoalXP - currentXP} XP nữa để đạt mục tiêu</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="flex gap-1 bg-muted/60 backdrop-blur-sm rounded-xl p-1.5 border border-border/40"
      >
        {[
          { key: 'daily' as const, label: 'Hàng ngày' },
          { key: 'weekly' as const, label: 'Hàng tuần' },
          { key: 'challenge' as const, label: 'Thử thách' },
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === tab.key
                ? 'bg-white dark:bg-gray-800 shadow-sm border border-border/50 text-primary'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <span>{tab.label}</span>
          </button>
        ))}
      </motion.div>

      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">Hoàn thành: {completedCount}/{filteredQuests.length}</span>
        <span className="text-green-600 font-medium">+{totalXP} XP đã nhận</span>
      </div>

      <div className="space-y-3">
        {filteredQuests.map((quest, index) => {
          const safeTarget = Number(quest.target) || 0;
          const safeProgress = Number(quest.progress) || 0;
          const progress = safeTarget > 0 ? Math.min((safeProgress / safeTarget) * 100, 100) : 0;
          return (
            <motion.div
              key={quest.id}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: Math.min(index * 0.05, 0.3) }}
              className={`p-4 rounded-xl border-2 transition-all backdrop-blur-sm ${
                quest.completed
                  ? 'border-green-200/60 dark:border-green-800/40 bg-gradient-to-br from-green-50 to-emerald-50/50 dark:from-green-900/10 dark:to-emerald-900/10'
                  : 'border-border/60 bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-900/80 dark:to-gray-800/50 hover:shadow-md hover:shadow-purple-500/5 hover:border-primary/20'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold ${
                  quest.completed
                    ? 'bg-green-100 dark:bg-green-900/30 text-green-600'
                    : 'bg-primary/10 text-primary'
                }`}>
                  {quest.completed ? '✓' : index + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className={`font-medium text-sm ${quest.completed ? 'line-through text-muted-foreground' : ''}`}>
                      {quest.title}
                    </h3>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">{quest.description}</p>

                  <div className="mt-2">
                    <div className="flex justify-between text-xs text-muted-foreground mb-1">
                      <span>{quest.progress}/{quest.target}</span>
                      <span>{Math.round(progress)}%</span>
                    </div>
                    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full rounded-full ${quest.completed ? 'bg-green-400' : 'bg-primary'}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.5, delay: 0.3 + index * 0.05 }}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-1 text-xs">
                  <span className="text-primary font-medium">+{quest.xpReward} XP</span>
                  <span className="text-purple-600 font-medium">+{quest.gemsReward} gems</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="p-4 rounded-xl bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/10 dark:to-pink-900/10 border border-purple-100/60 dark:border-purple-900/30"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
            <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
            </svg>
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium">Bonus hoàn thành tất cả</p>
            <p className="text-xs text-muted-foreground">Hoàn thành tất cả nhiệm vụ {activeTab === 'daily' ? 'hôm nay' : 'tuần này'} để nhận thưởng bonus</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-bold text-purple-600">+50 gems</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
