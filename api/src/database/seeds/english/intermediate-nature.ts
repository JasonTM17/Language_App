import { LessonData } from '../utils';
import { TOPICS, DIFFICULTY, QUIZ_TYPES } from '../constants';

export const englishNatureLessons: LessonData[] = [
  {
    title: 'Nature & Geography',
    titleVi: 'Thiên nhiên & Địa lý',
    description: 'Learn nature and geography vocabulary in English',
    descriptionVi: 'Học từ vựng về thiên nhiên và địa lý bằng tiếng Anh',
    topic: TOPICS.WEATHER,
    vocabulary: [
      { word: 'volcano', meaning: 'núi lửa', example: 'The volcano erupted last year.', exampleMeaning: 'Núi lửa phun trào năm ngoái.', difficulty: DIFFICULTY.MEDIUM },
      { word: 'glacier', meaning: 'sông băng', example: 'Glaciers are melting due to climate change.', exampleMeaning: 'Sông băng đang tan do biến đổi khí hậu.', difficulty: DIFFICULTY.HARD },
      { word: 'peninsula', meaning: 'bán đảo', example: 'Korea is a peninsula.', exampleMeaning: 'Hàn Quốc là một bán đảo.', difficulty: DIFFICULTY.MEDIUM },
      { word: 'archipelago', meaning: 'quần đảo', example: 'Japan is an archipelago.', exampleMeaning: 'Nhật Bản là một quần đảo.', difficulty: DIFFICULTY.HARD },
      { word: 'waterfall', meaning: 'thác nước', example: 'The waterfall is beautiful.', exampleMeaning: 'Thác nước rất đẹp.', difficulty: DIFFICULTY.EASY },
      { word: 'canyon', meaning: 'hẻm núi', example: 'The Grand Canyon is famous.', exampleMeaning: 'Grand Canyon rất nổi tiếng.', difficulty: DIFFICULTY.MEDIUM },
      { word: 'coral reef', meaning: 'rạn san hô', example: 'Coral reefs are endangered.', exampleMeaning: 'Rạn san hô đang bị đe dọa.', difficulty: DIFFICULTY.MEDIUM },
      { word: 'drought', meaning: 'hạn hán', example: 'The drought lasted three months.', exampleMeaning: 'Hạn hán kéo dài ba tháng.', difficulty: DIFFICULTY.MEDIUM },
      { word: 'ecosystem', meaning: 'hệ sinh thái', example: 'Protect the ecosystem.', exampleMeaning: 'Bảo vệ hệ sinh thái.', difficulty: DIFFICULTY.HARD },
      { word: 'biodiversity', meaning: 'đa dạng sinh học', example: 'Biodiversity is important.', exampleMeaning: 'Đa dạng sinh học rất quan trọng.', difficulty: DIFFICULTY.HARD },
      { word: 'tropical', meaning: 'nhiệt đới', example: 'Vietnam has a tropical climate.', exampleMeaning: 'Việt Nam có khí hậu nhiệt đới.', difficulty: DIFFICULTY.MEDIUM },
      { word: 'continent', meaning: 'lục địa', example: 'There are seven continents.', exampleMeaning: 'Có bảy lục địa.', difficulty: DIFFICULTY.EASY },
    ],
    quizzes: [
      { question: '"volcano" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Sông', 'Núi lửa', 'Hồ', 'Đồi'], answer: 'Núi lửa', explanationVi: 'volcano = núi lửa', difficulty: DIFFICULTY.MEDIUM },
      { question: '"Sông băng" trong tiếng Anh là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['waterfall', 'glacier', 'canyon', 'volcano'], answer: 'glacier', explanationVi: 'glacier = sông băng', difficulty: DIFFICULTY.HARD },
      { question: '"archipelago" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Bán đảo', 'Quần đảo', 'Lục địa', 'Đại dương'], answer: 'Quần đảo', explanationVi: 'archipelago = quần đảo', difficulty: DIFFICULTY.HARD },
      { question: '"Hạn hán" trong tiếng Anh là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['flood', 'drought', 'storm', 'earthquake'], answer: 'drought', explanationVi: 'drought = hạn hán', difficulty: DIFFICULTY.MEDIUM },
      { question: '"ecosystem" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Khí hậu', 'Hệ sinh thái', 'Thời tiết', 'Môi trường'], answer: 'Hệ sinh thái', explanationVi: 'ecosystem = hệ sinh thái', difficulty: DIFFICULTY.HARD },
    ],
  },
];
