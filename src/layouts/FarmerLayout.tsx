import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation, Link } from 'react-router-dom';
import {
  Sprout,
  LayoutDashboard,
  Camera,
  FolderOpen,
  Bell,
  User as UserIcon,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  HelpCircle,
} from 'lucide-react';
import Sidebar from '../components/ui/Sidebar';
import MobileBottomNav, { MobileBottomNavItem } from '../components/ui/MobileBottomNav';
import Avatar from '../components/ui/Avatar';
import Button from '../components/ui/Button';
import Container from '../components/ui/Container';
import { ROUTES } from '../routes/routeConfig';
import { useAuth } from '../features/auth';
import { useI18n } from '../i18n';
import LanguageSelector from '../components/common/LanguageSelector';
import OfflineBanner from '../components/common/OfflineBanner';
import ConfirmLogoutDialog from '../components/common/ConfirmLogoutDialog';
import { NotificationBadge, useNotifications } from '../features/notifications';

export const FarmerLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const { user, logout } = useAuth();
  const { t } = useI18n();
  const { unreadCount } = useNotifications('farmer');

  const handleLogout = () => {
    setLogoutDialogOpen(true);
  };

  // Desktop sidebar navigation items
  const sidebarItems = [
    {
      label: t('nav.dashboard'),
      icon: <LayoutDashboard className="w-5 h-5" />,
      active: location.pathname === ROUTES.FARMER_DASHBOARD,
      onClick: () => navigate(ROUTES.FARMER_DASHBOARD),
    },
    {
      label: t('farmer.reportProblemBtn'),
      icon: <Camera className="w-5 h-5" />,
      active: location.pathname === ROUTES.FARMER_REPORT,
      onClick: () => navigate(ROUTES.FARMER_REPORT),
    },
    {
      label: t('nav.myCases'),
      icon: <FolderOpen className="w-5 h-5" />,
      active: location.pathname.startsWith(ROUTES.FARMER_CASES) || location.pathname.startsWith('/farmer/detection'),
      badge: '3',
      onClick: () => navigate(ROUTES.FARMER_CASES),
    },
    {
      label: t('nav.notifications'),
      icon: <Bell className="w-5 h-5" />,
      active: location.pathname === ROUTES.FARMER_NOTIFICATIONS,
      badge: unreadCount > 0 ? String(unreadCount) : undefined,
      onClick: () => navigate(ROUTES.FARMER_NOTIFICATIONS),
    },
    {
      label: t('nav.profile'),
      icon: <UserIcon className="w-5 h-5" />,
      active: location.pathname === ROUTES.FARMER_PROFILE,
      onClick: () => navigate(ROUTES.FARMER_PROFILE),
    },
    {
      label: t('nav.settings'),
      icon: <Settings className="w-5 h-5" />,
      active: location.pathname === ROUTES.FARMER_SETTINGS,
      onClick: () => navigate(ROUTES.FARMER_SETTINGS),
    },
  ];

  // Mobile bottom navigation items (prioritizing farmer core actions)
  const mobileNavItems: MobileBottomNavItem[] = [
    {
      id: 'dashboard',
      label: t('nav.home'),
      icon: <LayoutDashboard className="w-5 h-5" />,
      active: location.pathname === ROUTES.FARMER_DASHBOARD,
      onClick: () => navigate(ROUTES.FARMER_DASHBOARD),
    },
    {
      id: 'report',
      label: t('common.submit'),
      icon: <Camera className="w-5 h-5 text-primary" />,
      active: location.pathname === ROUTES.FARMER_REPORT,
      onClick: () => navigate(ROUTES.FARMER_REPORT),
    },
    {
      id: 'cases',
      label: t('nav.myCases'),
      icon: <FolderOpen className="w-5 h-5" />,
      active: location.pathname.startsWith(ROUTES.FARMER_CASES) || location.pathname.startsWith('/farmer/detection'),
      badge: 3,
      onClick: () => navigate(ROUTES.FARMER_CASES),
    },
    {
      id: 'alerts',
      label: t('nav.notifications'),
      icon: <Bell className="w-5 h-5" />,
      active: location.pathname === ROUTES.FARMER_NOTIFICATIONS,
      badge: unreadCount > 0 ? unreadCount : undefined,
      onClick: () => navigate(ROUTES.FARMER_NOTIFICATIONS),
    },
    {
      id: 'profile',
      label: t('nav.profile'),
      icon: <UserIcon className="w-5 h-5" />,
      active: location.pathname === ROUTES.FARMER_PROFILE,
      onClick: () => navigate(ROUTES.FARMER_PROFILE),
    },
  ];

  const sidebarHeader = (
    <div className="flex items-center justify-between w-full">
      <Link to={ROUTES.HOME} className="flex items-center space-x-2.5">
        <div className="w-9 h-9 rounded-md bg-[#E8F5E9] flex items-center justify-center text-[#2E7D32] border-2 border-[#172117] shadow-[2px_2px_0px_#172117] shrink-0">
          <Sprout className="w-5 h-5" />
        </div>
        {!sidebarCollapsed && (
          <div>
            <span className="font-serif text-lg font-black text-[#172117] leading-none block">Agri Rakshak</span>
            <span className="text-[11px] font-bold text-[#496274]">Farmer Portal</span>
          </div>
        )}
      </Link>
      <button
        type="button"
        onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
        aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        className="p-1.5 rounded-md text-[#172117] hover:bg-[#E8F5E9] border-2 border-transparent hover:border-[#172117] hidden lg:flex cursor-pointer"
      >
        {sidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
      </button>
    </div>
  );

  const farmerName = user?.name || 'Ramesh Patel';
  const farmerVillage = user && 'village' in user ? user.village : undefined;
  const farmerDistrict = user && 'district' in user ? user.district : undefined;
  const farmerLocation = farmerVillage ? `${farmerVillage}, ${farmerDistrict || 'India'}` : 'Nashik, Maharashtra';

  const sidebarFooter = (
    <div className="space-y-3 font-serif">
      <div className="flex items-center gap-3">
        <Avatar name={farmerName} size="sm" />
        {!sidebarCollapsed && (
          <div className="min-w-0 flex-1">
            <p className="text-sm font-bold text-[#172117] truncate">{farmerName}</p>
            <p className="text-xs text-[#496274] font-semibold truncate">{farmerLocation}</p>
          </div>
        )}
      </div>
      {!sidebarCollapsed && (
        <div className="flex items-center justify-between pt-2 border-t-2 border-[#172117] text-xs text-[#496274] font-bold">
          <Link to={ROUTES.HELP} className="hover:text-[#2E7D32] flex items-center gap-1">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>{t('nav.help')}</span>
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="hover:text-[#D32F2F] flex items-center gap-1 text-[#172117] transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>{t('nav.signOut')}</span>
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-background text-text flex flex-col font-serif selection:bg-primary/20 selection:text-dark-green pb-20 md:pb-0">
      {/* Offline Banner */}
      <OfflineBanner />

      {/* Top Header */}
      <header className="sticky top-0 z-30 bg-white border-b-2 border-[#172117] shadow-neo-sm">
        <div className="px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <Link to={ROUTES.HOME} className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-md bg-[#E8F5E9] flex items-center justify-center text-[#2E7D32] border-2 border-[#172117] shadow-[2px_2px_0px_#172117] md:hidden">
                <Sprout className="w-5 h-5" />
              </div>
              <span className="font-serif text-lg sm:text-xl font-black text-[#172117]">
                {t('nav.farmerWorkspace')}
              </span>
            </Link>
            <span className="hidden sm:inline-flex px-2.5 py-0.5 rounded-[4px] text-xs font-bold bg-[#E8F5E9] text-[#1B5E20] border-2 border-[#172117] shadow-[1px_1px_0px_#172117]">
              {t('nav.kisanSeva')}
            </span>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-3">
            <NotificationBadge
              role="farmer"
              onClick={() => navigate(ROUTES.FARMER_NOTIFICATIONS)}
            />
            <LanguageSelector />
            <Button
              variant="primary"
              size="sm"
              leftIcon={<Camera className="w-4 h-4" />}
              onClick={() => navigate(ROUTES.FARMER_REPORT)}
              className="hidden sm:inline-flex"
            >
              {t('farmer.reportProblemBtn')}
            </Button>
            <Link to={ROUTES.ROUTE_OVERVIEW}>
              <Button variant="outline" size="sm">
                {t('nav.switchRole')}
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Workspace Body with Sidebar */}
      <div className="flex-1 flex overflow-hidden">
        {/* Desktop Sidebar */}
        <div className="hidden md:block shrink-0">
          <Sidebar
            items={sidebarItems}
            header={sidebarHeader}
            footer={sidebarFooter}
            collapsed={sidebarCollapsed}
          />
        </div>

        {/* Content Outlet */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <Container size="2xl">
            <Outlet />
          </Container>
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav items={mobileNavItems} />

      {/* Logout Confirmation Dialog */}
      <ConfirmLogoutDialog
        isOpen={logoutDialogOpen}
        onClose={() => setLogoutDialogOpen(false)}
        onConfirm={async () => {
          setLogoutDialogOpen(false);
          await logout();
          navigate(ROUTES.LOGIN);
        }}
      />
    </div>
  );
};

export default FarmerLayout;
