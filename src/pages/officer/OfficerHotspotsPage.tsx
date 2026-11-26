import React from 'react';
import { MapPin } from 'lucide-react';
import PlaceholderShell from '../PlaceholderShell';
import { BreadcrumbItem } from '../../components/ui/Breadcrumbs';
import { ROUTES } from '../../routes/routeConfig';

export const OfficerHotspotsPage: React.FC = () => {
  const breadcrumbs: BreadcrumbItem[] = [
    { label: 'Officer Home', href: ROUTES.OFFICER_DASHBOARD },
    { label: 'Outbreak Hotspots', isCurrent: true },
  ];

  return (
    <PlaceholderShell
      title="Outbreak Hotspots &amp; Cluster Maps"
      subtitle="Geospatial Pest Epidemiology &amp; Containment Zones"
      category="officer"
      plannedPhase="Phase 8: Agricultural Officer Portal"
      breadcrumbs={breadcrumbs}
      icon={<MapPin className="w-6 h-6 text-ai" />}
      description="Geospatial intelligence map tracking active infection clusters across villages and blocks. Helps officers enact buffer quarantine zones and schedule drone spraying."
      highlights={[
        'Interactive district heatmap displaying pathogen cluster density',
        'Early warning radius modeling identifying neighboring vulnerable farms',
        'Direct broadcast trigger to send preventative warnings to all farmers in cluster',
        'Historical outbreak progression animations to forecast vector spread',
      ]}
    />
  );
};

export default OfficerHotspotsPage;
