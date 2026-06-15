import { FileScan, Navigation, BadgeDollarSign, ArrowRight } from "lucide-react";
import { Container, Eyebrow } from "./ui";

const STEPS = [
  { n: "01", icon: FileScan, title: "Import your loads", text: "Connect a broker email or drop a Rate Confirmation. AI parses it and creates the load with driver, truck and stops." },
  { n: "02", icon: Navigation, title: "Dispatch & track", text: "Assign a driver, watch them on the live map, and let the timeline board keep every appointment in view." },
  { n: "03", icon: BadgeDollarSign, title: "Bill, pay, repeat", text: "Collect the POD, send the invoice, capture expenses and run payroll — margins and receivables update themselves." },
];

export default function Showcase() {
  return (
    <section id="how" className="flex min-h-[1080px] flex-col justify-center border-t border-border bg-surface py-20">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow className="mx-auto">How it works</Eyebrow>
          <h2 className="mt-5 font-display text-3xl font-semibold tracking-tight text-ink md:text-[44px] md:leading-[1.08]">
            From rate con to paid — without the busywork
          </h2>
          <p className="mt-4 text-base text-body md:text-lg">Three steps. The platform handles the rest.</p>
        </div>

        <div className="relative mt-16 grid gap-6 md:grid-cols-3 md:gap-5">
          {/* connecting line */}
          <div className="pointer-events-none absolute left-[16%] right-[16%] top-[44px] hidden h-px bg-gradient-to-r from-border via-brand/40 to-border md:block" />
          {STEPS.map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={s.n} className="relative">
                <div className="group rounded-2xl border border-border bg-white p-7 transition-shadow duration-300 hover:shadow-[0_24px_60px_rgba(23,23,23,0.07)]">
                  <div className="flex items-center justify-between">
                    <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-xl bg-brand text-white shadow-[0_8px_24px_rgba(59,130,246,0.35)]">
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="font-display text-5xl font-semibold text-border-strong">{s.n}</span>
                  </div>
                  <h3 className="mt-6 text-xl font-semibold text-ink">{s.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-body">{s.text}</p>
                </div>
                {i < STEPS.length - 1 ? (
                  <div className="absolute -right-3 top-[44px] z-10 hidden h-6 w-6 items-center justify-center rounded-full border border-border bg-white text-brand md:flex">
                    <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
