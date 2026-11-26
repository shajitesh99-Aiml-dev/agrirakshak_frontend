import React from 'react';
import { WifiOff, Wifi } from 'lucide-react';
import { useNetworkStatus } from '../../hooks/useNetworkStatus';
import { useI18n } from '../../i18n';

export const OfflineBanner: React.FC = () => {
  const { isOnline, showBackOnline } = useNetworkStatus();
  const { t } = useI18n();

  if (isOnline && !showBackOnline) {
    return null;
  }

  if (!isOnline) {
    return (
      <aside
        aria-live="polite"
        aria-label={t('offline.offlineBanner')}
        className="sticky top-0 z-50 bg-[#FFF3E0] border-b-2 border-[#172117] px-4 py-2 text-center text-xs sm:text-sm font-bold text-[#172117] flex items-center justify-center gap-2 shadow-neo-sm transition-all"
      >
        <WifiOff className="w-4 h-4 text-[#E65100] shrink-0 animate-pulse" />
        <span className="font-extrabold">{t('offline.offlineBanner')}</span>
      </aside>
    );
  }

  if (showBackOnline) {
    return (
      <aside
        aria-live="polite"
        aria-label={t('offline.onlineBanner')}
        className="sticky top-0 z-50 bg-[#E8F5E9] border-b-2 border-[#172117] px-4 py-2 text-center text-xs sm:text-sm font-bold text-[#1B5E20] flex items-center justify-center gap-2 shadow-neo-sm transition-all animate-fadeIn"
      >
        <Wifi className="w-4 h-4 text-[#2E7D32] shrink-0" />
        <span className="font-extrabold">{t('offline.onlineBanner')}</span>
      </aside>
    );
  }

  return null;
};

export default OfflineBanner;
