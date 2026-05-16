import { LessonData } from '../utils';
import { TOPICS, DIFFICULTY, QUIZ_TYPES } from '../constants';

export const japaneseSchoolLessons: LessonData[] = [
  {
    title: '学校で',
    titleVi: 'Ở trường học',
    description: 'Learn vocabulary about school and studying in Japanese',
    descriptionVi: 'Học từ vựng về trường học và việc học trong tiếng Nhật',
    topic: TOPICS.SCHOOL,
    vocabulary: [
      { word: '学校', reading: 'がっこう (gakkou)', meaning: 'Trường học', example: '学校は楽しいです。', exampleMeaning: 'Trường học vui lắm.', difficulty: DIFFICULTY.VERY_EASY },
      { word: '先生', reading: 'せんせい (sensei)', meaning: 'Giáo viên', example: '先生はとても優しいです。', exampleMeaning: 'Giáo viên rất tốt bụng.', difficulty: DIFFICULTY.VERY_EASY },
      { word: '教室', reading: 'きょうしつ (kyoushitsu)', meaning: 'Phòng học', example: '教室は二階にあります。', exampleMeaning: 'Phòng học ở tầng 2.', difficulty: DIFFICULTY.EASY },
      { word: '本', reading: 'ほん (hon)', meaning: 'Sách', example: 'この本は面白いです。', exampleMeaning: 'Cuốn sách này thú vị.', difficulty: DIFFICULTY.VERY_EASY },
      { word: 'ノート', reading: 'nooto', meaning: 'Vở', example: 'ノートに書いてください。', exampleMeaning: 'Hãy viết vào vở.', difficulty: DIFFICULTY.EASY },
      { word: '鉛筆', reading: 'えんぴつ (enpitsu)', meaning: 'Bút chì', example: '鉛筆を貸してください。', exampleMeaning: 'Cho tôi mượn bút chì.', difficulty: DIFFICULTY.EASY },
      { word: '宿題', reading: 'しゅくだい (shukudai)', meaning: 'Bài tập về nhà', example: '宿題を忘れました。', exampleMeaning: 'Tôi quên bài tập về nhà.', difficulty: DIFFICULTY.EASY },
      { word: '試験', reading: 'しけん (shiken)', meaning: 'Bài thi', example: '来週試験があります。', exampleMeaning: 'Tuần sau có bài thi.', difficulty: DIFFICULTY.MEDIUM },
      { word: '勉強', reading: 'べんきょう (benkyou)', meaning: 'Học tập', example: '毎日日本語を勉強します。', exampleMeaning: 'Mỗi ngày tôi học tiếng Nhật.', difficulty: DIFFICULTY.EASY },
      { word: '質問', reading: 'しつもん (shitsumon)', meaning: 'Câu hỏi', example: '質問がありますか？', exampleMeaning: 'Bạn có câu hỏi không?', difficulty: DIFFICULTY.EASY },
    ],
    quizzes: [
      { question: '"学校" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Bệnh viện', 'Trường học', 'Công ty', 'Nhà hàng'], answer: 'Trường học', explanationVi: '学校 (がっこう) = Trường học', difficulty: DIFFICULTY.VERY_EASY },
      { question: '"宿題" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Bài thi', 'Bài tập về nhà', 'Sách giáo khoa', 'Lịch học'], answer: 'Bài tập về nhà', explanationVi: '宿題 (しゅくだい) = Bài tập về nhà', difficulty: DIFFICULTY.EASY },
      { question: '"先生" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Sinh viên', 'Giáo viên', 'Bạn bè', 'Phụ huynh'], answer: 'Giáo viên', explanationVi: '先生 (せんせい) = Giáo viên', difficulty: DIFFICULTY.VERY_EASY },
      { question: '"勉強" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Chơi', 'Ngủ', 'Học tập', 'Ăn'], answer: 'Học tập', explanationVi: '勉強 (べんきょう) = Học tập', difficulty: DIFFICULTY.EASY },
      { question: '"試験" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Bài tập', 'Bài thi', 'Câu hỏi', 'Sách'], answer: 'Bài thi', explanationVi: '試験 (しけん) = Bài thi', difficulty: DIFFICULTY.EASY },
    ],
  },
  {
    title: '科目',
    titleVi: 'Các môn học',
    description: 'Learn names of school subjects in Japanese',
    descriptionVi: 'Học tên các môn học trong tiếng Nhật',
    topic: TOPICS.SCHOOL,
    vocabulary: [
      { word: '数学', reading: 'すうがく (suugaku)', meaning: 'Toán học', example: '数学は難しいです。', exampleMeaning: 'Toán học khó.', difficulty: DIFFICULTY.EASY },
      { word: '英語', reading: 'えいご (eigo)', meaning: 'Tiếng Anh', example: '英語を話せますか？', exampleMeaning: 'Bạn nói được tiếng Anh không?', difficulty: DIFFICULTY.VERY_EASY },
      { word: '日本語', reading: 'にほんご (nihongo)', meaning: 'Tiếng Nhật', example: '日本語は楽しいです。', exampleMeaning: 'Tiếng Nhật vui lắm.', difficulty: DIFFICULTY.VERY_EASY },
      { word: '歴史', reading: 'れきし (rekishi)', meaning: 'Lịch sử', example: '歴史が好きです。', exampleMeaning: 'Tôi thích lịch sử.', difficulty: DIFFICULTY.EASY },
      { word: '科学', reading: 'かがく (kagaku)', meaning: 'Khoa học', example: '科学の実験をします。', exampleMeaning: 'Làm thí nghiệm khoa học.', difficulty: DIFFICULTY.EASY },
      { word: '音楽', reading: 'おんがく (ongaku)', meaning: 'Âm nhạc', example: '音楽を聴くのが好きです。', exampleMeaning: 'Tôi thích nghe nhạc.', difficulty: DIFFICULTY.EASY },
      { word: '体育', reading: 'たいいく (taiiku)', meaning: 'Thể dục', example: '体育の時間にサッカーをします。', exampleMeaning: 'Giờ thể dục chơi bóng đá.', difficulty: DIFFICULTY.EASY },
      { word: '美術', reading: 'びじゅつ (bijutsu)', meaning: 'Mỹ thuật', example: '美術で絵を描きます。', exampleMeaning: 'Giờ mỹ thuật vẽ tranh.', difficulty: DIFFICULTY.MEDIUM },
      { word: '授業', reading: 'じゅぎょう (jugyou)', meaning: 'Tiết học', example: '授業は九時に始まります。', exampleMeaning: 'Tiết học bắt đầu lúc 9 giờ.', difficulty: DIFFICULTY.EASY },
      { word: '休み時間', reading: 'やすみじかん (yasumi jikan)', meaning: 'Giờ nghỉ', example: '休み時間に友達と話します。', exampleMeaning: 'Giờ nghỉ nói chuyện với bạn.', difficulty: DIFFICULTY.EASY },
    ],
    quizzes: [
      { question: '"数学" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Khoa học', 'Toán học', 'Lịch sử', 'Tiếng Anh'], answer: 'Toán học', explanationVi: '数学 (すうがく) = Toán học', difficulty: DIFFICULTY.EASY },
      { question: '"英語" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Tiếng Nhật', 'Tiếng Trung', 'Tiếng Anh', 'Tiếng Hàn'], answer: 'Tiếng Anh', explanationVi: '英語 (えいご) = Tiếng Anh', difficulty: DIFFICULTY.VERY_EASY },
      { question: '"音楽" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Mỹ thuật', 'Thể dục', 'Âm nhạc', 'Khoa học'], answer: 'Âm nhạc', explanationVi: '音楽 (おんがく) = Âm nhạc', difficulty: DIFFICULTY.EASY },
      { question: '"体育" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Thể dục', 'Toán học', 'Lịch sử', 'Âm nhạc'], answer: 'Thể dục', explanationVi: '体育 (たいいく) = Thể dục', difficulty: DIFFICULTY.EASY },
      { question: '"授業" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Bài thi', 'Tiết học', 'Giờ nghỉ', 'Bài tập'], answer: 'Tiết học', explanationVi: '授業 (じゅぎょう) = Tiết học', difficulty: DIFFICULTY.EASY },
    ],
  },
];
