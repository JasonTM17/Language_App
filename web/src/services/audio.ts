'use client';

type SupportedLanguage = 'en' | 'ja' | 'zh' | 'ko' | 'vi';

const LANGUAGE_VOICES: Record<SupportedLanguage, string> = {
  en: 'en-US',
  ja: 'ja-JP',
  zh: 'zh-CN',
  ko: 'ko-KR',
  vi: 'vi-VN',
};

const LANGUAGE_RATES: Record<SupportedLanguage, number> = {
  en: 0.9,
  ja: 0.85,
  zh: 0.8,
  ko: 0.85,
  vi: 0.9,
};

class AudioService {
  private synth: SpeechSynthesis | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      this.synth = window.speechSynthesis;
    }
  }

  isSupported(): boolean {
    return this.synth !== null && 'speechSynthesis' in window;
  }

  speak(text: string, language: SupportedLanguage = 'en', rate?: number): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.synth) {
        reject(new Error('Speech synthesis not supported'));
        return;
      }

      this.stop();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = LANGUAGE_VOICES[language];
      utterance.rate = rate ?? LANGUAGE_RATES[language];
      utterance.pitch = 1;
      utterance.volume = 1;

      const voices = this.synth.getVoices();
      const langVoice = voices.find(v => v.lang.startsWith(LANGUAGE_VOICES[language].split('-')[0]));
      if (langVoice) {
        utterance.voice = langVoice;
      }

      utterance.onend = () => {
        this.currentUtterance = null;
        resolve();
      };
      utterance.onerror = (event) => {
        this.currentUtterance = null;
        reject(event.error);
      };

      this.currentUtterance = utterance;
      this.synth.speak(utterance);
    });
  }

  speakSlow(text: string, language: SupportedLanguage = 'en'): Promise<void> {
    const slowRate = (LANGUAGE_RATES[language] || 0.9) * 0.6;
    return this.speak(text, language, slowRate);
  }

  stop(): void {
    if (this.synth) {
      this.synth.cancel();
      this.currentUtterance = null;
    }
  }

  isSpeaking(): boolean {
    return this.synth?.speaking ?? false;
  }

  getAvailableVoices(language?: SupportedLanguage): SpeechSynthesisVoice[] {
    if (!this.synth) return [];
    const voices = this.synth.getVoices();
    if (!language) return voices;
    const langCode = LANGUAGE_VOICES[language].split('-')[0];
    return voices.filter(v => v.lang.startsWith(langCode));
  }
}

export const audioService = new AudioService();
export type { SupportedLanguage };
