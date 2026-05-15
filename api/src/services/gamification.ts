import prisma from '../database/client';

const XP_PER_LEVEL = 100;

export async function awardXP(userId: string, xpAmount: number) {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) return;

  const newXP = user.xp + xpAmount;
  const newLevel = Math.floor(newXP / XP_PER_LEVEL) + 1;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const lastActive = user.lastActiveAt ? new Date(user.lastActiveAt) : null;
  let newStreak = user.streak;

  if (lastActive) {
    const lastDay = new Date(lastActive);
    lastDay.setHours(0, 0, 0, 0);
    const diffDays = Math.floor((today.getTime() - lastDay.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      newStreak += 1;
    } else if (diffDays > 1) {
      newStreak = 1;
    }
  } else {
    newStreak = 1;
  }

  await prisma.user.update({
    where: { id: userId },
    data: {
      xp: newXP,
      level: newLevel,
      streak: newStreak,
      lastActiveAt: new Date(),
    },
  });

  return { xp: newXP, level: newLevel, streak: newStreak, leveledUp: newLevel > user.level };
}
