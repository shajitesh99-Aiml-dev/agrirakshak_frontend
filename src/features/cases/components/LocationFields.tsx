import React from 'react';
import { MapPin } from 'lucide-react';
import Input from '../../../components/ui/Input';
import { useI18n } from '../../../i18n';

interface LocationFieldsProps {
  village: string;
  onVillageChange: (value: string) => void;
  district: string;
  onDistrictChange: (value: string) => void;
  state: string;
  onStateChange: (value: string) => void;
  fieldNotes?: string;
  onFieldNotesChange: (value: string) => void;
  villageError?: string;
  districtError?: string;
}

export const LocationFields: React.FC<LocationFieldsProps> = ({
  village,
  onVillageChange,
  district,
  onDistrictChange,
  state,
  onStateChange,
  fieldNotes,
  onFieldNotesChange,
  villageError,
  districtError,
}) => {
  const { t } = useI18n();

  return (
    <div className="space-y-4 pt-2">
      <div className="flex items-center gap-2 pb-2 border-b border-[#EAEFE9]">
        <div className="w-8 h-8 rounded-medium bg-[#E8F5E9] flex items-center justify-center text-primary-dark">
          <MapPin className="w-4 h-4" />
        </div>
        <div>
          <h3 className="font-serif text-base sm:text-lg font-bold text-text-dark">
            {t('auth.farmLocation')}
          </h3>
          <p className="font-serif text-xs text-text-muted">
            {t('farmer.report.cropInfoDesc')}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        {/* Village / Taluk */}
        <Input
          label={t('farmer.report.village')}
          id="location-village"
          required
          placeholder={t('farmer.report.villagePlaceholder')}
          value={village}
          onChange={(e) => onVillageChange(e.target.value)}
          errorMessage={villageError}
          helperText={t('farmer.report.villagePlaceholder')}
        />

        {/* District */}
        <Input
          label={t('farmer.report.district')}
          id="location-district"
          required
          placeholder={t('farmer.report.districtPlaceholder')}
          value={district}
          onChange={(e) => onDistrictChange(e.target.value)}
          errorMessage={districtError}
          helperText={t('farmer.report.districtPlaceholder')}
        />

        {/* State */}
        <Input
          label={t('common.district')}
          id="location-state"
          value={state}
          onChange={(e) => onStateChange(e.target.value)}
          helperText="State Jurisdiction"
        />
      </div>

      {/* Optional Plot / Landmark note */}
      <Input
        label={`${t('common.details')} (${t('common.optional')})`}
        id="location-plot"
        placeholder="Survey number, gat number, or landmark (e.g. Near Canal)"
        value={fieldNotes || ''}
        onChange={(e) => onFieldNotesChange(e.target.value)}
        helperText="Helps the officer find your field if a visit is necessary"
      />
    </div>
  );
};

export default LocationFields;
