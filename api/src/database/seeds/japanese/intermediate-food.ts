import { LessonData } from '../utils';
import { TOPICS, DIFFICULTY, QUIZ_TYPES } from '../constants';

export const japaneseFoodIntermediateLessons: LessonData[] = [
  {
    title: 'Cooking & Cuisine',
    titleVi: 'Nấu ăn & Ẩm thực',
    description: 'Learn cooking and cuisine vocabulary in Japanese',
    descriptionVi: 'Học từ vựng về nấu ăn và ẩm thực bằng tiếng Nhật',
    topic: TOPICS.FOOD,
    vocabulary: [
      { word: '材料 (ざいりょう)', meaning: 'nguyên liệu', example: '材料は何が必要ですか？', exampleMeaning: 'Cần nguyên liệu gì?', difficulty: DIFFICULTY.MEDIUM },
      { word: 'レシピ', meaning: 'công thức nấu ăn', example: 'レシピ通りに作ります。', exampleMeaning: 'Làm theo công thức.', difficulty: DIFFICULTY.EASY },
      { word: '漬ける (つける)', meaning: 'ướp/ngâm', example: '鶏肉を一晩漬けます。', exampleMeaning: 'Ướp gà qua đêm.', difficulty: DIFFICULTY.MEDIUM },
      { word: '煮込む (にこむ)', meaning: 'ninh/hầm', example: 'スープを30分煮込みます。', exampleMeaning: 'Ninh súp 30 phút.', difficulty: DIFFICULTY.MEDIUM },
      { word: '調味料 (ちょうみりょう)', meaning: 'gia vị', example: '調味料を加えます。', exampleMeaning: 'Thêm gia vị.', difficulty: DIFFICULTY.MEDIUM },
      { word: '前菜 (ぜんさい)', meaning: 'món khai vị', example: '前菜を注文しました。', exampleMeaning: 'Đã gọi món khai vị.', difficulty: DIFFICULTY.MEDIUM },
      { word: '料理 (りょうり)', meaning: 'ẩm thực/nấu ăn', example: '日本料理が好きです。', exampleMeaning: 'Tôi thích ẩm thực Nhật.', difficulty: DIFFICULTY.EASY },
      { word: '盛り付け (もりつけ)', meaning: 'trang trí/bày biện', example: '盛り付けが美しいです。', exampleMeaning: 'Cách bày biện rất đẹp.', difficulty: DIFFICULTY.HARD },
      { word: '発酵 (はっこう)', meaning: 'lên men', example: '味噌は発酵食品です。', exampleMeaning: 'Miso là thực phẩm lên men.', difficulty: DIFFICULTY.HARD },
      { word: '有機 (ゆうき)', meaning: 'hữu cơ', example: '有機野菜を買います。', exampleMeaning: 'Tôi mua rau hữu cơ.', difficulty: DIFFICULTY.MEDIUM },
      { word: '食事制限 (しょくじせいげん)', meaning: 'hạn chế chế độ ăn', example: '食事制限はありますか？', exampleMeaning: 'Bạn có hạn chế chế độ ăn không?', difficulty: DIFFICULTY.HARD },
      { word: '出汁 (だし)', meaning: 'nước dùng', example: '出汁を取ります。', exampleMeaning: 'Nấu nước dùng.', difficulty: DIFFICULTY.MEDIUM },
    ],
    quizzes: [
      { question: '"材料" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Công thức', 'Nguyên liệu', 'Gia vị', 'Khẩu phần'], answer: 'Nguyên liệu', explanationVi: '材料 (ざいりょう) = nguyên liệu', difficulty: DIFFICULTY.MEDIUM },
      { question: '"Ướp" trong tiếng Nhật là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['煮込む', '漬ける', '盛り付け', '調味料'], answer: '漬ける', explanationVi: '漬ける (つける) = ướp/ngâm', difficulty: DIFFICULTY.MEDIUM },
      { question: '"前菜" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Món chính', 'Món khai vị', 'Món tráng miệng', 'Đồ uống'], answer: 'Món khai vị', explanationVi: '前菜 (ぜんさい) = món khai vị', difficulty: DIFFICULTY.MEDIUM },
      { question: '"Lên men" trong tiếng Nhật là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['有機', '発酵', '食事制限', '調味料'], answer: '発酵', explanationVi: '発酵 (はっこう) = lên men', difficulty: DIFFICULTY.HARD },
      { question: '"出汁" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Gia vị', 'Nước dùng', 'Nguyên liệu', 'Công thức'], answer: 'Nước dùng', explanationVi: '出汁 (だし) = nước dùng', difficulty: DIFFICULTY.MEDIUM },
    ],
  },
];
