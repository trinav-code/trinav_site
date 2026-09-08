import type { Loader } from 'astro/loaders';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import YAML from 'yaml';
import { decode } from 'jpeg-js';

/**
 * Reads books.md and enriches every book at build time from Open Library:
 * cover image, page count, a short description, and the cover's dominant
 * colour (used for the band at the base of each spine on /reading).
 * Every lookup is fail-soft: a book with no cover simply has no cover and
 * no band. Results are cached in .cache/books.json between local builds.
 */

export interface RawBook {
  title: string; author: string; finished?: string | number;
  format?: 'paperback' | 'hardcover' | 'ebook'; pages?: number;
  isbn?: string; cover?: string; blurb?: string; thoughts?: string;
}
export interface Book extends RawBook {
  finished?: string;
  format: 'paperback' | 'hardcover' | 'ebook';
  coverUrl?: string; coverLarge?: string; color?: string;
}

const CACHE = '.cache/books.json';
const UA = { 'user-agent': 'personal-site build (github.com/trinav-code/trinav_site)' };

function stripFences(content: string) {
  return content.replace(/^---\s*\n/, '').replace(/\n---\s*$/, '');
}

async function fetchJson(url: string, ms = 20000, tries = 3): Promise<any> {
  let last: unknown;
  for (let i = 0; i < tries; i++) {
    try {
      const res = await fetch(url, { signal: AbortSignal.timeout(ms), headers: UA });
      if (!res.ok) throw new Error(`HTTP ${res.status} ${url}`);
      return await res.json();
    } catch (e) {
      last = e;
      await new Promise((r) => setTimeout(r, 800 * (i + 1)));
    }
  }
  throw last;
}

async function fetchBytes(url: string): Promise<Uint8Array | undefined> {
  for (let i = 0; i < 3; i++) {
    try {
      const res = await fetch(url, { signal: AbortSignal.timeout(20000), headers: UA, redirect: 'follow' });
      if (res.ok && (res.headers.get('content-type') ?? '').includes('jpeg')) return new Uint8Array(await res.arrayBuffer());
      if (res.status === 404) return;
    } catch {}
    await new Promise((r) => setTimeout(r, 800 * (i + 1)));
  }
}

/** Dominant colour: bucket saturated, mid-luminance pixels; average the top bucket. */
function dominantColor(jpeg: Uint8Array): string | undefined {
  let img;
  try { img = decode(jpeg, { useTArray: true, maxMemoryUsageInMB: 64 }); } catch { return; }
  const { data, width, height } = img;
  const buckets = new Map<number, { n: number; r: number; g: number; b: number }>();
  const step = Math.max(1, Math.floor((width * height) / 20000));
  for (let i = 0; i < width * height; i += step) {
    const r = data[i * 4], g = data[i * 4 + 1], b = data[i * 4 + 2];
    const mx = Math.max(r, g, b), mn = Math.min(r, g, b);
    const lum = 0.299 * r + 0.587 * g + 0.114 * b;
    if (mx - mn < 28 || lum > 235 || lum < 18) continue;
    const key = ((r >> 5) << 6) | ((g >> 5) << 3) | (b >> 5);
    const bk = buckets.get(key) ?? { n: 0, r: 0, g: 0, b: 0 };
    bk.n++; bk.r += r; bk.g += g; bk.b += b;
    buckets.set(key, bk);
  }
  let best: { n: number; r: number; g: number; b: number } | undefined;
  for (const bk of buckets.values()) if (!best || bk.n > best.n) best = bk;
  if (!best) return;
  const hex = (v: number) => Math.round(v / best!.n).toString(16).padStart(2, '0');
  return `#${hex(best.r)}${hex(best.g)}${hex(best.b)}`;
}

