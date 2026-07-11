# Setting up the Code Judge execution backend

The judge and code runner send code to a Cloudflare Worker, which forwards it
to an execution backend. Pick the path that fits you:

- **glot.io — free, NO credit card, ~5 min.** Recommended if you don't have a
  card. (Section A)
- **Self-hosted Piston — free but needs a VM (card for most VMs).** More
  control, no third-party limits. (Section B)

The browser only ever talks to the Worker (HTTPS). The Worker holds the
backend token/URL as a secret, so nothing sensitive is in the static site.

---

## A. glot.io backend (no credit card)

1. **Get a free token.** Sign up at https://glot.io with email or GitHub — no
   card required. Then open https://glot.io/account/token and copy the token.

2. **Give it to the Worker as a secret.** From the `og-worker/` directory:
   ```bash
   npm install -g wrangler   # if not installed
   wrangler login
   wrangler secret put GLOT_TOKEN
   # paste your glot token when prompted
   wrangler deploy
   ```

3. **Test the proxy:**
   ```bash
   curl https://YOUR_WORKER_URL/runtimes           # lists python/java/cpp
   curl https://YOUR_WORKER_URL/execute -X POST \
     -H 'Content-Type: application/json' \
     -d '{"language":"python","files":[{"name":"main.py","content":"print(1+1)"}],"stdin":""}'
   # -> {"run":{"stdout":"2\n","stderr":"","code":0,"signal":null},"compile":null}
   ```

4. **Point the site at the Worker** (see "Wire the site" below).

**Notes on glot.io:** it's a free shared service, so there are rate limits and
no SLA — fine for a personal/learning site. Supported languages include
python, java, cpp, c, javascript, typescript, go, rust, ruby, csharp, kotlin.
Compile errors show up under "Runtime Error" in the verdict (glot doesn't
separate them). If you outgrow it, switch to Piston (Section B) — no frontend
changes needed.

---

## B. Self-hosted Piston backend

Piston needs a container host with privileged Docker. Free option: Oracle
Cloud "Always Free" VM (requires a card for signup verification only). Any VPS
(Hetzner ~€4/mo, DigitalOcean $4–6/mo) also works.

1. **Create a VM** (Ubuntu). Note its public IP.
2. **Open port 2000** in the host firewall / cloud security list.
3. **Install Docker and run Piston:**
   ```bash
   sudo apt-get update && sudo apt-get install -y docker.io
   sudo docker run -d --name piston --restart always --privileged \
     -p 2000:2000 ghcr.io/engineer-man/piston
   ```
4. **Install language runtimes** (check versions at `/api/v2/packages`):
   ```bash
   for spec in '{"language":"python","version":"3.12.0"}' \
               '{"language":"java","version":"15.0.2"}' \
               '{"language":"gcc","version":"10.2.0"}'; do
     curl -s http://localhost:2000/api/v2/packages -X POST \
       -H 'Content-Type: application/json' -d "$spec"
   done
   curl http://localhost:2000/api/v2/runtimes   # confirm
   ```
5. **Point the Worker at Piston:**
   ```bash
   wrangler secret put PISTON_URL    # http://YOUR_VM_IP:2000/api/v2
   wrangler deploy
   ```

Security: port 2000 is world-open in this setup. Lock it to Cloudflare IPs or
use Cloudflare Tunnel if abuse is a concern. The Worker caps source size and
applies a run timeout.

---

## Wire the site to your Worker

`wrangler deploy` prints your Worker URL (e.g.
`https://systemcraft-og.<you>.workers.dev`). The runner/judge default to
`https://og.systemcraft.in`, so either:

- **Route the Worker at that domain** — Cloudflare dashboard → your Worker →
  Settings → Triggers → Custom Domains → add `og.systemcraft.in`. No code
  change needed. **OR**
- **Override the endpoint** — set the default in `_includes/judge.html` and
  `_includes/code-runner.html` (the `ENDPOINT` / `PISTON` constant) to your
  `*.workers.dev` URL, or set `window.SC_RUNNER_ENDPOINT` on the page.

Tell your assistant your Worker URL and it can lock it in as the default.

## Cost recap

- glot.io token: **free, no card**.
- Cloudflare Workers: free (100k requests/day).
- Total on the glot path: **$0/month, no card**.
