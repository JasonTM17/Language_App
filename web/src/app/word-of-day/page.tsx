'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface WordOfDay {
  word: string;
  pronunciation: string;
  meaning: string;
  partOfSpeech: string;
  example: string;
  exampleMeaning: string;
  language: string;
  flag: string;
  funFact: string;
}

const wordsOfDay: WordOfDay[] = [
  {
    word: 'serendipity',
    pronunciation: '/ˌserənˈdɪpɪti/',
    meaning: 'sự tình cờ may mắn',
    partOfSpeech: 'noun',
    example: 'Finding this book was pure serendipity.',
    exampleMeaning: 'Tìm được cuốn sách này hoàn toàn là tình cờ may mắn.',
    language: 'English',
    flag: '🇬🇧',
    funFact: 'Từ này được tạo ra bởi Horace Walpole năm 1754, lấy cảm hứng từ câu chuyện cổ tích Ba Hoàng Tử xứ Serendip.',
  },
  {
    word: '木漏れ日 (こもれび)',
    pronunciation: 'komorebi',
    meaning: 'ánh nắng xuyên qua lá cây',
    partOfSpeech: 'noun',
    example: '公園で木漏れ日を楽しみました。',
    exampleMeaning: 'Tôi đã tận hưởng ánh nắng xuyên lá ở công viên.',
    language: 'Japanese',
    flag: '🇯🇵',
    funFact: 'Đây là một từ không thể dịch trực tiếp sang tiếng Anh, thể hiện sự tinh tế của tiếng Nhật trong việc mô tả thiên nhiên.',
  },
  {
    word: '缘分 (yuánfèn)',
    pronunciation: 'yuánfèn',
    meaning: 'duyên phận',
    partOfSpeech: 'noun',
    example: '我们的相遇是缘分。',
    exampleMeaning: 'Cuộc gặp gỡ của chúng ta là duyên phận.',
    language: 'Chinese',
    flag: '🇨🇳',
    funFact: 'Khái niệm này bắt nguồn từ Phật giáo, chỉ mối liên kết định mệnh giữa con người.',
  },
  {
    word: '정 (jeong)',
    pronunciation: 'jeong',
    meaning: 'tình cảm sâu đậm',
    partOfSpeech: 'noun',
    example: '한국 사람들은 정이 많아요.',
    exampleMeaning: 'Người Hàn Quốc rất giàu tình cảm.',
    language: 'Korean',
    flag: '🇰🇷',
    funFact: '정 là khái niệm đặc trưng của văn hóa Hàn, chỉ sự gắn bó tình cảm sâu sắc không thể dịch chính xác.',
  },
  {
    word: 'ephemeral',
    pronunciation: '/ɪˈfemərəl/',
    meaning: 'phù du, ngắn ngủi',
    partOfSpeech: 'adjective',
    example: 'The beauty of cherry blossoms is ephemeral.',
    exampleMeaning: 'Vẻ đẹp của hoa anh đào thật phù du.',
    language: 'English',
    flag: '🇬🇧',
    funFact: 'Từ này có gốc Hy Lạp "ephemeros" nghĩa là "chỉ kéo dài một ngày", ban đầu dùng để mô tả côn trùng sống ngắn.',
  },
  {
    word: '侘び寂び (わびさび)',
    pronunciation: 'wabi-sabi',
    meaning: 'vẻ đẹp của sự không hoàn hảo',
    partOfSpeech: 'noun',
    example: 'この古い茶碗には侘び寂びの美しさがあります。',
    exampleMeaning: 'Chiếc chén trà cũ này có vẻ đẹp của sự không hoàn hảo.',
    language: 'Japanese',
    flag: '🇯🇵',
    funFact: 'Wabi-sabi là triết lý thẩm mỹ Nhật Bản, tìm thấy cái đẹp trong sự không hoàn hảo, vô thường và chưa hoàn thiện.',
  },
  {
    word: '加油 (jiā yóu)',
    pronunciation: 'jiā yóu',
    meaning: 'cố lên! / fighting!',
    partOfSpeech: 'interjection',
    example: '考试加油！你一定能行！',
    exampleMeaning: 'Thi cử cố lên! Bạn nhất định làm được!',
    language: 'Chinese',
    flag: '🇨🇳',
    funFact: 'Nghĩa gốc là "thêm dầu" (cho máy móc), sau trở thành lời động viên phổ biến nhất trong tiếng Trung.',
  },
  {
    word: '대박 (daebak)',
    pronunciation: 'daebak',
    meaning: 'tuyệt vời / jackpot',
    partOfSpeech: 'interjection',
    example: '이 영화 진짜 대박이야!',
    exampleMeaning: 'Phim này thật sự tuyệt vời!',
    language: 'Korean',
    flag: '🇰🇷',
    funFact: 'Ban đầu "대박" nghĩa là "trúng lớn" (jackpot), nhưng giới trẻ Hàn dùng để diễn tả sự ngạc nhiên, thán phục.',
  },
];

