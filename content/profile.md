---
layout: default
title: "My Profile - Submissions & Progress"
description: "Your SystemCraft coding progress: problems solved, submission heatmap, acceptance rate, and recent activity."
permalink: /profile
---

# My Progress

{% include judge-firebase.html %}

{% raw %}
<div id="profile-root" style="color:var(--text-muted)">Loading your progress…</div>

<style>
.pf-who { font-size:0.82rem; color:var(--text-dim); margin:-0.5rem 0 1rem; }
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
.pf-note { font-size:0.78rem; color:var(--text-dim); background:var(--tag-bg,rgba(129,140,248,0.08)); border:1px solid var(--border); border-radius:10px; padding:0.7rem 0.9rem; margin:0.5rem 0 1rem; }
</style>

<script>
(function () {
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]; }); }
  function pretty(slug) { return slug.replace(/-/g, ' ').replace(/\b\w/g, function (c) { return c.toUpperCase(); }); }

  function render() {
    var root = document.getElementById('profile-root');
    var data = window._scJudge || { solved: [], subs: {} };
    var solved = data.solved || [];
    var subs = [];
    Object.keys(data.subs || {}).forEach(function (slug) { (data.subs[slug] || []).forEach(function (s) { s = Object.assign({}, s); s.slug = slug; subs.push(s); }); });
    subs.sort(function (a, b) { return b.ts - a.ts; });
    var accepted = subs.filter(function (s) { return s.status === 'Accepted'; }).length;
    var langs = {}; subs.forEach(function (s) { if (s.langName) langs[s.langName] = 1; });
    var accRate = subs.length ? Math.round((accepted / subs.length) * 100) : 0;

    var who = window._scUser
      ? '<div class="pf-who">Signed in as <b>' + esc(window._scUser.email) + '</b> — progress syncs to your account.</div>'
      : '<div class="pf-note">You are not signed in. This progress is saved only in this browser. <a href="/" style="color:var(--accent)">Sign in</a> on any page to tie it to your account and sync across devices.</div>';

    if (!subs.length && !solved.length) {
      root.innerHTML = who + '<div class="pf-empty">No activity yet. Head to the <a href="/problemset" style="color:var(--accent)">Problemset</a> and solve your first problem.</div>';
      return;
    }

    var html = who + '<div class="pf-stats">' +
      '<div class="pf-stat"><b>' + solved.length + '</b><span>Problems Solved</span></div>' +
      '<div class="pf-stat"><b>' + subs.length + '</b><span>Total Submissions</span></div>' +
      '<div class="pf-stat"><b>' + accRate + '%</b><span>Acceptance Rate</span></div>' +
      '<div class="pf-stat"><b>' + Object.keys(langs).length + '</b><span>Languages Used</span></div>' +
      '</div>';

    var byDay = {};
    subs.forEach(function (s) { var d = new Date(s.ts); var k = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate(); byDay[k] = (byDay[k] || 0) + 1; });
    var today = new Date(); today.setHours(0, 0, 0, 0);
    var start = new Date(today); start.setDate(start.getDate() - (25 * 7 + today.getDay()));
    var cur = new Date(start); var weeks = [];
    for (var w = 0; w < 26; w++) {
      var col = [];
      for (var day = 0; day < 7; day++) {
        var k2 = cur.getFullYear() + '-' + (cur.getMonth() + 1) + '-' + cur.getDate();
        var c = byDay[k2] || 0;
        var lvl = c === 0 ? '' : (c >= 8 ? 'l4' : c >= 4 ? 'l3' : c >= 2 ? 'l2' : 'l1');
        col.push('<div class="pf-day ' + lvl + '" title="' + c + ' on ' + k2 + '"></div>');
        cur.setDate(cur.getDate() + 1);
      }
      weeks.push('<div class="pf-week">' + col.join('') + '</div>');
    }
    html += '<div class="pf-section-title">Submission Activity</div><div class="pf-heat">' + weeks.join('') + '</div>' +
      '<div class="pf-legend">Less <span class="pf-day"></span><span class="pf-day l1"></span><span class="pf-day l2"></span><span class="pf-day l3"></span><span class="pf-day l4"></span> More</div>';

    html += '<div class="pf-section-title">Solved Problems (' + solved.length + ')</div>';
    html += solved.length ? '<div class="pf-list">' + solved.map(function (sl) { return '<div class="pf-row"><span class="pf-badge ac">Solved</span><a href="/dsa/problem/' + sl + '">' + esc(pretty(sl)) + '</a></div>'; }).join('') + '</div>' : '<div class="pf-empty">None yet.</div>';

    html += '<div class="pf-section-title">Recent Submissions</div><div class="pf-list">';
    html += subs.slice(0, 15).map(function (s) {
      var cls = s.status === 'Accepted' ? 'ac' : 'wa';
      var ago = Math.floor((Date.now() - s.ts) / 60000);
      var when = ago < 60 ? ago + 'm ago' : (ago < 1440 ? Math.floor(ago / 60) + 'h ago' : new Date(s.ts).toLocaleDateString());
      return '<div class="pf-row"><span class="pf-badge ' + cls + '">' + esc(s.status) + '</span><a href="/dsa/problem/' + s.slug + '">' + esc(pretty(s.slug)) + '</a><span class="pf-dim">' + esc(s.langName || '') + ' · ' + when + '</span></div>';
    }).join('') + '</div>';

    root.innerHTML = html;
  }

  function ready(fn) { if (document.readyState !== 'loading') fn(); else document.addEventListener('DOMContentLoaded', fn); }
  ready(function () {
    if (window._scJudgeReady) render();
    document.addEventListener('sc-judge-ready', render);
  });
})();
</script>
{% endraw %}
