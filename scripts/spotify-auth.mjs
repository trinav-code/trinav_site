/**
 * One-time: get a Spotify refresh token for the now-playing endpoint.
 *
 * 1. https://developer.spotify.com/dashboard → create an app.
 *    Redirect URI: http://127.0.0.1:8888/callback
 * 2. SPOTIFY_CLIENT_ID=... SPOTIFY_CLIENT_SECRET=... node scripts/spotify-auth.mjs
 * 3. Open the printed URL, approve, and the refresh token prints here.
 * 4. Put all three in Vercel env (and .env locally). Never commit them.
 */
import http from 'node:http';

const id = process.env.SPOTIFY_CLIENT_ID, secret = process.env.SPOTIFY_CLIENT_SECRET;
if (!id || !secret) { console.error('Set SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET.'); process.exit(1); }
const redirect = 'http://127.0.0.1:8888/callback';
const scope = 'user-read-currently-playing user-read-recently-played';
const url = `https://accounts.spotify.com/authorize?${new URLSearchParams({ client_id: id, response_type: 'code', redirect_uri: redirect, scope })}`;
console.log('\nOpen this URL and approve:\n\n' + url + '\n');

http.createServer(async (req, res) => {
  const code = new URL(req.url, redirect).searchParams.get('code');
  if (!code) { res.end('no code'); return; }
  const r = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: { authorization: 'Basic ' + Buffer.from(`${id}:${secret}`).toString('base64'), 'content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ grant_type: 'authorization_code', code, redirect_uri: redirect }),
  });
  const j = await r.json();
  res.end('Done. Back to the terminal.');
  console.log('\nSPOTIFY_REFRESH_TOKEN=' + j.refresh_token + '\n');
  process.exit(0);
}).listen(8888);
