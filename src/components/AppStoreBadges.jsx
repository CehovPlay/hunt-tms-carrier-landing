import Link from "next/link";

// App-store badges built as JSX (monochrome, border-first — matches the site
// style; no third-party PNG assets). Both link out to the store listings.
const APP_STORE_URL = "#";
const PLAY_STORE_URL = "#";
const TELEGRAM_URL = "#";

function AppleLogo({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M17.05 12.54c-.03-2.6 2.12-3.84 2.22-3.9-1.21-1.78-3.1-2.02-3.76-2.05-1.6-.16-3.13.94-3.94.94-.81 0-2.07-.92-3.4-.9-1.75.03-3.36 1.02-4.26 2.58-1.82 3.16-.47 7.85 1.3 10.42.86 1.26 1.89 2.67 3.24 2.62 1.3-.05 1.79-.84 3.36-.84 1.57 0 2.01.84 3.38.81 1.4-.02 2.29-1.28 3.15-2.55.99-1.46 1.4-2.87 1.42-2.94-.03-.02-2.72-1.05-2.75-4.14zM14.5 5.04c.72-.87 1.2-2.08 1.07-3.29-1.03.05-2.28.69-3.02 1.56-.66.77-1.24 2-1.08 3.18 1.15.09 2.32-.59 3.03-1.45z" />
    </svg>
  );
}

function PlayLogo({ className = "" }) {
  // Simplified Google Play "play" triangle, single-tone.
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M4.2 2.3a1 1 0 0 0-.7 1v17.4a1 1 0 0 0 1.5.86l15.4-8.7a1 1 0 0 0 0-1.72L5 2.44a1 1 0 0 0-.8-.14z" />
    </svg>
  );
}

function TelegramLogo({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71L12.6 16.3l-1.99 1.93c-.23.23-.42.42-.83.42z" />
    </svg>
  );
}

function Badge({ href, Logo, top, bottom }) {
  return (
    <Link
      href={href}
      className="inline-flex h-12 items-center gap-2.5 rounded-xl bg-ink px-4 text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.18)] transition hover:bg-black/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
    >
      <Logo className="h-6 w-6 shrink-0" />
      <span className="flex flex-col text-left leading-none">
        <span className="text-[9px] font-medium uppercase tracking-wide text-white/70">{top}</span>
        <span className="mt-0.5 text-[15px] font-semibold tracking-tight">{bottom}</span>
      </span>
    </Link>
  );
}

export default function AppStoreBadges({ className = "" }) {
  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      <Badge href={APP_STORE_URL} Logo={AppleLogo} top="Download on the" bottom="App Store" />
      <Badge href={PLAY_STORE_URL} Logo={PlayLogo} top="Get it on" bottom="Google Play" />
      <Badge href={TELEGRAM_URL} Logo={TelegramLogo} top="No install — open in" bottom="Telegram" />
    </div>
  );
}
