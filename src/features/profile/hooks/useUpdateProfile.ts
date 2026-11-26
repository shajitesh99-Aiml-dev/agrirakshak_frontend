import { useState, useCallback } from 'react';
import { User } from '../../../types';
import { useAuth } from '../../auth';
import { profileService, UpdateProfileInput } from '../services/profileService';
import { useI18n } from '../../../i18n';

export const useUpdateProfile = () => {
  const { refreshUser } = useAuth();
  const { t, setLanguage } = useI18n();
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const updateProfile = useCallback(
    async (data: UpdateProfileInput): Promise<User | null> => {
      setIsUpdating(true);
      setError(null);
      setSuccess(false);

      try {
        const updated = await profileService.updateProfile(data);
        await refreshUser();

        // If language was updated, sync i18n
        const newLang = data.preferred_language || data.preferredLanguage;
        if (newLang && ['en', 'te', 'hi', 'kn'].includes(newLang)) {
          setLanguage(newLang as 'en' | 'te' | 'hi' | 'kn');
        }

        setSuccess(true);
        return updated;
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError(t('profile.profileUpdateError'));
        }
        return null;
      } finally {
        setIsUpdating(false);
      }
    },
    [refreshUser, setLanguage, t]
  );

  const resetState = useCallback(() => {
    setError(null);
    setSuccess(false);
  }, []);

  return {
    updateProfile,
    isUpdating,
    error,
    success,
    resetState,
  };
};

export default useUpdateProfile;
