/**
 * Agri Rakshak Backend Case In-Memory Persistence Store
 * Extended for Phase 8: Agricultural Officer Portal & Case Management
 */

import { prisma, isDbConnected, isDatabaseRequired } from '../db/prisma.js';

const casesMap = new Map();

// Seed initial demonstration cases with rich agronomic, AI, and officer metadata
const seedCases = [
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
    description: 'Dark concentric brown rings spreading rapidly across lower canopy leaves. Foliage curling and yellowing around lesion edges after heavy morning humidity.',
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
      explanation: 'Observed concentric dark brown target-spots on lower leaves with yellow halo borders. Characteristic of early blight fungal infection in humid microclimates.',
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
      isMock: false,
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
    description: 'Heavy stippling and leaf margin upward curling. Clusters of small white sap-sucking insects visible beneath leaf undersides with sticky honeydew secretions.',
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
      explanation: 'Severe sap-sucking pest infestation with high risk of transmitting Cotton Leaf Curl Virus (CLCuV). Immediate field intervention warranted.',
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
      isMock: false,
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
    description: 'Narrow parallel yellow-orange powdery stripes aligned along blade veins following persistent morning fog.',
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
      explanation: 'Airborne fungal rust pathogen thriving in cool, foggy conditions (10°C–18°C). Rapidly colonizes photosynthetic blade area.',
      observedSymptoms: ['Linear stripe pustules', 'Powdery urediniospores', 'Blade chlorosis'],
      possibleCauses: ['Airborne spores carried by northwestern winds', 'Extended canopy moisture'],
      recommendations: [
        'Inspect surrounding fields for stripe rust boundary spread.',
        'Apply authorized triazole foliar spray as recommended by Block Extension Agronomist.',
      ],
      warnings: ['Stripe rust spreads rapidly under continuous cloudy weather.'],
      requiresOfficerEscalation: false,
      analyzedAt: new Date(Date.now() - 3600000 * 23).toISOString(),
      isMock: false,
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
        type: 'ai_analysis',
        title: 'AI Diagnostic Analysis Complete',
        description: 'Identified Yellow Stripe Rust with 95% model confidence.',
        actor: 'Agri Rakshak AI',
        timestamp: new Date(Date.now() - 3600000 * 23).toISOString(),
      },
      {
        id: 'tl-081-3',
        caseId: 'CASE-2026-081',
        type: 'review_started',
        title: 'Officer Triage Initiated',
        description: 'Assigned to Dr. Priya Sharma; status updated to Under Review.',
        actor: 'Dr. Priya Sharma (Officer)',
        timestamp: new Date(Date.now() - 3600000 * 10).toISOString(),
      },
      {
        id: 'tl-081-4',
        caseId: 'CASE-2026-081',
        type: 'field_visit_scheduled',
        title: 'Field Visit Scheduled',
        description: 'Scheduled on-site visit for 2026-02-22 at 10:30 AM.',
        actor: 'Dr. Priya Sharma (Officer)',
        timestamp: new Date(Date.now() - 3600000 * 5).toISOString(),
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
      severity: 'low',
      explanation: 'Bacterial pustule localized to older leaves with minimal pod risk.',
      observedSymptoms: ['Angular brown spots', 'Elevated pustule centers'],
      possibleCauses: ['Rain splash transmission from adjacent rows'],
      recommendations: ['Avoid inter-cultivation when foliage is wet.'],
      warnings: ['Do not use chemical fungicides for bacterial infection.'],
      requiresOfficerEscalation: false,
      analyzedAt: new Date(Date.now() - 3600000 * 70).toISOString(),
      isMock: false,
    },
    officerReview: {
      id: 'rev-065-1',
      caseId: 'CASE-2026-065',
      officerId: 'usr-officer-001',
      officerName: 'Dr. Priya Sharma',
      assessment: 'Confirmed Bacterial Pustule at low severity. Infection has not spread to pods. Cultural sanitation and copper oxychloride preventative spray verified sufficient.',
      outcome: 'confirmed_ai',
      advisory: 'Spray Copper Oxychloride 50 WP @ 2.5g per litre of water during clear weather. Maintain good drainage in field.',
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
        type: 'review_submitted',
        title: 'Officer Advisory Issued',
        description: 'Dr. Priya Sharma validated diagnosis and provided copper spray advisory.',
        actor: 'Dr. Priya Sharma (Officer)',
        timestamp: new Date(Date.now() - 3600000 * 24).toISOString(),
      },
      {
        id: 'tl-065-3',
        caseId: 'CASE-2026-065',
        type: 'resolved',
        title: 'Case Marked Resolved',
        description: 'Farmer acknowledged advisory instructions.',
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
    description: 'Oval or irregular greenish-grey lesions near water level on leaf sheaths. Bleaching and lodging noticed in low-lying flooded patches.',
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
      severity: 'high',
      explanation: 'Rhizoctonia fungal infection progressing from lower sheath upward into leaf blades. Associated with prolonged flood stagnation and high planting density.',
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
      isMock: false,
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
      {
        id: 'tl-118-2',
        caseId: 'CASE-2026-118',
        type: 'ai_analysis',
        title: 'AI Diagnostic Analysis Complete',
        description: 'Identified Sheath Blight (Rhizoctonia solani); high risk of crop lodging.',
        actor: 'Agri Rakshak AI',
        timestamp: new Date(Date.now() - 3600000 * 1.5).toISOString(),
      },
    ],
  },
];

