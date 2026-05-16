'use client';

import { useState } from 'react';

interface CultureNote {
  id: string;
  title: string;
  titleVi: string;
  category: string;
  content: string;
  funFact: string;
  doAndDont?: { do: string[]; dont: string[] };
}

const cultureNotes: Record<string, CultureNote[]> = {
  en: [
    {
      id: 'en-1', title: 'Small Talk', titleVi: 'Nói chuyện phiếm', category: 'Communication',
      content: 'Người Anh/Mỹ rất thích small talk — nói chuyện nhẹ nhàng về thời tiết, cuối tuần, hoặc thể thao. Đây là cách xây dựng mối quan hệ trước khi vào chủ đề chính.',
      funFact: 'Người Anh nói về thời tiết trung bình 8-10 lần mỗi tuần!',
      doAndDont: {
        do: ['Hỏi "How are you?" khi gặp ai', 'Nói về thời tiết, thể thao, phim', 'Mỉm cười và giao tiếp bằng mắt'],
        dont: ['Hỏi về lương bổng hoặc tuổi tác', 'Nói về chính trị hoặc tôn giáo khi mới gặp', 'Im lặng quá lâu trong cuộc trò chuyện'],
      },
    },
    {
      id: 'en-2', title: 'Tipping Culture', titleVi: 'Văn hóa tiền boa', category: 'Daily Life',
      content: 'Ở Mỹ, tiền boa (tip) là bắt buộc trong nhà hàng (15-20% hóa đơn). Nhân viên phục vụ phụ thuộc vào tiền boa vì lương cơ bản rất thấp. Ở Anh, tiền boa khoảng 10-15% và không bắt buộc.',
      funFact: 'Ở Nhật Bản, để tiền boa bị coi là bất lịch sự vì nó ngụ ý rằng nhân viên cần thêm tiền!',
      doAndDont: {
        do: ['Tip 15-20% ở nhà hàng Mỹ', 'Tip taxi, cắt tóc, giao hàng', 'Kiểm tra hóa đơn xem đã bao gồm service charge chưa'],
        dont: ['Quên tip ở Mỹ (bị coi là rất bất lịch sự)', 'Tip ở Nhật Bản', 'Tip bằng tiền xu (bị coi là khinh thường)'],
      },
    },
    {
      id: 'en-3', title: 'Punctuality', titleVi: 'Đúng giờ', category: 'Business',
      content: 'Trong văn hóa Anh/Mỹ, đúng giờ rất quan trọng, đặc biệt trong công việc. Đến muộn 5 phút cần xin lỗi. Trong các buổi họp, nên đến sớm 5 phút.',
      funFact: 'Ở Đức, đến đúng giờ nghĩa là đến sớm 5 phút. Đến "đúng giờ" đã là muộn!',
      doAndDont: {
        do: ['Đến sớm 5 phút cho cuộc họp', 'Báo trước nếu sẽ đến muộn', 'Xin lỗi nếu đến muộn dù chỉ vài phút'],
        dont: ['Đến muộn mà không báo trước', 'Đến quá sớm (hơn 15 phút) cho tiệc tại nhà', 'Giả vờ không biết giờ hẹn'],
      },
    },
    {
      id: 'en-4', title: 'Idioms in Daily Life', titleVi: 'Thành ngữ trong đời sống', category: 'Language',
      content: 'Người bản ngữ dùng rất nhiều idioms (thành ngữ). Hiểu idioms giúp bạn nghe hiểu phim, nhạc, và giao tiếp tự nhiên hơn.',
      funFact: 'Tiếng Anh có hơn 25,000 thành ngữ! Trung bình một người bản ngữ dùng khoảng 20 idioms mỗi ngày.',
      doAndDont: {
        do: ['Học idioms phổ biến: "break the ice", "piece of cake"', 'Xem phim/series để nghe idioms trong ngữ cảnh', 'Hỏi nghĩa nếu không hiểu'],
        dont: ['Dịch word-by-word thành ngữ', 'Dùng quá nhiều idioms khi mới học', 'Nhầm lẫn idioms Anh-Anh và Anh-Mỹ'],
      },
    },
  ],
  ja: [
    {
      id: 'ja-1', title: 'Bowing (お辞儀)', titleVi: 'Cúi chào (お辞儀)', category: 'Etiquette',
      content: 'Cúi chào là cách chào hỏi cơ bản ở Nhật. Có 3 mức độ: eshaku (15°, chào thường), keirei (30°, chào lịch sự), saikeirei (45°, chào trang trọng). Cúi càng sâu càng thể hiện sự tôn trọng.',
      funFact: 'Người Nhật ci chào trung bình 2,000 lần mỗi ngày trong môi trường kinh doanh!',
      doAndDont: {
        do: ['Cúi chào khi gặp và chia tay', 'Giữ lưng thẳng khi cúi', 'Cúi sâu hơn với người lớn tuổi/cấp trên'],
        dont: ['Bắt tay trừ khi người Nhật chủ động', 'Nhìn vào mắt khi đang cúi chào', 'Cúi chào khi đang ăn hoặc cầm đồ'],
      },
    },
    {
      id: 'ja-2', title: 'Honorific Language (敬語)', titleVi: 'Kính ngữ (敬語)', category: 'Language',
      content: 'Tiếng Nhật có hệ thống kính ngữ phức tạp: sonkeigo (tôn kính ngữ - nâng người khác), kenjougo (khiêm nhường ngữ - hạ mình), teineigo (lịch sự ngữ - です/ます). Dùng sai kính ngữ có thể gây mất lịch sự.',
      funFact: 'Nhân viên cửa hàng Nhật được đào tạo 40+ giờ chỉ riêng về cách dùng kính ngữ với khách hàng!',
      doAndDont: {
        do: ['Dùng です/ます với người lạ', 'Dùng さん sau tên người khác', 'Học kính ngữ cơ bản cho công việc'],
        dont: ['Dùng thể thường với người lớn tuổi', 'Gọi tên người Nhật mà không có さん', 'Tự xưng bằng さん (chỉ dùng cho người khác)'],
      },
    },
    {
      id: 'ja-3', title: 'Dining Etiquette', titleVi: 'Phép tắc ăn uống', category: 'Daily Life',
      content: 'Trước khi ăn nói "いただきます" (itadakimasu), sau khi ăn nói "ごちそうさまでした" (gochisousama deshita). Không cắm đũa thẳng vào cơm (giống nghi lễ tang). Húp mì ramen có tiếng là lịch sự!',
      funFact: 'Húp mì có tiếng ở Nhật không chỉ được chấp nhận mà còn là cách thể hiện món ăn ngon! Nó cũng giúp làm nguội mì.',
      doAndDont: {
        do: ['Nói いただきます trước khi ăn', 'Húp mì có tiếng', 'Dùng đĩa nhỏ để đỡ thức ăn khi gắp'],
        dont: ['Cắm đũa thẳng vào cơm', 'Chuyền thức ăn từ đũa sang đũa', 'Để tiền boa ở nhà hàng'],
      },
    },
    {
      id: 'ja-4', title: 'Gift Giving (贈り物)', titleVi: 'Tặng quà (贈り物)', category: 'Social',
      content: 'Tặng quà rất quan trọng trong văn hóa Nhật. Quà nên được gói đẹp. Khi nhận quà, nên từ chối nhẹ 1-2 lần trước khi nhận. Không mở quà trước mặt người tặng (trừ khi được mời).',
      funFact: 'Mùa tặng quà lớn nhất ở Nhật là Ochugen (tháng 7) và Oseibo (tháng 12), khi mọi người tặng quà cho sếp, thầy cô, và người giúp đỡ mình.',
      doAndDont: {
        do: ['Gói quà đẹp', 'Tặng bằng hai tay', 'Mang quà khi đến nhà ai'],
        dont: ['Tặng số 4 (tứ = tử, nghĩa là chết)', 'Mở quà ngay trước mặt người tặng', 'Tặng dao kéo (ngụ ý cắt đứt quan hệ)'],
      },
    },
  ],
  zh: [
    {
      id: 'zh-1', title: 'Face (面子)', titleVi: 'Thể diện (面子)', category: 'Social',
      content: '"Giữ thể diện" (面子 miànzi) là khái niệm cực kỳ quan trọng trong văn hóa Trung Quốc. Không nên làm ai mất mặt trước đám đông. Khen ngợi và tôn trọng người khác giúp "cho thể diện".',
      funFact: 'Khái niệm "mất mặt" (丢脸) nghiêm trọng đến mức có thể ảnh hưởng đến quan hệ kinh doanh hàng triệu đô la!',
      doAndDont: {
        do: ['Khen ngợi trước mặt người khác', 'Góp ý riêng tư, không trước đám đông', 'Tôn trọng người lớn tuổi và cấp trên'],
        dont: ['Chỉ trích ai trước mặt người khác', 'Từ chối thẳng thừng (nói "có thể" thay vì "không")', 'Làm ai xấu hổ trước đám đông'],
      },
    },
    {
      id: 'zh-2', title: 'Tea Culture (茶文化)', titleVi: 'Văn hóa trà (茶文化)', category: 'Daily Life',
      content: 'Trà là phần không thể thiếu trong đời sống Trung Quốc. Mời trà là cách thể hiện sự hiếu khách. Khi ai rót trà cho bạn, gõ nhẹ 2 ngón tay lên bàn để cảm ơn (叩手礼).',
      funFact: 'Truyền thuyết kể rằng trà được phát hiện năm 2737 TCN khi lá trà rơi vào cốc nước nóng của Hoàng đế Thần Nông!',
      doAndDont: {
        do: ['Gõ ngón tay cảm ơn khi được rót trà', 'Rót trà cho người khác trước khi rót cho mình', 'Uống trà khi được mời'],
        dont: ['Từ chối trà khi được mời (bất lịch sự)', 'Rót đầy tách (chỉ rót 70-80%)', 'Uống trà quá nóng ngay lập tức'],
      },
    },
    {
      id: 'zh-3', title: 'Red Color & Numbers', titleVi: 'Màu đỏ & Con số', category: 'Beliefs',
      content: 'Màu đỏ tượng trưng cho may mắn, thịnh vượng. Số 8 (八 bā) là số may mắn nhất vì phát âm giống "phát" (发 fā = phát tài). Số 4 (四 sì) là số xui vì phát âm giống "tử" (死 sǐ = chết).',
      funFact: 'Biển số xe có số 8 ở Trung Quốc có thể bán đấu giá hàng triệu nhân dân tệ! Số điện thoại Olympic Bắc Kinh 2008 bắt đầu lúc 8:08 PM ngày 08/08/2008.',
      doAndDont: {
        do: ['Tặng phong bì đỏ (红包) trong dịp lễ', 'Chọn số 8 khi có thể', 'Mặc đỏ trong dịp vui'],
        dont: ['Tặng đồng hồ (送钟 = đưa tiễn)', 'Viết tên bằng mực đỏ (ngụ ý chết)', 'Tặng quà có số 4'],
      },
    },
    {
      id: 'zh-4', title: 'Dining & Banquet', titleVi: 'Ăn uống & Tiệc tùng', category: 'Etiquette',
      content: 'Bàn ăn tròn phổ biến ở Trung Quốc. Chủ nhà ngồi đối diện cửa. Khách danh dự ngồi bên phải chủ nhà. Khi ăn, chủ nhà sẽ gắp thức ăn cho khách — đây là sự hiếu khách.',
      funFact: 'Ở Trung Quốc, để lại một ít thức ăn trên đĩa thể hiện rằng chủ nhà đã cho bạn ăn đủ no. Ăn sạch đĩa có thể ngụ ý bạn vẫn đói!',
      doAndDont: {
        do: ['Để chủ nhà gọi món', 'Thử tất cả các món được mời', 'Nâng ly bằng hai tay khi chúc'],
        dont: ['Cắm đũa thẳng vào cơm', 'Lật cá (ngụ ý lật thuyền)', 'Tranh trả tiền quá quyết liệt'],
      },
    },
  ],
  ko: [
    {
      id: 'ko-1', title: 'Age Hierarchy (나이)', titleVi: 'Thứ bậc tuổi tác (나이)', category: 'Social',
      content: 'Tuổi tác quyết định cách xưng hô và hành vi trong xã hội Hàn Quốc. Người lớn tuổi hơn dù chỉ 1 tuổi cũng được gọi là 형/오빠 (anh trai) hoặc 누나/언니 (chị gái). Câu hỏi đầu tiên khi gặp người mới thường là "Bạn bao nhiêu tuổi?"',
      funFact: 'Hàn Quốc từng dùng hệ thống tuổi riêng (Korean age) — bạn 1 tuổi khi sinh ra và tăng 1 tuổi mỗi ngày 1/1. Năm 2023, Hàn Quốc chính thức chuyển sang tuổi quốc tế!',
      doAndDont: {
        do: ['Dùng kính ngữ với người lớn tuổi', 'Hỏi tuổi để biết cách xưng hô', 'Rót rượu bằng hai tay cho người lớn'],
        dont: ['Gọi tên người lớn tuổi mà không có 씨/님', 'Uống rượu quay mặt về phía người lớn', 'Bắt đầu ăn trước người lớn nhất bàn'],
      },
    },
    {
      id: 'ko-2', title: 'Korean BBQ Etiquette', titleVi: 'Phép tắc ăn BBQ Hàn', category: 'Food',
      content: 'BBQ Hàn Quốc (삼겹살, 갈비) là trải nghiệm ăn uống xã hội. Người trẻ nhất thường nướng thịt. Gói thịt trong lá rau (쌈) với tương, tỏi, và kimchi. Soju uống bằng shot glass nhỏ.',
      funFact: 'Hàn Quốc tiêu thụ nhiều rượu soju nhất thế giới — trung bình 14 shot/người/tuần! Jinro Soju là thương hiệu rượu bán chạy nhất toàn cầu.',
      doAndDont: {
        do: ['Để người lớn rót rượu cho bạn', 'Nhận ly bằng hai tay', 'Nói "잘 먹겠습니다" trước khi ăn'],
        dont: ['Tự rót rượu cho mình', 'Uống khi ly người khác còn trống', 'Từ chối rượu từ người lớn (quay mặt đi uống)'],
      },
    },
    {
      id: 'ko-3', title: 'Skincare & Beauty', titleVi: 'Chăm sóc da & Làm đẹp', category: 'Lifestyle',
      content: 'Hàn Quốc là thủ đô làm đẹp thế giới. Quy trình skincare 10 bước nổi tiếng toàn cầu. Cả nam và nữ đều chăm sóc da. Làn da đẹp được coi là dấu hiệu của sức khỏe và kỷ luật.',
      funFact: 'Ngành công nghiệp mỹ phẩm Hàn Quốc (K-beauty) trị giá hơn 10 tỷ USD. Nam giới Hàn Quốc chi tiêu cho mỹ phẩm nhiều nhất thế giới!',
      doAndDont: {
        do: ['Dùng kem chống nắng mỗi ngày', 'Thử sheet mask khi ở Hàn', 'Khen da đẹp (là lời khen lớn)'],
        dont: ['Bỏ qua skincare routine', 'Chê da ai xấu (rất nhạy cảm)', 'Nghĩ rằng chỉ phụ nữ mới chăm sóc da'],
      },
    },
    {
      id: 'ko-4', title: 'Nunchi (눈치)', titleVi: 'Nunchi — Đọc không khí (눈치)', category: 'Communication',
      content: 'Nunchi (눈치) là khả năng "đọc không khí" — hiểu cảm xúc và tình huống mà không cần nói ra. Đây là kỹ năng xã hội quan trọng nhất ở Hàn Quốc. Người có nunchi tốt biết khi nào nên nói, khi nào nên im.',
      funFact: 'Nunchi quan trọng đến mức có sách best-seller dạy về nó: "The Power of Nunchi" đã được dịch ra 15 ngôn ngữ!',
      doAndDont: {
        do: ['Quan sát trước khi hành động', 'Chú ý biểu cảm và ngôn ngữ cơ thể', 'Đọc bầu không khí phòng trước khi nói'],
        dont: ['Nói quá to hoặc quá nhiều', 'Bỏ qua tín hiệu không lời', 'Ép ai trả lời khi họ ngần ngại'],
      },
    },
  ],
};

