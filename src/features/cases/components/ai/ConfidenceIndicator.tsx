import React from 'react';
import Progress from '../../../../components/ui/Progress';
import { HelpCircle } from 'lucide-react';

interface ConfidenceIndicatorProps {
  confidence?: number; // 0.0 to 1.0 or 0 to 100
  className?: string;
}

export const ConfidenceIndicator: React.FC<ConfidenceIndicatorProps> = ({
  confidence,
  className = '',
}) => {
  if (confidence === undefined || confidence === null || isNaN(confidence)) {
    return (
      <div className={`p-3 bg-neutral-50 rounded-lg border border-neutral-200 text-xs text-neutral-600 ${className}`}>
        <span className="font-semibold text-neutral-800">Confidence: </span>
        <span>Confidence information is not available.</span>
      </div>
    );
  }

  // Normalize confidence to percentage integer (0-100)
  const percent = Math.round(confidence > 1 ? confidence : confidence * 100);
  const clampedPercent = Math.max(0, Math.min(100, percent));

  const getVariant = (val: number): 'primary' | 'accent' | 'ai' => {
    if (val >= 80) return 'ai';
    if (val >= 60) return 'accent';
    return 'primary';
  };

  return (
    <div className={`space-y-2 p-3.5 bg-[#FAFDF9] rounded-md border-2 border-[#172117] shadow-neo-sm ${className}`}>
      <div className="flex items-center justify-between text-sm">
        <span className="font-bold text-[#172117] flex items-center gap-1.5">
          <span>Model Confidence</span>
        </span>
        <span
          className="font-black text-[#172117] px-2.5 py-0.5 bg-white rounded-[4px] border-2 border-[#172117] shadow-[1px_1px_0px_#172117] text-xs"
          aria-label={`Confidence score ${clampedPercent} percent`}
        >
          {clampedPercent}%
        </span>
      </div>

      <Progress
        value={clampedPercent}
        variant={getVariant(clampedPercent)}
        size="md"
        aria-label={`AI diagnosis confidence score: ${clampedPercent}%`}
      />

      <p className="text-xs text-neutral-500 flex items-start gap-1 leading-relaxed">
        <HelpCircle className="w-3.5 h-3.5 text-neutral-400 shrink-0 mt-0.5" aria-hidden="true" />
        <span>This score shows how strongly the AI supports the prediction. It is not a guarantee.</span>
      </p>
    </div>
  );
};

export default ConfidenceIndicator;
