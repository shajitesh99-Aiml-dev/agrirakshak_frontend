import { useState, useEffect, useCallback } from 'react';
import { OfficerCase } from '../types/officerTypes';
import { officerCaseService } from '../services/officerCaseService';

export const useOfficerCase = (caseId?: string) => {
  const [caseData, setCaseData] = useState<OfficerCase | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(Boolean(caseId));
  const [error, setError] = useState<string | null>(caseId ? null : 'No Case ID provided.');

  useEffect(() => {
    if (!caseId) return;

    let isMounted = true;
    officerCaseService
      .getCaseById(caseId)
      .then((data) => {
        if (isMounted) {
          setCaseData(data);
          setError(null);
          setIsLoading(false);
        }
      })
      .catch((err: unknown) => {
        if (isMounted) {
          const msg = err instanceof Error ? err.message : `Unable to load case record #${caseId}.`;
          setError(msg);
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [caseId]);

  const refreshCase = useCallback(async () => {
    if (!caseId) return;
    setIsLoading(true);
    setError(null);
    try {
      const data = await officerCaseService.getCaseById(caseId);
      setCaseData(data);
    } catch (err) {
      const msg = err instanceof Error ? err.message : `Unable to load case record #${caseId}.`;
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  }, [caseId]);

  return {
    caseData,
    setCaseData,
    isLoading,
    error,
    refreshCase,
  };
};

export default useOfficerCase;
