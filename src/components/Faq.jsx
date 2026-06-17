import { Bay } from "./ui";
import { Reveal } from "./Reveal";

const QA = [
  { q: "Is huntTMS only for big fleets?", a: "No — it scales from a single owner-operator to large fleets. Per-truck pricing means you only pay for what you run." },
  { q: "Do you parse Rate Confirmations automatically?", a: "Yes. Drop a Rate Con (PDF or photo) and AI extracts the load, stops, rate and references — then flags mismatches against the BOL." },
  { q: "Can I send invoices to my factoring company?", a: "Generate a broker invoice in one click and send it straight to your factor. Receivables age in real time on the dashboard." },
  { q: "How is this different from the dispatch product?", a: "The dispatch product is dispatcher-first. huntTMS Carrier is the carrier-side workspace — billing, expenses, payroll and compliance included." },
  { q: "How long does setup take?", a: "Minutes. Import your first load or connect a broker email and you're dispatching the same day." },
  { q: "Does it track driver compliance?", a: "Yes. CDL, medical card, drug tests and endorsements are tracked per driver with expiry alerts before a document grounds a truck." },
  { q: "Can I run payroll and settlements?", a: "Per-mile, flat, percentage or hourly — generate driver and dispatcher settlements with every blocker surfaced before you pay." },
  { q: "Is there a live map and tracking?", a: "A live map with real road routing from pickup to delivery and live driver positions, with a live ETA on every load." },
  { q: "What does HuntBot do?", a: "Ask in plain English — “generate payroll for last week”, “show expenses for truck #105” — and HuntBot runs the workflow for you." },
  { q: "Can I import my existing loads?", a: "Drop a Rate Confirmation or connect a broker email and AI builds the load with driver, truck and stops — no manual re-entry." },
  { q: "How does factoring work?", a: "Send a broker invoice straight to your factor in one click, and watch receivables age in real time on the dashboard." },
];

export default function Faq({ heading = "Get answers to your most common questions", qa = QA } = {}) {
  return (
    <section id="faq" className="py-[120px]">
      <Bay>
        {/* Centered heading */}
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-semibold tracking-tight text-ink md:text-[44px] md:leading-[1.08]">
            {heading}
          </h2>
          <p className="mt-4 text-base text-body md:text-lg">
            Not finding what you’re looking for? <a href="#cta" className="font-medium text-brand hover:underline">Reach out to our team.</a>
          </p>
        </Reveal>

        {/* Masonry grid of Q&A cards */}
        <div className="mt-14 columns-1 gap-4 md:columns-2 lg:columns-3">
          {qa.map((item, i) => (
            <Reveal
              key={item.q}
              delay={(i % 3) * 0.08}
              className="mb-4 break-inside-avoid rounded-2xl border border-border bg-white p-6 shadow-[0_1px_2px_rgba(23,23,23,0.04)]"
            >
              <h3 className="text-[15px] font-semibold text-ink">{item.q}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-body">{item.a}</p>
            </Reveal>
          ))}
        </div>
      </Bay>
    </section>
  );
}
