// Generates REHEARSAL.md (speaker notes + timing) from src/data/speakerNotes.ts. Run: npm run rehearsal
import { build } from 'esbuild';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const tmp = path.join(os.tmpdir(), `rehearsal-${Date.now()}.mjs`);
await build({
  stdin: {
    contents: `export { speakerNotes } from './src/data/speakerNotes.ts'; export { slideMeta } from './src/data/presentation.ts';`,
    resolveDir: root, loader: 'ts',
  },
  bundle: true, format: 'esm', outfile: tmp, logLevel: 'error',
});
const { speakerNotes, slideMeta } = await import(pathToFileURL(tmp).href);
fs.unlinkSync(tmp);

const fmt = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
let total = 0, words = 0, run = 0;
let md = `# Rehearsal Script\n\nPrivate. Do not publish. Target runtime 8:30 (rubric full credit: 8:00-10:00).\nLines marked **[CONFIRM]** are placeholders only you can fill in. Do not present them as written.\n\n`;
md += `| # | Slide | Target | Running |\n|---|-------|--------|---------|\n`;
speakerNotes.forEach((n, i) => { total += n.seconds; md += `| ${i + 1} | ${slideMeta[i].label} | ${fmt(n.seconds)} | ${fmt(total)} |\n`; });
md += `\nTotal target: **${fmt(total)}**\n\n---\n\n`;
speakerNotes.forEach((n, i) => {
  md += `## ${i + 1}. ${slideMeta[i].label} (${fmt(n.seconds)}, starts at ${fmt(run)})\n\n`;
  run += n.seconds;
  for (const p of n.paragraphs) {
    words += p.replace(/\[CONFIRM[^\]]*\]/g, '').split(/\s+/).filter(Boolean).length;
    md += `${p.replace(/\[CONFIRM/g, '**[CONFIRM').replace(/\]/g, ']**')}\n\n`;
  }
  if (n.reference) md += `> Reference (do not read aloud):\n${n.reference.map((r) => `> - ${r}`).join('\n')}\n\n`;
  if (n.confirm) md += `> Needs your review: ${n.confirm.join('; ')}\n\n`;
});
md += `---\n\nSpoken words in script (excluding placeholders): about ${words}. At 150 words per minute that is about ${(words / 150).toFixed(1)} minutes before you add your own details. Time yourself out loud at least twice.\n`;
fs.writeFileSync(path.join(root, 'REHEARSAL.md'), md);
console.log(`REHEARSAL.md written. ~${words} words.`);
