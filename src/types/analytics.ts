/**
 * Agri Rakshak - Analytics & Epidemiological Surveillance Models
 * Phase 9: Administrative Portal, Outbreak Surveillance & Epidemic Heatmaps
 */

import { CropCase } from './index';

export type AnalyticsTimeRange = '7d' | '30d' | '90d' | '6m' | '1y';

export type OutbreakAlertType =
  | 'emerging_hotspot'
  | 'rapid_increase'
  | 'high_severity_cluster'
  | 'disease_concentration'
  | 'pest_surge';

export type HotspotSeverity = 'low' | 'moderate' | 'high' | 'critical';

export interface Hotspot {
  id: string;
  district: string;
  state: string;
  village?: string;
  latitude: number;
  longitude: number;
  caseCount: number;
  severity: HotspotSeverity;
  dominantIssue: string;
  dominantCategory: 'disease' | 'pest';
  trend: 'increasing' | 'stable' | 'decreasing';
  affectedCrops: string[];
  lastReportedAt: string;
  officersAssigned?: number;
}

export interface OutbreakAlert {
  id: string;
  alertType: OutbreakAlertType;
  title: string;
  affectedRegion: string;
  dominantIssue: string;
  caseCount: number;
  trend: 'increasing' | 'stable' | 'decreasing';
  severity: 'moderate' | 'high' | 'critical';
  detectedAt: string;
  recommendedAction: string;
  acknowledged?: boolean;
}

export interface CaseTrend {
  period: string;
  totalCases: number;
  resolvedCases: number;
  escalatedCases: number;
}

export interface DiseaseStatistic {
  diseaseName: string;
  scientificName?: string;
  caseCount: number;
  percentage: number;
  affectedCrops: string[];
  affectedDistricts: string[];
  averageConfidence?: number;
}

export interface PestStatistic {
  pestName: string;
  scientificName?: string;
  caseCount: number;
  percentage: number;
  affectedCrops: string[];
  affectedDistricts: string[];
  trend: 'increasing' | 'stable' | 'decreasing';
}

export interface CropImpactStatistic {
  cropName: string;
  caseCount: number;
  percentage: number;
  topThreat: string;
  severityDistribution: { mild: number; moderate: number; severe: number };
}

export interface SeverityStatistic {
  level: string;
  count: number;
  percentage: number;
}

export interface DistrictStatistic {
  district: string;
  state: string;
  totalCases: number;
  activeCases: number;
  escalatedCases: number;
  topIssue: string;
  affectedCrops: string[];
  trend: 'increasing' | 'stable' | 'decreasing';
}

export interface AnalyticsOverviewData {
  timeRange: AnalyticsTimeRange;
  trends: CaseTrend[];
  diseaseStats: DiseaseStatistic[];
  pestStats: PestStatistic[];
  cropImpacts: CropImpactStatistic[];
  severityDistribution: SeverityStatistic[];
  districtStats: DistrictStatistic[];
}

export interface AdminSummaryMetrics {
  totalCases: number;
  activeCases: number;
  resolvedCases: number;
  escalatedCases: number;
  casesThisWeek: number;
  aiAnalysesCompleted: number;
  affectedDistrictsCount: number;
  activeOutbreakAlertsCount: number;
}

export interface AdminDashboardData {
  timeRange: AnalyticsTimeRange;
  summary: AdminSummaryMetrics;
  outbreakAlerts: OutbreakAlert[];
  recentEscalations: CropCase[];
  hotspotsSummary: Hotspot[];
  topAffectedCrops: Array<{ cropName: string; count: number; percentage: number }>;
  recentCases: CropCase[];
}

export interface OfficerCaseloadMetric {
  id: string;
  name: string;
  email: string;
  phone: string;
  district: string;
  state: string;
  assignedCases: number;
  pendingCases: number;
  resolvedCases: number;
  lastActive: string;
}

export interface AdminUserSummary {
  totalUsers: number;
  farmersCount: number;
  officersCount: number;
  adminsCount: number;
  officersList: OfficerCaseloadMetric[];
}

export interface AdminCaseFilter {
  search?: string;
  status?: string;
  severity?: string;
  crop?: string;
  district?: string;
}
