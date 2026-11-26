import React from 'react';
import EmptyState from '../../../components/ui/EmptyState';
import { BellOff } from 'lucide-react';
import { useI18n } from '../../../i18n';

interface NotificationEmptyStateProps {
  isFiltered?: boolean;
  onResetFilter?: () => void;
}

export const NotificationEmptyState: React.FC<NotificationEmptyStateProps> = ({
  isFiltered = false,
  onResetFilter,
}) => {
  const { t } = useI18n();

  return (
    <div className="py-8">
      <EmptyState
        title={isFiltered ? t('notifications.emptyFiltered') : t('notifications.allCaughtUp')}
        description={isFiltered ? t('emptyStates.noResultsDesc') : t('notifications.noNotificationsDesc')}
        icon={<BellOff className="w-10 h-10 text-primary/60" />}
        primaryAction={
          isFiltered && onResetFilter
            ? {
                label: t('common.reset'),
                onClick: onResetFilter,
                variant: 'outline',
              }
            : undefined
        }
      />
    </div>
  );
};

export default NotificationEmptyState;
