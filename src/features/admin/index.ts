/**
 * Admin Feature Barrel Export
 * Phase 9: Administrative Portal, Outbreak Surveillance & Epidemic Heatmaps
 */

export * from '../../types/analytics';

// Services
export * from './services/adminDashboardService';
export * from './services/adminCaseService';
export * from './services/adminAnalyticsService';
export * from './services/hotspotService';
export * from './services/adminUserService';

// Hooks
export * from './hooks/useAdminDashboard';
export * from './hooks/useAdminCases';
export * from './hooks/useAdminAnalytics';
export * from './hooks/useHotspots';
export * from './hooks/useAdminUsers';

// Dashboard Components
export * from './components/AdminWelcome';
export * from './components/AdminSummaryCards';
export * from './components/OutbreakAlertBanner';
export * from './components/AdminRecentEscalations';
export * from './components/AdminQuickActions';
export * from './components/AdminDashboardSkeleton';

// Hotspot Components
export * from './components/hotspots/HotspotMap';
export * from './components/hotspots/HotspotLegend';
export * from './components/hotspots/HotspotFilters';
export * from './components/hotspots/HotspotDetailsPanel';
export * from './components/hotspots/OutbreakAlertCard';
export * from './components/hotspots/HotspotMapSkeleton';

// Analytics Components
export * from './components/analytics/CaseTrendChart';
export * from './components/analytics/DiseaseDistributionChart';
export * from './components/analytics/PestDistributionChart';
export * from './components/analytics/CropImpactChart';
export * from './components/analytics/SeverityDistributionChart';
export * from './components/analytics/DistrictDistributionChart';
export * from './components/analytics/AnalyticsSkeleton';

// Case Governance Components
export * from './components/cases/AdminCaseFilters';
export * from './components/cases/AdminCaseTable';
export * from './components/cases/AdminCaseDetailView';

// User Governance Components
export * from './components/users/UserSummaryCards';
export * from './components/users/OfficerCaseloadTable';
