// Preloader: a quick count from 00 → 100 with a filling rule, then the curtain
// lifts. Returns a promise so the boot sequence can refresh scroll triggers
// once the page is interactive.
//
// It runs only on the visitor's first arrival (tracked in localStorage). On
// every later visit the curtain is removed instantly. The whole intro is capped
// well under ~2s so it never feels like a wall.

const SEEN_KEY = "digl-loaded";

export function runLoader(): Promise<void> {
  return new Promise((resolve) => {
    const loader = document.querySelector<HTMLElement>("[data-loader]");
    const count = document.querySelector<HTMLElement>("[data-loader-count]");
    const bar = document.querySelector<HTMLElement>("[data-loader-bar]");

    const finish = (instant = false) => {
      document.documentElement.classList.remove("is-loading");
      loader?.classList.add("is-done");
      try {
        localStorage.setItem(SEEN_KEY, "1");
      } catch {
        /* storage may be unavailable (private mode) — just play the loader */
      }
      setTimeout(resolve, instant ? 0 : 200);
    };

    let seen = false;
    try {
      seen = localStorage.getItem(SEEN_KEY) === "1";
    } catch {
      seen = false;
    }

    // Returning visitor, missing nodes, or reduced motion → no intro.
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (seen || reduce || !loader || !count || !bar) {
      // Hide instantly without the fade so there's no flash on return visits.
      loader?.classList.add("loader--instant");
      finish(true);
      return;
    }

    // First visit: count up, capped so the total intro stays under ~2s.
    const dur = 1500;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - p, 2);
      const n = Math.round(eased * 100);
      count.textContent = String(n).padStart(2, "0");
      bar.style.width = `${eased * 100}%`;
      if (p < 1) {
        requestAnimationFrame(tick);
      } else {
        setTimeout(() => finish(), 180);
      }
    };
    requestAnimationFrame(tick);
  });
}
