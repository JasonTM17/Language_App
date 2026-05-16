import { LessonData } from '../utils';
import { TOPICS, DIFFICULTY, QUIZ_TYPES } from '../constants';

export const koreanTravelIntermediateLessons: LessonData[] = [
  {
    title: 'Travel & Transportation',
    titleVi: 'Du lịch & Giao thông',
    description: 'Intermediate travel vocabulary in Korean',
    descriptionVi: 'Từ vựng du lịch trung cấp bằng tiếng Hàn',
    topic: TOPICS.TRAVEL,
    vocabulary: [
      { word: '예약', meaning: 'đặt chỗ', example: '호텔을 예약했어요.', exampleMeaning: 'Tôi đã đặt khách sạn.', difficulty: DIFFICULTY.MEDIUM },
      { word: '편도', meaning: 'một chiều', example: '편도 표 주세요.', exampleMeaning: 'Cho tôi vé một chiều.', difficulty: DIFFICULTY.MEDIUM },
      { word: '왕복', meaning: 'khứ hồi', example: '왕복 표는 얼마예요?', exampleMeaning: 'Vé khứ hồi bao nhiêu?', difficulty: DIFFICULTY.MEDIUM },
      { word: '환승', meaning: 'chuyển tàu', example: '다음 역에서 환승하세요.', exampleMeaning: 'Hãy chuyển tàu ở ga tiếp theo.', difficulty: DIFFICULTY.MEDIUM },
      { word: '관광', meaning: 'tham quan', example: '서울을 관광했어요.', exampleMeaning: 'Tôi đã tham quan Seoul.', difficulty: DIFFICULTY.MEDIUM },
      { word: '짐', meaning: 'hành lý', example: '짐이 무거워요.', exampleMeaning: 'Hành lý nặng.', difficulty: DIFFICULTY.EASY },
      { word: '여권', meaning: 'hộ chiếu', example: '여권을 보여주세요.', exampleMeaning: 'Xin cho xem hộ chiếu.', difficulty: DIFFICULTY.EASY },
      { word: '탑승', meaning: 'lên máy bay', example: '탑승 시간은 10시예요.', exampleMeaning: 'Giờ lên máy bay là 10 giờ.', difficulty: DIFFICULTY.HARD },
      { word: '환전', meaning: 'đổi tiền', example: '어디서 환전할 수 있어요?', exampleMeaning: 'Đổi tiền ở đâu?', difficulty: DIFFICULTY.MEDIUM },
      { word: '지연', meaning: 'trễ/delay', example: '비행기가 지연됐어요.', exampleMeaning: 'Máy bay bị trễ.', difficulty: DIFFICULTY.HARD },
      { word: '안내소', meaning: 'quầy thông tin', example: '안내소가 어디예요?', exampleMeaning: 'Quầy thông tin ở đâu?', difficulty: DIFFICULTY.MEDIUM },
      { word: '출발', meaning: 'khởi hành', example: '출발 시간이 몇 시예요?', exampleMeaning: 'Mấy giờ khởi hành?', difficulty: DIFFICULTY.MEDIUM },
    ],
    quizzes: [
      { question: '"예약" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Hủy bỏ', 'Đặt chỗ', 'Thanh toán', 'Xác nhận'], answer: 'Đặt chỗ', explanationVi: '예약 = đặt chỗ', difficulty: DIFFICULTY.MEDIUM },
      { question: '"Khứ hồi" trong tiếng Hàn là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['편도', '왕복', '환승', '출발'], answer: '왕복', explanationVi: '왕복 = khứ hồi', difficulty: DIFFICULTY.MEDIUM },
      { question: '"짐" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Vé', 'Hành lý', 'Hộ chiếu', 'Bản đồ'], answer: 'Hành lý', explanationVi: '짐 = hành lý', difficulty: DIFFICULTY.EASY },
      { question: '"Đổi tiền" trong tiếng Hàn là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['예약', '환전', '탑승', '관광'], answer: '환전', explanationVi: '환전 = đổi tiền', difficulty: DIFFICULTY.MEDIUM },
      { question: '"지연" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Sớm', 'Đúng giờ', 'Trễ/delay', 'Hủy'], answer: 'Trễ/delay', explanationVi: '지연 = trễ/delay', difficulty: DIFFICULTY.HARD },
    ],
  },
];
