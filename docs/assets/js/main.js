(() => {
  'use strict';

  const root = document.documentElement;
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---------- theme toggle ----------
  const themeBtn = document.getElementById('theme-toggle');
  const systemDark = matchMedia('(prefers-color-scheme: dark)');
  const currentTheme = () => root.dataset.theme || (systemDark.matches ? 'dark' : 'light');
  const syncThemeLabel = () =>
    themeBtn.setAttribute('aria-label', currentTheme() === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
  themeBtn.addEventListener('click', () => {
    const next = currentTheme() === 'dark' ? 'light' : 'dark';
    root.dataset.theme = next;
    try { localStorage.setItem('theme', next); } catch (e) { /* storage unavailable */ }
    syncThemeLabel();
  });
  syncThemeLabel();

  // ---------- mobile menu ----------
  const nav = document.getElementById('site-nav');
  const menuBtn = document.getElementById('menu-toggle');
  const setMenu = (open) => {
    nav.classList.toggle('open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  };
  menuBtn.addEventListener('click', () => setMenu(!nav.classList.contains('open')));
  nav.addEventListener('click', (e) => { if (e.target.closest('a')) setMenu(false); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });

  // ---------- active section in nav ----------
  const navLinks = [...nav.querySelectorAll('a[href^="#"]')];
  const sections = navLinks.map((a) => document.querySelector(a.getAttribute('href'))).filter(Boolean);
  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((a) => a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id));
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  sections.forEach((s) => navObserver.observe(s));

  // ---------- reveal on scroll ----------
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('in');
      revealObserver.unobserve(entry.target);
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

  // ---------- integration map: live log + hover ----------
  const log = document.getElementById('log');
  const ambient = [
    ['sync', 'Salesforce → HCM · accounts & contacts'],
    ['auth', 'SAML assertion validated · IdP → app'],
    ['etl', 'payroll batch validated · 0 errors'],
    ['report', 'client_earnings.sql → PostgreSQL'],
    ['migrate', 'legacy payroll history validated'],
    ['adopt', 'in-app guide published · targeted segment'],
  ];
  const time = () => new Date().toLocaleTimeString('en-US', { hour12: false });
  const pushLog = (kind, msg, highlight) => {
    const line = document.createElement('div');
    const t = document.createElement('span'); t.className = 't'; t.textContent = time();
    const k = document.createElement('span'); k.className = highlight ? 'hi' : 'ok'; k.textContent = ` ✓ ${kind} `;
    line.append(t, k, document.createTextNode(msg));
    log.appendChild(line);
    while (log.children.length > 5) log.firstChild.remove();
  };
  let i = 0;
  const tick = () => { const [k, m] = ambient[i++ % ambient.length]; pushLog(k, m); };
  for (let n = 0; n < 5; n++) tick();
  if (!reduceMotion) setInterval(tick, 1800);

  const edges = document.querySelectorAll('.edge');
  document.querySelectorAll('.node[data-node]').forEach((node) => {
    const id = node.dataset.node;
    const [kind, msg] = node.dataset.log.split('|');
    const on = () => {
      node.classList.add('on');
      edges.forEach((e) => e.classList.toggle('on', e.dataset.node === id));
      pushLog(kind, msg, true);
    };
    const off = () => { node.classList.remove('on'); edges.forEach((e) => e.classList.remove('on')); };
    node.addEventListener('pointerenter', on);
    node.addEventListener('pointerleave', off);
  });

  // ---------- email (assembled at runtime to keep it away from scrapers) ----------
  document.querySelectorAll('.js-email').forEach((a) => {
    a.href = `mailto:${a.dataset.u}@${a.dataset.d}`;
  });

  // ---------- footer year ----------
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
