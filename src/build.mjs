// Static generator for the CJMG redesign prototype.  Run:  node src/build.mjs   → writes ./site
import { mkdirSync, writeFileSync, copyFileSync, rmSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import * as D from './data.mjs';

const { needsDark } = D;
const { SITE, PROJECTS, FILTERS, FEATURED, TESTIMONIALS, AGENDA, DESIGN, SEO, LOGO, SERVICES, PROCESS, SERVICE_OPTIONS, IMG, wix } = D;
const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const BASE = process.env.BASE || ''; // e.g. /cjmg-redesign when hosted on GitHub Pages
const OUT = join(ROOT, process.env.OUT_DIR || 'site');
const NOINDEX = !!process.env.NOINDEX;
const e = (s = '') => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/* ---------- graphics ---------- */
const AR = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 12 12 4M5.5 4H12v6.5"/></svg>';
const ARL = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M13 8H3m4.5-4.5L3 8l4.5 4.5"/></svg>';
const ARR = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 8h10M8.5 3.5 13 8l-4.5 4.5"/></svg>';
const STAR = (cls = '', style = '') => `<svg class="star ${cls}" style="${style}" viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M50 5 L57 37 L85 17 L65 44 L95 50 L63 57 L83 85 L54 63 L50 95 L44 63 L14 81 L38 55 L5 48 L38 42 L17 15 L46 36 Z"/></svg>`;
const SCRIB = (cls = '', style = '') => `<svg class="scribble ${cls}" style="${style}" viewBox="0 0 80 44" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 34C18 8 44 4 68 24M56 12l14 12-17 6"/></svg>`;
const CONTOURS = (n = 30, stroke = '#fc0000', op = 0.55) => {
  let p = '';
  for (let i = 0; i < n; i++) p += `<path d="M-80 720Q${470 + i * 3} ${-640 + i * 21} 1080 ${700 + i * 3}"/>`;
  return `<svg class="contours" viewBox="0 0 1000 400" preserveAspectRatio="xMidYMid slice" fill="none" stroke="${stroke}" stroke-opacity="${op}" stroke-width="1" aria-hidden="true">${p}</svg>`;
};
const ICONS = {
  browser: '<path d="M3 5h18v14H3zM3 9h18M7 7h.01M10 7h.01"/>',
  search: '<circle cx="10.5" cy="10.5" r="6.5"/><path d="m20 20-4.8-4.8M8 12l2-2.5 1.8 1.6L14 8.5"/>',
  pen: '<path d="M4 20l3.5-1 11-11a2 2 0 0 0-3-3l-11 11zM13.5 6.5l3 3M4 20h6"/>',
  refresh: '<path d="M20 8a8 8 0 0 0-14-2L4 8M4 3v5h5M4 16a8 8 0 0 0 14 2l2-2M20 21v-5h-5"/>',
  move: '<path d="M4 8h13m-4-4 4 4-4 4M20 16H7m4-4-4 4 4 4"/>',
  sliders: '<path d="M4 7h9m4 0h3M4 17h3m4 0h9M15 4v6M9 14v6"/>',
  chat: '<path d="M4 5h16v11H9l-5 4z"/>',
};
const ico = (k) => `<span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[k]}</svg></span>`;
const btn = (label, href, cls = '') => `<a class="btn ${cls}" href="${href}">${e(label)}<span class="ic">${AR}${AR}</span></a>`;
const lines = (arr) => arr.map((t, i) => `<span class="ln"><span style="--i:${i}">${e(t).replace(/\.$/, '<i class="dot">.</i>')}</span></span>`).join('');
const label = (t) => `<span class="label">${e(t)}</span>`;

/* ---------- layout ---------- */
const LD = (o) => `<script type="application/ld+json">${JSON.stringify(o)}</script>`;
const ORG = {
  '@context': 'https://schema.org', '@type': 'ProfessionalService', name: SITE.name, url: SITE.url,
  telephone: SITE.phone, email: SITE.email, areaServed: 'US', address: { '@type': 'PostalAddress', addressLocality: SITE.place },
  description: AGENDA.lead, openingHours: 'Mo-Fr 09:00-18:00', logo: wix(IMG.logo),
};

function layout({ path, title, desc, body, ld = [], og = IMG.hero, dark = false }) {
  const url = SITE.url + path;
  const nav = D.NAV.map(([t, h]) => {
    const cur = h === path || (h !== '/' && path.startsWith(h)) ? ' aria-current="page"' : '';
    if (t === 'Services') {
      return `<li><a class="nl" href="${h}"${cur}>${t}</a><ul class="sub"><li><a href="/website-design">Website Design</a></li><li><a href="/seo-services">SEO</a></li><li><a href="/logo-design">Logo Design &amp; Branding</a></li><li><a href="/client-consultation">Client Consultation</a></li></ul></li>`;
    }
    return `<li><a class="nl" href="${h}"${cur}>${t}</a></li>`;
  }).join('');
  const logo = `<a class="logo" href="/" aria-label="${SITE.name} home"><img src="${wix(IMG.logo)}" alt="${SITE.name}" height="40"><span class="wm">CJMG.</span></a>`;
  return `<!doctype html>
<html lang="en"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${e(title)}</title><meta name="description" content="${e(desc)}">
<link rel="canonical" href="${url}">
<meta property="og:type" content="website"><meta property="og:title" content="${e(title)}"><meta property="og:description" content="${e(desc)}"><meta property="og:url" content="${url}"><meta property="og:site_name" content="${SITE.name}"><meta property="og:image" content="${wix(og, 1200, 630)}">
<meta name="twitter:card" content="summary_large_image"><meta name="theme-color" content="#000000">${NOINDEX ? '<meta name="robots" content="noindex,nofollow">' : ''}
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link rel="preconnect" href="https://static.wixstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Caveat:wght@500&display=swap">
<link rel="stylesheet" href="/assets/style.css">
<script>document.documentElement.classList.add('js')</script>
${[ORG, ...ld].map(LD).join('\n')}
</head><body>
<a class="skip" href="#main">Skip to content</a>
<header class="hdr"><div class="wrap in">
  ${logo}
  <nav aria-label="Primary"><ul class="nav">${nav}</ul></nav>
  <a class="btn hcta sm" href="/contact">Contact Us<span class="ic">${AR}${AR}</span></a>
  <button class="burger" aria-label="Menu" aria-expanded="false"><span></span></button>
</div></header>
<div class="mmenu" aria-label="Mobile menu">
  <a class="big" href="/">Home</a><a class="big" href="/about">About</a><a class="big" href="/services">Services</a>
  <div class="sm2"><a href="/website-design">Website Design</a><a href="/seo-services">SEO</a><a href="/logo-design">Logo Design &amp; Branding</a></div>
  <a class="big" href="/portfolio">Portfolio</a><a class="big" href="/contact">Contact</a>
  <div class="foot">${SITE.email}<br>${SITE.phone}<br>${SITE.hours}</div>
</div>
<main id="main">${body}</main>
${footer(logo)}
<script src="/assets/main.js" defer></script>
</body></html>`;
}

function footer(logo) {
  return `<footer class="ftr"><div class="wrap">
  <div class="g">
    <div>${logo}<p class="s">${e('Website design, strategic SEO, and impactful branding built to elevate your business.')}</p></div>
    <div><h4>Menu</h4><ul><li><a href="/">Home</a></li><li><a href="/about">About</a></li><li><a href="/services">Services</a></li><li><a href="/portfolio">Portfolio</a></li><li><a href="/contact">Contact</a></li></ul></div>
    <div><h4>Services</h4><ul><li><a href="/website-design">Website Design</a></li><li><a href="/seo-services">SEO</a></li><li><a href="/logo-design">Logo Design &amp; Branding</a></li><li><a href="/client-consultation">Client Consultation</a></li></ul></div>
    <div><h4>Contact</h4><ul><li><a href="mailto:${SITE.email}">${SITE.email}</a></li><li><a href="tel:${SITE.phoneHref}">${SITE.phone}</a></li><li class="muted">${SITE.hours}</li><li class="muted">${SITE.place}, TX</li></ul></div>
  </div>
  <div class="bot"><span>© <span data-year>2026</span> CJMG Creative. All Rights Reserved</span><span><a href="/policy">Privacy Policy</a></span></div>
</div></footer>`;
}

/* ---------- components ---------- */
function pjCard(p, extra = '') {
  const badge = p.logo ? `<span class="badge${needsDark(p.logo) ? ' on-dark' : ''}"><img src="${wix(p.logo)}" alt="${e(p.name)} logo" loading="lazy" decoding="async" data-soft></span>` : '';
  return `<a class="pj ${extra}" href="/projects/${p.slug}" data-g="${e(p.group)}">
  <div class="ph"><img class="shot" src="${wix(p.shot, 900, 760)}" alt="${e(p.name)} — ${e(p.cat)} website and branding project by CJMG Creative" loading="lazy" decoding="async" data-soft>${badge}<span class="ar">${AR}${AR}</span></div>
  <div class="meta"><h3>${e(p.name)}</h3><p class="cat"><span>${e(p.cat)}</span><i></i><span>${p.goals.join(' · ')}</span></p></div></a>`;
}

function marquee() {
  const items = PROJECTS.map((p) => (p.logo
    ? `<img class="lg${needsDark(p.logo) ? ' on-dark' : ''}" src="${wix(p.logo)}" alt="${e(p.name)}" loading="lazy" data-soft>`
    : `<span class="tx">${e(p.name)}</span>`));
  const row = items.map((x) => `${x}<span class="plus">+</span>`).join('');
  return `<section class="strip" aria-label="Clients and projects"><div class="marq"><div class="it">${row}</div><div class="it" aria-hidden="true">${row}</div></div></section>`;
}

function processSection(compact = false) {
  const pos = ['pc1', 'pc2', 'pc3', 'pc4'];
  return `<section class="section process"><div class="wrap">
  <div class="head" data-reveal>${label('How we work')}<h2 class="h2">From first consultation to launch day.</h2><p class="lede">${compact ? 'The same four stages sit behind every CJMG website project.' : 'Every website starts with a conversation and ends with you in control of your site. These are the stages in between.'}</p></div>
  <div class="stage">
    <svg class="path" viewBox="0 0 1000 1200" preserveAspectRatio="none" aria-hidden="true"><path d="M715 198C715 330 285 300 285 438C285 580 745 580 745 726C745 870 275 840 275 990C275 1090 430 1140 520 1150"/></svg>
    ${PROCESS.map((s, i) => `<article class="pcard ${pos[i]}"><span class="num">${s.n}</span><h3>${s.t}</h3><p>${e(s.d)}</p></article>`).join('')}
    <div class="deliver">${SCRIB('', 'position:absolute;left:-64px;top:-30px;width:50px;transform:rotate(-20deg)')}Ready to launch!</div>
  </div>
</div></section>`;
}

function servicesBlock(headline = 'We design meaningful digital experiences.') {
  return `<section class="section dark services"><div class="wrap">
  <div class="head"><div data-reveal>${label('What we do')}<h2 class="h2">${e(headline)}</h2></div>
  <p class="lede" data-reveal style="--d:.1s">${e(AGENDA.body)}</p></div>
  <div class="sgrid">${SERVICES.map((s, i) => `<a class="scard" href="${s.href}" data-reveal style="--d:${(i % 3) * 0.08}s"><i class="bd"></i>${ico(s.icon)}<h3>${e(s.title)}</h3><p>${e(s.text)}</p><span class="go">${AR}</span></a>`).join('')}</div>
</div></section>`;
}

function testimonials() {
  return `<section class="section testi"><div class="wrap"><div class="t-wrap" data-testi>
  <div class="arch" data-reveal>${TESTIMONIALS.map((t, i) => `<img class="mark" style="opacity:${i ? 0 : 1}" src="${wix(t.img)}" alt="${e(t.biz)} logo" loading="lazy" data-soft>`).join('')}</div>
  <div data-reveal style="--d:.1s">${label('Reviews')}<h2 class="h2" style="margin:20px 0 34px">What our clients say about working with us.</h2>
    <div class="tslides">${TESTIMONIALS.map((t) => `<figure class="tsl" data-bg="${t.bg}"><q>“${e(t.quote)}”</q><figcaption class="who">${e(t.name)}<span>${e(t.role)}, ${e(t.biz)}</span></figcaption></figure>`).join('')}</div>
    <div class="tdots" role="tablist" aria-label="Testimonials">${TESTIMONIALS.map((t, i) => `<button aria-label="Show testimonial from ${e(t.name)}" aria-current="${i === 0}"></button>`).join('')}</div>
  </div></div></div></section>`;
}

function ctaBand(h = 'Become an Envisioned Brand', p = 'At CJMG Creative, we combine creativity with strategy to help businesses look professional, attract more customers, and grow online. Let’s build something powerful together.', b = 'Free Consultation') {
  return `<section class="cta-band"><div class="wrap"><div class="cta" data-reveal>${CONTOURS(34)}${STAR('', 'left:7%;top:14%;width:48px')}${STAR('', 'right:8%;bottom:16%;width:38px;animation-direction:reverse')}<h2>${e(h)}</h2><p>${e(p)}</p>${btn(b, '/contact', 'light')}</div></div></section>`;
}

function faq(items, dark = false) {
  return `<div class="faq">${items.map(([q, a], i) => `<details${i === 0 ? ' open' : ''}><summary>${e(q)}<i></i></summary><div class="a"><p>${e(a)}</p></div></details>`).join('')}</div>`;
}

function phero({ crumbs = [], lab, h1, lede, right = '', wide = false, cls = '' }) {
  const cr = crumbs.length ? `<div class="crumbs"><a href="/">Home</a>${crumbs.map(([t, h]) => ` <span>/</span> ${h ? `<a href="${h}">${e(t)}</a>` : `<span>${e(t)}</span>`}`).join('')}</div>` : '';
  return `<section class="phero dark ${wide ? 'wide' : ''} ${cls}"><div class="grid-bg"></div>${STAR('', right ? 'left:47%;top:18%' : 'right:6%;top:24%')}<div class="wrap">
  <div class="split${right ? '' : ' solo'}"><div>${cr}${label(lab)}<h1 class="display">${lines(h1)}</h1><p class="lede" data-reveal>${e(lede)}</p></div>${right}</div></div></section>`;
}

const photo = (id, w, h, alt, cls = '') => `<div class="photo ${cls}" data-mask><img src="${wix(id, w, h)}" alt="${e(alt)}" loading="lazy" decoding="async" data-soft></div>`;

/* ---------- pages ---------- */
const pages = [];
const add = (path, o) => pages.push({ path, ...o });

// HOME
add('/', {
  title: 'CJMG Creative | Website Design, SEO & Branding in Houston',
  desc: 'CJMG Creative delivers modern website design, strategic SEO, and impactful branding built to elevate your business. Migration. Revamps. Custom designs.',
  body: `
<section class="hero dark"><div class="grid-bg"></div>${STAR('s1')}
  <div class="wrap"><div class="cols">
    <div>
      ${label('Welcome to CJMG Creative')}
      <h1 class="display">${lines(['Your brand.', 'Your way.'])}</h1>
      <p class="lede" data-reveal>${e(AGENDA.lead)}</p>
      <div class="actions">${btn('Let’s Talk', '/contact')}<a class="btn ghost" href="/portfolio">See our work<span class="ic">${AR}${AR}</span></a>${SCRIB('scr1')}</div>
    </div>
    <div class="hero-art">
      <div class="hero-img"><img src="${wix(IMG.hero, 1000, 1160)}" alt="CJMG Creative — website design, SEO and branding" fetchpriority="high" decoding="async" data-soft></div>
      <div class="hero-card"><b>Migration. Revamps.<br>Custom Designs.</b><span>Website Services &amp; SEO</span></div>
      <div class="hero-pill">Website Design · SEO · Branding</div>
    </div>
  </div></div>
  ${marquee()}
</section>

<section class="section about" id="about"><div class="wrap">
  <div class="top">
    <div data-reveal>${label('About us')}
      <h2 class="h2">CJMG Creative: websites, SEO and branding to elevate your business.${STAR('', '')}</h2>
      <p class="lede">${e(AGENDA.body)}</p><br>${btn('More about CJMG', '/about', 'ghost')}</div>
    ${photo(IMG.homeServices, 1100, 760, 'CJMG Creative website design work', 'big')}
  </div>
  <div class="mosaic">
    <div class="pattern" data-reveal>${CONTOURS(36)}
      <div class="big-t">Migration.<br>Revamps.<br>Custom Designs.<small>${e(DESIGN.short)}</small></div>
      <div class="tags">${['Website Design', 'Search Engine Optimization', 'Logo Design', 'Branding', 'Local SEO', 'Technical SEO', 'Website Management'].map((t, i) => `<span class="tag" style="--r:${[-5, 3, -3, 5, -4, 4, -2][i]}deg">${t}</span>`).join('')}</div>
    </div>
    <div class="side" data-mask><img src="${wix(IMG.designHero, 800, 760)}" alt="CJMG Creative website design in progress" loading="lazy" data-soft></div>
  </div>
</div></section>

${processSection()}
${servicesBlock()}

<section class="section"><div class="wrap" data-track>
  <div class="proj-head"><div data-reveal>${label('Portfolio')}<h2 class="h2">Explore our recent projects</h2></div>
    <div class="track-nav"><button class="circ" data-prev aria-label="Previous projects">${ARL}</button><button class="circ" data-next aria-label="Next projects">${ARR}</button></div></div>
  <div class="track">${FEATURED.map((s) => pjCard(PROJECTS.find((p) => p.slug === s))).join('')}</div>
  <div style="margin-top:20px">${btn('View All Projects', '/portfolio')}</div>
</div></section>

${testimonials()}
${ctaBand()}`,
});

// ABOUT
add('/about', {
  title: 'About CJMG Creative | Houston Website Design & Management Agency',
  desc: 'CJMG Creative is a Houston based website design and website management agency specializing in design strategy, SEO and branding.',
  body: `${phero({ crumbs: [['About']], lab: 'About CJMG Creative', h1: ['Design concepts', 'that push your', 'business forward.'], lede: AGENDA.contact, wide: true })}
<section class="section bg-gray"><div class="wrap two center">
  <div data-reveal>${label('Agency agenda')}<h2 class="h2" style="margin:20px 0">${e(AGENDA.lead)}</h2><p class="lede">${e(AGENDA.body)}</p></div>
  ${photo(IMG.homeServices, 1000, 800, 'CJMG Creative design work')}
</div></section>
<section class="section dark"><div class="wrap"><div class="two">
  <div data-reveal>${label('Our approach')}<h2 class="h2" style="margin-top:20px">Designed with purpose.</h2></div>
  <div data-reveal style="--d:.1s"><p class="lede" style="max-width:none;font-size:clamp(19px,2vw,26px);color:#e5e5e5;line-height:1.4">“${e('From layout and graphics to navigation and messaging, we design with purpose—to convert visitors into customers.')}”</p><p class="lede" style="margin-top:22px">${e(DESIGN.body)}</p></div>
</div></div></section>
<section class="section"><div class="wrap"><div class="two center">
  <div data-reveal>${label('Creative services')}<h2 class="h2" style="margin:20px 0">Websites, search visibility and brand identity.</h2><p class="lede">${e('Clean, professional websites, strong search visibility, and cohesive brand identity.')}</p><br>${btn('Explore services', '/services', 'ghost')}</div>
  <ul class="incl" data-reveal>${SERVICES.slice(0, 3).map((s) => `<li><a href="${s.href}">${e(s.title)}</a></li>`).join('')}</ul>
</div></div></section>
<section class="section bg-gray"><div class="wrap two center"><div data-reveal>${label('Agency credentials')}<h2 class="h2" style="margin-top:20px">Our Wix Partner credentials.</h2></div><div class="cred" data-reveal>${IMG.credentials.map((c) => `<img src="${wix(c)}" alt="Wix Partner badge" loading="lazy" data-soft>`).join('')}</div></div></section>
${processSection(true)}
${ctaBand()}`,
});

// SERVICES OVERVIEW
add('/services', {
  title: 'Services | Website Design, SEO & Branding | CJMG Creative',
  desc: 'Website design, search engine optimization, logo design and branding, revamps, migration and website management from CJMG Creative.',
  body: `${phero({ crumbs: [['Services']], lab: 'Services', h1: ['Built to elevate', 'your business.'], lede: AGENDA.lead, wide: true })}
<section class="section" style="padding-top:20px"><div class="wrap">
  ${SERVICES.map((s, i) => `<a class="srow" href="${s.href}" data-reveal><span class="n">0${i + 1}</span><h3>${e(s.title)}</h3><p>${e(s.text)}</p><span class="circ">${AR}</span></a>`).join('')}
</div></section>
<section class="section bg-gray"><div class="wrap two"><div data-reveal>${label('Website process')}<h2 class="h2" style="margin:20px 0">What’s included in the website process.</h2></div>
  <ul class="checks" data-reveal>${DESIGN.process.map((c) => `<li>${e(c)}</li>`).join('')}</ul></div></section>
${processSection(true)}
${ctaBand('Get a quote', 'Tell us about your project and we’ll get back to you. Website design, SEO, branding and more.', 'Free Consultation')}`,
});

// WEBSITE DESIGN
add('/website-design', {
  title: 'Website Design in Houston | Custom, Mobile-Optimized Sites | CJMG',
  desc: 'Professional, user-friendly websites tailored to your brand: custom layout and design, mobile-optimized pages, fast loading, clean navigation and optional content updates.',
  ld: [{ '@context': 'https://schema.org', '@type': 'Service', name: 'Website Design', provider: { '@type': 'ProfessionalService', name: SITE.name }, areaServed: 'US', description: DESIGN.body }, { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: DESIGN.faqs.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) }],
  body: `${phero({ crumbs: [['Services', '/services'], ['Website Design']], lab: 'Website Design', h1: ['The face of', 'your business.'], lede: `${DESIGN.quote} ${DESIGN.short}`, right: `<div class="photo" data-mask style="aspect-ratio:1.05">${''}<img src="${wix(IMG.designHero, 900, 860)}" alt="Website design by CJMG Creative" loading="lazy" data-soft></div>` })}
<section class="section bg-gray"><div class="wrap two">
  <div data-reveal>${label('Website services')}<h2 class="h2" style="margin:20px 0">${e(DESIGN.question)}</h2><p class="lede">${e(DESIGN.body)}</p><p class="lede" style="margin-top:16px">${e(DESIGN.body2)}</p></div>
  <div data-reveal style="--d:.1s"><h3 class="h3" style="margin-bottom:20px">Website design inclusions</h3><ul class="incl">${DESIGN.inclusions.map((x) => `<li>${e(x)}</li>`).join('')}</ul></div>
</div></section>
<section class="section" id="revamps"><div class="wrap two center">
  <div data-reveal>${label('Revamps & migration')}<h2 class="h2" style="margin:20px 0">Migration. Revamps. Custom Designs.</h2><p class="lede">${e('Whether you’re launching something new or refreshing your current image, our focus is simple—create visuals that capture attention and strategies that drive growth.')}</p><br>${btn('Talk to us about your site', '/contact', 'ghost')}</div>
  <div data-reveal><h3 class="h3" style="margin-bottom:18px">What’s included in the website process</h3><ul class="checks">${DESIGN.process.map((c) => `<li>${e(c)}</li>`).join('')}</ul></div>
</div></section>
<section class="section bg-gray"><div class="wrap" data-track>
  <div class="proj-head"><div data-reveal>${label('Examples')}<h2 class="h2">Recent website projects</h2></div><div class="track-nav"><button class="circ" data-prev aria-label="Previous">${ARL}</button><button class="circ" data-next aria-label="Next">${ARR}</button></div></div>
  <div class="track">${PROJECTS.slice(4, 12).map((p) => pjCard(p)).join('')}</div>
  <div style="margin-top:20px">${btn('View All Projects', '/portfolio')}</div>
</div></section>
<section class="section dark"><div class="wrap two"><div data-reveal>${label('Website design facts')}<h2 class="h2" style="margin-top:20px">Your questions, answered.</h2></div>${faq(DESIGN.faqs)}</div></section>
${ctaBand('Get a quote', 'Professional, user-friendly websites tailored to your brand. Tell us about your project.', 'Get A Quote')}`,
});

