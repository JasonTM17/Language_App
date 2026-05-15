import { prisma } from '../database/client';

export async function checkAndAwardAchievements(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      achievements: true,
      enrollments: true,
      progress: { where: { completed: true } },
      quizAttempts: true,
      chatSessions: true,
      flashcardProgress: { where: { known: true } },
    },
  });

  if (!user) return [];

  const unlockedCodes = new Set(user.achievements.map((a) => a.achievementId));
  const allAchievements = await prisma.achievement.findMany();

  const stats = {
    lessons_completed: user.progress.length,
    streak: user.streak,
    vocab_learned: user.flashcardProgress.length,
    quiz_perfect: 0,
    quizzes_completed: user.quizAttempts.length,
    xp: user.xp,
    languages_enrolled: user.enrollments.length,
    chat_sessions: user.chatSessions.length,
    level: user.level,
    study_before_7am: 0,
    study_after_11pm: 0,
  };

  const now = new Date();
  const hour = now.getHours();
  if (hour < 7) stats.study_before_7am = 1;
  if (hour >= 23) stats.study_after_11pm = 1;

  const newlyUnlocked: Array<{ code: string; name: string; nameVi: string; icon: string; xpReward: number }> = [];

  for (const achievement of allAchievements) {
    if (unlockedCodes.has(achievement.id)) continue;

    const condition = achievement.condition;
    const match = condition.match(/^(\w+)\s*(>=|>|==|=)\s*(\d+)$/);
    if (!match) continue;

    const [, key, op, valueStr] = match;
    const value = parseInt(valueStr, 10);
    const stat = stats[key as keyof typeof stats] ?? 0;

    let met = false;
    if (op === '>=' || op === '>') met = stat >= value;
    else if (op === '==' || op === '=') met = stat === value;

    if (met) {
      await prisma.userAchievement.create({
        data: { userId, achievementId: achievement.id },
      });

      await prisma.user.update({
        where: { id: userId },
        data: { xp: { increment: achievement.xpReward } },
      });

      newlyUnlocked.push({
        code: achievement.code,
        name: achievement.name,
        nameVi: achievement.nameVi,
        icon: achievement.icon,
        xpReward: achievement.xpReward,
      });
    }
  }

  return newlyUnlocked;
}

export async function getUserAchievements(userId: string) {
  const userAchievements = await prisma.userAchievement.findMany({
    where: { userId },
    include: { achievement: true },
    orderBy: { unlockedAt: 'desc' },
  });

  const allAchievements = await prisma.achievement.findMany({
    orderBy: { category: 'asc' },
  });

  const unlockedIds = new Set(userAchievements.map((ua) => ua.achievementId));

  return allAchievements.map((a) => ({
    ...a,
    unlocked: unlockedIds.has(a.id),
    unlockedAt: userAchievements.find((ua) => ua.achievementId === a.id)?.unlockedAt || null,
  }));
}
