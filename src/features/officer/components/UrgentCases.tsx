import React from 'react';
import { OfficerCase } from '../types/officerTypes';
import { Link } from 'react-router-dom';
import { AlertTriangle, ArrowRight, ShieldAlert, Sparkles, MapPin } from 'lucide-react';
import Badge from '../../../components/ui/Badge';
import Button from '../../../components/ui/Button';

interface UrgentCasesProps {
  cases: OfficerCase[];
}

export const UrgentCases: React.FC<UrgentCasesProps> = ({ cases }) => {
  if (!cases || cases.length === 0) {
    return null;
  }

  return (
    <section
      aria-label="High-Priority & Escalated Cases"
      className="p-5 sm:p-6 rounded-card bg-rose-50/60 border-2 border-rose-300/80 shadow-xs space-y-4"
    >
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-rose-200/80 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center text-rose-700 shrink-0">
            <AlertTriangle className="w-4 h-4" aria-hidden="true" />
          </div>
          <div>
            <h2 className="text-base font-bold text-rose-950 tracking-tight">
              Urgent &amp; High-Priority Attention Queue
            </h2>
            <p className="text-xs text-rose-800 font-sans">
              Severe pest/pathogen thresholds or viral epidemic transmission vectors requiring immediate agronomist triage.
            </p>
          </div>
        </div>

        <span className="text-xs font-bold text-rose-800 bg-rose-100 px-2.5 py-1 rounded-full border border-rose-200">
          {cases.length} Urgent Case{cases.length !== 1 ? 's' : ''}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {cases.slice(0, 4).map((c) => (
          <div
            key={c.id}
            className="p-4 rounded-lg bg-white border border-rose-200/90 shadow-2xs hover:border-rose-400 hover:shadow-xs transition-all flex flex-col justify-between gap-3"
          >
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-neutral-100 text-neutral-800">
                  #{c.id}
                </span>
                <Badge variant="error" size="sm" className="gap-1 font-semibold text-xs">
                  <ShieldAlert className="w-3 h-3" />
                  <span>HIGH PRIORITY</span>
                </Badge>
              </div>

              <h3 className="text-sm font-bold text-neutral-900 line-clamp-1">
                {c.cropName} — {c.farmerName || 'Farmer Submission'}
              </h3>

              {c.aiAnalysis?.prediction && (
                <div className="flex items-center gap-1.5 text-xs text-emerald-800 bg-emerald-50 px-2 py-1 rounded">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span className="truncate font-medium">
                    AI: {c.aiAnalysis.prediction.label} ({Math.round((c.aiAnalysis.prediction.confidence ?? 0) * 100)}%)
                  </span>
                </div>
              )}

              <p className="text-xs text-neutral-600 line-clamp-2 font-sans leading-relaxed">
                {c.description || 'Farmer reported urgent foliar symptoms.'}
              </p>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-neutral-100 text-xs text-neutral-500">
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-neutral-400" />
                <span>{c.village || 'Field'}, {c.district || ''}</span>
              </span>

              <Link to={`/officer/cases/${encodeURIComponent(c.id)}`}>
                <Button
                  variant="primary"
                  size="sm"
                  className="gap-1 text-xs py-1 px-3 min-h-[36px] bg-rose-700 hover:bg-rose-800"
                >
                  <span>Triage Now</span>
                  <ArrowRight className="w-3 h-3" />
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default UrgentCases;
