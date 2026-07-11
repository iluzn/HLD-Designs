# SystemCraft Worker (OG images + code execution)

This Cloudflare Worker serves two jobs:

1. **Dynamic Open Graph images** — `GET /og?title=...&description=...&type=hld`
2. **Code execution proxy** for the code runner and the online judge:
   - `GET /runtimes` — list available languages
   - `POST /execute` — run code and return stdout/stderr/exit code

Execution is proxied to a **self-hosted Piston** instance. The public Piston
API became whitelist-only in 2026, so you must run your own (it's lightweight).

## Deploy the worker

```bash
npm install -g wrangler
wrangler login
wrangler deploy
```

Set the Piston backend URL (either edit `PISTON_URL` in `wrangler.toml`, or set
it as a secret so it isn't committed):

```bash
wrangler secret put PISTON_URL
# then paste e.g. https://piston.systemcraft.in/api/v2
```

Until `PISTON_URL` is set, `/execute` and `/runtimes` return HTTP 503.

## Point the site at the worker

The runner and judge default to `https://og.systemcraft.in`. Make sure the
worker is reachable there (add a route/custom domain in the Cloudflare
dashboard), or override on any page before the widget loads:

```html
<script>window.SC_RUNNER_ENDPOINT = "https://your-worker.workers.dev";</script>
```

## Self-host Piston

Piston (https://github.com/engineer-man/piston) runs as a single container.
Any host that allows Docker works — Fly.io, Render, Railway, a small VPS, or
Oracle Cloud's free tier.

```bash
# On a Docker host:
docker run -d --name piston \
  --restart always \
  -p 2000:2000 \
  ghcr.io/engineer-man/piston

# Install the language runtimes you need:
curl -s http://localhost:2000/api/v2/packages -X POST \
  -H 'Content-Type: application/json' -d '{"language":"python","version":"3.12.0"}'
# repeat for java, c++ (gcc), etc. — see /api/v2/packages for versions
```

Then expose it (behind TLS) and set that URL (with the `/api/v2` suffix) as the
worker's `PISTON_URL`. The worker adds CORS, caps source size, and applies a
default run timeout, so the browser never talks to Piston directly.

## OG image parameters

| Param | Description | Default |
|---|---|---|
| `title` | Title text | "SystemCraft" |
| `description` | Short description | "System Design Interview Prep" |
| `type` | `hld`, `lld`, `dsa`, or `judge` | `hld` |
