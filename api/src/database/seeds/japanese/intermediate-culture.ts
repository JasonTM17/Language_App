import { LessonData } from '../utils';
import { TOPICS, DIFFICULTY, QUIZ_TYPES } from '../constants';

export const japaneseCultureLessons: LessonData[] = [
  {
    title: 'Japanese Culture',
    titleVi: 'Văn hóa Nhật Bản',
    description: 'Learn culture-related vocabulary in Japanese',
    descriptionVi: 'Học từ vựng về văn hóa Nhật Bản',
    topic: TOPICS.CULTURE,
    vocabulary: [
      { word: '祭り (まつり)', meaning: 'lễ hội', example: '夏祭りが好きです。', exampleMeaning: 'Tôi thích lễ hội mùa hè.', difficulty: DIFFICULTY.EASY },
      { word: '着物 (きもの)', meaning: 'kimono', example: '着物を着ました。', exampleMeaning: 'Tôi đã mặc kimono.', difficulty: DIFFICULTY.EASY },
      { word: '神社 (じんじゃ)', meaning: 'đền thần đạo', example: '神社に行きました。', exampleMeaning: 'Tôi đã đi đền.', difficulty: DIFFICULTY.MEDIUM },
      { word: 'お寺 (おてら)', meaning: 'chùa', example: 'お寺を見学しました。', exampleMeaning: 'Tôi đã tham quan chùa.', difficulty: DIFFICULTY.EASY },
      { word: '花見 (はなみ)', meaning: 'ngắm hoa', example: '花見に行きましょう。', exampleMeaning: 'Hãy đi ngắm hoa.', difficulty: DIFFICULTY.MEDIUM },
      { word: '温泉 (おんせん)', meaning: 'suối nước nóng', example: '温泉に入りたいです。', exampleMeaning: 'Tôi muốn tắm suối nước nóng.', difficulty: DIFFICULTY.MEDIUM },
      { word: '茶道 (さどう)', meaning: 'trà đạo', example: '茶道を習っています。', exampleMeaning: 'Tôi đang học trà đạo.', difficulty: DIFFICULTY.HARD },
      { word: '相撲 (すもう)', meaning: 'sumo', example: '相撲を見ました。', exampleMeaning: 'Tôi đã xem sumo.', difficulty: DIFFICULTY.MEDIUM },
      { word: '歌舞伎 (かぶき)', meaning: 'kabuki', example: '歌舞伎は日本の伝統芸能です。', exampleMeaning: 'Kabuki là nghệ thuật truyền thống Nhật.', difficulty: DIFFICULTY.HARD },
      { word: '折り紙 (おりがみ)', meaning: 'origami', example: '折り紙で鶴を作りました。', exampleMeaning: 'Tôi đã gấp hạc bằng origami.', difficulty: DIFFICULTY.EASY },
      { word: '武道 (ぶどう)', meaning: 'võ thuật', example: '武道を練習しています。', exampleMeaning: 'Tôi đang luyện võ thuật.', difficulty: DIFFICULTY.MEDIUM },
      { word: '和食 (わしょく)', meaning: 'ẩm thực Nhật', example: '和食は健康的です。', exampleMeaning: 'Ẩm thực Nhật tốt cho sức khỏe.', difficulty: DIFFICULTY.MEDIUM },
    ],
    quizzes: [
      { question: '"祭り" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Lễ hội', 'Đền thờ', 'Chùa', 'Công viên'], answer: 'Lễ hội', explanationVi: '祭り (まつり) = lễ hội', difficulty: DIFFICULTY.EASY },
      { question: '"Kimono" trong tiếng Nhật là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['浴衣', '着物', '袴', '帯'], answer: '着物', explanationVi: '着物 (きもの) = kimono', difficulty: DIFFICULTY.EASY },
      { question: '"温泉" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Hồ bơi', 'Suối nước nóng', 'Biển', 'Sông'], answer: 'Suối nước nóng', explanationVi: '温泉 (おんせん) = suối nước nóng', difficulty: DIFFICULTY.MEDIUM },
      { question: '"Trà đạo" trong tiếng Nhật là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['花道', '茶道', '書道', '武道'], answer: '茶道', explanationVi: '茶道 (さどう) = trà đạo', difficulty: DIFFICULTY.HARD },
      { question: '"折り紙" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Vẽ tranh', 'Origami', 'Thư pháp', 'Gốm sứ'], answer: 'Origami', explanationVi: '折り紙 (おりがみ) = origami', difficulty: DIFFICULTY.EASY },
    ],
  },
];
