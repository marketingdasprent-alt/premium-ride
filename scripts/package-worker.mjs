import { URL } from 'node:url';
import { mkdir, readFile, readdir, cp, writeFile } from 'node:fs/promises';
const root = new URL('../dist/', import.meta.url);
await mkdir(new URL('client/', root), { recursive: true });
for (const name of await readdir(root)) {
  if (['client', 'server', '.openai'].includes(name)) continue;
  await cp(new URL(name, root), new URL(`client/${name}`, root), { recursive: true });
}
const html = await readFile(new URL('index.html', root), 'utf8');
await mkdir(new URL('server/', root), { recursive: true });
await writeFile(new URL('server/index.js', root), `const html = ${JSON.stringify(html)};
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (request.method !== 'GET' && request.method !== 'HEAD') return new Response('Method not allowed', { status: 405, headers: { Allow: 'GET, HEAD' } });
    if (url.pathname === '/') {
      const page = html.replaceAll('__SITE_ORIGIN__', url.origin);
      return new Response(request.method === 'HEAD' ? null : page, { headers: { 'Content-Type': 'text/html; charset=utf-8', 'X-Content-Type-Options': 'nosniff', 'Referrer-Policy': 'strict-origin-when-cross-origin' } });
    }
    return env.ASSETS.fetch(request);
  }
};
`);

