import { LessonData } from '../utils';
import { TOPICS, DIFFICULTY, QUIZ_TYPES } from '../constants';

export const chineseWeatherLessons: LessonData[] = [
  {
    title: 'Weather & Seasons',
    titleVi: 'Thời tiết & Mùa',
    description: 'Learn weather and season vocabulary in Chinese',
    descriptionVi: 'Học từ vựng về thời tiết và mùa bằng tiếng Trung',
    topic: TOPICS.WEATHER,
    vocabulary: [
      { word: '天气 (tiānqì)', meaning: 'thời tiết', example: '今天天气很好。', exampleMeaning: 'Thời tiết hôm nay đẹp.', difficulty: DIFFICULTY.EASY },
      { word: '热 (rè)', meaning: 'nóng', example: '今天很热。', exampleMeaning: 'Hôm nay rất nóng.', difficulty: DIFFICULTY.EASY },
      { word: '冷 (lěng)', meaning: 'lạnh', example: '冬天很冷。', exampleMeaning: 'Mùa đông rất lạnh.', difficulty: DIFFICULTY.EASY },
      { word: '下雨 (xià yǔ)', meaning: 'mưa', example: '今天下雨了。', exampleMeaning: 'Hôm nay mưa rồi.', difficulty: DIFFICULTY.EASY },
      { word: '下雪 (xià xuě)', meaning: 'tuyết rơi', example: '北京冬天下雪。', exampleMeaning: 'Bắc Kinh mùa đông có tuyết.', difficulty: DIFFICULTY.EASY },
      { word: '风 (fēng)', meaning: 'gió', example: '今天风很大。', exampleMeaning: 'Hôm nay gió lớn.', difficulty: DIFFICULTY.EASY },
      { word: '春天 (chūntiān)', meaning: 'mùa xuân', example: '春天很暖和。', exampleMeaning: 'Mùa xuân ấm áp.', difficulty: DIFFICULTY.EASY },
      { word: '夏天 (xiàtiān)', meaning: 'mùa hè', example: '夏天很热。', exampleMeaning: 'Mùa hè rất nóng.', difficulty: DIFFICULTY.EASY },
      { word: '秋天 (qiūtiān)', meaning: 'mùa thu', example: '秋天很凉快。', exampleMeaning: 'Mùa thu mát mẻ.', difficulty: DIFFICULTY.EASY },
      { word: '冬天 (dōngtiān)', meaning: 'mùa đông', example: '冬天很冷。', exampleMeaning: 'Mùa đông rất lạnh.', difficulty: DIFFICULTY.EASY },
      { word: '晴天 (qíngtiān)', meaning: 'trời nắng', example: '今天是晴天。', exampleMeaning: 'Hôm nay trời nắng.', difficulty: DIFFICULTY.MEDIUM },
      { word: '阴天 (yīntiān)', meaning: 'trời âm u', example: '今天是阴天。', exampleMeaning: 'Hôm nay trời âm u.', difficulty: DIFFICULTY.MEDIUM },
    ],
    quizzes: [
      { question: '"天气" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Thời gian', 'Thời tiết', 'Nhiệt độ', 'Mùa'], answer: 'Thời tiết', explanationVi: '天气 (tiānqì) = thời tiết', difficulty: DIFFICULTY.EASY },
      { question: '"Nóng" trong tiếng Trung là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['冷', '热', '凉快', '暖和'], answer: '热', explanationVi: '热 (rè) = nóng', difficulty: DIFFICULTY.EASY },
      { question: '"下雨" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Tuyết rơi', 'Gió thổi', 'Mưa', 'Sấm sét'], answer: 'Mưa', explanationVi: '下雨 (xià yǔ) = mưa', difficulty: DIFFICULTY.EASY },
      { question: '"Mùa xuân" trong tiếng Trung là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['夏天', '秋天', '冬天', '春天'], answer: '春天', explanationVi: '春天 (chūntiān) = mùa xuân', difficulty: DIFFICULTY.EASY },
      { question: '"冬天" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Mùa xuân', 'Mùa hè', 'Mùa thu', 'Mùa đông'], answer: 'Mùa đông', explanationVi: '冬天 (dōngtiān) = mùa đông', difficulty: DIFFICULTY.EASY },
    ],
  },
];
