import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { createLessonWithContent, seedAchievements, prisma } from './utils';
import { LANGUAGES } from './constants';
import { englishFoodLessons } from './english/beginner-food';
import { englishTravelLessons } from './english/beginner-travel';
import { englishFamilyLessons } from './english/beginner-family';
import { englishHobbiesLessons } from './english/beginner-hobbies';
import { englishGreetingsLessons } from './english/beginner-greetings';
import { englishNumbersLessons } from './english/beginner-numbers';
import { englishHealthLessons } from './english/beginner-health';
import { englishShoppingLessons } from './english/beginner-shopping';
import { englishWorkLessons } from './english/intermediate-work';
import { englishTravelIntermediateLessons } from './english/intermediate-travel';
import { englishEmotionsLessons } from './english/elementary-emotions';
import { japaneseFoodLessons } from './japanese/beginner-food';
import { japaneseTravelLessons } from './japanese/beginner-travel';
import { japaneseDailyLessons } from './japanese/beginner-daily';
import { japaneseGreetingsLessons } from './japanese/beginner-greetings';
import { koreanFoodLessons } from './korean/beginner-food';
import { koreanDailyLessons } from './korean/beginner-daily';
import { koreanFamilyLessons } from './korean/beginner-family';
import { koreanGreetingsLessons } from './korean/beginner-greetings';
import { chineseFoodLessons } from './chinese/beginner-food';
import { chineseShoppingLessons } from './chinese/beginner-shopping';
import { chineseDailyLessons } from './chinese/beginner-daily';
import { chineseGreetingsLessons } from './chinese/beginner-greetings';
import { chineseFamilyLessons } from './chinese/beginner-family';
import { englishTechnologyLessons } from './english/elementary-technology';
import { englishTransportLessons } from './english/elementary-transport';
import { japaneseNumbersLessons } from './japanese/beginner-numbers';
import { japaneseSchoolLessons } from './japanese/elementary-school';
import { koreanNumbersLessons } from './korean/beginner-numbers';
import { koreanShoppingLessons } from './korean/beginner-shopping';
import { koreanTravelLessons } from './korean/beginner-travel';
import { englishClothingLessons } from './english/beginner-clothing';
import { englishWeatherLessons } from './english/beginner-weather';
import { japaneseShoppingLessons } from './japanese/beginner-shopping';
import { chineseNumbersLessons } from './chinese/beginner-numbers';
import { chineseTravelLessons } from './chinese/beginner-travel';
import { japaneseFamilyLessons } from './japanese/beginner-family';

