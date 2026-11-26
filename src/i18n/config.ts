export type SupportedLanguage = 'en' | 'te' | 'hi' | 'kn';

export interface LanguageOption {
  code: SupportedLanguage;
  name: string;
  nativeName: string;
  flag: string;
  localeCode: string;
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧', localeCode: 'en-IN' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', flag: '🇮🇳', localeCode: 'te-IN' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳', localeCode: 'hi-IN' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', flag: '🇮🇳', localeCode: 'kn-IN' },
];

export const LANGUAGE_STORAGE_KEY = 'agrirakshak:language';
export const DEFAULT_LANGUAGE: SupportedLanguage = 'en';

export const isSupportedLanguage = (code: unknown): code is SupportedLanguage => {
  return typeof code === 'string' && ['en', 'te', 'hi', 'kn'].includes(code);
};

export const detectDefaultLanguage = (userPreferredLanguage?: string): SupportedLanguage => {
  if (typeof window === 'undefined') return DEFAULT_LANGUAGE;

  // 1. Previously selected application language from localStorage
  try {
    const saved = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (saved && isSupportedLanguage(saved)) {
      return saved;
    }
  } catch {
    // Ignore storage read error
  }

  // 2. Authenticated user's language preference if provided
  if (userPreferredLanguage && isSupportedLanguage(userPreferredLanguage)) {
    return userPreferredLanguage;
  }

  // 3. Browser language when supported
  try {
    const browserLang = (navigator.language || '').toLowerCase().split('-')[0];
    if (isSupportedLanguage(browserLang)) {
      return browserLang;
    }
  } catch {
    // Ignore browser detection error
  }

  // 4. English fallback
  return DEFAULT_LANGUAGE;
};
