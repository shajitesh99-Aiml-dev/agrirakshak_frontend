import React from 'react';
import { SUPPORTED_LANGUAGES, SupportedLanguage } from '../../../i18n/config';
import { Check } from 'lucide-react';

interface LanguagePreferenceProps {
  value: SupportedLanguage;
  onChange: (lang: SupportedLanguage) => void;
  disabled?: boolean;
}

export const LanguagePreference: React.FC<LanguagePreferenceProps> = ({
  value,
  onChange,
  disabled = false,
}) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 font-sans">
      {SUPPORTED_LANGUAGES.map((lang) => {
        const isSelected = value === lang.code;
        return (
          <button
            key={lang.code}
            type="button"
            disabled={disabled}
            onClick={() => onChange(lang.code)}
            className={`p-3 rounded-medium border text-left flex flex-col justify-between transition-all cursor-pointer ${
              isSelected
                ? 'border-primary bg-primary-light/40 text-primary-dark ring-2 ring-primary/20'
                : 'border-[#DFE8DF] bg-white hover:border-primary/50 text-text'
            } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <div className="flex items-center justify-between w-full">
              <span className="text-xs font-bold font-serif">{lang.name}</span>
              {isSelected && <Check className="w-3.5 h-3.5 text-primary shrink-0" />}
            </div>
            <span className="text-[11px] text-text-muted mt-1">{lang.nativeName}</span>
          </button>
        );
      })}
    </div>
  );
};

export default LanguagePreference;
