import React from 'react';
import { OfficerDashboardSummary } from '../types/officerTypes';
import {
  ClipboardList,
  Clock,
  Sparkles,
  AlertOctagon,
  CheckCircle2,
  CalendarCheck,
} from 'lucide-react';
import Card from '../../../components/ui/Card';

interface OfficerSummaryCardsProps {
  summary: OfficerDashboardSummary;
  onFilterSelect?: (status: string) => void;
}

export const OfficerSummaryCards: React.FC<OfficerSummaryCardsProps> = ({
  summary,
  onFilterSelect,
}) => {
  const cards = [
    {
      id: 'pending',
      title: 'Pending Triage',
      count: summary.pendingReview,
      subtitle: 'Awaiting agronomist review',
      icon: <Clock className="w-5 h-5 text-amber-600" aria-hidden="true" />,
      bg: 'bg-amber-50/70',
      border: 'border-amber-200/80',
      text: 'text-amber-950',
      badgeBg: 'bg-amber-100 text-amber-800',
    },
    {
      id: 'under_review',
      title: 'Under Review',
      count: summary.underReview,
      subtitle: 'Currently being assessed',
      icon: <ClipboardList className="w-5 h-5 text-blue-600" aria-hidden="true" />,
      bg: 'bg-blue-50/70',
      border: 'border-blue-200/80',
      text: 'text-blue-950',
      badgeBg: 'bg-blue-100 text-blue-800',
    },
    {
      id: 'aiAwaitingReview',
      title: 'AI Inferences Ready',
      count: summary.aiAwaitingReview,
      subtitle: 'Groq vision output available',
      icon: <Sparkles className="w-5 h-5 text-primary" aria-hidden="true" />,
      bg: 'bg-emerald-50/70',
      border: 'border-emerald-200/80',
      text: 'text-emerald-950',
      badgeBg: 'bg-emerald-100 text-emerald-800',
    },
    {
      id: 'escalated',
      title: 'Escalated Cases',
      count: summary.escalatedCases,
      subtitle: 'High viral / pest threshold',
      icon: <AlertOctagon className="w-5 h-5 text-red-600" aria-hidden="true" />,
      bg: 'bg-red-50/70',
      border: 'border-red-200/80',
      text: 'text-red-950',
      badgeBg: 'bg-red-100 text-red-800',
    },
    {
      id: 'resolved',
      title: 'Resolved Cases',
      count: summary.resolvedCases,
      subtitle: 'Advisory successfully issued',
      icon: <CheckCircle2 className="w-5 h-5 text-teal-600" aria-hidden="true" />,
      bg: 'bg-teal-50/70',
      border: 'border-teal-200/80',
      text: 'text-teal-950',
      badgeBg: 'bg-teal-100 text-teal-800',
    },
    {
      id: 'fieldVisits',
      title: 'Field Visits',
      count: summary.scheduledFieldVisits,
      subtitle: 'On-site farm inspections',
      icon: <CalendarCheck className="w-5 h-5 text-indigo-600" aria-hidden="true" />,
      bg: 'bg-indigo-50/70',
      border: 'border-indigo-200/80',
      text: 'text-indigo-950',
      badgeBg: 'bg-indigo-100 text-indigo-800',
    },
  ];

  return (
    <section aria-label="Officer Triage Summary Statistics">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {cards.map((card) => (
          <Card
            key={card.id}
            padding="sm"
            className="bg-white border-2 border-[#172117] shadow-neo rounded-md transition-all cursor-pointer"
            onClick={() => onFilterSelect && onFilterSelect(card.id)}
            role="button"
            tabIndex={0}
            aria-label={`${card.title}: ${card.count} cases`}
          >
            <div className="flex items-center justify-between gap-1 mb-2">
              <span className="p-1.5 rounded-md bg-[#FAFDF9] border border-[#172117] shadow-[1px_1px_0px_#172117]">
                {card.icon}
              </span>
              <span className="text-[10px] font-black px-1.5 py-0.5 rounded-[4px] border border-[#172117] shadow-[1px_1px_0px_#172117] bg-[#E8F5E9] text-[#1B5E20]">
                Active
              </span>
            </div>

            <div className="space-y-0.5">
              <span className="text-2xl sm:text-3xl font-black text-[#172117] block tracking-tight">
                {card.count}
              </span>
              <span className="text-xs font-black text-[#172117] block truncate">
                {card.title}
              </span>
              <span className="text-[11px] text-[#496274] block truncate font-medium">
                {card.subtitle}
              </span>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default OfficerSummaryCards;
