/**
 * Agri Rakshak Explicit Database Seed Script
 * Populates PostgreSQL database with SIH26131 demonstration accounts and cases.
 * 
 * Usage:
 *   npm run db:seed
 *   node server/scripts/seed.js
 */

import crypto from 'node:crypto';
import { prisma, checkDbConnection, disconnectDb } from '../db/prisma.js';

function hashPassword(password, salt) {
  return crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
}

const SEED_SALT = 'agri-rakshak-sih-2026-salt';

const seedUsers = [
  {
    id: 'usr-farmer-001',
    name: 'Ramesh Patel',
    email: 'kisan@agrirakshak.in',
    phone: '9876543210',
    role: 'farmer',
    village: 'Navsari',
    district: 'Navsari',
    state: 'Gujarat',
    farmSizeAcres: 3.5,
    preferredLanguage: 'en',
    salt: SEED_SALT,
    passwordHash: hashPassword('password123', SEED_SALT),
  },
  {
    id: 'usr-farmer-002',
    name: 'Sunil Verma',
    email: 'sunil@agrirakshak.in',
    phone: '9876543215',
    role: 'farmer',
    village: 'Kalyanpur',
    district: 'Kanpur Nagar',
    state: 'Uttar Pradesh',
    farmSizeAcres: 5.0,
    preferredLanguage: 'hi',
    salt: SEED_SALT,
    passwordHash: hashPassword('password123', SEED_SALT),
  },
  {
    id: 'usr-officer-001',
    name: 'Dr. Priya Sharma',
    email: 'officer@agrirakshak.in',
    phone: '9876543211',
    role: 'officer',
    district: 'Nashik',
    state: 'Maharashtra',
    assignedJurisdiction: 'Western Agronomy Subdivision (Taluk 1-4)',
    badgeNumber: 'KVK-AGR-MH-2026-084',
    preferredLanguage: 'en',
    salt: SEED_SALT,
    passwordHash: hashPassword('password123', SEED_SALT),
  },
  {
    id: 'usr-admin-001',
    name: 'Super Administrator',
    email: 'admin@agrirakshak.in',
    phone: '9876543212',
    role: 'admin',
    preferredLanguage: 'en',
    administrativeRegion: 'National Headquarters • State Surveillance Grid',
    permissions: [
      'all_districts_view',
      'model_monitoring',
      'outbreak_quarantine_broadcast',
      'user_management',
    ],
    salt: SEED_SALT,
    passwordHash: hashPassword('password123', SEED_SALT),
  },
];

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
    reportedAt: new Date(Date.now() - 3600000 * 4),
    updatedAt: new Date(Date.now() - 3600000 * 2),
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
        type: 'case_created',
        title: 'Case Report Created',
        description: 'Farmer Ramesh Patel submitted tomato leaf problem with 2 photos.',
        actor: 'Ramesh Patel (Farmer)',
        timestamp: new Date(Date.now() - 3600000 * 4),
      },
      {
        id: 'tl-104-2',
        type: 'ai_analysis',
        title: 'AI Diagnostic Screening Complete',
        description: 'Diagnosed Early Blight with 92% confidence score.',
        actor: 'Agri Rakshak AI',
        timestamp: new Date(Date.now() - 3600000 * 3),
      },
    ],
  },
  {
    id: 'CASE-2026-105',
    farmerId: 'usr-farmer-001',
    farmerName: 'Ramesh Patel',
    farmerPhone: '+91 98765 43210',
    farmSizeAcres: 3.5,
    cropName: 'Cotton (कपास)',
    status: 'under_review',
    severity: 'critical',
    reportedAt: new Date(Date.now() - 3600000 * 24),
    updatedAt: new Date(Date.now() - 3600000 * 6),
    growthStage: 'Boll Formation',
    village: 'Pipariya',
    district: 'Bathinda',
    state: 'Punjab',
    description: 'Bore holes visible on developing cotton bolls. Frass accumulation near bracts. Flower buds failing to open properly into rosette flowers.',
    symptoms: ['Rosetted flowers', 'Frass at bore entry holes', 'Premature boll drop', 'Interrupted boll development'],
    imageUrls: ['https://images.unsplash.com/photo-1605000797499-95a51c5269ae?auto=format&fit=crop&w=600&q=80'],
    aiAnalysis: {
      status: 'completed',
      prediction: {
        label: 'Pink Bollworm (Pectinophora gossypiella)',
        scientificName: 'Pectinophora gossypiella',
        confidence: 0.96,
        category: 'pest',
      },
      severity: 'critical',
      explanation: 'Signature frass extrusion around boll bracts and rosette flower deformation confirms mid-instar pink bollworm infestation.',
      observedSymptoms: ['Rosetted flowers', 'Frass near bracts', 'Bore entry holes'],
      possibleCauses: ['Pheromone trap threshold exceeded', 'Second-generation moth emergence'],
      recommendations: [
        'Deploy delta pheromone traps at 12 traps/hectare.',
        'Apply Neem oil (1500 ppm) at 5 ml/liter immediately.',
      ],
      warnings: ['Notify nearest Krishi Vigyan Kendra immediately for regional quarantine surveillance.'],
      requiresOfficerEscalation: true,
      escalationReason: 'Pest classification flagged as critical regional quarantine threat.',
      analyzedAt: new Date(Date.now() - 3600000 * 22).toISOString(),
      isMock: false,
    },
    timeline: [
      {
        id: 'tl-105-1',
        type: 'case_created',
        title: 'Case Report Created',
        description: 'Cotton bollworm attack submitted.',
        actor: 'Ramesh Patel (Farmer)',
        timestamp: new Date(Date.now() - 3600000 * 24),
      },
      {
        id: 'tl-105-2',
        type: 'ai_analysis',
        title: 'Critical Threat Flagged by AI',
        description: 'Pink bollworm detected with 96% confidence. Flagged for officer escalation.',
        actor: 'Agri Rakshak AI',
        timestamp: new Date(Date.now() - 3600000 * 22),
      },
    ],
  },
  {
    id: 'CASE-2026-108',
    farmerId: 'usr-farmer-002',
    farmerName: 'Sunil Verma',
    farmerPhone: '+91 98765 43215',
    farmSizeAcres: 5.0,
    cropName: 'Chilli (मिर्च)',
    status: 'resolved',
    severity: 'high',
    reportedAt: new Date(Date.now() - 3600000 * 48),
    updatedAt: new Date(Date.now() - 3600000 * 8),
    growthStage: 'Vegetative to Flowering',
    village: 'Tenali Cluster',
    district: 'Guntur',
    state: 'Andhra Pradesh',
    description: 'Upward leaf curling, boat-shaped stunted leaves, reduced internodal distance. Dense clustering of white insects under lower leaf surface.',
    symptoms: ['Upward leaf curling', 'Stunted plant growth', 'Whitefly colonies underneath', 'Flower abortion'],
    imageUrls: ['https://images.unsplash.com/photo-1592417817098-8f3d69109853?auto=format&fit=crop&w=600&q=80'],
    aiAnalysis: {
      status: 'completed',
      prediction: {
        label: 'Chilli Leaf Curl Virus (transmitted by Bemisia tabaci)',
        scientificName: 'Begomovirus (Whitefly vector)',
        confidence: 0.94,
        category: 'virus_pest_complex',
      },
      severity: 'high',
      explanation: 'Typical Gemini-virus symptoms transmitted by heavy whitefly (Bemisia tabaci) populations.',
      observedSymptoms: ['Upward cupping', 'Leaf thickening', 'Enation of veins'],
      possibleCauses: ['Vector swarm from adjacent host crops', 'Dry humid microclimate favoring whitefly breeding'],
      recommendations: [
        'Erect yellow sticky traps at 20-25 per acre.',
        'Spray Diafenthiuron 50% WP @ 1.25 g/l or Neem seed extract (5%).',
      ],
      warnings: ['Virus itself is incurable once systemic; vector control is essential to prevent horizontal spread.'],
      requiresOfficerEscalation: true,
      escalationReason: 'Viral transmission vector spreading across Tenali cluster.',
      analyzedAt: new Date(Date.now() - 3600000 * 46).toISOString(),
      isMock: false,
    },
    officerReview: {
      status: 'approved',
      officerId: 'usr-officer-001',
      officerName: 'Dr. Priya Sharma',
      badgeNumber: 'KVK-AGR-MH-2026-084',
      district: 'Guntur Agronomy Center',
      reviewedAt: new Date(Date.now() - 3600000 * 8).toISOString(),
      diagnosisConfirmed: 'Chilli Leaf Curl Virus (Begomovirus) with Whitefly (Bemisia tabaci) Vector',
      severityAssessment: 'high',
      officialAdvisory: 'Confirmed Begomovirus upward cupping. Apply yellow sticky traps immediately (25 traps/acre). Follow with Diafenthiuron 50% WP spray in morning hours.',
      treatmentPlan: [
        {
          phase: 'Immediate Action (Days 1-2)',
          action: 'Erect 25 yellow sticky sheets per acre at canopy height to capture adult whiteflies.',
        },
        {
          phase: 'Targeted Control (Day 3)',
          action: 'Spray Diafenthiuron 50% WP @ 1.25 g/liter of water, ensuring thorough coverage under leaf surfaces.',
        },
      ],
      fieldVisitRequired: false,
      quarantineNotice: false,
    },
    timeline: [
      {
        id: 'tl-108-1',
        type: 'case_created',
        title: 'Case Report Created',
        description: 'Chilli leaf curl symptoms reported.',
        actor: 'Sunil Verma (Farmer)',
        timestamp: new Date(Date.now() - 3600000 * 48),
      },
      {
        id: 'tl-108-2',
        type: 'officer_review',
        title: 'Officer Advisory Issued',
        description: 'Dr. Priya Sharma approved vector control treatment plan.',
        actor: 'Dr. Priya Sharma (Officer)',
        timestamp: new Date(Date.now() - 3600000 * 8),
      },
    ],
  },
];

