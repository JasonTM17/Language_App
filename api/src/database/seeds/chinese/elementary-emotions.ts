import { LessonData } from '../utils';
import { TOPICS, DIFFICULTY, QUIZ_TYPES } from '../constants';

export const chineseEmotionsLessons: LessonData[] = [
  {
    title: 'Emotions & Feelings',
    titleVi: 'Cảm xúc & Tâm trạng',
    description: 'Learn emotion vocabulary in Chinese',
    descriptionVi: 'Học từ vựng về cảm xúc bằng tiếng Trung',
    topic: TOPICS.EMOTIONS,
    vocabulary: [
      { word: '高兴 (gāoxìng)', meaning: 'vui mừng', example: '我很高兴见到你。', exampleMeaning: 'Tôi rất vui gặp bạn.', difficulty: DIFFICULTY.EASY },
      { word: '难过 (nánguò)', meaning: 'buồn', example: '他很难过。', exampleMeaning: 'Anh ấy rất buồn.', difficulty: DIFFICULTY.EASY },
      { word: '生气 (shēngqì)', meaning: 'tức giận', example: '妈妈生气了。', exampleMeaning: 'Mẹ tức giận rồi.', difficulty: DIFFICULTY.EASY },
      { word: '害怕 (hàipà)', meaning: 'sợ hãi', example: '我害怕蛇。', exampleMeaning: 'Tôi sợ rắn.', difficulty: DIFFICULTY.EASY },
      { word: '累 (lèi)', meaning: 'mệt mỏi', example: '今天很累。', exampleMeaning: 'Hôm nay rất mệt.', difficulty: DIFFICULTY.EASY },
      { word: '幸福 (xìngfú)', meaning: 'hạnh phúc', example: '我们很幸福。', exampleMeaning: 'Chúng tôi rất hạnh phúc.', difficulty: DIFFICULTY.EASY },
      { word: '孤独 (gūdú)', meaning: 'cô đơn', example: '一个人很孤独。', exampleMeaning: 'Một mình rất cô đơn.', difficulty: DIFFICULTY.MEDIUM },
      { word: '担心 (dānxīn)', meaning: 'lo lắng', example: '我担心考试。', exampleMeaning: 'Tôi lo lắng về kỳ thi.', difficulty: DIFFICULTY.MEDIUM },
      { word: '惊讶 (jīngyà)', meaning: 'ngạc nhiên', example: '我很惊讶。', exampleMeaning: 'Tôi rất ngạc nhiên.', difficulty: DIFFICULTY.MEDIUM },
      { word: '害羞 (hàixiū)', meaning: 'xấu hổ', example: '她很害羞。', exampleMeaning: 'Cô ấy rất xấu hổ.', difficulty: DIFFICULTY.MEDIUM },
      { word: '无聊 (wúliáo)', meaning: 'chán', example: '这个电影很无聊。', exampleMeaning: 'Bộ phim này chán.', difficulty: DIFFICULTY.EASY },
      { word: '激动 (jīdòng)', meaning: 'phấn khích', example: '我很激动。', exampleMeaning: 'Tôi rất phấn khích.', difficulty: DIFFICULTY.MEDIUM },
    ],
    quizzes: [
      { question: '"高兴" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Buồn', 'Vui mừng', 'Tức giận', 'Sợ hãi'], answer: 'Vui mừng', explanationVi: '高兴 (gāoxìng) = vui mừng', difficulty: DIFFICULTY.EASY },
      { question: '"Buồn" trong tiếng Trung là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['高兴', '难过', '生气', '害怕'], answer: '难过', explanationVi: '难过 (nánguò) = buồn', difficulty: DIFFICULTY.EASY },
      { question: '"累" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Vui vẻ', 'Buồn ngủ', 'Mệt mỏi', 'Đói'], answer: 'Mệt mỏi', explanationVi: '累 (lèi) = mệt mỏi', difficulty: DIFFICULTY.EASY },
      { question: '"Hạnh phúc" trong tiếng Trung là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['幸福', '高兴', '激动', '惊讶'], answer: '幸福', explanationVi: '幸福 (xìngfú) = hạnh phúc', difficulty: DIFFICULTY.EASY },
      { question: '"担心" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Vui vẻ', 'Lo lắng', 'Tức giận', 'Ngạc nhiên'], answer: 'Lo lắng', explanationVi: '担心 (dānxīn) = lo lắng', difficulty: DIFFICULTY.MEDIUM },
    ],
  },
];
