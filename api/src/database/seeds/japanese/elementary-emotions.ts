import { LessonData } from '../utils';
import { TOPICS, DIFFICULTY, QUIZ_TYPES } from '../constants';

export const japaneseEmotionsLessons: LessonData[] = [
  {
    title: 'Emotions & Feelings',
    titleVi: 'Cảm xúc & Tâm trạng',
    description: 'Learn emotion vocabulary in Japanese',
    descriptionVi: 'Học từ vựng về cảm xúc bằng tiếng Nhật',
    topic: TOPICS.EMOTIONS,
    vocabulary: [
      { word: '嬉しい (うれしい)', meaning: 'vui mừng', example: 'プレゼントをもらって嬉しいです。', exampleMeaning: 'Tôi vui vì nhận được quà.', difficulty: DIFFICULTY.EASY },
      { word: '悲しい (かなしい)', meaning: 'buồn', example: '映画が悲しいです。', exampleMeaning: 'Bộ phim buồn.', difficulty: DIFFICULTY.EASY },
      { word: '怒る (おこる)', meaning: 'tức giận', example: '先生が怒っています。', exampleMeaning: 'Thầy giáo đang tức giận.', difficulty: DIFFICULTY.EASY },
      { word: '怖い (こわい)', meaning: 'sợ hãi', example: 'お化けが怖いです。', exampleMeaning: 'Tôi sợ ma.', difficulty: DIFFICULTY.EASY },
      { word: '疲れた (つかれた)', meaning: 'mệt mỏi', example: '今日は疲れました。', exampleMeaning: 'Hôm nay tôi mệt.', difficulty: DIFFICULTY.EASY },
      { word: '幸せ (しあわせ)', meaning: 'hạnh phúc', example: '家族と一緒で幸せです。', exampleMeaning: 'Tôi hạnh phúc bên gia đình.', difficulty: DIFFICULTY.EASY },
      { word: '寂しい (さびしい)', meaning: 'cô đơn', example: '一人で寂しいです。', exampleMeaning: 'Ở một mình cô đơn.', difficulty: DIFFICULTY.MEDIUM },
      { word: '心配 (しんぱい)', meaning: 'lo lắng', example: '試験が心配です。', exampleMeaning: 'Tôi lo lắng về kỳ thi.', difficulty: DIFFICULTY.MEDIUM },
      { word: '驚く (おどろく)', meaning: 'ngạc nhiên', example: 'ニュースに驚きました。', exampleMeaning: 'Tôi ngạc nhiên vì tin tức.', difficulty: DIFFICULTY.MEDIUM },
      { word: '恥ずかしい (はずかしい)', meaning: 'xấu hổ', example: '間違えて恥ずかしいです。', exampleMeaning: 'Tôi xấu hổ vì mắc lỗi.', difficulty: DIFFICULTY.MEDIUM },
      { word: '退屈 (たいくつ)', meaning: 'chán', example: '授業が退屈です。', exampleMeaning: 'Bài giảng chán.', difficulty: DIFFICULTY.MEDIUM },
      { word: 'わくわく', meaning: 'hồi hộp/phấn khích', example: '旅行前にわくわくします。', exampleMeaning: 'Tôi hồi hộp trước chuyến đi.', difficulty: DIFFICULTY.MEDIUM },
    ],
    quizzes: [
      { question: '"嬉しい" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Buồn', 'Vui mừng', 'Tức giận', 'Sợ hãi'], answer: 'Vui mừng', explanationVi: '嬉しい (うれしい) = vui mừng', difficulty: DIFFICULTY.EASY },
      { question: '"Buồn" trong tiếng Nhật là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['嬉しい', '悲しい', '怒る', '怖い'], answer: '悲しい', explanationVi: '悲しい (かなしい) = buồn', difficulty: DIFFICULTY.EASY },
      { question: '"疲れた" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Vui vẻ', 'Buồn ngủ', 'Mệt mỏi', 'Đói'], answer: 'Mệt mỏi', explanationVi: '疲れた (つかれた) = mệt mỏi', difficulty: DIFFICULTY.EASY },
      { question: '"Hạnh phúc" trong tiếng Nhật là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['幸せ', '嬉しい', 'わくわく', '驚く'], answer: '幸せ', explanationVi: '幸せ (しあわせ) = hạnh phúc', difficulty: DIFFICULTY.EASY },
      { question: '"心配" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Vui vẻ', 'Lo lắng', 'Tức giận', 'Ngạc nhiên'], answer: 'Lo lắng', explanationVi: '心配 (しんぱい) = lo lắng', difficulty: DIFFICULTY.MEDIUM },
    ],
  },
];
