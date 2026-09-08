import type { Loader } from 'astro/loaders';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import YAML from 'yaml';
import sharp from 'sharp';
import { XMLParser } from 'fast-xml-parser';
import { site } from '../../site.config';

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
  isbn?: string; cover?: string; blurb?: string; thoughts?: string; tags?: string[];
  source?: 'file' | 'goodreads';
}
export interface Book extends RawBook {
  finished?: string;
  format: 'paperback' | 'hardcover' | 'ebook';
  coverUrl?: string; coverLarge?: string; color?: string;
}

const CACHE = '.cache/books.json';
const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
/** Match key: title before any subtitle colon. */
const titleKey = (s: string) => norm(s.split(':')[0].replace(/\s*\(.*?\)\s*/g, ' '));
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
      if (res.ok && (res.headers.get('content-type') ?? '').startsWith('image/')) return new Uint8Array(await res.arrayBuffer());
      if (res.status === 404) return;
    } catch {}
    await new Promise((r) => setTimeout(r, 800 * (i + 1)));
  }
}

/** Dominant colour. First the most common saturated, mid-luminance bucket;
 *  if the cover is near-monochrome, the most common mid-luminance bucket of
 *  any saturation; failing that, the plain average. Every cover gets a band. */
async function dominantColor(bytes: Uint8Array): Promise<string | undefined> {
  let data: Buffer, width: number, height: number;
  try {
    const out = await sharp(bytes).resize(120, 120, { fit: 'inside' }).removeAlpha().raw().toBuffer({ resolveWithObject: true });
    data = out.data; width = out.info.width; height = out.info.height;
  } catch { return; }
  const step = 1;
  type Bk = { n: number; r: number; g: number; b: number };
  const pass = (minSat: number, minLum: number, maxLum: number): Bk | undefined => {
    const buckets = new Map<number, Bk>();
    for (let i = 0; i < width * height; i += step) {
      const r = data[i * 3], g = data[i * 3 + 1], b = data[i * 3 + 2];
      const mx = Math.max(r, g, b), mn = Math.min(r, g, b);
      const lum = 0.299 * r + 0.587 * g + 0.114 * b;
      if (mx - mn < minSat || lum > maxLum || lum < minLum) continue;
      const key = ((r >> 5) << 6) | ((g >> 5) << 3) | (b >> 5);
      const bk = buckets.get(key) ?? { n: 0, r: 0, g: 0, b: 0 };
      bk.n++; bk.r += r; bk.g += g; bk.b += b;
      buckets.set(key, bk);
    }
    let best: Bk | undefined;
    for (const bk of buckets.values()) if (!best || bk.n > best.n) best = bk;
    return best;
  };
  const best = pass(28, 18, 235) ?? pass(0, 40, 215) ?? pass(0, 0, 256);
  if (!best) return;
  const hex = (v: number) => Math.round(v / best.n).toString(16).padStart(2, '0');
  return `#${hex(best.r)}${hex(best.g)}${hex(best.b)}`;
}

