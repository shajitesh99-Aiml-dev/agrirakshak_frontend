import { useState, useEffect, useCallback, useMemo } from 'react';
import { NotificationItem, NotificationFilter } from '../types/notificationTypes';
import { notificationService } from '../services/notificationService';
import { useAuth } from '../../auth';

export const useNotifications = (overrideRole?: string) => {
  const { user } = useAuth();
  const activeRole = overrideRole || user?.role || 'farmer';

  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [filter, setFilter] = useState<NotificationFilter>('all');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNotifications = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await notificationService.getNotifications(activeRole);
      setNotifications(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Failed to fetch notifications.');
      }
    } finally {
      setIsLoading(false);
    }
  }, [activeRole]);

  useEffect(() => {
    let ignore = false;
    notificationService
      .getNotifications(activeRole)
      .then((data) => {
        if (!ignore) {
          setNotifications(data);
          setError(null);
        }
      })
      .catch((err: unknown) => {
        if (!ignore) {
          setError(err instanceof Error ? err.message : 'Failed to fetch notifications.');
        }
      })
      .finally(() => {
        if (!ignore) {
          setIsLoading(false);
        }
      });

    return () => {
      ignore = true;
    };
  }, [activeRole]);

  const markAsRead = useCallback(async (id: string) => {
    try {
      await notificationService.markAsRead(id);
      setNotifications((prev) =>
        prev.map((item) => (item.id === id ? { ...item, read: true } : item))
      );
    } catch (err) {
      console.error('Failed to mark notification as read:', err);
    }
  }, []);

  const markAllAsRead = useCallback(async () => {
    try {
      await notificationService.markAllAsRead(activeRole);
      setNotifications((prev) => prev.map((item) => ({ ...item, read: true })));
    } catch (err) {
      console.error('Failed to mark all as read:', err);
    }
  }, [activeRole]);

  const unreadCount = useMemo(() => {
    return notifications.filter((n) => !n.read).length;
  }, [notifications]);

  const filteredNotifications = useMemo(() => {
    switch (filter) {
      case 'unread':
        return notifications.filter((n) => !n.read);
      case 'case':
        return notifications.filter(
          (n) => n.type === 'case_update' || n.type === 'ai_analysis' || n.type === 'officer_review' || n.type === 'field_visit'
        );
      case 'alert':
        return notifications.filter((n) => n.type === 'escalation' || n.type === 'admin_alert');
      case 'all':
      default:
        return notifications;
    }
  }, [notifications, filter]);

  return {
    notifications: filteredNotifications,
    rawNotifications: notifications,
    unreadCount,
    filter,
    setFilter,
    isLoading,
    error,
    refetch: fetchNotifications,
    markAsRead,
    markAllAsRead,
  };
};

export default useNotifications;
