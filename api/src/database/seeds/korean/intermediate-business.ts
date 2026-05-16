import { LessonData } from '../utils';
import { TOPICS, DIFFICULTY, QUIZ_TYPES } from '../constants';

export const koreanBusinessLessons: LessonData[] = [
  {
    title: 'Business Korean',
    titleVi: 'Tiếng Hàn thương mại',
    description: 'Learn business vocabulary in Korean',
    descriptionVi: 'Học từ vựng kinh doanh bằng tiếng Hàn',
    topic: TOPICS.WORK,
    vocabulary: [
      { word: '회의', meaning: 'cuộc họp', example: '회의는 3시부터예요.', exampleMeaning: 'Cuộc họp từ 3 giờ.', difficulty: DIFFICULTY.MEDIUM },
      { word: '명함', meaning: 'danh thiếp', example: '명함을 교환해요.', exampleMeaning: 'Trao đổi danh thiếp.', difficulty: DIFFICULTY.MEDIUM },
      { word: '마감', meaning: 'hạn chót', example: '마감은 금요일이에요.', exampleMeaning: 'Hạn chót là thứ Sáu.', difficulty: DIFFICULTY.MEDIUM },
      { word: '출장', meaning: 'công tác', example: '다음 주에 출장이 있어요.', exampleMeaning: 'Tuần sau tôi có chuyến công tác.', difficulty: DIFFICULTY.MEDIUM },
      { word: '야근', meaning: 'làm thêm giờ', example: '오늘 야근해요.', exampleMeaning: 'Hôm nay tôi làm thêm giờ.', difficulty: DIFFICULTY.MEDIUM },
      { word: '보고서', meaning: 'báo cáo', example: '보고서를 써요.', exampleMeaning: 'Tôi viết báo cáo.', difficulty: DIFFICULTY.MEDIUM },
      { word: '거래처', meaning: 'đối tác kinh doanh', example: '거래처와 만나요.', exampleMeaning: 'Tôi gặp đối tác kinh doanh.', difficulty: DIFFICULTY.HARD },
      { word: '월급', meaning: 'lương tháng', example: '월급날은 25일이에요.', exampleMeaning: 'Ngày lương là ngày 25.', difficulty: DIFFICULTY.MEDIUM },
      { word: '면접', meaning: 'phỏng vấn', example: '면접은 내일이에요.', exampleMeaning: 'Phỏng vấn là ngày mai.', difficulty: DIFFICULTY.MEDIUM },
      { word: '상사', meaning: 'sếp/cấp trên', example: '상사에게 보고해요.', exampleMeaning: 'Tôi báo cáo cho sếp.', difficulty: DIFFICULTY.MEDIUM },
      { word: '부하', meaning: 'cấp dưới', example: '부하를 지도해요.', exampleMeaning: 'Tôi hướng dẫn cấp dưới.', difficulty: DIFFICULTY.MEDIUM },
      { word: '발표', meaning: 'thuyết trình', example: '발표 준비를 해요.', exampleMeaning: 'Tôi chuẩn bị thuyết trình.', difficulty: DIFFICULTY.MEDIUM },
    ],
    quizzes: [
      { question: '"회의" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Công tác', 'Cuộc họp', 'Phỏng vấn', 'Thuyết trình'], answer: 'Cuộc họp', explanationVi: '회의 = cuộc họp', difficulty: DIFFICULTY.MEDIUM },
      { question: '"Hạn chót" trong tiếng Hàn là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['출장', '마감', '야근', '월급'], answer: '마감', explanationVi: '마감 = hạn chót/deadline', difficulty: DIFFICULTY.MEDIUM },
      { question: '"야근" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Nghỉ phép', 'Làm thêm giờ', 'Đi công tác', 'Họp'], answer: 'Làm thêm giờ', explanationVi: '야근 = làm thêm giờ/overtime', difficulty: DIFFICULTY.MEDIUM },
      { question: '"Sếp" trong tiếng Hàn là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['부하', '상사', '동료', '사장'], answer: '상사', explanationVi: '상사 = sếp/cấp trên', difficulty: DIFFICULTY.MEDIUM },
      { question: '"명함" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Hợp đồng', 'Danh thiếp', 'Báo cáo', 'Lương'], answer: 'Danh thiếp', explanationVi: '명함 = danh thiếp/name card', difficulty: DIFFICULTY.MEDIUM },
    ],
  },
];
