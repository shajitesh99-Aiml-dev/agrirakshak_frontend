import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  FarmerInfoCard,
  FarmerReportView,
  PhotoReviewGallery,
  AIAnalysisReviewCard,
  OfficerAssessmentForm,
  StatusChangeDialog,
  FieldVisitCard,
  FieldVisitDialog,
  CaseTimeline,
  useOfficerCase,
  useOfficerReview,
  useUpdateCaseStatus,
  CaseStatus,
  SubmitReviewRequest,
  FieldVisit,
} from '../../features/officer';
import { Breadcrumbs, BreadcrumbItem } from '../../components/ui/Breadcrumbs';
import Button from '../../components/ui/Button';
import Badge, { BadgeVariant } from '../../components/ui/Badge';
import Skeleton from '../../components/ui/Skeleton';
import {
  ArrowLeft,
  CalendarCheck,
  CheckCircle2,
  AlertOctagon,
  Clock,
  Sparkles,
  AlertCircle,
  FileCheck2,
} from 'lucide-react';
import { ROUTES } from '../../routes/routeConfig';

export const OfficerCaseDetailPage: React.FC = () => {
  const { caseId } = useParams<{ caseId?: string }>();
  const { caseData, setCaseData, isLoading, error, refreshCase } = useOfficerCase(caseId);

  // Dialog states
  const [statusDialogOpen, setStatusDialogOpen] = useState<boolean>(false);
  const [targetStatus, setTargetStatus] = useState<CaseStatus>('resolved');
  const [fieldVisitDialogOpen, setFieldVisitDialogOpen] = useState<boolean>(false);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  // Status & Review hooks
  const { updateStatus, isUpdating } = useUpdateCaseStatus({
    onSuccess: (updated) => {
      setCaseData(updated);
      setFeedbackMessage(`Case status successfully updated to ${updated.status.toUpperCase()}.`);
      setTimeout(() => setFeedbackMessage(null), 5000);
    },
  });

  const { submitReview, isSubmitting } = useOfficerReview({
    onSuccess: (updated) => {
      setCaseData(updated);
      setFeedbackMessage('Official agronomist assessment and advisory successfully recorded.');
      setTimeout(() => setFeedbackMessage(null), 5000);
    },
  });

  const breadcrumbs: BreadcrumbItem[] = [
    { label: 'Officer Home', href: ROUTES.OFFICER_DASHBOARD },
    { label: 'Triage Cases', href: ROUTES.OFFICER_CASES },
    { label: caseId ? `#${caseId}` : 'Case Review', isCurrent: true },
  ];

  const getStatusBadge = (status?: string): { variant: BadgeVariant; label: string; icon: React.ReactNode } => {
    switch (status) {
      case 'resolved':
        return { variant: 'success', label: 'Resolved & Verified', icon: <CheckCircle2 className="w-3.5 h-3.5" /> };
      case 'escalated':
        return { variant: 'error', label: 'Escalated to Specialist', icon: <AlertOctagon className="w-3.5 h-3.5" /> };
      case 'under_review':
        return { variant: 'info', label: 'Under Active Review', icon: <Clock className="w-3.5 h-3.5" /> };
      case 'analyzing':
        return { variant: 'info', label: 'Under AI Analysis', icon: <Sparkles className="w-3.5 h-3.5" /> };
      case 'pending':
      default:
        return { variant: 'warning', label: 'Pending Triage', icon: <Clock className="w-3.5 h-3.5" /> };
    }
  };

  const handleOpenStatusDialog = (status: CaseStatus) => {
    setTargetStatus(status);
    setStatusDialogOpen(true);
  };

  const handleSaveFieldVisit = async (visit: FieldVisit) => {
    if (!caseId || !caseData) return;
    const reviewPayload: SubmitReviewRequest = {
      assessment: caseData.officerReview?.assessment || 'Scheduled farm visit for on-site diagnostic inspection.',
      outcome: caseData.officerReview?.outcome || 'confirmed_ai',
      advisory: caseData.officerReview?.advisory || 'Officer on-site inspection scheduled. Please prepare field plots.',
      fieldVisit: visit,
      newStatus: 'under_review',
    };
    await submitReview(caseId, reviewPayload);
  };

  if (isLoading) {
    return (
      <div className="space-y-6 pb-12 animate-pulse">
        <Skeleton variant="rectangular" height={24} width={240} />
        <Skeleton variant="rectangular" height={120} className="rounded-card" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <Skeleton variant="rectangular" height={260} className="rounded-card" />
            <Skeleton variant="rectangular" height={260} className="rounded-card" />
          </div>
          <div className="space-y-4">
            <Skeleton variant="rectangular" height={300} className="rounded-card" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !caseData) {
    return (
      <div className="p-8 text-center bg-white rounded-card border border-neutral-200 shadow-xs space-y-4 max-w-lg mx-auto my-12">
        <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
          <AlertCircle className="w-6 h-6" />
        </div>
        <h2 className="text-lg font-bold text-neutral-900">Case Record Not Found</h2>
        <p className="text-sm text-neutral-600 font-sans leading-relaxed">
          {error || 'Unable to retrieve case information from the server.'}
        </p>
        <div className="flex items-center justify-center gap-3 pt-2">
          <Link to={ROUTES.OFFICER_CASES}>
            <Button variant="outline" size="sm" className="gap-1.5">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Queue</span>
            </Button>
          </Link>
          <Button variant="primary" size="sm" onClick={refreshCase}>
            Retry
          </Button>
        </div>
      </div>
    );
  }

  const badge = getStatusBadge(caseData.status);

  return (
    <div className="space-y-6 pb-16">
      {/* 1. Breadcrumbs Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Breadcrumbs items={breadcrumbs} />
        <Link
          to={ROUTES.OFFICER_CASES}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-600 hover:text-primary transition-colors focus-visible:outline-2 focus-visible:outline-primary rounded p-1"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Triage Queue</span>
        </Link>
      </div>

      {/* Feedback Banner */}
      {feedbackMessage && (
        <div
          role="status"
          className="p-4 rounded-card bg-emerald-50 border border-emerald-300 text-emerald-950 text-xs font-semibold flex items-center justify-between gap-2 shadow-xs animate-fadeIn"
        >
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{feedbackMessage}</span>
          </div>
          <button
            type="button"
            onClick={() => setFeedbackMessage(null)}
            className="text-emerald-700 hover:text-emerald-950 font-bold px-2 py-0.5 rounded cursor-pointer"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* 2. Top Header Summary Card */}
      <header className="p-5 sm:p-6 rounded-card bg-white border border-neutral-200 shadow-2xs flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="font-mono text-xs font-bold px-2.5 py-1 bg-neutral-100 text-neutral-800 rounded border border-neutral-200">
              #{caseData.id}
            </span>
            <Badge variant={badge.variant} size="md" className="gap-1.5 font-semibold text-xs">
              {badge.icon}
              <span>{badge.label}</span>
            </Badge>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-neutral-900 tracking-tight">
            {caseData.cropName} Triage &amp; Clinical Validation Workspace
          </h1>
          <p className="text-xs text-neutral-500 font-sans">
            Reported by {caseData.farmerName || 'Farmer'} on {new Date(caseData.reportedAt).toLocaleDateString()} • Last updated {new Date(caseData.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>

        {/* Quick Lifecycle Action Controls */}
        <div className="shrink-0 flex flex-wrap items-center gap-2">
          {caseData.status !== 'under_review' && caseData.status !== 'resolved' && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleOpenStatusDialog('under_review')}
              disabled={isUpdating}
              className="gap-1.5 text-xs text-blue-700 hover:bg-blue-50 border-blue-200 min-h-[38px]"
            >
              <Clock className="w-3.5 h-3.5" />
              <span>Mark Under Review</span>
            </Button>
          )}

          {caseData.status !== 'escalated' && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleOpenStatusDialog('escalated')}
              disabled={isUpdating}
              className="gap-1.5 text-xs text-red-700 hover:bg-red-50 border-red-200 min-h-[38px]"
            >
              <AlertOctagon className="w-3.5 h-3.5" />
              <span>Escalate Case</span>
            </Button>
          )}

          {caseData.status !== 'resolved' && (
            <Button
              variant="primary"
              size="sm"
              onClick={() => handleOpenStatusDialog('resolved')}
              disabled={isUpdating}
              className="gap-1.5 text-xs min-h-[38px] shadow-xs"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Resolve Case</span>
            </Button>
          )}

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setFieldVisitDialogOpen(true)}
            className="gap-1.5 text-xs text-indigo-700 hover:bg-indigo-50 min-h-[38px]"
          >
            <CalendarCheck className="w-3.5 h-3.5" />
            <span>Field Visit</span>
          </Button>
        </div>
      </header>

      {/* 3. Main Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 Cols): Case Information, Photos, AI Reference, & Officer Review Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Section: Farmer Information Card */}
          <FarmerInfoCard cropCase={caseData} />

          {/* Section: Farmer Report Details (Read-Only) */}
          <FarmerReportView cropCase={caseData} />

          {/* Section: Field Photos Inspection Gallery */}
          <PhotoReviewGallery
            imageUrls={caseData.imageUrls || (caseData.imageUrl ? [caseData.imageUrl] : [])}
            cropName={caseData.cropName}
          />

          {/* Section: AI Vision Reference Analysis (Advisory vs Human distinction) */}
          <AIAnalysisReviewCard analysis={caseData.aiAnalysis} />

          {/* Section: Officer Clinical Assessment & Advisory Form */}
          <OfficerAssessmentForm
            cropCase={caseData}
            onSubmitReview={async (payload) => {
              if (caseId) await submitReview(caseId, payload);
            }}
            isSubmitting={isSubmitting}
            onOpenFieldVisitDialog={() => setFieldVisitDialogOpen(true)}
          />
        </div>

        {/* Right Column (1 Col): Scheduled Field Visit, Summary, & Event Timeline */}
        <div className="space-y-6">
          {/* Scheduled Field Visit Card (if active) */}
          <FieldVisitCard
            fieldVisit={caseData.fieldVisit}
            onEdit={() => setFieldVisitDialogOpen(true)}
          />

          {/* Current Advisory Card (if already verified) */}
          {caseData.officerReview?.advisory && (
            <div className="p-4 sm:p-5 rounded-card bg-emerald-50/70 border border-emerald-200 shadow-2xs space-y-2">
              <div className="flex items-center gap-2 border-b border-emerald-200/60 pb-2">
                <FileCheck2 className="w-4 h-4 text-emerald-700" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-950">
                  Certified Advisory Issued
                </h3>
              </div>
              <p className="text-xs text-emerald-900 leading-relaxed font-sans">
                {caseData.officerReview.advisory}
              </p>
              <span className="text-[11px] text-emerald-700 block font-semibold">
                Issued by {caseData.officerReview.officerName} ({caseData.officerReview.outcome})
              </span>
            </div>
          )}

          {/* Case Lifecycle Audit Timeline */}
          <CaseTimeline timeline={caseData.timeline} />
        </div>
      </div>

      {/* Status Change Confirmation Modal */}
      <StatusChangeDialog
        isOpen={statusDialogOpen}
        onClose={() => setStatusDialogOpen(false)}
        targetStatus={targetStatus}
        caseId={caseData.id}
        onConfirm={async (status, note) => {
          if (caseId) await updateStatus(caseId, status, note);
        }}
        isUpdating={isUpdating}
      />

      {/* Field Visit Scheduling Modal */}
      <FieldVisitDialog
        isOpen={fieldVisitDialogOpen}
        onClose={() => setFieldVisitDialogOpen(false)}
        initialVisit={caseData.fieldVisit}
        defaultLocation={`${caseData.village || 'Plot 1'}, ${caseData.district || 'District'}`}
        onSave={handleSaveFieldVisit}
      />
    </div>
  );
};

export default OfficerCaseDetailPage;
