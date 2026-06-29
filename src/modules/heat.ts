// Desert heat shimmer for the hero: soft warm plumes drifting upward, drawn on
// a canvas with multiply blending so they read as rising heat over the sand.

export function initHeat(canvas: HTMLCanvasElement): void {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const ctx = canvas.getContext("2d")!;
  let w = 0;
  let h = 0;
  let raf = 0;

  interface Plume {
    x: number;
    y: number;
    r: number;
    speed: number;
    sway: number;
    phase: number;
  }
  let plumes: Plume[] = [];

  function seed() {
    const count = Math.round((w * h) / 90000);
    plumes = Array.from({ length: Math.min(28, Math.max(8, count)) }, () => ({
      x: Math.random() * w,
      y: h + Math.random() * h,
      r: 60 + Math.random() * 160,
      speed: 0.1 + Math.random() * 0.35,
      sway: 12 + Math.random() * 30,
      phase: Math.random() * Math.PI * 2,
    }));
  }

  function resize() {
    const rect = canvas.getBoundingClientRect();
    w = canvas.width = Math.max(1, Math.floor(rect.width));
    h = canvas.height = Math.max(1, Math.floor(rect.height));
    seed();
  }

  function frame(t: number) {
    raf = requestAnimationFrame(frame);
    ctx.clearRect(0, 0, w, h);
    for (const p of plumes) {
      p.y -= p.speed;
      const x = p.x + Math.sin(t * 0.0006 + p.phase) * p.sway;
      const alpha = Math.max(0, Math.min(0.06, (p.y / h) * 0.06));
      const grad = ctx.createRadialGradient(x, p.y, 0, x, p.y, p.r);
      grad.addColorStop(0, `rgba(232,163,61,${alpha})`);
      grad.addColorStop(1, "rgba(232,163,61,0)");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
      if (p.y + p.r < 0) {
        p.y = h + p.r;
        p.x = Math.random() * w;
      }
    }
  }

  resize();
  window.addEventListener("resize", resize, { passive: true });
  raf = requestAnimationFrame(frame);
  window.addEventListener("beforeunload", () => cancelAnimationFrame(raf));
}
