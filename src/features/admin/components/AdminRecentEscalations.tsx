import React from 'react';
import { AlertOctagon, ArrowRight, MapPin, Sparkles, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CropCase } from '../../../types';
import { ROUTES } from '../../../routes/routeConfig';
import Badge from '../../../components/ui/Badge';

interface AdminRecentEscalationsProps {
  cases: CropCase[];
}

export const AdminRecentEscalations: React.FC<AdminRecentEscalationsProps> = ({ cases }) => {
  if (!cases || cases.length === 0) {
    return (
      <div className="p-6 rounded-card bg-white border border-neutral-200 text-center text-sm text-neutral-500">
        No active escalated cases requiring administrative intervention.
      </div>
    );
  }

  return (
    <section
      aria-label="Recent Case Escalations"
      className="p-5 rounded-card bg-white border border-neutral-200 shadow-2xs space-y-4"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-rose-50 text-rose-600">
            <AlertOctagon className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-neutral-900">Recent Outbreak Escalations</h2>
            <p className="text-xs text-neutral-500">Cases flagged by field officers for state review</p>
          </div>
        </div>

        <Link
          to={`${ROUTES.ADMIN_CASES}?status=escalated`}
          className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
        >
          <span>View All Escalations</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="divide-y divide-neutral-100">
        {cases.slice(0, 5).map((c) => (
          <div key={c.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-neutral-800 bg-neutral-100 px-2 py-0.5 rounded">
                  #{c.id}
                </span>
                <span className="font-bold text-sm text-neutral-900">{c.cropName}</span>
                <Badge variant="error" size="sm" className="text-[11px] font-bold">
                  ESCALATED
                </Badge>
              </div>

              <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-500">
                <span className="flex items-center gap-1">
                  <User className="w-3 h-3 text-neutral-400" />
                  <span>{c.farmerName || 'Farmer Submission'}</span>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-neutral-400" />
                  <span>{c.village || 'Field'}, {c.district || 'District'}</span>
                </span>
                {c.aiAnalysis?.prediction && (
                  <>
                    <span>•</span>
                    <span className="flex items-center gap-1 text-emerald-700 font-medium">
                      <Sparkles className="w-3 h-3 text-emerald-600" />
                      <span>{c.aiAnalysis.prediction.label}</span>
                    </span>
                  </>
                )}
              </div>
            </div>

            <Link
              to={`/admin/cases/${encodeURIComponent(c.id)}`}
              className="self-start sm:self-center shrink-0 px-3 py-1.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-xs font-semibold text-neutral-800 transition-colors"
            >
              Audit Case
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AdminRecentEscalations;
