import React from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin,
  BarChart4,
  FolderGit2,
  Users,
  AlertTriangle,
  FileSpreadsheet,
} from 'lucide-react';
import { ROUTES } from '../../../routes/routeConfig';

export const AdminQuickActions: React.FC = () => {
  const actions = [
    {
      label: 'Hotspot Surveillance',
      desc: 'Interactive regional cluster map',
      icon: <MapPin className="w-5 h-5 text-amber-600" />,
      to: ROUTES.ADMIN_HOTSPOTS,
      bg: 'bg-amber-50 hover:bg-amber-100/80 border-amber-200/80',
    },
    {
      label: 'Epidemic Analytics',
      desc: 'Disease & pest distribution charts',
      icon: <BarChart4 className="w-5 h-5 text-blue-600" />,
      to: ROUTES.ADMIN_ANALYTICS,
      bg: 'bg-blue-50 hover:bg-blue-100/80 border-blue-200/80',
    },
    {
      label: 'Statewide Cases',
      desc: 'Search & audit all incoming farmer cases',
      icon: <FolderGit2 className="w-5 h-5 text-indigo-600" />,
      to: ROUTES.ADMIN_CASES,
      bg: 'bg-indigo-50 hover:bg-indigo-100/80 border-indigo-200/80',
    },
    {
      label: 'Officer Directory',
      desc: 'Review agricultural officer caseloads',
      icon: <Users className="w-5 h-5 text-emerald-600" />,
      to: ROUTES.ADMIN_USERS,
      bg: 'bg-emerald-50 hover:bg-emerald-100/80 border-emerald-200/80',
    },
    {
      label: 'Escalation Review',
      desc: 'Review critical pathogen outbreaks',
      icon: <AlertTriangle className="w-5 h-5 text-rose-600" />,
      to: `${ROUTES.ADMIN_CASES}?status=escalated`,
      bg: 'bg-rose-50 hover:bg-rose-100/80 border-rose-200/80',
    },
    {
      label: 'Outbreak Export',
      desc: 'Export surveillance report CSV/JSON',
      icon: <FileSpreadsheet className="w-5 h-5 text-teal-600" />,
      to: ROUTES.ADMIN_ANALYTICS,
      bg: 'bg-teal-50 hover:bg-teal-100/80 border-teal-200/80',
    },
  ];

  return (
    <section
      aria-label="Administrative Quick Operations"
      className="p-5 rounded-card bg-white border border-neutral-200 shadow-2xs space-y-3"
    >
      <h2 className="text-base font-bold text-neutral-900">Governance Directives</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {actions.map((act) => (
          <Link
            key={act.label}
            to={act.to}
            className={`p-3.5 rounded-xl border ${act.bg} transition-all flex items-start gap-3 group`}
          >
            <div className="p-2 rounded-lg bg-white shadow-2xs shrink-0 group-hover:scale-105 transition-transform">
              {act.icon}
            </div>
            <div>
              <h3 className="font-bold text-sm text-neutral-900 group-hover:text-primary transition-colors">
                {act.label}
              </h3>
              <p className="text-xs text-neutral-600 leading-tight mt-0.5">{act.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default AdminQuickActions;
