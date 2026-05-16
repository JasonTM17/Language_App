'use client';

import { useState } from 'react';

interface WeeklyData {
  day: string;
  xp: number;
  lessons: number;
  minutes: number;
}

interface LanguageProgress {
  language: string;
  flag: string;
  wordsLearned: number;
  totalWords: number;
  lessonsCompleted: number;
  totalLessons: number;
  accuracy: number;
  streak: number;
}

const weeklyData: WeeklyData[] = [
  { day: 'T2', xp: 45, lessons: 3, minutes: 15 },
  { day: 'T3', xp: 60, lessons: 4, minutes: 22 },
  { day: 'T4', xp: 30, lessons: 2, minutes: 12 },
  { day: 'T5', xp: 75, lessons: 5, minutes: 28 },
  { day: 'T6', xp: 50, lessons: 3, minutes: 18 },
  { day: 'T7', xp: 90, lessons: 6, minutes: 35 },
  { day: 'CN', xp: 40, lessons: 2, minutes: 14 },
];

const languageProgress: LanguageProgress[] = [
  { language: 'English', flag: '🇬🇧', wordsLearned: 156, totalWords: 500, lessonsCompleted: 18, totalLessons: 50, accuracy: 78, streak: 12 },
  { language: 'Japanese', flag: '🇯🇵', wordsLearned: 84, totalWords: 400, lessonsCompleted: 10, totalLessons: 40, accuracy: 72, streak: 5 },
  { language: 'Chinese', flag: '🇨🇳', wordsLearned: 62, totalWords: 400, lessonsCompleted: 7, totalLessons: 40, accuracy: 68, streak: 3 },
  { language: 'Korean', flag: '🇰🇷', wordsLearned: 45, totalWords: 350, lessonsCompleted: 5, totalLessons: 35, accuracy: 75, streak: 2 },
];

function BarChart({ data, maxValue }: { data: WeeklyData[]; maxValue: number }) {
  return (
    <div className="flex items-end justify-between gap-2 h-32">
      {data.map((d, i) => (
        <div key={i} className="flex flex-col items-center gap-1 flex-1">
          <span className="text-xs text-muted-foreground">{d.xp}</span>
          <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-t-md relative" style={{ height: '100%' }}>
            <div
              className="absolute bottom-0 w-full bg-primary rounded-t-md transition-all"
              style={{ height: `${(d.xp / maxValue) * 100}%` }}
            />
          </div>
          <span className="text-xs text-muted-foreground">{d.day}</span>
        </div>
      ))}
    </div>
  );
}

function CircularProgress({ value, max, size = 80, label }: { value: number; max: number; size?: number; label: string }) {
  const pct = Math.round((value / max) * 100);
  const radius = (size - 8) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (pct / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-1">
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="currentColor" strokeWidth="6" className="text-gray-100 dark:text-gray-700" />
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="currentColor" strokeWidth="6" strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" className="text-primary" />
      </svg>
      <span className="text-lg font-bold -mt-14">{pct}%</span>
      <span className="text-xs text-muted-foreground mt-6">{label}</span>
    </div>
  );
}

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState<'week' | 'month'>('week');

  const totalXP = weeklyData.reduce((sum, d) => sum + d.xp, 0);
  const totalLessons = weeklyData.reduce((sum, d) => sum + d.lessons, 0);
  const totalMinutes = weeklyData.reduce((sum, d) => sum + d.minutes, 0);
  const maxXP = Math.max(...weeklyData.map(d => d.xp));

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-display">Phân tích tiến độ</h1>
        <p className="text-muted-foreground mt-1">Theo dõi quá trình học tập của bạn</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-card border border text-center">
          <p className="text-2xl font-bold text-primary">{totalXP}</p>
          <p className="text-xs text-muted-foreground">XP tuần này</p>
        </div>
        <div className="p-4 rounded-xl bg-card border border text-center">
          <p className="text-2xl font-bold text-green-600">{totalLessons}</p>
          <p className="text-xs text-muted-foreground">Bài học</p>
        </div>
        <div className="p-4 rounded-xl bg-card border border text-center">
          <p className="text-2xl font-bold text-blue-600">{totalMinutes}</p>
          <p className="text-xs text-muted-foreground">Phút học</p>
        </div>
        <div className="p-4 rounded-xl bg-card border border text-center">
          <p className="text-2xl font-bold text-orange-600">12</p>
          <p className="text-xs text-muted-foreground">Ngày streak</p>
        </div>
      </div>

      {/* XP Chart */}
      <div className="p-6 rounded-2xl bg-card border border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">XP hàng ngày</h3>
          <div className="flex gap-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-0.5">
            <button
              onClick={() => setTimeRange('week')}
              className={`px-3 py-1 text-xs rounded-md transition-all ${timeRange === 'week' ? 'bg-white dark:bg-gray-600 shadow-sm font-medium' : ''}`}
            >
              Tuần
            </button>
            <button
              onClick={() => setTimeRange('month')}
              className={`px-3 py-1 text-xs rounded-md transition-all ${timeRange === 'month' ? 'bg-white dark:bg-gray-600 shadow-sm font-medium' : ''}`}
            >
              Tháng
            </button>
          </div>
        </div>
        <BarChart data={weeklyData} maxValue={maxXP} />
      </div>

      {/* Language progress */}
      <div className="space-y-4">
        <h3 className="font-semibold">Tiến độ theo ngôn ngữ</h3>
        {languageProgress.map((lang) => (
          <div key={lang.language} className="p-4 rounded-xl bg-card border border">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-xl">{lang.flag}</span>
                <span className="font-medium">{lang.language}</span>
              </div>
              <span className="text-xs text-muted-foreground">Streak: {lang.streak} ngày</span>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <div className="flex justify-between text-xs text-muted-foreground mb-1">
                  <span>Từ vựng</span>
                  <span>{lang.wordsLearned}/{lang.totalWords}</span>
                </div>
                <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 rounded-full" style={{ width: `${(lang.wordsLearned / lang.totalWords) * 100}%` }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs text-muted-foreground mb-1">
                  <span>Bài học</span>
                  <span>{lang.lessonsCompleted}/{lang.totalLessons}</span>
                </div>
                <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: `${(lang.lessonsCompleted / lang.totalLessons) * 100}%` }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs text-muted-foreground mb-1">
                  <span>Chính xác</span>
                  <span>{lang.accuracy}%</span>
                </div>
                <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-500 rounded-full" style={{ width: `${lang.accuracy}%` }} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Weak areas */}
      <div className="p-6 rounded-2xl bg-card border border">
        <h3 className="font-semibold mb-4">Điểm yếu cần cải thiện</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 rounded-lg bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30">
            <div className="flex items-center gap-2">
              <span className="text-red-500">!</span>
              <span className="text-sm">Ngữ pháp thì quá khứ (English)</span>
            </div>
            <span className="text-xs text-red-600">45% chính xác</span>
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg bg-orange-50 dark:bg-orange-900/10 border border-orange-100 dark:border-orange-900/30">
            <div className="flex items-center gap-2">
              <span className="text-orange-500">!</span>
              <span className="text-sm">Kanji N4 (Japanese)</span>
            </div>
            <span className="text-xs text-orange-600">52% chính xác</span>
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-100 dark:border-yellow-900/30">
            <div className="flex items-center gap-2">
              <span className="text-yellow-600">!</span>
              <span className="text-sm">Thanh điệu (Chinese)</span>
            </div>
            <span className="text-xs text-yellow-700">58% chính xác</span>
          </div>
        </div>
      </div>
    </div>
  );
}
