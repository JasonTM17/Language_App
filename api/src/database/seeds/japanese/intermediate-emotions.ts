import { LessonData } from '../utils';
import { TOPICS, DIFFICULTY, QUIZ_TYPES } from '../constants';

export const japaneseEmotionsIntermediateLessons: LessonData[] = [
  {
    title: 'Complex Emotions',
    titleVi: 'Cảm xúc phức tạp',
    description: 'Learn complex emotional vocabulary in Japanese',
    descriptionVi: 'Học từ vựng về cảm xúc phức tạp bằng tiếng Nhật',
    topic: TOPICS.EMOTIONS,
    vocabulary: [
      { word: '圧倒される (あっとうされる)', meaning: 'choáng ngợp', example: '仕事に圧倒されています。', exampleMeaning: 'Tôi bị choáng ngợp bởi công việc.', difficulty: DIFFICULTY.HARD },
      { word: '懐かしい (なつかしい)', meaning: 'hoài niệm', example: 'この曲は懐かしいです。', exampleMeaning: 'Bài hát này gợi hoài niệm.', difficulty: DIFFICULTY.MEDIUM },
      { word: '不安 (ふあん)', meaning: 'lo lắng/bất an', example: '試験が不安です。', exampleMeaning: 'Tôi lo lắng về kỳ thi.', difficulty: DIFFICULTY.MEDIUM },
      { word: '感謝 (かんしゃ)', meaning: 'biết ơn', example: '感謝しています。', exampleMeaning: 'Tôi rất biết ơn.', difficulty: DIFFICULTY.MEDIUM },
      { word: '苛立ち (いらだち)', meaning: 'sự bực bội', example: '苛立ちを感じます。', exampleMeaning: 'Tôi cảm thấy bực bội.', difficulty: DIFFICULTY.HARD },
      { word: '共感 (きょうかん)', meaning: 'sự đồng cảm', example: '共感を示しましょう。', exampleMeaning: 'Hãy thể hiện sự đồng cảm.', difficulty: DIFFICULTY.MEDIUM },
      { word: '恨み (うらみ)', meaning: 'sự oán giận', example: '恨みを手放しましょう。', exampleMeaning: 'Hãy buông bỏ sự oán giận.', difficulty: DIFFICULTY.HARD },
      { word: '満足感 (まんぞくかん)', meaning: 'sự mãn nguyện', example: '満足感を得ました。', exampleMeaning: 'Tôi đã có được sự mãn nguyện.', difficulty: DIFFICULTY.MEDIUM },
      { word: '憂鬱 (ゆううつ)', meaning: 'u sầu/trầm uất', example: '憂鬱な気分です。', exampleMeaning: 'Tôi cảm thấy u sầu.', difficulty: DIFFICULTY.HARD },
      { word: '思いやり (おもいやり)', meaning: 'lòng trắc ẩn', example: '思いやりを持ちましょう。', exampleMeaning: 'Hãy có lòng trắc ẩn.', difficulty: DIFFICULTY.MEDIUM },
      { word: '脆い (もろい)', meaning: 'dễ bị tổn thương', example: '心が脆い時もあります。', exampleMeaning: 'Có lúc tâm hồn dễ bị tổn thương.', difficulty: DIFFICULTY.HARD },
      { word: '回復力 (かいふくりょく)', meaning: 'sự kiên cường', example: '彼女は回復力があります。', exampleMeaning: 'Cô ấy rất kiên cường.', difficulty: DIFFICULTY.HARD },
    ],
    quizzes: [
      { question: '"懐かしい" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Vui vẻ', 'Hoài niệm', 'Buồn bã', 'Tức giận'], answer: 'Hoài niệm', explanationVi: '懐かしい (なつかしい) = hoài niệm', difficulty: DIFFICULTY.MEDIUM },
      { question: '"Lo lắng" trong tiếng Nhật là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['感謝', '不安', '共感', '恨み'], answer: '不安', explanationVi: '不安 (ふあん) = lo lắng/bất an', difficulty: DIFFICULTY.MEDIUM },
      { question: '"共感" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Sự oán giận', 'Sự đồng cảm', 'Sự mãn nguyện', 'Sự lo lắng'], answer: 'Sự đồng cảm', explanationVi: '共感 (きょうかん) = sự đồng cảm', difficulty: DIFFICULTY.MEDIUM },
      { question: '"U sầu" trong tiếng Nhật là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['不安', '憂鬱', '感謝', '苛立ち'], answer: '憂鬱', explanationVi: '憂鬱 (ゆううつ) = u sầu/trầm uất', difficulty: DIFFICULTY.HARD },
      { question: '"思いやり" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Sự tức giận', 'Lòng trắc ẩn', 'Sự ghen tị', 'Sự sợ hãi'], answer: 'Lòng trắc ẩn', explanationVi: '思いやり (おもいやり) = lòng trắc ẩn', difficulty: DIFFICULTY.MEDIUM },
    ],
  },
];
