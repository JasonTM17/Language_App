'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';

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
    { id: '1', language: 'en', level: 'beginner', topic: 'Greetings', sentence: 'Hello, how are you today?', translation: 'Xin chào, hôm nay bạn khỏe không?' },
    { id: '2', language: 'en', level: 'beginner', topic: 'Greetings', sentence: 'Nice to meet you. My name is...', translation: 'Rất vui được gặp bạn. Tên tôi là...' },
    { id: '3', language: 'en', level: 'beginner', topic: 'Daily Life', sentence: 'What time do you usually wake up?', translation: 'Bạn thường thức dậy lúc mấy giờ?' },
    { id: '4', language: 'en', level: 'beginner', topic: 'Food', sentence: 'I would like to order a coffee, please.', translation: 'Tôi muốn gọi một ly cà phê.' },
    { id: '5', language: 'en', level: 'intermediate', topic: 'Work', sentence: 'Could you tell me about your work experience?', translation: 'Bạn có thể kể về kinh nghiệm làm việc không?' },
    { id: '6', language: 'en', level: 'intermediate', topic: 'Travel', sentence: 'Excuse me, how do I get to the train station?', translation: 'Xin lỗi, làm sao để đến ga tàu?' },
  ],
  ja: [
    { id: '7', language: 'ja', level: 'beginner', topic: 'Greetings', sentence: 'はじめまして、よろしくお願いします。', translation: 'Rất vui được gặp bạn, xin hãy chỉ giáo.', pronunciation: 'Hajimemashite, yoroshiku onegaishimasu.' },
    { id: '8', language: 'ja', level: 'beginner', topic: 'Daily Life', sentence: '今日はいい天気ですね。', translation: 'Hôm nay thời tiết đẹp nhỉ.', pronunciation: 'Kyou wa ii tenki desu ne.' },
    { id: '9', language: 'ja', level: 'beginner', topic: 'Food', sentence: 'すみません、メニューをください。', translation: 'Xin lỗi, cho tôi xem thực đơn.', pronunciation: 'Sumimasen, menyuu wo kudasai.' },
    { id: '10', language: 'ja', level: 'beginner', topic: 'Shopping', sentence: 'これはいくらですか？', translation: 'Cái này bao nhiêu tiền?', pronunciation: 'Kore wa ikura desu ka?' },
  ],
  zh: [
    { id: '11', language: 'zh', level: 'beginner', topic: 'Greetings', sentence: '你好，很高兴认识你。', translation: 'Xin chào, rất vui được gặp bạn.', pronunciation: 'Nǐ hǎo, hěn gāoxìng rènshi nǐ.' },
    { id: '12', language: 'zh', level: 'beginner', topic: 'Daily Life', sentence: '今天天气怎么样？', translation: 'Hôm nay thời tiết thế nào?', pronunciation: 'Jīntiān tiānqì zěnme yàng?' },
    { id: '13', language: 'zh', level: 'beginner', topic: 'Food', sentence: '我想点一杯咖啡。', translation: 'Tôi muốn gọi một ly cà phê.', pronunciation: 'Wǒ xiǎng diǎn yī bēi kāfēi.' },
    { id: '14', language: 'zh', level: 'beginner', topic: 'Shopping', sentence: '这个多少钱？', translation: 'Cái này bao nhiêu tiền?', pronunciation: 'Zhège duōshǎo qián?' },
  ],
  ko: [
    { id: '15', language: 'ko', level: 'beginner', topic: 'Greetings', sentence: '안녕하세요, 만나서 반갑습니다.', translation: 'Xin chào, rất vui được gặp bạn.', pronunciation: 'Annyeonghaseyo, mannaseo bangapseumnida.' },
    { id: '16', language: 'ko', level: 'beginner', topic: 'Daily Life', sentence: '오늘 날씨가 좋네요.', translation: 'Hôm nay thời tiết đẹp nhỉ.', pronunciation: 'Oneul nalssiga jonneyo.' },
    { id: '17', language: 'ko', level: 'beginner', topic: 'Food', sentence: '메뉴 좀 보여주세요.', translation: 'Cho tôi xem thực đơn.', pronunciation: 'Menyu jom boyeojuseyo.' },
    { id: '18', language: 'ko', level: 'beginner', topic: 'Shopping', sentence: '이거 얼마예요?', translation: 'Cái này bao nhiêu tiền?', pronunciation: 'Igeo eolmayeyo?' },
  ],
};

const languages = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
  { code: 'zh', name: 'Chinese', flag: '🇨🇳' },
  { code: 'ko', name: 'Korean', flag: '🇰🇷' },
];

