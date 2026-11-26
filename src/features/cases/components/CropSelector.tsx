import React from 'react';
import { Sprout } from 'lucide-react';
import Select from '../../../components/ui/Select';
import { getCropOptions, getStageOptions } from '../data/cropOptions';
import { useI18n } from '../../../i18n';

interface CropSelectorProps {
  cropName: string;
  onCropChange: (crop: string) => void;
  cultivationStage?: string;
  onStageChange: (stage: string) => void;
  errorMessage?: string;
}

export const CropSelector: React.FC<CropSelectorProps> = ({
  cropName,
  onCropChange,
  cultivationStage,
  onStageChange,
  errorMessage,
}) => {
  const { t, language } = useI18n();
  const cropOptions = getCropOptions(language);
  const stageOptions = getStageOptions(language);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 pb-2 border-b border-[#EAEFE9]">
        <div className="w-8 h-8 rounded-medium bg-primary-light flex items-center justify-center text-primary">
          <Sprout className="w-4 h-4" />
        </div>
        <div>
          <h3 className="font-serif text-base sm:text-lg font-bold text-text-dark">
            {t('farmer.report.cropInfoHeading')}
          </h3>
          <p className="font-serif text-xs text-text-muted">
            {t('farmer.report.cropInfoDesc')}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Primary Crop */}
        <Select
          label={t('farmer.report.selectCrop')}
          id="crop-selection-dropdown"
          required
          placeholder={t('farmer.report.selectCropPlaceholder')}
          options={cropOptions}
          value={cropName}
          onChange={(e) => onCropChange(e.target.value)}
          errorMessage={errorMessage}
          helperText={t('farmer.report.cropInfoDesc')}
        />

        {/* Cultivation Stage */}
        <Select
          label={t('farmer.report.growthStage')}
          id="growth-stage-dropdown"
          placeholder={t('farmer.report.growthStagePlaceholder')}
          options={stageOptions}
          value={cultivationStage || ''}
          onChange={(e) => onStageChange(e.target.value)}
          helperText={t('farmer.report.growthStagePlaceholder')}
        />
      </div>
    </div>
  );
};

export default CropSelector;
