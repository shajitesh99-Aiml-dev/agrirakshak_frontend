import React from 'react';
import { Edit3, Sprout, FileText, Image as ImageIcon } from 'lucide-react';
import { CaseFormData, ReportStep } from '../types/caseFormTypes';
import Card from '../../../components/ui/Card';
import Badge from '../../../components/ui/Badge';
import Checkbox from '../../../components/ui/Checkbox';
import { getLocalizedCropName, getLocalizedStageName } from '../data/cropOptions';
import { getLocalizedSymptomLabel } from '../data/symptomOptions';
import { useI18n } from '../../../i18n';

interface ReportReviewProps {
  formData: CaseFormData;
  onEditStep: (step: ReportStep) => void;
  consent: boolean;
  onConsentChange: (value: boolean) => void;
  consentError?: string;
}

export const ReportReview: React.FC<ReportReviewProps> = ({
  formData,
  onEditStep,
  consent,
  onConsentChange,
  consentError,
}) => {
  const { t, language } = useI18n();

  const cropDisplay = getLocalizedCropName(formData.cropName, language);
  const stageDisplay = getLocalizedStageName(formData.cultivationStage, language);
  const symptomLabels = formData.symptoms.map((id) => getLocalizedSymptomLabel(id, language));

  return (
    <div className="space-y-5">
      <div className="pb-2 border-b border-[#EAEFE9]">
        <h3 className="font-serif text-lg sm:text-xl font-bold text-text-dark">
          {t('farmer.report.reviewHeading')}
        </h3>
        <p className="font-serif text-xs sm:text-sm text-text-muted mt-0.5">
          {t('farmer.report.reviewDesc')}
        </p>
      </div>

      {/* Review Section 1: Crop & Farm Details */}
      <Card padding="md" className="bg-card border-[#DCE7DC] space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-[#F0F5EF]">
          <div className="flex items-center gap-2">
            <Sprout className="w-4 h-4 text-primary" />
            <h4 className="font-serif text-base font-bold text-text-dark">
              {t('farmer.report.step1Title')}
            </h4>
          </div>
          <button
            type="button"
            onClick={() => onEditStep(1)}
            className="text-xs font-semibold text-primary hover:text-primary-dark inline-flex items-center gap-1 p-1 rounded hover:bg-primary-light transition-colors"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>{t('common.edit')}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm font-serif">
          <div>
            <span className="text-text-muted block text-xs">{t('common.crop')}:</span>
            <span className="font-bold text-text">{cropDisplay || t('common.none')}</span>
          </div>
          <div>
            <span className="text-text-muted block text-xs">{t('farmer.report.growthStage')}:</span>
            <span className="font-medium text-text">{stageDisplay || t('common.none')}</span>
          </div>
          <div>
            <span className="text-text-muted block text-xs">{t('farmer.report.village')}:</span>
            <span className="font-medium text-text">{formData.village || t('common.none')}</span>
          </div>
          <div>
            <span className="text-text-muted block text-xs">{t('farmer.report.district')}:</span>
            <span className="font-medium text-text">{formData.district || t('common.none')}</span>
          </div>
        </div>
      </Card>

      {/* Review Section 2: Symptoms & Description */}
      <Card padding="md" className="bg-card border-[#DCE7DC] space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-[#F0F5EF]">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-primary" />
            <h4 className="font-serif text-base font-bold text-text-dark">
              {t('farmer.report.step2Title')}
            </h4>
          </div>
          <button
            type="button"
            onClick={() => onEditStep(2)}
            className="text-xs font-semibold text-primary hover:text-primary-dark inline-flex items-center gap-1 p-1 rounded hover:bg-primary-light transition-colors"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>{t('common.edit')}</span>
          </button>
        </div>

        <div className="space-y-2 text-xs sm:text-sm font-serif">
          <div>
            <span className="text-text-muted block text-xs mb-1.5">{t('farmer.report.commonSymptoms')}:</span>
            {symptomLabels.length > 0 ? (
              <div className="flex flex-wrap gap-1.5">
                {symptomLabels.map((label, idx) => (
                  <Badge key={idx} variant="info" size="sm">
                    {label}
                  </Badge>
                ))}
              </div>
            ) : (
              <span className="text-text-muted italic">{t('common.none')}</span>
            )}
          </div>

          <div className="pt-2">
            <span className="text-text-muted block text-xs mb-1">{t('farmer.report.description')}:</span>
            <p className="p-3 bg-[#F8FAF7] rounded-medium text-text text-xs leading-relaxed border border-[#E3EDE2]">
              {formData.problemDescription || t('common.none')}
            </p>
          </div>
        </div>
      </Card>

      {/* Review Section 3: Photos */}
      <Card padding="md" className="bg-card border-[#DCE7DC] space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-[#F0F5EF]">
          <div className="flex items-center gap-2">
            <ImageIcon className="w-4 h-4 text-primary" />
            <h4 className="font-serif text-base font-bold text-text-dark">
              {t('farmer.report.step3Title')} ({formData.images.length})
            </h4>
          </div>
          <button
            type="button"
            onClick={() => onEditStep(3)}
            className="text-xs font-semibold text-primary hover:text-primary-dark inline-flex items-center gap-1 p-1 rounded hover:bg-primary-light transition-colors"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>{t('common.edit')}</span>
          </button>
        </div>

        {formData.images.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {formData.images.map((item, idx) => (
              <div
                key={item.id}
                className="aspect-square rounded-medium overflow-hidden border border-[#D5E2D5] bg-background"
              >
                <img
                  src={item.previewUrl}
                  alt={`Crop submission photo ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-text-muted italic">{t('common.none')}</p>
        )}
      </Card>

      {/* Mandatory DPDP Consent Checkbox */}
      <div className="pt-2 p-4 rounded-card bg-[#F4F8F4] border border-[#CCE0CC] space-y-2">
        <Checkbox
          id="farmer-consent-checkbox"
          checked={consent}
          onChange={(e) => onConsentChange(e.target.checked)}
          label={t('farmer.report.confirmConsent')}
          errorMessage={consentError}
        />
        <p className="text-[11px] text-text-muted font-serif pl-6">
          {t('farmer.report.reviewSummaryNotice')}
        </p>
      </div>
    </div>
  );
};

export default ReportReview;
