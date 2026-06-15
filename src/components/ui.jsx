import Link from "next/link";

export function Container({ className = "", children }) {
  return <div className={`mx-auto w-full max-w-[1200px] px-6 ${className}`}>{children}</div>;
}

const SIZES = {
  sm: "px-5 py-2.5 text-sm",
  md: "px-6 py-3 text-[15px]",
  lg: "px-7 py-3.5 text-base",
};
const VARIANTS = {
  primary: "bg-mercury text-white hover:bg-mercury-600",
  ghost: "bg-ghost/10 text-starlight hover:bg-ghost/20",
  outline: "border border-lead/60 text-starlight hover:border-lead hover:bg-graphite",
  link: "text-silver hover:text-starlight",
};

export function Button({ href, variant = "primary", size = "md", className = "", children, ...props }) {
  const cls = `inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors duration-200 ${SIZES[size]} ${VARIANTS[variant]} ${className}`;
  if (href) return <Link href={href} className={cls} {...props}>{children}</Link>;
  return <button className={cls} {...props}>{children}</button>;
}

export function Eyebrow({ children, className = "" }) {
  return (
    <span className={`inline-flex items-center gap-2 rounded-full border border-lead/40 bg-graphite/60 px-3.5 py-1.5 text-xs font-medium uppercase tracking-[0.14em] text-silver ${className}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-mercury" />
      {children}
    </span>
  );
}

export function Wordmark({ className = "" }) {
  return (
    <Link href="/" className={`group inline-flex items-center gap-2.5 ${className}`}>
      {/* Placeholder mark — swap for the real logo asset later */}
      <span className="flex h-8 w-8 items-center justify-center rounded-[6px] bg-mercury text-sm font-bold text-white">h</span>
      <span className="text-[17px] font-semibold tracking-tight text-starlight">
        hunt<span className="text-silver">TMS</span>
      </span>
      <span className="rounded-full border border-lead/50 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-silver">
        Carrier
      </span>
    </Link>
  );
}
