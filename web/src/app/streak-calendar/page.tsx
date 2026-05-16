'use client';

import { useState } from 'react';

interface DayData {
  date: number;
  completed: boolean;
  xp: number;
}

export default function StreakCalendarPage() {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const today = new Date();
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfWeek = new Date(year, month, 1).getDay();

  const generateMockData = (): DayData[] => {
    const data: DayData[] = [];
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      const isPast = date <= today;
      const completed = isPast && Math.random() > 0.25;
      data.push({
        date: i,
        completed,
        xp: completed ? Math.floor(Math.random() * 50) + 10 : 0,
      });
    }
    return data;
  };

  const [monthData] = useState<DayData[]>(generateMockData);

  const streakDays = monthData.filter(d => d.completed).length;
  const totalXp = monthData.reduce((sum, d) => sum + d.xp, 0);
  const longestStreak = (() => {
    let max = 0, current = 0;
    monthData.forEach(d => {
      if (d.completed) { current++; max = Math.max(max, current); }
      else { current = 0; }
    });
    return max;
  })();

  const prevMonth = () => setCurrentMonth(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentMonth(new Date(year, month + 1, 1));

  const monthNames = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
    'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'];
  const dayNames = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-display">Lịch học tập</h1>
        <p className="text-muted-foreground mt-1">Theo dõi streak và hoạt động hàng ngày</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 text-center">
          <p className="text-2xl font-bold text-orange-600">{streakDays}</p>
          <p className="text-xs text-muted-foreground">Ngày đã học</p>
        </div>
        <div className="p-4 rounded-2xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-center">
          <p className="text-2xl font-bold text-red-600">{longestStreak}</p>
          <p className="text-xs text-muted-foreground">Streak dài nhất</p>
        </div>
        <div className="p-4 rounded-2xl bg-primary/5 border border-primary/20 text-center">
          <p className="text-2xl font-bold text-primary">{totalXp}</p>
          <p className="text-xs text-muted-foreground">XP tháng này</p>
        </div>
      </div>

      {/* Calendar */}
      <div className="p-6 rounded-2xl bg-card border border">
        {/* Month navigation */}
        <div className="flex items-center justify-between mb-4">
          <button onClick={prevMonth} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">←</button>
          <h2 className="font-semibold text-lg">{monthNames[month]} {year}</h2>
          <button onClick={nextMonth} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">→</button>
        </div>

        {/* Day headers */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {dayNames.map(day => (
            <div key={day} className="text-center text-xs font-medium text-muted-foreground py-1">{day}</div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: firstDayOfWeek }).map((_, i) => (
            <div key={`empty-${i}`} className="aspect-square" />
          ))}
          {monthData.map((day) => {
            const isToday = day.date === today.getDate() && month === today.getMonth() && year === today.getFullYear();
            return (
              <div
                key={day.date}
                className={`aspect-square rounded-lg flex flex-col items-center justify-center text-sm transition-all ${
                  isToday
                    ? 'ring-2 ring-primary-500 bg-primary/5'
                    : day.completed
                    ? 'bg-green-100 dark:bg-green-900/30'
                    : 'bg-muted/50'
                }`}
              >
                <span className={`text-xs font-medium ${day.completed ? 'text-green-700 dark:text-green-300' : 'text-muted-foreground'}`}>
                  {day.date}
                </span>
                {day.completed && <span className="text-xs">🔥</span>}
              </div>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 justify-center text-xs text-muted-foreground">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-green-100 dark:bg-green-900/30 border border-green-300" />
          <span>Đã học</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-muted/50 border border-gray-200" />
          <span>Chưa học</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded ring-2 ring-primary-500 bg-primary-50" />
          <span>Hôm nay</span>
        </div>
      </div>

      {/* Motivation */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/10 dark:to-red-900/10 border border-orange-100 dark:border-orange-800 text-center">
        <p className="text-lg font-bold text-orange-700 dark:text-orange-300">
          {streakDays >= 20 ? '🏆 Xuất sắc! Bạn rất kiên trì!' :
           streakDays >= 10 ? '💪 Tuyệt vời! Tiếp tục phát huy!' :
           streakDays >= 5 ? '🔥 Tốt lắm! Đừng bỏ cuộc!' :
           '🌱 Hãy bắt đầu xây dựng thói quen!'}
        </p>
      </div>
    </div>
  );
}
