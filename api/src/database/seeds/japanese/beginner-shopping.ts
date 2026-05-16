import { LessonData } from '../utils';
import { TOPICS, DIFFICULTY, QUIZ_TYPES } from '../constants';

export const japaneseShoppingLessons: LessonData[] = [
  {
    title: '買い物 (Shopping)',
    titleVi: 'Mua sắm',
    description: 'Learn shopping vocabulary in Japanese',
    descriptionVi: 'Học từ vựng mua sắm tiếng Nhật',
    topic: TOPICS.SHOPPING,
    vocabulary: [
      { word: 'いくら', reading: 'ikura', meaning: 'bao nhiêu tiền', example: 'これはいくらですか？', exampleMeaning: 'Cái này bao nhiêu tiền?', difficulty: DIFFICULTY.VERY_EASY },
      { word: '高い', reading: 'takai', meaning: 'đắt/cao', example: 'この服は高いです。', exampleMeaning: 'Quần áo này đắt.', difficulty: DIFFICULTY.EASY },
      { word: '安い', reading: 'yasui', meaning: 'rẻ', example: 'このお店は安いです。', exampleMeaning: 'Cửa hàng này rẻ.', difficulty: DIFFICULTY.EASY },
      { word: '買う', reading: 'kau', meaning: 'mua', example: '本を買います。', exampleMeaning: 'Tôi mua sách.', difficulty: DIFFICULTY.EASY },
      { word: '売る', reading: 'uru', meaning: 'bán', example: '車を売ります。', exampleMeaning: 'Tôi bán xe.', difficulty: DIFFICULTY.EASY },
      { word: 'お店', reading: 'omise', meaning: 'cửa hàng', example: 'お店は何時に開きますか？', exampleMeaning: 'Cửa hàng mở lúc mấy giờ?', difficulty: DIFFICULTY.EASY },
      { word: 'レジ', reading: 'reji', meaning: 'quầy thanh toán', example: 'レジはあちらです。', exampleMeaning: 'Quầy thanh toán ở đằng kia.', difficulty: DIFFICULTY.EASY },
      { word: '袋', reading: 'fukuro', meaning: 'túi', example: '袋はいりますか？', exampleMeaning: 'Bạn cần túi không?', difficulty: DIFFICULTY.EASY },
      { word: 'サイズ', reading: 'saizu', meaning: 'kích cỡ', example: 'サイズはMです。', exampleMeaning: 'Size là M.', difficulty: DIFFICULTY.EASY },
      { word: '色', reading: 'iro', meaning: 'màu sắc', example: '何色がいいですか？', exampleMeaning: 'Bạn thích màu gì?', difficulty: DIFFICULTY.EASY },
      { word: '試着', reading: 'shichaku', meaning: 'thử đồ', example: '試着してもいいですか？', exampleMeaning: 'Tôi có thể thử không?', difficulty: DIFFICULTY.MEDIUM },
      { word: 'お釣り', reading: 'otsuri', meaning: 'tiền thối', example: 'お釣りは500円です。', exampleMeaning: 'Tiền thối là 500 yên.', difficulty: DIFFICULTY.MEDIUM },
    ],
    quizzes: [
      { question: '"いくら" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Bao nhiêu tiền', 'Ở đâu', 'Khi nào', 'Cái gì'], answer: 'Bao nhiêu tiền', explanationVi: 'いくら = bao nhiêu tiền', difficulty: DIFFICULTY.VERY_EASY },
      { question: '"Đắt" trong tiếng Nhật là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['安い', '高い', '大きい', '小さい'], answer: '高い', explanationVi: '高い (takai) = đắt', difficulty: DIFFICULTY.EASY },
      { question: '"買う" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Bán', 'Mua', 'Xem', 'Thử'], answer: 'Mua', explanationVi: '買う (kau) = mua', difficulty: DIFFICULTY.EASY },
      { question: '"Cửa hàng" trong tiếng Nhật là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['お店', 'お寺', 'お城', 'お花'], answer: 'お店', explanationVi: 'お店 (omise) = cửa hàng', difficulty: DIFFICULTY.EASY },
      { question: '"色" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Hình dạng', 'Kích cỡ', 'Màu sắc', 'Giá'], answer: 'Màu sắc', explanationVi: '色 (iro) = màu sắc', difficulty: DIFFICULTY.EASY },
    ],
  },
];
