import Link from "next/link";

// Single shared container — header, footer and every content section use the
// same width/padding so all edges line up (mirrors the dispatch prod).
export function Container({ className = "", children }) {
  return <div className={`mx-auto w-full max-w-[1920px] px-[14px] sm:px-6 md:px-10 xl:px-[120px] ${className}`}>{children}</div>;
}
export const WideContainer = Container;

// Inner content gutter used inside the bordered Frame — 60px on xl so content
// sits 60px in from the vertical rules, scaling down on smaller screens.
export function Bay({ className = "", children }) {
  return <div className={`mx-auto w-full px-5 sm:px-8 md:px-10 xl:px-[60px] ${className}`}>{children}</div>;
}

/* Button — Aceternity-style pill: near-black primary with a double inset
   highlight, transparent ghost secondary. */
const SIZES = { sm: "h-9 px-4", md: "h-10 px-5", lg: "h-11 px-6" };
// Aceternity inset highlight — a crisp bright top rim + soft glow below it (the
// "white blink"), a faint bottom rim, and a soft outer lift.
const INSET = "shadow-[inset_0_1px_0_0_rgba(255,255,255,0.55),inset_0_2.5px_3px_-2px_rgba(255,255,255,0.7),inset_0_-1px_1px_-1px_rgba(255,255,255,0.18),0_2px_10px_-3px_rgba(0,0,0,0.35)]";
const VARIANTS = {
  // primary — neutral-900, 1:1 with the AI SaaS template
  primary: `bg-neutral-900 text-white hover:bg-black/90 ${INSET}`,
  // secondary — transparent ghost, grey hover
  secondary: "bg-transparent text-ink hover:bg-[#f5f5f5]",
  ghost: "text-ink hover:bg-muted",
  link: "text-faint hover:text-ink",
};

export function Button({ href, variant = "primary", size = "md", className = "", children, ...props }) {
  const cls = `inline-flex cursor-pointer items-center justify-center gap-2 rounded-full text-sm font-medium transition duration-200 ${SIZES[size]} ${VARIANTS[variant]} ${className}`;
  if (href) return <Link href={href} className={cls} {...props}>{children}</Link>;
  return <button type="button" className={cls} {...props}>{children}</button>;
}

export function Eyebrow({ children, className = "" }) {
  return (
    <span className={`inline-flex items-center gap-2 rounded-full border border-border bg-muted px-3.5 py-1.5 text-xs font-medium uppercase tracking-[0.12em] text-faint ${className}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-brand" />
      {children}
    </span>
  );
}

export function Wordmark({ badge = "For carriers", className = "" }) {
  return (
    <div className={`flex items-center gap-[10px] ${className}`}>
      <Link href="/" className="text-ink"><img src="/logo.svg" alt="hunterTMS" className="h-5 w-auto" /></Link>
      {badge ? <span className="w-fit rounded-full bg-[#E8E8E8] px-[6px] py-[2px] text-sm font-medium text-ink">{badge}</span> : null}
    </div>
  );
}
