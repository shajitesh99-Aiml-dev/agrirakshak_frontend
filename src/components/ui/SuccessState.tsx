import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import Button from './Button';

export interface SuccessStateProps {
  title?: string;
  message?: string;
  primaryAction?: {
    label: string;
    onClick: () => void;
    icon?: React.ReactNode;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export const SuccessState: React.FC<SuccessStateProps> = ({
  title = 'Action Completed Successfully',
  message = 'Your agricultural submission or update has been verified and safely recorded.',
  primaryAction,
  secondaryAction,
  className = '',
}) => {
  return (
    <div
      role="status"
      className={`p-8 sm:p-12 text-center rounded-md bg-[#E8F5E9] border-2 border-[#172117] shadow-neo flex flex-col items-center justify-center max-w-lg mx-auto ${className}`}
    >
      <div className="w-16 h-16 rounded-full bg-white text-primary border-2 border-[#172117] shadow-neo-sm flex items-center justify-center mb-4">
        <CheckCircle2 className="w-8 h-8 text-primary" aria-hidden="true" />
      </div>

      <h3 className="font-serif text-xl sm:text-2xl font-bold text-dark-green mb-2">
        {title}
      </h3>

      <p className="font-serif text-sm sm:text-base text-text-muted mb-6 leading-relaxed max-w-md">
        {message}
      </p>

      {(primaryAction || secondaryAction) && (
        <div className="flex flex-wrap items-center justify-center gap-3">
          {primaryAction && (
            <Button
              variant="primary"
              onClick={primaryAction.onClick}
              leftIcon={primaryAction.icon}
            >
              {primaryAction.label}
            </Button>
          )}
          {secondaryAction && (
            <Button
              variant="outline"
              onClick={secondaryAction.onClick}
            >
              {secondaryAction.label}
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default SuccessState;
