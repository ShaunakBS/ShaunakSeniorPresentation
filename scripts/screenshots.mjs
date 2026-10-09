// Takes a screenshot of every slide at a given viewport (default 1920x1080) and reports overflow problems.
// Usage: node scripts/screenshots.mjs [baseUrl] [width] [height] [outDir]
import { chromium } from 'playwright-core';
import fs from 'node:fs';

const base = process.argv[2] || 'http://127.0.0.1:4173/';
const w = +(process.argv[3] || 1920), h = +(process.argv[4] || 1080);
const out = process.argv[5] || `screenshots/${w}x${h}`;
fs.mkdirSync(out, { recursive: true });
const browser = await chromium.launch({ channel: 'msedge' });
const page = await browser.newPage({ viewport: { width: w, height: h } });
const errors = [];
page.on('console', (m) => { if (['error', 'warning'].includes(m.type())) errors.push(m.type() + ': ' + m.text()); });
page.on('pageerror', (e) => errors.push('pageerror: ' + e.message));
page.on('requestfailed', (r) => errors.push('requestfailed: ' + r.url()));
page.on('response', (r) => { if (r.status() >= 400) errors.push(r.status() + ' ' + r.url()); });
for (let i = 1; i <= 12; i++) {
  await page.goto(`${base}#/slide/${i}`);
  await page.reload();
  await page.waitForTimeout(2300); // intro + animations
  await page.mouse.move(5, 5);
  // Overflow check inside the 1920x1080 stage: any element extending beyond its slide section or the stage
  const problems = await page.evaluate(() => {
    const stage = document.querySelector('.stage');
    const sr = stage.getBoundingClientRect();
    const bad = [];
    stage.querySelectorAll('*').forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.width === 0) return;
      if (r.right > sr.right + 2 || r.bottom > sr.bottom + 2 || r.left < sr.left - 2) bad.push(el.tagName + ' ' + (el.textContent || '').slice(0, 40));
      if (el.scrollHeight > el.clientHeight + 2 && getComputedStyle(el).overflow !== 'visible' && el.clientHeight > 0) bad.push('CLIPPED ' + el.tagName + ' ' + (el.textContent || '').slice(0, 40));
    });
    return bad.slice(0, 6);
  });
  await page.screenshot({ path: `${out}/slide-${String(i).padStart(2, '0')}.png` });
  console.log(i, problems.length ? 'PROBLEMS ' + JSON.stringify(problems) : 'ok');
}
console.log('console/network issues:', errors.length ? errors : 'none');
await browser.close();
