import { useContext } from 'react';
import { AuthContext, AuthContextValue } from './AuthContext';

/**
 * Custom hook to access Agri Rakshak authentication state and methods
 */
export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default useAuth;
