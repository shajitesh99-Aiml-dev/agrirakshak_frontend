import React, { useState } from 'react';
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from 'lucide-react';

export type AlertVariant = 'info' | 'success' | 'warning' | 'error';

export interface AlertProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  variant?: AlertVariant;
  title?: React.ReactNode;
  children: React.ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
  customIcon?: React.ReactNode;
}

export const Alert: React.FC<AlertProps> = ({
  variant = 'info',
  title,
  children,
  dismissible = false,
  onDismiss,
  customIcon,
  className = '',
  ...props
}) => {
  const [isDismissed, setIsDismissed] = useState(false);

  if (isDismissed) return null;

  const handleDismiss = () => {
    setIsDismissed(true);
    if (onDismiss) {
      onDismiss();
    }
  };

  const variantConfig = {
    info: {
      container: 'bg-[#E1F5FE] border-2 border-[#172117] text-[#172117]',
      iconColor: 'text-[#01579B]',
      defaultIcon: <Info className="w-5 h-5 text-[#01579B]" aria-hidden="true" />,
    },
    success: {
      container: 'bg-[#E8F5E9] border-2 border-[#172117] text-[#172117]',
      iconColor: 'text-primary',
      defaultIcon: <CheckCircle2 className="w-5 h-5 text-primary" aria-hidden="true" />,
    },
    warning: {
      container: 'bg-[#FFF8E1] border-2 border-[#172117] text-[#172117]',
      iconColor: 'text-[#E65100]',
      defaultIcon: <AlertTriangle className="w-5 h-5 text-[#E65100]" aria-hidden="true" />,
    },
    error: {
      container: 'bg-[#FFEBEE] border-2 border-[#172117] text-[#172117]',
      iconColor: 'text-semantic-error',
      defaultIcon: <AlertCircle className="w-5 h-5 text-semantic-error" aria-hidden="true" />,
    },
  };

  const config = variantConfig[variant];

  return (
    <div
      role={variant === 'error' ? 'alert' : 'status'}
      aria-live="polite"
      className={`relative p-4 rounded-md border-2 border-[#172117] shadow-neo flex items-start gap-3 transition-all ${config.container} ${className}`}
      {...props}
    >
      <div className={`shrink-0 mt-0.5 ${config.iconColor}`}>
        {customIcon || config.defaultIcon}
      </div>

      <div className="flex-1 font-serif text-sm sm:text-base leading-relaxed">
        {title && (
          <h4 className="font-serif font-bold text-base text-text mb-1">
            {title}
          </h4>
        )}
        <div className="text-text-muted">{children}</div>
      </div>

      {dismissible && (
        <button
          type="button"
          onClick={handleDismiss}
          aria-label="Dismiss alert"
          className="shrink-0 p-1 rounded-md border-2 border-[#172117] bg-white text-[#172117] shadow-[1px_1px_0px_#172117] hover:bg-[#E8F5E9] hover:translate-x-[1px] hover:translate-y-[1px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary min-w-[32px] min-h-[32px] flex items-center justify-center transition-all"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default Alert;
