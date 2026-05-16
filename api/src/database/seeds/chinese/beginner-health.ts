import { LessonData } from '../utils';
import { TOPICS, DIFFICULTY, QUIZ_TYPES } from '../constants';

export const chineseHealthLessons: LessonData[] = [
  {
    title: 'Health & Body',
    titleVi: 'Sức khỏe & Cơ thể',
    description: 'Learn health vocabulary in Chinese',
    descriptionVi: 'Học từ vựng về sức khỏe bằng tiếng Trung',
    topic: TOPICS.HEALTH,
    vocabulary: [
      { word: '医院 (yīyuàn)', meaning: 'bệnh viện', example: '我去医院。', exampleMeaning: 'Tôi đi bệnh viện.', difficulty: DIFFICULTY.EASY },
      { word: '医生 (yīshēng)', meaning: 'bác sĩ', example: '我去看医生。', exampleMeaning: 'Tôi đi khám bác sĩ.', difficulty: DIFFICULTY.EASY },
      { word: '药 (yào)', meaning: 'thuốc', example: '我吃药。', exampleMeaning: 'Tôi uống thuốc.', difficulty: DIFFICULTY.EASY },
      { word: '头 (tóu)', meaning: 'đầu', example: '我头疼。', exampleMeaning: 'Tôi đau đầu.', difficulty: DIFFICULTY.EASY },
      { word: '肚子 (dùzi)', meaning: 'bụng', example: '我肚子疼。', exampleMeaning: 'Tôi đau bụng.', difficulty: DIFFICULTY.EASY },
      { word: '发烧 (fāshāo)', meaning: 'sốt', example: '我发烧了。', exampleMeaning: 'Tôi bị sốt.', difficulty: DIFFICULTY.EASY },
      { word: '感冒 (gǎnmào)', meaning: 'cảm lạnh', example: '我感冒了。', exampleMeaning: 'Tôi bị cảm lạnh.', difficulty: DIFFICULTY.EASY },
      { word: '咳嗽 (késou)', meaning: 'ho', example: '我咳嗽。', exampleMeaning: 'Tôi bị ho.', difficulty: DIFFICULTY.MEDIUM },
      { word: '眼睛 (yǎnjing)', meaning: 'mắt', example: '我眼睛累了。', exampleMeaning: 'Mắt tôi mỏi.', difficulty: DIFFICULTY.EASY },
      { word: '牙 (yá)', meaning: 'răng', example: '我牙疼。', exampleMeaning: 'Tôi đau răng.', difficulty: DIFFICULTY.EASY },
      { word: '过敏 (guòmǐn)', meaning: 'dị ứng', example: '我对花粉过敏。', exampleMeaning: 'Tôi bị dị ứng phấn hoa.', difficulty: DIFFICULTY.MEDIUM },
      { word: '健康 (jiànkāng)', meaning: 'sức khỏe', example: '健康很重要。', exampleMeaning: 'Sức khỏe rất quan trọng.', difficulty: DIFFICULTY.MEDIUM },
    ],
    quizzes: [
      { question: '"医院" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Trường học', 'Bệnh viện', 'Nhà hàng', 'Công ty'], answer: 'Bệnh viện', explanationVi: '医院 (yīyuàn) = bệnh viện', difficulty: DIFFICULTY.EASY },
      { question: '"Bác sĩ" trong tiếng Trung là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['老师', '医生', '护士', '药剂师'], answer: '医生', explanationVi: '医生 (yīshēng) = bác sĩ', difficulty: DIFFICULTY.EASY },
      { question: '"发烧" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Ho', 'Sốt', 'Đau', 'Mệt'], answer: 'Sốt', explanationVi: '发烧 (fāshāo) = sốt', difficulty: DIFFICULTY.EASY },
      { question: '"Cảm lạnh" trong tiếng Trung là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['发烧', '感冒', '咳嗽', '疼'], answer: '感冒', explanationVi: '感冒 (gǎnmào) = cảm lạnh', difficulty: DIFFICULTY.EASY },
      { question: '"健康" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Bệnh tật', 'Sức khỏe', 'Thuốc', 'Bệnh viện'], answer: 'Sức khỏe', explanationVi: '健康 (jiànkāng) = sức khỏe', difficulty: DIFFICULTY.MEDIUM },
    ],
  },
];
