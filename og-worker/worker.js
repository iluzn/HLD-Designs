// Cloudflare Worker for SystemCraft
// Routes:
//   GET  /og           -> dynamic Open Graph image (SVG)
//   GET  /runtimes     -> proxied list of Piston runtimes (for the code runner)
//   POST /execute      -> proxied Piston code execution (for runner + online judge)
//
// Code execution is proxied to a self-hosted Piston instance so that:
//   - no backend URL/keys live in the static site
//   - CORS is handled in one place
//   - we can rate-limit / swap the backend without touching the frontend
//
// Configure the Piston base URL via a wrangler var or secret named PISTON_URL,
// e.g. PISTON_URL = "https://piston.systemcraft.in/api/v2"
// (self-host Piston: https://github.com/engineer-man/piston)

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Max-Age': '86400',
};

// Best-effort concurrency gate. Caps simultaneous executions per Worker isolate
// and makes excess requests WAIT briefly instead of stampeding the backend, then
// 503s (which the frontend retries). Not a globally exact limit — Cloudflare may
// run several isolates — but it smooths the common "everyone clicks at once at the
// same edge" spike, which is exactly the failure mode under load.
let inFlight = 0;
const MAX_INFLIGHT = 12;   // simultaneous executions allowed per isolate
const MAX_WAIT_MS = 4000;  // how long a queued request waits for a slot before 503
function sleepMs(ms) { return new Promise((r) => setTimeout(r, ms)); }
async function acquireSlot() {
  const start = Date.now();
  while (inFlight >= MAX_INFLIGHT) {
    if (Date.now() - start > MAX_WAIT_MS) return false;
    await sleepMs(120);
  }
  inFlight++;
  return true;
}
function releaseSlot() { inFlight = Math.max(0, inFlight - 1); }

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname.replace(/\/+$/, '') || '/';

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: CORS });
    }

    if (path === '/runtimes') return handleRuntimes(env);
    if (path === '/execute') return handleExecute(request, env);
    // Default + /og -> OG image
    return handleOg(url);
  },
};

// ---- Code execution proxy ------------------------------------------------
// Two backends are supported. If GLOT_TOKEN is set, code runs on glot.io
// (free, no credit card). Otherwise, if PISTON_URL is set, it runs on a
// self-hosted Piston. Both are adapted to the same Piston-shaped response
// the frontend expects: { run: { stdout, stderr, code, signal }, compile }.

function jsonResponse(obj, status = 200) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { 'Content-Type': 'application/json', ...CORS },
  });
}

function pistonBase(env) {
  return (env && env.PISTON_URL ? env.PISTON_URL : '').replace(/\/+$/, '');
}

// Frontend language tokens -> glot.io language identifiers.
const GLOT_LANG = {
  python: 'python', python3: 'python', py: 'python',
  java: 'java',
  'c++': 'cpp', cpp: 'cpp',
  c: 'c',
  javascript: 'javascript', node: 'javascript', js: 'javascript',
  typescript: 'typescript', ts: 'typescript',
  go: 'go', golang: 'go',
  rust: 'rust',
  ruby: 'ruby',
  csharp: 'csharp', 'c#': 'csharp',
  kotlin: 'kotlin',
};

async function handleRuntimes(env) {
  if (pistonBase(env)) {
    try {
      const res = await fetch(pistonBase(env) + '/runtimes', { headers: { Accept: 'application/json' } });
      const body = await res.text();
      return new Response(body, {
        status: res.status,
        headers: { 'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=300', ...CORS },
      });
    } catch (e) {
      return jsonResponse({ error: 'Runtime list unavailable' }, 502);
    }
  }
  // glot / default: advertise a static set (versions are always "latest").
  return jsonResponse([
    { language: 'python', version: 'latest', aliases: ['python3', 'py'] },
    { language: 'java', version: 'latest', aliases: [] },
    { language: 'cpp', version: 'latest', aliases: ['c++'] },
  ]);
}

async function handleExecute(request, env) {
  let payload;
  try {
    payload = await request.json();
  } catch (e) {
    return jsonResponse({ error: 'Invalid JSON body' }, 400);
  }

  const files = Array.isArray(payload.files) ? payload.files : [];
  const totalSize = files.reduce((n, f) => n + (f && f.content ? f.content.length : 0), 0);
  if (totalSize > 60000) return jsonResponse({ error: 'Source too large (60KB max)' }, 413);

  const backend = (env && env.GLOT_TOKEN)
    ? () => execViaGlot(env, payload, files)
    : (pistonBase(env) ? () => execViaPiston(env, payload, files) : null);
  if (!backend) return jsonResponse({ error: 'Execution backend not configured' }, 503);

  // Admission control: wait for a free slot (up to MAX_WAIT_MS), else tell the
  // client we're busy so it retries with backoff instead of overloading the backend.
  const gotSlot = await acquireSlot();
  if (!gotSlot) return jsonResponse({ error: 'Execution service busy — please retry' }, 503);
  try {
    return await backend();
  } finally {
    releaseSlot();
  }
}

