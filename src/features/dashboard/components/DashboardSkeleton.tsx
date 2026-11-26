import React from 'react';
import Skeleton from '../../../components/ui/Skeleton';
import Card from '../../../components/ui/Card';

export const DashboardSkeleton: React.FC = () => {
  return (
    <div className="space-y-6 animate-pulse" aria-label="Loading dashboard content...">
      {/* Welcome banner skeleton */}
      <div className="h-44 sm:h-48 rounded-card bg-[#E2EBE1]/90 p-6 flex flex-col justify-between" />

      {/* Summary cards skeleton */}
      <div className="space-y-2">
        <Skeleton variant="text" width="180px" height="24px" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} padding="md" className="space-y-3">
              <div className="flex justify-between items-center">
                <Skeleton variant="circular" width="36px" height="36px" />
                <Skeleton variant="text" width="40px" height="32px" />
              </div>
              <Skeleton variant="text" width="80px" height="16px" />
              <Skeleton variant="text" width="120px" height="12px" />
            </Card>
          ))}
        </div>
      </div>

      {/* Pending actions skeleton */}
      <div className="space-y-2">
        <Skeleton variant="text" width="220px" height="24px" />
        <Card padding="md" className="h-24 flex items-center justify-between">
          <div className="space-y-2">
            <Skeleton variant="text" width="180px" height="16px" />
            <Skeleton variant="text" width="280px" height="12px" />
          </div>
          <Skeleton variant="button" width="100px" height="36px" />
        </Card>
      </div>

      {/* Recent cases skeleton */}
      <div className="space-y-2">
        <Skeleton variant="text" width="200px" height="24px" />
        <div className="space-y-2.5">
          {[1, 2, 3].map((i) => (
            <Card key={i} padding="md" className="h-20 flex items-center justify-between">
              <div className="space-y-2">
                <Skeleton variant="text" width="140px" height="16px" />
                <Skeleton variant="text" width="220px" height="12px" />
              </div>
              <Skeleton variant="button" width="90px" height="32px" />
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardSkeleton;
