import React from 'react';
import { AIPrediction, AICategory } from '../../../../types/ai';
import Badge, { BadgeVariant } from '../../../../components/ui/Badge';
import { Bug, Sparkles, ShieldCheck, HelpCircle } from 'lucide-react';
import { useI18n } from '../../../../i18n';

interface PredictionResultProps {
  prediction?: AIPrediction;
  explanation?: string;
  className?: string;
}

export const PredictionResult: React.FC<PredictionResultProps> = ({
  prediction,
  explanation,
  className = '',
}) => {
  const { t } = useI18n();

  if (!prediction) {
    return (
      <div className={`p-4 rounded-card bg-neutral-50 border border-neutral-200 text-neutral-600 ${className}`}>
        <p className="text-sm font-medium">{t('common.noData')}</p>
      </div>
    );
  }

  const getCategoryConfig = (
    cat?: AICategory
  ): { label: string; variant: BadgeVariant; icon: React.ReactNode } => {
    switch (cat) {
      case 'disease':
        return {
          label: t('ai.disease'),
          variant: 'error',
          icon: <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />,
        };
      case 'pest':
        return {
          label: t('ai.pest'),
          variant: 'warning',
          icon: <Bug className="w-3.5 h-3.5" aria-hidden="true" />,
        };
      case 'healthy':
        return {
          label: t('ai.healthy'),
          variant: 'success',
          icon: <ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" />,
        };
      default:
        return {
          label: t('ai.unknown'),
          variant: 'neutral',
          icon: <HelpCircle className="w-3.5 h-3.5" aria-hidden="true" />,
        };
    }
  };

  const categoryConfig = getCategoryConfig(prediction.category);

  return (
    <div className={`space-y-3 p-4 sm:p-5 rounded-card bg-white border border-neutral-200 shadow-xs ${className}`}>
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-100 pb-3">
        <span className="text-xs font-semibold tracking-wider uppercase text-neutral-500">
          {t('ai.categoryLabel')}
        </span>
        <Badge variant={categoryConfig.variant} size="md" className="gap-1.5 font-semibold text-xs">
          {categoryConfig.icon}
          <span>{categoryConfig.label}</span>
        </Badge>
      </div>

      <div>
        <h3 className="text-lg sm:text-xl font-bold text-neutral-900 leading-snug">
          {prediction.label}
        </h3>
        {prediction.scientificName && (
          <p className="text-sm italic text-neutral-600 mt-0.5">
            Scientific taxonomy: {prediction.scientificName}
          </p>
        )}
      </div>

      {explanation && (
        <div className="mt-3 pt-3 border-t border-neutral-100">
          <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
            {t('ai.observedSymptomsTitle')}
          </h4>
          <p className="text-sm text-neutral-700 leading-relaxed font-sans">
            {explanation}
          </p>
        </div>
      )}
    </div>
  );
};

export default PredictionResult;
