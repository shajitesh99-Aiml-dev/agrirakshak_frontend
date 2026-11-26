import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, MapPin, Sparkles, ArrowRight } from 'lucide-react';
import { useAuth } from '../../auth';
import { useI18n } from '../../../i18n';
import Button from '../../../components/ui/Button';
import { ROUTES } from '../../../routes/routeConfig';

export const FarmerWelcome: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { t } = useI18n();

  const displayName = user?.name ? user.name.split(' ')[0] : 'Kisan Mitra';
  const villageLocation = user && 'village' in user && user.village
    ? `${user.village}${user.district ? `, ${user.district}` : ''}`
    : null;

  return (
    <section
      aria-label="Welcome and primary action"
      className="relative overflow-hidden rounded-md bg-[#1B5E20] text-white p-6 sm:p-8 shadow-neo-lg border-3 border-[#172117]"
    >
      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        {/* Left Column: Greeting & Personalization */}
        <div className="space-y-3 max-w-2xl">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[4px] bg-[#E8F5E9] text-xs font-bold text-[#1B5E20] border-2 border-[#172117] shadow-[2px_2px_0px_#172117]">
              <Sparkles className="w-3.5 h-3.5 text-[#2E7D32]" />
              <span>SIH26131 Crop Care Portal</span>
            </span>
            {villageLocation && (
              <span className="inline-flex items-center gap-1 text-xs text-[#172117] bg-white px-2.5 py-1 rounded-[4px] font-bold border-2 border-[#172117] shadow-[2px_2px_0px_#172117]">
                <MapPin className="w-3 h-3 text-[#2E7D32]" />
                <span>{villageLocation}</span>
              </span>
            )}
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white">
            {t('farmer.welcome')}, {displayName} 👋
          </h1>

          <p className="text-sm sm:text-base text-white/90 leading-relaxed font-serif">
            {t('farmer.kisanSubtitle')}
          </p>
        </div>

        {/* Right Column: High-Impact Primary CTA */}
        <div className="shrink-0 flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end gap-2.5">
          <Button
            variant="secondary"
            size="lg"
            leftIcon={<Camera className="w-5 h-5 text-dark-green" />}
            rightIcon={<ArrowRight className="w-4 h-4 text-dark-green" />}
            onClick={() => navigate(ROUTES.FARMER_REPORT)}
            className="w-full sm:w-auto min-h-[48px] px-6 text-base font-bold text-dark-green shadow-medium hover:scale-[1.02] transition-transform"
            aria-label={t('farmer.reportProblemBtn')}
          >
            {t('farmer.reportProblemBtn')}
          </Button>
          <span className="text-xs text-white/80 font-serif text-left lg:text-right">
            {t('farmer.report.wizardSubtitle')}
          </span>
        </div>
      </div>
    </section>
  );
};

export default FarmerWelcome;
