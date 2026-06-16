"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUp } from "lucide-react";

// Floating bottom-right button. Appears once the user has scrolled past a
// threshold; clicking glides back to the top (via Lenis when available, so it
// matches the site's smooth scroll, otherwise native smooth scroll).
export default function ScrollToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toTop = () => {
    const lenis = typeof window !== "undefined" ? window.__lenis : null;
    if (lenis) lenis.scrollTo(0, { duration: 1.1 });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {show ? (
        <motion.button
          type="button"
          onClick={toTop}
          aria-label="Scroll to top"
          initial={{ opacity: 0, scale: 0.6, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 12 }}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.92 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-6 right-6 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-neutral-900 text-white shadow-[0_8px_24px_-6px_rgba(23,23,23,0.45),inset_0_1px_0_0_rgba(255,255,255,0.18)] ring-1 ring-white/10 transition-colors hover:bg-neutral-800"
        >
          <ArrowUp className="h-[18px] w-[18px]" />
        </motion.button>
      ) : null}
    </AnimatePresence>
  );
}
