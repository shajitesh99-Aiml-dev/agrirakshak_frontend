import { UserRole, User } from './index';

export type { UserRole };

export type AuthUser = User;

export interface LoginRequest {
  emailOrPhone: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterRequest {
  name: string;
  emailOrPhone: string;
  password: string;
  confirmPassword: string;
  role?: UserRole;
  consent: boolean;
  village?: string;
  district?: string;
  state?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken?: string;
  message?: string;
}

export interface AuthState {
  user: User | null;
  role: UserRole | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  initialized: boolean;
  error: string | null;
  sessionExpired: boolean;
}
