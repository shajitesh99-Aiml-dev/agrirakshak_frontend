export type NotificationType =
  | 'case_update'
  | 'ai_analysis'
  | 'officer_review'
  | 'field_visit'
  | 'escalation'
  | 'admin_alert'
  | 'system';

export type NotificationSeverity = 'info' | 'success' | 'warning' | 'error';

export interface NotificationItem {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  createdAt: string;
  read: boolean;
  caseId?: string;
  severity?: NotificationSeverity;
  targetRole?: 'farmer' | 'officer' | 'admin' | 'all';
}

export type NotificationFilter = 'all' | 'unread' | 'case' | 'alert';
