import React from 'react';
import { Check, Stethoscope } from 'lucide-react';
import { getLocalizedSymptoms } from '../data/symptomOptions';
import { useI18n } from '../../../i18n';

export interface SymptomSelectorProps {
  selectedSymptoms: string[];
  onToggleSymptom: (symptomId: string) => void;
}

export const SymptomSelector: React.FC<SymptomSelectorProps> = ({
  selectedSymptoms,
  onToggleSymptom,
}) => {
  const { t, language } = useI18n();
  const symptoms = getLocalizedSymptoms(language);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between pb-2 border-b-2 border-[#172117]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-md bg-[#E1F5FE] border-2 border-[#172117] shadow-[2px_2px_0px_#172117] flex items-center justify-center text-[#0288D1]">
            <Stethoscope className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-serif text-base sm:text-lg font-black text-[#172117]">
              {t('farmer.report.commonSymptoms')}
            </h3>
            <p className="text-xs text-[#496274] font-medium">
              {t('farmer.report.selectSymptomsHint')}
            </p>
          </div>
        </div>
        <span className="text-xs font-bold text-[#496274]">
          {selectedSymptoms.length} {t('common.details')}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
        {symptoms.map((item) => {
          const isSelected = selectedSymptoms.includes(item.id);

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onToggleSymptom(item.id)}
              className={`p-3 rounded-md border-2 border-[#172117] text-left transition-all duration-150 flex items-start gap-2.5 min-h-[52px] cursor-pointer ${
                isSelected
                  ? 'bg-[#E8F5E9] shadow-none translate-x-[2px] translate-y-[2px]'
                  : 'bg-white shadow-[2px_2px_0px_#172117] hover:bg-[#FAFDF9] active:shadow-none active:translate-x-[2px] active:translate-y-[2px]'
              }`}
              aria-pressed={isSelected}
            >
              <div
                className={`w-5 h-5 rounded-[4px] flex items-center justify-center shrink-0 mt-0.5 transition-colors border-2 border-[#172117] ${
                  isSelected
                    ? 'bg-[#2E7D32] text-white'
                    : 'bg-white text-transparent'
                }`}
                aria-hidden="true"
              >
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-xs sm:text-sm font-bold text-[#172117] block leading-snug">
                  {item.label}
                </span>
                {item.description && (
                  <span className="text-[11px] text-[#496274] mt-0.5 block leading-tight font-medium">
                    {item.description}
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SymptomSelector;