async function enrich(raw: RawBook, cache: Record<string, Partial<Book>>, log: (m: string) => void): Promise<Book> {
  const key = `${raw.title}|${raw.author}`;
  const base: Book = {
    ...raw,
    finished: raw.finished === undefined ? undefined : String(raw.finished),
    format: raw.format ?? 'paperback',
  };
  if (cache[key]) return { ...base, ...cache[key], ...stripUndefined(raw) };

  const found: Partial<Book> = {};
  try {
    const q = raw.isbn
      ? `q=isbn:${encodeURIComponent(raw.isbn)}`
      : `title=${encodeURIComponent(raw.title)}&author=${encodeURIComponent(raw.author)}`;
    const FIELDS = 'limit=1&fields=key,cover_i,number_of_pages_median';
    let search = await fetchJson(`https://openlibrary.org/search.json?${q}&${FIELDS}`);
    if (!search?.docs?.length && !raw.isbn) {
      /* Author names with diacritics often miss; fall back to the title alone. */
      search = await fetchJson(`https://openlibrary.org/search.json?title=${encodeURIComponent(raw.title)}&${FIELDS}`);
    }
    const doc = search?.docs?.[0];
    if (doc) {
      if (doc.number_of_pages_median && !raw.pages) found.pages = doc.number_of_pages_median;
      if (doc.cover_i && !raw.cover) {
        found.coverUrl = `https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg`;
        found.coverLarge = `https://covers.openlibrary.org/b/id/${doc.cover_i}-L.jpg`;
      }
      if (doc.key && !raw.blurb) {
        try {
          const work = await fetchJson(`https://openlibrary.org${doc.key}.json`);
          const d = typeof work?.description === 'string' ? work.description : work?.description?.value;
          if (d && !/^\s*RESUMEN/i.test(String(d))) found.blurb = String(d).replace(/\s+/g, ' ').replace(/\[.*?\]\(.*?\)/g, '').split(/(?<=\.)\s/).slice(0, 3).join(' ').replace(/^(.{0,420}\.)[\s\S]*$/, '$1');
        } catch (e) { log(`no description for ${raw.title}: ${(e as Error).message}`); }
      }
    }
    /* Fetch the cover once, sample its colour, and keep a local copy so the
       site never waits on Open Library at request time. */
    const coverSrc = raw.cover ?? found.coverUrl;
    if (coverSrc) {
      const slug = key.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      const small = await fetchBytes(coverSrc);
      if (small && small.length > 1000) {
        found.color = dominantColor(small);
        await mkdir('public/covers', { recursive: true });
        await writeFile(`public/covers/${slug}-m.jpg`, small);
        found.coverUrl = `/covers/${slug}-m.jpg`;
        const largeSrc = raw.cover ?? found.coverLarge;
        const large = largeSrc ? await fetchBytes(largeSrc) : undefined;
        if (large && large.length > 1000) {
          await writeFile(`public/covers/${slug}-l.jpg`, large);
          found.coverLarge = `/covers/${slug}-l.jpg`;
        } else {
          found.coverLarge = found.coverUrl;
        }
      } else {
        found.coverUrl = undefined; found.coverLarge = undefined;
      }
    }
    cache[key] = found;
  } catch (e) {
    log(`lookup failed for ${raw.title}: ${(e as Error).message}`);
  }
  return { ...base, ...found, ...stripUndefined(raw) };
}

function stripUndefined<T extends object>(o: T): Partial<T> {
  return Object.fromEntries(Object.entries(o).filter(([, v]) => v !== undefined)) as Partial<T>;
}

export function booksLoader(path = 'books.md'): Loader {
  return {
    name: 'books-loader',
    load: async ({ store, logger, parseData, watcher }) => {
      watcher?.add(path);
      const content = await readFile(path, 'utf8');
      const data = (YAML.parse(stripFences(content)) ?? {}) as { current?: RawBook[]; recent?: RawBook[] };

      let cache: Record<string, Partial<Book>> = {};
      try { cache = JSON.parse(await readFile(CACHE, 'utf8')); } catch {}

      const log = (m: string) => logger.warn(m);
      /* Sequential on purpose: Open Library throttles parallel bursts. */
      const current: Book[] = [];
      for (const b of data.current ?? []) current.push(await enrich(b, cache, log));
      const recent: Book[] = [];
      for (const b of data.recent ?? []) recent.push(await enrich(b, cache, log));

      try { await mkdir('.cache', { recursive: true }); await writeFile(CACHE, JSON.stringify(cache, null, 2)); } catch {}

      store.clear();
      for (const [id, items] of [['current', current], ['recent', recent], ['shelf', [...current, ...recent]]] as const) {
        store.set({ id, data: await parseData({ id, data: { items } }) });
      }
      const withCover = [...current, ...recent].filter((b) => b.coverUrl).length;
      logger.info(`${current.length + recent.length} books, ${withCover} with covers.`);
    },
  };
}
