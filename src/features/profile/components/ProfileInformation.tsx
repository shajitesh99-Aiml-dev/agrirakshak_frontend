import React from 'react';
import { User, Farmer, AgriculturalOfficer, Administrator } from '../../../types';
import Card from '../../../components/ui/Card';
import { User as UserIcon, MapPin, Globe, Shield, Phone, Mail, Award, CheckCircle } from 'lucide-react';
import { useI18n } from '../../../i18n';

interface ProfileInformationProps {
  user: User;
}

export const ProfileInformation: React.FC<ProfileInformationProps> = ({ user }) => {
  const { t } = useI18n();

  const getLanguageLabel = (code?: string) => {
    switch (code) {
      case 'te':
        return 'Telugu (తెలుగు)';
      case 'hi':
        return 'Hindi (हिन्दी)';
      case 'kn':
        return 'Kannada (ಕನ್ನಡ)';
      case 'en':
      default:
        return 'English';
    }
  };

  const isFarmer = user.role === 'farmer';
  const isOfficer = user.role === 'officer';
  const isAdmin = user.role === 'admin';

  const farmerData = isFarmer ? (user as Farmer) : null;
  const officerData = isOfficer ? (user as AgriculturalOfficer) : null;
  const adminData = isAdmin ? (user as Administrator) : null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-serif">
      {/* Card 1: Personal & Contact Information */}
      <Card padding="lg" className="border-[#DCE7DC] shadow-card space-y-4">
        <div className="flex items-center gap-2 border-b border-[#EAEFE9] pb-3">
          <div className="w-8 h-8 rounded-medium bg-primary-light flex items-center justify-center text-primary">
            <UserIcon className="w-4 h-4" />
          </div>
          <h2 className="text-base font-bold text-dark-green">
            {t('profile.personalInfo')}
          </h2>
        </div>

        <div className="space-y-3.5 text-sm">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-text-subtle block">
              {t('profile.fullName')}
            </span>
            <span className="font-bold text-text text-base">{user.name}</span>
          </div>

          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-text-muted shrink-0" />
            <div>
              <span className="text-xs text-text-subtle block">{t('profile.email')}</span>
              <span className="font-medium text-text">{user.email || '—'}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-text-muted shrink-0" />
            <div>
              <span className="text-xs text-text-subtle block">{t('profile.phone')}</span>
              <span className="font-medium text-text">{user.phone || user.phoneNumber || '—'}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-text-muted shrink-0" />
            <div>
              <span className="text-xs text-text-subtle block">{t('profile.preferredLanguage')}</span>
              <span className="font-medium text-primary-dark font-sans">
                {getLanguageLabel(user.preferred_language || user.preferredLanguage)}
              </span>
            </div>
          </div>
        </div>
      </Card>

      {/* Card 2: Role & Jurisdiction Specific Information */}
      <Card padding="lg" className="border-[#DCE7DC] shadow-card space-y-4">
        <div className="flex items-center gap-2 border-b border-[#EAEFE9] pb-3">
          <div className="w-8 h-8 rounded-medium bg-primary-light flex items-center justify-center text-primary">
            {isFarmer ? (
              <MapPin className="w-4 h-4 text-primary" />
            ) : isOfficer ? (
              <Shield className="w-4 h-4 text-ai" />
            ) : (
              <Award className="w-4 h-4 text-purple-700" />
            )}
          </div>
          <h2 className="text-base font-bold text-dark-green">
            {isFarmer
              ? t('profile.locationInfo')
              : isOfficer
              ? t('profile.officerProfile')
              : t('profile.systemInfo')}
          </h2>
        </div>

        <div className="space-y-3.5 text-sm">
          {/* Farmer Location & Farm Area */}
          {isFarmer && (
            <>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="text-xs text-text-subtle block">{t('profile.village')}</span>
                  <span className="font-bold text-text">{farmerData?.village || 'Navsari'}</span>
                </div>
                <div>
                  <span className="text-xs text-text-subtle block">{t('profile.district')}</span>
                  <span className="font-bold text-text">{farmerData?.district || 'Navsari'}</span>
                </div>
              </div>

              <div>
                <span className="text-xs text-text-subtle block">{t('profile.state')}</span>
                <span className="font-bold text-text">{farmerData?.state || 'Gujarat'}</span>
              </div>

              <div>
                <span className="text-xs text-text-subtle block">{t('profile.farmSize')}</span>
                <span className="font-bold text-text">
                  {farmerData?.farmSizeAcres ? `${farmerData.farmSizeAcres} Acres` : '4.5 Acres'}
                </span>
              </div>
            </>
          )}

          {/* Officer Jurisdiction & Department */}
          {isOfficer && (
            <>
              <div>
                <span className="text-xs text-text-subtle block">{t('profile.assignedDistrict')}</span>
                <span className="font-bold text-text">
                  {officerData?.district || 'Nashik District, Maharashtra'}
                </span>
              </div>

              <div>
                <span className="text-xs text-text-subtle block">{t('profile.jurisdiction')}</span>
                <span className="font-bold text-text">
                  {officerData?.assignedJurisdiction || 'Western Agronomy Subdivision (Taluk 1-4)'}
                </span>
              </div>

              <div>
                <span className="text-xs text-text-subtle block">{t('profile.badgeNumber')}</span>
                <span className="font-bold text-ai font-mono">
                  {officerData?.badgeNumber || 'KVK-AGR-MH-2026-084'}
                </span>
              </div>
            </>
          )}

          {/* Admin Region & Security */}
          {isAdmin && (
            <>
              <div>
                <span className="text-xs text-text-subtle block">{t('profile.administrativeRegion')}</span>
                <span className="font-bold text-text">
                  National Headquarters • State Surveillance Grid
                </span>
              </div>

              <div>
                <span className="text-xs text-text-subtle block">{t('profile.permissions')}</span>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {(adminData?.permissions || [
                    'all_districts_view',
                    'model_monitoring',
                    'outbreak_quarantine_broadcast',
                  ]).map((perm, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1 text-[11px] font-sans px-2 py-0.5 rounded-full bg-purple-50 text-purple-800 border border-purple-200"
                    >
                      <CheckCircle className="w-3 h-3 text-purple-600" />
                      {perm}
                    </span>
                  ))}
                </div>
              </div>
            </>
          )}

          <div>
            <span className="text-xs text-text-subtle block">{t('profile.role')}</span>
            <span className="inline-block px-2.5 py-0.5 text-xs font-semibold rounded-full bg-primary-light text-primary-dark mt-0.5 capitalize">
              {user.role}
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ProfileInformation;
