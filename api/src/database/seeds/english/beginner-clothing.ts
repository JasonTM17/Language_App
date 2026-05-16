import { LessonData } from '../utils';
import { TOPICS, DIFFICULTY, QUIZ_TYPES } from '../constants';

export const englishClothingLessons: LessonData[] = [
  {
    title: 'Clothing & Fashion',
    titleVi: 'Quần áo & Thời trang',
    description: 'Learn clothing vocabulary in English',
    descriptionVi: 'Học từ vựng về quần áo bằng tiếng Anh',
    topic: TOPICS.SHOPPING,
    vocabulary: [
      { word: 'shirt', meaning: 'áo sơ mi', example: 'He wears a white shirt.', exampleMeaning: 'Anh ấy mặc áo sơ mi trắng.', difficulty: DIFFICULTY.VERY_EASY },
      { word: 'pants', meaning: 'quần dài', example: 'These pants are too long.', exampleMeaning: 'Quần này dài quá.', difficulty: DIFFICULTY.VERY_EASY },
      { word: 'dress', meaning: 'váy đầm', example: 'She bought a new dress.', exampleMeaning: 'Cô ấy mua một chiếc váy mới.', difficulty: DIFFICULTY.VERY_EASY },
      { word: 'shoes', meaning: 'giày', example: 'I need new shoes.', exampleMeaning: 'Tôi cần giày mới.', difficulty: DIFFICULTY.VERY_EASY },
      { word: 'jacket', meaning: 'áo khoác', example: 'Wear a jacket, it is cold.', exampleMeaning: 'Mặc áo khoác đi, trời lạnh.', difficulty: DIFFICULTY.EASY },
      { word: 'hat', meaning: 'mũ/nón', example: 'She wears a hat in summer.', exampleMeaning: 'Cô ấy đội mũ vào mùa hè.', difficulty: DIFFICULTY.VERY_EASY },
      { word: 'socks', meaning: 'tất/vớ', example: 'I wear socks every day.', exampleMeaning: 'Tôi mang tất mỗi ngày.', difficulty: DIFFICULTY.EASY },
      { word: 'skirt', meaning: 'chân váy', example: 'The skirt is very pretty.', exampleMeaning: 'Chân váy rất đẹp.', difficulty: DIFFICULTY.EASY },
      { word: 'sweater', meaning: 'áo len', example: 'I wear a sweater in winter.', exampleMeaning: 'Tôi mặc áo len vào mùa đông.', difficulty: DIFFICULTY.EASY },
      { word: 'boots', meaning: 'ủng/bốt', example: 'She wears boots when it rains.', exampleMeaning: 'Cô ấy mang ủng khi trời mưa.', difficulty: DIFFICULTY.EASY },
      { word: 'tie', meaning: 'cà vạt', example: 'He wears a tie to work.', exampleMeaning: 'Anh ấy đeo cà vạt đi làm.', difficulty: DIFFICULTY.EASY },
      { word: 'scarf', meaning: 'khăn quàng', example: 'The scarf keeps me warm.', exampleMeaning: 'Khăn quàng giữ ấm cho tôi.', difficulty: DIFFICULTY.EASY },
    ],
    quizzes: [
      { question: '"shirt" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Quần', 'Áo sơ mi', 'Váy', 'Giày'], answer: 'Áo sơ mi', explanationVi: 'Shirt = áo sơ mi', difficulty: DIFFICULTY.VERY_EASY },
      { question: '"Giày" trong tiếng Anh là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['socks', 'boots', 'shoes', 'sandals'], answer: 'shoes', explanationVi: 'Shoes = giày', difficulty: DIFFICULTY.VERY_EASY },
      { question: '"jacket" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Áo khoác', 'Áo len', 'Áo sơ mi', 'Áo thun'], answer: 'Áo khoác', explanationVi: 'Jacket = áo khoác', difficulty: DIFFICULTY.EASY },
      { question: 'Fill in: "She wears a _____ in summer." (mũ)', type: QUIZ_TYPES.FILL_BLANK, options: [], answer: 'hat', explanationVi: 'Hat = mũ, nón', difficulty: DIFFICULTY.EASY },
      { question: '"Cà vạt" trong tiếng Anh là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['belt', 'tie', 'scarf', 'ribbon'], answer: 'tie', explanationVi: 'Tie = cà vạt', difficulty: DIFFICULTY.EASY },
    ],
  },
];
