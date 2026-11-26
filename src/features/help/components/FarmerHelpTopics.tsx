import React from 'react';
import Card from '../../../components/ui/Card';
import { Camera, Sun, Focus, Layers } from 'lucide-react';
import { useI18n } from '../../../i18n';

export const FarmerHelpTopics: React.FC = () => {
  const { t } = useI18n();

  const tips = [
    {
      icon: <Sun className="w-5 h-5 text-accent" />,
      title: t('help.tip1Title'),
      desc: t('help.tip1Desc'),
    },
    {
      icon: <Focus className="w-5 h-5 text-primary" />,
      title: t('help.tip2Title'),
      desc: t('help.tip2Desc'),
    },
    {
      icon: <Layers className="w-5 h-5 text-ai" />,
      title: t('help.tip3Title'),
      desc: t('help.tip3Desc'),
    },
  ];

  return (
    <Card padding="lg" className="border-2 border-[#172117] shadow-neo space-y-6 font-serif">
      <div className="border-b-2 border-[#172117] pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-md bg-[#E8F5E9] border-2 border-[#172117] shadow-[2px_2px_0px_#172117] flex items-center justify-center text-[#2E7D32]">
            <Camera className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-black text-[#172117]">
              {t('help.guideTitle')}
            </h2>
            <p className="text-xs sm:text-sm text-[#496274] font-medium">
              {t('help.guideDesc')}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {tips.map((tip, idx) => (
          <div
            key={idx}
            className="p-4 rounded-md bg-[#FAFDF9] border-2 border-[#172117] shadow-[2px_2px_0px_#172117] space-y-2 flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="w-8 h-8 rounded-md bg-white flex items-center justify-center shadow-[1px_1px_0px_#172117] border border-[#172117]">
                {tip.icon}
              </div>
              <h3 className="text-sm font-black text-[#172117]">{tip.title}</h3>
              <p className="text-xs text-[#496274] leading-relaxed font-medium">{tip.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default FarmerHelpTopics;
