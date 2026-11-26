import { SupportedLanguage } from '../../../i18n';

export interface SymptomOption {
  id: string; // Canonical symptom ID sent to API backend
  label: string;
  hindiLabel?: string;
  description?: string;
  icon?: string;
}

export interface CanonicalSymptom {
  id: string;
  key: string;
  labels: {
    en: string;
    te: string;
    hi: string;
    kn: string;
  };
  descriptions: {
    en: string;
    te: string;
    hi: string;
    kn: string;
  };
}

export const CANONICAL_SYMPTOMS: CanonicalSymptom[] = [
  {
    id: 'yellow_leaves',
    key: 'yellow_leaves',
    labels: {
      en: 'Yellow Leaves (Chlorosis)',
      te: 'పసుపు రంగు ఆకులు (క్లోరోసిస్)',
      hi: 'पत्तियों का पीला पड़ना (क्लोरोसिस)',
      kn: 'ಹಳದಿ ಎಲೆಗಳು (ಕ್ಲೋರೋಸಿಸ್)',
    },
    descriptions: {
      en: 'Yellowing of entire leaf blade or between veins',
      te: 'ఆకు మొత్తం లేదా ఈనెల మధ్య పసుపు రంగులోకి మారడం',
      hi: 'पूरी पत्ती या नसों के बीच का हिस्सा पीला पड़ना',
      kn: 'ಸಂಪೂರ್ಣ ಎಲೆ ಅಥವಾ ನರಗಳ ನಡುವೆ ಹಳದಿ ಬಣ್ಣಕ್ಕೆ ತಿರುಗುವುದು',
    },
  },
  {
    id: 'brown_spots',
    key: 'brown_spots',
    labels: {
      en: 'Brown or Black Spots',
      te: 'గోధుమ లేదా నల్లటి మచ్చలు',
      hi: 'भूरे या काले धब्बे',
      kn: 'ಕಂದು ಅಥವಾ ಕಪ್ಪು ಕಲೆಗಳು',
    },
    descriptions: {
      en: 'Concentric rings or dead necrotic lesions on leaves',
      te: 'ఆకులపై వలయాకారపు లేదా ఎండిపోయిన మచ్చలు',
      hi: 'पत्तियों पर संकेंद्री छल्ले या सूखे मृत धब्बे',
      kn: 'ಎಲೆಗಳ ಮೇಲೆ ವೃತ್ತಾಕಾರದ ಅಥವಾ ಒಣಗಿದ ಕಲೆಗಳು',
    },
  },
  {
    id: 'white_patches',
    key: 'white_patches',
    labels: {
      en: 'White Powdery Patches',
      te: 'తెల్లటి బూజు మచ్చలు',
      hi: 'सफेद पाउडर जैसे धब्बे',
      kn: 'ಬಿಳಿ ಬೂದಿ ಕಲೆಗಳು',
    },
    descriptions: {
      en: 'Fungus-like white or grey coating on surface',
      te: 'ఆకు ఉపరితలంపై బూజు వంటి తెల్లటి పొర',
      hi: 'पत्ती की सतह पर फफूंद जैसी सफेद या धूसर परत',
      kn: 'ಎಲೆಯ ಮೇಲ್ಮೈಯಲ್ಲಿ ಶಿಲೀಂಧ್ರದಂತಹ ಬಿಳಿ ಅಥವಾ ಬೂದು ಲೇಪನ',
    },
  },
  {
    id: 'wilting',
    key: 'wilting',
    labels: {
      en: 'Wilting / Drooping',
      te: 'మొక్కలు వాడిపోవడం / వాలిపోవడం',
      hi: 'पौधों का मुरझाना / झुकना',
      kn: 'ಗಿಡಗಳು ಬಾಡುವುದು / ಕುಗ್ಗುವುದು',
    },
    descriptions: {
      en: 'Plants losing turgor despite adequate soil moisture',
      te: 'నేలలో తేమ ఉన్నప్పటికీ మొక్కలు వాలిపోవడం',
      hi: 'मिट्टी में पर्याप्त नमी के बावजूद पौधों का मुरझा जाना',
      kn: 'ಮಣ್ಣಿನಲ್ಲಿ ತೇವಾಂಶವಿದ್ದರೂ ಗಿಡಗಳು ಬಾಡಿಹೋಗುವುದು',
    },
  },
  {
    id: 'curling_leaves',
    key: 'curling_leaves',
    labels: {
      en: 'Leaf Curling / Crinkling',
      te: 'ఆకు ముడుత',
      hi: 'पत्तियों का मुड़ना',
      kn: 'ಎಲೆ ಸುರುಟಿಕೊಳ್ಳುವುದು',
    },
    descriptions: {
      en: 'Upward or downward inward curling of new shoots',
      te: 'కొత్త చిగుర్లు పైకి లేదా కిందికి ముడుచుకుపోవడం',
      hi: 'नई कोपलों का ऊपर या नीचे की ओर मुड़ना',
      kn: 'ಹೊಸ ಚಿಗುರುಗಳು ಮೇಲಕ್ಕೆ ಅಥವಾ ಕೆಳಕ್ಕೆ ಸುರುಟಿಕೊಳ್ಳುವುದು',
    },
  },
  {
    id: 'holes_in_leaves',
    key: 'holes_in_leaves',
    labels: {
      en: 'Holes / Chewed Margins',
      te: 'రంధ్రాలు / కొరికిన ఆకులు',
      hi: 'पत्तियों में छेद / कटी पत्तियाँ',
      kn: 'ಎಲೆಗಳಲ್ಲಿ ರಂಧ್ರಗಳು / ಕಚ್ಚಿದ ಎಲೆಗಳು',
    },
    descriptions: {
      en: 'Visible feeding damage or skeletonized foliage',
      te: 'కీటకాలు తినడం వల్ల ఆకులు చిల్లులు పడటం',
      hi: 'कीटों द्वारा खाने के स्पष्ट निशान या जालीदार पत्तियाँ',
      kn: 'ಕೀಟಗಳು ತಿಂದಿರುವುದರಿಂದ ಉಂಟಾದ ರಂಧ್ರಗಳು',
    },
  },
  {
    id: 'insects_visible',
    key: 'insects_visible',
    labels: {
      en: 'Insects or Larvae Visible',
      te: 'పురుగులు లేదా లార్వాలు కనిపించడం',
      hi: 'कीट या इल्लियाँ दिखाई देना',
      kn: 'ಕೀಟಗಳು ಅಥವಾ ಮರಿಹುಳುಗಳು ಕಾಣಿಸುವುದು',
    },
    descriptions: {
      en: 'Caterpillars, aphids, whiteflies, or egg clusters observed',
      te: 'గొంగళి పురుగులు, తెల్లదోమలు లేదా గుడ్ల గుత్తులు గమనించడం',
      hi: 'पत्तियों पर कैटरपिलर, एफिड्स, सफेद मक्खियाँ या अंडे दिखना',
      kn: 'ಕಂಬಳಿಹುಳುಗಳು, ಬಿಳಿನೊಣಗಳು ಅಥವಾ ಮೊಟ್ಟೆಗಳ ಗುಂಪುಗಳು ಕಾಣಿಸುವುದು',
    },
  },
  {
    id: 'fruit_damage',
    key: 'fruit_damage',
    labels: {
      en: 'Fruit / Pod Rot or Borer Holes',
      te: 'కాయ కుళ్లు లేదా రంధ్రాలు',
      hi: 'फल या फली में सड़न या छेद',
      kn: 'ಹಣ್ಣು / ಕಾಯಿ ಕೊಳೆತ ಅಥವಾ ರಂಧ್ರಗಳು',
    },
    descriptions: {
      en: 'Entry holes, internal rot, or premature fruit drop',
      te: 'కాయలలో తొలుచు పురుగులు, లోపలి కుళ్లు లేదా కాయలు రాలిపోవడం',
      hi: 'फलों में छेद, भीतरी सड़न या समय से पहले फलों का गिरना',
      kn: 'ಕಾಯಿ ಕೊರೆಯುವ ಹುಳುಗಳು, ಒಳಗಿನ ಕೊಳೆತ ಅಥವಾ ಕಾಯಿ ಉದುರುವುದು',
    },
  },
];

export const getLocalizedSymptoms = (lang: SupportedLanguage = 'en'): SymptomOption[] => {
  return CANONICAL_SYMPTOMS.map((s) => ({
    id: s.id,
    label: lang === 'en' ? s.labels.en : `${s.labels[lang]} (${s.labels.en})`,
    hindiLabel: s.labels.hi,
    description: s.descriptions[lang] || s.descriptions.en,
  }));
};

export const getLocalizedSymptomLabel = (symptomId: string, lang: SupportedLanguage = 'en'): string => {
  const match = CANONICAL_SYMPTOMS.find((s) => s.id === symptomId || s.key === symptomId);
  if (!match) return symptomId;
  return lang === 'en' ? match.labels.en : `${match.labels[lang]} (${match.labels.en})`;
};

// Backwards-compatible static export
export const SYMPTOM_OPTIONS: SymptomOption[] = getLocalizedSymptoms('en');
