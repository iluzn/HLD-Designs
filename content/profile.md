---
layout: default
title: "My Profile - Progress Dashboard"
description: "Your SystemCraft dashboard: DSA problems solved, submission heatmap, and High-Level & Low-Level Design progress — all in one place."
permalink: /profile
---

{% include judge-firebase.html %}
{% include sc-catalog.html %}

{% raw %}
<div id="pf-root" class="pf-root">Loading your dashboard…</div>

<style>
.pf-root { max-width: 100%; }
.pf-hero { display:flex; align-items:center; gap:1rem; margin:0.4rem 0 1.4rem; }
.pf-hero img { width:56px; height:56px; border-radius:50%; border:2px solid var(--border); }
.pf-hero-fallback { width:56px; height:56px; border-radius:50%; background:linear-gradient(135deg,var(--accent),#a78bfa); display:flex; align-items:center; justify-content:center; font-size:1.4rem; font-weight:800; color:#fff; }
.pf-hero h2 { font-size:1.3rem; margin:0; }
.pf-hero .sub { font-size:0.82rem; color:var(--text-dim); }
.pf-note { font-size:0.82rem; color:var(--text-muted); background:var(--tag-bg,rgba(129,140,248,0.08)); border:1px solid var(--border); border-radius:10px; padding:0.7rem 0.9rem; margin:0.5rem 0 1.4rem; }
.pf-note a { color:var(--accent); font-weight:600; }
.pf-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(150px,1fr)); gap:0.9rem; margin-bottom:1.6rem; }
.pf-card { background:var(--bg-card,rgba(25,25,35,0.6)); border:1px solid var(--border); border-radius:14px; padding:1rem 1.15rem; }
.pf-card b { display:block; font-size:1.8rem; font-weight:800; color:var(--text); line-height:1.1; }
.pf-card span { font-size:0.75rem; color:var(--text-dim); }
.pf-diff { display:flex; gap:0.8rem; margin-top:0.5rem; font-size:0.7rem; }
.pf-diff .e { color:#22c55e; } .pf-diff .m { color:#eab308; } .pf-diff .h { color:#ef4444; }
.pf-sec { font-size:1.05rem; font-weight:700; margin:1.8rem 0 0.9rem; display:flex; align-items:center; gap:0.5rem; }
.pf-bars { display:grid; gap:0.6rem; margin-bottom:1.2rem; }
.pf-bar-row { display:flex; align-items:center; gap:0.8rem; font-size:0.82rem; }
.pf-bar-row .lbl { width:120px; color:var(--text-muted); }
.pf-bar-track { flex:1; height:8px; background:var(--border); border-radius:5px; overflow:hidden; }
.pf-bar-fill { height:100%; border-radius:5px; background:linear-gradient(90deg,var(--accent),#a78bfa); }
.pf-bar-row .val { width:60px; text-align:right; color:var(--text-dim); font-size:0.76rem; }
.pf-heat { display:flex; gap:3px; overflow-x:auto; padding-bottom:0.5rem; }
.pf-week { display:flex; flex-direction:column; gap:3px; }
.pf-day { width:12px; height:12px; border-radius:3px; background:var(--border); }
.pf-day.l1 { background:rgba(34,197,94,0.35);} .pf-day.l2{background:rgba(34,197,94,0.55);} .pf-day.l3{background:rgba(34,197,94,0.75);} .pf-day.l4{background:#22c55e;}
.pf-legend { font-size:0.7rem; color:var(--text-dim); margin-top:0.5rem; display:flex; align-items:center; gap:0.4rem; }
.pf-list a { color:var(--accent); text-decoration:none; }
.pf-row { display:flex; align-items:center; gap:0.7rem; padding:0.5rem 0; border-bottom:1px solid var(--border); font-size:0.85rem; }
.pf-badge { font-weight:700; font-size:0.72rem; padding:2px 8px; border-radius:6px; min-width:92px; text-align:center; }
.pf-badge.ac { background:rgba(34,197,94,0.14); color:#22c55e;} .pf-badge.wa{background:rgba(239,68,68,0.14); color:#ef4444;}
.pf-dim { color:var(--text-dim); font-size:0.76rem; }
.pf-empty { color:var(--text-dim); padding:1rem 0; }
</style>

<script>
(function () {
  function esc(s){return String(s==null?'':s).replace(/[&<>]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;'}[c];});}
  function pretty(s){return s.replace(/-/g,' ').replace(/\b\w/g,function(c){return c.toUpperCase();});}
  var CAT = window.SC_CATALOG || {};

  function diffCounts(solved){
    var d={easy:0,medium:0,hard:0};
    solved.forEach(function(sl){var c=CAT[sl]; if(c&&d[c.difficulty]!==undefined) d[c.difficulty]++;});
    return d;
  }
  function totalByDiff(){
    var t={easy:0,medium:0,hard:0};
    Object.keys(CAT).forEach(function(sl){var df=CAT[sl].difficulty; if(t[df]!==undefined) t[df]++;});
    return t;
  }

  function sdProgress(){
    // Count completed checkboxes from users/{uid}.progress (set by firebase-auth).
    var prog = window._userProgress || {};
    var areas = { HLD:0, LLD:0, Concepts:0, 'DSA Lists':0 };
    Object.keys(prog).forEach(function(key){
      var obj = prog[key] || {};
      var count = 0;
      Object.keys(obj).forEach(function(k){ if(obj[k]) count++; });
      var kl = key.toLowerCase();
      if (kl.indexOf('hld')===0 || kl.indexOf('_hld')!==-1) areas.HLD += count;
      else if (kl.indexOf('lld')===0) areas.LLD += count;
      else if (kl.indexOf('concept')!==-1) areas.Concepts += count;
      else areas['DSA Lists'] += count;
    });
    return areas;
  }

  function render(){
    var root = document.getElementById('pf-root');
    var user = window._scUser || window._firebaseUser || null;
    var data = window._scJudge || {solved:[],subs:{}};
    var solved = data.solved || [];
    var subs = [];
    Object.keys(data.subs||{}).forEach(function(sl){(data.subs[sl]||[]).forEach(function(s){s=Object.assign({},s);s.slug=sl;subs.push(s);});});
    subs.sort(function(a,b){return b.ts-a.ts;});
    var accepted = subs.filter(function(s){return s.status==='Accepted';}).length;
    var accRate = subs.length ? Math.round(accepted/subs.length*100) : 0;
    var dc = diffCounts(solved), td = totalByDiff();
    var sd = sdProgress();
    var sdTotal = sd.HLD + sd.LLD + sd.Concepts + sd['DSA Lists'];

    var name = user ? (user.name || user.displayName || 'You') : 'Guest';
    var photo = user ? (user.photo || user.photoURL) : null;
    var avatar = photo ? '<img src="'+esc(photo)+'" alt="">' : '<div class="pf-hero-fallback">'+esc(name.charAt(0).toUpperCase())+'</div>';

    var html = '<div class="pf-hero">'+avatar+'<div><h2>'+esc(name)+'</h2><div class="sub">'+(user?esc(user.email||''):'Not signed in')+'</div></div></div>';

    if (!user) html += '<div class="pf-note">You are not signed in — this progress is stored only in this browser. <a href="/">Sign in</a> to sync it to your account across devices.</div>';

    html += '<div class="pf-grid">' +
      '<div class="pf-card"><b>'+solved.length+'</b><span>DSA Solved</span><div class="pf-diff"><span class="e">'+dc.easy+' Easy</span><span class="m">'+dc.medium+' Med</span><span class="h">'+dc.hard+' Hard</span></div></div>' +
      '<div class="pf-card"><b>'+subs.length+'</b><span>Submissions</span></div>' +
      '<div class="pf-card"><b>'+accRate+'%</b><span>Acceptance</span></div>' +
      '<div class="pf-card"><b>'+sdTotal+'</b><span>Design/Concept Items</span></div>' +
      '</div>';

    // DSA difficulty bars
    html += '<div class="pf-sec">🧩 DSA Progress</div><div class="pf-bars">';
    [['Easy','easy','#22c55e'],['Medium','medium','#eab308'],['Hard','hard','#ef4444']].forEach(function(x){
      var done=dc[x[1]], tot=td[x[1]]||0, pct=tot?Math.round(done/tot*100):0;
      html += '<div class="pf-bar-row"><span class="lbl" style="color:'+x[2]+'">'+x[0]+'</span><div class="pf-bar-track"><div class="pf-bar-fill" style="width:'+pct+'%;background:'+x[2]+'"></div></div><span class="val">'+done+' / '+tot+'</span></div>';
    });
    html += '</div>';

    // heatmap
    var byDay={}; subs.forEach(function(s){var d=new Date(s.ts);var k=d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate();byDay[k]=(byDay[k]||0)+1;});
    var today=new Date(); today.setHours(0,0,0,0);
    var start=new Date(today); start.setDate(start.getDate()-(25*7+today.getDay()));
    var cur=new Date(start), weeks=[];
    for(var w=0;w<26;w++){var col=[];for(var dd=0;dd<7;dd++){var k2=cur.getFullYear()+'-'+(cur.getMonth()+1)+'-'+cur.getDate();var c=byDay[k2]||0;var lv=c===0?'':(c>=8?'l4':c>=4?'l3':c>=2?'l2':'l1');col.push('<div class="pf-day '+lv+'" title="'+c+' on '+k2+'"></div>');cur.setDate(cur.getDate()+1);}weeks.push('<div class="pf-week">'+col.join('')+'</div>');}
    html += '<div class="pf-sec">🔥 Submission Activity</div><div class="pf-heat">'+weeks.join('')+'</div><div class="pf-legend">Less <span class="pf-day"></span><span class="pf-day l1"></span><span class="pf-day l2"></span><span class="pf-day l3"></span><span class="pf-day l4"></span> More</div>';

    // System design / LLD progress
    html += '<div class="pf-sec">🏗️ System Design &amp; LLD Progress</div>';
    if (sdTotal > 0) {
      html += '<div class="pf-bars">';
      var maxv = Math.max(sd.HLD, sd.LLD, sd.Concepts, sd['DSA Lists'], 1);
      [['HLD','HLD'],['LLD','LLD'],['Concepts','Concepts'],['DSA Lists','DSA Lists']].forEach(function(x){
        var v=sd[x[1]]; var pct=Math.round(v/maxv*100);
        html += '<div class="pf-bar-row"><span class="lbl">'+x[0]+'</span><div class="pf-bar-track"><div class="pf-bar-fill" style="width:'+pct+'%"></div></div><span class="val">'+v+'</span></div>';
      });
      html += '</div>';
    } else {
      html += '<div class="pf-empty">No design/concept items tracked yet. Tick problems off on the <a href="/hld" style="color:var(--accent)">HLD</a>, <a href="/lld" style="color:var(--accent)">LLD</a>, and <a href="/concepts" style="color:var(--accent)">Concepts</a> pages to build your progress.</div>';
    }

    // solved + recent
    html += '<div class="pf-sec">✅ Solved Problems ('+solved.length+')</div>';
    html += solved.length ? '<div class="pf-list">'+solved.map(function(sl){var t=CAT[sl]?CAT[sl].title:pretty(sl);return '<div class="pf-row"><span class="pf-badge ac">Solved</span><a href="/dsa/problem/'+sl+'">'+esc(t)+'</a></div>';}).join('')+'</div>' : '<div class="pf-empty">None yet. Start on the <a href="/problemset" style="color:var(--accent)">Problemset</a>.</div>';

    if (subs.length){
      html += '<div class="pf-sec">🕘 Recent Submissions</div><div class="pf-list">';
      html += subs.slice(0,12).map(function(s){var cls=s.status==='Accepted'?'ac':'wa';var ago=Math.floor((Date.now()-s.ts)/60000);var when=ago<60?ago+'m ago':(ago<1440?Math.floor(ago/60)+'h ago':new Date(s.ts).toLocaleDateString());var t=CAT[s.slug]?CAT[s.slug].title:pretty(s.slug);return '<div class="pf-row"><span class="pf-badge '+cls+'">'+esc(s.status)+'</span><a href="/dsa/problem/'+s.slug+'">'+esc(t)+'</a><span class="pf-dim">'+esc(s.langName||'')+' · '+when+'</span></div>';}).join('')+'</div>';
    }

    root.innerHTML = html;
  }

  function ready(fn){ if(document.readyState!=='loading') fn(); else document.addEventListener('DOMContentLoaded', fn); }
  ready(function(){
    if (window._scJudgeReady) render();
    document.addEventListener('sc-judge-ready', render);
    // _userProgress loads slightly later via firebase-auth; re-render to pick it up.
    setTimeout(render, 1800);
    setTimeout(render, 3500);
  });
})();
</script>
{% endraw %}
