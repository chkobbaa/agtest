import { TEAM } from "../content/catalog";
import { portraitSVG } from "../art/marks";
import { getLang } from "./i18n";

// "The Makers" — renders the crew cards on the Team page. Hand-built woodcut
// portraits (no photos), bilingual, re-rendered on language change. Cards carry
// [data-reveal] so the existing IntersectionObserver staggers them in, and
// [data-scramble] on the names so the decode effect plays.

export function initTeam(): void {
  const host = document.querySelector<HTMLElement>("[data-team]");
  if (!host) return;

  function render(): void {
    const lang = getLang();
    host!.innerHTML = TEAM.map(
      (m, i) => `
      <article class="maker" data-reveal style="--maker-color:${m.color}">
        <div class="maker__portrait" style="background:${m.color}1a">
          ${portraitSVG(m.portrait, m.color, m.ink, `pt${i}`)}
        </div>
        <div class="maker__body">
          <p class="maker__role mono">${m.role[lang] || m.role.en}</p>
          <h3 class="maker__name display" data-scramble>${m.name[lang] || m.name.en}</h3>
          <p class="maker__tag mono">“${m.tag[lang] || m.tag.en}”</p>
          <p class="maker__bio">${m.bio[lang] || m.bio.en}</p>
        </div>
      </article>`,
    ).join("");

    // Let the reveal + scramble systems pick up the freshly-rendered nodes.
    window.dispatchEvent(new CustomEvent("digl:contentchange"));
  }

  render();
  window.addEventListener("digl:langchange", render);
}
