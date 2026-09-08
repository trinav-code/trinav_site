import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import vercel from '@astrojs/vercel';
import { site } from './site.config';
import booksEditor from './integrations/books-editor';

export default defineConfig({
  site: site.url,
  integrations: [mdx(), booksEditor()],
  /* Static site; the adapter exists only for /api/now-playing (prerender = false). */
  adapter: vercel(),
  redirects: {
    '/resume': site.resume,
  },
});
