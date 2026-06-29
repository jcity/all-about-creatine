#!/usr/bin/env node
/**
 * QA Gate for AllAboutCreatine content pipeline.
 * Usage: node scripts/qa-check.mjs <path/to/content.mdx>
 * Exit 0 = pass, exit 1 = fail.
 */

import fs from 'fs';
import path from 'path';

const FILE = process.argv[2];
if (!FILE) {
  console.error('Usage: node scripts/qa-check.mjs <content.mdx>');
  process.exit(1);
}

const fullPath = path.resolve(process.cwd(), FILE);
if (!fs.existsSync(fullPath)) {
  console.error(`File not found: ${fullPath}`);
  process.exit(1);
}

const content = fs.readFileSync(fullPath, 'utf-8');
const results = {
  schemaValid: false,
  priceFormatOk: false,
  urlsPresent: false,
  urlsReachable: true,
  noDraftFlag: true,
  internalConsistency: true,
};

// 1. Extract frontmatter (rough parse — Velite does full validation at build)
const fmMatch = content.match(/^---\n([\s\S]*?)\n---/);
const fm = fmMatch ? fmMatch[1] : '';

const titleMatch = fm.match(/title:\s*(.+)/);
const priceMatch = fm.match(/price:\s*(.+)/) || fm.match(/products?:/);
const draftMatch = fm.match(/draft:\s*(true|false)/);
const urlMatches = [...content.matchAll(/https?:\/\/[^\s)]+/g)].map(m => m[0]);

results.schemaValid = !!(titleMatch && priceMatch);
if (titleMatch) console.log(`  [frontmatter] title: ${titleMatch[1].trim()}`);
if (priceMatch) console.log(`  [frontmatter] price: ${priceMatch[1].trim()}`);

// 2. Price format check (should contain $ or "per serving" or "under")
if (priceMatch) {
  const priceVal = priceMatch[1].trim();
  results.priceFormatOk = /\$|per serving|under/i.test(priceVal);
  console.log(`  [price] format OK: ${results.priceFormatOk}`);
}

// 3. URL presence
results.urlsPresent = urlMatches.length > 0;
console.log(`  [urls] found ${urlMatches.length} URLs`);

// 4. No draft flag blocking publish
if (draftMatch) {
  results.noDraftFlag = draftMatch[1].trim() !== 'true';
}
console.log(`  [draft] publishable: ${results.noDraftFlag}`);

// 5. Internal consistency — check for obvious contradictions
const contradictions = [
  { bad: /creatine is dangerous/i, good: /creatine is safe/i },
  { bad: /creatine causes kidney damage/i, good: /no evidence.*kidney/i },
];
for (const c of contradictions) {
  if (c.bad.test(content) && !c.good.test(content)) {
    results.internalConsistency = false;
    console.log(`  [consistency] WARNING: possible unsupported claim`);
    break;
  }
}

// 6. Brand whitelist check
const knownBrands = [
  'Thorne', 'Optimum Nutrition', 'Transparent Labs', 'Nutricost',
  'CON-CRET', 'Creapure', 'MuscleTech', 'Dymatize', 'BPI Sports',
  'Klean Athlete', 'Monohydrate', 'HCl', 'HMB',
];
const mentionedBrands = knownBrands.filter(b => new RegExp(b, 'i').test(content));
console.log(`  [brands] mentioned: ${mentionedBrands.join(', ') || 'none'}`);

// Score
const score =
  (results.schemaValid ? 0.25 : 0) +
  (results.priceFormatOk ? 0.15 : 0) +
  (results.urlsPresent ? 0.2 : 0) +
  (results.noDraftFlag ? 0.2 : 0) +
  (results.internalConsistency ? 0.2 : 0);

console.log(`\nQA Score: ${(score * 100).toFixed(0)}%`);
if (score >= 0.85) {
  console.log('✅ PASS — ready to publish');
  process.exit(0);
} else if (score >= 0.7) {
  console.log('⚠️  REVIEW — flag for human eyes');
  process.exit(0); // still publishable but flagged
} else {
  console.log('❌ HOLD — fix before publish');
  process.exit(1);
}
