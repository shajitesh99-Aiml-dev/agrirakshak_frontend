import React from 'react';
import {
  ShieldCheck,
  Lock,
  EyeOff,
  Camera,
  Bot,
  UserCheck,
  BarChart3,
  AlertTriangle,
} from 'lucide-react';
import Container from '../../components/ui/Container';
import Card from '../../components/ui/Card';
import { useI18n } from '../../i18n';
import { usePageTitle } from '../../hooks/usePageTitle';

export const PrivacyPage: React.FC = () => {
  usePageTitle('Agri Rakshak | Data Privacy, DPDP Act & Photo Policy');
  const { t } = useI18n();

  return (
    <div className="py-8 sm:py-12 font-serif">
      <Container size="xl" className="space-y-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-[4px] bg-[#E8F5E9] text-[#1B5E20] text-xs font-bold border-2 border-[#172117] shadow-[2px_2px_0px_#172117]">
            <ShieldCheck className="w-4 h-4 text-[#2E7D32]" />
            <span>DPDP Act Compliance</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-[#172117] tracking-tight">
            {t('privacy.title')}
          </h1>
          <p className="text-sm sm:text-base text-[#496274] leading-relaxed font-medium">
            {t('privacy.subtitle')}
          </p>
        </div>

        {/* AI Disclaimer Alert Card */}
        <div className="p-5 rounded-md bg-[#FFFDE7] border-2 border-[#172117] shadow-neo flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-[#E65100] shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h2 className="text-sm font-black text-[#172117]">
              AI Decision-Support Disclaimer
            </h2>
            <p className="text-xs sm:text-sm text-[#172117] leading-relaxed font-medium">
              {t('privacy.aiDisclaimerNotice')}
            </p>
          </div>
        </div>

        {/* 6 Structured Privacy Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* 1. What Information is Collected */}
          <Card padding="lg" className="border-2 border-[#172117] shadow-neo space-y-3">
            <div className="w-10 h-10 rounded-md bg-[#E8F5E9] border-2 border-[#172117] shadow-[2px_2px_0px_#172117] flex items-center justify-center text-[#2E7D32]">
              <EyeOff className="w-5 h-5" />
            </div>
            <h3 className="text-base font-black text-[#172117]">
              {t('privacy.dataCollectedTitle')}
            </h3>
            <p className="text-xs sm:text-sm text-[#496274] leading-relaxed font-medium">
              {t('privacy.dataCollectedDesc')}
            </p>
          </Card>

          {/* 2. Crop Leaf Photographs */}
          <Card padding="lg" className="border-2 border-[#172117] shadow-neo space-y-3">
            <div className="w-10 h-10 rounded-md bg-[#E8F5E9] border-2 border-[#172117] shadow-[2px_2px_0px_#172117] flex items-center justify-center text-[#2E7D32]">
              <Camera className="w-5 h-5" />
            </div>
            <h3 className="text-base font-black text-[#172117]">
              {t('privacy.cropPhotoTitle')}
            </h3>
            <p className="text-xs sm:text-sm text-[#496274] leading-relaxed font-medium">
              {t('privacy.cropPhotoDesc')}
            </p>
          </Card>

          {/* 3. Role of AI Analysis */}
          <Card padding="lg" className="border-2 border-[#172117] shadow-neo space-y-3">
            <div className="w-10 h-10 rounded-md bg-[#E1F5FE] border-2 border-[#172117] shadow-[2px_2px_0px_#172117] flex items-center justify-center text-[#0288D1]">
              <Bot className="w-5 h-5" />
            </div>
            <h3 className="text-base font-black text-[#172117]">
              {t('privacy.aiUsageTitle')}
            </h3>
            <p className="text-xs sm:text-sm text-[#496274] leading-relaxed font-medium">
              {t('privacy.aiUsageDesc')}
            </p>
          </Card>

          {/* 4. Agricultural Officer Access */}
          <Card padding="lg" className="border-2 border-[#172117] shadow-neo space-y-3">
            <div className="w-10 h-10 rounded-md bg-[#E8F5E9] border-2 border-[#172117] shadow-[2px_2px_0px_#172117] flex items-center justify-center text-[#2E7D32]">
              <UserCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-black text-[#172117]">
              {t('privacy.officerRoleTitle')}
            </h3>
            <p className="text-xs sm:text-sm text-[#496274] leading-relaxed font-medium">
              {t('privacy.officerRoleDesc')}
            </p>
          </Card>

          {/* 5. Aggregated Surveillance */}
          <Card padding="lg" className="border-2 border-[#172117] shadow-neo space-y-3">
            <div className="w-10 h-10 rounded-md bg-[#FFF3E0] border-2 border-[#172117] shadow-[2px_2px_0px_#172117] flex items-center justify-center text-[#8D5B00]">
              <BarChart3 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-black text-[#172117]">
              {t('privacy.adminAnalyticsTitle')}
            </h3>
            <p className="text-xs sm:text-sm text-[#496274] leading-relaxed font-medium">
              {t('privacy.adminAnalyticsDesc')}
            </p>
          </Card>

          {/* 6. Data Minimization & Security */}
          <Card padding="lg" className="border-2 border-[#172117] shadow-neo space-y-3">
            <div className="w-10 h-10 rounded-md bg-[#E8F5E9] border-2 border-[#172117] shadow-[2px_2px_0px_#172117] flex items-center justify-center text-[#2E7D32]">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="text-base font-black text-[#172117]">
              {t('privacy.dataMinimizationTitle')}
            </h3>
            <p className="text-xs sm:text-sm text-[#496274] leading-relaxed font-medium">
              {t('privacy.dataMinimizationDesc')}
            </p>
          </Card>
        </div>

        {/* Commitment Statement */}
        <div className="p-6 rounded-md bg-white border-2 border-[#172117] shadow-neo text-center space-y-2 max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-2 text-[#172117] font-black text-sm">
            <Lock className="w-4 h-4 text-[#2E7D32]" />
            <span>DPDP Act Compliance &amp; Smallholder Protection</span>
          </div>
          <p className="text-xs text-[#496274] leading-relaxed font-medium">
            {t('farmer.report.photoPrivacyNotice')}
          </p>
        </div>
      </Container>
    </div>
  );
};

export default PrivacyPage;
