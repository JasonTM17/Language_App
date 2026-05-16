'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface DailyQuest {
  id: string;
  title: string;
  description: string;
  icon: string;
  xpReward: number;
  gemsReward: number;
  progress: number;
  target: number;
  completed: boolean;
  type: 'daily' | 'weekly' | 'challenge';
}

const dailyQuests: DailyQuest[] = [
  { id: '1', title: 'Học 3 bài', description: 'Hoàn thành 3 bài học bất kỳ', icon: '📚', xpReward: 30, gemsReward: 5, progress: 2, target: 3, completed: false, type: 'daily' },
  { id: '2', title: 'Ôn 10 từ vựng', description: 'Ôn tập 10 từ bằng flashcard', icon: '🃏', xpReward: 20, gemsReward: 3, progress: 10, target: 10, completed: true, type: 'daily' },
  { id: '3', title: 'Quiz không sai', description: 'Hoàn thành 1 quiz với 100% chính xác', icon: '🎯', xpReward: 50, gemsReward: 10, progress: 0, target: 1, completed: false, type: 'daily' },
  { id: '4', title: 'Luyện nghe', description: 'Hoàn thành 2 bài nghe', icon: '🎧', xpReward: 25, gemsReward: 4, progress: 1, target: 2, completed: false, type: 'daily' },
  { id: '5', title: 'Streak 7 ngày', description: 'Duy trì streak 7 ngày liên tiếp', icon: '🔥', xpReward: 100, gemsReward: 20, progress: 5, target: 7, completed: false, type: 'weekly' },
  { id: '6', title: 'Học 20 từ mới', description: 'Học 20 từ vựng mới trong tuần', icon: '📖', xpReward: 80, gemsReward: 15, progress: 12, target: 20, completed: false, type: 'weekly' },
  { id: '7', title: 'Hoàn thành 15 bài', description: 'Hoàn thành 15 bài học trong tuần', icon: '🏆', xpReward: 120, gemsReward: 25, progress: 8, target: 15, completed: false, type: 'weekly' },
  { id: '8', title: 'Speed Master', description: 'Đạt combo 10x trong Speed Quiz', icon: '⚡', xpReward: 75, gemsReward: 15, progress: 0, target: 1, completed: false, type: 'challenge' },
  { id: '9', title: 'Polyglot', description: 'Học ít nhất 2 ngôn ngữ trong ngày', icon: '🌍', xpReward: 40, gemsReward: 8, progress: 1, target: 2, completed: false, type: 'challenge' },
];

export default function DailyGoalsPage() {
  const [activeTab, setActiveTab] = useState<'daily' | 'weekly' | 'challenge'>('daily');

  const filteredQuests = dailyQuests.filter(q => q.type === activeTab);
  const completedCount = filteredQuests.filter(q => q.completed).length;
  const totalXP = filteredQuests.filter(q => q.completed).reduce((sum, q) => sum + q.xpReward, 0);

  const dailyGoalXP = 100;
  const currentXP = 65;
  const goalProgress = Math.min((currentXP / dailyGoalXP) * 100, 100);

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-display">Mục tiêu hàng ngày</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Hoàn thành nhiệm vụ để nhận XP và gems</p>
      </div>

      {/* Daily XP goal */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-primary-500 to-primary-600 text-white">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-sm opacity-80">Mục tiêu XP hôm nay</p>
            <p className="text-2xl font-bold">{currentXP} / {dailyGoalXP} XP</p>
          </div>
          <div className="text-4xl">🎯</div>
        </div>
        <div className="h-3 bg-white/20 rounded-full overflow-hidden">
          <div className="h-full bg-white rounded-full transition-all" style={{ width: `${goalProgress}%` }} />
        </div>
        <p className="text-xs mt-2 opacity-80">Còn {dailyGoalXP - currentXP} XP nữa để đạt mục tiêu</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 dark:bg-gray-800 rounded-xl p-1">
        {[
          { key: 'daily' as const, label: 'Hàng ngày', icon: '📅' },
          { key: 'weekly' as const, label: 'Hàng tuần', icon: '📆' },
          { key: 'challenge' as const, label: 'Thử thách', icon: '⚔️' },
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === tab.key
                ? 'bg-white dark:bg-gray-700 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Progress summary */}
      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-500">Hoàn thành: {completedCount}/{filteredQuests.length}</span>
        <span className="text-green-600 font-medium">+{totalXP} XP đã nhận</span>
      </div>

      {/* Quest list */}
      <div className="space-y-3">
        {filteredQuests.map((quest) => {
          const progress = Math.min((quest.progress / quest.target) * 100, 100);
          return (
            <div
              key={quest.id}
              className={`p-4 rounded-xl border-2 transition-all ${
                quest.completed
                  ? 'border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/10'
                  : 'border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="text-2xl">{quest.icon}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className={`font-medium text-sm ${quest.completed ? 'line-through text-gray-400' : ''}`}>
                      {quest.title}
                    </h3>
                    {quest.completed && <span className="text-green-500 text-xs">✓</span>}
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">{quest.description}</p>

                  {/* Progress bar */}
                  <div className="mt-2">
                    <div className="flex justify-between text-xs text-gray-400 mb-1">
                      <span>{quest.progress}/{quest.target}</span>
                      <span>{Math.round(progress)}%</span>
                    </div>
                    <div className="h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${quest.completed ? 'bg-green-400' : 'bg-primary-500'}`}
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Rewards */}
                <div className="flex flex-col items-end gap-1 text-xs">
                  <span className="flex items-center gap-1 text-yellow-600">
                    +{quest.xpReward} XP
                  </span>
                  <span className="flex items-center gap-1 text-purple-600">
                    +{quest.gemsReward} 💎
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bonus section */}
      <div className="p-4 rounded-xl bg-purple-50 dark:bg-purple-900/10 border border-purple-100 dark:border-purple-900/30">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🎁</span>
          <div className="flex-1">
            <p className="text-sm font-medium">Bonus hoàn thành tất cả</p>
            <p className="text-xs text-gray-500">Hoàn thành tất cả nhiệm vụ {activeTab === 'daily' ? 'hôm nay' : 'tuần này'} để nhận thưởng bonus</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-bold text-purple-600">+50 💎</p>
          </div>
        </div>
      </div>
    </div>
  );
}
