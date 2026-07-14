---
layout: default
title: "Software Engineer Salaries in India — by Level & Company (SDE-1/2/3)"
description: "Explore estimated total-compensation bands for 120+ tech companies in India by level — SDE-1, SDE-2, SDE-3 — with an interactive, filterable table you can sort, filter by location, and track."
permalink: /target-companies/
hide_author: true
hide_toc: true
---

<div class="tc-bg"></div>
<div class="tc-hero">
  <span class="tc-hero-badge">India · 2026</span>
  <h1>Software Engineer <em>Salaries</em> in India</h1>
  <p>Estimated total-compensation bands across <strong>120+ companies</strong>, broken down by level. Filter by location and category, sort by pay, and track where you're applying.</p>
  <div class="tc-stats">
    <div class="tc-stat"><strong>120+</strong><span>Companies</span></div>
    <div class="tc-stat"><strong>8</strong><span>Categories</span></div>
    <div class="tc-stat"><strong>3</strong><span>Levels</span></div>
    <div class="tc-stat"><strong>₹6L–1.6Cr</strong><span>Range</span></div>
  </div>
</div>

<div class="tc-levels">
  <a class="tc-level lvl1" href="/target-companies/sde-1/">
    <div class="tc-level-top"><span class="tc-badge">SDE-1</span><span class="tc-yrs">~0–2 yrs</span></div>
    <div class="tc-range">≈ 20–55 LPA</div>
    <div class="tc-desc">Entry level. New grads and early-career engineers.</div>
    <span class="tc-go">Explore SDE-1 →</span>
  </a>
  <a class="tc-level lvl2" href="/target-companies/sde-2/">
    <div class="tc-level-top"><span class="tc-badge">SDE-2</span><span class="tc-yrs">~2–5 yrs</span></div>
    <div class="tc-range">≈ 35–110 LPA</div>
    <div class="tc-desc">Mid level. The most common switch band.</div>
    <span class="tc-go">Explore SDE-2 →</span>
  </a>
  <a class="tc-level lvl3" href="/target-companies/sde-3/">
    <div class="tc-level-top"><span class="tc-badge">SDE-3</span><span class="tc-yrs">~5–8+ yrs</span></div>
    <div class="tc-range">≈ 50–160 LPA</div>
    <div class="tc-desc">Senior / Staff. Deep scope and impact.</div>
    <span class="tc-go">Explore SDE-3 →</span>
  </a>
</div>

<div class="tc-features">
  <div class="tc-feat"><b>Filter</b> by location, category (FAANG · Product · Fintech · HFT · GCC · Enterprise · Startup · Services) and minimum comp.</div>
  <div class="tc-feat"><b>Sort</b> any column — find the highest-paying companies for your level instantly.</div>
  <div class="tc-feat"><b>Track</b> your applications with a Status dropdown and Comment per company. Sign in to sync across devices.</div>
</div>

<p class="tc-note">Figures are approximate total compensation (base + stock + bonus) in INR LPA for India, aggregated from public sources (Levels.fyi, AmbitionBox, Glassdoor). Estimates, not offers — always confirm with the recruiter. Last compiled 2026.</p>

<style>
.breadcrumbs { display: none !important; }
.tc-bg { position: fixed; top: 0; left: 0; right: 0; height: 640px; background: radial-gradient(var(--dot, rgba(129,140,248,0.09)) 1px, transparent 1.5px) 0 0 / 24px 24px, radial-gradient(ellipse 80% 50% at 50% -20%, rgba(99,102,241,0.14), transparent); -webkit-mask-image: linear-gradient(to bottom, #000 0%, #000 30%, transparent 95%); mask-image: linear-gradient(to bottom, #000 0%, #000 30%, transparent 95%); pointer-events: none; z-index: 0; }
[data-theme="light"] .tc-bg { --dot: rgba(79,70,229,0.07); }
.tc-hero, .tc-levels, .tc-features, .tc-note { position: relative; z-index: 1; }
.tc-hero { text-align: center; padding: 1.5rem 0 1rem; }
.tc-hero-badge { display: inline-block; font-size: 0.72rem; font-weight: 700; letter-spacing: 0.5px; text-transform: uppercase; color: var(--accent); background: var(--tag-bg); border: 1px solid var(--tag-border); padding: 0.25rem 0.7rem; border-radius: 20px; margin-bottom: 0.8rem; }
.tc-hero h1 { font-size: 2.4rem; margin: 0 0 0.6rem; font-weight: 800; letter-spacing: -0.5px; }
.tc-hero h1 em { font-style: normal; background: linear-gradient(135deg, var(--accent), #a78bfa, #f472b6, var(--accent)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
.tc-hero p { color: var(--text-muted); max-width: 620px; margin: 0 auto; line-height: 1.6; }
.tc-stats { display: flex; flex-wrap: wrap; justify-content: center; gap: 1.5rem; margin-top: 1.3rem; }
.tc-stat strong { display: block; font-size: 1.4rem; font-weight: 800; color: var(--accent); line-height: 1.1; }
.tc-stat span { font-size: 0.72rem; color: var(--text-dim); text-transform: uppercase; letter-spacing: 0.4px; }
.tc-levels { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1rem; margin: 2rem 0 1.5rem; }
.tc-level { display: flex; flex-direction: column; gap: 0.5rem; padding: 1.4rem; border: 1px solid var(--border); border-radius: 16px; background: var(--card-bg); text-decoration: none; color: var(--text); position: relative; overflow: hidden; transition: border-color 0.2s, transform 0.2s, box-shadow 0.2s; }
.tc-level::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; }
.tc-level.lvl1::before { background: #22c55e; } .tc-level.lvl2::before { background: #eab308; } .tc-level.lvl3::before { background: #ef4444; }
.tc-level:hover { transform: translateY(-4px); border-color: var(--accent); box-shadow: 0 16px 40px rgba(129,140,248,0.14); }
.tc-level-top { display: flex; align-items: center; justify-content: space-between; }
.tc-badge { font-size: 1.15rem; font-weight: 800; }
.tc-yrs { font-size: 0.75rem; color: var(--text-dim); }
.tc-range { font-size: 1.05rem; font-weight: 700; color: var(--accent); }
.tc-desc { font-size: 0.84rem; color: var(--text-muted); line-height: 1.45; flex: 1; }
.tc-go { font-size: 0.85rem; font-weight: 600; color: var(--accent); margin-top: 0.3rem; }
.tc-features { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 0.8rem; margin: 1.5rem 0; }
.tc-feat { font-size: 0.86rem; color: var(--text-muted); line-height: 1.5; background: var(--card-bg); border: 1px solid var(--border); border-radius: 12px; padding: 0.9rem 1.1rem; }
.tc-feat b { color: var(--text); }
.tc-note { font-size: 0.75rem; color: var(--text-dim); line-height: 1.55; margin-top: 1.5rem; }
</style>
