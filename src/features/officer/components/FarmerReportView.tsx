import React from 'react';
import { OfficerCase } from '../types/officerTypes';
import { FileText, Sprout, Calendar, AlertCircle } from 'lucide-react';

interface FarmerReportViewProps {
  cropCase: OfficerCase;
}

export const FarmerReportView: React.FC<FarmerReportViewProps> = ({ cropCase: c }) => {
  return (
    <div className="p-5 rounded-card bg-white border border-neutral-200 shadow-2xs space-y-4">
      <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-primary" aria-hidden="true" />
          <h3 className="text-sm font-bold text-neutral-900 tracking-tight">
            Original Farmer Report (Read-Only)
          </h3>
        </div>
        <span className="text-[11px] font-semibold text-neutral-500 bg-neutral-100 px-2.5 py-0.5 rounded-full">
          Submission Record
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
        <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-150">
          <span className="text-neutral-500 flex items-center gap-1">
            <Sprout className="w-3.5 h-3.5 text-primary" />
            <span>Crop Cultivar</span>
          </span>
          <span className="font-bold text-neutral-900 text-sm mt-1 block">
            {c.cropName}
          </span>
        </div>

        <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-150">
          <span className="text-neutral-500 flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-neutral-400" />
            <span>Growth Stage</span>
          </span>
          <span className="font-bold text-neutral-900 text-sm mt-1 block">
            {c.growthStage || c.cultivationStage || 'Vegetative Stage'}
          </span>
        </div>

        <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-150">
          <span className="text-neutral-500 flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5 text-amber-500" />
            <span>Farmer Perceived Severity</span>
          </span>
          <span className="font-bold text-neutral-900 text-sm mt-1 block uppercase">
            {c.severity || 'Moderate'}
          </span>
        </div>
      </div>

      {/* Reported Symptoms */}
      <div className="space-y-1.5 pt-1">
        <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-700">
          Reported Symptoms
        </h4>
        {c.symptoms && c.symptoms.length > 0 ? (
          <div className="flex flex-wrap gap-1.5">
            {c.symptoms.map((s, idx) => (
              <span
                key={idx}
                className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-primary-50 text-primary-dark border border-primary/20"
              >
                {s}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-xs text-neutral-400 italic">No specific symptoms selected.</p>
        )}
      </div>

      {/* Farmer Description */}
      {c.description && (
        <div className="space-y-1 pt-1">
          <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-700">
            Farmer Narration &amp; Field Notes
          </h4>
          <p className="p-3.5 bg-neutral-50 rounded-lg border border-neutral-150 text-xs text-neutral-800 leading-relaxed font-sans">
            {c.description}
          </p>
        </div>
      )}
    </div>
  );
};

export default FarmerReportView;
