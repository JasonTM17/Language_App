'use client';

import { useEffect, useState } from 'react';
import { api } from '@/services/api';

interface VocabWord {
  id: string;
  word: string;
  reading?: string;
  meaning: string;
  example?: string;
  exampleMeaning?: string;
  lesson?: { title: string; level?: { language?: { name: string; flag: string } } };
}

export default function VocabularyPage() {
  const [vocabulary, setVocabulary] = useState<VocabWord[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [dueOnly, setDueOnly] = useState(false);

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
        <div className="h-8 w-48 bg-gray-200 dark:bg-gray-800 rounded-lg" />
        <div className="h-12 bg-gray-200 dark:bg-gray-800 rounded-xl" />
        {[...Array(8)].map((_, i) => <div key={i} className="h-20 bg-gray-200 dark:bg-gray-800 rounded-xl" />)}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-display">Từ vựng</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {vocabulary.length} từ đã học
          </p>
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
            className="w-full px-4 py-3 pl-10 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary-500 outline-none"
          />
          <svg className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <button
          onClick={() => setDueOnly(!dueOnly)}
          className={`px-4 py-3 rounded-xl border-2 font-medium text-sm transition-all ${
            dueOnly
              ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-700'
              : 'border-gray-200 dark:border-gray-700 text-gray-600 hover:border-primary-200'
          }`}
        >
          📅 Cần ôn tập
        </button>
      </div>

      {/* Vocabulary list */}
      <div className="space-y-3">
        {filtered.map((word) => (
          <div key={word.id} className="p-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold">{word.word}</span>
                  {word.reading && (
                    <span className="text-sm text-gray-500 bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded">
                      {word.reading}
                    </span>
                  )}
                </div>
                <p className="text-primary-600 dark:text-primary-400 font-medium mt-1">{word.meaning}</p>
                {word.example && (
                  <div className="mt-2 text-sm">
                    <p className="text-gray-700 dark:text-gray-300 italic">{word.example}</p>
                    {word.exampleMeaning && (
                      <p className="text-gray-500 mt-0.5">{word.exampleMeaning}</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <div className="text-5xl mb-4">📚</div>
          <h3 className="text-lg font-semibold mb-2">
            {search ? 'Không tìm thấy từ nào' : 'Chưa có từ vựng'}
          </h3>
          <p className="text-gray-500">
            {search ? 'Thử tìm kiếm với từ khóa khác.' : 'Hoàn thành bài học để mở khóa từ vựng.'}
          </p>
        </div>
      )}
    </div>
  );
}
