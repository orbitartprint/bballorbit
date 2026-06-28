import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Routes to pre-render
const routes = [
  '/',
  '/drills',
  '/resources',
  '/free-resources',
  '/about',
  '/blog',
  '/contact',
  '/privacy',
  '/legal',
  '/terms',
  '/affiliate',
  '/drills/1v1-kick-out-shooting',
  '/blog/transition-offense',
  '/blog/zoom-action',
];

// Read the base index.html
const distPath = join(__dirname, '..', 'dist');
const indexHtmlPath = join(distPath, 'index.html');
const baseHtml = readFileSync(indexHtmlPath, 'utf-8');

console.log('🚀 Starting pre-rendering...');

// Generate HTML for each route
routes.forEach(route => {
  const routePath = route === '/' ? '/index.html' : `${route}/index.html`;
  const fullPath = join(distPath, routePath);
  
  // Create directory if it doesn't exist
  const dir = dirname(fullPath);
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
  
  // Write the HTML file
  writeFileSync(fullPath, baseHtml, 'utf-8');
  console.log(`✅ Generated: ${routePath}`);
});

console.log('✨ Pre-rendering complete!');
