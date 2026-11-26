import React, { useState } from 'react';
import { User } from 'lucide-react';

export type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  name?: string;
  size?: AvatarSize;
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = 'User Avatar',
  name,
  size = 'md',
  className = '',
  ...props
}) => {
  const [imageError, setImageError] = useState(false);

  const sizeStyles: Record<AvatarSize, { container: string; icon: string; text: string }> = {
    sm: { container: 'w-8 h-8', icon: 'w-4 h-4', text: 'text-xs' },
    md: { container: 'w-10 h-10', icon: 'w-5 h-5', text: 'text-sm' },
    lg: { container: 'w-14 h-14', icon: 'w-7 h-7', text: 'text-base' },
    xl: { container: 'w-20 h-20', icon: 'w-10 h-10', text: 'text-xl' },
  };

  const getInitials = (fullName: string) => {
    const parts = fullName.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const selectedSize = sizeStyles[size];

  return (
    <div
      role="img"
      aria-label={name ? `${name}'s avatar` : alt}
      className={`relative inline-flex items-center justify-center rounded-full overflow-hidden bg-[#E8F5E9] border-2 border-[#172117] text-[#1B5E20] font-serif font-bold shadow-[1.5px_1.5px_0px_#172117] select-none shrink-0 ${selectedSize.container} ${className}`}
      {...props}
    >
      {src && !imageError ? (
        <img
          src={src}
          alt={alt}
          onError={() => setImageError(true)}
          className="w-full h-full object-cover"
        />
      ) : name ? (
        <span className={selectedSize.text}>{getInitials(name)}</span>
      ) : (
        <User className={`${selectedSize.icon} text-primary`} aria-hidden="true" />
      )}
    </div>
  );
};

export default Avatar;
