"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

// Soft, momentum-based scrolling. Lenis smooths native window scroll (no
// transform wrapper), so fixed/sticky elements and the navbar scroll logic keep
// working. Disabled when the user prefers reduced motion.
export default function SmoothScroll() {
  const lenisRef = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;
    window.__lenis = lenis; // shared with the scroll-to-top button

    let raf;
    const loop = (time) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      lenisRef.current = null;
      if (window.__lenis === lenis) window.__lenis = null;
    };
  }, []);

  // Every route change starts the new page from the very top, so its
  // scroll-reveal animations all play from the beginning as you scroll down.
  useEffect(() => {
    if (lenisRef.current) lenisRef.current.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
