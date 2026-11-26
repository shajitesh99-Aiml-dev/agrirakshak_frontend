import React from 'react';
import Card from '../../../components/ui/Card';
import LanguagePreference from '../../profile/components/LanguagePreference';
import { useI18n } from '../../../i18n';
import { Globe } from 'lucide-react';
import { SupportedLanguage } from '../../../i18n/config';

export const SettingsLanguageCard: React.FC = () => {
  const { language, setLanguage, t } = useI18n();

  return (
    <Card padding="lg" className="border-[#DCE7DC] shadow-card space-y-4 font-serif">
      <div className="flex items-center gap-2 border-b border-[#EAEFE9] pb-3">
        <div className="w-8 h-8 rounded-medium bg-primary-light flex items-center justify-center text-primary">
          <Globe className="w-4 h-4" />
        </div>
        <div>
          <h2 className="text-base font-bold text-dark-green">
            {t('settings.langCardTitle')}
          </h2>
          <p className="text-xs text-text-muted">
            {t('settings.langCardDesc')}
          </p>
        </div>
      </div>

      <LanguagePreference
        value={language}
        onChange={(newLang: SupportedLanguage) => setLanguage(newLang)}
      />
    </Card>
  );
};

export default SettingsLanguageCard;
