import Link from "next/link";
import { Container, Wordmark } from "./ui";

const COLS = [
  { title: "Product", links: [["Features", "#features"], ["How it works", "#how"], ["Pricing", "#pricing"], ["FAQ", "#faq"]] },
  { title: "Company", links: [["Dispatch product", "https://tms.loadhunt.ai/"], ["About", "#"], ["Contact", "#"]] },
  { title: "Legal", links: [["Privacy", "#"], ["Terms", "#"], ["Security", "#"]] },
];

export default function Footer() {
  return (
    <footer className="border-t border-border bg-white py-14">
      <Container>
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <Wordmark />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-body">
              The carrier-side TMS by LoadHunter. Dispatch, billing, payroll and compliance — in one platform.
            </p>
          </div>
          {COLS.map((col) => (
            <div key={col.title}>
              <p className="text-sm font-semibold text-ink">{col.title}</p>
              <ul className="mt-4 space-y-3">
                {col.links.map(([label, href]) => (
                  <li key={label}>
                    <Link href={href} className="text-sm text-body transition-colors hover:text-ink">{label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 text-sm text-faint sm:flex-row">
          <p>© {new Date().getFullYear()} LoadHunter. All rights reserved.</p>
          <p>Built for U.S. carriers.</p>
        </div>
      </Container>
    </footer>
  );
}
