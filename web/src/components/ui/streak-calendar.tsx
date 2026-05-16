'use client';

import { useMemo } from 'react';

interface StreakDay {
  date: string;
  completed: boolean;
  xpEarned: number;
}

interface StreakCalendarProps {
  data: StreakDay[];
  currentStreak: number;
  longestStreak: number;
}

export function StreakCalendar({ data, currentStreak, longestStreak }: StreakCalendarProps) {
  const today = new Date();
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1).getDay();

  const dayNames = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
  const monthNames = [
    'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
    'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12',
  ];

  const completedDates = useMemo(() => {
    const set = new Set<string>();
    data.forEach(d => { if (d.completed) set.add(d.date); });
    return set;
  }, [data]);

  const formatDate = (day: number) => {
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const d = String(day).padStart(2, '0');
    return `${today.getFullYear()}-${month}-${d}`;
  };

  const isToday = (day: number) => day === today.getDate();

  return (
    <div className="rounded-xl border bg-card p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-foreground">
          {monthNames[today.getMonth()]} {today.getFullYear()}
        </h3>
        <div className="flex gap-3 text-sm">
          <span className="flex items-center gap-1">
            <span className="text-orange-500">🔥</span>
            <span className="font-medium">{currentStreak} ngày</span>
          </span>
          <span className="text-muted-foreground">
            Dài nhất: {longestStreak}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {dayNames.map(name => (
          <div key={name} className="text-center text-xs text-muted-foreground font-medium py-1">
            {name}
          </div>
        ))}

        {Array.from({ length: firstDayOfMonth }, (_, i) => (
          <div key={`empty-${i}`} />
        ))}

        {Array.from({ length: daysInMonth }, (_, i) => {
          const day = i + 1;
          const dateStr = formatDate(day);
          const completed = completedDates.has(dateStr);
          const isFuture = day > today.getDate();

          return (
            <div
              key={day}
              className={`
                relative flex items-center justify-center h-8 w-8 mx-auto rounded-full text-xs font-medium transition-colors
                ${completed ? 'bg-green-500 text-white' : ''}
                ${isToday(day) && !completed ? 'ring-2 ring-primary text-primary' : ''}
                ${!completed && !isToday(day) && !isFuture ? 'text-muted-foreground' : ''}
                ${isFuture ? 'text-muted-foreground/40' : ''}
              `}
            >
              {day}
              {completed && (
                <span className="absolute -top-1 -right-1 text-[10px]">✓</span>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <span className="h-3 w-3 rounded-full bg-green-500" /> Đã học
        </span>
        <span className="flex items-center gap-1">
          <span className="h-3 w-3 rounded-full ring-2 ring-primary" /> Hôm nay
        </span>
        <span className="flex items-center gap-1">
          <span className="h-3 w-3 rounded-full bg-muted" /> Chưa học
        </span>
      </div>
    </div>
  );
}
