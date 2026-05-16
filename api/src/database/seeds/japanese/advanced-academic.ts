import { LessonData } from '../utils';
import { TOPICS, DIFFICULTY, QUIZ_TYPES } from '../constants';

export const japaneseAcademicLessons: LessonData[] = [
  {
    title: 'Academic Japanese',
    titleVi: 'Tiếng Nhật học thuật',
    description: 'Learn academic vocabulary in Japanese',
    descriptionVi: 'Học từ vựng học thuật bằng tiếng Nhật',
    topic: TOPICS.SCHOOL,
    vocabulary: [
      { word: '研究 (けんきゅう)', meaning: 'nghiên cứu', example: '研究を続けています。', exampleMeaning: 'Tôi đang tiếp tục nghiên cứu.', difficulty: DIFFICULTY.HARD },
      { word: '仮説 (かせつ)', meaning: 'giả thuyết', example: '仮説を立てましょう。', exampleMeaning: 'Hãy đặt giả thuyết.', difficulty: DIFFICULTY.HARD },
      { word: '分析 (ぶんせき)', meaning: 'phân tích', example: 'データを分析します。', exampleMeaning: 'Phân tích dữ liệu.', difficulty: DIFFICULTY.HARD },
      { word: '結論 (けつろん)', meaning: 'kết luận', example: '結論を出してください。', exampleMeaning: 'Hãy đưa ra kết luận.', difficulty: DIFFICULTY.MEDIUM },
      { word: '証拠 (しょうこ)', meaning: 'bằng chứng', example: '証拠が必要です。', exampleMeaning: 'Cần bằng chứng.', difficulty: DIFFICULTY.HARD },
      { word: '論文 (ろんぶん)', meaning: 'luận văn', example: '論文を書いています。', exampleMeaning: 'Tôi đang viết luận văn.', difficulty: DIFFICULTY.HARD },
      { word: '方法論 (ほうほうろん)', meaning: 'phương pháp luận', example: '方法論を説明してください。', exampleMeaning: 'Hãy giải thích phương pháp luận.', difficulty: DIFFICULTY.HARD },
      { word: '査読 (さどく)', meaning: 'đánh giá đồng nghiệp', example: '査読を通過しました。', exampleMeaning: 'Đã qua đánh giá đồng nghiệp.', difficulty: DIFFICULTY.HARD },
      { word: '引用 (いんよう)', meaning: 'trích dẫn', example: '正しく引用してください。', exampleMeaning: 'Hãy trích dẫn đúng cách.', difficulty: DIFFICULTY.MEDIUM },
      { word: '要旨 (ようし)', meaning: 'tóm tắt/tóm lược', example: '要旨を書いてください。', exampleMeaning: 'Hãy viết tóm tắt.', difficulty: DIFFICULTY.HARD },
      { word: '盗作 (とうさく)', meaning: 'đạo văn', example: '盗作は許されません。', exampleMeaning: 'Đạo văn không được chấp nhận.', difficulty: DIFFICULTY.HARD },
      { word: '参考文献 (さんこうぶんけん)', meaning: 'tài liệu tham khảo', example: '参考文献を追加してください。', exampleMeaning: 'Hãy thêm tài liệu tham khảo.', difficulty: DIFFICULTY.HARD },
    ],
    quizzes: [
      { question: '"研究" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Giảng dạy', 'Nghiên cứu', 'Học tập', 'Thi cử'], answer: 'Nghiên cứu', explanationVi: '研究 (けんきゅう) = nghiên cứu', difficulty: DIFFICULTY.HARD },
      { question: '"Giả thuyết" trong tiếng Nhật là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['論文', '仮説', '理論', '結論'], answer: '仮説', explanationVi: '仮説 (かせつ) = giả thuyết', difficulty: DIFFICULTY.HARD },
      { question: '"証拠" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Kết luận', 'Bằng chứng', 'Phương pháp', 'Trích dẫn'], answer: 'Bằng chứng', explanationVi: '証拠 (しょうこ) = bằng chứng', difficulty: DIFFICULTY.HARD },
      { question: '"Đạo văn" trong tiếng Nhật là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['引用', '盗作', '要旨', '論文'], answer: '盗作', explanationVi: '盗作 (とうさく) = đạo văn', difficulty: DIFFICULTY.HARD },
      { question: '"分析" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Tổng hợp', 'Phân tích', 'So sánh', 'Đánh giá'], answer: 'Phân tích', explanationVi: '分析 (ぶんせき) = phân tích', difficulty: DIFFICULTY.HARD },
    ],
  },
];
