'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

interface StoryChoice {
  text: string;
  correct: boolean;
  feedback: string;
}

interface StorySegment {
  text: string;
  translation: string;
  question?: string;
  choices?: StoryChoice[];
}

interface Story {
  id: string;
  title: string;
  titleVi: string;
  level: string;
  language: string;
  segments: StorySegment[];
}

const stories: Record<string, Story[]> = {
  en: [
    {
      id: '1', title: 'A Day at the Market', titleVi: 'Một ngày ở chợ', level: 'Beginner', language: 'en',
      segments: [
        { text: 'Sarah goes to the market every Saturday morning.', translation: 'Sarah đi chợ mỗi sáng thứ Bảy.' },
        { text: 'She needs to buy vegetables and fruit for the week.', translation: 'Cô ấy cần mua rau và trái cây cho tuần.' },
        {
          text: '"Good morning! How much are the tomatoes?" she asks.',
          translation: '"Chào buổi sáng! Cà chua bao nhiêu tiền?" cô ấy hỏi.',
          question: 'Sarah muốn mua gì?',
          choices: [
            { text: 'Tomatoes', correct: true, feedback: 'Đúng! Sarah hỏi giá cà chua.' },
            { text: 'Oranges', correct: false, feedback: 'Sai. Cô ấy hỏi về tomatoes (cà chua).' },
            { text: 'Bread', correct: false, feedback: 'Sai. Cô ấy hỏi về tomatoes (cà chua).' },
          ],
        },
        { text: '"Two dollars per kilogram," the seller replies.', translation: '"Hai đô la một ký," người bán trả lời.' },
        { text: '"I\'ll take two kilograms, please," Sarah says.', translation: '"Cho tôi hai ký nhé," Sarah nói.' },
        {
          text: 'She also buys apples, carrots, and a watermelon.',
          translation: 'Cô ấy cũng mua táo, cà rốt, và một quả dưa hấu.',
          question: 'Sarah mua bao nhiêu ký cà chua?',
          choices: [
            { text: 'One kilogram', correct: false, feedback: 'Sai. Cô ấy nói "two kilograms".' },
            { text: 'Two kilograms', correct: true, feedback: 'Đúng! "I\'ll take two kilograms."' },
            { text: 'Three kilograms', correct: false, feedback: 'Sai. Cô ấy nói "two kilograms".' },
          ],
        },
        { text: 'The total is fifteen dollars. Sarah pays and walks home happily.', translation: 'Tổng cộng là mười lăm đô la. Sarah trả tiền và vui vẻ đi về nhà.' },
      ],
    },
    {
      id: '2', title: 'The New Student', titleVi: 'Học sinh mới', level: 'Beginner', language: 'en',
      segments: [
        { text: 'Today is Tom\'s first day at a new school.', translation: 'Hôm nay là ngày đầu tiên của Tom ở trường mới.' },
        { text: 'He feels nervous but excited.', translation: 'Anh ấy cảm thấy hồi hộp nhưng phấn khích.' },
        {
          text: 'A girl walks up to him. "Hi! I\'m Lisa. Are you new here?"',
          translation: 'Một cô gái đi đến. "Chào! Mình là Lisa. Bạn mới đến à?"',
          question: 'Tom cảm thấy thế nào?',
          choices: [
            { text: 'Angry and sad', correct: false, feedback: 'Sai. Anh ấy "nervous but excited".' },
            { text: 'Nervous but excited', correct: true, feedback: 'Đúng! Hồi hộp nhưng phấn khích.' },
            { text: 'Bored and tired', correct: false, feedback: 'Sai. Anh ấy "nervous but excited".' },
          ],
        },
        { text: '"Yes, I just moved here from Vietnam," Tom replies with a smile.', translation: '"Vâng, mình vừa chuyển đến từ Việt Nam," Tom trả lời với nụ cười.' },
        { text: '"That\'s cool! Let me show you around," Lisa says.', translation: '"Tuyệt! Để mình dẫn bạn đi xem quanh," Lisa nói.' },
        {
          text: 'Lisa shows Tom the library, the cafeteria, and the playground.',
          translation: 'Lisa dẫn Tom xem thư viện, nhà ăn, và sân chơi.',
          question: 'Tom đến từ đâu?',
          choices: [
            { text: 'Japan', correct: false, feedback: 'Sai. Tom nói "from Vietnam".' },
            { text: 'Vietnam', correct: true, feedback: 'Đúng! "I just moved here from Vietnam."' },
            { text: 'Korea', correct: false, feedback: 'Sai. Tom nói "from Vietnam".' },
          ],
        },
        { text: '"Thank you, Lisa! You\'re very kind," Tom says. He feels happy to have a new friend.', translation: '"Cảm ơn Lisa! Bạn rất tốt bụng," Tom nói. Anh ấy vui vì có bạn mới.' },
      ],
    },
    {
      id: '6', title: 'At the Restaurant', titleVi: 'Ở nhà hàng', level: 'Elementary', language: 'en',
      segments: [
        { text: 'Mike and his girlfriend Anna are having dinner at an Italian restaurant.', translation: 'Mike và bạn gái Anna đang ăn tối ở nhà hàng Ý.' },
        { text: 'The waiter brings them the menu. "Would you like something to drink first?"', translation: 'Người phục vụ mang thực đơn. "Quý khách muốn uống gì trước?"' },
        {
          text: '"I\'ll have a glass of orange juice, please," Anna says. Mike orders a coffee.',
          translation: '"Cho tôi một ly nước cam," Anna nói. Mike gọi cà phê.',
          question: 'Anna gọi đồ uống gì?',
          choices: [
            { text: 'Coffee', correct: false, feedback: 'Sai. Mike gọi coffee, Anna gọi orange juice.' },
            { text: 'Orange juice', correct: true, feedback: 'Đúng! Anna gọi "a glass of orange juice".' },
            { text: 'Water', correct: false, feedback: 'Sai. Anna gọi orange juice.' },
          ],
        },
        { text: 'For the main course, Anna chooses pasta with mushroom sauce.', translation: 'Món chính, Anna chọn mì Ý sốt nấm.' },
        { text: 'Mike orders a large pizza with extra cheese.', translation: 'Mike gọi pizza lớn thêm phô mai.' },
        {
          text: '"This pasta is delicious!" Anna says. "Your pizza looks amazing too."',
          translation: '"Mì Ý này ngon quá!" Anna nói. "Pizza của anh trông cũng tuyệt."',
          question: 'Mike gọi món gì?',
          choices: [
            { text: 'Pasta with mushroom sauce', correct: false, feedback: 'Sai. Đó là món của Anna.' },
            { text: 'Pizza with extra cheese', correct: true, feedback: 'Đúng! Mike gọi pizza lớn thêm phô mai.' },
            { text: 'Steak with salad', correct: false, feedback: 'Sai. Mike gọi pizza.' },
          ],
        },
        { text: 'After dinner, they share a chocolate cake for dessert. The bill is forty-five dollars.', translation: 'Sau bữa tối, họ chia nhau bánh chocolate tráng miệng. Hóa đơn là 45 đô la.' },
      ],
    },
    {
      id: '7', title: 'The Job Interview', titleVi: 'Buổi phỏng vấn', level: 'Intermediate', language: 'en',
      segments: [
        { text: 'Linh has a job interview at a technology company today.', translation: 'Linh có buổi phỏng vấn ở công ty công nghệ hôm nay.' },
        { text: 'She wakes up early, puts on her best outfit, and reviews her resume one more time.', translation: 'Cô ấy dậy sớm, mặc bộ đồ đẹp nhất, và xem lại CV một lần nữa.' },
        {
          text: '"Tell me about yourself," the interviewer begins. Linh takes a deep breath and smiles.',
          translation: '"Hãy giới thiệu về bản thân," người phỏng vấn bắt đầu. Linh hít thở sâu và mỉm cười.',
          question: 'Linh phỏng vấn ở đâu?',
          choices: [
            { text: 'A hospital', correct: false, feedback: 'Sai. Cô ấy phỏng vấn ở technology company.' },
            { text: 'A technology company', correct: true, feedback: 'Đúng! Công ty công nghệ.' },
            { text: 'A school', correct: false, feedback: 'Sai. Cô ấy phỏng vấn ở technology company.' },
          ],
        },
        { text: '"I graduated from university two years ago. I have experience in web development and I love solving problems."', translation: '"Tôi tốt nghiệp đại học hai năm trước. Tôi có kinh nghiệm phát triển web và thích giải quyết vấn đề."' },
        { text: '"What is your greatest strength?" the interviewer asks.', translation: '"Điểm mạnh lớn nhất của bạn là gì?" người phỏng vấn hỏi.' },
        {
          text: '"I\'m a fast learner and I work well in a team," Linh answers confidently.',
          translation: '"Tôi học nhanh và làm việc nhóm tốt," Linh trả lời tự tin.',
          question: 'Linh có kinh nghiệm gì?',
          choices: [
            { text: 'Teaching', correct: false, feedback: 'Sai. Cô ấy có kinh nghiệm web development.' },
            { text: 'Web development', correct: true, feedback: 'Đúng! "I have experience in web development."' },
            { text: 'Marketing', correct: false, feedback: 'Sai. Cô ấy có kinh nghiệm web development.' },
          ],
        },
        { text: 'The interview goes well. Two days later, Linh receives an email: "Congratulations! You got the job!"', translation: 'Buổi phỏng vấn diễn ra tốt đẹp. Hai ngày sau, Linh nhận email: "Chúc mừng! Bạn được nhận việc!"' },
      ],
    },
  ],
  ja: [
    {
      id: '3', title: 'コンビニで', titleVi: 'Ở cửa hàng tiện lợi', level: 'Beginner', language: 'ja',
      segments: [
        { text: '田中さんはコンビニに行きます。', translation: 'Anh Tanaka đi đến cửa hàng tiện lợi.' },
        { text: 'おにぎりとお茶を買いたいです。', translation: 'Anh ấy muốn mua onigiri và trà.' },
        {
          text: '「すみません、おにぎりはどこですか？」と聞きます。',
          translation: '"Xin lỗi, onigiri ở đâu?" anh ấy hỏi.',
          question: '田中さんは何を買いたいですか？',
          choices: [
            { text: 'おにぎりとお茶', correct: true, feedback: '正解！おにぎりとお茶を買いたいです。' },
            { text: 'パンと牛乳', correct: false, feedback: '違います。おにぎりとお茶です。' },
            { text: 'お弁当とジュース', correct: false, feedback: '違います。おにぎりとお茶です。' },
          ],
        },
        { text: '「あちらの棚にあります」と店員さんが言います。', translation: '"Ở kệ bên kia," nhân viên nói.' },
        { text: '田中さんは鮭のおにぎりを二つ選びます。', translation: 'Anh Tanaka chọn hai cái onigiri cá hồi.' },
        {
          text: '全部で350円です。「ありがとうございます！」',
          translation: 'Tổng cộng 350 yên. "Cảm ơn!"',
          question: 'おにぎりはいくつ買いましたか？',
          choices: [
            { text: '一つ', correct: false, feedback: '違います。二つ選びました。' },
            { text: '二つ', correct: true, feedback: '正解！二つ選びました。' },
            { text: '三つ', correct: false, feedback: '違います。二つ選びました。' },
          ],
        },
      ],
    },
    {
      id: '8', title: '電車の中で', titleVi: 'Trên tàu điện', level: 'Elementary', language: 'ja',
      segments: [
        { text: '朝の電車はとても混んでいます。', translation: 'Tàu điện buổi sáng rất đông.' },
        { text: '佐藤さんは毎日電車で会社に行きます。', translation: 'Anh Sato mỗi ngày đi tàu điện đến công ty.' },
        {
          text: '今日は隣の人が本を読んでいます。面白そうな本です。',
          translation: 'Hôm nay người bên cạnh đang đọc sách. Có vẻ là cuốn sách thú vị.',
          question: '佐藤さんはどうやって会社に行きますか？',
          choices: [
            { text: 'バスで', correct: false, feedback: '違います。電車で行きます。' },
            { text: '電車で', correct: true, feedback: '正解！毎日電車で会社に行きます。' },
            { text: '車で', correct: false, feedback: '違います。電車で行きます。' },
          ],
        },
        { text: '「すみません、次の駅はどこですか？」と外国人が聞きます。', translation: '"Xin lỗi, trạm tiếp theo là đâu?" người nước ngoài hỏi.' },
        { text: '佐藤さんは英語で「Next stop is Shibuya」と答えます。', translation: 'Anh Sato trả lời bằng tiếng Anh "Trạm tiếp theo là Shibuya".' },
        {
          text: '外国人は「Thank you!」と笑顔で言います。佐藤さんも嬉しくなりました。',
          translation: 'Người nước ngoài nói "Cảm ơn!" với nụ cười. Anh Sato cũng vui lên.',
          question: '次の駅はどこですか？',
          choices: [
            { text: '東京', correct: false, feedback: '違います。渋谷です。' },
            { text: '渋谷', correct: true, feedback: '正解！Next stop is Shibuya.' },
            { text: '新宿', correct: false, feedback: '違います。渋谷です。' },
          ],
        },
      ],
    },
    {
      id: '11', title: '日本語の授業', titleVi: 'Lớp học tiếng Nhật', level: 'Elementary', language: 'ja',
      segments: [
        { text: 'ハイさんはベトナムから来た留学生です。', translation: 'Hải là du học sinh đến từ Việt Nam.' },
        { text: '毎週月曜日と水曜日に日本語の授業があります。', translation: 'Mỗi tuần thứ Hai và thứ Tư có lớp tiếng Nhật.' },
        {
          text: '今日の授業は「買い物」がテーマです。先生が「いらっしゃいませ」と言います。',
          translation: 'Bài học hôm nay có chủ đề "Mua sắm". Cô giáo nói "Xin mời vào".',
          question: 'ハイさんはどこから来ましたか？',
          choices: [
            { text: '中国', correct: false, feedback: '違います。ベトナムから来ました。' },
            { text: 'ベトナム', correct: true, feedback: '正解！ベトナムから来た留学生です。' },
            { text: '韓国', correct: false, feedback: '違います。ベトナムから来ました。' },
          ],
        },
        { text: 'ハイさんは「このりんごはいくらですか？」と練習します。', translation: 'Hải luyện tập nói "Quả táo này bao nhiêu tiền?"' },
        { text: '先生は「上手ですね！発音がきれいです」と褒めます。', translation: 'Cô giáo khen "Giỏi lắm! Phát âm đẹp."' },
        {
          text: '授業の後、クラスメートと一緒にお昼ご飯を食べに行きます。',
          translation: 'Sau giờ học, đi ăn trưa cùng bạn cùng lớp.',
          question: '今日のテーマは何ですか？',
          choices: [
            { text: '旅行', correct: false, feedback: '違います。「買い物」がテーマです。' },
            { text: '買い物', correct: true, feedback: '正解！今日は「買い物」がテーマです。' },
            { text: '料理', correct: false, feedback: '違います。「買い物」がテーマです。' },
          ],
        },
      ],
    },
  ],
  zh: [
    {
      id: '4', title: '在餐厅', titleVi: 'Ở nhà hàng', level: 'Beginner', language: 'zh',
      segments: [
        { text: '小明和朋友去餐厅吃饭。', translation: 'Tiểu Minh và bạn đi nhà hàng ăn cơm.' },
        { text: '他们看菜单，有很多好吃的菜。', translation: 'Họ xem thực đơn, có rất nhiều món ngon.' },
        {
          text: '「服务员，我要一碗米饭和一盘鱼。」小明说。',
          translation: '"Phục vụ ơi, tôi muốn một bát cơm và một đĩa cá." Tiểu Minh nói.',
          question: '小明点了什么？',
          choices: [
            { text: '米饭和鱼', correct: true, feedback: '对！一碗米饭和一盘鱼。' },
            { text: '面条和鸡肉', correct: false, feedback: '不对。他要米饭和鱼。' },
            { text: '饺子和汤', correct: false, feedback: '不对。他要米饭和鱼。' },
          ],
        },
        { text: '朋友点了炒面和可乐。', translation: 'Bạn anh ấy gọi mì xào và coca.' },
        { text: '菜很快就来了。「真好吃！」他们说。', translation: 'Món ăn đến rất nhanh. "Ngon thật!" họ nói.' },
        {
          text: '吃完以后，他们一共花了八十块钱。',
          translation: 'Ăn xong, họ tổng cộng tốn 80 tệ.',
          question: '朋友点了什么喝的？',
          choices: [
            { text: '茶', correct: false, feedback: '不对。朋友点了可乐。' },
            { text: '可乐', correct: true, feedback: '对！朋友点了可乐。' },
            { text: '果汁', correct: false, feedback: '不对。朋友点了可乐。' },
          ],
        },
      ],
    },
    {
      id: '9', title: '坐地铁', titleVi: 'Đi tàu điện ngầm', level: 'Elementary', language: 'zh',
      segments: [
        { text: '今天是星期一，小红要坐地铁去上班。', translation: 'Hôm nay là thứ Hai, Tiểu Hồng phải đi tàu điện ngầm đi làm.' },
        { text: '地铁站里人很多，大家都在排队。', translation: 'Trong ga tàu điện ngầm rất đông, mọi người đều xếp hàng.' },
        {
          text: '小红看了看手机，现在是早上八点半。',
          translation: 'Tiểu Hồng nhìn điện thoại, bây giờ là 8 giờ 30 sáng.',
          question: '今天是星期几？',
          choices: [
            { text: '星期五', correct: false, feedback: '不对。今天是星期一。' },
            { text: '星期一', correct: true, feedback: '对！今天是星期一。' },
            { text: '星期三', correct: false, feedback: '不对。今天是星期一。' },
          ],
        },
        { text: '地铁来了，小红上了车。车里没有座位了。', translation: 'Tàu đến, Tiểu Hồng lên xe. Trong xe không còn chỗ ngồi.' },
        { text: '一位老人也上了车。小红旁边的年轻人站起来让座。', translation: 'Một người già cũng lên xe. Người trẻ bên cạnh Tiểu Hồng đứng dậy nhường ghế.' },
        {
          text: '「谢谢你，年轻人！」老人笑着说。三站以后，小红到公司了。',
          translation: '"Cảm ơn cháu!" người già cười nói. Ba trạm sau, Tiểu Hồng đến công ty.',
          question: '谁给老人让座了？',
          choices: [
            { text: '小红', correct: false, feedback: '不对。是小红旁边的年轻人让座的。' },
            { text: '旁边的年轻人', correct: true, feedback: '对！小红旁边的年轻人站起来让座。' },
            { text: '没有人', correct: false, feedback: '不对。有年轻人让座了。' },
          ],
        },
      ],
    },
    {
      id: '12', title: '学做中国菜', titleVi: 'Học nấu món Trung', level: 'Elementary', language: 'zh',
      segments: [
        { text: '小李的妈妈做菜做得很好吃。', translation: 'Mẹ của Tiểu Lý nấu ăn rất ngon.' },
        { text: '今天小李想学做番茄炒蛋。这是一道很简单的中国菜。', translation: 'Hôm nay Tiểu Lý muốn học làm trứng xào cà chua. Đây là một món Trung Quốc rất đơn giản.' },
        {
          text: '妈妈说：「先把鸡蛋打好，加一点盐。」',
          translation: 'Mẹ nói: "Trước tiên đánh trứng, thêm một chút muối."',
          question: '小李想学做什么菜？',
          choices: [
            { text: '红烧肉', correct: false, feedback: '不对。他想学做番茄炒蛋。' },
            { text: '番茄炒蛋', correct: true, feedback: '对！他想学做番茄炒蛋。' },
            { text: '炒面', correct: false, feedback: '不对。他想学做番茄炒蛋。' },
          ],
        },
        { text: '然后把番茄切成小块。锅里放油，先炒鸡蛋。', translation: 'Sau đó cắt cà chua thành miếng nhỏ. Cho dầu vào chảo, xào trứng trước.' },
        { text: '鸡蛋炒好以后，放入番茄，加糖和盐。', translation: 'Trứng xào xong, cho cà chua vào, thêm đường và muối.' },
        {
          text: '五分钟以后，菜做好了。小李尝了一口：「真好吃！跟妈妈做的一样！」',
          translation: 'Năm phút sau, món ăn xong. Tiểu Lý nếm thử: "Ngon thật! Giống mẹ nấu!"',
          question: '先炒什么？',
          choices: [
            { text: '番茄', correct: false, feedback: '不对。先炒鸡蛋。' },
            { text: '鸡蛋', correct: true, feedback: '对！先炒鸡蛋，然后放入番茄。' },
            { text: '一起炒', correct: false, feedback: '不对。先炒鸡蛋。' },
          ],
        },
      ],
    },
  ],
  ko: [
    {
      id: '5', title: '카페에서', titleVi: 'Ở quán cà phê', level: 'Beginner', language: 'ko',
      segments: [
        { text: '지민이는 카페에 갑니다.', translation: 'Jimin đi đến quán cà phê.' },
        { text: '오늘은 날씨가 추워서 따뜻한 음료를 마시고 싶습니다.', translation: 'Hôm nay trời lạnh nên muốn uống đồ uống nóng.' },
        {
          text: '「아메리카노 한 잔 주세요.」지민이가 말합니다.',
          translation: '"Cho tôi một ly americano." Jimin nói.',
          question: '왜 따뜻한 음료를 마시고 싶습니까?',
          choices: [
            { text: '날씨가 더워서', correct: false, feedback: '아닙니다. 날씨가 추워서입니다.' },
            { text: '날씨가 추워서', correct: true, feedback: '맞습니다! 날씨가 추워서 따뜻한 음료를 마시고 싶습니다.' },
            { text: '목이 말라서', correct: false, feedback: '아닙니다. 날씨가 추워서입니다.' },
          ],
        },
        { text: '「사이즈는요?」 직원이 물어봅니다.', translation: '"Size nào ạ?" nhân viên hỏi.' },
        { text: '「큰 사이즈로 주세요. 그리고 케이크도 하나 주세요.」', translation: '"Cho size lớn. Và cho thêm một cái bánh."' },
        {
          text: '지민이는 커피를 마시면서 책을 읽습니다. 행복한 오후입니다.',
          translation: 'Jimin vừa uống cà phê vừa đọc sách. Một buổi chiều hạnh phúc.',
          question: '지민이는 무엇을 주문했습니까?',
          choices: [
            { text: '아메리카노와 케이크', correct: true, feedback: '맞습니다! 아메리카노와 케이크를 주문했습니다.' },
            { text: '라떼와 쿠키', correct: false, feedback: '아닙니다. 아메리카노와 케이크입니다.' },
            { text: '녹차와 빵', correct: false, feedback: '아닙니다. 아메리카노와 케이크입니다.' },
          ],
        },
      ],
    },
    {
      id: '10', title: '한국어 수업', titleVi: 'Lớp học tiếng Hàn', level: 'Elementary', language: 'ko',
      segments: [
        { text: '민수는 베트남에서 온 유학생입니다.', translation: 'Minsu là du học sinh đến từ Việt Nam.' },
        { text: '오늘은 한국어 수업 첫 날입니다. 교실에 학생이 열 명 있습니다.', translation: 'Hôm nay là ngày đầu tiên lớp tiếng Hàn. Trong lớp có 10 học sinh.' },
        {
          text: '선생님이 말합니다. 「여러분, 자기소개를 해 주세요.」',
          translation: 'Cô giáo nói: "Mọi người hãy tự giới thiệu."',
          question: '민수는 어디에서 왔습니까?',
          choices: [
            { text: '일본', correct: false, feedback: '아닙니다. 베트남에서 왔습니다.' },
            { text: '베트남', correct: true, feedback: '맞습니다! 민수는 베트남에서 온 유학생입니다.' },
            { text: '중국', correct: false, feedback: '아닙니다. 베트남에서 왔습니다.' },
          ],
        },
        { text: '민수가 일어납니다. 「안녕하세요, 저는 민수입니다. 베트남에서 왔습니다.」', translation: 'Minsu đứng dậy. "Xin chào, tôi là Minsu. Tôi đến từ Việt Nam."' },
        { text: '「한국 음식을 좋아합니다. 특히 김치찌개를 좋아합니다.」', translation: '"Tôi thích đồ ăn Hàn Quốc. Đặc biệt thích canh kim chi."' },
        {
          text: '다른 학생들이 박수를 칩니다. 선생님이 「아주 잘했어요!」라고 말합니다.',
          translation: 'Các bạn khác vỗ tay. Cô giáo nói "Giỏi lắm!"',
          question: '민수는 어떤 한국 음식을 좋아합니까?',
          choices: [
            { text: '비빔밥', correct: false, feedback: '아닙니다. 김치찌개를 좋아합니다.' },
            { text: '김치찌개', correct: true, feedback: '맞습니다! 특히 김치찌개를 좋아합니다.' },
            { text: '불고기', correct: false, feedback: '아닙니다. 김치찌개를 좋아합니다.' },
          ],
        },
      ],
    },
    {
      id: '13', title: '주말 계획', titleVi: 'Kế hoạch cuối tuần', level: 'Elementary', language: 'ko',
      segments: [
        { text: '금요일 오후입니다. 수진이는 친구 하나에게 전화합니다.', translation: 'Chiều thứ Sáu. Sujin gọi điện cho bạn Hana.' },
        { text: '「하나야, 이번 주말에 뭐 할 거야?」', translation: '"Hana ơi, cuối tuần này làm gì?"' },
        {
          text: '「토요일에 홍대에서 쇼핑하고 싶어. 같이 갈래?」 하나가 대답합니다.',
          translation: '"Thứ Bảy muốn đi mua sắm ở Hongdae. Đi cùng không?" Hana trả lời.',
          question: '하나는 토요일에 어디에 가고 싶습니까?',
          choices: [
            { text: '명동', correct: false, feedback: '아닙니다. 홍대에 가고 싶습니다.' },
            { text: '홍대', correct: true, feedback: '맞습니다! 홍대에서 쇼핑하고 싶습니다.' },
            { text: '강남', correct: false, feedback: '아닙니다. 홍대에 가고 싶습니다.' },
          ],
        },
        { text: '「좋아! 그리고 일요일에는 한강 공원에 가자. 자전거 타고 싶어.」 수진이가 말합니다.', translation: '"Được! Và Chủ nhật đi công viên sông Hàn nhé. Muốn đạp xe." Sujin nói.' },
        { text: '「좋은 생각이야! 도시락도 만들어 가자.」', translation: '"Ý hay! Làm cơm hộp mang theo luôn."' },
        {
          text: '두 사람은 신나게 주말 계획을 세웁니다.',
          translation: 'Hai người hào hứng lên kế hoạch cuối tuần.',
          question: '일요일에 무엇을 하고 싶습니까?',
          choices: [
            { text: '쇼핑하기', correct: false, feedback: '아닙니다. 쇼핑은 토요일입니다. 일요일에는 자전거를 타고 싶습니다.' },
            { text: '자전거 타기', correct: true, feedback: '맞습니다! 한강 공원에서 자전거를 타고 싶습니다.' },
            { text: '영화 보기', correct: false, feedback: '아닙니다. 자전거를 타고 싶습니다.' },
          ],
        },
      ],
    },
  ],
};

