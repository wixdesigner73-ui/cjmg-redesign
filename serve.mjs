// Tiny static server for the prototype:  node serve.mjs  → http://localhost:4173
import { createServer } from 'node:http';
import { readFileSync, existsSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';
const root = join(import.meta.dirname, 'site');
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.xml': 'application/xml', '.txt': 'text/plain' };
createServer((req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]);
  let f = join(root, p);
  if (!f.startsWith(root)) { res.writeHead(403).end(); return; }
  if (existsSync(f) && statSync(f).isDirectory()) f = join(f, 'index.html');
  if (!existsSync(f)) { res.writeHead(404, { 'content-type': types['.html'] }).end(readFileSync(join(root, '404.html'))); return; }
  res.writeHead(200, { 'content-type': types[extname(f)] || 'application/octet-stream' }).end(readFileSync(f));
}).listen(4173, () => console.log('http://localhost:4173'));
