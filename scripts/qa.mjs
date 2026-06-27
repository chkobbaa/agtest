import pw from "/opt/node-tools/node_modules/playwright/index.js";
const { chromium } = pw;

const URL = "http://localhost:4173/";
const OUT = process.argv[2] || "/tmp/qa";
const reduced = process.argv[3] !== "motion";
const lang = process.argv[4] || "en";
import { mkdirSync } from "node:fs";
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();

async function shoot(name, width, height, full = false) {
  const ctx = await browser.newContext({
    viewport: { width, height },
    deviceScaleFactor: 2,
    reducedMotion: reduced ? "reduce" : "no-preference",
  });
  const page = await ctx.newPage();
  await page.goto(URL, { waitUntil: "networkidle" });
  if (lang === "ar") {
    await page.evaluate(() => localStorage.setItem("digl-lang", "ar"));
    await page.reload({ waitUntil: "networkidle" });
  }
  await page.waitForTimeout(reduced ? 700 : 2600);
  // capture viewport-sized hero
  await page.screenshot({ path: `${OUT}/${name}-hero.png` });
  if (full) {
    // walk through sections
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
  }
  await ctx.close();
}

await shoot(`${lang}-desktop`, 1440, 900, true);
await shoot(`${lang}-mobile`, 390, 844, true);
await browser.close();
console.log("QA done →", OUT);
