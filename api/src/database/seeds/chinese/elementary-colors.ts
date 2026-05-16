import { LessonData } from '../utils';
import { TOPICS, DIFFICULTY, QUIZ_TYPES } from '../constants';

export const chineseColorsLessons: LessonData[] = [
  {
    title: 'Colors',
    titleVi: 'Màu sắc',
    description: 'Learn color vocabulary in Chinese',
    descriptionVi: 'Học từ vựng về màu sắc bằng tiếng Trung',
    topic: TOPICS.COLORS,
    vocabulary: [
      { word: '红色 (hóngsè)', meaning: 'đỏ', example: '红色的苹果。', exampleMeaning: 'Quả táo đỏ.', difficulty: DIFFICULTY.EASY },
      { word: '蓝色 (lánsè)', meaning: 'xanh dương', example: '天空是蓝色的。', exampleMeaning: 'Bầu trời xanh.', difficulty: DIFFICULTY.EASY },
      { word: '黄色 (huángsè)', meaning: 'vàng', example: '黄色的花。', exampleMeaning: 'Hoa vàng.', difficulty: DIFFICULTY.EASY },
      { word: '绿色 (lǜsè)', meaning: 'xanh lá', example: '绿色的树。', exampleMeaning: 'Cây xanh.', difficulty: DIFFICULTY.EASY },
      { word: '白色 (báisè)', meaning: 'trắng', example: '白色的云。', exampleMeaning: 'Mây trắng.', difficulty: DIFFICULTY.EASY },
      { word: '黑色 (hēisè)', meaning: 'đen', example: '黑色的猫。', exampleMeaning: 'Con mèo đen.', difficulty: DIFFICULTY.EASY },
      { word: '粉色 (fěnsè)', meaning: 'hồng', example: '我喜欢粉色。', exampleMeaning: 'Tôi thích màu hồng.', difficulty: DIFFICULTY.EASY },
      { word: '橙色 (chéngsè)', meaning: 'cam', example: '橙色的果汁。', exampleMeaning: 'Nước cam.', difficulty: DIFFICULTY.EASY },
      { word: '紫色 (zǐsè)', meaning: 'tím', example: '紫色的衣服。', exampleMeaning: 'Áo tím.', difficulty: DIFFICULTY.EASY },
      { word: '棕色 (zōngsè)', meaning: 'nâu', example: '棕色的狗。', exampleMeaning: 'Con chó nâu.', difficulty: DIFFICULTY.EASY },
      { word: '灰色 (huīsè)', meaning: 'xám', example: '灰色的天空。', exampleMeaning: 'Bầu trời xám.', difficulty: DIFFICULTY.EASY },
      { word: '金色 (jīnsè)', meaning: 'vàng kim', example: '金色的戒指。', exampleMeaning: 'Nhẫn vàng.', difficulty: DIFFICULTY.MEDIUM },
    ],
    quizzes: [
      { question: '"红色" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Xanh', 'Đỏ', 'Vàng', 'Trắng'], answer: 'Đỏ', explanationVi: '红色 (hóngsè) = đỏ', difficulty: DIFFICULTY.EASY },
      { question: '"Xanh lá" trong tiếng Trung là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['蓝色', '绿色', '黄色', '白色'], answer: '绿色', explanationVi: '绿色 (lǜsè) = xanh lá', difficulty: DIFFICULTY.EASY },
      { question: '"黑色" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Trắng', 'Đen', 'Xám', 'Nâu'], answer: 'Đen', explanationVi: '黑色 (hēisè) = đen', difficulty: DIFFICULTY.EASY },
      { question: '"Tím" trong tiếng Trung là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['粉色', '紫色', '橙色', '棕色'], answer: '紫色', explanationVi: '紫色 (zǐsè) = tím', difficulty: DIFFICULTY.EASY },
      { question: '"黄色" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Cam', 'Vàng', 'Nâu', 'Đỏ'], answer: 'Vàng', explanationVi: '黄色 (huángsè) = vàng', difficulty: DIFFICULTY.EASY },
    ],
  },
];