// SEO
add('/seo-services', {
  title: 'SEO Services in Houston | Local & National Visibility | CJMG Creative',
  desc: 'Keyword research, on-page SEO, technical SEO, content optimization and local SEO (Google Business Profile). Increase visibility and attract the right audience.',
  ld: [{ '@context': 'https://schema.org', '@type': 'Service', name: 'Search Engine Optimization', provider: { '@type': 'ProfessionalService', name: SITE.name }, areaServed: 'US', description: SEO.body }, { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: SEO.faqs.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) }],
  body: `${phero({ crumbs: [['Services', '/services'], ['SEO']], lab: 'Search Engine Optimization', h1: ['Increase visibility.', 'Attract the right', 'audience.'], lede: SEO.body, wide: true, cls: 'seo' })}
<section class="section bg-gray"><div class="wrap two center">
  <div data-reveal>${label('SEO')}<h2 class="h2" style="margin:20px 0">${e(SEO.question)}</h2><p class="lede">${e(SEO.answer)}</p></div>
  <div class="pattern" data-reveal style="min-height:300px">${CONTOURS(32)}<div class="big-t">3–6 months<small>${e('Most businesses begin seeing noticeable improvements within 3–6 months, depending on competition, website history, and how aggressive the strategy is.')}</small></div></div>
</div></section>
<section class="section"><div class="wrap"><div class="proj-head" data-reveal>${label('SEO inclusions')}<p class="lede">${e(SEO.body2)}</p></div>
  <div class="cards3">${SEO.inclusions.map(([t, d], i) => `<div class="card" data-reveal style="--d:${(i % 3) * 0.08}s">${ico(['search', 'browser', 'sliders', 'pen', 'move'][i])}<h3>${e(t)}</h3><p>${e(d)}</p></div>`).join('')}
  <div class="card" style="background:var(--black);color:#fff;display:flex;flex-direction:column;justify-content:space-between;gap:24px" data-reveal><h3 style="margin:0">Ready to be found?</h3>${btn('Get SEO Consultation', '/contact', 'light')}</div></div>
</div></section>
<section class="section dark"><div class="wrap two"><div data-reveal>${label('SEO FAQ')}<h2 class="h2" style="margin-top:20px">Honest answers about SEO.</h2></div>${faq(SEO.faqs)}</div></section>
${ctaBand('Get SEO consultation', 'A website alone doesn’t mean customers will find you. Let’s make sure your site ranks for what your customers search.', 'Get SEO Consultation')}`,
});

