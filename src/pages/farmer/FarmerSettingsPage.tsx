import React from 'react';
import { BreadcrumbItem, Breadcrumbs } from '../../components/ui/Breadcrumbs';
import { ROUTES } from '../../routes/routeConfig';
import { usePageTitle } from '../../hooks/usePageTitle';
import { useI18n } from '../../i18n';
import {
  SettingsLanguageCard,
  SettingsNotificationPreferences,
  SettingsAccessibilityPreferences,
} from '../../features/settings';

export const FarmerSettingsPage: React.FC = () => {
  usePageTitle('Agri Rakshak | Farmer Settings');
  const { t } = useI18n();

  const breadcrumbs: BreadcrumbItem[] = [
    { label: t('nav.dashboard'), href: ROUTES.FARMER_DASHBOARD },
    { label: t('nav.settings'), isCurrent: true },
  ];

  return (
    <div className="space-y-6 font-serif">
      <Breadcrumbs items={breadcrumbs} />

      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-dark-green tracking-tight">
          {t('settings.title')}
        </h1>
        <p className="text-sm text-text-muted mt-1">
          {t('settings.subtitle')}
        </p>
      </div>

      <div className="space-y-6">
        <SettingsLanguageCard />
        <SettingsNotificationPreferences />
        <SettingsAccessibilityPreferences />
      </div>
    </div>
  );
};

export default FarmerSettingsPage;
