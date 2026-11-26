import React from 'react';
import Skeleton from '../../../../components/ui/Skeleton';

export const AnalyticsSkeleton: React.FC = () => {
  return (
    <div className="space-y-6 animate-pulse" aria-label="Loading analytics charts">
      {/* Time Range Bar Skeleton */}
      <Skeleton className="h-14 w-full rounded-card" />

      {/* Grid of Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Skeleton className="h-80 rounded-card" />
        <Skeleton className="h-80 rounded-card" />
        <Skeleton className="h-80 rounded-card" />
        <Skeleton className="h-80 rounded-card" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Skeleton className="lg:col-span-2 h-80 rounded-card" />
        <Skeleton className="h-80 rounded-card" />
      </div>
    </div>
  );
};

export default AnalyticsSkeleton;
