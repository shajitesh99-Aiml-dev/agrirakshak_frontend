import React, { useState, useMemo } from 'react';
import Card from '../../../components/ui/Card';
import FAQItem from './FAQItem';
import { FAQ_CATALOG, FAQCategory } from '../data/faqData';
import { useI18n } from '../../../i18n';
import { Sparkles, HelpCircle } from 'lucide-react';

interface FAQSectionProps {
  searchQuery: string;
  selectedCategory: FAQCategory;
}

export const FAQSection: React.FC<FAQSectionProps> = ({
  searchQuery,
  selectedCategory,
}) => {
  const { t } = useI18n();
  const [openId, setOpenId] = useState<string | null>(null);

  // Translate all items for the currently active language and filter
  const localizedItems = useMemo(() => {
    const qLower = searchQuery.trim().toLowerCase();

    return FAQ_CATALOG.map((item) => {
      // Fetch current localized question & answer
      const qText = t(item.qKey as Parameters<typeof t>[0]);
      const aText = t(item.aKey as Parameters<typeof t>[0]);
      return {
        ...item,
        question: qText,
        answer: aText,
      };
    }).filter((item) => {
      // Category match
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }

      // Localized Search Match across active language
      if (qLower) {
        const matchesQ = item.question.toLowerCase().includes(qLower);
        const matchesA = item.answer.toLowerCase().includes(qLower);
        return matchesQ || matchesA;
      }

      return true;
    });
  }, [searchQuery, selectedCategory, t]);

  return (
    <Card padding="lg" className="border-[#DCE7DC] shadow-card space-y-5 font-serif">
      <div className="border-b border-[#EAEFE9] pb-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-full bg-ai-light flex items-center justify-center text-ai">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-dark-green">
              {t('help.faqTitle')}
            </h2>
            <p className="text-xs sm:text-sm text-text-muted">
              {localizedItems.length} {t('help.faqTitle')}
            </p>
          </div>
        </div>
      </div>

      {localizedItems.length === 0 ? (
        <div className="py-8 text-center space-y-2">
          <HelpCircle className="w-8 h-8 text-text-muted mx-auto" />
          <h3 className="font-bold text-dark-green text-base">
            {t('help.noResultsTitle')}
          </h3>
          <p className="text-xs sm:text-sm text-text-muted">
            {t('help.noResultsDesc')}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {localizedItems.map((item) => (
            <FAQItem
              key={item.id}
              id={item.id}
              question={item.question}
              answer={item.answer}
              isOpen={openId === item.id}
              onToggle={() => setOpenId(openId === item.id ? null : item.id)}
            />
          ))}
        </div>
      )}
    </Card>
  );
};

export default FAQSection;
