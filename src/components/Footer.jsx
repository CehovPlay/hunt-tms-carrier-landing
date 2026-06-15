import Link from "next/link";

function FootContainer({ className = "", children }) {
  return <div className={`mx-auto w-full max-w-[1920px] px-6 md:px-20 xl:px-[320px] ${className}`}>{children}</div>;
}

export default function Footer() {
  return (
    <footer className="flex flex-col items-center gap-[120px] bg-white pt-[120px]">
      {/* Top: brand + support */}
      <FootContainer className="flex flex-col items-start justify-between gap-12 md:flex-row">
        <div className="flex w-full flex-col items-start gap-10 md:w-[890px]">
          <img src="/logo.svg" alt="hunterTMS" className="h-6 w-auto" />
          <p className="text-sm font-medium leading-[20px] tracking-[-0.4px] text-[#c7c7c7]">
            hunterTMS by LoadHunter is the carrier-side platform built for U.S. fleets and owner-operators — dispatch, invoicing, factoring, expenses, payroll, driver compliance and live tracking in one workspace. It is the companion to the dispatcher-first product and is not affiliated with or endorsed by any third-party load board or factoring service mentioned. All trademarks remain the property of their respective owners. Built for speed, clarity and fewer clicks — not more tabs.
          </p>
        </div>
        <div className="flex w-full items-center justify-end md:w-[283px]">
          <div className="flex w-full flex-col gap-6 text-sm font-medium tracking-[-0.4px]">
            <p className="leading-[20px] text-[#a2a2a2] md:text-right">24/7 support — we’re always on.</p>
            <div className="flex w-full flex-col gap-[6px] text-[#686b6f]">
              <div className="flex items-center justify-between">
                <span>Phone:</span>
                <a className="text-right hover:underline" href="tel:+13127633040">+1 (312) 763-3040</a>
              </div>
              <div className="flex items-center justify-between">
                <span>E-mail:</span>
                <a className="text-right hover:underline" href="mailto:support@huntms.ai">support@huntms.ai</a>
              </div>
            </div>
          </div>
        </div>
      </FootContainer>

      {/* Divider + giant faint wordmark + legal bar */}
      <div className="flex w-full flex-col items-center gap-10 border-t border-border pt-10">
        <div className="w-full overflow-hidden px-6 text-center">
          <span className="select-none font-display text-[22vw] font-bold leading-none tracking-tight text-ink opacity-[0.05] md:text-[200px]">hunterTMS</span>
        </div>
        <div className="w-full border-t border-[#e8e8e8]">
          <FootContainer className="flex h-[56px] items-center justify-between py-5 text-xs font-medium tracking-[-0.48px] text-[#a2a2a2]">
            <span>© {new Date().getFullYear()} hunterTMS. All rights reserved</span>
            <div className="flex items-center gap-6">
              <Link className="hover:underline" href="#">Terms and Conditions</Link>
              <div className="h-[9px] w-px bg-[#e8e8e8]" />
              <Link className="hover:underline" href="#">Privacy Policy</Link>
            </div>
          </FootContainer>
        </div>
      </div>
    </footer>
  );
}
