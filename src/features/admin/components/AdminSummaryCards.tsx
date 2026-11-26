import React from 'react';
import {
  ClipboardList,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  MapPin,
  Flame,
  TrendingUp,
} from 'lucide-react';
import { AdminSummaryMetrics } from '../../../types/analytics';

interface AdminSummaryCardsProps {
  summary: AdminSummaryMetrics;
}

export const AdminSummaryCards: React.FC<AdminSummaryCardsProps> = ({ summary }) => {
  const cards = [
    {
      title: 'Total Cases Filed',
      value: summary.totalCases,
      change: '+14% vs last cycle',
      icon: <ClipboardList className="w-5 h-5 text-indigo-600" />,
      bg: 'bg-indigo-50 border-indigo-100',
      text: 'text-indigo-950',
    },
    {
      title: 'Active Triage Queue',
      value: summary.activeCases,
      change: 'Requiring officer review',
      icon: <Clock className="w-5 h-5 text-blue-600" />,
      bg: 'bg-blue-50 border-blue-100',
      text: 'text-blue-950',
    },
    {
      title: 'Escalated Outbreaks',
      value: summary.escalatedCases,
      change: 'Priority field intervention',
      icon: <AlertTriangle className="w-5 h-5 text-rose-600" />,
      bg: 'bg-rose-50 border-rose-100',
      text: 'text-rose-950',
    },
    {
      title: 'Resolved & Closed',
      value: summary.resolvedCases,
      change: 'Advisories delivered',
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-600" />,
      bg: 'bg-emerald-50 border-emerald-100',
      text: 'text-emerald-950',
    },
    {
      title: 'AI Analyses Ready',
      value: summary.aiAnalysesCompleted,
      change: 'Computer vision screened',
      icon: <Sparkles className="w-5 h-5 text-purple-600" />,
      bg: 'bg-purple-50 border-purple-100',
      text: 'text-purple-950',
    },
    {
      title: 'Affected Districts',
      value: summary.affectedDistrictsCount,
      change: 'Geographic spread',
      icon: <MapPin className="w-5 h-5 text-teal-600" />,
      bg: 'bg-teal-50 border-teal-100',
      text: 'text-teal-950',
    },
    {
      title: 'Outbreak Alerts',
      value: summary.activeOutbreakAlertsCount,
      change: 'Algorithmic surge flags',
      icon: <Flame className="w-5 h-5 text-amber-600" />,
      bg: 'bg-amber-50 border-amber-100',
      text: 'text-amber-950',
    },
    {
      title: 'Weekly Submissions',
      value: summary.casesThisWeek,
      change: 'New intake velocity',
      icon: <TrendingUp className="w-5 h-5 text-cyan-600" />,
      bg: 'bg-cyan-50 border-cyan-100',
      text: 'text-cyan-950',
    },
  ];

  return (
    <section aria-label="Administrative Executive Summary">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {cards.map((c) => (
          <div
            key={c.title}
            className="p-4 rounded-md border-2 border-[#172117] bg-white shadow-neo hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-neo-sm transition-all"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-black text-[#172117] truncate">{c.title}</span>
              <div className="p-1.5 rounded-md bg-[#FAFDF9] border border-[#172117] shadow-[1px_1px_0px_#172117] shrink-0">{c.icon}</div>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-[#172117] font-mono tracking-tight">
              {c.value}
            </div>
            <p className="text-[11px] text-[#496274] mt-1 font-medium truncate">{c.change}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AdminSummaryCards;
