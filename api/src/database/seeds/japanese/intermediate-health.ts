import { LessonData } from '../utils';
import { TOPICS, DIFFICULTY, QUIZ_TYPES } from '../constants';

export const japaneseHealthIntermediateLessons: LessonData[] = [
  {
    title: 'Health & Medicine',
    titleVi: 'Sức khỏe & Y tế',
    description: 'Learn health and medical vocabulary in Japanese',
    descriptionVi: 'Học từ vựng về sức khỏe và y tế bằng tiếng Nhật',
    topic: TOPICS.HEALTH,
    vocabulary: [
      { word: '症状 (しょうじょう)', meaning: 'triệu chứng', example: '症状は何ですか？', exampleMeaning: 'Triệu chứng là gì?', difficulty: DIFFICULTY.MEDIUM },
      { word: '診断 (しんだん)', meaning: 'chẩn đoán', example: '医者が診断しました。', exampleMeaning: 'Bác sĩ đã chẩn đoán.', difficulty: DIFFICULTY.HARD },
      { word: '処方箋 (しょほうせん)', meaning: 'đơn thuốc', example: '処方箋が必要です。', exampleMeaning: 'Tôi cần đơn thuốc.', difficulty: DIFFICULTY.HARD },
      { word: '治療 (ちりょう)', meaning: 'điều trị', example: '治療が効いています。', exampleMeaning: 'Việc điều trị đang có hiệu quả.', difficulty: DIFFICULTY.MEDIUM },
      { word: '手術 (しゅじゅつ)', meaning: 'phẫu thuật', example: '手術が必要です。', exampleMeaning: 'Cần phẫu thuật.', difficulty: DIFFICULTY.HARD },
      { word: 'アレルギー', meaning: 'dị ứng', example: '食物アレルギーがあります。', exampleMeaning: 'Tôi bị dị ứng thực phẩm.', difficulty: DIFFICULTY.MEDIUM },
      { word: '感染 (かんせん)', meaning: 'nhiễm trùng', example: '細菌感染です。', exampleMeaning: 'Đây là nhiễm trùng vi khuẩn.', difficulty: DIFFICULTY.MEDIUM },
      { word: 'ワクチン', meaning: 'vắc-xin', example: 'ワクチンを打ってください。', exampleMeaning: 'Hãy đi tiêm vắc-xin.', difficulty: DIFFICULTY.MEDIUM },
      { word: '慢性 (まんせい)', meaning: 'mãn tính', example: '慢性の病気です。', exampleMeaning: 'Đây là bệnh mãn tính.', difficulty: DIFFICULTY.HARD },
      { word: '回復 (かいふく)', meaning: 'hồi phục', example: '回復には時間がかかります。', exampleMeaning: 'Hồi phục cần thời gian.', difficulty: DIFFICULTY.MEDIUM },
      { word: '保険 (ほけん)', meaning: 'bảo hiểm', example: '健康保険はありますか？', exampleMeaning: 'Bạn có bảo hiểm sức khỏe không?', difficulty: DIFFICULTY.MEDIUM },
      { word: '救急 (きゅうきゅう)', meaning: 'cấp cứu', example: '救急車を呼んでください。', exampleMeaning: 'Hãy gọi xe cấp cứu.', difficulty: DIFFICULTY.MEDIUM },
    ],
    quizzes: [
      { question: '"症状" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Thuốc', 'Triệu chứng', 'Bệnh viện', 'Bác sĩ'], answer: 'Triệu chứng', explanationVi: '症状 (しょうじょう) = triệu chứng', difficulty: DIFFICULTY.MEDIUM },
      { question: '"Chẩn đoán" trong tiếng Nhật là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['治療', '診断', '処方箋', '手術'], answer: '診断', explanationVi: '診断 (しんだん) = chẩn đoán', difficulty: DIFFICULTY.HARD },
      { question: '"アレルギー" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Nhiễm trùng', 'Dị ứng', 'Mãn tính', 'Cấp cứu'], answer: 'Dị ứng', explanationVi: 'アレルギー = dị ứng', difficulty: DIFFICULTY.MEDIUM },
      { question: '"Vắc-xin" trong tiếng Nhật là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['感染', 'ワクチン', '手術', '治療'], answer: 'ワクチン', explanationVi: 'ワクチン = vắc-xin', difficulty: DIFFICULTY.MEDIUM },
      { question: '"慢性" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Cấp tính', 'Mãn tính', 'Nhẹ', 'Nặng'], answer: 'Mãn tính', explanationVi: '慢性 (まんせい) = mãn tính', difficulty: DIFFICULTY.HARD },
    ],
  },
];
