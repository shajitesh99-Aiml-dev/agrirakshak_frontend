import React from 'react';
import { OutbreakAlert } from '../../../../types/analytics';
import { Flame, AlertOctagon, TrendingUp, CheckCircle2 } from 'lucide-react';
import Badge from '../../../../components/ui/Badge';
import Button from '../../../../components/ui/Button';

interface OutbreakAlertCardProps {
  alert: OutbreakAlert;
  onAcknowledge?: (id: string) => void;
}

export const OutbreakAlertCard: React.FC<OutbreakAlertCardProps> = ({
  alert,
  onAcknowledge,
}) => {
  const getSeverityBadge = (sev: string) => {
    switch (sev) {
      case 'critical':
        return <Badge variant="error" size="sm">CRITICAL SURGE</Badge>;
      case 'high':
        return <Badge variant="warning" size="sm">HIGH RISK</Badge>;
      case 'moderate':
      default:
        return <Badge variant="info" size="sm">MODERATE ALERT</Badge>;
    }
  };

  return (
    <article
      aria-label={`Outbreak Alert: ${alert.title}`}
      className="p-4 sm:p-5 rounded-card bg-white border border-rose-200/90 shadow-2xs hover:border-rose-400 transition-all space-y-3 relative overflow-hidden"
    >
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="p-1 rounded bg-rose-100 text-rose-700">
            <Flame className="w-4 h-4" />
          </span>
          <span className="font-mono text-xs font-bold text-neutral-500 bg-neutral-100 px-2 py-0.5 rounded">
            #{alert.id}
          </span>
          {getSeverityBadge(alert.severity)}
        </div>

        <div className="flex items-center gap-1.5 text-xs font-semibold text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded-full">
          <TrendingUp className="w-3.5 h-3.5" />
          <span className="capitalize">Trend: {alert.trend}</span>
        </div>
      </div>

      <div>
        <h3 className="font-bold text-base text-neutral-900 line-clamp-1">
          {alert.title}
        </h3>
        <p className="text-xs text-neutral-500 mt-0.5">
          Surveillance Region: <strong className="text-neutral-700">{alert.affectedRegion}</strong>
        </p>
      </div>

      <div className="p-3 rounded-lg bg-neutral-50 border border-neutral-150 space-y-1 text-xs">
        <div className="flex items-center justify-between">
          <span className="text-neutral-600">Dominant Pathogen / Pest:</span>
          <span className="font-bold text-neutral-900">{alert.dominantIssue}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-neutral-600">Active Cases Involved:</span>
          <span className="font-bold text-rose-600 font-mono">{alert.caseCount} Cases</span>
        </div>
        <div className="flex items-center justify-between text-neutral-400 text-[11px] pt-1 border-t border-neutral-200/60 font-sans">
          <span>Detected At:</span>
          <span>{new Date(alert.detectedAt).toLocaleString()}</span>
        </div>
      </div>

      <div className="p-3 rounded-lg bg-amber-50/70 border border-amber-200/80 text-xs text-amber-950 space-y-1">
        <div className="font-bold flex items-center gap-1 text-amber-900">
          <AlertOctagon className="w-3.5 h-3.5 text-amber-600" />
          <span>Recommended Administrative Action:</span>
        </div>
        <p className="text-neutral-700 font-sans leading-relaxed">
          {alert.recommendedAction}
        </p>
      </div>

      {onAcknowledge && (
        <div className="pt-2 border-t border-neutral-100 flex items-center justify-end">
          {alert.acknowledged ? (
            <span className="text-xs font-semibold text-emerald-700 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Acknowledged by Directorate</span>
            </span>
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onAcknowledge(alert.id)}
              className="text-xs py-1"
            >
              Acknowledge Directive
            </Button>
          )}
        </div>
      )}
    </article>
  );
};

export default OutbreakAlertCard;
