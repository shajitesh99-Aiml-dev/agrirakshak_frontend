import React from 'react';
import { usePageTitle } from '../../hooks/usePageTitle';
import {
  useFarmerDashboard,
  FarmerWelcome,
  DashboardSummaryCards,
  RecentCases,
  PendingActions,
  AgriculturalUpdates,
  QuickActions,
  DashboardSkeleton,
} from '../../features/dashboard';
import ErrorState from '../../components/ui/ErrorState';

export const FarmerDashboardPage: React.FC = () => {
  usePageTitle('Farmer Dashboard | Agri Rakshak');
  const { data, isLoading, error, refetch } = useFarmerDashboard();

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  if (error || !data) {
    return (
      <div className="py-8 sm:py-12">
        <ErrorState
          title="Unable to Load Farmer Dashboard"
          message={error || 'We encountered a difficulty retrieving your crop case statistics. Please check your network connection.'}
          onRetry={refetch}
          retryLabel="Try Again"
        />
      </div>
    );
  }

  return (
    <div className="space-y-6 sm:space-y-8 font-serif pb-6">
      {/* 1. Header greeting & primary Report Crop Problem CTA */}
      <FarmerWelcome />

      {/* 2. Case status summary metrics (Total, Pending, Analyzing, Resolved) */}
      <DashboardSummaryCards summary={data.summary} />

      {/* 3. Pending Actions requiring farmer attention */}
      <PendingActions actions={data.pendingActions} />

      {/* 4. Recent cases list with status & disease diagnosis */}
      <RecentCases cases={data.recentCases} />

      {/* 5. Agricultural Updates, KVK advisories, and weather notices */}
      <AgriculturalUpdates alerts={data.alerts} />

      {/* 6. Quick navigation actions */}
      <QuickActions />
    </div>
  );
};

export default FarmerDashboardPage;
