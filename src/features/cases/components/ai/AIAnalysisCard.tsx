import React from 'react';
import { AIAnalysisResult, AIAnalysisStatus as StatusType } from '../../../../types/ai';
import PredictionResult from './PredictionResult';
import ConfidenceIndicator from './ConfidenceIndicator';
import SeverityIndicator from './SeverityIndicator';
import ObservedSymptoms from './ObservedSymptoms';
import PossibleCauses from './PossibleCauses';
import FarmerRecommendations from './FarmerRecommendations';
import AIWarningCard from './AIWarningCard';
import AIAnalysisStatus from './AIAnalysisStatus';
import AIAnalysisSkeleton from './AIAnalysisSkeleton';
import Button from '../../../../components/ui/Button';
import { Sparkles, RefreshCw } from 'lucide-react';
import { useI18n } from '../../../../i18n';

interface AIAnalysisCardProps {
  analysis: AIAnalysisResult | null;
  status: StatusType;
  isAnalyzing: boolean;
  error?: string | null;
  canRetry?: boolean;
  onRequestAnalysis: () => void;
  className?: string;
}

export const AIAnalysisCard: React.FC<AIAnalysisCardProps> = ({
  analysis,
  status,
  isAnalyzing,
  error,
  canRetry = true,
  onRequestAnalysis,
  className = '',
}) => {
  const { t, formatDate } = useI18n();

  // 1. Loading/Analyzing state
  if (isAnalyzing || status === 'processing') {
    return <AIAnalysisSkeleton />;
  }

  // 2. Not started or failed states
  if (status === 'not_started' || status === 'failed') {
    return (
      <AIAnalysisStatus
        status={status}
        isAnalyzing={isAnalyzing}
        error={error}
        canRetry={canRetry}
        onRequestAnalysis={onRequestAnalysis}
        className={className}
      />
    );
  }

  // 3. Completed state
  if (status === 'completed' && analysis) {
    return (
      <section
        aria-label="AI Analysis Results"
        className={`p-5 sm:p-7 rounded-md bg-white border-2 border-[#172117] shadow-neo-lg space-y-6 ${className}`}
      >
        {/* Header with Title and Re-analyze Button */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-[#172117] pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-md bg-[#E8F5E9] border-2 border-[#172117] shadow-[2px_2px_0px_#172117] flex items-center justify-center text-[#2E7D32]">
              <Sparkles className="w-5 h-5 text-[#2E7D32]" aria-hidden="true" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-black text-[#172117] tracking-tight">
                {t('ai.cardTitle')}
              </h3>
              <p className="text-xs text-[#496274] font-bold">
                {analysis.analyzedAt
                  ? `${t('ai.subtitle')} (${formatDate(analysis.analyzedAt)})`
                  : t('ai.subtitle')}
              </p>
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={onRequestAnalysis}
            disabled={isAnalyzing}
            isLoading={isAnalyzing}
            className="text-xs text-[#172117] gap-1.5 min-h-[36px]"
            aria-label={t('common.refresh')}
          >
            <RefreshCw className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{t('common.refresh')}</span>
          </Button>
        </div>

        {/* Prediction Display */}
        <PredictionResult
          prediction={analysis.prediction}
          explanation={analysis.explanation}
        />

        {/* Confidence & Severity Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <ConfidenceIndicator confidence={analysis.prediction?.confidence} />
          <div className="p-3.5 bg-[#FAFDF9] rounded-md border-2 border-[#172117] shadow-neo-sm flex flex-col justify-between">
            <span className="text-xs font-black text-[#172117]">{t('ai.severityLabel')}</span>
            <SeverityIndicator severity={analysis.severity} className="mt-2" />
          </div>
        </div>

        {/* Observed Symptoms */}
        <ObservedSymptoms symptoms={analysis.observedSymptoms} />

        {/* Possible Causes */}
        <PossibleCauses causes={analysis.possibleCauses} />

        {/* Farmer Actionable Recommendations */}
        <FarmerRecommendations recommendations={analysis.recommendations} />

        {/* Warnings, Escalation & Disclaimer */}
        <AIWarningCard
          warnings={analysis.warnings}
          requiresOfficerEscalation={analysis.requiresOfficerEscalation}
          escalationReason={analysis.escalationReason}
          isMock={analysis.isMock}
        />
      </section>
    );
  }

  return null;
};

export default AIAnalysisCard;
