#!/usr/bin/env node

/**
 * Adds missing Pricing.enterprise keys to all non-English locale files.
 * Falls back to English values since proper translations require a translator.
 */

const fs = require('fs');
const path = require('path');

const messagesDir = path.join(__dirname, '..', 'src', 'messages');

const enterpriseBlock = {
  badge: "Larger Needs",
  title: "Agency, Business & Enterprise",
  subtitle: "Need a larger scale and exclusive offers from us?",
  button: "Contact Us"
};

const files = fs.readdirSync(messagesDir).filter(f => f.endsWith('.json') && f !== 'en.json');

for (const file of files) {
  const filePath = path.join(messagesDir, file);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  if (!data.Pricing) {
    console.log(`⚠️  Skipping ${file} — no Pricing key`);
    continue;
  }

  let changed = false;

  if (!data.Pricing.enterprise) {
    data.Pricing.enterprise = { ...enterpriseBlock };
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 4) + '\n');
    console.log(`✅ Patched ${file}`);
  } else {
    console.log(`✓  ${file} already has enterprise keys`);
  }
}

console.log('\nDone.');
