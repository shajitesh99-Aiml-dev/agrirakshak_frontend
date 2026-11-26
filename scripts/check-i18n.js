/**
 * Agri Rakshak - i18n Translation Key Completeness Checker
 * Verifies 100% key parity between English and regional languages (Telugu, Hindi, Kannada)
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const localesDir = path.resolve(__dirname, '../src/i18n/locales');

function extractKeysFromTsFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  // Simple AST-free key extractor for typed TS object literals
  const keys = new Set();
  const stack = [];
  const lines = content.split('\n');

  for (let line of lines) {
    line = line.trim();
    if (!line || line.startsWith('//') || line.startsWith('/*') || line.startsWith('*')) continue;

    // Detect opening of nested object: key: {
    const openMatch = line.match(/^([a-zA-Z0-9_]+)\s*:\s*\{/);
    if (openMatch) {
      stack.push(openMatch[1]);
      continue;
    }

    // Detect closing of object: }, or }
    if (line.startsWith('}') || line.startsWith('};')) {
      if (stack.length > 0) {
        stack.pop();
      }
      continue;
    }

    // Detect key-value: key: 'value' or key: "value"
    const kvMatch = line.match(/^([a-zA-Z0-9_'"]+)\s*:\s*(['"`])/);
    if (kvMatch) {
      const cleanKey = kvMatch[1].replace(/['"]/g, '');
      const fullKey = [...stack, cleanKey].join('.');
      keys.add(fullKey);
    }
  }

  return Array.from(keys);
}

const languages = [
  { code: 'en', name: 'English' },
  { code: 'te', name: 'Telugu (తెలుగు)' },
  { code: 'hi', name: 'Hindi (हिन्दी)' },
  { code: 'kn', name: 'Kannada (ಕನ್ನಡ)' },
];

console.log('\n======================================================');
console.log('🌾 Agri Rakshak - i18n Translation Completeness Check');
console.log('======================================================\n');

const enFile = path.join(localesDir, 'en/common.ts');
const enKeys = extractKeysFromTsFile(enFile);
console.log(`Base reference language: English (${enKeys.length} keys)\n`);

let totalErrors = 0;

for (const lang of languages) {
  if (lang.code === 'en') {
    console.log(`[PASS] ${lang.name}: 100.0% completeness (${enKeys.length}/${enKeys.length} keys)`);
    continue;
  }

  const langFile = path.join(localesDir, `${lang.code}/common.ts`);
  if (!fs.existsSync(langFile)) {
    console.error(`[FAIL] ${lang.name}: Missing locale file at ${langFile}`);
    totalErrors++;
    continue;
  }

  const langKeys = new Set(extractKeysFromTsFile(langFile));
  const missing = enKeys.filter(k => !langKeys.has(k));
  const completeness = ((enKeys.length - missing.length) / enKeys.length) * 100;

  if (missing.length === 0) {
    console.log(`[PASS] ${lang.name}: 100.0% completeness (${langKeys.size}/${enKeys.length} keys)`);
  } else {
    console.error(`[FAIL] ${lang.name}: ${completeness.toFixed(1)}% completeness (${missing.length} missing keys)`);
    console.error(`       First missing keys: ${missing.slice(0, 5).join(', ')}${missing.length > 5 ? '...' : ''}`);
    totalErrors += missing.length;
  }
}

console.log('\n======================================================');
if (totalErrors === 0) {
  console.log('SUCCESS: All 4 locales (English, Telugu, Hindi, Kannada) have 100% key parity!\n');
  process.exit(0);
} else {
  console.error(`FAILURE: Found ${totalErrors} missing translation keys across regional locales.\n`);
  process.exit(1);
}
