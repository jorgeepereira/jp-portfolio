document.addEventListener("DOMContentLoaded", () => {
    // footer year
    const y = document.getElementById("year");
    if (y) y.textContent = new Date().getFullYear();
  
    // active nav highlighting
    const path = location.pathname.split("/").pop() || "index.html";
    const map = { "index.html": "home", "projects.html": "projects", "about.html": "about" };
    const key = map[path] || "home";
    const link = document.querySelector(`a[data-nav="${key}"]`);
    if (link) { link.classList.add("is-active"); link.setAttribute("aria-current", "page"); }
  
    // theme toggle
    const root = document.documentElement;
    const btn = document.getElementById("theme-toggle");
  
    function setTheme(mode) {
      root.setAttribute("data-theme", mode);
      try { localStorage.setItem("theme", mode); } catch (e) {}
      if (btn) btn.setAttribute("aria-pressed", String(mode === "dark"));
    }
  
    // initialize aria state based on current attribute
    if (btn) btn.setAttribute("aria-pressed", String(root.getAttribute("data-theme") === "dark"));
  
    // button click toggles theme
    if (btn) {
      btn.addEventListener("click", () => {
        const current = root.getAttribute("data-theme") === "dark" ? "dark" : "light";
        setTheme(current === "dark" ? "light" : "dark");
      });
    }
  
    // if user hasn't chosen a theme yet, follow system changes live
    try {
      const saved = localStorage.getItem("theme"); // if null, follow system
      if (!saved) {
        const mq = window.matchMedia("(prefers-color-scheme: dark)");
        mq.addEventListener("change", (e) => setTheme(e.matches ? "dark" : "light"));
      }
    } catch (e) {}
  });
  