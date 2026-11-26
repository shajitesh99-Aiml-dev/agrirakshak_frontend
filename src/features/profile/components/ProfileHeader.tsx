import React from 'react';
import { User } from '../../../types';
import ProfileAvatar from './ProfileAvatar';
import Badge from '../../../components/ui/Badge';
import Button from '../../../components/ui/Button';
import { Edit3, CheckCircle2, ShieldCheck, Sprout } from 'lucide-react';
import { useI18n } from '../../../i18n';

interface ProfileHeaderProps {
  user: User;
  isEditing: boolean;
  onToggleEdit: () => void;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  user,
  isEditing,
  onToggleEdit,
}) => {
  const { t } = useI18n();

  const getRoleMeta = () => {
    switch (user.role) {
      case 'farmer':
        return {
          title: t('profile.farmerProfile'),
          icon: <Sprout className="w-4 h-4 text-primary" />,
          variant: 'success' as const,
        };
      case 'officer':
        return {
          title: t('profile.officerProfile'),
          icon: <ShieldCheck className="w-4 h-4 text-ai" />,
          variant: 'info' as const,
        };
      case 'admin':
        return {
          title: t('profile.adminProfile'),
          icon: <CheckCircle2 className="w-4 h-4 text-purple-700" />,
          variant: 'warning' as const,
        };
      default:
        return {
          title: t('profile.profileTitle'),
          icon: null,
          variant: 'neutral' as const,
        };
    }
  };

  const meta = getRoleMeta();

  return (
    <div className="bg-gradient-to-r from-[#F2F7F0] via-white to-[#F0F7F2] p-6 rounded-card border border-[#DCE7DC] shadow-soft flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 font-serif">
      <div className="flex items-center gap-4">
        <ProfileAvatar
          name={user.name}
          role={user.role}
          avatarUrl={user.avatarUrl}
          size="lg"
        />
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold text-dark-green leading-snug">
              {user.name}
            </h1>
            <Badge variant={meta.variant} size="sm" className="font-sans">
              {meta.icon}
              <span className="ml-1 capitalize">{user.role}</span>
            </Badge>
          </div>
          <p className="text-xs sm:text-sm text-text-muted">
            {meta.title} • {user.email || user.phoneNumber || user.phone || 'Agri Rakshak User'}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
        <Button
          variant={isEditing ? 'outline' : 'primary'}
          size="sm"
          leftIcon={<Edit3 className="w-4 h-4" />}
          onClick={onToggleEdit}
        >
          {isEditing ? t('profile.cancelEdit') : t('profile.editProfile')}
        </Button>
      </div>
    </div>
  );
};

export default ProfileHeader;
