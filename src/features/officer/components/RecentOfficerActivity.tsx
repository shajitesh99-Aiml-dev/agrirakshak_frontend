import React from 'react';
import { CaseTimelineEvent } from '../types/officerTypes';
import { Activity, Clock, CheckCircle2, AlertOctagon, Calendar, Sparkles } from 'lucide-react';

interface RecentOfficerActivityProps {
  activity: CaseTimelineEvent[];
}

export const RecentOfficerActivity: React.FC<RecentOfficerActivityProps> = ({ activity }) => {
  if (!activity || activity.length === 0) {
    return null;
  }

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'resolved':
        return <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />;
      case 'escalated':
        return <AlertOctagon className="w-3.5 h-3.5 text-red-600" />;
      case 'field_visit_scheduled':
        return <Calendar className="w-3.5 h-3.5 text-indigo-600" />;
      case 'ai_analysis':
        return <Sparkles className="w-3.5 h-3.5 text-primary" />;
      case 'review_submitted':
      case 'review_started':
      default:
        return <Clock className="w-3.5 h-3.5 text-neutral-500" />;
    }
  };

  return (
    <section
      aria-label="Recent Operational Activity Stream"
      className="p-5 sm:p-6 rounded-card bg-white border border-neutral-200 shadow-xs space-y-4"
    >
      <div className="flex items-center gap-2 border-b border-neutral-100 pb-3">
        <Activity className="w-4 h-4 text-primary" aria-hidden="true" />
        <h2 className="text-base font-bold text-neutral-900 tracking-tight">
          Recent Agronomy &amp; Triage Activity
        </h2>
      </div>

      <div className="space-y-3">
        {activity.slice(0, 6).map((item) => (
          <div key={item.id} className="flex items-start gap-3 text-xs">
            <div className="w-6 h-6 rounded-full bg-neutral-100 flex items-center justify-center shrink-0 mt-0.5 border border-neutral-200/60">
              {getEventIcon(item.type)}
            </div>
            <div className="min-w-0 flex-1 space-y-0.5">
              <div className="flex items-center justify-between gap-2">
                <span className="font-bold text-neutral-900 truncate">{item.title}</span>
                <span className="text-[11px] text-neutral-400 shrink-0">
                  {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              <p className="text-neutral-600 line-clamp-1 font-sans">{item.description}</p>
              <span className="text-[11px] text-neutral-400 block">By {item.actor}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecentOfficerActivity;
