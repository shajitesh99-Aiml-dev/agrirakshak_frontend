import { useState, useCallback } from 'react';
import { CropCase } from '../../../types';
import { CaseFormData } from '../types/caseFormTypes';
import { caseService } from '../../../services/caseService';

export interface UseCreateCaseResult {
  submitCase: (data: CaseFormData) => Promise<CropCase>;
  isSubmitting: boolean;
  error: string | null;
  createdCase: CropCase | null;
  reset: () => void;
}

/**
 * Reusable hook to handle crop case creation lifecycle
 */
export function useCreateCase(): UseCreateCaseResult {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [createdCase, setCreatedCase] = useState<CropCase | null>(null);

  const reset = useCallback(() => {
    setIsSubmitting(false);
    setError(null);
    setCreatedCase(null);
  }, []);

  const submitCase = useCallback(
    async (formData: CaseFormData): Promise<CropCase> => {
      // Prevent duplicate submission while already processing
      if (isSubmitting) {
        throw new Error('Case submission is already in progress.');
      }

      setIsSubmitting(true);
      setError(null);

      try {
        const result = await caseService.createCase(formData);
        setCreatedCase(result);
        return result;
      } catch (err: unknown) {
        let message = 'Unable to submit your crop problem report. Please check your connection and try again.';
        if (err && typeof err === 'object') {
          const anyErr = err as { response?: { data?: { message?: string } }; message?: string };
          if (anyErr.response?.data?.message) {
            message = anyErr.response.data.message;
          } else if (anyErr.message?.includes('Network Error')) {
            message = 'Your report could not be submitted because the network connection was interrupted.';
          }
        }
        setError(message);
        throw new Error(message, { cause: err });
      } finally {
        setIsSubmitting(false);
      }
    },
    [isSubmitting]
  );

  return {
    submitCase,
    isSubmitting,
    error,
    createdCase,
    reset,
  };
}

export default useCreateCase;