const seedNotifications = [
  {
    id: 'notif-001',
    type: 'officer_review',
    title: 'Officer Advisory Issued',
    message: 'Dr. Priya Sharma approved copper oxychloride spray treatment for Tomato Early Blight on Case #CASE-2026-104.',
    read: false,
    caseId: 'CASE-2026-104',
    severity: 'success',
    targetRole: 'farmer',
    targetUserId: 'usr-farmer-001',
  },
  {
    id: 'notif-002',
    type: 'admin_alert',
    title: 'Regional Outbreak Notice: Late Blight',
    message: 'District Krishi Vigyan Kendra issued an alert for high humidity fungal spore clusters in Nashik taluk.',
    read: false,
    severity: 'warning',
    targetRole: 'all',
  },
  {
    id: 'notif-003',
    type: 'ai_analysis',
    title: 'AI Pathology Detection Completed',
    message: 'Deep learning vision model diagnosed Rice Brown Spot with 94.2% confidence for Case #CASE-2026-104.',
    read: true,
    caseId: 'CASE-2026-104',
    severity: 'info',
    targetRole: 'farmer',
    targetUserId: 'usr-farmer-001',
  },
  {
    id: 'notif-004',
    type: 'escalation',
    title: 'High-Severity Triage Escalation',
    message: 'Case #CASE-2026-105 (Pink Bollworm on Cotton) was escalated to District Directorate for containment.',
    read: false,
    caseId: 'CASE-2026-105',
    severity: 'error',
    targetRole: 'officer',
  },
];

