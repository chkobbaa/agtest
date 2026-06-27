// Nav chrome: mobile burger toggle and the footer year.
export function initNav(): void {
  const nav = document.querySelector<HTMLElement>("[data-nav]");
  const burger = document.querySelector<HTMLButtonElement>("[data-burger]");
  burger?.addEventListener("click", () => nav?.classList.toggle("is-open"));

  document.querySelectorAll<HTMLElement>("[data-year]").forEach((el) => {
    el.textContent = String(new Date().getFullYear());
  });
}
