/**
 * AI Response Sanitizer and Validator
 */

export function validateAndNormalizeAIResponse(rawText) {
  let cleaned = rawText.trim();

  // Strip markdown code fences if model returned ```json ... ```
  if (cleaned.startsWith('```')) {
    cleaned = cleaned.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '').trim();
  }

  let parsed;
  try {
    parsed = JSON.parse(cleaned);
  } catch (err) {
    throw new Error(`Failed to parse AI output as JSON: ${err.message}. Raw output: ${cleaned.slice(0, 100)}`);
  }

  // Validate and clamp confidence
  let confidence = parsed.prediction?.confidence;
  if (typeof confidence === 'number') {
    confidence = Math.max(0.0, Math.min(1.0, confidence));
  } else {
    confidence = 0.85;
  }

  // Validate category
  const allowedCategories = ['disease', 'pest', 'healthy', 'unknown'];
  const category = allowedCategories.includes(parsed.prediction?.category)
    ? parsed.prediction.category
    : 'disease';

  // Validate severity
  const allowedSeverities = ['mild', 'moderate', 'severe', 'unknown'];
  const severity = allowedSeverities.includes(parsed.severity)
    ? parsed.severity
    : 'moderate';

  const normalized = {
    status: 'completed',
    prediction: {
      label: String(parsed.prediction?.label || 'Undetermined Crop Condition'),
      scientificName: parsed.prediction?.scientificName ? String(parsed.prediction.scientificName) : undefined,
      confidence,
      category,
    },
    severity,
    explanation: String(parsed.explanation || 'AI analysis completed based on submitted field symptoms.'),
    observedSymptoms: Array.isArray(parsed.observedSymptoms)
      ? parsed.observedSymptoms.map(String)
      : ['Observed foliage discoloration'],
    possibleCauses: Array.isArray(parsed.possibleCauses)
      ? parsed.possibleCauses.map(String)
      : ['Environmental moisture and pathogen exposure'],
    recommendations: Array.isArray(parsed.recommendations) && parsed.recommendations.length > 0
      ? parsed.recommendations.map(String)
      : ['Consult your local Krishi Vigyan Kendra extension officer for verified field treatment.'],
    warnings: Array.isArray(parsed.warnings) ? parsed.warnings.map(String) : [],
    requiresOfficerEscalation: Boolean(parsed.requiresOfficerEscalation),
    escalationReason: parsed.escalationReason ? String(parsed.escalationReason) : undefined,
    analyzedAt: new Date().toISOString(),
    isMock: false,
  };

  return normalized;
}
