import React from 'react';

export type CardVariant =
  | 'default'
  | 'elevated'
  | 'outlined'
  | 'interactive'
  | 'success'
  | 'warning'
  | 'info';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: CardVariant;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ children, variant = 'default', padding = 'md', className = '', ...props }, ref) => {
    const variantStyles: Record<CardVariant, string> = {
      default: 'bg-card border-2 border-[#172117] shadow-neo',
      elevated: 'bg-card border-2 border-[#172117] shadow-neo-lg',
      outlined: 'bg-card border-2 border-[#172117] shadow-neo',
      interactive:
        'bg-card border-2 border-[#172117] shadow-neo hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-neo-sm cursor-pointer transition-all',
      success: 'bg-[#E8F5E9] border-2 border-[#172117] shadow-neo',
      warning: 'bg-[#FFF8E1] border-2 border-[#172117] shadow-neo',
      info: 'bg-[#E1F5FE] border-2 border-[#172117] shadow-neo',
    };

    const paddingStyles = {
      none: 'p-0',
      sm: 'p-3.5 sm:p-4',
      md: 'p-5 sm:p-6',
      lg: 'p-6 sm:p-8',
    };

    return (
      <div
        ref={ref}
        className={`rounded-md transition-all duration-150 text-text ${variantStyles[variant]} ${paddingStyles[padding]} ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export const CardHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className = '',
  ...props
}) => (
  <div className={`mb-3 flex flex-col space-y-1.5 ${className}`} {...props}>
    {children}
  </div>
);

export const CardTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({
  children,
  className = '',
  ...props
}) => (
  <h3 className={`font-serif text-lg sm:text-xl font-bold tracking-tight text-dark-green ${className}`} {...props}>
    {children}
  </h3>
);

export const CardDescription: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({
  children,
  className = '',
  ...props
}) => (
  <p className={`font-serif text-sm text-text-muted leading-relaxed ${className}`} {...props}>
    {children}
  </p>
);

export const CardContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className = '',
  ...props
}) => (
  <div className={`font-serif text-base text-text ${className}`} {...props}>
    {children}
  </div>
);

export const CardFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className = '',
  ...props
}) => (
  <div className={`mt-4 pt-4 border-t-2 border-[#172117] flex items-center justify-between gap-3 flex-wrap ${className}`} {...props}>
    {children}
  </div>
);

export default Card;
