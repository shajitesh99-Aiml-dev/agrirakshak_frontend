import {
  OfficerCase,
  OfficerDashboardData,
  OfficerCaseFilter,
  SubmitReviewRequest,
  CaseStatus,
  CaseTimelineEvent,
} from './types/officerTypes';

/**
 * Isolated Development-Only Mock Adapter for Agricultural Officer Workflow
 * 
 * STRICT CONSTRAINTS:
 * - Active ONLY when import.meta.env.DEV === true
 * - Never active in production bundles
 * - Maintains interactive session mutations for local testing
 */

const devCasesStore: Map<string, OfficerCase> = new Map();

// Initial seed cases for development fallback
const INITIAL_OFFICER_CASES: OfficerCase[] = [
  {
    id: 'CASE-2026-104',
    farmerId: 'usr-farmer-001',
    farmerName: 'Ramesh Patel',
    farmerPhone: '+91 98765 43210',
    farmSizeAcres: 3.5,
    cropName: 'Tomato (टमाटर)',
    status: 'pending',
    severity: 'moderate',
    reportedAt: new Date(Date.now() - 3600000 * 4).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    growthStage: 'Flowering & Fruit Setting',
    village: 'Rampur Village',
    district: 'Varanasi',
    state: 'Uttar Pradesh',
    description:
      'Dark concentric brown rings spreading rapidly across lower canopy leaves. Foliage curling and yellowing around lesion edges after heavy morning humidity.',
    symptoms: ['Dark concentric rings', 'Leaf chlorosis (yellowing)', 'Lower leaf drop', 'Foliage curling'],
    imageUrls: [
      'https://images.unsplash.com/photo-1592417817098-8f3d69109853?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?auto=format&fit=crop&w=600&q=80',
    ],
    aiAnalysis: {
      status: 'completed',
      prediction: {
        label: 'Early Blight (Alternaria solani)',
        scientificName: 'Alternaria solani',
        confidence: 0.92,
        category: 'disease',
      },
      severity: 'moderate',
      explanation:
        'Observed concentric dark brown target-spots on lower leaves with yellow halo borders. Characteristic of early blight fungal infection in humid microclimates.',
      observedSymptoms: ['Concentric circular lesions', 'Yellow chlorotic margins', 'Lower leaf drop'],
      possibleCauses: ['Fungal spore survival in crop debris', 'Prolonged leaf wetness from irrigation'],
      recommendations: [
        'Prune and destroy infected lower foliage away from the field.',
        'Apply Trichoderma viride bio-fungicide as a preventative measure.',
        'Avoid overhead spraying; water at root base.',
      ],
      warnings: ['Do not apply chemical fungicides without Agricultural Officer verification.'],
      requiresOfficerEscalation: false,
      analyzedAt: new Date(Date.now() - 3600000 * 3).toISOString(),
      isMock: true,
    },
    timeline: [
      {
        id: 'tl-104-1',
        caseId: 'CASE-2026-104',
        type: 'case_created',
        title: 'Case Report Created',
        description: 'Farmer Ramesh Patel submitted tomato leaf problem with 2 photos.',
        actor: 'Ramesh Patel (Farmer)',
        timestamp: new Date(Date.now() - 3600000 * 4).toISOString(),
      },
      {
        id: 'tl-104-2',
        caseId: 'CASE-2026-104',
        type: 'ai_analysis',
        title: 'AI Diagnostic Analysis Complete',
        description: 'Groq vision engine identified Early Blight (Alternaria solani) with 92% confidence.',
        actor: 'Agri Rakshak AI',
        timestamp: new Date(Date.now() - 3600000 * 3).toISOString(),
      },
    ],
  },
  {
    id: 'CASE-2026-092',
    farmerId: 'usr-farmer-002',
    farmerName: 'Sunil Verma',
    farmerPhone: '+91 98765 43211',
    farmSizeAcres: 5.0,
    cropName: 'Cotton (कपास)',
    status: 'escalated',
    severity: 'high',
    reportedAt: new Date(Date.now() - 3600000 * 12).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 6).toISOString(),
    growthStage: 'Square & Early Boll Stage',
    village: 'Kalyanpur',
    district: 'Kanpur Nagar',
    state: 'Uttar Pradesh',
    description:
      'Heavy stippling and leaf margin upward curling. Clusters of small white sap-sucking insects visible beneath leaf undersides with sticky honeydew secretions.',
    symptoms: ['White insect clusters', 'Leaf margin chlorosis', 'Sticky honeydew residues', 'Upward leaf curling'],
    imageUrls: [
      'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?auto=format&fit=crop&w=600&q=80',
    ],
    aiAnalysis: {
      status: 'completed',
      prediction: {
        label: 'Cotton Whitefly (Bemisia tabaci)',
        scientificName: 'Bemisia tabaci',
        confidence: 0.94,
        category: 'pest',
      },
      severity: 'severe',
      explanation:
        'Severe sap-sucking pest infestation with high risk of transmitting Cotton Leaf Curl Virus (CLCuV). Immediate field intervention warranted.',
      observedSymptoms: ['Whitefly nymph clusters', 'Chlorotic margin stippling', 'Sticky honeydew deposits'],
      possibleCauses: ['Prolonged warm, dry weather cycle', 'Excessive nitrogen fertilizer application'],
      recommendations: [
        'Install 15 yellow sticky traps per acre at canopy level.',
        'Spray Neem Oil (1500 ppm @ 5ml/litre) in morning hours.',
        'Schedule agronomist field visit to monitor virus vector threshold.',
      ],
      warnings: ['Avoid broad-spectrum pyrethroids that eliminate natural ladybird beetle predators.'],
      requiresOfficerEscalation: true,
      escalationReason: 'Critical pest threshold reached with imminent virus transmission risk.',
      analyzedAt: new Date(Date.now() - 3600000 * 11).toISOString(),
      isMock: true,
    },
    timeline: [
      {
        id: 'tl-092-1',
        caseId: 'CASE-2026-092',
        type: 'case_created',
        title: 'Case Report Created',
        description: 'Farmer Sunil Verma reported heavy whitefly insect clusters on cotton.',
        actor: 'Sunil Verma (Farmer)',
        timestamp: new Date(Date.now() - 3600000 * 12).toISOString(),
      },
      {
        id: 'tl-092-2',
        caseId: 'CASE-2026-092',
        type: 'ai_analysis',
        title: 'AI Diagnostic Analysis Complete',
        description: 'Identified Whitefly (Bemisia tabaci) at severe threshold; auto-escalated for officer review.',
        actor: 'Agri Rakshak AI',
        timestamp: new Date(Date.now() - 3600000 * 11).toISOString(),
      },
      {
        id: 'tl-092-3',
        caseId: 'CASE-2026-092',
        type: 'escalated',
        title: 'Escalated to Agricultural Officer',
        description: 'Auto-flagged due to severe pest density and CLCuV viral risk.',
        actor: 'Agri Rakshak AI Engine',
        timestamp: new Date(Date.now() - 3600000 * 10).toISOString(),
      },
    ],
  },
  {
    id: 'CASE-2026-081',
    farmerId: 'usr-farmer-003',
    farmerName: 'Baldev Singh',
    farmerPhone: '+91 98765 43213',
    farmSizeAcres: 4.0,
    cropName: 'Wheat (गेहूं)',
    status: 'under_review',
    severity: 'moderate',
    reportedAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    growthStage: 'Tillering & Jointing Stage',
    village: 'Durgapur',
    district: 'Gorakhpur',
    state: 'Uttar Pradesh',
    description:
      'Narrow parallel yellow-orange powdery stripes aligned along blade veins following persistent morning fog.',
    symptoms: ['Yellow powdery stripe pustules', 'Leaf blade chlorosis', 'Premature leaf tip drying'],
    imageUrls: [
      'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=600&q=80',
    ],
    aiAnalysis: {
      status: 'completed',
      prediction: {
        label: 'Yellow Stripe Rust (Puccinia striiformis)',
        scientificName: 'Puccinia striiformis f. sp. tritici',
        confidence: 0.95,
        category: 'disease',
      },
      severity: 'moderate',
      explanation:
        'Airborne fungal rust pathogen thriving in cool, foggy conditions (10°C–18°C). Rapidly colonizes photosynthetic blade area.',
      observedSymptoms: ['Linear stripe pustules', 'Powdery urediniospores', 'Blade chlorosis'],
      possibleCauses: ['Airborne spores carried by northwestern winds', 'Extended canopy moisture'],
      recommendations: [
        'Inspect surrounding fields for stripe rust boundary spread.',
        'Apply authorized triazole foliar spray as recommended by Block Extension Agronomist.',
      ],
      warnings: ['Stripe rust spreads rapidly under continuous cloudy weather.'],
      requiresOfficerEscalation: false,
      analyzedAt: new Date(Date.now() - 3600000 * 23).toISOString(),
      isMock: true,
    },
    assignedOfficerId: 'usr-officer-001',
    assignedOfficerName: 'Dr. Priya Sharma',
    fieldVisit: {
      required: true,
      scheduledDate: '2026-02-22',
      preferredTime: '10:30 AM',
      location: 'Plot 4B, North Field, Durgapur',
      officerNotes: 'On-site leaf spore scrape test to verify triazole dosage efficacy.',
      status: 'scheduled',
    },
    timeline: [
      {
        id: 'tl-081-1',
        caseId: 'CASE-2026-081',
        type: 'case_created',
        title: 'Case Report Created',
        description: 'Farmer Baldev Singh reported yellow stripes on wheat.',
        actor: 'Baldev Singh (Farmer)',
        timestamp: new Date(Date.now() - 3600000 * 24).toISOString(),
      },
      {
        id: 'tl-081-2',
        caseId: 'CASE-2026-081',
        type: 'review_started',
        title: 'Officer Triage Initiated',
        description: 'Assigned to Dr. Priya Sharma; status updated to Under Review.',
        actor: 'Dr. Priya Sharma (Officer)',
        timestamp: new Date(Date.now() - 3600000 * 10).toISOString(),
      },
    ],
  },
  {
    id: 'CASE-2026-065',
    farmerId: 'usr-farmer-004',
    farmerName: 'Kishore Mandal',
    farmerPhone: '+91 98765 43214',
    farmSizeAcres: 2.0,
    cropName: 'Soybean (सोयाबीन)',
    status: 'resolved',
    severity: 'low',
    reportedAt: new Date(Date.now() - 3600000 * 72).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    growthStage: 'Pod Filling Stage',
    village: 'Piparia',
    district: 'Hoshangabad',
    state: 'Madhya Pradesh',
    description: 'Angular reddish-brown leaf spots with chlorotic halos after moderate showers.',
    symptoms: ['Angular reddish lesions', 'Bacterial ooze appearance', 'Chlorotic margin'],
    imageUrls: [],
    aiAnalysis: {
      status: 'completed',
      prediction: {
        label: 'Bacterial Pustule (Xanthomonas axonopodis)',
        scientificName: 'Xanthomonas axonopodis pv. glycines',
        confidence: 0.89,
        category: 'disease',
      },
      severity: 'mild',
      explanation: 'Bacterial pustule localized to older leaves with minimal pod risk.',
      observedSymptoms: ['Angular brown spots', 'Elevated pustule centers'],
      possibleCauses: ['Rain splash transmission from adjacent rows'],
      recommendations: ['Avoid inter-cultivation when foliage is wet.'],
      warnings: ['Do not use chemical fungicides for bacterial infection.'],
      requiresOfficerEscalation: false,
      analyzedAt: new Date(Date.now() - 3600000 * 70).toISOString(),
      isMock: true,
    },
    officerReview: {
      id: 'rev-065-1',
      caseId: 'CASE-2026-065',
      officerId: 'usr-officer-001',
      officerName: 'Dr. Priya Sharma',
      assessment:
        'Confirmed Bacterial Pustule at low severity. Infection has not spread to pods. Cultural sanitation and copper oxychloride preventative spray verified sufficient.',
      outcome: 'confirmed_ai',
      advisory:
        'Spray Copper Oxychloride 50 WP @ 2.5g per litre of water during clear weather. Maintain good drainage in field.',
      requiresFollowUp: false,
      requiresEscalation: false,
      reviewedAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    },
    timeline: [
      {
        id: 'tl-065-1',
        caseId: 'CASE-2026-065',
        type: 'case_created',
        title: 'Case Report Created',
        description: 'Farmer Kishore Mandal reported leaf spots on soybean.',
        actor: 'Kishore Mandal (Farmer)',
        timestamp: new Date(Date.now() - 3600000 * 72).toISOString(),
      },
      {
        id: 'tl-065-2',
        caseId: 'CASE-2026-065',
        type: 'resolved',
        title: 'Case Marked Resolved',
        description: 'Verified with advisory provided.',
        actor: 'Dr. Priya Sharma (Officer)',
        timestamp: new Date(Date.now() - 3600000 * 24).toISOString(),
      },
    ],
  },
  {
    id: 'CASE-2026-118',
    farmerId: 'usr-farmer-005',
    farmerName: 'Mahesh Chaurasia',
    farmerPhone: '+91 98765 43215',
    farmSizeAcres: 6.0,
    cropName: 'Paddy / Rice (धान)',
    status: 'pending',
    severity: 'high',
    reportedAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    growthStage: 'Tillering Stage',
    village: 'Chandauli',
    district: 'Chandauli',
    state: 'Uttar Pradesh',
    description:
      'Oval or irregular greenish-grey lesions near water level on leaf sheaths. Bleaching and lodging noticed in low-lying flooded patches.',
    symptoms: ['Sheath lesions near water level', 'Greenish-grey water-soaked spots', 'Stem lodging'],
    imageUrls: [
      'https://images.unsplash.com/photo-1536700503339-1e4b06520771?auto=format&fit=crop&w=600&q=80',
    ],
    aiAnalysis: {
      status: 'completed',
      prediction: {
        label: 'Sheath Blight (Rhizoctonia solani)',
        scientificName: 'Rhizoctonia solani',
        confidence: 0.91,
        category: 'disease',
      },
      severity: 'severe',
      explanation:
        'Rhizoctonia fungal infection progressing from lower sheath upward into leaf blades. Associated with prolonged flood stagnation and high planting density.',
      observedSymptoms: ['Irregular sheath lesions', 'Bleached lesion centers', 'Lodging risk'],
      possibleCauses: ['Sclerotial bodies floating in floodwater', 'Excessive nitrogen fertilizer'],
      recommendations: [
        'Drain excess stagnant water from affected plots for 2-3 days.',
        'Avoid further nitrogen top-dressing; apply potash to strengthen culms.',
      ],
      warnings: ['May cause severe crop lodging if unmitigated before panicle emergence.'],
      requiresOfficerEscalation: true,
      escalationReason: 'High acreage impact in flood-prone block.',
      analyzedAt: new Date(Date.now() - 3600000 * 1.5).toISOString(),
      isMock: true,
    },
    timeline: [
      {
        id: 'tl-118-1',
        caseId: 'CASE-2026-118',
        type: 'case_created',
        title: 'Case Report Created',
        description: 'Farmer Mahesh Chaurasia filed rice sheath problem.',
        actor: 'Mahesh Chaurasia (Farmer)',
        timestamp: new Date(Date.now() - 3600000 * 2).toISOString(),
      },
    ],
  },
];

