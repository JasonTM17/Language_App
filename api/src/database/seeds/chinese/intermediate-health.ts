import { LessonData } from '../utils';
import { TOPICS, DIFFICULTY, QUIZ_TYPES } from '../constants';

export const chineseHealthIntermediateLessons: LessonData[] = [
  {
    title: 'Health & Medicine',
    titleVi: 'Sức khỏe & Y tế',
    description: 'Learn health and medical vocabulary in Chinese',
    descriptionVi: 'Học từ vựng về sức khỏe và y tế bằng tiếng Trung',
    topic: TOPICS.HEALTH,
    vocabulary: [
      { word: '症状 (zhèngzhuàng)', meaning: 'triệu chứng', example: '你有什么症状？', exampleMeaning: 'Bạn có triệu chứng gì?', difficulty: DIFFICULTY.MEDIUM },
      { word: '诊断 (zhěnduàn)', meaning: 'chẩn đoán', example: '医生做了诊断。', exampleMeaning: 'Bác sĩ đã chẩn đoán.', difficulty: DIFFICULTY.HARD },
      { word: '处方 (chǔfāng)', meaning: 'đơn thuốc', example: '我需要处方。', exampleMeaning: 'Tôi cần đơn thuốc.', difficulty: DIFFICULTY.MEDIUM },
      { word: '治疗 (zhìliáo)', meaning: 'điều trị', example: '治疗很有效。', exampleMeaning: 'Việc điều trị rất hiệu quả.', difficulty: DIFFICULTY.MEDIUM },
      { word: '手术 (shǒushù)', meaning: 'phẫu thuật', example: '他需要手术。', exampleMeaning: 'Anh ấy cần phẫu thuật.', difficulty: DIFFICULTY.HARD },
      { word: '过敏 (guòmǐn)', meaning: 'dị ứng', example: '我对花粉过敏。', exampleMeaning: 'Tôi bị dị ứng phấn hoa.', difficulty: DIFFICULTY.MEDIUM },
      { word: '感染 (gǎnrǎn)', meaning: 'nhiễm trùng', example: '这是细菌感染。', exampleMeaning: 'Đây là nhiễm trùng vi khuẩn.', difficulty: DIFFICULTY.MEDIUM },
      { word: '疫苗 (yìmiáo)', meaning: 'vắc-xin', example: '请去打疫苗。', exampleMeaning: 'Hãy đi tiêm vắc-xin.', difficulty: DIFFICULTY.MEDIUM },
      { word: '慢性 (mànxìng)', meaning: 'mãn tính', example: '这是慢性病。', exampleMeaning: 'Đây là bệnh mãn tính.', difficulty: DIFFICULTY.HARD },
      { word: '康复 (kāngfù)', meaning: 'hồi phục', example: '康复需要时间。', exampleMeaning: 'Hồi phục cần thời gian.', difficulty: DIFFICULTY.MEDIUM },
      { word: '保险 (bǎoxiǎn)', meaning: 'bảo hiểm', example: '你有医疗保险吗？', exampleMeaning: 'Bạn có bảo hiểm y tế không?', difficulty: DIFFICULTY.MEDIUM },
      { word: '急诊 (jízhěn)', meaning: 'cấp cứu', example: '请叫急诊。', exampleMeaning: 'Hãy gọi cấp cứu.', difficulty: DIFFICULTY.MEDIUM },
    ],
    quizzes: [
      { question: '"症状" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Thuốc', 'Triệu chứng', 'Bệnh viện', 'Bác sĩ'], answer: 'Triệu chứng', explanationVi: '症状 (zhèngzhuàng) = triệu chứng', difficulty: DIFFICULTY.MEDIUM },
      { question: '"Chẩn đoán" trong tiếng Trung là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['治疗', '诊断', '处方', '手术'], answer: '诊断', explanationVi: '诊断 (zhěnduàn) = chẩn đoán', difficulty: DIFFICULTY.HARD },
      { question: '"过敏" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Nhiễm trùng', 'Dị ứng', 'Mãn tính', 'Cấp cứu'], answer: 'Dị ứng', explanationVi: '过敏 (guòmǐn) = dị ứng', difficulty: DIFFICULTY.MEDIUM },
      { question: '"Vắc-xin" trong tiếng Trung là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['感染', '疫苗', '手术', '治疗'], answer: '疫苗', explanationVi: '疫苗 (yìmiáo) = vắc-xin', difficulty: DIFFICULTY.MEDIUM },
      { question: '"慢性" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Cấp tính', 'Mãn tính', 'Nhẹ', 'Nặng'], answer: 'Mãn tính', explanationVi: '慢性 (mànxìng) = mãn tính', difficulty: DIFFICULTY.HARD },
    ],
  },
];
