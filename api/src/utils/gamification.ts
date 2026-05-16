export function calculateLevel(xp: number): number {
  return Math.floor(xp / 100) + 1;
}

export function xpForLevel(level: number): number {
  return (level - 1) * 100;
}

export function xpToNextLevel(xp: number): { current: number; needed: number; progress: number } {
  const currentLevel = calculateLevel(xp);
  const currentLevelXp = xpForLevel(currentLevel);
  const nextLevelXp = xpForLevel(currentLevel + 1);
  const progress = xp - currentLevelXp;
  const needed = nextLevelXp - currentLevelXp;

  return {
    current: progress,
    needed,
    progress: Math.round((progress / needed) * 100),
  };
}

export function calculateStreak(lastActivity: Date | null): { active: boolean; shouldReset: boolean } {
  if (!lastActivity) return { active: false, shouldReset: false };

  const now = new Date();
  const last = new Date(lastActivity);
  const diffHours = (now.getTime() - last.getTime()) / (1000 * 60 * 60);

  if (diffHours < 24) return { active: true, shouldReset: false };
  if (diffHours < 48) return { active: true, shouldReset: false };
  return { active: false, shouldReset: true };
}

export function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes} phút`;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (mins === 0) return `${hours} giờ`;
  return `${hours} giờ ${mins} phút`;
}

export function getDateRange(days: number): { start: Date; end: Date } {
  const end = new Date();
  const start = new Date();
  start.setDate(start.getDate() - days);
  start.setHours(0, 0, 0, 0);
  return { start, end };
}
