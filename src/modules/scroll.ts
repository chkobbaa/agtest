import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** Depth parallax for any [data-parallax] element (factor as the value). */
function initParallax(): void {
  document.querySelectorAll<HTMLElement>("[data-parallax]").forEach((el) => {
    const factor = parseFloat(el.dataset.parallax || "0.2");
    gsap.to(el, {
      yPercent: factor * 100,
      ease: "none",
      scrollTrigger: {
        trigger: el.closest("section") || el,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
    });
  });
}

/** The Walker crosses the night section from the desert (right) toward the
 * city (left) as you scroll — he is literally walking the page. */
function initWalkerWalk(): void {
  const fig = document.querySelector<HTMLElement>("[data-walker-track]");
  if (!fig) return;
  const rtl = document.documentElement.dir === "rtl";
  const from = rtl ? "-50vw" : "50vw";
  const to = rtl ? "50vw" : "-80vw";
  gsap.fromTo(
    fig,
    { x: from },
    {
      x: to,
      ease: "none",
      scrollTrigger: {
        trigger: fig.closest("section")!,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
    },
  );
  // a gentle bob to suggest footsteps
  gsap.to(fig, {
    y: "-=14",
    duration: 1.1,
    ease: "sine.inOut",
    repeat: -1,
    yoyo: true,
  });
}

/** Move the side-rail lantern down the "road" with overall page progress. */
function initRoadProgress(): void {
  const lantern = document.querySelector<HTMLElement>("[data-road-lantern]");
  const road = document.querySelector<HTMLElement>("[data-road]");
  if (!lantern || !road) return;
  ScrollTrigger.create({
    start: 0,
    end: "max",
    onUpdate: (self) => {
      const h = road.clientHeight - lantern.clientHeight;
      lantern.style.transform = `translateY(${self.progress * h}px)`;
    },
  });
}

export function initScrollScenes(): void {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) return;
  initParallax();
  initWalkerWalk();
  initRoadProgress();
  // Recalculate once fonts/images settle.
  requestAnimationFrame(() => ScrollTrigger.refresh());
}
