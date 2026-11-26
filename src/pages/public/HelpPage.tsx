import React, { useState } from 'react';
import Container from '../../components/ui/Container';
import Button from '../../components/ui/Button';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../routes/routeConfig';
import { useI18n } from '../../i18n';
import { usePageTitle } from '../../hooks/usePageTitle';
import {
  HelpHero,
  FarmerHelpTopics,
  FAQSection,
  ContactSupportCard,
  FAQCategory,
} from '../../features/help';

export const HelpPage: React.FC = () => {
  usePageTitle('Agri Rakshak | Help, Photography Guide & FAQ');
  const { t } = useI18n();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<FAQCategory>('all');

  return (
    <div className="py-8 sm:py-12 font-serif">
      <Container size="xl" className="space-y-8">
        {/* Help Hero & Active Language Search */}
        <HelpHero
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        {/* Field Photography Guide */}
        <FarmerHelpTopics />

        {/* Localized FAQ Section */}
        <FAQSection
          searchQuery={searchQuery}
          selectedCategory={selectedCategory}
        />

        {/* 24/7 Krishi Support Helpline Card */}
        <ContactSupportCard />

        {/* Bottom CTA Banner */}
        <div className="p-6 rounded-md bg-white border-2 border-[#172117] shadow-neo flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="font-black text-base text-[#172117]">
              {t('farmer.report.wizardTitle')}
            </h3>
            <p className="text-xs text-[#496274] font-medium mt-0.5">
              {t('farmer.report.wizardSubtitle')}
            </p>
          </div>
          <Button
            variant="primary"
            size="md"
            onClick={() => navigate(ROUTES.FARMER_REPORT)}
            className="shrink-0"
          >
            {t('farmer.reportProblemBtn')}
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default HelpPage;
