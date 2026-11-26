import React from 'react';
import { useNavigate } from 'react-router-dom';
import { NotificationItem as NotificationItemType } from '../types/notificationTypes';
import { useAuth } from '../../auth';
import { useI18n } from '../../../i18n';
import Button from '../../../components/ui/Button';
import Badge from '../../../components/ui/Badge';
import {
  Sparkles,
  ShieldCheck,
  Calendar,
  AlertTriangle,
  Radio,
  Info,
  Check,
  ArrowRight,
  Clock,
} from 'lucide-react';

interface NotificationItemProps {
  notification: NotificationItemType;
  onMarkAsRead: (id: string) => void;
}

export const NotificationItem: React.FC<NotificationItemProps> = ({
  notification,
  onMarkAsRead,
}) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { t } = useI18n();

  const getRoleCaseRoute = (caseId: string) => {
    const role = user?.role || 'farmer';
    switch (role) {
      case 'officer':
        return `/officer/cases/${caseId}`;
      case 'admin':
        return `/admin/cases/${caseId}`;
      case 'farmer':
      default:
        return `/farmer/cases/${caseId}`;
    }
  };

  const getTypeMeta = () => {
    switch (notification.type) {
      case 'ai_analysis':
        return {
          icon: <Sparkles className="w-4 h-4 text-ai" />,
          label: t('notifications.typeAiAnalysis'),
          badgeVariant: 'info' as const,
        };
      case 'officer_review':
        return {
          icon: <ShieldCheck className="w-4 h-4 text-primary" />,
          label: t('notifications.typeOfficerReview'),
          badgeVariant: 'success' as const,
        };
      case 'field_visit':
        return {
          icon: <Calendar className="w-4 h-4 text-amber-600" />,
          label: t('notifications.typeFieldVisit'),
          badgeVariant: 'warning' as const,
        };
      case 'escalation':
        return {
          icon: <AlertTriangle className="w-4 h-4 text-semantic-error" />,
          label: t('notifications.typeEscalation'),
          badgeVariant: 'error' as const,
        };
      case 'admin_alert':
        return {
          icon: <Radio className="w-4 h-4 text-amber-700" />,
          label: t('notifications.typeAdminAlert'),
          badgeVariant: 'warning' as const,
        };
      case 'case_update':
        return {
          icon: <Info className="w-4 h-4 text-primary" />,
          label: t('notifications.typeCaseUpdate'),
          badgeVariant: 'default' as const,
        };
      case 'system':
      default:
        return {
          icon: <Info className="w-4 h-4 text-text-muted" />,
          label: t('notifications.typeSystem'),
          badgeVariant: 'neutral' as const,
        };
    }
  };

  const meta = getTypeMeta();

  const formattedDate = (() => {
    try {
      const d = new Date(notification.createdAt);
      return d.toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return notification.createdAt;
    }
  })();

  const handleOpenCase = () => {
    if (!notification.read) {
      onMarkAsRead(notification.id);
    }
    if (notification.caseId) {
      navigate(getRoleCaseRoute(notification.caseId));
    }
  };

  return (
    <div
      className={`p-4 sm:p-5 rounded-card border transition-all font-serif ${
        notification.read
          ? 'bg-white border-[#E0EBE0] opacity-90'
          : 'bg-[#F9FCF8] border-primary/30 shadow-xs ring-1 ring-primary/10'
      }`}
    >
      <div className="flex items-start gap-3 sm:gap-4">
        {/* Type Icon Badge */}
        <div
          className={`w-9 h-9 rounded-medium flex items-center justify-center shrink-0 border ${
            notification.read ? 'bg-[#F2F7F0] border-[#DFE8DF]' : 'bg-primary-light border-primary/30'
          }`}
        >
          {meta.icon}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 space-y-1.5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Badge variant={meta.badgeVariant} size="sm" className="font-sans">
                {meta.label}
              </Badge>
              {!notification.read && (
                <span className="inline-flex items-center gap-1 text-[11px] font-sans font-bold text-primary-dark">
                  <span className="w-2 h-2 rounded-full bg-primary inline-block" />
                  <span>{t('notifications.unread')}</span>
                </span>
              )}
            </div>

            <div className="flex items-center gap-1 text-xs text-text-subtle font-sans">
              <Clock className="w-3.5 h-3.5" />
              <span>{formattedDate}</span>
            </div>
          </div>

          <h3 className="text-sm sm:text-base font-bold text-dark-green leading-snug">
            {notification.title}
          </h3>

          <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
            {notification.message}
          </p>

          {/* Action Row */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-2">
            <div>
              {notification.caseId && (
                <Button
                  variant="ghost"
                  size="sm"
                  rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                  onClick={handleOpenCase}
                  className="text-xs text-primary font-bold hover:bg-primary-light/50 -ml-2"
                >
                  {t('notifications.viewCase')} (#{notification.caseId})
                </Button>
              )}
            </div>

            <div>
              {!notification.read && (
                <Button
                  variant="outline"
                  size="sm"
                  leftIcon={<Check className="w-3 h-3" />}
                  onClick={() => onMarkAsRead(notification.id)}
                  className="text-xs"
                >
                  {t('notifications.markAsRead')}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationItem;
