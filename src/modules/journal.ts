import { JOURNAL } from "../content/catalog";
import { getLang } from "./i18n";

// Render the lore dispatches as an editorial index.
export function initJournal(): void {
  const host = document.querySelector<HTMLElement>("[data-journal]");
  if (!host) return;

  function render() {
    const lang = getLang();
    host!.innerHTML = JOURNAL.map(
      (e) => `
      <article class="entry" data-cursor-hover>
        <span class="entry__index">${e.index}</span>
        <div>
          <h3 class="entry__title">${e.title[lang] || e.title.en}</h3>
          <p class="entry__place">${e.place[lang] || e.place.en}</p>
        </div>
        <p class="entry__body">${e.body[lang] || e.body.en}</p>
      </article>`,
    ).join("");
  }

  render();
  window.addEventListener("digl:langchange", render);
}
