import { LessonData } from '../utils';
import { TOPICS, DIFFICULTY, QUIZ_TYPES } from '../constants';

export const chineseTravelIntermediateLessons: LessonData[] = [
  {
    title: 'Travel & Transportation',
    titleVi: 'Du lịch & Giao thông',
    description: 'Intermediate travel vocabulary in Chinese',
    descriptionVi: 'Từ vựng du lịch trung cấp bằng tiếng Trung',
    topic: TOPICS.TRAVEL,
    vocabulary: [
      { word: '预订 (yùdìng)', meaning: 'đặt chỗ', example: '我预订了酒店。', exampleMeaning: 'Tôi đã đặt khách sạn.', difficulty: DIFFICULTY.MEDIUM },
      { word: '单程 (dānchéng)', meaning: 'một chiều', example: '请给我一张单程票。', exampleMeaning: 'Cho tôi một vé một chiều.', difficulty: DIFFICULTY.MEDIUM },
      { word: '往返 (wǎngfǎn)', meaning: 'khứ hồi', example: '往返票多少钱？', exampleMeaning: 'Vé khứ hồi bao nhiêu?', difficulty: DIFFICULTY.MEDIUM },
      { word: '转车 (zhuǎnchē)', meaning: 'chuyển xe/tàu', example: '下一站转车。', exampleMeaning: 'Chuyển xe ở trạm tiếp theo.', difficulty: DIFFICULTY.MEDIUM },
      { word: '观光 (guānguāng)', meaning: 'tham quan', example: '我们去观光。', exampleMeaning: 'Chúng tôi đi tham quan.', difficulty: DIFFICULTY.MEDIUM },
      { word: '行李 (xíngli)', meaning: 'hành lý', example: '行李很重。', exampleMeaning: 'Hành lý nặng.', difficulty: DIFFICULTY.EASY },
      { word: '护照 (hùzhào)', meaning: 'hộ chiếu', example: '请出示护照。', exampleMeaning: 'Xin cho xem hộ chiếu.', difficulty: DIFFICULTY.EASY },
      { word: '登机 (dēngjī)', meaning: 'lên máy bay', example: '登机时间是十点。', exampleMeaning: 'Giờ lên máy bay là 10 giờ.', difficulty: DIFFICULTY.HARD },
      { word: '换钱 (huànqián)', meaning: 'đổi tiền', example: '哪里可以换钱？', exampleMeaning: 'Đổi tiền ở đâu?', difficulty: DIFFICULTY.MEDIUM },
      { word: '延误 (yánwù)', meaning: 'trễ/delay', example: '航班延误了。', exampleMeaning: 'Chuyến bay bị trễ.', difficulty: DIFFICULTY.HARD },
      { word: '问讯处 (wènxùnchù)', meaning: 'quầy thông tin', example: '问讯处在哪里？', exampleMeaning: 'Quầy thông tin ở đâu?', difficulty: DIFFICULTY.MEDIUM },
      { word: '出发 (chūfā)', meaning: 'khởi hành', example: '几点出发？', exampleMeaning: 'Mấy giờ khởi hành?', difficulty: DIFFICULTY.MEDIUM },
    ],
    quizzes: [
      { question: '"预订" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Hủy bỏ', 'Đặt chỗ', 'Thanh toán', 'Xác nhận'], answer: 'Đặt chỗ', explanationVi: '预订 (yùdìng) = đặt chỗ', difficulty: DIFFICULTY.MEDIUM },
      { question: '"Khứ hồi" trong tiếng Trung là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['单程', '往返', '转车', '出发'], answer: '往返', explanationVi: '往返 (wǎngfǎn) = khứ hồi', difficulty: DIFFICULTY.MEDIUM },
      { question: '"行李" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Vé', 'Hành lý', 'Hộ chiếu', 'Bản đồ'], answer: 'Hành lý', explanationVi: '行李 (xíngli) = hành lý', difficulty: DIFFICULTY.EASY },
      { question: '"Đổi tiền" trong tiếng Trung là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['预订', '换钱', '登机', '观光'], answer: '换钱', explanationVi: '换钱 (huànqián) = đổi tiền', difficulty: DIFFICULTY.MEDIUM },
      { question: '"延误" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Sớm', 'Đúng giờ', 'Trễ/delay', 'Hủy'], answer: 'Trễ/delay', explanationVi: '延误 (yánwù) = trễ/delay', difficulty: DIFFICULTY.HARD },
    ],
  },
];
