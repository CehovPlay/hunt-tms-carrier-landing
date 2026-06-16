"use client";

import { motion } from "motion/react";

const ease = [0.16, 1, 0.3, 1];

// Scroll-reveal wrapper: fades + lifts its children as the section enters the
// viewport, and reverses when it scrolls back out (so it re-plays on re-entry).
// The negative bottom margin means it fires once the element has *started*
// entering — not the instant it peeks, and never while off-screen.
export function Reveal({ children, delay = 0, y = 22, className = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "0px 0px -15% 0px" }}
      transition={{ duration: 0.55, delay, ease }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
