import { LessonData } from '../utils';
import { TOPICS, DIFFICULTY, QUIZ_TYPES } from '../constants';

export const koreanHealthIntermediateLessons: LessonData[] = [
  {
    title: 'Health & Medicine',
    titleVi: 'Sức khỏe & Y tế',
    description: 'Learn health and medical vocabulary in Korean',
    descriptionVi: 'Học từ vựng về sức khỏe và y tế bằng tiếng Hàn',
    topic: TOPICS.HEALTH,
    vocabulary: [
      { word: '증상', meaning: 'triệu chứng', example: '증상이 뭐예요?', exampleMeaning: 'Triệu chứng là gì?', difficulty: DIFFICULTY.MEDIUM },
      { word: '진단', meaning: 'chẩn đoán', example: '의사가 진단했습니다.', exampleMeaning: 'Bác sĩ đã chẩn đoán.', difficulty: DIFFICULTY.HARD },
      { word: '처방전', meaning: 'đơn thuốc', example: '처방전이 필요합니다.', exampleMeaning: 'Tôi cần đơn thuốc.', difficulty: DIFFICULTY.MEDIUM },
      { word: '치료', meaning: 'điều trị', example: '치료가 효과가 있습니다.', exampleMeaning: 'Việc điều trị có hiệu quả.', difficulty: DIFFICULTY.MEDIUM },
      { word: '수술', meaning: 'phẫu thuật', example: '수술이 필요합니다.', exampleMeaning: 'Cần phẫu thuật.', difficulty: DIFFICULTY.HARD },
      { word: '알레르기', meaning: 'dị ứng', example: '음식 알레르기가 있어요.', exampleMeaning: 'Tôi bị dị ứng thực phẩm.', difficulty: DIFFICULTY.MEDIUM },
      { word: '감염', meaning: 'nhiễm trùng', example: '세균 감염입니다.', exampleMeaning: 'Đây là nhiễm trùng vi khuẩn.', difficulty: DIFFICULTY.MEDIUM },
      { word: '백신', meaning: 'vắc-xin', example: '백신을 맞으세요.', exampleMeaning: 'Hãy đi tiêm vắc-xin.', difficulty: DIFFICULTY.MEDIUM },
      { word: '만성', meaning: 'mãn tính', example: '만성 질환입니다.', exampleMeaning: 'Đây là bệnh mãn tính.', difficulty: DIFFICULTY.HARD },
      { word: '회복', meaning: 'hồi phục', example: '회복에 시간이 걸립니다.', exampleMeaning: 'Hồi phục cần thời gian.', difficulty: DIFFICULTY.MEDIUM },
      { word: '보험', meaning: 'bảo hiểm', example: '건강보험 있으세요?', exampleMeaning: 'Bạn có bảo hiểm sức khỏe không?', difficulty: DIFFICULTY.MEDIUM },
      { word: '응급', meaning: 'cấp cứu', example: '응급실에 가세요.', exampleMeaning: 'Hãy đến phòng cấp cứu.', difficulty: DIFFICULTY.MEDIUM },
    ],
    quizzes: [
      { question: '"증상" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Thuốc', 'Triệu chứng', 'Bệnh viện', 'Bác sĩ'], answer: 'Triệu chứng', explanationVi: '증상 = triệu chứng', difficulty: DIFFICULTY.MEDIUM },
      { question: '"Chẩn đoán" trong tiếng Hàn là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['치료', '진단', '처방전', '수술'], answer: '진단', explanationVi: '진단 = chẩn đoán', difficulty: DIFFICULTY.HARD },
      { question: '"알레르기" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Nhiễm trùng', 'Dị ứng', 'Mãn tính', 'Cấp cứu'], answer: 'Dị ứng', explanationVi: '알레르기 = dị ứng', difficulty: DIFFICULTY.MEDIUM },
      { question: '"Vắc-xin" trong tiếng Hàn là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['감염', '백신', '수술', '치료'], answer: '백신', explanationVi: '백신 = vắc-xin', difficulty: DIFFICULTY.MEDIUM },
      { question: '"만성" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Cấp tính', 'Mãn tính', 'Nhẹ', 'Nặng'], answer: 'Mãn tính', explanationVi: '만성 = mãn tính', difficulty: DIFFICULTY.HARD },
    ],
  },
];