// Initialize store with copy of seed cases
INITIAL_OFFICER_CASES.forEach((c) => devCasesStore.set(c.id, { ...c }));

export const devOfficer = {
  isEnabled(): boolean {
    return import.meta.env.DEV === true;
  },

  async getDashboardData(): Promise<OfficerDashboardData> {
    await new Promise((r) => setTimeout(r, 200));
    const all = Array.from(devCasesStore.values());

    return {
      summary: {
        totalCases: all.length,
        pendingReview: all.filter((c) => c.status === 'pending').length,
        underReview: all.filter((c) => c.status === 'under_review').length,
        aiAwaitingReview: all.filter((c) => c.aiAnalysis && !c.officerReview).length,
        escalatedCases: all.filter((c) => c.status === 'escalated').length,
        resolvedCases: all.filter((c) => c.status === 'resolved').length,
        scheduledFieldVisits: all.filter((c) => c.fieldVisit && c.fieldVisit.status === 'scheduled').length,
      },
      urgentCases: all.filter(
        (c) => c.status === 'escalated' || c.severity === 'high' || c.severity === 'critical'
      ),
      pendingQueue: all.filter((c) => c.status === 'pending' || c.status === 'under_review'),
      recentActivity: all
        .flatMap((c) => c.timeline || [])
        .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
        .slice(0, 10),
    };
  },

  async getCases(filter: OfficerCaseFilter = {}): Promise<OfficerCase[]> {
    await new Promise((r) => setTimeout(r, 200));
    let list = Array.from(devCasesStore.values()).sort(
      (a, b) => new Date(b.reportedAt).getTime() - new Date(a.reportedAt).getTime()
    );

    if (filter.status && filter.status !== 'all') {
      list = list.filter((c) => c.status === filter.status);
    }

    if (filter.severity && filter.severity !== 'all') {
      list = list.filter((c) => {
        const sev = c.severity || c.aiAnalysis?.severity;
        return sev === filter.severity;
      });
    }

    if (filter.crop && filter.crop !== 'all') {
      list = list.filter((c) =>
        c.cropName.toLowerCase().includes(filter.crop!.toLowerCase())
      );
    }

    if (filter.search && filter.search.trim() !== '') {
      const q = filter.search.toLowerCase().trim();
      list = list.filter(
        (c) =>
          c.id.toLowerCase().includes(q) ||
          c.cropName.toLowerCase().includes(q) ||
          (c.farmerName && c.farmerName.toLowerCase().includes(q)) ||
          (c.village && c.village.toLowerCase().includes(q)) ||
          (c.district && c.district.toLowerCase().includes(q)) ||
          (c.description && c.description.toLowerCase().includes(q))
      );
    }

    return list;
  },

  async getCaseById(caseId: string): Promise<OfficerCase | null> {
    await new Promise((r) => setTimeout(r, 150));
    if (devCasesStore.has(caseId)) {
      return devCasesStore.get(caseId)!;
    }
    return null;
  },

  async updateStatus(caseId: string, status: CaseStatus, note?: string): Promise<OfficerCase> {
    await new Promise((r) => setTimeout(r, 250));
    const existing = devCasesStore.get(caseId);
    if (!existing) {
      throw new Error(`Case #${caseId} not found.`);
    }

    const previousStatus = existing.status;
    existing.status = status;
    existing.updatedAt = new Date().toISOString();

    if (!existing.timeline) existing.timeline = [];
    const event: CaseTimelineEvent = {
      id: `tl-${caseId}-${Date.now()}`,
      caseId,
      type: status === 'resolved' ? 'resolved' : status === 'escalated' ? 'escalated' : 'status_changed',
      title: `Status Changed to ${status.replace('_', ' ').toUpperCase()}`,
      description: note || `Case transitioned from ${previousStatus} to ${status}.`,
      actor: 'Dr. Priya Sharma (Officer)',
      timestamp: new Date().toISOString(),
    };
    existing.timeline.push(event);

    devCasesStore.set(caseId, existing);
    return existing;
  },

  async submitReview(caseId: string, req: SubmitReviewRequest): Promise<OfficerCase> {
    await new Promise((r) => setTimeout(r, 350));
    const existing = devCasesStore.get(caseId);
    if (!existing) {
      throw new Error(`Case #${caseId} not found.`);
    }

    const reviewId = `rev-${caseId}-${Date.now()}`;
    existing.officerReview = {
      id: reviewId,
      caseId,
      officerId: 'usr-officer-001',
      officerName: 'Dr. Priya Sharma',
      assessment: req.assessment,
      outcome: req.outcome,
      advisory: req.advisory,
      additionalObservations: req.additionalObservations,
      requiresFollowUp: Boolean(req.requiresFollowUp),
      requiresEscalation: Boolean(req.requiresEscalation),
      fieldVisit: req.fieldVisit,
      reviewedAt: new Date().toISOString(),
    };

    if (req.fieldVisit && req.fieldVisit.required) {
      existing.fieldVisit = req.fieldVisit;
    }

    if (req.newStatus) {
      existing.status = req.newStatus;
    } else if (req.requiresEscalation) {
      existing.status = 'escalated';
    } else {
      existing.status = 'resolved';
    }

    existing.updatedAt = new Date().toISOString();

    if (!existing.timeline) existing.timeline = [];
    existing.timeline.push({
      id: `tl-${caseId}-${Date.now()}`,
      caseId,
      type: 'review_submitted',
      title: 'Officer Assessment & Advisory Recorded',
      description: `Assessment: ${req.assessment.slice(0, 80)}... Outcome: ${req.outcome}`,
      actor: 'Dr. Priya Sharma (Officer)',
      timestamp: new Date().toISOString(),
    });

    if (req.fieldVisit && req.fieldVisit.required) {
      existing.timeline.push({
        id: `tl-${caseId}-fv-${Date.now()}`,
        caseId,
        type: 'field_visit_scheduled',
        title: 'Field Visit Scheduled',
        description: `Scheduled for ${req.fieldVisit.scheduledDate || 'upcoming date'} at ${req.fieldVisit.location || 'farmer field'}.`,
        actor: 'Dr. Priya Sharma (Officer)',
        timestamp: new Date().toISOString(),
      });
    }

    devCasesStore.set(caseId, existing);
    return existing;
  },
};
