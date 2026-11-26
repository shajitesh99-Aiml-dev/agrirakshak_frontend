import React from 'react';
import { UserRole } from '../types';

export type RouteCategory = 'public' | 'auth' | 'farmer' | 'officer' | 'admin' | 'error';

export interface AppRouteMetadata {
  path: string;
  title: string;
  label: string;
  category: RouteCategory;
  description: string;
  icon?: React.ReactNode;
  allowedRoles?: UserRole[];
  requiresAuth?: boolean;
  plannedPhase?: string;
  badge?: string | number;
}
