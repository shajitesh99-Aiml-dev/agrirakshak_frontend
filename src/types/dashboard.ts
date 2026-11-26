import { CropCase } from './index';

/**
 * Case counts summary for the farmer dashboard
 */
export interface FarmerCaseCounts {
  total: number;
  pending: number;
  analyzing: number;
  resolved: number;
  escalated?: number;
}

/**
 * Pending action requiring farmer attention
 */
export interface PendingAction {
  id: string;
  caseId?: string;
  title: string;
  description: string;
  actionType: 'review_result' | 'provide_info' | 'view_advisory' | 'contact_officer';
  actionUrl: string;
  actionLabel: string;
  priority: 'normal' | 'urgent';
  createdAt: string;
}

/**
 * Agricultural alert / advisory informational item
 */
export interface AgriculturalAlert {
  id: string;
  title: string;
  summary: string;
  type: 'advisory' | 'weather' | 'pest_outbreak' | 'scheme';
  date: string;
  source?: string;
  readMoreUrl?: string;
}

/**
 * Complete Farmer Dashboard response payload
 * Standardized across backend API and frontend adapter
 */
export interface FarmerDashboardData {
  summary: FarmerCaseCounts;
  recentCases: CropCase[];
  pendingActions: PendingAction[];
  alerts: AgriculturalAlert[];
}
