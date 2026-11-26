import { SelectOption } from '../../../components/ui/Select';
import { SupportedLanguage } from '../../../i18n';

export interface CanonicalCrop {
  id: string; // Canonical value sent to API backend
  key: string;
  labels: {
    en: string;
    te: string;
    hi: string;
    kn: string;
  };
}

export interface CanonicalStage {
  id: string; // Canonical growth stage sent to API backend
  key: string;
  labels: {
    en: string;
    te: string;
    hi: string;
    kn: string;
  };
}

export const CANONICAL_CROPS: CanonicalCrop[] = [
  {
    id: 'Tomato',
    key: 'tomato',
    labels: { en: 'Tomato', te: 'టమోటా', hi: 'टमाटर', kn: 'ಟೊಮೆಟೊ' },
  },
  {
    id: 'Wheat',
    key: 'wheat',
    labels: { en: 'Wheat', te: 'గోధుమ', hi: 'गेहूँ', kn: 'ಗೋಧಿ' },
  },
  {
    id: 'Rice / Paddy',
    key: 'rice',
    labels: { en: 'Rice / Paddy', te: 'వరి / ధాన్యం', hi: 'धान (चावल)', kn: 'ಭತ್ತ / ಅಕ್ಕಿ' },
  },
  {
    id: 'Cotton',
    key: 'cotton',
    labels: { en: 'Cotton', te: 'పత్తి', hi: 'कपास', kn: 'ಹತ್ತಿ' },
  },
  {
    id: 'Chilli',
    key: 'chilli',
    labels: { en: 'Chilli', te: 'మిరప', hi: 'मिर्च', kn: 'ಮೆಣಸಿನಕಾಯಿ' },
  },
  {
    id: 'Soybean',
    key: 'soybean',
    labels: { en: 'Soybean', te: 'సోయాబీన్', hi: 'सोयाबीन', kn: 'ಸೋಯಾಬೀನ್' },
  },
  {
    id: 'Maize / Corn',
    key: 'maize',
    labels: { en: 'Maize / Corn', te: 'మొక్కజొన్న', hi: 'मक्का', kn: 'ಮೆಕ್ಕೆಜೋಳ' },
  },
  {
    id: 'Groundnut / Peanut',
    key: 'groundnut',
    labels: { en: 'Groundnut', te: 'వేరుశనగ', hi: 'मूंगफली', kn: 'ಕಡಲೆಕಾಯಿ' },
  },
  {
    id: 'Sugarcane',
    key: 'sugarcane',
    labels: { en: 'Sugarcane', te: 'చెరకు', hi: 'गन्ना', kn: 'ಕಬ್ಬು' },
  },
  {
    id: 'Potato',
    key: 'potato',
    labels: { en: 'Potato', te: 'బంగాళాదుంప', hi: 'आलू', kn: 'ಆಲೂಗಡ್ಡೆ' },
  },
  {
    id: 'Onion',
    key: 'onion',
    labels: { en: 'Onion', te: 'ఉల్లిపాయ', hi: 'प्याज', kn: 'ಈರುಳ್ಳಿ' },
  },
  {
    id: 'Mustard',
    key: 'mustard',
    labels: { en: 'Mustard', te: 'ఆవాలు', hi: 'सरसों', kn: 'ಸಾಸಿವೆ' },
  },
  {
    id: 'Gram / Chickpea',
    key: 'gram',
    labels: { en: 'Gram / Chickpea', te: 'శనగలు', hi: 'चना', kn: 'ಕಡಲೆ' },
  },
  {
    id: 'Banana',
    key: 'banana',
    labels: { en: 'Banana', te: 'అరటి', hi: 'केला', kn: 'ಬಾಳೆ' },
  },
  {
    id: 'Mango',
    key: 'mango',
    labels: { en: 'Mango', te: 'మామిడి', hi: 'आम', kn: 'ಮಾವಿನಹಣ್ಣು' },
  },
  {
    id: 'Other',
    key: 'other',
    labels: { en: 'Other Crop', te: 'ఇతర పంట', hi: 'अन्य फसल', kn: 'ಇತರ ಬೆಳೆ' },
  },
];

