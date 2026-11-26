import React from 'react';
import { CheckCircle2, AlertCircle } from 'lucide-react';

interface FarmerRecommendationsProps {
  recommendations?: string[];
  className?: string;
}

export const FarmerRecommendations: React.FC<FarmerRecommendationsProps> = ({
  recommendations,
  className = '',
}) => {
  if (!recommendations || recommendations.length === 0) {
    return (
      <div className={`p-4 rounded-card bg-amber-50/70 border border-amber-200 text-amber-900 ${className}`}>
        <div className="flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" aria-hidden="true" />
          <div className="text-sm">
            <p className="font-semibold text-amber-950">Recommended Next Steps</p>
            <p className="text-amber-800 text-xs mt-0.5">
              No recommendation is available yet. Please wait for agricultural officer guidance.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`p-4 sm:p-5 rounded-card bg-primary-50/50 border border-primary/20 ${className}`}>
      <h4 className="text-xs font-bold uppercase tracking-wider text-primary-dark flex items-center gap-1.5 mb-3">
        <CheckCircle2 className="w-4 h-4 text-primary" aria-hidden="true" />
        <span>What You Can Do Next</span>
      </h4>
      <ul className="space-y-2 text-sm text-neutral-800">
        {recommendations.map((rec, idx) => (
          <li key={idx} className="flex items-start gap-2.5">
            <span
              className="w-5 h-5 rounded-full bg-primary/15 text-primary-dark font-bold text-xs flex items-center justify-center shrink-0 mt-0.5"
              aria-hidden="true"
            >
              {idx + 1}
            </span>
            <span className="leading-relaxed font-sans">{rec}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FarmerRecommendations;
