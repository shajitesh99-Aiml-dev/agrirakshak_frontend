import React from 'react';
import Card from '../../../components/ui/Card';
import { PhoneCall, ShieldAlert, Clock } from 'lucide-react';
import { useI18n } from '../../../i18n';

export const ContactSupportCard: React.FC = () => {
  const { t } = useI18n();

  return (
    <Card padding="lg" className="border-2 border-[#172117] shadow-neo bg-white font-serif">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
        <div className="flex items-start gap-4">
          <div className="w-11 h-11 rounded-md bg-[#E8F5E9] border-2 border-[#172117] shadow-[2px_2px_0px_#172117] flex items-center justify-center text-[#2E7D32] shrink-0">
            <PhoneCall className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base sm:text-lg font-black text-[#172117]">
              {t('help.helplineTitle')}
            </h3>
            <p className="text-xs sm:text-sm text-[#496274] leading-relaxed max-w-xl font-medium">
              {t('help.helplineDesc')}
            </p>
            <div className="flex items-center gap-3 pt-1 text-xs text-[#496274] font-bold font-sans">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#2E7D32]" />
                24 Hours • 7 Days
              </span>
              <span className="flex items-center gap-1">
                <ShieldAlert className="w-3.5 h-3.5 text-[#0288D1]" />
                Govt. Ministry of Agriculture
              </span>
            </div>
          </div>
        </div>

        <div className="w-full sm:w-auto text-left sm:text-right shrink-0">
          <a
            href="tel:18001801551"
            className="inline-flex items-center justify-center px-4 py-2.5 rounded-md bg-[#2E7D32] text-white font-black text-sm border-2 border-[#172117] shadow-[2px_2px_0px_#172117] hover:bg-[#1B5E20] active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all"
          >
            {t('help.helplineNumber')}
          </a>
        </div>
      </div>
    </Card>
  );
};

export default ContactSupportCard;
