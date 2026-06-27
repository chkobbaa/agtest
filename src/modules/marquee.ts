import { MARQUEE } from "../content/copy";
import { getLang } from "./i18n";

// An endless typographic marquee mixing Latin + Arabic phrases. Pure transform
// animation; respects direction and reduced-motion.

export function initMarquee(): void {
  const host = document.querySelector<HTMLElement>("[data-marquee]");
  if (!host) return;
  const speed = parseFloat(host.dataset.speed || "1") * 0.04;
  let track: HTMLElement;
  let offset = 0;
  let half = 0;
  let raf = 0;

  function build() {
    const lang = getLang();
    const items = MARQUEE.map((m) => `<span class="marquee__item">${m[lang] || m.en}</span>`).join("");
    host!.innerHTML = `<div class="marquee__track">${items}${items}${items}${items}</div>`;
    track = host!.querySelector(".marquee__track")!;
    requestAnimationFrame(() => {
      half = track.scrollWidth / 2;
      offset = 0;
    });
  }

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function loop() {
    raf = requestAnimationFrame(loop);
    if (!half) return;
    const dir = document.documentElement.dir === "rtl" ? -1 : 1;
    offset += speed * dir;
    if (offset >= half) offset -= half;
    if (offset <= -half) offset += half;
    track.style.transform = `translateX(${-offset}px)`;
  }

  build();
  if (!reduce) raf = requestAnimationFrame(loop);
  window.addEventListener("digl:langchange", () => build());
  window.addEventListener("beforeunload", () => cancelAnimationFrame(raf));
}
