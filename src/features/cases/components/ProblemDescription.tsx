import React from 'react';
import { FileText, HelpCircle } from 'lucide-react';
import Textarea from '../../../components/ui/Textarea';
import { useI18n } from '../../../i18n';

export interface ProblemDescriptionProps {
  description: string;
  onDescriptionChange: (text: string) => void;
  severity?: 'low' | 'moderate' | 'high';
  onSeverityChange: (severity: 'low' | 'moderate' | 'high') => void;
  errorMessage?: string;
}

export const ProblemDescription: React.FC<ProblemDescriptionProps> = ({
  description,
  onDescriptionChange,
  severity = 'moderate',
  onSeverityChange,
  errorMessage,
}) => {
  const { t } = useI18n();

  const severityTiers: { value: 'low' | 'moderate' | 'high'; label: string; desc: string; color: string }[] = [
    {
      value: 'low',
      label: t('severityLevels.low'),
      desc: t('farmer.report.severityLow'),
      color: 'border-[#A5D6A7] hover:border-primary',
    },
    {
      value: 'moderate',
      label: t('severityLevels.moderate'),
      desc: t('farmer.report.severityModerate'),
      color: 'border-[#FFE082] hover:border-accent',
    },
    {
      value: 'high',
      label: t('severityLevels.high'),
      desc: t('farmer.report.severityHigh'),
      color: 'border-[#EF9A9A] hover:border-semantic-error',
    },
  ];

  return (
    <div className="space-y-4 pt-2">
      <div className="flex items-center gap-2 pb-2 border-b border-[#EAEFE9]">
        <div className="w-8 h-8 rounded-medium bg-[#FFF8E1] flex items-center justify-center text-accent-dark">
          <FileText className="w-4 h-4 text-[#8D5B00]" />
        </div>
        <div>
          <h3 className="font-serif text-base sm:text-lg font-bold text-text-dark">
            {t('farmer.report.description')}
          </h3>
          <p className="font-serif text-xs text-text-muted">
            {t('farmer.report.symptomsDesc')}
          </p>
        </div>
      </div>

      {/* Helpful guidance callout */}
      <div className="p-3.5 bg-[#F7FAF7] rounded-medium border border-[#DDE7DD] space-y-1.5 text-xs text-text font-serif">
        <div className="flex items-center gap-1.5 font-bold text-dark-green">
          <HelpCircle className="w-4 h-4 text-primary" />
          <span>{t('help.guideTitle')}:</span>
        </div>
        <p className="text-text-muted">
          {t('farmer.report.descriptionPlaceholder')}
        </p>
      </div>

      {/* Problem Description Textarea */}
      <Textarea
        label={t('farmer.report.description')}
        id="problem-description-input"
        required
        placeholder={t('farmer.report.descriptionPlaceholder')}
        rows={4}
        value={description}
        onChange={(e) => onDescriptionChange(e.target.value)}
        errorMessage={errorMessage}
        helperText={`${description.length}/1000`}
      />

      {/* Perceived Severity Selector */}
      <div className="space-y-2 pt-2">
        <label className="block text-xs sm:text-sm font-semibold text-text">
          {t('farmer.report.severityPrompt')}
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {severityTiers.map((tier) => {
            const isSelected = severity === tier.value;
            return (
              <button
                key={tier.value}
                type="button"
                onClick={() => onSeverityChange(tier.value)}
                className={`p-3 rounded-medium border text-left font-serif transition-all ${tier.color} ${
                  isSelected
                    ? 'bg-card shadow-soft ring-2 ring-primary border-primary'
                    : 'bg-card/70 hover:bg-card'
                }`}
              >
                <span className="font-bold text-xs sm:text-sm text-text block">
                  {tier.label}
                </span>
                <span className="text-[11px] text-text-muted mt-0.5 block leading-tight">
                  {tier.desc}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProblemDescription;
