import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../features/auth';
import { ROUTES } from './routeConfig';
import PageLoader from '../components/ui/PageLoader';

export interface ProtectedRouteProps {
  children: React.ReactNode;
}

/**
 * Route protection guard connected to central AuthProvider.
 * Redirects unauthenticated users to /auth/login with the return destination preserved.
 * Client-side check provides seamless UX; authoritative authorization is enforced by the backend.
 */
export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, initialized, isLoading } = useAuth();
  const location = useLocation();

  if (!initialized || isLoading) {
    return <PageLoader message="Verifying authentication session..." fullScreen />;
  }

  if (!isAuthenticated) {
    // Preserve requested route safely in state
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
