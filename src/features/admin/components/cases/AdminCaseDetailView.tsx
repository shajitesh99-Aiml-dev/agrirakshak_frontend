import React from 'react';
import { CropCase } from '../../../../types';
import Badge, { BadgeVariant } from '../../../../components/ui/Badge';
import {
  Sparkles,
  Stethoscope,
  User,
  Phone,
  MapPin,
  AlertOctagon,
  CheckCircle2,
  Clock,
  CalendarCheck,
  FileText,
  AlertTriangle,
} from 'lucide-react';
import { CaseTimeline } from '../../../officer/components/CaseTimeline';

interface AdminCaseDetailViewProps {
  cropCase: CropCase;
}

export const AdminCaseDetailView: React.FC<AdminCaseDetailViewProps> = ({ cropCase: c }) => {
  const getStatusBadge = (status: string): { variant: BadgeVariant; label: string; icon: React.ReactNode } => {
    switch (status) {
      case 'resolved':
        return { variant: 'success', label: 'Resolved & Closed', icon: <CheckCircle2 className="w-4 h-4" /> };
      case 'escalated':
        return { variant: 'error', label: 'Escalated Outbreak', icon: <AlertOctagon className="w-4 h-4" /> };
      case 'under_review':
        return { variant: 'info', label: 'Under Officer Review', icon: <Clock className="w-4 h-4" /> };
      case 'analyzing':
        return { variant: 'info', label: 'AI In Progress', icon: <Sparkles className="w-4 h-4" /> };
      case 'pending':
      default:
        return { variant: 'warning', label: 'Pending Officer Review', icon: <Clock className="w-4 h-4" /> };
    }
  };

  const statusBadge = getStatusBadge(c.status);

  return (
    <div className="space-y-6" aria-label={`Governance Audit: Case #${c.id}`}>
      {/* Governance Banner */}
      <section className="p-5 rounded-card bg-slate-900 text-white border border-slate-700 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-xs font-bold text-amber-300 bg-white/10 px-2 py-0.5 rounded border border-white/20">
              #{c.id}
            </span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
              Statewide Case Governance Audit
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
            {c.cropName} — {c.district}, {c.state}
          </h1>
          <p className="text-xs text-slate-400">
            Reported on {new Date(c.reportedAt).toLocaleString()} • Read-only administrative inspection view
          </p>
        </div>

        <div className="shrink-0 flex items-center gap-2">
          <Badge variant={statusBadge.variant} size="md" className="gap-1.5 font-bold uppercase text-xs">
            {statusBadge.icon}
            <span>{statusBadge.label}</span>
          </Badge>
        </div>
      </section>

      {/* Grid: 3 Clear Pillars of Truth */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pillar 1: Farmer & Field Submission */}
        <section className="p-5 rounded-card bg-white border border-neutral-200 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-neutral-150">
            <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-neutral-900">1. Original Farmer Report</h2>
              <p className="text-[11px] text-neutral-500">Submitted directly by farmer (Read-Only)</p>
            </div>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <span className="text-neutral-500 block">Farmer Identity:</span>
              <span className="font-bold text-neutral-900 text-sm">{c.farmerName || 'Not available'}</span>
              <span className="text-neutral-600 font-mono block flex items-center gap-1 mt-0.5">
                <Phone className="w-3 h-3 text-neutral-400" />
                <span>{c.farmerPhone || 'Not available'}</span>
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-neutral-100">
              <div>
                <span className="text-neutral-500 block">Location:</span>
                <span className="font-semibold text-neutral-800 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-neutral-400" />
                  <span>{c.village || 'Village'}, {c.district || 'District'}</span>
                </span>
              </div>
              <div>
                <span className="text-neutral-500 block">Cultivation Stage:</span>
                <span className="font-semibold text-neutral-800">{c.growthStage || 'Vegetative Stage'}</span>
              </div>
            </div>

            <div className="pt-2 border-t border-neutral-100 space-y-1">
              <span className="text-neutral-500 block">Reported Symptoms:</span>
              <div className="flex flex-wrap gap-1">
                {c.symptoms && c.symptoms.length > 0 ? (
                  c.symptoms.map((s) => (
                    <span key={s} className="px-2 py-0.5 rounded bg-neutral-100 text-neutral-700 text-[11px]">
                      {s}
                    </span>
                  ))
                ) : (
                  <span className="text-neutral-400 italic">No symptoms tagged</span>
                )}
              </div>
            </div>

            {c.description && (
              <div className="pt-2 border-t border-neutral-100 space-y-1">
                <span className="text-neutral-500 block">Farmer Narration:</span>
                <p className="text-neutral-700 leading-relaxed font-sans bg-neutral-50 p-2.5 rounded-lg border border-neutral-150">
                  {c.description}
                </p>
              </div>
            )}

            {/* Photos */}
            {c.imageUrls && c.imageUrls.length > 0 && (
              <div className="pt-2 border-t border-neutral-100 space-y-1.5">
                <span className="text-neutral-500 block">Submitted Evidence ({c.imageUrls.length} Photos):</span>
                <div className="grid grid-cols-2 gap-2">
                  {c.imageUrls.map((url, idx) => (
                    <a
                      key={idx}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-lg overflow-hidden border border-neutral-200 aspect-video block group relative"
                    >
                      <img
                        src={url}
                        alt={`Evidence ${idx + 1}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Pillar 2: AI Diagnostic Reference */}
        <section className="p-5 rounded-card bg-white border border-neutral-200 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-neutral-150">
            <div className="p-1.5 rounded-lg bg-purple-50 text-purple-700">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-neutral-900">2. AI Vision Reference</h2>
              <p className="text-[11px] text-neutral-500">Groq Vision Inferences (Decision Support Only)</p>
            </div>
          </div>

          {c.aiAnalysis ? (
            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-purple-50/60 border border-purple-200/80 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-purple-900">Detected Pathogen:</span>
                  <span className="font-mono text-purple-700 font-bold">
                    {c.aiAnalysis.prediction?.confidence
                      ? `${Math.round(c.aiAnalysis.prediction.confidence * 100)}% Confidence`
                      : 'Confidence N/A'}
                  </span>
                </div>
                <div className="text-sm font-bold text-neutral-900">
                  {c.aiAnalysis.prediction?.label || 'Pathogen identified'}
                </div>
                {c.aiAnalysis.prediction?.scientificName && (
                  <div className="italic text-neutral-500 text-[11px]">
                    {c.aiAnalysis.prediction.scientificName}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-lg bg-neutral-50 border border-neutral-200">
                  <span className="text-neutral-500 block text-[11px]">Severity Model:</span>
                  <span className="font-bold text-neutral-900 capitalize">
                    {c.aiAnalysis.severity || 'Unspecified'}
                  </span>
                </div>
                <div className="p-2.5 rounded-lg bg-neutral-50 border border-neutral-200">
                  <span className="text-neutral-500 block text-[11px]">Category:</span>
                  <span className="font-bold text-neutral-900 capitalize">
                    {c.aiAnalysis.prediction?.category || 'Disease'}
                  </span>
                </div>
              </div>

              {c.aiAnalysis.explanation && (
                <div className="space-y-1">
                  <span className="text-neutral-500 block">Computer Vision Rationale:</span>
                  <p className="text-neutral-700 leading-relaxed font-sans bg-neutral-50 p-2.5 rounded-lg border border-neutral-150">
                    {c.aiAnalysis.explanation}
                  </p>
                </div>
              )}

              {c.aiAnalysis.warnings && c.aiAnalysis.warnings.length > 0 && (
                <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-amber-950 space-y-1">
                  <span className="font-bold flex items-center gap-1 text-[11px]">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                    <span>Model Caution Flag</span>
                  </span>
                  <p className="text-[11px] leading-tight text-neutral-700">
                    {c.aiAnalysis.warnings[0]}
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="p-6 text-center text-xs text-neutral-500 bg-neutral-50 rounded-xl border border-neutral-200">
              No computer vision analysis completed for this case yet.
            </div>
          )}
        </section>

        {/* Pillar 3: Agricultural Officer Assessment */}
        <section className="p-5 rounded-card bg-white border border-neutral-200 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-neutral-150">
            <div className="p-1.5 rounded-lg bg-indigo-50 text-indigo-700">
              <Stethoscope className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-neutral-900">3. Officer Agronomic Review</h2>
              <p className="text-[11px] text-neutral-500">Official human professional determination</p>
            </div>
          </div>

          {c.officerReview ? (
            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-indigo-50/60 border border-indigo-200 space-y-1">
                <span className="text-[11px] text-indigo-800 font-semibold block">Clinical Assessment:</span>
                <p className="text-xs font-semibold text-neutral-900 leading-relaxed">
                  {c.officerReview.assessment}
                </p>
                <div className="pt-1 flex items-center justify-between text-[11px] text-neutral-500 border-t border-indigo-200/60">
                  <span>Reviewer: {c.officerReview.officerName || 'District Agronomist'}</span>
                  <span className="capitalize font-bold text-indigo-700">
                    Outcome: {c.officerReview.outcome.replace('_', ' ')}
                  </span>
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-neutral-500 block">Farmer Advisory Delivered:</span>
                <p className="text-neutral-700 leading-relaxed font-sans bg-neutral-50 p-2.5 rounded-lg border border-neutral-150">
                  {c.officerReview.advisory}
                </p>
              </div>

              {c.fieldVisit && (
                <div className="p-3 rounded-lg bg-neutral-50 border border-neutral-200 space-y-1">
                  <span className="font-bold text-neutral-900 flex items-center gap-1.5">
                    <CalendarCheck className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Field Inspection Logged</span>
                  </span>
                  <div className="text-[11px] text-neutral-600">
                    Date: <strong>{c.fieldVisit.scheduledDate || 'TBD'}</strong> at {c.fieldVisit.preferredTime || '10:00 AM'}
                  </div>
                  {c.fieldVisit.officerNotes && (
                    <div className="text-[11px] text-neutral-500 italic mt-0.5">
                      Notes: &quot;{c.fieldVisit.officerNotes}&quot;
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="p-6 text-center text-xs text-neutral-500 bg-neutral-50 rounded-xl border border-neutral-200">
              No agricultural officer assessment submitted yet. Case is currently in triage queue.
            </div>
          )}
        </section>
      </div>

      {/* Case Timeline Audit Trail */}
      <section className="p-5 rounded-card bg-white border border-neutral-200 shadow-2xs space-y-3">
        <h2 className="text-base font-bold text-neutral-900 flex items-center gap-2">
          <FileText className="w-4 h-4 text-primary" />
          <span>Complete Event Audit Trail</span>
        </h2>
        <CaseTimeline timeline={c.timeline || []} />
      </section>
    </div>
  );
};

export default AdminCaseDetailView;
