import React from 'react';

export interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical';
  label?: React.ReactNode;
}

export const Divider: React.FC<DividerProps> = ({
  orientation = 'horizontal',
  label,
  className = '',
  ...props
}) => {
  if (orientation === 'vertical') {
    return (
      <div
        role="separator"
        aria-orientation="vertical"
        className={`inline-block w-px self-stretch bg-[#E0EBE0] min-h-[16px] ${className}`}
        {...props}
      />
    );
  }

  if (label) {
    return (
      <div
        role="separator"
        aria-orientation="horizontal"
        className={`relative flex items-center justify-center my-4 ${className}`}
        {...props}
      >
        <div className="flex-grow border-t border-[#E0EBE0]" />
        <span className="flex-shrink mx-3 font-serif text-xs font-semibold text-text-muted bg-background px-2 select-none uppercase tracking-wider">
          {label}
        </span>
        <div className="flex-grow border-t border-[#E0EBE0]" />
      </div>
    );
  }

  return (
    <hr
      className={`my-4 border-0 border-t border-[#E0EBE0] w-full ${className}`}
      {...props}
    />
  );
};

export default Divider;
