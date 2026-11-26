import { useState, useCallback, useRef } from 'react';
import { OfficerCase, CaseStatus } from '../types/officerTypes';
import { officerCaseService } from '../services/officerCaseService';

interface UseUpdateCaseStatusOptions {
  onSuccess?: (updatedCase: OfficerCase) => void;
  onError?: (error: string) => void;
}

export const useUpdateCaseStatus = (options: UseUpdateCaseStatusOptions = {}) => {
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const isExecutingRef = useRef<boolean>(false);

  const updateStatus = useCallback(
    async (caseId: string, status: CaseStatus, note?: string): Promise<OfficerCase | null> => {
      if (isExecutingRef.current || !caseId) return null;

      isExecutingRef.current = true;
      setIsUpdating(true);
      setError(null);

      try {
        const updated = await officerCaseService.updateCaseStatus(caseId, status, note);
        if (options.onSuccess) options.onSuccess(updated);
        return updated;
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'Failed to update case status.';
        setError(msg);
        if (options.onError) options.onError(msg);
        return null;
      } finally {
        setIsUpdating(false);
        isExecutingRef.current = false;
      }
    },
    [options]
  );

  return {
    isUpdating,
    error,
    updateStatus,
    resetError: () => setError(null),
  };
};

export default useUpdateCaseStatus;
