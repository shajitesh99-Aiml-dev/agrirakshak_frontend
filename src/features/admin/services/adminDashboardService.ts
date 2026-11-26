/**
 * Admin Dashboard Service
 * Fetches platform-wide executive metrics, outbreaks, escalations, and recent cases.
 */

import { apiClient } from '../../../services/api';
import { AdminDashboardData, AnalyticsTimeRange } from '../../../types/analytics';
import { devAdmin } from '../devAdmin';

export const adminDashboardService = {
  async getDashboardData(range: AnalyticsTimeRange = '30d'): Promise<AdminDashboardData> {
    try {
      const response = await apiClient.get<{ success: boolean; data: AdminDashboardData }>(
        `/dashboard/admin?range=${encodeURIComponent(range)}`
      );
      if (response.data && response.data.data) {
        return response.data.data;
      }
      throw new Error('Malformed admin dashboard response');
    } catch (err) {
      if (import.meta.env.DEV) {
        // Safe development fallback
        return devAdmin.getDashboardData(range);
      }
      throw err;
    }
  },
};

export default adminDashboardService;
