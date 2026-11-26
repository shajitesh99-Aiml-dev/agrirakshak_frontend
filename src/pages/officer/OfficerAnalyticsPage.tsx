import React from 'react';
import { BarChart3 } from 'lucide-react';
import PlaceholderShell from '../PlaceholderShell';
import { BreadcrumbItem } from '../../components/ui/Breadcrumbs';
import { ROUTES } from '../../routes/routeConfig';

export const OfficerAnalyticsPage: React.FC = () => {
  const breadcrumbs: BreadcrumbItem[] = [
    { label: 'Officer Home', href: ROUTES.OFFICER_DASHBOARD },
    { label: 'Epidemic Analytics', isCurrent: true },
  ];

  return (
    <PlaceholderShell
      title="Regional Epidemiological Analytics"
      subtitle="Crop Pathology Trends, Disease Frequency &amp; Advisory Efficacy"
      category="officer"
      plannedPhase="Phase 8: Agricultural Officer Portal"
      breadcrumbs={breadcrumbs}
      icon={<BarChart3 className="w-6 h-6 text-ai" />}
      description="Analytical dashboards powered by Recharts visualizing historical and active crop disease trends, seasonal pathogen surges, and officer response turnaround times."
      highlights={[
        'Interactive bar and area charts of monthly pest detections across taluks',
        'Top 10 most prevalent fungal and viral pathogens in the district',
        'Treatment efficacy tracking measuring recovery percentage',
        'Exportable CSV and PDF reporting for district agricultural commissioner meetings',
      ]}
    />
  );
};

export default OfficerAnalyticsPage;
