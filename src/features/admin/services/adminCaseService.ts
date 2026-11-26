/**
 * Admin Case Service
 * Provides governance-level query and inspection of statewide cases.
 */

import { apiClient } from '../../../services/api';
import { CropCase } from '../../../types';
import { AdminCaseFilter } from '../../../types/analytics';
import { devOfficer } from '../../officer/devOfficer';

export const adminCaseService = {
  async getCases(filter: AdminCaseFilter = {}): Promise<CropCase[]> {
    try {
      const params = new URLSearchParams();
      if (filter.status && filter.status !== 'all') params.append('status', filter.status);
      if (filter.severity && filter.severity !== 'all') params.append('severity', filter.severity);
      if (filter.crop && filter.crop !== 'all') params.append('crop', filter.crop);
      if (filter.district && filter.district !== 'all') params.append('district', filter.district);
      if (filter.search) params.append('search', filter.search);

      const qs = params.toString() ? `?${params.toString()}` : '';
      const response = await apiClient.get<{ success: boolean; cases: CropCase[] }>(`/cases${qs}`);

      if (response.data && Array.isArray(response.data.cases)) {
        return response.data.cases;
      }
      return [];
    } catch (err) {
      if (import.meta.env.DEV) {
        let list: CropCase[] = await devOfficer.getCases();
        if (filter.status && filter.status !== 'all') {
          list = list.filter((c: CropCase) => c.status === filter.status);
        }
        if (filter.severity && filter.severity !== 'all') {
          list = list.filter((c: CropCase) => c.severity === filter.severity || c.aiAnalysis?.severity === filter.severity);
        }
        if (filter.crop && filter.crop !== 'all') {
          list = list.filter((c: CropCase) => c.cropName.toLowerCase().includes(filter.crop!.toLowerCase()));
        }
        if (filter.district && filter.district !== 'all') {
          list = list.filter((c: CropCase) => Boolean(c.district?.toLowerCase().includes(filter.district!.toLowerCase())));
        }
        if (filter.search) {
          const q = filter.search.toLowerCase();
          list = list.filter(
            (c: CropCase) =>
              c.id.toLowerCase().includes(q) ||
              c.cropName.toLowerCase().includes(q) ||
              Boolean(c.farmerName?.toLowerCase().includes(q)) ||
              Boolean(c.village?.toLowerCase().includes(q)) ||
              Boolean(c.district?.toLowerCase().includes(q))
          );
        }
        return list;
      }
      throw err;
    }
  },

  async getCaseById(caseId: string): Promise<CropCase> {
    try {
      const response = await apiClient.get<{ success: boolean; case: CropCase }>(
        `/cases/${encodeURIComponent(caseId)}`
      );
      if (response.data && response.data.case) {
        return response.data.case;
      }
      throw new Error(`Case #${caseId} not found`);
    } catch (err) {
      if (import.meta.env.DEV) {
        const found = await devOfficer.getCaseById(caseId);
        if (found) return found;
      }
      throw err;
    }
  },
};

export default adminCaseService;
