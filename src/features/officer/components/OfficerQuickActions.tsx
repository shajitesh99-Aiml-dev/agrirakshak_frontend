import React from 'react';
import { Link } from 'react-router-dom';
import { ClipboardList, AlertOctagon, Sparkles, FolderArchive, ArrowUpRight } from 'lucide-react';
import { ROUTES } from '../../../routes/routeConfig';

export const OfficerQuickActions: React.FC = () => {
  const actions = [
    {
      title: 'Review Pending Cases',
      description: 'Prioritize incoming unverified farmer reports',
      to: `${ROUTES.OFFICER_CASES}?status=pending`,
      icon: <ClipboardList className="w-5 h-5 text-amber-600" />,
      bg: 'hover:bg-amber-50/50 hover:border-amber-300',
    },
    {
      title: 'View Escalated Cases',
      description: 'Check severe viral & pest outbreak alerts',
      to: `${ROUTES.OFFICER_CASES}?status=escalated`,
      icon: <AlertOctagon className="w-5 h-5 text-rose-600" />,
      bg: 'hover:bg-rose-50/50 hover:border-rose-300',
    },
    {
      title: 'View AI Analysis Queue',
      description: 'Review computer vision pathogen predictions',
      to: `${ROUTES.OFFICER_CASES}?ai=1`,
      icon: <Sparkles className="w-5 h-5 text-primary" />,
      bg: 'hover:bg-emerald-50/50 hover:border-emerald-300',
    },
    {
      title: 'View All Case Archive',
      description: 'Browse complete historical district case log',
      to: ROUTES.OFFICER_CASES,
      icon: <FolderArchive className="w-5 h-5 text-blue-600" />,
      bg: 'hover:bg-blue-50/50 hover:border-blue-300',
    },
  ];

  return (
    <section aria-label="Officer Triage Quick Actions" className="space-y-3">
      <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-600">
        Officer Operations &amp; Quick Links
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {actions.map((act, idx) => (
          <Link
            key={idx}
            to={act.to}
            className={`p-4 rounded-card bg-white border border-neutral-200 shadow-2xs ${act.bg} transition-all flex flex-col justify-between gap-3 group`}
          >
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-lg bg-neutral-50 group-hover:bg-white shadow-2xs">
                {act.icon}
              </div>
              <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>

            <div className="space-y-0.5">
              <h3 className="text-sm font-bold text-neutral-900 group-hover:text-primary transition-colors">
                {act.title}
              </h3>
              <p className="text-xs text-neutral-500 font-sans leading-relaxed">
                {act.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default OfficerQuickActions;
