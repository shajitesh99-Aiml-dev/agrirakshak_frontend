import React from 'react';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: React.ReactNode;
  href?: string;
  onClick?: () => void;
  isCurrent?: boolean;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  showHomeIcon?: boolean;
  className?: string;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  items,
  showHomeIcon = true,
  className = '',
}) => {
  return (
    <nav
      aria-label="Breadcrumb"
      className={`font-serif text-xs sm:text-sm text-text-muted overflow-x-auto ${className}`}
    >
      <ol className="flex items-center gap-1.5 flex-nowrap whitespace-nowrap">
        {items.map((item, index) => {
          const isLast = index === items.length - 1 || item.isCurrent;
          const isFirst = index === 0;

          return (
            <li key={index} className="flex items-center gap-1.5">
              {index > 0 && (
                <ChevronRight className="w-3.5 h-3.5 text-text-subtle shrink-0" aria-hidden="true" />
              )}

              {isLast ? (
                <span
                  aria-current="page"
                  className="font-bold text-dark-green flex items-center gap-1.5"
                >
                  {isFirst && showHomeIcon && <Home className="w-3.5 h-3.5" aria-hidden="true" />}
                  <span>{item.label}</span>
                </span>
              ) : item.onClick ? (
                <button
                  type="button"
                  onClick={item.onClick}
                  className="hover:text-primary transition-colors flex items-center gap-1.5 focus-visible:outline-none focus-visible:underline"
                >
                  {isFirst && showHomeIcon && <Home className="w-3.5 h-3.5" aria-hidden="true" />}
                  <span>{item.label}</span>
                </button>
              ) : item.href ? (
                <a
                  href={item.href}
                  className="hover:text-primary transition-colors flex items-center gap-1.5 focus-visible:outline-none focus-visible:underline"
                >
                  {isFirst && showHomeIcon && <Home className="w-3.5 h-3.5" aria-hidden="true" />}
                  <span>{item.label}</span>
                </a>
              ) : (
                <span className="flex items-center gap-1.5">
                  {isFirst && showHomeIcon && <Home className="w-3.5 h-3.5" aria-hidden="true" />}
                  <span>{item.label}</span>
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
