import { LessonData } from '../utils';
import { TOPICS, DIFFICULTY, QUIZ_TYPES } from '../constants';

export const englishAnimalsLessons: LessonData[] = [
  {
    title: 'Animals & Nature',
    titleVi: 'Động vật & Thiên nhiên',
    description: 'Learn animal vocabulary in English',
    descriptionVi: 'Học từ vựng về động vật bằng tiếng Anh',
    topic: TOPICS.ANIMALS,
    vocabulary: [
      { word: 'dog', meaning: 'con chó', example: 'I have a dog.', exampleMeaning: 'Tôi có một con chó.', difficulty: DIFFICULTY.VERY_EASY },
      { word: 'cat', meaning: 'con mèo', example: 'The cat is sleeping.', exampleMeaning: 'Con mèo đang ngủ.', difficulty: DIFFICULTY.VERY_EASY },
      { word: 'bird', meaning: 'con chim', example: 'The bird is singing.', exampleMeaning: 'Con chim đang hót.', difficulty: DIFFICULTY.VERY_EASY },
      { word: 'fish', meaning: 'con cá', example: 'There are fish in the lake.', exampleMeaning: 'Có cá trong hồ.', difficulty: DIFFICULTY.VERY_EASY },
      { word: 'elephant', meaning: 'con voi', example: 'Elephants are very big.', exampleMeaning: 'Voi rất to.', difficulty: DIFFICULTY.EASY },
      { word: 'monkey', meaning: 'con khỉ', example: 'Monkeys live in trees.', exampleMeaning: 'Khỉ sống trên cây.', difficulty: DIFFICULTY.EASY },
      { word: 'tiger', meaning: 'con hổ', example: 'The tiger is fast.', exampleMeaning: 'Con hổ rất nhanh.', difficulty: DIFFICULTY.EASY },
      { word: 'butterfly', meaning: 'con bướm', example: 'The butterfly is beautiful.', exampleMeaning: 'Con bướm rất đẹp.', difficulty: DIFFICULTY.EASY },
      { word: 'dolphin', meaning: 'cá heo', example: 'Dolphins are intelligent.', exampleMeaning: 'Cá heo rất thông minh.', difficulty: DIFFICULTY.EASY },
      { word: 'turtle', meaning: 'con rùa', example: 'Turtles live very long.', exampleMeaning: 'Rùa sống rất lâu.', difficulty: DIFFICULTY.EASY },
      { word: 'rabbit', meaning: 'con thỏ', example: 'Rabbits eat carrots.', exampleMeaning: 'Thỏ ăn cà rốt.', difficulty: DIFFICULTY.EASY },
      { word: 'snake', meaning: 'con rắn', example: 'I am afraid of snakes.', exampleMeaning: 'Tôi sợ rắn.', difficulty: DIFFICULTY.EASY },
    ],
    quizzes: [
      { question: '"dog" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Con mèo', 'Con chó', 'Con chim', 'Con cá'], answer: 'Con chó', explanationVi: 'Dog = con chó', difficulty: DIFFICULTY.VERY_EASY },
      { question: '"Con voi" trong tiếng Anh là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['tiger', 'elephant', 'monkey', 'dolphin'], answer: 'elephant', explanationVi: 'Elephant = con voi', difficulty: DIFFICULTY.EASY },
      { question: '"butterfly" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Con ong', 'Con bướm', 'Con chuồn chuồn', 'Con kiến'], answer: 'Con bướm', explanationVi: 'Butterfly = con bướm', difficulty: DIFFICULTY.EASY },
      { question: 'Fill in: "I am afraid of _____." (rắn)', type: QUIZ_TYPES.FILL_BLANK, options: [], answer: 'snakes', explanationVi: 'Snake(s) = con rắn', difficulty: DIFFICULTY.EASY },
      { question: '"Con thỏ" trong tiếng Anh là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['turtle', 'rabbit', 'snake', 'fish'], answer: 'rabbit', explanationVi: 'Rabbit = con thỏ', difficulty: DIFFICULTY.EASY },
    ],
  },
];
