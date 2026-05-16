import { LessonData } from '../utils';
import { TOPICS, DIFFICULTY, QUIZ_TYPES } from '../constants';

export const chineseSportsLessons: LessonData[] = [
  {
    title: 'Sports & Fitness',
    titleVi: 'Thể thao & Sức khỏe',
    description: 'Learn sports and fitness vocabulary in Chinese',
    descriptionVi: 'Học từ vựng về thể thao và sức khỏe bằng tiếng Trung',
    topic: TOPICS.HOBBIES,
    vocabulary: [
      { word: '比赛 (bǐsài)', meaning: 'giải đấu/trận đấu', example: '比赛下周开始。', exampleMeaning: 'Giải đấu bắt đầu tuần sau.', difficulty: DIFFICULTY.EASY },
      { word: '冠军 (guànjūn)', meaning: 'vô địch', example: '他们赢得了冠军！', exampleMeaning: 'Họ đã giành chức vô địch!', difficulty: DIFFICULTY.MEDIUM },
      { word: '运动员 (yùndòngyuán)', meaning: 'vận động viên', example: '她是职业运动员。', exampleMeaning: 'Cô ấy là vận động viên chuyên nghiệp.', difficulty: DIFFICULTY.MEDIUM },
      { word: '耐力 (nàilì)', meaning: 'sức bền', example: '跑步锻炼耐力。', exampleMeaning: 'Chạy bộ rèn luyện sức bền.', difficulty: DIFFICULTY.MEDIUM },
      { word: '柔韧性 (róurènxìng)', meaning: 'sự linh hoạt', example: '瑜伽提高柔韧性。', exampleMeaning: 'Yoga cải thiện sự linh hoạt.', difficulty: DIFFICULTY.HARD },
      { word: '热身 (rèshēn)', meaning: 'khởi động', example: '运动前要热身。', exampleMeaning: 'Phải khởi động trước khi tập.', difficulty: DIFFICULTY.EASY },
      { word: '裁判 (cáipàn)', meaning: 'trọng tài', example: '裁判做出了判决。', exampleMeaning: 'Trọng tài đã đưa ra quyết định.', difficulty: DIFFICULTY.MEDIUM },
      { word: '对手 (duìshǒu)', meaning: 'đối thủ', example: '尊重你的对手。', exampleMeaning: 'Hãy tôn trọng đối thủ.', difficulty: DIFFICULTY.EASY },
      { word: '体力 (tǐlì)', meaning: 'thể lực', example: '他体力很好。', exampleMeaning: 'Anh ấy thể lực rất tốt.', difficulty: DIFFICULTY.EASY },
      { word: '技术 (jìshù)', meaning: 'kỹ thuật', example: '练习你的技术。', exampleMeaning: 'Hãy luyện tập kỹ thuật.', difficulty: DIFFICULTY.EASY },
      { word: '体育精神 (tǐyù jīngshén)', meaning: 'tinh thần thể thao', example: '展示体育精神。', exampleMeaning: 'Hãy thể hiện tinh thần thể thao.', difficulty: DIFFICULTY.MEDIUM },
      { word: '个人最好成绩 (gèrén zuìhǎo chéngjì)', meaning: 'kỷ lục cá nhân', example: '我创造了个人最好成绩。', exampleMeaning: 'Tôi lập kỷ lục cá nhân mới.', difficulty: DIFFICULTY.HARD },
    ],
    quizzes: [
      { question: '"比赛" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Tập luyện', 'Giải đấu/trận đấu', 'Đội bóng', 'Sân vận động'], answer: 'Giải đấu/trận đấu', explanationVi: '比赛 (bǐsài) = giải đấu/trận đấu', difficulty: DIFFICULTY.EASY },
      { question: '"Vận động viên" trong tiếng Trung là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['裁判', '运动员', '对手', '冠军'], answer: '运动员', explanationVi: '运动员 (yùndòngyuán) = vận động viên', difficulty: DIFFICULTY.MEDIUM },
      { question: '"耐力" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Tốc độ', 'Sức bền', 'Sức mạnh', 'Kỹ thuật'], answer: 'Sức bền', explanationVi: '耐力 (nàilì) = sức bền', difficulty: DIFFICULTY.MEDIUM },
      { question: '"Trọng tài" trong tiếng Trung là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['运动员', '裁判', '对手', '教练'], answer: '裁判', explanationVi: '裁判 (cáipàn) = trọng tài', difficulty: DIFFICULTY.MEDIUM },
      { question: '"热身" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Nghỉ ngơi', 'Khởi động', 'Thi đấu', 'Tập luyện'], answer: 'Khởi động', explanationVi: '热身 (rèshēn) = khởi động', difficulty: DIFFICULTY.EASY },
    ],
  },
];
