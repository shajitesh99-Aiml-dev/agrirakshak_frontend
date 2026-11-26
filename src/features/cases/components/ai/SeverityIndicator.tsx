import React from 'react';
import { AISeverity } from '../../../../types/ai';
import Badge, { BadgeVariant } from '../../../../components/ui/Badge';
import { AlertCircle, AlertTriangle, CheckCircle, HelpCircle } from 'lucide-react';

interface SeverityIndicatorProps {
  severity?: AISeverity;
  className?: string;
}

export const SeverityIndicator: React.FC<SeverityIndicatorProps> = ({
  severity,
  className = '',
}) => {
  if (!severity || severity === 'unknown') {
    return (
      <div className={`inline-flex items-center gap-1.5 text-xs text-neutral-600 bg-neutral-100 px-3 py-1.5 rounded-full border border-neutral-200 ${className}`}>
        <HelpCircle className="w-3.5 h-3.5 text-neutral-500" aria-hidden="true" />
        <span>Severity information is not available</span>
      </div>
    );
  }

  const getConfig = (
    sev: AISeverity
  ): { label: string; variant: BadgeVariant; icon: React.ReactNode; description: string } => {
    switch (sev) {
      case 'mild':
        return {
          label: 'Mild Severity',
          variant: 'success',
          icon: <CheckCircle className="w-3.5 h-3.5" aria-hidden="true" />,
          description: 'Localized damage; manageable with preventative cultural practices.',
        };
      case 'moderate':
        return {
          label: 'Moderate Severity',
          variant: 'warning',
          icon: <AlertTriangle className="w-3.5 h-3.5" aria-hidden="true" />,
          description: 'Spreading symptoms; timely intervention required.',
        };
      case 'severe':
        return {
          label: 'Severe Severity',
          variant: 'error',
          icon: <AlertCircle className="w-3.5 h-3.5" aria-hidden="true" />,
          description: 'High risk of yield loss; prioritize immediate action.',
        };
      default:
        return {
          label: 'Severity Unknown',
          variant: 'neutral',
          icon: <HelpCircle className="w-3.5 h-3.5" aria-hidden="true" />,
          description: 'Severity information is not available.',
        };
    }
  };

  const config = getConfig(severity);

  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <div className="flex items-center gap-2">
        <Badge variant={config.variant} size="md" className="gap-1.5 py-1 px-3 text-xs font-semibold">
          {config.icon}
          <span>{config.label}</span>
        </Badge>
      </div>
      <p className="text-xs text-neutral-500 leading-normal">{config.description}</p>
    </div>
  );
};

export default SeverityIndicator;
