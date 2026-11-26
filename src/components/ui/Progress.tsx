import React from 'react';

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number; // 0 to 100
  max?: number;
  label?: React.ReactNode;
  showValue?: boolean;
  isIndeterminate?: boolean;
  variant?: 'primary' | 'accent' | 'ai';
  size?: 'sm' | 'md' | 'lg';
}

export const Progress: React.FC<ProgressProps> = ({
  value = 0,
  max = 100,
  label,
  showValue = false,
  isIndeterminate = false,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}) => {
  const percentage = Math.min(100, Math.max(0, Math.round((value / max) * 100)));

  const sizeClasses = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  };

  const variantBarClasses = {
    primary: 'bg-primary',
    accent: 'bg-accent',
    ai: 'bg-ai',
  };

  return (
    <div className={`w-full ${className}`} {...props}>
      {(label || showValue) && (
        <div className="flex justify-between items-center mb-1.5 font-serif text-xs sm:text-sm text-text font-medium">
          {label && <span>{label}</span>}
          {showValue && !isIndeterminate && <span>{percentage}%</span>}
        </div>
      )}

      <div
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuenow={isIndeterminate ? undefined : percentage}
        className={`w-full bg-[#E8F5E9] border-2 border-[#172117] rounded-[4px] shadow-[1.5px_1.5px_0px_#172117] overflow-hidden ${sizeClasses[size]}`}
      >
        {isIndeterminate ? (
          <div
            className={`h-full w-1/3 rounded-none border-r-2 border-[#172117] animate-indeterminate ${variantBarClasses[variant]}`}
            style={{
              animation: 'indeterminate 1.5s infinite linear',
            }}
          />
        ) : (
          <div
            className={`h-full rounded-none border-r-2 border-[#172117] transition-all duration-300 ease-out ${variantBarClasses[variant]}`}
            style={{ width: `${percentage}%` }}
          />
        )}
      </div>
    </div>
  );
};

export default Progress;
