// Lists every image in Photos/ with format, pixel size and file size. Usage: node scripts/image-info.mjs
import { loadImage } from '@napi-rs/canvas';
import fs from 'node:fs';
import path from 'node:path';
const root = path.resolve('Photos');
const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]));
for (const f of walk(root).sort()) {
  try {
    const img = await loadImage(f);
    console.log(`${path.relative(root, f).padEnd(62)} ${String(img.width).padStart(5)}x${String(img.height).padEnd(5)} ${(fs.statSync(f).size / 1024).toFixed(0).padStart(6)} KB`);
  } catch (e) { console.log(path.relative(root, f), 'ERR', e.message); }
}
