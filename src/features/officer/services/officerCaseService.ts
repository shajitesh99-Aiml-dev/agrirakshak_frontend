import { api } from '../../../services/api';
import {
  OfficerCase,
  OfficerCaseFilter,
  SubmitReviewRequest,
  UpdateStatusRequest,
  CaseStatus,
} from '../types/officerTypes';
import { devOfficer } from '../devOfficer';
import axios from 'axios';

/**
 * Agricultural Officer Case Service
 * Communicates with backend endpoints:
 * - GET /api/v1/cases
 * - GET /api/v1/cases/:caseId
 * - PATCH /api/v1/cases/:caseId/status
 * - POST /api/v1/cases/:caseId/review
 */

export const officerCaseService = {
  /**
   * Fetch cases list for officer queue with optional filtering
   */
  async getCases(filter: OfficerCaseFilter = {}): Promise<OfficerCase[]> {
    try {
      const params = new URLSearchParams();
      if (filter.status && filter.status !== 'all') params.append('status', filter.status);
      if (filter.severity && filter.severity !== 'all') params.append('severity', filter.severity);
      if (filter.crop && filter.crop !== 'all') params.append('crop', filter.crop);
      if (filter.search) params.append('search', filter.search);

      const qs = params.toString() ? `?${params.toString()}` : '';
      const response = await api.get<{ cases: OfficerCase[] } | OfficerCase[]>(`/cases${qs}`);

      if (response && 'cases' in response && Array.isArray(response.cases)) {
        return response.cases;
      }
      if (Array.isArray(response)) {
        return response;
      }

      throw new Error('Unexpected format returned from case queue endpoint.');
    } catch (error) {
      if (devOfficer.isEnabled()) {
        return await devOfficer.getCases(filter);
      }
      throw error;
    }
  },

  /**
   * Fetch complete case details by case ID for officer workspace
   */
  async getCaseById(caseId: string): Promise<OfficerCase> {
    try {
      const response = await api.get<{ case: OfficerCase } | OfficerCase>(
        `/cases/${encodeURIComponent(caseId)}`
      );

      if (response && 'case' in response && response.case) {
        return response.case;
      }
      if (response && 'id' in response) {
        return response as OfficerCase;
      }

      throw new Error(`Case #${caseId} could not be retrieved from the server.`);
    } catch (error) {
      if (devOfficer.isEnabled()) {
        const found = await devOfficer.getCaseById(caseId);
        if (found) return found;
      }
      throw error;
    }
  },

  /**
   * Update case status with confirmation note
   * PATCH /api/v1/cases/:caseId/status
   */
  async updateCaseStatus(
    caseId: string,
    status: CaseStatus,
    note?: string
  ): Promise<OfficerCase> {
    try {
      const payload: UpdateStatusRequest = { status, note };
      const response = await api.patch<{ case: OfficerCase } | OfficerCase>(
        `/cases/${encodeURIComponent(caseId)}/status`,
        payload
      );

      if (response && 'case' in response && response.case) {
        return response.case;
      }
      if (response && 'id' in response) {
        return response as OfficerCase;
      }

      throw new Error('Failed to update case status on server.');
    } catch (error) {
      if (devOfficer.isEnabled()) {
        const isOffline =
          axios.isAxiosError(error) &&
          (!error.response || error.response.status === 404 || error.response.status >= 500);

        if (isOffline) {
          return await devOfficer.updateStatus(caseId, status, note);
        }
      }
      throw error;
    }
  },

  /**
   * Submit comprehensive officer review & advisory
   * POST /api/v1/cases/:caseId/review
   */
  async submitOfficerReview(
    caseId: string,
    review: SubmitReviewRequest
  ): Promise<OfficerCase> {
    try {
      const response = await api.post<{ case: OfficerCase } | OfficerCase>(
        `/cases/${encodeURIComponent(caseId)}/review`,
        review
      );

      if (response && 'case' in response && response.case) {
        return response.case;
      }
      if (response && 'id' in response) {
        return response as OfficerCase;
      }

      throw new Error('Failed to record officer review on server.');
    } catch (error) {
      if (devOfficer.isEnabled()) {
        const isOffline =
          axios.isAxiosError(error) &&
          (!error.response || error.response.status === 404 || error.response.status >= 500);

        if (isOffline) {
          return await devOfficer.submitReview(caseId, review);
        }
      }
      throw error;
    }
  },
};

export default officerCaseService;