async function main() {
  console.log('🌱 Seeding database...\n');

  // Clear existing data
  await prisma.quizAttempt.deleteMany();
  await prisma.flashcardProgress.deleteMany();
  await prisma.lessonProgress.deleteMany();
  await prisma.quiz.deleteMany();
  await prisma.vocabulary.deleteMany();
  await prisma.lesson.deleteMany();
  await prisma.chatSession.deleteMany();
  await prisma.enrollment.deleteMany();
  await prisma.level.deleteMany();
  await prisma.language.deleteMany();
  await prisma.userAchievement.deleteMany();
  await prisma.achievement.deleteMany();
  await prisma.dailyGoal.deleteMany();
  await prisma.user.deleteMany();

  // Users
  const adminPassword = await bcrypt.hash('admin123', 12);
  const userPassword = await bcrypt.hash('user123', 12);

  const admin = await prisma.user.create({
    data: { email: 'admin@linguaflow.app', password: adminPassword, name: 'Admin', role: 'admin', xp: 2500, level: 25, streak: 60, onboardingCompleted: true },
  });
  const user1 = await prisma.user.create({
    data: { email: 'user@linguaflow.app', password: userPassword, name: 'Nguyễn Văn An', role: 'user', xp: 350, level: 4, streak: 12, onboardingCompleted: true },
  });
  const user2 = await prisma.user.create({
    data: { email: 'lan@linguaflow.app', password: userPassword, name: 'Trần Thị Lan', role: 'user', xp: 180, level: 2, streak: 5, onboardingCompleted: true },
  });
  const user3 = await prisma.user.create({
    data: { email: 'minh@linguaflow.app', password: userPassword, name: 'Lê Minh', role: 'user', xp: 720, level: 8, streak: 21, onboardingCompleted: true },
  });
  const user4 = await prisma.user.create({
    data: { email: 'hoa@linguaflow.app', password: userPassword, name: 'Phạm Thị Hoa', role: 'user', xp: 90, level: 1, streak: 2, onboardingCompleted: false },
  });

  console.log('✅ Users created (5)');

  // Languages
  const english = await prisma.language.create({ data: LANGUAGES.EN });
  const japanese = await prisma.language.create({ data: LANGUAGES.JA });
  const chinese = await prisma.language.create({ data: LANGUAGES.ZH });
  const korean = await prisma.language.create({ data: LANGUAGES.KO });

  console.log('✅ Languages created (4)');

  // Levels
  const levelNames = [
    { name: 'Beginner', slug: 'beginner' },
    { name: 'Elementary', slug: 'elementary' },
    { name: 'Intermediate', slug: 'intermediate' },
    { name: 'Advanced', slug: 'advanced' },
  ];

  const levels: Record<string, Record<string, string>> = {};
  for (const lang of [english, japanese, chinese, korean]) {
    levels[lang.code] = {};
    for (let i = 0; i < levelNames.length; i++) {
      const level = await prisma.level.create({
        data: { name: levelNames[i].name, slug: levelNames[i].slug, order: i + 1, languageId: lang.id },
      });
      levels[lang.code][levelNames[i].slug] = level.id;
    }
  }

  console.log('✅ Levels created (16)');

  // Seed lessons for each language
  let lessonCount = 0;
  let vocabCount = 0;
  let quizCount = 0;

  // English beginner lessons
  const enBeginnerLessons = [...englishFoodLessons, ...englishTravelLessons, ...englishFamilyLessons, ...englishHobbiesLessons, ...englishGreetingsLessons, ...englishNumbersLessons, ...englishHealthLessons, ...englishShoppingLessons, ...englishClothingLessons, ...englishWeatherLessons];
  for (let i = 0; i < enBeginnerLessons.length; i++) {
    const lesson = await createLessonWithContent(levels['en']['beginner'], i + 1, enBeginnerLessons[i]);
    lessonCount++;
    vocabCount += enBeginnerLessons[i].vocabulary.length;
    quizCount += enBeginnerLessons[i].quizzes.length;
  }

  // English intermediate lessons
  const enIntermediateLessons = [...englishWorkLessons, ...englishTravelIntermediateLessons];
  for (let i = 0; i < enIntermediateLessons.length; i++) {
    await createLessonWithContent(levels['en']['intermediate'], i + 1, enIntermediateLessons[i]);
    lessonCount++;
    vocabCount += enIntermediateLessons[i].vocabulary.length;
    quizCount += enIntermediateLessons[i].quizzes.length;
  }

  // Japanese beginner lessons
  const jaBeginnerLessons = [...japaneseFoodLessons, ...japaneseTravelLessons, ...japaneseDailyLessons, ...japaneseGreetingsLessons, ...japaneseNumbersLessons, ...japaneseShoppingLessons, ...japaneseFamilyLessons];
  for (let i = 0; i < jaBeginnerLessons.length; i++) {
    await createLessonWithContent(levels['ja']['beginner'], i + 1, jaBeginnerLessons[i]);
    lessonCount++;
    vocabCount += jaBeginnerLessons[i].vocabulary.length;
    quizCount += jaBeginnerLessons[i].quizzes.length;
  }

  // Chinese beginner lessons
  const zhBeginnerLessons = [...chineseFoodLessons, ...chineseShoppingLessons, ...chineseDailyLessons, ...chineseGreetingsLessons, ...chineseFamilyLessons, ...chineseNumbersLessons, ...chineseTravelLessons];
  for (let i = 0; i < zhBeginnerLessons.length; i++) {
    await createLessonWithContent(levels['zh']['beginner'], i + 1, zhBeginnerLessons[i]);
    lessonCount++;
    vocabCount += zhBeginnerLessons[i].vocabulary.length;
    quizCount += zhBeginnerLessons[i].quizzes.length;
  }

  // Korean beginner lessons
  const koBeginnerLessons = [...koreanFoodLessons, ...koreanDailyLessons, ...koreanFamilyLessons, ...koreanGreetingsLessons, ...koreanNumbersLessons, ...koreanShoppingLessons, ...koreanTravelLessons];
  for (let i = 0; i < koBeginnerLessons.length; i++) {
    await createLessonWithContent(levels['ko']['beginner'], i + 1, koBeginnerLessons[i]);
    lessonCount++;
    vocabCount += koBeginnerLessons[i].vocabulary.length;
    quizCount += koBeginnerLessons[i].quizzes.length;
  }

  // English elementary lessons
  const enElementaryLessons = [...englishTransportLessons, ...englishTechnologyLessons, ...englishEmotionsLessons];
  for (let i = 0; i < enElementaryLessons.length; i++) {
    await createLessonWithContent(levels['en']['elementary'], i + 1, enElementaryLessons[i]);
    lessonCount++;
    vocabCount += enElementaryLessons[i].vocabulary.length;
    quizCount += enElementaryLessons[i].quizzes.length;
  }

  // Japanese elementary lessons
  for (let i = 0; i < japaneseSchoolLessons.length; i++) {
    await createLessonWithContent(levels['ja']['elementary'], i + 1, japaneseSchoolLessons[i]);
    lessonCount++;
    vocabCount += japaneseSchoolLessons[i].vocabulary.length;
    quizCount += japaneseSchoolLessons[i].quizzes.length;
  }

  console.log(`✅ Lessons created (${lessonCount})`);
  console.log(`✅ Vocabulary created (${vocabCount})`);
  console.log(`✅ Quizzes created (${quizCount})`);

  // Achievements
  const achievementCount = await seedAchievements();
  console.log(`✅ Achievements created (${achievementCount})`);

  // Enrollments
  await prisma.enrollment.createMany({
    data: [
      { userId: user1.id, languageId: english.id, levelId: levels['en']['beginner'], goal: 'TOEIC 700+' },
      { userId: user1.id, languageId: japanese.id, levelId: levels['ja']['beginner'], goal: 'JLPT N4' },
      { userId: user2.id, languageId: korean.id, levelId: levels['ko']['beginner'], goal: 'K-drama without subtitles' },
      { userId: user3.id, languageId: english.id, levelId: levels['en']['intermediate'], goal: 'IELTS 7.0' },
      { userId: user3.id, languageId: chinese.id, levelId: levels['zh']['beginner'], goal: 'HSK 3' },
      { userId: user3.id, languageId: japanese.id, levelId: levels['ja']['beginner'], goal: 'Travel to Japan' },
      { userId: user4.id, languageId: english.id, levelId: levels['en']['beginner'], goal: 'Basic communication' },
    ],
  });

  console.log('✅ Enrollments created (7)');

  // Summary
  console.log('\n📊 Seed Summary:');
  console.log(`   Users: 5`);
  console.log(`   Languages: 4`);
  console.log(`   Levels: 16`);
  console.log(`   Lessons: ${lessonCount}`);
  console.log(`   Vocabulary: ${vocabCount}`);
  console.log(`   Quizzes: ${quizCount}`);
  console.log(`   Achievements: ${achievementCount}`);
  console.log(`   Enrollments: 7`);
  console.log('\n🎉 Seed completed successfully!');
}

main()
  .catch((e) => { console.error('❌ Seed failed:', e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
