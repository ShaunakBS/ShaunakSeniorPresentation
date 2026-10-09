// Exports all 12 slides to a 16:9 PDF (1920x1080 pages) from the /#/print view. No speaker notes are included.
// Usage: npm run build && npm run export-pdf     -> exports/Shaunak_Senior_Presentation.pdf
import { chromium } from 'playwright-core';
import { PDFDocument } from 'pdf-lib';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { startServer } from './serve.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
if (!fs.existsSync(path.join(dist, 'index.html'))) {
  console.error('Run "npm run build" first.');
  process.exit(1);
}
const outDir = path.join(root, 'exports');
fs.mkdirSync(outDir, { recursive: true });
const out = path.join(outDir, 'Shaunak_Senior_Presentation.pdf');

const server = await startServer(dist, 4199);
// Microsoft Edge ships with Windows; Chrome works too (set PDF_BROWSER=chrome).
const browser = await chromium.launch({ channel: process.env.PDF_BROWSER || 'msedge' });
try {
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  await page.goto('http://127.0.0.1:4199/#/print', { waitUntil: 'networkidle' });
  await page.waitForSelector('.print-root[data-ready="true"]');
  await page.evaluate(() => document.fonts.ready);
  await page.waitForFunction(() => [...document.images].every((i) => i.complete && i.naturalWidth > 0));
  await page.waitForTimeout(500);
  await page.emulateMedia({ media: 'print' });
  await page.pdf({ path: out, width: '1920px', height: '1080px', printBackground: true, preferCSSPageSize: true, margin: { top: 0, right: 0, bottom: 0, left: 0 } });
} finally {
  await browser.close();
  server.close();
}
const doc = await PDFDocument.load(fs.readFileSync(out));
console.log(`Wrote ${out}\nPages: ${doc.getPageCount()} (expected 12)`);
if (doc.getPageCount() !== 12) process.exit(2);
