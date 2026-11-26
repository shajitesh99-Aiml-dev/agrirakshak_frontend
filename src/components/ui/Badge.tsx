import React from 'react';

export type BadgeVariant = 'default' | 'success' | 'warning' | 'error' | 'info' | 'neutral';
export type BadgeSize = 'sm' | 'md';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  icon?: React.ReactNode;
  showDot?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'md',
  icon,
  showDot = false,
  className = '',
  ...props
}) => {
  const variantStyles: Record<BadgeVariant, { container: string; dot: string }> = {
    default: {
      container: 'bg-[#E8F5E9] text-[#1B5E20] border-[#172117]',
      dot: 'bg-primary',
    },
    success: {
      container: 'bg-[#C8E6C9] text-[#1B5E20] border-[#172117]',
      dot: 'bg-primary',
    },
    warning: {
      container: 'bg-[#FFF8E1] text-[#E65100] border-[#172117]',
      dot: 'bg-semantic-warning',
    },
    error: {
      container: 'bg-[#FFEBEE] text-[#C62828] border-[#172117]',
      dot: 'bg-semantic-error',
    },
    info: {
      container: 'bg-[#E1F5FE] text-[#01579B] border-[#172117]',
      dot: 'bg-semantic-info',
    },
    neutral: {
      container: 'bg-[#ECEFF1] text-[#172117] border-[#172117]',
      dot: 'bg-[#172117]',
    },
  };

  const sizeStyles: Record<BadgeSize, string> = {
    sm: 'text-xs px-2.5 py-0.5 gap-1',
    md: 'text-sm px-3 py-1 gap-1.5',
  };

  const selectedVariant = variantStyles[variant];

  return (
    <span
      className={`inline-flex items-center font-serif font-bold rounded-[4px] border-[1.5px] shadow-[1.5px_1.5px_0px_#172117] select-none ${selectedVariant.container} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {showDot && (
        <span
          className={`w-1.5 h-1.5 rounded-full shrink-0 ${selectedVariant.dot}`}
          aria-hidden="true"
        />
      )}
      {icon && <span className="shrink-0 inline-flex items-center">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};

export default Badge;
