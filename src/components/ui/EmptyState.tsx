import React from 'react';
import { PackageOpen } from 'lucide-react';
import Button, { ButtonProps } from './Button';

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  primaryAction?: {
    label: string;
    onClick: () => void;
    icon?: React.ReactNode;
  } & Partial<ButtonProps>;
  secondaryAction?: {
    label: string;
    onClick: () => void;
  } & Partial<ButtonProps>;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  primaryAction,
  secondaryAction,
  className = '',
}) => {
  return (
    <div
      className={`p-8 sm:p-12 text-center rounded-md bg-white border-2 border-[#172117] shadow-neo flex flex-col items-center justify-center max-w-lg mx-auto ${className}`}
    >
      <div className="w-16 h-16 rounded-full bg-[#E8F5E9] text-primary border-2 border-[#172117] shadow-neo-sm flex items-center justify-center mb-4">
        {icon || <PackageOpen className="w-8 h-8 text-primary" aria-hidden="true" />}
      </div>

      <h3 className="font-serif text-xl sm:text-2xl font-bold text-dark-green mb-2">
        {title}
      </h3>

      <p className="font-serif text-sm sm:text-base text-text-muted mb-6 leading-relaxed max-w-md">
        {description}
      </p>

      {(primaryAction || secondaryAction) && (
        <div className="flex flex-wrap items-center justify-center gap-3">
          {primaryAction && (
            <Button
              variant="primary"
              leftIcon={primaryAction.icon}
              {...primaryAction}
            >
              {primaryAction.label}
            </Button>
          )}
          {secondaryAction && (
            <Button
              variant="outline"
              {...secondaryAction}
            >
              {secondaryAction.label}
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default EmptyState;
