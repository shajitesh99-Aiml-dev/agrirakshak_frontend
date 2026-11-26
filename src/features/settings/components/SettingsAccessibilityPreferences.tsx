import React, { useState, useEffect } from 'react';
import Card from '../../../components/ui/Card';
import Switch from '../../../components/ui/Switch';
import { Eye, Sun, Type } from 'lucide-react';
import { useI18n } from '../../../i18n';

const ACCESS_STORAGE_KEY = 'agri_rakshak_accessibility_preferences';

interface AccessPrefs {
  highContrast: boolean;
  largeFont: boolean;
}

export const SettingsAccessibilityPreferences: React.FC = () => {
  const { t } = useI18n();
  const [prefs, setPrefs] = useState<AccessPrefs>(() => {
    try {
      const raw = localStorage.getItem(ACCESS_STORAGE_KEY);
      if (raw) return JSON.parse(raw);
    } catch {
      // Default
    }
    return {
      highContrast: false,
      largeFont: false,
    };
  });

  useEffect(() => {
    try {
      localStorage.setItem(ACCESS_STORAGE_KEY, JSON.stringify(prefs));
    } catch {
      // Ignore
    }
  }, [prefs]);

  const toggle = (key: keyof AccessPrefs) => {
    setPrefs((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <Card padding="lg" className="border-[#DCE7DC] shadow-card space-y-5 font-serif">
      <div className="flex items-center gap-2 border-b border-[#EAEFE9] pb-3">
        <div className="w-8 h-8 rounded-medium bg-primary-light flex items-center justify-center text-primary">
          <Eye className="w-4 h-4" />
        </div>
        <div>
          <h2 className="text-base font-bold text-dark-green">
            {t('settings.accessCardTitle')}
          </h2>
          <p className="text-xs text-text-muted">
            {t('settings.savedLocally')}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {/* High Contrast Mode */}
        <div className="flex items-center justify-between gap-4 p-3 rounded-medium bg-[#FAFCF9] border border-[#E0EBE0]">
          <div className="flex items-start gap-3">
            <Sun className="w-4 h-4 text-accent shrink-0 mt-0.5" />
            <div>
              <span className="text-sm font-bold text-text block">
                {t('settings.highContrast')}
              </span>
              <span className="text-xs text-text-muted leading-relaxed">
                {t('settings.highContrastDesc')}
              </span>
            </div>
          </div>
          <Switch
            label={<span className="sr-only">{t('settings.highContrast')}</span>}
            checked={prefs.highContrast}
            onChange={() => toggle('highContrast')}
            id="high-contrast-switch"
          />
        </div>

        {/* Large Font Mode */}
        <div className="flex items-center justify-between gap-4 p-3 rounded-medium bg-[#FAFCF9] border border-[#E0EBE0]">
          <div className="flex items-start gap-3">
            <Type className="w-4 h-4 text-primary shrink-0 mt-0.5" />
            <div>
              <span className="text-sm font-bold text-text block">
                {t('settings.largeFont')}
              </span>
              <span className="text-xs text-text-muted leading-relaxed">
                {t('settings.largeFontDesc')}
              </span>
            </div>
          </div>
          <Switch
            label={<span className="sr-only">{t('settings.largeFont')}</span>}
            checked={prefs.largeFont}
            onChange={() => toggle('largeFont')}
            id="large-font-switch"
          />
        </div>
      </div>
    </Card>
  );
};

export default SettingsAccessibilityPreferences;
