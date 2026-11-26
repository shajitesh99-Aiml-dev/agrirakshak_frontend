import { useState, useEffect, useCallback } from 'react';
import { OfficerCase, OfficerCaseFilter } from '../types/officerTypes';
import { officerCaseService } from '../services/officerCaseService';

export const useOfficerCases = (initialFilter: OfficerCaseFilter = { status: 'all' }) => {
  const [cases, setCases] = useState<OfficerCase[]>([]);
  const [filter, setFilter] = useState<OfficerCaseFilter>(initialFilter);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    officerCaseService
      .getCases(filter)
      .then((list) => {
        if (isMounted) {
          setCases(list);
          setError(null);
          setIsLoading(false);
        }
      })
      .catch((err: unknown) => {
        if (isMounted) {
          const msg = err instanceof Error ? err.message : 'Unable to load officer cases queue.';
          setError(msg);
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [filter]);

  const updateFilter = useCallback((newFilterPartial: Partial<OfficerCaseFilter>) => {
    setIsLoading(true);
    setFilter((prev) => ({ ...prev, ...newFilterPartial }));
  }, []);

  const refreshCases = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const list = await officerCaseService.getCases(filter);
      setCases(list);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Unable to load officer cases queue.';
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

export default useOfficerCases;
