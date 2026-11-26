import { api } from './api';
import { FarmerDashboardData } from '../types/dashboard';
import { devDashboard } from '../features/dashboard/devDashboard';

/**
 * Dashboard Service
 * Centralizes all dashboard API communications for Agri Rakshak.
 * Uses central Axios client `api`.
 * Provides seamless fallback to isolated devDashboard in local dev mode when backend is offline.
 */
export const dashboardService = {
  /**
   * Fetches farmer dashboard overview data
   * GET /api/v1/dashboard/farmer
   */
  async getFarmerDashboard(): Promise<FarmerDashboardData> {
    try {
      // Backend may return direct data or wrapped in { success: true, data: ... }
      const response = await api.get<FarmerDashboardData | { data: FarmerDashboardData }>(
        '/dashboard/farmer'
      );

      if (response && 'data' in response && response.data) {
        return response.data as FarmerDashboardData;
      }

      if (response && 'summary' in response) {
        return response as FarmerDashboardData;
      }

      throw new Error('Invalid dashboard data structure received from server');
    } catch (error) {
      // If running locally in development mode and API is offline/404, fallback to isolated mock
      if (devDashboard.isEnabled()) {
        return await devDashboard.getMockFarmerDashboard();
      }
      throw error;
    }
  },
};

export default dashboardService;
