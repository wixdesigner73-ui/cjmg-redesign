/* CJMG Creative — lightweight interactions. No dependencies. */
(() => {
  const d = document, root = d.documentElement;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(hover:hover) and (pointer:fine)').matches;
  const $ = (s, c = d) => c.querySelector(s);
  const $$ = (s, c = d) => [...c.querySelectorAll(s)];

  // Logo fallback: if the hotlinked logo can't load, show the wordmark.
  $$('.logo img').forEach((im) => {
    const fail = () => im.closest('.logo').classList.add('nofile');
    im.addEventListener('error', fail);
    if (im.complete && !im.naturalWidth) fail();
  });
  // Project/logo images that fail: hide quietly so the layout keeps its gray tile.
  $$('img[data-soft]').forEach((im) => im.addEventListener('error', () => (im.style.display = 'none')));

  // Sticky header: glass on scroll, tucks away on scroll-down, returns on scroll-up.
  const hdr = $('.hdr');
  let lastY = scrollY;
  const onScroll = () => {
    const y = scrollY;
    hdr.classList.toggle('stuck', y > 24);
    hdr.classList.toggle('hide', y > lastY + 4 && y > 420 && !d.body.classList.contains('menu-open'));
    if (y < lastY - 4 || y < 420) hdr.classList.remove('hide');
    lastY = y;
  };
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile menu
  const burger = $('.burger');
  burger?.addEventListener('click', () => {
    const open = d.body.classList.toggle('menu-open');
    burger.setAttribute('aria-expanded', open);
  });
  $$('.mmenu a').forEach((a) => a.addEventListener('click', () => { d.body.classList.remove('menu-open'); burger?.setAttribute('aria-expanded', 'false'); }));
  addEventListener('keydown', (e) => { if (e.key === 'Escape') d.body.classList.remove('menu-open'); });

  // Scroll reveals
  const io = new IntersectionObserver((es) => es.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  }), { threshold: 0.14, rootMargin: '0px 0px -6% 0px' });
  $$('[data-reveal],[data-mask],.stage').forEach((el) => (reduce ? el.classList.add('in') : io.observe(el)));

  // Magnetic buttons
  if (fine && !reduce) {
    $$('.btn').forEach((b) => {
      b.addEventListener('pointermove', (e) => {
        const r = b.getBoundingClientRect();
        b.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.18}px,${(e.clientY - r.top - r.height / 2) * 0.28}px)`;
      });
      b.addEventListener('pointerleave', () => (b.style.transform = ''));
    });
  }

  // Hero image reacts to the cursor
  const art = $('.hero-art');
  if (art && fine && !reduce) {
    const img = $('.hero-img', art), pic = $('img', img);
    art.addEventListener('pointermove', (e) => {
      const r = art.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
      img.style.transform = `rotateY(${x * 5}deg) rotateX(${-y * 4}deg)`;
      pic.style.transform = `translate(${x * -14}px,${y * -14}px) scale(1.04)`;
    });
    art.addEventListener('pointerleave', () => { img.style.transform = ''; pic.style.transform = ''; });
  }

  // Service card spotlight
  $$('.scard').forEach((c) => c.addEventListener('pointermove', (e) => {
    const r = c.getBoundingClientRect();
    c.style.setProperty('--mx', e.clientX - r.left + 'px');
    c.style.setProperty('--my', e.clientY - r.top + 'px');
  }));

  // Horizontal project track
  $$('[data-track]').forEach((wrap) => {
    const tr = $('.track', wrap), prev = $('[data-prev]', wrap), next = $('[data-next]', wrap);
    const step = () => (tr.querySelector('.pj')?.offsetWidth || 340) + 22;
    const upd = () => { prev.disabled = tr.scrollLeft < 4; next.disabled = tr.scrollLeft + tr.clientWidth >= tr.scrollWidth - 4; };
    prev.addEventListener('click', () => tr.scrollBy({ left: -step(), behavior: 'smooth' }));
    next.addEventListener('click', () => tr.scrollBy({ left: step(), behavior: 'smooth' }));
    tr.addEventListener('scroll', upd, { passive: true }); upd();
  });

  // Portfolio filters (re-flows the alternating editorial sizes for the visible set)
  const grid = $('#pgrid');
  if (grid) {
    const cards = $$('.pj', grid), count = $('#pcount');
    const flow = () => cards.filter((c) => !c.classList.contains('hide')).forEach((c, i) => {
      c.classList.remove('z0', 'z1', 'z2', 'z3'); c.classList.add('z' + (i % 4));
    });
    $$('.fbtn').forEach((b) => b.addEventListener('click', () => {
      $$('.fbtn').forEach((x) => x.setAttribute('aria-pressed', x === b));
      const g = b.dataset.f;
      cards.forEach((c) => c.classList.toggle('hide', g !== 'All' && c.dataset.g !== g));
      flow();
      const n = cards.filter((c) => !c.classList.contains('hide')).length;
      if (count) count.textContent = `${n} project${n === 1 ? '' : 's'}`;
    }));
  }

  // Testimonials
  $$('[data-testi]').forEach((box) => {
    const slides = $$('.tsl', box), dots = $$('.tdots button', box), marks = $$('.mark', box);
    let i = 0, timer;
    const go = (n) => {
      i = (n + slides.length) % slides.length;
      slides.forEach((s, k) => { s.classList.toggle('on', k === i); s.setAttribute('aria-hidden', k !== i); });
      dots.forEach((b, k) => b.setAttribute('aria-current', k === i));
      marks.forEach((m, k) => (m.style.opacity = k === i ? 1 : 0));
    };
    dots.forEach((b, k) => b.addEventListener('click', () => { go(k); clearInterval(timer); }));
    go(0);
    if (!reduce) timer = setInterval(() => go(i + 1), 7000);
    box.addEventListener('pointerenter', () => clearInterval(timer));
  });

  // Forms: front-end validation + success state (wire to Wix Forms in production)
  $$('form[data-form]').forEach((f) => {
    f.noValidate = true;
    f.addEventListener('submit', (e) => {
      e.preventDefault();
      let ok = true;
      $$('.fld', f).forEach((w) => {
        const el = $('input,select,textarea', w);
        if (!el || !el.required) return;
        const bad = !el.value.trim() || (el.type === 'email' && !/^\S+@\S+\.\S+$/.test(el.value));
        w.classList.toggle('bad', bad);
        if (bad && ok) { el.focus(); }
        if (bad) ok = false;
      });
      if (!ok) return;
      const box = f.closest('.formbox') || f.parentElement;
      f.hidden = true;
      $('.success', box)?.classList.add('show');
      $('.success', box)?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' });
    });
  });

  // Count-up-free year
  $$('[data-year]').forEach((n) => (n.textContent = new Date().getFullYear()));
})();
