import Link from "next/link";
import { WideContainer } from "./ui";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-white">
      <WideContainer>
        <div className="flex flex-col justify-between gap-12 py-[80px] md:flex-row md:py-[120px]">
          <div>
            <img src="/logo.svg" alt="hunterTMS" className="h-6 w-auto" />
            <p className="mt-10 max-w-[890px] text-sm font-medium leading-[20px] text-[#C7C7C7]">
              hunterTMS by LoadHunter is the carrier-side platform built for U.S. fleets and owner-operators. Dispatch, invoicing, factoring, expenses, payroll, driver compliance and live tracking in one workspace. It is the companion to the dispatcher-first product and is not affiliated with or endorsed by any third-party load board or factoring service mentioned. All trademarks remain the property of their respective owners. Built for speed, clarity and fewer clicks — not more tabs.
            </p>
          </div>
          <div className="pt-[27px] text-sm font-medium">
            <h4 className="mb-6 text-[#A2A2A2]">24/7 support — we’re always on.</h4>
            <div className="mb-[6px] flex items-center justify-between text-[#686B6F]">
              <span>Phone:</span>
              <a className="w-[168px] text-right hover:underline" href="tel:+13128789795">+1 (312) 878-9795</a>
            </div>
            <div className="flex items-center justify-between text-[#686B6F]">
              <span>E-mail:</span>
              <a className="w-[168px] text-right hover:underline" href="mailto:support@loadhunter.io">support@loadhunter.io</a>
            </div>
          </div>
        </div>
      </WideContainer>

      <div className="border-t border-dashed border-[#C7C7C7] py-12">
        <WideContainer>
          <img src="/logo.svg" alt="hunterTMS" className="h-16 w-auto opacity-[0.08] md:h-24" />
        </WideContainer>
      </div>

      <WideContainer>
        <div className="flex items-center justify-between border-t border-[#E8E8E8] py-5 text-xs font-medium text-[#A2A2A2]">
          <span>© {new Date().getFullYear()} hunterTMS. All rights reserved</span>
          <div className="flex items-center gap-6">
            <Link className="hover:underline" href="#">Terms of Service</Link>
            <div className="h-[6px] w-px bg-[#E8E8E8]" />
            <Link className="hover:underline" href="#">Privacy Policy</Link>
          </div>
        </div>
      </WideContainer>
    </footer>
  );
}
