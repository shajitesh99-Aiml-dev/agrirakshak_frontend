import { AIAnalysisResult } from '../../types/ai';

/**
 * Isolated Development Mock for AI Analysis
 * 
 * STRICT CONSTRAINTS:
 * - Only active in development (`import.meta.env.DEV === true`)
 * - NEVER active in production (`import.meta.env.PROD`)
 * - Simulates realistic agronomic diagnosis without requiring live Groq connection
 * - Clearly marked with isMock: true
 */

interface MockCaseInfo {
  cropName?: string;
  symptoms?: string[];
  description?: string;
}

export const devAnalysis = {
  isEnabled(): boolean {
    return import.meta.env.DEV === true;
  },

  async mockAnalyzeCase(
    _caseId: string,
    caseInfo?: MockCaseInfo
  ): Promise<AIAnalysisResult> {
    // Simulate server & AI model latency (1.4s)
    await new Promise((resolve) => setTimeout(resolve, 1400));

    const crop = (caseInfo?.cropName || '').toLowerCase();

    // Default mock response tailored to crop or symptoms
    if (crop.includes('tomato') || crop.includes('टमाटर')) {
      return {
        status: 'completed',
        prediction: {
          label: 'Early Blight (Alternaria solani)',
          scientificName: 'Alternaria solani',
          confidence: 0.89,
          category: 'disease',
        },
        severity: 'moderate',
        explanation:
          'Observed concentric dark brown target-like leaf lesions surrounded by chlorotic yellow halos. Fungal pathogen Alternaria solani typically thrives during warm, humid post-monsoon conditions.',
        observedSymptoms: [
          'Concentric circular brown lesions on lower foliage',
          'Yellowing (chlorosis) along margins of affected leaves',
          'Early premature leaf dropping on bottom canopy',
        ],
        possibleCauses: [
          'Fungal spore survival in crop debris and humid soil',
          'Prolonged leaf wetness due to overhead irrigation or dew',
          'Warm temperatures (24°C–29°C) combined with high relative humidity',
        ],
        recommendations: [
          'Prune and safely burn or bury heavily infected bottom leaves away from field.',
          'Switch to drip irrigation or furrow watering to keep foliage dry during morning hours.',
          'Apply organic copper-based preventative spray or Trichoderma viride bio-fungicide as directed by your local Krishi Vigyan Kendra.',
        ],
        warnings: [
          'Avoid handling wet plants to prevent spreading fungal spores to adjacent healthy rows.',
          'Maintain 3-year crop rotation; avoid planting tomatoes or potatoes consecutively in the same plot.',
        ],
        requiresOfficerEscalation: false,
        analyzedAt: new Date().toISOString(),
        isMock: true,
      };
    }

    if (crop.includes('cotton') || crop.includes('कपास')) {
      return {
        status: 'completed',
        prediction: {
          label: 'Whitefly Infestation (Bemisia tabaci)',
          scientificName: 'Bemisia tabaci',
          confidence: 0.93,
          category: 'pest',
        },
        severity: 'severe',
        explanation:
          'Nymph and adult whitefly colonies congregating on the undersides of leaves, sucking sap and secreting honeydew which promotes secondary sooty mold growth.',
        observedSymptoms: [
          'Leaf chlorosis and upward curling of leaf margins',
          'Sticky honeydew residues visible on lower leaves',
          'Black sooty mold fungus developing on upper leaf surfaces',
        ],
        possibleCauses: [
          'Hot, dry weather conditions favoring rapid insect reproductive cycles',
          'Excessive nitrogen fertilization producing succulent vegetative foliage',
          'Absence of natural predators (ladybird beetles, lacewings)',
        ],
        recommendations: [
          'Install yellow sticky traps (15–20 traps per acre) at crop canopy height for pest monitoring.',
          'Spray 5% Neem Seed Kernel Extract (NSKE) or neem oil (1500 ppm @ 5ml/litre) in early morning or late afternoon.',
          'Schedule an on-site consultation with your Agricultural Extension Officer for integrated pest management guidelines.',
        ],
        warnings: [
          'Do not apply broad-spectrum synthetic pyrethroids which can destroy beneficial natural predators.',
        ],
        requiresOfficerEscalation: true,
        escalationReason:
          'Severe pest threshold reached with potential risk of Cotton Leaf Curl Virus transmission.',
        analyzedAt: new Date().toISOString(),
        isMock: true,
      };
    }

    if (crop.includes('wheat') || crop.includes('गेहूं')) {
      return {
        status: 'completed',
        prediction: {
          label: 'Yellow Stripe Rust (Puccinia striiformis)',
          scientificName: 'Puccinia striiformis f. sp. tritici',
          confidence: 0.95,
          category: 'disease',
        },
        severity: 'moderate',
        explanation:
          'Linear stripes of bright yellow-orange uredinial pustules aligned parallel along leaf veins, caused by airborne fungal pathogen Puccinia striiformis.',
        observedSymptoms: [
          'Narrow yellow-orange powdery pustule stripes along blade veins',
          'Premature drying of leaf tips',
          'Reduced photosynthetic leaf area',
        ],
        possibleCauses: [
          'Cool weather (10°C–18°C) accompanied by persistent fog or morning dew',
          'Airborne spores transported across neighboring regions by northern winds',
        ],
        recommendations: [
          'Monitor field borders daily for fresh yellow stripe formations.',
          'Consult your local Agricultural Officer regarding approved triazole fungicide applications (e.g., Propiconazole) if infection exceeds 5% incidence.',
        ],
        warnings: [
          'Act quickly as stripe rust can spread rapidly across entire wheat plots under continuous foggy weather.',
        ],
        requiresOfficerEscalation: false,
        analyzedAt: new Date().toISOString(),
        isMock: true,
      };
    }

    // Generic crop disease fallback
    return {
      status: 'completed',
      prediction: {
        label: `${caseInfo?.cropName || 'Crop'} Foliar Blight / Leaf Spot`,
        confidence: 0.85,
        category: 'disease',
      },
      severity: 'moderate',
      explanation:
        'Visual examination indicates foliar lesions and tissue chlorosis consistent with fungal leaf blight under prevailing field humidity.',
      observedSymptoms:
        caseInfo?.symptoms && caseInfo.symptoms.length > 0
          ? caseInfo.symptoms
          : ['Leaf spot discoloration', 'Foliage wilting', 'Chlorotic margin'],
      possibleCauses: [
        'High microclimate humidity inside crop canopy',
        'Fungal spore spread through irrigation splashing or wind',
      ],
      recommendations: [
        'Remove severely wilted or diseased plant debris from field borders.',
        'Ensure proper field drainage and avoid prolonged waterlogging around root zones.',
        'Present this diagnostic summary to your village Agricultural Officer for verification.',
      ],
      warnings: [
        'Always wear protective gloves and mask when inspecting or handling infected crop tissue.',
      ],
      requiresOfficerEscalation: false,
      analyzedAt: new Date().toISOString(),
      isMock: true,
    };
  },
};
