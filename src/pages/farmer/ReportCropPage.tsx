import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Send, X } from 'lucide-react';
import { useAuth } from '../../features/auth';
import { usePageTitle } from '../../hooks/usePageTitle';
import Breadcrumbs, { BreadcrumbItem } from '../../components/ui/Breadcrumbs';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Alert from '../../components/ui/Alert';
import { ROUTES } from '../../routes/routeConfig';
import { useI18n } from '../../i18n';
import {
  ReportStep,
  CaseFormData,
  useCreateCase,
  CASE_VALIDATION,
  ReportProgress,
  CropSelector,
  LocationFields,
  SymptomSelector,
  ProblemDescription,
  CropImageUploader,
  ReportReview,
  ReportSuccess,
  CancelConfirmDialog,
} from '../../features/cases';

export const ReportCropPage: React.FC = () => {
  usePageTitle('Report Crop Problem | Agri Rakshak');
  const { user } = useAuth();
  const navigate = useNavigate();
  const { t } = useI18n();

  const [currentStep, setCurrentStep] = useState<ReportStep>(1);
  const [maxStepAllowed, setMaxStepAllowed] = useState<ReportStep>(1);
  const [stepErrors, setStepErrors] = useState<Record<string, string>>({});
  const [showCancelDialog, setShowCancelDialog] = useState<boolean>(false);

  // Pre-fill profile defaults
  const userVillage = user && 'village' in user && user.village ? user.village : '';
  const userDistrict = user && 'district' in user && user.district ? user.district : '';
  const userState = user && 'state' in user && user.state ? user.state : 'Maharashtra';

  // Form state preserved throughout all steps and language changes
  const [formData, setFormData] = useState<CaseFormData>({
    cropName: '',
    cropCategory: '',
    cultivationStage: '',
    village: userVillage,
    district: userDistrict,
    state: userState,
    fieldNotes: '',
    problemDescription: '',
    symptoms: [],
    severity: 'moderate',
    images: [],
    consent: false,
  });

  const { submitCase, isSubmitting, error: apiError, createdCase, reset } = useCreateCase();

  const breadcrumbs: BreadcrumbItem[] = [
    { label: t('nav.home'), href: ROUTES.FARMER_DASHBOARD },
    { label: t('farmer.report.wizardTitle'), isCurrent: true },
  ];

  // Helper to detect if user has entered substantial data
  const isFormDirty =
    Boolean(formData.cropName) ||
    Boolean(formData.problemDescription) ||
    formData.images.length > 0;

  // Step validation
  const validateStep = (step: ReportStep): boolean => {
    let errors: Record<string, string> = {};

    if (step === 1) {
      errors = CASE_VALIDATION.validateStep1(formData);
    } else if (step === 2) {
      errors = CASE_VALIDATION.validateStep2(formData);
    } else if (step === 3) {
      errors = CASE_VALIDATION.validateStep3(formData);
    } else if (step === 4) {
      errors = CASE_VALIDATION.validateStep4(formData);
    }

    setStepErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setStepErrors({});
      const nextStep = (currentStep + 1) as ReportStep;
      setCurrentStep(nextStep);
      if (nextStep > maxStepAllowed) {
        setMaxStepAllowed(nextStep);
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setStepErrors({});
      setCurrentStep((currentStep - 1) as ReportStep);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleCancelClick = () => {
    if (isFormDirty) {
      setShowCancelDialog(true);
    } else {
      navigate(ROUTES.FARMER_DASHBOARD);
    }
  };

  const handleConfirmLeave = () => {
    setShowCancelDialog(false);
    navigate(ROUTES.FARMER_DASHBOARD);
  };

  const handleSubmit = async () => {
    if (!validateStep(4)) return;

    try {
      await submitCase(formData);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {
      // API error handled via hook state
    }
  };

  const handleReportAnother = () => {
    reset();
    setFormData({
      cropName: '',
      cropCategory: '',
      cultivationStage: '',
      village: userVillage,
      district: userDistrict,
      state: userState,
      fieldNotes: '',
      problemDescription: '',
      symptoms: [],
      severity: 'moderate',
      images: [],
      consent: false,
    });
    setCurrentStep(1);
    setMaxStepAllowed(1);
    setStepErrors({});
  };

  // If case successfully created, show Success screen
  if (createdCase) {
    return (
      <div className="space-y-6">
        <Breadcrumbs items={breadcrumbs} />
        <ReportSuccess
          createdCase={createdCase}
          onReportAnother={handleReportAnother}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6 font-serif max-w-4xl mx-auto pb-8">
      {/* Top Breadcrumbs */}
      <Breadcrumbs items={breadcrumbs} />

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-[#EAEFE9]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-dark-green tracking-tight">
            {t('farmer.report.wizardTitle')}
          </h1>
          <p className="text-sm text-text-muted mt-1">
            {t('farmer.report.wizardSubtitle')}
          </p>
        </div>

        <Button
          variant="ghost"
          size="sm"
          leftIcon={<X className="w-4 h-4 text-text-muted" />}
          onClick={handleCancelClick}
          className="text-text-muted hover:text-text self-start sm:self-center"
        >
          {t('common.cancel')}
        </Button>
      </div>

      {/* Multi-step progress bar */}
      <ReportProgress
        currentStep={currentStep}
        maxStepAllowed={maxStepAllowed}
        onStepClick={(step) => {
          if (step < currentStep || validateStep(currentStep)) {
            setStepErrors({});
            setCurrentStep(step);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }}
      />

      {/* API Submission Error Banner */}
      {apiError && (
        <Alert
          variant="error"
          title={t('common.error')}
          dismissible
          onDismiss={() => reset()}
        >
          {apiError}
        </Alert>
      )}

      {/* Step Card Container */}
      <Card padding="lg" className="bg-card border-[#E0EBE0] shadow-card">
        {/* STEP 1: Crop & Location */}
        {currentStep === 1 && (
          <div className="space-y-6 animate-fadeIn">
            <CropSelector
              cropName={formData.cropName}
              onCropChange={(crop) => {
                setFormData((prev) => ({ ...prev, cropName: crop }));
                if (stepErrors.cropName) {
                  setStepErrors((prev) => ({ ...prev, cropName: '' }));
                }
              }}
              cultivationStage={formData.cultivationStage}
              onStageChange={(stage) =>
                setFormData((prev) => ({ ...prev, cultivationStage: stage }))
              }
              errorMessage={stepErrors.cropName}
            />

            <LocationFields
              village={formData.village}
              onVillageChange={(val) => {
                setFormData((prev) => ({ ...prev, village: val }));
                if (stepErrors.village) {
                  setStepErrors((prev) => ({ ...prev, village: '' }));
                }
              }}
              district={formData.district}
              onDistrictChange={(val) => {
                setFormData((prev) => ({ ...prev, district: val }));
                if (stepErrors.district) {
                  setStepErrors((prev) => ({ ...prev, district: '' }));
                }
              }}
              state={formData.state}
              onStateChange={(val) =>
                setFormData((prev) => ({ ...prev, state: val }))
              }
              fieldNotes={formData.fieldNotes}
              onFieldNotesChange={(val) =>
                setFormData((prev) => ({ ...prev, fieldNotes: val }))
              }
              villageError={stepErrors.village}
              districtError={stepErrors.district}
            />
          </div>
        )}

        {/* STEP 2: Symptoms & Problem */}
        {currentStep === 2 && (
          <div className="space-y-6 animate-fadeIn">
            <SymptomSelector
              selectedSymptoms={formData.symptoms}
              onToggleSymptom={(symptomId) => {
                setFormData((prev) => {
                  const exists = prev.symptoms.includes(symptomId);
                  const updated = exists
                    ? prev.symptoms.filter((id) => id !== symptomId)
                    : [...prev.symptoms, symptomId];
                  return { ...prev, symptoms: updated };
                });
                if (stepErrors.symptoms) {
                  setStepErrors((prev) => ({ ...prev, symptoms: '' }));
                }
              }}
            />
            {stepErrors.symptoms && (
              <p className="text-xs text-semantic-error font-medium">
                {stepErrors.symptoms}
              </p>
            )}

            <ProblemDescription
              description={formData.problemDescription}
              onDescriptionChange={(val) => {
                setFormData((prev) => ({ ...prev, problemDescription: val }));
                if (stepErrors.problemDescription) {
                  setStepErrors((prev) => ({ ...prev, problemDescription: '' }));
                }
              }}
              severity={formData.severity}
              onSeverityChange={(val) =>
                setFormData((prev) => ({ ...prev, severity: val }))
              }
              errorMessage={stepErrors.problemDescription}
            />
          </div>
        )}

        {/* STEP 3: Photos */}
        {currentStep === 3 && (
          <div className="animate-fadeIn">
            <CropImageUploader
              images={formData.images}
              onAddImage={(item) => {
                setFormData((prev) => ({
                  ...prev,
                  images: [...prev.images, item],
                }));
                if (stepErrors.images) {
                  setStepErrors((prev) => ({ ...prev, images: '' }));
                }
              }}
              onRemoveImage={(id) => {
                setFormData((prev) => ({
                  ...prev,
                  images: prev.images.filter((img) => img.id !== id),
                }));
              }}
              errorMessage={stepErrors.images}
            />
          </div>
        )}

        {/* STEP 4: Review & Submit */}
        {currentStep === 4 && (
          <div className="animate-fadeIn">
            <ReportReview
              formData={formData}
              onEditStep={(step) => setCurrentStep(step)}
              consent={formData.consent}
              onConsentChange={(val) => {
                setFormData((prev) => ({ ...prev, consent: val }));
                if (stepErrors.consent) {
                  setStepErrors((prev) => ({ ...prev, consent: '' }));
                }
              }}
              consentError={stepErrors.consent}
            />
          </div>
        )}

        {/* Bottom Navigation Buttons */}
        <div className="pt-6 mt-6 border-t border-[#EAEFE9] flex items-center justify-between gap-3">
          {currentStep > 1 ? (
            <Button
              type="button"
              variant="outline"
              size="md"
              leftIcon={<ArrowLeft className="w-4 h-4" />}
              onClick={handleBack}
              disabled={isSubmitting}
              className="font-semibold"
            >
              {t('common.back')}
            </Button>
          ) : (
            <Button
              type="button"
              variant="ghost"
              size="md"
              onClick={handleCancelClick}
              disabled={isSubmitting}
              className="text-text-muted hover:text-text font-serif"
            >
              {t('common.cancel')}
            </Button>
          )}

          <div className="flex items-center gap-3">
            {currentStep < 4 ? (
              <Button
                type="button"
                variant="primary"
                size="md"
                rightIcon={<ArrowRight className="w-4 h-4" />}
                onClick={handleNext}
                className="font-bold min-h-[46px] px-6"
              >
                {t('common.next')}
              </Button>
            ) : (
              <Button
                type="button"
                variant="primary"
                size="md"
                rightIcon={!isSubmitting ? <Send className="w-4 h-4" /> : undefined}
                isLoading={isSubmitting}
                disabled={isSubmitting || !formData.consent}
                onClick={handleSubmit}
                className="font-bold min-h-[46px] px-8 text-base shadow-medium"
              >
                {isSubmitting ? t('farmer.report.submittingBtn') : t('farmer.report.submitBtn')}
              </Button>
            )}
          </div>
        </div>
      </Card>

      {/* Discard Confirmation Dialog */}
      <CancelConfirmDialog
        isOpen={showCancelDialog}
        onClose={() => setShowCancelDialog(false)}
        onConfirmLeave={handleConfirmLeave}
      />
    </div>
  );
};

export default ReportCropPage;
