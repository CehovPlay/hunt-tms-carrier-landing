import Link from "next/link";
import { Container, Wordmark } from "./ui";

const COLS = [
  { title: "Product", links: [["Features", "#features"], ["How it works", "#how"], ["Pricing", "#pricing"], ["FAQ", "#faq"]] },
  { title: "Company", links: [["Dispatch product", "https://tms.loadhunt.ai/"], ["About", "#"], ["Contact", "#"]] },
  { title: "Legal", links: [["Privacy", "#"], ["Terms", "#"], ["Security", "#"]] },
];

export default function Footer() {
  return (
    <footer className="border-t border-lead/20 bg-deep-space py-14">
      <Container>
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <Wordmark />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-silver">
              The carrier-side TMS by LoadHunter. Dispatch, billing, payroll and compliance — in one command center.
            </p>
          </div>
          {COLS.map((col) => (
            <div key={col.title}>
              <p className="text-sm font-semibold text-starlight">{col.title}</p>
              <ul className="mt-4 space-y-3">
                {col.links.map(([label, href]) => (
                  <li key={label}>
                    <Link href={href} className="text-sm text-silver transition-colors hover:text-starlight">{label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-lead/20 pt-8 text-sm text-lead sm:flex-row">
          <p>© {new Date().getFullYear()} LoadHunter. All rights reserved.</p>
          <p>Built for U.S. carriers.</p>
        </div>
      </Container>
    </footer>
  );
}
