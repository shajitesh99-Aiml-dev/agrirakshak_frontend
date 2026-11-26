import React from 'react';
import { useNotifications, NotificationList, NotificationFilters } from '../../features/notifications';
import { BreadcrumbItem, Breadcrumbs } from '../../components/ui/Breadcrumbs';
import { ROUTES } from '../../routes/routeConfig';
import { usePageTitle } from '../../hooks/usePageTitle';
import { useI18n } from '../../i18n';
import Alert from '../../components/ui/Alert';

export const FarmerNotificationsPage: React.FC = () => {
  usePageTitle('Agri Rakshak | Farmer Advisories & Notifications');
  const { t } = useI18n();
  const {
    notifications,
    unreadCount,
    filter,
    setFilter,
    isLoading,
    error,
    markAsRead,
    markAllAsRead,
  } = useNotifications('farmer');

  const breadcrumbs: BreadcrumbItem[] = [
    { label: t('nav.dashboard'), href: ROUTES.FARMER_DASHBOARD },
    { label: t('nav.notifications'), isCurrent: true },
  ];

  return (
    <div className="space-y-6 font-serif">
      <Breadcrumbs items={breadcrumbs} />

      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-dark-green tracking-tight">
          {t('notifications.title')}
        </h1>
        <p className="text-sm text-text-muted mt-1">
          {t('notifications.subtitle')}
        </p>
      </div>

      {error && (
        <Alert variant="error" title={t('errors.general')}>
          {error}
        </Alert>
      )}

      {/* Filter Tabs */}
      <NotificationFilters
        currentFilter={filter}
        onFilterChange={setFilter}
        unreadCount={unreadCount}
      />

      {/* List */}
      <NotificationList
        notifications={notifications}
        isLoading={isLoading}
        unreadCount={unreadCount}
        onMarkAsRead={markAsRead}
        onMarkAllAsRead={markAllAsRead}
        isFiltered={filter !== 'all'}
        onResetFilter={() => setFilter('all')}
      />
    </div>
  );
};

export default FarmerNotificationsPage;
