import type { Product } from "../content/types";

// Garment "tech-flat" illustrations, hand-built per silhouette.
// Each is a solid fabric shape (tinted by the drop's color) with seam
// detailing and a small screenprint mark on the chest — so the shop reads
// as real product, not stock photography.

type Silhouette = Product["silhouette"];

/** Small chest print: a lantern glyph, the DIGL signature mark. */
function chestMark(cx: number, cy: number, ink: string): string {
  return `<g transform="translate(${cx} ${cy}) scale(0.5)" fill="none" stroke="${ink}" stroke-width="3" stroke-linecap="round" opacity="0.85">
    <path d="M0 -20 C -10 -20 -14 -12 -14 -4 M0 -20 C 10 -20 14 -12 14 -4"/>
    <line x1="0" y1="-28" x2="0" y2="-20"/>
    <path d="M-15 -4 L 15 -4 L 19 30 L -19 30 Z"/>
    <ellipse cx="0" cy="14" rx="6" ry="9" fill="${ink}" stroke="none"/>
  </g>`;
}

function tee(fill: string, seam: string, ink: string): string {
  return `
    <path d="M104 70 L70 86 L52 132 L80 150 L96 120 L96 250 L204 250 L204 120 L220 150 L248 132 L230 86 L196 70 C188 92 164 100 150 100 C136 100 112 92 104 70 Z"
      fill="${fill}" stroke="${seam}" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M104 70 C112 92 136 100 150 100 C164 100 188 92 196 70" fill="none" stroke="${seam}" stroke-width="2.5"/>
    ${chestMark(150, 150, ink)}`;
}

function hoodie(fill: string, seam: string, ink: string): string {
  return `
    <path d="M100 78 L66 92 L46 140 L78 158 L96 126 L96 256 L204 256 L204 126 L222 158 L254 140 L234 92 L200 78
      C 196 96 176 104 150 104 C 124 104 104 96 100 78 Z" fill="${fill}" stroke="${seam}" stroke-width="2.5" stroke-linejoin="round"/>
    <!-- hood -->
    <path d="M100 78 C 108 56 126 44 150 44 C 174 44 192 56 200 78 C 184 92 168 98 150 98 C 132 98 116 92 100 78 Z"
      fill="${fill}" stroke="${seam}" stroke-width="2.5"/>
    <path d="M118 70 C 128 84 172 84 182 70" fill="none" stroke="${seam}" stroke-width="2.5"/>
    <!-- pocket -->
    <path d="M112 196 L188 196 L196 236 L104 236 Z" fill="none" stroke="${seam}" stroke-width="2.5"/>
    <!-- drawstrings -->
    <line x1="140" y1="96" x2="138" y2="150" stroke="${seam}" stroke-width="3" stroke-linecap="round"/>
    <line x1="160" y1="96" x2="162" y2="150" stroke="${seam}" stroke-width="3" stroke-linecap="round"/>
    ${chestMark(150, 150, ink)}`;
}

function cargo(fill: string, seam: string, ink: string): string {
  return `
    <path d="M108 60 L192 60 L196 150 L186 280 L156 280 L150 168 L144 280 L114 280 L104 150 Z"
      fill="${fill}" stroke="${seam}" stroke-width="2.5" stroke-linejoin="round"/>
    <line x1="108" y1="60" x2="192" y2="60" stroke="${seam}" stroke-width="4"/>
    <rect x="100" y="120" width="26" height="34" rx="3" fill="none" stroke="${seam}" stroke-width="2.5"/>
    <rect x="174" y="120" width="26" height="34" rx="3" fill="none" stroke="${seam}" stroke-width="2.5"/>
    <line x1="150" y1="64" x2="150" y2="168" stroke="${seam}" stroke-width="2" opacity="0.6"/>
    ${chestMark(150, 96, ink)}`;
}

function jacket(fill: string, seam: string, ink: string): string {
  return `
    <path d="M104 72 L68 88 L50 140 L80 156 L96 126 L96 258 L204 258 L204 126 L220 156 L250 140 L232 88 L196 72
      L150 92 Z" fill="${fill}" stroke="${seam}" stroke-width="2.5" stroke-linejoin="round"/>
    <!-- collar -->
    <path d="M104 72 L150 92 L196 72 L176 64 L150 74 L124 64 Z" fill="${fill}" stroke="${seam}" stroke-width="2.5"/>
    <!-- placket + buttons -->
    <line x1="150" y1="92" x2="150" y2="256" stroke="${seam}" stroke-width="2.5"/>
    <circle cx="150" cy="130" r="3.5" fill="${seam}"/><circle cx="150" cy="170" r="3.5" fill="${seam}"/>
    <circle cx="150" cy="210" r="3.5" fill="${seam}"/>
    <!-- chest pockets -->
    <rect x="110" y="150" width="30" height="34" rx="2" fill="none" stroke="${seam}" stroke-width="2.5"/>
    <rect x="160" y="150" width="30" height="34" rx="2" fill="none" stroke="${seam}" stroke-width="2.5"/>
    ${chestMark(174, 124, ink)}`;
}

