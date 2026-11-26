import React, { useState } from 'react';
import { Sprout, Menu, X } from 'lucide-react';
import Container from './Container';

export interface NavItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
}

export interface NavbarProps {
  brandName?: string;
  brandTagline?: string;
  items?: NavItem[];
  userAction?: React.ReactNode;
  className?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  brandName = 'Agri Rakshak',
  brandTagline = 'AI Crop Care',
  items = [],
  userAction,
  className = '',
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className={`sticky top-0 z-30 bg-white border-b-2 border-[#172117] shadow-neo-sm ${className}`}>
      <Container size="2xl">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo / Branding */}
          <div className="flex items-center space-x-3 select-none">
            <div className="w-10 h-10 rounded-md bg-[#E8F5E9] flex items-center justify-center text-primary border-2 border-[#172117] shadow-neo-sm shrink-0">
              <Sprout className="w-6 h-6 text-primary" aria-hidden="true" />
            </div>
            <div>
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-dark-green block leading-none">
                {brandName}
              </span>
              {brandTagline && (
                <span className="font-serif text-xs text-text-muted mt-0.5 block">
                  {brandTagline}
                </span>
              )}
            </div>
          </div>

          {/* Desktop Nav Items */}
          {items.length > 0 && (
            <nav className="hidden md:flex items-center space-x-1.5 font-serif">
              {items.map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={item.onClick}
                  className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-md text-sm font-bold transition-all min-h-[40px] ${
                    item.active
                      ? 'bg-primary text-white border-2 border-[#172117] shadow-neo-sm'
                      : 'border-2 border-transparent text-[#172117] hover:border-[#172117] hover:bg-[#E8F5E9] hover:shadow-[1px_1px_0px_#172117]'
                  }`}
                >
                  {item.icon && <span className="shrink-0">{item.icon}</span>}
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>
          )}

          {/* Right Actions */}
          <div className="flex items-center space-x-2">
            {userAction && <div className="hidden sm:block">{userAction}</div>}

            {/* Mobile Menu Toggle Button */}
            {items.length > 0 && (
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen((prev) => !prev)}
                aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                className="md:hidden p-2 rounded-md border-2 border-[#172117] bg-white text-[#172117] shadow-[1.5px_1.5px_0px_#172117] hover:bg-[#E8F5E9] hover:translate-x-[1px] hover:translate-y-[1px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary min-w-[44px] min-h-[44px] flex items-center justify-center transition-all"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            )}
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && items.length > 0 && (
          <nav className="md:hidden py-3 border-t-2 border-[#172117] flex flex-col space-y-1.5 animate-fadeIn">
            {items.map((item, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  if (item.onClick) item.onClick();
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-md text-base font-serif font-bold text-left transition-all min-h-[44px] border-2 ${
                  item.active
                    ? 'bg-primary text-white border-[#172117] shadow-neo-sm'
                    : 'border-transparent text-[#172117] hover:border-[#172117] hover:bg-[#E8F5E9]'
                }`}
              >
                {item.icon && <span className="shrink-0">{item.icon}</span>}
                <span>{item.label}</span>
              </button>
            ))}
            {userAction && <div className="pt-2 px-2 sm:hidden">{userAction}</div>}
          </nav>
        )}
      </Container>
    </header>
  );
};

export default Navbar;
