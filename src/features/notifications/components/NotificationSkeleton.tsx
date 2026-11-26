import React from 'react';
import Skeleton from '../../../components/ui/Skeleton';

export const NotificationSkeleton: React.FC = () => {
  return (
    <div className="space-y-3">
      {[1, 2, 3].map((idx) => (
        <div
          key={idx}
          className="p-4 sm:p-5 rounded-card border border-[#E0EBE0] bg-white flex items-start gap-4"
        >
          <Skeleton className="w-9 h-9 rounded-medium shrink-0" />
          <div className="flex-1 space-y-2">
            <div className="flex items-center justify-between">
              <Skeleton className="w-24 h-4 rounded" />
              <Skeleton className="w-20 h-3 rounded" />
            </div>
            <Skeleton className="w-48 h-5 rounded" />
            <Skeleton className="w-full h-4 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotificationSkeleton;
