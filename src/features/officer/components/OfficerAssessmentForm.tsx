import React from 'react';
import { useForm, useWatch } from 'react-hook-form';
import {
  OfficerCase,
  SubmitReviewRequest,
  OfficerAssessmentOutcome,
} from '../types/officerTypes';
import {
  Stethoscope,
  Send,
  AlertCircle,
  CalendarCheck,
  CheckCircle2,
  Info,
} from 'lucide-react';
import Button from '../../../components/ui/Button';

interface OfficerAssessmentFormProps {
  cropCase: OfficerCase;
  onSubmitReview: (data: SubmitReviewRequest) => Promise<void>;
  isSubmitting: boolean;
  onOpenFieldVisitDialog?: () => void;
}

interface FormValues {
  outcome: OfficerAssessmentOutcome;
  assessment: string;
  advisory: string;
  additionalObservations: string;
  requiresFollowUp: boolean;
  requiresEscalation: boolean;
  scheduleVisitNow: boolean;
}

export const OfficerAssessmentForm: React.FC<OfficerAssessmentFormProps> = ({
  cropCase,
  onSubmitReview,
  isSubmitting,
  onOpenFieldVisitDialog,
}) => {
  const defaultOutcome: OfficerAssessmentOutcome =
    cropCase.status === 'escalated' ? 'escalated' : 'confirmed_ai';

  const defaultAssessment = cropCase.aiAnalysis?.prediction
    ? `Confirmed field symptoms of ${cropCase.aiAnalysis.prediction.label} based on photographic examination and reported foliar discoloration.`
    : '';

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      outcome: defaultOutcome,
      assessment: cropCase.officerReview?.assessment || defaultAssessment,
      advisory:
        cropCase.officerReview?.advisory ||
        'Follow recommended sanitation practices: remove heavily affected leaves, avoid overhead sprinkler watering, and spray bio-fungicide during clear morning hours.',
      additionalObservations: cropCase.officerReview?.additionalObservations || '',
      requiresFollowUp: cropCase.officerReview?.requiresFollowUp ?? false,
      requiresEscalation: cropCase.officerReview?.requiresEscalation ?? (cropCase.status === 'escalated'),
      scheduleVisitNow: Boolean(cropCase.fieldVisit?.required),
    },
  });

  const selectedOutcome = useWatch({
    control,
    name: 'outcome',
    defaultValue: defaultOutcome,
  });

  const onFormSubmit = async (values: FormValues) => {
    const isEscalation = values.outcome === 'escalated' || values.requiresEscalation;
    const isResolved = values.outcome === 'resolved' || values.outcome === 'confirmed_ai';

    const payload: SubmitReviewRequest = {
      assessment: values.assessment,
      outcome: values.outcome,
      advisory: values.advisory,
      additionalObservations: values.additionalObservations || undefined,
      requiresFollowUp: values.requiresFollowUp,
      requiresEscalation: isEscalation,
      newStatus: isEscalation ? 'escalated' : isResolved ? 'resolved' : 'under_review',
    };

    await onSubmitReview(payload);
  };

  return (
    <section
      aria-label="Officer Clinical Agronomy Assessment"
      className="p-5 sm:p-6 rounded-card bg-white border border-neutral-200 shadow-sm space-y-5"
    >
      <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
        <div className="flex items-center gap-2">
          <Stethoscope className="w-5 h-5 text-primary" aria-hidden="true" />
          <h2 className="text-base sm:text-lg font-bold text-neutral-900 tracking-tight">
            Agronomist Clinical Assessment &amp; Advisory Form
          </h2>
        </div>
        <span className="text-xs font-semibold text-primary bg-primary-light px-2.5 py-0.5 rounded-full">
          Official Triage Record
        </span>
      </div>

      {cropCase.officerReview && (
        <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200 text-xs text-emerald-900 flex items-start gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <strong>Previously Reviewed: </strong>
            <span>
              By {cropCase.officerReview.officerName} on{' '}
              {new Date(cropCase.officerReview.reviewedAt).toLocaleDateString()} ({cropCase.officerReview.outcome}).
              Submitting below will record an updated assessment.
            </span>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
        {/* Review Outcome Radio Options */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-neutral-700 block">
            Triage Outcome &amp; Decision *
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 text-xs">
            <label
              className={`p-3 rounded-lg border cursor-pointer flex items-start gap-2.5 transition-all ${
                selectedOutcome === 'confirmed_ai'
                  ? 'bg-emerald-50 border-primary text-emerald-950 font-bold'
                  : 'bg-neutral-50/60 border-neutral-200 text-neutral-700 hover:bg-neutral-100'
              }`}
            >
              <input
                type="radio"
                value="confirmed_ai"
                {...register('outcome', { required: true })}
                className="mt-0.5 text-primary focus:ring-primary"
              />
              <div>
                <span className="block">Confirm AI Finding</span>
                <span className="text-[11px] text-neutral-500 font-normal">Corroborates computer vision diagnosis</span>
              </div>
            </label>

            <label
              className={`p-3 rounded-lg border cursor-pointer flex items-start gap-2.5 transition-all ${
                selectedOutcome === 'modified_ai'
                  ? 'bg-amber-50 border-amber-500 text-amber-950 font-bold'
                  : 'bg-neutral-50/60 border-neutral-200 text-neutral-700 hover:bg-neutral-100'
              }`}
            >
              <input
                type="radio"
                value="modified_ai"
                {...register('outcome', { required: true })}
                className="mt-0.5 text-amber-600 focus:ring-amber-500"
              />
              <div>
                <span className="block">Modify / Custom Advisory</span>
                <span className="text-[11px] text-neutral-500 font-normal">Adjusted based on local microclimate</span>
              </div>
            </label>

            <label
              className={`p-3 rounded-lg border cursor-pointer flex items-start gap-2.5 transition-all ${
                selectedOutcome === 'escalated'
                  ? 'bg-rose-50 border-rose-500 text-rose-950 font-bold'
                  : 'bg-neutral-50/60 border-neutral-200 text-neutral-700 hover:bg-neutral-100'
              }`}
            >
              <input
                type="radio"
                value="escalated"
                {...register('outcome', { required: true })}
                className="mt-0.5 text-rose-600 focus:ring-rose-500"
              />
              <div>
                <span className="block">Escalate to Specialist</span>
                <span className="text-[11px] text-neutral-500 font-normal">Outbreak risk or viral identification</span>
              </div>
            </label>

            <label
              className={`p-3 rounded-lg border cursor-pointer flex items-start gap-2.5 transition-all ${
                selectedOutcome === 'rejected_ai'
                  ? 'bg-neutral-100 border-neutral-400 text-neutral-900 font-bold'
                  : 'bg-neutral-50/60 border-neutral-200 text-neutral-700 hover:bg-neutral-100'
              }`}
            >
              <input
                type="radio"
                value="rejected_ai"
                {...register('outcome', { required: true })}
                className="mt-0.5 text-neutral-600 focus:ring-neutral-500"
              />
              <div>
                <span className="block">Inconclusive Photo</span>
                <span className="text-[11px] text-neutral-500 font-normal">Request clearer close-up photograph</span>
              </div>
            </label>

            <label
              className={`p-3 rounded-lg border cursor-pointer flex items-start gap-2.5 transition-all ${
                selectedOutcome === 'resolved'
                  ? 'bg-teal-50 border-teal-500 text-teal-950 font-bold'
                  : 'bg-neutral-50/60 border-neutral-200 text-neutral-700 hover:bg-neutral-100'
              }`}
            >
              <input
                type="radio"
                value="resolved"
                {...register('outcome', { required: true })}
                className="mt-0.5 text-teal-600 focus:ring-teal-500"
              />
              <div>
                <span className="block">Verify &amp; Mark Resolved</span>
                <span className="text-[11px] text-neutral-500 font-normal">Complete advisory provided</span>
              </div>
            </label>
          </div>
        </div>

        {/* Professional Assessment Textarea */}
        <div className="space-y-1">
          <label htmlFor="assessment" className="text-xs font-bold uppercase tracking-wider text-neutral-700 block">
            Professional Agronomist Assessment *
          </label>
          <textarea
            id="assessment"
            rows={3}
            {...register('assessment', {
              required: 'Assessment notes are required before submitting triage decision.',
              minLength: { value: 10, message: 'Please provide at least 10 characters of professional assessment.' },
            })}
            placeholder="Record your clinical diagnostic findings, confirming or modifying the AI reference output..."
            className={`w-full p-3 rounded-lg border text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-hidden focus:ring-2 focus:ring-primary ${
              errors.assessment ? 'border-red-400 bg-red-50/30' : 'border-neutral-300 bg-white'
            }`}
          />
          {errors.assessment && (
            <p className="text-xs text-red-600 flex items-center gap-1 mt-1">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{errors.assessment.message}</span>
            </p>
          )}
        </div>

        {/* Farmer-Facing Advisory */}
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <label htmlFor="advisory" className="text-xs font-bold uppercase tracking-wider text-neutral-700 block">
              Farmer-Facing Advisory &amp; Guidance *
            </label>
            <span className="text-[11px] text-neutral-500">Delivered directly to farmer's portal</span>
          </div>
          <textarea
            id="advisory"
            rows={3}
            {...register('advisory', {
              required: 'Farmer advisory is mandatory.',
              minLength: { value: 15, message: 'Please provide actionable guidance of at least 15 characters.' },
            })}
            placeholder="Safe, actionable next steps: cultural sanitation, organic bio-protection, watering adjustments..."
            className={`w-full p-3 rounded-lg border text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-hidden focus:ring-2 focus:ring-primary ${
              errors.advisory ? 'border-red-400 bg-red-50/30' : 'border-neutral-300 bg-white'
            }`}
          />
          {errors.advisory && (
            <p className="text-xs text-red-600 flex items-center gap-1 mt-1">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{errors.advisory.message}</span>
            </p>
          )}

          <div className="p-2.5 bg-neutral-50 rounded border border-neutral-200 text-xs text-neutral-600 flex items-start gap-2">
            <Info className="w-3.5 h-3.5 text-neutral-400 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>Safe Advisory Policy: </strong> Do not write unverified chemical quantities or hazard instructions. Emphasize ICAR cultural management, bio-controls (Trichoderma, Neem), and certified field protocols.
            </p>
          </div>
        </div>

        {/* Additional Observations (Optional) */}
        <div className="space-y-1">
          <label htmlFor="additionalObservations" className="text-xs font-bold uppercase tracking-wider text-neutral-600 block">
            Internal Agronomy Notes &amp; Observations (Optional)
          </label>
          <input
            id="additionalObservations"
            type="text"
            {...register('additionalObservations')}
            placeholder="E.g. Spore count sample taken; observed in adjacent plots 3B and 4A..."
            className="w-full p-2.5 rounded-lg border border-neutral-300 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-hidden focus:ring-2 focus:ring-primary bg-white"
          />
        </div>

        {/* Checkbox Options & Field Visit Trigger */}
        <div className="pt-2 border-t border-neutral-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs">
          <div className="flex flex-wrap items-center gap-4">
            <label className="flex items-center gap-2 cursor-pointer font-medium text-neutral-700">
              <input
                type="checkbox"
                {...register('requiresFollowUp')}
                className="rounded border-neutral-300 text-primary focus:ring-primary w-4 h-4"
              />
              <span>Follow-up observation required in 7 days</span>
            </label>

            {onOpenFieldVisitDialog && (
              <button
                type="button"
                onClick={onOpenFieldVisitDialog}
                className="inline-flex items-center gap-1.5 text-indigo-700 hover:text-indigo-900 font-bold underline cursor-pointer"
              >
                <CalendarCheck className="w-4 h-4" />
                <span>{cropCase.fieldVisit?.required ? 'Update Field Visit Schedule' : 'Schedule On-Site Field Visit'}</span>
              </button>
            )}
          </div>

          <Button
            type="submit"
            variant="primary"
            size="md"
            disabled={isSubmitting}
            isLoading={isSubmitting}
            className="gap-2 shrink-0 min-h-[44px] shadow-xs"
          >
            <Send className="w-4 h-4" />
            <span>Submit Official Assessment</span>
          </Button>
        </div>
      </form>
    </section>
  );
};

export default OfficerAssessmentForm;
