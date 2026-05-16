import { LessonData } from '../utils';
import { TOPICS, DIFFICULTY, QUIZ_TYPES } from '../constants';

export const chineseNatureLessons: LessonData[] = [
  {
    title: 'Nature & Geography',
    titleVi: 'Thiên nhiên & Địa lý',
    description: 'Learn nature and geography vocabulary in Chinese',
    descriptionVi: 'Học từ vựng về thiên nhiên và địa lý bằng tiếng Trung',
    topic: TOPICS.WEATHER,
    vocabulary: [
      { word: '火山 (huǒshān)', meaning: 'núi lửa', example: '火山爆发了。', exampleMeaning: 'Núi lửa đã phun trào.', difficulty: DIFFICULTY.MEDIUM },
      { word: '冰川 (bīngchuān)', meaning: 'sông băng', example: '冰川在融化。', exampleMeaning: 'Sông băng đang tan.', difficulty: DIFFICULTY.HARD },
      { word: '半岛 (bàndǎo)', meaning: 'bán đảo', example: '韩国是半岛。', exampleMeaning: 'Hàn Quốc là bán đảo.', difficulty: DIFFICULTY.EASY },
      { word: '群岛 (qúndǎo)', meaning: 'quần đảo', example: '日本是群岛。', exampleMeaning: 'Nhật Bản là quần đảo.', difficulty: DIFFICULTY.MEDIUM },
      { word: '瀑布 (pùbù)', meaning: 'thác nước', example: '瀑布很美。', exampleMeaning: 'Thác nước rất đẹp.', difficulty: DIFFICULTY.EASY },
      { word: '峡谷 (xiágǔ)', meaning: 'hẻm núi', example: '峡谷很壮观。', exampleMeaning: 'Hẻm núi rất hùng vĩ.', difficulty: DIFFICULTY.MEDIUM },
      { word: '珊瑚礁 (shānhújiāo)', meaning: 'rạn san hô', example: '保护珊瑚礁。', exampleMeaning: 'Bảo vệ rạn san hô.', difficulty: DIFFICULTY.HARD },
      { word: '干旱 (gānhàn)', meaning: 'hạn hán', example: '干旱持续了三个月。', exampleMeaning: 'Hạn hán kéo dài ba tháng.', difficulty: DIFFICULTY.MEDIUM },
      { word: '生态系统 (shēngtài xìtǒng)', meaning: 'hệ sinh thái', example: '保护生态系统。', exampleMeaning: 'Bảo vệ hệ sinh thái.', difficulty: DIFFICULTY.HARD },
      { word: '生物多样性 (shēngwù duōyàngxìng)', meaning: 'đa dạng sinh học', example: '生物多样性很重要。', exampleMeaning: 'Đa dạng sinh học rất quan trọng.', difficulty: DIFFICULTY.HARD },
      { word: '热带 (rèdài)', meaning: 'nhiệt đới', example: '越南是热带气候。', exampleMeaning: 'Việt Nam có khí hậu nhiệt đới.', difficulty: DIFFICULTY.MEDIUM },
      { word: '大陆 (dàlù)', meaning: 'lục địa', example: '有七个大陆。', exampleMeaning: 'Có bảy lục địa.', difficulty: DIFFICULTY.EASY },
    ],
    quizzes: [
      { question: '"火山" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Sông', 'Núi lửa', 'Hồ', 'Đồi'], answer: 'Núi lửa', explanationVi: '火山 (huǒshān) = núi lửa', difficulty: DIFFICULTY.MEDIUM },
      { question: '"Sông băng" trong tiếng Trung là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['瀑布', '冰川', '峡谷', '火山'], answer: '冰川', explanationVi: '冰川 (bīngchuān) = sông băng', difficulty: DIFFICULTY.HARD },
      { question: '"群岛" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Bán đảo', 'Quần đảo', 'Lục địa', 'Đại dương'], answer: 'Quần đảo', explanationVi: '群岛 (qúndǎo) = quần đảo', difficulty: DIFFICULTY.MEDIUM },
      { question: '"Hạn hán" trong tiếng Trung là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['洪水', '干旱', '台风', '地震'], answer: '干旱', explanationVi: '干旱 (gānhàn) = hạn hán', difficulty: DIFFICULTY.MEDIUM },
      { question: '"生态系统" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Khí hậu', 'Hệ sinh thái', 'Thời tiết', 'Môi trường'], answer: 'Hệ sinh thái', explanationVi: '生态系统 (shēngtài xìtǒng) = hệ sinh thái', difficulty: DIFFICULTY.HARD },
    ],
  },
];
