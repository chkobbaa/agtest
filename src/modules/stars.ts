// A quiet starfield for the night sections, drawn once onto a canvas that
// fills each [data-stars] container. A handful of brighter stars twinkle.

export function initStars(): void {
  document.querySelectorAll<HTMLElement>("[data-stars]").forEach((host) => {
    const canvas = document.createElement("canvas");
    canvas.style.cssText = "position:absolute;inset:0;width:100%;height:100%;";
    host.appendChild(canvas);
    const ctx = canvas.getContext("2d")!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    interface Star {
      x: number;
      y: number;
      r: number;
      a: number;
      tw: number;
    }
    let stars: Star[] = [];
    let w = 0;
    let h = 0;
    let raf = 0;

    function seed() {
      const n = Math.min(160, Math.round((w * h) / 9000));
      stars = Array.from({ length: n }, () => ({
        x: Math.random() * w,
        y: Math.random() * h * 0.8,
        r: Math.random() < 0.92 ? Math.random() * 1.1 + 0.2 : Math.random() * 1.8 + 1,
        a: Math.random() * 0.6 + 0.2,
        tw: Math.random() * Math.PI * 2,
      }));
    }
    function resize() {
      const rect = host.getBoundingClientRect();
      w = canvas.width = Math.max(1, Math.floor(rect.width));
      h = canvas.height = Math.max(1, Math.floor(rect.height));
      seed();
      if (reduce) paintStatic();
    }
    function paintStatic() {
      ctx.clearRect(0, 0, w, h);
      for (const s of stars) {
        ctx.globalAlpha = s.a;
        ctx.fillStyle = s.r > 1 ? "#ffd277" : "#f5f0e3";
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    }
    function frame(t: number) {
      raf = requestAnimationFrame(frame);
      ctx.clearRect(0, 0, w, h);
      for (const s of stars) {
        const a = s.a + Math.sin(t * 0.001 + s.tw) * 0.18;
        ctx.globalAlpha = Math.max(0.05, a);
        ctx.fillStyle = s.r > 1 ? "#ffd277" : "#f5f0e3";
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    }

    resize();
    window.addEventListener("resize", resize, { passive: true });
    if (!reduce) raf = requestAnimationFrame(frame);
    window.addEventListener("beforeunload", () => cancelAnimationFrame(raf));
  });
}
