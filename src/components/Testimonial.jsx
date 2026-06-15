"use client";

import { useEffect, useState } from "react";
import { Container, Eyebrow } from "./ui";

const QUOTES = [
  { quote: "We were juggling a TMS, two spreadsheets and a factoring portal. hunterTMS put dispatch, invoicing and payroll on one screen — we close the books in a fraction of the time.", name: "Robert J.", role: "Owner-operator · 9-truck fleet", initials: "RJ" },
  { quote: "The AI Rate Con parsing alone saves my dispatcher an hour a day. Loads are created and assigned before I've finished my coffee.", name: "Marina K.", role: "Operations manager · 24 trucks", initials: "MK" },
  { quote: "Invoices go straight to our factor and receivables actually update in real time. We stopped chasing paperwork and started chasing better lanes.", name: "Andre P.", role: "Fleet owner · 12 trucks", initials: "AP" },
  { quote: "Compliance alerts caught two expiring medical cards before they grounded a truck. That one save paid for the whole year.", name: "Dwayne T.", role: "Safety & dispatch · 18 trucks", initials: "DT" },
];

export default function Testimonial({ eyebrow = "Why carriers switch", quotes = QUOTES } = {}) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % quotes.length), 5000);
    return () => clearInterval(id);
  }, [quotes.length]);
  const t = quotes[i % quotes.length];
  return (
    <section className="flex min-h-[1080px] flex-col justify-center border-t border-border bg-surface py-20">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <Eyebrow className="mx-auto">{eyebrow}</Eyebrow>
          <blockquote key={i} className="rise mt-9 min-h-[180px] font-display text-2xl font-medium leading-snug tracking-tight text-ink md:min-h-[200px] md:text-[32px] md:leading-[1.3]">
            “{t.quote}”
          </blockquote>
          <div key={`a-${i}`} className="rise mt-6 flex items-center justify-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-muted text-sm font-semibold text-ink">{t.initials}</span>
            <div className="text-left">
              <p className="text-sm font-medium text-ink">{t.name}</p>
              <p className="text-sm text-faint">{t.role}</p>
            </div>
          </div>
          {/* dots */}
          <div className="mt-9 flex items-center justify-center gap-2">
            {quotes.map((_, k) => (
              <button
                key={k}
                type="button"
                aria-label={`Testimonial ${k + 1}`}
                onClick={() => setI(k)}
                className={`h-2 rounded-full transition-all duration-300 ${k === i ? "w-6 bg-brand" : "w-2 bg-border-strong hover:bg-faint"}`}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
