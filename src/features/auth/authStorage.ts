import { User } from '../../types';

const TOKEN_KEY = 'agri_rakshak_auth_token';
const USER_KEY = 'agri_rakshak_auth_user';
const SESSION_EXPIRY_KEY = 'agri_rakshak_session_expired';

/**
 * Centralized authentication storage abstraction.
 * Isolates local token and user caching behind a single contract,
 * allowing future transitions to HTTP-only cookies without touching UI components.
 */
export const authStorage = {
  getToken: (): string | null => {
    if (typeof window === 'undefined') return null;
    try {
      return localStorage.getItem(TOKEN_KEY);
    } catch {
      return null;
    }
  },

  setToken: (token: string): void => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(TOKEN_KEY, token);
    } catch {
      // Storage unavailable or quota exceeded
    }
  },

  removeToken: (): void => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.removeItem(TOKEN_KEY);
    } catch {
      // Storage unavailable
    }
  },

  getUser: (): User | null => {
    if (typeof window === 'undefined') return null;
    try {
      const raw = localStorage.getItem(USER_KEY);
      return raw ? (JSON.parse(raw) as User) : null;
    } catch {
      return null;
    }
  },

  setUser: (user: User): void => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    } catch {
      // Storage unavailable
    }
  },

  removeUser: (): void => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.removeItem(USER_KEY);
    } catch {
      // Storage unavailable
    }
  },

  setSessionExpiredFlag: (expired: boolean): void => {
    if (typeof window === 'undefined') return;
    try {
      if (expired) {
        sessionStorage.setItem(SESSION_EXPIRY_KEY, 'true');
      } else {
        sessionStorage.removeItem(SESSION_EXPIRY_KEY);
      }
    } catch {
      // Session storage unavailable
    }
  },

  consumeSessionExpiredFlag: (): boolean => {
    if (typeof window === 'undefined') return false;
    try {
      const flag = sessionStorage.getItem(SESSION_EXPIRY_KEY) === 'true';
      if (flag) {
        sessionStorage.removeItem(SESSION_EXPIRY_KEY);
      }
      return flag;
    } catch {
      return false;
    }
  },

  clearSession: (): void => {
    authStorage.removeToken();
    authStorage.removeUser();
  },

  hasSession: (): boolean => {
    return Boolean(authStorage.getToken());
  },
};

export default authStorage;
