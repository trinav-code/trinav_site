import type { APIRoute } from 'astro';

export const prerender = false;

/**
 * Spotify now-playing. Refresh token lives in env; the access token is
 * minted here and kept in memory for its lifetime. Response is cached at
 * the edge for 30s. Any failure returns { state: "none" } with 200, never
 * an error, so the page can render nothing.
 */
const CLIENT_ID = import.meta.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.SPOTIFY_CLIENT_SECRET;
const REFRESH_TOKEN = import.meta.env.SPOTIFY_REFRESH_TOKEN;

let access: { token: string; expires: number } | null = null;

type Track = {
  state: 'playing' | 'last' | 'none';
  title?: string;
  artist?: string;
  album?: string;
  art?: string;
  url?: string;
};

const NONE: Track = { state: 'none' };
const headers = {
  'content-type': 'application/json',
  'cache-control': 'public, s-maxage=30, stale-while-revalidate=120',
};

async function accessToken(): Promise<string | null> {
  if (!CLIENT_ID || !CLIENT_SECRET || !REFRESH_TOKEN) return null;
  if (access && access.expires > Date.now() + 10_000) return access.token;
  const res = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      authorization: 'Basic ' + Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64'),
      'content-type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({ grant_type: 'refresh_token', refresh_token: REFRESH_TOKEN }),
    signal: AbortSignal.timeout(5000),
  });
  if (!res.ok) return null;
  const j = await res.json();
  access = { token: j.access_token, expires: Date.now() + (j.expires_in ?? 3600) * 1000 };
  return access.token;
}

function shape(item: any, state: Track['state']): Track {
  const art = item?.album?.images?.slice(-1)[0]?.url ?? item?.album?.images?.[0]?.url;
  return {
    state,
    title: item?.name,
    artist: (item?.artists ?? []).map((a: any) => a.name).join(', '),
    album: item?.album?.name,
    art,
    url: item?.external_urls?.spotify,
  };
}

export const GET: APIRoute = async () => {
  try {
    const token = await accessToken();
    if (!token) return new Response(JSON.stringify(NONE), { headers });
    const auth = { authorization: `Bearer ${token}` };

    const now = await fetch('https://api.spotify.com/v1/me/player/currently-playing', { headers: auth, signal: AbortSignal.timeout(5000) });
    if (now.status === 200) {
      const j = await now.json();
      if (j?.is_playing && j?.item?.type === 'track') return new Response(JSON.stringify(shape(j.item, 'playing')), { headers });
    }

    const recent = await fetch('https://api.spotify.com/v1/me/player/recently-played?limit=1', { headers: auth, signal: AbortSignal.timeout(5000) });
    if (recent.ok) {
      const j = await recent.json();
      const item = j?.items?.[0]?.track;
      if (item) return new Response(JSON.stringify(shape(item, 'last')), { headers });
    }
    return new Response(JSON.stringify(NONE), { headers });
  } catch {
    return new Response(JSON.stringify(NONE), { headers });
  }
};
