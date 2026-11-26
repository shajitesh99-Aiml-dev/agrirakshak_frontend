import React from 'react';
import {
  useAdminDashboard,
  AdminWelcome,
  AdminSummaryCards,
  OutbreakAlertBanner,
  AdminRecentEscalations,
  AdminQuickActions,
  AdminDashboardSkeleton,
} from '../../features/admin';
import Button from '../../components/ui/Button';
import EmptyState from '../../components/ui/EmptyState';
import { RefreshCw, AlertCircle, LayoutDashboard } from 'lucide-react';

export const AdminDashboardPage: React.FC = () => {
  const {
    data,
    timeRange,
    updateRange,
    isLoading,
    error,
    refreshDashboard,
  } = useAdminDashboard();

  if (isLoading && !data) {
    return <AdminDashboardSkeleton />;
  }

  if (error && !data) {
    return (
      <div className="p-8 rounded-card bg-rose-50 border border-rose-200 text-center space-y-4 max-w-lg mx-auto my-12">
        <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
          <AlertCircle className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-rose-950">Administrative Telemetry Error</h2>
          <p className="text-xs text-rose-800 mt-1">{error}</p>
        </div>
        <Button
          variant="primary"
          onClick={() => refreshDashboard()}
          leftIcon={<RefreshCw className="w-4 h-4" />}
          className="mx-auto"
        >
          Retry Connection
        </Button>
      </div>
    );
  }

  if (!data) {
    return (
      <EmptyState
        title="No Administrative Data"
        description="The central governance platform has not received any operational case telemetry yet."
        icon={<LayoutDashboard className="w-8 h-8 text-neutral-400" />}
        primaryAction={{
          label: 'Refresh Dashboard',
          onClick: () => {
            void refreshDashboard();
          },
        }}
      />
    );
  }

  return (
    <div className="space-y-6 pb-12">
      {/* Executive Welcome & Window Filter */}
      <AdminWelcome timeRange={timeRange} onRangeChange={updateRange} />

      {/* Outbreak Surveillance Alert Banner */}
      <OutbreakAlertBanner alerts={data.outbreakAlerts} />

      {/* Summary KPI Cards */}
      <AdminSummaryCards summary={data.summary} />

      {/* Main Administrative Action Deck */}
      <AdminQuickActions />

      {/* Recent Escalations & Priority Outbreaks */}
      <AdminRecentEscalations cases={data.recentEscalations} />
    </div>
  );
};

export default AdminDashboardPage;
