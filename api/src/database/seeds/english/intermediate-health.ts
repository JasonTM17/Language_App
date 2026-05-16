import { LessonData } from '../utils';
import { TOPICS, DIFFICULTY, QUIZ_TYPES } from '../constants';

export const englishHealthIntermediateLessons: LessonData[] = [
  {
    title: 'Health & Medicine',
    titleVi: 'Sức khỏe & Y tế',
    description: 'Learn health and medical vocabulary in English',
    descriptionVi: 'Học từ vựng về sức khỏe và y tế bằng tiếng Anh',
    topic: TOPICS.HEALTH,
    vocabulary: [
      { word: 'symptom', meaning: 'triệu chứng', example: 'What are your symptoms?', exampleMeaning: 'Triệu chứng của bạn là gì?', difficulty: DIFFICULTY.MEDIUM },
      { word: 'diagnosis', meaning: 'chẩn đoán', example: 'The doctor made a diagnosis.', exampleMeaning: 'Bác sĩ đã chẩn đoán.', difficulty: DIFFICULTY.HARD },
      { word: 'prescription', meaning: 'đơn thuốc', example: 'I need a prescription.', exampleMeaning: 'Tôi cần đơn thuốc.', difficulty: DIFFICULTY.MEDIUM },
      { word: 'treatment', meaning: 'điều trị', example: 'The treatment is working.', exampleMeaning: 'Việc điều trị đang có hiệu quả.', difficulty: DIFFICULTY.MEDIUM },
      { word: 'surgery', meaning: 'phẫu thuật', example: 'He needs surgery.', exampleMeaning: 'Anh ấy cần phẫu thuật.', difficulty: DIFFICULTY.HARD },
      { word: 'allergy', meaning: 'dị ứng', example: 'I have a food allergy.', exampleMeaning: 'Tôi bị dị ứng thực phẩm.', difficulty: DIFFICULTY.MEDIUM },
      { word: 'infection', meaning: 'nhiễm trùng', example: 'It is a bacterial infection.', exampleMeaning: 'Đó là nhiễm trùng do vi khuẩn.', difficulty: DIFFICULTY.MEDIUM },
      { word: 'vaccination', meaning: 'tiêm chủng', example: 'Get your vaccination.', exampleMeaning: 'Hãy đi tiêm chủng.', difficulty: DIFFICULTY.MEDIUM },
      { word: 'chronic', meaning: 'mãn tính', example: 'It is a chronic disease.', exampleMeaning: 'Đó là bệnh mãn tính.', difficulty: DIFFICULTY.HARD },
      { word: 'recovery', meaning: 'hồi phục', example: 'Recovery takes time.', exampleMeaning: 'Hồi phục cần thời gian.', difficulty: DIFFICULTY.MEDIUM },
      { word: 'insurance', meaning: 'bảo hiểm', example: 'Do you have health insurance?', exampleMeaning: 'Bạn có bảo hiểm sức khỏe không?', difficulty: DIFFICULTY.MEDIUM },
      { word: 'emergency', meaning: 'cấp cứu', example: 'Call emergency services.', exampleMeaning: 'Gọi dịch vụ cấp cứu.', difficulty: DIFFICULTY.MEDIUM },
    ],
    quizzes: [
      { question: '"symptom" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Thuốc', 'Triệu chứng', 'Bệnh viện', 'Bác sĩ'], answer: 'Triệu chứng', explanationVi: 'symptom = triệu chứng', difficulty: DIFFICULTY.MEDIUM },
      { question: '"Chẩn đoán" trong tiếng Anh là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['treatment', 'diagnosis', 'prescription', 'surgery'], answer: 'diagnosis', explanationVi: 'diagnosis = chẩn đoán', difficulty: DIFFICULTY.HARD },
      { question: '"allergy" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Nhiễm trùng', 'Dị ứng', 'Mãn tính', 'Cấp cứu'], answer: 'Dị ứng', explanationVi: 'allergy = dị ứng', difficulty: DIFFICULTY.MEDIUM },
      { question: '"Tiêm chủng" trong tiếng Anh là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['infection', 'vaccination', 'surgery', 'treatment'], answer: 'vaccination', explanationVi: 'vaccination = tiêm chủng', difficulty: DIFFICULTY.MEDIUM },
      { question: '"chronic" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Cấp tính', 'Mãn tính', 'Nhẹ', 'Nặng'], answer: 'Mãn tính', explanationVi: 'chronic = mãn tính', difficulty: DIFFICULTY.HARD },
    ],
  },
];
