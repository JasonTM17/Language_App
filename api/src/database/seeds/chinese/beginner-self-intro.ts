import { LessonData } from '../utils';
import { TOPICS, DIFFICULTY, QUIZ_TYPES } from '../constants';

export const chineseSelfIntroLessons: LessonData[] = [
  {
    title: 'Self Introduction',
    titleVi: 'Tự giới thiệu',
    description: 'Learn self-introduction phrases in Chinese',
    descriptionVi: 'Học cách tự giới thiệu bằng tiếng Trung',
    topic: TOPICS.SELF_INTRO,
    vocabulary: [
      { word: '名字 (míngzi)', meaning: 'tên', example: '我的名字是小明。', exampleMeaning: 'Tên tôi là Tiểu Minh.', difficulty: DIFFICULTY.EASY },
      { word: '国家 (guójiā)', meaning: 'đất nước', example: '我来自越南。', exampleMeaning: 'Tôi đến từ Việt Nam.', difficulty: DIFFICULTY.EASY },
      { word: '工作 (gōngzuò)', meaning: 'công việc', example: '我的工作是老师。', exampleMeaning: 'Công việc của tôi là giáo viên.', difficulty: DIFFICULTY.EASY },
      { word: '年龄 (niánlíng)', meaning: 'tuổi', example: '我二十五岁。', exampleMeaning: 'Tôi 25 tuổi.', difficulty: DIFFICULTY.EASY },
      { word: '爱好 (àihào)', meaning: 'sở thích', example: '我的爱好是看书。', exampleMeaning: 'Sở thích của tôi là đọc sách.', difficulty: DIFFICULTY.EASY },
      { word: '家人 (jiārén)', meaning: 'gia đình', example: '我家有四口人。', exampleMeaning: 'Gia đình tôi có 4 người.', difficulty: DIFFICULTY.EASY },
      { word: '住 (zhù)', meaning: 'sống/ở', example: '我住在北京。', exampleMeaning: 'Tôi sống ở Bắc Kinh.', difficulty: DIFFICULTY.EASY },
      { word: '学生 (xuéshēng)', meaning: 'sinh viên', example: '我是大学生。', exampleMeaning: 'Tôi là sinh viên đại học.', difficulty: DIFFICULTY.EASY },
      { word: '上班族 (shàngbānzú)', meaning: 'nhân viên văn phòng', example: '我是上班族。', exampleMeaning: 'Tôi là nhân viên văn phòng.', difficulty: DIFFICULTY.EASY },
      { word: '认识你很高兴 (rènshi nǐ hěn gāoxìng)', meaning: 'rất vui được gặp bạn', example: '你好，认识你很高兴。', exampleMeaning: 'Xin chào, rất vui được gặp bạn.', difficulty: DIFFICULTY.EASY },
      { word: '故乡 (gùxiāng)', meaning: 'quê hương', example: '我的故乡是河内。', exampleMeaning: 'Quê tôi là Hà Nội.', difficulty: DIFFICULTY.EASY },
      { word: '中文 (zhōngwén)', meaning: 'tiếng Trung', example: '我在学中文。', exampleMeaning: 'Tôi đang học tiếng Trung.', difficulty: DIFFICULTY.EASY },
    ],
    quizzes: [
      { question: '"名字" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Tuổi', 'Tên', 'Quê', 'Nghề'], answer: 'Tên', explanationVi: '名字 (míngzi) = tên', difficulty: DIFFICULTY.EASY },
      { question: '"Công việc" trong tiếng Trung là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['爱好', '工作', '家人', '名字'], answer: '工作', explanationVi: '工作 (gōngzuò) = công việc', difficulty: DIFFICULTY.EASY },
      { question: '"国家" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Đất nước', 'Tuổi', 'Tên', 'Sở thích'], answer: 'Đất nước', explanationVi: '国家 (guójiā) = đất nước', difficulty: DIFFICULTY.EASY },
      { question: '"Gia đình" trong tiếng Trung là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['工作', '爱好', '家人', '朋友'], answer: '家人', explanationVi: '家人 (jiārén) = gia đình/người nhà', difficulty: DIFFICULTY.EASY },
      { question: '"认识你很高兴" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Tạm biệt', 'Xin lỗi', 'Rất vui được gặp', 'Cảm ơn'], answer: 'Rất vui được gặp', explanationVi: '认识你很高兴 = rất vui được gặp bạn', difficulty: DIFFICULTY.EASY },
    ],
  },
];
