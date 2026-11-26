import React from 'react';
import { OfficerCase } from '../types/officerTypes';
import { Link } from 'react-router-dom';
import { ClipboardList, ArrowRight, Clock, Sparkles, MapPin, ChevronRight } from 'lucide-react';
import Badge from '../../../components/ui/Badge';
import Button from '../../../components/ui/Button';
import { ROUTES } from '../../../routes/routeConfig';

interface PendingCaseQueueProps {
  cases: OfficerCase[];
}

export const PendingCaseQueue: React.FC<PendingCaseQueueProps> = ({ cases }) => {
  return (
    <section
      aria-label="Pending Triage Queue Preview"
      className="p-5 sm:p-6 rounded-card bg-white border border-neutral-200 shadow-xs space-y-4"
    >
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-100 pb-3">
        <div className="flex items-center gap-2">
          <ClipboardList className="w-5 h-5 text-primary" aria-hidden="true" />
          <h2 className="text-base sm:text-lg font-bold text-neutral-900 tracking-tight">
            Incoming Cases Awaiting Officer Triage
          </h2>
        </div>

        <Link
          to={ROUTES.OFFICER_CASES}
          className="text-xs font-semibold text-primary hover:text-primary-dark transition-colors inline-flex items-center gap-1 focus-visible:outline-2 focus-visible:outline-primary rounded p-1"
        >
          <span>Open Full Queue ({cases.length})</span>
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      {cases.length > 0 ? (
        <div className="space-y-3">
          {cases.slice(0, 5).map((c) => (
            <div
              key={c.id}
              className="p-3.5 rounded-lg border border-neutral-200/90 hover:border-primary/50 hover:bg-neutral-50/50 transition-all flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 group"
            >
              <div className="space-y-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-xs font-bold text-neutral-700 bg-neutral-100 px-2 py-0.5 rounded">
                    #{c.id}
                  </span>
                  <Badge variant={c.status === 'under_review' ? 'info' : 'warning'} size="sm" className="text-xs">
                    <Clock className="w-3 h-3" />
                    <span>{c.status === 'under_review' ? 'Under Review' : 'Pending'}</span>
                  </Badge>
                  {c.aiAnalysis?.prediction && (
                    <span className="inline-flex items-center gap-1 text-xs text-primary font-medium bg-primary/10 px-2 py-0.5 rounded-full truncate">
                      <Sparkles className="w-3 h-3 shrink-0" />
                      <span>{c.aiAnalysis.prediction.label}</span>
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-neutral-900 group-hover:text-primary transition-colors truncate">
                    {c.cropName} — {c.farmerName || 'Farmer'}
                  </h3>
                </div>

                <p className="text-xs text-neutral-500 flex items-center gap-2 font-sans truncate">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-neutral-400 shrink-0" />
                    <span>{c.village || 'Field'}, {c.district || ''}</span>
                  </span>
                  <span>•</span>
                  <span>Reported {new Date(c.reportedAt).toLocaleDateString()}</span>
                </p>
              </div>

              <div className="shrink-0 flex items-center justify-end">
                <Link to={`/officer/cases/${encodeURIComponent(c.id)}`}>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-1.5 text-xs font-semibold group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all min-h-[38px]"
                  >
                    <span>Inspect</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-8 text-center bg-neutral-50 rounded-lg border border-dashed border-neutral-200 text-neutral-500 text-sm">
          No pending cases currently in your queue. All assigned cases have been reviewed.
        </div>
      )}
    </section>
  );
};

export default PendingCaseQueue;
