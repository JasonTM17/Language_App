import { LessonData } from '../utils';
import { TOPICS, DIFFICULTY, QUIZ_TYPES } from '../constants';

export const englishSportsLessons: LessonData[] = [
  {
    title: 'Sports & Fitness',
    titleVi: 'Thể thao & Sức khỏe',
    description: 'Learn sports and fitness vocabulary in English',
    descriptionVi: 'Học từ vựng về thể thao và sức khỏe bằng tiếng Anh',
    topic: TOPICS.HOBBIES,
    vocabulary: [
      { word: 'tournament', meaning: 'giải đấu', example: 'The tournament starts next week.', exampleMeaning: 'Giải đấu bắt đầu tuần sau.', difficulty: DIFFICULTY.MEDIUM },
      { word: 'championship', meaning: 'chức vô địch', example: 'They won the championship.', exampleMeaning: 'Họ đã giành chức vô địch.', difficulty: DIFFICULTY.MEDIUM },
      { word: 'athlete', meaning: 'vận động viên', example: 'She is a professional athlete.', exampleMeaning: 'Cô ấy là vận động viên chuyên nghiệp.', difficulty: DIFFICULTY.MEDIUM },
      { word: 'endurance', meaning: 'sức bền', example: 'Running builds endurance.', exampleMeaning: 'Chạy bộ xây dựng sức bền.', difficulty: DIFFICULTY.HARD },
      { word: 'flexibility', meaning: 'sự linh hoạt', example: 'Yoga improves flexibility.', exampleMeaning: 'Yoga cải thiện sự linh hoạt.', difficulty: DIFFICULTY.MEDIUM },
      { word: 'warm-up', meaning: 'khởi động', example: 'Always warm up before exercise.', exampleMeaning: 'Luôn khởi động trước khi tập.', difficulty: DIFFICULTY.EASY },
      { word: 'referee', meaning: 'trọng tài', example: 'The referee made a decision.', exampleMeaning: 'Trọng tài đã đưa ra quyết định.', difficulty: DIFFICULTY.MEDIUM },
      { word: 'opponent', meaning: 'đối thủ', example: 'Respect your opponent.', exampleMeaning: 'Tôn trọng đối thủ.', difficulty: DIFFICULTY.MEDIUM },
      { word: 'stamina', meaning: 'thể lực', example: 'He has great stamina.', exampleMeaning: 'Anh ấy có thể lực tốt.', difficulty: DIFFICULTY.HARD },
      { word: 'technique', meaning: 'kỹ thuật', example: 'Practice your technique.', exampleMeaning: 'Luyện tập kỹ thuật.', difficulty: DIFFICULTY.MEDIUM },
      { word: 'sportsmanship', meaning: 'tinh thần thể thao', example: 'Show good sportsmanship.', exampleMeaning: 'Thể hiện tinh thần thể thao tốt.', difficulty: DIFFICULTY.HARD },
      { word: 'personal best', meaning: 'kỷ lục cá nhân', example: 'I set a new personal best.', exampleMeaning: 'Tôi lập kỷ lục cá nhân mới.', difficulty: DIFFICULTY.MEDIUM },
    ],
    quizzes: [
      { question: '"tournament" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Trận đấu', 'Giải đấu', 'Đội bóng', 'Sân vận động'], answer: 'Giải đấu', explanationVi: 'tournament = giải đấu', difficulty: DIFFICULTY.MEDIUM },
      { question: '"Vận động viên" trong tiếng Anh là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['referee', 'athlete', 'opponent', 'champion'], answer: 'athlete', explanationVi: 'athlete = vận động viên', difficulty: DIFFICULTY.MEDIUM },
      { question: '"endurance" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Tốc độ', 'Sức bền', 'Sức mạnh', 'Kỹ thuật'], answer: 'Sức bền', explanationVi: 'endurance = sức bền', difficulty: DIFFICULTY.HARD },
      { question: '"Trọng tài" trong tiếng Anh là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['athlete', 'referee', 'opponent', 'coach'], answer: 'referee', explanationVi: 'referee = trọng tài', difficulty: DIFFICULTY.MEDIUM },
      { question: '"warm-up" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Nghỉ ngơi', 'Khởi động', 'Thi đấu', 'Tập luyện'], answer: 'Khởi động', explanationVi: 'warm-up = khởi động', difficulty: DIFFICULTY.EASY },
    ],
  },
];
