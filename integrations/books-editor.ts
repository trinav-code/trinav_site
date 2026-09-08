import type { AstroIntegration } from 'astro';
import { readFile, writeFile } from 'node:fs/promises';
import YAML from 'yaml';

/**
 * Dev only. Serves /edit-books (drag-and-drop shelf editor) and a tiny JSON
 * API at /__books that reads and writes books.md. Never part of the build.
 */
const FILE = 'books.md';

function split(content: string) {
  const m = /^---\s*\n([\s\S]*?)\n---\s*$/.exec(content.trim());
  const body = m ? m[1] : content;
  const header = body.split('\n').filter((l) => l.startsWith('#')).join('\n');
  return { header, data: YAML.parse(body) ?? {} };
}

export default function booksEditor(): AstroIntegration {
  return {
    name: 'books-editor',
    hooks: {
      'astro:config:setup': ({ command, injectRoute }) => {
        if (command !== 'dev') return;
        injectRoute({ pattern: '/edit-books', entrypoint: './src/dev/EditBooks.astro' });
      },
      'astro:server:setup': ({ server }) => {
        server.middlewares.use('/__books', async (req, res) => {
          res.setHeader('content-type', 'application/json');
          try {
            if (req.method === 'GET') {
              const { data } = split(await readFile(FILE, 'utf8'));
              res.end(JSON.stringify(data));
              return;
            }
            if (req.method === 'POST') {
              let body = '';
              for await (const chunk of req) body += chunk;
              const next = JSON.parse(body);
              const { header } = split(await readFile(FILE, 'utf8'));
              const clean = (b: any) =>
                Object.fromEntries(Object.entries(b).filter(([k, v]) => v !== '' && v !== null && v !== undefined && k !== 'source'));
              const doc = new YAML.Document({
                current: (next.current ?? []).map(clean),
                recent: (next.recent ?? []).map(clean),
              });
              const yaml = doc.toString({ lineWidth: 0 }).replace(/\n(  - )/g, '\n\n$1').replace(/^(current|recent):\n\n/gm, '$1:\n');
              await writeFile(FILE, `---\n${header}\n\n${yaml}---\n`);
              res.end(JSON.stringify({ ok: true }));
              return;
            }
            res.statusCode = 405; res.end('{}');
          } catch (e) {
            res.statusCode = 500; res.end(JSON.stringify({ error: (e as Error).message }));
          }
        });
      },
    },
  };
}
