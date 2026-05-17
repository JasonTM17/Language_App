'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';

interface ConversationScenario {
  id: string;
  title: string;
  titleVi: string;
  context: string;
  language: string;
  messages: { role: 'system' | 'user' | 'bot'; text: string; translation: string }[];
  userOptions: string[][];
}

const scenarios: Record<string, ConversationScenario[]> = {
  en: [
    {
      id: '1', title: 'At a Restaurant', titleVi: 'Ở nhà hàng', language: 'en',
      context: 'You are at a restaurant and want to order food.',
      messages: [
        { role: 'bot', text: 'Good evening! Welcome to our restaurant. Table for how many?', translation: 'Chào buổi tối! Chào mừng đến nhà hàng. Bàn cho mấy người?' },
      ],
      userOptions: [
        ['Table for two, please.', 'Just one, thank you.', 'We are a group of four.'],
        ['Can I see the menu, please?', 'What do you recommend?', 'Do you have any specials today?'],
        ['I would like the grilled chicken.', 'Can I have the pasta?', 'I will have the fish and chips.'],
        ['Just water, please.', 'A glass of orange juice.', 'Can I have a coffee?'],
        ['Yes, that will be all. Thank you!', 'Actually, can I also get dessert?', 'No, thank you. Just the bill please.'],
      ],
    },
    {
      id: '2', title: 'Asking for Directions', titleVi: 'Hỏi đường', language: 'en',
      context: 'You are lost and need to find the train station.',
      messages: [
        { role: 'bot', text: 'Hi there! You look a bit lost. Can I help you?', translation: 'Chào! Bạn có vẻ bị lạc. Tôi giúp được gì?' },
      ],
      userOptions: [
        ['Yes, please! How do I get to the train station?', 'Excuse me, where is the nearest bus stop?', 'Can you help me find a taxi?'],
        ['Is it far from here?', 'How long does it take to walk?', 'Should I take a bus?'],
        ['Turn left or right at the traffic light?', 'Is it on this street?', 'Can you show me on the map?'],
        ['Thank you so much for your help!', 'Got it, thanks!', 'I appreciate it. Have a nice day!'],
      ],
    },
    {
      id: '6', title: 'At the Doctor', titleVi: 'Ở phòng khám', language: 'en',
      context: 'You are visiting a doctor because you feel sick.',
      messages: [
        { role: 'bot', text: 'Good morning. What seems to be the problem today?', translation: 'Chào buổi sáng. Hôm nay bạn có vấn đề gì?' },
      ],
      userOptions: [
        ['I have a headache and a sore throat.', 'I have been coughing for three days.', 'My stomach hurts since yesterday.'],
        ['It started about three days ago.', 'Since last night.', 'About a week ago.'],
        ['No, I have not taken any medicine.', 'I took some paracetamol.', 'I tried some herbal tea.'],
        ['Yes, I am allergic to penicillin.', 'No, I do not have any allergies.', 'I am not sure.'],
        ['Thank you, doctor. I will follow your advice.', 'Should I come back if it does not improve?', 'How many times a day should I take the medicine?'],
      ],
    },
  ],
  ja: [
    {
      id: '3', title: 'コンビニで (At a Convenience Store)', titleVi: 'Ở cửa hàng tiện lợi', language: 'ja',
      context: 'You are buying items at a Japanese convenience store.',
      messages: [
        { role: 'bot', text: 'いらっしゃいませ！', translation: 'Xin chào quý khách!' },
      ],
      userOptions: [
        ['すみません、おにぎりはどこですか？', 'お弁当はありますか？', 'トイレはどこですか？'],
        ['これをください。', 'これとこれをお願いします。', '温めてもらえますか？'],
        ['袋はいりません。', '袋をお願いします。', 'お箸をください。'],
        ['ありがとうございます！', 'おつりはいりません。', 'レシートはいりません。'],
      ],
    },
    {
      id: '7', title: '電車で (On the Train)', titleVi: 'Trên tàu điện', language: 'ja',
      context: 'You need help navigating the train system in Japan.',
      messages: [
        { role: 'bot', text: 'すみません、何かお困りですか？', translation: 'Xin lỗi, bạn cần giúp gì không?' },
      ],
      userOptions: [
        ['渋谷駅に行きたいんですが。', '新宿まで何分かかりますか？', 'この電車は東京駅に止まりますか？'],
        ['乗り換えは必要ですか？', '何番線ですか？', '次の電車は何時ですか？'],
        ['切符はどこで買えますか？', 'ICカードは使えますか？', '片道いくらですか？'],
        ['ありがとうございます！助かりました。', 'わかりました。ありがとう！', 'とても親切ですね。感謝します。'],
      ],
    },
  ],
  zh: [
    {
      id: '4', title: '在咖啡店 (At a Coffee Shop)', titleVi: 'Ở quán cà phê', language: 'zh',
      context: 'You are ordering coffee at a Chinese coffee shop.',
      messages: [
        { role: 'bot', text: '欢迎光临！请问您要点什么？', translation: 'Chào mừng! Bạn muốn gọi gì?' },
      ],
      userOptions: [
        ['我要一杯美式咖啡。', '请给我一杯拿铁。', '有什么推荐的吗？'],
        ['大杯的。', '中杯就好。', '小杯的，谢谢。'],
        ['热的，谢谢。', '冰的，谢谢。', '温的可以吗？'],
        ['在这里喝。', '带走。', '可以打包吗？'],
        ['谢谢！', '多少钱？', '可以用手机支付吗？'],
      ],
    },
    {
      id: '8', title: '在超市 (At the Supermarket)', titleVi: 'Ở siêu thị', language: 'zh',
      context: 'You are shopping at a supermarket and need help finding items.',
      messages: [
        { role: 'bot', text: '您好！需要帮忙吗？', translation: 'Xin chào! Cần giúp gì không?' },
      ],
      userOptions: [
        ['请问牛奶在哪里？', '我找不到水果区。', '洗发水在哪个区域？'],
        ['有没有打折的？', '这个多少钱？', '有更大包装的吗？'],
        ['我要一个塑料袋。', '不用袋子，谢谢。', '可以给我两个袋子吗？'],
        ['可以刷卡吗？', '我用微信支付。', '可以用现金吗？'],
        ['谢谢你的帮助！', '再见！', '祝你工作愉快！'],
      ],
    },
  ],
  ko: [
    {
      id: '5', title: '카페에서 (At a Cafe)', titleVi: 'Ở quán cà phê', language: 'ko',
      context: 'You are ordering at a Korean cafe.',
      messages: [
        { role: 'bot', text: '어서오세요! 주문하시겠어요?', translation: 'Xin chào! Bạn muốn gọi gì?' },
      ],
      userOptions: [
        ['아메리카노 한 잔 주세요.', '카페라떼 주세요.', '메뉴 좀 볼게요.'],
        ['큰 사이즈로 주세요.', '작은 사이즈로 주세요.', '보통 사이즈로 주세요.'],
        ['뜨거운 걸로 주세요.', '아이스로 주세요.', '미지근하게 해주세요.'],
        ['여기서 마실게요.', '포장해 주세요.', '테이크아웃이요.'],
        ['감사합니다!', '얼마예요?', '카드로 결제할게요.'],
      ],
    },
    {
      id: '9', title: '쇼핑할 때 (Shopping)', titleVi: 'Khi mua sắm', language: 'ko',
      context: 'You are shopping for clothes at a Korean store.',
      messages: [
        { role: 'bot', text: '안녕하세요! 뭐 찾으시는 거 있으세요?', translation: 'Xin chào! Bạn đang tìm gì ạ?' },
      ],
      userOptions: [
        ['티셔츠를 찾고 있어요.', '선물을 사고 싶어요.', '그냥 구경하고 있어요.'],
        ['이거 다른 색상 있어요?', '이거 사이즈가 어떻게 돼요?', '이거 입어봐도 돼요?'],
        ['좀 더 큰 사이즈 있어요?', '다른 디자인 보여주세요.', '이거 잘 어울려요?'],
        ['이거 얼마예요?', '할인되나요?', '세일 중인 거 있어요?'],
        ['이거로 할게요.', '좀 더 생각해볼게요.', '카드로 결제할게요.'],
      ],
    },
  ],
};

