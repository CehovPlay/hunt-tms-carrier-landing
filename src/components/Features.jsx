import { Check } from "lucide-react";
import { Container, Eyebrow } from "./ui";
import { LoadsMock, BillingMock, MapMock, TimelineMock, ExpenseMock, PayrollMock, ComplianceMock, HuntBotMock } from "./mockups";

const BLOCKS = [
  { tag: "Dispatch & loads", title: "Every load in one record — no double entry", text: "Drop a Rate Confirmation and AI fills the load. Driver, truck, broker and stops stay in sync from booking to delivery.", bullets: ["AI Rate Con parsing", "BOL vs Rate Con mismatch flags", "One source of truth per load"], mock: <LoadsMock /> },
  { tag: "Live map & tracking", title: "See every truck on a real map", text: "Real road routing from pickup to delivery, live driver positions, and the load record one tap away.", bullets: ["Real-road routing", "Live driver positions", "Open the load in a tap"], mock: <MapMock /> },
  { tag: "Dispatch timeline", title: "A week of your fleet, at a glance", text: "A board of every truck and appointment so you can spot conflicts and idle trucks before they cost you a load.", bullets: ["Week-at-a-glance board", "Spot idle trucks", "Catch appointment conflicts"], mock: <TimelineMock /> },
  { tag: "Billing & factoring", title: "From POD to paid, without the busywork", text: "Generate broker invoices in a click, send them straight to RTS or your factor, and watch receivables age in real time.", bullets: ["One-click broker invoices", "Send to factoring", "Live receivables aging"], mock: <BillingMock /> },
  { tag: "Expense capture", title: "Every dollar assigned and approved", text: "Fuel, tolls, lumpers and maintenance — attach receipts, assign to loads and approve right from the load. Margins stay honest.", bullets: ["Receipts on every expense", "Assign to a load", "Approve in one tap"], mock: <ExpenseMock /> },
  { tag: "Payroll & settlements", title: "Driver pay that runs itself", text: "Per-mile, flat, percentage or hourly — generate driver and dispatcher settlements with every blocker surfaced before you pay.", bullets: ["Any pay method", "Bonuses & deductions", "Blockers surfaced"], mock: <PayrollMock /> },
  { tag: "Driver compliance", title: "Never get caught with an expired doc", text: "CDL, medical card, endorsements and documents tracked with expiry alerts before they become a problem on the road.", bullets: ["CDL & medical tracking", "Endorsements on file", "Expiry alerts"], mock: <ComplianceMock /> },
  { tag: "HuntBot AI", title: "Ask in plain English — it acts for you", text: "“Show expenses for truck #105.” “Generate payroll for dispatchers.” HuntBot navigates the platform and runs the workflow for you.", bullets: ["Natural-language commands", "Runs real workflows", "Catches costly mistakes"], mock: <HuntBotMock /> },
];

export default function Features() {
  return (
    <section id="features" className="border-t border-border py-24 md:py-32">
      <Container>
        <div className="grid gap-14 md:grid-cols-[0.85fr_1.15fr] md:gap-16 lg:gap-24">
          {/* Sticky section title */}
          <div className="md:sticky md:top-[96px] md:self-start">
            <Eyebrow>Everything, in one place</Eyebrow>
            <h2 className="mt-5 font-display text-3xl font-semibold tracking-tight text-ink md:text-[44px] md:leading-[1.06]">
              One platform for the whole back office
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-body md:text-lg">
              Stop stitching together five tools. hunterTMS connects dispatch, billing, expenses, payroll and compliance so the data syncs itself.
            </p>
          </div>

          {/* Stacked feature blocks */}
          <div className="flex flex-col gap-20 md:gap-28">
            {BLOCKS.map((b) => (
              <div key={b.tag}>
                <div className="rounded-2xl border border-border bg-muted/50 p-4 md:p-6">{b.mock}</div>
                <p className="mt-7 text-xs font-medium uppercase tracking-[0.12em] text-faint">{b.tag}</p>
                <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight text-ink md:text-[30px] md:leading-[1.15]">{b.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-body">{b.text}</p>
                <ul className="mt-5 space-y-2.5">
                  {b.bullets.map((bl) => (
                    <li key={bl} className="flex items-center gap-2.5 text-[15px] text-ink">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-soft text-brand"><Check className="h-3 w-3" /></span>
                      {bl}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
