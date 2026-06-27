// The lantern cursor: a small flame that follows the pointer, blooming into a
// pool of warm light inside "night" sections. The brand idea — you carry the
// light — becomes the literal interaction.

export function initCursor(): void {
  if (window.matchMedia("(hover: none), (pointer: coarse)").matches) return;
  const cursor = document.querySelector<HTMLElement>("[data-cursor]");
  if (!cursor) return;

  let x = window.innerWidth / 2;
  let y = window.innerHeight / 2;
  let tx = x;
  let ty = y;
  let raf = 0;

  window.addEventListener(
    "pointermove",
    (e) => {
      tx = e.clientX;
      ty = e.clientY;
    },
    { passive: true },
  );

  function loop() {
    raf = requestAnimationFrame(loop);
    // dot follows fast, glow trails via the same eased position
    x += (tx - x) * 0.22;
    y += (ty - y) * 0.22;
    cursor!.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  }
  raf = requestAnimationFrame(loop);

  // grow on interactive elements
  const hoverSel = "a, button, .product, .drop-card, .entry, .size-chip, [data-cursor-hover]";
  document.addEventListener("pointerover", (e) => {
    if ((e.target as Element)?.closest?.(hoverSel)) cursor.classList.add("is-hover");
  });
  document.addEventListener("pointerout", (e) => {
    if ((e.target as Element)?.closest?.(hoverSel)) cursor.classList.remove("is-hover");
  });

  window.addEventListener("beforeunload", () => cancelAnimationFrame(raf));
}