// LOGO DESIGN
add('/logo-design', {
  title: 'Logo Design & Branding | Brand Identity, Guidelines & Files | CJMG',
  desc: 'Logo design and branding from CJMG: brand identity, brand guidelines, main logo and submark, HEX color palette and files in PNG, PDF, SVG and AI.',
  body: `${phero({ crumbs: [['Services', '/services'], ['Logo Design']], lab: 'Logo Design & Branding', h1: ['Check the work.', 'Check the process.', 'Check the facts.', 'Contact. Done.'], lede: 'Brand identity, brand guidelines and logo files delivered ready for print and screen.', wide: true })}
<section class="section bg-gray"><div class="wrap two"><div data-reveal>${label('Logo branding details')}<h2 class="h2" style="margin-top:20px">Everything in a brand package.</h2></div>
  <ul class="incl" data-reveal>${LOGO.details.map((x) => `<li>${e(x)}</li>`).join('')}</ul></div></section>
<section class="section"><div class="wrap">
  ${LOGO.groups.map(([t, ids]) => `<h3 class="logos-h">${e(t)}</h3><div class="logos">${ids.map((id, i) => `<figure class="${needsDark(id) ? 'on-dark' : ''}" data-reveal style="--d:${(i % 6) * 0.05}s"><img src="${wix(id)}" alt="${e(t)} sample ${i + 1}" loading="lazy" decoding="async" data-soft></figure>`).join('')}</div>`).join('')}
</div></section>
${ctaBand('Let’s build your brand', 'Check the work. Check the process. Check the facts. Contact. Done.', 'Free Consultation')}`,
});

