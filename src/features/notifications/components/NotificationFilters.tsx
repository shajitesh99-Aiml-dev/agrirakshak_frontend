import React from 'react';
import { NotificationFilter } from '../types/notificationTypes';
import { useI18n } from '../../../i18n';

interface NotificationFiltersProps {
  currentFilter: NotificationFilter;
  onFilterChange: (filter: NotificationFilter) => void;
  unreadCount: number;
}

export const NotificationFilters: React.FC<NotificationFiltersProps> = ({
  currentFilter,
  onFilterChange,
  unreadCount,
}) => {
  const { t } = useI18n();

  const filterTabs: Array<{ id: NotificationFilter; label: string; badge?: number }> = [
    { id: 'all', label: t('notifications.filterAll') },
    { id: 'unread', label: t('notifications.filterUnread'), badge: unreadCount },
    { id: 'case', label: t('notifications.filterCase') },
    { id: 'alert', label: t('notifications.filterAlert') },
  ];

  return (
    <div className="flex flex-wrap items-center gap-2 border-b border-[#E0EBE0] pb-2 font-serif">
      {filterTabs.map((tab) => {
        const isActive = currentFilter === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onFilterChange(tab.id)}
            className={`px-3 py-1.5 rounded-medium text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              isActive
                ? 'bg-primary text-white shadow-xs'
                : 'bg-white text-text-muted hover:text-text hover:bg-[#F2F7F0] border border-[#DFE8DF]'
            }`}
          >
            <span>{tab.label}</span>
            {typeof tab.badge === 'number' && tab.badge > 0 && (
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-sans font-bold ${
                  isActive ? 'bg-white text-primary' : 'bg-semantic-error text-white'
                }`}
              >
                {tab.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};

export default NotificationFilters;
