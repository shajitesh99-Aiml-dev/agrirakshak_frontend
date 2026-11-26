import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { User, UserRole } from '../../types';
import { LoginRequest, RegisterRequest } from '../../types/auth';
import { authService } from '../../services/authService';
import { authStorage } from './authStorage';
import { AuthContext, AuthContextValue } from './AuthContext';
import { PageLoader } from '../../components/ui/PageLoader';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => authStorage.getUser());
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [initialized, setInitialized] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [sessionExpired, setSessionExpired] = useState<boolean>(false);

  // Initialize session state on app load
  useEffect(() => {
    let isMounted = true;

    async function initSession() {
      // Check if session was marked expired
      if (authStorage.consumeSessionExpiredFlag()) {
        if (isMounted) setSessionExpired(true);
      }

      const token = authStorage.getToken();
      if (!token) {
        if (isMounted) {
          setUser(null);
          setInitialized(true);
        }
        return;
      }

      try {
        const currentUser = await authService.getCurrentUser();
        if (isMounted) {
          setUser(currentUser);
        }
      } catch {
        // If token verification fails (e.g. invalid or expired), clear session
        authStorage.clearSession();
        if (isMounted) {
          setUser(null);
        }
      } finally {
        if (isMounted) {
          setInitialized(true);
        }
      }
    }

    initSession();

    // Listen for custom 401 session expiration event from Axios interceptor
    const handleSessionExpired = () => {
      if (isMounted) {
        setUser(null);
        setSessionExpired(true);
        setError('Your session has expired. Please sign in again.');
      }
    };

    window.addEventListener('agri_rakshak:session_expired', handleSessionExpired);

    return () => {
      isMounted = false;
      window.removeEventListener('agri_rakshak:session_expired', handleSessionExpired);
    };
  }, []);

  const clearError = useCallback(() => {
    setError(null);
    setSessionExpired(false);
  }, []);

  const login = useCallback(async (credentials: LoginRequest): Promise<User> => {
    setIsLoading(true);
    setError(null);
    setSessionExpired(false);

    try {
      const response = await authService.login(credentials);
      setUser(response.user);
      return response.user;
    } catch (err: unknown) {
      let message = 'Unable to sign in. Please verify your credentials.';
      if (err && typeof err === 'object') {
        const anyErr = err as { response?: { data?: { message?: string } }; message?: string };
        if (anyErr.response?.data?.message) {
          message = anyErr.response.data.message;
        } else if (anyErr.message?.includes('Network Error')) {
          message = 'Unable to connect right now. Please check your internet connection and try again.';
        }
      }
      setError(message);
      throw new Error(message, { cause: err });
    } finally {
      setIsLoading(false);
    }
  }, []);

  const register = useCallback(async (data: RegisterRequest): Promise<User> => {
    setIsLoading(true);
    setError(null);
    setSessionExpired(false);

    try {
      const response = await authService.register(data);
      setUser(response.user);
      return response.user;
    } catch (err: unknown) {
      let message = 'Registration could not be completed. Please try again.';
      if (err && typeof err === 'object') {
        const anyErr = err as { response?: { data?: { message?: string } }; message?: string };
        if (anyErr.response?.data?.message) {
          message = anyErr.response.data.message;
        } else if (anyErr.message?.includes('Network Error')) {
          message = 'Unable to connect right now. Please check your internet connection and try again.';
        }
      }
      setError(message);
      throw new Error(message, { cause: err });
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    try {
      await authService.logout();
    } finally {
      authStorage.clearSession();
      setUser(null);
      setError(null);
      setSessionExpired(false);
      setIsLoading(false);
    }
  }, []);

  const refreshUser = useCallback(async (): Promise<void> => {
    try {
      const refreshed = await authService.getCurrentUser();
      setUser(refreshed);
    } catch (err) {
      console.error('Failed to refresh user profile:', err);
    }
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      role: (user?.role as UserRole) || null,
      isAuthenticated: Boolean(user),
      isLoading,
      initialized,
      error,
      sessionExpired,
      login,
      register,
      logout,
      refreshUser,
      clearError,
    }),
    [user, isLoading, initialized, error, sessionExpired, login, register, logout, refreshUser, clearError]
  );

  // During initial session check, prevent flashing protected screens
  if (!initialized) {
    return <PageLoader message="Initializing Agri Rakshak session..." />;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
