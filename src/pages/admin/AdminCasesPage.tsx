import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  useAdminCases,
  AdminCaseFilters,
  AdminCaseTable,
} from '../../features/admin';
import { Breadcrumbs } from '../../components/ui/Breadcrumbs';
import Button from '../../components/ui/Button';
import { FolderGit2, RefreshCw, AlertCircle } from 'lucide-react';
import { ROUTES } from '../../routes/routeConfig';

export const AdminCasesPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialStatus = searchParams.get('status') || 'all';
  const initialDistrict = searchParams.get('district') || 'all';

  const {
    cases,
    filter,
    updateFilter,
    isLoading,
    error,
    refreshCases,
  } = useAdminCases({ status: initialStatus, district: initialDistrict });

  useEffect(() => {
    const statusParam = searchParams.get('status');
    const districtParam = searchParams.get('district');
    const updates: { status?: string; district?: string } = {};

    if (statusParam && statusParam !== filter.status) {
      updates.status = statusParam;
    }
    if (districtParam && districtParam !== filter.district) {
      updates.district = districtParam;
    }

    if (Object.keys(updates).length > 0) {
      updateFilter(updates);
    }
  }, [searchParams, updateFilter, filter.status, filter.district]);

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Breadcrumbs
            items={[
              { label: 'Admin', href: ROUTES.ADMIN_DASHBOARD },
              { label: 'Statewide Cases', isCurrent: true },
            ]}
          />
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 mt-1 flex items-center gap-2">
            <FolderGit2 className="w-7 h-7 text-primary" />
            <span>Statewide Crop Case Governance</span>
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 font-sans mt-0.5">
            Supervise all farmer-submitted plant health incidents, triage statuses, and officer advisories.
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => refreshCases()}
          leftIcon={<RefreshCw className="w-3.5 h-3.5" />}
          className="shrink-0 text-xs"
        >
          Refresh Queue
        </Button>
      </div>

      {/* Filters */}
      <AdminCaseFilters
        filter={filter}
        onFilterChange={updateFilter}
        totalFiltered={cases.length}
      />

      {/* Error Notice */}
      {error && (
        <div className="p-4 rounded-card bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
          <span>{error}</span>
        </div>
      )}

      {/* Cases Table */}
      {isLoading && cases.length === 0 ? (
        <div className="p-12 text-center text-xs text-neutral-400 bg-white rounded-card border border-neutral-200 animate-pulse">
          Loading statewide governance cases...
        </div>
      ) : (
        <AdminCaseTable cases={cases} />
      )}
    </div>
  );
};

export default AdminCasesPage;
