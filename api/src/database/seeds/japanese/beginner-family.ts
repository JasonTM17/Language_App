import { LessonData } from '../utils';
import { TOPICS, DIFFICULTY, QUIZ_TYPES } from '../constants';

export const japaneseFamilyLessons: LessonData[] = [
  {
    title: '家族 (Family)',
    titleVi: 'Gia đình',
    description: 'Learn family vocabulary in Japanese',
    descriptionVi: 'Học từ vựng gia đình tiếng Nhật',
    topic: TOPICS.FAMILY,
    vocabulary: [
      { word: '家族', reading: 'kazoku', meaning: 'gia đình', example: '私の家族は5人です。', exampleMeaning: 'Gia đình tôi có 5 người.', difficulty: DIFFICULTY.EASY },
      { word: '父', reading: 'chichi', meaning: 'bố (của mình)', example: '父は会社員です。', exampleMeaning: 'Bố tôi là nhân viên công ty.', difficulty: DIFFICULTY.EASY },
      { word: '母', reading: 'haha', meaning: 'mẹ (của mình)', example: '母は料理が上手です。', exampleMeaning: 'Mẹ tôi nấu ăn giỏi.', difficulty: DIFFICULTY.EASY },
      { word: '兄', reading: 'ani', meaning: 'anh trai (của mình)', example: '兄は大学生です。', exampleMeaning: 'Anh trai tôi là sinh viên đại học.', difficulty: DIFFICULTY.EASY },
      { word: '姉', reading: 'ane', meaning: 'chị gái (của mình)', example: '姉は東京に住んでいます。', exampleMeaning: 'Chị gái tôi sống ở Tokyo.', difficulty: DIFFICULTY.EASY },
      { word: '弟', reading: 'otouto', meaning: 'em trai', example: '弟は高校生です。', exampleMeaning: 'Em trai tôi là học sinh cấp 3.', difficulty: DIFFICULTY.EASY },
      { word: '妹', reading: 'imouto', meaning: 'em gái', example: '妹は10歳です。', exampleMeaning: 'Em gái tôi 10 tuổi.', difficulty: DIFFICULTY.EASY },
      { word: '祖父', reading: 'sofu', meaning: 'ông (của mình)', example: '祖父は80歳です。', exampleMeaning: 'Ông tôi 80 tuổi.', difficulty: DIFFICULTY.MEDIUM },
      { word: '祖母', reading: 'sobo', meaning: 'bà (của mình)', example: '祖母は元気です。', exampleMeaning: 'Bà tôi khỏe mạnh.', difficulty: DIFFICULTY.MEDIUM },
      { word: '息子', reading: 'musuko', meaning: 'con trai', example: '息子は3歳です。', exampleMeaning: 'Con trai tôi 3 tuổi.', difficulty: DIFFICULTY.MEDIUM },
      { word: '娘', reading: 'musume', meaning: 'con gái', example: '娘は学校に行きます。', exampleMeaning: 'Con gái tôi đi học.', difficulty: DIFFICULTY.MEDIUM },
      { word: '夫', reading: 'otto', meaning: 'chồng', example: '夫は医者です。', exampleMeaning: 'Chồng tôi là bác sĩ.', difficulty: DIFFICULTY.MEDIUM },
    ],
    quizzes: [
      { question: '"家族" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Bạn bè', 'Gia đình', 'Đồng nghiệp', 'Hàng xóm'], answer: 'Gia đình', explanationVi: '家族 (kazoku) = gia đình', difficulty: DIFFICULTY.EASY },
      { question: '"Mẹ" trong tiếng Nhật là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['父', '母', '姉', '妹'], answer: '母', explanationVi: '母 (haha) = mẹ (của mình)', difficulty: DIFFICULTY.EASY },
      { question: '"弟" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Anh trai', 'Em trai', 'Chị gái', 'Em gái'], answer: 'Em trai', explanationVi: '弟 (otouto) = em trai', difficulty: DIFFICULTY.EASY },
      { question: '"Ông" trong tiếng Nhật là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['祖父', '祖母', '父', '兄'], answer: '祖父', explanationVi: '祖父 (sofu) = ông (của mình)', difficulty: DIFFICULTY.MEDIUM },
      { question: '"息子" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Con gái', 'Con trai', 'Cháu trai', 'Em trai'], answer: 'Con trai', explanationVi: '息子 (musuko) = con trai', difficulty: DIFFICULTY.MEDIUM },
    ],
  },
];
