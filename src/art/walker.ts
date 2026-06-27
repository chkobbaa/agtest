// السّايْر — The Walker.
// The brand's character, hand-built as a woodcut-style SVG silhouette:
// a hooded wanderer carrying a lantern whose flame is a single glowing date.
// Flat ink shapes (screenprint aesthetic) + one amber light source.
// He leans into a walk toward the light he carries (moving left).
//
// `idPrefix` lets us mount the figure more than once on a page without
// clashing gradient / filter IDs.

/** A stylised date-palm frond: a curved midrib with leaflets fanning out. */
function frond(cx: number, cy: number, rot: number, len: number): string {
  const leaflets: string[] = [];
  const n = 9;
  for (let i = 1; i <= n; i++) {
    const t = i / (n + 1);
    const px = cx + Math.cos((rot * Math.PI) / 180) * len * t;
    const py = cy - Math.sin((rot * Math.PI) / 180) * len * t;
    const blade = len * 0.34 * (1 - t * 0.5);
    // two leaflets, splaying off the rib
    const a1 = ((rot + 52) * Math.PI) / 180;
    const a2 = ((rot - 30) * Math.PI) / 180;
    leaflets.push(
      `<path d="M${px} ${py} Q ${px + Math.cos(a1) * blade * 0.6} ${py - Math.sin(a1) * blade * 0.6} ${px + Math.cos(a1) * blade} ${py - Math.sin(a1) * blade}"/>`,
      `<path d="M${px} ${py} Q ${px + Math.cos(a2) * blade * 0.6} ${py - Math.sin(a2) * blade * 0.6} ${px + Math.cos(a2) * blade} ${py - Math.sin(a2) * blade}"/>`,
    );
  }
  const tipX = cx + Math.cos((rot * Math.PI) / 180) * len;
  const tipY = cy - Math.sin((rot * Math.PI) / 180) * len;
  return `<g fill="none" stroke="#1c2417" stroke-width="4.5" stroke-linecap="round" opacity="0.9">
    <path d="M${cx} ${cy} L ${tipX} ${tipY}" stroke-width="6"/>
    ${leaflets.join("")}
  </g>`;
}

