'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-2xl mx-auto space-y-6"
    >
      <div>
        <h1 className="text-2xl font-bold font-display">Nhiệm vụ hàng ngày</h1>
        <p className="text-muted-foreground mt-1">Hoàn thành nhiệm vụ để nhận XP bonus</p>
      </div>

      {/* Progress header */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="p-5 rounded-2xl bg-gradient-to-r from-primary to-purple-600 text-white shadow-lg shadow-primary/20"
      >
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
          <motion.div
            className="h-full bg-white rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${(completedCount / totalQuests) * 100}%` }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </div>
        {data?.allCompleted && (
          <div className="mt-3 flex items-center gap-2 bg-white/20 rounded-lg px-3 py-2">
            <span className="font-bold">+{data.bonusXp} XP</span>
            <span className="text-sm font-medium">Bonus hoàn thành tất cả!</span>
          </div>
        )}
      </motion.div>

      {/* Quest list */}
      <div className="space-y-3">
        {data?.quests.map((quest, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: Math.min(i * 0.05, 0.3) }}
            className={`p-4 rounded-xl border transition-all backdrop-blur-sm ${
              quest.completed
                ? 'bg-gradient-to-br from-green-50 to-emerald-50/50 dark:from-green-900/10 dark:to-emerald-900/10 border-green-200/60 dark:border-green-800/40'
                : 'bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-900/80 dark:to-gray-800/50 border-border/60 hover:shadow-md hover:shadow-purple-500/5 hover:border-primary/20'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold ${
                quest.completed
                  ? 'bg-green-100 dark:bg-green-900/40 text-green-600'
                  : 'bg-primary/10 text-primary'
              }`}>
                {quest.completed ? '✓' : quest.icon}
              </div>
              <div className="flex-1">
                <p className={`font-medium text-sm ${quest.completed ? 'line-through text-muted-foreground' : ''}`}>
                  {quest.title}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full rounded-full ${quest.completed ? 'bg-green-500' : 'bg-primary'}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${(quest.current / quest.target) * 100}%` }}
                      transition={{ duration: 0.5, delay: 0.3 + i * 0.05 }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground">{quest.current}/{quest.target}</span>
                </div>
              </div>
              <div className="text-right">
                <span className={`text-sm font-bold ${quest.completed ? 'text-green-600' : 'text-primary'}`}>
                  +{quest.xpReward} XP
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Info */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="p-4 rounded-xl bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-900/80 dark:to-gray-800/50 border border-border/60 backdrop-blur-sm"
      >
        <p className="text-sm text-muted-foreground">
          Nhiệm vụ được làm mới mỗi ngày lúc 00:00. Hoàn thành tất cả để nhận thêm 30 XP bonus!
        </p>
      </motion.div>
    </motion.div>
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
