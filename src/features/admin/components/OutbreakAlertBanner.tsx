import React from 'react';
import { Flame, ArrowRight, ShieldCheck, AlertOctagon, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { OutbreakAlert } from '../../../types/analytics';
import { ROUTES } from '../../../routes/routeConfig';
import Badge from '../../../components/ui/Badge';
import Button from '../../../components/ui/Button';

interface OutbreakAlertBannerProps {
  alerts: OutbreakAlert[];
}

export const OutbreakAlertBanner: React.FC<OutbreakAlertBannerProps> = ({ alerts }) => {
  if (!alerts || alerts.length === 0) {
    return (
      <div className="p-4 rounded-card bg-emerald-50 border border-emerald-200 text-emerald-950 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-full bg-emerald-100 text-emerald-700">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-sm">No Active Outbreak Alerts</h3>
            <p className="text-xs text-emerald-800">
              All monitored regional crop clusters are operating within baseline variance thresholds.
            </p>
          </div>
        </div>
        <Link to={ROUTES.ADMIN_HOTSPOTS}>
          <Button variant="outline" size="sm" className="text-xs border-emerald-300 text-emerald-800 hover:bg-emerald-100">
            View Surveillance
          </Button>
        </Link>
      </div>
    );
  }

  const primaryAlert = alerts[0];

  return (
    <div
      aria-live="polite"
      className="p-4 sm:p-5 rounded-card bg-gradient-to-r from-rose-900 via-rose-800 to-amber-900 text-white shadow-card border border-rose-700/60 relative overflow-hidden"
    >
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1.5 max-w-2xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-500/30 text-rose-200 border border-rose-400/40 text-xs font-bold uppercase tracking-wide">
              <Flame className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
              <span>Active Outbreak Alert ({alerts.length} Total)</span>
            </span>

            <Badge
              variant={primaryAlert.severity === 'critical' ? 'error' : 'warning'}
              size="sm"
              className="gap-1 font-bold text-xs"
            >
              <AlertOctagon className="w-3 h-3" />
              <span className="uppercase">{primaryAlert.severity} Severity</span>
            </Badge>

            <span className="inline-flex items-center gap-1 text-xs text-rose-200/90 font-mono">
              <TrendingUp className="w-3 h-3 text-amber-400" />
              <span>Trend: {primaryAlert.trend}</span>
            </span>
          </div>

          <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
            {primaryAlert.title} — {primaryAlert.affectedRegion}
          </h2>

          <p className="text-xs sm:text-sm text-rose-100/90 font-sans leading-relaxed">
            <strong className="text-amber-300">Dominant Pathogen/Pest:</strong> {primaryAlert.dominantIssue} ({primaryAlert.caseCount} cluster cases).{' '}
            <strong className="text-white">Directive:</strong> {primaryAlert.recommendedAction}
          </p>
        </div>

        <div className="shrink-0 flex items-center gap-2">
          <Link to={ROUTES.ADMIN_HOTSPOTS}>
            <Button
              variant="primary"
              size="sm"
              className="gap-1.5 bg-amber-500 text-slate-950 font-bold hover:bg-amber-400 shadow-md min-h-[38px]"
            >
              <span>Hotspot Surveillance</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OutbreakAlertBanner;
