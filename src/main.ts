// ---- self-hosted fonts (bundled, no external requests) ----
import "@fontsource/anton/400.css";
import "@fontsource/space-grotesk/400.css";
import "@fontsource/space-grotesk/500.css";
import "@fontsource/space-grotesk/700.css";
import "@fontsource/reem-kufi/arabic-400.css";
import "@fontsource/reem-kufi/arabic-700.css";
import "@fontsource/tajawal/arabic-400.css";
import "@fontsource/tajawal/arabic-500.css";
import "@fontsource/tajawal/arabic-700.css";
import "@fontsource/aref-ruqaa/arabic-700.css";

// ---- styles ----
import "./styles/tokens.css";
import "./styles/base.css";
import "./styles/components.css";
import "./styles/layout.css";
import "./styles/sections.css";
import "./styles/motion.css";

// ---- modules ----
import { applyLang, getLang, initLangToggle } from "./modules/i18n";
import { mountArt } from "./modules/mountArt";
import { initRevealSystem } from "./modules/reveal";
import { initMarquee } from "./modules/marquee";
import { initDrops } from "./modules/drops";
import { initShop } from "./modules/shop";
import { initCheckout } from "./modules/checkout";
import { initJourney } from "./modules/journey";
import { initJournal } from "./modules/journal";
import { initTeam } from "./modules/team";
import { initNewsletter } from "./modules/newsletter";
import { initNav } from "./modules/nav";
import { initPages } from "./modules/pages";
import { initStars } from "./modules/stars";
import { initGrain } from "./modules/grain";
import { initCursor } from "./modules/cursor";
import { initHeat } from "./modules/heat";
import { initSmoothScroll } from "./modules/smoothScroll";
import { initScrollScenes } from "./modules/scroll";
import { runLoader } from "./modules/loader";

function boot(): void {
  // 1) language + art first so the DOM is fully populated
  applyLang(getLang());
  mountArt();
  initLangToggle();
  initNav();
  initPages();

  // 2) data-driven content
  initMarquee();
  initDrops();
  initShop();
  initCheckout();
  initJourney();
  initJournal();
  initTeam();
  initNewsletter();

  // 3) ambient / generative layers
  const grain = document.querySelector<HTMLCanvasElement>("[data-grain]");
  if (grain) initGrain(grain);
  const heat = document.querySelector<HTMLCanvasElement>("[data-heat]");
  if (heat) initHeat(heat);
  initStars();
  initCursor();

  // 4) reveals + scroll choreography
  initRevealSystem();
  initSmoothScroll();
  initScrollScenes();

  // 5) lift the curtain
  runLoader();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot);
} else {
  boot();
}