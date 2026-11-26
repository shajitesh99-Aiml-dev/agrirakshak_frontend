import { useState, useEffect, useCallback } from 'react';
import { FarmerDashboardData } from '../../../types/dashboard';
import { dashboardService } from '../../../services/dashboardService';

export interface UseFarmerDashboardResult {
  data: FarmerDashboardData | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

function parseErrorMessage(err: unknown): string {
  let message = 'Unable to load your dashboard. Please check your network connection and try again.';
  if (err && typeof err === 'object') {
    const anyErr = err as { response?: { data?: { message?: string } }; message?: string };
    if (anyErr.response?.data?.message) {
      message = anyErr.response.data.message;
    } else if (anyErr.message?.includes('Network Error')) {
      message = 'Unable to connect to the agricultural server. Please verify your connection.';
    }
  }
  return message;
}

/**
 * Reusable hook to fetch and manage Farmer Dashboard data
 */
export function useFarmerDashboard(): UseFarmerDashboardResult {
  const [data, setData] = useState<FarmerDashboardData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    dashboardService
      .getFarmerDashboard()
      .then((result) => {
        if (isMounted) {
          setData(result);
          setIsLoading(false);
        }
      })
      .catch((err: unknown) => {
        if (isMounted) {
          setError(parseErrorMessage(err));
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const refetch = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await dashboardService.getFarmerDashboard();
      setData(result);
    } catch (err: unknown) {
      setError(parseErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    data,
    isLoading,
    error,
    refetch,
  };
}

export default useFarmerDashboard;
