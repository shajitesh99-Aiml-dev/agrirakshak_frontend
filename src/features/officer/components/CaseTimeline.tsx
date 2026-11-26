import React from 'react';
import { CaseTimelineEvent } from '../types/officerTypes';
import {
  History,
  FilePlus,
  Sparkles,
  ClipboardList,
  CheckCircle2,
  AlertOctagon,
  CalendarCheck,
  RefreshCw,
} from 'lucide-react';

interface CaseTimelineProps {
  timeline?: CaseTimelineEvent[];
}

export const CaseTimeline: React.FC<CaseTimelineProps> = ({ timeline = [] }) => {
  if (!timeline || timeline.length === 0) {
    return (
      <div className="p-5 rounded-card bg-white border border-neutral-200 shadow-2xs space-y-2 text-xs text-neutral-500">
        <div className="flex items-center gap-2">
          <History className="w-4 h-4 text-neutral-400" />
          <h3 className="font-bold text-neutral-700">Audit &amp; Case History Timeline</h3>
        </div>
        <p>No timeline events recorded yet for this case.</p>
      </div>
    );
  }

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'case_created':
        return <FilePlus className="w-3.5 h-3.5 text-neutral-700" />;
      case 'ai_analysis':
        return <Sparkles className="w-3.5 h-3.5 text-primary" />;
      case 'review_started':
        return <ClipboardList className="w-3.5 h-3.5 text-blue-600" />;
      case 'review_submitted':
        return <ClipboardList className="w-3.5 h-3.5 text-emerald-600" />;
      case 'field_visit_scheduled':
        return <CalendarCheck className="w-3.5 h-3.5 text-indigo-600" />;
      case 'resolved':
        return <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />;
      case 'escalated':
        return <AlertOctagon className="w-3.5 h-3.5 text-red-600" />;
      default:
        return <RefreshCw className="w-3.5 h-3.5 text-neutral-500" />;
    }
  };

  return (
    <section
      aria-label="Case Event Chronology"
      className="p-5 sm:p-6 rounded-card bg-white border border-neutral-200 shadow-2xs space-y-4"
    >
      <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
        <div className="flex items-center gap-2">
          <History className="w-4 h-4 text-primary" aria-hidden="true" />
          <h3 className="text-sm font-bold text-neutral-900 tracking-tight">
            Case Lifecycle History &amp; Audit Trail ({timeline.length})
          </h3>
        </div>
        <span className="text-[11px] text-neutral-400 font-mono">
          Immutable Triage Log
        </span>
      </div>

      <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-neutral-200">
        {timeline.map((evt) => (
          <div key={evt.id} className="relative text-xs space-y-1">
            {/* Dot marker */}
            <div className="absolute -left-6 top-0.5 w-5 h-5 rounded-full bg-white border-2 border-primary flex items-center justify-center shadow-2xs">
              {getEventIcon(evt.type)}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-1">
              <span className="font-bold text-neutral-900 text-sm">{evt.title}</span>
              <span className="text-[11px] text-neutral-400 font-sans">
                {new Date(evt.timestamp).toLocaleString('en-IN', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </span>
            </div>

            <p className="text-neutral-700 font-sans leading-relaxed">{evt.description}</p>
            <span className="text-[11px] font-semibold text-primary/90 block">
              Logged by: {evt.actor}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CaseTimeline;
