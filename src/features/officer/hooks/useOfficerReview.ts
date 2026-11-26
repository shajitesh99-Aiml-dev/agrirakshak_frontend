import { useState, useCallback, useRef } from 'react';
import { OfficerCase, SubmitReviewRequest } from '../types/officerTypes';
import { officerCaseService } from '../services/officerCaseService';

interface UseOfficerReviewOptions {
  onSuccess?: (updatedCase: OfficerCase) => void;
  onError?: (error: string) => void;
}

export const useOfficerReview = (options: UseOfficerReviewOptions = {}) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const isExecutingRef = useRef<boolean>(false);

  const submitReview = useCallback(
    async (caseId: string, review: SubmitReviewRequest): Promise<OfficerCase | null> => {
      if (isExecutingRef.current || !caseId) return null;

      isExecutingRef.current = true;
      setIsSubmitting(true);
      setError(null);

      try {
        const updated = await officerCaseService.submitOfficerReview(caseId, review);
        if (options.onSuccess) options.onSuccess(updated);
        return updated;
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'Failed to submit officer review.';
        setError(msg);
        if (options.onError) options.onError(msg);
        return null;
      } finally {
        setIsSubmitting(false);
        isExecutingRef.current = false;
      }
    },
    [options]
  );

  return {
    isSubmitting,
    error,
    submitReview,
    resetError: () => setError(null),
  };
};

export default useOfficerReview;
