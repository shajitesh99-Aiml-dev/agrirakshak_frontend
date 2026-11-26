export type FAQCategory = 'all' | 'farmer' | 'officer' | 'admin';

export interface FAQItemData {
  id: string;
  category: 'farmer' | 'officer' | 'admin';
  qKey: string;
  aKey: string;
}

export const FAQ_CATALOG: FAQItemData[] = [
  // Farmer Topics
  {
    id: 'f-1',
    category: 'farmer',
    qKey: 'help.fqReportCrop',
    aKey: 'help.faReportCrop',
  },
  {
    id: 'f-2',
    category: 'farmer',
    qKey: 'help.fqUploadPhotos',
    aKey: 'help.faUploadPhotos',
  },
  {
    id: 'f-3',
    category: 'farmer',
    qKey: 'help.fqCropsSupported',
    aKey: 'help.faCropsSupported',
  },
  {
    id: 'f-4',
    category: 'farmer',
    qKey: 'help.fqSymptoms',
    aKey: 'help.faSymptoms',
  },
  {
    id: 'f-5',
    category: 'farmer',
    qKey: 'help.fqAiResult',
    aKey: 'help.faAiResult',
  },
  {
    id: 'f-6',
    category: 'farmer',
    qKey: 'help.fqConfidence',
    aKey: 'help.faConfidence',
  },
  {
    id: 'f-7',
    category: 'farmer',
    qKey: 'help.fqSeverity',
    aKey: 'help.faSeverity',
  },
  {
    id: 'f-8',
    category: 'farmer',
    qKey: 'help.fqTrackCase',
    aKey: 'help.faTrackCase',
  },
  {
    id: 'f-9',
    category: 'farmer',
    qKey: 'help.fqOfficerReview',
    aKey: 'help.faOfficerReview',
  },
  {
    id: 'f-10',
    category: 'farmer',
    qKey: 'help.fqEscalation',
    aKey: 'help.faEscalation',
  },

  // Officer Topics
  {
    id: 'o-1',
    category: 'officer',
    qKey: 'help.oqReviewCase',
    aKey: 'help.oaReviewCase',
  },
  {
    id: 'o-2',
    category: 'officer',
    qKey: 'help.oqConfirmAi',
    aKey: 'help.oaConfirmAi',
  },
  {
    id: 'o-3',
    category: 'officer',
    qKey: 'help.oqAlternative',
    aKey: 'help.oaAlternative',
  },
  {
    id: 'o-4',
    category: 'officer',
    qKey: 'help.oqEscalate',
    aKey: 'help.oaEscalate',
  },
  {
    id: 'o-5',
    category: 'officer',
    qKey: 'help.oqScheduleVisit',
    aKey: 'help.oaScheduleVisit',
  },
  {
    id: 'o-6',
    category: 'officer',
    qKey: 'help.oqUpdateStatus',
    aKey: 'help.oaUpdateStatus',
  },

  // Admin Topics
  {
    id: 'a-1',
    category: 'admin',
    qKey: 'help.aqMonitorTrends',
    aKey: 'help.aaMonitorTrends',
  },
  {
    id: 'a-2',
    category: 'admin',
    qKey: 'help.aqInspectHotspots',
    aKey: 'help.aaInspectHotspots',
  },
  {
    id: 'a-3',
    category: 'admin',
    qKey: 'help.aqOutbreakAlert',
    aKey: 'help.aaOutbreakAlert',
  },
  {
    id: 'a-4',
    category: 'admin',
    qKey: 'help.aqDistrictStats',
    aKey: 'help.aaDistrictStats',
  },
  {
    id: 'a-5',
    category: 'admin',
    qKey: 'help.aqInterpretAi',
    aKey: 'help.aaInterpretAi',
  },
];
