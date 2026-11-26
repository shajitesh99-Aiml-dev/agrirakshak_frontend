/**
 * Agri Rakshak - Authentication Validation Rules & Helpers
 * Provides accessible, farmer-friendly validation rules for login and registration.
 */

export const AUTH_VALIDATION_RULES = {
  EMAIL_OR_PHONE: {
    required: 'Mobile number or email address is required',
    validate: (value: string) => {
      const trimmed = value.trim();
      if (!trimmed) return 'Mobile number or email address is required';

      // 10-digit Indian phone regex (optionally with +91)
      const phoneRegex = /^(\+91[-\s]?)?[6-9]\d{9}$/;
      // Standard email regex
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (phoneRegex.test(trimmed) || emailRegex.test(trimmed)) {
        return true;
      }

      return 'Please enter a valid 10-digit mobile number or email address';
    },
  },
  NAME: {
    required: 'Full name is required',
    minLength: {
      value: 2,
      message: 'Name must be at least 2 characters long',
    },
    maxLength: {
      value: 100,
      message: 'Name cannot exceed 100 characters',
    },
  },
  PASSWORD: {
    required: 'Password is required',
    minLength: {
      value: 6,
      message: 'Password must be at least 6 characters long',
    },
    maxLength: {
      value: 64,
      message: 'Password cannot exceed 64 characters',
    },
  },
  CONFIRM_PASSWORD: (passwordToMatch: string) => ({
    required: 'Please confirm your password',
    validate: (value: string) =>
      value === passwordToMatch || 'Passwords do not match',
  }),
  CONSENT: {
    required: 'You must agree to the terms and privacy policy to continue',
  },
};

/**
 * Sanitizes and normalizes an email or phone number input
 */
export function sanitizeIdentifier(identifier: string): string {
  const trimmed = identifier.trim().toLowerCase();
  // If it's a 10-digit phone with or without country code, normalize
  const digitsOnly = trimmed.replace(/\D/g, '');
  if (digitsOnly.length === 10) {
    return digitsOnly;
  }
  if (digitsOnly.length === 12 && digitsOnly.startsWith('91')) {
    return digitsOnly.slice(2);
  }
  return trimmed;
}
