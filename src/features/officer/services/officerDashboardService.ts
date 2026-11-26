import { api } from '../../../services/api';
import { OfficerDashboardData } from '../types/officerTypes';
import { devOfficer } from '../devOfficer';

/**
 * Agricultural Officer Dashboard Service
 * Endpoint: GET /api/v1/dashboard/officer
 */

export const officerDashboardService = {
  async getDashboardData(): Promise<OfficerDashboardData> {
    try {
      const response = await api.get<{ data: OfficerDashboardData } | OfficerDashboardData>(
        '/dashboard/officer'
      );

      if (response && 'data' in response && response.data) {
        return response.data;
      }
      if (response && 'summary' in response) {
        return response as OfficerDashboardData;
      }

      throw new Error('Unexpected format returned from officer dashboard endpoint.');
    } catch (error) {
      if (devOfficer.isEnabled()) {
        return await devOfficer.getDashboardData();
      }
      throw error;
    }
  },
};

export default officerDashboardService;
