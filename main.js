// Mobile nav toggle
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", () => {
      const open = links.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  // Rotating hero verb (home page)
  const verbEl = document.querySelector("[data-rotating-verb]");
  if (verbEl) {
    const words = JSON.parse(verbEl.getAttribute("data-rotating-verb"));
    let i = 0;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!prefersReduced) {
      setInterval(() => {
        i = (i + 1) % words.length;
        verbEl.textContent = words[i];
      }, 2200);
    }
  }

  // Process rail active-stage tracking (case study pages)
  const railLinks = document.querySelectorAll(".process-rail a");
  const sections = Array.from(railLinks)
    .map((a) => document.querySelector(a.getAttribute("href")))
    .filter(Boolean);

  if (railLinks.length && sections.length) {
    const setActive = (id) => {
      railLinks.forEach((a) => {
        a.classList.toggle("is-active", a.getAttribute("href") === `#${id}`);
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 }
    );

    sections.forEach((s) => observer.observe(s));
  }
});
