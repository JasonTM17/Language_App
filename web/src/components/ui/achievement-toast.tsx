'use client';

import { useState, useEffect } from 'react';

interface AchievementToast {
  id: string;
  title: string;
  description: string;
  icon: string;
  xp?: number;
  gems?: number;
}

interface AchievementToastProps {
  achievement: AchievementToast | null;
  onDismiss: () => void;
  duration?: number;
}

export function AchievementToastNotification({ achievement, onDismiss, duration = 5000 }: AchievementToastProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    if (achievement) {
      setIsVisible(true);
      setIsLeaving(false);

      const timer = setTimeout(() => {
        setIsLeaving(true);
        setTimeout(() => {
          setIsVisible(false);
          onDismiss();
        }, 300);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [achievement, duration, onDismiss]);

  if (!isVisible || !achievement) return null;

  return (
    <div className="fixed top-4 right-4 z-50 max-w-sm w-full pointer-events-auto">
      <div
        className={`
          p-4 rounded-2xl bg-white dark:bg-gray-800 border border-yellow-200 dark:border-yellow-800
          shadow-lg shadow-yellow-100/50 dark:shadow-yellow-900/20
          transition-all duration-300
          ${isLeaving ? 'opacity-0 translate-x-4' : 'opacity-100 translate-x-0'}
        `}
      >
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 rounded-full bg-yellow-50 dark:bg-yellow-900/30 flex items-center justify-center text-2xl flex-shrink-0 animate-bounce">
            {achievement.icon}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-yellow-600 dark:text-yellow-400 uppercase tracking-wide">
              Thành tựu mới!
            </p>
            <p className="font-semibold text-foreground mt-0.5">{achievement.title}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{achievement.description}</p>
            {(achievement.xp || achievement.gems) && (
              <div className="flex gap-2 mt-2">
                {achievement.xp && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 font-medium">
                    +{achievement.xp} XP
                  </span>
                )}
                {achievement.gems && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 font-medium">
                    +{achievement.gems} 💎
                  </span>
                )}
              </div>
            )}
          </div>
          <button
            onClick={() => {
              setIsLeaving(true);
              setTimeout(() => { setIsVisible(false); onDismiss(); }, 300);
            }}
            className="text-gray-400 hover:text-gray-600 text-sm flex-shrink-0"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}
