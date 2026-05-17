'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

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
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-2xl mx-auto space-y-6"
    >
      <div>
        <h1 className="text-2xl font-bold font-display">Lịch học tập</h1>
        <p className="text-muted-foreground mt-1">Theo dõi streak và hoạt động hàng ngày</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { value: streakDays, label: 'Ngày đã học', color: 'text-orange-600', bg: 'from-orange-500/10 to-amber-500/10', border: 'border-orange-200/50 dark:border-orange-800/30' },
          { value: longestStreak, label: 'Streak dài nhất', color: 'text-red-600', bg: 'from-red-500/10 to-rose-500/10', border: 'border-red-200/50 dark:border-red-800/30' },
          { value: totalXp, label: 'XP tháng này', color: 'text-primary', bg: 'from-primary/10 to-purple-500/10', border: 'border-primary/20' },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.08 }}
            className={`p-4 rounded-2xl bg-gradient-to-br ${stat.bg} border ${stat.border} text-center backdrop-blur-sm`}
          >
            <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
            <p className="text-xs text-muted-foreground">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="p-6 rounded-2xl bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-900/80 dark:to-gray-800/50 border border-border/60 backdrop-blur-sm shadow-lg shadow-purple-500/5"
      >
        <div className="flex items-center justify-between mb-4">
          <button onClick={prevMonth} className="p-2 rounded-lg hover:bg-primary/5 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </button>
          <h2 className="font-semibold text-lg">{monthNames[month]} {year}</h2>
          <button onClick={nextMonth} className="p-2 rounded-lg hover:bg-primary/5 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1 mb-2">
          {dayNames.map(day => (
            <div key={day} className="text-center text-xs font-medium text-muted-foreground py-1">{day}</div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: firstDayOfWeek }).map((_, i) => (
            <div key={`empty-${i}`} className="aspect-square" />
          ))}
          {monthData.map((day) => {
            const isToday = day.date === today.getDate() && month === today.getMonth() && year === today.getFullYear();
            return (
              <motion.div
                key={day.date}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: day.date * 0.01 }}
                className={`aspect-square rounded-lg flex flex-col items-center justify-center text-sm transition-all hover:scale-105 ${
                  isToday
                    ? 'ring-2 ring-primary bg-primary/5'
                    : day.completed
                    ? 'bg-green-100 dark:bg-green-900/30'
                    : 'bg-muted/50'
                }`}
              >
                <span className={`text-xs font-medium ${day.completed ? 'text-green-700 dark:text-green-300' : 'text-muted-foreground'}`}>
                  {day.date}
                </span>
                {day.completed && <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-0.5" />}
              </motion.div>
            );
          })}
        </div>
      </motion.div>

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
          <div className="w-3 h-3 rounded ring-2 ring-primary bg-primary/5" />
          <span>Hôm nay</span>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="p-4 rounded-2xl bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/10 dark:to-amber-900/10 border border-orange-100/60 dark:border-orange-800/30 text-center"
      >
        <p className="text-lg font-bold text-orange-700 dark:text-orange-300">
          {streakDays >= 20 ? 'Xuất sắc! Bạn rất kiên trì!' :
           streakDays >= 10 ? 'Tuyệt vời! Tiếp tục phát huy!' :
           streakDays >= 5 ? 'Tốt lắm! Đừng bỏ cuộc!' :
           'Hãy bắt đầu xây dựng thói quen!'}
        </p>
      </motion.div>
    </motion.div>
  );
}
