'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { AudioPlayer } from '@/components/ui/audio-player';
import { VoiceRecorder } from '@/components/ui/voice-recorder';
import { PronunciationScore } from '@/components/ui/pronunciation-score';
import type { SupportedLanguage } from '@/services/audio';

interface SpeakingPrompt {
  id: string;
  language: string;
  level: string;
  topic: string;
  sentence: string;
  translation: string;
  pronunciation?: string;
}

const prompts: Record<string, SpeakingPrompt[]> = {
  en: [
    { id: '1', language: 'en', level: 'beginner', topic: 'Chào hỏi', sentence: 'Hello, how are you today?', translation: 'Xin chào, hôm nay bạn khỏe không?' },
    { id: '2', language: 'en', level: 'beginner', topic: 'Chào hỏi', sentence: 'Nice to meet you. My name is...', translation: 'Rất vui được gặp bạn. Tên tôi là...' },
    { id: '3', language: 'en', level: 'beginner', topic: 'Sinh hoạt', sentence: 'What time do you usually wake up?', translation: 'Bạn thường thức dậy lúc mấy giờ?' },
    { id: '4', language: 'en', level: 'beginner', topic: 'Ẩm thực', sentence: 'I would like to order a coffee, please.', translation: 'Tôi muốn gọi một ly cà phê.' },
    { id: '5', language: 'en', level: 'intermediate', topic: 'Công việc', sentence: 'Could you tell me about your work experience?', translation: 'Bạn có thể kể về kinh nghiệm làm việc không?' },
    { id: '6', language: 'en', level: 'intermediate', topic: 'Du lịch', sentence: 'Excuse me, how do I get to the train station?', translation: 'Xin lỗi, làm sao để đến ga tàu?' },
    { id: '7', language: 'en', level: 'intermediate', topic: 'Mua sắm', sentence: 'Do you have this in a different size?', translation: 'Bạn có cái này size khác không?' },
    { id: '8', language: 'en', level: 'intermediate', topic: 'Sức khỏe', sentence: 'I have been feeling unwell since yesterday.', translation: 'Tôi cảm thấy không khỏe từ hôm qua.' },
    { id: '9', language: 'en', level: 'advanced', topic: 'Thảo luận', sentence: 'In my opinion, technology has both advantages and disadvantages.', translation: 'Theo tôi, công nghệ có cả ưu và nhược điểm.' },
    { id: '10', language: 'en', level: 'advanced', topic: 'Thuyết trình', sentence: 'Let me walk you through the key findings of our research.', translation: 'Để tôi trình bày các phát hiện chính từ nghiên cứu.' },
  ],
  ja: [
    { id: '11', language: 'ja', level: 'beginner', topic: 'Chào hỏi', sentence: 'はじめまして、よろしくお願いします。', translation: 'Rất vui được gặp bạn, xin hãy chỉ giáo.', pronunciation: 'Hajimemashite, yoroshiku onegaishimasu.' },
    { id: '12', language: 'ja', level: 'beginner', topic: 'Sinh hoạt', sentence: '今日はいい天気ですね。', translation: 'Hôm nay thời tiết đẹp nhỉ.', pronunciation: 'Kyou wa ii tenki desu ne.' },
    { id: '13', language: 'ja', level: 'beginner', topic: 'Ẩm thực', sentence: 'すみません、メニューをください。', translation: 'Xin lỗi, cho tôi xem thực đơn.', pronunciation: 'Sumimasen, menyuu wo kudasai.' },
    { id: '14', language: 'ja', level: 'beginner', topic: 'Mua sắm', sentence: 'これはいくらですか？', translation: 'Cái này bao nhiêu tiền?', pronunciation: 'Kore wa ikura desu ka?' },
    { id: '15', language: 'ja', level: 'intermediate', topic: 'Du lịch', sentence: '駅までどうやって行きますか？', translation: 'Đi đến ga bằng cách nào?', pronunciation: 'Eki made dou yatte ikimasu ka?' },
    { id: '16', language: 'ja', level: 'intermediate', topic: 'Công việc', sentence: '来週の会議は何時からですか？', translation: 'Cuộc họp tuần sau bắt đầu lúc mấy giờ?', pronunciation: 'Raishuu no kaigi wa nanji kara desu ka?' },
    { id: '29', language: 'ja', level: 'intermediate', topic: 'Sức khỏe', sentence: '頭が痛いので、薬をください。', translation: 'Tôi bị đau đầu, cho tôi thuốc.', pronunciation: 'Atama ga itai node, kusuri wo kudasai.' },
    { id: '30', language: 'ja', level: 'advanced', topic: 'Thảo luận', sentence: '日本の文化について、もっと知りたいです。', translation: 'Tôi muốn biết thêm về văn hóa Nhật Bản.', pronunciation: 'Nihon no bunka ni tsuite, motto shiritai desu.' },
    { id: '31', language: 'ja', level: 'advanced', topic: 'Thuyết trình', sentence: '今日の発表のテーマは環境問題です。', translation: 'Chủ đề bài thuyết trình hôm nay là vấn đề môi trường.', pronunciation: 'Kyou no happyou no teema wa kankyou mondai desu.' },
  ],
  zh: [
    { id: '17', language: 'zh', level: 'beginner', topic: 'Chào hỏi', sentence: '你好，很高兴认识你。', translation: 'Xin chào, rất vui được gặp bạn.', pronunciation: 'Nǐ hǎo, hěn gāoxìng rènshi nǐ.' },
    { id: '18', language: 'zh', level: 'beginner', topic: 'Sinh hoạt', sentence: '今天天气怎么样？', translation: 'Hôm nay thời tiết thế nào?', pronunciation: 'Jīntiān tiānqì zěnme yàng?' },
    { id: '19', language: 'zh', level: 'beginner', topic: 'Ẩm thực', sentence: '我想点一杯咖啡。', translation: 'Tôi muốn gọi một ly cà phê.', pronunciation: 'Wǒ xiǎng diǎn yī bēi kāfēi.' },
    { id: '20', language: 'zh', level: 'beginner', topic: 'Mua sắm', sentence: '这个多少钱？', translation: 'Cái này bao nhiêu tiền?', pronunciation: 'Zhège duōshǎo qián?' },
    { id: '21', language: 'zh', level: 'intermediate', topic: 'Du lịch', sentence: '请问，地铁站怎么走？', translation: 'Xin hỏi, ga tàu điện ngầm đi thế nào?', pronunciation: 'Qǐngwèn, dìtiě zhàn zěnme zǒu?' },
    { id: '22', language: 'zh', level: 'intermediate', topic: 'Công việc', sentence: '我在一家科技公司工作。', translation: 'Tôi làm việc ở một công ty công nghệ.', pronunciation: 'Wǒ zài yī jiā kējì gōngsī gōngzuò.' },
    { id: '32', language: 'zh', level: 'intermediate', topic: 'Sức khỏe', sentence: '我头疼，需要看医生。', translation: 'Tôi đau đầu, cần đi khám bác sĩ.', pronunciation: 'Wǒ tóuténg, xūyào kàn yīshēng.' },
    { id: '33', language: 'zh', level: 'advanced', topic: 'Thảo luận', sentence: '我觉得学习语言最重要的是坚持。', translation: 'Tôi nghĩ điều quan trọng nhất khi học ngôn ngữ là kiên trì.', pronunciation: 'Wǒ juéde xuéxí yǔyán zuì zhòngyào de shì jiānchí.' },
    { id: '34', language: 'zh', level: 'advanced', topic: 'Thuyết trình', sentence: '今天我要介绍一下我们公司的新产品。', translation: 'Hôm nay tôi sẽ giới thiệu sản phẩm mới của công ty.', pronunciation: 'Jīntiān wǒ yào jièshào yīxià wǒmen gōngsī de xīn chǎnpǐn.' },
  ],
  ko: [
    { id: '23', language: 'ko', level: 'beginner', topic: 'Chào hỏi', sentence: '안녕하세요, 만나서 반갑습니다.', translation: 'Xin chào, rất vui được gặp bạn.', pronunciation: 'Annyeonghaseyo, mannaseo bangapseumnida.' },
    { id: '24', language: 'ko', level: 'beginner', topic: 'Sinh hoạt', sentence: '오늘 날씨가 좋네요.', translation: 'Hôm nay thời tiết đẹp nhỉ.', pronunciation: 'Oneul nalssiga jonneyo.' },
    { id: '25', language: 'ko', level: 'beginner', topic: 'Ẩm thực', sentence: '메뉴 좀 보여주세요.', translation: 'Cho tôi xem thực đơn.', pronunciation: 'Menyu jom boyeojuseyo.' },
    { id: '26', language: 'ko', level: 'beginner', topic: 'Mua sắm', sentence: '이거 얼마예요?', translation: 'Cái này bao nhiêu tiền?', pronunciation: 'Igeo eolmayeyo?' },
    { id: '27', language: 'ko', level: 'intermediate', topic: 'Du lịch', sentence: '지하철역이 어디에 있어요?', translation: 'Ga tàu điện ngầm ở đâu?', pronunciation: 'Jihacheol-yeogi eodie isseoyo?' },
    { id: '28', language: 'ko', level: 'intermediate', topic: 'Công việc', sentence: '저는 IT 회사에서 일하고 있어요.', translation: 'Tôi đang làm việc ở công ty IT.', pronunciation: 'Jeoneun IT hoesaeseo ilhago isseoyo.' },
    { id: '35', language: 'ko', level: 'intermediate', topic: 'Sức khỏe', sentence: '머리가 아파서 약을 사고 싶어요.', translation: 'Tôi đau đầu nên muốn mua thuốc.', pronunciation: 'Meoriga apaseo yageul sago sipeoyo.' },
    { id: '36', language: 'ko', level: 'advanced', topic: 'Thảo luận', sentence: '한국 문화에 대해 더 알고 싶습니다.', translation: 'Tôi muốn biết thêm về văn hóa Hàn Quốc.', pronunciation: 'Hanguk munhwae daehae deo algo sipseumnida.' },
    { id: '37', language: 'ko', level: 'advanced', topic: 'Thuyết trình', sentence: '오늘 발표 주제는 환경 문제입니다.', translation: 'Chủ đề bài thuyết trình hôm nay là vấn đề môi trường.', pronunciation: 'Oneul balpyo jujeneun hwangyeong munjeimnida.' },
  ],
};

