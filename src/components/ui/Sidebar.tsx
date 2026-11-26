import React from 'react';
import { NavItem } from './Navbar';

export interface SidebarProps {
  items: (NavItem & { badge?: string | number })[];
  header?: React.ReactNode;
  footer?: React.ReactNode;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
  className?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({
  items,
  header,
  footer,
  collapsed = false,
  className = '',
}) => {
  return (
    <aside
      className={`h-full flex flex-col bg-white border-r-2 border-[#172117] transition-all duration-200 select-none ${
        collapsed ? 'w-20' : 'w-64'
      } ${className}`}
    >
      {/* Sidebar Header */}
      {header && (
        <div className="p-4 sm:p-5 border-b-2 border-[#172117] bg-[#FAFDF9] flex items-center justify-between">
          {header}
        </div>
      )}

      {/* Nav List */}
      <nav className="flex-1 p-3 space-y-1.5 overflow-y-auto">
        {items.map((item, idx) => (
          <button
            key={idx}
            type="button"
            onClick={item.onClick}
            className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-md text-sm transition-all min-h-[44px] text-left cursor-pointer ${
              item.active
                ? 'bg-[#2E7D32] text-white border-2 border-[#172117] shadow-[2px_2px_0px_#172117] font-bold'
                : 'text-[#172117] bg-transparent hover:bg-[#E8F5E9] border-2 border-transparent hover:border-[#172117] hover:shadow-[2px_2px_0px_#172117] font-semibold'
            }`}
          >
            {item.icon && (
              <span className={`shrink-0 ${item.active ? 'text-white' : 'text-[#2E7D32]'}`}>
                {item.icon}
              </span>
            )}
            {!collapsed && (
              <>
                <span className="flex-1 truncate">{item.label}</span>
                {item.badge !== undefined && (
                  <span
                    className={`px-2 py-0.5 text-xs font-bold rounded-[4px] border border-[#172117] shadow-[1px_1px_0px_#172117] ${
                      item.active ? 'bg-white text-[#172117]' : 'bg-[#E8F5E9] text-[#1B5E20]'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </>
            )}
          </button>
        ))}
      </nav>

      {/* Sidebar Footer */}
      {footer && (
        <div className="p-4 border-t-2 border-[#172117] bg-[#FAFDF9]">
          {footer}
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
