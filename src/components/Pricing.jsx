import { Check } from "lucide-react";
import { Button, Container, Eyebrow } from "./ui";

const PLANS = [
  {
    name: "Starter",
    price: "$49",
    unit: "/truck / mo",
    blurb: "For owner-operators and small fleets getting organized.",
    features: ["Up to 3 trucks", "Loads & dispatch", "Invoicing", "Live map", "Email support"],
    cta: "Start free",
    variant: "outline",
  },
  {
    name: "Fleet",
    price: "$39",
    unit: "/truck / mo",
    blurb: "For growing carriers that bill, pay and dispatch daily.",
    features: ["Unlimited trucks", "AI Rate Con parsing", "Factoring & expenses", "Payroll & settlements", "HuntBot AI", "Priority support"],
    cta: "Start free",
    variant: "primary",
    featured: true,
  },
  {
    name: "Scale",
    price: "Custom",
    unit: "",
    blurb: "For large fleets that need controls, roles and onboarding.",
    features: ["Everything in Fleet", "Role-based access", "Dedicated onboarding", "SLA & account manager"],
    cta: "Talk to sales",
    variant: "outline",
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="border-t border-lead/15 py-20 md:py-28">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow className="mx-auto">Pricing</Eyebrow>
          <h2 className="mt-5 font-display text-3xl font-medium tracking-tight text-starlight md:text-[42px] md:leading-[1.1]">
            Simple per-truck pricing
          </h2>
          <p className="mt-4 text-base text-silver md:text-lg">No setup fees. No per-seat upsells. Scale up or down anytime.</p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {PLANS.map((p) => (
            <div
              key={p.name}
              className={`relative flex flex-col rounded-[4px] border bg-midnight p-7 ${p.featured ? "border-mercury/60" : "border-lead/25"}`}
            >
              {p.featured ? (
                <span className="absolute -top-3 left-7 rounded-full bg-mercury px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white">
                  Most popular
                </span>
              ) : null}
              <p className="text-sm font-medium text-silver">{p.name}</p>
              <div className="mt-3 flex items-baseline gap-1.5">
                <span className="font-display text-4xl font-semibold tracking-tight text-starlight">{p.price}</span>
                {p.unit ? <span className="text-sm text-lead">{p.unit}</span> : null}
              </div>
              <p className="mt-3 text-sm text-silver">{p.blurb}</p>
              <ul className="mt-6 flex-1 space-y-3">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-starlight">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-mercury" />
                    {f}
                  </li>
                ))}
              </ul>
              <Button href="#cta" variant={p.variant} className="mt-8 w-full">{p.cta}</Button>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
