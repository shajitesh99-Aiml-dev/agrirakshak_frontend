import React from 'react';
import { Users, UserCheck, ShieldCheck, Activity } from 'lucide-react';
import { AdminUserSummary } from '../../../../types/analytics';

interface UserSummaryCardsProps {
  data: AdminUserSummary;
}

export const UserSummaryCards: React.FC<UserSummaryCardsProps> = ({ data }) => {
  const cards = [
    {
      title: 'Total Platform Users',
      value: data.totalUsers,
      sub: 'Multi-state registered',
      icon: <Users className="w-5 h-5 text-indigo-600" />,
      bg: 'bg-indigo-50 border-indigo-100',
      text: 'text-indigo-950',
    },
    {
      title: 'Active Smallholder Farmers',
      value: data.farmersCount,
      sub: 'Self-reporting crop health',
      icon: <UserCheck className="w-5 h-5 text-emerald-600" />,
      bg: 'bg-emerald-50 border-emerald-100',
      text: 'text-emerald-950',
    },
    {
      title: 'Agricultural Extension Officers',
      value: data.officersCount,
      sub: 'Clinical agronomists & scouts',
      icon: <ShieldCheck className="w-5 h-5 text-amber-600" />,
      bg: 'bg-amber-50 border-amber-100',
      text: 'text-amber-950',
    },
    {
      title: 'Platform Administrators',
      value: data.adminsCount,
      sub: 'Governance & surveillance roles',
      icon: <Activity className="w-5 h-5 text-purple-600" />,
      bg: 'bg-purple-50 border-purple-100',
      text: 'text-purple-950',
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4" aria-label="User Ecosystem Summary">
      {cards.map((c) => (
        <div key={c.title} className={`p-4 rounded-card border ${c.bg} shadow-2xs space-y-1`}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-neutral-600 truncate">{c.title}</span>
            <div className="p-1.5 rounded-lg bg-white/80 shadow-2xs">{c.icon}</div>
          </div>
          <div className={`text-2xl sm:text-3xl font-extrabold ${c.text} font-mono tracking-tight`}>
            {c.value}
          </div>
          <p className="text-[11px] text-neutral-500 font-sans truncate">{c.sub}</p>
        </div>
      ))}
    </div>
  );
};

export default UserSummaryCards;