function windbreaker(fill: string, seam: string, ink: string): string {
  return `
    <path d="M102 76 L66 92 L48 142 L80 158 L96 128 L96 256 L204 256 L204 128 L220 158 L252 142 L234 92 L198 76
      C 190 92 172 100 150 100 C 128 100 110 92 102 76 Z" fill="${fill}" stroke="${seam}" stroke-width="2.5" stroke-linejoin="round"/>
    <!-- half-zip -->
    <line x1="150" y1="100" x2="150" y2="170" stroke="${seam}" stroke-width="3"/>
    <rect x="146" y="96" width="8" height="14" rx="2" fill="${seam}"/>
    <!-- horizontal colourblock seam -->
    <path d="M96 180 L204 180" stroke="${seam}" stroke-width="2.5"/>
    <path d="M96 180 L204 180 L204 256 L96 256 Z" fill="${ink}" opacity="0.08"/>
    ${chestMark(122, 140, ink)}`;
}

function beanie(fill: string, seam: string, ink: string): string {
  return `
    <path d="M84 196 C 84 120 110 86 150 86 C 190 86 216 120 216 196 Z" fill="${fill}" stroke="${seam}" stroke-width="2.5"/>
    <rect x="76" y="192" width="148" height="34" rx="10" fill="${fill}" stroke="${seam}" stroke-width="2.5"/>
    <g stroke="${seam}" stroke-width="2" opacity="0.5">
      <line x1="110" y1="92" x2="96" y2="196"/><line x1="130" y1="88" x2="126" y2="196"/>
      <line x1="150" y1="86" x2="150" y2="196"/><line x1="170" y1="88" x2="174" y2="196"/>
      <line x1="190" y1="92" x2="204" y2="196"/>
    </g>
    ${chestMark(150, 208, ink)}`;
}

function knit(fill: string, seam: string, ink: string): string {
  // crewneck with a jacquard band
  const band: string[] = [];
  for (let x = 96; x < 204; x += 14) band.push(`<path d="M${x} 150 l7 8 l7 -8 l7 8" fill="none" stroke="${ink}" stroke-width="2" opacity="0.6"/>`);
  return `
    <path d="M100 86 L66 100 L48 146 L80 162 L96 132 L96 256 L204 256 L204 132 L220 162 L252 146 L234 100 L200 86
      C 192 100 172 106 150 106 C 128 106 108 100 100 86 Z" fill="${fill}" stroke="${seam}" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M112 90 C 124 104 176 104 188 90" fill="none" stroke="${seam}" stroke-width="3"/>
    <rect x="96" y="244" width="108" height="12" fill="${ink}" opacity="0.1"/>
    ${band.join("")}
    ${chestMark(150, 190, ink)}`;
}

function tank(fill: string, seam: string, ink: string): string {
  return `
    <path d="M118 60 L150 78 L182 60 L198 76 L198 256 L102 256 L102 76 Z"
      fill="${fill}" stroke="${seam}" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M118 60 C 122 50 136 44 150 44 C 164 44 178 50 182 60" fill="none" stroke="${seam}" stroke-width="2.5"/>
    ${chestMark(150, 160, ink)}`;
}

function bag(fill: string, seam: string, ink: string): string {
  return `
    <rect x="86" y="130" width="128" height="120" rx="6" fill="${fill}" stroke="${seam}" stroke-width="2.5"/>
    <path d="M114 130 C 114 96 186 96 186 130" fill="none" stroke="${seam}" stroke-width="4" stroke-linecap="round"/>
    <line x1="86" y1="175" x2="214" y2="175" stroke="${seam}" stroke-width="2" opacity="0.5"/>
    ${chestMark(150, 195, ink)}`;
}

function cap(fill: string, seam: string, ink: string): string {
  return `
    <path d="M80 170 C 80 120 110 88 150 88 C 190 88 220 120 220 170 Z" fill="${fill}" stroke="${seam}" stroke-width="2.5"/>
    <path d="M80 170 L220 170 L228 186 L72 186 Z" fill="${fill}" stroke="${seam}" stroke-width="2.5"/>
    <path d="M80 170 L228 186" fill="none" stroke="${seam}" stroke-width="2"/>
    <line x1="150" y1="88" x2="150" y2="170" stroke="${seam}" stroke-width="1.5" opacity="0.4"/>
    ${chestMark(150, 140, ink)}`;
}

const TABLE: Record<Silhouette, (f: string, s: string, i: string) => string> = {
  tee,
  hoodie,
  cargo,
  jacket,
  windbreaker,
  beanie,
  knit,
  tank,
  bag,
  cap,
};

/** Render a garment flat. `tint` is the drop color; `ink` the print color. */
export function garmentSVG(sil: Silhouette, tint: string, ink: string): string {
  // Fabric body uses a desaturated mix of the drop color over a neutral so it
  // reads as cloth, not a flat swatch.
  const fill = tint;
  const seam = "rgba(0,0,0,0.45)";
  const body = TABLE[sil](fill, seam, ink);
  return `<svg class="garment" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${sil}">${body}</svg>`;
}
