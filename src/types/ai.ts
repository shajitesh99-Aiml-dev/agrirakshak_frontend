/**
 * Agri Rakshak - AI & Disease/Pest Detection Foundation Types
 * Phase 7: AI Disease/Pest Detection & Analysis Integration (Groq Server-Side)
 */

export type AIAnalysisStatus =
  | 'not_started'
  | 'queued'
  | 'processing'
  | 'completed'
  | 'failed';

export type AICategory = 'disease' | 'pest' | 'healthy' | 'unknown';

export type AISeverity = 'mild' | 'moderate' | 'severe' | 'unknown';

export interface AIPrediction {
  label: string;
  scientificName?: string;
  confidence?: number; // 0.0 to 1.0 (or percentage 0 to 100)
  category?: AICategory;
}

export interface AIAnalysisResult {
  status: AIAnalysisStatus;
  prediction?: AIPrediction;
  severity?: AISeverity;
  explanation?: string;
  observedSymptoms?: string[];
  possibleCauses?: string[];
  recommendations?: string[];
  warnings?: string[];
  requiresOfficerEscalation?: boolean;
  escalationReason?: string;
  analyzedAt?: string;
  isMock?: boolean;
}

export interface CaseAnalyzeRequest {
  caseId: string;
}

export interface CaseAnalyzeResponse {
  caseId: string;
  status: AIAnalysisStatus;
  analysis: AIAnalysisResult;
  message?: string;
}
