import { CropCase } from '../../types';
import { CreateCaseRequest } from './types/caseFormTypes';
import { DEV_MOCK_FARMER_DASHBOARD } from '../dashboard/devDashboard';

/**
 * Isolated Development-Only Mock Case Submission and Retrieval Adapter
 * 
 * STRICT CONSTRAINTS:
 * - Only active in development (`import.meta.env.DEV === true`)
 * - Never active in production (`import.meta.env.PROD`)
 */

// In-memory session case cache for testing
const localCasesMap = new Map<string, CropCase>();

// Seed initial cases from devDashboard
DEV_MOCK_FARMER_DASHBOARD.recentCases.forEach((c) => {
  localCasesMap.set(c.id, {
    ...c,
    imageUrls: c.imageUrl ? [c.imageUrl] : [],
    village: 'Rampur',
    district: 'Varanasi',
    state: 'Uttar Pradesh',
    symptoms: c.description?.includes('rings')
      ? ['Dark concentric rings', 'Yellowing margins', 'Leaf wilting']
      : ['Leaf discoloration', 'Spotting'],
  });
});

export const devCases = {
  isEnabled(): boolean {
    return import.meta.env.DEV === true;
  },

  async mockCreateCase(request: CreateCaseRequest): Promise<CropCase> {
    await new Promise((resolve) => setTimeout(resolve, 600));

    const now = new Date().toISOString();
    const caseCounter = Math.floor(100 + Math.random() * 900);
    const newCaseId = `CASE-2026-${caseCounter}`;

    const newCase: CropCase = {
      id: newCaseId,
      farmerId: 'usr-farmer-001',
      cropName: request.cropName,
      status: 'pending', // Canonical initial state
      reportedAt: now,
      updatedAt: now,
      description: request.description,
      imageUrl: request.imageUrls && request.imageUrls.length > 0 ? request.imageUrls[0] : undefined,
      imageUrls: request.imageUrls || [],
      growthStage: request.cultivationStage || 'Vegetative Growth',
      cultivationStage: request.cultivationStage || 'Vegetative Growth',
      village: request.village || 'Rampur',
      district: request.district || 'Varanasi',
      state: request.state || 'Uttar Pradesh',
      symptoms: request.symptoms || [],
      prediction: undefined,
      assignedOfficerId: undefined,
    };

    localCasesMap.set(newCaseId, newCase);
    return newCase;
  },

  async getMockCaseById(caseId: string): Promise<CropCase | null> {
    await new Promise((resolve) => setTimeout(resolve, 200));

    if (localCasesMap.has(caseId)) {
      return localCasesMap.get(caseId)!;
    }

    // Dynamic fallback for any arbitrary ID tested in development
    const genericCase: CropCase = {
      id: caseId,
      farmerId: 'usr-farmer-001',
      cropName: 'Tomato (टमाटर)',
      growthStage: 'Flowering & Early Fruiting',
      cultivationStage: 'Flowering & Early Fruiting',
      village: 'Rampur Village',
      district: 'Varanasi',
      state: 'Uttar Pradesh',
      status: 'pending',
      reportedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      description:
        'Noticed brown and yellow necrotic lesions spreading on lower leaf foliage after continuous morning mist.',
      symptoms: ['Leaf Spots / Lesions', 'Chlorosis (Yellowing)', 'Leaf Wilting'],
      imageUrl: undefined,
      imageUrls: [],
    };

    localCasesMap.set(caseId, genericCase);
    return genericCase;
  },

  async getAllMockCases(): Promise<CropCase[]> {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return Array.from(localCasesMap.values());
  },
};
