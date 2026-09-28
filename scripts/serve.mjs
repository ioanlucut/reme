// Builds the app and serves dist/ on http://localhost:3000, rebuilding when
// anything under src/ changes. Unknown paths fall back to index.html, as the
// app uses HTML5 routing.
//
// Usage: node scripts/serve.mjs [--port 3000]

import { watch } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { createServer } from 'node:http';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';
import { build } from './build.mjs';

const root = join(fileURLToPath(new URL('..', import.meta.url)));
const dist = join(root, 'dist');
const portIndex = process.argv.indexOf('--port');
const port = Number(portIndex > -1 ? process.argv[portIndex + 1] : process.env.PORT || 3000);

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.ttf': 'font/ttf',
  '.eot': 'application/vnd.ms-fontobject',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.ogv': 'video/ogg',
  '.zip': 'application/zip',
};

let building = build();
await building;

let timer;
watch(join(root, 'src'), { recursive: true }, () => {
  clearTimeout(timer);
  timer = setTimeout(() => {
    building = build()
      .then(() => console.log('Rebuilt dist/'))
      .catch((error) => console.error(error.message));
  }, 100);
});

createServer(async (request, response) => {
  await building.catch(() => {});
  const path = normalize(decodeURIComponent(new URL(request.url, 'http://localhost').pathname));
  const file = join(dist, path);
  const isAsset = file.startsWith(dist) && extname(file) !== '';

  try {
    const body = await readFile(isAsset ? file : join(dist, 'index.html'));
    response.writeHead(200, { 'Content-Type': TYPES[isAsset ? extname(file) : '.html'] || 'application/octet-stream' });
    response.end(body);
  } catch {
    response.writeHead(404, { 'Content-Type': 'text/plain' });
    response.end('Not found');
  }
}).listen(port, () => console.log(`Reme is running on http://localhost:${port}`));
