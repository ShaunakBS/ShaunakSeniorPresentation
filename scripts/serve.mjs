// Tiny dependency-free static server for the built site (dist/). Works fully offline.
// Usage: node scripts/serve.mjs [port]   (default 4173)
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const types = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2', '.woff': 'font/woff', '.json': 'application/json', '.pdf': 'application/pdf', '.ico': 'image/x-icon',
};

export function startServer(dir = path.join(root, 'dist'), port = 4173) {
  const server = http.createServer((req, res) => {
    const urlPath = decodeURIComponent((req.url || '/').split('?')[0]);
    let file = path.join(dir, urlPath);
    if (!file.startsWith(dir)) { res.writeHead(403).end(); return; }
    if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, 'index.html');
    if (!fs.existsSync(file)) { res.writeHead(404).end('Not found'); return; }
    res.writeHead(200, { 'Content-Type': types[path.extname(file).toLowerCase()] || 'application/octet-stream' });
    fs.createReadStream(file).pipe(res);
  });
  return new Promise((resolve, reject) => {
    server.on('error', reject);
    server.listen(port, '127.0.0.1', () => resolve(server));
  });
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const dir = path.join(root, 'dist');
  if (!fs.existsSync(path.join(dir, 'index.html'))) {
    console.error('dist/ not found. Run "npm run build" once first (needs internet only for the initial npm install).');
    process.exit(1);
  }
  const port = Number(process.argv[2] || 4173);
  await startServer(dir, port);
  console.log(`Presentation running at http://127.0.0.1:${port}/  (press Ctrl+C to stop)`);
}