const seedAlerts = [
  {
    id: 'ALT-2026-001',
    alertType: 'rapid_increase',
    title: 'Whitefly Pest Surge & Leaf Curl Spread',
    affectedRegion: 'Guntur & Prakasam Belt',
    dominantIssue: 'Whitefly (Bemisia tabaci) / Chilli Leaf Curl',
    caseCount: 24,
    trend: 'increasing',
    severity: 'critical',
    detectedAt: new Date(Date.now() - 3600000 * 5),
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
    detectedAt: new Date(Date.now() - 3600000 * 14),
    recommendedAction: 'Alert block agricultural officers to inspect humid microclimate zones.',
    acknowledged: false,
  },
];

const seedHotspots = [
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
    lastReportedAt: new Date(Date.now() - 3600000 * 2),
    officersAssigned: 3,
  },
  {
    id: 'HOT-002',
    district: 'Varanasi',
    state: 'Uttar Pradesh',
    village: 'Rampur Micro-watershed',
    latitude: 25.3176,
    longitude: 82.9739,
    caseCount: 18,
    severity: 'high',
    dominantIssue: 'Early Blight (Alternaria solani)',
    dominantCategory: 'disease',
    trend: 'increasing',
    affectedCrops: ['Tomato', 'Potato'],
    lastReportedAt: new Date(Date.now() - 3600000 * 5),
    officersAssigned: 2,
  },
];