export function walkerSVG(idPrefix = "wk"): string {
  const g = (s: string) => `${idPrefix}-${s}`;
  return /* html */ `
<svg class="walker" viewBox="0 0 480 680" role="img" aria-labelledby="${g("title")}" xmlns="http://www.w3.org/2000/svg">
  <title id="${g("title")}">The Walker — a hooded figure carrying a glowing date-lantern</title>
  <defs>
    <radialGradient id="${g("glow")}" cx="50%" cy="45%" r="55%">
      <stop offset="0%" stop-color="#fff3cf"/>
      <stop offset="35%" stop-color="#ffcf6b"/>
      <stop offset="70%" stop-color="#e8a33d"/>
      <stop offset="100%" stop-color="#e8a33d" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="${g("date")}" cx="40%" cy="35%" r="75%">
      <stop offset="0%" stop-color="#ffe6a8"/>
      <stop offset="55%" stop-color="#f0a83f"/>
      <stop offset="100%" stop-color="#7a3d12"/>
    </radialGradient>
    <linearGradient id="${g("cloth")}" x1="0" y1="0" x2="0.25" y2="1">
      <stop offset="0%" stop-color="#241a12"/>
      <stop offset="100%" stop-color="#0d0905"/>
    </linearGradient>
    <filter id="${g("soft")}" x="-60%" y="-60%" width="220%" height="220%">
      <feGaussianBlur stdDeviation="14"/>
    </filter>
  </defs>

  <!-- cast lantern glow on the ground -->
  <ellipse class="wk-floorglow" cx="138" cy="616" rx="160" ry="26" fill="url(#${g("glow")})" opacity="0.45"/>
  <!-- ground shadow of the figure -->
  <ellipse cx="250" cy="640" rx="160" ry="18" fill="#000" opacity="0.16"/>

  <g class="wk-body">
    <!-- back palm frond strapped over the shoulder (he walks left, frond trails right) -->
    <g class="wk-frond">
      ${frond(300, 252, 64, 150)}
    </g>

    <!-- flowing robe : one strong silhouette, leaning into the walk, back hem trailing -->
    <path class="wk-cloak" fill="url(#${g("cloth")})" d="
      M176 250
      C 150 300 138 356 132 410
      C 127 460 134 520 140 566
      C 152 560 176 556 196 566
      C 232 548 252 588 300 600
      C 342 610 372 614 398 632
      C 384 520 364 396 332 296
      C 322 266 296 250 240 250
      C 212 250 192 248 176 250 Z"/>

    <!-- fold lines -->
    <g stroke="#000" stroke-opacity="0.32" stroke-width="3" fill="none" stroke-linecap="round">
      <path d="M196 282 C 176 380 158 480 150 556"/>
      <path d="M256 270 C 268 400 296 520 330 600"/>
      <path d="M226 262 C 222 360 214 460 196 558"/>
    </g>

    <!-- carrying arm : sleeve reaching forward-down to the lantern -->
    <path class="wk-arm" fill="url(#${g("cloth")})" d="
      M188 292
      C 156 308 128 346 116 398
      C 130 410 150 410 164 400
      C 176 360 198 332 220 320
      C 212 304 200 294 188 292 Z"/>

    <!-- shoulder band : closes the neck so no background shows under the hood -->
    <path fill="url(#${g("cloth")})" d="M166 244 C 196 232 286 232 322 248 L 338 308 L 150 308 Z"/>

    <!-- hood : pointed ogive arch, tilted slightly toward the walk -->
    <path class="wk-hood" fill="url(#${g("cloth")})" d="
      M170 270
      C 162 152 188 76 234 78
      C 280 80 314 154 312 270
      C 300 246 272 234 240 234
      C 208 234 184 248 170 270 Z"/>

    <!-- face cavity in shadow -->
    <path class="wk-face" fill="#080502" d="
      M192 252
      C 190 172 208 122 236 124
      C 264 126 286 172 284 252
      C 270 236 254 230 238 230
      C 222 230 206 238 192 252 Z"/>
    <!-- the inner spark : a faint sign of the light he carries -->
    <circle class="wk-spark" cx="237" cy="198" r="6.5" fill="#e8a33d"/>
    <circle cx="237" cy="198" r="15" fill="#e8a33d" opacity="0.25" filter="url(#${g("soft")})"/>
  </g>

  <!-- the lantern, held forward -->
  <g class="wk-lantern" transform="translate(108 404)">
    <circle cx="0" cy="36" r="96" fill="url(#${g("glow")})" opacity="0.85" filter="url(#${g("soft")})"/>
    <!-- handle -->
    <path d="M0 -14 C -16 -14 -22 -2 -22 12 M0 -14 C 16 -14 22 -2 22 12" fill="none" stroke="#120c07" stroke-width="5" stroke-linecap="round"/>
    <line x1="0" y1="-30" x2="0" y2="-14" stroke="#120c07" stroke-width="5" stroke-linecap="round"/>
    <!-- glass cage -->
    <path d="M-26 12 L 26 12 L 32 78 L -32 78 Z" fill="#1a120a" opacity="0.55"/>
    <path d="M-26 12 L 26 12 L 32 78 L -32 78 Z" fill="none" stroke="#120c07" stroke-width="4"/>
    <line x1="0" y1="12" x2="0" y2="78" stroke="#120c07" stroke-width="2.5" opacity="0.6"/>
    <rect x="-30" y="4" width="60" height="10" rx="3" fill="#120c07"/>
    <rect x="-36" y="76" width="72" height="12" rx="3" fill="#120c07"/>
    <!-- the date, glowing inside -->
    <ellipse class="wk-flame" cx="0" cy="48" rx="13" ry="20" fill="url(#${g("date")})"/>
    <ellipse cx="0" cy="48" rx="26" ry="34" fill="#ffd277" opacity="0.5" filter="url(#${g("soft")})"/>
  </g>
</svg>`;
}