// PORTFOLIO
add('/portfolio', {
  title: 'Portfolio | Website Design & Branding Projects | CJMG Creative',
  desc: 'Browse CJMG Creative’s website design and branding projects across health care, beauty, food, home services, creative businesses and more.',
  body: `${phero({ crumbs: [['Portfolio']], lab: 'Portfolio', h1: ['Our work.'], lede: 'Branding and website development for businesses across Houston and beyond. Tap a project to see the details.', wide: true })}
<section class="section" style="padding-top:10px"><div class="wrap">
  <div class="filters" role="group" aria-label="Filter projects">${FILTERS.map((f, i) => `<button class="fbtn" data-f="${e(f)}" aria-pressed="${i === 0}">${e(f)}</button>`).join('')}</div>
  <p class="count" id="pcount">${PROJECTS.length} projects</p>
  <div class="pgrid" id="pgrid">${PROJECTS.map((p, i) => pjCard(p, 'z' + (i % 4))).join('')}</div>
</div></section>
${ctaBand()}`,
});

// PROJECT DETAIL
PROJECTS.forEach((p, i) => {
  const prev = PROJECTS[(i - 1 + PROJECTS.length) % PROJECTS.length], next = PROJECTS[(i + 1) % PROJECTS.length];
  const more = [1, 2, 3].map((k) => PROJECTS[(i + k) % PROJECTS.length]);
  add(`/projects/${p.slug}`, {
    title: (`${p.name} | ${p.cat} Website & Branding | CJMG`.length <= 65 ? `${p.name} | ${p.cat} Website & Branding | CJMG` : `${p.name} | Website & Branding | CJMG`),
    desc: `${p.name} (${p.cat}): branding and website development project by CJMG Creative.`,
    og: p.shot,
    ld: [{ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [['Home', '/'], ['Portfolio', '/portfolio'], [p.name, `/projects/${p.slug}`]].map(([n, u], k) => ({ '@type': 'ListItem', position: k + 1, name: n, item: SITE.url + u })) }],
    body: `<section class="phero dark"><div class="grid-bg"></div>${STAR('', 'right:5%;top:20%')}<div class="wrap"><div class="pd-hero">
  <div><div class="crumbs"><a href="/">Home</a> <span>/</span> <a href="/portfolio">Portfolio</a> <span>/</span> <span>${e(p.name)}</span></div>${label(p.cat)}<h1 class="display" style="font-size:clamp(40px,6vw,78px);text-transform:none">${lines([p.name])}</h1>
  <p class="lede" data-reveal>${e(`Branding and website development for ${p.name} — a CJMG Creative project in ${p.cat.toLowerCase()}.`)}</p>
  ${p.url ? `<div style="margin-top:28px">${btn('Visit live site', p.url, 'ghost').replace('<a ', '<a target="_blank" rel="noopener" ')}</div>` : ''}</div>
  <div class="pd-img" data-mask><img src="${wix(p.shot, 1200, 920)}" alt="${e(p.name)} website and branding project" fetchpriority="high" data-soft></div>
</div></div></section>
<section class="section" style="padding-top:0"><div class="wrap"><dl class="dl">
  <div><dt>Client</dt><dd>${e(p.name)}</dd></div><div><dt>Industry</dt><dd>${e(p.cat)}</dd></div><div><dt>Project goals</dt><dd>${p.goals.join('<br>')}</dd></div></dl></div></section>
<section class="section bg-gray"><div class="wrap two center">
  <div data-reveal>${label('Project gallery')}<h2 class="h2" style="margin:20px 0">${e(p.name)}</h2><p class="lede">${e(`Branding and website development for ${p.name}.`)}</p></div>
  ${p.logo ? `<div class="photo" data-mask style="background:${needsDark(p.logo) ? '#000' : '#fff'};aspect-ratio:1.4;display:grid;place-items:center;padding:40px"><img src="${wix(p.logo)}" alt="${e(p.name)} logo" style="width:auto;height:auto;max-width:70%;max-height:80%;object-fit:contain" loading="lazy" data-soft></div>` : `<div class="photo" data-mask style="aspect-ratio:1.4"><img src="${wix(p.shot, 1000, 700)}" alt="${e(p.name)} project preview" loading="lazy" data-soft></div>`}
</div></section>
<section class="section"><div class="wrap"><nav class="pn" aria-label="Projects"><a href="/projects/${prev.slug}"><small>← Previous project</small><b>${e(prev.name)}</b></a><a href="/projects/${next.slug}"><small>Next project →</small><b>${e(next.name)}</b></a></nav>
  <h3 class="h3" style="margin:64px 0 24px">More projects</h3><div class="pgrid three">${more.map((m) => pjCard(m, 'z-x')).join('')}</div></div></section>
${ctaBand('Become an Envisioned Brand', 'Like what you see? Let’s build something powerful together.', 'Free Consultation')}`,
  });
});

