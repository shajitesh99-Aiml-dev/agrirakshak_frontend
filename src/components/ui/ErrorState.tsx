import React from 'react';
import { AlertCircle, RotateCcw } from 'lucide-react';
import Button from './Button';

export interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  retryLabel?: string;
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Something Went Wrong',
  message = 'We encountered an unexpected difficulty retrieving your agricultural data. Please check your network connection and try again.',
  onRetry,
  retryLabel = 'Try Again',
  secondaryAction,
  className = '',
}) => {
  return (
    <div
      role="alert"
      className={`p-8 sm:p-12 text-center rounded-md bg-[#FFEBEE] border-2 border-[#172117] shadow-neo flex flex-col items-center justify-center max-w-lg mx-auto ${className}`}
    >
      <div className="w-16 h-16 rounded-full bg-white text-semantic-error border-2 border-[#172117] shadow-neo-sm flex items-center justify-center mb-4">
        <AlertCircle className="w-8 h-8 text-semantic-error" aria-hidden="true" />
      </div>

      <h3 className="font-serif text-xl sm:text-2xl font-bold text-text mb-2">
        {title}
      </h3>

      <p className="font-serif text-sm sm:text-base text-text-muted mb-6 leading-relaxed max-w-md">
        {message}
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3">
        {onRetry && (
          <Button
            variant="primary"
            onClick={onRetry}
            leftIcon={<RotateCcw className="w-4 h-4" />}
          >
            {retryLabel}
          </Button>
        )}
        {secondaryAction && (
          <Button
            variant="ghost"
            onClick={secondaryAction.onClick}
          >
            {secondaryAction.label}
          </Button>
        )}
      </div>
    </div>
  );
};

export default ErrorState;
