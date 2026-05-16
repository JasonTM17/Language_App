import { LessonData } from '../utils';
import { TOPICS, DIFFICULTY, QUIZ_TYPES } from '../constants';

export const japaneseColorsLessons: LessonData[] = [
  {
    title: 'Colors',
    titleVi: 'Màu sắc',
    description: 'Learn color vocabulary in Japanese',
    descriptionVi: 'Học từ vựng về màu sắc bằng tiếng Nhật',
    topic: TOPICS.COLORS,
    vocabulary: [
      { word: '赤 (あか)', meaning: 'đỏ', example: '赤いりんごです。', exampleMeaning: 'Đây là quả táo đỏ.', difficulty: DIFFICULTY.EASY },
      { word: '青 (あお)', meaning: 'xanh dương', example: '空は青いです。', exampleMeaning: 'Bầu trời xanh.', difficulty: DIFFICULTY.EASY },
      { word: '黄色 (きいろ)', meaning: 'vàng', example: '黄色い花です。', exampleMeaning: 'Đây là hoa vàng.', difficulty: DIFFICULTY.EASY },
      { word: '緑 (みどり)', meaning: 'xanh lá', example: '緑の木です。', exampleMeaning: 'Đây là cây xanh.', difficulty: DIFFICULTY.EASY },
      { word: '白 (しろ)', meaning: 'trắng', example: '白い雲です。', exampleMeaning: 'Đây là mây trắng.', difficulty: DIFFICULTY.EASY },
      { word: '黒 (くろ)', meaning: 'đen', example: '黒い猫です。', exampleMeaning: 'Đây là con mèo đen.', difficulty: DIFFICULTY.EASY },
      { word: 'ピンク', meaning: 'hồng', example: 'ピンクの花が好きです。', exampleMeaning: 'Tôi thích hoa hồng.', difficulty: DIFFICULTY.VERY_EASY },
      { word: 'オレンジ', meaning: 'cam', example: 'オレンジ色のジュースです。', exampleMeaning: 'Đây là nước cam.', difficulty: DIFFICULTY.VERY_EASY },
      { word: '紫 (むらさき)', meaning: 'tím', example: '紫の服です。', exampleMeaning: 'Đây là áo tím.', difficulty: DIFFICULTY.EASY },
      { word: '茶色 (ちゃいろ)', meaning: 'nâu', example: '茶色い犬です。', exampleMeaning: 'Đây là con chó nâu.', difficulty: DIFFICULTY.EASY },
      { word: '灰色 (はいいろ)', meaning: 'xám', example: '灰色の空です。', exampleMeaning: 'Bầu trời xám.', difficulty: DIFFICULTY.MEDIUM },
      { word: '金色 (きんいろ)', meaning: 'vàng kim', example: '金色の指輪です。', exampleMeaning: 'Đây là nhẫn vàng.', difficulty: DIFFICULTY.MEDIUM },
    ],
    quizzes: [
      { question: '"赤" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Xanh', 'Đỏ', 'Vàng', 'Trắng'], answer: 'Đỏ', explanationVi: '赤 (あか) = đỏ', difficulty: DIFFICULTY.EASY },
      { question: '"Xanh lá" trong tiếng Nhật là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['青', '緑', '黄色', '白'], answer: '緑', explanationVi: '緑 (みどり) = xanh lá', difficulty: DIFFICULTY.EASY },
      { question: '"黒" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Trắng', 'Đen', 'Xám', 'Nâu'], answer: 'Đen', explanationVi: '黒 (くろ) = đen', difficulty: DIFFICULTY.EASY },
      { question: '"Tím" trong tiếng Nhật là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['ピンク', '紫', 'オレンジ', '茶色'], answer: '紫', explanationVi: '紫 (むらさき) = tím', difficulty: DIFFICULTY.EASY },
      { question: '"黄色" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Cam', 'Vàng', 'Nâu', 'Đỏ'], answer: 'Vàng', explanationVi: '黄色 (きいろ) = vàng', difficulty: DIFFICULTY.EASY },
    ],
  },
];
