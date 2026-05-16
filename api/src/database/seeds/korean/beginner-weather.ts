import { LessonData } from '../utils';
import { TOPICS, DIFFICULTY, QUIZ_TYPES } from '../constants';

export const koreanWeatherLessons: LessonData[] = [
  {
    title: 'Weather & Seasons',
    titleVi: 'Thời tiết & Mùa',
    description: 'Learn weather and season vocabulary in Korean',
    descriptionVi: 'Học từ vựng về thời tiết và mùa bằng tiếng Hàn',
    topic: TOPICS.WEATHER,
    vocabulary: [
      { word: '날씨', meaning: 'thời tiết', example: '오늘 날씨가 좋아요.', exampleMeaning: 'Thời tiết hôm nay đẹp.', difficulty: DIFFICULTY.EASY },
      { word: '더워요', meaning: 'nóng', example: '오늘 너무 더워요.', exampleMeaning: 'Hôm nay rất nóng.', difficulty: DIFFICULTY.EASY },
      { word: '추워요', meaning: 'lạnh', example: '겨울은 추워요.', exampleMeaning: 'Mùa đông lạnh.', difficulty: DIFFICULTY.EASY },
      { word: '비', meaning: 'mưa', example: '비가 와요.', exampleMeaning: 'Trời đang mưa.', difficulty: DIFFICULTY.EASY },
      { word: '눈', meaning: 'tuyết', example: '눈이 와요.', exampleMeaning: 'Tuyết đang rơi.', difficulty: DIFFICULTY.EASY },
      { word: '바람', meaning: 'gió', example: '바람이 불어요.', exampleMeaning: 'Gió đang thổi.', difficulty: DIFFICULTY.EASY },
      { word: '봄', meaning: 'mùa xuân', example: '봄에 꽃이 피어요.', exampleMeaning: 'Mùa xuân hoa nở.', difficulty: DIFFICULTY.EASY },
      { word: '여름', meaning: 'mùa hè', example: '여름에 바다에 가요.', exampleMeaning: 'Mùa hè đi biển.', difficulty: DIFFICULTY.EASY },
      { word: '가을', meaning: 'mùa thu', example: '가을에 단풍이 예뻐요.', exampleMeaning: 'Mùa thu lá đỏ đẹp.', difficulty: DIFFICULTY.EASY },
      { word: '겨울', meaning: 'mùa đông', example: '겨울에 눈이 와요.', exampleMeaning: 'Mùa đông tuyết rơi.', difficulty: DIFFICULTY.EASY },
      { word: '맑아요', meaning: 'trời trong', example: '오늘 하늘이 맑아요.', exampleMeaning: 'Hôm nay trời trong.', difficulty: DIFFICULTY.MEDIUM },
      { word: '흐려요', meaning: 'nhiều mây', example: '오늘 날씨가 흐려요.', exampleMeaning: 'Hôm nay nhiều mây.', difficulty: DIFFICULTY.MEDIUM },
    ],
    quizzes: [
      { question: '"날씨" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Thời gian', 'Thời tiết', 'Nhiệt độ', 'Mùa'], answer: 'Thời tiết', explanationVi: '날씨 = thời tiết', difficulty: DIFFICULTY.EASY },
      { question: '"Nóng" trong tiếng Hàn là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['추워요', '더워요', '맑아요', '흐려요'], answer: '더워요', explanationVi: '더워요 = nóng', difficulty: DIFFICULTY.EASY },
      { question: '"비" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Tuyết', 'Gió', 'Mưa', 'Sấm'], answer: 'Mưa', explanationVi: '비 = mưa', difficulty: DIFFICULTY.EASY },
      { question: '"Mùa xuân" trong tiếng Hàn là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['여름', '가을', '겨울', '봄'], answer: '봄', explanationVi: '봄 = mùa xuân', difficulty: DIFFICULTY.EASY },
      { question: '"겨울" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Mùa xuân', 'Mùa hè', 'Mùa thu', 'Mùa đông'], answer: 'Mùa đông', explanationVi: '겨울 = mùa đông', difficulty: DIFFICULTY.EASY },
    ],
  },
];
