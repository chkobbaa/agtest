import { COPY } from "../content/copy";
import type { Lang } from "../content/types";

const STORAGE_KEY = "digl-lang";
let current: Lang = ((): Lang => {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved === "ar" || saved === "en" ? saved : "en";
})();

export function getLang(): Lang {
  return current;
}

/** Translate a key for the current (or given) language, falling back to EN.
 * Uses nullish coalescing so an intentionally-empty string (e.g. a hero word
 * that doesn't exist in Arabic) stays empty instead of falling back. */
export function t(key: string, lang: Lang = current): string {
  const entry = COPY[key];
  if (!entry) return key;
  return entry[lang] ?? entry.en;
}

/** Apply the active language to the document and every [data-i18n] node. */
export function applyLang(lang: Lang): void {
  current = lang;
  localStorage.setItem(STORAGE_KEY, lang);

  const root = document.documentElement;
  root.lang = lang;
  root.dir = lang === "ar" ? "rtl" : "ltr";
  root.style.setProperty("--rtl-origin", lang === "ar" ? "right" : "left");

  document.querySelectorAll<HTMLElement>("[data-i18n]").forEach((el) => {
    const key = el.dataset.i18n!;
    const val = t(key, lang);
    // Preserve nested markup only for elements explicitly flagged; here all
    // i18n targets are leaf text nodes.
    el.textContent = val;
  });

  // Let dynamic renderers (shop, drops, journey…) rebuild localized content.
  window.dispatchEvent(new CustomEvent("digl:langchange", { detail: { lang } }));
}

/** Wire up the language toggle button(s). */
export function initLangToggle(): void {
  document.querySelectorAll<HTMLButtonElement>("[data-lang-toggle]").forEach((btn) => {
    btn.addEventListener("click", () => {
      applyLang(current === "en" ? "ar" : "en");
    });
  });
}
