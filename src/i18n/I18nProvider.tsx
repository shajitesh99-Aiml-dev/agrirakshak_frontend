import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  SupportedLanguage,
  SUPPORTED_LANGUAGES,
  DEFAULT_LANGUAGE,
  LANGUAGE_STORAGE_KEY,
  detectDefaultLanguage,
} from './config';
import { I18nContext } from './I18nContext';
import { en, TranslationSchema } from './locales/en/common';
import { te } from './locales/te/common';
import { hi } from './locales/hi/common';
import { kn } from './locales/kn/common';

const DICTIONARIES: Record<SupportedLanguage, TranslationSchema> = {
  en,
  te,
  hi,
  kn,
};

function resolveNestedKey(obj: unknown, path: string): string | undefined {
  if (!obj || typeof obj !== 'object') return undefined;
  const segments = path.split('.');
  let current: unknown = obj;

  for (const segment of segments) {
    if (current && typeof current === 'object' && segment in current) {
      current = (current as Record<string, unknown>)[segment];
    } else {
      return undefined;
    }
  }

  return typeof current === 'string' ? current : undefined;
}

function interpolate(template: string, params?: Record<string, string | number>): string {
  if (!params) return template;
  return Object.entries(params).reduce((str, [k, v]) => {
    return str.replace(new RegExp(`\\{\\{${k}\\}\\}|\\{${k}\\}`, 'g'), String(v));
  }, template);
}

export interface I18nProviderProps {
  children: React.ReactNode;
  userPreferredLanguage?: string;
}

export const I18nProvider: React.FC<I18nProviderProps> = ({ children, userPreferredLanguage }) => {
  const [language, setLanguageState] = useState<SupportedLanguage>(() =>
    detectDefaultLanguage(userPreferredLanguage)
  );

  // Synchronize state if user preferred language prop updates (React recommended pattern)
  const [prevUserPref, setPrevUserPref] = useState(userPreferredLanguage);
  if (userPreferredLanguage !== prevUserPref) {
    setPrevUserPref(userPreferredLanguage);
    if (userPreferredLanguage && ['en', 'te', 'hi', 'kn'].includes(userPreferredLanguage)) {
      const stored = typeof window !== 'undefined' ? localStorage.getItem(LANGUAGE_STORAGE_KEY) : null;
      if (!stored) {
        setLanguageState(userPreferredLanguage as SupportedLanguage);
      }
    }
  }

  // Synchronize document attributes and localStorage on language change
  useEffect(() => {
    try {
      document.documentElement.lang = language;
      localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    } catch {
      // Ignore local storage write errors
    }
  }, [language]);

  const setLanguage = useCallback((newLang: SupportedLanguage) => {
    setLanguageState(newLang);
  }, []);

  const t = useCallback(
    (key: string, params?: Record<string, string | number>): string => {
      const currentDict = DICTIONARIES[language];
      let value = resolveNestedKey(currentDict, key);

      // Fallback to English if not found in current language
      if (!value && language !== 'en') {
        value = resolveNestedKey(DICTIONARIES.en, key);
      }

      // If still not found, return key and warn in development
      if (!value) {
        if (import.meta.env.DEV) {
          console.warn(`[i18n] Missing translation key: "${key}" for language "${language}"`);
        }
        return key;
      }

      return interpolate(value, params);
    },
    [language]
  );

  const currentLanguageOption = useMemo(() => {
    return (
      SUPPORTED_LANGUAGES.find((opt) => opt.code === language) ||
      SUPPORTED_LANGUAGES.find((opt) => opt.code === DEFAULT_LANGUAGE)!
    );
  }, [language]);

  const formatDate = useCallback(
    (date: Date | string, options?: Intl.DateTimeFormatOptions): string => {
      try {
        const d = typeof date === 'string' ? new Date(date) : date;
        return new Intl.DateTimeFormat(currentLanguageOption.localeCode, options || {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        }).format(d);
      } catch {
        return String(date);
      }
    },
    [currentLanguageOption.localeCode]
  );

  const formatNumber = useCallback(
    (value: number): string => {
      try {
        return new Intl.NumberFormat(currentLanguageOption.localeCode).format(value);
      } catch {
        return String(value);
      }
    },
    [currentLanguageOption.localeCode]
  );

  const formatPercent = useCallback(
    (value: number): string => {
      try {
        return new Intl.NumberFormat(currentLanguageOption.localeCode, {
          style: 'percent',
          maximumFractionDigits: 1,
        }).format(value);
      } catch {
        return `${(value * 100).toFixed(1)}%`;
      }
    },
    [currentLanguageOption.localeCode]
  );

  const contextValue = useMemo(
    () => ({
      language,
      setLanguage,
      t,
      formatDate,
      formatNumber,
      formatPercent,
      supportedLanguages: SUPPORTED_LANGUAGES,
      currentLanguageOption,
    }),
    [language, setLanguage, t, formatDate, formatNumber, formatPercent, currentLanguageOption]
  );

  return <I18nContext.Provider value={contextValue}>{children}</I18nContext.Provider>;
};

export default I18nProvider;
