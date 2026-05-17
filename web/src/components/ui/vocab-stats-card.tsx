'use client';

import { useMemo } from 'react';

interface VocabStats {
  totalWords: number;
  mastered: number;
  learning: number;
  newWords: number;
  dueToday: number;
  averageEaseFactor: number;
  reviewsToday: number;
  accuracy7Days: number;
}

interface VocabStatsCardProps {
  stats: VocabStats;
  language: string;
  languageFlag: string;
}

export function VocabStatsCard({ stats, language, languageFlag }: VocabStatsCardProps) {
  const masteryPercent = useMemo(() => {
    const total = Number(stats.totalWords) || 0;
    const mastered = Number(stats.mastered) || 0;
    if (total <= 0) return 0;
    return Math.round((mastered / total) * 100);
  }, [stats.mastered, stats.totalWords]);

  const strengthLabel = useMemo(() => {
    if (stats.averageEaseFactor >= 2.8) return { text: 'Xuất sắc', color: 'text-green-600' };
    if (stats.averageEaseFactor >= 2.3) return { text: 'Tốt', color: 'text-blue-600' };
    if (stats.averageEaseFactor >= 1.8) return { text: 'Trung bình', color: 'text-yellow-600' };
    return { text: 'Cần ôn tập', color: 'text-red-600' };
  }, [stats.averageEaseFactor]);

  return (
    <div className="rounded-xl border bg-card p-5 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl">{languageFlag}</span>
          <h3 className="font-semibold text-foreground">{language}</h3>
        </div>
        <span className={`text-sm font-medium ${strengthLabel.color}`}>
          {strengthLabel.text}
        </span>
      </div>

      {/* Mastery progress bar */}
      <div>
        <div className="flex justify-between text-xs text-muted-foreground mb-1">
          <span>Tiến độ từ vựng</span>
          <span>{stats.mastered}/{stats.totalWords} từ ({masteryPercent}%)</span>
        </div>
        <div className="h-3 bg-muted rounded-full overflow-hidden">
          <div className="h-full flex">
            <div
              className="bg-green-500 transition-all"
              style={{ width: `${(stats.mastered / Math.max(stats.totalWords, 1)) * 100}%` }}
            />
            <div
              className="bg-blue-400 transition-all"
              style={{ width: `${(stats.learning / Math.max(stats.totalWords, 1)) * 100}%` }}
            />
            <div
              className="bg-gray-300 dark:bg-gray-600 transition-all"
              style={{ width: `${(stats.newWords / Math.max(stats.totalWords, 1)) * 100}%` }}
            />
          </div>
        </div>
        <div className="flex gap-3 mt-1.5 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-green-500" /> Thuộc
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-blue-400" /> Đang học
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-600" /> Mới
          </span>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-3">
        <div className="p-3 rounded-lg bg-orange-50 dark:bg-orange-900/10">
          <p className="text-lg font-bold text-orange-600">{Number(stats.dueToday) || 0}</p>
          <p className="text-xs text-muted-foreground">Cần ôn hôm nay</p>
        </div>
        <div className="p-3 rounded-lg bg-green-50 dark:bg-green-900/10">
          <p className="text-lg font-bold text-green-600">{Number(stats.accuracy7Days) || 0}%</p>
          <p className="text-xs text-muted-foreground">Chính xác 7 ngày</p>
        </div>
        <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/10">
          <p className="text-lg font-bold text-blue-600">{Number(stats.reviewsToday) || 0}</p>
          <p className="text-xs text-muted-foreground">Đã ôn hôm nay</p>
        </div>
        <div className="p-3 rounded-lg bg-purple-50 dark:bg-purple-900/10">
          <p className="text-lg font-bold text-purple-600">{Number.isFinite(stats.averageEaseFactor) ? stats.averageEaseFactor.toFixed(1) : '0.0'}</p>
          <p className="text-xs text-muted-foreground">Ease Factor TB</p>
        </div>
      </div>
    </div>
  );
}
