/**
 * Agri Rakshak - Shared TypeScript Foundation Types
 * Prepared for future phases: Auth, Farmer, Officer, Admin, AI Detection, Cases, and Analytics.
 */

// User and Role Types
export type UserRole = 'farmer' | 'officer' | 'admin';

export interface BaseUser {
  id: string;
  name: string;
  phoneNumber?: string;
  phone?: string;
  email?: string;
  avatarUrl?: string;
  role: UserRole;
  createdAt: string;
  preferred_language?: string;
  preferredLanguage?: string;
}

export interface Farmer extends BaseUser {
  role: 'farmer';
  village?: string;
  district?: string;
  state?: string;
  farmSizeAcres?: number;
  primaryCrops?: string[];
}

export interface AgriculturalOfficer extends BaseUser {
  role: 'officer';
  department?: string;
  assignedJurisdiction?: string;
  badgeNumber?: string;
  district?: string;
  state?: string;
}

export interface Administrator extends BaseUser {
  role: 'admin';
  permissions?: string[];
}

export type User = Farmer | AgriculturalOfficer | Administrator;

// Case & Disease Prediction Types
export type CaseStatus = 'pending' | 'analyzing' | 'under_review' | 'resolved' | 'escalated';
export type SeverityLevel = 'low' | 'moderate' | 'high' | 'critical';

export interface DiseasePrediction {
  id: string;
  diseaseName: string;
  scientificName?: string;
  confidenceScore: number; // 0.0 to 1.0
  severity: SeverityLevel;
  affectedPart?: 'leaf' | 'stem' | 'fruit' | 'root';
  suggestedAction?: string;
}

export interface CropCase {
  id: string;
  farmerId: string;
  cropName: string;
  status: CaseStatus;
  reportedAt: string;
  updatedAt: string;
  imageUrl?: string;
  imageUrls?: string[];
  description?: string;
  prediction?: DiseasePrediction;
  aiAnalysis?: import('./ai').AIAnalysisResult;
  growthStage?: string;
  cultivationStage?: string;
  village?: string;
  district?: string;
  state?: string;
  symptoms?: string[];
  severity?: SeverityLevel;
  assignedOfficerId?: string;
  farmerName?: string;
  farmerPhone?: string;
  farmSizeAcres?: number;
  officerReview?: import('../features/officer/types/officerTypes').OfficerReview;
  timeline?: import('../features/officer/types/officerTypes').CaseTimelineEvent[];
  fieldVisit?: import('../features/officer/types/officerTypes').FieldVisit;
}

// Dashboard & Analytics Types
export interface DashboardSummary {
  totalCases: number;
  activeCases: number;
  resolvedCases: number;
  criticalCases: number;
}

export interface AnalyticsMetric {
  period: string;
  detectedCount: number;
  resolvedCount: number;
}

// API Response Wrappers
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface ApiError {
  message: string;
  code?: string;
  details?: Record<string, unknown>;
}

export * from './auth';
export * from './dashboard';
export * from './ai';
export * from './analytics';
