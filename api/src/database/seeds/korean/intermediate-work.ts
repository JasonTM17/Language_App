import { LessonData } from '../utils';
import { TOPICS, DIFFICULTY, QUIZ_TYPES } from '../constants';

export const koreanWorkLessons: LessonData[] = [
  {
    title: 'Work & Office',
    titleVi: 'Công việc & Văn phòng',
    description: 'Learn work-related vocabulary in Korean',
    descriptionVi: 'Học từ vựng về công việc bằng tiếng Hàn',
    topic: TOPICS.WORK,
    vocabulary: [
      { word: '일', meaning: 'công việc', example: '무슨 일을 해요?', exampleMeaning: 'Bạn làm nghề gì?', difficulty: DIFFICULTY.EASY },
      { word: '회사', meaning: 'công ty', example: '회사에 가요.', exampleMeaning: 'Tôi đi đến công ty.', difficulty: DIFFICULTY.EASY },
      { word: '회의', meaning: 'cuộc họp', example: '오후에 회의가 있어요.', exampleMeaning: 'Buổi chiều có cuộc họp.', difficulty: DIFFICULTY.MEDIUM },
      { word: '상사', meaning: 'sếp', example: '상사가 친절해요.', exampleMeaning: 'Sếp tôi tốt bụng.', difficulty: DIFFICULTY.MEDIUM },
      { word: '동료', meaning: 'đồng nghiệp', example: '동료와 점심을 먹어요.', exampleMeaning: 'Tôi ăn trưa với đồng nghiệp.', difficulty: DIFFICULTY.MEDIUM },
      { word: '야근', meaning: 'làm thêm giờ', example: '오늘 야근해요.', exampleMeaning: 'Hôm nay phải làm thêm giờ.', difficulty: DIFFICULTY.MEDIUM },
      { word: '월급', meaning: 'lương', example: '월급날은 25일이에요.', exampleMeaning: 'Ngày lương là ngày 25.', difficulty: DIFFICULTY.MEDIUM },
      { word: '휴가', meaning: 'nghỉ phép', example: '다음 주에 휴가를 써요.', exampleMeaning: 'Tuần sau tôi nghỉ phép.', difficulty: DIFFICULTY.EASY },
      { word: '명함', meaning: 'danh thiếp', example: '명함을 교환해요.', exampleMeaning: 'Hãy trao đổi danh thiếp.', difficulty: DIFFICULTY.MEDIUM },
      { word: '출장', meaning: 'công tác', example: '다음 달에 출장이 있어요.', exampleMeaning: 'Tháng sau có chuyến công tác.', difficulty: DIFFICULTY.HARD },
      { word: '면접', meaning: 'phỏng vấn', example: '내일 면접이 있어요.', exampleMeaning: 'Ngày mai có buổi phỏng vấn.', difficulty: DIFFICULTY.MEDIUM },
      { word: '마감', meaning: 'hạn chót', example: '마감은 금요일이에요.', exampleMeaning: 'Hạn chót là thứ Sáu.', difficulty: DIFFICULTY.HARD },
    ],
    quizzes: [
      { question: '"회사" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Trường học', 'Công ty', 'Nhà hàng', 'Bệnh viện'], answer: 'Công ty', explanationVi: '회사 = công ty', difficulty: DIFFICULTY.EASY },
      { question: '"Công việc" trong tiếng Hàn là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['학교', '일', '병원', '은행'], answer: '일', explanationVi: '일 = công việc', difficulty: DIFFICULTY.EASY },
      { question: '"야근" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Nghỉ phép', 'Làm thêm giờ', 'Họp', 'Công tác'], answer: 'Làm thêm giờ', explanationVi: '야근 = làm thêm giờ', difficulty: DIFFICULTY.MEDIUM },
      { question: '"Đồng nghiệp" trong tiếng Hàn là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['상사', '동료', '부하', '사장'], answer: '동료', explanationVi: '동료 = đồng nghiệp', difficulty: DIFFICULTY.MEDIUM },
      { question: '"마감" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Bắt đầu', 'Kết thúc', 'Hạn chót', 'Lịch trình'], answer: 'Hạn chót', explanationVi: '마감 = hạn chót', difficulty: DIFFICULTY.HARD },
    ],
  },
];
