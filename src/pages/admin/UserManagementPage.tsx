import React from 'react';
import {
  useAdminUsers,
  UserSummaryCards,
  OfficerCaseloadTable,
} from '../../features/admin';
import { Breadcrumbs } from '../../components/ui/Breadcrumbs';
import Button from '../../components/ui/Button';
import { Users, RefreshCw, AlertCircle } from 'lucide-react';
import { ROUTES } from '../../routes/routeConfig';

export const UserManagementPage: React.FC = () => {
  const { data, isLoading, error, refreshUsers } = useAdminUsers();

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Breadcrumbs
            items={[
              { label: 'Admin', href: ROUTES.ADMIN_DASHBOARD },
              { label: 'User Management', isCurrent: true },
            ]}
          />
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 mt-1 flex items-center gap-2">
            <Users className="w-7 h-7 text-primary" />
            <span>User Ecosystem &amp; Officer Directory</span>
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 font-sans mt-0.5">
            Role allocations, registered smallholder farmers, and agricultural officer jurisdiction assignments.
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => refreshUsers()}
          leftIcon={<RefreshCw className="w-3.5 h-3.5" />}
          className="shrink-0 text-xs"
        >
          Sync Users
        </Button>
      </div>

      {error && (
        <div className="p-4 rounded-card bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
          <span>{error}</span>
        </div>
      )}

      {isLoading && !data ? (
        <div className="p-12 text-center text-xs text-neutral-400 bg-white rounded-card border border-neutral-200 animate-pulse">
          Loading user ecosystem data...
        </div>
      ) : data ? (
        <div className="space-y-6">
          <UserSummaryCards data={data} />
          <OfficerCaseloadTable officers={data.officersList} />
        </div>
      ) : null}
    </div>
  );
};

export default UserManagementPage;