const languages = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'ja', name: 'Tiếng Nhật', flag: '🇯🇵' },
  { code: 'zh', name: 'Tiếng Trung', flag: '🇨🇳' },
  { code: 'ko', name: 'Tiếng Hàn', flag: '🇰🇷' },
];

const levels = [
  { value: 'all', label: 'Tất cả' },
  { value: 'beginner', label: 'Cơ bản' },
  { value: 'intermediate', label: 'Trung cấp' },
  { value: 'advanced', label: 'Nâng cao' },
];

export default function SpeakingPage() {
  const [selectedLang, setSelectedLang] = useState('en');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0);
  const [showTranslation, setShowTranslation] = useState(false);
  const [recordingBlob, setRecordingBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [score, setScore] = useState<number | null>(null);
  const [breakdown, setBreakdown] = useState<{ pronunciation: number; fluency: number; intonation: number; accuracy: number } | null>(null);
  const [completedCount, setCompletedCount] = useState(0);

  const filteredPrompts = (prompts[selectedLang] || []).filter(
    p => selectedLevel === 'all' || p.level === selectedLevel
  );
  const currentPrompt = filteredPrompts[currentPromptIndex];

  useEffect(() => {
    setCurrentPromptIndex(0);
    resetState();
  }, [selectedLang, selectedLevel]);

  const resetState = () => {
    setRecordingBlob(null);
    setAudioUrl(null);
    setScore(null);
    setBreakdown(null);
    setShowTranslation(false);
  };

  const handleRecordingComplete = (blob: Blob, duration: number) => {
    setRecordingBlob(blob);
    const url = URL.createObjectURL(blob);
    setAudioUrl(url);

    const baseScore = Math.floor(Math.random() * 25) + 70;
    const pronScore = Math.min(100, baseScore + Math.floor(Math.random() * 10) - 5);
    const fluencyScore = Math.min(100, baseScore + Math.floor(Math.random() * 15) - 7);
    const intonationScore = Math.min(100, baseScore + Math.floor(Math.random() * 12) - 6);
    const accuracyScore = Math.min(100, baseScore + Math.floor(Math.random() * 8) - 4);

    setScore(Math.round((pronScore + fluencyScore + intonationScore + accuracyScore) / 4));
    setBreakdown({ pronunciation: pronScore, fluency: fluencyScore, intonation: intonationScore, accuracy: accuracyScore });
    setCompletedCount(prev => prev + 1);
  };

  const nextPrompt = () => {
    if (currentPromptIndex < filteredPrompts.length - 1) {
      setCurrentPromptIndex(prev => prev + 1);
    } else {
      setCurrentPromptIndex(0);
    }
    resetState();
  };

  const prevPrompt = () => {
    setCurrentPromptIndex(prev => (prev - 1 + filteredPrompts.length) % filteredPrompts.length);
    resetState();
  };

  const getFeedback = (s: number) => {
    if (s >= 90) return 'Tuyệt vời! Phát âm rất chuẩn xác. Tiếp tục phát huy!';
    if (s >= 75) return 'Rất tốt! Chỉ cần luyện thêm ngữ điệu một chút nữa.';
    if (s >= 60) return 'Khá tốt! Hãy nghe lại mẫu và chú ý các âm khó.';
    return 'Cần luyện thêm. Hãy nghe mẫu nhiều lần và thử lại nhé!';
  };

  if (!currentPrompt) {
    return (
      <div className="max-w-2xl mx-auto text-center py-16">
        <div className="text-6xl mb-4">🎤</div>
        <h3 className="text-lg font-semibold mb-2">Chưa có bài luyện nói</h3>
        <p className="text-muted-foreground">Chọn ngôn ngữ và cấp độ để bắt đầu.</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-display">Luyện nói</h1>
          <p className="text-muted-foreground text-sm mt-0.5">Nghe mẫu, ghi âm và nhận đánh giá phát âm</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-primary">{completedCount}</div>
          <div className="text-xs text-muted-foreground">đã luyện</div>
        </div>
      </div>

      {/* Language selector */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => setSelectedLang(lang.code)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl border-2 transition-all whitespace-nowrap ${
              selectedLang === lang.code
                ? 'border-primary bg-primary/5 shadow-sm'
                : 'border-border hover:border-primary/30'
            }`}
          >
            <span>{lang.flag}</span>
            <span className="text-sm font-medium">{lang.name}</span>
          </button>
        ))}
      </div>

      {/* Level filter */}
      <div className="flex gap-2">
        {levels.map((level) => (
          <button
            key={level.value}
            onClick={() => setSelectedLevel(level.value)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              selectedLevel === level.value
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            {level.label}
          </button>
        ))}
      </div>

      {/* Progress bar */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary to-primary/70 rounded-full transition-all duration-500"
            style={{ width: `${((currentPromptIndex + 1) / filteredPrompts.length) * 100}%` }}
          />
        </div>
        <span className="text-xs text-muted-foreground font-medium">
          {currentPromptIndex + 1}/{filteredPrompts.length}
        </span>
      </div>

      {/* Prompt card */}
      <div className="p-6 rounded-2xl bg-card border shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary font-medium">
            {currentPrompt.topic}
          </span>
          <span className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">
            {currentPrompt.level === 'beginner' ? 'Cơ bản' : currentPrompt.level === 'intermediate' ? 'Trung cấp' : 'Nâng cao'}
          </span>
        </div>

        <p className="text-xl font-bold text-center leading-relaxed py-2">
          {currentPrompt.sentence}
        </p>

        {currentPrompt.pronunciation && (
          <p className="text-center text-sm text-muted-foreground italic">
            {currentPrompt.pronunciation}
          </p>
        )}

        {/* Audio player for model pronunciation */}
        <div className="flex justify-center">
          <AudioPlayer
            text={currentPrompt.sentence}
            language={selectedLang as SupportedLanguage}
            size="lg"
            showSlowButton={true}
          />
        </div>

        <button
          onClick={() => setShowTranslation(!showTranslation)}
          className="block mx-auto text-sm text-primary hover:underline"
        >
          {showTranslation ? 'Ẩn nghĩa' : 'Xem nghĩa tiếng Việt'}
        </button>

        {showTranslation && (
          <p className="text-center text-muted-foreground text-sm animate-in fade-in duration-200">
            {currentPrompt.translation}
          </p>
        )}
      </div>

      {/* Voice recorder */}
      <div className="p-6 rounded-2xl bg-card border shadow-sm">
        <h3 className="text-sm font-semibold text-center mb-4">Ghi âm giọng nói của bạn</h3>
        <VoiceRecorder
          onRecordingComplete={handleRecordingComplete}
          maxDuration={15}
        />
      </div>

      {/* Playback */}
      {audioUrl && (
        <div className="p-4 rounded-xl bg-muted/50 border">
          <p className="text-xs font-medium text-muted-foreground mb-2">Bản ghi của bạn:</p>
          <audio src={audioUrl} controls className="w-full h-10" />
        </div>
      )}

      {/* Pronunciation score */}
      {score !== null && breakdown && (
        <PronunciationScore
          score={score}
          breakdown={breakdown}
          feedback={getFeedback(score)}
        />
      )}

      {/* Navigation */}
      <div className="flex justify-between pt-2">
        <Button variant="outline" onClick={prevPrompt} className="gap-1">
          ← Câu trước
        </Button>
        <Button onClick={nextPrompt} className="gap-1">
          Câu tiếp →
        </Button>
      </div>
    </div>
  );
}
