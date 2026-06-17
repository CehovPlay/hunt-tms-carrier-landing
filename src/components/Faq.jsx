"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Plus } from "lucide-react";
import { Bay } from "./ui";
import { Reveal } from "./Reveal";

const EASE = [0.16, 1, 0.3, 1];

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

function Row({ q, a, open, onToggle }) {
  return (
    <div className="border-t border-border first:border-t-0">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="group flex w-full items-center justify-between gap-5 rounded-lg py-5 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-inset"
      >
        <span className={`text-[15px] font-semibold transition-colors md:text-base ${open ? "text-ink" : "text-ink/90 group-hover:text-ink"}`}>{q}</span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.3, ease: EASE }}
          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-colors ${open ? "border-ink bg-ink text-white" : "border-border text-faint group-hover:border-border-strong"}`}
        >
          <Plus className="h-4 w-4" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: EASE }}
            className="overflow-hidden"
          >
            <p className="pb-5 pr-9 text-sm leading-relaxed text-body md:text-[15px]">{a}</p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export default function Faq({ heading = "Get answers to your most common questions", qa = QA } = {}) {
  const [openIdx, setOpenIdx] = useState(0);
  return (
    <section id="faq" className="py-24 md:py-32">
      <Bay>
        <div className="grid gap-14 md:grid-cols-[0.85fr_1.15fr] md:gap-24 lg:gap-32 xl:gap-40">
          {/* Sticky heading + contact CTA (mirrors the Features section) */}
          <Reveal className="md:sticky md:top-[96px] md:self-start">
            <h2 className="font-display text-3xl font-semibold tracking-tight text-ink md:text-[44px] md:leading-[1.08]">
              {heading}
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-body md:text-lg">
              Not finding what you’re looking for? <a href="#cta" className="font-medium text-brand hover:underline">Reach out to our team.</a>
            </p>
          </Reveal>

          {/* Accordion */}
          <Reveal delay={0.1}>
            <div>
              {qa.map((item, i) => (
                <Row
                  key={item.q}
                  q={item.q}
                  a={item.a}
                  open={openIdx === i}
                  onToggle={() => setOpenIdx((cur) => (cur === i ? -1 : i))}
                />
              ))}
            </div>
          </Reveal>
        </div>
      </Bay>
    </section>
  );
}
