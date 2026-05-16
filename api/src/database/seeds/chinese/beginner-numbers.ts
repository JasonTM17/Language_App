import { LessonData } from '../utils';
import { TOPICS, DIFFICULTY, QUIZ_TYPES } from '../constants';

export const chineseNumbersLessons: LessonData[] = [
  {
    title: '数字 (Numbers)',
    titleVi: 'Số đếm',
    description: 'Learn numbers in Chinese',
    descriptionVi: 'Học số đếm tiếng Trung',
    topic: TOPICS.NUMBERS,
    vocabulary: [
      { word: '零', reading: 'líng', meaning: 'không (0)', example: '零度', exampleMeaning: '0 độ', difficulty: DIFFICULTY.VERY_EASY },
      { word: '一', reading: 'yī', meaning: 'một (1)', example: '一个人', exampleMeaning: 'Một người', difficulty: DIFFICULTY.VERY_EASY },
      { word: '二', reading: 'èr', meaning: 'hai (2)', example: '二月', exampleMeaning: 'Tháng 2', difficulty: DIFFICULTY.VERY_EASY },
      { word: '三', reading: 'sān', meaning: 'ba (3)', example: '三个苹果', exampleMeaning: 'Ba quả táo', difficulty: DIFFICULTY.VERY_EASY },
      { word: '四', reading: 'sì', meaning: 'bốn (4)', example: '四季', exampleMeaning: 'Bốn mùa', difficulty: DIFFICULTY.VERY_EASY },
      { word: '五', reading: 'wǔ', meaning: 'năm (5)', example: '五月', exampleMeaning: 'Tháng 5', difficulty: DIFFICULTY.VERY_EASY },
      { word: '六', reading: 'liù', meaning: 'sáu (6)', example: '六点', exampleMeaning: '6 giờ', difficulty: DIFFICULTY.VERY_EASY },
      { word: '七', reading: 'qī', meaning: 'bảy (7)', example: '七天', exampleMeaning: '7 ngày', difficulty: DIFFICULTY.VERY_EASY },
      { word: '八', reading: 'bā', meaning: 'tám (8)', example: '八月', exampleMeaning: 'Tháng 8', difficulty: DIFFICULTY.VERY_EASY },
      { word: '九', reading: 'jiǔ', meaning: 'chín (9)', example: '九十', exampleMeaning: '90', difficulty: DIFFICULTY.VERY_EASY },
      { word: '十', reading: 'shí', meaning: 'mười (10)', example: '十二月', exampleMeaning: 'Tháng 12', difficulty: DIFFICULTY.VERY_EASY },
      { word: '百', reading: 'bǎi', meaning: 'trăm (100)', example: '一百块', exampleMeaning: '100 tệ', difficulty: DIFFICULTY.EASY },
    ],
    quizzes: [
      { question: '"三" đọc là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['sān', 'sì', 'wǔ', 'liù'], answer: 'sān', explanationVi: '三 = sān = ba', difficulty: DIFFICULTY.VERY_EASY },
      { question: '"Bảy" trong tiếng Trung là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['六', '七', '八', '九'], answer: '七', explanationVi: '七 (qī) = bảy', difficulty: DIFFICULTY.VERY_EASY },
      { question: '"十" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Một', 'Năm', 'Mười', 'Trăm'], answer: 'Mười', explanationVi: '十 (shí) = mười', difficulty: DIFFICULTY.VERY_EASY },
      { question: '"百" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Mười', 'Trăm', 'Nghìn', 'Vạn'], answer: 'Trăm', explanationVi: '百 (bǎi) = trăm', difficulty: DIFFICULTY.EASY },
      { question: '"四" đọc là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['sān', 'sì', 'wǔ', 'èr'], answer: 'sì', explanationVi: '四 = sì = bốn', difficulty: DIFFICULTY.VERY_EASY },
    ],
  },
];
