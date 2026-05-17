'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { api } from '@/services/api';

interface SearchResult {
  type: 'lesson' | 'vocabulary' | 'grammar';
  id: string;
  title: string;
  subtitle: string;
  language?: string;
  flag?: string;
}

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const search = useCallback(async (q: string) => {
    if (q.trim().length < 2) {
      setResults([]);
      setSearched(false);
      return;
    }

    setLoading(true);
    setSearched(true);

    try {
      const [lessonsData, vocabData] = await Promise.all([
        api.lessons.list().catch(() => ({ lessons: [] })),
        api.vocabulary.list().catch(() => ({ vocabulary: [] })),
      ]);

      const searchResults: SearchResult[] = [];
      const lowerQ = q.toLowerCase();

      (lessonsData.lessons || []).forEach((lesson: any) => {
        if (
          lesson.title?.toLowerCase().includes(lowerQ) ||
          lesson.description?.toLowerCase().includes(lowerQ) ||
          lesson.titleVi?.toLowerCase().includes(lowerQ)
        ) {
          searchResults.push({
            type: 'lesson',
            id: lesson.id,
            title: lesson.title,
            subtitle: lesson.description || '',
            language: lesson.level?.language?.name,
            flag: lesson.level?.language?.flag,
          });
        }
      });

      (vocabData.vocabulary || []).forEach((word: any) => {
        if (
          word.word?.toLowerCase().includes(lowerQ) ||
          word.meaning?.toLowerCase().includes(lowerQ) ||
          word.reading?.toLowerCase().includes(lowerQ)
        ) {
          searchResults.push({
            type: 'vocabulary',
            id: word.id,
            title: word.word,
            subtitle: word.meaning,
            language: word.lesson?.level?.language?.name,
            flag: word.lesson?.level?.language?.flag,
          });
        }
      });

      setResults(searchResults.slice(0, 20));
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.trim().length >= 2) search(query);
    }, 300);
    return () => clearTimeout(timer);
  }, [query, search]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6 max-w-2xl mx-auto"
    >
      <div>
        <h1 className="text-2xl font-bold font-display">Tìm kiếm</h1>
        <p className="text-muted-foreground mt-1">Tìm bài học, từ vựng trong tất cả ngôn ngữ</p>
      </div>

      {/* Search input */}
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Nhập từ khóa tìm kiếm..."
          autoFocus
          className="w-full px-5 py-4 pl-12 rounded-2xl border border-border/60 bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-900/80 dark:to-gray-800/50 backdrop-blur-sm shadow-lg shadow-purple-500/5 focus:ring-2 focus:ring-primary-500 outline-none text-lg"
        />
        <svg className="absolute left-4 top-4.5 w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        {loading && (
          <div className="absolute right-4 top-5">
            <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </div>

      {/* Results */}
      <AnimatePresence mode="wait">
        {results.length > 0 && (
          <motion.div
            key="results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-2"
          >
            <p className="text-sm text-muted-foreground">{results.length} kết quả</p>
            {results.map((result, index) => (
              <motion.div
                key={`${result.type}-${result.id}`}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: Math.min(index * 0.04, 0.4) }}
              >
                <Link href={result.type === 'lesson' ? `/lessons?id=${result.id}` : '/vocabulary'}>
                  <div className="p-4 rounded-xl bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-900/80 dark:to-gray-800/50 border border-border/60 backdrop-blur-sm shadow-lg shadow-purple-500/5 hover:shadow-md hover:shadow-purple-500/5 hover:border-primary/20 transition-all">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        result.type === 'lesson'
                          ? 'bg-gradient-to-br from-blue-500/20 to-indigo-500/20'
                          : 'bg-gradient-to-br from-green-500/20 to-emerald-500/20'
                      }`}>
                        {result.type === 'lesson' ? (
                          <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          {result.flag && <span className="text-sm">{result.flag}</span>}
                          <p className="font-medium text-sm truncate">{result.title}</p>
                        </div>
                        <p className="text-xs text-muted-foreground truncate">{result.subtitle}</p>
                      </div>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700 text-muted-foreground">
                        {result.type === 'lesson' ? 'Bài học' : 'Từ vựng'}
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Empty state */}
        {searched && !loading && results.length === 0 && (
          <motion.div
            key="empty"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-center py-12"
          >
            <div className="flex justify-center mb-3">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center">
                <svg className="w-7 h-7 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
            <p className="text-muted-foreground">Không tìm thấy kết quả cho &ldquo;{query}&rdquo;</p>
            <p className="text-sm text-muted-foreground mt-1">Thử tìm kiếm với từ khóa khác</p>
          </motion.div>
        )}

        {/* Suggestions when empty */}
        {!searched && (
          <motion.div
            key="suggestions"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            <p className="text-sm font-medium text-muted-foreground">Gợi ý tìm kiếm:</p>
            <div className="flex flex-wrap gap-2">
              {['hello', 'food', 'family', 'travel', 'numbers', 'こんにちは', '你好', '안녕'].map((suggestion, index) => (
                <motion.button
                  key={suggestion}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: Math.min(index * 0.04, 0.4) }}
                  onClick={() => setQuery(suggestion)}
                  className="px-3 py-1.5 rounded-lg bg-muted text-sm text-muted-foreground hover:bg-primary-50 dark:hover:bg-primary-900/20 hover:text-primary transition-colors"
                >
                  {suggestion}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
