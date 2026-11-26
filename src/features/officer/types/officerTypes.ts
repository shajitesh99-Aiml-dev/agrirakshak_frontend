import { CropCase, CaseStatus, SeverityLevel } from '../../../types';

/**
 * Agri Rakshak - Agricultural Officer Domain Types
 * Phase 8: Agricultural Officer Portal & Case Management Workflow
 */

export type OfficerAssessmentOutcome =
  | 'confirmed_ai'
  | 'modified_ai'
  | 'rejected_ai'
  | 'escalated'
  | 'resolved';

export interface FieldVisit {
  required: boolean;
  scheduledDate?: string;
  preferredTime?: string;
  location?: string;
  officerNotes?: string;
  status?: 'scheduled' | 'completed' | 'cancelled';
}

export interface OfficerReview {
  id: string;
  caseId: string;
  officerId: string;
  officerName: string;
  assessment: string;
  outcome: OfficerAssessmentOutcome;
  advisory: string;
  additionalObservations?: string;
  requiresFollowUp: boolean;
  requiresEscalation: boolean;
  fieldVisit?: FieldVisit;
  reviewedAt: string;
}

export type TimelineEventType =
  | 'case_created'
  | 'ai_analysis'
  | 'review_started'
  | 'review_submitted'
  | 'status_changed'
  | 'field_visit_scheduled'
  | 'escalated'
  | 'resolved';

export interface CaseTimelineEvent {
  id: string;
  caseId: string;
  type: TimelineEventType;
  title: string;
  description: string;
  actor: string; // 'Farmer', 'Agri Rakshak AI', 'Dr. Priya Sharma'
  timestamp: string;
}

export interface OfficerCase extends CropCase {
  farmerName?: string;
  farmerPhone?: string;
  farmSizeAcres?: number;
  officerReview?: OfficerReview;
  timeline?: CaseTimelineEvent[];
  fieldVisit?: FieldVisit;
  assignedOfficerName?: string;
  updatedAt: string;
}

export interface OfficerDashboardSummary {
  totalCases: number;
  pendingReview: number;
  underReview: number;
  aiAwaitingReview: number;
  escalatedCases: number;
  resolvedCases: number;
  scheduledFieldVisits: number;
}

export interface OfficerDashboardData {
  summary: OfficerDashboardSummary;
  urgentCases: OfficerCase[];
  pendingQueue: OfficerCase[];
  recentActivity: CaseTimelineEvent[];
}

export interface OfficerCaseFilter {
  status?: string;
  severity?: string;
  crop?: string;
  search?: string;
}

export interface SubmitReviewRequest {
  assessment: string;
  outcome: OfficerAssessmentOutcome;
  advisory: string;
  additionalObservations?: string;
  requiresFollowUp?: boolean;
  requiresEscalation?: boolean;
  fieldVisit?: FieldVisit;
  newStatus?: CaseStatus;
}

export interface UpdateStatusRequest {
  status: CaseStatus;
  note?: string;
  reason?: string;
}

export { type CaseStatus, type SeverityLevel };
