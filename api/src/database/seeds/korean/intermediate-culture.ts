import { LessonData } from '../utils';
import { TOPICS, DIFFICULTY, QUIZ_TYPES } from '../constants';

export const koreanCultureLessons: LessonData[] = [
  {
    title: 'Korean Culture',
    titleVi: 'Văn hóa Hàn Quốc',
    description: 'Learn culture-related vocabulary in Korean',
    descriptionVi: 'Học từ vựng về văn hóa Hàn Quốc',
    topic: TOPICS.CULTURE,
    vocabulary: [
      { word: '한복', meaning: 'hanbok (trang phục truyền thống)', example: '설날에 한복을 입어요.', exampleMeaning: 'Mặc hanbok vào ngày Tết.', difficulty: DIFFICULTY.EASY },
      { word: '김치', meaning: 'kimchi', example: '김치는 한국 음식이에요.', exampleMeaning: 'Kimchi là món ăn Hàn Quốc.', difficulty: DIFFICULTY.VERY_EASY },
      { word: '설날', meaning: 'Tết Nguyên Đán', example: '설날에 세배를 해요.', exampleMeaning: 'Vào Tết, chúng tôi lạy chúc.', difficulty: DIFFICULTY.EASY },
      { word: '추석', meaning: 'Tết Trung Thu', example: '추석에 송편을 먹어요.', exampleMeaning: 'Ăn songpyeon vào Trung Thu.', difficulty: DIFFICULTY.MEDIUM },
      { word: '태권도', meaning: 'taekwondo', example: '태권도를 배워요.', exampleMeaning: 'Tôi học taekwondo.', difficulty: DIFFICULTY.EASY },
      { word: '사물놀이', meaning: 'samulnori (nhạc truyền thống)', example: '사물놀이 공연을 봤어요.', exampleMeaning: 'Tôi đã xem biểu diễn samulnori.', difficulty: DIFFICULTY.HARD },
      { word: '한옥', meaning: 'nhà truyền thống Hàn', example: '한옥마을에 갔어요.', exampleMeaning: 'Tôi đã đến làng hanok.', difficulty: DIFFICULTY.MEDIUM },
      { word: '불고기', meaning: 'bulgogi (thịt nướng)', example: '불고기가 맛있어요.', exampleMeaning: 'Bulgogi ngon.', difficulty: DIFFICULTY.EASY },
      { word: '노래방', meaning: 'karaoke', example: '노래방에 가요.', exampleMeaning: 'Đi karaoke.', difficulty: DIFFICULTY.EASY },
      { word: '찜질방', meaning: 'jjimjilbang (spa Hàn)', example: '찜질방에서 쉬어요.', exampleMeaning: 'Nghỉ ngơi ở jjimjilbang.', difficulty: DIFFICULTY.MEDIUM },
      { word: '한글', meaning: 'bảng chữ cái Hàn', example: '한글은 쉬워요.', exampleMeaning: 'Hangul dễ học.', difficulty: DIFFICULTY.EASY },
      { word: '드라마', meaning: 'phim truyền hình', example: '한국 드라마를 좋아해요.', exampleMeaning: 'Tôi thích phim Hàn.', difficulty: DIFFICULTY.VERY_EASY },
    ],
    quizzes: [
      { question: '"한복" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Kimchi', 'Hanbok', 'Taekwondo', 'Karaoke'], answer: 'Hanbok', explanationVi: '한복 = hanbok (trang phục truyền thống Hàn)', difficulty: DIFFICULTY.EASY },
      { question: '"Tết Nguyên Đán" trong tiếng Hàn là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['추석', '설날', '한글날', '어린이날'], answer: '설날', explanationVi: '설날 = Tết Nguyên Đán', difficulty: DIFFICULTY.EASY },
      { question: '"노래방" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Nhà hàng', 'Karaoke', 'Rạp phim', 'Quán bar'], answer: 'Karaoke', explanationVi: '노래방 = karaoke', difficulty: DIFFICULTY.EASY },
      { question: '"Taekwondo" trong tiếng Hàn là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['유도', '태권도', '검도', '합기도'], answer: '태권도', explanationVi: '태권도 = taekwondo', difficulty: DIFFICULTY.EASY },
      { question: '"한옥" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Chung cư', 'Nhà truyền thống Hàn', 'Khách sạn', 'Biệt thự'], answer: 'Nhà truyền thống Hàn', explanationVi: '한옥 = nhà truyền thống Hàn Quốc', difficulty: DIFFICULTY.MEDIUM },
    ],
  },
];
