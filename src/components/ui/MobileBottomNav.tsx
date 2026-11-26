import React from 'react';

export interface MobileBottomNavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  active?: boolean;
  onClick: () => void;
  badge?: string | number;
}

export interface MobileBottomNavProps {
  items: MobileBottomNavItem[];
  className?: string;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  items,
  className = '',
}) => {
  return (
    <div
      role="navigation"
      aria-label="Mobile Navigation"
      className={`fixed bottom-0 left-0 right-0 z-40 bg-white border-t-2 border-[#172117] shadow-neo-xl md:hidden select-none safe-bottom ${className}`}
    >
      <div className="flex items-center justify-around h-16 px-2">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={item.onClick}
            aria-current={item.active ? 'page' : undefined}
            className={`flex flex-col items-center justify-center flex-1 py-1 min-h-[48px] min-w-[48px] rounded-md transition-colors relative ${
              item.active
                ? 'text-primary font-bold'
                : 'text-text-muted hover:text-text'
            }`}
          >
            <div className="relative">
              <span className="w-5 h-5 flex items-center justify-center">{item.icon}</span>
              {item.badge !== undefined && (
                <span className="absolute -top-1.5 -right-2 px-1.5 py-0.2 text-[10px] font-bold rounded-[4px] border-[1px] border-[#172117] bg-semantic-error text-white shadow-[1px_1px_0px_#172117] leading-tight">
                  {item.badge}
                </span>
              )}
            </div>
            <span className="text-[11px] font-serif mt-1 leading-none tracking-tight">
              {item.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MobileBottomNav;
