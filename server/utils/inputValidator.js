/**
 * Input Validation and Sanitization Utility
 * Guards against:
 * - Path traversal in IDs
 * - Cross-site scripting (XSS) in free-text fields
 * - Unbounded string lengths and array flooding
 * - Malformed image uploads
 */

export function sanitizeText(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/[<>]/g, '') // Strip HTML tags
    .trim();
}

export function validateCaseId(caseId) {
  if (!caseId || typeof caseId !== 'string') return false;
  // Disallow path traversal characters like '..' or slashes
  const safeRegex = /^[a-zA-Z0-9_-]{3,64}$/;
  return safeRegex.test(caseId);
}

export function validateCreateCaseInput(body) {
  const errors = [];

  if (!body.cropName || typeof body.cropName !== 'string' || body.cropName.trim().length < 2) {
    errors.push('cropName is required and must be at least 2 characters.');
  } else if (body.cropName.length > 100) {
    errors.push('cropName must not exceed 100 characters.');
  }

  if (body.description && typeof body.description === 'string' && body.description.length > 3000) {
    errors.push('description must not exceed 3000 characters.');
  }

  if (body.symptoms) {
    if (!Array.isArray(body.symptoms)) {
      errors.push('symptoms must be an array of strings.');
    } else if (body.symptoms.length > 20) {
      errors.push('A maximum of 20 symptoms may be submitted.');
    } else {
      for (const s of body.symptoms) {
        if (typeof s !== 'string' || s.length > 100) {
          errors.push('Each symptom must be a string under 100 characters.');
          break;
        }
      }
    }
  }

  if (body.imageUrls) {
    if (!Array.isArray(body.imageUrls)) {
      errors.push('imageUrls must be an array.');
    } else if (body.imageUrls.length > 5) {
      errors.push('A maximum of 5 images may be submitted per case.');
    } else {
      for (const img of body.imageUrls) {
        if (typeof img !== 'string') {
          errors.push('Invalid image format.');
          break;
        }
        // Allow HTTPS URLs or base64 data URIs
        const isUrl = img.startsWith('https://') || img.startsWith('http://');
        const isBase64 = img.startsWith('data:image/');
        if (!isUrl && !isBase64) {
          errors.push('Images must be valid web URLs or base64 image data.');
          break;
        }
        if (isBase64) {
          // Check MIME type
          const mimeMatch = img.match(/^data:(image\/[a-zA-Z0-9.-]+);base64,/);
          if (!mimeMatch) {
            errors.push('Invalid base64 image encoding.');
            break;
          }
          const mime = mimeMatch[1].toLowerCase();
          const allowedMimes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
          if (!allowedMimes.includes(mime)) {
            errors.push(`Disallowed image format: ${mime}. Allowed: JPEG, PNG, WebP.`);
            break;
          }
          // Size check: roughly base64 length * 0.75 <= 6MB
          if (img.length > 8 * 1024 * 1024) {
            errors.push('Individual image exceeds maximum allowed limit of 5MB.');
            break;
          }
        }
      }
    }
  }

  return {
    valid: errors.length === 0,
    errors,
    sanitized: {
      cropName: sanitizeText(body.cropName),
      cultivationStage: sanitizeText(body.cultivationStage || body.growthStage),
      village: sanitizeText(body.village),
      district: sanitizeText(body.district),
      state: sanitizeText(body.state),
      description: sanitizeText(body.description),
      symptoms: Array.isArray(body.symptoms) ? body.symptoms.map(sanitizeText).filter(Boolean) : [],
      imageUrls: Array.isArray(body.imageUrls) ? body.imageUrls : [],
    },
  };
}

export function validateOfficerReviewInput(body) {
  const errors = [];

  if (!body.assessment || typeof body.assessment !== 'string' || body.assessment.trim().length < 5) {
    errors.push('assessment is required and must be at least 5 characters.');
  }

  if (!body.advisory || typeof body.advisory !== 'string' || body.advisory.trim().length < 5) {
    errors.push('advisory is required and must be at least 5 characters.');
  }

  const allowedOutcomes = ['confirmed_ai', 'modified', 'escalated', 'resolved'];
  if (body.outcome && !allowedOutcomes.includes(body.outcome)) {
    errors.push(`Invalid outcome: '${body.outcome}'. Allowed: ${allowedOutcomes.join(', ')}`);
  }

  return {
    valid: errors.length === 0,
    errors,
    sanitized: {
      assessment: sanitizeText(body.assessment),
      advisory: sanitizeText(body.advisory),
      outcome: body.outcome || 'confirmed_ai',
      alternativeDiagnosis: sanitizeText(body.alternativeDiagnosis || ''),
      dosageInstructions: sanitizeText(body.dosageInstructions || ''),
      notes: sanitizeText(body.notes || ''),
    },
  };
}
