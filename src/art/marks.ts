// Brand marks & motifs, all hand-built SVG. No external assets.

/**
 * The DIGL seal: a carried ember inside a ring of road rays.
 * Works as a favicon, a loader, a footer stamp.
 */
export function sealSVG(idPrefix = "seal"): string {
  const g = (s: string) => `${idPrefix}-${s}`;
  const rays: string[] = [];
  const N = 24;
  for (let i = 0; i < N; i++) {
    const a = (i / N) * Math.PI * 2;
    const r1 = 40;
    const r2 = i % 2 === 0 ? 50 : 46;
    rays.push(
      `<line x1="${(64 + Math.cos(a) * r1).toFixed(1)}" y1="${(64 + Math.sin(a) * r1).toFixed(1)}" x2="${(64 + Math.cos(a) * r2).toFixed(1)}" y2="${(64 + Math.sin(a) * r2).toFixed(1)}"/>`,
    );
  }
  return /* html */ `
<svg class="seal" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <defs>
    <radialGradient id="${g("ember")}" cx="42%" cy="34%" r="72%">
      <stop offset="0%" stop-color="#ffe6a8"/>
      <stop offset="55%" stop-color="#e8a33d"/>
      <stop offset="100%" stop-color="#8a4a17"/>
    </radialGradient>
  </defs>
  <g stroke="currentColor" stroke-width="2.4" stroke-linecap="round">${rays.join("")}</g>
  <circle cx="64" cy="64" r="33" fill="none" stroke="currentColor" stroke-width="2.4"/>
  <!-- the carried ember -->
  <ellipse cx="64" cy="66" rx="13" ry="20" fill="url(#${g("ember")})"/>
  <path d="M64 46 q 9 8 0 40 q -9 -32 0 -40" fill="#000" opacity="0.18"/>
  <!-- tiny route flare -->
  <path d="M64 46 c 8 -5 15 -6 20 -3 c -5 5 -12 7 -20 6 Z" fill="currentColor"/>
</svg>`;
}

/** A radiating sun, used behind the hero. */
export function sunSVG(idPrefix = "sun"): string {
  const g = (s: string) => `${idPrefix}-${s}`;
  return /* html */ `<svg class="sun" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <defs><radialGradient id="${g("r")}" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#ffdf8e"/><stop offset="60%" stop-color="#e8a33d"/>
      <stop offset="100%" stop-color="#e8a33d" stop-opacity="0"/>
    </radialGradient></defs>
    <circle cx="100" cy="100" r="100" fill="url(#${g("r")})"/>
    <circle cx="100" cy="100" r="44" fill="#e8a33d"/>
  </svg>`;
}

// ---------------------------------------------------------------------------
// PORTRAITS — "The Makers". Woodcut-style hooded busts, one per crew role.
// Same flat-ink + single-amber-light language as the Walker, kept simple so
// the grid reads as a crafted set, not stock avatars. Each variant carries a
// tool/attribute that signals the role.
// ---------------------------------------------------------------------------
type Portrait = "keeper" | "cutter" | "ink" | "scribe";

/** A small role attribute drawn beside the bust (shoulder area). */
function attribute(kind: Portrait, accent: string): string {
  switch (kind) {
    case "keeper":
      // a carried lantern glow at the shoulder
      return `<g>
        <circle cx="150" cy="150" r="34" fill="${accent}" opacity="0.18"/>
        <rect x="138" y="138" width="24" height="30" rx="3" fill="none" stroke="${accent}" stroke-width="3"/>
        <ellipse cx="150" cy="154" rx="6" ry="9" fill="${accent}"/>
        <line x1="150" y1="128" x2="150" y2="138" stroke="${accent}" stroke-width="3" stroke-linecap="round"/>
      </g>`;
    case "cutter":
      // crossed shears
      return `<g stroke="${accent}" stroke-width="3.4" fill="none" stroke-linecap="round" opacity="0.92">
        <line x1="128" y1="132" x2="170" y2="172"/><line x1="170" y1="132" x2="128" y2="172"/>
        <circle cx="126" cy="176" r="6"/><circle cx="172" cy="176" r="6"/>
      </g>`;
    case "ink":
      // a squeegee stroke + drip
      return `<g opacity="0.92">
        <rect x="124" y="140" width="52" height="9" rx="2" fill="${accent}"/>
        <path d="M150 149 q -3 16 0 26 q 3 -10 0 -26" fill="${accent}"/>
      </g>`;
    case "scribe":
      // a reed pen with a nib
      return `<g stroke="${accent}" stroke-width="3.4" fill="none" stroke-linecap="round" opacity="0.92">
        <line x1="128" y1="176" x2="172" y2="132"/>
        <path d="M168 128 l8 0 l-4 8 Z" fill="${accent}" stroke="none"/>
      </g>`;
  }
}

/**
 * A hooded bust. `tint` colors the hood cloth, `ink` is the highlight/print.
 * Variants differ in hood shape and the role attribute.
 */
export function portraitSVG(variant: Portrait, tint: string, ink: string, idPrefix = "pt"): string {
  const g = (s: string) => `${idPrefix}-${s}`;
  // slight per-variant hood character
  const hood: Record<Portrait, string> = {
    // tall pointed ogive
    keeper: "M150 36 C 96 40 70 132 78 210 C 104 188 196 188 222 210 C 230 132 204 40 150 36 Z",
    // broad, lower hood
    cutter: "M150 44 C 88 50 66 140 82 212 C 108 192 192 192 218 212 C 234 140 212 50 150 44 Z",
    // asymmetric, leaning
    ink: "M150 38 C 92 44 64 128 80 210 C 108 190 198 190 224 208 C 234 124 206 46 150 38 Z",
    // narrow, scholarly
    scribe: "M150 40 C 100 44 80 130 86 210 C 110 192 190 192 214 210 C 220 130 200 44 150 40 Z",
  };
  return /* html */ `
<svg class="portrait" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="DIGL maker portrait">
  <defs>
    <linearGradient id="${g("cloth")}" x1="0" y1="0" x2="0.3" y2="1">
      <stop offset="0%" stop-color="${tint}"/>
      <stop offset="100%" stop-color="${tint}" stop-opacity="0.72"/>
    </linearGradient>
    <radialGradient id="${g("spark")}" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#ffe6a8"/><stop offset="100%" stop-color="#e8a33d" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <!-- backing halo -->
  <circle cx="150" cy="150" r="120" fill="${tint}" opacity="0.08"/>
  <!-- shoulders -->
  <path d="M40 300 C 48 232 96 206 150 206 C 204 206 252 232 260 300 Z" fill="url(#${g("cloth")})" stroke="rgba(0,0,0,0.4)" stroke-width="2.5"/>
  <!-- hood -->
  <path d="${hood[variant]}" fill="url(#${g("cloth")})" stroke="rgba(0,0,0,0.4)" stroke-width="2.5" stroke-linejoin="round"/>
  <!-- face cavity in shadow -->
  <path d="M110 150 C 108 96 128 70 150 70 C 172 70 192 96 190 150 C 176 132 160 126 150 126 C 140 126 124 132 110 150 Z" fill="#0c0804"/>
  <!-- inner spark: the light they each carry -->
  <circle cx="150" cy="118" r="6" fill="${ink === "#1a1206" || ink === "#241a10" ? "#e8a33d" : ink}"/>
  <circle cx="150" cy="118" r="20" fill="url(#${g("spark")})" opacity="0.7"/>
  ${attribute(variant, ink === "#1a1206" || ink === "#241a10" ? "#e8a33d" : ink)}
</svg>`;
}
