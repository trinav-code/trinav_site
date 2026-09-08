import { defineCollection, z } from 'astro:content';
import { glob, file } from 'astro/loaders';
import YAML from 'yaml';
import { domains, site } from '../site.config';
import { mediumLoader } from './lib/medium-loader';
import { booksLoader } from './lib/books-loader';

/** roles.md and books.md are YAML wrapped in `---` fences so they read as
 *  Obsidian frontmatter. Strip the fences and parse the body. */
function frontmatterYaml(content: string): Record<string, unknown> {
  const body = content.replace(/^---\s*\n/, '').replace(/\n---\s*$/, '');
  return (YAML.parse(body) ?? {}) as Record<string, unknown>;
}

const dateish = z.union([z.number(), z.string()]).transform(String);

const roleItem = z.object({
  title: z.string(),
  org: z.string(),
  start: dateish,
  end: dateish.optional(),
  current: z.boolean().optional(),
  note: z.string().optional(),
});

const educationItem = z.object({
  degree: z.string(),
  school: z.string(),
  detail: z.string().optional(),
  start: dateish,
  end: dateish.optional(),
});

const history = defineCollection({
  loader: file('roles.md', {
    parser: (content) => {
      const data = frontmatterYaml(content);
      return {
        roles: { items: data.roles ?? [] },
        education: { items: data.education ?? [] },
      };
    },
  }),
  schema: z.object({
    items: z.array(z.union([roleItem, educationItem])),
  }),
});

const bookItem = z.object({
  title: z.string(),
  author: z.string(),
  finished: z.string().optional(),
  format: z.enum(['paperback', 'hardcover', 'ebook']).default('paperback'),
  pages: z.number().optional(),
  isbn: z.string().optional(),
  blurb: z.string().optional(),
  thoughts: z.string().optional(),
  coverUrl: z.string().optional(),
  coverLarge: z.string().optional(),
  /** Dominant cover colour, sampled at build. Absent when there is no cover. */
  color: z.string().regex(/^#[0-9a-f]{6}$/i).optional(),
});

const books = defineCollection({
  loader: booksLoader('books.md'),
  schema: z.object({ items: z.array(bookItem) }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    domain: z.enum(Object.keys(domains) as [keyof typeof domains, ...(keyof typeof domains)[]]),
    summary: z.string(),
    repo: z.string().url().optional(),
    live: z.string().url().optional(),
    /** GitHub `owner/name`, read at build time for repo metadata (later pass). */
    github: z.string().optional(),
    /** 1, 2, 3 puts the project on the home page in that order. */
    featured: z.number().int().positive().optional(),
    order: z.number().default(100),
  }),
});

const writing = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/writing' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date().optional(),
    draft: z.boolean().default(false),
    summary: z.string().optional(),
  }),
});

const medium = defineCollection({
  loader: mediumLoader(site.feeds.medium),
  schema: z.object({
    title: z.string(),
    url: z.string().url(),
    date: z.coerce.date(),
  }),
});

export const collections = { history, books, projects, writing, medium };
