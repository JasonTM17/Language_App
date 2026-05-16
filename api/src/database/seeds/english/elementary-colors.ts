import { LessonData } from '../utils';
import { TOPICS, DIFFICULTY, QUIZ_TYPES } from '../constants';

export const englishColorsLessons: LessonData[] = [
  {
    title: 'Colors & Shapes',
    titleVi: 'Màu sắc & Hình dạng',
    description: 'Learn colors and shapes in English',
    descriptionVi: 'Học màu sắc và hình dạng bằng tiếng Anh',
    topic: TOPICS.COLORS,
    vocabulary: [
      { word: 'red', meaning: 'đỏ', example: 'The apple is red.', exampleMeaning: 'Quả táo màu đỏ.', difficulty: DIFFICULTY.VERY_EASY },
      { word: 'blue', meaning: 'xanh dương', example: 'The sky is blue.', exampleMeaning: 'Bầu trời màu xanh.', difficulty: DIFFICULTY.VERY_EASY },
      { word: 'green', meaning: 'xanh lá', example: 'The grass is green.', exampleMeaning: 'Cỏ màu xanh lá.', difficulty: DIFFICULTY.VERY_EASY },
      { word: 'yellow', meaning: 'vàng', example: 'The sun is yellow.', exampleMeaning: 'Mặt trời màu vàng.', difficulty: DIFFICULTY.VERY_EASY },
      { word: 'white', meaning: 'trắng', example: 'Snow is white.', exampleMeaning: 'Tuyết màu trắng.', difficulty: DIFFICULTY.VERY_EASY },
      { word: 'black', meaning: 'đen', example: 'The night is black.', exampleMeaning: 'Đêm tối màu đen.', difficulty: DIFFICULTY.VERY_EASY },
      { word: 'orange', meaning: 'cam', example: 'Oranges are orange.', exampleMeaning: 'Quả cam màu cam.', difficulty: DIFFICULTY.VERY_EASY },
      { word: 'purple', meaning: 'tím', example: 'She likes purple flowers.', exampleMeaning: 'Cô ấy thích hoa tím.', difficulty: DIFFICULTY.EASY },
      { word: 'pink', meaning: 'hồng', example: 'The dress is pink.', exampleMeaning: 'Chiếc váy màu hồng.', difficulty: DIFFICULTY.EASY },
      { word: 'brown', meaning: 'nâu', example: 'The dog is brown.', exampleMeaning: 'Con chó màu nâu.', difficulty: DIFFICULTY.EASY },
      { word: 'circle', meaning: 'hình tròn', example: 'Draw a circle.', exampleMeaning: 'Vẽ một hình tròn.', difficulty: DIFFICULTY.EASY },
      { word: 'square', meaning: 'hình vuông', example: 'The box is square.', exampleMeaning: 'Cái hộp hình vuông.', difficulty: DIFFICULTY.EASY },
    ],
    quizzes: [
      { question: '"red" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Xanh', 'Đỏ', 'Vàng', 'Trắng'], answer: 'Đỏ', explanationVi: 'Red = đỏ', difficulty: DIFFICULTY.VERY_EASY },
      { question: '"Xanh dương" trong tiếng Anh là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['green', 'blue', 'purple', 'black'], answer: 'blue', explanationVi: 'Blue = xanh dương', difficulty: DIFFICULTY.VERY_EASY },
      { question: '"purple" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Hồng', 'Tím', 'Nâu', 'Cam'], answer: 'Tím', explanationVi: 'Purple = tím', difficulty: DIFFICULTY.EASY },
      { question: 'Fill in: "The sky is _____." (xanh dương)', type: QUIZ_TYPES.FILL_BLANK, options: [], answer: 'blue', explanationVi: 'Blue = xanh dương', difficulty: DIFFICULTY.VERY_EASY },
      { question: '"Hình vuông" trong tiếng Anh là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['circle', 'square', 'triangle', 'rectangle'], answer: 'square', explanationVi: 'Square = hình vuông', difficulty: DIFFICULTY.EASY },
    ],
  },
];
