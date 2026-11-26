import { useState, useEffect, useCallback } from 'react';
import { CropCase } from '../../../types';
import { AdminCaseFilter } from '../../../types/analytics';
import { adminCaseService } from '../services/adminCaseService';

export const useAdminCases = (initialFilter: AdminCaseFilter = {}) => {
  const [cases, setCases] = useState<CropCase[]>([]);
  const [filter, setFilter] = useState<AdminCaseFilter>(initialFilter);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    adminCaseService
      .getCases(filter)
      .then((res) => {
        if (isMounted) {
          setCases(res);
          setError(null);
          setIsLoading(false);
        }
      })
      .catch((err: unknown) => {
        if (isMounted) {
          const msg = err instanceof Error ? err.message : 'Unable to load governance cases.';
          setError(msg);
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [filter]);

  const updateFilter = useCallback((newPartial: Partial<AdminCaseFilter>) => {
    setIsLoading(true);
    setFilter((prev) => ({ ...prev, ...newPartial }));
  }, []);

  const refreshCases = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await adminCaseService.getCases(filter);
      setCases(res);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Unable to refresh governance cases.';
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  }, [filter]);

  return {
    cases,
    filter,
    setFilter,
    updateFilter,
    isLoading,
    error,
    refreshCases,
  };
};

export default useAdminCases;
