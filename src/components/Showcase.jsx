import { FileScan, Navigation, BadgeDollarSign } from "lucide-react";
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

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {STEPS.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.n} className="rounded-2xl border border-border bg-white p-7">
                <div className="flex items-center justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-brand text-white">
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="font-display text-5xl font-semibold text-border-strong">{s.n}</span>
                </div>
                <h3 className="mt-6 text-xl font-semibold text-ink">{s.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-body">{s.text}</p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
