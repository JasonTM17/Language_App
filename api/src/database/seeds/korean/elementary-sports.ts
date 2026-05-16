import { LessonData } from '../utils';
import { TOPICS, DIFFICULTY, QUIZ_TYPES } from '../constants';

export const koreanSportsLessons: LessonData[] = [
  {
    title: 'Sports & Fitness',
    titleVi: 'Thể thao & Sức khỏe',
    description: 'Learn sports and fitness vocabulary in Korean',
    descriptionVi: 'Học từ vựng về thể thao và sức khỏe bằng tiếng Hàn',
    topic: TOPICS.HOBBIES,
    vocabulary: [
      { word: '대회', meaning: 'giải đấu', example: '대회가 다음 주에 시작해요.', exampleMeaning: 'Giải đấu bắt đầu tuần sau.', difficulty: DIFFICULTY.MEDIUM },
      { word: '우승', meaning: 'vô địch', example: '우승했어요!', exampleMeaning: 'Đã vô địch!', difficulty: DIFFICULTY.MEDIUM },
      { word: '선수', meaning: 'vận động viên', example: '그녀는 프로 선수예요.', exampleMeaning: 'Cô ấy là vận động viên chuyên nghiệp.', difficulty: DIFFICULTY.EASY },
      { word: '지구력', meaning: 'sức bền', example: '달리기로 지구력을 키워요.', exampleMeaning: 'Chạy bộ xây dựng sức bền.', difficulty: DIFFICULTY.HARD },
      { word: '유연성', meaning: 'sự linh hoạt', example: '요가로 유연성이 좋아져요.', exampleMeaning: 'Yoga cải thiện sự linh hoạt.', difficulty: DIFFICULTY.MEDIUM },
      { word: '준비운동', meaning: 'khởi động', example: '준비운동을 합시다.', exampleMeaning: 'Hãy khởi động.', difficulty: DIFFICULTY.EASY },
      { word: '심판', meaning: 'trọng tài', example: '심판이 결정했어요.', exampleMeaning: 'Trọng tài đã quyết định.', difficulty: DIFFICULTY.MEDIUM },
      { word: '상대', meaning: 'đối thủ', example: '상대를 존중하세요.', exampleMeaning: 'Hãy tôn trọng đối thủ.', difficulty: DIFFICULTY.EASY },
      { word: '체력', meaning: 'thể lực', example: '체력이 좋아요.', exampleMeaning: 'Thể lực tốt.', difficulty: DIFFICULTY.EASY },
      { word: '기술', meaning: 'kỹ thuật', example: '기술을 연습하세요.', exampleMeaning: 'Hãy luyện tập kỹ thuật.', difficulty: DIFFICULTY.EASY },
      { word: '스포츠맨십', meaning: 'tinh thần thể thao', example: '스포츠맨십을 보여주세요.', exampleMeaning: 'Hãy thể hiện tinh thần thể thao.', difficulty: DIFFICULTY.MEDIUM },
      { word: '개인 기록', meaning: 'kỷ lục cá nhân', example: '개인 기록을 세웠어요.', exampleMeaning: 'Tôi lập kỷ lục cá nhân mới.', difficulty: DIFFICULTY.MEDIUM },
    ],
    quizzes: [
      { question: '"대회" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Trận đấu', 'Giải đấu', 'Đội bóng', 'Sân vận động'], answer: 'Giải đấu', explanationVi: '대회 = giải đấu', difficulty: DIFFICULTY.MEDIUM },
      { question: '"Vận động viên" trong tiếng Hàn là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['심판', '선수', '상대', '우승'], answer: '선수', explanationVi: '선수 = vận động viên', difficulty: DIFFICULTY.EASY },
      { question: '"지구력" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Tốc độ', 'Sức bền', 'Sức mạnh', 'Kỹ thuật'], answer: 'Sức bền', explanationVi: '지구력 = sức bền', difficulty: DIFFICULTY.HARD },
      { question: '"Trọng tài" trong tiếng Hàn là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['선수', '심판', '상대', '감독'], answer: '심판', explanationVi: '심판 = trọng tài', difficulty: DIFFICULTY.MEDIUM },
      { question: '"준비운동" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Nghỉ ngơi', 'Khởi động', 'Thi đấu', 'Tập luyện'], answer: 'Khởi động', explanationVi: '준비운동 = khởi động', difficulty: DIFFICULTY.EASY },
    ],
  },
];
