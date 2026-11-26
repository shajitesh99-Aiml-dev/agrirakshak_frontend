import React from 'react';
import { HelpCircle } from 'lucide-react';

interface PossibleCausesProps {
  causes?: string[];
  className?: string;
}

export const PossibleCauses: React.FC<PossibleCausesProps> = ({
  causes,
  className = '',
}) => {
  if (!causes || causes.length === 0) {
    return null;
  }

  return (
    <div className={`p-4 rounded-card bg-neutral-50 border border-neutral-200/80 ${className}`}>
      <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-800 flex items-center gap-1.5 mb-2.5">
        <HelpCircle className="w-3.5 h-3.5 text-secondary" aria-hidden="true" />
        <span>Possible Causes & Contributing Factors</span>
      </h4>
      <ul className="space-y-1.5 text-sm text-neutral-700">
        {causes.map((cause, idx) => (
          <li key={idx} className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-2 shrink-0" aria-hidden="true" />
            <span className="leading-relaxed">{cause}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PossibleCauses;
