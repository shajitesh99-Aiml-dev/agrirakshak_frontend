import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CropCase } from '../../types';
import { adminCaseService } from '../../features/admin';
import AdminCaseDetailView from '../../features/admin/components/cases/AdminCaseDetailView';
import { Breadcrumbs } from '../../components/ui/Breadcrumbs';
import Button from '../../components/ui/Button';
import Skeleton from '../../components/ui/Skeleton';
import { ROUTES } from '../../routes/routeConfig';
import { ArrowLeft, AlertCircle } from 'lucide-react';

export const AdminCaseDetailPage: React.FC = () => {
  const { caseId } = useParams<{ caseId: string }>();
  const [cropCase, setCropCase] = useState<CropCase | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(Boolean(caseId));
  const [error, setError] = useState<string | null>(caseId ? null : 'No Case ID specified.');

  useEffect(() => {
    if (!caseId) return;

    let isMounted = true;
    adminCaseService
      .getCaseById(caseId)
      .then((data) => {
        if (isMounted) {
          setCropCase(data);
          setError(null);
          setIsLoading(false);
        }
      })
      .catch((err: unknown) => {
        if (isMounted) {
          const msg = err instanceof Error ? err.message : `Unable to load case record #${caseId}.`;
          setError(msg);
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [caseId]);

  if (isLoading) {
    return (
      <div className="space-y-6 animate-pulse">
        <Skeleton className="h-8 w-64 rounded-md" />
        <Skeleton className="h-32 w-full rounded-card" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Skeleton className="h-96 rounded-card" />
          <Skeleton className="h-96 rounded-card" />
          <Skeleton className="h-96 rounded-card" />
        </div>
      </div>
    );
  }

  if (error || !cropCase) {
    return (
      <div className="p-8 rounded-card bg-rose-50 border border-rose-200 text-center space-y-4 max-w-lg mx-auto my-12">
        <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
          <AlertCircle className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-rose-950">Case Record Not Found</h2>
          <p className="text-xs text-rose-800 mt-1">{error || 'This case does not exist in the platform repository.'}</p>
        </div>
        <Link to={ROUTES.ADMIN_CASES}>
          <Button variant="outline" leftIcon={<ArrowLeft className="w-4 h-4" />} className="mx-auto">
            Back to Case Directory
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-12">
      <div className="flex items-center justify-between">
        <Breadcrumbs
          items={[
            { label: 'Admin', href: ROUTES.ADMIN_DASHBOARD },
            { label: 'Cases', href: ROUTES.ADMIN_CASES },
            { label: `#${cropCase.id}`, isCurrent: true },
          ]}
        />

        <Link to={ROUTES.ADMIN_CASES}>
          <Button variant="outline" size="sm" leftIcon={<ArrowLeft className="w-3.5 h-3.5" />}>
            Back to Queue
          </Button>
        </Link>
      </div>

      <AdminCaseDetailView cropCase={cropCase} />
    </div>
  );
};

export default AdminCaseDetailPage;
