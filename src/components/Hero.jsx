import { ArrowRight, Navigation, TrendingUp } from "lucide-react";
import { Button, Container, Eyebrow } from "./ui";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 mercury-grid opacity-60" />
      <div className="pointer-events-none absolute inset-0 mercury-glow" />

      <Container className="relative pt-20 pb-16 md:pt-28 md:pb-24">
        <div className="mx-auto max-w-3xl text-center rise">
          <Eyebrow>Carrier-side TMS · by LoadHunter</Eyebrow>
          <h1 className="mt-6 font-display text-[40px] font-medium leading-[1.08] tracking-tight text-starlight md:text-[64px]">
            Run your entire fleet from one{" "}
            <span className="text-silver">command center.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-silver md:text-lg">
            Dispatch, loads, invoicing, factoring, expenses, payroll, driver compliance and a live map — automated by AI and synced in real time. Built for carriers, not middlemen.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href="#cta" size="lg">Start free <ArrowRight className="h-4 w-4" /></Button>
            <Button href="#demo" variant="outline" size="lg">Book a demo</Button>
          </div>
          <p className="mt-5 text-sm text-lead">No credit card · Set up in minutes · Cancel anytime</p>
        </div>

        {/* Command-center mock */}
        <div className="relative mx-auto mt-16 max-w-5xl rise">
          <div className="overflow-hidden rounded-[4px] border border-lead/30 bg-midnight">
            <div className="flex items-center gap-2 border-b border-lead/20 px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-lead/60" />
              <span className="h-2.5 w-2.5 rounded-full bg-lead/40" />
              <span className="h-2.5 w-2.5 rounded-full bg-lead/30" />
              <span className="ml-3 text-xs text-lead">huntTMS · Carrier workspace</span>
            </div>
            <div className="grid gap-4 p-5 md:grid-cols-[1fr_1.4fr]">
              {/* KPI column */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Revenue", value: "$12,975", sub: "4 loads booked" },
                  { label: "Open receivables", value: "$10,425", sub: "3 invoices" },
                  { label: "Delivered", value: "2", sub: "this week" },
                  { label: "Payroll", value: "$4,169", sub: "6 settlements" },
                ].map((k) => (
                  <div key={k.label} className="rounded-[4px] border border-lead/20 bg-graphite/50 p-4">
                    <p className="text-[11px] uppercase tracking-wide text-lead">{k.label}</p>
                    <p className="mt-1.5 font-display text-xl font-semibold text-starlight">{k.value}</p>
                    <p className="mt-0.5 text-[11px] text-silver">{k.sub}</p>
                  </div>
                ))}
              </div>
              {/* Route panel */}
              <div className="rounded-[4px] border border-lead/20 bg-graphite/40 p-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-starlight">Live dispatch</p>
                  <span className="flex items-center gap-1.5 rounded-full bg-mercury/15 px-2.5 py-1 text-[11px] font-medium text-ghost">
                    <Navigation className="h-3 w-3" /> 3 en route
                  </span>
                </div>
                <div className="mt-4 space-y-2.5">
                  {[
                    ["#9157553", "Chicago, IL → Dallas, TX", "$3,450"],
                    ["#9157619", "Austin, TX → Denver, CO", "$2,875"],
                    ["#9157901", "Omaha, NE → Phoenix, AZ", "$4,100"],
                  ].map(([id, route, rate]) => (
                    <div key={id} className="flex items-center justify-between rounded-[4px] border border-lead/15 bg-midnight/60 px-3.5 py-3">
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-starlight">{id}</p>
                        <p className="truncate text-xs text-silver">{route}</p>
                      </div>
                      <span className="shrink-0 text-sm font-semibold text-starlight">{rate}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex items-center gap-2 border-t border-lead/15 pt-4 text-xs text-silver">
                  <TrendingUp className="h-4 w-4 text-mercury" />
                  Margin up 18% vs last week
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
