import React from 'react';
import { HelpCircle } from 'lucide-react';
import HelpSearch from './HelpSearch';
import { useI18n } from '../../../i18n';
import { FAQCategory } from '../data/faqData';

interface HelpHeroProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedCategory: FAQCategory;
  onSelectCategory: (cat: FAQCategory) => void;
}

export const HelpHero: React.FC<HelpHeroProps> = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onSelectCategory,
}) => {
  const { t } = useI18n();

  const categories: Array<{ id: FAQCategory; label: string }> = [
    { id: 'all', label: t('help.allCategories') },
    { id: 'farmer', label: t('help.farmerCategory') },
    { id: 'officer', label: t('help.officerCategory') },
    { id: 'admin', label: t('help.adminCategory') },
  ];

  return (
    <div className="text-center max-w-3xl mx-auto space-y-5 font-serif">
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-[4px] bg-[#E8F5E9] text-[#1B5E20] text-xs font-bold border-2 border-[#172117] shadow-[2px_2px_0px_#172117]">
        <HelpCircle className="w-4 h-4 text-[#2E7D32]" />
        <span>{t('nav.help')}</span>
      </div>

      <h1 className="text-3xl sm:text-4xl font-black text-[#172117] tracking-tight">
        {t('help.title')}
      </h1>

      <p className="text-sm sm:text-base text-[#496274] leading-relaxed max-w-2xl mx-auto font-medium">
        {t('help.subtitle')}
      </p>

      {/* Localized Help Search */}
      <HelpSearch value={searchQuery} onChange={onSearchChange} className="pt-2" />

      {/* Category Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => onSelectCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-md text-xs font-bold transition-all border-2 border-[#172117] cursor-pointer ${
                isActive
                  ? 'bg-[#2E7D32] text-white shadow-none translate-x-[2px] translate-y-[2px]'
                  : 'bg-white text-[#172117] shadow-[2px_2px_0px_#172117] hover:bg-[#E8F5E9] active:shadow-none active:translate-x-[2px] active:translate-y-[2px]'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default HelpHero;