export default function WordOfDayPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [saved, setSaved] = useState<Set<number>>(new Set());

  const word = wordsOfDay[currentIndex];

  const speak = (text: string, lang: string) => {
    const langMap: Record<string, string> = { English: 'en-US', Japanese: 'ja-JP', Chinese: 'zh-CN', Korean: 'ko-KR' };
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = langMap[lang] || 'en-US';
    utterance.rate = 0.8;
    speechSynthesis.speak(utterance);
  };

  const toggleSave = () => {
    setSaved(prev => {
      const next = new Set(prev);
      if (next.has(currentIndex)) next.delete(currentIndex);
      else next.add(currentIndex);
      return next;
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-2xl mx-auto space-y-6 pb-8"
    >
      <div>
        <h1 className="text-2xl font-bold font-display">Từ mỗi ngày</h1>
        <p className="text-muted-foreground text-sm mt-0.5">Mỗi ngày một từ mới, mở rộng vốn từ</p>
      </div>

      {/* Word card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="p-8 rounded-2xl bg-gradient-to-br from-primary/5 to-primary/10 border-2 border-primary/20"
      >
        <div className="flex items-center justify-between mb-4">
          <span className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>{word.flag}</span>
            <span>{word.language}</span>
            <span className="px-2 py-0.5 rounded bg-muted text-xs">{word.partOfSpeech}</span>
          </span>
          <button
            onClick={toggleSave}
            className={`text-xl transition-all ${saved.has(currentIndex) ? 'text-yellow-500' : 'text-muted-foreground hover:text-yellow-400'}`}
          >
            {saved.has(currentIndex) ? '★' : '☆'}
          </button>
        </div>

        <div className="text-center space-y-3">
          <h2 className="text-3xl font-bold">{word.word}</h2>
          <p className="text-sm text-muted-foreground">{word.pronunciation}</p>
          <button
            onClick={() => speak(word.word.replace(/\s*\(.*?\)\s*/g, ''), word.language)}
            className="mx-auto flex items-center gap-1 px-3 py-1 rounded-full bg-card shadow-sm text-sm text-primary hover:bg-primary/5 transition-all"
          >
            🔊 Nghe phát âm
          </button>
          <p className="text-xl text-primary font-medium mt-4">{word.meaning}</p>
        </div>
      </motion.div>

      {/* Example */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="p-5 rounded-xl bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-900/80 dark:to-gray-800/50 border border-border/60 backdrop-blur-sm shadow-lg shadow-purple-500/5"
      >
        <p className="text-xs text-muted-foreground font-medium mb-2">Ví dụ:</p>
        <p className="text-lg font-medium">{word.example}</p>
        <p className="text-sm text-muted-foreground mt-1">{word.exampleMeaning}</p>
        <button
          onClick={() => speak(word.example, word.language)}
          className="mt-2 text-xs text-primary hover:underline"
        >
          🔊 Nghe ví dụ
        </button>
      </motion.div>

      {/* Fun fact */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="p-4 rounded-xl bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-100 dark:border-yellow-900/30"
      >
        <p className="text-xs font-medium text-yellow-700 dark:text-yellow-400 mb-1">💡 Bạn có biết?</p>
        <p className="text-sm text-foreground/80">{word.funFact}</p>
      </motion.div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
          disabled={currentIndex === 0}
        >
          ← Hôm qua
        </Button>
        <span className="text-sm text-muted-foreground">{currentIndex + 1} / {wordsOfDay.length}</span>
        <Button
          onClick={() => setCurrentIndex(prev => Math.min(wordsOfDay.length - 1, prev + 1))}
          disabled={currentIndex === wordsOfDay.length - 1}
        >
          Ngày mai →
        </Button>
      </div>

      {/* Saved words */}
      {saved.size > 0 && (
        <div className="p-4 rounded-xl bg-muted/50 border">
          <p className="text-xs font-medium text-muted-foreground mb-2">Từ đã lưu ({saved.size})</p>
          <div className="flex flex-wrap gap-2">
            {Array.from(saved).map(idx => (
              <span key={idx} className="px-3 py-1 rounded-lg bg-card text-sm border">
                {wordsOfDay[idx].flag} {wordsOfDay[idx].word.split(' ')[0]}
              </span>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}
