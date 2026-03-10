const fs = require('fs');
const path = require('path');

const buildDir = './build';
const indexPath = path.join(buildDir, 'index.html');

// Read the built index.html
let html = fs.readFileSync(indexPath, 'utf8');

// Extract the inline script
const scriptMatch = html.match(/<script>([\s\S]*?)<\/script>/);
if (!scriptMatch) {
  console.log('No inline script found - already externalized or no script tag');
  process.exit(0);
}

const inlineScript = scriptMatch[1];

// Create external script file
const scriptFileName = 'app-loader.js';
const scriptPath = path.join(buildDir, scriptFileName);

// Wrap in an IIFE to avoid polluting global scope
fs.writeFileSync(scriptPath, `(function() {\n${inlineScript}\n})();`);

// Replace inline script with external script reference
// Note: We need to use type="module" for ES module imports
const newHtml = html.replace(
  /<script>[\s\S]*?<\/script>/,
  `<script type="module" src="${scriptFileName}"></script>`
);

// Write modified HTML
fs.writeFileSync(indexPath, newHtml);

console.log(`✅ Externalized inline script to ${scriptFileName}`);
console.log(`✅ Updated index.html to reference external script`);