async function enrich(raw: RawBook, cache: Record<string, Partial<Book>>, log: (m: string) => void): Promise<Book> {
  const key = `${raw.title}|${raw.author}`;
  const base: Book = {
    ...raw,
    finished: raw.finished === undefined ? undefined : String(raw.finished),
    format: raw.format ?? 'paperback',
  };
  const overrides = { ...stripUndefined(raw), finished: base.finished };
  if (cache[key]) return { ...base, ...cache[key], ...overrides };

  const found: Partial<Book> = {};
  try {
    if (!raw.cover) {
    const q = raw.isbn
      ? `q=isbn:${encodeURIComponent(raw.isbn)}`
      : `title=${encodeURIComponent(raw.title)}&author=${encodeURIComponent(raw.author)}`;
    const FIELDS = 'limit=6&fields=key,cover_i,number_of_pages_median,author_name';
    let search = await fetchJson(`https://openlibrary.org/search.json?${q}&${FIELDS}`);
    if (!search?.docs?.length && !raw.isbn) {
      /* Author names with diacritics often miss; fall back to the title alone. */
      search = await fetchJson(`https://openlibrary.org/search.json?title=${encodeURIComponent(raw.title)}&${FIELDS}`);
    }
    const docs: any[] = search?.docs ?? [];
    /* Prefer a result with a cover, but only if its author matches ours. */
    const surname = norm(raw.author).split(' ').pop() ?? '';
    const byAuthor = (d: any) => (d.author_name ?? []).some((a: string) => norm(a).includes(surname));
    const doc = docs.find((d) => d.cover_i && byAuthor(d)) ?? docs.find(byAuthor) ?? docs[0];
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
    }
    /* Fetch the cover once, sample its colour, and keep a local copy so the
       site never waits on Open Library at request time. */
    const coverSrc = raw.cover ?? found.coverUrl;
    if (coverSrc) {
      const slug = key.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      const small = await fetchBytes(coverSrc);
      if (small && small.length > 1000) {
        found.color = await dominantColor(small);
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
  return { ...base, ...found, ...overrides };
}

function stripUndefined<T extends object>(o: T): Partial<T> {
  return Object.fromEntries(Object.entries(o).filter(([, v]) => v !== undefined)) as Partial<T>;
}

/** Books on the Goodreads "read" shelf, newest first. Fail-soft. */
async function goodreadsBooks(feedUrl: string, log: (m: string) => void): Promise<RawBook[]> {
  if (!feedUrl) return [];
  try {
    const res = await fetch(feedUrl, { signal: AbortSignal.timeout(15000), headers: UA });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const parsed = new XMLParser({ ignoreAttributes: false, cdataPropName: '__cdata' }).parse(await res.text());
    const raw = parsed?.rss?.channel?.item ?? [];
    const items: any[] = Array.isArray(raw) ? raw : [raw];
    const text = (v: unknown): string =>
      typeof v === 'string' ? v : v && typeof v === 'object' && '__cdata' in (v as any) ? String((v as any).__cdata) : String(v ?? '');
    return items.map((it) => {
      const read = text(it.user_read_at);
      const d = read ? new Date(read) : undefined;
      const finished = d && !isNaN(d.getTime()) ? `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}` : undefined;
      const pages = Number(text(it.num_pages)) || undefined;
      const isbn = text(it.isbn) || undefined;
      const cover = (text(it.book_large_image_url) || undefined)?.replace(/\._S[XY]\d+_(?=\.)/, '');
      const added = text(it.user_date_added);
      const thoughts = text(it.user_review).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim() || undefined;
      return { title: text(it.title).trim(), author: text(it.author_name).replace(/\s+/g, ' ').trim(), finished, pages, isbn, cover, thoughts, source: 'goodreads' as const,
               _sort: (d && !isNaN(d.getTime()) ? d : new Date(added || 0)).getTime() };
    }).filter((b) => b.title).sort((a, b) => b._sort - a._sort).map(({ _sort, ...b }) => b);
  } catch (e) {
    log(`Goodreads feed skipped (${(e as Error).message}).`);
    return [];
  }
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
      /* Goodreads is the primary source for cover, ISBN and page count.
         Open Library is only consulted for books Goodreads does not have.
         Goodreads' read date wins when it has one; titles, formats and
         thoughts in books.md always win. */
      const gr = await goodreadsBooks(site.feeds.goodreads, log);
      const grCurrent = await goodreadsBooks(site.feeds.goodreads.replace(/shelf=read\b/, 'shelf=currently-reading'), log);
      const grByTitle = new Map([...grCurrent, ...gr].map((b) => [titleKey(b.title), b]));
      let matched = 0;
      const withGoodreads = (b: RawBook): RawBook => {
        const g = grByTitle.get(titleKey(b.title));
        if (!g) return b;
        matched++;
        /* Goodreads' read date is trusted over the one in the file. */
        return { ...b, cover: b.cover ?? g.cover, isbn: b.isbn ?? g.isbn, pages: b.pages ?? g.pages, finished: g.finished ?? b.finished };
      };

      /* Sequential on purpose: Open Library throttles parallel bursts. */
      const current: Book[] = [];
      for (const b of data.current ?? []) current.push(await enrich(withGoodreads(b), cache, log));
      const recent: Book[] = [];
      for (const b of data.recent ?? []) recent.push(await enrich(withGoodreads(b), cache, log));

      /* Currently-reading shelf on Goodreads: add anything the file lacks. */
      const listedCurrent = new Set(current.map((b) => titleKey(b.title)));
      for (const b of grCurrent.filter((b) => !listedCurrent.has(titleKey(b.title)))) current.push(await enrich({ ...b, finished: undefined }, cache, log));

      /* Then append anything on the read shelf that books.md does not list. */
      const listed = new Set([...current, ...recent].map((b) => titleKey(b.title)));
      const fromGoodreads = gr.filter((b) => !listed.has(titleKey(b.title)));
      for (const b of fromGoodreads) recent.push(await enrich(b, cache, log));
      if (fromGoodreads.length) logger.info(`${fromGoodreads.length} books added from Goodreads.`);
      logger.info(`${matched} of ${(data.current?.length ?? 0) + (data.recent?.length ?? 0)} listed books matched Goodreads.`);
      /* Shelf order: newest finished first; month beats year-only; undated last. */
      const rank = (f?: string) => (f ? (f.length === 4 ? `${f}-00` : f) : '0000-00');
      recent.sort((a, b) => rank(b.finished).localeCompare(rank(a.finished)));

      const noCover = [...current, ...recent].filter((b) => !b.coverUrl).map((b) => b.title);
      if (noCover.length) logger.warn(`No cover: ${noCover.join('; ')}`);

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
