---
layout: default
title: "My Profile - Progress Dashboard"
description: "Your SystemCraft dashboard: DSA problems solved by difficulty, streaks, submission heatmap, language breakdown, and High-Level & Low-Level Design progress."
permalink: /profile
hide_toc: true
---

{% include sc-catalog.html %}

{% raw %}
<div id="pf-root" class="pf-root"><div class="pf-loading"><div class="pf-loading-pulse"></div><span>Loading your dashboard…</span></div></div>

<style>
.pf-root { max-width: 100%; }
.pf-loading { display:flex; flex-direction:column; align-items:center; justify-content:center; padding:4rem 1rem; gap:1rem; }
.pf-loading span { font-size:0.88rem; color:var(--text-muted); }
.pf-loading-pulse { width:48px; height:48px; border-radius:50%; background:linear-gradient(135deg,var(--accent),#a78bfa); animation:pf-pulse 1.2s ease-in-out infinite; }
@keyframes pf-pulse { 0%,100%{transform:scale(0.85);opacity:0.5;} 50%{transform:scale(1.1);opacity:1;} }
.pf-hero { display:flex; align-items:center; gap:1rem; margin:0.4rem 0 1.4rem; }
.pf-hero img { width:60px; height:60px; border-radius:50%; border:2px solid var(--border); }
.pf-hero-fallback { width:60px; height:60px; border-radius:50%; background:linear-gradient(135deg,var(--accent),#a78bfa); display:flex; align-items:center; justify-content:center; font-size:1.5rem; font-weight:800; color:#fff; }
.pf-hero h2 { font-size:1.35rem; margin:0; }
.pf-hero .sub { font-size:0.82rem; color:var(--text-dim); }
.pf-note { font-size:0.82rem; color:var(--text-muted); background:rgba(129,140,248,0.08); border:1px solid var(--border); border-radius:10px; padding:0.7rem 0.9rem; margin:0.5rem 0 1.4rem; }
.pf-note a { color:var(--accent); font-weight:600; }

/* top dashboard: donut + tiles */
.pf-top { display:grid; grid-template-columns:1.1fr 1fr; gap:1rem; margin-bottom:1.4rem; }
@media (max-width:720px){ .pf-top { grid-template-columns:1fr; } }
.pf-panel { background:var(--bg-card,rgba(25,25,35,0.55)); border:1px solid var(--border); border-radius:16px; padding:1.1rem 1.25rem; }
.pf-donut-wrap { display:flex; align-items:center; gap:1.2rem; }
.pf-donut { position:relative; width:128px; height:128px; flex-shrink:0; }
.pf-donut-center { position:absolute; inset:0; display:flex; flex-direction:column; align-items:center; justify-content:center; }
.pf-donut-center b { font-size:1.7rem; font-weight:800; line-height:1; }
.pf-donut-center span { font-size:0.68rem; color:var(--text-dim); margin-top:2px; }
.pf-dstats { flex:1; display:flex; flex-direction:column; gap:0.55rem; }
.pf-dstat { }
.pf-dstat .top { display:flex; justify-content:space-between; font-size:0.76rem; margin-bottom:3px; }
.pf-dstat .top .name { font-weight:600; }
.pf-dstat .top .num { color:var(--text-dim); }
.pf-dstat .trk { height:6px; background:var(--border); border-radius:4px; overflow:hidden; }
.pf-dstat .fl { height:100%; border-radius:4px; }
.pf-tiles { display:grid; grid-template-columns:1fr 1fr; gap:0.8rem; }
.pf-tile { background:var(--bg-card,rgba(25,25,35,0.55)); border:1px solid var(--border); border-radius:14px; padding:0.9rem 1rem; display:flex; flex-direction:column; justify-content:center; }
.pf-tile b { font-size:1.55rem; font-weight:800; line-height:1.05; }
.pf-tile span { font-size:0.72rem; color:var(--text-dim); margin-top:2px; }
.pf-tile .em { font-size:1rem; margin-bottom:0.15rem; }

.pf-sec { font-size:1.05rem; font-weight:700; margin:1.9rem 0 0.9rem; display:flex; align-items:center; gap:0.5rem; }
.pf-streakline { font-size:0.8rem; color:var(--text-muted); margin:-0.4rem 0 0.8rem; }
.pf-streakline b { color:#f59e0b; }

.pf-heat-card { background:var(--bg-card,rgba(25,25,35,0.55)); border:1px solid var(--border); border-radius:16px; padding:1.1rem 1.25rem; margin-bottom:1.2rem; }
.pf-heat { display:flex; gap:8px; width:max-content; }
.pf-mgroup { display:flex; gap:2px; }
.pf-week { display:flex; flex-direction:column; gap:2px; }
.pf-day { width:10px; height:10px; border-radius:2px; background:var(--border); }
.pf-day.l1{background:#9be9a8;} .pf-day.l2{background:#40c463;} .pf-day.l3{background:#30a14e;} .pf-day.l4{background:#216e39;}
[data-theme="dark"] .pf-day.l1{background:#0e4429;} [data-theme="dark"] .pf-day.l2{background:#006d32;} [data-theme="dark"] .pf-day.l3{background:#26a641;} [data-theme="dark"] .pf-day.l4{background:#39d353;}
.pf-heat-scroll { overflow-x:auto; padding-bottom:0.2rem; }
.pf-heat-head { display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.5rem; font-size:0.85rem; color:var(--text-muted); margin-bottom:0.8rem; }
.pf-heat-head b { color:var(--text); font-weight:700; }
.pf-heat-title b { font-size:1.05rem; }
.pf-info { display:inline-flex; width:15px; height:15px; align-items:center; justify-content:center; border-radius:50%; border:1px solid var(--text-dim); color:var(--text-dim); font-size:0.62rem; font-style:normal; font-weight:700; cursor:help; vertical-align:middle; margin-left:2px; }
.pf-heat-stats { display:inline-flex; align-items:center; gap:1rem; flex-wrap:wrap; }
.pf-year-pill { display:inline-flex; align-items:center; gap:0.35rem; font-size:0.76rem; color:var(--text); background:var(--glass,rgba(255,255,255,0.04)); border:1px solid var(--border); border-radius:8px; padding:0.3rem 0.7rem; }
.pf-months { display:flex; gap:8px; font-size:0.66rem; color:var(--text-dim); margin-top:6px; width:max-content; }
.pf-mon { display:inline-block; text-align:left; overflow:visible; white-space:nowrap; flex-shrink:0; }
.pf-day.fut { background:transparent; }
.pf-day.blank { background:transparent; }

.pf-bars { display:grid; gap:0.6rem; margin-bottom:1.2rem; }
.pf-bar-row { display:flex; align-items:center; gap:0.8rem; font-size:0.82rem; }
.pf-bar-row .lbl { width:110px; color:var(--text-muted); }
.pf-bar-track { flex:1; height:8px; background:var(--border); border-radius:5px; overflow:hidden; }
.pf-bar-fill { height:100%; border-radius:5px; background:linear-gradient(90deg,var(--accent),#a78bfa); }
.pf-bar-row .val { width:56px; text-align:right; color:var(--text-dim); font-size:0.76rem; }

.pf-list a { color:var(--accent); text-decoration:none; }
.pf-row { display:flex; align-items:center; gap:0.7rem; padding:0.5rem 0; border-bottom:1px solid var(--border); font-size:0.85rem; }
.pf-badge { font-weight:700; font-size:0.72rem; padding:2px 8px; border-radius:6px; min-width:88px; text-align:center; }
.pf-badge.ac{background:rgba(34,197,94,0.14); color:#22c55e;} .pf-badge.wa{background:rgba(239,68,68,0.14); color:#ef4444;}
.pf-dim { color:var(--text-dim); font-size:0.76rem; margin-left:auto; }
.pf-empty { color:var(--text-dim); padding:1rem 0; }
.pf-chips { display:flex; flex-wrap:wrap; gap:0.4rem; }
.pf-chip { font-size:0.76rem; background:rgba(129,140,248,0.1); border:1px solid var(--border); border-radius:20px; padding:0.28rem 0.7rem; }
.pf-chip.done a { color:#22c55e; } .pf-chip a { color:var(--text); text-decoration:none; }
.pf-more { background:none; border:1px solid var(--border); color:var(--text-muted); border-radius:8px; padding:0.35rem 0.8rem; font-size:0.75rem; cursor:pointer; margin-top:0.6rem; }
</style>

<script>
(function () {
  function esc(s){return String(s==null?'':s).replace(/[&<>]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;'}[c];});}
  function pretty(s){return s.replace(/-/g,' ').replace(/\b\w/g,function(c){return c.toUpperCase();});}
  var CAT = window.SC_CATALOG || {};
  var MON = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

  function diffCounts(solved){ var d={easy:0,medium:0,hard:0}; solved.forEach(function(sl){var c=CAT[sl]; if(c&&d[c.difficulty]!==undefined) d[c.difficulty]++;}); return d; }
  function totalByDiff(){ var t={easy:0,medium:0,hard:0}; Object.keys(CAT).forEach(function(sl){var df=CAT[sl].difficulty; if(t[df]!==undefined) t[df]++;}); return t; }

  function dayKey(d){ return d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate(); }
  function streaks(byDay){
    var days=Object.keys(byDay); if(!days.length) return {cur:0,max:0};
    var set={}; days.forEach(function(k){set[k]=1;});
    var ts=days.map(function(k){var p=k.split('-');return new Date(+p[0],+p[1]-1,+p[2]).getTime();}).sort(function(a,b){return a-b;});
    var max=1,run=1;
    for(var i=1;i<ts.length;i++){ var gap=ts[i]-ts[i-1]; if(gap===86400000){run++;if(run>max)max=run;} else if(gap>0){run=1;} }
    var cur=0,d=new Date(); d.setHours(0,0,0,0);
    if(!set[dayKey(d)]) d.setDate(d.getDate()-1);
    while(set[dayKey(d)]){cur++; d.setDate(d.getDate()-1);}
    return {cur:cur,max:max};
  }

  function donut(dc,td,solvedAll,totalAll){
    var r=52,C=2*Math.PI*r,cum=0,arcs='';
    [['easy','#22c55e'],['medium','#eab308'],['hard','#ef4444']].forEach(function(x){
      var seg=(totalAll?dc[x[0]]/totalAll:0)*C;
      if(seg>0.5){ var draw=Math.max(seg-3,1); arcs+='<circle cx="64" cy="64" r="'+r+'" fill="none" stroke="'+x[1]+'" stroke-width="11" stroke-linecap="round" stroke-dasharray="'+draw+' '+(C-draw)+'" stroke-dashoffset="'+(-cum)+'" transform="rotate(-90 64 64)"/>'; }
      cum+=seg;
    });
    return '<div class="pf-donut"><svg width="128" height="128" viewBox="0 0 128 128"><circle cx="64" cy="64" r="52" fill="none" stroke="var(--border)" stroke-width="11"/>'+arcs+'</svg>'+
      '<div class="pf-donut-center"><b>'+solvedAll+'</b><span>/ '+totalAll+' solved</span></div></div>';
  }

  function render(){
    var root=document.getElementById('pf-root');
    var user=window._scUser||window._firebaseUser||null;
    // Bind to the same signed-in identity (dp) the header uses: fall back to
    // the cached auth photo/name so the profile hero shows instantly while
    // Firebase restores the session async.
    if(!user){ try{ var _c=JSON.parse(localStorage.getItem('authCache')||'null'); if(_c&&(_c.photoURL||_c.displayName)) user={name:_c.displayName,photo:_c.photoURL,email:null}; }catch(e){} }
    var data=window._scJudge||{solved:[],subs:{}};
    var solved=data.solved||[];
    var subs=[]; Object.keys(data.subs||{}).forEach(function(sl){(data.subs[sl]||[]).forEach(function(s){s=Object.assign({},s);s.slug=sl;subs.push(s);});});
    subs.sort(function(a,b){return b.ts-a.ts;});
    var accepted=subs.filter(function(s){return s.status==='Accepted';}).length;
    var accRate=subs.length?Math.round(accepted/subs.length*100):0;
    var dc=diffCounts(solved), td=totalByDiff();
    var totalAll=(td.easy+td.medium+td.hard)||1, solvedAll=dc.easy+dc.medium+dc.hard;
    var byDay={}; subs.forEach(function(s){byDay[dayKey(new Date(s.ts))]=(byDay[dayKey(new Date(s.ts))]||0)+1;});
    var sk=streaks(byDay);
    var name=user?(user.name||user.displayName||'You'):'Guest';
    var photo=user?(user.photo||user.photoURL):null;
    var avatar=photo?'<img src="'+esc(photo)+'" alt="" referrerpolicy="no-referrer">':'<div class="pf-hero-fallback">'+esc(name.charAt(0).toUpperCase())+'</div>';

    var html='<div class="pf-hero">'+avatar+'<div><h2>'+esc(name)+'</h2><div class="sub">'+(user?esc(user.email||'Signed in'):'Not signed in · saved in this browser')+'</div></div></div>';
    if(!user) html+='<div class="pf-note">You are not signed in — progress is stored only in this browser. <a href="/">Sign in</a> to sync across devices.</div>';

    // top: donut + difficulty stats | tiles
    var dstats='';
    [['Easy','easy','#22c55e'],['Medium','medium','#eab308'],['Hard','hard','#ef4444']].forEach(function(x){
      var done=dc[x[1]],tot=td[x[1]]||0,pct=tot?Math.round(done/tot*100):0;
      dstats+='<div class="pf-dstat"><div class="top"><span class="name" style="color:'+x[2]+'">'+x[0]+'</span><span class="num">'+done+' / '+tot+'</span></div><div class="trk"><div class="fl" style="width:'+pct+'%;background:'+x[2]+'"></div></div></div>';
    });
    html+='<div class="pf-top">'+
      '<div class="pf-panel pf-donut-wrap">'+donut(dc,td,solvedAll,totalAll)+'<div class="pf-dstats">'+dstats+'</div></div>'+
      '<div class="pf-tiles">'+
        '<div class="pf-tile"><b>'+sk.cur+'</b><span>Day streak</span></div>'+
        '<div class="pf-tile"><b>'+sk.max+'</b><span>Longest streak</span></div>'+
        '<div class="pf-tile"><b>'+subs.length+'</b><span>Submissions</span></div>'+
        '<div class="pf-tile"><b>'+accRate+'%</b><span>Acceptance</span></div>'+
      '</div>'+
    '</div>';

    // heatmap — LeetCode style: one block per month, columns are that month's
    // weeks. Day 1 sits at its own weekday row, with blank cells above it, so
    // every block is a self-contained set of week-columns (Sun..Sat, 7 rows).
    var today=new Date(); today.setHours(0,0,0,0);
    var yearAgo=new Date(today); yearAgo.setDate(yearAgo.getDate()-365);
    var yearSubs=0, activeDays=0;
    var mIter=new Date(today.getFullYear(), today.getMonth()-12, 1);
    var blocks=[], monthLabels=[];
    while(mIter<=today){
      var yy=mIter.getFullYear(), mo=mIter.getMonth();
      var daysInMonth=new Date(yy, mo+1, 0).getDate();
      var firstDow=new Date(yy, mo, 1).getDay();
      var cols=[], col=[];
      for(var b=0;b<firstDow;b++) col.push(null);      // blanks before the 1st
      for(var d=1; d<=daysInMonth; d++){
        col.push(new Date(yy, mo, d));
        if(col.length===7){ cols.push(col); col=[]; }
      }
      if(col.length){ while(col.length<7) col.push(null); cols.push(col); }
      var colHtml=cols.map(function(c){
        return '<div class="pf-week">'+c.map(function(dt){
          if(!dt) return '<div class="pf-day blank"></div>';
          if(dt>today) return '<div class="pf-day fut"></div>';
          var k2=dayKey(dt), cnt=byDay[k2]||0;
          if(dt>=yearAgo && cnt>0){ yearSubs+=cnt; activeDays++; }
          var lv=cnt===0?'':(cnt>=8?'l4':cnt>=4?'l3':cnt>=2?'l2':'l1');
          return '<div class="pf-day '+lv+'" title="'+cnt+' submission'+(cnt===1?'':'s')+' on '+k2+'"></div>';
        }).join('')+'</div>';
      }).join('');
      blocks.push('<div class="pf-mgroup">'+colHtml+'</div>');
      monthLabels.push('<span class="pf-mon" style="width:'+(cols.length*12-2)+'px">'+MON[mo]+'</span>');
      mIter.setMonth(mIter.getMonth()+1);
    }
    var gridHtml=blocks.join('');
    var monthRow=monthLabels.join('');

    html+='<div class="pf-sec">Submission Activity</div>';
    html+='<div class="pf-heat-card">';
    html+='<div class="pf-heat-head">'+
      '<span class="pf-heat-title"><b>'+yearSubs+'</b> submission'+(yearSubs===1?'':'s')+' in the past one year <i class="pf-info" title="Accepted and failed submissions across all problems in the last 12 months">i</i></span>'+
      '<span class="pf-heat-stats"><span>Total active days: <b>'+activeDays+'</b></span><span>Max streak: <b>'+sk.max+'</b></span><span class="pf-year-pill">Current &#9662;</span></span>'+
    '</div>';
    html+='<div class="pf-heat-scroll"><div class="pf-heat">'+gridHtml+'</div><div class="pf-months">'+monthRow+'</div></div>';
    html+='</div>';

    // languages
    var langCount={}; subs.forEach(function(s){var l=s.langName||s.lang||'Unknown'; langCount[l]=(langCount[l]||0)+1;});
    var langs=Object.keys(langCount).sort(function(a,b){return langCount[b]-langCount[a];});
    if(langs.length){
      var maxL=langCount[langs[0]];
      html+='<div class="pf-sec">Languages Used</div><div class="pf-bars">';
      langs.forEach(function(l){ var v=langCount[l], pct=Math.round(v/maxL*100); html+='<div class="pf-bar-row"><span class="lbl">'+esc(l)+'</span><div class="pf-bar-track"><div class="pf-bar-fill" style="width:'+pct+'%"></div></div><span class="val">'+v+'</span></div>'; });
      html+='</div>';
    }

    // topics solved (LeetCode-style skills breakdown)
    var topicCount={}; solved.forEach(function(sl){ var c=CAT[sl]; if(c&&c.topics) c.topics.forEach(function(t){ topicCount[t]=(topicCount[t]||0)+1; }); });
    var topics=Object.keys(topicCount).sort(function(a,b){return topicCount[b]-topicCount[a];});
    if(topics.length){
      var maxT=topicCount[topics[0]];
      html+='<div class="pf-sec">Topics Solved</div><div class="pf-bars">';
      topics.slice(0,12).forEach(function(t){ var v=topicCount[t], pct=Math.round(v/maxT*100); html+='<div class="pf-bar-row"><span class="lbl" title="'+esc(t)+'">'+esc(t)+'</span><div class="pf-bar-track"><div class="pf-bar-fill" style="width:'+pct+'%"></div></div><span class="val">'+v+'</span></div>'; });
      html+='</div>';
    }

    // recent submissions
    if(subs.length){
      html+='<div class="pf-sec">🕘 Recent Submissions</div><div class="pf-list">';
      html+=subs.slice(0,12).map(function(s){ var cls=s.status==='Accepted'?'ac':'wa'; var ago=Math.floor((Date.now()-s.ts)/60000); var when=ago<60?ago+'m ago':(ago<1440?Math.floor(ago/60)+'h ago':new Date(s.ts).toLocaleDateString()); var t=CAT[s.slug]?CAT[s.slug].title:pretty(s.slug); return '<div class="pf-row"><span class="pf-badge '+cls+'">'+esc(s.status)+'</span><a href="/dsa/problem/'+s.slug+'">'+esc(t)+'</a><span class="pf-dim">'+esc(s.langName||'')+' · '+when+'</span></div>'; }).join('')+'</div>';
    }

    // solved chips
    html+='<div class="pf-sec">✅ Solved Problems ('+solved.length+')</div>';
    if(solved.length){
      var chips=solved.map(function(sl){var t=CAT[sl]?CAT[sl].title:pretty(sl);return '<span class="pf-chip done">✓ <a href="/dsa/problem/'+sl+'">'+esc(t)+'</a></span>';});
      html+='<div class="pf-chips" id="pf-solved">'+chips.slice(0,40).join('')+'</div>';
      if(chips.length>40) html+='<button class="pf-more" id="pf-more">Show all '+chips.length+'</button>';
    } else html+='<div class="pf-empty">None yet. Start on the <a href="/problemset" style="color:var(--accent)">Problemset</a>.</div>';

    root.innerHTML=html;
    var mb=document.getElementById('pf-more');
    if(mb) mb.addEventListener('click',function(){ document.getElementById('pf-solved').innerHTML=solved.map(function(sl){var t=CAT[sl]?CAT[sl].title:pretty(sl);return '<span class="pf-chip done">✓ <a href="/dsa/problem/'+sl+'">'+esc(t)+'</a></span>';}).join(''); mb.remove(); });
  }

  function ready(fn){ if(document.readyState!=='loading') fn(); else document.addEventListener('DOMContentLoaded', fn); }
  ready(function(){
    if (window._scJudgeReady) render();
    document.addEventListener('sc-judge-ready', render);
    setTimeout(render, 1800);
    setTimeout(render, 3500);
  });
})();
</script>
{% endraw %}
