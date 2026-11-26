import React from 'react';
import { Info, Sparkles, UserCheck, Activity, Award, ShieldAlert } from 'lucide-react';
import Container from '../../components/ui/Container';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import { useI18n } from '../../i18n';
import { usePageTitle } from '../../hooks/usePageTitle';

export const AboutPage: React.FC = () => {
  usePageTitle('Agri Rakshak | About Smart India Hackathon 2026 SIH26131');
  const { t } = useI18n();

  return (
    <div className="py-8 sm:py-12 font-serif">
      <Container size="xl" className="space-y-10">
        {/* Header Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-[4px] bg-[#E8F5E9] text-[#1B5E20] text-xs font-bold border-2 border-[#172117] shadow-[2px_2px_0px_#172117]">
            <Award className="w-4 h-4 text-[#2E7D32]" />
            <span>{t('about.sihTitle')}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#172117] tracking-tight">
            {t('about.title')}
          </h1>
          <p className="text-base sm:text-lg text-[#496274] leading-relaxed font-medium">
            {t('about.subtitle')}
          </p>
          <div className="p-3.5 bg-[#FAFDF9] border-2 border-[#172117] shadow-[2px_2px_0px_#172117] rounded-md text-xs sm:text-sm font-sans font-bold text-[#172117] max-w-2xl mx-auto">
            {t('about.sihProblemStatement')}
          </div>
        </div>

        {/* Mission Statement */}
        <Card padding="lg" className="border-2 border-[#172117] shadow-neo bg-white space-y-4">
          <div className="flex items-center gap-2.5 border-b-2 border-[#172117] pb-3">
            <div className="w-9 h-9 rounded-md bg-[#E8F5E9] border-2 border-[#172117] shadow-[2px_2px_0px_#172117] flex items-center justify-center text-[#2E7D32]">
              <Info className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-black text-[#172117]">
              {t('about.missionTitle')}
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#496274] leading-relaxed font-medium">
            {t('about.missionDesc')}
          </p>
        </Card>

        {/* Architectural Pillars */}
        <div className="space-y-4">
          <div className="text-center">
            <h2 className="text-2xl font-black text-[#172117]">
              Platform Architecture
            </h2>
            <p className="text-xs sm:text-sm text-[#496274] font-semibold mt-1">
              End-to-end synergy between computer vision, agronomists, and epidemic governance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Pillar 1 */}
            <Card padding="lg" className="border-2 border-[#172117] shadow-neo space-y-3">
              <div className="w-10 h-10 rounded-md bg-[#E8F5E9] border-2 border-[#172117] shadow-[2px_2px_0px_#172117] flex items-center justify-center text-[#2E7D32]">
                <Sparkles className="w-5 h-5" />
              </div>
              <Badge variant="success" size="sm" className="font-sans">
                Computer Vision
              </Badge>
              <h3 className="text-lg font-black text-[#172117]">
                {t('about.pillarAiTitle')}
              </h3>
              <p className="text-xs sm:text-sm text-[#496274] leading-relaxed font-medium">
                {t('about.pillarAiDesc')}
              </p>
            </Card>

            {/* Pillar 2 */}
            <Card padding="lg" className="border-2 border-[#172117] shadow-neo space-y-3">
              <div className="w-10 h-10 rounded-md bg-[#E1F5FE] border-2 border-[#172117] shadow-[2px_2px_0px_#172117] flex items-center justify-center text-[#0288D1]">
                <UserCheck className="w-5 h-5" />
              </div>
              <Badge variant="info" size="sm" className="font-sans">
                Agronomist Review
              </Badge>
              <h3 className="text-lg font-black text-[#172117]">
                {t('about.pillarOfficerTitle')}
              </h3>
              <p className="text-xs sm:text-sm text-[#496274] leading-relaxed font-medium">
                {t('about.pillarOfficerDesc')}
              </p>
            </Card>

            {/* Pillar 3 */}
            <Card padding="lg" className="border-2 border-[#172117] shadow-neo space-y-3">
              <div className="w-10 h-10 rounded-md bg-[#FFF3E0] border-2 border-[#172117] shadow-[2px_2px_0px_#172117] flex items-center justify-center text-[#8D5B00]">
                <Activity className="w-5 h-5" />
              </div>
              <Badge variant="warning" size="sm" className="font-sans">
                Surveillance Grid
              </Badge>
              <h3 className="text-lg font-black text-[#172117]">
                {t('about.pillarSurveillanceTitle')}
              </h3>
              <p className="text-xs sm:text-sm text-[#496274] leading-relaxed font-medium">
                {t('about.pillarSurveillanceDesc')}
              </p>
            </Card>
          </div>
        </div>

        {/* Realistic Claims & AI Decision Support Notice */}
        <div className="p-6 rounded-md bg-[#FFFDE7] border-2 border-[#172117] shadow-neo space-y-2 max-w-3xl mx-auto">
          <div className="flex items-center gap-2 text-[#E65100] font-black text-sm">
            <ShieldAlert className="w-4 h-4 shrink-0" />
            <span>{t('about.disclaimerTitle')}</span>
          </div>
          <p className="text-xs sm:text-sm text-[#172117] leading-relaxed font-medium">
            {t('about.disclaimerDesc')}
          </p>
        </div>
      </Container>
    </div>
  );
};

export default AboutPage;
