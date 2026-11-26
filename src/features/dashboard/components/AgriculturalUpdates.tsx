import React from 'react';
import { Bell, CloudSun, ShieldAlert, Award, Info } from 'lucide-react';
import { AgriculturalAlert } from '../../../types/dashboard';
import Card from '../../../components/ui/Card';

interface AgriculturalUpdatesProps {
  alerts: AgriculturalAlert[];
}

export const AgriculturalUpdates: React.FC<AgriculturalUpdatesProps> = ({ alerts = [] }) => {
  if (!alerts || alerts.length === 0) return null;
  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'weather':
        return <CloudSun className="w-4 h-4 text-ai" />;
      case 'pest_outbreak':
        return <ShieldAlert className="w-4 h-4 text-semantic-warning" />;
      case 'scheme':
        return <Award className="w-4 h-4 text-primary" />;
      case 'advisory':
      default:
        return <Bell className="w-4 h-4 text-primary" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'weather':
        return 'Weather Notice';
      case 'pest_outbreak':
        return 'Pest Outbreak Alert';
      case 'scheme':
        return 'Govt Scheme';
      case 'advisory':
      default:
        return 'Crop Advisory';
    }
  };

  return (
    <section aria-labelledby="agri-updates-heading" className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 id="agri-updates-heading" className="text-lg sm:text-xl font-bold text-text-dark font-serif tracking-tight flex items-center gap-2">
          <span>Agricultural Updates &amp; Advisories</span>
        </h2>
        <span className="text-[11px] font-semibold text-text-subtle font-mono uppercase bg-[#F2F6F2] px-2 py-0.5 rounded border border-[#DFE8DF]">
          Official Feeds
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {alerts.map((alert) => (
          <Card
            key={alert.id}
            padding="md"
            className="bg-card border-[#E0EBE0] hover:border-primary/40 transition-colors flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-text-muted">
                  {getAlertIcon(alert.type)}
                  <span>{getTypeLabel(alert.type)}</span>
                </span>
                <span className="text-[11px] text-text-subtle font-serif">
                  {alert.date}
                </span>
              </div>

              <h3 className="font-serif text-sm font-bold text-text-dark leading-snug">
                {alert.title}
              </h3>

              <p className="font-serif text-xs text-text-muted leading-relaxed line-clamp-3">
                {alert.summary}
              </p>
            </div>

            {alert.source && (
              <div className="mt-3 pt-2.5 border-t border-[#F0F5EF] flex items-center justify-between text-[11px] text-text-subtle font-serif">
                <span className="truncate">Source: {alert.source}</span>
                <Info className="w-3 h-3 text-text-subtle shrink-0 ml-1" />
              </div>
            )}
          </Card>
        ))}
      </div>
    </section>
  );
};

export default AgriculturalUpdates;