export async function runSeed(options = {}) {
  const isProd = process.env.NODE_ENV === 'production';
  if (isProd && !options.force) {
    console.warn('[Agri Rakshak Seed] Skipping seed: NODE_ENV is set to production. Use --force to seed production.');
    return { success: false, reason: 'Production safety guard active' };
  }

  const conn = await checkDbConnection();
  if (!conn.connected) {
    console.error('[Agri Rakshak Seed] Cannot seed database: Database connection is not available.');
    console.error(`[Agri Rakshak Seed] Details: ${conn.reason}`);
    return { success: false, reason: conn.reason };
  }

  console.log('[Agri Rakshak Seed] Seeding demo users...');
  for (const u of seedUsers) {
    await prisma.user.upsert({
      where: { id: u.id },
      update: {
        name: u.name,
        email: u.email,
        phone: u.phone,
        role: u.role,
        village: u.village,
        district: u.district,
        state: u.state,
        farmSizeAcres: u.farmSizeAcres,
        preferredLanguage: u.preferredLanguage,
        assignedJurisdiction: u.assignedJurisdiction,
        badgeNumber: u.badgeNumber,
        administrativeRegion: u.administrativeRegion,
        permissions: u.permissions || [],
        salt: u.salt,
        passwordHash: u.passwordHash,
      },
      create: {
        id: u.id,
        name: u.name,
        email: u.email,
        phone: u.phone,
        role: u.role,
        village: u.village,
        district: u.district,
        state: u.state,
        farmSizeAcres: u.farmSizeAcres,
        preferredLanguage: u.preferredLanguage,
        assignedJurisdiction: u.assignedJurisdiction,
        badgeNumber: u.badgeNumber,
        administrativeRegion: u.administrativeRegion,
        permissions: u.permissions || [],
        salt: u.salt,
        passwordHash: u.passwordHash,
      },
    });
  }

  console.log('[Agri Rakshak Seed] Seeding demo cases...');
  for (const c of seedCases) {
    const { timeline, ...caseData } = c;
    await prisma.case.upsert({
      where: { id: c.id },
      update: caseData,
      create: caseData,
    });

    if (timeline && timeline.length > 0) {
      for (const tl of timeline) {
        await prisma.caseTimeline.upsert({
          where: { id: tl.id },
          update: {
            title: tl.title,
            description: tl.description,
            actor: tl.actor,
            timestamp: tl.timestamp,
          },
          create: {
            id: tl.id,
            caseId: c.id,
            type: tl.type,
            title: tl.title,
            description: tl.description,
            actor: tl.actor,
            timestamp: tl.timestamp,
          },
        });
      }
    }
  }

  console.log('[Agri Rakshak Seed] Seeding notifications...');
  for (const n of seedNotifications) {
    await prisma.notification.upsert({
      where: { id: n.id },
      update: n,
      create: n,
    });
  }

  console.log('[Agri Rakshak Seed] Seeding outbreak alerts & hotspots...');
  for (const a of seedAlerts) {
    await prisma.outbreakAlert.upsert({
      where: { id: a.id },
      update: a,
      create: a,
    });
  }

  for (const h of seedHotspots) {
    await prisma.hotspot.upsert({
      where: { id: h.id },
      update: h,
      create: h,
    });
  }

  console.log('[Agri Rakshak Seed] Seeding completed successfully!');
  return { success: true };
}

// Direct execution from CLI
if (process.argv[1] && process.argv[1].endsWith('seed.js')) {
  const force = process.argv.includes('--force');
  runSeed({ force })
    .then(() => disconnectDb())
    .catch((err) => {
      console.error('[Agri Rakshak Seed] Seed error:', err);
      process.exit(1);
    });
}
