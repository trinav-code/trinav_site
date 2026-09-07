import type { Loader } from 'astro/loaders';
import { XMLParser } from 'fast-xml-parser';

/**
 * Build-time loader for a Medium RSS feed. Titles, links and dates only;
 * the content stays on Medium. Medium caps the feed at 10 items, so this is
 * a rolling window, not an archive. Any failure logs a warning and yields
 * zero entries so the build never depends on Medium being up.
 */
export function mediumLoader(feedUrl: string): Loader {
  return {
    name: 'medium-loader',
    load: async ({ store, logger, parseData }) => {
      let xml: string;
      try {
        const res = await fetch(feedUrl, {
          signal: AbortSignal.timeout(8000),
          headers: { accept: 'application/rss+xml, application/xml, text/xml' },
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        xml = await res.text();
      } catch (err) {
        logger.warn(`Medium feed unreachable (${(err as Error).message}); rendering local posts only.`);
        return;
      }

      let items: any[] = [];
      try {
        const parsed = new XMLParser({ ignoreAttributes: false, cdataPropName: '__cdata' }).parse(xml);
        const raw = parsed?.rss?.channel?.item ?? [];
        items = Array.isArray(raw) ? raw : [raw];
      } catch (err) {
        logger.warn(`Medium feed failed to parse (${(err as Error).message}); rendering local posts only.`);
        return;
      }

      const text = (v: unknown): string =>
        typeof v === 'string' ? v : v && typeof v === 'object' && '__cdata' in (v as any) ? String((v as any).__cdata) : String(v ?? '');

      store.clear();
      for (const it of items) {
        const link = text(it.link).split('?')[0];
        const guid = text(it.guid?.['#text'] ?? it.guid) || link;
        const id = guid.split('/').pop() || link;
        const data = await parseData({
          id,
          data: {
            title: text(it.title).trim(),
            url: link,
            date: new Date(text(it.pubDate)).toISOString(),
          },
        });
        store.set({ id, data });
      }
      logger.info(`Loaded ${items.length} Medium posts.`);
    },
  };
}
