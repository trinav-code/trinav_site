import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import { site } from './site.config';
import booksEditor from './integrations/books-editor';

export default defineConfig({
  site: site.url,
  integrations: [mdx(), booksEditor()],
  redirects: {
    '/resume': site.resume,
  },
});
