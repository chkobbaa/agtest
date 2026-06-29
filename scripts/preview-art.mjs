// Dev-only harness: bundle the art modules, lay them out on tiles, and
// screenshot with headless Chromium so we can iterate on the hand-built SVG
// visually. Not part of the shipped site.
import { build } from "esbuild";
import pw from "/opt/node-tools/node_modules/playwright/index.js";
const { chromium } = pw;
import { writeFileSync, mkdirSync } from "node:fs";

const entry = process.argv[2] || "src/art/_lab.ts";
const out = process.argv[3] || "/tmp/art.png";

const result = await build({
  entryPoints: [entry],
  bundle: true,
  format: "esm",
  write: false,
  platform: "browser",
});
const js = result.outputFiles[0].text;

const html = `<!doctype html><html><head><meta charset="utf-8">
<style>
  :root{--sand:#ece3d2;--ink:#1a130b;}
  body{margin:0;background:var(--sand);font-family:sans-serif;}
  #app{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:8px;padding:8px;}
  .tile{background:#e3d8c2;border:1px solid #00000022;position:relative;min-height:260px;display:flex;align-items:center;justify-content:center;}
  .tile.dark{background:#120d07;}
  .tile svg{max-width:100%;max-height:340px;display:block;}
  .lab{font:11px monospace;position:absolute;top:4px;left:6px;color:#0008;}
  .tile.dark .lab{color:#fff8;}
</style></head><body><div id="app"></div>
<script type="module">${js}</script>
</body></html>`;

mkdirSync("/tmp/artlab", { recursive: true });
writeFileSync("/tmp/artlab/index.html", html);

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 900 }, deviceScaleFactor: 2 });
await page.goto("file:///tmp/artlab/index.html");
await page.waitForTimeout(400);
await page.screenshot({ path: out, fullPage: true });
await browser.close();
console.log("wrote", out);
