import { LessonData } from '../utils';
import { TOPICS, DIFFICULTY, QUIZ_TYPES } from '../constants';

export const chineseEnvironmentLessons: LessonData[] = [
  {
    title: 'Environment & Nature',
    titleVi: 'Môi trường & Thiên nhiên',
    description: 'Learn environment vocabulary in Chinese',
    descriptionVi: 'Học từ vựng về môi trường bằng tiếng Trung',
    topic: TOPICS.TECHNOLOGY,
    vocabulary: [
      { word: '环境 (huánjìng)', meaning: 'môi trường', example: '保护环境。', exampleMeaning: 'Bảo vệ môi trường.', difficulty: DIFFICULTY.MEDIUM },
      { word: '自然 (zìrán)', meaning: 'thiên nhiên', example: '自然很美。', exampleMeaning: 'Thiên nhiên đẹp.', difficulty: DIFFICULTY.EASY },
      { word: '地球 (dìqiú)', meaning: 'trái đất', example: '爱护地球。', exampleMeaning: 'Yêu quý trái đất.', difficulty: DIFFICULTY.MEDIUM },
      { word: '回收 (huíshōu)', meaning: 'tái chế', example: '回收很重要。', exampleMeaning: 'Tái chế rất quan trọng.', difficulty: DIFFICULTY.EASY },
      { word: '污染 (wūrǎn)', meaning: 'ô nhiễm', example: '空气污染是问题。', exampleMeaning: 'Ô nhiễm không khí là vấn đề.', difficulty: DIFFICULTY.HARD },
      { word: '森林 (sēnlín)', meaning: 'rừng', example: '保护森林。', exampleMeaning: 'Bảo vệ rừng.', difficulty: DIFFICULTY.MEDIUM },
      { word: '全球变暖 (quánqiú biànnuǎn)', meaning: 'nóng lên toàn cầu', example: '全球变暖很严重。', exampleMeaning: 'Nóng lên toàn cầu rất nghiêm trọng.', difficulty: DIFFICULTY.HARD },
      { word: '节能 (jiénéng)', meaning: 'tiết kiệm năng lượng', example: '我们要节能。', exampleMeaning: 'Chúng ta cần tiết kiệm năng lượng.', difficulty: DIFFICULTY.MEDIUM },
      { word: '垃圾 (lājī)', meaning: 'rác', example: '垃圾分类。', exampleMeaning: 'Phân loại rác.', difficulty: DIFFICULTY.EASY },
      { word: '太阳能 (tàiyángnéng)', meaning: 'năng lượng mặt trời', example: '用太阳能发电。', exampleMeaning: 'Dùng năng lượng mặt trời phát điện.', difficulty: DIFFICULTY.HARD },
      { word: '海洋 (hǎiyáng)', meaning: 'đại dương', example: '保护海洋。', exampleMeaning: 'Bảo vệ đại dương.', difficulty: DIFFICULTY.MEDIUM },
      { word: '保护动物 (bǎohù dòngwù)', meaning: 'bảo vệ động vật', example: '保护动物很重要。', exampleMeaning: 'Bảo vệ động vật rất quan trọng.', difficulty: DIFFICULTY.HARD },
    ],
    quizzes: [
      { question: '"环境" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Thiên nhiên', 'Môi trường', 'Trái đất', 'Rừng'], answer: 'Môi trường', explanationVi: '环境 (huánjìng) = môi trường', difficulty: DIFFICULTY.MEDIUM },
      { question: '"Tái chế" trong tiếng Trung là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['垃圾', '回收', '节能', '污染'], answer: '回收', explanationVi: '回收 (huíshōu) = tái chế', difficulty: DIFFICULTY.EASY },
      { question: '"污染" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Sạch sẽ', 'Ô nhiễm', 'Tái chế', 'Bảo vệ'], answer: 'Ô nhiễm', explanationVi: '污染 (wūrǎn) = ô nhiễm', difficulty: DIFFICULTY.HARD },
      { question: '"Rừng" trong tiếng Trung là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['海洋', '森林', '山', '河'], answer: '森林', explanationVi: '森林 (sēnlín) = rừng', difficulty: DIFFICULTY.MEDIUM },
      { question: '"地球" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Mặt trời', 'Mặt trăng', 'Trái đất', 'Ngôi sao'], answer: 'Trái đất', explanationVi: '地球 (dìqiú) = trái đất', difficulty: DIFFICULTY.MEDIUM },
    ],
  },
];
