import React from 'react';
import Tooltip from './Tooltip';

export type IconButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
export type IconButtonSize = 'sm' | 'md' | 'lg';

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  'aria-label': string;
  tooltip?: string;
  variant?: IconButtonVariant;
  size?: IconButtonSize;
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      icon,
      'aria-label': ariaLabel,
      tooltip,
      variant = 'ghost',
      size = 'md',
      disabled = false,
      className = '',
      type = 'button',
      ...props
    },
    ref
  ) => {
    const variantStyles: Record<IconButtonVariant, string> = {
      primary:
        'bg-primary text-white border-2 border-[#172117] shadow-neo-sm hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_#172117] focus-visible:ring-primary',
      secondary:
        'bg-white text-[#172117] border-2 border-[#172117] shadow-neo-sm hover:bg-[#E8F5E9] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_#172117] focus-visible:ring-primary',
      outline:
        'border-2 border-[#172117] bg-[#E8F5E9] text-[#172117] shadow-neo-sm hover:bg-[#C8E6C9] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_#172117] focus-visible:ring-primary',
      ghost:
        'border-2 border-transparent text-text hover:border-[#172117] hover:bg-[#E8F5E9] hover:shadow-neo-sm focus-visible:ring-primary',
      destructive:
        'bg-semantic-error text-white border-2 border-[#172117] shadow-neo-sm hover:bg-[#B71C1C] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_#172117] focus-visible:ring-semantic-error',
    };

    // Ensure minimum 44px touch target on mobile across sizes
    const sizeStyles: Record<IconButtonSize, string> = {
      sm: 'min-w-[40px] min-h-[40px] p-2 text-sm',
      md: 'min-w-[44px] min-h-[44px] p-2.5 text-base',
      lg: 'min-w-[48px] min-h-[48px] p-3 text-lg',
    };

    const buttonElement = (
      <button
        ref={ref}
        type={type}
        disabled={disabled}
        aria-label={ariaLabel}
        className={`inline-flex items-center justify-center rounded-md transition-all duration-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-40 disabled:cursor-not-allowed select-none active:translate-x-[2px] active:translate-y-[2px] active:shadow-none ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
        {...props}
      >
        <span className="shrink-0 flex items-center justify-center pointer-events-none">
          {icon}
        </span>
      </button>
    );

    if (tooltip && !disabled) {
      return (
        <Tooltip content={tooltip} position="top">
          {buttonElement}
        </Tooltip>
      );
    }

    return buttonElement;
  }
);

IconButton.displayName = 'IconButton';

export default IconButton;
