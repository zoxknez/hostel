const fs = require('fs');
const path = require('path');

const messagesDir = path.join(__dirname, 'messages');
const langs = ['en', 'sr', 'ru', 'de'];

const dicts = {};
langs.forEach(lang => {
  dicts[lang] = JSON.parse(fs.readFileSync(path.join(messagesDir, `${lang}.json`), 'utf8'));
});

// Helper to get all keys flattened
function getKeys(obj, prefix = '') {
  let keys = [];
  for (const k in obj) {
    if (typeof obj[k] === 'object' && obj[k] !== null) {
      keys = keys.concat(getKeys(obj[k], `${prefix}${k}.`));
    } else {
      keys.push(`${prefix}${k}`);
    }
  }
  return keys;
}

const baseKeys = getKeys(dicts['en']);
let hasError = false;

langs.forEach(lang => {
  if (lang === 'en') return;
  const langKeys = getKeys(dicts[lang]);
  
  const missing = baseKeys.filter(k => !langKeys.includes(k));
  const extra = langKeys.filter(k => !baseKeys.includes(k));
  
  if (missing.length > 0) {
    console.error(`[${lang}] Missing keys:`, missing);
    hasError = true;
  }
  if (extra.length > 0) {
    console.error(`[${lang}] Extra keys:`, extra);
    hasError = true;
  }
});

if (!hasError) {
  console.log("All languages have perfectly symmetric keys.");
}