const botResponses: Record<string, string[][]> = {
  '1': [
    ['Right this way! Here is your table.', 'Mời đi theo tôi! Đây là bàn của bạn.'],
    ['Here is the menu. I will give you a few minutes.', 'Đây là thực đơn. Tôi sẽ cho bạn vài phút.'],
    ['Excellent choice! And what would you like to drink?', 'Lựa chọn tuyệt vời! Bạn muốn uống gì?'],
    ['Perfect. Your order will be ready in about 15 minutes.', 'Hoàn hảo. Đơn hàng sẽ sẵn sàng trong khoảng 15 phút.'],
    ['Thank you for dining with us! Have a wonderful evening.', 'Cảm ơn bạn đã dùng bữa! Chúc buổi tối vui vẻ.'],
  ],
  '2': [
    ['Sure! The train station is about 10 minutes walk from here.', 'Được! Nhà ga cách đây khoảng 10 phút đi bộ.'],
    ['It is not too far. Go straight and turn left at the traffic light.', 'Không xa lắm. Đi thẳng rồi rẽ trái ở đèn giao thông.'],
    ['Turn left, then you will see it on your right side.', 'Rẽ trái, rồi bạn sẽ thấy nó bên phải.'],
    ['You are welcome! Good luck!', 'Không có gì! Chúc may mắn!'],
  ],
  '3': [
    ['おにぎりはあちらの棚にあります。', 'Onigiri ở kệ bên kia.'],
    ['かしこまりました。温めますか？', 'Vâng ạ. Bạn muốn hâm nóng không?'],
    ['はい、わかりました。', 'Vâng, tôi hiểu rồi.'],
    ['ありがとうございました！またお越しください。', 'Cảm ơn! Hẹn gặp lại!'],
  ],
  '4': [
    ['好的，美式咖啡。要什么杯型？', 'Được, americano. Bạn muốn size nào?'],
    ['好的。要热的还是冰的？', 'Được. Nóng hay đá?'],
    ['好的。在这里喝还是带走？', 'Được. Uống tại đây hay mang đi?'],
    ['好的，请稍等。', 'Được, xin chờ một chút.'],
    ['一共25块。谢谢光临！', 'Tổng cộng 25 tệ. Cảm ơn!'],
  ],
  '5': [
    ['네, 사이즈는요?', 'Vâng, size nào ạ?'],
    ['알겠습니다. 뜨거운 걸로 드릴까요, 아이스로 드릴까요?', 'Vâng. Nóng hay đá ạ?'],
    ['네. 매장에서 드시나요, 포장하시나요?', 'Vâng. Uống tại đây hay mang đi ạ?'],
    ['잠시만 기다려주세요.', 'Xin chờ một chút.'],
    ['4,500원입니다. 감사합니다!', '4.500 won ạ. Cảm ơn!'],
  ],
  '6': [
    ['I see. How long have you been feeling this way?', 'Tôi hiểu. Bạn cảm thấy như vậy bao lâu rồi?'],
    ['Have you taken any medicine for it?', 'Bạn đã uống thuốc gì chưa?'],
    ['Do you have any allergies to medication?', 'Bạn có dị ứng thuốc gì không?'],
    ['I will prescribe some medicine. Take it twice a day after meals.', 'Tôi sẽ kê đơn thuốc. Uống 2 lần/ngày sau bữa ăn.'],
    ['If it does not improve in 3 days, please come back. Get well soon!', 'Nếu không đỡ trong 3 ngày, hãy quay lại. Chúc mau khỏe!'],
  ],
  '7': [
    ['渋谷駅ですね。山手線に乗ってください。', 'Ga Shibuya nhé. Hãy đi tuyến Yamanote.'],
    ['乗り換えなしで行けますよ。3駅目です。', 'Không cần chuyển tàu. Ga thứ 3.'],
    ['ICカードが使えますよ。改札でタッチしてください。', 'Dùng được thẻ IC. Chạm ở cổng soát vé.'],
    ['どういたしまして！良い旅を！', 'Không có gì! Chúc chuyến đi vui!'],
  ],
  '8': [
    ['牛奶在冷藏区，往前走右转就到了。', 'Sữa ở khu lạnh, đi thẳng rẽ phải là đến.'],
    ['这个今天打八折，很划算。', 'Cái này hôm nay giảm 20%, rất hời.'],
    ['好的，给您袋子。', 'Được, đây là túi cho bạn.'],
    ['都可以，刷卡和手机支付都行。', 'Đều được, thẻ và thanh toán điện thoại đều OK.'],
    ['不客气！欢迎下次再来！', 'Không có gì! Hẹn gặp lại!'],
  ],
  '9': [
    ['네, 이쪽에 있어요. 따라오세요.', 'Vâng, ở bên này. Mời đi theo.'],
    ['이 색상은 흰색, 검정, 파란색이 있어요.', 'Màu này có trắng, đen, xanh dương.'],
    ['네, 이 사이즈 한번 입어보세요. 탈의실은 저쪽이에요.', 'Vâng, thử size này. Phòng thay đồ ở kia.'],
    ['원래 39,000원인데 지금 30% 할인 중이에요.', 'Giá gốc 39.000 won, đang giảm 30%.'],
    ['네, 결제 도와드릴게요. 감사합니다!', 'Vâng, để tôi thanh toán. Cảm ơn!'],
  ],
};

