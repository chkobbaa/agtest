// Preloader: a quick count from 00 → 100 with a filling rule, then the curtain
// lifts. Returns a promise so the boot sequence can refresh scroll triggers
// once the page is interactive.

export function runLoader(): Promise<void> {
  return new Promise((resolve) => {
    const loader = document.querySelector<HTMLElement>("[data-loader]");
    const count = document.querySelector<HTMLElement>("[data-loader-count]");
    const bar = document.querySelector<HTMLElement>("[data-loader-bar]");
    const finish = () => {
      document.documentElement.classList.remove("is-loading");
      loader?.classList.add("is-done");
      setTimeout(resolve, 200);
    };

    if (!loader || !count || !bar) {
      finish();
      return;
    }

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dur = reduce ? 350 : 1500;
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
        setTimeout(finish, 220);
      }
    };
    requestAnimationFrame(tick);
  });
}
