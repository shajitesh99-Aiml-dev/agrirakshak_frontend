import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  ClipboardList,
  BarChart3,
  MapPin,
  Bell,
  User as UserIcon,
  Settings,
  ShieldAlert,
  ChevronLeft,
  ChevronRight,
  LogOut,
  HelpCircle,
  Menu,
  X,
} from 'lucide-react';
import Sidebar from '../components/ui/Sidebar';
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

export const OfficerLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const { user, logout } = useAuth();
  const { t } = useI18n();
  const { unreadCount } = useNotifications('officer');

  const handleLogout = () => {
    setLogoutDialogOpen(true);
  };

  const officerNavItems = [
    {
      label: t('nav.dashboard'),
      icon: <LayoutDashboard className="w-5 h-5" />,
      active: location.pathname === ROUTES.OFFICER_DASHBOARD,
      onClick: () => {
        navigate(ROUTES.OFFICER_DASHBOARD);
        setMobileMenuOpen(false);
      },
    },
    {
      label: t('nav.triageQueue'),
      icon: <ClipboardList className="w-5 h-5" />,
      active: location.pathname.startsWith(ROUTES.OFFICER_CASES),
      badge: '7',
      onClick: () => {
        navigate(ROUTES.OFFICER_CASES);
        setMobileMenuOpen(false);
      },
    },
    {
      label: t('nav.epidemicAnalytics'),
      icon: <BarChart3 className="w-5 h-5" />,
      active: location.pathname === ROUTES.OFFICER_ANALYTICS,
      onClick: () => {
        navigate(ROUTES.OFFICER_ANALYTICS);
        setMobileMenuOpen(false);
      },
    },
    {
      label: t('nav.outbreakHotspots'),
      icon: <MapPin className="w-5 h-5" />,
      active: location.pathname === ROUTES.OFFICER_HOTSPOTS,
      onClick: () => {
        navigate(ROUTES.OFFICER_HOTSPOTS);
        setMobileMenuOpen(false);
      },
    },
    {
      label: t('nav.notifications'),
      icon: <Bell className="w-5 h-5" />,
      active: location.pathname === ROUTES.OFFICER_NOTIFICATIONS,
      badge: unreadCount > 0 ? String(unreadCount) : undefined,
      onClick: () => {
        navigate(ROUTES.OFFICER_NOTIFICATIONS);
        setMobileMenuOpen(false);
      },
    },
    {
      label: t('nav.profile'),
      icon: <UserIcon className="w-5 h-5" />,
      active: location.pathname === ROUTES.OFFICER_PROFILE,
      onClick: () => {
        navigate(ROUTES.OFFICER_PROFILE);
        setMobileMenuOpen(false);
      },
    },
    {
      label: t('nav.settings'),
      icon: <Settings className="w-5 h-5" />,
      active: location.pathname === ROUTES.OFFICER_SETTINGS,
      onClick: () => {
        navigate(ROUTES.OFFICER_SETTINGS);
        setMobileMenuOpen(false);
      },
    },
  ];

  const sidebarHeader = (
    <div className="flex items-center justify-between w-full">
      <Link to={ROUTES.HOME} className="flex items-center space-x-2.5">
        <div className="w-9 h-9 rounded-md bg-[#E1F5FE] flex items-center justify-center text-ai border-2 border-[#172117] shadow-[2px_2px_0px_#172117] shrink-0">
          <ShieldAlert className="w-5 h-5 text-[#0288D1]" />
        </div>
        {!sidebarCollapsed && (
          <div>
            <span className="font-serif text-lg font-black text-[#172117] leading-none block">Agri Rakshak</span>
            <span className="text-[11px] font-bold text-[#496274]">Officer Portal</span>
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

  const officerName = user?.name || 'Dr. Priya Sharma';
  const officerJurisdiction = user && 'district' in user ? `${user.district} District` : 'Nashik District';

  const sidebarFooter = (
    <div className="space-y-3 font-serif">
      <div className="flex items-center gap-3">
        <Avatar name={officerName} size="sm" />
        {!sidebarCollapsed && (
          <div className="min-w-0 flex-1">
            <p className="text-sm font-bold text-[#172117] truncate">{officerName}</p>
            <p className="text-xs text-[#496274] font-semibold truncate">{officerJurisdiction}</p>
          </div>
        )}
      </div>
      {!sidebarCollapsed && (
        <div className="flex items-center justify-between pt-2 border-t-2 border-[#172117] text-xs text-[#496274] font-bold">
          <Link to={ROUTES.HELP} className="hover:text-[#2E7D32] flex items-center gap-1">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Help &amp; FAQ</span>
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="hover:text-[#D32F2F] flex items-center gap-1 text-[#172117] transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-background text-text flex flex-col font-serif selection:bg-primary/20 selection:text-dark-green">
      {/* Offline Banner */}
      <OfflineBanner />

      {/* Header */}
      <header className="sticky top-0 z-30 bg-white border-b-2 border-[#172117] shadow-neo-sm">
        <div className="px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-[#172117] hover:bg-[#F5FAF3] border-2 border-[#172117] shadow-[2px_2px_0px_#172117] md:hidden cursor-pointer"
              aria-label="Toggle navigation drawer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <Link to={ROUTES.HOME} className="flex items-center space-x-2">
              <span className="font-serif text-lg sm:text-xl font-black text-[#172117]">
                {t('nav.officerWorkspace')}
              </span>
            </Link>
            <span className="hidden sm:inline-flex px-2.5 py-0.5 rounded-[4px] text-xs font-bold bg-[#E1F5FE] text-[#0277BD] border-2 border-[#172117] shadow-[1px_1px_0px_#172117]">
              {t('nav.fieldTriageActive')}
            </span>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-3">
            <NotificationBadge
              role="officer"
              onClick={() => navigate(ROUTES.OFFICER_NOTIFICATIONS)}
            />
            <LanguageSelector />
            <Link to={ROUTES.ROUTE_OVERVIEW}>
              <Button variant="outline" size="sm">
                {t('nav.switchRole')}
              </Button>
            </Link>
          </div>
        </div>

        {/* Mobile Dropdown Menu for Officers */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-3 px-4 border-t-2 border-[#172117] bg-white shadow-neo-lg flex flex-col space-y-1.5 animate-fadeIn">
            {officerNavItems.map((item, idx) => (
              <button
                key={idx}
                type="button"
                onClick={item.onClick}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-md text-sm font-bold text-left min-h-[44px] border-2 cursor-pointer ${
                  item.active
                    ? 'bg-[#2E7D32] text-white border-[#172117] shadow-[2px_2px_0px_#172117]'
                    : 'text-[#172117] border-transparent hover:border-[#172117] hover:bg-[#E8F5E9]'
                }`}
              >
                <div className="flex items-center gap-3">
                  {item.icon}
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`px-2 py-0.5 text-xs font-bold rounded-[4px] border border-[#172117] shadow-[1px_1px_0px_#172117] ${item.active ? 'bg-white text-[#172117]' : 'bg-[#E8F5E9] text-[#1B5E20]'}`}>
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </nav>
        )}
      </header>

      {/* Main Workspace Body with Sidebar */}
      <div className="flex-1 flex overflow-hidden">
        {/* Desktop Sidebar */}
        <div className="hidden md:block shrink-0">
          <Sidebar
            items={officerNavItems}
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

export default OfficerLayout;
