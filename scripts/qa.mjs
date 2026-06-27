import pw from "/opt/node-tools/node_modules/playwright/index.js";
const { chromium } = pw;

const URL = "http://localhost:4173/";
const OUT = process.argv[2] || "/tmp/qa";
const reduced = process.argv[3] !== "motion";
const lang = process.argv[4] || "en";
import { mkdirSync } from "node:fs";
mkdirSync(OUT, { recursive: true });

// Claude's vision API rejects any image whose width or height exceeds 8000px.
// Stay comfortably under that. A capture's pixel size is css-size * deviceScaleFactor,
// so we clamp the scale factor (and tile tall full-page shots) to never cross it.
const MAX_DIM = 7600;

const browser = await chromium.launch();

// Pick the largest device scale factor (capped at 2) that keeps a css-pixel
// dimension under MAX_DIM once multiplied out.
function safeScale(...cssDims) {
  const longest = Math.max(...cssDims);
  return Math.max(1, Math.min(2, Math.floor((MAX_DIM / longest) * 100) / 100));
}

async function newPage(width, height, dsf) {
  const ctx = await browser.newContext({
    viewport: { width, height },
    deviceScaleFactor: dsf,
    reducedMotion: reduced ? "reduce" : "no-preference",
  });
  const page = await ctx.newPage();
  await page.goto(URL, { waitUntil: "networkidle" });
  if (lang === "ar") {
    await page.evaluate(() => localStorage.setItem("digl-lang", "ar"));
    await page.reload({ waitUntil: "networkidle" });
  }
  await page.waitForTimeout(reduced ? 700 : 2600);
  return { ctx, page };
}

async function shoot(name, width, height) {
  const dsf = safeScale(width, height);
  const { ctx, page } = await newPage(width, height, dsf);

  // viewport-sized hero
  await page.screenshot({ path: `${OUT}/${name}-hero.png` });

  // walk through sections (each shot is viewport-sized → always safe)
  const ids = ["name", "walker", "manifesto", "drops", "shop", "journey", "journal", "join"];
  for (const id of ids) {
    await page.evaluate((i) => {
      const el = document.getElementById(i);
      if (el) window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY);
    }, id);
    await page.waitForTimeout(reduced ? 500 : 1100);
    await page.screenshot({ path: `${OUT}/${name}-${id}.png` });
  }
  // footer
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(700);
  await page.screenshot({ path: `${OUT}/${name}-footer.png` });

  // Full-page capture, tiled so no single image exceeds the API limit.
  await shootFullTiled(page, `${name}-full`, height);

  await ctx.close();
}

// A full-page screenshot of this scroll-driven site is far taller than 8000px,
// which the vision API rejects. Instead of one giant image, step down the page
// one viewport at a time and take plain viewport-sized screenshots — each is
// (viewport px × dsf), which safeScale already kept under MAX_DIM.
async function shootFullTiled(page, name, vh) {
  const total = await page.evaluate(() => document.body.scrollHeight);
  const tiles = Math.max(1, Math.ceil(total / vh));
  for (let i = 0; i < tiles; i++) {
    await page.evaluate((y) => window.scrollTo(0, y), i * vh);
    await page.waitForTimeout(300);
    await page.screenshot({ path: `${OUT}/${name}-${String(i).padStart(2, "0")}.png` });
  }
}

await shoot(`${lang}-desktop`, 1440, 900);
await shoot(`${lang}-mobile`, 390, 844);
await browser.close();
console.log("QA done →", OUT, `(scale-safe, ≤ ${MAX_DIM}px)`);
