import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sprout, ArrowRight, Calendar, AlertTriangle, ChevronRight, Camera } from 'lucide-react';
import { CropCase } from '../../../types';
import Card from '../../../components/ui/Card';
import StatusIndicator from '../../../components/ui/StatusIndicator';
import Badge from '../../../components/ui/Badge';
import Button from '../../../components/ui/Button';
import EmptyState from '../../../components/ui/EmptyState';
import { ROUTES } from '../../../routes/routeConfig';

interface RecentCasesProps {
  cases: CropCase[];
}

export const RecentCases: React.FC<RecentCasesProps> = ({ cases }) => {
  const navigate = useNavigate();

  const formatDate = (isoString: string) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      });
    } catch {
      return isoString;
    }
  };

  const getSeverityVariant = (severity?: string): 'info' | 'warning' | 'error' | 'success' => {
    switch (severity) {
      case 'critical':
      case 'high':
        return 'error';
      case 'moderate':
        return 'warning';
      case 'low':
        return 'success';
      default:
        return 'info';
    }
  };

  if (!cases || cases.length === 0) {
    return (
      <section aria-labelledby="recent-cases-heading" className="space-y-3">
        <h2 id="recent-cases-heading" className="text-lg sm:text-xl font-bold text-text-dark font-serif tracking-tight">
          Your Recent Crop Cases
        </h2>
        <EmptyState
          icon={<Sprout className="w-8 h-8 text-primary" />}
          title="No crop problems reported yet"
          description="When you notice unusual discoloration, leaf spotting, or pest damage in your fields, you can report it here to receive instant AI diagnosis and Krishi officer support."
          primaryAction={{
            label: 'Report Crop Problem',
            icon: <Camera className="w-4 h-4" />,
            onClick: () => navigate(ROUTES.FARMER_REPORT),
          }}
        />
      </section>
    );
  }

  return (
    <section aria-labelledby="recent-cases-heading" className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 id="recent-cases-heading" className="text-lg sm:text-xl font-bold text-text-dark font-serif tracking-tight">
          Your Recent Crop Cases
        </h2>
        <button
          type="button"
          onClick={() => navigate(ROUTES.FARMER_CASES)}
          className="text-xs sm:text-sm font-semibold text-primary hover:text-primary-dark transition-colors inline-flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-primary/20 rounded p-1"
        >
          <span>All Cases ({cases.length})</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-2.5">
        {cases.map((cropCase) => {
          const detailUrl = `/farmer/cases/${cropCase.id}`;
          const prediction = cropCase.prediction;

          return (
            <Card
              key={cropCase.id}
              padding="md"
              className="border-2 border-[#172117] shadow-neo bg-white hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-neo-sm transition-all duration-150 cursor-pointer group rounded-md"
              onClick={() => navigate(detailUrl)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  navigate(detailUrl);
                }
              }}
              aria-label={`Case ${cropCase.id} for ${cropCase.cropName}, status ${cropCase.status}`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                {/* Left details */}
                <div className="space-y-1.5 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-xs font-bold text-[#1B5E20] bg-[#E8F5E9] px-2 py-0.5 rounded-[4px] border border-[#172117] shadow-[1px_1px_0px_#172117]">
                      #{cropCase.id}
                    </span>
                    <h3 className="font-serif text-base sm:text-lg font-black text-[#172117] group-hover:text-[#2E7D32] transition-colors truncate">
                      {cropCase.cropName}
                    </h3>
                    {prediction?.severity && (
                      <Badge
                        variant={getSeverityVariant(prediction.severity)}
                        size="sm"
                        icon={prediction.severity === 'high' || prediction.severity === 'critical' ? <AlertTriangle className="w-3 h-3" /> : undefined}
                      >
                        {prediction.severity.toUpperCase()}
                      </Badge>
                    )}
                  </div>

                  {prediction?.diseaseName && (
                    <p className="font-serif text-sm text-text font-medium flex items-center gap-1.5">
                      <span className="text-primary font-semibold">Diagnosis:</span>
                      <span className="truncate">{prediction.diseaseName}</span>
                    </p>
                  )}

                  <div className="flex items-center gap-3 text-xs text-text-muted font-serif">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-text-subtle" />
                      <span>Reported {formatDate(cropCase.reportedAt)}</span>
                    </span>
                  </div>
                </div>

                {/* Right status & action */}
                <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#F0F5EF] shrink-0">
                  <StatusIndicator
                    status={cropCase.status}
                    label={
                      cropCase.status === 'analyzing'
                        ? 'AI Analysis Processing'
                        : cropCase.status === 'escalated' || cropCase.aiAnalysis?.requiresOfficerEscalation
                        ? 'Officer Review Required'
                        : cropCase.status === 'pending' && !cropCase.prediction && !cropCase.aiAnalysis
                        ? 'AI Analysis Available'
                        : undefined
                    }
                    size="sm"
                  />

                  <Button
                    variant="ghost"
                    size="sm"
                    rightIcon={<ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />}
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(detailUrl);
                    }}
                    className="text-primary font-semibold text-xs sm:text-sm px-2.5"
                  >
                    View Case
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </section>
  );
};

export default RecentCases;
