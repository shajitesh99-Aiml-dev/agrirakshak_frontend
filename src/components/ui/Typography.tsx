import React from 'react';

export interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  className?: string;
}

export const Display: React.FC<TypographyProps> = ({ children, className = '', ...props }) => (
  <h1
    className={`font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-dark-green leading-none ${className}`}
    {...props}
  >
    {children}
  </h1>
);

export const PageTitle: React.FC<TypographyProps> = ({ children, className = '', ...props }) => (
  <h1
    className={`font-serif text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-dark-green leading-tight ${className}`}
    {...props}
  >
    {children}
  </h1>
);

export const SectionHeading: React.FC<TypographyProps> = ({ children, className = '', ...props }) => (
  <h2
    className={`font-serif text-xl sm:text-2xl md:text-3xl font-bold text-text leading-snug ${className}`}
    {...props}
  >
    {children}
  </h2>
);

export const Subheading: React.FC<TypographyProps> = ({ children, className = '', ...props }) => (
  <h3
    className={`font-serif text-lg sm:text-xl font-semibold text-text leading-normal ${className}`}
    {...props}
  >
    {children}
  </h3>
);

export const BodyText: React.FC<TypographyProps & { size?: 'sm' | 'base' | 'lg' }> = ({
  children,
  size = 'base',
  className = '',
  ...props
}) => {
  const sizeClasses = {
    sm: 'text-sm leading-relaxed',
    base: 'text-base leading-relaxed',
    lg: 'text-lg leading-relaxed',
  };
  return (
    <p className={`font-serif text-text ${sizeClasses[size]} ${className}`} {...props}>
      {children}
    </p>
  );
};

export const SmallText: React.FC<TypographyProps> = ({ children, className = '', ...props }) => (
  <p className={`font-serif text-sm text-text-muted leading-normal ${className}`} {...props}>
    {children}
  </p>
);

export const Label: React.FC<React.LabelHTMLAttributes<HTMLLabelElement> & { required?: boolean }> = ({
  children,
  required = false,
  className = '',
  ...props
}) => (
  <label
    className={`block font-serif text-sm font-semibold text-text mb-1.5 ${className}`}
    {...props}
  >
    {children}
    {required && <span className="text-semantic-error ml-1" aria-hidden="true">*</span>}
  </label>
);

export const HelperText: React.FC<TypographyProps & { error?: boolean }> = ({
  children,
  error = false,
  className = '',
  ...props
}) => (
  <p
    className={`font-serif text-xs sm:text-sm mt-1 leading-normal ${
      error ? 'text-semantic-error font-medium' : 'text-text-muted'
    } ${className}`}
    {...props}
  >
    {children}
  </p>
);

export const Caption: React.FC<TypographyProps> = ({ children, className = '', ...props }) => (
  <span className={`font-serif text-xs text-text-subtle tracking-wide uppercase ${className}`} {...props}>
    {children}
  </span>
);
