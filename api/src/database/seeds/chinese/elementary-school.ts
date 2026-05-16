import { LessonData } from '../utils';
import { TOPICS, DIFFICULTY, QUIZ_TYPES } from '../constants';

export const chineseSchoolLessons: LessonData[] = [
  {
    title: 'School & Education',
    titleVi: 'Trường học & Giáo dục',
    description: 'Learn school vocabulary in Chinese',
    descriptionVi: 'Học từ vựng về trường học bằng tiếng Trung',
    topic: TOPICS.SCHOOL,
    vocabulary: [
      { word: '学校 (xuéxiào)', meaning: 'trường học', example: '我去学校。', exampleMeaning: 'Tôi đi đến trường.', difficulty: DIFFICULTY.EASY },
      { word: '老师 (lǎoshī)', meaning: 'giáo viên', example: '老师很好。', exampleMeaning: 'Giáo viên rất tốt.', difficulty: DIFFICULTY.EASY },
      { word: '学生 (xuéshēng)', meaning: 'học sinh', example: '我是学生。', exampleMeaning: 'Tôi là học sinh.', difficulty: DIFFICULTY.EASY },
      { word: '教室 (jiàoshì)', meaning: 'phòng học', example: '教室很大。', exampleMeaning: 'Phòng học rất lớn.', difficulty: DIFFICULTY.EASY },
      { word: '作业 (zuòyè)', meaning: 'bài tập về nhà', example: '我做作业。', exampleMeaning: 'Tôi làm bài tập.', difficulty: DIFFICULTY.EASY },
      { word: '考试 (kǎoshì)', meaning: 'bài thi', example: '明天有考试。', exampleMeaning: 'Ngày mai có bài thi.', difficulty: DIFFICULTY.EASY },
      { word: '书 (shū)', meaning: 'sách', example: '我看书。', exampleMeaning: 'Tôi đọc sách.', difficulty: DIFFICULTY.EASY },
      { word: '学习 (xuéxí)', meaning: 'học tập', example: '我努力学习。', exampleMeaning: 'Tôi học chăm chỉ.', difficulty: DIFFICULTY.EASY },
      { word: '上课 (shàngkè)', meaning: 'lên lớp/tiết học', example: '上课了。', exampleMeaning: 'Vào lớp rồi.', difficulty: DIFFICULTY.EASY },
      { word: '图书馆 (túshūguǎn)', meaning: 'thư viện', example: '我在图书馆学习。', exampleMeaning: 'Tôi học ở thư viện.', difficulty: DIFFICULTY.EASY },
      { word: '铅笔 (qiānbǐ)', meaning: 'bút chì', example: '我用铅笔写字。', exampleMeaning: 'Tôi viết bằng bút chì.', difficulty: DIFFICULTY.EASY },
      { word: '大学 (dàxué)', meaning: 'đại học', example: '我上大学。', exampleMeaning: 'Tôi học đại học.', difficulty: DIFFICULTY.EASY },
    ],
    quizzes: [
      { question: '"学校" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Bệnh viện', 'Trường học', 'Công ty', 'Nhà hàng'], answer: 'Trường học', explanationVi: '学校 (xuéxiào) = trường học', difficulty: DIFFICULTY.EASY },
      { question: '"Giáo viên" trong tiếng Trung là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['学生', '老师', '朋友', '父母'], answer: '老师', explanationVi: '老师 (lǎoshī) = giáo viên', difficulty: DIFFICULTY.EASY },
      { question: '"作业" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Bài thi', 'Bài tập về nhà', 'Tiết học', 'Sách'], answer: 'Bài tập về nhà', explanationVi: '作业 (zuòyè) = bài tập về nhà', difficulty: DIFFICULTY.EASY },
      { question: '"Thư viện" trong tiếng Trung là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['教室', '图书馆', '学校', '大学'], answer: '图书馆', explanationVi: '图书馆 (túshūguǎn) = thư viện', difficulty: DIFFICULTY.EASY },
      { question: '"考试" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Bài tập', 'Bài thi', 'Tiết học', 'Sách giáo khoa'], answer: 'Bài thi', explanationVi: '考试 (kǎoshì) = bài thi', difficulty: DIFFICULTY.EASY },
    ],
  },
];
