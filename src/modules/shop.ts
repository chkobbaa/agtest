import { PRODUCTS, DROPS } from "../content/catalog";
import { garmentSVG } from "../art/garments";
import { getLang, t } from "./i18n";
import type { Lang, Product } from "../content/types";

// A real, working shop: filterable grid, per-card size selection, an
// add-to-bag flow and a slide-in bag drawer. Bag state persists in
// localStorage so it survives reloads — no backend required.

interface Line {
  id: string;
  size: string;
  qty: number;
}

const BAG_KEY = "digl-bag";
const dropColor = (code: string) => DROPS.find((d) => d.code === code)!;

function loadBag(): Line[] {
  try {
    const raw = JSON.parse(localStorage.getItem(BAG_KEY) || "[]");
    return Array.isArray(raw) ? raw : [];
  } catch {
    return [];
  }
}

export function initShop(): void {
  const grid = document.querySelector<HTMLElement>("[data-shop-grid]");
  const filterHost = document.querySelector<HTMLElement>("[data-shop-filters]");
  if (!grid || !filterHost) return;

  let bag: Line[] = loadBag();
  let filter = "ALL";
  const sizeSel = new Map<string, string>();
  PRODUCTS.forEach((p) => sizeSel.set(p.id, p.sizes[0]));

  const money = (n: number, lang: Lang) => `${n} ${lang === "ar" ? "د.ت" : "TND"}`;

  // ---- filters ----
  function renderFilters() {
    const lang = getLang();
    const codes = ["ALL", ...DROPS.map((d) => d.code)];
    filterHost!.innerHTML = codes
      .map((c) => {
        const label = c === "ALL" ? t("shop.filter.all", lang) : c;
        return `<button class="filter-pill ${c === filter ? "is-active" : ""}" data-filter="${c}">${label}</button>`;
      })
      .join("");
  }

  // ---- product card ----
  function card(p: Product, lang: Lang): string {
    const d = dropColor(p.drop);
    const sel = sizeSel.get(p.id)!;
    const sizes = p.sizes
      .map((s) => `<button class="size-chip ${s === sel ? "is-active" : ""}" data-size="${s}" data-pid="${p.id}">${s}</button>`)
      .join("");
    return `
    <article class="product" data-pid="${p.id}">
      <div class="product__media" style="background:${d.color}22">
        <span class="product__drop">${p.drop}</span>
        ${p.edition ? `<span class="product__edition">${p.edition}</span>` : ""}
        ${garmentSVG(p.silhouette, d.color, d.ink)}
      </div>
      <div class="product__info">
        <h3 class="product__name">${p.name[lang] || p.name.en}</h3>
        <p class="product__spec">${p.spec[lang] || p.spec.en}</p>
        <div class="product__row">
          <span class="product__price">${money(p.priceTND, lang)}</span>
          <div class="product__sizes" role="group" aria-label="${t("shop.size", lang)}">${sizes}</div>
        </div>
        <button class="btn product__add" data-add="${p.id}"><span>${t("shop.add", lang)}</span></button>
      </div>
    </article>`;
  }

  function renderGrid() {
    const lang = getLang();
    const list = PRODUCTS.filter((p) => filter === "ALL" || p.drop === filter);
    grid!.innerHTML = list.map((p) => card(p, lang)).join("");
  }

  // ---- bag ----
  const bagEl = document.querySelector<HTMLElement>("[data-bag]")!;
  const itemsEl = document.querySelector<HTMLElement>("[data-bag-items]")!;
  const totalEl = document.querySelector<HTMLElement>("[data-bag-total]")!;
  const countEl = document.querySelector<HTMLElement>("[data-bag-count]")!;

  function saveBag() {
    localStorage.setItem(BAG_KEY, JSON.stringify(bag));
  }

  function renderBag() {
    const lang = getLang();
    const count = bag.reduce((n, l) => n + l.qty, 0);
    countEl.textContent = String(count);
    if (!bag.length) {
      itemsEl.innerHTML = `<p class="bag__empty">${t("shop.bagEmpty", lang)}</p>`;
    } else {
      itemsEl.innerHTML = bag
        .map((l) => {
          const p = PRODUCTS.find((x) => x.id === l.id)!;
          const d = dropColor(p.drop);
          return `
          <div class="bag-item">
            <div class="bag-item__art" style="background:${d.color}22">${garmentSVG(p.silhouette, d.color, d.ink)}</div>
            <div>
              <div class="bag-item__name">${p.name[lang] || p.name.en}</div>
              <div class="bag-item__meta">${t("shop.size", lang)} ${l.size} · ×${l.qty}</div>
              <button class="bag-item__remove" data-remove="${l.id}__${l.size}">${t("shop.remove", lang)}</button>
            </div>
            <div class="bag-item__meta">${money(p.priceTND * l.qty, lang)}</div>
          </div>`;
        })
        .join("");
    }
    const total = bag.reduce((sum, l) => sum + PRODUCTS.find((x) => x.id === l.id)!.priceTND * l.qty, 0);
    totalEl.textContent = money(total, lang);
  }

  function addToBag(id: string) {
    const size = sizeSel.get(id)!;
    const existing = bag.find((l) => l.id === id && l.size === size);
    if (existing) existing.qty += 1;
    else bag.push({ id, size, qty: 1 });
    saveBag();
    renderBag();
  }

  function openBag(open: boolean) {
    if (open) {
      bagEl.hidden = false;
      requestAnimationFrame(() => bagEl.classList.add("is-open"));
    } else {
      bagEl.classList.remove("is-open");
      setTimeout(() => (bagEl.hidden = true), 500);
    }
  }

  // ---- events (delegated) ----
  filterHost.addEventListener("click", (e) => {
    const btn = (e.target as Element).closest<HTMLElement>("[data-filter]");
    if (!btn) return;
    filter = btn.dataset.filter!;
    renderFilters();
    renderGrid();
  });

  grid.addEventListener("click", (e) => {
    const sizeBtn = (e.target as Element).closest<HTMLElement>("[data-size]");
    if (sizeBtn) {
      sizeSel.set(sizeBtn.dataset.pid!, sizeBtn.dataset.size!);
      sizeBtn.parentElement!.querySelectorAll(".size-chip").forEach((c) => c.classList.remove("is-active"));
      sizeBtn.classList.add("is-active");
      return;
    }
    const addBtn = (e.target as Element).closest<HTMLElement>("[data-add]");
    if (addBtn) {
      addToBag(addBtn.dataset.add!);
      const label = addBtn.querySelector("span")!;
      const original = label.textContent;
      label.textContent = t("shop.added");
      addBtn.classList.add("btn--solid");
      openBag(true);
      setTimeout(() => {
        label.textContent = original;
        addBtn.classList.remove("btn--solid");
      }, 1400);
    }
  });

  itemsEl.addEventListener("click", (e) => {
    const rm = (e.target as Element).closest<HTMLElement>("[data-remove]");
    if (!rm) return;
    const [id, size] = rm.dataset.remove!.split("__");
    bag = bag.filter((l) => !(l.id === id && l.size === size));
    saveBag();
    renderBag();
  });

  document.querySelectorAll("[data-bag-open]").forEach((b) => b.addEventListener("click", () => openBag(true)));
  document.querySelectorAll("[data-bag-close]").forEach((b) => b.addEventListener("click", () => openBag(false)));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") openBag(false);
  });

  // ---- init + re-localize ----
  renderFilters();
  renderGrid();
  renderBag();
  window.addEventListener("digl:langchange", () => {
    renderFilters();
    renderGrid();
    renderBag();
  });
}
