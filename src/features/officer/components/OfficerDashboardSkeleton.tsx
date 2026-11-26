import React from 'react';
import Skeleton from '../../../components/ui/Skeleton';

export const OfficerDashboardSkeleton: React.FC = () => {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading Agricultural Officer Dashboard"
      className="space-y-6 animate-pulse"
    >
      {/* Welcome banner skeleton */}
      <div className="h-36 rounded-card bg-neutral-200/80" />

      {/* Summary cards skeleton */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="h-24 rounded-card bg-neutral-100 p-3 space-y-2">
            <Skeleton variant="text" width="40%" height={12} />
            <Skeleton variant="rectangular" width="60%" height={24} />
          </div>
        ))}
      </div>

      {/* Main split sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <Skeleton variant="rectangular" height={220} className="rounded-card" />
        </div>
        <div className="space-y-4">
          <Skeleton variant="rectangular" height={220} className="rounded-card" />
        </div>
      </div>
    </div>
  );
};

export default OfficerDashboardSkeleton;