// CONTACT
const fld = (id, lab, type = 'text', req = true, ph = '') => `<div class="fld"><label for="${id}">${lab}${req ? ' *' : ''}</label><input id="${id}" name="${id}" type="${type}"${req ? ' required' : ''} placeholder="${ph}" autocomplete="${{ fn: 'given-name', ln: 'family-name', email: 'email', phone: 'tel' }[id] || 'off'}"><span class="err">Please enter a valid ${lab.toLowerCase()}.</span></div>`;
add('/contact', {
  title: 'Contact CJMG Creative | Get a Quote | Houston, TX',
  desc: `Contact CJMG Creative: ${SITE.email}, ${SITE.phone}. Hours ${SITE.hours}. A Houston based website design and website management agency.`,
  body: `<section class="phero dark"><div class="grid-bg"></div>${STAR('', 'right:7%;top:22%')}<div class="wrap">
  <div class="split"><div>${label('Contact us')}<h1 class="display">${lines(['Let’s build', 'something', 'powerful.'])}</h1><p class="lede" data-reveal>${e(AGENDA.contact)}</p></div>
  <div class="cinfo" data-reveal><a href="mailto:${SITE.email}"><small>Email</small>${SITE.email}</a><a href="tel:${SITE.phoneHref}"><small>Phone</small>${SITE.phone}</a><div><small>Hours</small>${SITE.hours}</div></div></div></div></section>
<section class="section" style="padding-top:10px"><div class="wrap"><div class="formbox" id="form" data-reveal>
  <form class="form" data-form>
    ${fld('fn', 'First Name')}${fld('ln', 'Last Name')}${fld('email', 'Email', 'email')}${fld('phone', 'Phone', 'tel')}
    <div class="fld full"><label for="svc">Select Service *</label><select id="svc" name="svc" required><option value="">Services</option>${SERVICE_OPTIONS.map((o) => `<option>${e(o)}</option>`).join('')}</select><span class="err">Please select a service.</span></div>
    <div class="full" style="display:flex;gap:18px;align-items:center;flex-wrap:wrap"><button class="btn" type="submit">Submit<span class="ic">${AR}${AR}</span></button><span class="muted" style="font-size:14px">Starting a website project? <a href="/client-consultation" style="text-decoration:underline">Use the project consultation form</a>.</span></div>
  </form>
  <div class="success" role="status"><div class="tick"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg></div><h3>Thank you. We’ve got your message.</h3><p class="muted">We’ll be in touch during business hours (${SITE.hours}).</p></div>
</div></div></section>`,
});

