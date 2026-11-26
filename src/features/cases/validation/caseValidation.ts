import { CaseFormData } from '../types/caseFormTypes';

export const CASE_VALIDATION = {
  MAX_IMAGES: 4,
  MAX_FILE_SIZE_BYTES: 10 * 1024 * 1024, // 10MB
  ACCEPTED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/webp'],

  validateStep1(data: Partial<CaseFormData>): Record<string, string> {
    const errors: Record<string, string> = {};

    if (!data.cropName || !data.cropName.trim()) {
      errors.cropName = 'Please select a crop from the list.';
    }

    if (!data.village || !data.village.trim()) {
      errors.village = 'Village / taluk name is required for field jurisdiction.';
    }

    if (!data.district || !data.district.trim()) {
      errors.district = 'District name is required.';
    }

    return errors;
  },

  validateStep2(data: Partial<CaseFormData>): Record<string, string> {
    const errors: Record<string, string> = {};

    if (!data.problemDescription || data.problemDescription.trim().length < 10) {
      errors.problemDescription =
        'Please describe what you are seeing in at least 10 characters so agronomists can understand the symptoms.';
    }

    return errors;
  },

  validateStep3(data: Partial<CaseFormData>): Record<string, string> {
    const errors: Record<string, string> = {};

    // Images are strongly recommended for diagnosis; text reports are supported if no camera available
    if (data.images && data.images.length > this.MAX_IMAGES) {
      errors.images = `You can upload up to ${this.MAX_IMAGES} photos per report.`;
    }

    return errors;
  },

  validateStep4(data: Partial<CaseFormData>): Record<string, string> {
    const errors: Record<string, string> = {};

    if (!data.consent) {
      errors.consent = 'You must give consent to process your crop report and photos for case creation.';
    }

    return errors;
  },

  validateFile(file: File): string | null {
    if (!this.ACCEPTED_IMAGE_TYPES.includes(file.type.toLowerCase())) {
      return 'Only JPG, PNG, or WEBP crop photos are accepted.';
    }

    if (file.size > this.MAX_FILE_SIZE_BYTES) {
      return 'Image exceeds maximum allowed size of 10MB. Please choose a smaller photo.';
    }

    return null;
  },
};
