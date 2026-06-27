// Brand marks & motifs, all hand-built SVG. No external assets.

/**
 * The DIGL seal: a single date hanging inside a ring of palm-frond rays —
 * "the date of light". Works as a favicon, a loader, a footer stamp.
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
    <radialGradient id="${g("d")}" cx="42%" cy="34%" r="72%">
      <stop offset="0%" stop-color="#ffe6a8"/>
      <stop offset="55%" stop-color="#e8a33d"/>
      <stop offset="100%" stop-color="#8a4a17"/>
    </radialGradient>
  </defs>
  <g stroke="currentColor" stroke-width="2.4" stroke-linecap="round">${rays.join("")}</g>
  <circle cx="64" cy="64" r="33" fill="none" stroke="currentColor" stroke-width="2.4"/>
  <!-- the date -->
  <ellipse cx="64" cy="66" rx="13" ry="20" fill="url(#${g("d")})"/>
  <path d="M64 46 q 9 8 0 40 q -9 -32 0 -40" fill="#000" opacity="0.18"/>
  <!-- tiny stem leaf -->
  <path d="M64 46 c 6 -7 13 -9 19 -7 c -4 6 -11 9 -19 9 Z" fill="currentColor"/>
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
