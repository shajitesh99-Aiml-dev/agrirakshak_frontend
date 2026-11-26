import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Calendar, ShieldAlert, Layers, ArrowLeft } from 'lucide-react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  PageTitle,
  BodyText,
  Badge,
  Alert,
  Button,
  Breadcrumbs,
} from '../components/ui';
import { BreadcrumbItem } from '../components/ui/Breadcrumbs';
import { usePageTitle } from '../hooks/usePageTitle';
import { ROUTES } from '../routes/routeConfig';

export interface PlaceholderShellProps {
  title: string;
  subtitle?: string;
  description: string;
  plannedPhase: string;
  category: 'public' | 'auth' | 'farmer' | 'officer' | 'admin' | 'error';
  breadcrumbs?: BreadcrumbItem[];
  actions?: React.ReactNode;
  icon?: React.ReactNode;
  highlights?: string[];
}

export const PlaceholderShell: React.FC<PlaceholderShellProps> = ({
  title,
  subtitle,
  description,
  plannedPhase,
  category,
  breadcrumbs,
  actions,
  icon,
  highlights = [],
}) => {
  const { caseId } = useParams<{ caseId?: string }>();
  usePageTitle(`Agri Rakshak | ${title}`);

  const categoryBadges = {
    public: <Badge variant="info">Public Information</Badge>,
    auth: <Badge variant="warning">Authentication Placeholder</Badge>,
    farmer: <Badge variant="success">Farmer Portal Module</Badge>,
    officer: <Badge variant="info">Officer Triage Module</Badge>,
    admin: <Badge variant="neutral">Administrative Module</Badge>,
    error: <Badge variant="error">Error Route</Badge>,
  };

  return (
    <div className="space-y-6 font-serif max-w-5xl animate-fadeIn">
      {/* Optional Breadcrumbs */}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <Breadcrumbs items={breadcrumbs} className="mb-2" />
      )}

      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E0EBE0]">
        <div>
          <div className="flex items-center gap-2 mb-2">
            {categoryBadges[category]}
            <span className="text-xs text-text-muted flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>Target: {plannedPhase}</span>
            </span>
          </div>
          <PageTitle>{title}</PageTitle>
          {subtitle && (
            <p className="font-serif text-lg text-text-muted mt-1">{subtitle}</p>
          )}
          {caseId && (
            <div className="mt-2 inline-flex items-center gap-2 px-3 py-1 rounded-medium bg-[#E8F5E9] text-dark-green text-sm font-bold border border-[#C8E6C9]">
              <span>Active Route Parameter: caseId = {caseId}</span>
            </div>
          )}
        </div>

        {actions && <div className="shrink-0 flex items-center gap-2">{actions}</div>}
      </div>

      {/* Main Structural Notice Card */}
      <Card variant="default">
        <CardHeader>
          <div className="flex items-start gap-4">
            {icon && (
              <div className="w-12 h-12 rounded-card bg-primary-light text-primary flex items-center justify-center shrink-0 border border-primary/20">
                {icon}
              </div>
            )}
            <div>
              <CardTitle>{title} Architecture Boundary</CardTitle>
              <CardDescription>
                Phase 3 Application Routing &amp; Layout Shell
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <BodyText size="base">
            {description}
          </BodyText>

          <Alert variant="info" title="Phase 3 Boundary Notice">
            The route hierarchy, responsive navigation layout, role guard foundation, and mobile navigation hooks
            for this page are fully active. Actual domain forms, live API queries, and interactive workflows will be
            implemented in <strong>{plannedPhase}</strong>.
          </Alert>

          {highlights.length > 0 && (
            <div className="mt-4 pt-4 border-t border-[#EAEFE9]">
              <h4 className="font-bold text-dark-green text-sm uppercase tracking-wider mb-2">
                Planned Features in {plannedPhase}:
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-text-muted">
                {highlights.map((h, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <div className="flex items-center justify-between w-full flex-wrap gap-3">
            <span className="text-xs text-text-muted flex items-center gap-1">
              <ShieldAlert className="w-3.5 h-3.5 text-text-subtle" />
              <span>Backend authorization remains the authoritative security boundary.</span>
            </span>
            <div className="flex items-center gap-2">
              <Link to={ROUTES.ROUTE_OVERVIEW}>
                <Button variant="outline" size="sm" leftIcon={<Layers className="w-3.5 h-3.5" />}>
                  View All 35+ Routes
                </Button>
              </Link>
              <Link to={ROUTES.HOME}>
                <Button variant="ghost" size="sm" leftIcon={<ArrowLeft className="w-3.5 h-3.5" />}>
                  Return Home
                </Button>
              </Link>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PlaceholderShell;
