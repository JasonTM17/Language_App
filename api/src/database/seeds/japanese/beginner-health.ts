import { LessonData } from '../utils';
import { TOPICS, DIFFICULTY, QUIZ_TYPES } from '../constants';

export const japaneseHealthLessons: LessonData[] = [
  {
    title: 'Health & Body',
    titleVi: 'Sức khỏe & Cơ thể',
    description: 'Learn health vocabulary in Japanese',
    descriptionVi: 'Học từ vựng về sức khỏe bằng tiếng Nhật',
    topic: TOPICS.HEALTH,
    vocabulary: [
      { word: '病院 (びょういん)', meaning: 'bệnh viện', example: '病院に行きます。', exampleMeaning: 'Tôi đi bệnh viện.', difficulty: DIFFICULTY.EASY },
      { word: '医者 (いしゃ)', meaning: 'bác sĩ', example: '医者に診てもらいます。', exampleMeaning: 'Tôi đi khám bác sĩ.', difficulty: DIFFICULTY.EASY },
      { word: '薬 (くすり)', meaning: 'thuốc', example: '薬を飲みます。', exampleMeaning: 'Tôi uống thuốc.', difficulty: DIFFICULTY.EASY },
      { word: '頭 (あたま)', meaning: 'đầu', example: '頭が痛いです。', exampleMeaning: 'Tôi đau đầu.', difficulty: DIFFICULTY.EASY },
      { word: 'お腹 (おなか)', meaning: 'bụng', example: 'お腹が痛いです。', exampleMeaning: 'Tôi đau bụng.', difficulty: DIFFICULTY.EASY },
      { word: '熱 (ねつ)', meaning: 'sốt', example: '熱があります。', exampleMeaning: 'Tôi bị sốt.', difficulty: DIFFICULTY.EASY },
      { word: '風邪 (かぜ)', meaning: 'cảm lạnh', example: '風邪をひきました。', exampleMeaning: 'Tôi bị cảm lạnh.', difficulty: DIFFICULTY.EASY },
      { word: '咳 (せき)', meaning: 'ho', example: '咳が出ます。', exampleMeaning: 'Tôi bị ho.', difficulty: DIFFICULTY.MEDIUM },
      { word: '目 (め)', meaning: 'mắt', example: '目が疲れました。', exampleMeaning: 'Mắt tôi mỏi.', difficulty: DIFFICULTY.EASY },
      { word: '歯 (は)', meaning: 'răng', example: '歯が痛いです。', exampleMeaning: 'Tôi đau răng.', difficulty: DIFFICULTY.EASY },
      { word: 'アレルギー', meaning: 'dị ứng', example: '花粉アレルギーがあります。', exampleMeaning: 'Tôi bị dị ứng phấn hoa.', difficulty: DIFFICULTY.MEDIUM },
      { word: '健康 (けんこう)', meaning: 'sức khỏe', example: '健康が大切です。', exampleMeaning: 'Sức khỏe rất quan trọng.', difficulty: DIFFICULTY.MEDIUM },
    ],
    quizzes: [
      { question: '"病院" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Trường học', 'Bệnh viện', 'Nhà hàng', 'Công ty'], answer: 'Bệnh viện', explanationVi: '病院 (びょういん) = bệnh viện', difficulty: DIFFICULTY.EASY },
      { question: '"Bác sĩ" trong tiếng Nhật là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['先生', '医者', '看護師', '薬剤師'], answer: '医者', explanationVi: '医者 (いしゃ) = bác sĩ', difficulty: DIFFICULTY.EASY },
      { question: '"熱" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Ho', 'Sốt', 'Đau', 'Mệt'], answer: 'Sốt', explanationVi: '熱 (ねつ) = sốt', difficulty: DIFFICULTY.EASY },
      { question: '"Cảm lạnh" trong tiếng Nhật là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['熱', '風邪', '咳', '痛い'], answer: '風邪', explanationVi: '風邪 (かぜ) = cảm lạnh', difficulty: DIFFICULTY.EASY },
      { question: '"健康" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Bệnh tật', 'Sức khỏe', 'Thuốc', 'Bệnh viện'], answer: 'Sức khỏe', explanationVi: '健康 (けんこう) = sức khỏe', difficulty: DIFFICULTY.MEDIUM },
    ],
  },
];
