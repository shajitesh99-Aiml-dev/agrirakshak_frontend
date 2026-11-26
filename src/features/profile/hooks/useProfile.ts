import { useState, useEffect, useCallback } from 'react';
import { User } from '../../../types';
import { useAuth } from '../../auth';
import { profileService } from '../services/profileService';

export const useProfile = () => {
  const { user: authUser } = useAuth();
  const [remoteProfile, setRemoteProfile] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(!authUser);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await profileService.getProfile();
      setRemoteProfile(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Failed to load profile details.');
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    let ignore = false;
    if (!authUser) {
      profileService
        .getProfile()
        .then((data) => {
          if (!ignore) {
            setRemoteProfile(data);
            setError(null);
          }
        })
        .catch((err: unknown) => {
          if (!ignore) {
            setError(err instanceof Error ? err.message : 'Failed to load profile details.');
          }
        })
        .finally(() => {
          if (!ignore) setIsLoading(false);
        });
    }
    return () => {
      ignore = true;
    };
  }, [authUser]);

  const profile = remoteProfile || authUser;

  return {
    profile,
    isLoading,
    error,
    refetch: fetchProfile,
  };
};

export default useProfile;
