import { LessonData } from '../utils';
import { TOPICS, DIFFICULTY, QUIZ_TYPES } from '../constants';

export const japaneseWeatherLessons: LessonData[] = [
  {
    title: 'Weather & Seasons',
    titleVi: 'Thời tiết & Mùa',
    description: 'Learn weather and season vocabulary in Japanese',
    descriptionVi: 'Học từ vựng về thời tiết và mùa bằng tiếng Nhật',
    topic: TOPICS.WEATHER,
    vocabulary: [
      { word: '天気 (てんき)', meaning: 'thời tiết', example: '今日の天気はいいです。', exampleMeaning: 'Thời tiết hôm nay đẹp.', difficulty: DIFFICULTY.EASY },
      { word: '暑い (あつい)', meaning: 'nóng', example: '今日は暑いです。', exampleMeaning: 'Hôm nay nóng.', difficulty: DIFFICULTY.EASY },
      { word: '寒い (さむい)', meaning: 'lạnh', example: '冬は寒いです。', exampleMeaning: 'Mùa đông lạnh.', difficulty: DIFFICULTY.EASY },
      { word: '雨 (あめ)', meaning: 'mưa', example: '雨が降っています。', exampleMeaning: 'Trời đang mưa.', difficulty: DIFFICULTY.EASY },
      { word: '雪 (ゆき)', meaning: 'tuyết', example: '雪が降っています。', exampleMeaning: 'Tuyết đang rơi.', difficulty: DIFFICULTY.EASY },
      { word: '風 (かぜ)', meaning: 'gió', example: '風が強いです。', exampleMeaning: 'Gió mạnh.', difficulty: DIFFICULTY.EASY },
      { word: '春 (はる)', meaning: 'mùa xuân', example: '春は暖かいです。', exampleMeaning: 'Mùa xuân ấm áp.', difficulty: DIFFICULTY.EASY },
      { word: '夏 (なつ)', meaning: 'mùa hè', example: '夏は暑いです。', exampleMeaning: 'Mùa hè nóng.', difficulty: DIFFICULTY.EASY },
      { word: '秋 (あき)', meaning: 'mùa thu', example: '秋は涼しいです。', exampleMeaning: 'Mùa thu mát mẻ.', difficulty: DIFFICULTY.EASY },
      { word: '冬 (ふゆ)', meaning: 'mùa đông', example: '冬は寒いです。', exampleMeaning: 'Mùa đông lạnh.', difficulty: DIFFICULTY.EASY },
      { word: '曇り (くもり)', meaning: 'nhiều mây', example: '今日は曇りです。', exampleMeaning: 'Hôm nay nhiều mây.', difficulty: DIFFICULTY.MEDIUM },
      { word: '涼しい (すずしい)', meaning: 'mát mẻ', example: '今日は涼しいです。', exampleMeaning: 'Hôm nay mát mẻ.', difficulty: DIFFICULTY.MEDIUM },
    ],
    quizzes: [
      { question: '"天気" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Thời gian', 'Thời tiết', 'Nhiệt độ', 'Mùa'], answer: 'Thời tiết', explanationVi: '天気 (てんき) = thời tiết', difficulty: DIFFICULTY.EASY },
      { question: '"Nóng" trong tiếng Nhật là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['寒い', '暑い', '涼しい', '暖かい'], answer: '暑い', explanationVi: '暑い (あつい) = nóng', difficulty: DIFFICULTY.EASY },
      { question: '"雨" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Tuyết', 'Gió', 'Mưa', 'Sấm'], answer: 'Mưa', explanationVi: '雨 (あめ) = mưa', difficulty: DIFFICULTY.EASY },
      { question: '"Mùa xuân" trong tiếng Nhật là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['夏', '秋', '冬', '春'], answer: '春', explanationVi: '春 (はる) = mùa xuân', difficulty: DIFFICULTY.EASY },
      { question: '"冬" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Mùa xuân', 'Mùa hè', 'Mùa thu', 'Mùa đông'], answer: 'Mùa đông', explanationVi: '冬 (ふゆ) = mùa đông', difficulty: DIFFICULTY.EASY },
    ],
  },
];
