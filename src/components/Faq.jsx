import { ChevronDown } from "lucide-react";
import { Container, Eyebrow } from "./ui";

const QA = [
  { q: "Is hunterTMS only for big fleets?", a: "No — it scales from a single owner-operator to large fleets. Per-truck pricing means you only pay for what you run." },
  { q: "Do you parse Rate Confirmations automatically?", a: "Yes. Drop a Rate Con (PDF or photo) and AI extracts the load, stops, rate and references — then flags mismatches against the BOL." },
  { q: "Can I send invoices to my factoring company?", a: "Generate a broker invoice in one click and send it to RTS or your factor. Receivables age in real time on the dashboard." },
  { q: "How is this different from the dispatch product?", a: "The dispatch product is dispatcher-first. hunterTMS Carrier is the carrier-side workspace — billing, expenses, payroll and compliance included." },
  { q: "How long does setup take?", a: "Minutes. Import your first load or connect a broker email and you're dispatching the same day." },
];

export default function Faq() {
  return (
    <section id="faq" className="border-t border-border py-[120px]">
      <Container>
        <div className="grid gap-12 md:grid-cols-2 md:gap-16">
          {/* Left: heading */}
          <div>
            <Eyebrow>FAQ</Eyebrow>
            <h2 className="mt-7 font-display text-3xl font-semibold tracking-tight text-ink md:text-[44px] md:leading-[1.08]">
              Get answers to your most common questions
            </h2>
            <p className="mt-5 text-base text-body md:text-lg">
              Not finding what you’re looking for? <a href="#cta" className="font-medium text-brand hover:underline">Reach out to our team.</a>
            </p>
          </div>

          {/* Right: accordion */}
          <div className="flex flex-col gap-3">
            {QA.map((item) => (
              <details key={item.q} className="group rounded-2xl border border-border bg-white px-5 shadow-[0_1px_2px_rgba(23,23,23,0.04)]">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-left text-[15px] font-medium text-ink [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <ChevronDown className="h-5 w-5 shrink-0 text-faint transition-transform duration-200 group-open:rotate-180" />
                </summary>
                <p className="pb-5 text-sm leading-relaxed text-body">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
