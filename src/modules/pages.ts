import { getLenis } from "./smoothScroll";

function routeName(): "home" | "shop" | "checkout" | "team" | "product" {
  const hash = window.location.hash;
  if (hash === "#/checkout") return "checkout";
  if (hash === "#/team") return "team";
  if (hash.startsWith("#product/")) return "product";
  if (hash === "#/shop") return "shop";
  return "home";
}

// When we route home in order to scroll to a section, we don't want the
// router's default "snap to top" to fight the scroll.
let suppressScrollOnce = false;

/** Smooth-scroll to a home-page section, routing home first if needed. */
export function goToHomeSection(id: string): void {
  const target = document.getElementById(id);
  const onHome = routeName() === "home";

  const scroll = () => {
    const el = document.getElementById(id);
    if (!el) return;
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(el, { offset: -10 });
    else el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  if (onHome && target) {
    scroll();
    return;
  }

  // Not home (or section not yet visible): route home, then scroll next frame
  // once the home <main> is un-hidden by render().
  suppressScrollOnce = true;
  if (window.location.hash && window.location.hash !== "#top") {
    window.location.hash = "";
  } else {
    // already home-route but page not laid out — just render + scroll
    render();
  }
  requestAnimationFrame(() => requestAnimationFrame(scroll));
}

let pages: HTMLElement[] = [];
let navEl: HTMLElement | null = null;

function render(): void {
  const active = routeName();
  pages.forEach((page) => {
    page.hidden = page.dataset.page !== active;
  });
  document.body.dataset.route = active;
  navEl?.classList.remove("is-open");
  if (suppressScrollOnce) {
    suppressScrollOnce = false;
  } else {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }
}

export function initPages(): void {
  pages = Array.from(document.querySelectorAll<HTMLElement>("[data-page]"));
  navEl = document.querySelector<HTMLElement>("[data-nav]");
  render();
  window.addEventListener("hashchange", render);
}
