import { createContext } from 'react';
import { User } from '../../types';
import { AuthState, LoginRequest, RegisterRequest } from '../../types/auth';

export interface AuthContextValue extends AuthState {
  login: (credentials: LoginRequest) => Promise<User>;
  register: (data: RegisterRequest) => Promise<User>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  clearError: () => void;
}

export const AuthContext = createContext<AuthContextValue | null>(null);
