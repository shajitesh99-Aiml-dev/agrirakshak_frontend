import { useState, useEffect, useCallback } from 'react';
import { AnalyticsOverviewData, AnalyticsTimeRange } from '../../../types/analytics';
import { adminAnalyticsService } from '../services/adminAnalyticsService';

export const useAdminAnalytics = (initialRange: AnalyticsTimeRange = '30d') => {
  const [data, setData] = useState<AnalyticsOverviewData | null>(null);
  const [timeRange, setTimeRange] = useState<AnalyticsTimeRange>(initialRange);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    adminAnalyticsService
      .getAnalyticsOverview(timeRange)
      .then((res) => {
        if (isMounted) {
          setData(res);
          setError(null);
          setIsLoading(false);
        }
      })
      .catch((err: unknown) => {
        if (isMounted) {
          const msg = err instanceof Error ? err.message : 'Unable to load epidemiological analytics.';
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

  const refreshAnalytics = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await adminAnalyticsService.getAnalyticsOverview(timeRange);
      setData(res);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Unable to refresh analytics.';
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
    refreshAnalytics,
  };
};

export default useAdminAnalytics;