export const CANONICAL_STAGES: CanonicalStage[] = [
  {
    id: 'seedling',
    key: 'seedling',
    labels: {
      en: 'Seedling / Early Germination',
      te: 'మొలక దశ / ప్రారంభ అంకురోత్పత్తి',
      hi: 'अंकुरण अवस्था (शुरुआती पौध)',
      kn: 'ಮೊಳಕೆ ಹಂತ / ಆರಂಭಿಕ ಬೆಳವಣಿಗೆ',
    },
  },
  {
    id: 'vegetative',
    key: 'vegetative',
    labels: {
      en: 'Vegetative Growth',
      te: 'శాఖీయ పెరుగుదల దశ',
      hi: 'वानस्पतिक वृद्धि अवस्था',
      kn: 'ಕವಲೊಡೆಯುವ / ಹಸಿರು ಬೆಳವಣಿಗೆಯ ಹಂತ',
    },
  },
  {
    id: 'flowering',
    key: 'flowering',
    labels: {
      en: 'Flowering & Budding',
      te: 'పూత మరియు మొగ్గ దశ',
      hi: 'फूल और कलियाँ आने की अवस्था',
      kn: 'ಹೂವು ಮತ್ತು ಮೊಗ್ಗು ಬಿಡುವ ಹಂತ',
    },
  },
  {
    id: 'fruiting',
    key: 'fruiting',
    labels: {
      en: 'Fruiting / Pod Formation',
      te: 'కాయ / గింజ తయారయ్యే దశ',
      hi: 'फल / फली बनने की अवस्था',
      kn: 'ಕಾಯಿ / ಕಾಳು ಕಟ್ಟುವ ಹಂತ',
    },
  },
  {
    id: 'maturation',
    key: 'maturation',
    labels: {
      en: 'Maturity / Pre-Harvest',
      te: 'పరిపక్వత / కోతకు ముందు దశ',
      hi: 'परिपक्वता / कटाई पूर्व अवस्था',
      kn: 'ಪಕ್ವತೆ / ಕೊಯ್ಲಿಗೆ ಸಿದ್ಧವಾದ ಹಂತ',
    },
  },
];

/**
 * Returns localized select options while preserving canonical values for backend submission
 */
export const getCropOptions = (lang: SupportedLanguage = 'en'): SelectOption[] => {
  return CANONICAL_CROPS.map((crop) => ({
    value: crop.id,
    label: lang === 'en' ? crop.labels.en : `${crop.labels[lang]} (${crop.labels.en})`,
  }));
};

export const getStageOptions = (lang: SupportedLanguage = 'en'): SelectOption[] => {
  return CANONICAL_STAGES.map((stage) => ({
    value: stage.id,
    label: lang === 'en' ? stage.labels.en : `${stage.labels[lang]} (${stage.labels.en})`,
  }));
};

export const getLocalizedCropName = (cropId?: string, lang: SupportedLanguage = 'en'): string => {
  if (!cropId) return '';
  const match = CANONICAL_CROPS.find((c) => c.id.toLowerCase() === cropId.toLowerCase() || c.key === cropId.toLowerCase());
  if (!match) return cropId;
  return lang === 'en' ? match.labels.en : `${match.labels[lang]} (${match.labels.en})`;
};

export const getLocalizedStageName = (stageId?: string, lang: SupportedLanguage = 'en'): string => {
  if (!stageId) return '';
  const match = CANONICAL_STAGES.find((s) => s.id.toLowerCase() === stageId.toLowerCase() || s.key === stageId.toLowerCase());
  if (!match) return stageId;
  return match.labels[lang] || match.labels.en;
};

// Backwards-compatible static exports
export const CROP_OPTIONS: SelectOption[] = getCropOptions('en');
export const CULTIVATION_STAGES: SelectOption[] = getStageOptions('en');
