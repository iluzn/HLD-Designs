# OG Image Worker for SystemCraft

Generates dynamic Open Graph preview images for social media sharing.

## Deploy

```bash
npm install -g wrangler
wrangler login
wrangler deploy
```

## Usage

After deploying, your worker URL will be something like:
`https://systemcraft-og.YOUR_SUBDOMAIN.workers.dev`

Update the OG image meta tags in `_layouts/default.html` to point to it:
```html
<meta property="og:image" content="https://systemcraft-og.YOUR_SUBDOMAIN.workers.dev/og?title=TITLE&description=DESC&type=hld">
```

## Parameters

| Param | Description | Default |
|---|---|---|
| `title` | Design title | "SystemCraft" |
| `description` | Short description | "System Design Interview Prep" |
| `type` | `hld`, `lld`, or `dsa` | `hld` |

## Custom Domain (optional)

You can route this through `og.systemcraft.in` by adding a CNAME record in Cloudflare DNS.
