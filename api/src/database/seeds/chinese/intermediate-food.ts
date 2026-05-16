import { LessonData } from '../utils';
import { TOPICS, DIFFICULTY, QUIZ_TYPES } from '../constants';

export const chineseFoodIntermediateLessons: LessonData[] = [
  {
    title: 'Cooking & Cuisine',
    titleVi: 'Nấu ăn & Ẩm thực',
    description: 'Learn cooking and cuisine vocabulary in Chinese',
    descriptionVi: 'Học từ vựng về nấu ăn và ẩm thực bằng tiếng Trung',
    topic: TOPICS.FOOD,
    vocabulary: [
      { word: '食材 (shícái)', meaning: 'nguyên liệu', example: '需要什么食材？', exampleMeaning: 'Cần nguyên liệu gì?', difficulty: DIFFICULTY.MEDIUM },
      { word: '食谱 (shípǔ)', meaning: 'công thức nấu ăn', example: '按照食谱做。', exampleMeaning: 'Làm theo công thức.', difficulty: DIFFICULTY.EASY },
      { word: '腌制 (yānzhì)', meaning: 'ướp', example: '把鸡肉腌制一晚。', exampleMeaning: 'Ướp gà qua đêm.', difficulty: DIFFICULTY.MEDIUM },
      { word: '炖 (dùn)', meaning: 'ninh/hầm', example: '把汤炖30分钟。', exampleMeaning: 'Ninh canh 30 phút.', difficulty: DIFFICULTY.MEDIUM },
      { word: '调料 (tiáoliào)', meaning: 'gia vị', example: '加入调料。', exampleMeaning: 'Thêm gia vị.', difficulty: DIFFICULTY.EASY },
      { word: '前菜 (qiáncài)', meaning: 'món khai vị', example: '我们点了前菜。', exampleMeaning: 'Chúng tôi gọi món khai vị.', difficulty: DIFFICULTY.MEDIUM },
      { word: '美食 (měishí)', meaning: 'ẩm thực/món ngon', example: '中国美食很丰富。', exampleMeaning: 'Ẩm thực Trung Quốc rất phong phú.', difficulty: DIFFICULTY.EASY },
      { word: '摆盘 (bǎipán)', meaning: 'trang trí/bày biện', example: '摆盘很漂亮。', exampleMeaning: 'Cách bày biện rất đẹp.', difficulty: DIFFICULTY.MEDIUM },
      { word: '发酵 (fājiào)', meaning: 'lên men', example: '豆腐乳是发酵食品。', exampleMeaning: 'Chao là thực phẩm lên men.', difficulty: DIFFICULTY.MEDIUM },
      { word: '有机 (yǒujī)', meaning: 'hữu cơ', example: '我买有机蔬菜。', exampleMeaning: 'Tôi mua rau hữu cơ.', difficulty: DIFFICULTY.MEDIUM },
      { word: '饮食限制 (yǐnshí xiànzhì)', meaning: 'hạn chế chế độ ăn', example: '你有饮食限制吗？', exampleMeaning: 'Bạn có hạn chế chế độ ăn không?', difficulty: DIFFICULTY.HARD },
      { word: '高汤 (gāotāng)', meaning: 'nước dùng', example: '先熬高汤。', exampleMeaning: 'Nấu nước dùng trước.', difficulty: DIFFICULTY.MEDIUM },
    ],
    quizzes: [
      { question: '"食材" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Công thức', 'Nguyên liệu', 'Gia vị', 'Khẩu phần'], answer: 'Nguyên liệu', explanationVi: '食材 (shícái) = nguyên liệu', difficulty: DIFFICULTY.MEDIUM },
      { question: '"Ướp" trong tiếng Trung là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['炖', '腌制', '摆盘', '调料'], answer: '腌制', explanationVi: '腌制 (yānzhì) = ướp', difficulty: DIFFICULTY.MEDIUM },
      { question: '"前菜" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Món chính', 'Món khai vị', 'Món tráng miệng', 'Đồ uống'], answer: 'Món khai vị', explanationVi: '前菜 (qiáncài) = món khai vị', difficulty: DIFFICULTY.MEDIUM },
      { question: '"Lên men" trong tiếng Trung là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['有机', '发酵', '饮食限制', '调料'], answer: '发酵', explanationVi: '发酵 (fājiào) = lên men', difficulty: DIFFICULTY.MEDIUM },
      { question: '"高汤" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Gia vị', 'Nước dùng', 'Nguyên liệu', 'Công thức'], answer: 'Nước dùng', explanationVi: '高汤 (gāotāng) = nước dùng', difficulty: DIFFICULTY.MEDIUM },
    ],
  },
];
