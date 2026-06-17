"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Wordmark, Button, Container, Bay } from "./ui";

// Signature Aceternity navbar shadow (only shown once scrolled).
const NAV_SHADOW =
  "shadow-[0_0_24px_rgba(34,42,53,0.06),0_1px_1px_rgba(0,0,0,0.05),0_0_0_1px_rgba(34,42,53,0.04),0_0_4px_rgba(34,42,53,0.08),0_16px_68px_rgba(47,48,55,0.05),0_1px_0_rgba(255,255,255,0.1)_inset]";

const link = "text-sm font-medium transition-colors";
const spring = { type: "spring", stiffness: 200, damping: 30 };

export default function Header() {
  const pathname = usePathname();
  const audience = pathname?.startsWith("/dispatchers") ? "dispatchers" : "carriers";
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pillRef = useRef(null);
  const lastY = useRef(0);
  // Full (top) width = the section content width, measured so the resize starts
  // from the real width with no "dead zone" before it visibly shrinks.
  const [fullW, setFullW] = useState(1280);

  useEffect(() => {
    // Shrink on scroll down, stretch back out on scroll up (and near the top).
    lastY.current = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      if (y <= 24) setScrolled(false);
      else if (y > lastY.current + 4) setScrolled(true);
      else if (y < lastY.current - 4) setScrolled(false);
      lastY.current = y;
    };
    const measure = () => {
      const p = pillRef.current?.parentElement;
      if (!p) return;
      const cs = getComputedStyle(p);
      setFullW(p.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight));
    };
    onScroll();
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
    };
  }, []);

  const audienceLink = (active) => `${link} ${active ? "text-ink" : "text-body hover:text-ink"}`;

  return (
    // Aligned to the section content width (same Container + Bay gutter as every
    // section), so the bar lines up with the red rules / the cards below.
    <div className="fixed inset-x-0 top-4 z-50">
      <Container>
        <Bay>
          {/* Resizable navbar: full content-width at the top, springs down to a
              pill with just the logo + auth buttons (80px gap) once scrolled.
              We animate maxWidth (a real width constraint) rather than `layout`,
              so children resize cleanly instead of getting scale-distorted. */}
          <motion.div
            ref={pillRef}
            initial={false}
            animate={{ maxWidth: scrolled ? Math.min(372, fullW) : fullW }}
            transition={spring}
            className={`mx-auto flex w-full items-center justify-between rounded-full ${
              scrolled
                ? `h-12 gap-4 border border-border/70 bg-white/65 pl-5 pr-[5px] backdrop-blur-xl ${NAV_SHADOW}`
                : "h-14 gap-4 px-0"
            }`}
          >
            <Wordmark
              badge={scrolled ? "" : audience === "dispatchers" ? "For dispatchers" : "For carriers"}
            />

            {!scrolled && (
              <nav className="hidden items-center gap-6 lg:flex">
                <Link href="/" className={audienceLink(audience === "carriers")}>Carriers</Link>
                <Link href="/dispatchers" className={audienceLink(audience === "dispatchers")}>Dispatchers</Link>
                <a className={`${link} text-body hover:text-ink`} href="#cta">Contact</a>
              </nav>
            )}

            <div className="hidden items-center gap-2 lg:flex">
              <Button href="#cta" variant="secondary" size="sm">Sign in</Button>
              <Button href="#cta" variant="primary" size="sm">Sign up</Button>
            </div>

            <div className="lg:hidden">
              <Button variant="secondary" size="sm" onClick={() => setOpen((v) => !v)}>Menu</Button>
            </div>
          </motion.div>

          {open ? (
            <div className="mt-2 rounded-2xl border border-border bg-white p-2 shadow-xl lg:hidden">
              <Link href="/" onClick={() => setOpen(false)} className={`block rounded-lg px-3 py-3 text-base font-medium hover:bg-muted ${audience === "carriers" ? "text-ink" : "text-body"}`}>Carriers</Link>
              <Link href="/dispatchers" onClick={() => setOpen(false)} className={`block rounded-lg px-3 py-3 text-base font-medium hover:bg-muted ${audience === "dispatchers" ? "text-ink" : "text-body"}`}>Dispatchers</Link>
              <a href="#cta" onClick={() => setOpen(false)} className="block rounded-lg px-3 py-3 text-base font-medium text-body hover:bg-muted">Contact</a>
              <div className="mt-2 flex flex-col gap-2 p-1">
                <Button href="#cta" variant="secondary" size="sm" className="w-full" onClick={() => setOpen(false)}>Sign in</Button>
                <Button href="#cta" variant="primary" size="sm" className="w-full" onClick={() => setOpen(false)}>Sign up</Button>
              </div>
            </div>
          ) : null}
        </Bay>
      </Container>
    </div>
  );
}
