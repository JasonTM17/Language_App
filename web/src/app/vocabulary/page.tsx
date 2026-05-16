'use client';

import { useEffect, useState } from 'react';
import { AudioPlayer } from '@/components/ui/audio-player';
import { api } from '@/services/api';
import type { SupportedLanguage } from '@/services/audio';

interface VocabWord {
  id: string;
  word: string;
  reading?: string;
  meaning: string;
  example?: string;
  exampleMeaning?: string;
  lesson?: { title: string; level?: { language?: { name: string; flag: string; code: string } } };
}

function detectLang(word: string): SupportedLanguage {
  if (/[぀-ゟ゠-ヿ]/.test(word)) return 'ja';
  if (/[一-鿿]/.test(word) && !/[぀-ゟ]/.test(word)) return 'zh';
  if (/[가-힯]/.test(word)) return 'ko';
  return 'en';
}

export default function VocabularyPage() {
  const [vocabulary, setVocabulary] = useState<VocabWord[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [dueOnly, setDueOnly] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    api.vocabulary.list(undefined, dueOnly)
      .then((data: any) => setVocabulary(data.vocabulary || []))
      .catch(() => setVocabulary([]))
      .finally(() => setLoading(false));
  }, [dueOnly]);

  const filtered = vocabulary.filter((v) =>
    v.word.toLowerCase().includes(search.toLowerCase()) ||
    v.meaning.toLowerCase().includes(search.toLowerCase()) ||
    (v.reading && v.reading.toLowerCase().includes(search.toLowerCase()))
  );

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-8 w-48 bg-muted rounded-lg" />
        <div className="h-12 bg-muted rounded-xl" />
        {[...Array(6)].map((_, i) => <div key={i} className="h-20 bg-muted rounded-xl" />)}
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-display">Từ vựng</h1>
          <p className="text-muted-foreground text-sm mt-0.5">
            {vocabulary.length} từ đã học {dueOnly && `• ${filtered.length} cần ôn`}
          </p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-primary">{vocabulary.length}</div>
          <div className="text-xs text-muted-foreground">tổng từ</div>
        </div>
      </div>

      {/* Search and filter */}
      <div className="flex gap-3">
        <div className="flex-1 relative">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm kiếm từ vựng..."
            className="w-full px-4 py-3 pl-10 rounded-xl border bg-card focus:ring-2 focus:ring-primary outline-none"
          />
          <svg className="absolute left-3 top-3.5 w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <button
          onClick={() => setDueOnly(!dueOnly)}
          className={`px-4 py-3 rounded-xl border-2 font-medium text-sm transition-all whitespace-nowrap ${
            dueOnly
              ? 'border-primary bg-primary/5 text-primary'
              : 'border-border text-muted-foreground hover:border-primary/30'
          }`}
        >
          📅 Cần ôn
        </button>
      </div>

      {/* Vocabulary list */}
      <div className="space-y-2">
        {filtered.map((word) => {
          const lang = word.lesson?.level?.language?.code as SupportedLanguage || detectLang(word.word);
          const isExpanded = expandedId === word.id;

          return (
            <div
              key={word.id}
              className="p-4 rounded-xl bg-card border hover:shadow-sm transition-all cursor-pointer"
              onClick={() => setExpandedId(isExpanded ? null : word.id)}
            >
              <div className="flex items-center gap-3">
                <div className="shrink-0" onClick={(e) => e.stopPropagation()}>
                  <AudioPlayer text={word.word} language={lang} size="sm" showSlowButton={false} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-base font-bold truncate">{word.word}</span>
                    {word.reading && (
                      <span className="text-xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded shrink-0">
                        {word.reading}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-primary font-medium truncate">{word.meaning}</p>
                </div>
                <svg className={`w-4 h-4 text-muted-foreground shrink-0 transition-transform ${isExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>

              {isExpanded && word.example && (
                <div className="mt-3 pt-3 border-t space-y-1 animate-in slide-in-from-top-1 duration-200">
                  <p className="text-sm italic text-foreground/80">{word.example}</p>
                  {word.exampleMeaning && (
                    <p className="text-xs text-muted-foreground">{word.exampleMeaning}</p>
                  )}
                  <div className="pt-2" onClick={(e) => e.stopPropagation()}>
                    <AudioPlayer text={word.example} language={lang} size="sm" showSlowButton={true} />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">📚</div>
          <h3 className="text-lg font-semibold mb-2">
            {search ? 'Không tìm thấy từ nào' : 'Chưa có từ vựng'}
          </h3>
          <p className="text-muted-foreground">
            {search ? 'Thử tìm kiếm với từ khóa khác.' : 'Hoàn thành bài học để mở khóa từ vựng.'}
          </p>
        </div>
      )}
    </div>
  );
}
