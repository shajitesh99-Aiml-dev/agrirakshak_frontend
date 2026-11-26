import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, ArrowRight, LayoutDashboard, Plus, ShieldCheck } from 'lucide-react';
import { CropCase } from '../../../types';
import Button from '../../../components/ui/Button';
import Card from '../../../components/ui/Card';
import StatusIndicator from '../../../components/ui/StatusIndicator';
import { ROUTES } from '../../../routes/routeConfig';
import { getLocalizedCropName } from '../data/cropOptions';
import { useI18n } from '../../../i18n';

interface ReportSuccessProps {
  createdCase: CropCase;
  onReportAnother: () => void;
}

export const ReportSuccess: React.FC<ReportSuccessProps> = ({
  createdCase,
  onReportAnother,
}) => {
  const navigate = useNavigate();
  const { t, language } = useI18n();
  const cropDisplay = getLocalizedCropName(createdCase.cropName, language);

  return (
    <div className="max-w-2xl mx-auto py-4 sm:py-8 space-y-6 text-center font-serif">
      {/* Success Badge & Header */}
      <div className="flex flex-col items-center space-y-3">
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-primary-light flex items-center justify-center text-primary border-2 border-primary/20 shadow-medium animate-bounce-subtle">
          <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12" />
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold text-dark-green tracking-tight">
          {t('farmer.success.title')}
        </h2>

        <p className="text-sm sm:text-base text-text-muted max-w-lg leading-relaxed">
          {t('farmer.success.statusNotice')}
        </p>
      </div>

      {/* Case Details Summary Box */}
      <Card padding="lg" className="bg-card border-[#CFDCD0] shadow-card text-left space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#EAEFE9]">
          <div>
            <span className="text-xs text-text-muted font-mono block">
              {t('farmer.success.trackingIdLabel')}
            </span>
            <span className="text-xl sm:text-2xl font-bold font-mono text-primary-dark">
              #{createdCase.id}
            </span>
          </div>

          <div>
            <span className="text-xs text-text-muted block mb-1">
              {t('common.status')}
            </span>
            <StatusIndicator status={createdCase.status} size="md" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
          <div>
            <span className="text-text-muted block text-xs">{t('common.crop')}:</span>
            <span className="font-bold text-text">{cropDisplay || createdCase.cropName}</span>
          </div>

          <div>
            <span className="text-text-muted block text-xs">{t('farmer.report.village')}:</span>
            <span className="font-medium text-text">{createdCase.village || t('common.none')}</span>
          </div>
        </div>

        <div className="p-3.5 bg-primary-light/50 rounded-medium border border-primary/20 space-y-1.5 text-xs text-dark-green">
          <p className="font-bold">{t('farmer.success.nextStep1')}</p>
          <p className="text-text-muted">{t('farmer.success.nextStep2')}</p>
        </div>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
        <Button
          variant="primary"
          size="lg"
          rightIcon={<ArrowRight className="w-4 h-4" />}
          onClick={() => navigate(`/farmer/cases/${createdCase.id}`)}
          className="w-full sm:w-auto"
        >
          {t('farmer.success.viewCaseBtn')}
        </Button>

        <Button
          variant="secondary"
          size="lg"
          leftIcon={<Plus className="w-4 h-4" />}
          onClick={onReportAnother}
          className="w-full sm:w-auto"
        >
          {t('farmer.reportProblemBtn')}
        </Button>

        <Button
          variant="outline"
          size="lg"
          leftIcon={<LayoutDashboard className="w-4 h-4" />}
          onClick={() => navigate(ROUTES.FARMER_DASHBOARD)}
          className="w-full sm:w-auto"
        >
          {t('farmer.success.dashboardBtn')}
        </Button>
      </div>

      <div className="flex items-center justify-center gap-1.5 text-xs text-text-muted pt-2">
        <ShieldCheck className="w-4 h-4 text-primary" />
        <span>{t('farmer.report.photoPrivacyNotice')}</span>
      </div>
    </div>
  );
};

export default ReportSuccess;
