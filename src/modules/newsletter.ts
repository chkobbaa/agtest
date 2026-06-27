import { getLang, t } from "./i18n";

// Newsletter sign-up. No backend: we validate the address and remember it
// locally so the UI can confirm and the form stays honest about what it does.

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const LIST_KEY = "digl-caravan";

export function initNewsletter(): void {
  const form = document.querySelector<HTMLFormElement>("[data-newsletter]");
  const input = document.querySelector<HTMLInputElement>("[data-newsletter-input]");
  const msg = document.querySelector<HTMLElement>("[data-newsletter-msg]");
  if (!form || !input || !msg) return;

  function syncPlaceholder() {
    input!.placeholder = t("join.placeholder", getLang());
  }
  syncPlaceholder();
  window.addEventListener("digl:langchange", syncPlaceholder);

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const value = input!.value.trim();
    if (!EMAIL_RE.test(value)) {
      msg!.textContent = t("join.invalid");
      msg!.classList.add("is-error");
      input!.focus();
      return;
    }
    try {
      const list: string[] = JSON.parse(localStorage.getItem(LIST_KEY) || "[]");
      if (!list.includes(value)) list.push(value);
      localStorage.setItem(LIST_KEY, JSON.stringify(list));
    } catch {
      /* ignore storage failure */
    }
    msg!.classList.remove("is-error");
    msg!.textContent = t("join.success");
    form!.reset();
  });
}
