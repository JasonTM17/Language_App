'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';

const BCP47_MAP: Record<string, string> = {
  en: 'en-US',
  ja: 'ja-JP',
  zh: 'zh-CN',
  ko: 'ko-KR',
};

export default function PronunciationPage() {
  const [text, setText] = useState('');
  const [language, setLanguage] = useState('en');
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [supported, setSupported] = useState(true);
  const recognitionRef = useRef<any>(null);

  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
    { code: 'zh', name: 'Chinese', flag: '🇨🇳' },
    { code: 'ko', name: 'Korean', flag: '🇰🇷' },
  ];

  const samplePhrases: Record<string, string[]> = {
    en: ['Hello, how are you?', 'Nice to meet you.', 'What is your name?', 'Thank you very much.', 'Where is the nearest station?', 'I would like to order, please.', 'Could you speak more slowly?', 'I am learning English every day.'],
    ja: ['こんにちは、元気ですか？', 'はじめまして。', 'お名前は何ですか？', 'ありがとうございます。', 'すみません、駅はどこですか？', '注文をお願いします。', 'もう少しゆっくり話してください。', '毎日日本語を勉強しています。'],
    zh: ['你好，你好吗？', '认识你很高兴。', '你叫什么名字？', '非常感谢。', '请问，地铁站在哪里？', '我想点菜。', '请说慢一点。', '我每天都在学中文。'],
    ko: ['안녕하세요, 잘 지내세요?', '만나서 반갑습니다.', '이름이 뭐예요?', '감사합니다.', '실례합니다, 역이 어디에 있어요?', '주문하고 싶어요.', '좀 더 천천히 말해 주세요.', '매일 한국어를 공부하고 있어요.'],
  };

  const startRecording = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setSupported(false);
      setFeedback('Speech recognition is not supported in this browser. Please use Chrome or Edge.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = BCP47_MAP[language] || 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event: any) => {
      const result = event.results[0][0].transcript;
      const confidence = Math.round(event.results[0][0].confidence * 100);
      setTranscript(result);
      analyzePronunciation(result, confidence);
    };

    recognition.onerror = (event: any) => {
      setIsRecording(false);
      if (event.error === 'no-speech') {
        setFeedback('No speech detected. Please try again and speak clearly.');
      } else {
        setFeedback(`Error: ${event.error}. Please try again.`);
      }
    };

    recognition.onend = () => {
      setIsRecording(false);
    };

    recognitionRef.current = recognition;
    recognition.start();
    setIsRecording(true);
    setFeedback(null);
    setTranscript('');
  };

  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsRecording(false);
  };

  const analyzePronunciation = (spoken: string, confidence: number) => {
    const target = text.trim();
    let analysis = '';

    if (target) {
      const similarity = calculateSimilarity(spoken.toLowerCase(), target.toLowerCase());
      const score = Math.round(similarity * 100);

      if (score >= 90) {
        analysis = `Excellent! Your pronunciation is very accurate (${score}% match).\n\nYou said: "${spoken}"\nTarget: "${target}"\n\nConfidence: ${confidence}%`;
      } else if (score >= 70) {
        analysis = `Good effort! (${score}% match)\n\nYou said: "${spoken}"\nTarget: "${target}"\n\nTry to focus on the parts that differ. Speak slowly and clearly.`;
      } else {
        analysis = `Keep practicing! (${score}% match)\n\nYou said: "${spoken}"\nTarget: "${target}"\n\nTip: Listen to native speakers and try to mimic their rhythm and intonation.`;
      }
    } else {
      analysis = `Recognized: "${spoken}"\nConfidence: ${confidence}%\n\nSelect a sample phrase above to compare your pronunciation against a target.`;
    }

    setFeedback(analysis);
  };

  const calculateSimilarity = (a: string, b: string): number => {
    if (a === b) return 1;
    const longer = a.length > b.length ? a : b;
    const shorter = a.length > b.length ? b : a;
    if (longer.length === 0) return 1;

    const costs: number[] = [];
    for (let i = 0; i <= longer.length; i++) {
      let lastValue = i;
      for (let j = 0; j <= shorter.length; j++) {
        if (i === 0) {
          costs[j] = j;
        } else if (j > 0) {
          let newValue = costs[j - 1];
          if (longer.charAt(i - 1) !== shorter.charAt(j - 1)) {
            newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
          }
          costs[j - 1] = lastValue;
          lastValue = newValue;
        }
      }
      if (i > 0) costs[shorter.length] = lastValue;
    }
    return (longer.length - costs[shorter.length]) / longer.length;
  };

  const speakText = () => {
    if (!text.trim()) return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = BCP47_MAP[language] || 'en-US';
    utterance.rate = 0.8;
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold font-display">Pronunciation Practice</h1>
        <p className="text-muted-foreground mt-1">Improve your speaking skills with real-time feedback</p>
      </div>

      <div className="p-6 rounded-2xl bg-card border border">
        <h2 className="font-semibold mb-4">Select Language</h2>
        <div className="grid grid-cols-4 gap-3 mb-6">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => { setLanguage(lang.code); setFeedback(null); setTranscript(''); }}
              className={`p-3 rounded-xl border-2 text-center transition-all ${
                language === lang.code ? 'border-primary bg-primary/5' : 'border-border'
              }`}
            >
              <div className="text-xl">{lang.flag}</div>
              <p className="text-xs font-medium mt-1">{lang.name}</p>
            </button>
          ))}
        </div>

        <h2 className="font-semibold mb-3">Sample Phrases</h2>
        <div className="space-y-2 mb-6">
          {samplePhrases[language]?.map((phrase, i) => (
            <button
              key={i}
              onClick={() => setText(phrase)}
              className={`w-full text-left p-3 rounded-xl border transition-colors text-sm ${
                text === phrase
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary-300 dark:hover:border-primary-700'
              }`}
            >
              {phrase}
            </button>
          ))}
        </div>

        <h2 className="font-semibold mb-3">Or Type Your Own</h2>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a sentence to practice..."
          className="w-full px-4 py-3 rounded-xl border border-border bg-muted/50 focus:ring-2 focus:ring-primary-500 outline-none resize-none h-24"
        />

        <div className="flex gap-3 mt-4">
          <Button
            onClick={isRecording ? stopRecording : startRecording}
            variant={isRecording ? 'destructive' : 'default'}
            className="flex-1"
          >
            {isRecording ? '⏹ Stop Recording' : '🎙️ Record Voice'}
          </Button>
          <Button onClick={speakText} variant="outline" className="flex-1" disabled={!text.trim()}>
            🔊 Listen
          </Button>
        </div>

        {isRecording && (
          <div className="mt-4 flex items-center justify-center gap-2 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
            <span className="text-sm text-red-700 dark:text-red-300">Recording... Speak now</span>
          </div>
        )}
      </div>

      {transcript && (
        <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800">
          <p className="text-sm text-blue-800 dark:text-blue-300">
            <strong>You said:</strong> {transcript}
          </p>
        </div>
      )}

      {feedback && (
        <div className="p-6 rounded-2xl bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800">
          <h3 className="font-semibold text-green-800 dark:text-green-300 mb-2">Feedback</h3>
          <p className="text-sm text-green-700 dark:text-green-400 whitespace-pre-line">{feedback}</p>
        </div>
      )}

      {!supported && (
        <div className="p-4 rounded-xl bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-800">
          <p className="text-sm text-yellow-800 dark:text-yellow-300">
            Speech recognition requires Chrome or Edge browser. Safari and Firefox have limited support.
          </p>
        </div>
      )}
    </div>
  );
}
