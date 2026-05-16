'use client';

import { useEffect, useState } from 'react';
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
    if (rank === 1) return 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-white';
    if (rank === 2) return 'bg-gradient-to-r from-gray-300 to-gray-400 text-white';
    if (rank === 3) return 'bg-gradient-to-r from-orange-400 to-orange-500 text-white';
    return 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300';
  };

  const getRankIcon = (rank: number) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return `#${rank}`;
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
    <div className="space-y-8 pb-8">
      <div>
        <h1 className="text-2xl font-bold font-display">Bảng xếp hạng</h1>
        <p className="text-muted-foreground text-sm mt-0.5">Thi đua cùng cộng đồng học viên</p>
      </div>

      {/* Period tabs */}
      <div className="flex gap-2 p-1 bg-muted rounded-xl">
        {periods.map((p) => (
          <button
            key={p.value}
            onClick={() => setPeriod(p.value)}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
              period === p.value
                ? 'bg-card shadow-sm text-primary'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* User's rank card */}
      {userRank && (
        <div className="p-4 rounded-2xl bg-primary/5 border-2 border-primary/20">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
              {userRank.rank}
            </div>
            <div className="flex-1">
              <p className="font-semibold">{userRank.name} (Bạn)</p>
              <p className="text-sm text-muted-foreground">Level {userRank.level} • {userRank.xp} XP</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-orange-600">🔥 {userRank.streak}</p>
            </div>
          </div>
        </div>
      )}

      {/* Leaderboard list */}
      <div className="space-y-2">
        {leaderboard.map((entry) => (
          <div
            key={entry.id}
            className={`flex items-center gap-4 p-4 rounded-xl transition-all ${
              entry.id === user?.id
                ? 'bg-primary/5 border border-primary/20'
                : 'bg-card border'
            }`}
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${getRankStyle(entry.rank)}`}>
              {entry.rank <= 3 ? getRankIcon(entry.rank) : entry.rank}
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
              <p className="text-xs text-muted-foreground">🔥 {entry.streak} ngày</p>
            </div>
          </div>
        ))}
      </div>

      {leaderboard.length === 0 && (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🏆</div>
          <h3 className="text-lg font-semibold mb-2">Chưa có dữ liệu</h3>
          <p className="text-muted-foreground">Hãy bắt đầu học để lên bảng xếp hạng!</p>
        </div>
      )}
    </div>
  );
}
