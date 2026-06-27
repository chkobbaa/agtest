import { DROPS } from "../content/catalog";
import { getLang } from "./i18n";

// Render the four drop capsules. Each card carries its own weather: its
// signature colour, name in Latin + Arabic, and a body that opens on hover.

export function initDrops(): void {
  const host = document.querySelector<HTMLElement>("[data-drops]");
  if (!host) return;

  function render() {
    const lang = getLang();
    host!.innerHTML = DROPS.map((d, i) => {
      return `
      <article class="drop-card" style="background:${d.color};color:${d.ink}" data-cursor-hover>
        <div class="drop-card__noise"></div>
        <span class="drop-card__status">${d.status[lang] || d.status.en}</span>
        <span class="drop-card__index">DROP_0${i + 1}</span>
        <div>
          <h3 class="drop-card__big">${d.code}</h3>
          <span class="drop-card__ar">${d.arabic}</span>
          <p class="drop-card__line">${d.line[lang] || d.line.en}</p>
          <p class="drop-card__body">${d.body[lang] || d.body.en}</p>
        </div>
      </article>`;
    }).join("");
  }

  render();
  window.addEventListener("digl:langchange", render);
}
