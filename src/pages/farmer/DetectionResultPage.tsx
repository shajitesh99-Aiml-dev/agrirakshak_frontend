import React from 'react';
import { useParams } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import PlaceholderShell from '../PlaceholderShell';
import { BreadcrumbItem } from '../../components/ui/Breadcrumbs';
import { ROUTES } from '../../routes/routeConfig';

export const DetectionResultPage: React.FC = () => {
  const { caseId } = useParams<{ caseId?: string }>();

  const breadcrumbs: BreadcrumbItem[] = [
    { label: 'Farmer Home', href: ROUTES.FARMER_DASHBOARD },
    { label: 'Report', href: ROUTES.FARMER_REPORT },
    { label: 'AI Diagnosis', isCurrent: true },
  ];

  return (
    <PlaceholderShell
      title={`AI Diagnosis Result: ${caseId || 'Sample Case'}`}
      subtitle="Computer Vision Model Prediction &amp; Immediate Action Plan"
      category="farmer"
      plannedPhase="Phase 7: AI Diagnostic Engine & Results Presentation"
      breadcrumbs={breadcrumbs}
      icon={<Sparkles className="w-6 h-6 text-ai" />}
      description="Instant computer vision analysis display providing predicted disease taxonomy, percentage model confidence, severity classification, and actionable treatment recommendations."
      highlights={[
        'Interactive leaf heatmaps highlighting infected chlorotic spots',
        'Top 3 differential diagnostic candidates with confidence scores',
        'Automatic escalation trigger to Agricultural Officer if confidence is below 80%',
        'Farmer confirmation button: "Advisory Understood" or "Request Officer Call"',
      ]}
    />
  );
};

export default DetectionResultPage;
