/**
 * Admin User Directory Service
 * Fetches user statistics and officer caseload allocations.
 */

import { apiClient } from '../../../services/api';
import { AdminUserSummary } from '../../../types/analytics';
import { devAdmin } from '../devAdmin';

export const adminUserService = {
  async getUsers(): Promise<AdminUserSummary> {
    try {
      const response = await apiClient.get<{ success: boolean; data: AdminUserSummary }>(
        '/admin/users'
      );
      if (response.data && response.data.data) {
        return response.data.data;
      }
      throw new Error('Malformed users response from server');
    } catch (err) {
      if (import.meta.env.DEV) {
        return devAdmin.getUsers();
      }
      throw err;
    }
  },
};

export default adminUserService;
