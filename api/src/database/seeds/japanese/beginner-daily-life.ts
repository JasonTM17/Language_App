import { LessonData } from '../utils';
import { TOPICS, DIFFICULTY, QUIZ_TYPES } from '../constants';

export const japaneseDailyLifeLessons: LessonData[] = [
  {
    title: 'Daily Life',
    titleVi: 'Cuộc sống hàng ngày',
    description: 'Learn daily life vocabulary in Japanese',
    descriptionVi: 'Học từ vựng về cuộc sống hàng ngày bằng tiếng Nhật',
    topic: TOPICS.DAILY_LIFE,
    vocabulary: [
      { word: '朝ごはん (あさごはん)', meaning: 'bữa sáng', example: '朝ごはんを食べます。', exampleMeaning: 'Tôi ăn sáng.', difficulty: DIFFICULTY.EASY },
      { word: '昼ごはん (ひるごはん)', meaning: 'bữa trưa', example: '昼ごはんは何ですか？', exampleMeaning: 'Bữa trưa ăn gì?', difficulty: DIFFICULTY.EASY },
      { word: '晩ごはん (ばんごはん)', meaning: 'bữa tối', example: '晩ごはんを作ります。', exampleMeaning: 'Tôi nấu bữa tối.', difficulty: DIFFICULTY.EASY },
      { word: '起きる (おきる)', meaning: 'thức dậy', example: '毎朝6時に起きます。', exampleMeaning: 'Mỗi sáng tôi dậy lúc 6 giờ.', difficulty: DIFFICULTY.EASY },
      { word: '寝る (ねる)', meaning: 'ngủ', example: '11時に寝ます。', exampleMeaning: 'Tôi ngủ lúc 11 giờ.', difficulty: DIFFICULTY.EASY },
      { word: 'シャワー', meaning: 'tắm vòi sen', example: 'シャワーを浴びます。', exampleMeaning: 'Tôi tắm vòi sen.', difficulty: DIFFICULTY.EASY },
      { word: '歯を磨く (はをみがく)', meaning: 'đánh răng', example: '毎日歯を磨きます。', exampleMeaning: 'Mỗi ngày tôi đánh răng.', difficulty: DIFFICULTY.EASY },
      { word: '着替える (きがえる)', meaning: 'thay đồ', example: '服を着替えます。', exampleMeaning: 'Tôi thay đồ.', difficulty: DIFFICULTY.MEDIUM },
      { word: '掃除 (そうじ)', meaning: 'dọn dẹp', example: '部屋を掃除します。', exampleMeaning: 'Tôi dọn phòng.', difficulty: DIFFICULTY.EASY },
      { word: '洗濯 (せんたく)', meaning: 'giặt đồ', example: '洗濯をします。', exampleMeaning: 'Tôi giặt đồ.', difficulty: DIFFICULTY.EASY },
      { word: '買い物 (かいもの)', meaning: 'mua sắm', example: '買い物に行きます。', exampleMeaning: 'Tôi đi mua sắm.', difficulty: DIFFICULTY.EASY },
      { word: '休む (やすむ)', meaning: 'nghỉ ngơi', example: '日曜日に休みます。', exampleMeaning: 'Tôi nghỉ ngày chủ nhật.', difficulty: DIFFICULTY.EASY },
    ],
    quizzes: [
      { question: '"朝ごはん" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Bữa trưa', 'Bữa sáng', 'Bữa tối', 'Ăn vặt'], answer: 'Bữa sáng', explanationVi: '朝ごはん (あさごはん) = bữa sáng', difficulty: DIFFICULTY.EASY },
      { question: '"Ngủ" trong tiếng Nhật là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['起きる', '寝る', '休む', '食べる'], answer: '寝る', explanationVi: '寝る (ねる) = ngủ', difficulty: DIFFICULTY.EASY },
      { question: '"掃除" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Giặt đồ', 'Dọn dẹp', 'Nấu ăn', 'Mua sắm'], answer: 'Dọn dẹp', explanationVi: '掃除 (そうじ) = dọn dẹp', difficulty: DIFFICULTY.EASY },
      { question: '"Mua sắm" trong tiếng Nhật là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['洗濯', '掃除', '買い物', '料理'], answer: '買い物', explanationVi: '買い物 (かいもの) = mua sắm', difficulty: DIFFICULTY.EASY },
      { question: '"起きる" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Ngủ', 'Thức dậy', 'Nghỉ ngơi', 'Ăn'], answer: 'Thức dậy', explanationVi: '起きる (おきる) = thức dậy', difficulty: DIFFICULTY.EASY },
    ],
  },
];
