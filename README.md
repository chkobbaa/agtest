# DIGL — دڨلة نور

**Wear the light.** A from-scratch brand site for DIGL, a Tunisian streetwear
label. The whole identity — a character, an origin myth, and an immersive,
scroll‑driven world — is built in code. No stock photography: every visual
(the mascot, the logo seal, the garments, the night sky, the heat haze) is
hand‑drawn SVG or generated on a `<canvas>`.

## The idea

DIGL comes from **دڨلة** (*degla*), the date of the Tunisian south — the root of
*Deglet Nour*, “the date of light”: the sweetest fruit on earth, grown in the
harshest place on earth. That contradiction is the brand: **sweetness forged in
the harshest sun.**

Every drop begins with **السّايْر — The Walker**, a hooded wanderer who carries a
lantern whose flame is a single glowing date, walking *noor* (light) from the
oasis of Tozeur to the medina of Tunis.

## Highlights

- **Bilingual EN ⇄ عربي** with a full right‑to‑left flip.
- **The lantern cursor** — you carry a pool of light that blooms inside the
  night sections (the core brand idea made interactive).
- **Scroll‑driven storytelling** with GSAP + Lenis: the Walker physically walks
  across the page, the sun parallaxes, headlines clear from a heat‑blur.
- **A working shop** — filterable grid, per‑card size selection, an add‑to‑bag
  flow and a slide‑in bag drawer that persists in `localStorage`.
- **An interactive map** — drag the lantern along the road from Tozeur to Tunis.
- A film‑grain overlay and a desert heat‑haze, both generated on canvas.

## Stack

- [Vite](https://vitejs.dev/) + vanilla TypeScript (no framework — craft + speed)
- [GSAP](https://gsap.com/) + ScrollTrigger and [Lenis](https://github.com/darkroomengineering/lenis) for motion
- Self‑hosted fonts via `@fontsource` (Anton, Space Grotesk, Reem Kufi, Tajawal,
  Aref Ruqaa) — no external font requests at runtime
- Hand‑built SVG art + generative `<canvas>` layers

## Run

```bash
npm install
npm run dev        # local dev server
npm run build      # typecheck + production build to dist/
npm run preview    # serve the production build
```

## Project structure

```
index.html              # semantic structure, bilingual data-i18n hooks
src/
  main.ts               # boot sequence
  content/              # the brand bible: bilingual copy + the catalog (data)
  art/                  # hand-built SVG: the Walker, the seal, garments…
  modules/              # i18n, smooth scroll, lantern cursor, grain, shop, map…
  styles/               # design tokens + base + components + sections + motion
scripts/
  preview-art.mjs       # dev: render the SVG art to a PNG for visual iteration
  qa.mjs                # dev: screenshot every section (desktop/mobile, EN/AR)
```

Accessibility: honours `prefers-reduced-motion` (disables Lenis, parallax, the
walk and the boiling grain), keeps a visible focus ring, and falls back to the
native cursor on touch devices.
