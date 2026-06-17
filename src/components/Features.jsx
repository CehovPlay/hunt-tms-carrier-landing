import { Check } from "lucide-react";
import { Bay } from "./ui";
import { Reveal } from "./Reveal";
import { LoadsMock, BillingMock, MapMock, TimelineMock, ExpenseMock, PayrollMock, ComplianceMock, HuntBotMock } from "./mockups";

const BLOCKS = [
  { tag: "Dispatch & loads", title: "Every load in one record — no double entry", text: "Drop a Rate Confirmation and AI fills the load. Driver, truck, broker and stops stay in sync from booking to delivery.", bullets: ["AI Rate Con parsing", "BOL vs Rate Con mismatch flags", "One source of truth per load"], mock: <LoadsMock /> },
  { tag: "Live map & tracking", title: "See every truck on a real map", text: "Real road routing from pickup to delivery, with live driver positions and a live ETA on every load.", bullets: ["Real-road routing", "Live driver positions", "Live ETA per load"], mock: <MapMock /> },
  { tag: "Dispatch timeline", title: "A week of your fleet, at a glance", text: "A board of every truck and appointment so you can spot conflicts and idle trucks before they cost you a load.", bullets: ["Week-at-a-glance board", "Spot idle trucks", "Catch appointment conflicts"], mock: <TimelineMock /> },
  { tag: "Billing & factoring", title: "From POD to paid, without the busywork", text: "Generate broker invoices in a click, send them straight to your factor, and watch receivables age in real time.", bullets: ["One-click broker invoices", "Send to factoring", "Live receivables aging"], mock: <BillingMock /> },
  { tag: "Expense capture", title: "Every dollar assigned and approved", text: "Fuel, tolls, lumpers and maintenance — attach receipts, assign to loads and approve right from the load. Margins stay honest.", bullets: ["Receipts on every expense", "Assign to a load", "Approve in one tap"], mock: <ExpenseMock /> },
  { tag: "Payroll & settlements", title: "Driver pay that runs itself", text: "Per-mile, flat, percentage or hourly — generate driver and dispatcher settlements with every blocker surfaced before you pay.", bullets: ["Any pay method", "Bonuses & deductions", "Blockers surfaced"], mock: <PayrollMock /> },
  { tag: "Driver compliance", title: "Never get caught with an expired doc", text: "CDL, medical card, endorsements and documents tracked with expiry alerts before they become a problem on the road.", bullets: ["CDL & medical tracking", "Endorsements on file", "Expiry alerts"], mock: <ComplianceMock /> },
  { tag: "HuntBot AI", title: "Ask in plain English — it acts for you", text: "“Show expenses for truck #105.” “Generate payroll for dispatchers.” HuntBot navigates the platform and runs the workflow for you.", bullets: ["Natural-language commands", "Runs real workflows", "Catches costly mistakes"], mock: <HuntBotMock /> },
];

const bulletItem = (bl) => (
  <li key={bl} className="flex items-center gap-2.5 text-[15px] text-ink">
    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-soft text-brand"><Check className="h-3 w-3" /></span>
    {bl}
  </li>
);

export default function Features({
  heading,
  sub = "Stop stitching together five tools. huntTMS connects dispatch, billing, expenses, payroll and compliance so the data syncs itself.",
  blocks = BLOCKS,
} = {}) {
  return (
    <section id="features" className="py-24 md:py-32">
      <Bay>
        <div className="grid gap-14 md:grid-cols-[0.85fr_1.15fr] md:gap-24 lg:gap-32 xl:gap-40">
          {/* Sticky section title */}
          <Reveal className="md:sticky md:top-[96px] md:self-start">
            <h2 className="font-display text-3xl font-semibold tracking-tight text-ink md:text-[44px] md:leading-[1.08]">
              {heading || (<>One platform for the whole<br />back&nbsp;office</>)}
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-body md:text-lg">{sub}</p>
          </Reveal>

          {/* Stacked feature blocks */}
          <div className="flex flex-col gap-32 md:gap-44">
            {blocks.map((b) => (
              <div key={b.title}>
                <Reveal>
                  {b.bare ? b.mock : <div className="overflow-x-auto rounded-2xl border border-border bg-muted/50 p-4 md:p-6">{b.mock}</div>}
                </Reveal>
                <Reveal delay={0.12}>
                  {b.tag ? <p className="mt-10 text-xs font-medium uppercase tracking-[0.12em] text-faint md:mt-12">{b.tag}</p> : null}
                  <h3 className={`font-display text-2xl font-semibold tracking-tight text-ink md:text-[30px] md:leading-[1.15] ${b.tag ? "mt-3" : "mt-10 md:mt-12"}`}>{b.title}</h3>
                  <p className="mt-3 text-base leading-relaxed text-body">{b.text}</p>
                  {b.bullets.length > 4 ? (
                    <div className="mt-5 grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
                      <ul className="space-y-2.5">{b.bullets.slice(0, 4).map(bulletItem)}</ul>
                      <ul className="space-y-2.5">{b.bullets.slice(4).map(bulletItem)}</ul>
                    </div>
                  ) : (
                    <ul className="mt-5 space-y-2.5">{b.bullets.map(bulletItem)}</ul>
                  )}
                </Reveal>
              </div>
            ))}
          </div>
        </div>
      </Bay>
    </section>
  );
}
