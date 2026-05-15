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

  console.log('Seed completed successfully!');
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
