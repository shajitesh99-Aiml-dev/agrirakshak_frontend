import { CropCase, CaseStatus, SeverityLevel } from '../../../types';

export type ReportStep = 1 | 2 | 3 | 4;

export interface UploadedImageItem {
  id: string;
  file: File;
  previewUrl: string;
  name: string;
  size: number;
}

export interface CaseFormData {
  // Step 1: Crop & Location
  cropName: string;
  cropCategory?: string;
  cultivationStage?: string;
  village: string;
  district: string;
  state: string;
  fieldNotes?: string;

  // Step 2: Problem & Symptoms
  problemDescription: string;
  symptoms: string[];
  severity?: 'low' | 'moderate' | 'high';

  // Step 3: Photos
  images: UploadedImageItem[];

  // Step 4: Consent & Submission
  consent: boolean;
}

export interface CreateCaseRequest {
  cropName: string;
  cropCategory?: string;
  cultivationStage?: string;
  description: string;
  symptoms?: string[];
  severity?: SeverityLevel;
  village?: string;
  district?: string;
  state?: string;
  fieldNotes?: string;
  imageUrls?: string[];
  consent: boolean;
}

export interface CreateCaseResponse {
  case: CropCase;
  message?: string;
}

export { type CaseStatus, type SeverityLevel };
