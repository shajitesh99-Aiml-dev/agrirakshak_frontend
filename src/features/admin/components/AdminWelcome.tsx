import React from 'react';
import { useAuth } from '../../auth';
import { ShieldCheck, Activity, Globe2, Clock } from 'lucide-react';
import { AnalyticsTimeRange } from '../../../types/analytics';

interface AdminWelcomeProps {
  timeRange: AnalyticsTimeRange;
  onRangeChange: (range: AnalyticsTimeRange) => void;
}

export const AdminWelcome: React.FC<AdminWelcomeProps> = ({
  timeRange,
  onRangeChange,
}) => {
  const { user } = useAuth();
  const adminName = user?.name || 'Administrator';

  const timeRangeOptions: Array<{ value: AnalyticsTimeRange; label: string }> = [
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' },
    { value: '90d', label: 'Last 90 Days' },
    { value: '6m', label: 'Last 6 Months' },
    { value: '1y', label: 'Last 1 Year' },
  ];

  return (
    <section
      aria-label="Admin Console Welcome and Range Control"
      className="relative overflow-hidden rounded-card bg-gradient-to-br from-[#1C2833] via-[#2C3E50] to-[#34495E] text-white p-6 sm:p-7 shadow-card border border-slate-700/60"
    >
      <div className="absolute top-0 right-0 -mr-12 -mt-12 w-52 h-52 rounded-full bg-white/5 pointer-events-none" />
      <div className="absolute bottom-0 right-48 -mb-16 w-36 h-36 rounded-full bg-amber-500/10 pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-xs text-xs font-semibold text-amber-300 border border-white/20">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" aria-hidden="true" />
              <span>National Governance Tier</span>
            </span>
            <span className="inline-flex items-center gap-1 text-xs text-white/80 bg-black/25 px-2.5 py-1 rounded-full">
              <Globe2 className="w-3 h-3 text-cyan-400" aria-hidden="true" />
              <span>Multi-State Surveillance</span>
            </span>
            <span className="inline-flex items-center gap-1 text-xs text-emerald-300 bg-emerald-950/60 border border-emerald-500/30 px-2.5 py-1 rounded-full">
              <Activity className="w-3 h-3 text-emerald-400" aria-hidden="true" />
              <span>Telemetry Active</span>
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Administrative Command Deck — {adminName}
          </h1>

          <p className="text-sm text-white/90 leading-relaxed font-sans max-w-xl">
            Central governance console for SIH26131. Supervise statewide crop disease outbreaks, review pathogen hotspots, audit officer triages, and coordinate agricultural mitigation resources.
          </p>
        </div>

        {/* Range Selector */}
        <div className="shrink-0 flex flex-col items-start lg:items-end gap-2 bg-black/20 p-3 rounded-xl border border-white/10">
          <label htmlFor="time-range-select" className="text-xs text-white/70 flex items-center gap-1.5 font-medium">
            <Clock className="w-3.5 h-3.5 text-amber-400" aria-hidden="true" />
            <span>Surveillance Window:</span>
          </label>
          <div className="flex flex-wrap gap-1">
            {timeRangeOptions.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => onRangeChange(opt.value)}
                className={`px-2.5 py-1 text-xs rounded-md font-semibold transition-all ${
                  timeRange === opt.value
                    ? 'bg-amber-500 text-slate-950 shadow-xs'
                    : 'bg-white/10 text-white/80 hover:bg-white/20 hover:text-white'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminWelcome;
