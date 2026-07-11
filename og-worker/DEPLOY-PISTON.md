# Deploying a free Piston backend for the Code Judge

The judge and code runner send code to a Cloudflare Worker, which forwards it
to a **Piston** instance you host. This guide sets up Piston for free on an
Oracle Cloud "Always Free" VM. Total time: ~30–45 min.

> The browser only ever talks to the Cloudflare Worker over HTTPS. The
> Worker → Piston hop is server-side, so Piston can run over plain HTTP and
> you don't need a TLS cert or domain on the VM.

---

## Is it free?

Yes. Oracle Cloud's Always Free tier includes ARM VMs (up to 4 cores / 24 GB
RAM) with no time limit. A credit card is required at signup for identity
verification but is not charged on the Always Free resources.

Prefer to skip Oracle? Any VPS works (Hetzner ~€4/mo, DigitalOcean $4–6/mo) —
the steps from "Install Docker" onward are identical.

---

## 1. Create the VM (Oracle Cloud)

1. Sign up at https://www.oracle.com/cloud/free/ and sign in to the console.
2. **Compute → Instances → Create instance**.
3. Image: **Ubuntu 22.04**. Shape: **VM.Standard.A1.Flex** (Ampere, Always
   Free). Give it 1–2 OCPUs and 6–12 GB RAM.
4. Under Networking, keep "Assign public IP". Save the SSH key it offers.
5. Create. Note the **public IP**.

## 2. Open the port

Piston listens on **2000**. Open it in two places:

- **Oracle security list:** Networking → VCN → your subnet → Security List →
  add an ingress rule: source `0.0.0.0/0`, TCP, destination port `2000`.
- **On the VM firewall** (after SSH in step 3):
  ```bash
  sudo iptables -I INPUT -p tcp --dport 2000 -j ACCEPT
  sudo netfilter-persistent save   # if installed; otherwise the rule lasts until reboot
  ```

## 3. SSH in and install Docker

```bash
ssh -i /path/to/key ubuntu@YOUR_PUBLIC_IP

sudo apt-get update
sudo apt-get install -y docker.io
sudo systemctl enable --now docker
```

## 4. Run Piston

```bash
sudo docker run -d --name piston \
  --restart always \
  --privileged \
  -p 2000:2000 \
  ghcr.io/engineer-man/piston
```

`--privileged` is required for Piston's sandbox. Verify it's up:

```bash
curl http://localhost:2000/api/v2/runtimes    # should return [] initially
```

## 5. Install language runtimes

Piston ships empty; install the languages the judge uses. Check available
versions at `http://localhost:2000/api/v2/packages`, then:

```bash
# Python
curl -s http://localhost:2000/api/v2/packages -X POST \
  -H 'Content-Type: application/json' -d '{"language":"python","version":"3.12.0"}'

# Java
curl -s http://localhost:2000/api/v2/packages -X POST \
  -H 'Content-Type: application/json' -d '{"language":"java","version":"15.0.2"}'

# C++ (gcc)
curl -s http://localhost:2000/api/v2/packages -X POST \
  -H 'Content-Type: application/json' -d '{"language":"gcc","version":"10.2.0"}'
```

Confirm they installed:

```bash
curl http://localhost:2000/api/v2/runtimes   # now lists python, java, c++
```

From your laptop, confirm it's reachable publicly:

```bash
curl http://YOUR_PUBLIC_IP:2000/api/v2/runtimes
```

## 6. Point the Cloudflare Worker at Piston

From the `og-worker/` directory:

```bash
wrangler secret put PISTON_URL
# paste: http://YOUR_PUBLIC_IP:2000/api/v2
wrangler deploy
```

Test the proxy:

```bash
curl https://YOUR_WORKER_URL/runtimes    # should mirror Piston's list
```

## 7. Point the site at the Worker

If your worker is on `*.workers.dev`, tell the site by setting the endpoint.
Either update the default in `_includes/judge.html` / `_includes/code-runner.html`
(the `ENDPOINT` / `PISTON` constant), or set a global on the page:

```html
<script>window.SC_RUNNER_ENDPOINT = "https://YOUR_WORKER_URL";</script>
```

If you instead route the worker through `og.systemcraft.in` (Cloudflare
dashboard → Workers → your worker → Triggers → Custom Domains), the current
default works with no code change.

---

## Security notes

- Piston sandboxes each run with CPU/memory/time limits, but you're still
  running arbitrary code. Keep the VM minimal and patched.
- Port 2000 is open to the world in this setup. To lock it down, restrict the
  Oracle ingress rule to Cloudflare's IP ranges, or run Cloudflare Tunnel so
  only the Worker can reach Piston.
- The Worker already caps source size (60 KB) and applies a run timeout. Add
  rate limiting there if abuse becomes an issue.

## Cost recap

- Oracle Always Free VM: **free** (card for verification only).
- Cloudflare Workers: free tier is 100k requests/day — plenty.
- Total: **$0/month** on the Oracle path.
