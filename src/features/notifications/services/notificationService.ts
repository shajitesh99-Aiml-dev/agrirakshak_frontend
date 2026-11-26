import { api } from '../../../services/api';
import { NotificationItem } from '../types/notificationTypes';

const STORAGE_KEY = 'agri_rakshak_notifications_v1';

const INITIAL_DEV_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-001',
    type: 'officer_review',
    title: 'Officer Advisory Issued',
    message: 'Dr. Priya Sharma approved copper oxychloride spray treatment for Tomato Early Blight on Case #CASE-2026-101.',
    createdAt: new Date(Date.now() - 1000 * 60 * 35).toISOString(), // 35 mins ago
    read: false,
    caseId: 'CASE-2026-101',
    severity: 'success',
    targetRole: 'farmer',
  },
  {
    id: 'notif-002',
    type: 'admin_alert',
    title: 'Regional Outbreak Notice: Late Blight',
    message: 'District Krishi Vigyan Kendra issued an alert for high humidity fungal spore clusters in Nashik taluk.',
    createdAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(), // 2 hours ago
    read: false,
    severity: 'warning',
    targetRole: 'all',
  },
  {
    id: 'notif-003',
    type: 'ai_analysis',
    title: 'AI Pathology Detection Completed',
    message: 'Deep learning vision model diagnosed Rice Brown Spot with 94.2% confidence for Case #CASE-2026-102.',
    createdAt: new Date(Date.now() - 1000 * 60 * 300).toISOString(), // 5 hours ago
    read: true,
    caseId: 'CASE-2026-102',
    severity: 'info',
    targetRole: 'farmer',
  },
  {
    id: 'notif-004',
    type: 'field_visit',
    title: 'Field Inspection Scheduled',
    message: 'Extension Agronomist field visit has been scheduled for tomorrow at 10:30 AM in Rampur village.',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    read: false,
    caseId: 'CASE-2026-103',
    severity: 'info',
    targetRole: 'farmer',
  },
  {
    id: 'notif-005',
    type: 'escalation',
    title: 'High-Severity Triage Escalation',
    message: 'Case #CASE-2026-104 (Fall Armyworm on Maize) was escalated to District Directorate for containment.',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 18).toISOString(),
    read: false,
    caseId: 'CASE-2026-104',
    severity: 'error',
    targetRole: 'officer',
  },
  {
    id: 'notif-006',
    type: 'system',
    title: 'Platform Maintenance Notice',
    message: 'Telemetry synchronization completed successfully. AI Vision Model v2.4 operational statewide.',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    read: true,
    severity: 'info',
    targetRole: 'all',
  },
];

function getStoredNotifications(): NotificationItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw) as NotificationItem[];
    }
  } catch {
    // LocalStorage fallback
  }
  return INITIAL_DEV_NOTIFICATIONS;
}

function saveStoredNotifications(items: NotificationItem[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // Ignore storage quota error in dev
  }
}

/**
 * Notification Service
 * Communicates with backend endpoints where available.
 * Transparently falls back to persistent client storage under import.meta.env.DEV
 * when backend notification endpoints are not deployed.
 */
export const notificationService = {
  /**
   * Fetch list of notifications, optionally filtered by user role
   */
  async getNotifications(role?: string): Promise<NotificationItem[]> {
    try {
      const response = await api.get<{ notifications: NotificationItem[] }>('/notifications');
      if (response?.notifications) {
        return response.notifications;
      }
    } catch {
      // Backend /api/v1/notifications endpoint not present; fall back to dev storage
    }

    if (import.meta.env.DEV) {
      const list = getStoredNotifications();
      if (!role) return list;
      return list.filter((n) => !n.targetRole || n.targetRole === 'all' || n.targetRole === role);
    }

    return [];
  },

  /**
   * Mark an individual notification as read
   */
  async markAsRead(id: string): Promise<NotificationItem> {
    try {
      const response = await api.patch<{ notification: NotificationItem }>(`/notifications/${id}/read`);
      if (response?.notification) {
        return response.notification;
      }
    } catch {
      // Backend endpoint missing; dev mode fallback
    }

    const current = getStoredNotifications();
    const updated = current.map((n) => (n.id === id ? { ...n, read: true } : n));
    saveStoredNotifications(updated);

    const match = updated.find((n) => n.id === id);
    if (!match) throw new Error('Notification not found');
    return match;
  },

  /**
   * Mark all notifications as read for current role
   */
  async markAllAsRead(role?: string): Promise<void> {
    try {
      await api.patch('/notifications/read-all');
      return;
    } catch {
      // Backend endpoint missing; dev mode fallback
    }

    const current = getStoredNotifications();
    const updated = current.map((n) => {
      if (!role || !n.targetRole || n.targetRole === 'all' || n.targetRole === role) {
        return { ...n, read: true };
      }
      return n;
    });
    saveStoredNotifications(updated);
  },
};

export default notificationService;
