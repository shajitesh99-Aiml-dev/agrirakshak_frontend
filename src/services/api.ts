import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { authStorage } from '../features/auth/authStorage';

/**
 * Base URL for the Agri Rakshak backend API.
 * Defaults to http://localhost:8000/api/v1 in development.
 */
export const API_BASE_URL =
  (import.meta.env.VITE_API_BASE_URL as string) || 'http://localhost:8000/api/v1';

/**
 * Central Axios instance configured with defaults for Agri Rakshak.
 * Ready for authentication headers, case management, and AI detection APIs.
 */
export const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 20000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Request interceptor: Injects bearer access token from centralized storage
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = authStorage.getToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor: Handles 401 unauthorized & session expiration
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear local session credentials
      authStorage.clearSession();
      authStorage.setSessionExpiredFlag(true);

      // Notify AuthProvider via event
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('agri_rakshak:session_expired'));

        // Avoid redirect loops if already on login/register
        const currentPath = window.location.pathname;
        if (!currentPath.startsWith('/auth/')) {
          window.location.href = `/auth/login?expired=1`;
        }
      }
    }
    return Promise.reject(error);
  }
);

/**
 * Generic API helper wrapper for making standardized typed requests
 */
export const api = {
  get: <T>(url: string, config?: AxiosRequestConfig) =>
    apiClient.get<T>(url, config).then((res) => res.data),
  post: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
    apiClient.post<T>(url, data, config).then((res) => res.data),
  put: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
    apiClient.put<T>(url, data, config).then((res) => res.data),
  patch: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
    apiClient.patch<T>(url, data, config).then((res) => res.data),
  delete: <T>(url: string, config?: AxiosRequestConfig) =>
    apiClient.delete<T>(url, config).then((res) => res.data),
};

export default apiClient;
