import { LessonData } from '../utils';
import { TOPICS, DIFFICULTY, QUIZ_TYPES } from '../constants';

export const koreanEmotionsIntermediateLessons: LessonData[] = [
  {
    title: 'Complex Emotions',
    titleVi: 'Cảm xúc phức tạp',
    description: 'Learn complex emotional vocabulary in Korean',
    descriptionVi: 'Học từ vựng về cảm xúc phức tạp bằng tiếng Hàn',
    topic: TOPICS.EMOTIONS,
    vocabulary: [
      { word: '압도당하다', meaning: 'choáng ngợp', example: '일에 압도당하고 있어요.', exampleMeaning: 'Tôi bị choáng ngợp bởi công việc.', difficulty: DIFFICULTY.HARD },
      { word: '그리움', meaning: 'nỗi nhớ/hoài niệm', example: '고향에 대한 그리움이 있어요.', exampleMeaning: 'Tôi có nỗi nhớ quê hương.', difficulty: DIFFICULTY.MEDIUM },
      { word: '불안', meaning: 'lo lắng/bất an', example: '시험이 불안해요.', exampleMeaning: 'Tôi lo lắng về kỳ thi.', difficulty: DIFFICULTY.MEDIUM },
      { word: '감사', meaning: 'biết ơn', example: '도움에 감사합니다.', exampleMeaning: 'Cảm ơn sự giúp đỡ.', difficulty: DIFFICULTY.MEDIUM },
      { word: '답답하다', meaning: 'bực bội/ngột ngạt', example: '상황이 답답해요.', exampleMeaning: 'Tình huống thật bực bội.', difficulty: DIFFICULTY.MEDIUM },
      { word: '공감', meaning: 'sự đồng cảm', example: '공감을 보여주세요.', exampleMeaning: 'Hãy thể hiện sự đồng cảm.', difficulty: DIFFICULTY.MEDIUM },
      { word: '원망', meaning: 'sự oán giận', example: '원망을 내려놓으세요.', exampleMeaning: 'Hãy buông bỏ sự oán giận.', difficulty: DIFFICULTY.HARD },
      { word: '만족감', meaning: 'sự mãn nguyện', example: '만족감을 느꼈어요.', exampleMeaning: 'Tôi cảm thấy mãn nguyện.', difficulty: DIFFICULTY.MEDIUM },
      { word: '우울', meaning: 'u sầu/trầm uất', example: '우울한 기분이에요.', exampleMeaning: 'Tôi cảm thấy u sầu.', difficulty: DIFFICULTY.MEDIUM },
      { word: '배려', meaning: 'sự quan tâm/lòng trắc ẩn', example: '배려심이 깊은 사람이에요.', exampleMeaning: 'Đó là người có lòng trắc ẩn sâu sắc.', difficulty: DIFFICULTY.MEDIUM },
      { word: '취약하다', meaning: 'dễ bị tổn thương', example: '취약한 모습을 보여도 괜찮아요.', exampleMeaning: 'Thể hiện sự tổn thương cũng không sao.', difficulty: DIFFICULTY.HARD },
      { word: '회복력', meaning: 'sự kiên cường', example: '그녀는 회복력이 강해요.', exampleMeaning: 'Cô ấy rất kiên cường.', difficulty: DIFFICULTY.HARD },
    ],
    quizzes: [
      { question: '"그리움" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Vui vẻ', 'Nỗi nhớ/hoài niệm', 'Buồn bã', 'Tức giận'], answer: 'Nỗi nhớ/hoài niệm', explanationVi: '그리움 = nỗi nhớ/hoài niệm', difficulty: DIFFICULTY.MEDIUM },
      { question: '"Lo lắng" trong tiếng Hàn là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['감사', '불안', '공감', '원망'], answer: '불안', explanationVi: '불안 = lo lắng/bất an', difficulty: DIFFICULTY.MEDIUM },
      { question: '"공감" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Sự oán giận', 'Sự đồng cảm', 'Sự mãn nguyện', 'Sự lo lắng'], answer: 'Sự đồng cảm', explanationVi: '공감 = sự đồng cảm', difficulty: DIFFICULTY.MEDIUM },
      { question: '"U sầu" trong tiếng Hàn là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['불안', '우울', '감사', '답답'], answer: '우울', explanationVi: '우울 = u sầu/trầm uất', difficulty: DIFFICULTY.MEDIUM },
      { question: '"배려" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Sự tức giận', 'Sự quan tâm/lòng trắc ẩn', 'Sự ghen tị', 'Sự sợ hãi'], answer: 'Sự quan tâm/lòng trắc ẩn', explanationVi: '배려 = sự quan tâm/lòng trắc ẩn', difficulty: DIFFICULTY.MEDIUM },
    ],
  },
];
