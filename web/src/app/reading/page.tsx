'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface ReadingPassage {
  id: string;
  title: string;
  titleVi: string;
  level: string;
  language: string;
  text: string;
  translation: string;
  questions: { question: string; options: string[]; answer: string; explanation: string }[];
}

const passages: Record<string, ReadingPassage[]> = {
  en: [
    {
      id: '1', title: 'My Daily Routine', titleVi: 'Thói quen hàng ngày', level: 'Beginner', language: 'en',
      text: 'I wake up at 6:30 every morning. First, I brush my teeth and take a shower. Then I have breakfast with my family. I usually eat bread and drink milk. After breakfast, I go to work by bus. It takes about 30 minutes. I work from 8:00 to 5:00. After work, I go to the gym for one hour. I come home at 7:00 and have dinner. Before bed, I read a book for 30 minutes. I go to sleep at 10:30.',
      translation: 'Tôi thức dậy lúc 6:30 mỗi sáng. Đầu tiên, tôi đánh răng và tắm. Sau đó tôi ăn sáng với gia đình. Tôi thường ăn bánh mì và uống sữa. Sau bữa sáng, tôi đi làm bằng xe buýt. Mất khoảng 30 phút. Tôi làm việc từ 8:00 đến 5:00. Sau giờ làm, tôi đi tập gym 1 tiếng. Tôi về nhà lúc 7:00 và ăn tối. Trước khi ngủ, tôi đọc sách 30 phút. Tôi đi ngủ lúc 10:30.',
      questions: [
        { question: 'What time does the person wake up?', options: ['6:00', '6:30', '7:00', '7:30'], answer: '6:30', explanation: '"I wake up at 6:30 every morning."' },
        { question: 'How does the person go to work?', options: ['By car', 'By bus', 'By train', 'On foot'], answer: 'By bus', explanation: '"I go to work by bus."' },
        { question: 'What does the person do before bed?', options: ['Watch TV', 'Exercise', 'Read a book', 'Listen to music'], answer: 'Read a book', explanation: '"Before bed, I read a book for 30 minutes."' },
        { question: 'How long does the person work each day?', options: ['7 hours', '8 hours', '9 hours', '10 hours'], answer: '9 hours', explanation: '"I work from 8:00 to 5:00" = 9 hours.' },
      ],
    },
    {
      id: '2', title: 'The Weather Report', titleVi: 'Bản tin thời tiết', level: 'Elementary', language: 'en',
      text: 'Good morning! Here is today\'s weather report for Ho Chi Minh City. This morning will be sunny with temperatures around 28 degrees. In the afternoon, expect some clouds and the temperature will rise to 34 degrees. There is a 40% chance of rain in the evening, so please bring an umbrella if you go out tonight. Tomorrow will be cooler with temperatures between 25 and 30 degrees. The weekend looks sunny and perfect for outdoor activities. Have a great day!',
      translation: 'Chào buổi sáng! Đây là bản tin thời tiết hôm nay cho TP.HCM. Sáng nay trời nắng với nhiệt độ khoảng 28 độ. Buổi chiều sẽ có mây và nhiệt độ tăng lên 34 độ. Có 40% khả năng mưa vào buổi tối, nên hãy mang ô nếu bạn ra ngoài tối nay. Ngày mai sẽ mát hơn với nhiệt độ từ 25 đến 30 độ. Cuối tuần trời nắng và hoàn hảo cho hoạt động ngoài trời.',
      questions: [
        { question: 'What is the morning temperature?', options: ['25°C', '28°C', '30°C', '34°C'], answer: '28°C', explanation: '"temperatures around 28 degrees"' },
        { question: 'What should you bring in the evening?', options: ['A jacket', 'An umbrella', 'Sunglasses', 'A hat'], answer: 'An umbrella', explanation: '"please bring an umbrella if you go out tonight"' },
        { question: 'What will the weekend be like?', options: ['Rainy', 'Cloudy', 'Sunny', 'Windy'], answer: 'Sunny', explanation: '"The weekend looks sunny and perfect for outdoor activities."' },
        { question: 'What is the chance of rain in the evening?', options: ['20%', '30%', '40%', '50%'], answer: '40%', explanation: '"There is a 40% chance of rain in the evening"' },
      ],
    },
    {
      id: '12', title: 'A Trip to Da Lat', titleVi: 'Chuyến đi Đà Lạt', level: 'Intermediate', language: 'en',
      text: 'Last summer, my family took a trip to Da Lat, a beautiful city in the Central Highlands of Vietnam. The weather there is much cooler than Ho Chi Minh City, usually between 15 and 25 degrees. We stayed at a small hotel near the lake. On the first day, we visited the Crazy House, which has a very unusual design. The next day, we went to a strawberry farm and picked fresh strawberries. They were delicious! We also visited the night market and tried many local foods like grilled corn and hot soy milk. My favorite part was visiting the flower gardens. Da Lat is famous for its flowers, especially roses and hydrangeas. The trip was only three days, but we had a wonderful time. I want to go back next year.',
      translation: 'Mùa hè năm ngoái, gia đình tôi đi Đà Lạt, một thành phố đẹp ở Tây Nguyên Việt Nam. Thời tiết ở đó mát hơn TP.HCM nhiều, thường từ 15 đến 25 độ. Chúng tôi ở khách sạn nhỏ gần hồ. Ngày đầu tiên, chúng tôi thăm Crazy House với thiết kế rất độc đáo. Ngày hôm sau đi vườn dâu tây hái dâu tươi. Rất ngon! Chúng tôi cũng đi chợ đêm thử nhiều đồ ăn địa phương như bắp nướng và sữa đậu nành nóng. Phần tôi thích nhất là thăm vườn hoa. Đà Lạt nổi tiếng với hoa, đặc biệt là hoa hồng và cẩm tú cầu. Chuyến đi chỉ 3 ngày nhưng rất tuyệt vời. Tôi muốn quay lại năm sau.',
      questions: [
        { question: 'What is the weather like in Da Lat?', options: ['Very hot', 'Cooler than HCMC', 'Very cold', 'Rainy all day'], answer: 'Cooler than HCMC', explanation: '"The weather there is much cooler than Ho Chi Minh City"' },
        { question: 'What did they do on the second day?', options: ['Visited Crazy House', 'Went to a strawberry farm', 'Went to the night market', 'Visited flower gardens'], answer: 'Went to a strawberry farm', explanation: '"The next day, we went to a strawberry farm and picked fresh strawberries."' },
        { question: 'What is Da Lat famous for?', options: ['Coffee', 'Beaches', 'Flowers', 'Mountains'], answer: 'Flowers', explanation: '"Da Lat is famous for its flowers, especially roses and hydrangeas."' },
        { question: 'How long was the trip?', options: ['Two days', 'Three days', 'Five days', 'One week'], answer: 'Three days', explanation: '"The trip was only three days"' },
      ],
    },
  ],
  ja: [
    {
      id: '3', title: '私の趣味', titleVi: 'Sở thích của tôi', level: 'Beginner', language: 'ja',
      text: '私の趣味は料理です。毎週末、新しいレシピを試します。日本料理が一番好きです。特にお寿司と天ぷらが好きです。先週、初めてラーメンを作りました。とてもおいしかったです。来週はカレーを作る予定です。料理は楽しいし、家族も喜びます。',
      translation: 'Sở thích của tôi là nấu ăn. Mỗi cuối tuần, tôi thử công thức mới. Tôi thích ẩm thực Nhật nhất. Đặc biệt tôi thích sushi và tempura. Tuần trước, lần đầu tiên tôi nấu ramen. Rất ngon. Tuần tới tôi dự định nấu cà ri. Nấu ăn vui và gia đình cũng vui.',
      questions: [
        { question: '趣味は何ですか？', options: ['読書', '料理', '旅行', '音楽'], answer: '料理', explanation: '"私の趣味は料理です。"' },
        { question: '先週何を作りましたか？', options: ['カレー', 'お寿司', 'ラーメン', '天ぷら'], answer: 'ラーメン', explanation: '"先週、初めてラーメンを作りました。"' },
        { question: '来週何を作る予定ですか？', options: ['ラーメン', 'お寿司', 'カレー', '天ぷら'], answer: 'カレー', explanation: '"来週はカレーを作る予定です。"' },
      ],
    },
    {
      id: '6', title: '東京旅行', titleVi: 'Chuyến đi Tokyo', level: 'Elementary', language: 'ja',
      text: '先月、友達と東京に旅行しました。新幹線で3時間かかりました。東京はとても大きくて、人が多かったです。最初に浅草寺に行きました。とても古くて美しいお寺でした。次に秋葉原でアニメのグッズを買いました。夜は渋谷で有名なラーメン屋に行きました。味噌ラーメンを食べました。とてもおいしかったです。3日間の旅行でしたが、時間が足りませんでした。また行きたいです。',
      translation: 'Tháng trước, tôi đi du lịch Tokyo với bạn. Đi tàu shinkansen mất 3 tiếng. Tokyo rất lớn và đông người. Đầu tiên chúng tôi đến chùa Sensoji. Đó là ngôi chùa rất cổ và đẹp. Tiếp theo mua đồ anime ở Akihabara. Tối đi ăn ở quán ramen nổi tiếng ở Shibuya. Tôi ăn ramen miso. Rất ngon. Chuyến đi 3 ngày nhưng không đủ thời gian. Tôi muốn đi lại.',
      questions: [
        { question: '東京までどのくらいかかりましたか？', options: ['1時間', '2時間', '3時間', '4時間'], answer: '3時間', explanation: '"新幹線で3時間かかりました。"' },
        { question: '最初にどこに行きましたか？', options: ['秋葉原', '渋谷', '浅草寺', '東京タワー'], answer: '浅草寺', explanation: '"最初に浅草寺に行きました。"' },
        { question: '秋葉原で何をしましたか？', options: ['ラーメンを食べた', 'アニメのグッズを買った', '写真を撮った', '映画を見た'], answer: 'アニメのグッズを買った', explanation: '"秋葉原でアニメのグッズを買いました。"' },
        { question: '旅行は何日間でしたか？', options: ['2日間', '3日間', '4日間', '5日間'], answer: '3日間', explanation: '"3日間の旅行でしたが、時間が足りませんでした。"' },
      ],
    },
    {
      id: '7', title: '日本の四季', titleVi: 'Bốn mùa ở Nhật', level: 'Intermediate', language: 'ja',
      text: '日本には四つの季節があります。春は3月から5月までです。桜が咲いて、多くの人がお花見をします。夏は6月から8月までで、とても暑いです。夏祭りや花火大会があります。秋は9月から11月までです。紅葉がきれいで、食べ物もおいしい季節です。冬は12月から2月までで、寒いですが、北海道ではスキーができます。日本人は季節の変化をとても大切にしています。季節ごとに特別な食べ物や行事があります。',
      translation: 'Nhật Bản có bốn mùa. Mùa xuân từ tháng 3 đến tháng 5. Hoa anh đào nở và nhiều người đi ngắm hoa. Mùa hè từ tháng 6 đến tháng 8, rất nóng. Có lễ hội mùa hè và đại hội pháo hoa. Mùa thu từ tháng 9 đến tháng 11. Lá đỏ đẹp và đồ ăn cũng ngon. Mùa đông từ tháng 12 đến tháng 2, lạnh nhưng có thể trượt tuyết ở Hokkaido. Người Nhật rất coi trọng sự thay đổi của mùa. Mỗi mùa có đồ ăn và sự kiện đặc biệt.',
      questions: [
        { question: '春に何をしますか？', options: ['スキー', 'お花見', '花火大会', '紅葉狩り'], answer: 'お花見', explanation: '"桜が咲いて、多くの人がお花見をします。"' },
        { question: '夏のイベントは何ですか？', options: ['お花見', '紅葉狩り', '夏祭りや花火大会', 'スキー'], answer: '夏祭りや花火大会', explanation: '"夏祭りや花火大会があります。"' },
        { question: '秋の特徴は何ですか？', options: ['桜が咲く', '紅葉がきれい', '雪が降る', '暑い'], answer: '紅葉がきれい', explanation: '"紅葉がきれいで、食べ物もおいしい季節です。"' },
        { question: '冬に北海道で何ができますか？', options: ['お花見', '花火', 'スキー', '海水浴'], answer: 'スキー', explanation: '"北海道ではスキーができます。"' },
      ],
    },
  ],
  zh: [
    {
      id: '4', title: '我的学校', titleVi: 'Trường học của tôi', level: 'Beginner', language: 'zh',
      text: '我的学校很大。学校里有图书馆、食堂和运动场。我每天早上七点半到学校。上午有四节课，下午有两节课。我最喜欢的科目是数学和英语。午饭在食堂吃，食堂的菜很好吃。放学后，我和朋友一起打篮球。',
      translation: 'Trường tôi rất lớn. Trong trường có thư viện, nhà ăn và sân vận động. Tôi đến trường lúc 7:30 mỗi sáng. Buổi sáng có 4 tiết, buổi chiều có 2 tiết. Môn tôi thích nhất là toán và tiếng Anh. Ăn trưa ở nhà ăn, đồ ăn ở nhà ăn rất ngon. Sau giờ học, tôi chơi bóng rổ với bạn.',
      questions: [
        { question: '学校里有什么？', options: ['游泳池', '图书馆', '电影院', '公园'], answer: '图书馆', explanation: '"学校里有图书馆、食堂和运动场。"' },
        { question: '最喜欢的科目是什么？', options: ['语文和历史', '数学和英语', '体育和音乐', '科学和地理'], answer: '数学和英语', explanation: '"我最喜欢的科目是数学和英语。"' },
        { question: '放学后做什么？', options: ['看书', '打篮球', '游泳', '画画'], answer: '打篮球', explanation: '"放学后，我和朋友一起打篮球。"' },
      ],
    },
    {
      id: '8', title: '中国的春节', titleVi: 'Tết Nguyên Đán ở Trung Quốc', level: 'Elementary', language: 'zh',
      text: '春节是中国最重要的节日。每年一月或二月，全家人都会回家过年。除夕晚上，大家一起吃年夜饭。年夜饭有很多菜，比如鱼、饺子和年糕。吃完饭后，大家一起看春节晚会。晚上十二点，放烟花和鞭炮。大年初一，孩子们会收到红包。人们互相说"新年快乐"和"恭喜发财"。春节假期一般有七天。',
      translation: 'Tết Nguyên Đán là ngày lễ quan trọng nhất ở Trung Quốc. Mỗi năm vào tháng 1 hoặc 2, cả gia đình về nhà đón Tết. Đêm giao thừa, mọi người cùng ăn bữa tối tất niên. Bữa tối có nhiều món như cá, sủi cảo và bánh nếp. Ăn xong cùng xem chương trình đêm giao thừa. 12 giờ đêm bắn pháo hoa và đốt pháo. Mùng 1, trẻ em nhận lì xì. Mọi người chúc nhau "Chúc mừng năm mới" và "Cung hỷ phát tài". Kỳ nghỉ Tết thường 7 ngày.',
      questions: [
        { question: '春节在什么时候？', options: ['三月或四月', '一月或二月', '十一月或十二月', '五月或六月'], answer: '一月或二月', explanation: '"每年一月或二月，全家人都会回家过年。"' },
        { question: '年夜饭有什么菜？', options: ['面条和米饭', '鱼、饺子和年糕', '汉堡和薯条', '蛋糕和冰淇淋'], answer: '鱼、饺子和年糕', explanation: '"年夜饭有很多菜，比如鱼、饺子和年糕。"' },
        { question: '孩子们会收到什么？', options: ['玩具', '红包', '书', '糖果'], answer: '红包', explanation: '"大年初一，孩子们会收到红包。"' },
        { question: '春节假期有几天？', options: ['三天', '五天', '七天', '十天'], answer: '七天', explanation: '"春节假期一般有七天。"' },
      ],
    },
    {
      id: '9', title: '在中国坐高铁', titleVi: 'Đi tàu cao tốc ở Trung Quốc', level: 'Intermediate', language: 'zh',
      text: '中国的高铁非常发达。从北京到上海坐高铁只要四个半小时，速度可以达到每小时350公里。高铁站很大，像机场一样。坐高铁之前，需要先在网上买票，然后用身份证进站。车厢里很干净，座位也很舒服。有一等座和二等座，一等座更贵但是更宽敞。车上有WiFi，也可以买盒饭吃。很多中国人选择坐高铁而不是飞机，因为高铁更方便，不需要提前很久到站。',
      translation: 'Tàu cao tốc Trung Quốc rất phát triển. Từ Bắc Kinh đến Thượng Hải chỉ mất 4.5 tiếng, tốc độ có thể đạt 350km/h. Ga tàu rất lớn, giống sân bay. Trước khi đi cần mua vé online, rồi dùng CMND để vào ga. Toa tàu rất sạch, ghế ngồi thoải mái. Có ghế hạng nhất và hạng hai, hạng nhất đắt hơn nhưng rộng rãi hơn. Trên tàu có WiFi, cũng có thể mua cơm hộp. Nhiều người Trung Quốc chọn đi tàu cao tốc thay vì máy bay vì tiện hơn, không cần đến sớm.',
      questions: [
        { question: '从北京到上海坐高铁要多久？', options: ['两个小时', '三个小时', '四个半小时', '六个小时'], answer: '四个半小时', explanation: '"从北京到上海坐高铁只要四个半小时"' },
        { question: '高铁的速度是多少？', options: ['200公里/小时', '250公里/小时', '300公里/小时', '350公里/小时'], answer: '350公里/小时', explanation: '"速度可以达到每小时350公里。"' },
        { question: '坐高铁之前需要做什么？', options: ['打电话预约', '在网上买票', '去车站排队', '找旅行社'], answer: '在网上买票', explanation: '"需要先在网上买票，然后用身份证进站。"' },
        { question: '为什么很多人选择高铁？', options: ['更便宜', '更方便', '更快', '更安全'], answer: '更方便', explanation: '"因为高铁更方便，不需要提前很久到站。"' },
      ],
    },
  ],
  ko: [
    {
      id: '5', title: '나의 하루', titleVi: 'Một ngày của tôi', level: 'Beginner', language: 'ko',
      text: '저는 매일 아침 7시에 일어납니다. 아침을 먹고 8시에 학교에 갑니다. 학교에서 한국어와 수학을 공부합니다. 점심은 학교 식당에서 먹습니다. 오후 3시에 수업이 끝납니다. 방과 후에 친구와 카페에 갑니다. 저녁에는 집에서 드라마를 봅니다. 11시에 잡니다.',
      translation: 'Tôi dậy lúc 7 giờ mỗi sáng. Ăn sáng xong đi học lúc 8 giờ. Ở trường tôi học tiếng Hàn và toán. Ăn trưa ở nhà ăn trường. 3 giờ chiều hết giờ học. Sau giờ học đi cà phê với bạn. Buổi tối xem phim truyền hình ở nhà. 11 giờ đi ngủ.',
      questions: [
        { question: '몇 시에 일어납니까?', options: ['6시', '7시', '8시', '9시'], answer: '7시', explanation: '"매일 아침 7시에 일어납니다."' },
        { question: '방과 후에 무엇을 합니까?', options: ['운동', '카페에 감', '공부', '쇼핑'], answer: '카페에 감', explanation: '"방과 후에 친구와 카페에 갑니다."' },
        { question: '저녁에 무엇을 합니까?', options: ['공부', '운동', '드라마를 봄', '요리'], answer: '드라마를 봄', explanation: '"저녁에는 집에서 드라마를 봅니다."' },
      ],
    },
    {
      id: '10', title: '한국 음식', titleVi: 'Ẩm thực Hàn Quốc', level: 'Elementary', language: 'ko',
      text: '한국 음식은 세계적으로 유명합니다. 가장 유명한 음식은 김치입니다. 김치는 배추와 고춧가루로 만듭니다. 한국 사람들은 매일 김치를 먹습니다. 불고기도 인기가 많습니다. 불고기는 소고기를 양념에 재워서 구운 것입니다. 비빔밥은 밥 위에 여러 가지 야채와 고추장을 넣어서 비벼 먹습니다. 한국에서는 식사할 때 반찬이 많이 나옵니다. 반찬은 무료입니다. 한국 음식은 맵지만 아주 맛있습니다.',
      translation: 'Ẩm thực Hàn Quốc nổi tiếng thế giới. Món nổi tiếng nhất là kimchi. Kimchi làm từ cải thảo và ớt bột. Người Hàn ăn kimchi mỗi ngày. Bulgogi cũng rất phổ biến. Bulgogi là thịt bò ướp gia vị rồi nướng. Bibimbap là cơm trộn với nhiều loại rau và tương ớt. Ở Hàn Quốc khi ăn có nhiều món phụ. Món phụ miễn phí. Đồ ăn Hàn cay nhưng rất ngon.',
      questions: [
        { question: '가장 유명한 한국 음식은 무엇입니까?', options: ['불고기', '비빔밥', '김치', '떡볶이'], answer: '김치', explanation: '"가장 유명한 음식은 김치입니다."' },
        { question: '김치는 무엇으로 만듭니까?', options: ['소고기와 양념', '배추와 고춧가루', '밥과 야채', '면과 국물'], answer: '배추와 고춧가루', explanation: '"김치는 배추와 고춧가루로 만듭니다."' },
        { question: '반찬에 대해 맞는 것은?', options: ['비쌉니다', '무료입니다', '하나만 나옵니다', '주문해야 합니다'], answer: '무료입니다', explanation: '"반찬은 무료입니다."' },
        { question: '비빔밥은 어떻게 먹습니까?', options: ['구워서', '끓여서', '비벼서', '튀겨서'], answer: '비벼서', explanation: '"고추장을 넣어서 비벼 먹습니다."' },
      ],
    },
    {
      id: '11', title: '서울 여행 가이드', titleVi: 'Hướng dẫn du lịch Seoul', level: 'Intermediate', language: 'ko',
      text: '서울은 한국의 수도이고 약 천만 명이 살고 있습니다. 서울에는 볼 것이 많습니다. 경복궁은 조선 시대의 궁궐로 한복을 입으면 무료로 입장할 수 있습니다. 명동은 쇼핑하기 좋은 곳입니다. 화장품과 옷 가게가 많습니다. 홍대는 젊은 사람들이 많이 가는 곳으로 카페와 클럽이 많습니다. 남산타워에서는 서울 전체를 볼 수 있습니다. 지하철이 편리해서 어디든 쉽게 갈 수 있습니다. 교통카드를 사면 버스와 지하철을 모두 탈 수 있습니다.',
      translation: 'Seoul là thủ đô Hàn Quốc với khoảng 10 triệu dân. Seoul có nhiều thứ để xem. Cung Gyeongbok là cung điện thời Joseon, mặc hanbok được vào miễn phí. Myeongdong là nơi mua sắm tốt, có nhiều cửa hàng mỹ phẩm và quần áo. Hongdae là nơi giới trẻ hay đến, nhiều quán cà phê và club. Từ tháp Namsan có thể nhìn toàn bộ Seoul. Tàu điện ngầm tiện lợi nên đi đâu cũng dễ. Mua thẻ giao thông có thể đi cả bus và tàu điện ngầm.',
      questions: [
        { question: '서울의 인구는 약 얼마입니까?', options: ['오백만 명', '천만 명', '이천만 명', '삼천만 명'], answer: '천만 명', explanation: '"약 천만 명이 살고 있습니다."' },
        { question: '경복궁에 무료로 입장하려면?', options: ['학생증이 필요', '한복을 입으면', '아침에 가면', '인터넷 예약'], answer: '한복을 입으면', explanation: '"한복을 입으면 무료로 입장할 수 있습니다."' },
        { question: '홍대의 특징은 무엇입니까?', options: ['궁궐이 있다', '젊은 사람들이 많다', '산이 있다', '시장이 있다'], answer: '젊은 사람들이 많다', explanation: '"홍대는 젊은 사람들이 많이 가는 곳"' },
        { question: '교통카드로 무엇을 탈 수 있습니까?', options: ['택시만', '버스만', '지하철만', '버스와 지하철'], answer: '버스와 지하철', explanation: '"교통카드를 사면 버스와 지하철을 모두 탈 수 있습니다."' },
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

export default function ReadingPage() {
  const [selectedLang, setSelectedLang] = useState('en');
  const [selectedPassage, setSelectedPassage] = useState<ReadingPassage | null>(null);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [showTranslation, setShowTranslation] = useState(false);

  const currentPassages = passages[selectedLang] || [];

  const selectAnswer = (qIndex: number, answer: string) => {
    if (showResults) return;
    setAnswers(prev => ({ ...prev, [qIndex]: answer }));
  };

  const checkAnswers = () => setShowResults(true);

  const getScore = () => {
    if (!selectedPassage) return 0;
    let correct = 0;
    selectedPassage.questions.forEach((q, i) => {
      if (answers[i] === q.answer) correct++;
    });
    return correct;
  };

  const resetPassage = () => {
    setAnswers({});
    setShowResults(false);
    setShowTranslation(false);
  };

  if (!selectedPassage) {
    return (
      <div className="max-w-3xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold font-display">Đọc hiểu</h1>
          <p className="text-muted-foreground mt-1">Đọc bài văn và trả lời câu hỏi</p>
        </div>

        <div className="flex gap-2 flex-wrap">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => setSelectedLang(lang.code)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl border-2 transition-all ${
                selectedLang === lang.code
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary-200'
              }`}
            >
              <span>{lang.flag}</span>
              <span className="text-sm font-medium">{lang.name}</span>
            </button>
          ))}
        </div>

        <div className="grid gap-4">
          {currentPassages.map((passage) => (
            <button
              key={passage.id}
              onClick={() => { setSelectedPassage(passage); resetPassage(); }}
              className="p-5 rounded-2xl bg-card border border text-left hover:border-primary-300 hover:shadow-md transition-all"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-lg">{passage.title}</h3>
                  <p className="text-sm text-muted-foreground mt-0.5">{passage.titleVi}</p>
                </div>
                <span className="text-xs px-2 py-1 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 font-medium">
                  {passage.level}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-2">{passage.questions.length} câu hỏi</p>
            </button>
          ))}
        </div>

        {currentPassages.length === 0 && (
          <div className="text-center py-12">
            <div className="text-4xl mb-3">📖</div>
            <p className="text-muted-foreground">Chưa có bài đọc cho ngôn ngữ này.</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <button onClick={() => setSelectedPassage(null)} className="text-sm text-primary hover:underline">← Quay lại</button>
        <span className="text-xs px-2 py-1 rounded-full bg-primary-100 text-primary-700 font-medium">{selectedPassage.level}</span>
      </div>

      {/* Passage */}
      <div className="p-6 rounded-2xl bg-card border border">
        <h2 className="font-bold text-lg mb-3">{selectedPassage.title}</h2>
        <p className="text-base leading-relaxed whitespace-pre-line">{selectedPassage.text}</p>
        {showTranslation && (
          <p className="text-sm text-muted-foreground mt-4 pt-4 border-t border italic">
            {selectedPassage.translation}
          </p>
        )}
        <button
          onClick={() => setShowTranslation(!showTranslation)}
          className="text-xs text-primary hover:underline mt-3"
        >
          {showTranslation ? 'Ẩn bản dịch' : 'Xem bản dịch'}
        </button>
      </div>

      {/* Questions */}
      <div className="space-y-4">
        <h3 className="font-semibold">Câu hỏi:</h3>
        {selectedPassage.questions.map((q, qIndex) => (
          <div key={qIndex} className="p-4 rounded-xl bg-card border border">
            <p className="font-medium text-sm mb-3">{qIndex + 1}. {q.question}</p>
            <div className="grid grid-cols-2 gap-2">
              {q.options.map((option) => {
                let styles = 'border-border hover:border-primary-300';
                if (showResults) {
                  if (option === q.answer) {
                    styles = 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700';
                  } else if (option === answers[qIndex] && option !== q.answer) {
                    styles = 'border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700';
                  } else {
                    styles = 'border-border opacity-50';
                  }
                } else if (answers[qIndex] === option) {
                  styles = 'border-primary bg-primary/5';
                }

                return (
                  <button
                    key={option}
                    onClick={() => selectAnswer(qIndex, option)}
                    disabled={showResults}
                    className={`p-3 rounded-lg border-2 text-sm text-left transition-all ${styles}`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
            {showResults && answers[qIndex] !== q.answer && (
              <p className="text-xs text-muted-foreground mt-2 italic">{q.explanation}</p>
            )}
          </div>
        ))}
      </div>

      {/* Actions */}
      {!showResults ? (
        <Button
          onClick={checkAnswers}
          disabled={Object.keys(answers).length < selectedPassage.questions.length}
          className="w-full"
        >
          Kiểm tra ({Object.keys(answers).length}/{selectedPassage.questions.length} đã trả lời)
        </Button>
      ) : (
        <div className="p-4 rounded-xl bg-card border border text-center">
          <p className="text-lg font-bold">
            Kết quả: {getScore()}/{selectedPassage.questions.length}
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            {getScore() === selectedPassage.questions.length ? 'Hoàn hảo!' : 'Hãy đọc lại bài và thử lại!'}
          </p>
          <div className="flex gap-3 justify-center mt-3">
            <Button variant="outline" onClick={resetPassage}>Thử lại</Button>
            <Button onClick={() => setSelectedPassage(null)}>Bài khác</Button>
          </div>
        </div>
      )}
    </div>
  );
}
