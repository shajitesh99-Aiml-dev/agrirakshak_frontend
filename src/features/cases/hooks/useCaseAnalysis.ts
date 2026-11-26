import { useState, useCallback, useRef } from 'react';
import { AIAnalysisResult, AIAnalysisStatus } from '../../../types/ai';
import { caseAnalysisService, CaseAnalysisError } from '../services/caseAnalysisService';

interface UseCaseAnalysisOptions {
  caseId: string;
  initialAnalysis?: AIAnalysisResult | null;
  cropName?: string;
  symptoms?: string[];
  description?: string;
}

export interface UseCaseAnalysisReturn {
  analysis: AIAnalysisResult | null;
  status: AIAnalysisStatus;
  isLoading: boolean;
  isAnalyzing: boolean;
  error: string | null;
  canRetry: boolean;
  requestAnalysis: () => Promise<void>;
  refreshAnalysis: () => Promise<void>;
  resetError: () => void;
}

export const useCaseAnalysis = ({
  caseId,
  initialAnalysis = null,
  cropName,
  symptoms,
  description,
}: UseCaseAnalysisOptions): UseCaseAnalysisReturn => {
  const [analysis, setAnalysis] = useState<AIAnalysisResult | null>(initialAnalysis);
  const [status, setStatus] = useState<AIAnalysisStatus>(
    initialAnalysis?.status || 'not_started'
  );
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [canRetry, setCanRetry] = useState<boolean>(true);

  // In-flight locking ref to strictly prevent duplicate simultaneous requests
  const isExecutingRef = useRef<boolean>(false);

  const performAnalysis = useCallback(async () => {
    // Prevent duplicate calls if already in-flight
    if (isExecutingRef.current || !caseId) {
      return;
    }

    isExecutingRef.current = true;
    setIsAnalyzing(true);
    setStatus('processing');
    setError(null);

    try {
      const result = await caseAnalysisService.requestCaseAnalysis(caseId, {
        cropName,
        symptoms,
        description,
      });

      setAnalysis(result);
      setStatus(result.status || 'completed');
      setError(null);
    } catch (err: unknown) {
      const parsedError = err as CaseAnalysisError;
      setStatus('failed');
      setError(parsedError.message || 'Unable to complete AI analysis at this time.');
      setCanRetry(parsedError.canRetry !== false);
    } finally {
      setIsAnalyzing(false);
      isExecutingRef.current = false;
    }
  }, [caseId, cropName, symptoms, description]);

  const requestAnalysis = useCallback(async () => {
    // If already processing or completed, do not trigger duplicate
    if (status === 'processing' || isAnalyzing) {
      return;
    }
    await performAnalysis();
  }, [status, isAnalyzing, performAnalysis]);

  const refreshAnalysis = useCallback(async () => {
    await performAnalysis();
  }, [performAnalysis]);

  const resetError = useCallback(() => {
    setError(null);
    setStatus('not_started');
  }, []);

  return {
    analysis,
    status,
    isLoading: isAnalyzing,
    isAnalyzing,
    error,
    canRetry,
    requestAnalysis,
    refreshAnalysis,
    resetError,
  };
};

export default useCaseAnalysis;