const languageTabs = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
  { code: 'zh', name: 'Chinese', flag: '🇨🇳' },
  { code: 'ko', name: 'Korean', flag: '🇰🇷' },
];

const categoryColors: Record<string, string> = {
  Communication: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  'Daily Life': 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
  Business: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
  Language: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300',
  Etiquette: 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300',
  Social: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300',
  Beliefs: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300',
  Food: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
  Lifestyle: 'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300',
};

export default function CulturePage() {
  const [selectedLang, setSelectedLang] = useState('en');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const notes = cultureNotes[selectedLang] || [];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold font-display">Văn hóa & Phong tục</h1>
        <p className="text-muted-foreground mt-1">Hiểu văn hóa để giao tiếp tự nhiên hơn</p>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2">
        {languageTabs.map((lang) => (
          <button
            key={lang.code}
            onClick={() => { setSelectedLang(lang.code); setExpandedId(null); }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
              selectedLang === lang.code
                ? 'bg-primary text-white'
                : 'bg-muted text-muted-foreground hover:bg-gray-200'
            }`}
          >
            <span>{lang.flag}</span>
            {lang.name}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {notes.map((note) => (
          <div key={note.id} className="rounded-2xl bg-card border border overflow-hidden">
            <button
              onClick={() => setExpandedId(expandedId === note.id ? null : note.id)}
              className="w-full p-5 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${categoryColors[note.category] || 'bg-gray-100 text-gray-700'}`}>
                    {note.category}
                  </span>
                </div>
                <h3 className="font-semibold text-lg">{note.title}</h3>
                <p className="text-sm text-primary dark:text-primary-400">{note.titleVi}</p>
              </div>
              <svg className={`w-5 h-5 text-muted-foreground transition-transform ${expandedId === note.id ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {expandedId === note.id && (
              <div className="px-5 pb-5 space-y-4 border-t border pt-4">
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{note.content}</p>

                <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800">
                  <p className="text-sm text-amber-800 dark:text-amber-300">
                    <span className="font-medium">Fun fact:</span> {note.funFact}
                  </p>
                </div>

                {note.doAndDont && (
                  <div className="grid md:grid-cols-2 gap-3">
                    <div className="p-3 rounded-xl bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800">
                      <p className="text-xs font-bold text-green-700 dark:text-green-300 uppercase mb-2">NÊN</p>
                      <ul className="space-y-1">
                        {note.doAndDont.do.map((item, i) => (
                          <li key={i} className="text-sm text-green-700 dark:text-green-400 flex items-start gap-1.5">
                            <span className="mt-0.5">✓</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="p-3 rounded-xl bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800">
                      <p className="text-xs font-bold text-red-700 dark:text-red-300 uppercase mb-2">KHÔNG NÊN</p>
                      <ul className="space-y-1">
                        {note.doAndDont.dont.map((item, i) => (
                          <li key={i} className="text-sm text-red-700 dark:text-red-400 flex items-start gap-1.5">
                            <span className="mt-0.5">✗</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
