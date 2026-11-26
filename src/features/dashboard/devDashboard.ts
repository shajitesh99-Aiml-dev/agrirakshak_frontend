import { FarmerDashboardData } from '../../types/dashboard';

/**
 * Isolated Development-Only Mock Data for Farmer Dashboard
 * 
 * STRICT CONSTRAINTS:
 * - Only active in development (`import.meta.env.DEV === true`)
 * - Never runs in production (`import.meta.env.PROD`)
 * - Provides realistic, non-personal agronomic testing scenarios
 */

export const DEV_MOCK_FARMER_DASHBOARD: FarmerDashboardData = {
  summary: {
    total: 4,
    pending: 1,
    analyzing: 1,
    resolved: 2,
    escalated: 0,
  },
  recentCases: [
    {
      id: 'CASE-2026-104',
      farmerId: 'usr-farmer-001',
      cropName: 'Tomato (टमाटर)',
      status: 'analyzing',
      reportedAt: '2026-02-18T08:15:00Z',
      updatedAt: '2026-02-18T08:20:00Z',
      description: 'Dark concentric brown rings spreading across lower leaves. Foliage curling and yellowing around lesion edges.',
      prediction: {
        id: 'pred-104',
        diseaseName: 'Early Blight (Alternaria solani)',
        scientificName: 'Alternaria solani',
        confidenceScore: 0.92,
        severity: 'high',
        affectedPart: 'leaf',
        suggestedAction: 'Initial computer vision inference complete. Awaiting extension officer confirmation before chemical fungicide application.',
      },
    },
    {
      id: 'CASE-2026-092',
      farmerId: 'usr-farmer-001',
      cropName: 'Cotton (कपास)',
      status: 'pending',
      reportedAt: '2026-02-17T14:30:00Z',
      updatedAt: '2026-02-17T14:30:00Z',
      description: 'Stippling and leaf margin chlorosis. Small white insect clusters visible underneath foliage surface.',
      prediction: {
        id: 'pred-092',
        diseaseName: 'Whitefly Infestation (Bemisia tabaci)',
        scientificName: 'Bemisia tabaci',
        confidenceScore: 0.86,
        severity: 'moderate',
        affectedPart: 'leaf',
        suggestedAction: 'Sample image in officer verification triage queue.',
      },
    },
    {
      id: 'CASE-2026-081',
      farmerId: 'usr-farmer-001',
      cropName: 'Wheat (गेहूं)',
      status: 'resolved',
      reportedAt: '2026-02-14T09:00:00Z',
      updatedAt: '2026-02-15T16:45:00Z',
      description: 'Yellow stripe-like pustules running parallel along blade veins.',
      prediction: {
        id: 'pred-081',
        diseaseName: 'Yellow Stripe Rust (Puccinia striiformis)',
        scientificName: 'Puccinia striiformis f. sp. tritici',
        confidenceScore: 0.96,
        severity: 'moderate',
        affectedPart: 'leaf',
        suggestedAction: 'Verified by District Agronomist: Apply Propiconazole 25% EC @ 0.1% spray (1ml/litre) in clear morning hours.',
      },
      assignedOfficerId: 'usr-officer-001',
    },
    {
      id: 'CASE-2026-065',
      farmerId: 'usr-farmer-001',
      cropName: 'Soybean (सोयाबीन)',
      status: 'resolved',
      reportedAt: '2026-02-10T11:20:00Z',
      updatedAt: '2026-02-11T12:00:00Z',
      description: 'Angular reddish-brown leaf spots with chlorotic haloes after rainfall.',
      prediction: {
        id: 'pred-065',
        diseaseName: 'Bacterial Pustule (Xanthomonas axonopodis)',
        scientificName: 'Xanthomonas axonopodis pv. glycines',
        confidenceScore: 0.89,
        severity: 'low',
        affectedPart: 'leaf',
        suggestedAction: 'Copper oxychloride 50 WP spray recommended. Completed successfully.',
      },
      assignedOfficerId: 'usr-officer-001',
    },
  ],
  pendingActions: [
    {
      id: 'act-001',
      caseId: 'CASE-2026-081',
      title: 'Review Treatment Advisory for Wheat Rust',
      description: 'Dr. Priya Sharma (District Agronomist) has provided verified chemical prescription for Case #CASE-2026-081.',
      actionType: 'review_result',
      actionUrl: '/farmer/cases/CASE-2026-081',
      actionLabel: 'View Treatment Details',
      priority: 'urgent',
      createdAt: '2026-02-15T16:45:00Z',
    },
    {
      id: 'act-002',
      caseId: 'CASE-2026-104',
      title: 'Upload Additional Stem Photo for Tomato Case',
      description: 'Officer requested one additional close-up of stem collar to rule out late blight stem lesions.',
      actionType: 'provide_info',
      actionUrl: '/farmer/cases/CASE-2026-104',
      actionLabel: 'Upload Photo',
      priority: 'normal',
      createdAt: '2026-02-18T08:30:00Z',
    },
  ],
  alerts: [
    {
      id: 'alert-001',
      title: 'KVK Advisory: Humid Weather Disease Prevention',
      summary: 'High morning humidity (>85%) forecasted. Keep tomato, potato, and cucurbit crops well-aerated to prevent fungal spore germination.',
      type: 'advisory',
      date: '2026-02-18',
      source: 'ICAR - Krishi Vigyan Kendra',
    },
    {
      id: 'alert-002',
      title: 'IMD Agro-Meteorological Weather Bulletin',
      summary: 'Partly cloudy sky with light sporadic rainfall anticipated over the next 48-72 hours. Postpone foliar pesticide sprays until weather clears.',
      type: 'weather',
      date: '2026-02-17',
      source: 'India Meteorological Department',
    },
    {
      id: 'alert-003',
      title: 'PM-Kisan Samman Nidhi Verification Notice',
      summary: 'Farmers are advised to complete e-KYC via facial authentication on PM-Kisan mobile app before the upcoming seasonal release.',
      type: 'scheme',
      date: '2026-02-15',
      source: 'Ministry of Agriculture & Farmers Welfare',
    },
  ],
};

export const devDashboard = {
  isEnabled(): boolean {
    return import.meta.env.DEV === true;
  },

  async getMockFarmerDashboard(): Promise<FarmerDashboardData> {
    // Simulate brief network latency (250ms)
    await new Promise((resolve) => setTimeout(resolve, 250));
    return DEV_MOCK_FARMER_DASHBOARD;
  },
};
