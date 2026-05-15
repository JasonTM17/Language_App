'use client';

import { createContext, useContext, useState, useCallback } from 'react';
import vi from '@/locales/vi.json';

type NestedKeyOf<T> = T extends object
  ? { [K in keyof T]: K extends string ? (T[K] extends object ? `${K}.${NestedKeyOf<T[K]>}` : K) : never }[keyof T]
  : never;

type TranslationKey = NestedKeyOf<typeof vi>;

const translations: Record<string, typeof vi> = { vi };

interface I18nContextType {
  t: (key: string) => string;
  locale: string;
  setLocale: (locale: string) => void;
}

const I18nContext = createContext<I18nContextType>({
  t: (key) => key,
  locale: 'vi',
  setLocale: () => {},
});

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState('vi');

  const t = useCallback((key: string): string => {
    const keys = key.split('.');
    let value: any = translations[locale] || translations.vi;
    for (const k of keys) {
      value = value?.[k];
    }
    return (typeof value === 'string' ? value : key) as string;
  }, [locale]);

  return (
    <I18nContext.Provider value={{ t, locale, setLocale }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useTranslation() {
  return useContext(I18nContext);
}
