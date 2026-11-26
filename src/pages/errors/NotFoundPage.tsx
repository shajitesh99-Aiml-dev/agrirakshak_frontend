import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Compass, Home, LayoutDashboard } from 'lucide-react';
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  PageTitle,
  BodyText,
  Button,
  Container,
} from '../../components/ui';
import { usePageTitle } from '../../hooks/usePageTitle';
import { ROUTES } from '../../routes/routeConfig';
import { useAuth } from '../../features/auth';
import { useI18n } from '../../i18n';

export const NotFoundPage: React.FC = () => {
  usePageTitle('Agri Rakshak | Page Not Found');
  const location = useLocation();
  const { user, isAuthenticated } = useAuth();
  const { t } = useI18n();

  const getDashboardRoute = () => {
    switch (user?.role) {
      case 'officer':
        return ROUTES.OFFICER_DASHBOARD;
      case 'admin':
        return ROUTES.ADMIN_DASHBOARD;
      case 'farmer':
      default:
        return ROUTES.FARMER_DASHBOARD;
    }
  };

  return (
    <div className="py-16 sm:py-24 font-serif">
      <Container size="md">
        <Card variant="default" className="text-center shadow-neo border-2 border-[#172117] bg-white rounded-md">
          <CardHeader>
            <div className="w-16 h-16 rounded-md bg-[#E8F5E9] text-[#2E7D32] border-2 border-[#172117] shadow-[3px_3px_0px_#172117] flex items-center justify-center mx-auto mb-4">
              <Compass className="w-8 h-8" />
            </div>
            <div className="text-sm font-black text-[#2E7D32] uppercase tracking-widest mb-1">
              Error 404
            </div>
            <PageTitle className="text-2xl sm:text-3xl font-black text-[#172117]">
              {t('errors.notFound')}
            </PageTitle>
          </CardHeader>
          <CardContent className="space-y-3 max-w-md mx-auto">
            <BodyText size="base" className="text-[#496274] font-medium">
              {t('errors.notFound')}
            </BodyText>
            <div className="text-xs font-mono font-bold text-[#1B5E20] bg-[#E8F5E9] p-2.5 rounded-[4px] border border-[#172117] truncate shadow-[1px_1px_0px_#172117]">
              {location.pathname}
            </div>
          </CardContent>
          <CardFooter>
            <div className="flex flex-wrap items-center justify-center gap-3 w-full">
              {isAuthenticated && (
                <Link to={getDashboardRoute()}>
                  <Button variant="primary" leftIcon={<LayoutDashboard className="w-4 h-4" />}>
                    {t('nav.dashboard')}
                  </Button>
                </Link>
              )}
              <Link to={ROUTES.HOME}>
                <Button variant={isAuthenticated ? 'outline' : 'primary'} leftIcon={<Home className="w-4 h-4" />}>
                  {t('nav.home')}
                </Button>
              </Link>
            </div>
          </CardFooter>
        </Card>
      </Container>
    </div>
  );
};

export default NotFoundPage;
