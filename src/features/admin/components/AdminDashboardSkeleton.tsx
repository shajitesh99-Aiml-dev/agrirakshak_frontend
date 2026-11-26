import React from 'react';
import Skeleton from '../../../components/ui/Skeleton';

export const AdminDashboardSkeleton: React.FC = () => {
  return (
    <div className="space-y-6 animate-pulse" aria-label="Loading administrative console">
      {/* Welcome Banner Skeleton */}
      <Skeleton className="h-44 w-full rounded-card" />

      {/* KPI Cards Skeleton */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <Skeleton key={i} className="h-28 rounded-card" />
        ))}
      </div>

      {/* Main Grid Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Skeleton className="h-64 rounded-card" />
          <Skeleton className="h-72 rounded-card" />
        </div>
        <div className="space-y-6">
          <Skeleton className="h-48 rounded-card" />
          <Skeleton className="h-80 rounded-card" />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardSkeleton;
