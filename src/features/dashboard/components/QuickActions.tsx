import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, FolderOpen, Bell, User, ChevronRight } from 'lucide-react';
import Card from '../../../components/ui/Card';
import { ROUTES } from '../../../routes/routeConfig';

export const QuickActions: React.FC = () => {
  const navigate = useNavigate();

  const actions = [
    {
      label: 'Report Problem',
      sublabel: 'Scan or upload plant symptoms',
      icon: <Camera className="w-5 h-5 text-primary" />,
      to: ROUTES.FARMER_REPORT,
    },
    {
      label: 'My Crop Cases',
      sublabel: 'View history & treatment progress',
      icon: <FolderOpen className="w-5 h-5 text-ai" />,
      to: ROUTES.FARMER_CASES,
    },
    {
      label: 'Advisories & Alerts',
      sublabel: 'District KVK messages & weather',
      icon: <Bell className="w-5 h-5 text-accent" />,
      to: ROUTES.FARMER_NOTIFICATIONS,
    },
    {
      label: 'Farm Profile',
      sublabel: 'Manage land acreage & language',
      icon: <User className="w-5 h-5 text-[#8D5B00]" />,
      to: ROUTES.FARMER_PROFILE,
    },
  ];

  return (
    <section aria-labelledby="quick-actions-heading" className="space-y-3">
      <h2 id="quick-actions-heading" className="text-lg sm:text-xl font-bold text-text-dark font-serif tracking-tight">
        Quick Actions
      </h2>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {actions.map((act, idx) => (
          <Card
            key={idx}
            padding="md"
            className="cursor-pointer hover:border-primary/50 hover:shadow-soft transition-all duration-150 bg-card group"
            onClick={() => navigate(act.to)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                navigate(act.to);
              }
            }}
            aria-label={`${act.label} - ${act.sublabel}`}
          >
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 rounded-medium bg-[#F2F7F1] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                {act.icon}
              </div>
              <ChevronRight className="w-4 h-4 text-text-muted group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
            </div>

            <div className="mt-3">
              <h3 className="font-serif text-sm sm:text-base font-bold text-text group-hover:text-primary transition-colors">
                {act.label}
              </h3>
              <p className="font-serif text-xs text-text-muted mt-0.5 line-clamp-1">
                {act.sublabel}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default QuickActions;
