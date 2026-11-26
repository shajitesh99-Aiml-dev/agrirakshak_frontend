import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Compass,
  ArrowRight,
  Shield,
  Sprout,
  Users,
  FolderOpen,
  AlertTriangle,
  Lock,
} from 'lucide-react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  PageTitle,
  BodyText,
  Badge,
  Button,
  Container,
} from '../../components/ui';
import { usePageTitle } from '../../hooks/usePageTitle';
import { ROUTE_METADATA_CATALOG, ROUTES } from '../../routes/routeConfig';
import { RouteCategory } from '../../routes/routeTypes';

export const RouteOverviewPage: React.FC = () => {
  usePageTitle('Agri Rakshak | Interactive Route Matrix');
  const [selectedFilter, setSelectedFilter] = useState<RouteCategory | 'all'>('all');

  const filteredRoutes = selectedFilter === 'all'
    ? ROUTE_METADATA_CATALOG
    : ROUTE_METADATA_CATALOG.filter((r) => r.category === selectedFilter);

  const categoryIcons: Record<RouteCategory, React.ReactNode> = {
    public: <Compass className="w-4 h-4 text-primary" />,
    auth: <Lock className="w-4 h-4 text-accent" />,
    farmer: <Sprout className="w-4 h-4 text-primary" />,
    officer: <FolderOpen className="w-4 h-4 text-ai" />,
    admin: <Users className="w-4 h-4 text-[#8D5B00]" />,
    error: <AlertTriangle className="w-4 h-4 text-semantic-error" />,
  };

  const getResolvedPath = (path: string) => {
    // Resolve dynamic parameter placeholders for direct one-click testing
    return path.replace(':caseId', 'demo-case-2026');
  };

  return (
    <div className="py-8 sm:py-12 font-serif">
      <Container size="2xl">
        <div className="max-w-4xl mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-[4px] bg-[#E8F5E9] border-2 border-[#172117] text-[#1B5E20] text-xs font-bold shadow-[2px_2px_0px_#172117] mb-3">
            <Shield className="w-3.5 h-3.5 text-[#2E7D32]" />
            <span>Phase 3 Testing Matrix • All 35+ Application Routes</span>
          </div>
          <PageTitle className="mb-2 text-[#172117]">
            Application Route Navigation Matrix
          </PageTitle>
          <BodyText size="base" className="text-[#496274] font-medium">
            This interactive index catalogs every registered route in the Agri Rakshak architecture.
            Click any route below to test layout boundaries, responsive behaviors, and role-specific shells.
          </BodyText>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center gap-2.5 mb-8">
          {[
            { id: 'all', label: `All Routes (${ROUTE_METADATA_CATALOG.length})` },
            { id: 'public', label: `Public (${ROUTE_METADATA_CATALOG.filter((r) => r.category === 'public').length})` },
            { id: 'farmer', label: `Farmer (${ROUTE_METADATA_CATALOG.filter((r) => r.category === 'farmer').length})` },
            { id: 'officer', label: `Officer (${ROUTE_METADATA_CATALOG.filter((r) => r.category === 'officer').length})` },
            { id: 'admin', label: `Admin (${ROUTE_METADATA_CATALOG.filter((r) => r.category === 'admin').length})` },
            { id: 'auth', label: `Auth (${ROUTE_METADATA_CATALOG.filter((r) => r.category === 'auth').length})` },
          ].map((tab) => {
            const isSelected = selectedFilter === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setSelectedFilter(tab.id as RouteCategory | 'all')}
                className={`px-3.5 py-1.5 rounded-md text-xs font-bold transition-all border-2 border-[#172117] cursor-pointer ${
                  isSelected
                    ? 'bg-[#2E7D32] text-white shadow-none translate-x-[2px] translate-y-[2px]'
                    : 'bg-white text-[#172117] shadow-[2px_2px_0px_#172117] hover:bg-[#E8F5E9] active:shadow-none active:translate-x-[2px] active:translate-y-[2px]'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Route Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredRoutes.map((route, idx) => {
            const resolvedPath = getResolvedPath(route.path);

            return (
              <Card key={idx} variant="interactive" className="flex flex-col justify-between">
                <CardHeader>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <div className="flex items-center gap-1.5 text-xs text-[#496274] font-bold capitalize">
                      {categoryIcons[route.category]}
                      <span>{route.category}</span>
                    </div>
                    {route.badge && (
                      <Badge variant="default" size="sm">
                        Badge: {route.badge}
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-base text-[#1B5E20] font-black truncate">
                    {route.label}
                  </CardTitle>
                  <code className="text-xs font-mono bg-[#E8F5E9] px-2.5 py-1 rounded-[4px] border border-[#172117] text-[#1B5E20] font-bold block truncate mt-1">
                    {route.path}
                  </code>
                  <CardDescription className="line-clamp-2 mt-2 text-[#496274]">
                    {route.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="text-[11px] text-[#496274] font-bold pt-2 border-t-2 border-[#172117]">
                    <span>Target: {route.plannedPhase}</span>
                  </div>
                  <div className="mt-3">
                    <Link to={resolvedPath} className="block">
                      <Button variant="primary" size="sm" fullWidth rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                        Test Route
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Test Error Routes Section */}
        <div className="mt-12 p-6 rounded-md bg-white border-2 border-[#172117] shadow-neo">
          <h3 className="font-serif text-lg font-black text-[#1B5E20] mb-2">
            Error &amp; Boundary Route Verification
          </h3>
          <p className="text-sm text-[#496274] font-medium mb-4">
            Test the 404 Not Found catch-all route and the 403 Unauthorized role fallback:
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to={ROUTES.UNAUTHORIZED}>
              <Button variant="outline" size="sm">
                Test /unauthorized Page
              </Button>
            </Link>
            <Link to="/unknown-route-test-404">
              <Button variant="outline" size="sm">
                Test 404 (Catch-All *)
              </Button>
            </Link>
            <Link to={ROUTES.SHOWCASE}>
              <Button variant="secondary" size="sm">
                Open UI Component Showcase
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default RouteOverviewPage;