export default function SpeakingPage() {
  const [selectedLang, setSelectedLang] = useState('en');
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [transcript, setTranscript] = useState<string | null>(null);
  const [score, setScore] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [showTranslation, setShowTranslation] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const currentPrompts = prompts[selectedLang] || [];
  const currentPrompt = currentPrompts[currentPromptIndex];

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
        stream.getTracks().forEach(track => track.stop());
        simulateScoring();
      };

      mediaRecorder.start();
      setIsRecording(true);
      setAudioUrl(null);
      setTranscript(null);
      setScore(null);
      setFeedback(null);
    } catch {
      setFeedback('Không thể truy cập microphone. Vui lòng cho phép quyền truy cập.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const simulateScoring = () => {
    const randomScore = Math.floor(Math.random() * 30) + 70;
    setScore(randomScore);
    setTranscript(currentPrompt?.sentence || '');

    if (randomScore >= 90) {
      setFeedback('Tuyệt vời! Phát âm rất chuẩn.');
    } else if (randomScore >= 80) {
      setFeedback('Tốt lắm! Chỉ cần luyện thêm một chút nữa.');
    } else {
      setFeedback('Khá tốt! Hãy nghe lại và thử lần nữa nhé.');
    }
  };

  const nextPrompt = () => {
    setCurrentPromptIndex((prev) => (prev + 1) % currentPrompts.length);
    setAudioUrl(null);
    setTranscript(null);
    setScore(null);
    setFeedback(null);
    setShowTranslation(false);
  };

  const prevPrompt = () => {
    setCurrentPromptIndex((prev) => (prev - 1 + currentPrompts.length) % currentPrompts.length);
    setAudioUrl(null);
    setTranscript(null);
    setScore(null);
    setFeedback(null);
    setShowTranslation(false);
  };

  useEffect(() => {
    setCurrentPromptIndex(0);
    setAudioUrl(null);
    setTranscript(null);
    setScore(null);
    setFeedback(null);
  }, [selectedLang]);

  if (!currentPrompt) {
    return (
      <div className="text-center py-16">
        <div className="text-5xl mb-4">🎤</div>
        <h3 className="text-lg font-semibold mb-2">Chưa có bài luyện nói</h3>
        <p className="text-gray-500">Chọn ngôn ngữ để bắt đầu luyện phát âm.</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-display">Luyện nói</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Luyện phát âm với các câu mẫu</p>
      </div>

      {/* Language selector */}
      <div className="flex gap-2">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => setSelectedLang(lang.code)}
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

      {/* Prompt card */}
      <div className="p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs px-2 py-1 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 font-medium">
            {currentPrompt.topic}
          </span>
          <span className="text-sm text-gray-500">
            {currentPromptIndex + 1} / {currentPrompts.length}
          </span>
        </div>

        <p className="text-2xl font-bold text-center mb-3 leading-relaxed">
          {currentPrompt.sentence}
        </p>

        {currentPrompt.pronunciation && (
          <p className="text-center text-sm text-gray-500 mb-2 italic">
            {currentPrompt.pronunciation}
          </p>
        )}

        <button
          onClick={() => setShowTranslation(!showTranslation)}
          className="block mx-auto text-sm text-primary-600 dark:text-primary-400 hover:underline"
        >
          {showTranslation ? 'Ẩn nghĩa' : 'Xem nghĩa tiếng Việt'}
        </button>

        {showTranslation && (
          <p className="text-center text-gray-600 dark:text-gray-400 mt-2">
            {currentPrompt.translation}
          </p>
        )}
      </div>

      {/* Recording controls */}
      <div className="flex flex-col items-center gap-4">
        <button
          onClick={isRecording ? stopRecording : startRecording}
          className={`w-20 h-20 rounded-full flex items-center justify-center transition-all shadow-lg ${
            isRecording
              ? 'bg-red-500 hover:bg-red-600 animate-pulse'
              : 'bg-primary-500 hover:bg-primary-600'
          }`}
        >
          {isRecording ? (
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
              <rect x="6" y="6" width="12" height="12" rx="2" />
            </svg>
          ) : (
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" />
              <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
            </svg>
          )}
        </button>
        <p className="text-sm text-gray-500">
          {isRecording ? 'Đang ghi âm... Nhấn để dừng' : 'Nhấn để bắt đầu ghi âm'}
        </p>
      </div>

      {/* Playback */}
      {audioUrl && (
        <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
          <p className="text-sm font-medium mb-2">Bản ghi của bạn:</p>
          <audio src={audioUrl} controls className="w-full" />
        </div>
      )}

      {/* Score & Feedback */}
      {score !== null && (
        <div className="p-5 rounded-2xl bg-gradient-to-r from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20 border border-primary-200 dark:border-primary-800">
          <div className="flex items-center gap-4">
            <div className="text-center">
              <div className={`text-3xl font-bold ${
                score >= 90 ? 'text-green-600' : score >= 80 ? 'text-yellow-600' : 'text-orange-600'
              }`}>
                {score}%
              </div>
              <p className="text-xs text-gray-500">Điểm</p>
            </div>
            <div className="flex-1">
              <p className="font-medium text-sm">{feedback}</p>
              {transcript && (
                <p className="text-xs text-gray-500 mt-1">
                  Nhận diện: &ldquo;{transcript}&rdquo;
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={prevPrompt}>
          ← Câu trước
        </Button>
        <Button onClick={nextPrompt}>
          Câu tiếp →
        </Button>
      </div>
    </div>
  );
}
