import { LessonData } from '../utils';
import { TOPICS, DIFFICULTY, QUIZ_TYPES } from '../constants';

export const koreanMediaLessons: LessonData[] = [
  {
    title: 'Media & Entertainment',
    titleVi: 'Truyền thông & Giải trí',
    description: 'Learn media and entertainment vocabulary in Korean',
    descriptionVi: 'Học từ vựng về truyền thông và giải trí bằng tiếng Hàn',
    topic: TOPICS.CULTURE,
    vocabulary: [
      { word: '방송', meaning: 'phát sóng', example: '프로그램이 방송됩니다.', exampleMeaning: 'Chương trình sẽ được phát sóng.', difficulty: DIFFICULTY.MEDIUM },
      { word: '다큐멘터리', meaning: 'phim tài liệu', example: '다큐멘터리를 봤어요.', exampleMeaning: 'Tôi đã xem phim tài liệu.', difficulty: DIFFICULTY.MEDIUM },
      { word: '사설', meaning: 'bài xã luận', example: '사설을 읽었어요.', exampleMeaning: 'Tôi đã đọc bài xã luận.', difficulty: DIFFICULTY.HARD },
      { word: '언론', meaning: 'báo chí/truyền thông', example: '언론의 자유가 중요합니다.', exampleMeaning: 'Tự do báo chí rất quan trọng.', difficulty: DIFFICULTY.MEDIUM },
      { word: '각본', meaning: 'kịch bản', example: '각본을 쓰고 있어요.', exampleMeaning: 'Tôi đang viết kịch bản.', difficulty: DIFFICULTY.HARD },
      { word: '자막', meaning: 'phụ đề', example: '자막을 켜주세요.', exampleMeaning: 'Hãy bật phụ đề.', difficulty: DIFFICULTY.MEDIUM },
      { word: '관객', meaning: 'khán giả', example: '관객이 박수를 쳤어요.', exampleMeaning: 'Khán giả vỗ tay.', difficulty: DIFFICULTY.MEDIUM },
      { word: '스트리밍', meaning: 'phát trực tuyến', example: '스트리밍으로 영화를 봐요.', exampleMeaning: 'Tôi xem phim qua streaming.', difficulty: DIFFICULTY.EASY },
      { word: '프로그램', meaning: 'chương trình', example: '좋아하는 프로그램이 뭐예요?', exampleMeaning: 'Chương trình yêu thích của bạn là gì?', difficulty: DIFFICULTY.EASY },
      { word: '검열', meaning: 'kiểm duyệt', example: '검열은 논란이 있어요.', exampleMeaning: 'Kiểm duyệt gây tranh cãi.', difficulty: DIFFICULTY.HARD },
      { word: '헤드라인', meaning: 'tiêu đề/tít báo', example: '헤드라인이 눈에 띄었어요.', exampleMeaning: 'Tiêu đề thu hút sự chú ý.', difficulty: DIFFICULTY.MEDIUM },
      { word: '장르', meaning: 'thể loại', example: '어떤 장르를 좋아해요?', exampleMeaning: 'Bạn thích thể loại nào?', difficulty: DIFFICULTY.EASY },
    ],
    quizzes: [
      { question: '"방송" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Ghi hình', 'Phát sóng', 'Biên tập', 'Đạo diễn'], answer: 'Phát sóng', explanationVi: '방송 = phát sóng', difficulty: DIFFICULTY.MEDIUM },
      { question: '"Phim tài liệu" trong tiếng Hàn là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['각본', '다큐멘터리', '사설', '방송'], answer: '다큐멘터리', explanationVi: '다큐멘터리 = phim tài liệu', difficulty: DIFFICULTY.MEDIUM },
      { question: '"자막" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Tiêu đề', 'Phụ đề', 'Kịch bản', 'Thể loại'], answer: 'Phụ đề', explanationVi: '자막 = phụ đề', difficulty: DIFFICULTY.MEDIUM },
      { question: '"Kiểm duyệt" trong tiếng Hàn là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['언론', '검열', '사설', '헤드라인'], answer: '검열', explanationVi: '검열 = kiểm duyệt', difficulty: DIFFICULTY.HARD },
      { question: '"장르" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Khán giả', 'Thể loại', 'Phát sóng', 'Chương trình'], answer: 'Thể loại', explanationVi: '장르 = thể loại', difficulty: DIFFICULTY.EASY },
    ],
  },
];
