import React from 'react';
import Skeleton from '../../../../components/ui/Skeleton';

export const HotspotMapSkeleton: React.FC = () => {
  return (
    <div className="space-y-4 animate-pulse" aria-label="Loading geographic surveillance map">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} className="h-20 rounded-card" />
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Skeleton className="lg:col-span-2 h-[520px] rounded-card" />
        <Skeleton className="h-[520px] rounded-card" />
      </div>
    </div>
  );
};

export default HotspotMapSkeleton;
