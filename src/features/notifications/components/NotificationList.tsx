import React from 'react';
import { NotificationItem as NotificationItemType } from '../types/notificationTypes';
import NotificationItem from './NotificationItem';
import NotificationEmptyState from './NotificationEmptyState';
import NotificationSkeleton from './NotificationSkeleton';
import Button from '../../../components/ui/Button';
import { CheckCheck } from 'lucide-react';
import { useI18n } from '../../../i18n';

interface NotificationListProps {
  notifications: NotificationItemType[];
  isLoading: boolean;
  unreadCount: number;
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
  isFiltered: boolean;
  onResetFilter: () => void;
}

export const NotificationList: React.FC<NotificationListProps> = ({
  notifications,
  isLoading,
  unreadCount,
  onMarkAsRead,
  onMarkAllAsRead,
  isFiltered,
  onResetFilter,
}) => {
  const { t } = useI18n();

  if (isLoading) {
    return <NotificationSkeleton />;
  }

  return (
    <div className="space-y-4 font-serif">
      {/* List Header Actions */}
      <div className="flex items-center justify-between text-xs sm:text-sm text-text-muted">
        <span>
          {notifications.length} {notifications.length === 1 ? 'Notification' : 'Notifications'}
        </span>

        {unreadCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            leftIcon={<CheckCheck className="w-4 h-4 text-primary" />}
            onClick={onMarkAllAsRead}
            className="text-xs text-primary font-bold hover:bg-primary-light/50"
          >
            {t('notifications.markAllRead')}
          </Button>
        )}
      </div>

      {/* Empty State */}
      {notifications.length === 0 ? (
        <NotificationEmptyState
          isFiltered={isFiltered}
          onResetFilter={onResetFilter}
        />
      ) : (
        <div className="space-y-3">
          {notifications.map((item) => (
            <NotificationItem
              key={item.id}
              notification={item}
              onMarkAsRead={onMarkAsRead}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default NotificationList;
