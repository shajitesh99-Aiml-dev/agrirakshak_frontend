import { useState, useEffect, useCallback } from 'react';
import { OfficerDashboardData } from '../types/officerTypes';
import { officerDashboardService } from '../services/officerDashboardService';

export const useOfficerDashboard = () => {
  const [data, setData] = useState<OfficerDashboardData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    officerDashboardService
      .getDashboardData()
      .then((res) => {
        if (isMounted) {
          setData(res);
          setError(null);
          setIsLoading(false);
        }
      })
      .catch((err: unknown) => {
        if (isMounted) {
          const msg = err instanceof Error ? err.message : 'Unable to load officer dashboard metrics.';
          setError(msg);
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const refreshDashboard = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await officerDashboardService.getDashboardData();
      setData(res);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Unable to load officer dashboard metrics.';
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    data,
    isLoading,
    error,
    refreshDashboard,
  };
};

export default useOfficerDashboard;
