import React from 'react';
import {
  useAdminAnalytics,
  CaseTrendChart,
  DiseaseDistributionChart,
  PestDistributionChart,
  CropImpactChart,
  SeverityDistributionChart,
  DistrictDistributionChart,
  AnalyticsSkeleton,
} from '../../features/admin';
import { Breadcrumbs } from '../../components/ui/Breadcrumbs';
import Button from '../../components/ui/Button';
import EmptyState from '../../components/ui/EmptyState';
import { BarChart4, RefreshCw, AlertCircle, Clock } from 'lucide-react';
import { ROUTES } from '../../routes/routeConfig';
import { AnalyticsTimeRange } from '../../types/analytics';

export const AdminAnalyticsPage: React.FC = () => {
  const {
    data,
    timeRange,
    updateRange,
    isLoading,
    error,
    refreshAnalytics,
  } = useAdminAnalytics();

  const rangeButtons: Array<{ value: AnalyticsTimeRange; label: string }> = [
    { value: '7d', label: '7 Days' },
    { value: '30d', label: '30 Days' },
    { value: '90d', label: '90 Days' },
    { value: '6m', label: '6 Months' },
    { value: '1y', label: '1 Year' },
  ];

  if (isLoading && !data) {
    return (
      <div className="space-y-6">
        <Breadcrumbs
          items={[
            { label: 'Admin', href: ROUTES.ADMIN_DASHBOARD },
            { label: 'Analytics', isCurrent: true },
          ]}
        />
        <AnalyticsSkeleton />
      </div>
    );
  }

  if (error && !data) {
    return (
      <div className="p-8 rounded-card bg-rose-50 border border-rose-200 text-center space-y-4 max-w-lg mx-auto my-12">
        <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
          <AlertCircle className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-rose-950">Analytics Temporarily Unavailable</h2>
          <p className="text-xs text-rose-800 mt-1">{error}</p>
        </div>
        <Button
          variant="primary"
          onClick={() => refreshAnalytics()}
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
        title="No Analytics Data"
        description="No epidemiological statistics found for the selected time window."
        icon={<BarChart4 className="w-8 h-8 text-neutral-400" />}
        primaryAction={{
          label: 'Refresh Analytics',
          onClick: () => {
            void refreshAnalytics();
          },
        }}
      />
    );
  }

  return (
    <div className="space-y-6 pb-12">
      {/* Breadcrumbs & Header with Window Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Breadcrumbs
            items={[
              { label: 'Admin', href: ROUTES.ADMIN_DASHBOARD },
              { label: 'Epidemiological Analytics', isCurrent: true },
            ]}
          />
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 mt-1 flex items-center gap-2">
            <BarChart4 className="w-7 h-7 text-primary" />
            <span>Epidemiological &amp; Crop Vulnerability Analytics</span>
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 font-sans mt-0.5">
            Macro-level trends, pathogen classifications, commodity loss vulnerability, and district rankings.
          </p>
        </div>

        {/* Range Selector & Sync */}
        <div className="flex items-center gap-2">
          <div className="flex items-center rounded-lg bg-neutral-100 p-1 text-xs">
            <span className="text-neutral-500 text-[11px] px-2 flex items-center gap-1 font-medium">
              <Clock className="w-3 h-3" />
              <span>Window:</span>
            </span>
            {rangeButtons.map((btn) => (
              <button
                key={btn.value}
                type="button"
                onClick={() => updateRange(btn.value)}
                className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all ${
                  timeRange === btn.value
                    ? 'bg-primary text-white shadow-xs'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => refreshAnalytics()}
            title="Refresh analytics data"
            className="p-2"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>

      {/* Row 1: Case Intake Trajectory & Severity Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <CaseTrendChart trends={data.trends} />
        </div>
        <div className="lg:col-span-1">
          <SeverityDistributionChart severityDistribution={data.severityDistribution} />
        </div>
      </div>

      {/* Row 2: Disease vs Pest Distributions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DiseaseDistributionChart diseaseStats={data.diseaseStats} />
        <PestDistributionChart pestStats={data.pestStats} />
      </div>

      {/* Row 3: Crop Commodity Impact & District Aggregations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CropImpactChart cropImpacts={data.cropImpacts} />
        <DistrictDistributionChart districtStats={data.districtStats} />
      </div>
    </div>
  );
};

export default AdminAnalyticsPage;
