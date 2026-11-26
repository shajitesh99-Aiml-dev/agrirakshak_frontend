import React from 'react';
import { Check } from 'lucide-react';
import { ReportStep } from '../types/caseFormTypes';
import { useI18n } from '../../../i18n';

interface ReportProgressProps {
  currentStep: ReportStep;
  onStepClick?: (step: ReportStep) => void;
  maxStepAllowed?: ReportStep;
}

export const ReportProgress: React.FC<ReportProgressProps> = ({
  currentStep,
  onStepClick,
  maxStepAllowed = currentStep,
}) => {
  const { t } = useI18n();

  const steps: { number: ReportStep; label: string; shortLabel: string }[] = [
    { number: 1, label: t('farmer.report.step1Title'), shortLabel: t('common.crop') },
    { number: 2, label: t('farmer.report.step2Title'), shortLabel: t('common.details') },
    { number: 3, label: t('farmer.report.step3Title'), shortLabel: t('farmer.report.photosHeading').split(' ')[0] },
    { number: 4, label: t('farmer.report.step4Title'), shortLabel: t('common.confirm') },
  ];

  return (
    <nav
      aria-label="Crop reporting progress"
      className="w-full bg-white rounded-md border-2 border-[#172117] p-4 sm:p-5 shadow-neo select-none"
    >
      <ol className="flex items-center justify-between relative">
        {/* Connecting line */}
        <div
          className="absolute top-1/2 left-6 right-6 -translate-y-1/2 h-1 bg-[#172117] -z-0"
          aria-hidden="true"
        >
          <div
            className="h-full bg-[#2E7D32] transition-all duration-300"
            style={{
              width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
            }}
          />
        </div>

        {steps.map((step) => {
          const isCompleted = step.number < currentStep;
          const isCurrent = step.number === currentStep;
          const isClickable = onStepClick && step.number <= maxStepAllowed;

          return (
            <li
              key={step.number}
              aria-current={isCurrent ? 'step' : undefined}
              className="relative z-10 flex flex-col items-center"
            >
              <button
                type="button"
                disabled={!isClickable}
                onClick={() => isClickable && onStepClick(step.number)}
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-md flex items-center justify-center font-serif text-sm font-black transition-all border-2 border-[#172117] ${
                  isCompleted
                    ? 'bg-[#2E7D32] text-white shadow-[2px_2px_0px_#172117]'
                    : isCurrent
                      ? 'bg-[#FFB300] text-[#172117] shadow-[3px_3px_0px_#172117] scale-105'
                      : 'bg-white text-[#496274] shadow-[1px_1px_0px_#172117]'
                } ${isClickable ? 'cursor-pointer hover:translate-x-0.5 hover:translate-y-0.5' : 'cursor-default'}`}
              >
                {isCompleted ? <Check className="w-4 h-4 stroke-[3]" /> : step.number}
              </button>

              <span
                className={`mt-2 text-xs sm:text-sm font-bold transition-colors text-center max-w-[85px] sm:max-w-none ${
                  isCurrent
                    ? 'text-[#172117]'
                    : isCompleted
                      ? 'text-[#1B5E20]'
                      : 'text-[#496274]'
                }`}
              >
                <span className="hidden sm:inline">{step.label}</span>
                <span className="sm:hidden">{step.shortLabel}</span>
              </span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default ReportProgress;
