import { LessonData } from '../utils';
import { TOPICS, DIFFICULTY, QUIZ_TYPES } from '../constants';

export const japaneseNumbersLessons: LessonData[] = [
  {
    title: '数字 1-100',
    titleVi: 'Số đếm 1-100',
    description: 'Learn Japanese numbers from 1 to 100',
    descriptionVi: 'Học số đếm từ 1 đến 100 trong tiếng Nhật',
    topic: TOPICS.NUMBERS,
    vocabulary: [
      { word: '一', reading: 'いち (ichi)', meaning: 'Một (1)', example: '一つください。', exampleMeaning: 'Cho tôi một cái.', difficulty: DIFFICULTY.VERY_EASY },
      { word: '二', reading: 'に (ni)', meaning: 'Hai (2)', example: '二人で行きます。', exampleMeaning: 'Hai người đi.', difficulty: DIFFICULTY.VERY_EASY },
      { word: '三', reading: 'さん (san)', meaning: 'Ba (3)', example: '三時に会いましょう。', exampleMeaning: 'Gặp nhau lúc 3 giờ nhé.', difficulty: DIFFICULTY.VERY_EASY },
      { word: '四', reading: 'し/よん (shi/yon)', meaning: 'Bốn (4)', example: '四月は桜の季節です。', exampleMeaning: 'Tháng 4 là mùa hoa anh đào.', difficulty: DIFFICULTY.EASY },
      { word: '五', reading: 'ご (go)', meaning: 'Năm (5)', example: '五分待ってください。', exampleMeaning: 'Xin đợi 5 phút.', difficulty: DIFFICULTY.VERY_EASY },
      { word: '十', reading: 'じゅう (juu)', meaning: 'Mười (10)', example: '十個あります。', exampleMeaning: 'Có 10 cái.', difficulty: DIFFICULTY.VERY_EASY },
      { word: '百', reading: 'ひゃく (hyaku)', meaning: 'Một trăm (100)', example: '百円です。', exampleMeaning: 'Giá 100 yên.', difficulty: DIFFICULTY.EASY },
      { word: '千', reading: 'せん (sen)', meaning: 'Một nghìn (1000)', example: '千円札をください。', exampleMeaning: 'Cho tôi tờ 1000 yên.', difficulty: DIFFICULTY.EASY },
      { word: 'いくら', reading: 'ikura', meaning: 'Bao nhiêu tiền', example: 'これはいくらですか？', exampleMeaning: 'Cái này bao nhiêu tiền?', difficulty: DIFFICULTY.EASY },
      { word: '番号', reading: 'ばんごう (bangou)', meaning: 'Số / Số hiệu', example: '電話番号は何ですか？', exampleMeaning: 'Số điện thoại là gì?', difficulty: DIFFICULTY.EASY },
    ],
    quizzes: [
      { question: '"三" đọc là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['いち', 'に', 'さん', 'し'], answer: 'さん', explanationVi: '三 = さん (san) = 3', difficulty: DIFFICULTY.VERY_EASY },
      { question: '"百" là số mấy?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['10', '100', '1000', '10000'], answer: '100', explanationVi: '百 (ひゃく/hyaku) = 100', difficulty: DIFFICULTY.EASY },
      { question: '"いくら" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Bao nhiêu tiền', 'Mấy giờ', 'Bao xa', 'Mấy cái'], answer: 'Bao nhiêu tiền', explanationVi: 'いくら (ikura) = bao nhiêu tiền', difficulty: DIFFICULTY.EASY },
      { question: 'Số 5 trong tiếng Nhật là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['し', 'ご', 'ろく', 'なな'], answer: 'ご', explanationVi: '五 = ご (go) = 5', difficulty: DIFFICULTY.VERY_EASY },
      { question: '"千" là số mấy?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['100', '500', '1000', '10000'], answer: '1000', explanationVi: '千 (せん/sen) = 1000', difficulty: DIFFICULTY.EASY },
    ],
  },
  {
    title: '時間と曜日',
    titleVi: 'Thời gian và ngày trong tuần',
    description: 'Learn to tell time and days of the week in Japanese',
    descriptionVi: 'Học cách nói giờ và ngày trong tuần bằng tiếng Nhật',
    topic: TOPICS.TIME,
    vocabulary: [
      { word: '月曜日', reading: 'げつようび (getsuyoubi)', meaning: 'Thứ Hai', example: '月曜日は忙しいです。', exampleMeaning: 'Thứ Hai bận lắm.', difficulty: DIFFICULTY.EASY },
      { word: '火曜日', reading: 'かようび (kayoubi)', meaning: 'Thứ Ba', example: '火曜日に会議があります。', exampleMeaning: 'Thứ Ba có cuộc họp.', difficulty: DIFFICULTY.EASY },
      { word: '水曜日', reading: 'すいようび (suiyoubi)', meaning: 'Thứ Tư', example: '水曜日は休みです。', exampleMeaning: 'Thứ Tư được nghỉ.', difficulty: DIFFICULTY.EASY },
      { word: '木曜日', reading: 'もくようび (mokuyoubi)', meaning: 'Thứ Năm', example: '木曜日にテストがあります。', exampleMeaning: 'Thứ Năm có bài kiểm tra.', difficulty: DIFFICULTY.EASY },
      { word: '金曜日', reading: 'きんようび (kinyoubi)', meaning: 'Thứ Sáu', example: '金曜日は楽しみです。', exampleMeaning: 'Thứ Sáu thật vui.', difficulty: DIFFICULTY.EASY },
      { word: '土曜日', reading: 'どようび (doyoubi)', meaning: 'Thứ Bảy', example: '土曜日に映画を見ます。', exampleMeaning: 'Thứ Bảy xem phim.', difficulty: DIFFICULTY.EASY },
      { word: '日曜日', reading: 'にちようび (nichiyoubi)', meaning: 'Chủ Nhật', example: '日曜日は家にいます。', exampleMeaning: 'Chủ Nhật ở nhà.', difficulty: DIFFICULTY.EASY },
      { word: '今日', reading: 'きょう (kyou)', meaning: 'Hôm nay', example: '今日は何曜日ですか？', exampleMeaning: 'Hôm nay là thứ mấy?', difficulty: DIFFICULTY.VERY_EASY },
      { word: '明日', reading: 'あした (ashita)', meaning: 'Ngày mai', example: '明日は日曜日です。', exampleMeaning: 'Ngày mai là Chủ Nhật.', difficulty: DIFFICULTY.VERY_EASY },
      { word: '昨日', reading: 'きのう (kinou)', meaning: 'Hôm qua', example: '昨日は雨でした。', exampleMeaning: 'Hôm qua trời mưa.', difficulty: DIFFICULTY.VERY_EASY },
    ],
    quizzes: [
      { question: '"月曜日" là thứ mấy?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Chủ Nhật'], answer: 'Thứ Hai', explanationVi: '月曜日 (げつようび) = Thứ Hai', difficulty: DIFFICULTY.EASY },
      { question: '"金曜日" là thứ mấy?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Thứ Năm', 'Thứ Sáu', 'Thứ Bảy', 'Chủ Nhật'], answer: 'Thứ Sáu', explanationVi: '金曜日 (きんようび) = Thứ Sáu', difficulty: DIFFICULTY.EASY },
      { question: '"今日" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Hôm qua', 'Hôm nay', 'Ngày mai', 'Tuần sau'], answer: 'Hôm nay', explanationVi: '今日 (きょう) = Hôm nay', difficulty: DIFFICULTY.VERY_EASY },
      { question: '"明日" có nghĩa là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['Hôm qua', 'Hôm nay', 'Ngày mai', 'Tuần trước'], answer: 'Ngày mai', explanationVi: '明日 (あした) = Ngày mai', difficulty: DIFFICULTY.VERY_EASY },
      { question: 'Thứ Bảy trong tiếng Nhật là gì?', type: QUIZ_TYPES.MULTIPLE_CHOICE, options: ['金曜日', '土曜日', '日曜日', '木曜日'], answer: '土曜日', explanationVi: '土曜日 (どようび) = Thứ Bảy', difficulty: DIFFICULTY.EASY },
    ],
  },
];
