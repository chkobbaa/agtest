import { JOURNEY } from "../content/catalog";
import { getLang } from "./i18n";

// The road, made interactive. We draw a smooth path through the four stops,
// then let the visitor drag a lantern along it. The nearest stop lights up and
// reveals its note — the Walker's progress under their own hand.

const VBW = 1000;
const VBH = 562;
const SVG_NS = "http://www.w3.org/2000/svg";

const sx = (x: number) => (x / 100) * VBW;
const sy = (y: number) => (y / 100) * VBH;

/** Smooth Catmull-Rom path through the stop coordinates. */
function roadPath(): string {
  const pts = JOURNEY.map((s) => ({ x: sx(s.x), y: sy(s.y) }));
  let d = `M ${pts[0].x} ${pts[0].y}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] || pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] || p2;
    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C ${cp1x} ${cp1y} ${cp2x} ${cp2y} ${p2.x} ${p2.y}`;
  }
  return d;
}

export function initJourney(): void {
  const host = document.querySelector<HTMLElement>("[data-journey]");
  if (!host) return;

  const svg = document.createElementNS(SVG_NS, "svg");
  svg.setAttribute("viewBox", `0 0 ${VBW} ${VBH}`);
  svg.setAttribute("preserveAspectRatio", "xMidYMid meet");

  const d = roadPath();
  svg.innerHTML = `
    <defs>
      <radialGradient id="jglow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#ffd277" stop-opacity="0.9"/>
        <stop offset="60%" stop-color="#e8a33d" stop-opacity="0.25"/>
        <stop offset="100%" stop-color="#e8a33d" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <!-- coastline hint -->
    <path d="M ${sx(46)} ${sy(100)} C ${sx(58)} ${sy(74)} ${sx(72)} ${sy(60)} ${sx(82)} ${sy(34)} C ${sx(88)} ${sy(18)} ${sx(92)} ${sy(6)} ${sx(96)} ${sy(0)}"
      fill="none" stroke="rgba(63,111,163,0.5)" stroke-width="2" stroke-dasharray="2 8" stroke-linecap="round"/>
    <!-- the road -->
    <path id="jroad" d="${d}" fill="none" stroke="rgba(245,240,227,0.25)" stroke-width="3" stroke-dasharray="3 10" stroke-linecap="round"/>
    <path id="jroad-lit" d="${d}" fill="none" stroke="var(--noor)" stroke-width="3" stroke-linecap="round" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1"/>
    <g data-stops></g>
    <g data-lantern style="cursor:none">
      <circle r="46" fill="url(#jglow)"/>
      <circle class="j-lantern-handle" r="9" fill="#fff3cf" stroke="#e8a33d" stroke-width="3"/>
    </g>`;
  host.appendChild(svg);

  // notes overlay (HTML, positioned over the map)
  const notes = document.createElement("div");
  notes.style.cssText = "position:absolute;inset:0;pointer-events:none;";
  host.appendChild(notes);

  const road = svg.querySelector<SVGPathElement>("#jroad")!;
  const roadLit = svg.querySelector<SVGPathElement>("#jroad-lit")!;
  const stopsG = svg.querySelector<SVGGElement>("[data-stops]")!;
  const lantern = svg.querySelector<SVGGElement>("[data-lantern]")!;

  const total = road.getTotalLength();
  // pre-sample the road for nearest-point queries
  const SAMPLES = 240;
  const sampled = Array.from({ length: SAMPLES + 1 }, (_, i) => {
    const pt = road.getPointAtLength((i / SAMPLES) * total);
    return { x: pt.x, y: pt.y, len: (i / SAMPLES) * total };
  });

  // stop length positions (project each stop onto the road)
  const stopLens = JOURNEY.map((s) => {
    const px = sx(s.x);
    const py = sy(s.y);
    let best = 0;
    let bd = Infinity;
    for (const p of sampled) {
      const dd = (p.x - px) ** 2 + (p.y - py) ** 2;
      if (dd < bd) {
        bd = dd;
        best = p.len;
      }
    }
    return best;
  });

  let activeIdx = 0;

  function renderStopsAndNotes() {
    const lang = getLang();
    stopsG.innerHTML = JOURNEY.map((s, i) => {
      const px = sx(s.x);
      const py = sy(s.y);
      const anchorEnd = s.x > 55;
      return `
        <g class="j-stop ${i === activeIdx ? "is-active" : ""}" data-stop="${i}" transform="translate(${px} ${py})">
          <circle class="j-stop__dot" r="5" fill="var(--noor)"/>
          <circle r="16" fill="none" stroke="var(--noor)" stroke-opacity="0.4"/>
          <text class="j-stop__label" x="${anchorEnd ? -22 : 22}" y="-6" text-anchor="${anchorEnd ? "end" : "start"}">${s.city[lang] || s.city.en}</text>
          <text class="j-stop__hour" x="${anchorEnd ? -22 : 22}" y="12" text-anchor="${anchorEnd ? "end" : "start"}">${s.hour}</text>
        </g>`;
    }).join("");

    notes.innerHTML = JOURNEY.map((s, i) => {
      const left = s.x > 55 ? `right:${100 - s.x + 4}%` : `left:${s.x + 4}%`;
      const top = `top:clamp(0px, calc(${s.y}% - 30px), 80%)`;
      return `<div class="j-note ${i === activeIdx ? "is-show" : ""}" data-note="${i}" style="${left};${top}">
        <div class="j-note__city">${s.city[lang] || s.city.en}</div>
        <p>${s.note[lang] || s.note.en}</p>
      </div>`;
    }).join("");
  }

  function setActiveByLen(len: number) {
    // place lantern
    const pt = road.getPointAtLength(len);
    lantern.setAttribute("transform", `translate(${pt.x} ${pt.y})`);
    // lit portion of the road
    roadLit.style.strokeDashoffset = String(1 - Math.min(1, len / total));
    // nearest stop
    let idx = 0;
    let bd = Infinity;
    stopLens.forEach((sl, i) => {
      const dd = Math.abs(sl - len);
      if (dd < bd) {
        bd = dd;
        idx = i;
      }
    });
    if (idx !== activeIdx) {
      activeIdx = idx;
      stopsG.querySelectorAll(".j-stop").forEach((el, i) => el.classList.toggle("is-active", i === idx));
      notes.querySelectorAll(".j-note").forEach((el, i) => el.classList.toggle("is-show", i === idx));
    }
  }

  // pointer → svg coords
  const ptTmp = svg.createSVGPoint();
  function toSvg(clientX: number, clientY: number) {
    ptTmp.x = clientX;
    ptTmp.y = clientY;
    return ptTmp.matrixTransform(svg.getScreenCTM()!.inverse());
  }
  function nearestLen(svgX: number, svgY: number) {
    let best = 0;
    let bd = Infinity;
    for (const p of sampled) {
      const dd = (p.x - svgX) ** 2 + (p.y - svgY) ** 2;
      if (dd < bd) {
        bd = dd;
        best = p.len;
      }
    }
    return best;
  }

  let dragging = false;
  function onMove(e: PointerEvent) {
    if (!dragging) return;
    const p = toSvg(e.clientX, e.clientY);
    setActiveByLen(nearestLen(p.x, p.y));
  }
  lantern.addEventListener("pointerdown", (e) => {
    dragging = true;
    lantern.setPointerCapture(e.pointerId);
  });
  lantern.addEventListener("pointermove", onMove);
  lantern.addEventListener("pointerup", () => (dragging = false));
  // also allow dragging anywhere on the svg
  svg.addEventListener("pointerdown", (e) => {
    const p = toSvg(e.clientX, e.clientY);
    setActiveByLen(nearestLen(p.x, p.y));
    dragging = true;
  });
  svg.addEventListener("pointermove", onMove);
  window.addEventListener("pointerup", () => (dragging = false));

  // clicking a stop walks the lantern there
  stopsG.addEventListener("click", (e) => {
    const g = (e.target as Element).closest<SVGElement>("[data-stop]");
    if (!g) return;
    setActiveByLen(stopLens[Number(g.dataset.stop)]);
  });

  renderStopsAndNotes();
  setActiveByLen(stopLens[0]);
  window.addEventListener("digl:langchange", () => renderStopsAndNotes());
}
