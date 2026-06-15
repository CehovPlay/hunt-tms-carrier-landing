import Link from "next/link";

// Single shared container — header, footer and every content section use the
// same width/padding so all edges line up (mirrors the dispatch prod).
export function Container({ className = "", children }) {
  return <div className={`mx-auto w-full max-w-[1920px] px-[14px] sm:px-6 md:px-10 xl:px-[120px] ${className}`}>{children}</div>;
}
export const WideContainer = Container;

/* Button — 1:1 with the dispatch prod `btnComponent` (pill + inset shadow) */
const SIZES = { sm: "h-10 px-6", md: "h-[52px] px-7", lg: "h-[52px] px-8" };
const VARIANTS = {
  // accent (primary) — blue with inner top highlight
  primary: "bg-brand text-white shadow-[inset_0px_2px_4px_1px_rgba(255,255,255,0.4)] hover:bg-brand-600",
  // white — with inner bottom shadow
  secondary: "bg-white text-ink shadow-[inset_0px_-2px_4px_1px_rgba(23,23,23,0.2)] hover:bg-muted",
  ghost: "text-ink hover:bg-muted",
  link: "text-faint hover:text-ink",
};

export function Button({ href, variant = "primary", size = "md", className = "", children, ...props }) {
  const cls = `inline-flex cursor-pointer items-center justify-center gap-2 rounded-full text-sm font-medium transition-colors duration-200 ${SIZES[size]} ${VARIANTS[variant]} ${className}`;
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
