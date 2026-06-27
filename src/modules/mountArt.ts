import { walkerSVG } from "../art/walker";
import { sealSVG, sunSVG } from "../art/marks";

let counter = 0;

/** Inject hand-built SVG art into every [data-art] placeholder. */
export function mountArt(): void {
  document.querySelectorAll<HTMLElement>("[data-art]").forEach((el) => {
    const kind = el.dataset.art;
    const id = `a${counter++}`;
    switch (kind) {
      case "walker":
        el.innerHTML = walkerSVG(id);
        break;
      case "seal":
        el.innerHTML = sealSVG(id);
        break;
      case "sun":
        el.innerHTML = sunSVG(id);
        break;
    }
  });
}
