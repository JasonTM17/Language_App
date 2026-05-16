'use client';

import { useState } from 'react';
import { AudioPlayer } from '@/components/ui/audio-player';
import type { SupportedLanguage } from '@/services/audio';

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
    {
      id: '13', title: 'Adjectives (い/な)', titleVi: 'Tính từ い và な', level: 'Beginner',
      content: 'Tiếng Nhật có 2 loại tính từ:\n\nい-adjective: kết thúc bằng い\n- Phủ định: bỏ い → くない (高い → 高くない)\n- Quá khứ: bỏ い → かった (高い → 高かった)\n\nな-adjective: cần な trước danh từ\n- Phủ định: + じゃない (静か → 静かじゃない)\n- Quá khứ: + だった (静か → 静かだった)',
      examples: [
        { sentence: 'この本は面白いです。', translation: 'Cuốn sách này thú vị.' },
        { sentence: '昨日は暑くなかった。', translation: 'Hôm qua không nóng.' },
        { sentence: '静かな場所が好きです。', translation: 'Tôi thích nơi yên tĩnh.' },
      ],
    },
    {
      id: '14', title: 'Verb Groups', titleVi: 'Nhóm động từ', level: 'Elementary',
      content: 'Động từ tiếng Nhật chia thành 3 nhóm:\n\nNhóm 1 (五段): đuôi う-row (書く, 話す, 飲む)\nNhóm 2 (一段): đuôi る với え/い trước (食べる, 見る)\nNhóm 3 (bất quy tắc): する, 来る\n\nThể lịch sự (ます):\n- Nhóm 1: đổi う→い + ます (書く→書きます)\n- Nhóm 2: bỏ る + ます (食べる→食べます)\n- Nhóm 3: する→します, 来る→来ます',
      examples: [
        { sentence: '毎朝コーヒーを飲みます。', translation: 'Mỗi sáng tôi uống cà phê.' },
        { sentence: '映画を見ました。', translation: 'Tôi đã xem phim.' },
        { sentence: '日本語を勉強します。', translation: 'Tôi học tiếng Nhật.' },
      ],
    },
    {
      id: '15', title: 'Counters (助数詞)', titleVi: 'Trợ số từ', level: 'Elementary',
      content: 'Tiếng Nhật dùng trợ số từ khi đếm:\n\n- つ: đếm chung (1つ, 2つ...)\n- 人 (にん): người (1人=ひとり, 2人=ふたり, 3人=さんにん)\n- 枚 (まい): vật phẳng (giấy, áo)\n- 本 (ほん): vật dài (bút, chai)\n- 匹 (ひき): động vật nhỏ\n- 台 (だい): máy móc, xe',
      examples: [
        { sentence: 'りんごを三つください。', translation: 'Cho tôi 3 quả táo.' },
        { sentence: '家族は四人です。', translation: 'Gia đình tôi có 4 người.' },
        { sentence: '切手を二枚買いました。', translation: 'Tôi đã mua 2 con tem.' },
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
    {
      id: '16', title: 'Tenses with 了/过/在', titleVi: 'Thì với 了/过/在', level: 'Elementary',
      content: 'Tiếng Trung không chia động từ theo thì, mà dùng trợ từ:\n\n- 了 (le): hành động đã hoàn thành\n- 过 (guò): kinh nghiệm (đã từng)\n- 在 (zài) + V: đang làm\n- 要/会/将 + V: sẽ làm\n\nVí dụ với 吃 (ăn):\n- 吃了 (đã ăn)\n- 吃过 (đã từng ăn)\n- 在吃 (đang ăn)',
      examples: [
        { sentence: '我吃了早饭。', translation: 'Tôi đã ăn sáng.' },
        { sentence: '你去过日本吗？', translation: 'Bạn đã từng đi Nhật chưa?' },
        { sentence: '她在看电视。', translation: 'Cô ấy đang xem TV.' },
      ],
    },
    {
      id: '17', title: 'Complement of Degree (得)', titleVi: 'Bổ ngữ mức độ (得)', level: 'Intermediate',
      content: 'Dùng 得 (de) sau động từ để mô tả mức độ/cách thức:\n\nCấu trúc: V + 得 + Adj/Phrase\n\nPhủ định: V + 得 + 不 + Adj\n\nLưu ý: Khi có tân ngữ, phải lặp lại động từ:\n他说中文说得很好 (Anh ấy nói tiếng Trung rất giỏi)',
      examples: [
        { sentence: '他跑得很快。', translation: 'Anh ấy chạy rất nhanh.' },
        { sentence: '你写得不错。', translation: 'Bạn viết khá tốt.' },
        { sentence: '她唱歌唱得很好听。', translation: 'Cô ấy hát rất hay.' },
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
    {
      id: '18', title: 'Object Particle 을/를', titleVi: 'Trợ từ tân ngữ 을/를', level: 'Beginner',
      content: '을/를 đánh dấu tân ngữ (đối tượng của hành động):\n- 을 sau phụ âm\n- 를 sau nguyên âm\n\nCấu trúc: Chủ ngữ + 은/는 + Tân ngữ + 을/를 + Động từ\n\nVí dụ: 저는 커피를 마셔요 (Tôi uống cà phê)',
      examples: [
        { sentence: '저는 한국어를 공부해요.', translation: 'Tôi học tiếng Hàn.' },
        { sentence: '빵을 먹었어요.', translation: 'Tôi đã ăn bánh mì.' },
        { sentence: '영화를 봐요.', translation: 'Tôi xem phim.' },
      ],
    },
    {
      id: '19', title: 'Past Tense (-았/었/했)', titleVi: 'Thì quá khứ', level: 'Elementary',
      content: 'Chia quá khứ trong tiếng Hàn:\n\n- Nguyên âm ㅏ/ㅗ + 았: 가다 → 갔어요\n- Nguyên âm khác + 었: 먹다 → 먹었어요\n- 하다 → 했: 공부하다 → 공부했어요\n\nFormal: -았/었/했 + 습니다\nPolite: -았/었/했 + 어요\nCasual: -았/었/했 + 어',
      examples: [
        { sentence: '어제 학교에 갔어요.', translation: 'Hôm qua tôi đã đi học.' },
        { sentence: '점심을 먹었어요.', translation: 'Tôi đã ăn trưa.' },
        { sentence: '숙제를 했어요.', translation: 'Tôi đã làm bài tập.' },
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

const levelColors: Record<string, string> = {
  Beginner: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300',
  Elementary: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300',
  Intermediate: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300',
  Advanced: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300',
};

export default function GrammarTipsPage() {
  const [selectedLang, setSelectedLang] = useState('en');
  const [expandedTip, setExpandedTip] = useState<string | null>(null);
  const [filterLevel, setFilterLevel] = useState<string | null>(null);

  const currentTips = tips[selectedLang] || [];
  const filteredTips = filterLevel ? currentTips.filter(t => t.level === filterLevel) : currentTips;
  const levels = [...new Set(currentTips.map(t => t.level))];

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-display">Mẹo ngữ pháp</h1>
          <p className="text-muted-foreground text-sm mt-0.5">
            {currentTips.length} bài giải thích ngữ pháp chi tiết
          </p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-primary">{currentTips.length}</div>
          <div className="text-xs text-muted-foreground">chủ đề</div>
        </div>
      </div>

      {/* Language selector */}
      <div className="flex gap-2 flex-wrap">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => { setSelectedLang(lang.code); setExpandedTip(null); setFilterLevel(null); }}
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

      {/* Level filter */}
      {levels.length > 1 && (
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setFilterLevel(null)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              !filterLevel ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            Tất cả
          </button>
          {levels.map(level => (
            <button
              key={level}
              onClick={() => setFilterLevel(filterLevel === level ? null : level)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                filterLevel === level ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              {level}
            </button>
          ))}
        </div>
      )}

      {/* Tips list */}
      <div className="space-y-3">
        {filteredTips.map((tip) => (
          <div
            key={tip.id}
            className="rounded-2xl bg-card border overflow-hidden transition-all hover:shadow-sm"
          >
            <button
              onClick={() => setExpandedTip(expandedTip === tip.id ? null : tip.id)}
              className="w-full p-4 flex items-center justify-between text-left hover:bg-muted/30 transition-colors"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${levelColors[tip.level] || 'bg-muted text-muted-foreground'}`}>
                    {tip.level}
                  </span>
                  <h3 className="font-semibold">{tip.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground mt-0.5">{tip.titleVi}</p>
              </div>
              <svg className={`w-4 h-4 text-muted-foreground shrink-0 transition-transform ${expandedTip === tip.id ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {expandedTip === tip.id && (
              <div className="px-4 pb-4 border-t pt-4 space-y-4 animate-in slide-in-from-top-1 duration-200">
                <div className="text-sm text-foreground/80 whitespace-pre-line leading-relaxed">
                  {tip.content}
                </div>
                <div className="space-y-2">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Ví dụ:</p>
                  {tip.examples.map((ex, i) => (
                    <div key={i} className="p-3 rounded-xl bg-muted/50 border">
                      <div className="flex items-center gap-2">
                        <div className="shrink-0" onClick={(e) => e.stopPropagation()}>
                          <AudioPlayer text={ex.sentence} language={selectedLang as SupportedLanguage} size="sm" showSlowButton={false} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm">{ex.sentence}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">{ex.translation}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredTips.length === 0 && (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">📐</div>
          <h3 className="text-lg font-semibold mb-2">
            {filterLevel ? 'Không có bài nào ở cấp độ này' : 'Chưa có mẹo ngữ pháp'}
          </h3>
          <p className="text-muted-foreground">
            {filterLevel ? 'Thử chọn cấp độ khác.' : 'Chưa có mẹo ngữ pháp cho ngôn ngữ này.'}
          </p>
        </div>
      )}
    </div>
  );
}
