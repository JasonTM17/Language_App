import { LessonData } from '../utils';
import { TOPICS, DIFFICULTY, QUIZ_TYPES } from '../constants';

export const koreanShoppingLessons: LessonData[] = [
  {
    title: '쇼핑하기',
    titleVi: 'Đi mua sắm',
    description: 'Learn shopping vocabulary and phrases in Korean',
    descriptionVi: 'Học từ vựng và cụm từ mua sắm trong tiếng Hàn',
    topic: TOPICS.SHOPPING,
    vocabulary: [
      { word: '가게', reading: 'gage', meaning: 'Cửa hàng', example: '이 가게는 옷을 팔아요.', exampleMeaning: 'Cửa hàng này bán quần áo.', difficulty: DIFFICULTY.VERY_EASY },
      { word: '사다', reading: 'sada', meaning: 'Mua', example: '선물을 사고 싶어요.', exampleMeaning: 'Tôi muốn mua quà.', difficulty: DIFFICULTY.VERY_EASY },
      { word: '비싸다', reading: 'bissada', meaning: 'Đắt', example: '이 가방은 너무 비싸요.', exampleMeaning: 'Cái túi này đắt quá.', difficulty: DIFFICULTY.EASY },
      { word: '싸다', reading: 'ssada', meaning: 'Rẻ', example: '여기가 더 싸요.', exampleMeaning: 'Ở đây rẻ hơn.', difficulty: DIFFICULTY.EASY },
      { word: '카드', reading: 'kadeu', meaning: 'Thẻ (tín dụng)', example: '카드로 계산할게요.', exampleMeaning: 'Tôi sẽ thanh toán bằng thẻ.', difficulty: DIFFICULTY.EASY },
      { word: '현금', reading: 'hyeongeum', meaning: 'Tiền mặt', example: '현금으로 내도 돼요?', exampleMeaning: 'Trả bằng tiền mặt được không?', difficulty: DIFFICULTY.EASY },
      { word: '할인', reading: 'halin', meaning: 'Giảm giá', example: '할인 있어요?', exampleMeaning: 'Có giảm giá không?', difficulty: DIFFICULTY.EASY },
      { word: '사이즈', reading: 'saijeu', meaning: 'Kích cỡ', example: '다른 사이즈 있어요?', exampleMeaning: 'Có kích cỡ khác không?', difficulty: DIFFICULTY.EASY },
      { word: '색깔', reading: 'saekkal', meaning: 'Màu sắc', example: '다른 색깔 있어요?', exampleMeaning: 'Có màu khác không?', difficulty: DIFFICULTY.EASY },
      { word: '영수증', reading: 'yeongsujeung', meaning: 'Hóa đơn', example: '영수증 주세요.', exampleMeaning: 'Cho tôi hóa đơn.', difficulty: DIFFICULTY.MEDIUM },
    ],
    quizzes: [
      { question: '"가게" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Nhà hàng', 'Cửa hàng', 'Trường học', 'Bệnh viện'], answer: 'Cửa hàng', explanationVi: '가게 (gage) = Cửa hàng', difficulty: DIFFICULTY.VERY_EASY },
      { question: '"비싸다" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Rẻ', 'Đắt', 'Đẹp', 'Xấu'], answer: 'Đắt', explanationVi: '비싸다 (bissada) = Đắt, ngược lại 싸다 = rẻ', difficulty: DIFFICULTY.EASY },
      { question: '"할인" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Tăng giá', 'Giảm giá', 'Miễn phí', 'Trả góp'], answer: 'Giảm giá', explanationVi: '할인 (halin) = Giảm giá', difficulty: DIFFICULTY.EASY },
      { question: 'Cách hỏi "Bao nhiêu tiền?" trong tiếng Hàn?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['뭐예요?', '어디예요?', '얼마예요?', '누구예요?'], answer: '얼마예요?', explanationVi: '얼마예요? = Bao nhiêu tiền?', difficulty: DIFFICULTY.EASY },
      { question: '"영수증" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Tiền mặt', 'Thẻ tín dụng', 'Hóa đơn', 'Tiền thối'], answer: 'Hóa đơn', explanationVi: '영수증 (yeongsujeung) = Hóa đơn/biên lai', difficulty: DIFFICULTY.MEDIUM },
    ],
  },
  {
    title: '옷 쇼핑',
    titleVi: 'Mua sắm quần áo',
    description: 'Learn clothing vocabulary for shopping in Korean',
    descriptionVi: 'Học từ vựng quần áo để mua sắm bằng tiếng Hàn',
    topic: TOPICS.SHOPPING,
    vocabulary: [
      { word: '옷', reading: 'ot', meaning: 'Quần áo', example: '새 옷을 샀어요.', exampleMeaning: 'Tôi đã mua quần áo mới.', difficulty: DIFFICULTY.VERY_EASY },
      { word: '바지', reading: 'baji', meaning: 'Quần', example: '이 바지 입어 봐도 돼요?', exampleMeaning: 'Tôi có thể thử quần này không?', difficulty: DIFFICULTY.EASY },
      { word: '치마', reading: 'chima', meaning: 'Váy', example: '치마가 예뻐요.', exampleMeaning: 'Váy đẹp quá.', difficulty: DIFFICULTY.EASY },
      { word: '신발', reading: 'sinbal', meaning: 'Giày', example: '신발이 편해요.', exampleMeaning: 'Giày thoải mái.', difficulty: DIFFICULTY.EASY },
      { word: '모자', reading: 'moja', meaning: 'Mũ', example: '모자를 쓰세요.', exampleMeaning: 'Hãy đội mũ.', difficulty: DIFFICULTY.EASY },
      { word: '입다', reading: 'ipda', meaning: 'Mặc', example: '뭘 입을까요?', exampleMeaning: 'Mặc gì đây?', difficulty: DIFFICULTY.EASY },
      { word: '입어 보다', reading: 'ibeo boda', meaning: 'Thử (mặc)', example: '입어 봐도 돼요?', exampleMeaning: 'Tôi có thể thử mặc không?', difficulty: DIFFICULTY.MEDIUM },
      { word: '크다', reading: 'keuda', meaning: 'To / Lớn', example: '이 옷은 너무 커요.', exampleMeaning: 'Quần áo này quá to.', difficulty: DIFFICULTY.EASY },
      { word: '작다', reading: 'jakda', meaning: 'Nhỏ', example: '사이즈가 작아요.', exampleMeaning: 'Kích cỡ nhỏ quá.', difficulty: DIFFICULTY.EASY },
      { word: '어울리다', reading: 'eoullida', meaning: 'Hợp / Phù hợp', example: '잘 어울려요!', exampleMeaning: 'Rất hợp!', difficulty: DIFFICULTY.MEDIUM },
    ],
    quizzes: [
      { question: '"옷" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Giày', 'Quần áo', 'Mũ', 'Túi'], answer: 'Quần áo', explanationVi: '옷 (ot) = Quần áo', difficulty: DIFFICULTY.VERY_EASY },
      { question: '"신발" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Quần', 'Váy', 'Giày', 'Mũ'], answer: 'Giày', explanationVi: '신발 (sinbal) = Giày', difficulty: DIFFICULTY.EASY },
      { question: '"입어 봐도 돼요?" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Bao nhiêu tiền?', 'Có size khác không?', 'Tôi có thể thử mặc không?', 'Có màu khác không?'], answer: 'Tôi có thể thử mặc không?', explanationVi: '입어 봐도 돼요? = Tôi có thể thử mặc không?', difficulty: DIFFICULTY.MEDIUM },
      { question: '"크다" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Nhỏ', 'To / Lớn', 'Đẹp', 'Xấu'], answer: 'To / Lớn', explanationVi: '크다 (keuda) = To/Lớn, ngược lại 작다 = nhỏ', difficulty: DIFFICULTY.EASY },
      { question: '"어울리다" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Đắt', 'Rẻ', 'Hợp / Phù hợp', 'Không hợp'], answer: 'Hợp / Phù hợp', explanationVi: '어울리다 (eoullida) = Hợp, phù hợp', difficulty: DIFFICULTY.MEDIUM },
    ],
  },
];
