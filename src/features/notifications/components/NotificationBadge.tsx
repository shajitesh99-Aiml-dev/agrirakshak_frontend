import React from 'react';
import { Bell } from 'lucide-react';
import { useNotifications } from '../hooks/useNotifications';
import { useI18n } from '../../../i18n';

interface NotificationBadgeProps {
  onClick?: () => void;
  className?: string;
  role?: string;
}

export const NotificationBadge: React.FC<NotificationBadgeProps> = ({
  onClick,
  className = '',
  role,
}) => {
  const { unreadCount } = useNotifications(role);
  const { t } = useI18n();

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`${t('nav.notifications')}: ${unreadCount} ${t('notifications.unread')}`}
      className={`relative p-2 rounded-full text-text-muted hover:text-dark-green hover:bg-[#F0F5EF] transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/40 ${className}`}
    >
      <Bell className="w-5 h-5" />
      {unreadCount > 0 && (
        <span
          className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 text-[10px] font-bold font-sans flex items-center justify-center text-white bg-semantic-error rounded-full ring-2 ring-white shadow-xs animate-pulse"
        >
          {unreadCount > 9 ? '9+' : unreadCount}
        </span>
      )}
    </button>
  );
};

export default NotificationBadge;
