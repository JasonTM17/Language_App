import { LessonData } from '../utils';
import { TOPICS, DIFFICULTY, QUIZ_TYPES } from '../constants';

export const englishWeatherLessons: LessonData[] = [
  {
    title: 'Weather & Seasons',
    titleVi: 'Thời tiết & Mùa',
    description: 'Learn to talk about weather and seasons in English',
    descriptionVi: 'Học cách nói về thời tiết và các mùa bằng tiếng Anh',
    topic: TOPICS.WEATHER,
    vocabulary: [
      { word: 'sunny', meaning: 'nắng', example: 'It is sunny today.', exampleMeaning: 'Hôm nay trời nắng.', difficulty: DIFFICULTY.VERY_EASY },
      { word: 'rainy', meaning: 'mưa', example: 'It is rainy outside.', exampleMeaning: 'Bên ngoài trời mưa.', difficulty: DIFFICULTY.VERY_EASY },
      { word: 'cloudy', meaning: 'nhiều mây', example: 'The sky is cloudy.', exampleMeaning: 'Bầu trời nhiều mây.', difficulty: DIFFICULTY.VERY_EASY },
      { word: 'windy', meaning: 'có gió', example: 'It is very windy today.', exampleMeaning: 'Hôm nay gió rất mạnh.', difficulty: DIFFICULTY.VERY_EASY },
      { word: 'hot', meaning: 'nóng', example: 'Summer is very hot in Vietnam.', exampleMeaning: 'Mùa hè ở Việt Nam rất nóng.', difficulty: DIFFICULTY.VERY_EASY },
      { word: 'cold', meaning: 'lạnh', example: 'Winter is cold in the north.', exampleMeaning: 'Mùa đông ở miền Bắc lạnh.', difficulty: DIFFICULTY.VERY_EASY },
      { word: 'spring', meaning: 'mùa xuân', example: 'Spring is my favorite season.', exampleMeaning: 'Mùa xuân là mùa yêu thích của tôi.', difficulty: DIFFICULTY.EASY },
      { word: 'summer', meaning: 'mùa hè', example: 'We go swimming in summer.', exampleMeaning: 'Chúng tôi đi bơi vào mùa hè.', difficulty: DIFFICULTY.EASY },
      { word: 'autumn', meaning: 'mùa thu', example: 'Leaves fall in autumn.', exampleMeaning: 'Lá rụng vào mùa thu.', difficulty: DIFFICULTY.EASY },
      { word: 'winter', meaning: 'mùa đông', example: 'It snows in winter.', exampleMeaning: 'Tuyết rơi vào mùa đông.', difficulty: DIFFICULTY.EASY },
      { word: 'temperature', meaning: 'nhiệt độ', example: 'The temperature is 30 degrees.', exampleMeaning: 'Nhiệt độ là 30 độ.', difficulty: DIFFICULTY.EASY },
      { word: 'forecast', meaning: 'dự báo', example: 'Check the weather forecast.', exampleMeaning: 'Kiểm tra dự báo thời tiết.', difficulty: DIFFICULTY.MEDIUM },
    ],
    quizzes: [
      { question: '"sunny" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Mưa', 'Nắng', 'Gió', 'Mây'], answer: 'Nắng', explanationVi: 'Sunny = nắng, có nắng', difficulty: DIFFICULTY.VERY_EASY },
      { question: '"Mùa đông" trong tiếng Anh là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['spring', 'summer', 'autumn', 'winter'], answer: 'winter', explanationVi: 'Winter = mùa đông', difficulty: DIFFICULTY.EASY },
      { question: '"cold" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Nóng', 'Lạnh', 'Ấm', 'Mát'], answer: 'Lạnh', explanationVi: 'Cold = lạnh', difficulty: DIFFICULTY.VERY_EASY },
      { question: 'Fill in: "It is very _____ today." (gió)', type: QUIZ_TYPES.FILL_BLANK, options: [], answer: 'windy', explanationVi: 'Windy = có gió', difficulty: DIFFICULTY.EASY },
      { question: '"Dự báo thời tiết" trong tiếng Anh là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['weather forecast', 'weather report', 'weather news', 'weather check'], answer: 'weather forecast', explanationVi: 'Weather forecast = dự báo thời tiết', difficulty: DIFFICULTY.MEDIUM },
    ],
  },
];
