import { useState, useEffect, useCallback } from 'react';
import { AdminDashboardData, AnalyticsTimeRange } from '../../../types/analytics';
import { adminDashboardService } from '../services/adminDashboardService';

export const useAdminDashboard = (initialRange: AnalyticsTimeRange = '30d') => {
  const [data, setData] = useState<AdminDashboardData | null>(null);
  const [timeRange, setTimeRange] = useState<AnalyticsTimeRange>(initialRange);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    adminDashboardService
      .getDashboardData(timeRange)
      .then((res) => {
        if (isMounted) {
          setData(res);
          setError(null);
          setIsLoading(false);
        }
      })
      .catch((err: unknown) => {
        if (isMounted) {
          const msg = err instanceof Error ? err.message : 'Unable to load administrative dashboard telemetry.';
          setError(msg);
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [timeRange]);

  const updateRange = useCallback((newRange: AnalyticsTimeRange) => {
    setIsLoading(true);
    setTimeRange(newRange);
  }, []);

  const refreshDashboard = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await adminDashboardService.getDashboardData(timeRange);
      setData(res);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Unable to refresh administrative telemetry.';
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  }, [timeRange]);

  return {
    data,
    timeRange,
    updateRange,
    isLoading,
    error,
    refreshDashboard,
  };
};

export default useAdminDashboard;
