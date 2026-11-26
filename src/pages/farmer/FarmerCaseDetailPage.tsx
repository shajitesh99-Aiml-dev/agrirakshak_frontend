import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  FileText,
  MapPin,
  Calendar,
  Camera,
  ArrowLeft,
  AlertCircle,
  Clock,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { Breadcrumbs, BreadcrumbItem } from '../../components/ui/Breadcrumbs';
import Badge, { BadgeVariant } from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Skeleton from '../../components/ui/Skeleton';
import { ROUTES } from '../../routes/routeConfig';
import { CropCase } from '../../types';
import { caseService } from '../../services/caseService';
import { useCaseAnalysis } from '../../features/cases/hooks/useCaseAnalysis';
import { AIAnalysisCard } from '../../features/cases/components/ai/AIAnalysisCard';

export const FarmerCaseDetailPage: React.FC = () => {
  const { caseId } = useParams<{ caseId?: string }>();
  const [cropCase, setCropCase] = useState<CropCase | null>(null);
  const [isLoadingCase, setIsLoadingCase] = useState<boolean>(true);
  const [caseError, setCaseError] = useState<string | null>(null);

  // Load case record
  useEffect(() => {
    let isMounted = true;

    async function fetchCase() {
      if (!caseId) {
        setIsLoadingCase(false);
        setCaseError('No Case ID provided.');
        return;
      }

      setIsLoadingCase(true);
      setCaseError(null);

      try {
        const found = await caseService.getCaseById(caseId);
        if (!isMounted) return;

        if (found) {
          setCropCase(found);
        } else {
          setCaseError(`Case #${caseId} could not be found.`);
        }
      } catch (err: unknown) {
        if (!isMounted) return;
        const msg = err instanceof Error ? err.message : 'Unable to load case information.';
        setCaseError(msg);
      } finally {
        if (isMounted) {
          setIsLoadingCase(false);
        }
      }
    }

    fetchCase();
    return () => {
      isMounted = false;
    };
  }, [caseId]);

  // AI Analysis Hook
  const {
    analysis,
    status: aiStatus,
    isAnalyzing,
    error: aiError,
    canRetry,
    requestAnalysis,
  } = useCaseAnalysis({
    caseId: caseId || '',
    initialAnalysis: cropCase?.aiAnalysis || null,
    cropName: cropCase?.cropName,
    symptoms: cropCase?.symptoms,
    description: cropCase?.description,
  });

  const breadcrumbs: BreadcrumbItem[] = [
    { label: 'Farmer Home', href: ROUTES.FARMER_DASHBOARD },
    { label: 'My Cases', href: ROUTES.FARMER_CASES },
    { label: caseId ? `#${caseId}` : 'Case Details', isCurrent: true },
  ];

  const getStatusBadge = (status?: string): { variant: BadgeVariant; label: string; icon: React.ReactNode } => {
    switch (status) {
      case 'resolved':
        return {
          variant: 'success',
          label: 'Resolved',
          icon: <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />,
        };
      case 'analyzing':
        return {
          variant: 'warning',
          label: 'Under AI Analysis',
          icon: <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />,
        };
      case 'escalated':
        return {
          variant: 'error',
          label: 'Officer Escalated',
          icon: <AlertCircle className="w-3.5 h-3.5" aria-hidden="true" />,
        };
      case 'pending':
      default:
        return {
          variant: 'neutral',
          label: 'Pending Review',
          icon: <Clock className="w-3.5 h-3.5" aria-hidden="true" />,
        };
    }
  };

  // 1. Loading Skeleton View
  if (isLoadingCase) {
    return (
      <main className="min-h-screen bg-neutral-50/50 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto space-y-6">
          <Skeleton variant="rectangular" height={24} width={220} />
          <div className="p-6 bg-white rounded-card border border-neutral-200 space-y-4">
            <Skeleton variant="rectangular" height={32} width="40%" />
            <Skeleton variant="text" width="60%" />
            <Skeleton variant="rectangular" height={160} />
          </div>
        </div>
      </main>
    );
  }

  // 2. Error View
  if (caseError || !cropCase) {
    return (
      <main className="min-h-screen bg-neutral-50/50 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl mx-auto text-center space-y-4 p-8 bg-white rounded-card border border-neutral-200 shadow-sm">
          <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
            <AlertCircle className="w-6 h-6" aria-hidden="true" />
          </div>
          <h1 className="text-xl font-bold text-neutral-900">Case Record Unavailable</h1>
          <p className="text-sm text-neutral-600 font-sans leading-relaxed">
            {caseError || 'The requested crop case details could not be found or retrieved from the server.'}
          </p>
          <div className="pt-2">
            <Link to={ROUTES.FARMER_CASES}>
              <Button variant="primary" size="md" className="gap-2">
                <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                <span>Return to My Cases</span>
              </Button>
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const statusBadge = getStatusBadge(cropCase.status);
  const locationString = [cropCase.village, cropCase.district, cropCase.state]
    .filter(Boolean)
    .join(', ') || 'Location Recorded at Field Submission';

  // Gather photos from imageUrls array or single legacy imageUrl
  const photos = cropCase.imageUrls && cropCase.imageUrls.length > 0
    ? cropCase.imageUrls
    : cropCase.imageUrl
      ? [cropCase.imageUrl]
      : [];

  return (
    <main className="min-h-screen bg-neutral-50/60 pb-16 pt-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Navigation & Breadcrumbs */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Breadcrumbs items={breadcrumbs} />
          <Link
            to={ROUTES.FARMER_CASES}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-600 hover:text-primary transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Back to All Cases</span>
          </Link>
        </div>

        {/* Header Summary Banner */}
        <header className="p-6 rounded-card bg-white border border-neutral-200 shadow-xs flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="font-mono text-xs font-bold px-2.5 py-1 bg-neutral-100 text-neutral-800 rounded border border-neutral-200">
                #{cropCase.id}
              </span>
              <Badge variant={statusBadge.variant} size="md" className="gap-1.5 font-semibold text-xs">
                {statusBadge.icon}
                <span>{statusBadge.label}</span>
              </Badge>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight">
              {cropCase.cropName} Case Details
            </h1>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-neutral-500 pt-0.5">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-neutral-400" aria-hidden="true" />
                <span>Reported {new Date(cropCase.reportedAt).toLocaleDateString()}</span>
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-neutral-400" aria-hidden="true" />
                <span>{locationString}</span>
              </span>
            </div>
          </div>

          <div className="shrink-0 flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.print()}
              className="text-xs text-neutral-700 hidden sm:inline-flex"
            >
              Print Record
            </Button>
          </div>
        </header>

        {/* Main Content Sections: Stacked order optimized for mobile & desktop */}
        <div className="space-y-6">
          {/* SECTION 1: Case Information & Agronomic Parameters */}
          <section
            aria-label="Crop and field parameters"
            className="p-5 sm:p-6 rounded-card bg-white border border-neutral-200 shadow-xs space-y-4"
          >
            <div className="flex items-center gap-2 border-b border-neutral-100 pb-3">
              <FileText className="w-4 h-4 text-primary" aria-hidden="true" />
              <h2 className="text-base font-bold text-neutral-900">
                Case &amp; Field Information
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-100">
                <span className="text-xs text-neutral-500 block">Reported Crop</span>
                <span className="font-semibold text-neutral-900 text-sm mt-0.5 block">
                  {cropCase.cropName}
                </span>
              </div>

              <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-100">
                <span className="text-xs text-neutral-500 block">Growth Stage</span>
                <span className="font-semibold text-neutral-900 text-sm mt-0.5 block">
                  {cropCase.growthStage || cropCase.cultivationStage || 'Vegetative Stage'}
                </span>
              </div>

              <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-100">
                <span className="text-xs text-neutral-500 block">Field Location</span>
                <span className="font-semibold text-neutral-900 text-sm mt-0.5 block truncate" title={locationString}>
                  {locationString}
                </span>
              </div>
            </div>

            {/* Farmer's Symptoms & Problem Description */}
            <div className="space-y-3 pt-2">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                  Reported Symptoms
                </h3>
                {cropCase.symptoms && cropCase.symptoms.length > 0 ? (
                  <div className="flex flex-wrap gap-1.5">
                    {cropCase.symptoms.map((sym, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-primary-50 text-primary-dark border border-primary/20"
                      >
                        {sym}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-neutral-500 italic">No specific symptom tags recorded.</p>
                )}
              </div>

              {cropCase.description && (
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">
                    Problem Description
                  </h3>
                  <p className="text-sm text-neutral-700 bg-neutral-50 p-3.5 rounded-lg border border-neutral-100 leading-relaxed font-sans">
                    {cropCase.description}
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* SECTION 2: Submitted Crop Photographs */}
          <section
            aria-label="Submitted crop photographs"
            className="p-5 sm:p-6 rounded-card bg-white border border-neutral-200 shadow-xs space-y-3"
          >
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
              <div className="flex items-center gap-2">
                <Camera className="w-4 h-4 text-primary" aria-hidden="true" />
                <h2 className="text-base font-bold text-neutral-900">
                  Field Photographs ({photos.length})
                </h2>
              </div>
              <span className="text-xs text-neutral-500">
                {photos.length > 0 ? 'Submitted for computer vision inspection' : 'No photos attached'}
              </span>
            </div>

            {photos.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 pt-1">
                {photos.map((url, idx) => (
                  <div
                    key={idx}
                    className="relative aspect-square rounded-lg overflow-hidden border border-neutral-200 bg-neutral-100 group shadow-2xs"
                  >
                    <img
                      src={url}
                      alt={`Crop photo ${idx + 1} for ${cropCase.cropName}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                      loading="lazy"
                    />
                    <div className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-black/60 text-white text-[10px] font-mono">
                      Photo {idx + 1}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-4 rounded-lg bg-neutral-50 border border-neutral-200 text-center text-xs text-neutral-500">
                <span>No photos were attached during report creation.</span>
              </div>
            )}
          </section>

          {/* SECTION 3: AI Disease/Pest Detection & Analysis Component */}
          <section aria-label="AI Disease & Pest Detection Analysis">
            <AIAnalysisCard
              analysis={analysis}
              status={aiStatus}
              isAnalyzing={isAnalyzing}
              error={aiError}
              canRetry={canRetry}
              onRequestAnalysis={requestAnalysis}
            />
          </section>
        </div>
      </div>
    </main>
  );
};

export default FarmerCaseDetailPage;
