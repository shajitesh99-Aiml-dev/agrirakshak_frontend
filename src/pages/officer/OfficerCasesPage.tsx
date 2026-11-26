import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  OfficerCaseQueue,
  useOfficerCases,
} from '../../features/officer';
import { Breadcrumbs, BreadcrumbItem } from '../../components/ui/Breadcrumbs';
import Button from '../../components/ui/Button';
import { ClipboardList, RefreshCw } from 'lucide-react';
import { ROUTES } from '../../routes/routeConfig';

export const OfficerCasesPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialStatus = searchParams.get('status') || 'all';
  const initialSeverity = searchParams.get('severity') || 'all';

  const {
    cases,
    filter,
    updateFilter,
    setFilter,
    isLoading,
    refreshCases,
  } = useOfficerCases({
    status: initialStatus,
    severity: initialSeverity,
  });

  // Sync when URL query params change
  useEffect(() => {
    const statusParam = searchParams.get('status');
    const severityParam = searchParams.get('severity');
    if (statusParam || severityParam) {
      updateFilter({
        status: statusParam || 'all',
        severity: severityParam || 'all',
      });
    }
  }, [searchParams, updateFilter]);

  const breadcrumbs: BreadcrumbItem[] = [
    { label: 'Officer Home', href: ROUTES.OFFICER_DASHBOARD },
    { label: 'Incoming Triage Cases', isCurrent: true },
  ];

  const handleResetFilter = () => {
    setFilter({
      status: 'all',
      severity: 'all',
      crop: 'all',
      search: '',
    });
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Breadcrumbs Navigation */}
      <Breadcrumbs items={breadcrumbs} />

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-5 sm:p-6 bg-white rounded-card border border-neutral-200 shadow-2xs">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-primary-light text-dark-green flex items-center justify-center shrink-0">
              <ClipboardList className="w-4 h-4 text-primary" aria-hidden="true" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-neutral-900 tracking-tight">
              District Case Triage Queue
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-neutral-600 font-sans max-w-2xl leading-relaxed">
            Review incoming farmer problem reports, inspect AI disease classifications, verify leaf photographs, and issue agricultural advisories.
          </p>
        </div>

        <div className="shrink-0 flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={refreshCases}
            disabled={isLoading}
            className="gap-1.5 text-xs text-neutral-700 min-h-[40px]"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
            <span>Refresh Queue</span>
          </Button>
        </div>
      </div>

      {/* Main Interactive Queue */}
      <OfficerCaseQueue
        cases={cases}
        filter={filter}
        onFilterChange={updateFilter}
        onResetFilter={handleResetFilter}
        isLoading={isLoading}
      />
    </div>
  );
};

export default OfficerCasesPage;
