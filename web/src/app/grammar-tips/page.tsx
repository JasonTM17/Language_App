'use client';

import { useState } from 'react';

interface GrammarTip {
  id: string;
  title: string;
  titleVi: string;
  level: string;
  content: string;
  examples: { sentence: string; translation: string }[];
}

const tips: Record<string, GrammarTip[]> = {
  en: [
    {
      id: '1', title: 'Present Simple', titleVi: 'Thì hiện tại đơn', level: 'Beginner',
      content: 'Dùng để diễn tả thói quen, sự thật hiển nhiên, hoặc hành động lặp lại.\n\nCấu trúc: S + V(s/es) + O\n- Khẳng định: I/You/We/They + V | He/She/It + V(s/es)\n- Phủ định: S + do/does + not + V\n- Nghi vấn: Do/Does + S + V?',
      examples: [
        { sentence: 'I go to school every day.', translation: 'Tôi đi học mỗi ngày.' },
        { sentence: 'She works at a hospital.', translation: 'Cô ấy làm việc ở bệnh viện.' },
        { sentence: 'They don\'t like coffee.', translation: 'Họ không thích cà phê.' },
      ],
    },
    {
      id: '2', title: 'Present Continuous', titleVi: 'Thì hiện tại tiếp diễn', level: 'Beginner',
      content: 'Dùng để diễn tả hành động đang xảy ra tại thời điểm nói.\n\nCấu trúc: S + am/is/are + V-ing\n- Khẳng định: I am / He is / They are + V-ing\n- Phủ định: S + am/is/are + not + V-ing\n- Nghi vấn: Am/Is/Are + S + V-ing?',
      examples: [
        { sentence: 'I am studying English now.', translation: 'Tôi đang học tiếng Anh.' },
        { sentence: 'She is cooking dinner.', translation: 'Cô ấy đang nấu bữa tối.' },
        { sentence: 'Are you listening to me?', translation: 'Bạn có đang nghe tôi không?' },
      ],
    },
    {
      id: '3', title: 'Past Simple', titleVi: 'Thì quá khứ đơn', level: 'Beginner',
      content: 'Dùng để diễn tả hành động đã xảy ra và kết thúc trong quá khứ.\n\nCấu trúc: S + V(ed/V2) + O\n- Khẳng định: S + V-ed (regular) / V2 (irregular)\n- Phủ định: S + did not + V\n- Nghi vấn: Did + S + V?',
      examples: [
        { sentence: 'I went to the park yesterday.', translation: 'Tôi đã đi công viên hôm qua.' },
        { sentence: 'She didn\'t call me.', translation: 'Cô ấy không gọi cho tôi.' },
        { sentence: 'Did you eat breakfast?', translation: 'Bạn đã ăn sáng chưa?' },
      ],
    },
    {
      id: '4', title: 'Comparatives & Superlatives', titleVi: 'So sánh hơn & nhất', level: 'Elementary',
      content: 'So sánh hơn: dùng để so sánh 2 đối tượng.\nSo sánh nhất: dùng để so sánh 3+ đối tượng.\n\n- Tính từ ngắn: adj-er / the adj-est\n- Tính từ dài: more adj / the most adj\n- Bất quy tắc: good → better → best, bad → worse → worst',
      examples: [
        { sentence: 'She is taller than me.', translation: 'Cô ấy cao hơn tôi.' },
        { sentence: 'This is the most beautiful city.', translation: 'Đây là thành phố đẹp nhất.' },
        { sentence: 'English is easier than Chinese.', translation: 'Tiếng Anh dễ hơn tiếng Trung.' },
      ],
    },
    {
      id: '5', title: 'Present Perfect', titleVi: 'Thì hiện tại hoàn thành', level: 'Elementary',
      content: 'Dùng để diễn tả hành động đã xảy ra nhưng có liên quan đến hiện tại, hoặc kinh nghiệm.\n\nCấu trúc: S + have/has + V3 (past participle)\n- Dấu hiệu: already, yet, just, ever, never, since, for',
      examples: [
        { sentence: 'I have lived here for 5 years.', translation: 'Tôi đã sống ở đây 5 năm.' },
        { sentence: 'Have you ever been to Japan?', translation: 'Bạn đã bao giờ đến Nhật chưa?' },
        { sentence: 'She has just finished her homework.', translation: 'Cô ấy vừa làm xong bài tập.' },
      ],
    },
    {
      id: '6', title: 'Conditionals (If clauses)', titleVi: 'Câu điều kiện', level: 'Intermediate',
      content: 'Type 0: If + present, present (sự thật)\nType 1: If + present, will + V (có thể xảy ra)\nType 2: If + past, would + V (không có thật ở hiện tại)\nType 3: If + past perfect, would have + V3 (không có thật ở quá khứ)',
      examples: [
        { sentence: 'If it rains, I will stay home.', translation: 'Nếu trời mưa, tôi sẽ ở nhà.' },
        { sentence: 'If I were rich, I would travel the world.', translation: 'Nếu tôi giàu, tôi sẽ đi du lịch thế giới.' },
        { sentence: 'If I had studied harder, I would have passed.', translation: 'Nếu tôi học chăm hơn, tôi đã đỗ rồi.' },
      ],
    },
  ],
  ja: [
    {
      id: '7', title: 'Particles は/が', titleVi: 'Trợ từ は và が', level: 'Beginner',
      content: 'は (wa): Đánh dấu chủ đề của câu - "nói về cái gì"\nが (ga): Đánh dấu chủ ngữ - "ai/cái gì làm"\n\nQuy tắc:\n- は dùng khi giới thiệu thông tin đã biết\n- が dùng khi giới thiệu thông tin mới\n- が dùng sau từ nghi vấn (誰が, 何が)',
      examples: [
        { sentence: '私は学生です。', translation: 'Tôi là sinh viên. (nói về tôi)' },
        { sentence: '誰が来ましたか。', translation: 'Ai đã đến? (hỏi chủ ngữ)' },
        { sentence: '猫が好きです。', translation: 'Tôi thích mèo. (mèo là đối tượng thích)' },
      ],
    },
    {
      id: '8', title: 'て-form (Te-form)', titleVi: 'Thể て', level: 'Beginner',
      content: 'Thể て là dạng nối động từ, dùng để:\n- Nối hành động: 食べて、寝る (ăn rồi ngủ)\n- Yêu cầu: 見てください (xin hãy nhìn)\n- Đang làm: 食べている (đang ăn)\n\nCách chia:\n- う/つ/る → って\n- む/ぶ/ぬ → んで\n- く → いて, ぐ → いで\n- す → して',
      examples: [
        { sentence: '食べてください。', translation: 'Xin hãy ăn.' },
        { sentence: '本を読んでいます。', translation: 'Tôi đang đọc sách.' },
        { sentence: '起きて、顔を洗います。', translation: 'Dậy rồi rửa mặt.' },
      ],
    },
  ],
  zh: [
    {
      id: '9', title: 'Sentence Structure', titleVi: 'Cấu trúc câu cơ bản', level: 'Beginner',
      content: 'Tiếng Trung có cấu trúc SVO giống tiếng Việt:\n主语 + 谓语 + 宾语 (Chủ ngữ + Vị ngữ + Tân ngữ)\n\nPhủ định: thêm 不 (bù) trước động từ\nNghi vấn: thêm 吗 (ma) cuối câu, hoặc dùng 什么/哪里/谁',
      examples: [
        { sentence: '我是学生。', translation: 'Tôi là sinh viên.' },
        { sentence: '他不喝咖啡。', translation: 'Anh ấy không uống cà phê.' },
        { sentence: '你去哪里？', translation: 'Bạn đi đâu?' },
      ],
    },
    {
      id: '10', title: 'Measure Words (量词)', titleVi: 'Lượng từ', level: 'Beginner',
      content: 'Tiếng Trung bắt buộc dùng lượng từ giữa số đếm và danh từ:\n数字 + 量词 + 名词\n\nLượng từ phổ biến:\n- 个 (gè): chung, dùng cho người/vật\n- 本 (běn): sách, vở\n- 杯 (bēi): ly, cốc\n- 只 (zhī): con vật nhỏ\n- 件 (jiàn): quần áo, sự việc',
      examples: [
        { sentence: '一个人', translation: 'Một người' },
        { sentence: '三本书', translation: 'Ba quyển sách' },
        { sentence: '两杯咖啡', translation: 'Hai ly cà phê' },
      ],
    },
  ],
  ko: [
    {
      id: '11', title: 'Sentence Endings', titleVi: 'Đuôi câu kính ngữ', level: 'Beginner',
      content: 'Tiếng Hàn có nhiều cấp độ kính ngữ:\n\n- 합니다/합니까 (formal): dùng trong công việc, với người lớn tuổi\n- 해요/해요? (polite): dùng hàng ngày, lịch sự\n- 해/해? (casual): dùng với bạn bè, người nhỏ tuổi hơn\n\nĐộng từ 하다 (làm):\n- 합니다 (formal)\n- 해요 (polite)\n- 해 (casual)',
      examples: [
        { sentence: '감사합니다.', translation: 'Cảm ơn. (formal)' },
        { sentence: '뭐 해요?', translation: 'Bạn đang làm gì? (polite)' },
        { sentence: '밥 먹었어?', translation: 'Ăn cơm chưa? (casual)' },
      ],
    },
    {
      id: '12', title: 'Particles 은/는 & 이/가', titleVi: 'Trợ từ chủ đề và chủ ngữ', level: 'Beginner',
      content: '은/는: Đánh dấu chủ đề (topic marker)\n- 은 sau phụ âm, 는 sau nguyên âm\n\n이/가: Đánh dấu chủ ngữ (subject marker)\n- 이 sau phụ âm, 가 sau nguyên âm\n\nKhác biệt:\n- 은/는: nhấn mạnh chủ đề, so sánh\n- 이/가: nhấn mạnh chủ ngữ, thông tin mới',
      examples: [
        { sentence: '저는 학생입니다.', translation: 'Tôi là sinh viên. (nói về tôi)' },
        { sentence: '날씨가 좋아요.', translation: 'Thời tiết đẹp. (thời tiết = chủ ngữ mới)' },
        { sentence: '이것은 뭐예요?', translation: 'Cái này là gì? (cái này = chủ đề)' },
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

export default function GrammarTipsPage() {
  const [selectedLang, setSelectedLang] = useState('en');
  const [expandedTip, setExpandedTip] = useState<string | null>(null);

  const currentTips = tips[selectedLang] || [];

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-display">Mẹo ngữ pháp</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Giải thích ngữ pháp chi tiết trước khi học</p>
      </div>

      {/* Language selector */}
      <div className="flex gap-2 flex-wrap">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => { setSelectedLang(lang.code); setExpandedTip(null); }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl border-2 transition-all ${
              selectedLang === lang.code
                ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                : 'border-gray-200 dark:border-gray-700 hover:border-primary-200'
            }`}
          >
            <span>{lang.flag}</span>
            <span className="text-sm font-medium">{lang.name}</span>
          </button>
        ))}
      </div>

      {/* Tips list */}
      <div className="space-y-3">
        {currentTips.map((tip) => (
          <div
            key={tip.id}
            className="rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 overflow-hidden transition-all"
          >
            <button
              onClick={() => setExpandedTip(expandedTip === tip.id ? null : tip.id)}
              className="w-full p-4 flex items-center justify-between text-left hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 font-medium">
                    {tip.level}
                  </span>
                  <h3 className="font-semibold">{tip.title}</h3>
                </div>
                <p className="text-sm text-gray-500 mt-0.5">{tip.titleVi}</p>
              </div>
              <span className={`text-gray-400 transition-transform ${expandedTip === tip.id ? 'rotate-180' : ''}`}>
                ▼
              </span>
            </button>

            {expandedTip === tip.id && (
              <div className="px-4 pb-4 border-t border-gray-100 dark:border-gray-700 pt-4 space-y-4">
                <div className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-line leading-relaxed">
                  {tip.content}
                </div>
                <div className="space-y-2">
                  <p className="text-xs font-medium text-gray-500 uppercase">Ví dụ:</p>
                  {tip.examples.map((ex, i) => (
                    <div key={i} className="p-3 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-700">
                      <p className="font-medium text-sm">{ex.sentence}</p>
                      <p className="text-xs text-gray-500 mt-1">{ex.translation}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {currentTips.length === 0 && (
        <div className="text-center py-12">
          <div className="text-4xl mb-3">📚</div>
          <p className="text-gray-500">Chưa có mẹo ngữ pháp cho ngôn ngữ này.</p>
        </div>
      )}
    </div>
  );
}
