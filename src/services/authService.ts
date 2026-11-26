import { api } from './api';
import { authStorage } from '../features/auth/authStorage';
import { devAuth } from '../features/auth/devAuth';
import { User } from '../types';
import { AuthResponse, LoginRequest, RegisterRequest } from '../types/auth';

/**
 * Authentication Service
 * Centralizes all frontend authentication network operations.
 * Communicates with the backend using the centralized Axios client `api`.
 * Provides seamless fallback to isolated devAuth in local dev mode if backend is offline.
 */
export const authService = {
  /**
   * Log in user with credentials.
   * Calls POST /api/v1/auth/login
   */
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    try {
      const response = await api.post<AuthResponse>('/auth/login', credentials);
      if (response && response.token) {
        authStorage.setToken(response.token);
        if (response.user) {
          authStorage.setUser(response.user);
        }
      }
      return response;
    } catch (error) {
      // If in development mode and backend is not responding or 404/network error,
      // fallback cleanly to isolated dev adapter for demo accounts
      if (devAuth.isEnabled()) {
        const mockRes = await devAuth.mockLogin(credentials);
        if (mockRes) {
          authStorage.setToken(mockRes.token);
          authStorage.setUser(mockRes.user);
          return mockRes;
        }
      }
      throw error;
    }
  },

  /**
   * Register a new user (farmer self-registration).
   * Calls POST /api/v1/auth/register
   */
  async register(data: RegisterRequest): Promise<AuthResponse> {
    try {
      const response = await api.post<AuthResponse>('/auth/register', data);
      if (response && response.token) {
        authStorage.setToken(response.token);
        if (response.user) {
          authStorage.setUser(response.user);
        }
      }
      return response;
    } catch (error) {
      if (devAuth.isEnabled()) {
        const mockRes = await devAuth.mockRegister(data);
        if (mockRes) {
          authStorage.setToken(mockRes.token);
          authStorage.setUser(mockRes.user);
          return mockRes;
        }
      }
      throw error;
    }
  },

  /**
   * Fetch current user profile.
   * Calls GET /api/v1/auth/me
   */
  async getCurrentUser(): Promise<User> {
    try {
      const response = await api.get<{ user: User }>('/auth/me');
      if (response?.user) {
        authStorage.setUser(response.user);
        return response.user;
      }
      throw new Error('Invalid user response format');
    } catch (error) {
      // In dev mode, check if we have a dev token
      const token = authStorage.getToken();
      if (token && devAuth.isEnabled()) {
        const mockUser = await devAuth.mockGetCurrentUser(token);
        if (mockUser) {
          authStorage.setUser(mockUser);
          return mockUser;
        }
      }
      throw error;
    }
  },

  /**
   * Log out user.
   * Best-effort notification to backend, cleans up centralized storage.
   */
  async logout(): Promise<void> {
    try {
      await api.post('/auth/logout');
    } catch {
      // Best-effort logout: ignore network failures during signout
    } finally {
      authStorage.clearSession();
    }
  },
};

export default authService;
