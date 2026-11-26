import React from 'react';
import Skeleton from '../../../../components/ui/Skeleton';
import Spinner from '../../../../components/ui/Spinner';
import { Sparkles } from 'lucide-react';

export const AIAnalysisSkeleton: React.FC = () => {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="AI diagnosis analysis in progress"
      className="p-6 sm:p-8 rounded-card bg-white border border-primary/20 shadow-card space-y-6 animate-pulse"
    >
      <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left border-b border-neutral-100 pb-5">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
          <Spinner size="md" className="text-primary" />
        </div>
        <div className="space-y-1">
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <Sparkles className="w-4 h-4 text-primary animate-spin" aria-hidden="true" />
            <h3 className="text-lg font-bold text-neutral-900">
              AI Analysis in Progress
            </h3>
          </div>
          <p className="text-sm text-neutral-600">
            We're analyzing your crop problem. Securely querying Groq agricultural intelligence...
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Prediction header skeleton */}
        <div className="space-y-2">
          <Skeleton variant="text" width="30%" height={16} />
          <Skeleton variant="text" width="60%" height={28} />
          <Skeleton variant="text" width="40%" height={16} />
        </div>

        {/* Metrics skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="p-4 rounded-lg bg-neutral-50 space-y-2">
            <Skeleton variant="text" width="50%" height={14} />
            <Skeleton variant="rectangular" height={10} />
          </div>
          <div className="p-4 rounded-lg bg-neutral-50 space-y-2">
            <Skeleton variant="text" width="50%" height={14} />
            <Skeleton variant="rectangular" width="40%" height={24} />
          </div>
        </div>

        {/* Symptoms & Recommendations placeholders */}
        <div className="space-y-3 pt-2">
          <Skeleton variant="text" width="40%" height={18} />
          <Skeleton variant="rectangular" height={60} />
          <Skeleton variant="rectangular" height={80} />
        </div>
      </div>
    </div>
  );
};

export default AIAnalysisSkeleton;
