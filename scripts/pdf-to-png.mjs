// Renders selected PDF pages to PNG for visual inspection. Usage: node scripts/pdf-to-png.mjs file.pdf outDir 1 2 3
import { createCanvas } from '@napi-rs/canvas';
import { getDocument } from 'pdfjs-dist/legacy/build/pdf.mjs';
import fs from 'node:fs';
const [file, outDir, ...pages] = process.argv.slice(2);
fs.mkdirSync(outDir, { recursive: true });
const pdf = await getDocument({ data: new Uint8Array(fs.readFileSync(file)), useSystemFonts: true, standardFontDataUrl: new URL('../node_modules/pdfjs-dist/standard_fonts/', import.meta.url).href }).promise;
console.log('pages', pdf.numPages);
for (const n of pages.map(Number)) {
  const page = await pdf.getPage(n);
  const vp = page.getViewport({ scale: 1 });
  console.log('page', n, vp.width, 'x', vp.height);
  const canvas = createCanvas(vp.width, vp.height);
  await page.render({ canvasContext: canvas.getContext('2d'), viewport: vp, canvas }).promise;
  fs.writeFileSync(`${outDir}/p${n}.png`, canvas.toBuffer('image/png'));
}
