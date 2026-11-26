import React from 'react';
import { AIAnalysisStatus as StatusType } from '../../../../types/ai';
import Button from '../../../../components/ui/Button';
import { Sparkles, AlertCircle, RefreshCw } from 'lucide-react';

interface AIAnalysisStatusProps {
  status: StatusType;
  isAnalyzing: boolean;
  error?: string | null;
  canRetry?: boolean;
  onRequestAnalysis: () => void;
  className?: string;
}

export const AIAnalysisStatus: React.FC<AIAnalysisStatusProps> = ({
  status,
  isAnalyzing,
  error,
  canRetry = true,
  onRequestAnalysis,
  className = '',
}) => {
  // Not Started view
  if (status === 'not_started') {
    return (
      <div
        className={`p-6 sm:p-8 rounded-card bg-gradient-to-br from-primary-50 via-white to-neutral-50 border border-primary/30 shadow-card text-center sm:text-left flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 ${className}`}
      >
        <div className="space-y-1.5 max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary/10 text-primary-dark text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-primary" aria-hidden="true" />
            <span>AI Diagnostic Engine Ready</span>
          </div>
          <h3 className="text-xl font-bold text-neutral-900 tracking-tight">
            AI Crop Analysis
          </h3>
          <p className="text-sm text-neutral-600 leading-relaxed font-sans">
            Your crop report is ready for analysis. Our artificial intelligence system will inspect the reported symptoms and suggest immediate actionable advice.
          </p>
        </div>

        <div className="shrink-0 flex justify-center sm:justify-end">
          <Button
            variant="primary"
            size="lg"
            onClick={onRequestAnalysis}
            disabled={isAnalyzing}
            isLoading={isAnalyzing}
            className="w-full sm:w-auto shadow-sm gap-2 min-h-[44px]"
            aria-label="Analyze crop problem with AI"
          >
            <Sparkles className="w-4 h-4 text-accent-light" aria-hidden="true" />
            <span>Analyze Crop Problem</span>
          </Button>
        </div>
      </div>
    );
  }

  // Failed state view
  if (status === 'failed') {
    return (
      <div
        role="alert"
        className={`p-6 rounded-card bg-red-50 border border-red-200 text-red-950 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 ${className}`}
      >
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center shrink-0 mt-0.5">
            <AlertCircle className="w-5 h-5 text-red-700" aria-hidden="true" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-red-950">
              AI Analysis Unavailable
            </h3>
            <p className="text-sm text-red-800 leading-relaxed font-sans">
              {error || "We couldn't complete the analysis right now. Please check your network connection or try again in a few moments."}
            </p>
          </div>
        </div>

        {canRetry && (
          <div className="shrink-0 flex justify-end">
            <Button
              variant="outline"
              size="md"
              onClick={onRequestAnalysis}
              disabled={isAnalyzing}
              isLoading={isAnalyzing}
              className="gap-2 border-red-300 text-red-900 hover:bg-red-100 min-h-[44px]"
            >
              <RefreshCw className="w-4 h-4" aria-hidden="true" />
              <span>Try Again</span>
            </Button>
          </div>
        )}
      </div>
    );
  }

  return null;
};

export default AIAnalysisStatus;
