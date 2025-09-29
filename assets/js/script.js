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

    const ENDPOINT = "https://wqmdsdxon4.execute-api.us-east-1.amazonaws.com/contact";

    const form = document.getElementById("contact-form");
    const statusEl = document.getElementById("contact-status");
    const submitBtn = document.getElementById("contact-submit");

    
  })();

  const ENDPOINT = "https://wqmdsdxon4.execute-api.us-east-1.amazonaws.com/contact";

  const form = document.getElementById("contact-form");
  const statusEl = document.getElementById("contact-status");
  const submitBtn = document.getElementById("contact-submit");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    console.log("contact submit fired"); // debug: verify JS is running

    // Honeypot: if filled (bots or autofill), silently succeed
    if (form.website.value) {
      console.log("honeypot tripped, skipping send");
      statusEl.textContent = "Thanks!";
      form.reset();
      return;
    }

    const payload = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      message: form.message.value.trim()
    };

    if (!payload.name || !payload.email || !payload.message) {
      statusEl.textContent = "Please fill out all fields.";
      return;
    }

    submitBtn.disabled = true;
    statusEl.textContent = "Sending...";

    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        statusEl.textContent = "Thanks! Your message was sent.";
        form.reset();
      } else {
        statusEl.textContent = data.message || "Failed to send. Please try again.";
      }
    } catch (err) {
      console.error(err);
      statusEl.textContent = "Network error. Please try again.";
    } finally {
      submitBtn.disabled = false;
    }
  });
});

  