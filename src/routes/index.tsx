import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import PageLoader from '../components/ui/PageLoader';
import ProtectedRoute from './ProtectedRoute';
import RoleRoute from './RoleRoute';
import { ROUTES } from './routeConfig';

// Layouts
import PublicLayout from '../layouts/PublicLayout';
import FarmerLayout from '../layouts/FarmerLayout';
import OfficerLayout from '../layouts/OfficerLayout';
import AdminLayout from '../layouts/AdminLayout';

// Public & Auth Pages (Lazy Loaded)
const LandingPage = lazy(() => import('../pages/public/LandingPage'));
const AboutPage = lazy(() => import('../pages/public/AboutPage'));
const HelpPage = lazy(() => import('../pages/public/HelpPage'));
const PrivacyPage = lazy(() => import('../pages/public/PrivacyPage'));
const RouteOverviewPage = lazy(() => import('../pages/public/RouteOverviewPage'));
const ShowcasePage = lazy(() => import('../pages/public/ShowcasePage'));
const LoginPage = lazy(() => import('../pages/auth/LoginPage'));
const RegisterPage = lazy(() => import('../pages/auth/RegisterPage'));

// Farmer Pages (Lazy Loaded)
const FarmerDashboardPage = lazy(() => import('../pages/farmer/FarmerDashboardPage'));
const ReportCropPage = lazy(() => import('../pages/farmer/ReportCropPage'));
const FarmerCasesPage = lazy(() => import('../pages/farmer/FarmerCasesPage'));
const FarmerCaseDetailPage = lazy(() => import('../pages/farmer/FarmerCaseDetailPage'));
const DetectionResultPage = lazy(() => import('../pages/farmer/DetectionResultPage'));
const FarmerNotificationsPage = lazy(() => import('../pages/farmer/FarmerNotificationsPage'));
const FarmerProfilePage = lazy(() => import('../pages/farmer/FarmerProfilePage'));
const FarmerSettingsPage = lazy(() => import('../pages/farmer/FarmerSettingsPage'));

// Officer Pages (Lazy Loaded)
const OfficerDashboardPage = lazy(() => import('../pages/officer/OfficerDashboardPage'));
const OfficerCasesPage = lazy(() => import('../pages/officer/OfficerCasesPage'));
const OfficerCaseDetailPage = lazy(() => import('../pages/officer/OfficerCaseDetailPage'));
const OfficerAnalyticsPage = lazy(() => import('../pages/officer/OfficerAnalyticsPage'));
const OfficerHotspotsPage = lazy(() => import('../pages/officer/OfficerHotspotsPage'));
const OfficerNotificationsPage = lazy(() => import('../pages/officer/OfficerNotificationsPage'));
const OfficerProfilePage = lazy(() => import('../pages/officer/OfficerProfilePage'));
const OfficerSettingsPage = lazy(() => import('../pages/officer/OfficerSettingsPage'));

// Admin Pages (Lazy Loaded)
const AdminDashboardPage = lazy(() => import('../pages/admin/AdminDashboardPage'));
const UserManagementPage = lazy(() => import('../pages/admin/UserManagementPage'));
const AdminCasesPage = lazy(() => import('../pages/admin/AdminCasesPage'));
const AdminCaseDetailPage = lazy(() => import('../pages/admin/AdminCaseDetailPage'));
const ModelMonitoringPage = lazy(() => import('../pages/admin/ModelMonitoringPage'));
const AdminAnalyticsPage = lazy(() => import('../pages/admin/AdminAnalyticsPage'));
const AdminHotspotsPage = lazy(() => import('../pages/admin/AdminHotspotsPage'));
const SystemStatusPage = lazy(() => import('../pages/admin/SystemStatusPage'));
const AuditPage = lazy(() => import('../pages/admin/AuditPage'));
const AdminProfilePage = lazy(() => import('../pages/admin/AdminProfilePage'));
const AdminSettingsPage = lazy(() => import('../pages/admin/AdminSettingsPage'));

// Error Pages (Lazy Loaded)
const UnauthorizedPage = lazy(() => import('../pages/errors/UnauthorizedPage'));
const NotFoundPage = lazy(() => import('../pages/errors/NotFoundPage'));

import { useAuth } from '../features/auth';

// Helper to redirect generic /profile, /notifications, /settings to role-specific routes
const RoleRedirectRoute: React.FC<{ target: 'profile' | 'notifications' | 'settings' }> = ({ target }) => {
  const { user, isAuthenticated } = useAuth();
  if (!isAuthenticated || !user) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }
  const role = user.role;
  if (target === 'profile') {
    if (role === 'officer') return <Navigate to={ROUTES.OFFICER_PROFILE} replace />;
    if (role === 'admin') return <Navigate to={ROUTES.ADMIN_PROFILE} replace />;
    return <Navigate to={ROUTES.FARMER_PROFILE} replace />;
  }
  if (target === 'notifications') {
    if (role === 'officer') return <Navigate to={ROUTES.OFFICER_NOTIFICATIONS} replace />;
    if (role === 'admin') return <Navigate to={ROUTES.ADMIN_DASHBOARD} replace />;
    return <Navigate to={ROUTES.FARMER_NOTIFICATIONS} replace />;
  }
  if (target === 'settings') {
    if (role === 'officer') return <Navigate to={ROUTES.OFFICER_SETTINGS} replace />;
    if (role === 'admin') return <Navigate to={ROUTES.ADMIN_SETTINGS} replace />;
    return <Navigate to={ROUTES.FARMER_SETTINGS} replace />;
  }
  return <Navigate to={ROUTES.HOME} replace />;
};

