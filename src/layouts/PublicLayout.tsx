import React from 'react';
import { Outlet, useNavigate, useLocation, Link } from 'react-router-dom';
import { Sprout, LogIn, UserPlus, LogOut, LayoutDashboard, ExternalLink } from 'lucide-react';
import Navbar, { NavItem } from '../components/ui/Navbar';
import Button from '../components/ui/Button';
import Avatar from '../components/ui/Avatar';
import Container from '../components/ui/Container';
import { ROUTES } from '../routes/routeConfig';
import { useAuth } from '../features/auth';
import { useI18n } from '../i18n';
import LanguageSelector from '../components/common/LanguageSelector';
import OfflineBanner from '../components/common/OfflineBanner';
import ConfirmLogoutDialog from '../components/common/ConfirmLogoutDialog';

export const PublicLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, role, isAuthenticated, logout } = useAuth();
  const { t } = useI18n();
  const [logoutDialogOpen, setLogoutDialogOpen] = React.useState(false);

  const navItems: NavItem[] = [
    {
      label: t('nav.home'),
      active: location.pathname === ROUTES.HOME,
      onClick: () => navigate(ROUTES.HOME),
    },
    {
      label: t('nav.about'),
      active: location.pathname === ROUTES.ABOUT,
      onClick: () => navigate(ROUTES.ABOUT),
    },
    {
      label: t('nav.help'),
      active: location.pathname === ROUTES.HELP,
      onClick: () => navigate(ROUTES.HELP),
    },
    {
      label: t('nav.routeMatrix'),
      active: location.pathname === ROUTES.ROUTE_OVERVIEW,
      onClick: () => navigate(ROUTES.ROUTE_OVERVIEW),
    },
    {
      label: t('nav.showcase'),
      active: location.pathname === ROUTES.SHOWCASE,
      onClick: () => navigate(ROUTES.SHOWCASE),
    },
  ];

  const getDashboardPath = () => {
    if (role === 'officer') return ROUTES.OFFICER_DASHBOARD;
    if (role === 'admin') return ROUTES.ADMIN_DASHBOARD;
    return ROUTES.FARMER_DASHBOARD;
  };

  const getPortalLabel = () => {
    if (role === 'officer') return t('nav.officerPortal');
    if (role === 'admin') return t('nav.adminConsole');
    return t('nav.farmerPortal');
  };

  const handleLogout = () => {
    setLogoutDialogOpen(true);
  };

  const userAction = isAuthenticated && user ? (
    <div className="flex items-center gap-2">
      <LanguageSelector />
      <Link to={getDashboardPath()}>
        <Button
          variant="primary"
          size="sm"
          leftIcon={<LayoutDashboard className="w-4 h-4" />}
        >
          {getPortalLabel()}
        </Button>
      </Link>
      <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-md bg-[#E8F5E9] border-2 border-[#172117] shadow-[2px_2px_0px_#172117] text-xs">
        <Avatar name={user.name} size="sm" />
        <span className="font-bold text-[#1B5E20] max-w-[120px] truncate">
          {user.name}
        </span>
      </div>
      <Button
        variant="outline"
        size="sm"
        leftIcon={<LogOut className="w-3.5 h-3.5 text-[#D32F2F]" />}
        onClick={handleLogout}
        className="text-[#172117] hover:bg-[#FFEBEE] hover:text-[#D32F2F]"
        aria-label={t('nav.signOut')}
      >
        <span className="hidden sm:inline font-bold">{t('nav.signOut')}</span>
      </Button>
    </div>
  ) : (
    <div className="flex items-center gap-2">
      <LanguageSelector />
      <Button
        variant="outline"
        size="sm"
        leftIcon={<LogIn className="w-4 h-4" />}
        onClick={() => navigate(ROUTES.LOGIN)}
      >
        {t('nav.signIn')}
      </Button>
      <Button
        variant="primary"
        size="sm"
        leftIcon={<UserPlus className="w-4 h-4" />}
        onClick={() => navigate(ROUTES.REGISTER)}
        className="hidden sm:inline-flex"
      >
        {t('nav.register')}
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-background text-text flex flex-col font-serif selection:bg-primary/20 selection:text-dark-green">
      <OfflineBanner />
      <Navbar
        brandName="Agri Rakshak"
        brandTagline="AI-Assisted Crop Disease & Pest Detection"
        items={navItems}
        userAction={userAction}
      />

      <main className="flex-1">
        <Outlet />
      </main>

      <ConfirmLogoutDialog
        isOpen={logoutDialogOpen}
        onClose={() => setLogoutDialogOpen(false)}
        onConfirm={async () => {
          setLogoutDialogOpen(false);
          await logout();
          navigate(ROUTES.LOGIN);
        }}
      />

      <footer className="border-t-2 border-[#172117] bg-[#FAFDF9] py-10 mt-16 select-none">
        <Container size="2xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="space-y-3 md:col-span-2">
              <div className="flex items-center space-x-2 text-[#1B5E20]">
                <Sprout className="w-6 h-6 text-[#2E7D32]" />
                <span className="font-serif text-xl font-black tracking-tight text-[#172117]">Agri Rakshak</span>
              </div>
              <p className="text-sm text-[#496274] max-w-md leading-relaxed font-medium">
                National AI-assisted crop disease and pest detection platform with localized agricultural officer
                escalation, built for Smart India Hackathon 2026 (SIH26131).
              </p>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[4px] bg-[#E8F5E9] text-[#1B5E20] text-xs font-bold border-2 border-[#172117] shadow-[1.5px_1.5px_0px_#172117]">
                <span>SIH26131 • Ministry of Agriculture &amp; Farmers Welfare</span>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-black text-[#172117] uppercase tracking-wider mb-3">
                Portals &amp; Roles
              </h4>
              <ul className="space-y-2 text-sm text-[#496274] font-semibold">
                <li>
                  <Link to={ROUTES.FARMER_DASHBOARD} className="hover:text-[#2E7D32] transition-colors flex items-center gap-1.5">
                    <span>Farmer Portal</span>
                    <ExternalLink className="w-3 h-3 text-[#172117]" />
                  </Link>
                </li>
                <li>
                  <Link to={ROUTES.OFFICER_DASHBOARD} className="hover:text-[#2E7D32] transition-colors flex items-center gap-1.5">
                    <span>Agricultural Officer Portal</span>
                    <ExternalLink className="w-3 h-3 text-[#172117]" />
                  </Link>
                </li>
                <li>
                  <Link to={ROUTES.ADMIN_DASHBOARD} className="hover:text-[#2E7D32] transition-colors flex items-center gap-1.5">
                    <span>Administrative Console</span>
                    <ExternalLink className="w-3 h-3 text-[#172117]" />
                  </Link>
                </li>
                <li>
                  <Link to={ROUTES.LOGIN} className="hover:text-[#2E7D32] transition-colors">
                    Login / Enrollment
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-black text-[#172117] uppercase tracking-wider mb-3">
                Platform Resources
              </h4>
              <ul className="space-y-2 text-sm text-[#496274] font-semibold">
                <li>
                  <Link to={ROUTES.ABOUT} className="hover:text-[#2E7D32] transition-colors">
                    About Project &amp; Architecture
                  </Link>
                </li>
                <li>
                  <Link to={ROUTES.HELP} className="hover:text-[#2E7D32] transition-colors">
                    Help &amp; Symptom Guide
                  </Link>
                </li>
                <li>
                  <Link to={ROUTES.PRIVACY} className="hover:text-[#2E7D32] transition-colors">
                    Privacy &amp; Data Stewardship
                  </Link>
                </li>
                <li>
                  <Link to={ROUTES.ROUTE_OVERVIEW} className="hover:text-[#2E7D32] transition-colors font-bold text-[#2E7D32]">
                    Interactive Route Matrix (35+ Routes)
                  </Link>
                </li>
                <li>
                  <Link to={ROUTES.SHOWCASE} className="hover:text-[#2E7D32] transition-colors">
                    Phase 2 UI Component Showcase
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-6 border-t-2 border-[#172117] flex flex-col sm:flex-row items-center justify-between text-xs text-[#496274] font-bold gap-3">
            <div>
              © 2026 Agri Rakshak • SIH26131 • All rights reserved.
            </div>
            <div className="px-2.5 py-1 rounded-[4px] bg-white border border-[#172117] text-[#172117]">
              Phase 4: Authentication &amp; Session Architecture Active
            </div>
          </div>
        </Container>
      </footer>
    </div>
  );
};

export default PublicLayout;