async function execViaGlot(env, payload, files) {
  const raw = (payload.language || '').toLowerCase();
  const lang = GLOT_LANG[raw] || raw;
  // Abort the wait early so infinite loops surface as TLE in ~12s instead of
  // hanging on glot's ~30s server-side limit.
  const controller = new AbortController();
  const TLE_MS = 12000;
  const timer = setTimeout(() => controller.abort(), TLE_MS);
  const tle = () => jsonResponse({ run: { stdout: '', stderr: 'Time Limit Exceeded', code: 1, signal: 'SIGKILL' }, compile: null });
  try {
    const res = await fetch('https://glot.io/api/run/' + encodeURIComponent(lang) + '/latest', {
      method: 'POST',
      headers: { Authorization: 'Token ' + env.GLOT_TOKEN, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        files: files.map((f) => ({ name: f.name, content: f.content })),
        stdin: payload.stdin || '',
      }),
      signal: controller.signal,
    });
    clearTimeout(timer);
    if (!res.ok) {
      let body = '';
      try { body = await res.text(); } catch (e) {}
      // glot answers 400 when it kills a run that exceeds its own time limit.
      if (res.status === 400 || /time\s*limit|timeout|timed out/i.test(body)) return tle();
      return jsonResponse({ run: { stdout: '', stderr: 'Execution service error (' + res.status + ')', code: 1, signal: null }, compile: null });
    }
    const g = await res.json();
    const timedOut = g.error && /timeout|time limit/i.test(g.error);
    if (timedOut) return tle();
    const stderr = [g.stderr, g.error && g.error !== '' ? g.error : ''].filter(Boolean).join('\n');
    return jsonResponse({
      run: { stdout: g.stdout || '', stderr: stderr, code: stderr ? 1 : 0, signal: null },
      compile: null,
    });
  } catch (e) {
    clearTimeout(timer);
    if (e && e.name === 'AbortError') return tle();
    return jsonResponse({ error: 'Execution service unreachable' }, 502);
  }
}

async function execViaPiston(env, payload, files) {
  const base = pistonBase(env);
  const body = {
    language: payload.language,
    version: payload.version || '*',
    files,
    stdin: payload.stdin || '',
    compile_timeout: payload.compile_timeout || 10000,
    run_timeout: payload.run_timeout || 5000,
    run_memory_limit: payload.run_memory_limit || -1,
  };
  try {
    const res = await fetch(base + '/execute', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const text = await res.text();
    return new Response(text, { status: res.status, headers: { 'Content-Type': 'application/json', ...CORS } });
  } catch (e) {
    return jsonResponse({ error: 'Execution service unreachable' }, 502);
  }
}

// ---- Dynamic OG image ----------------------------------------------------

function handleOg(url) {
  const title = url.searchParams.get('title') || 'SystemCraft';
  const description = url.searchParams.get('description') || 'System Design Interview Prep';
  const type = (url.searchParams.get('type') || 'hld').toUpperCase();

  const typeColors = {
    HLD: { bg: '#818cf8', label: 'System Design' },
    LLD: { bg: '#10b981', label: 'Machine Coding' },
    DSA: { bg: '#f59e0b', label: 'DSA' },
    JUDGE: { bg: '#f472b6', label: 'Code Judge' },
  };

  const config = typeColors[type] || typeColors.HLD;

  const svg = `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#111118"/>
      <stop offset="100%" stop-color="#1a1a2e"/>
    </linearGradient>
    <linearGradient id="accent" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#818cf8"/>
      <stop offset="100%" stop-color="#a78bfa"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect x="0" y="0" width="1200" height="4" fill="url(#accent)"/>
  <rect x="80" y="80" width="${config.label.length * 14 + 32}" height="36" rx="8" fill="${config.bg}" opacity="0.15"/>
  <rect x="80" y="80" width="${config.label.length * 14 + 32}" height="36" rx="8" stroke="${config.bg}" stroke-width="1" fill="none" opacity="0.4"/>
  <text x="96" y="104" font-family="Inter, -apple-system, sans-serif" font-size="16" font-weight="600" fill="${config.bg}">${config.label}</text>
  <text x="80" y="200" font-family="Inter, -apple-system, sans-serif" font-size="52" font-weight="800" fill="#e8edf3">${escapeXml(truncate(title, 40))}</text>
  ${title.length > 40 ? `<text x="80" y="260" font-family="Inter, -apple-system, sans-serif" font-size="52" font-weight="800" fill="#e8edf3">${escapeXml(title.slice(40, 80))}</text>` : ''}
  <text x="80" y="${title.length > 40 ? 320 : 270}" font-family="Inter, -apple-system, sans-serif" font-size="22" fill="#9ba3b0">${escapeXml(truncate(description, 70))}</text>
  <rect x="80" y="530" width="28" height="28" rx="6" fill="url(#accent)"/>
  <rect x="84" y="536" width="10" height="4" rx="1.5" fill="#fff" opacity="0.9"/>
  <rect x="87" y="543" width="10" height="4" rx="1.5" fill="#fff" opacity="0.7"/>
  <rect x="90" y="550" width="10" height="4" rx="1.5" fill="#fff" opacity="0.5"/>
  <text x="118" y="553" font-family="Inter, -apple-system, sans-serif" font-size="20" font-weight="700" fill="#e8edf3">System<tspan fill="#818cf8">Craft</tspan></text>
  <text x="290" y="553" font-family="Inter, -apple-system, sans-serif" font-size="16" fill="#6b7280">systemcraft.in</text>
  <circle cx="1050" cy="150" r="80" fill="#818cf8" opacity="0.04"/>
  <circle cx="1100" cy="500" r="120" fill="#a78bfa" opacity="0.03"/>
</svg>`;

  return new Response(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
      ...CORS,
    },
  });
}

function escapeXml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function truncate(str, max) {
  return str.length > max ? str.slice(0, max - 1) + '…' : str;
}
