import { goToHomeSection } from "./pages";

// Nav chrome: mobile burger toggle, route-aware section links, footer year.
export function initNav(): void {
  const nav = document.querySelector<HTMLElement>("[data-nav]");
  const burger = document.querySelector<HTMLButtonElement>("[data-burger]");
  burger?.addEventListener("click", () => nav?.classList.toggle("is-open"));

  const toggleHeaderBlur = () => {
    nav?.classList.toggle("blurred", window.scrollY > 8);
  };

  toggleHeaderBlur();
  window.addEventListener("scroll", toggleHeaderBlur, { passive: true });

  // Lore links (The Name / The Walker / Drops / Journal) live on the home page.
  // From any other page they must route home first, then smooth-scroll — so they
  // never "just scroll up" while the shop/checkout/team page is showing.
  document.querySelectorAll<HTMLAnchorElement>("[data-nav-section]").forEach((a) => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href")!.slice(1);
      if (!id) return;
      e.preventDefault();
      nav?.classList.remove("is-open");
      goToHomeSection(id);
    });
  });

  // Logo + any #top link returns home (and to the top).
  document.querySelectorAll<HTMLAnchorElement>('a[href="#top"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      e.preventDefault();
      nav?.classList.remove("is-open");
      goToHomeSection("top");
    });
  });

  document.querySelectorAll<HTMLElement>("[data-year]").forEach((el) => {
    el.textContent = String(new Date().getFullYear());
  });
}
