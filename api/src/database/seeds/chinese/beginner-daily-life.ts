import { LessonData } from '../utils';
import { TOPICS, DIFFICULTY, QUIZ_TYPES } from '../constants';

export const chineseDailyLifeLessons: LessonData[] = [
  {
    title: 'Daily Life',
    titleVi: 'Cuộc sống hàng ngày',
    description: 'Learn daily life vocabulary in Chinese',
    descriptionVi: 'Học từ vựng về cuộc sống hàng ngày bằng tiếng Trung',
    topic: TOPICS.DAILY_LIFE,
    vocabulary: [
      { word: '早饭 (zǎofàn)', meaning: 'bữa sáng', example: '我吃早饭。', exampleMeaning: 'Tôi ăn sáng.', difficulty: DIFFICULTY.EASY },
      { word: '午饭 (wǔfàn)', meaning: 'bữa trưa', example: '午饭吃什么？', exampleMeaning: 'Bữa trưa ăn gì?', difficulty: DIFFICULTY.EASY },
      { word: '晚饭 (wǎnfàn)', meaning: 'bữa tối', example: '我做晚饭。', exampleMeaning: 'Tôi nấu bữa tối.', difficulty: DIFFICULTY.EASY },
      { word: '起床 (qǐchuáng)', meaning: 'thức dậy', example: '我每天六点起床。', exampleMeaning: 'Mỗi ngày tôi dậy lúc 6 giờ.', difficulty: DIFFICULTY.EASY },
      { word: '睡觉 (shuìjiào)', meaning: 'ngủ', example: '我十一点睡觉。', exampleMeaning: 'Tôi ngủ lúc 11 giờ.', difficulty: DIFFICULTY.EASY },
      { word: '洗澡 (xǐzǎo)', meaning: 'tắm', example: '我洗澡。', exampleMeaning: 'Tôi tắm.', difficulty: DIFFICULTY.EASY },
      { word: '刷牙 (shuāyá)', meaning: 'đánh răng', example: '我每天刷牙。', exampleMeaning: 'Mỗi ngày tôi đánh răng.', difficulty: DIFFICULTY.EASY },
      { word: '换衣服 (huàn yīfu)', meaning: 'thay đồ', example: '我换衣服。', exampleMeaning: 'Tôi thay đồ.', difficulty: DIFFICULTY.EASY },
      { word: '打扫 (dǎsǎo)', meaning: 'dọn dẹp', example: '我打扫房间。', exampleMeaning: 'Tôi dọn phòng.', difficulty: DIFFICULTY.EASY },
      { word: '洗衣服 (xǐ yīfu)', meaning: 'giặt đồ', example: '我洗衣服。', exampleMeaning: 'Tôi giặt đồ.', difficulty: DIFFICULTY.EASY },
      { word: '买东西 (mǎi dōngxi)', meaning: 'mua sắm', example: '我去买东西。', exampleMeaning: 'Tôi đi mua sắm.', difficulty: DIFFICULTY.EASY },
      { word: '休息 (xiūxi)', meaning: 'nghỉ ngơi', example: '星期天我休息。', exampleMeaning: 'Chủ nhật tôi nghỉ ngơi.', difficulty: DIFFICULTY.EASY },
    ],
    quizzes: [
      { question: '"早饭" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Bữa trưa', 'Bữa sáng', 'Bữa tối', 'Ăn vặt'], answer: 'Bữa sáng', explanationVi: '早饭 (zǎofàn) = bữa sáng', difficulty: DIFFICULTY.EASY },
      { question: '"Ngủ" trong tiếng Trung là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['起床', '睡觉', '休息', '吃饭'], answer: '睡觉', explanationVi: '睡觉 (shuìjiào) = ngủ', difficulty: DIFFICULTY.EASY },
      { question: '"打扫" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Giặt đồ', 'Dọn dẹp', 'Nấu ăn', 'Mua sắm'], answer: 'Dọn dẹp', explanationVi: '打扫 (dǎsǎo) = dọn dẹp', difficulty: DIFFICULTY.EASY },
      { question: '"Mua sắm" trong tiếng Trung là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['洗衣服', '打扫', '买东西', '做饭'], answer: '买东西', explanationVi: '买东西 (mǎi dōngxi) = mua sắm', difficulty: DIFFICULTY.EASY },
      { question: '"起床" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Ngủ', 'Thức dậy', 'Nghỉ ngơi', 'Ăn'], answer: 'Thức dậy', explanationVi: '起床 (qǐchuáng) = thức dậy', difficulty: DIFFICULTY.EASY },
    ],
  },
];
