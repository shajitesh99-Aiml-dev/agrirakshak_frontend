import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FolderOpen, Clock, Sparkles, CheckCircle2, ChevronRight } from 'lucide-react';
import Card from '../../../components/ui/Card';
import { FarmerCaseCounts } from '../../../types/dashboard';
import { ROUTES } from '../../../routes/routeConfig';
import { useI18n } from '../../../i18n';

interface DashboardSummaryCardsProps {
  summary: FarmerCaseCounts;
}

export const DashboardSummaryCards: React.FC<DashboardSummaryCardsProps> = ({ summary }) => {
  const navigate = useNavigate();
  const { t, formatNumber } = useI18n();

  const cards = [
    {
      id: 'total',
      label: t('farmer.totalCases'),
      sublabel: t('common.all'),
      count: summary.total,
      icon: <FolderOpen className="w-5 h-5 text-primary" />,
      accentBg: 'bg-primary-light/60',
      borderColor: 'border-[#CFDCD0]',
      textColor: 'text-dark-green',
      filterRoute: ROUTES.FARMER_CASES,
    },
    {
      id: 'pending',
      label: t('farmer.pendingReview'),
      sublabel: t('common.pending'),
      count: summary.pending,
      icon: <Clock className="w-5 h-5 text-semantic-warning" />,
      accentBg: 'bg-semantic-warning-bg',
      borderColor: 'border-[#FFE0B2]',
      textColor: 'text-semantic-warning-text',
      filterRoute: ROUTES.FARMER_CASES,
    },
    {
      id: 'analyzing',
      label: t('farmer.analyzedCases'),
      sublabel: t('ai.categoryLabel'),
      count: summary.analyzing,
      icon: <Sparkles className="w-5 h-5 text-ai animate-pulse" />,
      accentBg: 'bg-semantic-info-bg',
      borderColor: 'border-[#B3E5FC]',
      textColor: 'text-semantic-info-text',
      filterRoute: ROUTES.FARMER_CASES,
    },
    {
      id: 'resolved',
      label: t('farmer.resolvedCases'),
      sublabel: t('common.resolved'),
      count: summary.resolved,
      icon: <CheckCircle2 className="w-5 h-5 text-semantic-success-text" />,
      accentBg: 'bg-semantic-success-bg',
      borderColor: 'border-[#C8E6C9]',
      textColor: 'text-semantic-success-text',
      filterRoute: ROUTES.FARMER_CASES,
    },
  ];

  return (
    <section aria-label="Farmer Case Summary Metrics">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        {cards.map((card) => (
          <Card
            key={card.id}
            variant="interactive"
            onClick={() => navigate(card.filterRoute)}
            className="p-4 sm:p-5 flex flex-col justify-between transition-all bg-white border-2 border-[#172117] shadow-neo rounded-md cursor-pointer"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2.5 rounded-md border-2 border-[#172117] shadow-[2px_2px_0px_#172117] ${card.accentBg}`}>
                  {card.icon}
                </div>
                <ChevronRight className="w-4 h-4 text-[#172117]" />
              </div>
              <h2 className="text-xs sm:text-sm font-bold text-[#496274] leading-tight">
                {card.label}
              </h2>
            </div>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-2xl sm:text-3xl font-black tracking-tight text-[#172117]">
                {formatNumber(card.count)}
              </span>
              <span className="text-[11px] text-[#496274] font-bold truncate max-w-[90px] sm:max-w-none">
                {card.sublabel}
              </span>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default DashboardSummaryCards;
