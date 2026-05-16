import { LessonData } from '../utils';
import { TOPICS, DIFFICULTY, QUIZ_TYPES } from '../constants';

export const englishFoodIntermediateLessons: LessonData[] = [
  {
    title: 'Cooking & Cuisine',
    titleVi: 'Nấu ăn & Ẩm thực',
    description: 'Learn cooking and cuisine vocabulary in English',
    descriptionVi: 'Học từ vựng về nấu ăn và ẩm thực bằng tiếng Anh',
    topic: TOPICS.FOOD,
    vocabulary: [
      { word: 'ingredient', meaning: 'nguyên liệu', example: 'What ingredients do we need?', exampleMeaning: 'Chúng ta cần nguyên liệu gì?', difficulty: DIFFICULTY.MEDIUM },
      { word: 'recipe', meaning: 'công thức nấu ăn', example: 'Follow the recipe carefully.', exampleMeaning: 'Làm theo công thức cẩn thận.', difficulty: DIFFICULTY.EASY },
      { word: 'marinate', meaning: 'ướp', example: 'Marinate the chicken overnight.', exampleMeaning: 'Ướp gà qua đêm.', difficulty: DIFFICULTY.MEDIUM },
      { word: 'simmer', meaning: 'ninh/hầm nhỏ lửa', example: 'Let the soup simmer for 30 minutes.', exampleMeaning: 'Để súp ninh 30 phút.', difficulty: DIFFICULTY.MEDIUM },
      { word: 'seasoning', meaning: 'gia vị', example: 'Add seasoning to taste.', exampleMeaning: 'Thêm gia vị vừa ăn.', difficulty: DIFFICULTY.EASY },
      { word: 'appetizer', meaning: 'món khai vị', example: 'We ordered an appetizer.', exampleMeaning: 'Chúng tôi gọi món khai vị.', difficulty: DIFFICULTY.MEDIUM },
      { word: 'cuisine', meaning: 'ẩm thực', example: 'Vietnamese cuisine is delicious.', exampleMeaning: 'Ẩm thực Việt Nam rất ngon.', difficulty: DIFFICULTY.MEDIUM },
      { word: 'portion', meaning: 'khẩu phần', example: 'The portions are generous.', exampleMeaning: 'Khẩu phần rất hào phóng.', difficulty: DIFFICULTY.MEDIUM },
      { word: 'garnish', meaning: 'trang trí món ăn', example: 'Garnish with fresh herbs.', exampleMeaning: 'Trang trí với rau thơm tươi.', difficulty: DIFFICULTY.HARD },
      { word: 'fermented', meaning: 'lên men', example: 'Kimchi is a fermented food.', exampleMeaning: 'Kim chi là thực phẩm lên men.', difficulty: DIFFICULTY.HARD },
      { word: 'organic', meaning: 'hữu cơ', example: 'I prefer organic vegetables.', exampleMeaning: 'Tôi thích rau hữu cơ.', difficulty: DIFFICULTY.MEDIUM },
      { word: 'dietary', meaning: 'chế độ ăn', example: 'Do you have dietary restrictions?', exampleMeaning: 'Bạn có hạn chế chế độ ăn không?', difficulty: DIFFICULTY.MEDIUM },
    ],
    quizzes: [
      { question: '"ingredient" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Công thức', 'Nguyên liệu', 'Gia vị', 'Khẩu phần'], answer: 'Nguyên liệu', explanationVi: 'ingredient = nguyên liệu', difficulty: DIFFICULTY.MEDIUM },
      { question: '"Ướp" trong tiếng Anh là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['simmer', 'marinate', 'garnish', 'season'], answer: 'marinate', explanationVi: 'marinate = ướp', difficulty: DIFFICULTY.MEDIUM },
      { question: '"appetizer" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Món chính', 'Món khai vị', 'Món tráng miệng', 'Đồ uống'], answer: 'Món khai vị', explanationVi: 'appetizer = món khai vị', difficulty: DIFFICULTY.MEDIUM },
      { question: '"Lên men" trong tiếng Anh là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['organic', 'fermented', 'dietary', 'seasoning'], answer: 'fermented', explanationVi: 'fermented = lên men', difficulty: DIFFICULTY.HARD },
      { question: '"cuisine" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Nhà hàng', 'Ẩm thực', 'Đầu bếp', 'Thực đơn'], answer: 'Ẩm thực', explanationVi: 'cuisine = ẩm thực', difficulty: DIFFICULTY.MEDIUM },
    ],
  },
];