// CLIENT CONSULTATION
const ta = (id, lab) => `<div class="fld full"><label for="${id}">${lab}</label><textarea id="${id}" name="${id}"></textarea></div>`;
const yn = (n, q, note = '') => `<div class="fld full"><label>${q}</label><div class="radios"><label><input type="radio" name="${n}" value="Yes"> Yes</label><label><input type="radio" name="${n}" value="No"> No</label></div>${note ? `<p class="hint">${note}</p>` : ''}</div>`;
add('/client-consultation', {
  title: 'Project Consultation Form | Logo Design & Website Management | CJMG',
  desc: 'Tell CJMG Creative about your website project: brand colors, mission, functionality, timeline and maintenance needs.',
  body: `${phero({ crumbs: [['Client Consultation']], lab: 'Logo Design & Website Management', h1: ['Project', 'consultation.'], lede: 'Share the details of your project so we can plan your website, branding and SEO.' })}
<section class="section" style="padding-top:10px"><div class="wrap"><div class="formbox" data-reveal>
  <form class="form" data-form>
    ${fld('fn', 'First name')}${fld('ln', 'Last name')}${fld('phone', 'Phone')}${fld('email', 'Email', 'email')}
    ${fld('company', 'Company name', 'text', false)}${fld('addr', 'Address', 'text', false)}${fld('domain', 'Domain Name', 'text', false)}
    ${yn('maint', 'Upon completion, will you need monthly website maintenance?')}
    <div class="fld"><label for="start">Website Project Start Date</label><input id="start" type="date"></div><div class="fld"><label for="end">Website Project Projected Completion Date</label><input id="end" type="date"></div>
    <div class="fld full"><label for="logo">Upload Logo Design</label><input id="logo" type="file"></div>
    ${ta('colors', 'Brand Colors or Codes')}${ta('mission', 'Business Mission Statement')}${ta('views', 'Overall views and plans for your website and brand.')}${ta('list', 'Business Service or Product List')}${ta('func', 'Explain or list any specific functionalities that the website should have (forms, store, portfolio, video implementation, sign up forms.)')}${ta('feat', 'Featured Product or Service Name')}${ta('pay', 'List Forms of Payment')}
    ${yn('seo', 'Do you need SEO services added to your website?', 'No extra charge for standard SEO profile with website project.')}
    <div class="fld full"><label>Preferred Project Communication Contact Time</label><div class="radios"><label><input type="radio" name="time" value="Morning"> Morning</label><label><input type="radio" name="time" value="Evening"> Evening</label></div></div>
    <div class="fld full"><label for="sig">Signature (type your full name)</label><input id="sig" type="text" autocomplete="off"></div>
    <div class="full"><button class="btn" type="submit">Submit<span class="ic">${AR}${AR}</span></button></div>
  </form>
  <div class="success" role="status"><div class="tick"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg></div><h3>Consultation request received.</h3><p class="muted">Thank you. We’ll review your project details and reach out.</p></div>
</div></div></section>`,
});

