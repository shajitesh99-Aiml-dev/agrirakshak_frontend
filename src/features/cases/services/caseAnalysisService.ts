import { api } from '../../../services/api';
import { AIAnalysisResult, CaseAnalyzeResponse } from '../../../types/ai';
import { devAnalysis } from '../devAnalysis';
import axios from 'axios';

/**
 * Case Analysis Service
 * Phase 7: AI Disease/Pest Detection & Analysis Integration
 *
 * Communicates ONLY with Agri Rakshak Backend:
 * POST /api/v1/cases/:caseId/analyze
 *
 * Strict Security Constraints:
 * - Uses existing Axios instance with Phase 4 JWT Bearer interceptor
 * - Never makes direct browser-to-Groq requests
 * - Never exposes Groq secrets, tokens, or raw provider errors
 */

export interface CaseAnalysisError {
  message: string;
  statusCode?: number;
  canRetry: boolean;
}

export const caseAnalysisService = {
  /**
   * Request AI analysis for an existing crop case.
   * Calls POST /api/v1/cases/{caseId}/analyze
   */
  async requestCaseAnalysis(
    caseId: string,
    metadataFallback?: {
      cropName?: string;
      symptoms?: string[];
      description?: string;
    }
  ): Promise<AIAnalysisResult> {
    try {
      // POST /cases/:caseId/analyze
      const response = await api.post<
        | CaseAnalyzeResponse
        | { data: CaseAnalyzeResponse }
        | { analysis: AIAnalysisResult }
        | AIAnalysisResult
      >(`/cases/${encodeURIComponent(caseId)}/analyze`);

      return this.normalizeAnalysisResponse(response);
    } catch (error: unknown) {
      // If running in development and backend is offline/404, fallback cleanly to dev mock
      if (devAnalysis.isEnabled()) {
        const isNetworkOrNotFound =
          axios.isAxiosError(error) &&
          (!error.response || error.response.status === 404 || error.response.status === 502);

        if (isNetworkOrNotFound) {
          return await devAnalysis.mockAnalyzeCase(caseId, metadataFallback);
        }
      }

      throw this.normalizeError(error);
    }
  },

  /**
   * Normalize flexible backend response formats into typed AIAnalysisResult
   */
  normalizeAnalysisResponse(raw: unknown): AIAnalysisResult {
    if (!raw || typeof raw !== 'object') {
      throw new Error('Invalid analysis response format from Agri Rakshak server.');
    }

    const obj = raw as Record<string, unknown>;

    // Case 1: Wrapped in response.data.analysis
    if (obj.data && typeof obj.data === 'object') {
      const dataObj = obj.data as Record<string, unknown>;
      if (dataObj.analysis) {
        return dataObj.analysis as AIAnalysisResult;
      }
      if (dataObj.status) {
        return dataObj as unknown as AIAnalysisResult;
      }
    }

    // Case 2: Wrapped in response.analysis
    if (obj.analysis && typeof obj.analysis === 'object') {
      return obj.analysis as AIAnalysisResult;
    }

    // Case 3: Flat AIAnalysisResult
    if (obj.status) {
      return obj as unknown as AIAnalysisResult;
    }

    throw new Error('Unable to extract structured AI analysis from server response.');
  },

  /**
   * Translates HTTP and network errors into farmer-friendly, non-technical explanations
   */
  normalizeError(error: unknown): CaseAnalysisError {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      const serverMessage = error.response?.data?.message;

      switch (status) {
        case 400:
          return {
            message: serverMessage || 'This crop case does not have sufficient information or photos for AI analysis.',
            statusCode: 400,
            canRetry: false,
          };
        case 401:
          return {
            message: 'Your session has expired. Please sign in again to continue.',
            statusCode: 401,
            canRetry: false,
          };
        case 403:
          return {
            message: 'You do not have permission to request analysis for this case.',
            statusCode: 403,
            canRetry: false,
          };
        case 404:
          return {
            message: 'Crop case not found on the server. Please verify the case ID.',
            statusCode: 404,
            canRetry: false,
          };
        case 409:
          return {
            message: 'AI analysis is already currently processing for this case. Please wait a moment.',
            statusCode: 409,
            canRetry: true,
          };
        case 413:
          return {
            message: 'Uploaded crop photos exceed maximum processing size. Please submit smaller images.',
            statusCode: 413,
            canRetry: false,
          };
        case 422:
          return {
            message: serverMessage || 'Case information could not be validated for diagnostic evaluation.',
            statusCode: 422,
            canRetry: true,
          };
        case 429:
          return {
            message: 'The AI diagnostic service is temporarily busy. Please wait a moment and try again.',
            statusCode: 429,
            canRetry: true,
          };
        case 500:
        case 502:
        case 503:
          return {
            message: 'The Agri Rakshak diagnostic service is currently unavailable. Please try again shortly.',
            statusCode: status,
            canRetry: true,
          };
        default:
          return {
            message: 'Network connection issue. Please check your internet connection and try again.',
            statusCode: status,
            canRetry: true,
          };
      }
    }

    if (error instanceof Error) {
      return {
        message: error.message,
        canRetry: true,
      };
    }

    return {
      message: 'An unexpected issue occurred while analyzing the crop problem.',
      canRetry: true,
    };
  },
};

export default caseAnalysisService;
