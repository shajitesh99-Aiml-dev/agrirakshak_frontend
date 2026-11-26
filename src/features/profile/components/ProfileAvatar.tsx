import React from 'react';
import { UserRole } from '../../../types';
import Avatar from '../../../components/ui/Avatar';

interface ProfileAvatarProps {
  name: string;
  role: UserRole;
  avatarUrl?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const ProfileAvatar: React.FC<ProfileAvatarProps> = ({
  name,
  role,
  avatarUrl,
  size = 'lg',
}) => {
  const getRoleBadgeColor = () => {
    switch (role) {
      case 'farmer':
        return 'bg-primary border-white text-white';
      case 'officer':
        return 'bg-ai border-white text-white';
      case 'admin':
        return 'bg-purple-700 border-white text-white';
      default:
        return 'bg-text-muted border-white text-white';
    }
  };

  return (
    <div className="relative inline-block">
      <Avatar
        name={name}
        src={avatarUrl}
        size={size}
        className="ring-4 ring-primary/10 shadow-soft"
      />
      <span
        title={`Active ${role}`}
        className={`absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 ${getRoleBadgeColor()}`}
      />
    </div>
  );
};

export default ProfileAvatar;
