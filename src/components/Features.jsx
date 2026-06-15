import { Route, FileText, MapPin, CalendarRange, Receipt, Wallet, ShieldCheck, Bot, Check } from "lucide-react";
import { Container, Eyebrow } from "./ui";
import { LoadsMock, BillingMock, MapMock, TimelineMock, ExpenseMock, PayrollMock, ComplianceMock, HuntBotMock } from "./mockups";

const ROWS = [
  { icon: Route, tag: "Dispatch & loads", title: "Every load in one record — no double entry", text: "Drop a Rate Confirmation and AI fills the load. Driver, truck, broker and stops stay in sync from booking to delivery.", bullets: ["AI Rate Con parsing", "BOL vs Rate Con mismatch flags", "One source of truth per load"], mock: <LoadsMock /> },
  { icon: FileText, tag: "Billing & factoring", title: "From POD to paid, without the busywork", text: "Generate broker invoices in a click, send them straight to RTS or your factor, and watch receivables age in real time.", bullets: ["One-click broker invoices", "Send to factoring", "Live receivables aging"], mock: <BillingMock />, reverse: true },
  { icon: MapPin, tag: "Live map & tracking", title: "See every truck on a real map", text: "Real road routing from pickup to delivery, live driver positions, and the load record one tap away.", bullets: ["Real-road routing", "Live driver positions", "Open the load in a tap"], mock: <MapMock /> },
  { icon: CalendarRange, tag: "Dispatch timeline", title: "A week of your fleet, at a glance", text: "A board of every truck and appointment so you can spot conflicts and idle trucks before they cost you a load.", bullets: ["Week-at-a-glance board", "Spot idle trucks", "Catch appointment conflicts"], mock: <TimelineMock />, reverse: true },
  { icon: Receipt, tag: "Expense capture", title: "Every dollar assigned and approved", text: "Fuel, tolls, lumpers and maintenance — attach receipts, assign to loads and approve right from the load. Margins stay honest.", bullets: ["Receipts on every expense", "Assign to a load", "Approve in one tap"], mock: <ExpenseMock /> },
  { icon: Wallet, tag: "Payroll & settlements", title: "Driver pay that runs itself", text: "Per-mile, flat, percentage or hourly — generate driver and dispatcher settlements with every blocker surfaced before you pay.", bullets: ["Any pay method", "Bonuses & deductions", "Blockers surfaced"], mock: <PayrollMock />, reverse: true },
  { icon: ShieldCheck, tag: "Driver compliance", title: "Never get caught with an expired doc", text: "CDL, medical card, endorsements and documents tracked with expiry alerts before they become a problem on the road.", bullets: ["CDL & medical tracking", "Endorsements on file", "Expiry alerts"], mock: <ComplianceMock /> },
  { icon: Bot, tag: "HuntBot AI", title: "Ask in plain English — it acts for you", text: "“Show expenses for truck #105.” “Generate payroll for dispatchers.” HuntBot navigates the platform and runs the workflow for you.", bullets: ["Natural-language commands", "Runs real workflows", "Catches costly mistakes"], mock: <HuntBotMock />, reverse: true },
];

export default function Features() {
  return (
    <section id="features" className="border-t border-border py-24 md:py-32">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow className="mx-auto">Everything, in one place</Eyebrow>
          <h2 className="mt-5 font-display text-3xl font-semibold tracking-tight text-ink md:text-[44px] md:leading-[1.08]">
            One platform for the whole back office
          </h2>
          <p className="mt-4 text-base text-body md:text-lg">
            Stop stitching together five tools. hunterTMS connects dispatch, billing, expenses, payroll and compliance so the data syncs itself.
          </p>
        </div>

        <div className="mt-24 flex flex-col gap-32 md:mt-32 md:gap-44">
          {ROWS.map((row) => {
            const Icon = row.icon;
            return (
              <div key={row.tag} className={`grid items-center gap-12 md:grid-cols-2 md:gap-20 ${row.reverse ? "md:[&>*:first-child]:order-2" : ""}`}>
                <div>
                  <span className="inline-flex items-center gap-2 rounded-full border border-border bg-muted px-3 py-1.5 text-xs font-medium uppercase tracking-wide text-faint">
                    <Icon className="h-3.5 w-3.5 text-brand" />{row.tag}
                  </span>
                  <h3 className="mt-6 font-display text-2xl font-semibold tracking-tight text-ink md:text-[34px] md:leading-[1.12]">{row.title}</h3>
                  <p className="mt-4 text-base leading-relaxed text-body md:text-lg">{row.text}</p>
                  <ul className="mt-7 space-y-3.5">
                    {row.bullets.map((b) => (
                      <li key={b} className="flex items-center gap-3 text-[15px] text-ink">
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-soft text-brand"><Check className="h-3 w-3" /></span>
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>{row.mock}</div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
