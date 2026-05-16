import { LessonData } from '../utils';
import { TOPICS, DIFFICULTY, QUIZ_TYPES } from '../constants';

export const koreanTravelLessons: LessonData[] = [
  {
    title: '여행 (Travel)',
    titleVi: 'Du lịch',
    description: 'Learn travel vocabulary in Korean',
    descriptionVi: 'Học từ vựng du lịch tiếng Hàn',
    topic: TOPICS.TRAVEL,
    vocabulary: [
      { word: '공항', reading: 'gonghang', meaning: 'sân bay', example: '공항에 가요.', exampleMeaning: 'Tôi đi sân bay.', difficulty: DIFFICULTY.EASY },
      { word: '호텔', reading: 'hotel', meaning: 'khách sạn', example: '호텔을 예약했어요.', exampleMeaning: 'Tôi đã đặt khách sạn.', difficulty: DIFFICULTY.EASY },
      { word: '여권', reading: 'yeogwon', meaning: 'hộ chiếu', example: '여권을 보여주세요.', exampleMeaning: 'Xin cho xem hộ chiếu.', difficulty: DIFFICULTY.EASY },
      { word: '비행기', reading: 'bihaenggi', meaning: 'máy bay', example: '비행기가 출발해요.', exampleMeaning: 'Máy bay khởi hành.', difficulty: DIFFICULTY.EASY },
      { word: '지하철', reading: 'jihacheol', meaning: 'tàu điện ngầm', example: '지하철을 타요.', exampleMeaning: 'Tôi đi tàu điện ngầm.', difficulty: DIFFICULTY.EASY },
      { word: '택시', reading: 'taeksi', meaning: 'taxi', example: '택시를 불러주세요.', exampleMeaning: 'Xin gọi taxi giúp tôi.', difficulty: DIFFICULTY.EASY },
      { word: '지도', reading: 'jido', meaning: 'bản đồ', example: '지도를 보여주세요.', exampleMeaning: 'Xin cho xem bản đồ.', difficulty: DIFFICULTY.EASY },
      { word: '표', reading: 'pyo', meaning: 'vé', example: '표를 사요.', exampleMeaning: 'Tôi mua vé.', difficulty: DIFFICULTY.EASY },
      { word: '관광', reading: 'gwangwang', meaning: 'tham quan', example: '관광을 해요.', exampleMeaning: 'Tôi đi tham quan.', difficulty: DIFFICULTY.EASY },
      { word: '짐', reading: 'jim', meaning: 'hành lý', example: '짐이 많아요.', exampleMeaning: 'Hành lý nhiều quá.', difficulty: DIFFICULTY.EASY },
      { word: '출발', reading: 'chulbal', meaning: 'khởi hành', example: '출발 시간이 언제예요?', exampleMeaning: 'Giờ khởi hành là khi nào?', difficulty: DIFFICULTY.MEDIUM },
      { word: '도착', reading: 'dochak', meaning: 'đến nơi', example: '도착했어요!', exampleMeaning: 'Đã đến nơi!', difficulty: DIFFICULTY.MEDIUM },
    ],
    quizzes: [
      { question: '"공항" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Nhà ga', 'Sân bay', 'Bến xe', 'Cảng'], answer: 'Sân bay', explanationVi: '공항 (gonghang) = sân bay', difficulty: DIFFICULTY.EASY },
      { question: '"Hộ chiếu" trong tiếng Hàn là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['여권', '비자', '표', '지도'], answer: '여권', explanationVi: '여권 (yeogwon) = hộ chiếu', difficulty: DIFFICULTY.EASY },
      { question: '"택시" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Xe buýt', 'Taxi', 'Tàu', 'Xe đạp'], answer: 'Taxi', explanationVi: '택시 (taeksi) = taxi', difficulty: DIFFICULTY.EASY },
      { question: '"Hành lý" trong tiếng Hàn là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['표', '짐', '지도', '여권'], answer: '짐', explanationVi: '짐 (jim) = hành lý', difficulty: DIFFICULTY.EASY },
      { question: '"도착" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Khởi hành', 'Đến nơi', 'Quay lại', 'Dừng lại'], answer: 'Đến nơi', explanationVi: '도착 (dochak) = đến nơi', difficulty: DIFFICULTY.MEDIUM },
    ],
  },
];
