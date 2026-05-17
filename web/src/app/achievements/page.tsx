'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { api } from '@/services/api';
import { Trophy } from 'lucide-react';

interface Achievement {
  id: string;
  code: string;
  name: string;
  nameVi: string;
  description: string;
  descriptionVi: string;
  icon: string;
  category: string;
  xpReward: number;
  unlocked: boolean;
  unlockedAt: string | null;
}

export default function AchievementsPage() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    api.achievements.list()
      .then((data) => setAchievements(Array.isArray(data?.achievements) ? data.achievements : []))
      .catch(() => setAchievements([]))
      .finally(() => setLoading(false));
  }, []);

  const categories = ['all', ...new Set(achievements.map((a) => a.category))];
  const filtered = filter === 'all' ? achievements : achievements.filter((a) => a.category === filter);
  const unlockedCount = achievements.filter((a) => a.unlocked).length;

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-8 w-48 bg-muted rounded-lg" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => <div key={i} className="h-40 bg-muted rounded-2xl" />)}
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-8 pb-8"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-display">Thành tựu</h1>
          <p className="text-muted-foreground text-sm mt-0.5">
            Đã mở khóa {unlockedCount} / {achievements.length} thành tựu
          </p>
        </div>
        <div className="text-right">
          <p className="text-3xl font-bold text-primary">{unlockedCount}</p>
          <p className="text-xs text-muted-foreground">Thành tựu</p>
        </div>
      </div>

      {/* Progress bar */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="h-3 bg-muted rounded-full overflow-hidden origin-left"
      >
        <div
          className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full transition-all"
          style={{ width: `${achievements.length > 0 ? Math.min((unlockedCount / achievements.length) * 100, 100) : 0}%` }}
        />
      </motion.div>

      {/* Category filter */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.15 }}
        className="flex gap-2 overflow-x-auto pb-2"
      >
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
              filter === cat
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            {cat === 'all' ? 'Tất cả' : cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </motion.div>

      {/* Achievement grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filtered.length === 0 ? (
          <div className="col-span-full flex flex-col items-center justify-center py-16">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-500/20 to-orange-500/20 flex items-center justify-center mb-4">
              <Trophy className="w-8 h-8 text-yellow-500" />
            </div>
            <h3 className="text-lg font-semibold mb-1">Chưa có thành tựu</h3>
            <p className="text-sm text-muted-foreground">Hoàn thành bài học để mở khóa thành tựu.</p>
          </div>
        ) : (
          filtered.map((achievement, index) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: Math.min(index * 0.04, 0.4) }}
              className={`p-4 rounded-2xl border-2 text-center transition-all hover:shadow-md hover:shadow-purple-500/5 hover:border-primary/20 ${
                achievement.unlocked
                  ? 'border-yellow-300/60 dark:border-yellow-600/40 bg-gradient-to-br from-yellow-50 to-orange-50/50 dark:from-yellow-900/20 dark:to-orange-900/10 backdrop-blur-sm shadow-lg shadow-yellow-500/5'
                  : 'border-border/60 bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-900/80 dark:to-gray-800/50 backdrop-blur-sm opacity-60'
              }`}
            >
              <div className={`text-4xl mb-2 ${achievement.unlocked ? '' : 'grayscale'}`}>
                {achievement.icon}
              </div>
              <h3 className="font-semibold text-sm mb-1">{achievement.nameVi}</h3>
              <p className="text-xs text-muted-foreground mb-2">{achievement.descriptionVi}</p>
              <div className="flex items-center justify-center gap-1">
                <span className="text-xs font-medium text-yellow-600">+{achievement.xpReward} XP</span>
              </div>
              {achievement.unlocked && achievement.unlockedAt && (
                <p className="text-xs text-green-600 mt-1">
                  {new Date(achievement.unlockedAt).toLocaleDateString('vi-VN')}
                </p>
              )}
            </motion.div>
          ))
        )}
      </div>
    </motion.div>
  );
}
