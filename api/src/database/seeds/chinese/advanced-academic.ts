import { LessonData } from '../utils';
import { TOPICS, DIFFICULTY, QUIZ_TYPES } from '../constants';

export const chineseAcademicLessons: LessonData[] = [
  {
    title: 'Academic Chinese',
    titleVi: 'Tiếng Trung học thuật',
    description: 'Learn academic vocabulary in Chinese',
    descriptionVi: 'Học từ vựng học thuật bằng tiếng Trung',
    topic: TOPICS.SCHOOL,
    vocabulary: [
      { word: '研究 (yánjiū)', meaning: 'nghiên cứu', example: '我在做研究。', exampleMeaning: 'Tôi đang làm nghiên cứu.', difficulty: DIFFICULTY.HARD },
      { word: '假设 (jiǎshè)', meaning: 'giả thuyết', example: '我们需要验证假设。', exampleMeaning: 'Chúng ta cần kiểm chứng giả thuyết.', difficulty: DIFFICULTY.HARD },
      { word: '分析 (fēnxī)', meaning: 'phân tích', example: '请分析这些数据。', exampleMeaning: 'Hãy phân tích dữ liệu này.', difficulty: DIFFICULTY.HARD },
      { word: '结论 (jiélùn)', meaning: 'kết luận', example: '你的结论是什么？', exampleMeaning: 'Kết luận của bạn là gì?', difficulty: DIFFICULTY.MEDIUM },
      { word: '证据 (zhèngjù)', meaning: 'bằng chứng', example: '有充分的证据。', exampleMeaning: 'Có đầy đủ bằng chứng.', difficulty: DIFFICULTY.HARD },
      { word: '论文 (lùnwén)', meaning: 'luận văn', example: '我在写论文。', exampleMeaning: 'Tôi đang viết luận văn.', difficulty: DIFFICULTY.HARD },
      { word: '方法论 (fāngfǎlùn)', meaning: 'phương pháp luận', example: '请解释你的方法论。', exampleMeaning: 'Hãy giải thích phương pháp luận của bạn.', difficulty: DIFFICULTY.HARD },
      { word: '同行评审 (tóngháng píngshěn)', meaning: 'đánh giá đồng nghiệp', example: '论文通过了同行评审。', exampleMeaning: 'Luận văn đã qua đánh giá đồng nghiệp.', difficulty: DIFFICULTY.HARD },
      { word: '引用 (yǐnyòng)', meaning: 'trích dẫn', example: '请正确引用。', exampleMeaning: 'Hãy trích dẫn đúng cách.', difficulty: DIFFICULTY.MEDIUM },
      { word: '摘要 (zhāiyào)', meaning: 'tóm tắt', example: '请写一个摘要。', exampleMeaning: 'Hãy viết tóm tắt.', difficulty: DIFFICULTY.HARD },
      { word: '抄袭 (chāoxí)', meaning: 'đạo văn', example: '抄袭是不可接受的。', exampleMeaning: 'Đạo văn không được chấp nhận.', difficulty: DIFFICULTY.HARD },
      { word: '参考文献 (cānkǎo wénxiàn)', meaning: 'tài liệu tham khảo', example: '请列出参考文献。', exampleMeaning: 'Hãy liệt kê tài liệu tham khảo.', difficulty: DIFFICULTY.HARD },
    ],
    quizzes: [
      { question: '"研究" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Giảng dạy', 'Nghiên cứu', 'Học tập', 'Thi cử'], answer: 'Nghiên cứu', explanationVi: '研究 (yánjiū) = nghiên cứu', difficulty: DIFFICULTY.HARD },
      { question: '"Giả thuyết" trong tiếng Trung là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['论文', '假设', '理论', '结论'], answer: '假设', explanationVi: '假设 (jiǎshè) = giả thuyết', difficulty: DIFFICULTY.HARD },
      { question: '"证据" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Kết luận', 'Bằng chứng', 'Phương pháp', 'Trích dẫn'], answer: 'Bằng chứng', explanationVi: '证据 (zhèngjù) = bằng chứng', difficulty: DIFFICULTY.HARD },
      { question: '"Đạo văn" trong tiếng Trung là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['引用', '抄袭', '摘要', '论文'], answer: '抄袭', explanationVi: '抄袭 (chāoxí) = đạo văn', difficulty: DIFFICULTY.HARD },
      { question: '"分析" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Tổng hợp', 'Phân tích', 'So sánh', 'Đánh giá'], answer: 'Phân tích', explanationVi: '分析 (fēnxī) = phân tích', difficulty: DIFFICULTY.HARD },
    ],
  },
];