const languages = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
  { code: 'zh', name: 'Chinese', flag: '🇨🇳' },
  { code: 'ko', name: 'Korean', flag: '🇰🇷' },
];

export default function ConversationPage() {
  const [selectedLang, setSelectedLang] = useState('en');
  const [selectedScenario, setSelectedScenario] = useState<ConversationScenario | null>(null);
  const [chatMessages, setChatMessages] = useState<{ role: string; text: string; translation: string }[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [completed, setCompleted] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const currentScenarios = scenarios[selectedLang] || [];

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const startScenario = (scenario: ConversationScenario) => {
    setSelectedScenario(scenario);
    setChatMessages([...scenario.messages]);
    setCurrentStep(0);
    setCompleted(false);
  };

  const selectOption = (option: string) => {
    if (!selectedScenario) return;

    setChatMessages(prev => [...prev, { role: 'user', text: option, translation: '' }]);

    const responses = botResponses[selectedScenario.id];
    if (responses && responses[currentStep]) {
      setTimeout(() => {
        setChatMessages(prev => [...prev, {
          role: 'bot',
          text: responses[currentStep][0],
          translation: responses[currentStep][1],
        }]);
      }, 800);
    }

    const nextStep = currentStep + 1;
    if (nextStep >= selectedScenario.userOptions.length) {
      setCompleted(true);
    } else {
      setCurrentStep(nextStep);
    }
  };

  const backToList = () => {
    setSelectedScenario(null);
    setChatMessages([]);
    setCompleted(false);
  };

  if (!selectedScenario) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-3xl mx-auto space-y-6"
      >
        <div>
          <h1 className="text-2xl font-bold font-display">Hội thoại</h1>
          <p className="text-muted-foreground mt-1">Luyện tập hội thoại theo tình huống thực tế</p>
        </div>

        <div className="flex gap-2 flex-wrap">
          {languages.map((lang, index) => (
            <motion.button
              key={lang.code}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(index * 0.05, 0.3) }}
              onClick={() => setSelectedLang(lang.code)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl border-2 transition-all ${
                selectedLang === lang.code
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary-200'
              }`}
            >
              <span>{lang.flag}</span>
              <span className="text-sm font-medium">{lang.name}</span>
            </motion.button>
          ))}
        </div>

        <div className="grid gap-4">
          {currentScenarios.map((scenario, index) => (
            <motion.button
              key={scenario.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(index * 0.05, 0.3) }}
              onClick={() => startScenario(scenario)}
              className="p-5 rounded-2xl bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-900/80 dark:to-gray-800/50 border border-border/60 backdrop-blur-sm shadow-lg shadow-purple-500/5 text-left hover:border-primary-300 hover:shadow-md transition-all"
            >
              <h3 className="font-semibold text-lg">{scenario.title}</h3>
              <p className="text-sm text-muted-foreground mt-0.5">{scenario.titleVi}</p>
              <p className="text-xs text-muted-foreground mt-2">{scenario.context}</p>
            </motion.button>
          ))}
        </div>

        {currentScenarios.length === 0 && (
          <div className="text-center py-12">
            <div className="flex justify-center mb-3">
              <MessageCircle className="w-10 h-10 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground">Chưa có kịch bản hội thoại cho ngôn ngữ này.</p>
          </div>
        )}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-2xl mx-auto space-y-4"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <button onClick={backToList} className="text-sm text-primary hover:underline">← Quay lại</button>
        <span className="text-sm text-muted-foreground">{selectedScenario.title}</span>
      </div>

      {/* Context */}
      <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800">
        <p className="text-xs text-blue-700 dark:text-blue-300">{selectedScenario.context}</p>
      </div>

      {/* Chat messages */}
      <div className="space-y-3 min-h-[300px] max-h-[400px] overflow-y-auto p-4 rounded-2xl bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-900/80 dark:to-gray-800/50 border border-border/60 backdrop-blur-sm shadow-lg shadow-purple-500/5">
        <AnimatePresence initial={false}>
          {chatMessages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[80%] p-3 rounded-2xl ${
                msg.role === 'user'
                  ? 'bg-primary text-white rounded-br-md'
                  : 'bg-card border border-border rounded-bl-md'
              }`}>
                <p className="text-sm">{msg.text}</p>
                {msg.translation && msg.role !== 'user' && (
                  <p className={`text-xs mt-1 ${msg.role === 'user' ? 'text-primary-100' : 'text-muted-foreground'}`}>
                    {msg.translation}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={chatEndRef} />
      </div>

      {/* User options */}
      {!completed && selectedScenario.userOptions[currentStep] && (
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground font-medium">Chọn câu trả lời:</p>
          {selectedScenario.userOptions[currentStep].map((option, i) => (
            <motion.button
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: Math.min(i * 0.05, 0.3) }}
              onClick={() => selectOption(option)}
              className="w-full p-3 rounded-xl border-2 border-border text-left text-sm font-medium hover:border-primary-300 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all"
            >
              {option}
            </motion.button>
          ))}
        </div>
      )}

      {/* Completed */}
      <AnimatePresence>
        {completed && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="p-5 rounded-2xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-center"
          >
            <p className="text-lg font-bold text-green-700 dark:text-green-300">Hoàn thành hội thoại!</p>
            <p className="text-sm text-green-600 dark:text-green-400 mt-1">Bạn đã hoàn thành tình huống này.</p>
            <div className="flex gap-3 justify-center mt-4">
              <Button variant="outline" onClick={() => startScenario(selectedScenario)}>Thử lại</Button>
              <Button onClick={backToList}>Chọn tình huống khác</Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
