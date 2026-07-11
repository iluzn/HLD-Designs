---
layout: default
title: "My Profile - Submissions & Progress"
description: "Your SystemCraft coding progress: problems solved, submission heatmap, acceptance rate, and recent activity."
permalink: /profile
---

# My Progress

{% raw %}
<div id="profile-root" style="color:var(--text-muted)">Loading your progress…</div>

<style>
.pf-stats { display:grid; grid-template-columns:repeat(auto-fit,minmax(140px,1fr)); gap:0.9rem; margin:1.2rem 0 2rem; }
.pf-stat { background:var(--bg-card,rgba(25,25,35,0.6)); border:1px solid var(--border); border-radius:12px; padding:1rem 1.1rem; }
.pf-stat b { display:block; font-size:1.7rem; font-weight:800; color:var(--text); }
.pf-stat span { font-size:0.76rem; color:var(--text-dim); }
.pf-section-title { font-size:1.05rem; font-weight:700; margin:1.6rem 0 0.8rem; }
.pf-heat { display:flex; gap:3px; overflow-x:auto; padding-bottom:0.5rem; }
.pf-week { display:flex; flex-direction:column; gap:3px; }
.pf-day { width:12px; height:12px; border-radius:3px; background:var(--border); }
.pf-day.l1 { background:rgba(34,197,94,0.35); } .pf-day.l2 { background:rgba(34,197,94,0.55); }
.pf-day.l3 { background:rgba(34,197,94,0.75); } .pf-day.l4 { background:#22c55e; }
.pf-legend { font-size:0.7rem; color:var(--text-dim); margin-top:0.5rem; display:flex; align-items:center; gap:0.4rem; }
.pf-list a { color:var(--accent); text-decoration:none; }
.pf-list a:hover { text-decoration:underline; }
.pf-row { display:flex; align-items:center; gap:0.7rem; padding:0.5rem 0; border-bottom:1px solid var(--border); font-size:0.85rem; }
.pf-badge { font-weight:700; font-size:0.72rem; padding:2px 8px; border-radius:6px; min-width:96px; text-align:center; }
.pf-badge.ac { background:rgba(34,197,94,0.14); color:#22c55e; } .pf-badge.wa { background:rgba(239,68,68,0.14); color:#ef4444; }
.pf-dim { color:var(--text-dim); font-size:0.76rem; }
.pf-empty { color:var(--text-dim); padding:1.5rem 0; }
</style>

<script>
(function () {
  function ready(fn) { if (document.readyState !== 'loading') fn(); else document.addEventListener('DOMContentLoaded', fn); }
  ready(function () {
    var root = document.getElementById('profile-root');
    var solved = [];
    try { solved = JSON.parse(localStorage.getItem('sc-lc-solved') || '[]'); } catch (e) {}
    var subs = [];
    for (var i = 0; i < localStorage.length; i++) {
      var k = localStorage.key(i);
      if (k && k.indexOf('sc-lc-subs-') === 0) {
        var slug = k.slice('sc-lc-subs-'.length);
        try { JSON.parse(localStorage.getItem(k)).forEach(function (s) { s.slug = slug; subs.push(s); }); } catch (e) {}
      }
    }
    subs.sort(function (a, b) { return b.ts - a.ts; });
    var accepted = subs.filter(function (s) { return s.status === 'Accepted'; }).length;
    var langs = {}; subs.forEach(function (s) { if (s.langName) langs[s.langName] = 1; });
    var accRate = subs.length ? Math.round((accepted / subs.length) * 100) : 0;

    function pretty(slug) { return slug.replace(/-/g, ' ').replace(/\b\w/g, function (c) { return c.toUpperCase(); }); }
    function esc(s) { return String(s == null ? '' : s).replace(/[&<>]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]; }); }

    if (!subs.length && !solved.length) {
      root.innerHTML = '<div class="pf-empty">No activity yet. Head to the <a href="/problemset" style="color:var(--accent)">Problemset</a> and solve your first problem — your progress will show up here.</div>';
      return;
    }

    // stats
    var html = '<div class="pf-stats">' +
      '<div class="pf-stat"><b>' + solved.length + '</b><span>Problems Solved</span></div>' +
      '<div class="pf-stat"><b>' + subs.length + '</b><span>Total Submissions</span></div>' +
      '<div class="pf-stat"><b>' + accRate + '%</b><span>Acceptance Rate</span></div>' +
      '<div class="pf-stat"><b>' + Object.keys(langs).length + '</b><span>Languages Used</span></div>' +
      '</div>';

    // heatmap (last 26 weeks)
    var byDay = {};
    subs.forEach(function (s) { var d = new Date(s.ts); var key = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate(); byDay[key] = (byDay[key] || 0) + 1; });
    var today = new Date(); today.setHours(0, 0, 0, 0);
    var start = new Date(today); start.setDate(start.getDate() - (25 * 7 + today.getDay()));
    var weeks = [];
    var cur = new Date(start);
    for (var w = 0; w < 26; w++) {
      var col = [];
      for (var day = 0; day < 7; day++) {
        var key2 = cur.getFullYear() + '-' + (cur.getMonth() + 1) + '-' + cur.getDate();
        var c = byDay[key2] || 0;
        var lvl = c === 0 ? '' : (c >= 8 ? 'l4' : c >= 4 ? 'l3' : c >= 2 ? 'l2' : 'l1');
        col.push('<div class="pf-day ' + lvl + '" title="' + c + ' on ' + key2 + '"></div>');
        cur.setDate(cur.getDate() + 1);
      }
      weeks.push('<div class="pf-week">' + col.join('') + '</div>');
    }
    html += '<div class="pf-section-title">Submission Activity</div><div class="pf-heat">' + weeks.join('') + '</div>' +
      '<div class="pf-legend">Less <span class="pf-day"></span><span class="pf-day l1"></span><span class="pf-day l2"></span><span class="pf-day l3"></span><span class="pf-day l4"></span> More</div>';

    // solved list
    html += '<div class="pf-section-title">Solved Problems (' + solved.length + ')</div>';
    if (solved.length) {
      html += '<div class="pf-list">' + solved.map(function (sl) { return '<div class="pf-row"><span class="pf-badge ac">Solved</span><a href="/dsa/problem/' + sl + '">' + esc(pretty(sl)) + '</a></div>'; }).join('') + '</div>';
    } else { html += '<div class="pf-empty">None yet.</div>'; }

    // recent submissions
    html += '<div class="pf-section-title">Recent Submissions</div><div class="pf-list">';
    html += subs.slice(0, 15).map(function (s) {
      var cls = s.status === 'Accepted' ? 'ac' : 'wa';
      var ago = Math.floor((Date.now() - s.ts) / 60000);
      var when = ago < 60 ? ago + 'm ago' : (ago < 1440 ? Math.floor(ago / 60) + 'h ago' : new Date(s.ts).toLocaleDateString());
      return '<div class="pf-row"><span class="pf-badge ' + cls + '">' + esc(s.status) + '</span><a href="/dsa/problem/' + s.slug + '">' + esc(pretty(s.slug)) + '</a><span class="pf-dim">' + esc(s.langName || '') + ' · ' + when + '</span></div>';
    }).join('') + '</div>';

    root.innerHTML = html;
  });
})();
</script>
{% endraw %}
