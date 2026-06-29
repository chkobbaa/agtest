import { DROPS, PRODUCTS } from "../content/catalog";
import { garmentSVG } from "../art/garments";
import { getLang, t } from "./i18n";
import { gsap } from "gsap";
import type { Lang, Product } from "../content/types";

interface Line {
  id: string;
  size: string;
  qty: number;
}

const BAG_KEY = "digl-bag";
const dropColor = (code: string) => DROPS.find((d) => d.code === code) ?? DROPS[0]!;

function loadBag(): Line[] {
  try {
    const raw = JSON.parse(localStorage.getItem(BAG_KEY) || "[]");
    return Array.isArray(raw) ? raw : [];
  } catch {
    return [];
  }
}

function money(n: number, lang: Lang): string {
  return `${n} ${lang === "ar" ? "د.ت" : "TND"}`;
}

function productText(p: Product, lang: Lang): string {
  return [p.drop, p.name.en, p.name.ar, p.category[lang], p.colorway[lang], p.spec[lang], p.story[lang]]
    .join(" ")
    .toLowerCase();
}

export function initShop(): void {
  const grid = document.querySelector<HTMLElement>("[data-shop-grid]");
  const filterHost = document.querySelector<HTMLElement>("[data-shop-filters]");
  const searchInput = document.querySelector<HTMLInputElement>("[data-shop-search]");
  const sortSelect = document.querySelector<HTMLSelectElement>("[data-shop-sort]");
  const countEl = document.querySelector<HTMLElement>("[data-shop-count]");
  const productPage = document.querySelector<HTMLElement>("[data-product-page]");
  if (!grid || !filterHost) return;

  let bag: Line[] = loadBag().filter((line) => PRODUCTS.some((p) => p.id === line.id));
  let filter = "ALL";
  let query = "";
  let sort = "featured";
  // "premium" = full-width editorial rows, "grid" = classic card grid
  let viewMode: "premium" | "grid" = "premium";
  let activeProductId: string | null = null;
  const sizeSel = new Map<string, string>();
  PRODUCTS.forEach((p) => sizeSel.set(p.id, p.sizes[0]));

  let pendingSrcRect: DOMRect | null = null;
  let activeGalleryIndex = 0;

  // ---- filters / catalog tools ----
  function renderFilters(): void {
    const lang = getLang();
    const codes = ["ALL", ...DROPS.map((d) => d.code)];
    filterHost!.innerHTML = codes
      .map((c) => {
        const drop = DROPS.find((d) => d.code === c);
        const label = c === "ALL" ? t("shop.filter.all", lang) : (drop?.meaning[lang] ?? c);
        return `<button class="filter-pill ${c === filter ? "is-active" : ""}" data-filter="${c}">${label}</button>`;
      })
      .join("");
  }

  function renderTools(): void {
    const lang = getLang();
    if (searchInput) searchInput.placeholder = t("shop.search", lang);
  }

  function listedProducts(): Product[] {
    const lang = getLang();
    const needle = query.trim().toLowerCase();
    const list = PRODUCTS.filter((p) => {
      const matchesDrop = filter === "ALL" || p.drop === filter;
      const matchesQuery = !needle || productText(p, lang).includes(needle);
      return matchesDrop && matchesQuery;
    });
    if (sort === "price-asc") return [...list].sort((a, b) => a.priceTND - b.priceTND);
    if (sort === "price-desc") return [...list].sort((a, b) => b.priceTND - a.priceTND);
    return list;
  }

  // ---- PREMIUM ROW (editorial alternating layout) ----
  function premiumRow(p: Product, lang: Lang, index: number): string {
    const d = dropColor(p.drop);
    const sel = sizeSel.get(p.id)!;
    const isEven = index % 2 === 0;
    const lifestyleSrc = p.lifestyleImage ?? (p.images?.[0] ?? "");
    const hasLifestyle = !!lifestyleSrc;
    const imageId = p.id === "summer-black-tank" ? ' id="tank_1"' : "";

    const sizes = p.sizes
      .map((s) => `<button class="size-chip ${s === sel ? "is-active" : ""}" data-size="${s}" data-pid="${p.id}">${s}</button>`)
      .join("");

    const imageSide = hasLifestyle
      ? `<div class="pr__lifestyle" style="order:${isEven ? 0 : 1}">
          
            <a class="pr__lifestyle-link" href="#product/${p.id}" aria-label="${p.name[lang] || p.name.en}">
              <img class="pr__lifestyle-img"${imageId} src="${lifestyleSrc}" alt="${p.name[lang] || p.name.en}" loading="lazy" />
              
              <div class="pr__lifestyle-overlay">
                <span class="pr__lifestyle-cta mono">${t("shop.details", lang)} →</span>
              </div>
            </a>
          
        </div>`
      : `<div class="pr__lifestyle pr__lifestyle--svg" style="order:${isEven ? 0 : 1}; background:${d.color}22">
          <a class="pr__lifestyle-link" href="#product/${p.id}" aria-label="${p.name[lang] || p.name.en}">
            ${garmentSVG(p.silhouette, d.color, d.ink)}
          </a>
        </div>`;

    return `
    <article class="pr ${isEven ? 'pr--img-left' : 'pr--img-right'}" data-pid="${p.id}" style="--drop:${d.color}; --drop-ink:${d.ink}">
      ${imageSide}
      <div class="pr__copy" style="order:${isEven ? 1 : 0}">
        <div class="pr__top">
          <span class="pr__drop mono" style="color:${d.color}">${p.drop}</span>
          <span class="pr__status mono">${p.status[lang] || p.status.en}</span>
        </div>
        <h3 class="pr__name display"><a href="#product/${p.id}">${p.name[lang] || p.name.en}</a></h3>
        <p class="pr__spec mono">${p.spec[lang] || p.spec.en}</p>
        <p class="pr__story">${p.story[lang] || p.story.en}</p>
        <div class="pr__buy">
          <div class="pr__sizes" role="group" aria-label="${t("shop.size", lang)}">${sizes}</div>
          <div class="pr__actions">
            <span class="pr__price mono">${money(p.priceTND, lang)}</span>
            <a class="btn pr__details product__details" href="#product/${p.id}"><span>${t("shop.details", lang)}</span></a>
            <button class="btn btn--solid pr__add" data-add="${p.id}"><span>${t("shop.add", lang)}</span></button>
          </div>
        </div>
        
        
      </div>
    </article>`;
  }


  // ---- GRID CARD (classic compact layout) ----
  function card(p: Product, lang: Lang): string {
    const d = dropColor(p.drop);
    const sel = sizeSel.get(p.id)!;
    const sizes = p.sizes
      .map((s) => `<button class="size-chip ${s === sel ? "is-active" : ""}" data-size="${s}" data-pid="${p.id}">${s}</button>`)
      .join("");
    const thumb = p.images?.[0] ?? "";
    return `
    <article class="product" data-pid="${p.id}">
      <a class="product__media product__media-link" href="#product/${p.id}" style="background:${d.color}22" aria-label="${t("shop.details", lang)}: ${p.name[lang] || p.name.en}">
        <span class="product__drop">${p.drop}</span>
        ${p.edition ? `<span class="product__edition">${p.edition}</span>` : ""}
        ${thumb ? `<img src="${thumb}" alt="${p.name[lang] || p.name.en}" loading="lazy" style="width:80%;height:100%;object-fit:contain" />` : garmentSVG(p.silhouette, d.color, d.ink)}
      </a>
      <div class="product__info">
        <div class="product__meta mono">
          <span>${p.category[lang] || p.category.en}</span>
          <span>${p.status[lang] || p.status.en}</span>
        </div>
        <h3 class="product__name">${p.name[lang] || p.name.en}</h3>
        <p class="product__spec">${p.spec[lang] || p.spec.en}</p>
        <div class="product__row">
          <span class="product__price">${money(p.priceTND, lang)}</span>
          <div class="product__sizes" role="group" aria-label="${t("shop.size", lang)}">${sizes}</div>
        </div>
        <div class="product__actions">
          <a class="btn product__details" href="#product/${p.id}"><span>${t("shop.details", lang)}</span></a>
          <button class="btn product__add" data-add="${p.id}"><span>${t("shop.add", lang)}</span></button>
        </div>
      </div>
    </article>`;
  }

  function renderGrid(): void {
    const lang = getLang();
    const list = listedProducts();
    if (viewMode === "premium") {
      grid!.className = "shop__list";
      grid!.innerHTML = list.map((p, i) => premiumRow(p, lang, i)).join("");
    } else {
      grid!.className = "container shop__grid";
      grid!.innerHTML = list.map((p) => card(p, lang)).join("");
    }
    if (countEl) countEl.textContent = `${list.length} ${t("shop.count", lang)}`;
    // Sync toggle button state
    document.querySelectorAll<HTMLElement>("[data-view-toggle]").forEach((btn) => {
      btn.classList.toggle("is-active", btn.dataset.viewToggle === viewMode);
    });
  }

  // ---- bag ----
  const bagEl = document.querySelector<HTMLElement>("[data-bag]");
  const itemsEl = document.querySelector<HTMLElement>("[data-bag-items]");
  const totalEl = document.querySelector<HTMLElement>("[data-bag-total]");
  const countEls = document.querySelectorAll<HTMLElement>("[data-bag-count]");

  function saveBag(): void {
    localStorage.setItem(BAG_KEY, JSON.stringify(bag));
    window.dispatchEvent(new CustomEvent("digl:bagchange"));
  }

  function renderBag(): void {
    if (!itemsEl || !totalEl) return;
    const lang = getLang();
    const count = bag.reduce((n, l) => n + l.qty, 0);
    countEls.forEach((el) => (el.textContent = String(count)));
    if (!bag.length) {
      itemsEl.innerHTML = `<p class="bag__empty">${t("shop.bagEmpty", lang)}</p>`;
    } else {
      itemsEl.innerHTML = bag
        .map((l) => {
          const p = PRODUCTS.find((x) => x.id === l.id)!;
          const d = dropColor(p.drop);
          const thumb = p.images?.[0] ?? "";
          return `
          <div class="bag-item">
            <div class="bag-item__art" style="background:${d.color}22">
              ${thumb ? `<img src="${thumb}" alt="${p.name[lang] || p.name.en}" style="width:100%;height:100%;object-fit:contain" />` : garmentSVG(p.silhouette, d.color, d.ink)}
            </div>
            <div>
              <div class="bag-item__name">${p.name[lang] || p.name.en}</div>
              <div class="bag-item__meta">${t("shop.size", lang)} ${l.size} · x${l.qty}</div>
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

  function addToBag(id: string): void {
    const size = sizeSel.get(id)!;
    const existing = bag.find((l) => l.id === id && l.size === size);
    if (existing) existing.qty += 1;
    else bag.push({ id, size, qty: 1 });
    saveBag();
    renderBag();
  }

  function openBag(open: boolean): void {
    if (!bagEl) return;
    if (open) {
      bagEl.hidden = false;
      requestAnimationFrame(() => bagEl.classList.add("is-open"));
    } else {
      bagEl.classList.remove("is-open");
      setTimeout(() => (bagEl.hidden = true), 500);
    }
  }

  function checkout(e: Event): void {
    if (!bag.length) {
      e.preventDefault();
      openBag(true);
      return;
    }
    openBag(false);
  }

  // ---- product detail PAGE ----
  function productPageHTML(p: Product, lang: Lang): string {
    const d = dropColor(p.drop);
    const sel = sizeSel.get(p.id)!;
    const sizes = p.sizes
      .map((s) => `<button class="size-chip ${s === sel ? "is-active" : ""}" data-detail-size="${s}" data-pid="${p.id}">${s}</button>`)
      .join("");
    const details = p.details.map((item) => `<li>${item[lang] || item.en}</li>`).join("");

    let gallerySlides = `
      <div class="pdp__gallery-slide is-active" data-index="0">
        ${p.images?.[0] ? `<img src="${p.images[0]}" alt="${p.name[lang] || p.name.en}" loading="lazy" />` : garmentSVG(p.silhouette, d.color, d.ink)}
      </div>
    `;
    let galleryThumbs = `<button class="pdp__thumb is-active" data-gallery-thumb="0" aria-label="Slide 1">
      ${p.images?.[0] ? `<img src="${p.images[0]}" alt="" loading="lazy" />` : garmentSVG(p.silhouette, d.color, d.ink)}
    </button>`;

    if (p.images && p.images.length > 1) {
      p.images.slice(1).forEach((img, i) => {
        const idx = i + 1;
        gallerySlides += `
          <div class="pdp__gallery-slide" data-index="${idx}">
            <img src="${img}" alt="${p.name[lang] || p.name.en} view ${idx + 1}" loading="lazy" />
          </div>
        `;
        galleryThumbs += `<button class="pdp__thumb" data-gallery-thumb="${idx}" aria-label="Slide ${idx + 1}"><img src="${img}" alt="" loading="lazy" /></button>`;
      });
    }

    const hasGallery = p.images && p.images.length > 1;

    return `
    <div class="pdp" style="--drop:${d.color}; --drop-ink:${d.ink}">
      <header class="pdp__nav container">
        <a class="pdp__back mono" href="#/shop">${t("shop.back", lang)}</a>
        <span class="pdp__breadcrumb mono">${p.drop} / ${p.name[lang] || p.name.en}</span>
      </header>

      <div class="pdp__layout">
        <div class="pdp__media" data-pdp-media>
          <div class="pdp__gallery-frame">
            <span class="pdp__drop-label mono">${p.drop}</span>
            ${p.edition ? `<span class="pdp__edition mono">${p.edition}</span>` : ""}
            
            <div class="pdp__gallery" data-gallery>
              ${gallerySlides}
            </div>

            ${hasGallery ? `
            <div class="pdp__gallery-arrows">
              <button class="pdp__gallery-arrow" data-gallery-prev aria-label="Previous">←</button>
              <button class="pdp__gallery-arrow" data-gallery-next aria-label="Next">→</button>
            </div>
            ` : ""}
            
            <span class="zoom-hint">${t("shop.zoom", lang)}</span>
          </div>

          ${hasGallery ? `
          <div class="pdp__thumbs" data-gallery-thumbs>
            ${galleryThumbs}
          </div>
          ` : ""}
        </div>

        <div class="pdp__copy">
          <p class="pdp__eyebrow mono">${p.category[lang] || p.category.en} · ${p.status[lang] || p.status.en}</p>
          <h1 class="pdp__title display">${p.name[lang] || p.name.en}</h1>
          <p class="pdp__spec mono">${p.spec[lang] || p.spec.en}</p>
          <p class="pdp__story">${p.story[lang] || p.story.en}</p>

          <div class="pdp__buy">
            <div class="pdp__sizes-row">
              <span class="pdp__size-label mono">${t("shop.size", lang)}</span>
              <div class="pdp__sizes" role="group" aria-label="${t("shop.size", lang)}">${sizes}</div>
            </div>
            <div class="pdp__price-row">
              <span class="pdp__price mono">${money(p.priceTND, lang)}</span>
              <button class="btn btn--solid pdp__add" data-detail-add="${p.id}">
                <span>${t("shop.add", lang)}</span>
              </button>
            </div>
          </div>

          <dl class="pdp__specs">
            <div><dt>${t("shop.colorway", lang)}</dt><dd>${p.colorway[lang] || p.colorway.en}</dd></div>
            <div><dt>${t("shop.material", lang)}</dt><dd>${p.material[lang] || p.material.en}</dd></div>
            <div><dt>${t("shop.fit", lang)}</dt><dd>${p.fit[lang] || p.fit.en}</dd></div>
            <div><dt>${t("shop.care", lang)}</dt><dd>${p.care[lang] || p.care.en}</dd></div>
          </dl>

          <section class="pdp__construction">
            <h2 class="pdp__construction-title mono">${t("shop.construction", lang)}</h2>
            <ul>${details}</ul>
          </section>

          <p class="pdp__shipping mono">${t("shop.shipping", lang)}</p>
        </div>
      </div>
    </div>`;
  }

  // ---- zoom ----
  let zoomCleanup: (() => void) | null = null;

  function teardownZoom(): void {
    zoomCleanup?.();
    zoomCleanup = null;
  }

  function initZoom(): void {
    teardownZoom();
    if (!productPage) return;
    const media = productPage.querySelector<HTMLElement>(".pdp__media");
    const garment = productPage.querySelector<HTMLElement>(".pdp__media .garment, .pdp__media img");
    if (!media || !garment) return;

    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    let held = false;

    const setOrigin = (e: PointerEvent) => {
      const r = media.getBoundingClientRect();
      const px = ((e.clientX - r.left) / r.width) * 100;
      const py = ((e.clientY - r.top) / r.height) * 100;
      garment.style.transformOrigin = `${px}% ${py}%`;
    };
    const onMove = (e: PointerEvent) => {
      if (!fine) return;
      setOrigin(e);
      if (!held) media.classList.add("is-zooming");
    };
    const onLeave = () => {
      if (!held) media.classList.remove("is-zooming");
    };
    const onClick = (e: MouseEvent) => {
      held = !held;
      media.classList.toggle("is-zoom-held", held);
      if (held) {
        setOrigin(e as unknown as PointerEvent);
        media.classList.add("is-zooming");
      } else {
        media.classList.remove("is-zooming");
        garment.style.transformOrigin = "center";
      }
    };

    media.addEventListener("pointermove", onMove);
    media.addEventListener("pointerleave", onLeave);
    media.addEventListener("click", onClick);
    media.classList.add("is-zoomable");

    zoomCleanup = () => {
      media.removeEventListener("pointermove", onMove);
      media.removeEventListener("pointerleave", onLeave);
      media.removeEventListener("click", onClick);
      media.classList.remove("is-zooming", "is-zoom-held", "is-zoomable");
    };
  }

  // ---- shared-element morph ----
  const prefersReduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function sourceGarment(id: string): HTMLElement | null {
    return document.querySelector<HTMLElement>(
      `.product[data-pid="${CSS.escape(id)}"] .product__media .garment, .pr[data-pid="${CSS.escape(id)}"] .pr__lifestyle-img`
    );
  }

  function flyGarmentFromRect(srcRect: DOMRect, toEl: HTMLElement, onDone?: () => void): void {
    const to = toEl.getBoundingClientRect();
    if (!srcRect.width || !to.width) { onDone?.(); return; }
    const clone = toEl.cloneNode(true) as HTMLElement;
    clone.classList.add("garment-flight");
    Object.assign(clone.style, {
      position: "fixed",
      left: `${to.left}px`,
      top: `${to.top}px`,
      width: `${to.width}px`,
      height: `${to.height}px`,
      margin: "0",
      zIndex: "var(--z-flight)",
      pointerEvents: "none",
      willChange: "transform",
    });
    document.body.appendChild(clone);
    const dx = srcRect.left - to.left + (srcRect.width - to.width) / 2;
    const dy = srcRect.top - to.top + (srcRect.height - to.height) / 2;
    const sx = srcRect.width / to.width;
    const sy = srcRect.height / to.height;
    gsap.fromTo(clone, { x: dx, y: dy, scaleX: sx, scaleY: sy }, {
      x: 0, y: 0, scaleX: 1, scaleY: 1,
      duration: 0.65, ease: "expo.out",
      onComplete: () => { clone.remove(); onDone?.(); },
    });
  }

  function renderProductPage(): void {
    if (!productPage || !activeProductId) return;
    const p = PRODUCTS.find((item) => item.id === activeProductId);
    if (!p) return;
    activeGalleryIndex = 0;
    productPage.classList.remove("is-landed");
    productPage.innerHTML = productPageHTML(p, getLang());

    if (pendingSrcRect && !prefersReduce) {
      const destGarment = productPage.querySelector<HTMLElement>(".pdp__media .garment, .pdp__media img");
      if (destGarment) {
        destGarment.style.opacity = "0";
        const srcRect = pendingSrcRect;
        pendingSrcRect = null;
        requestAnimationFrame(() => {
          flyGarmentFromRect(srcRect, destGarment, () => {
            destGarment.style.opacity = "";
            productPage.classList.add("is-landed");
          });
        });
      } else {
        pendingSrcRect = null;
      }
    } else {
      pendingSrcRect = null;
      requestAnimationFrame(() => productPage.classList.add("is-landed"));
    }
    initZoom();
  }

  function syncProductRoute(): void {
    const match = location.hash.match(/^#product\/([^/]+)$/);
    if (!match) {
      if (activeProductId) { activeProductId = null; teardownZoom(); }
      return;
    }
    const id = decodeURIComponent(match[1]);
    if (!PRODUCTS.some((p) => p.id === id)) { location.hash = "#/shop"; return; }
    if (id === activeProductId && productPage?.innerHTML.trim()) return;
    activeProductId = id;
    renderProductPage();
  }

  // ---- events (delegated) ----
  filterHost.addEventListener("click", (e) => {
    const btn = (e.target as Element).closest<HTMLElement>("[data-filter]");
    if (!btn) return;
    filter = btn.dataset.filter!;
    renderFilters();
    renderGrid();
  });

  searchInput?.addEventListener("input", () => { query = searchInput.value; renderGrid(); });
  sortSelect?.addEventListener("change", () => { sort = sortSelect.value; renderGrid(); });

  // View toggle buttons (injected into the DOM from the shop head in index.html)
  document.addEventListener("click", (e) => {
    const btn = (e.target as Element).closest<HTMLElement>("[data-view-toggle]");
    if (!btn) return;
    const mode = btn.dataset.viewToggle as "premium" | "grid";
    if (mode && mode !== viewMode) {
      viewMode = mode;
      renderGrid();
    }
  });

  // Grid events (cards & premium rows share the same data-add / href approach)
  grid.addEventListener("click", (e) => {
    const mediaLink = (e.target as Element).closest<HTMLElement>(".product__media-link, .product__details, .pr__lifestyle-link, .pr__details");
    if (mediaLink) {
      e.preventDefault();
      const article = mediaLink.closest<HTMLElement>("[data-pid]");
      if (!article?.dataset.pid) return;
      const id = article.dataset.pid;
      if (!prefersReduce) {
        const src = sourceGarment(id);
        if (src) pendingSrcRect = src.getBoundingClientRect();
      }
      location.hash = `#product/${encodeURIComponent(id)}`;
      return;
    }

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
      setTimeout(() => { label.textContent = original; addBtn.classList.remove("btn--solid"); }, 1400);
    }
  });

  productPage?.addEventListener("click", (e) => {
    const sizeBtn = (e.target as Element).closest<HTMLElement>("[data-detail-size]");
    if (sizeBtn) {
      sizeSel.set(sizeBtn.dataset.pid!, sizeBtn.dataset.detailSize!);
      sizeBtn.parentElement!.querySelectorAll(".size-chip").forEach((c) => c.classList.remove("is-active"));
      sizeBtn.classList.add("is-active");
      return;
    }

    const addBtn = (e.target as Element).closest<HTMLElement>("[data-detail-add]");
    if (addBtn) { addToBag(addBtn.dataset.detailAdd!); openBag(true); return; }

    const thumbBtn = (e.target as Element).closest<HTMLElement>("[data-gallery-thumb]");
    const prevBtn = (e.target as Element).closest<HTMLElement>("[data-gallery-prev]");
    const nextBtn = (e.target as Element).closest<HTMLElement>("[data-gallery-next]");

    if (thumbBtn || prevBtn || nextBtn) {
      const gallery = productPage?.querySelector<HTMLElement>("[data-gallery]");
      if (!gallery) return;
      const slides = Array.from(gallery.querySelectorAll<HTMLElement>(".pdp__gallery-slide"));
      if (slides.length <= 1) return;

      let nextIndex = activeGalleryIndex;
      if (thumbBtn) nextIndex = parseInt(thumbBtn.dataset.galleryThumb!);
      else if (prevBtn) nextIndex = activeGalleryIndex > 0 ? activeGalleryIndex - 1 : slides.length - 1;
      else if (nextBtn) nextIndex = activeGalleryIndex < slides.length - 1 ? activeGalleryIndex + 1 : 0;

      if (nextIndex === activeGalleryIndex) return;

      const currentSlide = slides[activeGalleryIndex];
      const nextSlide = slides[nextIndex];
      const direction = nextIndex > activeGalleryIndex ? 1 : -1;

      gsap.to(currentSlide, { opacity: 0, x: -15 * direction, duration: 0.3, ease: "power2.inOut", onComplete: () => currentSlide.classList.remove("is-active") });
      nextSlide.classList.add("is-active");
      gsap.fromTo(nextSlide, { opacity: 0, x: 15 * direction }, { opacity: 1, x: 0, duration: 0.3, ease: "power2.out" });

      activeGalleryIndex = nextIndex;
      productPage?.querySelectorAll(".pdp__thumb").forEach((t, i) => t.classList.toggle("is-active", i === activeGalleryIndex));
    }
  });

  itemsEl?.addEventListener("click", (e) => {
    const rm = (e.target as Element).closest<HTMLElement>("[data-remove]");
    if (!rm) return;
    const [id, size] = rm.dataset.remove!.split("__");
    bag = bag.filter((l) => !(l.id === id && l.size === size));
    saveBag(); renderBag();
  });

  document.querySelectorAll("[data-bag-open]").forEach((b) => b.addEventListener("click", () => openBag(true)));
  document.querySelectorAll("[data-bag-close]").forEach((b) => b.addEventListener("click", () => openBag(false)));
  document.querySelector("[data-checkout]")?.addEventListener("click", checkout);

  window.addEventListener("hashchange", syncProductRoute);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      openBag(false);
      if (activeProductId) location.hash = "#/shop";
    }
  });

  // ---- init ----
  renderTools();
  renderFilters();
  renderGrid();
  renderBag();
  syncProductRoute();

  window.addEventListener("digl:langchange", () => {
    renderTools(); renderFilters(); renderGrid(); renderBag();
    if (activeProductId) renderProductPage();
  });
}
