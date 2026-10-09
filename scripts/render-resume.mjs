// Renders the original resume PDF to a high-resolution PNG for the website (no PDF viewer needed at runtime).
// The image is an unmodified render of the PDF: no masking, blur, or redaction.
import { createCanvas } from '@napi-rs/canvas';
import { getDocument } from 'pdfjs-dist/legacy/build/pdf.mjs';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const src = path.join(root, 'Reference Materials', 'Shaunak_Senior_Presentation_Resume_Updated.pdf');
const out = path.join(root, 'public', 'resume', 'resume.png');
const data = new Uint8Array(fs.readFileSync(src));
const pdf = await getDocument({ data, useSystemFonts: true, standardFontDataUrl: new URL('../node_modules/pdfjs-dist/standard_fonts/', import.meta.url).href }).promise;
const page = await pdf.getPage(1);
const viewport = page.getViewport({ scale: 3 });
const canvas = createCanvas(viewport.width, viewport.height);
await page.render({ canvasContext: canvas.getContext('2d'), viewport, canvas }).promise;
fs.writeFileSync(out, canvas.toBuffer('image/png'));
console.log('pages:', pdf.numPages, 'size', viewport.width, 'x', viewport.height, '->', out);
