import { LessonData } from '../utils';
import { TOPICS, DIFFICULTY, QUIZ_TYPES } from '../constants';

export const koreanAcademicLessons: LessonData[] = [
  {
    title: 'Academic Korean',
    titleVi: 'Tiếng Hàn học thuật',
    description: 'Learn academic vocabulary in Korean',
    descriptionVi: 'Học từ vựng học thuật bằng tiếng Hàn',
    topic: TOPICS.SCHOOL,
    vocabulary: [
      { word: '연구', meaning: 'nghiên cứu', example: '연구를 계속하고 있습니다.', exampleMeaning: 'Tôi đang tiếp tục nghiên cứu.', difficulty: DIFFICULTY.HARD },
      { word: '가설', meaning: 'giả thuyết', example: '가설을 세워봅시다.', exampleMeaning: 'Hãy đặt giả thuyết.', difficulty: DIFFICULTY.HARD },
      { word: '분석', meaning: 'phân tích', example: '데이터를 분석합니다.', exampleMeaning: 'Phân tích dữ liệu.', difficulty: DIFFICULTY.HARD },
      { word: '결론', meaning: 'kết luận', example: '결론을 내려주세요.', exampleMeaning: 'Hãy đưa ra kết luận.', difficulty: DIFFICULTY.MEDIUM },
      { word: '증거', meaning: 'bằng chứng', example: '증거가 필요합니다.', exampleMeaning: 'Cần bằng chứng.', difficulty: DIFFICULTY.HARD },
      { word: '논문', meaning: 'luận văn', example: '논문을 쓰고 있습니다.', exampleMeaning: 'Tôi đang viết luận văn.', difficulty: DIFFICULTY.HARD },
      { word: '방법론', meaning: 'phương pháp luận', example: '방법론을 설명해주세요.', exampleMeaning: 'Hãy giải thích phương pháp luận.', difficulty: DIFFICULTY.HARD },
      { word: '동료 평가', meaning: 'đánh giá đồng nghiệp', example: '동료 평가를 통과했습니다.', exampleMeaning: 'Đã qua đánh giá đồng nghiệp.', difficulty: DIFFICULTY.HARD },
      { word: '인용', meaning: 'trích dẫn', example: '올바르게 인용해주세요.', exampleMeaning: 'Hãy trích dẫn đúng cách.', difficulty: DIFFICULTY.MEDIUM },
      { word: '초록', meaning: 'tóm tắt/tóm lược', example: '초록을 작성해주세요.', exampleMeaning: 'Hãy viết tóm tắt.', difficulty: DIFFICULTY.HARD },
      { word: '표절', meaning: 'đạo văn', example: '표절은 허용되지 않습니다.', exampleMeaning: 'Đạo văn không được chấp nhận.', difficulty: DIFFICULTY.HARD },
      { word: '참고문헌', meaning: 'tài liệu tham khảo', example: '참고문헌을 추가해주세요.', exampleMeaning: 'Hãy thêm tài liệu tham khảo.', difficulty: DIFFICULTY.HARD },
    ],
    quizzes: [
      { question: '"연구" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Giảng dạy', 'Nghiên cứu', 'Học tập', 'Thi cử'], answer: 'Nghiên cứu', explanationVi: '연구 = nghiên cứu', difficulty: DIFFICULTY.HARD },
      { question: '"Giả thuyết" trong tiếng Hàn là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['논문', '가설', '이론', '결론'], answer: '가설', explanationVi: '가설 = giả thuyết', difficulty: DIFFICULTY.HARD },
      { question: '"증거" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Kết luận', 'Bằng chứng', 'Phương pháp', 'Trích dẫn'], answer: 'Bằng chứng', explanationVi: '증거 = bằng chứng', difficulty: DIFFICULTY.HARD },
      { question: '"Đạo văn" trong tiếng Hàn là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['인용', '표절', '초록', '논문'], answer: '표절', explanationVi: '표절 = đạo văn', difficulty: DIFFICULTY.HARD },
      { question: '"분석" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Tổng hợp', 'Phân tích', 'So sánh', 'Đánh giá'], answer: 'Phân tích', explanationVi: '분석 = phân tích', difficulty: DIFFICULTY.HARD },
    ],
  },
];