export const AppRoutes: React.FC = () => {
  return (
    <Suspense fallback={<PageLoader message="Loading Agri Rakshak..." subMessage="Preparing agricultural route workspace" fullScreen />}>
      <Routes>
        {/* PUBLIC & AUTH ROUTES */}
        <Route element={<PublicLayout />}>
          <Route path={ROUTES.HOME} element={<LandingPage />} />
          <Route path={ROUTES.ABOUT} element={<AboutPage />} />
          <Route path={ROUTES.HELP} element={<HelpPage />} />
          <Route path={ROUTES.PRIVACY} element={<PrivacyPage />} />
          <Route path={ROUTES.ROUTE_OVERVIEW} element={<RouteOverviewPage />} />
          <Route path={ROUTES.SHOWCASE} element={<ShowcasePage />} />
          <Route path={ROUTES.LOGIN} element={<LoginPage />} />
          <Route path="/login" element={<Navigate to={ROUTES.LOGIN} replace />} />
          <Route path="/signin" element={<Navigate to={ROUTES.LOGIN} replace />} />
          <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
          <Route path="/register" element={<Navigate to={ROUTES.REGISTER} replace />} />
          <Route path="/signup" element={<Navigate to={ROUTES.REGISTER} replace />} />
          <Route path={ROUTES.UNAUTHORIZED} element={<UnauthorizedPage />} />
          <Route path="/profile" element={<RoleRedirectRoute target="profile" />} />
          <Route path="/notifications" element={<RoleRedirectRoute target="notifications" />} />
          <Route path="/settings" element={<RoleRedirectRoute target="settings" />} />
          <Route path="/farmer/new-case" element={<Navigate to="/farmer/report" replace />} />
          <Route path={ROUTES.NOT_FOUND} element={<NotFoundPage />} />
        </Route>

        {/* FARMER ROUTES (Wrapped with ProtectedRoute & RoleRoute) */}
        <Route
          path="/farmer"
          element={
            <ProtectedRoute>
              <RoleRoute allowedRoles={['farmer']}>
                <FarmerLayout />
              </RoleRoute>
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to={ROUTES.FARMER_DASHBOARD} replace />} />
          <Route path="dashboard" element={<FarmerDashboardPage />} />
          <Route path="report" element={<ReportCropPage />} />
          <Route path="new-case" element={<Navigate to="report" replace />} />
          <Route path="cases" element={<FarmerCasesPage />} />
          <Route path="cases/:caseId" element={<FarmerCaseDetailPage />} />
          <Route path="detection/:caseId" element={<DetectionResultPage />} />
          <Route path="notifications" element={<FarmerNotificationsPage />} />
          <Route path="profile" element={<FarmerProfilePage />} />
          <Route path="settings" element={<FarmerSettingsPage />} />
        </Route>

        {/* AGRICULTURAL OFFICER ROUTES (Wrapped with ProtectedRoute & RoleRoute) */}
        <Route
          path="/officer"
          element={
            <ProtectedRoute>
              <RoleRoute allowedRoles={['officer']}>
                <OfficerLayout />
              </RoleRoute>
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to={ROUTES.OFFICER_DASHBOARD} replace />} />
          <Route path="dashboard" element={<OfficerDashboardPage />} />
          <Route path="cases" element={<OfficerCasesPage />} />
          <Route path="cases/:caseId" element={<OfficerCaseDetailPage />} />
          <Route path="analytics" element={<OfficerAnalyticsPage />} />
          <Route path="hotspots" element={<OfficerHotspotsPage />} />
          <Route path="surveillance" element={<Navigate to="/officer/hotspots" replace />} />
          <Route path="notifications" element={<OfficerNotificationsPage />} />
          <Route path="profile" element={<OfficerProfilePage />} />
          <Route path="settings" element={<OfficerSettingsPage />} />
        </Route>

        {/* ADMINISTRATOR ROUTES (Wrapped with ProtectedRoute & RoleRoute) */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <RoleRoute allowedRoles={['admin']}>
                <AdminLayout />
              </RoleRoute>
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to={ROUTES.ADMIN_DASHBOARD} replace />} />
          <Route path="dashboard" element={<AdminDashboardPage />} />
          <Route path="users" element={<UserManagementPage />} />
          <Route path="cases" element={<AdminCasesPage />} />
          <Route path="cases/:caseId" element={<AdminCaseDetailPage />} />
          <Route path="model" element={<ModelMonitoringPage />} />
          <Route path="analytics" element={<AdminAnalyticsPage />} />
          <Route path="hotspots" element={<AdminHotspotsPage />} />
          <Route path="surveillance" element={<Navigate to="/admin/hotspots" replace />} />
          <Route path="system" element={<SystemStatusPage />} />
          <Route path="audit" element={<AuditPage />} />
          <Route path="profile" element={<AdminProfilePage />} />
          <Route path="settings" element={<AdminSettingsPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
