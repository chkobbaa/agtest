// Dev-only art lab: renders every shipped piece of hand-built art on a grid so
// we can iterate on the SVG visually (see scripts/preview-art.mjs). Not part of
// the production bundle — nothing imports this from the app entry.
import { walkerSVG } from "./walker";
import { sealSVG, sunSVG } from "./marks";
import { garmentSVG } from "./garments";

const app = document.getElementById("app")!;
function tile(label: string, svg: string, dark = false) {
  const d = document.createElement("div");
  d.className = "tile" + (dark ? " dark" : "");
  d.innerHTML = `<span class="lab">${label}</span>${svg}`;
  app.appendChild(d);
}

tile("walker", walkerSVG("a"));
tile("walker / dark", walkerSVG("b"), true);
tile("seal", `<span style="color:#1a130b;width:60%">${sealSVG()}</span>`);
tile("sun", sunSVG());
tile("hoodie GHBAR", garmentSVG("hoodie", "#c9a06b", "#241a10"));
tile("tee NOOR", garmentSVG("tee", "#e8a33d", "#1a1206"));
tile("cargo", garmentSVG("cargo", "#c9a06b", "#241a10"));
tile("jacket DERB", garmentSVG("jacket", "#3f6fa3", "#f1f4f8"));
tile("windbreaker", garmentSVG("windbreaker", "#e8a33d", "#1a1206"));
tile("beanie", garmentSVG("beanie", "#3f6fa3", "#f1f4f8"));
tile("knit RAHA", garmentSVG("knit", "#2f5d4a", "#eef3ec"));
