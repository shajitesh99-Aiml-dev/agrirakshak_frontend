import { useContext } from 'react';
import { I18nContext, I18nContextType } from './I18nContext';

export const useI18n = (): I18nContextType => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
};

// Convenient alias for standardized hook name
export const useTranslation = () => {
  const { t, language, setLanguage, formatDate, formatNumber, formatPercent } = useI18n();
  return { t, language, setLanguage, formatDate, formatNumber, formatPercent };
};
