document.addEventListener("DOMContentLoaded", () => {
    // footer year
    const y = document.getElementById("year");
    if (y) y.textContent = new Date().getFullYear();
  
// ===== THEME TOGGLE SWITCH =====
(function themeSwitch(){
  const STORAGE_KEY = 'jp.theme';
  const root = document.documentElement;
  const checkbox = document.getElementById('theme-checkbox');
  if (!checkbox) return;

  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const stored = localStorage.getItem(STORAGE_KEY);
  const initial = stored || (prefersDark ? 'dark' : 'light');

  function apply(theme){
    root.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY, theme);
    checkbox.checked = (theme === 'dark');
  }

  apply(initial);

  checkbox.addEventListener('change', () => {
    const next = checkbox.checked ? 'dark' : 'light';
    apply(next);
  });
})();



// ===== NAV HIGHLIGHTING (robust) =====
(function navHighlight(){
  const links = Array.from(document.querySelectorAll('.site-nav .nav-link'));
  if (!links.length) return;

  // map href -> link
  const byHash = (hash) => links.find(a => a.getAttribute('href') === hash);

  // sections by id (works with or without <main>)
  const sections = Array.from(document.querySelectorAll('section[id]'));

  function setActiveByHash(hash){
    links.forEach(a => a.classList.toggle('is-active', a.getAttribute('href') === hash));
  }

  // When you click a nav link, set active immediately
  links.forEach(a => {
    a.addEventListener('click', () => setActiveByHash(a.getAttribute('href')));
  });

  // On load & on hash change (e.g., when landing on /#projects)
  window.addEventListener('hashchange', () => setActiveByHash(location.hash || '#home'));
  window.addEventListener('load', () => setActiveByHash(location.hash || '#home'));

  // IntersectionObserver to update as you scroll
  const io = new IntersectionObserver((entries) => {
    // pick the entry with the highest intersection ratio that is intersecting
    const visible = entries
      .filter(e => e.isIntersecting)
      .sort((a,b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (!visible) return;
    const idHash = '#' + visible.target.id;
    setActiveByHash(idHash);
  }, { rootMargin: '-45% 0px -50% 0px', threshold: [0.01, 0.25, 0.5, 0.75, 1] });

  sections.forEach(sec => io.observe(sec));
})();

  });
  