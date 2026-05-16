import { LessonData } from '../utils';
import { TOPICS, DIFFICULTY, QUIZ_TYPES } from '../constants';

export const japaneseNatureLessons: LessonData[] = [
  {
    title: 'Nature & Geography',
    titleVi: 'Thiên nhiên & Địa lý',
    description: 'Learn nature and geography vocabulary in Japanese',
    descriptionVi: 'Học từ vựng về thiên nhiên và địa lý bằng tiếng Nhật',
    topic: TOPICS.WEATHER,
    vocabulary: [
      { word: '火山 (かざん)', meaning: 'núi lửa', example: '火山が噴火しました。', exampleMeaning: 'Núi lửa đã phun trào.', difficulty: DIFFICULTY.MEDIUM },
      { word: '氷河 (ひょうが)', meaning: 'sông băng', example: '氷河が溶けています。', exampleMeaning: 'Sông băng đang tan.', difficulty: DIFFICULTY.HARD },
      { word: '半島 (はんとう)', meaning: 'bán đảo', example: '韓国は半島です。', exampleMeaning: 'Hàn Quốc là bán đảo.', difficulty: DIFFICULTY.MEDIUM },
      { word: '群島 (ぐんとう)', meaning: 'quần đảo', example: '日本は群島です。', exampleMeaning: 'Nhật Bản là quần đảo.', difficulty: DIFFICULTY.HARD },
      { word: '滝 (たき)', meaning: 'thác nước', example: '滝がきれいです。', exampleMeaning: 'Thác nước rất đẹp.', difficulty: DIFFICULTY.EASY },
      { word: '峡谷 (きょうこく)', meaning: 'hẻm núi', example: '峡谷は壮大です。', exampleMeaning: 'Hẻm núi rất hùng vĩ.', difficulty: DIFFICULTY.HARD },
      { word: 'サンゴ礁 (さんごしょう)', meaning: 'rạn san hô', example: 'サンゴ礁を守りましょう。', exampleMeaning: 'Hãy bảo vệ rạn san hô.', difficulty: DIFFICULTY.HARD },
      { word: '干ばつ (かんばつ)', meaning: 'hạn hán', example: '干ばつが続いています。', exampleMeaning: 'Hạn hán đang tiếp diễn.', difficulty: DIFFICULTY.MEDIUM },
      { word: '生態系 (せいたいけい)', meaning: 'hệ sinh thái', example: '生態系を保護しましょう。', exampleMeaning: 'Hãy bảo vệ hệ sinh thái.', difficulty: DIFFICULTY.HARD },
      { word: '生物多様性 (せいぶつたようせい)', meaning: 'đa dạng sinh học', example: '生物多様性は大切です。', exampleMeaning: 'Đa dạng sinh học rất quan trọng.', difficulty: DIFFICULTY.HARD },
      { word: '熱帯 (ねったい)', meaning: 'nhiệt đới', example: 'ベトナムは熱帯気候です。', exampleMeaning: 'Việt Nam có khí hậu nhiệt đới.', difficulty: DIFFICULTY.MEDIUM },
      { word: '大陸 (たいりく)', meaning: 'lục địa', example: '大陸は七つあります。', exampleMeaning: 'Có bảy lục địa.', difficulty: DIFFICULTY.EASY },
    ],
    quizzes: [
      { question: '"火山" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Sông', 'Núi lửa', 'Hồ', 'Đồi'], answer: 'Núi lửa', explanationVi: '火山 (かざん) = núi lửa', difficulty: DIFFICULTY.MEDIUM },
      { question: '"Sông băng" trong tiếng Nhật là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['滝', '氷河', '峡谷', '火山'], answer: '氷河', explanationVi: '氷河 (ひょうが) = sông băng', difficulty: DIFFICULTY.HARD },
      { question: '"群島" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Bán đảo', 'Quần đảo', 'Lục địa', 'Đại dương'], answer: 'Quần đảo', explanationVi: '群島 (ぐんとう) = quần đảo', difficulty: DIFFICULTY.HARD },
      { question: '"Hạn hán" trong tiếng Nhật là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['洪水', '干ばつ', '台風', '地震'], answer: '干ばつ', explanationVi: '干ばつ (かんばつ) = hạn hán', difficulty: DIFFICULTY.MEDIUM },
      { question: '"生態系" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Khí hậu', 'Hệ sinh thái', 'Thời tiết', 'Môi trường'], answer: 'Hệ sinh thái', explanationVi: '生態系 (せいたいけい) = hệ sinh thái', difficulty: DIFFICULTY.HARD },
    ],
  },
];
