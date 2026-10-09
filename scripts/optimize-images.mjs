// Creates web-optimized copies of the pictures in Photos/ inside src/assets/images/.
// Originals in Photos/ are never modified or renamed. Run after adding or replacing a picture:  npm run optimize-images
//
//  - Photos are resized (long side <= 1200 px) and saved as high-quality JPEG.
//  - Logos and seals keep their exact colors. Oversized ones are scaled down; blank (transparent or white) margins are
//    trimmed so the logo fills its frame. Nothing inside the artwork is cropped, recolored, or stretched.
//  - Files are named for the slide they are used on (see the table in src/assets/images/README.md).
import { createCanvas, loadImage } from '@napi-rs/canvas';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const src = path.join(root, 'Photos');
const out = path.join(root, 'src', 'assets', 'images');
fs.mkdirSync(out, { recursive: true });

// kind: 'photo' (resize + JPEG), 'logo' (resize, trim blank margin, PNG), 'copy' (byte-for-byte), 'diagram' (resize + WebP)
const jobs = [
  { from: 'Shaunak Head Shot.jpeg', to: 'title-portrait.jpg', kind: 'photo', max: 1600 },
  { from: 'About me Images/Shaunak Personal Photo.jpeg', to: 'about-personal.jpg', kind: 'photo', max: 1200 },
  { from: 'About me Images/Family.jpeg', to: 'about-family.jpg', kind: 'photo', max: 1200 },
  { from: 'About me Images/Friends.jpeg', to: 'about-friends.jpg', kind: 'photo', max: 1200 },
  { from: 'About me Images/TSA.jpeg', to: 'about-tsa.jpg', kind: 'photo', max: 1200 },
  { from: 'Experiences/SAPT Image.png', to: 'titration-system.webp', kind: 'diagram', max: 1200 },
  { from: 'Experiences/Boyertown ASD logo.png', to: 'boyertown-asd-logo.png', kind: 'copy' },
  { from: 'Experiences/TechOwl Logo.png', to: 'techowl-logo.png', kind: 'logo', max: 600, trim: 'white' },
  { from: 'Smart Futures Skills.png', to: 'smart-futures-skills.png', kind: 'copy' },
  { from: 'EverFi Certificate.png', to: 'everfi-certificate.png', kind: 'copy' },
  { from: 'InfoVision Logo.jpg', to: 'infovision-logo.png', kind: 'logo', max: 900, trim: 'white' },
  { from: 'silvias.jpg', to: 'silvias-gymnastics-logo.jpg', kind: 'copy' },
  { from: 'school seals/U of T seal.jpg', to: 'seal-toronto.jpg', kind: 'copy' },
  { from: 'school seals/Large_university-of-texas_seal_rgb(199-91-18).png', to: 'seal-ut-austin.png', kind: 'copy' },
  { from: 'school seals/IUSG-seal.png', to: 'seal-indiana.png', kind: 'logo', max: 900, trim: 'alpha' },
  { from: 'school seals/Penn-State-University-Seal-Logo.png', to: 'seal-penn-state.png', kind: 'logo', max: 900, trim: 'alpha' },
  { from: 'school seals/university-of-miami-seal-logo.png', to: 'seal-miami.png', kind: 'copy' },
];

function bbox(ctx, w, h, mode) {
  const d = ctx.getImageData(0, 0, w, h).data;
  let x0 = w, y0 = h, x1 = -1, y1 = -1;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = (y * w + x) * 4;
      const a = d[i + 3];
      const ink = mode === 'alpha' ? a > 12 : a > 12 && (d[i] < 238 || d[i + 1] < 238 || d[i + 2] < 238);
      if (ink) { if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y; }
    }
  }
  return x1 < 0 ? { x: 0, y: 0, w, h } : { x: x0, y: y0, w: x1 - x0 + 1, h: y1 - y0 + 1 };
}

const kb = (n) => `${(n / 1024).toFixed(0)} KB`;
let missing = 0;
for (const j of jobs) {
  const from = path.join(src, j.from);
  const to = path.join(out, j.to);
  if (!fs.existsSync(from)) { console.log(`MISSING  ${j.from}`); missing++; continue; }
  if (j.kind === 'copy') { fs.copyFileSync(from, to); console.log(`copy     ${j.from} -> ${j.to} (${kb(fs.statSync(to).size)})`); continue; }

  const img = await loadImage(from);
  let scale = Math.min(1, j.max / Math.max(img.width, img.height));
  let w = Math.round(img.width * scale), h = Math.round(img.height * scale);
  let c = createCanvas(w, h);
  let ctx = c.getContext('2d');
  ctx.imageSmoothingQuality = 'high';
  ctx.drawImage(img, 0, 0, w, h);

  if (j.kind === 'logo' && j.trim) {
    const b = bbox(ctx, w, h, j.trim);
    const pad = Math.round(Math.max(b.w, b.h) * 0.03);
    const x = Math.max(0, b.x - pad), y = Math.max(0, b.y - pad);
    const tw = Math.min(w - x, b.w + pad * 2), th = Math.min(h - y, b.h + pad * 2);
    const c2 = createCanvas(tw, th);
    c2.getContext('2d').drawImage(c, x, y, tw, th, 0, 0, tw, th);
    c = c2; w = tw; h = th;
  }
  const buf = j.kind === 'photo' ? c.toBuffer('image/jpeg', 86) : j.kind === 'diagram' ? c.toBuffer('image/webp', 92) : c.toBuffer('image/png');
  fs.writeFileSync(to, buf);
  console.log(`${j.kind.padEnd(8)} ${j.from} (${img.width}x${img.height}) -> ${j.to} (${w}x${h}, ${kb(buf.length)})`);
}
if (missing) { console.log(`\n${missing} source file(s) missing.`); process.exitCode = 1; }