// POLICY
add('/policy', {
  title: 'Privacy Policy | CJMG Creative',
  desc: 'CJMG Creative privacy policy: how we collect, use, and share data. We do not share or sell consumer or customer information.',
  body: `${phero({ crumbs: [['Privacy Policy']], lab: 'Last Modified 9/20/24', h1: ['Privacy', 'Policy'], lede: 'How CJMG collects, uses, and shares data.' })}
<section class="section" style="padding-top:0"><div class="wrap prose">
<p>${e('This privacy policy (this “Privacy Policy”) describes how we collect, use, and share data that we obtain through your use of the Internet sites, applications, and online services (the “Site”) operated by, controlled by, or affiliated with CJMG, and certain subsidiaries, affiliates, and entities that it controls, including CJMG  (collectively, “CJMG,” “we,” “us,” or “our”). We do not share or sell consumer or customer information for personal or professional gain.')}</p>
<p>${e('By using the Site, you agree to the practices described in this Privacy Policy and any updates posted here from time to time. To make sure you stay informed of all changes, you should check this Privacy Policy periodically. Updates will be referenced by the “Last Modified” date shown above.')}</p>
<p>Questions? <a href="mailto:${SITE.email}" style="text-decoration:underline">${SITE.email}</a> · ${SITE.phone}</p></div></section>`,
});

