import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Globe, Check, ChevronDown } from 'lucide-react';
import { useI18n, SupportedLanguage } from '../../i18n';

export interface LanguageSelectorProps {
  variant?: 'header' | 'compact' | 'footer';
  className?: string;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  variant = 'header',
  className = '',
}) => {
  const { language, setLanguage, supportedLanguages, currentLanguageOption, t } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click or Escape key
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleSelectLanguage = useCallback(
    (code: SupportedLanguage) => {
      setLanguage(code);
      setIsOpen(false);
      triggerRef.current?.focus();
    },
    [setLanguage]
  );

  return (
    <div ref={containerRef} className={`relative inline-block text-left ${className}`}>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={`${t('nav.selectLanguage')}: ${currentLanguageOption.nativeName}`}
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-md text-xs sm:text-sm font-bold transition-all min-h-[40px] sm:min-h-[44px] cursor-pointer border-2 border-[#172117] ${
          isOpen
            ? 'bg-[#E8F5E9] text-[#1B5E20] shadow-none translate-x-[1px] translate-y-[1px]'
            : 'bg-white hover:bg-[#F5FAF3] text-[#172117] shadow-[2px_2px_0px_#172117] active:shadow-none active:translate-x-[2px] active:translate-y-[2px]'
        }`}
      >
        <Globe className="w-4 h-4 text-[#2E7D32] shrink-0" aria-hidden="true" />
        <span className="font-bold tracking-tight">
          {variant === 'compact' ? currentLanguageOption.code.toUpperCase() : currentLanguageOption.nativeName}
        </span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-[#172117] transition-transform duration-200 shrink-0 ${
            isOpen ? 'rotate-180' : ''
          }`}
          aria-hidden="true"
        />
      </button>

      {isOpen && (
        <div
          ref={menuRef}
          role="listbox"
          aria-label={t('nav.selectLanguage')}
          className="absolute right-0 mt-2 w-52 sm:w-56 rounded-md bg-white border-2 border-[#172117] shadow-neo-lg z-50 py-1 focus:outline-none animate-fadeIn"
        >
          <div className="px-3.5 py-2 text-[11px] font-black uppercase tracking-wider text-[#172117] bg-[#F5FAF3] border-b-2 border-[#172117]">
            {t('nav.selectLanguage')}
          </div>
          {supportedLanguages.map((option) => {
            const isSelected = option.code === language;
            return (
              <button
                key={option.code}
                role="option"
                aria-selected={isSelected}
                type="button"
                onClick={() => handleSelectLanguage(option.code)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 text-xs sm:text-sm text-left transition-colors min-h-[44px] cursor-pointer ${
                  isSelected
                    ? 'bg-[#E8F5E9] text-[#1B5E20] font-black border-l-4 border-[#2E7D32]'
                    : 'text-[#172117] hover:bg-[#F5FAF3] font-semibold'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="text-base select-none shrink-0" role="img" aria-label={option.name}>
                    {option.flag}
                  </span>
                  <div className="min-w-0">
                    <p className="leading-tight truncate font-bold">{option.nativeName}</p>
                    <p className="text-[10px] text-[#496274] truncate leading-tight mt-0.5">{option.name}</p>
                  </div>
                </div>
                {isSelected && (
                  <Check className="w-4 h-4 text-[#2E7D32] shrink-0 ml-2" aria-hidden="true" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
