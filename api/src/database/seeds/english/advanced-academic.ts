import { LessonData } from '../utils';
import { TOPICS, DIFFICULTY, QUIZ_TYPES } from '../constants';

export const englishAcademicLessons: LessonData[] = [
  {
    title: 'Academic English',
    titleVi: 'Tiếng Anh học thuật',
    description: 'Learn academic vocabulary in English',
    descriptionVi: 'Học từ vựng học thuật bằng tiếng Anh',
    topic: TOPICS.SCHOOL,
    vocabulary: [
      { word: 'research', meaning: 'nghiên cứu', example: 'I am doing research on AI.', exampleMeaning: 'Tôi đang nghiên cứu về AI.', difficulty: DIFFICULTY.MEDIUM },
      { word: 'hypothesis', meaning: 'giả thuyết', example: 'We need to test the hypothesis.', exampleMeaning: 'Chúng ta cần kiểm tra giả thuyết.', difficulty: DIFFICULTY.HARD },
      { word: 'analyze', meaning: 'phân tích', example: 'Analyze the data carefully.', exampleMeaning: 'Phân tích dữ liệu cẩn thận.', difficulty: DIFFICULTY.MEDIUM },
      { word: 'conclusion', meaning: 'kết luận', example: 'What is your conclusion?', exampleMeaning: 'Kết luận của bạn là gì?', difficulty: DIFFICULTY.MEDIUM },
      { word: 'evidence', meaning: 'bằng chứng', example: 'There is strong evidence.', exampleMeaning: 'Có bằng chứng mạnh mẽ.', difficulty: DIFFICULTY.MEDIUM },
      { word: 'thesis', meaning: 'luận văn', example: 'I am writing my thesis.', exampleMeaning: 'Tôi đang viết luận văn.', difficulty: DIFFICULTY.HARD },
      { word: 'methodology', meaning: 'phương pháp luận', example: 'Explain your methodology.', exampleMeaning: 'Giải thích phương pháp luận của bạn.', difficulty: DIFFICULTY.HARD },
      { word: 'peer review', meaning: 'đánh giá đồng nghiệp', example: 'The paper passed peer review.', exampleMeaning: 'Bài báo đã qua đánh giá đồng nghiệp.', difficulty: DIFFICULTY.HARD },
      { word: 'citation', meaning: 'trích dẫn', example: 'Add proper citations.', exampleMeaning: 'Thêm trích dẫn đúng cách.', difficulty: DIFFICULTY.MEDIUM },
      { word: 'abstract', meaning: 'tóm tắt', example: 'Write a brief abstract.', exampleMeaning: 'Viết tóm tắt ngắn gọn.', difficulty: DIFFICULTY.MEDIUM },
      { word: 'plagiarism', meaning: 'đạo văn', example: 'Plagiarism is not acceptable.', exampleMeaning: 'Đạo văn không được chấp nhận.', difficulty: DIFFICULTY.HARD },
      { word: 'bibliography', meaning: 'danh mục tài liệu', example: 'Include a bibliography.', exampleMeaning: 'Bao gồm danh mục tài liệu.', difficulty: DIFFICULTY.HARD },
    ],
    quizzes: [
      { question: '"research" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Giảng dạy', 'Nghiên cứu', 'Học tập', 'Thi cử'], answer: 'Nghiên cứu', explanationVi: 'research = nghiên cứu', difficulty: DIFFICULTY.MEDIUM },
      { question: '"Giả thuyết" trong tiếng Anh là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['thesis', 'hypothesis', 'theory', 'conclusion'], answer: 'hypothesis', explanationVi: 'hypothesis = giả thuyết', difficulty: DIFFICULTY.HARD },
      { question: '"evidence" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Kết luận', 'Bằng chứng', 'Phương pháp', 'Trích dẫn'], answer: 'Bằng chứng', explanationVi: 'evidence = bằng chứng', difficulty: DIFFICULTY.MEDIUM },
      { question: '"Đạo văn" trong tiếng Anh là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['citation', 'plagiarism', 'abstract', 'thesis'], answer: 'plagiarism', explanationVi: 'plagiarism = đạo văn', difficulty: DIFFICULTY.HARD },
      { question: '"analyze" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Tổng hợp', 'Phân tích', 'So sánh', 'Đánh giá'], answer: 'Phân tích', explanationVi: 'analyze = phân tích', difficulty: DIFFICULTY.MEDIUM },
    ],
  },
];
