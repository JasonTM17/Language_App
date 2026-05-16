import { LessonData } from '../utils';
import { TOPICS, DIFFICULTY, QUIZ_TYPES } from '../constants';

export const japaneseTravelIntermediateLessons: LessonData[] = [
  {
    title: 'Travel & Transportation',
    titleVi: 'Du lịch & Giao thông',
    description: 'Intermediate travel vocabulary in Japanese',
    descriptionVi: 'Từ vựng du lịch trung cấp bằng tiếng Nhật',
    topic: TOPICS.TRAVEL,
    vocabulary: [
      { word: '予約 (よやく)', meaning: 'đặt chỗ', example: 'ホテルを予約しました。', exampleMeaning: 'Tôi đã đặt khách sạn.', difficulty: DIFFICULTY.MEDIUM },
      { word: '片道 (かたみち)', meaning: 'một chiều', example: '片道切符をください。', exampleMeaning: 'Cho tôi vé một chiều.', difficulty: DIFFICULTY.MEDIUM },
      { word: '往復 (おうふく)', meaning: 'khứ hồi', example: '往復切符はいくらですか？', exampleMeaning: 'Vé khứ hồi bao nhiêu?', difficulty: DIFFICULTY.MEDIUM },
      { word: '乗り換え (のりかえ)', meaning: 'chuyển tàu', example: '次の駅で乗り換えてください。', exampleMeaning: 'Hãy chuyển tàu ở ga tiếp theo.', difficulty: DIFFICULTY.MEDIUM },
      { word: '観光 (かんこう)', meaning: 'tham quan', example: '京都を観光しました。', exampleMeaning: 'Tôi đã tham quan Kyoto.', difficulty: DIFFICULTY.MEDIUM },
      { word: '荷物 (にもつ)', meaning: 'hành lý', example: '荷物が重いです。', exampleMeaning: 'Hành lý nặng.', difficulty: DIFFICULTY.EASY },
      { word: 'パスポート', meaning: 'hộ chiếu', example: 'パスポートを見せてください。', exampleMeaning: 'Xin cho xem hộ chiếu.', difficulty: DIFFICULTY.EASY },
      { word: '搭乗 (とうじょう)', meaning: 'lên máy bay', example: '搭乗時間は10時です。', exampleMeaning: 'Giờ lên máy bay là 10 giờ.', difficulty: DIFFICULTY.HARD },
      { word: '両替 (りょうがえ)', meaning: 'đổi tiền', example: 'どこで両替できますか？', exampleMeaning: 'Đổi tiền ở đâu?', difficulty: DIFFICULTY.MEDIUM },
      { word: '遅延 (ちえん)', meaning: 'trễ/delay', example: '電車が遅延しています。', exampleMeaning: 'Tàu bị trễ.', difficulty: DIFFICULTY.HARD },
      { word: '案内所 (あんないじょ)', meaning: 'quầy thông tin', example: '案内所はどこですか？', exampleMeaning: 'Quầy thông tin ở đâu?', difficulty: DIFFICULTY.MEDIUM },
      { word: '出発 (しゅっぱつ)', meaning: 'khởi hành', example: '出発は何時ですか？', exampleMeaning: 'Mấy giờ khởi hành?', difficulty: DIFFICULTY.MEDIUM },
    ],
    quizzes: [
      { question: '"予約" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Hủy bỏ', 'Đặt chỗ', 'Thanh toán', 'Xác nhận'], answer: 'Đặt chỗ', explanationVi: '予約 (よやく) = đặt chỗ', difficulty: DIFFICULTY.MEDIUM },
      { question: '"Khứ hồi" trong tiếng Nhật là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['片道', '往復', '乗り換え', '出発'], answer: '往復', explanationVi: '往復 (おうふく) = khứ hồi', difficulty: DIFFICULTY.MEDIUM },
      { question: '"荷物" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Vé', 'Hành lý', 'Hộ chiếu', 'Bản đồ'], answer: 'Hành lý', explanationVi: '荷物 (にもつ) = hành lý', difficulty: DIFFICULTY.EASY },
      { question: '"Đổi tiền" trong tiếng Nhật là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['予約', '両替', '搭乗', '観光'], answer: '両替', explanationVi: '両替 (りょうがえ) = đổi tiền', difficulty: DIFFICULTY.MEDIUM },
      { question: '"遅延" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Sớm', 'Đúng giờ', 'Trễ/delay', 'Hủy'], answer: 'Trễ/delay', explanationVi: '遅延 (ちえん) = trễ/delay', difficulty: DIFFICULTY.HARD },
    ],
  },
];
