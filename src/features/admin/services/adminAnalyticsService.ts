/**
 * Admin Analytics Service
 * Provides aggregate time-series, disease, pest, crop, severity, and district metrics.
 */

import { apiClient } from '../../../services/api';
import { AnalyticsOverviewData, AnalyticsTimeRange } from '../../../types/analytics';
import { devAdmin } from '../devAdmin';

export const adminAnalyticsService = {
  async getAnalyticsOverview(range: AnalyticsTimeRange = '30d'): Promise<AnalyticsOverviewData> {
    try {
      const response = await apiClient.get<{ success: boolean; data: AnalyticsOverviewData }>(
        `/analytics/overview?range=${encodeURIComponent(range)}`
      );
      if (response.data && response.data.data) {
        return response.data.data;
      }
      throw new Error('Malformed analytics response from server');
    } catch (err) {
      if (import.meta.env.DEV) {
        return devAdmin.getAnalyticsData(range);
      }
      throw err;
    }
  },
};

export default adminAnalyticsService;
