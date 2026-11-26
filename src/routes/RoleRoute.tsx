import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { UserRole } from '../types';
import { useAuth } from '../features/auth';
import { ROUTES } from './routeConfig';

export interface RoleRouteProps {
  children: React.ReactNode;
  allowedRoles: UserRole[];
}

/**
 * Role-aware route guard connected to AuthProvider.
 * Validates whether the active authenticated user role belongs to allowedRoles.
 * If unauthorized, redirects to /unauthorized with contextual information.
 */
export const RoleRoute: React.FC<RoleRouteProps> = ({ children, allowedRoles }) => {
  const { role } = useAuth();
  const location = useLocation();

  const hasPermission = Boolean(role && allowedRoles.includes(role));

  if (!hasPermission) {
    return (
      <Navigate
        to={ROUTES.UNAUTHORIZED}
        state={{ from: location, requiredRoles: allowedRoles, currentRole: role }}
        replace
      />
    );
  }

  return <>{children}</>;
};

export default RoleRoute;