seedCases.forEach((c) => casesMap.set(c.id, c));

function formatDbCase(c) {
  if (!c) return null;
  return {
    ...c,
    reportedAt: c.reportedAt instanceof Date ? c.reportedAt.toISOString() : c.reportedAt,
    updatedAt: c.updatedAt instanceof Date ? c.updatedAt.toISOString() : c.updatedAt,
    timeline: (c.timeline || []).map((tl) => ({
      ...tl,
      timestamp: tl.timestamp instanceof Date ? tl.timestamp.toISOString() : tl.timestamp,
    })),
  };
}

export const caseStore = {
  async getCase(id) {
    if (isDbConnected()) {
      try {
        const dbCase = await prisma.case.findUnique({
          where: { id },
          include: { timeline: { orderBy: { timestamp: 'desc' } } },
        });
        if (dbCase) return formatDbCase(dbCase);
      } catch (err) {
        if (isDatabaseRequired()) {
          throw new Error(`[caseStore] Database getCase failed: ${err.message}`);
        }
        console.warn(`[caseStore] DB getCase error (${err.message}); checking memory fallback.`);
      }
    } else if (isDatabaseRequired()) {
      throw new Error('[caseStore] Database required but PostgreSQL is not connected');
    }

    if (casesMap.has(id)) {
      return casesMap.get(id);
    }
    return null;
  },

  async saveCase(cropCase) {
    if (isDbConnected()) {
      try {
        const { timeline, ...caseData } = cropCase;
        const operations = [
          prisma.case.upsert({
            where: { id: cropCase.id },
            update: {
              farmerId: caseData.farmerId,
              farmerName: caseData.farmerName,
              farmerPhone: caseData.farmerPhone,
              farmSizeAcres: caseData.farmSizeAcres,
              cropName: caseData.cropName,
              status: caseData.status || 'pending',
              severity: caseData.severity || 'moderate',
              growthStage: caseData.growthStage,
              village: caseData.village,
              district: caseData.district,
              state: caseData.state,
              description: caseData.description,
              symptoms: caseData.symptoms || [],
              imageUrls: caseData.imageUrls || [],
              aiAnalysis: caseData.aiAnalysis || null,
              officerReview: caseData.officerReview || null,
            },
            create: {
              id: cropCase.id,
              farmerId: caseData.farmerId,
              farmerName: caseData.farmerName,
              farmerPhone: caseData.farmerPhone,
              farmSizeAcres: caseData.farmSizeAcres,
              cropName: caseData.cropName,
              status: caseData.status || 'pending',
              severity: caseData.severity || 'moderate',
              growthStage: caseData.growthStage,
              village: caseData.village,
              district: caseData.district,
              state: caseData.state,
              description: caseData.description,
              symptoms: caseData.symptoms || [],
              imageUrls: caseData.imageUrls || [],
              aiAnalysis: caseData.aiAnalysis || null,
              officerReview: caseData.officerReview || null,
            },
          }),
        ];

        if (timeline && timeline.length > 0) {
          for (const tl of timeline) {
            operations.push(
              prisma.caseTimeline.upsert({
                where: { id: tl.id },
                update: {
                  title: tl.title,
                  description: tl.description,
                  actor: tl.actor,
                  timestamp: tl.timestamp ? new Date(tl.timestamp) : new Date(),
                },
                create: {
                  id: tl.id,
                  caseId: cropCase.id,
                  type: tl.type,
                  title: tl.title,
                  description: tl.description,
                  actor: tl.actor,
                  timestamp: tl.timestamp ? new Date(tl.timestamp) : new Date(),
                },
              })
            );
          }
        }

        await prisma.$transaction(operations);

        // Mirror in memory for fast lookup
        casesMap.set(cropCase.id, {
          ...cropCase,
          updatedAt: new Date().toISOString(),
        });

        const refreshed = await prisma.case.findUnique({
          where: { id: cropCase.id },
          include: { timeline: { orderBy: { timestamp: 'desc' } } },
        });
        return formatDbCase(refreshed);
      } catch (err) {
        if (isDatabaseRequired()) {
          throw new Error(`[caseStore] Database saveCase failed: ${err.message}`);
        }
        console.warn(`[caseStore] DB saveCase error (${err.message}); saved to in-memory fallback.`);
      }
    } else if (isDatabaseRequired()) {
      throw new Error('[caseStore] Database required but PostgreSQL is not connected');
    }

    casesMap.set(cropCase.id, {
      ...cropCase,
      updatedAt: new Date().toISOString(),
    });
    return casesMap.get(cropCase.id);
  },

  async getAllCases() {
    if (isDbConnected()) {
      try {
        const dbCases = await prisma.case.findMany({
          include: { timeline: { orderBy: { timestamp: 'desc' } } },
          orderBy: { reportedAt: 'desc' },
        });
        return dbCases.map(formatDbCase);
      } catch (err) {
        if (isDatabaseRequired()) {
          throw new Error(`[caseStore] Database getAllCases failed: ${err.message}`);
        }
        console.warn(`[caseStore] DB getAllCases error (${err.message}); using memory fallback.`);
      }
    } else if (isDatabaseRequired()) {
      throw new Error('[caseStore] Database required but PostgreSQL is not connected');
    }

    return Array.from(casesMap.values()).sort(
      (a, b) => new Date(b.reportedAt).getTime() - new Date(a.reportedAt).getTime()
    );
  },

  async getFilteredCases(filter = {}) {
    let list = await this.getAllCases();

    if (filter.farmerId) {
      list = list.filter((c) => c.farmerId === filter.farmerId);
    }

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
        c.cropName.toLowerCase().includes(filter.crop.toLowerCase())
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

  async saveAnalysis(caseId, analysis) {
    const existing = await this.getCase(caseId);
    if (!existing) return null;

    existing.aiAnalysis = analysis;
    existing.severity = analysis.severity || existing.severity;
    if (analysis.requiresOfficerEscalation) {
      existing.status = 'escalated';
    }
    existing.updatedAt = new Date().toISOString();

    if (!existing.timeline) existing.timeline = [];
    const newTimelineId = `tl-${caseId}-${Date.now()}`;
    const newEvent = {
      id: newTimelineId,
      caseId,
      type: 'ai_analysis',
      title: 'AI Diagnostic Analysis Complete',
      description: `Model inferred: ${analysis.prediction?.label || 'Condition detected'} with ${Math.round((analysis.prediction?.confidence || 0) * 100)}% confidence.`,
      actor: 'Agri Rakshak AI',
      timestamp: new Date().toISOString(),
    };
    existing.timeline.push(newEvent);

    if (isDbConnected()) {
      try {
        await prisma.$transaction([
          prisma.case.update({
            where: { id: caseId },
            data: {
              aiAnalysis: analysis,
              severity: existing.severity,
              status: existing.status,
              updatedAt: new Date(),
            },
          }),
          prisma.caseTimeline.create({
            data: {
              id: newTimelineId,
              caseId,
              type: newEvent.type,
              title: newEvent.title,
              description: newEvent.description,
              actor: newEvent.actor,
              timestamp: new Date(),
            },
          }),
        ]);
      } catch (err) {
        if (isDatabaseRequired()) {
          throw new Error(`[caseStore] Database saveAnalysis failed: ${err.message}`);
        }
        console.warn(`[caseStore] DB saveAnalysis error (${err.message}); updated in-memory fallback.`);
      }
    } else if (isDatabaseRequired()) {
      throw new Error('[caseStore] Database required but PostgreSQL is not connected');
    }

    casesMap.set(caseId, existing);
    return existing;
  },

  async updateStatus(caseId, status, note, actor = 'Dr. Priya Sharma (Officer)') {
    const existing = await this.getCase(caseId);
    if (!existing) return null;

    const previousStatus = existing.status;
    existing.status = status;
    existing.updatedAt = new Date().toISOString();

    if (!existing.timeline) existing.timeline = [];
    const timelineId = `tl-${caseId}-${Date.now()}`;
    const newEvent = {
      id: timelineId,
      caseId,
      type: status === 'resolved' ? 'resolved' : status === 'escalated' ? 'escalated' : 'status_changed',
      title: `Status Changed to ${status.replace('_', ' ').toUpperCase()}`,
      description: note || `Case transitioned from ${previousStatus} to ${status}.`,
      actor,
      timestamp: new Date().toISOString(),
    };
    existing.timeline.push(newEvent);

    if (isDbConnected()) {
      try {
        await prisma.$transaction([
          prisma.case.update({
            where: { id: caseId },
            data: { status, updatedAt: new Date() },
          }),
          prisma.caseTimeline.create({
            data: {
              id: timelineId,
              caseId,
              type: newEvent.type,
              title: newEvent.title,
              description: newEvent.description,
              actor: newEvent.actor,
              timestamp: new Date(),
            },
          }),
        ]);
      } catch (err) {
        if (isDatabaseRequired()) {
          throw new Error(`[caseStore] Database updateStatus failed: ${err.message}`);
        }
        console.warn(`[caseStore] DB updateStatus error (${err.message}); updated in memory.`);
      }
    } else if (isDatabaseRequired()) {
      throw new Error('[caseStore] Database required but PostgreSQL is not connected');
    }

    casesMap.set(caseId, existing);
    return existing;
  },

  async saveOfficerReview(caseId, review, actor = 'Dr. Priya Sharma (Officer)') {
    const existing = await this.getCase(caseId);
    if (!existing) return null;

    const reviewId = `rev-${caseId}-${Date.now()}`;
    const fullReview = {
      id: reviewId,
      caseId,
      officerId: 'usr-officer-001',
      officerName: 'Dr. Priya Sharma',
      assessment: review.assessment,
      outcome: review.outcome || 'confirmed_ai',
      advisory: review.advisory,
      additionalObservations: review.additionalObservations,
      requiresFollowUp: Boolean(review.requiresFollowUp),
      requiresEscalation: Boolean(review.requiresEscalation),
      fieldVisit: review.fieldVisit,
      reviewedAt: new Date().toISOString(),
    };

    existing.officerReview = fullReview;
    if (review.fieldVisit && review.fieldVisit.required) {
      existing.fieldVisit = review.fieldVisit;
    }

    if (review.newStatus) {
      existing.status = review.newStatus;
    } else if (review.requiresEscalation) {
      existing.status = 'escalated';
    } else {
      existing.status = 'resolved';
    }

    existing.updatedAt = new Date().toISOString();

    if (!existing.timeline) existing.timeline = [];
    const timelineId = `tl-${caseId}-${Date.now()}`;
    const newEvent = {
      id: timelineId,
      caseId,
      type: 'review_submitted',
      title: 'Officer Assessment & Advisory Recorded',
      description: `Assessment: ${review.assessment.slice(0, 80)}... Outcome: ${review.outcome}`,
      actor,
      timestamp: new Date().toISOString(),
    };
    existing.timeline.push(newEvent);

    let fvEvent = null;
    if (review.fieldVisit && review.fieldVisit.required) {
      fvEvent = {
        id: `tl-${caseId}-fv-${Date.now()}`,
        caseId,
        type: 'field_visit_scheduled',
        title: 'Field Visit Scheduled',
        description: `Scheduled for ${review.fieldVisit.scheduledDate || 'upcoming date'} at ${review.fieldVisit.location || 'farmer plot'}.`,
        actor,
        timestamp: new Date().toISOString(),
      };
      existing.timeline.push(fvEvent);
    }

    if (isDbConnected()) {
      try {
        const ops = [
          prisma.case.update({
            where: { id: caseId },
            data: {
              officerReview: fullReview,
              status: existing.status,
              updatedAt: new Date(),
            },
          }),
          prisma.caseTimeline.create({
            data: {
              id: timelineId,
              caseId,
              type: newEvent.type,
              title: newEvent.title,
              description: newEvent.description,
              actor: newEvent.actor,
              timestamp: new Date(),
            },
          }),
        ];
        if (fvEvent) {
          ops.push(
            prisma.caseTimeline.create({
              data: {
                id: fvEvent.id,
                caseId,
                type: fvEvent.type,
                title: fvEvent.title,
                description: fvEvent.description,
                actor: fvEvent.actor,
                timestamp: new Date(),
              },
            })
          );
        }
        await prisma.$transaction(ops);
      } catch (err) {
        if (isDatabaseRequired()) {
          throw new Error(`[caseStore] Database saveOfficerReview failed: ${err.message}`);
        }
        console.warn(`[caseStore] DB saveOfficerReview error (${err.message}); updated in memory.`);
      }
    } else if (isDatabaseRequired()) {
      throw new Error('[caseStore] Database required but PostgreSQL is not connected');
    }

    casesMap.set(caseId, existing);
    return existing;
  },

  async getOfficerDashboardSummary() {
    const all = await this.getAllCases();
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

  async getAdminDashboardSummary(timeRange = '30d') {
    const all = await this.getAllCases();
    const activeOutbreakAlerts = await this.getOutbreakAlerts();
    const hotspots = await this.getHotspots();

    // Distinct districts count
    const districts = new Set(all.map((c) => c.district).filter(Boolean));

    return {
      timeRange,
      summary: {
        totalCases: all.length,
        activeCases: all.filter((c) => c.status === 'pending' || c.status === 'under_review' || c.status === 'analyzing').length,
        resolvedCases: all.filter((c) => c.status === 'resolved').length,
        escalatedCases: all.filter((c) => c.status === 'escalated').length,
        casesThisWeek: all.length,
        aiAnalysesCompleted: all.filter((c) => c.aiAnalysis && c.aiAnalysis.status === 'completed').length,
        affectedDistrictsCount: Math.max(districts.size, hotspots.length),
        activeOutbreakAlertsCount: activeOutbreakAlerts.length,
      },
      outbreakAlerts: activeOutbreakAlerts,
      recentEscalations: all.filter((c) => c.status === 'escalated' || c.severity === 'critical'),
      hotspotsSummary: hotspots.slice(0, 4),
      topAffectedCrops: [
        { cropName: 'Tomato', count: 18, percentage: 31 },
        { cropName: 'Cotton', count: 14, percentage: 24 },
        { cropName: 'Rice / Paddy', count: 11, percentage: 19 },
        { cropName: 'Chilli', count: 9, percentage: 15 },
        { cropName: 'Wheat', count: 6, percentage: 11 },
      ],
      recentCases: all.slice(0, 5),
    };
  },

  async getOutbreakAlerts() {
    if (isDbConnected()) {
      try {
        const alerts = await prisma.outbreakAlert.findMany({
          orderBy: { detectedAt: 'desc' },
        });
        if (alerts.length > 0) {
          return alerts.map((a) => ({
            ...a,
            detectedAt: a.detectedAt instanceof Date ? a.detectedAt.toISOString() : a.detectedAt,
          }));
        }
      } catch (err) {
        console.warn(`[caseStore] DB getOutbreakAlerts error (${err.message}); using fallback.`);
      }
    }
    return [
      {
        id: 'ALT-2026-001',
        alertType: 'rapid_increase',
        title: 'Whitefly Pest Surge & Leaf Curl Spread',
        affectedRegion: 'Guntur & Prakasam Belt',
        dominantIssue: 'Whitefly (Bemisia tabaci) / Chilli Leaf Curl',
        caseCount: 24,
        trend: 'increasing',
        severity: 'critical',
        detectedAt: new Date(Date.now() - 3600000 * 5).toISOString(),
        recommendedAction: 'Deploy yellow sticky traps and initiate bio-pesticide buffer cordon.',
        acknowledged: false,
      },
      {
        id: 'ALT-2026-002',
        alertType: 'high_severity_cluster',
        title: 'Early Blight Foliar Epidemic Surge',
        affectedRegion: 'Varanasi & Mirzapur District',
        dominantIssue: 'Early Blight (Alternaria solani)',
        caseCount: 18,
        trend: 'increasing',
        severity: 'high',
        detectedAt: new Date(Date.now() - 3600000 * 14).toISOString(),
        recommendedAction: 'Alert block agricultural officers to inspect humid microclimate zones.',
        acknowledged: false,
      },
      {
        id: 'ALT-2026-003',
        alertType: 'emerging_hotspot',
        title: 'Pink Bollworm Larval Infestation',
        affectedRegion: 'Bathinda Cotton Corridor',
        dominantIssue: 'Pink Bollworm (Pectinophora gossypiella)',
        caseCount: 12,
        trend: 'increasing',
        severity: 'critical',
        detectedAt: new Date(Date.now() - 3600000 * 28).toISOString(),
        recommendedAction: 'Install pheromone traps and issue state emergency containment advisory.',
        acknowledged: true,
      },
    ];
  },

  async getHotspots() {
    if (isDbConnected()) {
      try {
        const spots = await prisma.hotspot.findMany({
          orderBy: { caseCount: 'desc' },
        });
        if (spots.length > 0) {
          return spots.map((h) => ({
            ...h,
            lastReportedAt: h.lastReportedAt instanceof Date ? h.lastReportedAt.toISOString() : h.lastReportedAt,
          }));
        }
      } catch (err) {
        console.warn(`[caseStore] DB getHotspots error (${err.message}); using fallback.`);
      }
    }
    return [
      {
        id: 'HOT-001',
        district: 'Guntur',
        state: 'Andhra Pradesh',
        village: 'Tenali Cluster',
        latitude: 16.3067,
        longitude: 80.4365,
        caseCount: 24,
        severity: 'critical',
        dominantIssue: 'Whitefly & Leaf Curl Virus',
        dominantCategory: 'pest',
        trend: 'increasing',
        affectedCrops: ['Chilli', 'Cotton'],
        lastReportedAt: new Date(Date.now() - 3600000 * 2).toISOString(),
        officersAssigned: 3,
      },
      {
        id: 'HOT-002',
        district: 'Varanasi',
        state: 'Uttar Pradesh',
        village: 'Rampur & Cholapur',
        latitude: 25.3176,
        longitude: 82.9739,
        caseCount: 18,
        severity: 'high',
        dominantIssue: 'Early Blight (Alternaria solani)',
        dominantCategory: 'disease',
        trend: 'increasing',
        affectedCrops: ['Tomato', 'Potato'],
        lastReportedAt: new Date(Date.now() - 3600000 * 4).toISOString(),
        officersAssigned: 4,
      },
      {
        id: 'HOT-003',
        district: 'Nashik',
        state: 'Maharashtra',
        village: 'Dindori Valley',
        latitude: 19.9975,
        longitude: 73.7898,
        caseCount: 15,
        severity: 'moderate',
        dominantIssue: 'Downy Mildew & Purple Blotch',
        dominantCategory: 'disease',
        trend: 'stable',
        affectedCrops: ['Onion', 'Grapes', 'Tomato'],
        lastReportedAt: new Date(Date.now() - 3600000 * 12).toISOString(),
        officersAssigned: 2,
      },
      {
        id: 'HOT-004',
        district: 'Bathinda',
        state: 'Punjab',
        village: 'Maur & Talwandi Sabo',
        latitude: 30.211,
        longitude: 74.9455,
        caseCount: 12,
        severity: 'critical',
        dominantIssue: 'Pink Bollworm (Pectinophora gossypiella)',
        dominantCategory: 'pest',
        trend: 'increasing',
        affectedCrops: ['Cotton'],
        lastReportedAt: new Date(Date.now() - 3600000 * 8).toISOString(),
        officersAssigned: 3,
      },
      {
        id: 'HOT-005',
        district: 'Karnal',
        state: 'Haryana',
        village: 'Taraori & Nilokheri',
        latitude: 29.6857,
        longitude: 76.9905,
        caseCount: 9,
        severity: 'moderate',
        dominantIssue: 'Yellow Rust & Karnal Bunt',
        dominantCategory: 'disease',
        trend: 'decreasing',
        affectedCrops: ['Wheat', 'Mustard'],
        lastReportedAt: new Date(Date.now() - 3600000 * 20).toISOString(),
        officersAssigned: 2,
      },
      {
        id: 'HOT-006',
        district: 'Jabalpur',
        state: 'Madhya Pradesh',
        village: 'Sihora & Patan',
        latitude: 23.1815,
        longitude: 79.9864,
        caseCount: 11,
        severity: 'high',
        dominantIssue: 'Soybean Rust & Mosaic Virus',
        dominantCategory: 'disease',
        trend: 'stable',
        affectedCrops: ['Soybean', 'Gram'],
        lastReportedAt: new Date(Date.now() - 3600000 * 16).toISOString(),
        officersAssigned: 2,
      },
      {
        id: 'HOT-007',
        district: 'Mandya',
        state: 'Karnataka',
        village: 'Maddur & Pandavapura',
        latitude: 12.5238,
        longitude: 76.8971,
        caseCount: 8,
        severity: 'low',
        dominantIssue: 'Paddy Blast & Stem Borer',
        dominantCategory: 'pest',
        trend: 'decreasing',
        affectedCrops: ['Rice / Paddy', 'Sugarcane'],
        lastReportedAt: new Date(Date.now() - 3600000 * 24).toISOString(),
        officersAssigned: 2,
      },
    ];
  },

  getAnalyticsOverview(timeRange = '30d') {
    return {
      timeRange,
      trends: [
        { period: 'Week 1', totalCases: 8, resolvedCases: 6, escalatedCases: 1 },
        { period: 'Week 2', totalCases: 14, resolvedCases: 10, escalatedCases: 2 },
        { period: 'Week 3', totalCases: 19, resolvedCases: 13, escalatedCases: 4 },
        { period: 'Week 4', totalCases: 28, resolvedCases: 19, escalatedCases: 6 },
      ],
      diseaseStats: [
        {
          diseaseName: 'Early Blight (Alternaria solani)',
          scientificName: 'Alternaria solani',
          caseCount: 18,
          percentage: 36,
          affectedCrops: ['Tomato', 'Potato'],
          affectedDistricts: ['Varanasi', 'Nashik'],
          averageConfidence: 0.91,
        },
        {
          diseaseName: 'Yellow Rust (Puccinia striiformis)',
          scientificName: 'Puccinia striiformis',
          caseCount: 11,
          percentage: 22,
          affectedCrops: ['Wheat'],
          affectedDistricts: ['Karnal'],
          averageConfidence: 0.88,
        },
        {
          diseaseName: 'Sheath Blight (Rhizoctonia solani)',
          scientificName: 'Rhizoctonia solani',
          caseCount: 9,
          percentage: 18,
          affectedCrops: ['Rice / Paddy'],
          affectedDistricts: ['Varanasi', 'Mandya'],
          averageConfidence: 0.86,
        },
        {
          diseaseName: 'Soybean Rust (Phakopsora pachyrhizi)',
          scientificName: 'Phakopsora pachyrhizi',
          caseCount: 7,
          percentage: 14,
          affectedCrops: ['Soybean'],
          affectedDistricts: ['Jabalpur'],
          averageConfidence: 0.85,
        },
        {
          diseaseName: 'Downy Mildew (Plasmopara viticola)',
          scientificName: 'Plasmopara viticola',
          caseCount: 5,
          percentage: 10,
          affectedCrops: ['Grapes', 'Cucumber'],
          affectedDistricts: ['Nashik'],
          averageConfidence: 0.89,
        },
      ],
      pestStats: [
        {
          pestName: 'Whitefly (Bemisia tabaci)',
          scientificName: 'Bemisia tabaci',
          caseCount: 22,
          percentage: 42,
          affectedCrops: ['Cotton', 'Chilli', 'Tomato'],
          affectedDistricts: ['Guntur', 'Bathinda'],
          trend: 'increasing',
        },
        {
          pestName: 'Pink Bollworm (Pectinophora gossypiella)',
          scientificName: 'Pectinophora gossypiella',
          caseCount: 14,
          percentage: 27,
          affectedCrops: ['Cotton'],
          affectedDistricts: ['Bathinda'],
          trend: 'increasing',
        },
        {
          pestName: 'Yellow Stem Borer (Scirpophaga incertulas)',
          scientificName: 'Scirpophaga incertulas',
          caseCount: 9,
          percentage: 17,
          affectedCrops: ['Rice / Paddy'],
          affectedDistricts: ['Mandya', 'Varanasi'],
          trend: 'stable',
        },
        {
          pestName: 'Fall Armyworm (Spodoptera frugiperda)',
          scientificName: 'Spodoptera frugiperda',
          caseCount: 7,
          percentage: 14,
          affectedCrops: ['Maize', 'Sorghum'],
          affectedDistricts: ['Jabalpur'],
          trend: 'decreasing',
        },
      ],
      cropImpacts: [
        {
          cropName: 'Tomato',
          caseCount: 18,
          percentage: 31,
          topThreat: 'Early Blight',
          severityDistribution: { mild: 4, moderate: 10, severe: 4 },
        },
        {
          cropName: 'Cotton',
          caseCount: 14,
          percentage: 24,
          topThreat: 'Whitefly & Pink Bollworm',
          severityDistribution: { mild: 2, moderate: 5, severe: 7 },
        },
        {
          cropName: 'Rice / Paddy',
          caseCount: 11,
          percentage: 19,
          topThreat: 'Sheath Blight & Stem Borer',
          severityDistribution: { mild: 3, moderate: 6, severe: 2 },
        },
        {
          cropName: 'Chilli',
          caseCount: 9,
          percentage: 15,
          topThreat: 'Leaf Curl Virus',
          severityDistribution: { mild: 1, moderate: 3, severe: 5 },
        },
        {
          cropName: 'Wheat',
          caseCount: 6,
          percentage: 11,
          topThreat: 'Yellow Rust',
          severityDistribution: { mild: 2, moderate: 3, severe: 1 },
        },
      ],
      severityDistribution: [
        { level: 'Mild', count: 12, percentage: 21 },
        { level: 'Moderate', count: 27, percentage: 47 },
        { level: 'Severe', count: 15, percentage: 26 },
        { level: 'Critical', count: 4, percentage: 7 },
      ],
      districtStats: [
        {
          district: 'Guntur',
          state: 'Andhra Pradesh',
          totalCases: 24,
          activeCases: 19,
          escalatedCases: 4,
          topIssue: 'Whitefly & Leaf Curl',
          affectedCrops: ['Chilli', 'Cotton'],
          trend: 'increasing',
        },
        {
          district: 'Varanasi',
          state: 'Uttar Pradesh',
          totalCases: 18,
          activeCases: 12,
          escalatedCases: 3,
          topIssue: 'Early Blight',
          affectedCrops: ['Tomato', 'Potato'],
          trend: 'increasing',
        },
        {
          district: 'Nashik',
          state: 'Maharashtra',
          totalCases: 15,
          activeCases: 9,
          escalatedCases: 2,
          topIssue: 'Downy Mildew',
          affectedCrops: ['Onion', 'Grapes'],
          trend: 'stable',
        },
        {
          district: 'Bathinda',
          state: 'Punjab',
          totalCases: 12,
          activeCases: 10,
          escalatedCases: 3,
          topIssue: 'Pink Bollworm',
          affectedCrops: ['Cotton'],
          trend: 'increasing',
        },
        {
          district: 'Jabalpur',
          state: 'Madhya Pradesh',
          totalCases: 11,
          activeCases: 6,
          escalatedCases: 1,
          topIssue: 'Soybean Rust',
          affectedCrops: ['Soybean'],
          trend: 'stable',
        },
      ],
    };
  },

  getAdminUsers() {
    return {
      totalUsers: 1420,
      farmersCount: 1380,
      officersCount: 36,
      adminsCount: 4,
      officersList: [
        {
          id: 'usr-officer-001',
          name: 'Dr. Priya Sharma',
          email: 'officer@agrirakshak.in',
          phone: '+91 98765 43211',
          district: 'Nashik',
          state: 'Maharashtra',
          assignedCases: 15,
          pendingCases: 4,
          resolvedCases: 11,
          lastActive: new Date(Date.now() - 3600000 * 2).toISOString(),
        },
        {
          id: 'usr-officer-002',
          name: 'Dr. Anand Verma',
          email: 'anand.verma@agrirakshak.in',
          phone: '+91 98765 43222',
          district: 'Varanasi',
          state: 'Uttar Pradesh',
          assignedCases: 18,
          pendingCases: 6,
          resolvedCases: 12,
          lastActive: new Date(Date.now() - 3600000 * 5).toISOString(),
        },
        {
          id: 'usr-officer-003',
          name: 'Dr. Venkatesh Rao',
          email: 'v.rao@agrirakshak.in',
          phone: '+91 98765 43233',
          district: 'Guntur',
          state: 'Andhra Pradesh',
          assignedCases: 24,
          pendingCases: 9,
          resolvedCases: 15,
          lastActive: new Date(Date.now() - 3600000 * 1).toISOString(),
        },
        {
          id: 'usr-officer-004',
          name: 'Dr. Harpreet Singh',
          email: 'h.singh@agrirakshak.in',
          phone: '+91 98765 43244',
          district: 'Bathinda',
          state: 'Punjab',
          assignedCases: 12,
          pendingCases: 5,
          resolvedCases: 7,
          lastActive: new Date(Date.now() - 3600000 * 8).toISOString(),
        },
      ],
    };
  },
};
