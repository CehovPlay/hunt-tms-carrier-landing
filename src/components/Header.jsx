"use client";

import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Truck, Radio, MessageSquare, ArrowUpRight } from "lucide-react";
import { Wordmark, Button, Container, Bay } from "./ui";

// Signature Aceternity navbar shadow (only shown once scrolled).
const NAV_SHADOW =
  "shadow-[0_0_24px_rgba(34,42,53,0.06),0_1px_1px_rgba(0,0,0,0.05),0_0_0_1px_rgba(34,42,53,0.04),0_0_4px_rgba(34,42,53,0.08),0_16px_68px_rgba(47,48,55,0.05),0_1px_0_rgba(255,255,255,0.1)_inset]";

const link = "text-sm font-medium transition-colors";
const spring = { type: "spring", stiffness: 200, damping: 30 };

// Mobile / tablet menu rows — each maps to a real destination with a one-line
// pitch and an icon, so the dropdown reads like a mini product menu, not a list.
const NAV = [
  { href: "/", label: "Carriers", desc: "Run your fleet on one platform", icon: Truck, key: "carriers" },
  { href: "/dispatchers", label: "Dispatchers", desc: "Built for dispatch services", icon: Radio, key: "dispatchers" },
  { href: "#cta", label: "Contact", desc: "Talk to the team", icon: MessageSquare, key: "contact" },
];

// Spring-in panel with a soft stagger so the rows cascade in.
const panelV = {
  hidden: { opacity: 0, y: -8, scale: 0.98 },
  show: {
    opacity: 1, y: 0, scale: 1,
    transition: { type: "spring", stiffness: 320, damping: 30, staggerChildren: 0.05, delayChildren: 0.04 },
  },
  exit: { opacity: 0, y: -8, scale: 0.98, transition: { duration: 0.16, ease: [0.4, 0, 1, 1] } },
};
const itemV = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 380, damping: 32 } },
};

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

  // While the mobile menu is open: freeze background scroll (pausing Lenis so
  // its momentum doesn't fight the lock), and close on Escape.
  useEffect(() => {
    if (!open) return;
    const lenis = typeof window !== "undefined" ? window.__lenis : null;
    lenis?.stop();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => {
      lenis?.start();
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Close the menu on navigation.
  useEffect(() => { setOpen(false); }, [pathname]);

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
            className={`relative z-10 mx-auto flex w-full items-center justify-between rounded-full ${
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

            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="relative flex h-9 w-9 items-center justify-center rounded-full text-ink transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand lg:hidden"
            >
              <motion.span
                className="absolute h-[1.5px] w-[18px] rounded-full bg-current"
                animate={open ? { rotate: 45, y: 0 } : { rotate: 0, y: -3 }}
                transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
              />
              <motion.span
                className="absolute h-[1.5px] w-[18px] rounded-full bg-current"
                animate={open ? { rotate: -45, y: 0 } : { rotate: 0, y: 3 }}
                transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
              />
            </button>
          </motion.div>

          <AnimatePresence>
            {open && (
              <>
                {/* Dim + blur the page behind the menu; click anywhere to close. */}
                <motion.button
                  type="button"
                  aria-hidden
                  tabIndex={-1}
                  onClick={() => setOpen(false)}
                  className="fixed inset-0 z-0 cursor-default bg-ink/10 backdrop-blur-[3px] lg:hidden"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                />
                <motion.nav
                  variants={panelV}
                  initial="hidden"
                  animate="show"
                  exit="exit"
                  style={{ transformOrigin: "top" }}
                  className={`relative z-10 mt-2 overflow-hidden rounded-[26px] border border-border/70 bg-white/80 p-2 backdrop-blur-xl lg:hidden ${NAV_SHADOW}`}
                >
                  {NAV.map((item) => {
                    const Icon = item.icon;
                    const active = item.key === audience;
                    const Tag = item.href.startsWith("#") ? "a" : Link;
                    return (
                      <motion.div variants={itemV} key={item.key}>
                        <Tag
                          href={item.href}
                          onClick={() => setOpen(false)}
                          className={`group flex items-center gap-3.5 rounded-2xl px-3 py-3 transition-colors ${active ? "bg-brand-soft" : "hover:bg-muted"}`}
                        >
                          <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition-colors ${active ? "border-transparent bg-brand text-white" : "border-border bg-white text-faint group-hover:text-ink"}`}>
                            <Icon className="h-[18px] w-[18px]" strokeWidth={2} />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block text-[15px] font-semibold text-ink">{item.label}</span>
                            <span className="block text-[13px] text-faint">{item.desc}</span>
                          </span>
                          {active ? (
                            <span className="mr-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                          ) : (
                            <ArrowUpRight className="h-4 w-4 shrink-0 text-faint transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink" />
                          )}
                        </Tag>
                      </motion.div>
                    );
                  })}
                  <motion.div variants={itemV} className="mt-2 flex flex-col gap-2 border-t border-border/70 px-1 pb-1 pt-3">
                    <Button href="#cta" variant="secondary" size="sm" className="w-full border border-border" onClick={() => setOpen(false)}>Sign in</Button>
                    <Button href="#cta" variant="primary" size="sm" className="w-full" onClick={() => setOpen(false)}>Sign up</Button>
                  </motion.div>
                </motion.nav>
              </>
            )}
          </AnimatePresence>
        </Bay>
      </Container>
    </div>
  );
}
