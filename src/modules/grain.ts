// A lightweight animated film-grain overlay. Flat brand colours read as
// screenprint once a little noise lives on top of them. We pre-render a few
// noise tiles and cycle them so the grain "boils" without per-frame cost.

export function initGrain(canvas: HTMLCanvasElement): void {
  const ctx = canvas.getContext("2d", { alpha: true })!;
  const TILE = 140;
  const FRAMES = 5;
  const tiles: HTMLCanvasElement[] = [];

  for (let f = 0; f < FRAMES; f++) {
    const tc = document.createElement("canvas");
    tc.width = tc.height = TILE;
    const tctx = tc.getContext("2d")!;
    const img = tctx.createImageData(TILE, TILE);
    for (let i = 0; i < img.data.length; i += 4) {
      const v = Math.random() * 255;
      img.data[i] = img.data[i + 1] = img.data[i + 2] = v;
      img.data[i + 3] = Math.random() * 26; // very subtle
    }
    tctx.putImageData(img, 0, 0);
    tiles.push(tc);
  }

  let frame = 0;
  let raf = 0;
  let last = 0;

  function resize() {
    canvas.width = Math.ceil(window.innerWidth);
    canvas.height = Math.ceil(window.innerHeight);
  }

  function draw(now: number) {
    raf = requestAnimationFrame(draw);
    if (now - last < 90) return; // ~11fps boil
    last = now;
    const tile = tiles[frame % FRAMES];
    frame++;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const pattern = ctx.createPattern(tile, "repeat")!;
    ctx.fillStyle = pattern;
    // jitter the origin so the pattern doesn't look static
    ctx.save();
    ctx.translate(Math.random() * TILE, Math.random() * TILE);
    ctx.fillRect(-TILE, -TILE, canvas.width + TILE, canvas.height + TILE);
    ctx.restore();
  }

  resize();
  window.addEventListener("resize", resize, { passive: true });

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) {
    // draw a single static frame
    const pattern = ctx.createPattern(tiles[0], "repeat")!;
    ctx.fillStyle = pattern;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  } else {
    raf = requestAnimationFrame(draw);
  }

  window.addEventListener("beforeunload", () => cancelAnimationFrame(raf));
}
