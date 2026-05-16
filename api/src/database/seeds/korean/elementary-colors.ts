import { LessonData } from '../utils';
import { TOPICS, DIFFICULTY, QUIZ_TYPES } from '../constants';

export const koreanColorsLessons: LessonData[] = [
  {
    title: 'Colors',
    titleVi: 'Màu sắc',
    description: 'Learn color vocabulary in Korean',
    descriptionVi: 'Học từ vựng về màu sắc bằng tiếng Hàn',
    topic: TOPICS.COLORS,
    vocabulary: [
      { word: '빨간색', meaning: 'đỏ', example: '빨간색 사과예요.', exampleMeaning: 'Đây là quả táo đỏ.', difficulty: DIFFICULTY.EASY },
      { word: '파란색', meaning: 'xanh dương', example: '하늘이 파란색이에요.', exampleMeaning: 'Bầu trời xanh.', difficulty: DIFFICULTY.EASY },
      { word: '노란색', meaning: 'vàng', example: '노란색 꽃이에요.', exampleMeaning: 'Đây là hoa vàng.', difficulty: DIFFICULTY.EASY },
      { word: '초록색', meaning: 'xanh lá', example: '초록색 나무예요.', exampleMeaning: 'Đây là cây xanh.', difficulty: DIFFICULTY.EASY },
      { word: '하얀색', meaning: 'trắng', example: '하얀색 구름이에요.', exampleMeaning: 'Đây là mây trắng.', difficulty: DIFFICULTY.EASY },
      { word: '검은색', meaning: 'đen', example: '검은색 고양이예요.', exampleMeaning: 'Đây là con mèo đen.', difficulty: DIFFICULTY.EASY },
      { word: '분홍색', meaning: 'hồng', example: '분홍색 꽃을 좋아해요.', exampleMeaning: 'Tôi thích hoa hồng.', difficulty: DIFFICULTY.EASY },
      { word: '주황색', meaning: 'cam', example: '주황색 주스예요.', exampleMeaning: 'Đây là nước cam.', difficulty: DIFFICULTY.EASY },
      { word: '보라색', meaning: 'tím', example: '보라색 옷이에요.', exampleMeaning: 'Đây là áo tím.', difficulty: DIFFICULTY.EASY },
      { word: '갈색', meaning: 'nâu', example: '갈색 강아지예요.', exampleMeaning: 'Đây là con chó nâu.', difficulty: DIFFICULTY.EASY },
      { word: '회색', meaning: 'xám', example: '회색 하늘이에요.', exampleMeaning: 'Bầu trời xám.', difficulty: DIFFICULTY.EASY },
      { word: '금색', meaning: 'vàng kim', example: '금색 반지예요.', exampleMeaning: 'Đây là nhẫn vàng.', difficulty: DIFFICULTY.MEDIUM },
    ],
    quizzes: [
      { question: '"빨간색" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Xanh', 'Đỏ', 'Vàng', 'Trắng'], answer: 'Đỏ', explanationVi: '빨간색 = đỏ', difficulty: DIFFICULTY.EASY },
      { question: '"Xanh lá" trong tiếng Hàn là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['파란색', '초록색', '노란색', '하얀색'], answer: '초록색', explanationVi: '초록색 = xanh lá', difficulty: DIFFICULTY.EASY },
      { question: '"검은색" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Trắng', 'Đen', 'Xám', 'Nâu'], answer: 'Đen', explanationVi: '검은색 = đen', difficulty: DIFFICULTY.EASY },
      { question: '"Tím" trong tiếng Hàn là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['분홍색', '보라색', '주황색', '갈색'], answer: '보라색', explanationVi: '보라색 = tím', difficulty: DIFFICULTY.EASY },
      { question: '"노란색" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Cam', 'Vàng', 'Nâu', 'Đỏ'], answer: 'Vàng', explanationVi: '노란색 = vàng', difficulty: DIFFICULTY.EASY },
    ],
  },
];
