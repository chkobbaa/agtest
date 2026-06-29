// Scroll-driven reveals, number counters, "night" theme detection and active
// nav tracking — all on IntersectionObserver so they stay robust when the
// language toggle rewrites text content.

function initReveals(): void {
  const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
  // stagger siblings that reveal together
  els.forEach((el) => {
    const sibs = Array.from(el.parentElement?.querySelectorAll(":scope > [data-reveal]") ?? []);
    const idx = sibs.indexOf(el);
    if (idx > 0) el.style.transitionDelay = `${Math.min(idx, 6) * 90}ms`;
  });

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("is-in");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.18, rootMargin: "0px 0px -8% 0px" },
  );
  els.forEach((el) => io.observe(el));
}

function initCounters(): void {
  const els = document.querySelectorAll<HTMLElement>("[data-count]");
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const el = e.target as HTMLElement;
        io.unobserve(el);
        const target = Number(el.dataset.count || "0");
        const suffix = el.dataset.suffix || "";
        if (reduce) {
          el.textContent = `${target}${suffix}`;
          return;
        }
        const dur = 1400;
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min(1, (now - start) / dur);
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent = `${Math.round(target * eased)}${suffix}`;
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      });
    },
    { threshold: 0.6 },
  );
  els.forEach((el) => io.observe(el));
}

/** Toggle a body flag while a night section dominates the viewport (drives the
 * lantern-cursor bloom) and theme the nav appropriately. */
function initNightTheme(): void {
  const nights = document.querySelectorAll<HTMLElement>('[data-theme="night"]');
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.intersectionRatio > 0.5) {
          document.body.classList.add("is-night-active");
        }
      });
      // if no night section is majority-visible, clear the flag
      const anyNight = Array.from(nights).some((n) => {
        const r = n.getBoundingClientRect();
        const vh = window.innerHeight;
        const visible = Math.min(r.bottom, vh) - Math.max(r.top, 0);
        return visible > vh * 0.5;
      });
      document.body.classList.toggle("is-night-active", anyNight);
    },
    { threshold: [0, 0.5, 1] },
  );
  nights.forEach((n) => io.observe(n));
}

function initActiveNav(): void {
  const links = Array.from(document.querySelectorAll<HTMLAnchorElement>(".nav__links a"));
  // Section links (home page) keyed by their target id.
  const sectionMap = new Map<string, HTMLAnchorElement>();
  // Route links (#/shop, #/team) keyed by their route name.
  const routeMap = new Map<string, HTMLAnchorElement>();
  links.forEach((l) => {
    const href = l.getAttribute("href") || "";
    if (href.startsWith("#/")) routeMap.set(href.slice(2), l);
    else if (href.startsWith("#")) sectionMap.set(href.slice(1), l);
  });

  const clearAll = () => links.forEach((l) => l.classList.remove("is-active"));

  // Highlight the route link when on a routed page (shop/team/checkout).
  const syncRoute = () => {
    const route = document.body.dataset.route || "home";
    if (route !== "home") {
      clearAll();
      routeMap.get(route)?.classList.add("is-active");
    }
  };
  window.addEventListener("hashchange", () => requestAnimationFrame(syncRoute));
  syncRoute();

  // On the home page, the active section drives the highlight.
  const sections = document.querySelectorAll<HTMLElement>('main[data-page="home"] section[id]');
  const io = new IntersectionObserver(
    (entries) => {
      if ((document.body.dataset.route || "home") !== "home") return;
      entries.forEach((e) => {
        if (e.intersectionRatio > 0.5) {
          clearAll();
          sectionMap.get((e.target as HTMLElement).id)?.classList.add("is-active");
        }
      });
    },
    { threshold: 0.5 },
  );
  sections.forEach((s) => io.observe(s));
}

export function initRevealSystem(): void {
  initReveals();
  initCounters();
  initNightTheme();
  initActiveNav();
}
