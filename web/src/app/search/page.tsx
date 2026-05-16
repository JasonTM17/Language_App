'use client';

import { useState, useEffect, useCallback } from 'react';
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
    <div className="space-y-6 max-w-2xl mx-auto">
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
          className="w-full px-5 py-4 pl-12 rounded-2xl border border-border bg-card focus:ring-2 focus:ring-primary-500 outline-none text-lg"
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
      {results.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">{results.length} kết quả</p>
          {results.map((result) => (
            <Link
              key={`${result.type}-${result.id}`}
              href={result.type === 'lesson' ? `/lessons?id=${result.id}` : '/vocabulary'}
            >
              <div className="p-4 rounded-xl bg-card border border hover:shadow-md hover:border-primary-200 dark:hover:border-primary-700 transition-all">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm ${
                    result.type === 'lesson'
                      ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600'
                      : 'bg-green-100 dark:bg-green-900/30 text-green-600'
                  }`}>
                    {result.type === 'lesson' ? '📖' : '📝'}
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
          ))}
        </div>
      )}

      {/* Empty state */}
      {searched && !loading && results.length === 0 && (
        <div className="text-center py-12">
          <div className="text-4xl mb-3">🔍</div>
          <p className="text-muted-foreground">Không tìm thấy kết quả cho &ldquo;{query}&rdquo;</p>
          <p className="text-sm text-muted-foreground mt-1">Thử tìm kiếm với từ khóa khác</p>
        </div>
      )}

      {/* Suggestions when empty */}
      {!searched && (
        <div className="space-y-4">
          <p className="text-sm font-medium text-muted-foreground">Gợi ý tìm kiếm:</p>
          <div className="flex flex-wrap gap-2">
            {['hello', 'food', 'family', 'travel', 'numbers', 'こんにちは', '你好', '안녕'].map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => setQuery(suggestion)}
                className="px-3 py-1.5 rounded-lg bg-muted text-sm text-muted-foreground hover:bg-primary-50 dark:hover:bg-primary-900/20 hover:text-primary transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
