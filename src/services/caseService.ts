import { api } from './api';
import { CropCase } from '../types';
import { CaseFormData, CreateCaseRequest } from '../features/cases/types/caseFormTypes';
import { devCases } from '../features/cases/devCases';

/**
 * Case Service
 * Centralizes all crop case submission and retrieval network operations.
 * Communicates with backend using the central Axios client.
 */
export const caseService = {
  /**
   * Transforms frontend form model into standardized backend API request payload
   */
  mapFormToRequest(formData: CaseFormData): CreateCaseRequest {
    // Collect preview or object URLs for reference
    const imageUrls = formData.images.map((img) => img.previewUrl);

    return {
      cropName: formData.cropName,
      cropCategory: formData.cropCategory,
      cultivationStage: formData.cultivationStage,
      description: formData.problemDescription,
      symptoms: formData.symptoms,
      severity: formData.severity,
      village: formData.village,
      district: formData.district,
      state: formData.state,
      fieldNotes: formData.fieldNotes,
      imageUrls: imageUrls.length > 0 ? imageUrls : undefined,
      consent: formData.consent,
    };
  },

  /**
   * Submit new crop problem report to create a case.
   * POST /api/v1/cases
   */
  async createCase(formData: CaseFormData): Promise<CropCase> {
    const payload = this.mapFormToRequest(formData);

    try {
      // Backend may accept JSON or multipart form data; standard contract is POST /cases
      const response = await api.post<CropCase | { data: CropCase } | { case: CropCase }>(
        '/cases',
        payload
      );

      // Support common response wrappers
      if (response && 'data' in response && response.data) {
        return response.data as CropCase;
      }
      if (response && 'case' in response && response.case) {
        return response.case as CropCase;
      }
      if (response && 'id' in response) {
        return response as CropCase;
      }

      throw new Error('Unexpected response format returned from case creation service.');
    } catch (error) {
      // In development mode, if server is offline or 404, fallback to isolated mock
      if (devCases.isEnabled()) {
        return await devCases.mockCreateCase(payload);
      }
      throw error;
    }
  },

  /**
   * Fetch an existing crop case by its tracking ID.
   * GET /api/v1/cases/:caseId
   */
  async getCaseById(caseId: string): Promise<CropCase | null> {
    try {
      const response = await api.get<CropCase | { data: CropCase } | { case: CropCase }>(
        `/cases/${encodeURIComponent(caseId)}`
      );

      if (response && 'data' in response && response.data) {
        return response.data as CropCase;
      }
      if (response && 'case' in response && response.case) {
        return response.case as CropCase;
      }
      if (response && 'id' in response) {
        return response as CropCase;
      }

      throw new Error('Unexpected response format received when fetching case.');
    } catch (error) {
      if (devCases.isEnabled()) {
        return await devCases.getMockCaseById(caseId);
      }
      throw error;
    }
  },
};

export default caseService;
