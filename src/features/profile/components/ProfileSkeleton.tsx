import React from 'react';
import Card from '../../../components/ui/Card';
import Skeleton from '../../../components/ui/Skeleton';

export const ProfileSkeleton: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header Skeleton */}
      <div className="p-6 rounded-card border border-[#DCE7DC] bg-white flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Skeleton className="w-16 h-16 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="w-48 h-6 rounded" />
            <Skeleton className="w-32 h-4 rounded" />
          </div>
        </div>
        <Skeleton className="w-24 h-9 rounded-medium" />
      </div>

      {/* Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card padding="lg" className="border-[#DCE7DC] space-y-4">
          <Skeleton className="w-36 h-5 rounded" />
          <div className="space-y-3">
            <Skeleton className="w-full h-10 rounded" />
            <Skeleton className="w-full h-10 rounded" />
            <Skeleton className="w-full h-10 rounded" />
          </div>
        </Card>

        <Card padding="lg" className="border-[#DCE7DC] space-y-4">
          <Skeleton className="w-36 h-5 rounded" />
          <div className="space-y-3">
            <Skeleton className="w-full h-10 rounded" />
            <Skeleton className="w-full h-10 rounded" />
            <Skeleton className="w-full h-10 rounded" />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ProfileSkeleton;
