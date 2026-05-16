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

  // English lesson 2 vocabulary - Daily Conversation
  await prisma.vocabulary.createMany({
    data: [
      { word: 'How much is this?', meaning: 'Cái này bao nhiêu tiền?', example: 'How much is this shirt?', exampleMeaning: 'Cái áo này bao nhiêu tiền?', lessonId: enLesson2.id },
      { word: 'Where is...?', meaning: '... ở đâu?', example: 'Where is the bathroom?', exampleMeaning: 'Nhà vệ sinh ở đâu?', lessonId: enLesson2.id },
      { word: 'I would like...', meaning: 'Tôi muốn...', example: 'I would like a coffee, please.', exampleMeaning: 'Tôi muốn một ly cà phê, làm ơn.', lessonId: enLesson2.id },
      { word: 'Can you help me?', meaning: 'Bạn có thể giúp tôi không?', example: 'Excuse me, can you help me?', exampleMeaning: 'Xin lỗi, bạn có thể giúp tôi không?', lessonId: enLesson2.id },
      { word: 'I don\'t understand', meaning: 'Tôi không hiểu', example: 'Sorry, I don\'t understand. Can you repeat?', exampleMeaning: 'Xin lỗi, tôi không hiểu. Bạn có thể nhắc lại không?', lessonId: enLesson2.id },
      { word: 'What time is it?', meaning: 'Mấy giờ rồi?', example: 'Excuse me, what time is it?', exampleMeaning: 'Xin lỗi, mấy giờ rồi?', lessonId: enLesson2.id },
      { word: 'I need...', meaning: 'Tôi cần...', example: 'I need a taxi to the airport.', exampleMeaning: 'Tôi cần taxi đến sân bay.', lessonId: enLesson2.id },
      { word: 'How do I get to...?', meaning: 'Làm sao để đến...?', example: 'How do I get to the train station?', exampleMeaning: 'Làm sao để đến ga tàu?', lessonId: enLesson2.id },
      { word: 'Do you speak English?', meaning: 'Bạn nói tiếng Anh không?', example: 'Do you speak English? I need directions.', exampleMeaning: 'Bạn nói tiếng Anh không? Tôi cần chỉ đường.', lessonId: enLesson2.id },
      { word: 'See you later', meaning: 'Hẹn gặp lại', example: 'Bye! See you later!', exampleMeaning: 'Tạm biệt! Hẹn gặp lại!', lessonId: enLesson2.id },
    ],
  });

  // English lesson 3 vocabulary - Basic Grammar: Present Tense
  await prisma.vocabulary.createMany({
    data: [
      { word: 'I am / I\'m', meaning: 'Tôi là / Tôi đang', example: 'I am a student. I\'m studying English.', exampleMeaning: 'Tôi là sinh viên. Tôi đang học tiếng Anh.', lessonId: enLesson3.id },
      { word: 'You are / You\'re', meaning: 'Bạn là / Bạn đang', example: 'You are very kind. You\'re doing great!', exampleMeaning: 'Bạn rất tốt bụng. Bạn đang làm tốt lắm!', lessonId: enLesson3.id },
      { word: 'He/She is', meaning: 'Anh ấy/Cô ấy là', example: 'He is a teacher. She is my friend.', exampleMeaning: 'Anh ấy là giáo viên. Cô ấy là bạn tôi.', lessonId: enLesson3.id },
      { word: 'We are / We\'re', meaning: 'Chúng tôi là/đang', example: 'We are learning together.', exampleMeaning: 'Chúng tôi đang học cùng nhau.', lessonId: enLesson3.id },
      { word: 'They are / They\'re', meaning: 'Họ là/đang', example: 'They are from Vietnam.', exampleMeaning: 'Họ đến từ Việt Nam.', lessonId: enLesson3.id },
      { word: 'do / does', meaning: 'trợ động từ (câu hỏi/phủ định)', example: 'Do you like coffee? She does not eat meat.', exampleMeaning: 'Bạn có thích cà phê không? Cô ấy không ăn thịt.', lessonId: enLesson3.id },
      { word: 'have / has', meaning: 'có', example: 'I have a book. He has a car.', exampleMeaning: 'Tôi có một quyển sách. Anh ấy có một chiếc xe.', lessonId: enLesson3.id },
      { word: 'go / goes', meaning: 'đi', example: 'I go to school. She goes to work.', exampleMeaning: 'Tôi đi học. Cô ấy đi làm.', lessonId: enLesson3.id },
      { word: 'like / likes', meaning: 'thích', example: 'I like music. He likes sports.', exampleMeaning: 'Tôi thích nhạc. Anh ấy thích thể thao.', lessonId: enLesson3.id },
      { word: 'want / wants', meaning: 'muốn', example: 'I want to learn. She wants to travel.', exampleMeaning: 'Tôi muốn học. Cô ấy muốn đi du lịch.', lessonId: enLesson3.id },
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
  const jaLesson2 = await prisma.lesson.create({
    data: { title: 'じこしょうかい (Self Introduction)', description: 'How to introduce yourself in Japanese', order: 2, levelId: jaBeginner!.id, type: 'vocabulary', content: '{}', xpReward: 15 },
  });
  const jaLesson3 = await prisma.lesson.create({
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
  const zhLesson2 = await prisma.lesson.create({
    data: { title: '自我介绍 (Self Introduction)', description: 'Introduce yourself in Chinese', order: 2, levelId: zhBeginner!.id, type: 'vocabulary', content: '{}', xpReward: 15 },
  });
  const zhLesson3 = await prisma.lesson.create({
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
  const koLesson2 = await prisma.lesson.create({
    data: { title: '자기소개 (Self Introduction)', description: 'Introduce yourself in Korean', order: 2, levelId: koBeginner!.id, type: 'vocabulary', content: '{}', xpReward: 15 },
  });
  const koLesson3 = await prisma.lesson.create({
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

  // English lesson 2 quizzes - Daily Conversation
  await prisma.quiz.createMany({
    data: [
      { question: 'How do you ask for the price?', type: 'multiple_choice', options: JSON.stringify(['How much is this?', 'Where is this?', 'What is this?', 'Who is this?']), answer: 'How much is this?', explanation: '"How much is this?" dùng để hỏi giá', lessonId: enLesson2.id },
      { question: 'Fill in: "_____ me, can you help me?"', type: 'fill_blank', options: JSON.stringify([]), answer: 'Excuse', explanation: '"Excuse me" dùng để xin phép hoặc gây chú ý lịch sự', lessonId: enLesson2.id },
      { question: '"I don\'t understand" nghĩa là gì?', type: 'multiple_choice', options: JSON.stringify(['Tôi không biết', 'Tôi không hiểu', 'Tôi không thích', 'Tôi không muốn']), answer: 'Tôi không hiểu', explanation: '"I don\'t understand" = Tôi không hiểu', lessonId: enLesson2.id },
      { question: 'Arrange: "time / What / is / it / ?"', type: 'arrange', options: JSON.stringify(['time', 'What', 'is', 'it', '?']), answer: 'What time is it ?', explanation: 'Câu hỏi giờ: "What time is it?"', lessonId: enLesson2.id },
      { question: 'Which phrase means "Hẹn gặp lại"?', type: 'multiple_choice', options: JSON.stringify(['Good morning', 'See you later', 'Thank you', 'I need help']), answer: 'See you later', explanation: '"See you later" = Hẹn gặp lại', lessonId: enLesson2.id },
    ],
  });

  // English lesson 3 quizzes - Present Tense Grammar
  await prisma.quiz.createMany({
    data: [
      { question: 'Choose correct: "She _____ to school every day."', type: 'multiple_choice', options: JSON.stringify(['go', 'goes', 'going', 'gone']), answer: 'goes', explanation: 'Ngôi 3 số ít (she/he/it) thêm -s/-es: goes', lessonId: enLesson3.id },
      { question: 'Fill in: "I _____ a student." (to be)', type: 'fill_blank', options: JSON.stringify([]), answer: 'am', explanation: 'I + am, You + are, He/She + is', lessonId: enLesson3.id },
      { question: '"Do you like coffee?" là loại câu gì?', type: 'multiple_choice', options: JSON.stringify(['Câu khẳng định', 'Câu phủ định', 'Câu hỏi Yes/No', 'Câu mệnh lệnh']), answer: 'Câu hỏi Yes/No', explanation: 'Do/Does + S + V? là cấu trúc câu hỏi Yes/No ở thì hiện tại', lessonId: enLesson3.id },
      { question: 'Which is WRONG?', type: 'multiple_choice', options: JSON.stringify(['He has a car', 'She have a book', 'They have dogs', 'I have a pen']), answer: 'She have a book', explanation: 'She/He/It + has (không phải have). Đúng: "She has a book"', lessonId: enLesson3.id },
      { question: 'Arrange: "not / does / She / like / fish"', type: 'arrange', options: JSON.stringify(['not', 'does', 'She', 'like', 'fish']), answer: 'She does not like fish', explanation: 'Phủ định: S + does not + V (nguyên thể)', lessonId: enLesson3.id },
    ],
  });

  // Japanese lesson 2 vocabulary - Self Introduction
  await prisma.vocabulary.createMany({
    data: [
      { word: '私', reading: 'watashi', meaning: 'Tôi', example: '私は学生です。', exampleMeaning: 'Tôi là sinh viên.', lessonId: jaLesson2.id },
      { word: '名前', reading: 'namae', meaning: 'Tên', example: '名前は何ですか？', exampleMeaning: 'Tên bạn là gì?', lessonId: jaLesson2.id },
      { word: '学生', reading: 'gakusei', meaning: 'Sinh viên', example: '私は大学生です。', exampleMeaning: 'Tôi là sinh viên đại học.', lessonId: jaLesson2.id },
      { word: '先生', reading: 'sensei', meaning: 'Giáo viên', example: '田中先生は優しいです。', exampleMeaning: 'Thầy Tanaka rất tốt bụng.', lessonId: jaLesson2.id },
      { word: '日本語', reading: 'nihongo', meaning: 'Tiếng Nhật', example: '日本語を勉強しています。', exampleMeaning: 'Tôi đang học tiếng Nhật.', lessonId: jaLesson2.id },
      { word: '〜です', reading: 'desu', meaning: 'là (trợ từ kết thúc câu)', example: '私はベトナム人です。', exampleMeaning: 'Tôi là người Việt Nam.', lessonId: jaLesson2.id },
      { word: '〜から来ました', reading: 'kara kimashita', meaning: 'đến từ...', example: 'ハノイから来ました。', exampleMeaning: 'Tôi đến từ Hà Nội.', lessonId: jaLesson2.id },
      { word: '趣味', reading: 'shumi', meaning: 'Sở thích', example: '趣味は読書です。', exampleMeaning: 'Sở thích của tôi là đọc sách.', lessonId: jaLesson2.id },
      { word: '仕事', reading: 'shigoto', meaning: 'Công việc', example: '仕事は何ですか？', exampleMeaning: 'Công việc của bạn là gì?', lessonId: jaLesson2.id },
      { word: '〜歳', reading: 'sai', meaning: '...tuổi', example: '二十歳です。', exampleMeaning: 'Tôi 20 tuổi.', lessonId: jaLesson2.id },
    ],
  });

  // Japanese lesson 3 vocabulary - Numbers
  await prisma.vocabulary.createMany({
    data: [
      { word: '一', reading: 'ichi', meaning: 'Một (1)', example: '一つください。', exampleMeaning: 'Cho tôi một cái.', lessonId: jaLesson3.id },
      { word: '二', reading: 'ni', meaning: 'Hai (2)', example: '二人です。', exampleMeaning: 'Hai người.', lessonId: jaLesson3.id },
      { word: '三', reading: 'san', meaning: 'Ba (3)', example: '三時に会いましょう。', exampleMeaning: 'Gặp nhau lúc 3 giờ nhé.', lessonId: jaLesson3.id },
      { word: '四', reading: 'shi/yon', meaning: 'Bốn (4)', example: '四月は桜の季節です。', exampleMeaning: 'Tháng 4 là mùa hoa anh đào.', lessonId: jaLesson3.id },
      { word: '五', reading: 'go', meaning: 'Năm (5)', example: '五分待ってください。', exampleMeaning: 'Xin đợi 5 phút.', lessonId: jaLesson3.id },
      { word: '六', reading: 'roku', meaning: 'Sáu (6)', example: '六時に起きます。', exampleMeaning: 'Tôi dậy lúc 6 giờ.', lessonId: jaLesson3.id },
      { word: '七', reading: 'shichi/nana', meaning: 'Bảy (7)', example: '七日間の旅行です。', exampleMeaning: 'Chuyến đi 7 ngày.', lessonId: jaLesson3.id },
      { word: '八', reading: 'hachi', meaning: 'Tám (8)', example: '八百円です。', exampleMeaning: 'Giá 800 yên.', lessonId: jaLesson3.id },
      { word: '九', reading: 'ku/kyuu', meaning: 'Chín (9)', example: '九月に日本へ行きます。', exampleMeaning: 'Tháng 9 tôi đi Nhật.', lessonId: jaLesson3.id },
      { word: '十', reading: 'juu', meaning: 'Mười (10)', example: '十個あります。', exampleMeaning: 'Có 10 cái.', lessonId: jaLesson3.id },
    ],
  });

  // Chinese lesson 2 vocabulary - Self Introduction
  await prisma.vocabulary.createMany({
    data: [
      { word: '我叫...', reading: 'wǒ jiào', meaning: 'Tôi tên là...', example: '我叫小明。', exampleMeaning: 'Tôi tên là Tiểu Minh.', lessonId: zhLesson2.id },
      { word: '我是...', reading: 'wǒ shì', meaning: 'Tôi là...', example: '我是学生。', exampleMeaning: 'Tôi là sinh viên.', lessonId: zhLesson2.id },
      { word: '学生', reading: 'xué shēng', meaning: 'Sinh viên', example: '我是大学生。', exampleMeaning: 'Tôi là sinh viên đại học.', lessonId: zhLesson2.id },
      { word: '老师', reading: 'lǎo shī', meaning: 'Giáo viên', example: '她是我的老师。', exampleMeaning: 'Cô ấy là giáo viên của tôi.', lessonId: zhLesson2.id },
      { word: '中文', reading: 'zhōng wén', meaning: 'Tiếng Trung', example: '我在学中文。', exampleMeaning: 'Tôi đang học tiếng Trung.', lessonId: zhLesson2.id },
      { word: '越南人', reading: 'yuè nán rén', meaning: 'Người Việt Nam', example: '我是越南人。', exampleMeaning: 'Tôi là người Việt Nam.', lessonId: zhLesson2.id },
      { word: '多大', reading: 'duō dà', meaning: 'Bao nhiêu tuổi', example: '你多大了？', exampleMeaning: 'Bạn bao nhiêu tuổi?', lessonId: zhLesson2.id },
      { word: '岁', reading: 'suì', meaning: '...tuổi', example: '我二十岁。', exampleMeaning: 'Tôi 20 tuổi.', lessonId: zhLesson2.id },
      { word: '喜欢', reading: 'xǐ huān', meaning: 'Thích', example: '我喜欢学习。', exampleMeaning: 'Tôi thích học.', lessonId: zhLesson2.id },
      { word: '工作', reading: 'gōng zuò', meaning: 'Công việc', example: '你做什么工作？', exampleMeaning: 'Bạn làm công việc gì?', lessonId: zhLesson2.id },
    ],
  });

  // Chinese lesson 3 vocabulary - Numbers
  await prisma.vocabulary.createMany({
    data: [
      { word: '一', reading: 'yī', meaning: 'Một (1)', example: '一个人。', exampleMeaning: 'Một người.', lessonId: zhLesson3.id },
      { word: '二', reading: 'èr', meaning: 'Hai (2)', example: '二月很冷。', exampleMeaning: 'Tháng 2 rất lạnh.', lessonId: zhLesson3.id },
      { word: '三', reading: 'sān', meaning: 'Ba (3)', example: '三点见。', exampleMeaning: 'Gặp lúc 3 giờ.', lessonId: zhLesson3.id },
      { word: '四', reading: 'sì', meaning: 'Bốn (4)', example: '四个苹果。', exampleMeaning: 'Bốn quả táo.', lessonId: zhLesson3.id },
      { word: '五', reading: 'wǔ', meaning: 'Năm (5)', example: '五分钟。', exampleMeaning: 'Năm phút.', lessonId: zhLesson3.id },
      { word: '六', reading: 'liù', meaning: 'Sáu (6)', example: '六点起床。', exampleMeaning: 'Dậy lúc 6 giờ.', lessonId: zhLesson3.id },
      { word: '七', reading: 'qī', meaning: 'Bảy (7)', example: '一周七天。', exampleMeaning: 'Một tuần 7 ngày.', lessonId: zhLesson3.id },
      { word: '八', reading: 'bā', meaning: 'Tám (8)', example: '八百块。', exampleMeaning: '800 tệ.', lessonId: zhLesson3.id },
      { word: '九', reading: 'jiǔ', meaning: 'Chín (9)', example: '九月开学。', exampleMeaning: 'Tháng 9 khai giảng.', lessonId: zhLesson3.id },
      { word: '十', reading: 'shí', meaning: 'Mười (10)', example: '十块钱。', exampleMeaning: '10 tệ.', lessonId: zhLesson3.id },
    ],
  });

  // Korean lesson 2 vocabulary - Self Introduction
  await prisma.vocabulary.createMany({
    data: [
      { word: '저는', reading: 'jeoneun', meaning: 'Tôi (chủ ngữ)', example: '저는 학생입니다.', exampleMeaning: 'Tôi là sinh viên.', lessonId: koLesson2.id },
      { word: '이름', reading: 'ireum', meaning: 'Tên', example: '이름이 뭐예요?', exampleMeaning: 'Tên bạn là gì?', lessonId: koLesson2.id },
      { word: '학생', reading: 'haksaeng', meaning: 'Sinh viên', example: '저는 대학생입니다.', exampleMeaning: 'Tôi là sinh viên đại học.', lessonId: koLesson2.id },
      { word: '선생님', reading: 'seonsaengnim', meaning: 'Giáo viên', example: '김 선생님은 친절합니다.', exampleMeaning: 'Thầy Kim rất tốt bụng.', lessonId: koLesson2.id },
      { word: '한국어', reading: 'hangugeo', meaning: 'Tiếng Hàn', example: '한국어를 공부합니다.', exampleMeaning: 'Tôi học tiếng Hàn.', lessonId: koLesson2.id },
      { word: '베트남 사람', reading: 'beteunam saram', meaning: 'Người Việt Nam', example: '저는 베트남 사람입니다.', exampleMeaning: 'Tôi là người Việt Nam.', lessonId: koLesson2.id },
      { word: '~입니다', reading: 'imnida', meaning: 'là (kính ngữ)', example: '저는 민수입니다.', exampleMeaning: 'Tôi là Minsu.', lessonId: koLesson2.id },
      { word: '나이', reading: 'nai', meaning: 'Tuổi', example: '나이가 어떻게 되세요?', exampleMeaning: 'Bạn bao nhiêu tuổi?', lessonId: koLesson2.id },
      { word: '취미', reading: 'chwimi', meaning: 'Sở thích', example: '취미가 뭐예요?', exampleMeaning: 'Sở thích của bạn là gì?', lessonId: koLesson2.id },
      { word: '직업', reading: 'jigeop', meaning: 'Nghề nghiệp', example: '직업이 뭐예요?', exampleMeaning: 'Nghề nghiệp của bạn là gì?', lessonId: koLesson2.id },
    ],
  });

  // Korean lesson 3 vocabulary - Numbers
  await prisma.vocabulary.createMany({
    data: [
      { word: '하나', reading: 'hana', meaning: 'Một (1)', example: '하나 주세요.', exampleMeaning: 'Cho tôi một cái.', lessonId: koLesson3.id },
      { word: '둘', reading: 'dul', meaning: 'Hai (2)', example: '둘이서 갑시다.', exampleMeaning: 'Hai người đi nhé.', lessonId: koLesson3.id },
      { word: '셋', reading: 'set', meaning: 'Ba (3)', example: '세 시에 만나요.', exampleMeaning: 'Gặp nhau lúc 3 giờ.', lessonId: koLesson3.id },
      { word: '넷', reading: 'net', meaning: 'Bốn (4)', example: '네 명이에요.', exampleMeaning: 'Bốn người.', lessonId: koLesson3.id },
      { word: '다섯', reading: 'daseot', meaning: 'Năm (5)', example: '다섯 분 기다려 주세요.', exampleMeaning: 'Xin đợi 5 phút.', lessonId: koLesson3.id },
      { word: '여섯', reading: 'yeoseot', meaning: 'Sáu (6)', example: '여섯 시에 일어나요.', exampleMeaning: 'Tôi dậy lúc 6 giờ.', lessonId: koLesson3.id },
      { word: '일곱', reading: 'ilgop', meaning: 'Bảy (7)', example: '일주일은 일곱 일이에요.', exampleMeaning: 'Một tuần là 7 ngày.', lessonId: koLesson3.id },
      { word: '여덟', reading: 'yeodeol', meaning: 'Tám (8)', example: '여덟 시에 출발해요.', exampleMeaning: 'Xuất phát lúc 8 giờ.', lessonId: koLesson3.id },
      { word: '아홉', reading: 'ahop', meaning: 'Chín (9)', example: '구월에 한국에 가요.', exampleMeaning: 'Tháng 9 tôi đi Hàn Quốc.', lessonId: koLesson3.id },
      { word: '열', reading: 'yeol', meaning: 'Mười (10)', example: '열 개 있어요.', exampleMeaning: 'Có 10 cái.', lessonId: koLesson3.id },
    ],
  });

  // Additional English lessons - Food & Travel
  const enIntermediate = await prisma.level.findFirst({ where: { languageId: english.id, slug: 'elementary' } });
  const enLesson4 = await prisma.lesson.create({
    data: { title: 'Food & Dining', description: 'Vocabulary for restaurants and food', order: 4, levelId: enIntermediate!.id, type: 'vocabulary', content: '{}', xpReward: 20 },
  });
  const enLesson5 = await prisma.lesson.create({
    data: { title: 'Travel & Transportation', description: 'Essential travel vocabulary', order: 5, levelId: enIntermediate!.id, type: 'vocabulary', content: '{}', xpReward: 20 },
  });

  await prisma.vocabulary.createMany({
    data: [
      { word: 'restaurant', meaning: 'nhà hàng', example: 'Let\'s go to a restaurant tonight.', exampleMeaning: 'Tối nay đi nhà hàng nhé.', lessonId: enLesson4.id },
      { word: 'menu', meaning: 'thực đơn', example: 'Can I see the menu, please?', exampleMeaning: 'Cho tôi xem thực đơn được không?', lessonId: enLesson4.id },
      { word: 'delicious', meaning: 'ngon', example: 'This food is delicious!', exampleMeaning: 'Món ăn này ngon quá!', lessonId: enLesson4.id },
      { word: 'breakfast', meaning: 'bữa sáng', example: 'I have breakfast at 7 AM.', exampleMeaning: 'Tôi ăn sáng lúc 7 giờ.', lessonId: enLesson4.id },
      { word: 'lunch', meaning: 'bữa trưa', example: 'What do you want for lunch?', exampleMeaning: 'Bạn muốn ăn gì cho bữa trưa?', lessonId: enLesson4.id },
      { word: 'dinner', meaning: 'bữa tối', example: 'Dinner is ready!', exampleMeaning: 'Bữa tối sẵn sàng rồi!', lessonId: enLesson4.id },
      { word: 'spicy', meaning: 'cay', example: 'Vietnamese food is often spicy.', exampleMeaning: 'Đồ ăn Việt Nam thường cay.', lessonId: enLesson4.id },
      { word: 'sweet', meaning: 'ngọt', example: 'This cake is too sweet.', exampleMeaning: 'Cái bánh này ngọt quá.', lessonId: enLesson4.id },
      { word: 'bill', meaning: 'hóa đơn', example: 'Can I have the bill, please?', exampleMeaning: 'Cho tôi hóa đơn được không?', lessonId: enLesson4.id },
      { word: 'tip', meaning: 'tiền boa', example: 'Should we leave a tip?', exampleMeaning: 'Mình có nên để tiền boa không?', lessonId: enLesson4.id },
    ],
  });

  await prisma.vocabulary.createMany({
    data: [
      { word: 'airport', meaning: 'sân bay', example: 'The airport is far from the city.', exampleMeaning: 'Sân bay xa thành phố.', lessonId: enLesson5.id },
      { word: 'passport', meaning: 'hộ chiếu', example: 'Don\'t forget your passport!', exampleMeaning: 'Đừng quên hộ chiếu!', lessonId: enLesson5.id },
      { word: 'ticket', meaning: 'vé', example: 'I booked a round-trip ticket.', exampleMeaning: 'Tôi đã đặt vé khứ hồi.', lessonId: enLesson5.id },
      { word: 'hotel', meaning: 'khách sạn', example: 'The hotel has a swimming pool.', exampleMeaning: 'Khách sạn có hồ bơi.', lessonId: enLesson5.id },
      { word: 'luggage', meaning: 'hành lý', example: 'My luggage is very heavy.', exampleMeaning: 'Hành lý của tôi rất nặng.', lessonId: enLesson5.id },
      { word: 'departure', meaning: 'khởi hành', example: 'The departure time is 8 AM.', exampleMeaning: 'Giờ khởi hành là 8 giờ sáng.', lessonId: enLesson5.id },
      { word: 'arrival', meaning: 'đến nơi', example: 'Arrival time is 3 PM.', exampleMeaning: 'Giờ đến là 3 giờ chiều.', lessonId: enLesson5.id },
      { word: 'subway', meaning: 'tàu điện ngầm', example: 'Take the subway to the museum.', exampleMeaning: 'Đi tàu điện ngầm đến bảo tàng.', lessonId: enLesson5.id },
      { word: 'map', meaning: 'bản đồ', example: 'Do you have a map of the city?', exampleMeaning: 'Bạn có bản đồ thành phố không?', lessonId: enLesson5.id },
      { word: 'reservation', meaning: 'đặt chỗ', example: 'I have a reservation for two.', exampleMeaning: 'Tôi có đặt chỗ cho hai người.', lessonId: enLesson5.id },
    ],
  });

  // Additional Japanese lessons - Food & Travel
  const jaIntermediate = await prisma.level.findFirst({ where: { languageId: japanese.id, slug: 'elementary' } });
  const jaLesson4 = await prisma.lesson.create({
    data: { title: '食べ物 (Food)', description: 'Japanese food vocabulary', order: 4, levelId: jaIntermediate!.id, type: 'vocabulary', content: '{}', xpReward: 20 },
  });
  const jaLesson5 = await prisma.lesson.create({
    data: { title: '旅行 (Travel)', description: 'Travel vocabulary in Japanese', order: 5, levelId: jaIntermediate!.id, type: 'vocabulary', content: '{}', xpReward: 20 },
  });

  await prisma.vocabulary.createMany({
    data: [
      { word: 'ご飯', reading: 'gohan', meaning: 'Cơm / Bữa ăn', example: 'ご飯を食べましょう。', exampleMeaning: 'Ăn cơm thôi.', lessonId: jaLesson4.id },
      { word: 'おいしい', reading: 'oishii', meaning: 'Ngon', example: 'この料理はおいしいです。', exampleMeaning: 'Món này ngon.', lessonId: jaLesson4.id },
      { word: '水', reading: 'mizu', meaning: 'Nước', example: '水をください。', exampleMeaning: 'Cho tôi nước.', lessonId: jaLesson4.id },
      { word: '肉', reading: 'niku', meaning: 'Thịt', example: '肉が好きです。', exampleMeaning: 'Tôi thích thịt.', lessonId: jaLesson4.id },
      { word: '魚', reading: 'sakana', meaning: 'Cá', example: '日本の魚は新鮮です。', exampleMeaning: 'Cá Nhật rất tươi.', lessonId: jaLesson4.id },
      { word: '野菜', reading: 'yasai', meaning: 'Rau', example: '野菜を食べてください。', exampleMeaning: 'Hãy ăn rau nhé.', lessonId: jaLesson4.id },
      { word: 'お茶', reading: 'ocha', meaning: 'Trà', example: 'お茶はいかがですか？', exampleMeaning: 'Bạn dùng trà nhé?', lessonId: jaLesson4.id },
      { word: '辛い', reading: 'karai', meaning: 'Cay', example: 'この料理は辛いです。', exampleMeaning: 'Món này cay.', lessonId: jaLesson4.id },
      { word: '甘い', reading: 'amai', meaning: 'Ngọt', example: 'このケーキは甘いです。', exampleMeaning: 'Cái bánh này ngọt.', lessonId: jaLesson4.id },
      { word: 'お会計', reading: 'okaikei', meaning: 'Tính tiền', example: 'お会計お願いします。', exampleMeaning: 'Tính tiền giúp tôi.', lessonId: jaLesson4.id },
    ],
  });

  await prisma.vocabulary.createMany({
    data: [
      { word: '空港', reading: 'kuukou', meaning: 'Sân bay', example: '空港まで一時間です。', exampleMeaning: 'Đến sân bay mất 1 tiếng.', lessonId: jaLesson5.id },
      { word: '電車', reading: 'densha', meaning: 'Tàu điện', example: '電車で行きます。', exampleMeaning: 'Tôi đi bằng tàu điện.', lessonId: jaLesson5.id },
      { word: '切符', reading: 'kippu', meaning: 'Vé', example: '切符を買いました。', exampleMeaning: 'Tôi đã mua vé.', lessonId: jaLesson5.id },
      { word: 'ホテル', reading: 'hoteru', meaning: 'Khách sạn', example: 'ホテルを予約しました。', exampleMeaning: 'Tôi đã đặt khách sạn.', lessonId: jaLesson5.id },
      { word: '荷物', reading: 'nimotsu', meaning: 'Hành lý', example: '荷物が重いです。', exampleMeaning: 'Hành lý nặng quá.', lessonId: jaLesson5.id },
      { word: '出発', reading: 'shuppatsu', meaning: 'Khởi hành', example: '出発は何時ですか？', exampleMeaning: 'Mấy giờ khởi hành?', lessonId: jaLesson5.id },
      { word: '到着', reading: 'touchaku', meaning: 'Đến nơi', example: '到着は三時です。', exampleMeaning: 'Đến nơi lúc 3 giờ.', lessonId: jaLesson5.id },
      { word: '地図', reading: 'chizu', meaning: 'Bản đồ', example: '地図を見せてください。', exampleMeaning: 'Cho tôi xem bản đồ.', lessonId: jaLesson5.id },
      { word: '予約', reading: 'yoyaku', meaning: 'Đặt chỗ', example: '予約はありますか？', exampleMeaning: 'Bạn có đặt chỗ không?', lessonId: jaLesson5.id },
      { word: 'パスポート', reading: 'pasupooto', meaning: 'Hộ chiếu', example: 'パスポートを見せてください。', exampleMeaning: 'Cho xem hộ chiếu.', lessonId: jaLesson5.id },
    ],
  });

  // Additional Chinese lessons - Food & Travel
  const zhIntermediate = await prisma.level.findFirst({ where: { languageId: chinese.id, slug: 'elementary' } });
  const zhLesson4 = await prisma.lesson.create({
    data: { title: '食物 (Food)', description: 'Chinese food vocabulary', order: 4, levelId: zhIntermediate!.id, type: 'vocabulary', content: '{}', xpReward: 20 },
  });
  const zhLesson5 = await prisma.lesson.create({
    data: { title: '旅行 (Travel)', description: 'Travel vocabulary in Chinese', order: 5, levelId: zhIntermediate!.id, type: 'vocabulary', content: '{}', xpReward: 20 },
  });

  await prisma.vocabulary.createMany({
    data: [
      { word: '米饭', reading: 'mǐ fàn', meaning: 'Cơm', example: '我要一碗米饭。', exampleMeaning: 'Tôi muốn một bát cơm.', lessonId: zhLesson4.id },
      { word: '好吃', reading: 'hǎo chī', meaning: 'Ngon', example: '这个菜很好吃。', exampleMeaning: 'Món này rất ngon.', lessonId: zhLesson4.id },
      { word: '水', reading: 'shuǐ', meaning: 'Nước', example: '请给我一杯水。', exampleMeaning: 'Cho tôi một ly nước.', lessonId: zhLesson4.id },
      { word: '肉', reading: 'ròu', meaning: 'Thịt', example: '我喜欢吃肉。', exampleMeaning: 'Tôi thích ăn thịt.', lessonId: zhLesson4.id },
      { word: '鱼', reading: 'yú', meaning: 'Cá', example: '这条鱼很新鲜。', exampleMeaning: 'Con cá này rất tươi.', lessonId: zhLesson4.id },
      { word: '蔬菜', reading: 'shū cài', meaning: 'Rau', example: '多吃蔬菜对身体好。', exampleMeaning: 'Ăn nhiều rau tốt cho sức khỏe.', lessonId: zhLesson4.id },
      { word: '茶', reading: 'chá', meaning: 'Trà', example: '你要喝茶吗？', exampleMeaning: 'Bạn muốn uống trà không?', lessonId: zhLesson4.id },
      { word: '辣', reading: 'là', meaning: 'Cay', example: '四川菜很辣。', exampleMeaning: 'Đồ ăn Tứ Xuyên rất cay.', lessonId: zhLesson4.id },
      { word: '甜', reading: 'tián', meaning: 'Ngọt', example: '这个蛋糕太甜了。', exampleMeaning: 'Cái bánh này ngọt quá.', lessonId: zhLesson4.id },
      { word: '买单', reading: 'mǎi dān', meaning: 'Tính tiền', example: '服务员，买单！', exampleMeaning: 'Phục vụ ơi, tính tiền!', lessonId: zhLesson4.id },
    ],
  });

  await prisma.vocabulary.createMany({
    data: [
      { word: '机场', reading: 'jī chǎng', meaning: 'Sân bay', example: '机场离市中心很远。', exampleMeaning: 'Sân bay xa trung tâm.', lessonId: zhLesson5.id },
      { word: '护照', reading: 'hù zhào', meaning: 'Hộ chiếu', example: '请出示护照。', exampleMeaning: 'Xin xuất trình hộ chiếu.', lessonId: zhLesson5.id },
      { word: '机票', reading: 'jī piào', meaning: 'Vé máy bay', example: '我买了往返机票。', exampleMeaning: 'Tôi mua vé khứ hồi.', lessonId: zhLesson5.id },
      { word: '酒店', reading: 'jiǔ diàn', meaning: 'Khách sạn', example: '酒店有游泳池。', exampleMeaning: 'Khách sạn có hồ bơi.', lessonId: zhLesson5.id },
      { word: '行李', reading: 'xíng li', meaning: 'Hành lý', example: '我的行李很重。', exampleMeaning: 'Hành lý của tôi rất nặng.', lessonId: zhLesson5.id },
      { word: '出发', reading: 'chū fā', meaning: 'Khởi hành', example: '我们明天出发。', exampleMeaning: 'Ngày mai chúng tôi khởi hành.', lessonId: zhLesson5.id },
      { word: '到达', reading: 'dào dá', meaning: 'Đến nơi', example: '飞机几点到达？', exampleMeaning: 'Máy bay mấy giờ đến?', lessonId: zhLesson5.id },
      { word: '地铁', reading: 'dì tiě', meaning: 'Tàu điện ngầm', example: '坐地铁去博物馆。', exampleMeaning: 'Đi tàu điện ngầm đến bảo tàng.', lessonId: zhLesson5.id },
      { word: '地图', reading: 'dì tú', meaning: 'Bản đồ', example: '你有城市地图吗？', exampleMeaning: 'Bạn có bản đồ thành phố không?', lessonId: zhLesson5.id },
      { word: '预订', reading: 'yù dìng', meaning: 'Đặt trước', example: '我预订了两个人的位子。', exampleMeaning: 'Tôi đặt chỗ cho hai người.', lessonId: zhLesson5.id },
    ],
  });

  // Additional Korean lessons - Food & Travel
  const koIntermediate = await prisma.level.findFirst({ where: { languageId: korean.id, slug: 'elementary' } });
  const koLesson4 = await prisma.lesson.create({
    data: { title: '음식 (Food)', description: 'Korean food vocabulary', order: 4, levelId: koIntermediate!.id, type: 'vocabulary', content: '{}', xpReward: 20 },
  });
  const koLesson5 = await prisma.lesson.create({
    data: { title: '여행 (Travel)', description: 'Travel vocabulary in Korean', order: 5, levelId: koIntermediate!.id, type: 'vocabulary', content: '{}', xpReward: 20 },
  });

  await prisma.vocabulary.createMany({
    data: [
      { word: '밥', reading: 'bap', meaning: 'Cơm', example: '밥 먹었어요?', exampleMeaning: 'Bạn ăn cơm chưa?', lessonId: koLesson4.id },
      { word: '맛있다', reading: 'masitda', meaning: 'Ngon', example: '이 음식 정말 맛있어요!', exampleMeaning: 'Món này ngon thật!', lessonId: koLesson4.id },
      { word: '물', reading: 'mul', meaning: 'Nước', example: '물 한 잔 주세요.', exampleMeaning: 'Cho tôi một ly nước.', lessonId: koLesson4.id },
      { word: '고기', reading: 'gogi', meaning: 'Thịt', example: '한국 고기가 맛있어요.', exampleMeaning: 'Thịt Hàn Quốc ngon.', lessonId: koLesson4.id },
      { word: '생선', reading: 'saengseon', meaning: 'Cá', example: '생선이 신선해요.', exampleMeaning: 'Cá rất tươi.', lessonId: koLesson4.id },
      { word: '야채', reading: 'yachae', meaning: 'Rau', example: '야채를 많이 먹어요.', exampleMeaning: 'Tôi ăn nhiều rau.', lessonId: koLesson4.id },
      { word: '차', reading: 'cha', meaning: 'Trà', example: '녹차 마실래요?', exampleMeaning: 'Bạn uống trà xanh không?', lessonId: koLesson4.id },
      { word: '맵다', reading: 'maepda', meaning: 'Cay', example: '이거 너무 매워요!', exampleMeaning: 'Cái này cay quá!', lessonId: koLesson4.id },
      { word: '달다', reading: 'dalda', meaning: 'Ngọt', example: '이 케이크가 달아요.', exampleMeaning: 'Cái bánh này ngọt.', lessonId: koLesson4.id },
      { word: '계산', reading: 'gyesan', meaning: 'Tính tiền', example: '계산해 주세요.', exampleMeaning: 'Tính tiền giúp tôi.', lessonId: koLesson4.id },
    ],
  });

  await prisma.vocabulary.createMany({
    data: [
      { word: '공항', reading: 'gonghang', meaning: 'Sân bay', example: '공항까지 한 시간 걸려요.', exampleMeaning: 'Đến sân bay mất 1 tiếng.', lessonId: koLesson5.id },
      { word: '여권', reading: 'yeogwon', meaning: 'Hộ chiếu', example: '여권을 잊지 마세요!', exampleMeaning: 'Đừng quên hộ chiếu!', lessonId: koLesson5.id },
      { word: '비행기표', reading: 'bihaenggipyo', meaning: 'Vé máy bay', example: '왕복 비행기표를 샀어요.', exampleMeaning: 'Tôi mua vé khứ hồi.', lessonId: koLesson5.id },
      { word: '호텔', reading: 'hotel', meaning: 'Khách sạn', example: '호텔을 예약했어요.', exampleMeaning: 'Tôi đã đặt khách sạn.', lessonId: koLesson5.id },
      { word: '짐', reading: 'jim', meaning: 'Hành lý', example: '짐이 무거워요.', exampleMeaning: 'Hành lý nặng quá.', lessonId: koLesson5.id },
      { word: '출발', reading: 'chulbal', meaning: 'Khởi hành', example: '출발 시간이 언제예요?', exampleMeaning: 'Giờ khởi hành là khi nào?', lessonId: koLesson5.id },
      { word: '도착', reading: 'dochak', meaning: 'Đến nơi', example: '도착 시간은 3시예요.', exampleMeaning: 'Giờ đến là 3 giờ.', lessonId: koLesson5.id },
      { word: '지하철', reading: 'jihacheol', meaning: 'Tàu điện ngầm', example: '지하철로 가세요.', exampleMeaning: 'Hãy đi bằng tàu điện ngầm.', lessonId: koLesson5.id },
      { word: '지도', reading: 'jido', meaning: 'Bản đồ', example: '지도 좀 보여주세요.', exampleMeaning: 'Cho tôi xem bản đồ.', lessonId: koLesson5.id },
      { word: '예약', reading: 'yeyak', meaning: 'Đặt chỗ', example: '예약했어요.', exampleMeaning: 'Tôi đã đặt chỗ.', lessonId: koLesson5.id },
    ],
  });

  console.log('Seed completed successfully!');
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
