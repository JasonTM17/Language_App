'use client';

import { useState, useEffect } from 'react';
import { api } from '@/services/api';

interface Quest {
  type: string;
  target: number;
  title: string;
  titleEn: string;
  xpReward: number;
  icon: string;
  current: number;
  completed: boolean;
}

interface QuestsData {
  quests: Quest[];
  totalXpEarned: number;
  allCompleted: boolean;
  bonusXp: number;
}

export default function QuestsPage() {
  const [data, setData] = useState<QuestsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadQuests();
  }, []);

  const loadQuests = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api'}/quests/today`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (res.ok) {
        setData(await res.json());
      } else {
        setData(getMockData());
      }
    } catch {
      setData(getMockData());
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto space-y-4">
        <div className="animate-pulse h-8 w-48 bg-muted rounded" />
        <div className="animate-pulse h-24 bg-muted rounded-2xl" />
        <div className="animate-pulse h-24 bg-muted rounded-2xl" />
        <div className="animate-pulse h-24 bg-muted rounded-2xl" />
      </div>
    );
  }

  const completedCount = data?.quests.filter(q => q.completed).length || 0;
  const totalQuests = data?.quests.length || 3;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-display">Nhiệm vụ hàng ngày</h1>
        <p className="text-muted-foreground mt-1">Hoàn thành nhiệm vụ để nhận XP bonus</p>
      </div>

      {/* Progress header */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-primary-500 to-accent-500 text-white">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-sm opacity-90">Tiến độ hôm nay</p>
            <p className="text-2xl font-bold">{completedCount} / {totalQuests}</p>
          </div>
          <div className="text-right">
            <p className="text-sm opacity-90">XP kiếm được</p>
            <p className="text-2xl font-bold">+{data?.totalXpEarned || 0}</p>
          </div>
        </div>
        <div className="h-2 bg-white/30 rounded-full overflow-hidden">
          <div
            className="h-full bg-white rounded-full transition-all duration-500"
            style={{ width: `${(completedCount / totalQuests) * 100}%` }}
          />
        </div>
        {data?.allCompleted && (
          <div className="mt-3 flex items-center gap-2 bg-white/20 rounded-lg px-3 py-2">
            <span>🎉</span>
            <span className="text-sm font-medium">Hoàn thành tất cả! Bonus +{data.bonusXp} XP</span>
          </div>
        )}
      </div>

      {/* Quest list */}
      <div className="space-y-3">
        {data?.quests.map((quest, i) => (
          <div
            key={i}
            className={`p-4 rounded-xl border transition-all ${
              quest.completed
                ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
                : 'bg-card border'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${
                quest.completed
                  ? 'bg-green-100 dark:bg-green-900/40'
                  : 'bg-gray-100 dark:bg-gray-700'
              }`}>
                {quest.completed ? '✓' : quest.icon}
              </div>
              <div className="flex-1">
                <p className={`font-medium text-sm ${quest.completed ? 'line-through text-muted-foreground' : ''}`}>
                  {quest.title}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex-1 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        quest.completed ? 'bg-green-500' : 'bg-primary'
                      }`}
                      style={{ width: `${(quest.current / quest.target) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground">{quest.current}/{quest.target}</span>
                </div>
              </div>
              <div className="text-right">
                <span className={`text-sm font-bold ${quest.completed ? 'text-green-600' : 'text-yellow-600'}`}>
                  +{quest.xpReward} XP
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Info */}
      <div className="p-4 rounded-xl bg-muted/50 border border-border">
        <p className="text-sm text-muted-foreground">
          Nhiệm vụ được làm mới mỗi ngày lúc 00:00. Hoàn thành tất cả để nhận thêm 30 XP bonus!
        </p>
      </div>
    </div>
  );
}

function getMockData(): QuestsData {
  return {
    quests: [
      { type: 'lessons', target: 2, title: 'Hoàn thành 2 bài học', titleEn: 'Complete 2 lessons', xpReward: 30, icon: '📖', current: 1, completed: false },
      { type: 'vocabulary', target: 15, title: 'Ôn 15 từ vựng', titleEn: 'Review 15 vocabulary words', xpReward: 20, icon: '📝', current: 15, completed: true },
      { type: 'streak', target: 1, title: 'Duy trì streak hôm nay', titleEn: 'Maintain streak today', xpReward: 10, icon: '🔥', current: 1, completed: true },
    ],
    totalXpEarned: 30,
    allCompleted: false,
    bonusXp: 0,
  };
}
