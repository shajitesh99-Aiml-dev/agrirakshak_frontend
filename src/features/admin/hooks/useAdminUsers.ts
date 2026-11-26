import { useState, useEffect, useCallback } from 'react';
import { AdminUserSummary } from '../../../types/analytics';
import { adminUserService } from '../services/adminUserService';

export const useAdminUsers = () => {
  const [data, setData] = useState<AdminUserSummary | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    adminUserService
      .getUsers()
      .then((res) => {
        if (isMounted) {
          setData(res);
          setError(null);
          setIsLoading(false);
        }
      })
      .catch((err: unknown) => {
        if (isMounted) {
          const msg = err instanceof Error ? err.message : 'Unable to load user directory.';
          setError(msg);
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const refreshUsers = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await adminUserService.getUsers();
      setData(res);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Unable to refresh user directory.';
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    data,
    isLoading,
    error,
    refreshUsers,
  };
};

export default useAdminUsers;
