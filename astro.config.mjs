import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import { site } from './site.config';

export default defineConfig({
  site: site.url,
  integrations: [mdx()],
  redirects: {
    '/resume': site.resume,
  },
});
