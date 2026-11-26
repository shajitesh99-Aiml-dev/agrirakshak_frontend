import React from 'react';
import { Eye } from 'lucide-react';

interface ObservedSymptomsProps {
  symptoms?: string[];
  className?: string;
}

export const ObservedSymptoms: React.FC<ObservedSymptomsProps> = ({
  symptoms,
  className = '',
}) => {
  if (!symptoms || symptoms.length === 0) {
    return null;
  }

  return (
    <div className={`p-4 rounded-card bg-neutral-50 border border-neutral-200/80 ${className}`}>
      <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-800 flex items-center gap-1.5 mb-2.5">
        <Eye className="w-3.5 h-3.5 text-primary" aria-hidden="true" />
        <span>What We Observed</span>
      </h4>
      <ul className="space-y-1.5 text-sm text-neutral-700">
        {symptoms.map((symptom, idx) => (
          <li key={idx} className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" aria-hidden="true" />
            <span className="leading-relaxed">{symptom}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ObservedSymptoms;
