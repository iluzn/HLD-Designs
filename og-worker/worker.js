// Cloudflare Worker — Dynamic OG Image Generator for SystemCraft
// Deploy to: https://og.systemcraft.in or any worker URL
// Usage: /og?title=Design+Zomato&description=Food+Delivery+System+Design&type=hld

export default {
  async fetch(request) {
    const url = new URL(request.url);
    const title = url.searchParams.get('title') || 'SystemCraft';
    const description = url.searchParams.get('description') || 'System Design Interview Prep';
    const type = (url.searchParams.get('type') || 'hld').toUpperCase();

    const typeColors = {
      HLD: { bg: '#818cf8', label: 'System Design' },
      LLD: { bg: '#10b981', label: 'Machine Coding' },
      DSA: { bg: '#f59e0b', label: 'DSA' },
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
  
  <!-- Type badge -->
  <rect x="80" y="80" width="${config.label.length * 14 + 32}" height="36" rx="8" fill="${config.bg}" opacity="0.15"/>
  <rect x="80" y="80" width="${config.label.length * 14 + 32}" height="36" rx="8" stroke="${config.bg}" stroke-width="1" fill="none" opacity="0.4"/>
  <text x="96" y="104" font-family="Inter, -apple-system, sans-serif" font-size="16" font-weight="600" fill="${config.bg}">${config.label}</text>
  
  <!-- Title -->
  <text x="80" y="200" font-family="Inter, -apple-system, sans-serif" font-size="52" font-weight="800" fill="#e8edf3">${escapeXml(truncate(title, 40))}</text>
  ${title.length > 40 ? `<text x="80" y="260" font-family="Inter, -apple-system, sans-serif" font-size="52" font-weight="800" fill="#e8edf3">${escapeXml(title.slice(40, 80))}</text>` : ''}
  
  <!-- Description -->
  <text x="80" y="${title.length > 40 ? 320 : 270}" font-family="Inter, -apple-system, sans-serif" font-size="22" fill="#9ba3b0">${escapeXml(truncate(description, 70))}</text>
  
  <!-- Logo area -->
  <rect x="80" y="530" width="28" height="28" rx="6" fill="url(#accent)"/>
  <rect x="84" y="536" width="10" height="4" rx="1.5" fill="#fff" opacity="0.9"/>
  <rect x="87" y="543" width="10" height="4" rx="1.5" fill="#fff" opacity="0.7"/>
  <rect x="90" y="550" width="10" height="4" rx="1.5" fill="#fff" opacity="0.5"/>
  <text x="118" y="553" font-family="Inter, -apple-system, sans-serif" font-size="20" font-weight="700" fill="#e8edf3">System<tspan fill="#818cf8">Craft</tspan></text>
  <text x="290" y="553" font-family="Inter, -apple-system, sans-serif" font-size="16" fill="#6b7280">systemcraft.in</text>
  
  <!-- Decorative dots -->
  <circle cx="1050" cy="150" r="80" fill="#818cf8" opacity="0.04"/>
  <circle cx="1100" cy="500" r="120" fill="#a78bfa" opacity="0.03"/>
</svg>`;

    return new Response(svg, {
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'public, max-age=86400, s-maxage=86400',
      },
    });
  },
};

function escapeXml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function truncate(str, max) {
  return str.length > max ? str.slice(0, max - 1) + '…' : str;
}
