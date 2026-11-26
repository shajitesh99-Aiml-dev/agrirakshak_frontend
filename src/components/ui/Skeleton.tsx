import React from 'react';

export type SkeletonVariant = 'text' | 'circular' | 'rectangular' | 'button';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: SkeletonVariant;
  width?: string | number;
  height?: string | number;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  variant = 'text',
  width,
  height,
  className = '',
  style,
  ...props
}) => {
  const variantClasses: Record<SkeletonVariant, string> = {
    text: 'h-4 w-full rounded-small',
    circular: 'rounded-full w-10 h-10 shrink-0',
    rectangular: 'w-full h-32 rounded-card',
    button: 'w-28 h-11 rounded-medium',
  };

  const customStyle: React.CSSProperties = {
    ...style,
    ...(width !== undefined ? { width: typeof width === 'number' ? `${width}px` : width } : {}),
    ...(height !== undefined ? { height: typeof height === 'number' ? `${height}px` : height } : {}),
  };

  return (
    <div
      role="status"
      aria-label="Loading..."
      className={`animate-pulse bg-[#E2EBE1]/80 ${variantClasses[variant]} ${className}`}
      style={customStyle}
      {...props}
    />
  );
};

export default Skeleton;
