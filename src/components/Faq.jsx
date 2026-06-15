import { Plus } from "lucide-react";
import { Container, Eyebrow } from "./ui";

const QA = [
  { q: "Is hunterTMS only for big fleets?", a: "No — it scales from a single owner-operator to large fleets. Per-truck pricing means you only pay for what you run." },
  { q: "Do you parse Rate Confirmations automatically?", a: "Yes. Drop a Rate Con (PDF or photo) and AI extracts the load, stops, rate and references — then flags mismatches against the BOL." },
  { q: "Can I send invoices to my factoring company?", a: "Generate a broker invoice in one click and send it to RTS or your factor. Receivables age in real time on the dashboard." },
  { q: "How is this different from the dispatch product?", a: "The dispatch product at tms.loadhunt.ai is dispatcher-first. hunterTMS Carrier is the carrier-side workspace — billing, expenses, payroll and compliance included." },
  { q: "How long does setup take?", a: "Minutes. Import your first load or connect a broker email and you're dispatching the same day." },
];

export default function Faq() {
  return (
    <section id="faq" className="border-t border-border bg-surface py-20 md:py-28">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow className="mx-auto">FAQ</Eyebrow>
          <h2 className="mt-5 font-display text-3xl font-semibold tracking-tight text-ink md:text-[44px] md:leading-[1.08]">
            Questions, answered
          </h2>
        </div>
        <div className="mx-auto mt-12 max-w-3xl divide-y divide-border border-y border-border">
          {QA.map((item) => (
            <details key={item.q} className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-left text-base font-medium text-ink [&::-webkit-details-marker]:hidden">
                {item.q}
                <Plus className="h-5 w-5 shrink-0 text-faint transition-transform duration-200 group-open:rotate-45" />
              </summary>
              <p className="pb-5 text-sm leading-relaxed text-body">{item.a}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
