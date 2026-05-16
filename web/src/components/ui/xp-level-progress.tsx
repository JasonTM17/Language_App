'use client';

import { useMemo } from 'react';

interface XpLevelProgressProps {
  currentXp: number;
  level: number;
  streak: number;
}

const XP_PER_LEVEL = [
  0, 50, 120, 200, 300, 420, 560, 720, 900, 1100,
  1320, 1560, 1820, 2100, 2400, 2720, 3060, 3420, 3800, 4200,
  4620, 5060, 5520, 6000, 6500, 7020, 7560, 8120, 8700, 9300, 10000,
];

export function XpLevelProgress({ currentXp, level, streak }: XpLevelProgressProps) {
  const { xpForCurrentLevel, xpForNextLevel, progressPercent, xpNeeded } = useMemo(() => {
    const currentLevelXp = XP_PER_LEVEL[Math.min(level - 1, XP_PER_LEVEL.length - 1)] || 0;
    const nextLevelXp = XP_PER_LEVEL[Math.min(level, XP_PER_LEVEL.length - 1)] || currentLevelXp + 500;
    const xpInLevel = currentXp - currentLevelXp;
    const xpRange = nextLevelXp - currentLevelXp;
    const percent = xpRange > 0 ? Math.min(Math.round((xpInLevel / xpRange) * 100), 100) : 0;

    return {
      xpForCurrentLevel: currentLevelXp,
      xpForNextLevel: nextLevelXp,
      progressPercent: percent,
      xpNeeded: Math.max(nextLevelXp - currentXp, 0),
    };
  }, [currentXp, level]);

  const levelTitle = useMemo(() => {
    if (level >= 25) return 'Bậc thầy';
    if (level >= 20) return 'Chuyên gia';
    if (level >= 15) return 'Nâng cao';
    if (level >= 10) return 'Trung cấp';
    if (level >= 5) return 'Sơ cấp';
    return 'Người mới';
  }, [level]);

  return (
    <div className="rounded-xl border bg-card p-5 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
            <span className="text-lg font-bold text-primary">{level}</span>
          </div>
          <div>
            <p className="font-semibold text-foreground">{levelTitle}</p>
            <p className="text-xs text-muted-foreground">{currentXp.toLocaleString()} XP tổng cộng</p>
          </div>
        </div>
        {streak > 0 && (
          <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800">
            <span className="text-sm">🔥</span>
            <span className="text-sm font-bold text-orange-600">{streak}</span>
          </div>
        )}
      </div>

      {/* XP Progress bar */}
      <div>
        <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
          <span>Level {level}</span>
          <span>Level {level + 1}</span>
        </div>
        <div className="h-4 bg-muted rounded-full overflow-hidden relative">
          <div
            className="h-full bg-gradient-to-r from-primary to-primary/80 rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
          <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-foreground/70">
            {progressPercent}%
          </span>
        </div>
        <p className="text-xs text-muted-foreground mt-1.5 text-center">
          Còn <span className="font-medium text-primary">{xpNeeded} XP</span> để lên level tiếp theo
        </p>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-3 gap-2 pt-2 border-t border-border">
        <div className="text-center">
          <p className="text-sm font-bold text-foreground">{level}</p>
          <p className="text-[10px] text-muted-foreground">Level</p>
        </div>
        <div className="text-center">
          <p className="text-sm font-bold text-foreground">{currentXp.toLocaleString()}</p>
          <p className="text-[10px] text-muted-foreground">Tổng XP</p>
        </div>
        <div className="text-center">
          <p className="text-sm font-bold text-foreground">{streak}</p>
          <p className="text-[10px] text-muted-foreground">Streak</p>
        </div>
      </div>
    </div>
  );
}
