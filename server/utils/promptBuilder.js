/**
 * Agronomic Prompt Builder for Groq Model Analysis
 * SIH 2026 - Problem Statement SIH26131 (Agri Rakshak)
 * 
 * Data Minimization Compliance:
 * Strictly avoids transmitting personal identifiable information (PII):
 * - Farmer names and phone numbers are excluded
 * - Specific street/village identifiers are excluded; only agro-climatic region (District, State) is shared
 * - Free text descriptions are stripped of contact numbers before transmission
 */

function sanitizeForPrompt(text) {
  if (!text || typeof text !== 'string') return '';
  return text
    // Redact 10-digit phone numbers
    .replace(/(?:\+91[\s-]?)?[6-9]\d{9}/g, '[PHONE REDACTED]')
    // Redact email addresses
    .replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, '[EMAIL REDACTED]')
    .replace(/[<>]/g, '')
    .trim();
}

export function buildGroqPrompt(caseData) {
  const systemPrompt = `You are Agri Rakshak AI, an expert agricultural diagnostic and plant pathology AI engine designed to assist Indian smallholder farmers.
Your job is to analyze the crop problem, symptoms, and field details provided by the farmer and return a structured JSON assessment.

IMPORTANT CONSTRAINTS:
1. Always respond in STRICT VALID JSON format. Do not prepend markdown ticks or extra text.
2. The JSON MUST follow this exact schema:
{
  "prediction": {
    "label": "string (Common disease or pest name in English, e.g. Early Blight)",
    "scientificName": "string (Scientific Latin binomial name, e.g. Alternaria solani)",
    "confidence": number between 0.70 and 0.99,
    "category": "disease" | "pest" | "healthy" | "unknown"
  },
  "severity": "mild" | "moderate" | "severe",
  "explanation": "string (Clear, farmer-friendly explanation of what is happening)",
  "observedSymptoms": ["string (Observed symptom 1)", "string (Observed symptom 2)"],
  "possibleCauses": ["string (Cause 1)", "string (Cause 2)"],
  "recommendations": ["string (Actionable advisory 1)", "string (Actionable advisory 2)"],
  "warnings": ["string (Agronomic caution or safety warning 1)"],
  "requiresOfficerEscalation": boolean (true if severe or uncertain, false if manageable),
  "escalationReason": "string (Reason for escalation if required)"
}
3. Keep recommendations practical for Indian smallholder farmers (organic/cultural practices first, bio-pesticides, sanitation).
4. Do NOT prescribe hazardous unauthorized chemical dosages without advising consultation with an Agricultural Extension Officer.`;

  // Include general agro-climatic zone for pathology context without exact residential village
  const agroRegion = [caseData.district, caseData.state].filter(Boolean).join(', ') || 'India (Tropical/Subtropical)';
  const cleanDescription = sanitizeForPrompt(caseData.description || 'No detailed text description provided');
  const cleanSymptoms = Array.isArray(caseData.symptoms)
    ? caseData.symptoms.map(sanitizeForPrompt).filter(Boolean).join(', ')
    : 'None listed';

  const userContent = `Crop: ${sanitizeForPrompt(caseData.cropName || 'Unspecified Crop')}
Growth Stage: ${sanitizeForPrompt(caseData.growthStage || caseData.cultivationStage || 'Not specified')}
Agro-Climatic Region: ${agroRegion}
Reported Symptoms: ${cleanSymptoms}
Foliage Condition Description: ${cleanDescription}
Attached Photographs: ${caseData.imageUrls && caseData.imageUrls.length > 0 ? `${caseData.imageUrls.length} photos analyzed` : 'No photos attached'}`;

  return { systemPrompt, userContent };
}
