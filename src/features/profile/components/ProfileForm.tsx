import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { User, Farmer } from '../../../types';
import { UpdateProfileInput } from '../services/profileService';
import Card from '../../../components/ui/Card';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Alert from '../../../components/ui/Alert';
import LanguagePreference from './LanguagePreference';
import { useI18n } from '../../../i18n';
import { SupportedLanguage } from '../../../i18n/config';
import { Save, X, Info } from 'lucide-react';

interface ProfileFormData {
  name: string;
  phone: string;
  village?: string;
  district?: string;
  state?: string;
  preferredLanguage: SupportedLanguage;
}

interface ProfileFormProps {
  user: User;
  onSave: (data: UpdateProfileInput) => Promise<User | null>;
  onCancel: () => void;
  isSaving: boolean;
  error: string | null;
  success: boolean;
}

export const ProfileForm: React.FC<ProfileFormProps> = ({
  user,
  onSave,
  onCancel,
  isSaving,
  error,
  success,
}) => {
  const { t } = useI18n();

  const isFarmer = user.role === 'farmer';
  const farmerData = isFarmer ? (user as Farmer) : null;

  const currentLang = (user.preferred_language || user.preferredLanguage || 'en') as SupportedLanguage;

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ProfileFormData>({
    defaultValues: {
      name: user.name || '',
      phone: user.phone || user.phoneNumber || '',
      village: farmerData?.village || '',
      district: farmerData?.district || (user as { district?: string }).district || '',
      state: farmerData?.state || (user as { state?: string }).state || '',
      preferredLanguage: currentLang,
    },
  });

  const onSubmit = async (formData: ProfileFormData) => {
    await onSave({
      name: formData.name.trim(),
      phone: formData.phone.trim(),
      village: formData.village?.trim(),
      district: formData.district?.trim(),
      state: formData.state?.trim(),
      preferred_language: formData.preferredLanguage,
      preferredLanguage: formData.preferredLanguage,
    });
  };

  return (
    <Card padding="lg" className="border-[#DCE7DC] shadow-card font-serif">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Success Alert */}
        {success && (
          <Alert variant="success" title={t('profile.profileUpdatedSuccess')}>
            {t('profile.profileUpdatedSuccess')}
          </Alert>
        )}

        {/* Error Alert */}
        {error && (
          <Alert variant="error" title={t('errors.general')}>
            {error}
          </Alert>
        )}

        {/* Dev Mode Notification */}
        {import.meta.env.DEV && (
          <div className="flex items-center gap-2 p-3 bg-primary-light/40 border border-primary/20 rounded-medium text-xs text-primary-dark">
            <Info className="w-4 h-4 shrink-0" />
            <span>{t('profile.devNotice')}</span>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Full Name */}
          <div>
            <Input
              label={t('profile.fullName')}
              placeholder={t('profile.fullName')}
              errorMessage={errors.name?.message}
              {...register('name', {
                required: t('validation.nameRequired'),
                minLength: { value: 2, message: t('validation.nameRequired') },
              })}
            />
          </div>

          {/* Phone Number */}
          <div>
            <Input
              label={t('profile.phone')}
              placeholder="9876543210"
              errorMessage={errors.phone?.message}
              {...register('phone', {
                required: t('validation.phoneRequired'),
                pattern: {
                  value: /^[6-9]\d{9}$/,
                  message: t('validation.phoneInvalid'),
                },
              })}
            />
          </div>
        </div>

        {/* Farmer Specific Geographic Fields */}
        {isFarmer && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <Input
                label={t('profile.village')}
                placeholder="Navsari"
                errorMessage={errors.village?.message}
                {...register('village', {
                  required: t('validation.villageRequired'),
                })}
              />
            </div>
            <div>
              <Input
                label={t('profile.district')}
                placeholder="Navsari"
                errorMessage={errors.district?.message}
                {...register('district', {
                  required: t('validation.districtRequired'),
                })}
              />
            </div>
            <div>
              <Input
                label={t('profile.state')}
                placeholder="Gujarat"
                errorMessage={errors.state?.message}
                {...register('state', {
                  required: t('validation.stateRequired'),
                })}
              />
            </div>
          </div>
        )}

        {/* Language Preference Field */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-text mb-2 font-sans">
            {t('profile.preferredLanguage')}
          </label>
          <Controller
            name="preferredLanguage"
            control={control}
            render={({ field }) => (
              <LanguagePreference
                value={field.value}
                onChange={field.onChange}
                disabled={isSaving}
              />
            )}
          />
        </div>

        {/* Form Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#EAEFE9]">
          <Button
            type="button"
            variant="outline"
            size="md"
            leftIcon={<X className="w-4 h-4" />}
            onClick={onCancel}
            disabled={isSaving}
          >
            {t('profile.cancelEdit')}
          </Button>

          <Button
            type="submit"
            variant="primary"
            size="md"
            isLoading={isSaving}
            leftIcon={<Save className="w-4 h-4" />}
          >
            {t('profile.saveChanges')}
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default ProfileForm;
