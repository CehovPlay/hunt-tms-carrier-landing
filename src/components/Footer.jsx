import Link from "next/link";
import { Container } from "./ui";
import { Reveal } from "./Reveal";

export default function Footer() {
  return (
    <footer className="bg-white pt-[120px]">
      {/* Top: brand + support */}
      <Container className="flex flex-col items-start justify-between gap-12 pb-[120px] md:flex-row">
        <Reveal className="flex w-full flex-col items-start gap-10 md:max-w-[890px]">
          <img src="/logo.svg" alt="huntTMS" className="h-6 w-auto" />
          <p className="text-sm font-medium leading-[20px] tracking-[-0.4px] text-[#6b6b6b]">
            huntTMS by LoadHunter is the carrier-side platform built for U.S. fleets and owner-operators — dispatch, invoicing, factoring, expenses, payroll, driver compliance and live tracking in one workspace. It is the companion to the dispatcher-first product and is not affiliated with or endorsed by any third-party load board or factoring service mentioned. All trademarks remain the property of their respective owners. Built for speed, clarity and fewer clicks — not more tabs.
          </p>
        </Reveal>
        <Reveal delay={0.12} className="flex w-full items-start justify-end md:w-[283px]">
          <div className="flex w-full flex-col gap-6 text-sm font-medium tracking-[-0.4px]">
            <p className="leading-[20px] text-[#737373] md:text-right">24/7 support — we’re always on.</p>
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
        </Reveal>
      </Container>

      {/* Divider (full width) — same colour as the frame rules */}
      <div className="border-t border-border" />

      {/* Giant brand wordmark between the dividers — aligned to the site content width */}
      <Reveal y={28}>
        <Container className="overflow-hidden py-10">
          <img src="/hunterTMS.svg" alt="" aria-hidden="true" className="pointer-events-none w-full select-none" />
        </Container>
      </Reveal>

      {/* Legal bar */}
      <div className="border-t border-border">
        <Container className="flex h-[56px] items-center justify-between py-5 text-xs font-medium tracking-[-0.48px] text-[#737373]">
          <span>© {new Date().getFullYear()} huntTMS. All rights reserved</span>
          <div className="flex items-center gap-6">
            <Link className="hover:underline" href="#">Terms and Conditions</Link>
            <div className="h-[9px] w-px bg-[#e8e8e8]" />
            <Link className="hover:underline" href="#">Privacy Policy</Link>
          </div>
        </Container>
      </div>
    </footer>
  );
}
