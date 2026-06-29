import { PRODUCTS } from "../content/catalog";
import { getLang, t } from "./i18n";
import { garmentSVG } from "../art/garments";
import { DROPS } from "../content/catalog";
import type { Lang } from "../content/types";

// Dedicated checkout page. Reads the same bag the shop writes (localStorage key
// "digl-bag"), renders an order summary, and hands the order off to either an
// online payment link or WhatsApp. Kept in sync with the shop via the
// "digl:bagchange" event and re-localized on "digl:langchange".

interface Line {
  id: string;
  size: string;
  qty: number;
}

const BAG_KEY = "digl-bag";
// Store WhatsApp number in international format, digits only (no +).
const WHATSAPP_NUMBER = "21600000000";

const dropColor = (code: string) => DROPS.find((d) => d.code === code)!;

function money(n: number, lang: Lang): string {
  return `${n} ${lang === "ar" ? "د.ت" : "TND"}`;
}

function loadBag(): Line[] {
  try {
    const raw = JSON.parse(localStorage.getItem(BAG_KEY) || "[]");
    return (Array.isArray(raw) ? raw : []).filter((l: Line) => PRODUCTS.some((p) => p.id === l.id));
  } catch {
    return [];
  }
}

function bagTotal(bag: Line[]): number {
  return bag.reduce((sum, l) => sum + PRODUCTS.find((x) => x.id === l.id)!.priceTND * l.qty, 0);
}

export function initCheckout(): void {
  const itemsEl = document.querySelector<HTMLElement>("[data-checkout-items]");
  const totalEl = document.querySelector<HTMLElement>("[data-checkout-total]");
  const form = document.querySelector<HTMLFormElement>("[data-checkout-form]");
  const onlineBtn = document.querySelector<HTMLButtonElement>("[data-online-pay]");
  const whatsappBtn = document.querySelector<HTMLButtonElement>("[data-whatsapp-pay]");
  const msgEl = document.querySelector<HTMLElement>("[data-checkout-msg]");
  if (!itemsEl || !totalEl) return;

  function renderSummary(): void {
    const lang = getLang();
    const bag = loadBag();
    if (!bag.length) {
      itemsEl!.innerHTML = `<p class="checkout__empty">${t("shop.bagEmpty", lang)}</p>`;
    } else {
      itemsEl!.innerHTML = bag
        .map((l) => {
          const p = PRODUCTS.find((x) => x.id === l.id)!;
          const d = dropColor(p.drop);
          return `
          <div class="checkout-item">
            <div class="checkout-item__art" style="background:${d.color}22">${garmentSVG(p.silhouette, d.color, d.ink)}</div>
            <div class="checkout-item__info">
              <div class="checkout-item__name">${p.name[lang] || p.name.en}</div>
              <div class="checkout-item__meta mono">${t("shop.size", lang)} ${l.size} · x${l.qty}</div>
            </div>
            <div class="checkout-item__price mono">${money(p.priceTND * l.qty, lang)}</div>
          </div>`;
        })
        .join("");
    }
    totalEl!.textContent = money(bagTotal(bag), lang);
  }

  /** Collect + validate the delivery fields. Returns null (and shows a message) if incomplete. */
  function customer(): { name: string; phone: string; address: string } | null {
    if (!form) return { name: "", phone: "", address: "" };
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const phone = String(data.get("phone") || "").trim();
    const address = String(data.get("address") || "").trim();
    if (!name || !phone || !address) {
      form.reportValidity();
      setMsg(t("checkout.required"));
      return null;
    }
    return { name, phone, address };
  }

  function setMsg(text: string): void {
    if (msgEl) msgEl.textContent = text;
  }

  /** Human-readable order text shared by both payment paths. */
  function orderText(c: { name: string; phone: string; address: string }): string {
    const lang = getLang();
    const bag = loadBag();
    const lines = bag.map((l) => {
      const p = PRODUCTS.find((x) => x.id === l.id)!;
      return `• ${p.name.en} / ${l.size} ×${l.qty} — ${money(p.priceTND * l.qty, lang)}`;
    });
    return [
      "DIGL — order request",
      "",
      ...lines,
      "",
      `Total: ${money(bagTotal(bag), lang)}`,
      "",
      `Name: ${c.name}`,
      `Phone: ${c.phone}`,
      `Address: ${c.address}`,
    ].join("\n");
  }

  function guardBag(): boolean {
    if (!loadBag().length) {
      setMsg(t("checkout.empty"));
      return false;
    }
    return true;
  }

  onlineBtn?.addEventListener("click", () => {
    if (!guardBag()) return;
    const c = customer();
    if (!c) return;
    // No live payment provider yet: show the handoff message. When a provider is
    // connected, redirect here, e.g. window.location.href = paymentLinkFor(order).
    setMsg(t("checkout.ready"));
  });

  whatsappBtn?.addEventListener("click", () => {
    if (!guardBag()) return;
    const c = customer();
    if (!c) return;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(orderText(c))}`;
    window.open(url, "_blank", "noopener");
  });

  renderSummary();
  window.addEventListener("digl:langchange", renderSummary);
  window.addEventListener("digl:bagchange", renderSummary);
  // Re-read the bag whenever the checkout page is shown via the router.
  window.addEventListener("hashchange", () => {
    if (window.location.hash === "#/checkout") renderSummary();
  });
}
