'use client';

import { useState, useEffect } from 'react';

interface StreakCelebrationProps {
  streak: number;
  onDismiss: () => void;
}

const MILESTONES = [7, 14, 30, 60, 100, 365];

const MESSAGES: Record<number, { title: string; message: string; gems: number }> = {
  7: { title: '1 tuần liên tiếp!', message: 'Bạn đã duy trì streak 7 ngày. Tuyệt vời!', gems: 10 },
  14: { title: '2 tuần không nghỉ!', message: 'Sự kiên trì của bạn thật đáng ngưỡng mộ!', gems: 20 },
  30: { title: '1 tháng streak!', message: 'Bạn là người học tập chăm chỉ nhất! Tiếp tục phát huy!', gems: 50 },
  60: { title: '2 tháng liên tục!', message: 'Không gì có thể ngăn cản bạn! Bạn thật phi thường!', gems: 100 },
  100: { title: '100 ngày huyền thoại!', message: 'Bạn đã đạt được điều mà rất ít người làm được!', gems: 200 },
  365: { title: '1 năm không ngừng nghỉ!', message: 'Bạn là huyền thoại! Một năm học tập mỗi ngày!', gems: 500 },
};

export function StreakCelebration({ streak, onDismiss }: StreakCelebrationProps) {
  const [isVisible, setIsVisible] = useState(false);

  const milestone = MILESTONES.find(m => m === streak);
  const info = milestone ? MESSAGES[milestone] : null;

  useEffect(() => {
    if (info) {
      setIsVisible(true);
    }
  }, [info]);

  if (!info || !isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative mx-4 max-w-sm w-full p-6 rounded-3xl bg-gradient-to-b from-orange-50 to-amber-50 dark:from-orange-950 dark:to-amber-950 border border-orange-200 dark:border-orange-800 shadow-2xl animate-in zoom-in-95 duration-300">
        <div className="absolute -top-8 left-1/2 -translate-x-1/2">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center text-3xl shadow-lg animate-bounce">
            🔥
          </div>
        </div>

        <div className="text-center pt-8 space-y-3">
          <h2 className="text-2xl font-bold text-foreground">{info.title}</h2>
          <div className="flex items-center justify-center gap-1">
            <span className="text-4xl font-bold text-orange-500">{streak}</span>
            <span className="text-sm text-muted-foreground">ngày</span>
          </div>
          <p className="text-sm text-muted-foreground">{info.message}</p>

          <div className="flex justify-center gap-3 pt-2">
            <div className="px-3 py-1.5 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-sm font-medium">
              +{info.gems} 💎
            </div>
          </div>
        </div>

        <button
          onClick={() => { setIsVisible(false); onDismiss(); }}
          className="mt-6 w-full py-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold hover:from-orange-600 hover:to-amber-600 transition-all"
        >
          Tuyệt vời!
        </button>
      </div>
    </div>
  );
}
