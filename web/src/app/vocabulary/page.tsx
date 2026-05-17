'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6 pb-8"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-display">Từ vựng</h1>
          <p className="text-muted-foreground text-sm mt-0.5">
            {vocabulary.length} từ đã học {dueOnly && `• ${filtered.length} cần ôn`}
          </p>
        </div>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-right px-4 py-2 rounded-xl bg-gradient-to-br from-primary/10 to-purple-500/10 border border-primary/20"
        >
          <div className="text-2xl font-bold text-primary">{vocabulary.length}</div>
          <div className="text-xs text-muted-foreground">tổng từ</div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="flex gap-3"
      >
        <div className="flex-1 relative">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm kiếm từ vựng..."
            className="w-full px-4 py-3 pl-10 rounded-xl border bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm focus:ring-2 focus:ring-primary/50 focus:border-primary/30 outline-none transition-all"
          />
          <svg className="absolute left-3 top-3.5 w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <button
          onClick={() => setDueOnly(!dueOnly)}
          className={`px-4 py-3 rounded-xl border-2 font-medium text-sm transition-all whitespace-nowrap ${
            dueOnly
              ? 'border-primary bg-primary/10 text-primary shadow-sm shadow-primary/10'
              : 'border-border text-muted-foreground hover:border-primary/30 hover:bg-primary/5'
          }`}
        >
          Cần ôn
        </button>
      </motion.div>

      <div className="space-y-2">
        {filtered.map((word, index) => {
          const lang = word.lesson?.level?.language?.code as SupportedLanguage || detectLang(word.word);
          const isExpanded = expandedId === word.id;

          return (
            <motion.div
              key={word.id}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: Math.min(index * 0.03, 0.3) }}
              className="p-4 rounded-xl bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-900/80 dark:to-gray-800/50 border border-border/60 hover:shadow-md hover:shadow-purple-500/5 hover:border-primary/20 transition-all cursor-pointer backdrop-blur-sm"
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
                      <span className="text-xs text-muted-foreground bg-muted/80 px-1.5 py-0.5 rounded shrink-0">
                        {word.reading}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-primary font-medium truncate">{word.meaning}</p>
                </div>
                <motion.svg
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="w-4 h-4 text-muted-foreground shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </motion.svg>
              </div>

              <AnimatePresence>
                {isExpanded && word.example && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-3 pt-3 border-t border-border/50 space-y-1">
                      <p className="text-sm italic text-foreground/80">{word.example}</p>
                      {word.exampleMeaning && (
                        <p className="text-xs text-muted-foreground">{word.exampleMeaning}</p>
                      )}
                      <div className="pt-2" onClick={(e) => e.stopPropagation()}>
                        <AudioPlayer text={word.example} language={lang} size="sm" showSlowButton={true} />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-16"
        >
          <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary/10 to-purple-500/10 flex items-center justify-center">
            <svg className="w-10 h-10 text-primary/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold mb-2">
            {search ? 'Không tìm thấy từ nào' : 'Chưa có từ vựng'}
          </h3>
          <p className="text-muted-foreground">
            {search ? 'Thử tìm kiếm với từ khóa khác.' : 'Hoàn thành bài học để mở khóa từ vựng.'}
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}
