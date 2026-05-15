import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  const adminPassword = await bcrypt.hash('admin123', 12);
  const userPassword = await bcrypt.hash('user123', 12);

  await prisma.user.createMany({
    data: [
      { email: 'admin@linguaflow.app', password: adminPassword, name: 'Admin', role: 'admin', xp: 500, level: 5, streak: 30 },
      { email: 'user@linguaflow.app', password: userPassword, name: 'Nguyen Van A', role: 'user', xp: 120, level: 2, streak: 7 },
    ],
  });

  const english = await prisma.language.create({
    data: { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧', description: 'Learn English for communication, TOEIC, and career growth' },
  });
  const japanese = await prisma.language.create({
    data: { code: 'ja', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵', description: 'Learn Japanese for JLPT, anime, and working in Japan' },
  });
  const chinese = await prisma.language.create({
    data: { code: 'zh', name: 'Chinese', nativeName: '中文', flag: '🇨🇳', description: 'Learn Chinese for HSK, business, and travel' },
  });
  const korean = await prisma.language.create({
    data: { code: 'ko', name: 'Korean', nativeName: '한국어', flag: '🇰🇷', description: 'Learn Korean for TOPIK, K-culture, and study abroad' },
  });

  const levels = ['Beginner', 'Elementary', 'Intermediate', 'Advanced'];
  const languages = [english, japanese, chinese, korean];

  for (const lang of languages) {
    for (let i = 0; i < levels.length; i++) {
      await prisma.level.create({
        data: { name: levels[i], slug: levels[i].toLowerCase(), order: i + 1, languageId: lang.id },
      });
    }
  }

  const enBeginner = await prisma.level.findFirst({ where: { languageId: english.id, slug: 'beginner' } });
  const jaBeginner = await prisma.level.findFirst({ where: { languageId: japanese.id, slug: 'beginner' } });
  const zhBeginner = await prisma.level.findFirst({ where: { languageId: chinese.id, slug: 'beginner' } });
  const koBeginner = await prisma.level.findFirst({ where: { languageId: korean.id, slug: 'beginner' } });

  // English lessons
  const enLesson1 = await prisma.lesson.create({
    data: { title: 'Greetings & Introductions', description: 'Learn basic greetings and how to introduce yourself', order: 1, levelId: enBeginner!.id, type: 'vocabulary', content: '{}', xpReward: 15 },
  });
  const enLesson2 = await prisma.lesson.create({
    data: { title: 'Daily Conversation', description: 'Common phrases for everyday situations', order: 2, levelId: enBeginner!.id, type: 'vocabulary', content: '{}', xpReward: 15 },
  });
  const enLesson3 = await prisma.lesson.create({
    data: { title: 'Basic Grammar: Present Tense', description: 'Learn to form sentences in present tense', order: 3, levelId: enBeginner!.id, type: 'grammar', content: '{}', xpReward: 20 },
  });

  // English vocabulary
  await prisma.vocabulary.createMany({
    data: [
      { word: 'Hello', meaning: 'Xin chào', example: 'Hello, how are you?', exampleMeaning: 'Xin chào, bạn khỏe không?', lessonId: enLesson1.id },
      { word: 'Goodbye', meaning: 'Tạm biệt', example: 'Goodbye, see you tomorrow!', exampleMeaning: 'Tạm biệt, hẹn gặp lại ngày mai!', lessonId: enLesson1.id },
      { word: 'Thank you', meaning: 'Cảm ơn', example: 'Thank you for your help.', exampleMeaning: 'Cảm ơn bạn đã giúp đỡ.', lessonId: enLesson1.id },
      { word: 'Please', meaning: 'Làm ơn', example: 'Please sit down.', exampleMeaning: 'Làm ơn ngồi xuống.', lessonId: enLesson1.id },
      { word: 'Sorry', meaning: 'Xin lỗi', example: 'Sorry, I am late.', exampleMeaning: 'Xin lỗi, tôi đến muộn.', lessonId: enLesson1.id },
      { word: 'Good morning', meaning: 'Chào buổi sáng', example: 'Good morning, teacher!', exampleMeaning: 'Chào buổi sáng, thầy/cô!', lessonId: enLesson1.id },
      { word: 'How are you?', meaning: 'Bạn khỏe không?', example: 'Hi! How are you today?', exampleMeaning: 'Chào! Hôm nay bạn khỏe không?', lessonId: enLesson1.id },
      { word: 'Nice to meet you', meaning: 'Rất vui được gặp bạn', example: 'Nice to meet you, I am Lan.', exampleMeaning: 'Rất vui được gặp bạn, tôi là Lan.', lessonId: enLesson1.id },
      { word: 'What is your name?', meaning: 'Tên bạn là gì?', example: 'What is your name? My name is Minh.', exampleMeaning: 'Tên bạn là gì? Tên tôi là Minh.', lessonId: enLesson1.id },
      { word: 'I am fine', meaning: 'Tôi khỏe', example: 'I am fine, thank you.', exampleMeaning: 'Tôi khỏe, cảm ơn bạn.', lessonId: enLesson1.id },
    ],
  });

  // English quizzes
  await prisma.quiz.createMany({
    data: [
      { question: 'What does "Hello" mean in Vietnamese?', type: 'multiple_choice', options: JSON.stringify(['Tạm biệt', 'Xin chào', 'Cảm ơn', 'Xin lỗi']), answer: 'Xin chào', explanation: '"Hello" is a common greeting meaning "Xin chào"', lessonId: enLesson1.id },
      { question: 'Fill in: "_____, how are you?"', type: 'fill_blank', options: JSON.stringify([]), answer: 'Hello', explanation: 'We use "Hello" to greet someone', lessonId: enLesson1.id },
      { question: 'Match: "Thank you" = ?', type: 'matching', options: JSON.stringify(['Xin lỗi', 'Cảm ơn', 'Tạm biệt', 'Làm ơn']), answer: 'Cảm ơn', explanation: '"Thank you" means "Cảm ơn" - used to express gratitude', lessonId: enLesson1.id },
      { question: 'Which is the correct greeting for morning?', type: 'multiple_choice', options: JSON.stringify(['Good night', 'Good morning', 'Good evening', 'Goodbye']), answer: 'Good morning', explanation: '"Good morning" is used to greet in the morning', lessonId: enLesson1.id },
      { question: 'Arrange: "you / are / How / ?"', type: 'arrange', options: JSON.stringify(['you', 'are', 'How', '?']), answer: 'How are you ?', explanation: 'The correct order is "How are you?"', lessonId: enLesson1.id },
    ],
  });

  // Japanese lessons
  const jaLesson1 = await prisma.lesson.create({
    data: { title: 'あいさつ (Greetings)', description: 'Basic Japanese greetings for daily life', order: 1, levelId: jaBeginner!.id, type: 'vocabulary', content: '{}', xpReward: 15 },
  });
  await prisma.lesson.create({
    data: { title: 'じこしょうかい (Self Introduction)', description: 'How to introduce yourself in Japanese', order: 2, levelId: jaBeginner!.id, type: 'vocabulary', content: '{}', xpReward: 15 },
  });
  await prisma.lesson.create({
    data: { title: 'すうじ (Numbers)', description: 'Learn numbers 1-100 in Japanese', order: 3, levelId: jaBeginner!.id, type: 'vocabulary', content: '{}', xpReward: 20 },
  });

  await prisma.vocabulary.createMany({
    data: [
      { word: 'こんにちは', reading: 'konnichiwa', meaning: 'Xin chào (buổi chiều)', example: 'こんにちは、元気ですか？', exampleMeaning: 'Xin chào, bạn khỏe không?', lessonId: jaLesson1.id },
      { word: 'おはようございます', reading: 'ohayou gozaimasu', meaning: 'Chào buổi sáng', example: 'おはようございます、先生！', exampleMeaning: 'Chào buổi sáng, thầy/cô!', lessonId: jaLesson1.id },
      { word: 'ありがとう', reading: 'arigatou', meaning: 'Cảm ơn', example: 'ありがとうございます。', exampleMeaning: 'Cảm ơn rất nhiều.', lessonId: jaLesson1.id },
      { word: 'すみません', reading: 'sumimasen', meaning: 'Xin lỗi / Xin phép', example: 'すみません、トイレはどこですか？', exampleMeaning: 'Xin lỗi, nhà vệ sinh ở đâu?', lessonId: jaLesson1.id },
      { word: 'さようなら', reading: 'sayounara', meaning: 'Tạm biệt', example: 'さようなら、また明日！', exampleMeaning: 'Tạm biệt, hẹn gặp lại ngày mai!', lessonId: jaLesson1.id },
      { word: 'はじめまして', reading: 'hajimemashite', meaning: 'Rất vui được gặp bạn', example: 'はじめまして、田中です。', exampleMeaning: 'Rất vui được gặp bạn, tôi là Tanaka.', lessonId: jaLesson1.id },
      { word: 'お元気ですか', reading: 'ogenki desu ka', meaning: 'Bạn khỏe không?', example: 'お元気ですか？元気です。', exampleMeaning: 'Bạn khỏe không? Tôi khỏe.', lessonId: jaLesson1.id },
      { word: 'いただきます', reading: 'itadakimasu', meaning: 'Xin mời (trước khi ăn)', example: 'いただきます！おいしそう。', exampleMeaning: 'Xin mời! Trông ngon quá.', lessonId: jaLesson1.id },
      { word: 'おやすみなさい', reading: 'oyasuminasai', meaning: 'Chúc ngủ ngon', example: 'おやすみなさい、いい夢を。', exampleMeaning: 'Chúc ngủ ngon, mơ đẹp nhé.', lessonId: jaLesson1.id },
      { word: 'よろしくお願いします', reading: 'yoroshiku onegaishimasu', meaning: 'Mong được giúp đỡ', example: 'よろしくお願いします。', exampleMeaning: 'Mong được giúp đỡ / Rất hân hạnh.', lessonId: jaLesson1.id },
    ],
  });

  // Japanese quizzes
  await prisma.quiz.createMany({
    data: [
      { question: '"こんにちは" nghĩa là gì?', type: 'multiple_choice', options: JSON.stringify(['Tạm biệt', 'Xin chào', 'Cảm ơn', 'Xin lỗi']), answer: 'Xin chào', explanation: 'こんにちは (konnichiwa) là lời chào phổ biến nhất trong tiếng Nhật', lessonId: jaLesson1.id },
      { question: 'Cách đọc của "ありがとう" là gì?', type: 'multiple_choice', options: JSON.stringify(['sumimasen', 'arigatou', 'sayounara', 'ohayou']), answer: 'arigatou', explanation: 'ありがとう đọc là "arigatou", nghĩa là cảm ơn', lessonId: jaLesson1.id },
      { question: 'Điền vào chỗ trống: "_____ございます" (Chào buổi sáng)', type: 'fill_blank', options: JSON.stringify([]), answer: 'おはよう', explanation: 'おはようございます (ohayou gozaimasu) là cách chào buổi sáng lịch sự', lessonId: jaLesson1.id },
      { question: 'Ghép nghĩa: "さようなら" = ?', type: 'matching', options: JSON.stringify(['Xin chào', 'Tạm biệt', 'Cảm ơn', 'Xin lỗi']), answer: 'Tạm biệt', explanation: 'さようなら (sayounara) nghĩa là tạm biệt', lessonId: jaLesson1.id },
      { question: 'Câu nào dùng trước khi ăn?', type: 'multiple_choice', options: JSON.stringify(['いただきます', 'さようなら', 'すみません', 'おやすみなさい']), answer: 'いただきます', explanation: 'いただきます (itadakimasu) nói trước khi ăn, thể hiện sự biết ơn', lessonId: jaLesson1.id },
    ],
  });

  // Chinese lessons
  const zhLesson1 = await prisma.lesson.create({
    data: { title: '问候 (Greetings)', description: 'Basic Chinese greetings', order: 1, levelId: zhBeginner!.id, type: 'vocabulary', content: '{}', xpReward: 15 },
  });
  await prisma.lesson.create({
    data: { title: '自我介绍 (Self Introduction)', description: 'Introduce yourself in Chinese', order: 2, levelId: zhBeginner!.id, type: 'vocabulary', content: '{}', xpReward: 15 },
  });
  await prisma.lesson.create({
    data: { title: '数字 (Numbers)', description: 'Learn numbers in Chinese', order: 3, levelId: zhBeginner!.id, type: 'vocabulary', content: '{}', xpReward: 20 },
  });

  await prisma.vocabulary.createMany({
    data: [
      { word: '你好', reading: 'nǐ hǎo', meaning: 'Xin chào', example: '你好，你叫什么名字？', exampleMeaning: 'Xin chào, bạn tên gì?', lessonId: zhLesson1.id },
      { word: '谢谢', reading: 'xiè xie', meaning: 'Cảm ơn', example: '谢谢你的帮助。', exampleMeaning: 'Cảm ơn bạn đã giúp đỡ.', lessonId: zhLesson1.id },
      { word: '对不起', reading: 'duì bu qǐ', meaning: 'Xin lỗi', example: '对不起，我迟到了。', exampleMeaning: 'Xin lỗi, tôi đến muộn.', lessonId: zhLesson1.id },
      { word: '再见', reading: 'zài jiàn', meaning: 'Tạm biệt', example: '再见，明天见！', exampleMeaning: 'Tạm biệt, ngày mai gặp!', lessonId: zhLesson1.id },
      { word: '早上好', reading: 'zǎo shang hǎo', meaning: 'Chào buổi sáng', example: '早上好，老师！', exampleMeaning: 'Chào buổi sáng, thầy/cô!', lessonId: zhLesson1.id },
      { word: '请', reading: 'qǐng', meaning: 'Xin mời / Làm ơn', example: '请坐。', exampleMeaning: 'Xin mời ngồi.', lessonId: zhLesson1.id },
      { word: '不客气', reading: 'bú kè qi', meaning: 'Không có gì', example: '不客气，这是应该的。', exampleMeaning: 'Không có gì, đó là điều nên làm.', lessonId: zhLesson1.id },
      { word: '你好吗', reading: 'nǐ hǎo ma', meaning: 'Bạn khỏe không?', example: '你好吗？我很好。', exampleMeaning: 'Bạn khỏe không? Tôi rất khỏe.', lessonId: zhLesson1.id },
      { word: '认识你很高兴', reading: 'rèn shi nǐ hěn gāo xìng', meaning: 'Rất vui được gặp bạn', example: '认识你很高兴！', exampleMeaning: 'Rất vui được gặp bạn!', lessonId: zhLesson1.id },
      { word: '晚安', reading: 'wǎn ān', meaning: 'Chúc ngủ ngon', example: '晚安，做个好梦。', exampleMeaning: 'Chúc ngủ ngon, mơ đẹp nhé.', lessonId: zhLesson1.id },
    ],
  });

  // Chinese quizzes
  await prisma.quiz.createMany({
    data: [
      { question: '"你好" nghĩa là gì?', type: 'multiple_choice', options: JSON.stringify(['Tạm biệt', 'Xin chào', 'Cảm ơn', 'Xin lỗi']), answer: 'Xin chào', explanation: '你好 (nǐ hǎo) là lời chào cơ bản nhất trong tiếng Trung', lessonId: zhLesson1.id },
      { question: 'Pinyin của "谢谢" là gì?', type: 'multiple_choice', options: JSON.stringify(['nǐ hǎo', 'xiè xie', 'zài jiàn', 'duì bu qǐ']), answer: 'xiè xie', explanation: '谢谢 đọc là "xiè xie", nghĩa là cảm ơn', lessonId: zhLesson1.id },
      { question: 'Điền vào: "_____, 我迟到了" (Xin lỗi, tôi đến muộn)', type: 'fill_blank', options: JSON.stringify([]), answer: '对不起', explanation: '对不起 (duì bu qǐ) nghĩa là xin lỗi', lessonId: zhLesson1.id },
      { question: 'Ghép nghĩa: "再见" = ?', type: 'matching', options: JSON.stringify(['Xin chào', 'Tạm biệt', 'Cảm ơn', 'Chúc ngủ ngon']), answer: 'Tạm biệt', explanation: '再见 (zài jiàn) nghĩa là tạm biệt, tái kiến', lessonId: zhLesson1.id },
      { question: '"不客气" dùng khi nào?', type: 'multiple_choice', options: JSON.stringify(['Khi chào hỏi', 'Khi đáp lại lời cảm ơn', 'Khi xin lỗi', 'Khi tạm biệt']), answer: 'Khi đáp lại lời cảm ơn', explanation: '不客气 (bú kè qi) nghĩa là "không có gì", dùng đáp lại khi ai đó cảm ơn', lessonId: zhLesson1.id },
    ],
  });

  // Korean lessons
  const koLesson1 = await prisma.lesson.create({
    data: { title: '인사 (Greetings)', description: 'Basic Korean greetings', order: 1, levelId: koBeginner!.id, type: 'vocabulary', content: '{}', xpReward: 15 },
  });
  await prisma.lesson.create({
    data: { title: '자기소개 (Self Introduction)', description: 'Introduce yourself in Korean', order: 2, levelId: koBeginner!.id, type: 'vocabulary', content: '{}', xpReward: 15 },
  });
  await prisma.lesson.create({
    data: { title: '숫자 (Numbers)', description: 'Learn numbers in Korean', order: 3, levelId: koBeginner!.id, type: 'vocabulary', content: '{}', xpReward: 20 },
  });

  await prisma.vocabulary.createMany({
    data: [
      { word: '안녕하세요', reading: 'annyeonghaseyo', meaning: 'Xin chào', example: '안녕하세요, 만나서 반갑습니다.', exampleMeaning: 'Xin chào, rất vui được gặp bạn.', lessonId: koLesson1.id },
      { word: '감사합니다', reading: 'gamsahamnida', meaning: 'Cảm ơn', example: '도와주셔서 감사합니다.', exampleMeaning: 'Cảm ơn bạn đã giúp đỡ.', lessonId: koLesson1.id },
      { word: '죄송합니다', reading: 'joesonghamnida', meaning: 'Xin lỗi', example: '죄송합니다, 늦었습니다.', exampleMeaning: 'Xin lỗi, tôi đến muộn.', lessonId: koLesson1.id },
      { word: '안녕히 가세요', reading: 'annyeonghi gaseyo', meaning: 'Tạm biệt (người đi)', example: '안녕히 가세요! 내일 봐요.', exampleMeaning: 'Tạm biệt! Ngày mai gặp nhé.', lessonId: koLesson1.id },
      { word: '좋은 아침이에요', reading: 'joeun achimieyo', meaning: 'Chào buổi sáng', example: '좋은 아침이에요, 선생님!', exampleMeaning: 'Chào buổi sáng, thầy/cô!', lessonId: koLesson1.id },
      { word: '이름이 뭐예요?', reading: 'ireumi mwoyeyo?', meaning: 'Tên bạn là gì?', example: '이름이 뭐예요? 저는 민수예요.', exampleMeaning: 'Tên bạn là gì? Tôi là Minsu.', lessonId: koLesson1.id },
      { word: '잘 지내세요?', reading: 'jal jinaeseyo?', meaning: 'Bạn khỏe không?', example: '잘 지내세요? 네, 잘 지내요.', exampleMeaning: 'Bạn khỏe không? Vâng, tôi khỏe.', lessonId: koLesson1.id },
      { word: '만나서 반갑습니다', reading: 'mannaseo bangapseumnida', meaning: 'Rất vui được gặp bạn', example: '만나서 반갑습니다!', exampleMeaning: 'Rất vui được gặp bạn!', lessonId: koLesson1.id },
      { word: '잘 자요', reading: 'jal jayo', meaning: 'Chúc ngủ ngon', example: '잘 자요, 좋은 꿈 꿔요.', exampleMeaning: 'Chúc ngủ ngon, mơ đẹp nhé.', lessonId: koLesson1.id },
      { word: '네 / 아니요', reading: 'ne / aniyo', meaning: 'Vâng / Không', example: '네, 맞아요. 아니요, 괜찮아요.', exampleMeaning: 'Vâng, đúng rồi. Không, không sao.', lessonId: koLesson1.id },
    ],
  });

  // Korean quizzes
  await prisma.quiz.createMany({
    data: [
      { question: '"안녕하세요" nghĩa là gì?', type: 'multiple_choice', options: JSON.stringify(['Tạm biệt', 'Xin chào', 'Cảm ơn', 'Xin lỗi']), answer: 'Xin chào', explanation: '안녕하세요 (annyeonghaseyo) là lời chào phổ biến nhất trong tiếng Hàn', lessonId: koLesson1.id },
      { question: 'Cách đọc của "감사합니다" là gì?', type: 'multiple_choice', options: JSON.stringify(['annyeonghaseyo', 'gamsahamnida', 'joesonghamnida', 'annyeonghi gaseyo']), answer: 'gamsahamnida', explanation: '감사합니다 đọc là "gamsahamnida", nghĩa là cảm ơn (trang trọng)', lessonId: koLesson1.id },
      { question: 'Điền vào: "_____, 늦었습니다" (Xin lỗi, tôi đến muộn)', type: 'fill_blank', options: JSON.stringify([]), answer: '죄송합니다', explanation: '죄송합니다 (joesonghamnida) là cách xin lỗi trang trọng', lessonId: koLesson1.id },
      { question: 'Ghép nghĩa: "잘 자요" = ?', type: 'matching', options: JSON.stringify(['Xin chào', 'Tạm biệt', 'Chúc ngủ ngon', 'Cảm ơn']), answer: 'Chúc ngủ ngon', explanation: '잘 자요 (jal jayo) nghĩa là chúc ngủ ngon', lessonId: koLesson1.id },
      { question: '"네" và "아니요" nghĩa là gì?', type: 'multiple_choice', options: JSON.stringify(['Xin chào / Tạm biệt', 'Vâng / Không', 'Cảm ơn / Xin lỗi', 'Đúng / Sai']), answer: 'Vâng / Không', explanation: '네 (ne) = vâng/đúng, 아니요 (aniyo) = không', lessonId: koLesson1.id },
    ],
  });

  console.log('Seed completed successfully!');
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
