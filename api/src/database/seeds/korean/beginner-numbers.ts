import { LessonData } from '../utils';
import { TOPICS, DIFFICULTY, QUIZ_TYPES } from '../constants';

export const koreanNumbersLessons: LessonData[] = [
  {
    title: '숫자 (Sino-Korean)',
    titleVi: 'Số đếm Hán-Hàn',
    description: 'Learn Sino-Korean numbers used for dates, money, and phone numbers',
    descriptionVi: 'Học số đếm Hán-Hàn dùng cho ngày tháng, tiền và số điện thoại',
    topic: TOPICS.NUMBERS,
    vocabulary: [
      { word: '일', reading: 'il', meaning: 'Một (1)', example: '일월은 겨울입니다.', exampleMeaning: 'Tháng 1 là mùa đông.', difficulty: DIFFICULTY.VERY_EASY },
      { word: '이', reading: 'i', meaning: 'Hai (2)', example: '이천 원입니다.', exampleMeaning: 'Giá 2000 won.', difficulty: DIFFICULTY.VERY_EASY },
      { word: '삼', reading: 'sam', meaning: 'Ba (3)', example: '삼월에 봄이 옵니다.', exampleMeaning: 'Mùa xuân đến vào tháng 3.', difficulty: DIFFICULTY.VERY_EASY },
      { word: '사', reading: 'sa', meaning: 'Bốn (4)', example: '사분의 일이에요.', exampleMeaning: 'Là một phần tư.', difficulty: DIFFICULTY.VERY_EASY },
      { word: '오', reading: 'o', meaning: 'Năm (5)', example: '오분 기다려 주세요.', exampleMeaning: 'Xin đợi 5 phút.', difficulty: DIFFICULTY.VERY_EASY },
      { word: '십', reading: 'sip', meaning: 'Mười (10)', example: '십분 후에 만나요.', exampleMeaning: 'Gặp nhau sau 10 phút.', difficulty: DIFFICULTY.EASY },
      { word: '백', reading: 'baek', meaning: 'Một trăm (100)', example: '백 원짜리 동전이에요.', exampleMeaning: 'Đây là đồng xu 100 won.', difficulty: DIFFICULTY.EASY },
      { word: '천', reading: 'cheon', meaning: 'Một nghìn (1000)', example: '천 원이면 돼요.', exampleMeaning: '1000 won là đủ.', difficulty: DIFFICULTY.EASY },
      { word: '만', reading: 'man', meaning: 'Mười nghìn (10000)', example: '만 원 주세요.', exampleMeaning: 'Cho tôi 10000 won.', difficulty: DIFFICULTY.EASY },
      { word: '얼마', reading: 'eolma', meaning: 'Bao nhiêu', example: '이거 얼마예요?', exampleMeaning: 'Cái này bao nhiêu tiền?', difficulty: DIFFICULTY.EASY },
    ],
    quizzes: [
      { question: '"삼" là số mấy?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['2', '3', '4', '5'], answer: '3', explanationVi: '삼 (sam) = 3', difficulty: DIFFICULTY.VERY_EASY },
      { question: '"백" là số mấy?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['10', '100', '1000', '10000'], answer: '100', explanationVi: '백 (baek) = 100', difficulty: DIFFICULTY.EASY },
      { question: '"얼마" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Bao nhiêu', 'Mấy giờ', 'Bao xa', 'Mấy cái'], answer: 'Bao nhiêu', explanationVi: '얼마 (eolma) = bao nhiêu', difficulty: DIFFICULTY.EASY },
      { question: '"만" là số mấy?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['100', '1000', '10000', '100000'], answer: '10000', explanationVi: '만 (man) = 10000 (mười nghìn)', difficulty: DIFFICULTY.EASY },
      { question: 'Số 5 trong hệ Hán-Hàn là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['사', '오', '육', '칠'], answer: '오', explanationVi: '오 (o) = 5', difficulty: DIFFICULTY.VERY_EASY },
    ],
  },
  {
    title: '요일과 시간',
    titleVi: 'Ngày trong tuần và thời gian',
    description: 'Learn days of the week and time expressions in Korean',
    descriptionVi: 'Học các ngày trong tuần và cách nói thời gian trong tiếng Hàn',
    topic: TOPICS.TIME,
    vocabulary: [
      { word: '월요일', reading: 'woryoil', meaning: 'Thứ Hai', example: '월요일에 학교에 가요.', exampleMeaning: 'Thứ Hai đi học.', difficulty: DIFFICULTY.EASY },
      { word: '화요일', reading: 'hwayoil', meaning: 'Thứ Ba', example: '화요일에 한국어 수업이 있어요.', exampleMeaning: 'Thứ Ba có lớp tiếng Hàn.', difficulty: DIFFICULTY.EASY },
      { word: '수요일', reading: 'suyoil', meaning: 'Thứ Tư', example: '수요일은 쉬는 날이에요.', exampleMeaning: 'Thứ Tư là ngày nghỉ.', difficulty: DIFFICULTY.EASY },
      { word: '목요일', reading: 'mogyoil', meaning: 'Thứ Năm', example: '목요일에 시험이 있어요.', exampleMeaning: 'Thứ Năm có bài thi.', difficulty: DIFFICULTY.EASY },
      { word: '금요일', reading: 'geumyoil', meaning: 'Thứ Sáu', example: '금요일이 제일 좋아요.', exampleMeaning: 'Thứ Sáu là ngày tôi thích nhất.', difficulty: DIFFICULTY.EASY },
      { word: '토요일', reading: 'toyoil', meaning: 'Thứ Bảy', example: '토요일에 영화 볼까요?', exampleMeaning: 'Thứ Bảy xem phim nhé?', difficulty: DIFFICULTY.EASY },
      { word: '일요일', reading: 'iryoil', meaning: 'Chủ Nhật', example: '일요일에 쉬어요.', exampleMeaning: 'Chủ Nhật nghỉ ngơi.', difficulty: DIFFICULTY.EASY },
      { word: '오늘', reading: 'oneul', meaning: 'Hôm nay', example: '오늘 뭐 해요?', exampleMeaning: 'Hôm nay làm gì?', difficulty: DIFFICULTY.VERY_EASY },
      { word: '내일', reading: 'naeil', meaning: 'Ngày mai', example: '내일 만나요!', exampleMeaning: 'Ngày mai gặp nhé!', difficulty: DIFFICULTY.VERY_EASY },
      { word: '어제', reading: 'eoje', meaning: 'Hôm qua', example: '어제 비가 왔어요.', exampleMeaning: 'Hôm qua trời mưa.', difficulty: DIFFICULTY.VERY_EASY },
    ],
    quizzes: [
      { question: '"월요일" là thứ mấy?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Chủ Nhật'], answer: 'Thứ Hai', explanationVi: '월요일 (woryoil) = Thứ Hai', difficulty: DIFFICULTY.EASY },
      { question: '"금요일" là thứ mấy?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Thứ Năm', 'Thứ Sáu', 'Thứ Bảy', 'Chủ Nhật'], answer: 'Thứ Sáu', explanationVi: '금요일 (geumyoil) = Thứ Sáu', difficulty: DIFFICULTY.EASY },
      { question: '"오늘" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Hôm qua', 'Hôm nay', 'Ngày mai', 'Tuần sau'], answer: 'Hôm nay', explanationVi: '오늘 (oneul) = Hôm nay', difficulty: DIFFICULTY.VERY_EASY },
      { question: '"내일" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Hôm qua', 'Hôm nay', 'Ngày mai', 'Tuần trước'], answer: 'Ngày mai', explanationVi: '내일 (naeil) = Ngày mai', difficulty: DIFFICULTY.VERY_EASY },
      { question: 'Chủ Nhật trong tiếng Hàn là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['금요일', '토요일', '일요일', '목요일'], answer: '일요일', explanationVi: '일요일 (iryoil) = Chủ Nhật', difficulty: DIFFICULTY.EASY },
    ],
  },
];
