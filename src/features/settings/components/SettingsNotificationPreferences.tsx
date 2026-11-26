import React, { useState, useEffect } from 'react';
import Card from '../../../components/ui/Card';
import Switch from '../../../components/ui/Switch';
import { Bell, Radio, Mail, Volume2 } from 'lucide-react';
import { useI18n } from '../../../i18n';

const PREFS_STORAGE_KEY = 'agri_rakshak_notification_preferences';

interface NotificationPrefs {
  smsAlerts: boolean;
  emailReports: boolean;
  inAppAlerts: boolean;
}

export const SettingsNotificationPreferences: React.FC = () => {
  const { t } = useI18n();
  const [prefs, setPrefs] = useState<NotificationPrefs>(() => {
    try {
      const raw = localStorage.getItem(PREFS_STORAGE_KEY);
      if (raw) return JSON.parse(raw);
    } catch {
      // Default fallback
    }
    return {
      smsAlerts: true,
      emailReports: true,
      inAppAlerts: true,
    };
  });

  useEffect(() => {
    try {
      localStorage.setItem(PREFS_STORAGE_KEY, JSON.stringify(prefs));
    } catch {
      // Ignore
    }
  }, [prefs]);

  const toggle = (key: keyof NotificationPrefs) => {
    setPrefs((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <Card padding="lg" className="border-[#DCE7DC] shadow-card space-y-5 font-serif">
      <div className="flex items-center gap-2 border-b border-[#EAEFE9] pb-3">
        <div className="w-8 h-8 rounded-medium bg-primary-light flex items-center justify-center text-primary">
          <Bell className="w-4 h-4" />
        </div>
        <div>
          <h2 className="text-base font-bold text-dark-green">
            {t('settings.notifCardTitle')}
          </h2>
          <p className="text-xs text-text-muted">
            {t('settings.savedLocally')}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {/* SMS Alerts */}
        <div className="flex items-center justify-between gap-4 p-3 rounded-medium bg-[#FAFCF9] border border-[#E0EBE0]">
          <div className="flex items-start gap-3">
            <Radio className="w-4 h-4 text-primary shrink-0 mt-0.5" />
            <div>
              <span className="text-sm font-bold text-text block">
                {t('settings.smsAlerts')}
              </span>
              <span className="text-xs text-text-muted leading-relaxed">
                {t('settings.smsAlertsDesc')}
              </span>
            </div>
          </div>
          <Switch
            label={<span className="sr-only">{t('settings.smsAlerts')}</span>}
            checked={prefs.smsAlerts}
            onChange={() => toggle('smsAlerts')}
            id="sms-alerts-switch"
          />
        </div>

        {/* Email Reports */}
        <div className="flex items-center justify-between gap-4 p-3 rounded-medium bg-[#FAFCF9] border border-[#E0EBE0]">
          <div className="flex items-start gap-3">
            <Mail className="w-4 h-4 text-ai shrink-0 mt-0.5" />
            <div>
              <span className="text-sm font-bold text-text block">
                {t('settings.emailReports')}
              </span>
              <span className="text-xs text-text-muted leading-relaxed">
                {t('settings.emailReportsDesc')}
              </span>
            </div>
          </div>
          <Switch
            label={<span className="sr-only">{t('settings.emailReports')}</span>}
            checked={prefs.emailReports}
            onChange={() => toggle('emailReports')}
            id="email-reports-switch"
          />
        </div>

        {/* In-App Alerts */}
        <div className="flex items-center justify-between gap-4 p-3 rounded-medium bg-[#FAFCF9] border border-[#E0EBE0]">
          <div className="flex items-start gap-3">
            <Volume2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="text-sm font-bold text-text block">
                {t('settings.inAppAlerts')}
              </span>
              <span className="text-xs text-text-muted leading-relaxed">
                {t('settings.inAppAlertsDesc')}
              </span>
            </div>
          </div>
          <Switch
            label={<span className="sr-only">{t('settings.inAppAlerts')}</span>}
            checked={prefs.inAppAlerts}
            onChange={() => toggle('inAppAlerts')}
            id="in-app-alerts-switch"
          />
        </div>
      </div>
    </Card>
  );
};

export default SettingsNotificationPreferences;
