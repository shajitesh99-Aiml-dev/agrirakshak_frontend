import React from 'react';
import { Loader2 } from 'lucide-react';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'accent' | 'ghost' | 'destructive';
export type ButtonSize = 'sm' | 'md' | 'lg' | 'icon';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  loadingText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      loadingText,
      leftIcon,
      rightIcon,
      fullWidth = false,
      className = '',
      disabled,
      type = 'button',
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || isLoading;

    // Base styles: Neo-Brutalist 2px dark border, hard offset shadow, bold text, tactile press
    const baseStyles =
      'inline-flex items-center justify-center font-serif font-bold rounded-md border-2 border-[#172117] transition-all duration-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none';

    // Variant styles matching Agri Rakshak Neo-Brutalist color tokens
    const variantStyles: Record<ButtonVariant, string> = {
      primary:
        'bg-primary text-white shadow-neo-sm hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_#172117] hover:bg-dark-green active:translate-x-[2px] active:translate-y-[2px] active:shadow-none',
      secondary:
        'bg-white text-[#172117] shadow-neo-sm hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_#172117] hover:bg-[#E8F5E9] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none',
      outline:
        'bg-[#E8F5E9] text-[#172117] shadow-neo-sm hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_#172117] hover:bg-[#C8E6C9] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none',
      accent:
        'bg-accent text-[#172117] shadow-neo-sm hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_#172117] hover:bg-accent-hover active:translate-x-[2px] active:translate-y-[2px] active:shadow-none',
      ghost:
        'border-transparent text-[#172117] hover:border-[#172117] hover:bg-[#E8F5E9] hover:shadow-neo-sm active:translate-x-[1px] active:translate-y-[1px]',
      destructive:
        'bg-semantic-error text-white shadow-neo-sm hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_#172117] hover:bg-[#B71C1C] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none',
    };

    // Size styles: Ensures minimum 44px touch targets on mobile for md, lg, and icon
    const sizeStyles: Record<ButtonSize, string> = {
      sm: 'text-sm px-3.5 py-1.5 min-h-[36px] gap-1.5',
      md: 'text-base px-5 py-2.5 min-h-[44px] gap-2',
      lg: 'text-lg px-6 py-3 min-h-[48px] gap-2.5',
      icon: 'p-2.5 min-w-[44px] min-h-[44px] justify-center',
    };

    const widthStyle = fullWidth ? 'w-full' : '';

    return (
      <button
        ref={ref}
        type={type}
        disabled={isDisabled}
        aria-busy={isLoading}
        className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyle} ${className}`}
        {...props}
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin shrink-0" aria-hidden="true" />
            <span>{loadingText || children}</span>
          </>
        ) : (
          <>
            {leftIcon && <span className="inline-flex shrink-0 items-center">{leftIcon}</span>}
            {children && <span>{children}</span>}
            {rightIcon && <span className="inline-flex shrink-0 items-center">{rightIcon}</span>}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
