'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { api } from '@/services/api';
import { useAuthStore } from '@/lib/store';

interface LeaderboardEntry {
  rank: number;
  id: string;
  name: string;
  avatar?: string;
  xp: number;
  level: number;
  streak: number;
}

export default function LeaderboardPage() {
  const { user } = useAuthStore();
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [userRank, setUserRank] = useState<LeaderboardEntry | null>(null);
  const [period, setPeriod] = useState('alltime');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.leaderboard.get(period)
      .then((data) => {
        setLeaderboard(data.leaderboard);
        setUserRank(data.userRank);
      })
      .catch(() => {
        setLeaderboard([]);
      })
      .finally(() => setLoading(false));
  }, [period]);

  const periods = [
    { value: 'weekly', label: 'Tuần này' },
    { value: 'monthly', label: 'Tháng này' },
    { value: 'alltime', label: 'Tất cả' },
  ];

  const getRankStyle = (rank: number) => {
    if (rank === 1) return 'bg-gradient-to-r from-yellow-400 to-amber-500 text-white shadow-sm shadow-yellow-500/30';
    if (rank === 2) return 'bg-gradient-to-r from-gray-300 to-gray-400 text-white shadow-sm shadow-gray-400/30';
    if (rank === 3) return 'bg-gradient-to-r from-orange-400 to-orange-500 text-white shadow-sm shadow-orange-500/30';
    return 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300';
  };

  const getRankIcon = (rank: number) => {
    if (rank === 1) return '1';
    if (rank === 2) return '2';
    if (rank === 3) return '3';
    return `${rank}`;
  };

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-8 w-48 bg-muted rounded-lg" />
        {[...Array(10)].map((_, i) => <div key={i} className="h-16 bg-muted rounded-xl" />)}
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
      <div>
        <h1 className="text-2xl font-bold font-display">Bảng xếp hạng</h1>
        <p className="text-muted-foreground text-sm mt-0.5">Thi đua cùng cộng đồng học viên</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex gap-2 p-1.5 bg-muted/60 backdrop-blur-sm rounded-xl border border-border/40"
      >
        {periods.map((p) => (
          <button
            key={p.value}
            onClick={() => setPeriod(p.value)}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
              period === p.value
                ? 'bg-white dark:bg-gray-800 shadow-sm text-primary border border-border/50'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {p.label}
          </button>
        ))}
      </motion.div>

      {userRank && (
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="p-4 rounded-2xl bg-gradient-to-br from-primary/5 to-purple-500/5 border-2 border-primary/20 backdrop-blur-sm"
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-primary-foreground font-bold shadow-lg shadow-primary/20">
              {userRank.rank}
            </div>
            <div className="flex-1">
              <p className="font-semibold">{userRank.name} (Bạn)</p>
              <p className="text-sm text-muted-foreground">Level {userRank.level} • {userRank.xp} XP</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-orange-600">{userRank.streak} ngày streak</p>
            </div>
          </div>
        </motion.div>
      )}

      <div className="space-y-2">
        {leaderboard.map((entry, index) => (
          <motion.div
            key={entry.id}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: Math.min(index * 0.04, 0.4) }}
            className={`flex items-center gap-4 p-4 rounded-xl transition-all ${
              entry.id === user?.id
                ? 'bg-gradient-to-br from-primary/5 to-purple-500/5 border border-primary/20'
                : 'bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-900/80 dark:to-gray-800/50 border border-border/60 hover:shadow-md hover:shadow-purple-500/5 hover:border-primary/20'
            } backdrop-blur-sm`}
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${getRankStyle(entry.rank)}`}>
              {getRankIcon(entry.rank)}
            </div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-primary-foreground font-bold text-sm">
              {entry.name.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">{entry.name}</p>
              <p className="text-xs text-muted-foreground">Level {entry.level}</p>
            </div>
            <div className="text-right">
              <p className="font-semibold text-primary">{entry.xp.toLocaleString()} XP</p>
              <p className="text-xs text-muted-foreground">{entry.streak} ngày</p>
            </div>
          </motion.div>
        ))}
      </div>

      {leaderboard.length === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-16"
        >
          <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-yellow-500/10 to-amber-500/10 flex items-center justify-center">
            <svg className="w-10 h-10 text-yellow-500/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 4h2a2 2 0 012 2v1a4 4 0 01-4 4M8 4H6a2 2 0 00-2 2v1a4 4 0 004 4m0 0v6m4-6v6m-4 0h4m-2-6a4 4 0 100-8 4 4 0 000 8z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold mb-2">Chưa có dữ liệu</h3>
          <p className="text-muted-foreground">Hãy bắt đầu học để lên bảng xếp hạng!</p>
        </motion.div>
      )}
    </motion.div>
  );
}
