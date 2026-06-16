"use client";

import { motion } from "motion/react";

const ease = [0.16, 1, 0.3, 1];

// Scroll-reveal wrapper: fades + lifts its children into view once. Pass an
// incremental `delay` to neighbouring items to get a cascade/stagger effect.
export function Reveal({ children, delay = 0, y = 22, className = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.55, delay, ease }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
