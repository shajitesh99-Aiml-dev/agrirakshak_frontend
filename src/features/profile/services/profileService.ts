import { api } from '../../../services/api';
import { authStorage } from '../../auth/authStorage';
import { devAuth, DEV_MOCK_USERS } from '../../auth/devAuth';
import { User } from '../../../types';

export interface UpdateProfileInput {
  name?: string;
  phone?: string;
  village?: string;
  district?: string;
  state?: string;
  preferred_language?: string;
  preferredLanguage?: string;
  farmSizeAcres?: number;
  assignedJurisdiction?: string;
  department?: string;
}

/**
 * Profile Service
 * Manages user profile fetching and updating.
 * Communicates with backend when endpoints exist, with an explicit development
 * fallback under import.meta.env.DEV if the backend route is unavailable.
 */
export const profileService = {
  /**
   * Fetch currently logged-in user profile
   */
  async getProfile(): Promise<User> {
    try {
      const response = await api.get<{ user: User }>('/profile');
      if (response?.user) {
        authStorage.setUser(response.user);
        return response.user;
      }
    } catch {
      // Backend /api/v1/profile may not exist yet, fallback to stored user or dev user
    }

    const cached = authStorage.getUser();
    if (cached) return cached;

    // Fallback to dev auth mock if available
    if (devAuth.isEnabled()) {
      const token = authStorage.getToken();
      if (token) {
        const mock = await devAuth.mockGetCurrentUser(token);
        if (mock) {
          authStorage.setUser(mock);
          return mock;
        }
      }
    }

    throw new Error('No authenticated profile found');
  },

  /**
   * Update profile fields supported by the system
   */
  async updateProfile(data: UpdateProfileInput): Promise<User> {
    try {
      const response = await api.patch<{ user: User; message?: string }>('/profile', data);
      if (response?.user) {
        authStorage.setUser(response.user);
        return response.user;
      }
    } catch (err: unknown) {
      // If endpoint returns a true 4xx client validation error, bubble it up
      if (err && typeof err === 'object') {
        const axErr = err as { response?: { status?: number; data?: { message?: string } } };
        if (axErr.response?.status && [400, 401, 403, 409, 422].includes(axErr.response.status)) {
          throw new Error(axErr.response.data?.message || 'Profile update failed.', { cause: err });
        }
      }

      // Development fallback under import.meta.env.DEV when backend route is 404 or unconfigured
      if (import.meta.env.DEV) {
        const currentUser = authStorage.getUser() || (await this.getProfile());
        const updated: User = {
          ...currentUser,
          ...data,
          // Harmonize preferred language properties
          preferred_language: data.preferred_language || data.preferredLanguage || currentUser.preferred_language,
          preferredLanguage: data.preferredLanguage || data.preferred_language || currentUser.preferredLanguage,
        } as User;

        // Persist in client authStorage
        authStorage.setUser(updated);

        // Also sync devMockUsers cache if available
        if (updated.email && DEV_MOCK_USERS[updated.email]) {
          DEV_MOCK_USERS[updated.email].user = updated;
        }

        // Simulate network delay
        await new Promise((res) => setTimeout(res, 300));
        return updated;
      }

      throw new Error('Backend profile update service is unavailable.', { cause: err });
    }

    throw new Error('Unexpected profile update state.');
  },
};

export default profileService;
