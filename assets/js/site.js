// Shared behaviour for index.html and resume.html: theme, mobile nav, scroll reveal, scrollspy.
(() => {
  // ---- theme ----
  const root = document.documentElement;
  root.dataset.theme = localStorage.getItem('theme') || 'dark';
  const themeBtn = document.getElementById('themeToggle');
  if (themeBtn) themeBtn.onclick = () => {
    root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', root.dataset.theme);
  };

  // ---- mobile nav ----
  const links = document.getElementById('navLinks');
  const menuBtn = document.getElementById('menuToggle');
  if (links && menuBtn) {
    menuBtn.onclick = () => links.classList.toggle('open');
    links.onclick = e => { if (e.target.tagName === 'A') links.classList.remove('open'); };
  }

  // ---- scroll reveal ----
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  }), { rootMargin: '0px 0px -8% 0px' });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  // ---- scrollspy ----
  const spy = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    document.querySelectorAll('.nav-links a').forEach(a =>
      a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id));
  }), { rootMargin: '-45% 0px -50% 0px' });
  document.querySelectorAll('main section[id]').forEach(s => spy.observe(s));

  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
