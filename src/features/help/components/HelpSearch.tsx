import React from 'react';
import { Search, X } from 'lucide-react';
import { useI18n } from '../../../i18n';

interface HelpSearchProps {
  value: string;
  onChange: (val: string) => void;
  className?: string;
}

export const HelpSearch: React.FC<HelpSearchProps> = ({ value, onChange, className = '' }) => {
  const { t } = useI18n();

  return (
    <div className={`relative max-w-xl mx-auto ${className}`}>
      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-text-muted">
        <Search className="w-5 h-5 text-primary" />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={t('help.searchPlaceholder')}
        className="w-full pl-11 pr-10 py-3 rounded-md bg-white border-2 border-[#172117] text-[#172117] text-sm sm:text-base font-medium placeholder:text-[#496274] focus:outline-none shadow-[2px_2px_0px_#172117] focus:shadow-neo transition-all font-sans"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange('')}
          aria-label="Clear search"
          className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#172117] hover:text-[#D32F2F] cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default HelpSearch;
