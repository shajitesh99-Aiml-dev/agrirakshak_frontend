import { createContext } from 'react';
import { SupportedLanguage, LanguageOption } from './config';

export interface I18nContextType {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
  formatDate: (date: Date | string, options?: Intl.DateTimeFormatOptions) => string;
  formatNumber: (value: number) => string;
  formatPercent: (value: number) => string;
  supportedLanguages: LanguageOption[];
  currentLanguageOption: LanguageOption;
}

export const I18nContext = createContext<I18nContextType | null>(null);