const notFound = {
  path: '/404.html', file: '404.html', title: 'Page not found | CJMG Creative', desc: 'This page could not be found.',
  body: `<section class="nf dark"><div class="wrap"><h1 class="display">${lines(['404', 'Lost page.'])}</h1><p class="lede" style="margin:24px auto 32px">The page you’re looking for has moved or doesn’t exist.</p>${btn('Back home', '/')}</div></section>`,
};

/* ---------- write ---------- */
rmSync(OUT, { recursive: true, force: true });
mkdirSync(join(OUT, 'assets'), { recursive: true });
for (const f of ['style.css', 'main.js']) copyFileSync(join(ROOT, 'src/assets', f), join(OUT, 'assets', f));
const rebase = (t) => (BASE ? t.replace(/(href|src)="\/(?!\/)/g, `$1="${BASE}/`) : t);
const write = (rel, txt) => { const f = join(OUT, rel); mkdirSync(dirname(f), { recursive: true }); writeFileSync(f, rel.endsWith('.html') ? rebase(txt) : txt); };

[...pages, notFound].forEach((pg) => {
  write(pg.file || join(pg.path, 'index.html'), layout(pg));
});

const urls = pages.map((p) => SITE.url + p.path);
write('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((u) => `<url><loc>${u}</loc></url>`).join('\n')}\n</urlset>\n`);
write('robots.txt', NOINDEX ? 'User-agent: *\nDisallow: /\n' : `User-agent: *\nAllow: /\nSitemap: ${SITE.url}/sitemap.xml\n`);
write('_redirects', `# Legacy URL → new URL (301). In Wix: Marketing & SEO → SEO tools → URL redirect manager.\n/copy-of-website-design  /seo-services  301\n/logodesign  /logo-design  301\n`);
console.log(`built ${pages.length + 1} pages → ${OUT}`);
