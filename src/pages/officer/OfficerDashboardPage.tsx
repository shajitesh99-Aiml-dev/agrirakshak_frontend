import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  OfficerWelcome,
  OfficerSummaryCards,
  UrgentCases,
  PendingCaseQueue,
  RecentOfficerActivity,
  OfficerQuickActions,
  OfficerDashboardSkeleton,
  useOfficerDashboard,
} from '../../features/officer';
import Button from '../../components/ui/Button';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { ROUTES } from '../../routes/routeConfig';

export const OfficerDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { data, isLoading, error, refreshDashboard } = useOfficerDashboard();

  if (isLoading) {
    return <OfficerDashboardSkeleton />;
  }

  if (error || !data) {
    return (
      <div className="p-8 text-center bg-white rounded-card border border-neutral-200 shadow-xs space-y-4 max-w-xl mx-auto my-12">
        <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
          <AlertCircle className="w-6 h-6" />
        </div>
        <h2 className="text-lg font-bold text-neutral-900">Officer Dashboard Unavailable</h2>
        <p className="text-sm text-neutral-600 font-sans leading-relaxed">
          {error || 'Unable to connect to the Agricultural Officer data service.'}
        </p>
        <Button variant="primary" size="md" onClick={refreshDashboard} className="gap-2">
          <RefreshCw className="w-4 h-4" />
          <span>Retry Connection</span>
        </Button>
      </div>
    );
  }

  const handleCardFilterSelect = (status: string) => {
    if (status === 'fieldVisits') {
      navigate(`${ROUTES.OFFICER_CASES}?status=under_review`);
    } else if (status === 'aiAwaitingReview') {
      navigate(`${ROUTES.OFFICER_CASES}?status=pending`);
    } else {
      navigate(`${ROUTES.OFFICER_CASES}?status=${status}`);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* 1. Personalized Officer Welcome Header */}
      <OfficerWelcome />

      {/* 2. Operational KPI Counters */}
      <OfficerSummaryCards
        summary={data.summary}
        onFilterSelect={handleCardFilterSelect}
      />

      {/* 3. Urgent High-Risk Outbreak & Escalated Cases */}
      {data.urgentCases && data.urgentCases.length > 0 && (
        <UrgentCases cases={data.urgentCases} />
      )}

      {/* 4. Split Layout: Pending Triage Queue & Recent Officer Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <PendingCaseQueue cases={data.pendingQueue} />
        </div>
        <div className="space-y-6">
          <RecentOfficerActivity activity={data.recentActivity} />
        </div>
      </div>

      {/* 5. Officer Operations & Quick Action Shortcuts */}
      <OfficerQuickActions />
    </div>
  );
};

export default OfficerDashboardPage;
