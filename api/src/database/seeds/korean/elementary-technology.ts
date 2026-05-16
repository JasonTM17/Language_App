import { LessonData } from '../utils';
import { TOPICS, DIFFICULTY, QUIZ_TYPES } from '../constants';

export const koreanTechnologyLessons: LessonData[] = [
  {
    title: 'Technology & Internet',
    titleVi: 'Công nghệ & Internet',
    description: 'Learn technology vocabulary in Korean',
    descriptionVi: 'Học từ vựng về công nghệ bằng tiếng Hàn',
    topic: TOPICS.TECHNOLOGY,
    vocabulary: [
      { word: '컴퓨터', meaning: 'máy tính', example: '컴퓨터를 사용해요.', exampleMeaning: 'Tôi sử dụng máy tính.', difficulty: DIFFICULTY.EASY },
      { word: '핸드폰', meaning: 'điện thoại di động', example: '핸드폰이 있어요.', exampleMeaning: 'Tôi có điện thoại di động.', difficulty: DIFFICULTY.EASY },
      { word: '인터넷', meaning: 'internet', example: '인터넷으로 검색해요.', exampleMeaning: 'Tôi tìm kiếm trên internet.', difficulty: DIFFICULTY.VERY_EASY },
      { word: '이메일', meaning: 'email', example: '이메일을 보내요.', exampleMeaning: 'Tôi gửi email.', difficulty: DIFFICULTY.VERY_EASY },
      { word: '앱', meaning: 'ứng dụng', example: '앱을 다운로드해요.', exampleMeaning: 'Tôi tải ứng dụng.', difficulty: DIFFICULTY.EASY },
      { word: '사진', meaning: 'ảnh', example: '사진을 찍어요.', exampleMeaning: 'Tôi chụp ảnh.', difficulty: DIFFICULTY.EASY },
      { word: '동영상', meaning: 'video', example: '동영상을 봐요.', exampleMeaning: 'Tôi xem video.', difficulty: DIFFICULTY.EASY },
      { word: '웹사이트', meaning: 'website', example: '웹사이트를 만들어요.', exampleMeaning: 'Tôi tạo website.', difficulty: DIFFICULTY.EASY },
      { word: '비밀번호', meaning: 'mật khẩu', example: '비밀번호를 입력해요.', exampleMeaning: 'Tôi nhập mật khẩu.', difficulty: DIFFICULTY.EASY },
      { word: '검색', meaning: 'tìm kiếm', example: '인터넷에서 검색해요.', exampleMeaning: 'Tôi tìm kiếm trên mạng.', difficulty: DIFFICULTY.EASY },
      { word: '다운로드', meaning: 'tải xuống', example: '파일을 다운로드해요.', exampleMeaning: 'Tôi tải file xuống.', difficulty: DIFFICULTY.EASY },
      { word: 'SNS', meaning: 'mạng xã hội', example: 'SNS를 해요.', exampleMeaning: 'Tôi dùng mạng xã hội.', difficulty: DIFFICULTY.EASY },
    ],
    quizzes: [
      { question: '"컴퓨터" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Điện thoại', 'Máy tính', 'Tivi', 'Máy ảnh'], answer: 'Máy tính', explanationVi: '컴퓨터 = máy tính (computer)', difficulty: DIFFICULTY.EASY },
      { question: '"Email" trong tiếng Hàn là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['앱', '이메일', '웹', '파일'], answer: '이메일', explanationVi: '이메일 = email', difficulty: DIFFICULTY.EASY },
      { question: '"검색" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Tải xuống', 'Gửi đi', 'Tìm kiếm', 'Xóa'], answer: 'Tìm kiếm', explanationVi: '검색 = tìm kiếm', difficulty: DIFFICULTY.EASY },
      { question: '"Ứng dụng" trong tiếng Hàn là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['게임', '앱', '사이트', '메일'], answer: '앱', explanationVi: '앱 = ứng dụng (app)', difficulty: DIFFICULTY.EASY },
      { question: '"비밀번호" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Tên đăng nhập', 'Mật khẩu', 'Địa chỉ', 'Số điện thoại'], answer: 'Mật khẩu', explanationVi: '비밀번호 = mật khẩu', difficulty: DIFFICULTY.EASY },
    ],
  },
];
