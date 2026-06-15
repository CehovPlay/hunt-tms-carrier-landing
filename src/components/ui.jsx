import Link from "next/link";

export function Container({ className = "", children }) {
  return <div className={`mx-auto w-full max-w-[1200px] px-6 ${className}`}>{children}</div>;
}

const SIZES = {
  sm: "px-4 py-2 text-sm",
  md: "px-5 py-2.5 text-[15px]",
  lg: "px-6 py-3 text-base",
};
const VARIANTS = {
  primary: "bg-brand text-white hover:bg-brand-600",
  soft: "bg-brand-soft text-brand hover:bg-brand/10",
  outline: "border border-border bg-white text-ink hover:bg-muted",
  ghost: "text-body hover:bg-muted hover:text-ink",
  link: "text-faint hover:text-ink",
};

export function Button({ href, variant = "primary", size = "md", className = "", children, ...props }) {
  const cls = `inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors duration-200 ${SIZES[size]} ${VARIANTS[variant]} ${className}`;
  if (href) return <Link href={href} className={cls} {...props}>{children}</Link>;
  return <button className={cls} {...props}>{children}</button>;
}

export function Eyebrow({ children, className = "" }) {
  return (
    <span className={`inline-flex items-center gap-2 rounded-full border border-border bg-muted px-3.5 py-1.5 text-xs font-medium uppercase tracking-[0.12em] text-faint ${className}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-brand" />
      {children}
    </span>
  );
}

export function Wordmark({ className = "" }) {
  return (
    <Link href="/" className={`group inline-flex items-center gap-2.5 text-ink ${className}`}>
      <img src="/logo.svg" alt="hunterTMS" className="h-6 w-auto" />
      <span className="hidden rounded-full border border-border px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-faint sm:inline">
        Carrier
      </span>
    </Link>
  );
}
