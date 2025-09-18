document.addEventListener("DOMContentLoaded", () => {
  // ===== FOOTER YEAR =====
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  // ===== NAV HIGHLIGHTING =====
  (function navHighlight() {
    const links = Array.from(document.querySelectorAll(".site-nav .nav-link"));
    if (!links.length) return;

    const sections = Array.from(document.querySelectorAll("section[id]"));

    function setActiveByHash(hash) {
      links.forEach(a =>
        a.classList.toggle("is-active", a.getAttribute("href") === hash)
      );
    }

    // When clicking nav links, set active immediately
    links.forEach(a => {
      a.addEventListener("click", () => setActiveByHash(a.getAttribute("href")));
    });

    // On load & on hash change
    window.addEventListener("hashchange", () =>
      setActiveByHash(location.hash || "#home")
    );
    window.addEventListener("load", () =>
      setActiveByHash(location.hash || "#home")
    );

    // IntersectionObserver to update on scroll
    const io = new IntersectionObserver(
      entries => {
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const idHash = "#" + visible.target.id;
        setActiveByHash(idHash);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0.01, 0.25, 0.5, 0.75, 1] }
    );

    sections.forEach(sec => io.observe(sec));
  })();
});

  