const languages = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
  { code: 'zh', name: 'Chinese', flag: '🇨🇳' },
  { code: 'ko', name: 'Korean', flag: '🇰🇷' },
];

export default function StoriesPage() {
  const [selectedLang, setSelectedLang] = useState('en');
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [currentSegment, setCurrentSegment] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<Record<number, boolean>>({});
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
  const [score, setScore] = useState(0);

  const currentStories = stories[selectedLang] || [];

  const handleChoice = (choiceIndex: number, correct: boolean) => {
    setSelectedChoice(choiceIndex);
    if (correct && !answeredQuestions[currentSegment]) {
      setScore(prev => prev + 1);
    }
    setAnsweredQuestions(prev => ({ ...prev, [currentSegment]: true }));
  };

  const nextSegment = () => {
    if (selectedStory && currentSegment < selectedStory.segments.length - 1) {
      setCurrentSegment(prev => prev + 1);
      setSelectedChoice(null);
    }
  };

  const prevSegment = () => {
    if (currentSegment > 0) {
      setCurrentSegment(prev => prev - 1);
      setSelectedChoice(null);
    }
  };

  const startStory = (story: Story) => {
    setSelectedStory(story);
    setCurrentSegment(0);
    setAnsweredQuestions({});
    setSelectedChoice(null);
    setScore(0);
  };

  const backToList = () => {
    setSelectedStory(null);
  };

  if (!selectedStory) {
    return (
      <motion.div className="max-w-3xl mx-auto space-y-6 pb-8" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <div>
          <h1 className="text-2xl font-bold font-display">Truyện đọc</h1>
          <p className="text-muted-foreground text-sm mt-0.5">Đọc truyện ngắn và trả lời câu hỏi</p>
        </div>

        <div className="flex gap-2 flex-wrap">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => setSelectedLang(lang.code)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 transition-all ${
                selectedLang === lang.code
                  ? 'border-primary bg-primary/5 text-primary font-medium'
                  : 'border-border text-muted-foreground hover:border-primary/30'
              }`}
            >
              <span>{lang.flag}</span>
              <span className="text-sm">{lang.name}</span>
            </button>
          ))}
        </div>

        <div className="grid gap-4">
          {currentStories.map((story, index) => (
            <motion.button
              key={story.id}
              onClick={() => startStory(story)}
              className="p-5 rounded-2xl bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-900/80 dark:to-gray-800/50 border border-border/60 backdrop-blur-sm shadow-lg shadow-purple-500/5 text-left hover:border-primary/40 hover:shadow-md transition-all"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: Math.min(index * 0.05, 0.3) }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-lg">{story.title}</h3>
                  <p className="text-sm text-muted-foreground mt-0.5">{story.titleVi}</p>
                </div>
                <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary font-medium">
                  {story.level}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-2">{story.segments.length} đoạn</p>
            </motion.button>
          ))}
        </div>

        {currentStories.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-lg font-semibold mb-2">Chưa có truyện</h3>
            <p className="text-muted-foreground">Chưa có truyện cho ngôn ngữ này.</p>
          </div>
        )}
      </motion.div>
    );
  }

  const segment = selectedStory.segments[currentSegment];
  const isLastSegment = currentSegment === selectedStory.segments.length - 1;
  const totalQuestions = selectedStory.segments.filter(s => s.question).length;

  return (
    <motion.div className="max-w-2xl mx-auto space-y-6 pb-8" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <button onClick={backToList} className="text-sm text-primary hover:underline">
          ← Quay lại
        </button>
        <span className="text-sm text-muted-foreground">{currentSegment + 1} / {selectedStory.segments.length}</span>
      </div>

      {/* Progress bar */}
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-primary to-primary/70 rounded-full transition-all" style={{ width: `${((currentSegment + 1) / selectedStory.segments.length) * 100}%` }} />
      </div>

      {/* Story title */}
      <div className="text-center">
        <h2 className="text-xl font-bold">{selectedStory.title}</h2>
        <p className="text-sm text-muted-foreground">{selectedStory.titleVi}</p>
      </div>

      {/* Segment content */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-900/80 dark:to-gray-800/50 border border-border/60 backdrop-blur-sm shadow-lg shadow-purple-500/5 space-y-3">
        <p className="text-lg leading-relaxed">{segment.text}</p>
        <p className="text-sm text-muted-foreground italic">{segment.translation}</p>
      </div>

      {/* Question */}
      {segment.question && segment.choices && (
        <div className="p-5 rounded-2xl bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800 space-y-3">
          <p className="font-medium text-blue-800 dark:text-blue-200">{segment.question}</p>
          <div className="space-y-2">
            {segment.choices.map((choice, i) => {
              let styles = 'border-border hover:border-blue-300';
              if (answeredQuestions[currentSegment]) {
                if (choice.correct) {
                  styles = 'border-green-500 bg-green-50 dark:bg-green-900/20';
                } else if (i === selectedChoice && !choice.correct) {
                  styles = 'border-red-500 bg-red-50 dark:bg-red-900/20';
                } else {
                  styles = 'border-border opacity-50';
                }
              }

              return (
                <button
                  key={i}
                  onClick={() => !answeredQuestions[currentSegment] && handleChoice(i, choice.correct)}
                  disabled={!!answeredQuestions[currentSegment]}
                  className={`w-full p-3 rounded-xl border-2 text-left text-sm font-medium transition-all ${styles}`}
                >
                  {choice.text}
                  {answeredQuestions[currentSegment] && (i === selectedChoice || choice.correct) && (
                    <p className="text-xs font-normal text-muted-foreground mt-1">{choice.feedback}</p>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <Button variant="outline" onClick={prevSegment} disabled={currentSegment === 0}>
          ← Trước
        </Button>
        {isLastSegment ? (
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Điểm: {score}/{totalQuestions}</p>
            <Button onClick={backToList} className="mt-2">Hoàn thành</Button>
          </div>
        ) : (
          <Button onClick={nextSegment} disabled={!!segment.question && !answeredQuestions[currentSegment]}>
            Tiếp →
          </Button>
        )}
      </div>
    </motion.div>
  );
}
