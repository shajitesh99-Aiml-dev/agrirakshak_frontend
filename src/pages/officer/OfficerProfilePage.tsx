import React, { useState } from 'react';
import { useProfile, useUpdateProfile, ProfileHeader, ProfileInformation, ProfileForm, ProfileSkeleton } from '../../features/profile';
import { BreadcrumbItem, Breadcrumbs } from '../../components/ui/Breadcrumbs';
import { ROUTES } from '../../routes/routeConfig';
import { usePageTitle } from '../../hooks/usePageTitle';
import { useI18n } from '../../i18n';
import Alert from '../../components/ui/Alert';

export const OfficerProfilePage: React.FC = () => {
  usePageTitle('Agri Rakshak | Officer Profile');
  const { t } = useI18n();
  const { profile, isLoading, error: fetchError } = useProfile();
  const { updateProfile, isUpdating, error: updateError, success, resetState } = useUpdateProfile();
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const breadcrumbs: BreadcrumbItem[] = [
    { label: t('nav.officerWorkspace'), href: ROUTES.OFFICER_DASHBOARD },
    { label: t('nav.profile'), isCurrent: true },
  ];

  if (isLoading || !profile) {
    return (
      <div className="space-y-6">
        <Breadcrumbs items={breadcrumbs} />
        <ProfileSkeleton />
      </div>
    );
  }

  return (
    <div className="space-y-6 font-serif">
      <Breadcrumbs items={breadcrumbs} />

      {fetchError && (
        <Alert variant="error" title={t('errors.general')}>
          {fetchError}
        </Alert>
      )}

      {/* Profile Header */}
      <ProfileHeader
        user={profile}
        isEditing={isEditing}
        onToggleEdit={() => {
          setIsEditing(!isEditing);
          resetState();
        }}
      />

      {/* Editing Form or Read-only Information */}
      {isEditing ? (
        <ProfileForm
          user={profile}
          onSave={async (data) => {
            const updated = await updateProfile(data);
            if (updated) {
              setIsEditing(false);
            }
            return updated;
          }}
          onCancel={() => {
            setIsEditing(false);
            resetState();
          }}
          isSaving={isUpdating}
          error={updateError}
          success={success}
        />
      ) : (
        <ProfileInformation user={profile} />
      )}
    </div>
  );
};

export default OfficerProfilePage;
