import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

let lenis: Lenis | null = null;

export function getLenis(): Lenis | null {
  return lenis;
}

/** Smooth, weighted scrolling synced to GSAP's ScrollTrigger + the RAF loop. */
export function initSmoothScroll(): void {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) return;

  lenis = new Lenis({
    duration: 1.15,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    wheelMultiplier: 0.9,
    touchMultiplier: 1.4,
  });

  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => lenis!.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  // Intercept same-page anchor clicks for buttery scrolling.
  document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href")!;
      if (id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      lenis!.scrollTo(target as HTMLElement, { offset: -10 });
      document.querySelector("[data-nav]")?.classList.remove("is-open");
    });
  });
}
