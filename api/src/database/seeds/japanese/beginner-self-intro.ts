import { LessonData } from '../utils';
import { TOPICS, DIFFICULTY, QUIZ_TYPES } from '../constants';

export const japaneseSelfIntroLessons: LessonData[] = [
  {
    title: 'Self Introduction',
    titleVi: 'Tự giới thiệu',
    description: 'Learn self-introduction phrases in Japanese',
    descriptionVi: 'Học cách tự giới thiệu bằng tiếng Nhật',
    topic: TOPICS.SELF_INTRO,
    vocabulary: [
      { word: '名前 (なまえ)', meaning: 'tên', example: '名前は田中です。', exampleMeaning: 'Tên tôi là Tanaka.', difficulty: DIFFICULTY.EASY },
      { word: '出身 (しゅっしん)', meaning: 'quê quán', example: 'ベトナム出身です。', exampleMeaning: 'Tôi đến từ Việt Nam.', difficulty: DIFFICULTY.EASY },
      { word: '仕事 (しごと)', meaning: 'công việc', example: '仕事は先生です。', exampleMeaning: 'Công việc của tôi là giáo viên.', difficulty: DIFFICULTY.EASY },
      { word: '年齢 (ねんれい)', meaning: 'tuổi', example: '25歳です。', exampleMeaning: 'Tôi 25 tuổi.', difficulty: DIFFICULTY.EASY },
      { word: '趣味 (しゅみ)', meaning: 'sở thích', example: '趣味は読書です。', exampleMeaning: 'Sở thích là đọc sách.', difficulty: DIFFICULTY.EASY },
      { word: '家族 (かぞく)', meaning: 'gia đình', example: '家族は4人です。', exampleMeaning: 'Gia đình tôi có 4 người.', difficulty: DIFFICULTY.EASY },
      { word: '住む (すむ)', meaning: 'sống/ở', example: '東京に住んでいます。', exampleMeaning: 'Tôi sống ở Tokyo.', difficulty: DIFFICULTY.EASY },
      { word: '学生 (がくせい)', meaning: 'sinh viên', example: '大学生です。', exampleMeaning: 'Tôi là sinh viên đại học.', difficulty: DIFFICULTY.EASY },
      { word: '会社員 (かいしゃいん)', meaning: 'nhân viên công ty', example: '会社員です。', exampleMeaning: 'Tôi là nhân viên công ty.', difficulty: DIFFICULTY.EASY },
      { word: 'よろしくお願いします', meaning: 'rất vui được gặp/xin chỉ giáo', example: 'はじめまして、よろしくお願いします。', exampleMeaning: 'Lần đầu gặp mặt, rất vui được biết bạn.', difficulty: DIFFICULTY.EASY },
      { word: '国 (くに)', meaning: 'đất nước', example: '私の国はベトナムです。', exampleMeaning: 'Đất nước tôi là Việt Nam.', difficulty: DIFFICULTY.EASY },
      { word: '言語 (げんご)', meaning: 'ngôn ngữ', example: '日本語を勉強しています。', exampleMeaning: 'Tôi đang học tiếng Nhật.', difficulty: DIFFICULTY.MEDIUM },
    ],
    quizzes: [
      { question: '"名前" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Tuổi', 'Tên', 'Quê', 'Nghề'], answer: 'Tên', explanationVi: '名前 (なまえ) = tên', difficulty: DIFFICULTY.EASY },
      { question: '"Công việc" trong tiếng Nhật là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['趣味', '仕事', '家族', '名前'], answer: '仕事', explanationVi: '仕事 (しごと) = công việc', difficulty: DIFFICULTY.EASY },
      { question: '"出身" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Quê quán', 'Tuổi', 'Tên', 'Sở thích'], answer: 'Quê quán', explanationVi: '出身 (しゅっしん) = quê quán/xuất thân', difficulty: DIFFICULTY.EASY },
      { question: '"Gia đình" trong tiếng Nhật là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['仕事', '趣味', '家族', '友達'], answer: '家族', explanationVi: '家族 (かぞく) = gia đình', difficulty: DIFFICULTY.EASY },
      { question: '"よろしくお願いします" dùng khi nào?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Tạm biệt', 'Xin lỗi', 'Gặp lần đầu', 'Cảm ơn'], answer: 'Gặp lần đầu', explanationVi: 'よろしくお願いします = rất vui được gặp (dùng khi tự giới thiệu)', difficulty: DIFFICULTY.EASY },
    ],
  },
];
