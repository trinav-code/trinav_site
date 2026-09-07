import { getCollection } from 'astro:content';

export interface FeedItem {
  title: string;
  href: string;
  date?: Date;
  draft: boolean;
  external: boolean;
}

/** Local MDX posts and Medium posts, newest first. Drafts float to the top. */
export async function writingFeed(): Promise<FeedItem[]> {
  const local = (await getCollection('writing')).map((p) => ({
    title: p.data.title,
    href: `/writing/${p.id}`,
    date: p.data.date,
    draft: p.data.draft,
    external: false,
  }));
  const medium = (await getCollection('medium')).map((m) => ({
    title: m.data.title,
    href: m.data.url,
    date: m.data.date,
    draft: false,
    external: true,
  }));
  return [...local, ...medium].sort((a, b) => {
    if (a.draft !== b.draft) return a.draft ? -1 : 1;
    return (b.date?.getTime() ?? 0) - (a.date?.getTime() ?? 0);
  });
}
