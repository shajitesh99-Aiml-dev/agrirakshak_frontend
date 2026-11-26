/**
 * Hotspot & Outbreak Surveillance Service
 * Fetches geo-referenced regional hotspots and outbreak alert triggers.
 */

import { apiClient } from '../../../services/api';
import { Hotspot, OutbreakAlert } from '../../../types/analytics';
import { devAdmin } from '../devAdmin';

export interface HotspotsResponse {
  hotspots: Hotspot[];
  alerts: OutbreakAlert[];
}

export const hotspotService = {
  async getHotspots(): Promise<HotspotsResponse> {
    try {
      const response = await apiClient.get<{ success: boolean; data: HotspotsResponse }>(
        '/analytics/hotspots'
      );
      if (response.data && response.data.data) {
        return response.data.data;
      }
      throw new Error('Malformed hotspot response from server');
    } catch (err) {
      if (import.meta.env.DEV) {
        return devAdmin.getHotspots();
      }
      throw err;
    }
  },
};

export default hotspotService;
